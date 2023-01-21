import { useCallback, useEffect, useState } from "react";

function useInputValidation() {
  const [errorMessage, setErrorMessage] = useState('');
  const [inputState, setInputState] = useState('');

  function toggleInputState(isSuccess) {
    setInputState(() => isSuccess ? 'success' : 'error');
  }

  function checkValidity(evt) {
    if (evt.target.validity.valid) {
      setErrorMessage('');
      toggleInputState(true);
    } else {
      setErrorMessage(evt.target.validationMessage);
      toggleInputState(false);
    }
  }

  const clearInput = useCallback(( newErrors = '', newState = '' ) => {
    setErrorMessage(newErrors);
    setInputState(newState);
  }, [setErrorMessage, setInputState]);

  useEffect(() => {
    return () => clearInput();
  }, []);

  return { inputState, errorMessage, checkValidity }
}

export default useInputValidation;