import { createContext, useEffect, useState } from "react";

interface ContextData {
  onLogin: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isUserLoggedIn: boolean;
}

export const UserContext = createContext({} as ContextData);

interface Props {
  children: React.ReactNode;
}

export const UserConstructor: React.FC<Props> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    localStorage.getItem("userIsLoggedIn") === "true"
  );
  const onLogin = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setIsUserLoggedIn(true);
    localStorage.setItem("userIsLoggedIn", "true");
  };

  const contextObj: ContextData = {
    onLogin,
    isUserLoggedIn,
  };

  return (
    <UserContext.Provider value={contextObj}>{children}</UserContext.Provider>
  );
};
