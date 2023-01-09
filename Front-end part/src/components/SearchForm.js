import { useState } from 'react';
import '../assets/styles/SearchForm.css';
import icon from '../assets/images/navigation-icon-white.svg';

function SearchForm() {
  const [inputsValues, setInputsValues] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;

    setInputsValues(current => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(inputsValues);
    setInputsValues({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form"
    >
      <fieldset className="search-form__fieldset" >
        <legend className="search-form__legend">
          Search For Leads
        </legend>
        <p className="search-form__description" >
          Type keyword and choose city to search for leads.
        </p>
        <div className="search-form__input-wrapper" >
          <label
            htmlFor="keyword-input"
            className="search-form__label"
          >
            Enter a Keyword
          </label>
          <input
            className="search-form__input"
            id="keyword-input"
            type="text"
            name="keyword"
            placeholder="Enter a keyword"
            value={inputsValues.keyword || ''}
            minLength="2"
            required
            onChange={handleChange}
          />
        </div>
        <div className="search-form__input-wrapper" >
          <label
            htmlFor="city-input"
            className="search-form__label"
          >
            Enter a City
          </label>
          <input
            className="search-form__input"
            id="city-input"
            type="text"
            name="city"
            placeholder="Enter a city"
            value={inputsValues.city || ''}
            minLength="2"
            required
            onChange={handleChange}
          />
        </div>
        <button
            className="search-form__button"
            type="submit"
          >
            <img src={icon} alt="button icon" className="search-form__button-icon" />
            Search
          </button>
      </fieldset>
    </form>
  );
}

export default SearchForm;