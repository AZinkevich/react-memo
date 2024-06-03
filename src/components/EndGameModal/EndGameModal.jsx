import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEasyLevelContext } from "../../context/useEasyLevelContext";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { pairsCount } = useParams();
  const { easy } = useEasyLevelContext();
  const [leader, setLeader] = useState({
    name: "Пользователь",
    time: "",
  });

  console.log(leader);
  console.log(setLeader);

  const bestTime = () => {
    if (!easy && pairsCount === 3) {
      const currentTime = gameDurationMinutes * 60 + gameDurationSeconds;
      console.log(currentTime);
    }
  };

  const title = isWon ? (bestTime && "Вы попали на Лидерборд") || "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
    </div>
  );
}
