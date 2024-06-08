import { Button } from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import power1 from "./images/power1.svg";
import nonPower1 from "./images/nonPower1.svg";
import power2 from "./images/power2.svg";
import nonPower2 from "./images/nonPower2.svg";
import { useEffect, useState } from "react";
import { getScores } from "../../api.js";
export const LeaderBoardPage = () => {
  const navigate = useNavigate();
  const [scoreList, setScoreList] = useState([]);

  const LetsPlay = e => {
    navigate("/");
  };

  useEffect(() => {
    getScores().then(data => {
      setScoreList(
        data.leaders
          .sort((a, b) => a.time - b.time)
          .map(score => {
            const power1 = score.achievements.includes(1);
            const power2 = score.achievements.includes(2);
            const min = Math.floor(score.time / 60);
            const sec = score.time - min * 60;
            return { ...score, power1, power2, min, sec };
          }),
      );
    });
  }, []);

  let nn = 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Лидерборд</p>
          <Button onClick={LetsPlay}>Начать игру</Button>
        </div>
        <div className={styles.table}>
          <div className={styles.table__header}>
            <p>Позиция</p>
            <div className={styles.table__right}>
              <p>Пользователь</p>
              <div className={styles.table__right__right}>
                <p>Достижения</p>
                <p>Время</p>
              </div>
            </div>
          </div>
          <div>
            {scoreList.slice(0, 10).map(position => (
              <div className={styles.row} key={position.id}>
                <p>{(nn += 1)}</p>
                <div className={styles.table__right}>
                  <p>{position.name}</p>
                  <div className={styles.table__right__right}>
                    <div className={styles.achievements}>
                      {position.power1 ? (
                        <div className={styles.imageActive} data-title="Игра пройдена в сложном режиме">
                          <img className={styles.imageActive} src={power1} alt={"power1"} />
                        </div>
                      ) : (
                        <img className={styles.image} src={nonPower1} alt={"nonPower1"} />
                      )}
                      {position.power2 ? (
                        <div className={styles.imageActive} data-title="Игра пройдена без супер-сил">
                          <img className={styles.imageActive} src={power2} alt={"power2"} />
                        </div>
                      ) : (
                        <img className={styles.image} src={nonPower2} alt={"nonPower2"} />
                      )}
                    </div>
                    <p>
                      {position.min}:{position.sec}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
