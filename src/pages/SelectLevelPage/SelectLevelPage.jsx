import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEffect } from "react";
import { useEasyLevelContext } from "../../context/useEasyLevelContext.jsx";

export function SelectLevelPage() {
  const { attempts, setAttempts, easy, setEasy } = useEasyLevelContext();

  useEffect(() => {
    setAttempts(1);
    setEasy(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SelectLevelPage]);

  function handleEasyLevel() {
    if (attempts) {
      setAttempts(3);
      setEasy(true);
    } else {
      setAttempts(1);
      setEasy(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <div className={styles.checkbox}>
          <input type="checkbox" name="checkbox" onChange={e => handleEasyLevel()} />
          <p className={easy ? styles.checkboxEasy : styles.checkboxNorm}>Режим с тремя попытками</p>
        </div>
        <div>
          <Link to={"/leaderboard"}>Перейти к лидерборду</Link>
        </div>
      </div>
    </div>
  );
}
