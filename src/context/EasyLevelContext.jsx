import { createContext, useState } from "react";

export const EasyLevelContext = createContext();

export const EasyLevelProvider = ({ children }) => {
  const [lifes, setLifes] = useState(1);

  const [easy, setEasy] = useState(false);
  const [level, setLevel] = useState(null);

  return (
    <EasyLevelContext.Provider value={{ lifes, setLifes, easy, setEasy, level, setLevel }}>
      {children}
    </EasyLevelContext.Provider>
  );
};
