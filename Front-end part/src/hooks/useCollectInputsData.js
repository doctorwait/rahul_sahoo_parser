import { useState } from 'react';

function useCollectInputsData() {
  const [inputsValues, setInputsValues] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;

    setInputsValues(current => ({
      ...current,
      [name]: value,
    }))
  }

  function clearInputsValues() {
    setInputsValues({})
  }

  return { inputsValues, handleChange, clearInputsValues }
}

export default useCollectInputsData;