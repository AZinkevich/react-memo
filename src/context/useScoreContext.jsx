import { useContext } from "react";
import { ScoreContext } from "./ScoreContext.jsx";

export function useScoreContext() {
  return useContext(ScoreContext);
}
