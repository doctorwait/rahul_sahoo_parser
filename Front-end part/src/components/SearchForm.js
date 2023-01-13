import { IconContext } from "react-icons";
import { AiOutlineSearch } from 'react-icons/ai';
import useCollectInputsData from '../hooks/useCollectInputsData';
import '../assets/styles/SearchForm.css';
import FormInput from './FormInput';

function SearchForm() {
  const { inputsValues, handleChange, clearInputsValues } = useCollectInputsData();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(inputsValues);
    clearInputsValues();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form"
    >
      <h2 className="search-form__title">
        Built your Custom List
      </h2>
      <fieldset className="search-form__fieldset" >
        <FormInput
          id="keyword-input"
          type="text"
          name="keyword"
          placeholder="Enter a keyword"
          value={inputsValues.keyword}
          handleChange={handleChange}
          place="main"
        />
        <FormInput
          id="city-input"
          type="text"
          name="city"
          placeholder="Enter a city"
          value={inputsValues.city}
          handleChange={handleChange}
          place="main"
        />
      </fieldset>
      <button
        className="search-form__button"
        type="submit"
      >
        <IconContext.Provider value={{ className: "search-form__button-icon" }}>
          <AiOutlineSearch />
        </IconContext.Provider>
        Search
      </button>
    </form>
  );
}

export default SearchForm;