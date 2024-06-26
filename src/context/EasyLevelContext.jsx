import { createContext, useState } from "react";

export const EasyLevelContext = createContext();

export const EasyLevelProvider = ({ children }) => {
  const [attempts, setAttempts] = useState(true);

  const [easy, setEasy] = useState(false);

  const [isAlohomora, setIsAlohomora] = useState(false);
  const [isSupervision, setIsSupervision] = useState(false);

  return (
    <EasyLevelContext.Provider
      value={{ attempts, setAttempts, easy, setEasy, isAlohomora, setIsAlohomora, isSupervision, setIsSupervision }}
    >
      {children}
    </EasyLevelContext.Provider>
  );
};
