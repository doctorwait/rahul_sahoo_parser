import { createContext, useState, useContext } from "react";

const CurrentUserContext = createContext();

// wrap components that need access to context at this provider component

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

// custom hook to access context value inside component

export function useCurrentUserContext() {
  const contextValue = useContext(CurrentUserContext);
  return { ...contextValue };
}