import { Link } from "react-router-dom";
import { getScores } from "../../api.js";
import { useEffect, useState } from "react";

export const LeaderBoardPage = () => {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    getScores().then(res => {
      setScores(res.leaders);
      console.log(scores);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <h1>Это лидерборд</h1>
      </div>
      <Link to={"/"}>Начать игру</Link>
      <div>
        {scores
          .sort((a, b) => a.time - b.time)
          .map(score => (
            <div>
              {score.id} {score.name} {score.time}
            </div>
          ))}
      </div>
    </>
  );
};
