import { useScoreContext } from "../../context/useScoreContext.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import power1 from "./images/power1.svg";
import nonPower1 from "./images/nonPower1.svg";
import power2 from "./images/power2.svg";
import nonPower2 from "./images/nonPower2.svg";
import { useEffect } from "react";
//import celebrationImageUrl from "./images/celebration.png";
//import { Link } from "react-router-dom";

export const LeaderBoardPage = () => {
  const { scores, setScores } = useScoreContext();
  const navigate = useNavigate();
  //const [scoreList, setScoreList] = useState([]);

  const LetsPlay = e => {
    navigate("/");
  };

  useEffect(() => {
    const scoreList = scores.map(score => {
      const power1 = score.achievements.includes(1);
      const power2 = score.achievements.includes(2);
      return { ...score, power1, power2 };
    });
    scoreList.sort((a, b) => a.time - b.time).slice(0, 10);
    //console.log(scoreList);
    setScores(scoreList);
  }, [setScores]);

  console.log(scores);

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
            {scores.map(score => (
              <div className={styles.row} key={score.id}>
                <p>{(nn += 1)}</p>
                <div className={styles.table__right}>
                  <p>{score.name}</p>
                  <div className={styles.table__right__right}>
                    <div className={styles.achievements}>
                      {score.power1 ? (
                        <div className={styles.imageActive} data-title="Игра пройдена в сложном режиме">
                          <img className={styles.imageActive} src={power1} alt={"power1"} />
                        </div>
                      ) : (
                        <img className={styles.image} src={nonPower1} alt={"nonPower1"} />
                      )}
                      {score.power2 ? (
                        <div className={styles.imageActive} data-title="Игра пройдена без супер-сил">
                          <img className={styles.imageActive} src={power2} alt={"power2"} />
                        </div>
                      ) : (
                        <img className={styles.image} src={nonPower2} alt={"nonPower2"} />
                      )}
                    </div>
                    <p>{score.time}</p>
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
