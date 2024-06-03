import { createContext, useState } from "react";

export const EasyLevelContext = createContext();

export const EasyLevelProvider = ({ children }) => {
  const [attempts, setAttempts] = useState(true);

  const [easy, setEasy] = useState(false);

  return (
    <EasyLevelContext.Provider value={{ attempts, setAttempts, easy, setEasy }}>{children}</EasyLevelContext.Provider>
  );
};
