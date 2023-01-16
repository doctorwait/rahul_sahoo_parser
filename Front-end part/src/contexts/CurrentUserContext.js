import { createContext, useState, useContext } from "react";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUserData, setCurrentUserData] = useState({});
  const [userIsLogged, setUserStatus] = useState(false);

  function setCurrentUser(data) {
    setCurrentUserData(data);
    setUserStatus(true);
  }

  function removeCurrentUser() {
    setCurrentUserData({});
    setUserStatus(false)
  }

  return (
    <CurrentUserContext.Provider value={{ userIsLogged, currentUserData, setCurrentUser, removeCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
  const { userIsLogged, currentUserData, setCurrentUser, removeCurrentUser } = useContext(CurrentUserContext);

  return { userIsLogged, currentUserData, setCurrentUser, removeCurrentUser };
}