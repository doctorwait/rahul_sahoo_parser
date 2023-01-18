import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export function LoadingContextProvider({ children }) {
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [formDataLoading, setFormDataLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        userDataLoading,
        formDataLoading,
        setFormDataLoading,
        setUserDataLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const contextValue = useContext(LoadingContext);
  return { ...contextValue };
}