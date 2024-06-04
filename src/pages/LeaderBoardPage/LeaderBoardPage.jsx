import { useScoreContext } from "../../context/useScoreContext.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
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
      <div>
        <h1>Это лидерборд</h1>
        {/* <Link to={"/"}>Начать игру</Link> */}
        <Button onClick={LetsPlay}>Начать игру</Button>
      </div>
      <div>
        <p>Позиция</p>
        <p>Пользователь</p>
        <p>Время</p>
      </div>
      <div>
        {scores
          .sort((a, b) => a.time - b.time)
          .slice(0, 10)
          .map(score => (
            <div key={score.id}>
              <p>{(nn += 1)}</p>
              <p>{score.name}</p>
              <p>{score.time}</p>
            </div>
          ))}
      </div>
    </>
  );
};
