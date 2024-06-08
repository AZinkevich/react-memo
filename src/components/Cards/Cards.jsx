import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { useEasyLevelContext } from "../../context/useEasyLevelContext.jsx";
import alohomora from "./images/alohomora.svg";
import supervision from "./images/supervision.svg";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";

let paused;

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  if (paused === true) {
    const diffInSecconds = Math.floor((endDate.getTime() - 5000 - startDate.getTime()) / 1000);
    const minutes = Math.floor(diffInSecconds / 60);
    const seconds = diffInSecconds % 60;

    return {
      minutes,
      seconds,
    };
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const { isAlohomora, setIsAlohomora } = useEasyLevelContext();
  const { isSupervision, setIsSupervision } = useEasyLevelContext();
  paused = isSupervision;
  const { attempts, setAttempts, easy } = useEasyLevelContext();
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);

  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);

  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });
  const [pause, setPause] = useState(300);

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
  }
  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    easy ? setAttempts(3) : setAttempts(1);
    setIsAlohomora(false);
    setIsSupervision(false);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    const playerLost = openCardsWithoutPair.length >= 2;

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары
    if (playerLost) {
      if (attempts >= 2) {
        const newCards = cards.map(card => {
          if (card.id !== clickedCard.id) {
            return card;
          }
          return {
            ...card,
            pair: true,
          };
        });
        setCards(newCards);
        setAttempts(attempts - 1);
        return;
      }

      finishGame(STATUS_LOST);
      easy ? setAttempts(3) : setAttempts(1);
      return;
    }

    // ... игра продолжается
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, pause);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate, pause]);

  const useAlohomora = () => {
    if (!isAlohomora) {
      const closedCards = cards.filter(card => !card.open);
      const randomCard = closedCards[Math.floor(Math.random() * closedCards.length)];
      const findPair = closedCards.filter(
        closedCard => randomCard.suit === closedCard.suit && randomCard.rank === closedCard.rank,
      );
      findPair[0].open = true;
      if (findPair[1]) {
        findPair[1].open = true;
      }
      setIsAlohomora(true);
      if (closedCards.length <= 2) {
        //setStatus(STATUS_WON);
        finishGame(STATUS_WON);
      }
    }
  };

  const useSupervision = () => {
    if (!isSupervision) {
      setPause(5000);
      const oldCards = cards;
      setCards(
        cards.map(card => {
          return { ...card, open: true };
        }),
      );
      setTimeout(() => {
        setCards(oldCards);
        setPause(300);
      }, 5000);
      setIsSupervision(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS ? (
          <div className={styles.superPowers}>
            <div className={styles.supervision}>
              <button className={styles.supervisionBtn} onClick={useSupervision}>
                <img className={styles.imageSupervision} src={supervision} alt="supervision" />
              </button>
              <div className={styles.popup}>
                <span className={styles.popup_heading}>Прозрение</span>
                {isSupervision ? (
                  <span className={styles.popup_info}>Эта супер-сила уже использована</span>
                ) : (
                  <span className={styles.popup_info}>Открываются все карты на 5 секунд</span>
                )}
              </div>
            </div>
            <div className={styles.alohomora}>
              <button className={styles.alohomoraBtn} onClick={useAlohomora}>
                <img className={styles.imageAlohamora} src={alohomora} alt="alohamora" />
              </button>
              <div className={styles.popup}>
                <span className={styles.popup_heading}>Алохомора</span>
                {isAlohomora ? (
                  <span className={styles.popup_info}>Эта супер-сила уже использована</span>
                ) : (
                  <span className={styles.popup_info}>
                    Открывается случайная пара карт или находится пара к открытой карте
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : null}
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
      {easy && (
        <div>
          <p className={styles.title}>Осталось попыток: {attempts}</p>
        </div>
      )}
      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
    </div>
  );
}
