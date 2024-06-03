import { useContext } from "react";
import { EasyLevelContext } from "./EasyLevelContext.jsx";

export function useEasyLevelContext() {
  return useContext(EasyLevelContext);
}
