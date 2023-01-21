import { useState } from 'react';

function useCollectInputsData() {
  const [inputsValues, setInputsValues] = useState({});

  function handleCollectData(evt) {
    const { name, value } = evt.target;

    setInputsValues(current => ({
      ...current,
      [name]: value,
    }))
  }

  function clearInputsValues() {
    setInputsValues({})
  }

  return { inputsValues, handleCollectData, clearInputsValues }
}

export default useCollectInputsData;