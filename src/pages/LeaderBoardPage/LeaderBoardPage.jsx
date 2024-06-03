import { useScoreContext } from "../../context/useScoreContext.jsx";
//import { Button } from "../../components/Button/Button.jsx";
import { Link } from "react-router-dom";

export const LeaderBoardPage = () => {
  const { scores } = useScoreContext();
  console.log(scores);
  return (
    <>
      <div>
        <h1>Это лидерборд</h1>
        <Link to={"/"}>Начать игру</Link>
      </div>
      <div>
        <p>Позиция</p>
        <p>Пользователь</p>
        <p>Время</p>
      </div>
      <div>
        {scores
          .sort((a, b) => a.time - b.time)
          .map(score => (
            <div key={score.id}>
              <p>{score.id}</p>
              <p>{score.name}</p>
              <p>{score.time}</p>
            </div>
          ))}
      </div>
    </>
  );
};
