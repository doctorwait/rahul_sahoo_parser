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

  function setLoginState(state) {
    setUserStatus(state);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        userIsLogged,
        currentUserData,
        setLoginState,
        setCurrentUser,
        removeCurrentUser
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserContext() {
  const contextValue = useContext(CurrentUserContext);
  return { ...contextValue };
}