import { useEffect, useState } from "react";

function useFormValidation() {
  const [isValid, setValidationStatus] = useState(false);

  function handleValidityCheck(evt) {
    setValidationStatus(evt.currentTarget.checkValidity());
  }

  useEffect(() => {
    return () => setValidationStatus(false);
  }, [])

  return { isValid, handleValidityCheck };
}

export default useFormValidation;