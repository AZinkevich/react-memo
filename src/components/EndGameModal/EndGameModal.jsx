import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button.jsx";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEasyLevelContext } from "../../context/useEasyLevelContext";
import { useScoreContext } from "../../context/useScoreContext.jsx";
import { useState } from "react";
import { postScore } from "../../api.js";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { pairsCount } = useParams();
  const navigate = useNavigate();
  const [setError] = useState(null);
  const { easy } = useEasyLevelContext();
  const { scores } = useScoreContext();
  const [newScore, setNewScore] = useState({
    name: "Пользователь",
    time: "",
  });
  const currentTime = gameDurationMinutes * 60 + gameDurationSeconds;
  // console.log(easy);
  // console.log(pairsCount);
  function bestTime() {
    if (!easy && pairsCount === "9") {
      const topScore = scores
        .sort((a, b) => a.time - b.time)
        .slice(0, 10)
        .filter(el => el.time > currentTime);
      if (topScore.length > 0) {
        return true;
      }
    }
    return false;
  }

  //console.log(bestTime());

  const handlePost = () => {
    const postNewScore = { ...newScore, time: currentTime };
    postScore({ ...postNewScore })
      .then(res => {
        setNewScore(res.leaders);
        navigate("/leaderboard");
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const title = isWon ? (bestTime() && "Вы попали на Лидерборд!") || "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const inputName = isWon
    ? bestTime() && (
        <input
          className={styles.input}
          onChange={e => setNewScore({ ...newScore, name: e.target?.value })}
          type="text"
          placeholder="Введите Ваше Имя"
        />
      )
    : null;

  const Btn = isWon ? (bestTime() && "Играть снова") || "Начать сначала" : "Начать сначала";

  const linkText = isWon
    ? bestTime() && (
        <Link className={styles.linkText} onClick={handlePost}>
          "Перейти к лидерборду"
        </Link>
      )
    : null;
  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {inputName}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      <Button onClick={onClick}>{Btn}</Button>
      {linkText}
    </div>
  );
}
