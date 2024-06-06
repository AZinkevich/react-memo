import { useScoreContext } from "../../context/useScoreContext.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
//import { Link } from "react-router-dom";

export const LeaderBoardPage = () => {
  const { scores } = useScoreContext();
  const navigate = useNavigate();

  const LetsPlay = e => {
    navigate("/");
  };

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
              <p>Время</p>
            </div>
          </div>
          <div>
            {scores
              .sort((a, b) => a.time - b.time)
              .slice(0, 10)
              .map(score => (
                <div className={styles.row} key={score.id}>
                  <p>{(nn += 1)}</p>
                  <div className={styles.table__right}>
                    <p>{score.name}</p>
                    <p>{score.time}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
