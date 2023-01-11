import useCollectInputsData from '../hooks/useCollectInputsData';
import '../assets/styles/SearchForm.css';
import icon from '../assets/images/navigation-icon-white.svg';
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
      <fieldset className="search-form__fieldset" >
        <legend className="search-form__legend">
          Search For Leads
        </legend>
        <p className="search-form__description" >
          Type keyword and choose city to search for leads.
        </p>
        <FormInput
          id="keyword-input"
          type="text"
          name="keyword"
          placeholder="Enter a keyword"
          label="Enter a Keyword"
          value={inputsValues.keyword}
          handleChange={handleChange}
        />
        <FormInput
          id="city-input"
          type="text"
          name="city"
          placeholder="Enter a city"
          label="Enter a City"
          value={inputsValues.city}
          handleChange={handleChange}
        />
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