import { createContext, useEffect, useState } from "react";
import { getScores } from "../api.js";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores().then(res => {
      setScores(res.leaders);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ScoreContext.Provider value={{ scores, setScores }}>{children}</ScoreContext.Provider>;
};
