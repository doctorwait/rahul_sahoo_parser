import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

// wrap components that need access to context at this provider component

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

// custom hook to access context value inside component

export function useLoadingContext() {
  const contextValue = useContext(LoadingContext);
  return { ...contextValue };
}