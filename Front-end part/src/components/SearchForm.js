import { useLoadingContext } from '../contexts/LoadingContext';
import { AiOutlineSearch } from 'react-icons/ai';
import useCollectInputsData from '../hooks/useCollectInputsData';
import useFileDownload from '../hooks/useFileDownload';
import FormInput from './FormInput';
import MainButton from './MainButton';
import '../assets/styles/SearchForm.css';

function SearchForm() {
  const { inputsValues, handleChange, clearInputsValues } = useCollectInputsData();
  const { formDataLoading, setFormDataLoading } = useLoadingContext();
  const { mockDownloadFile } = useFileDownload(); // dummy function, use useFileDownload function from this hook when API will be ready;


  function handleDataLoad() {
    setFormDataLoading(true);
    setTimeout(() => {
      mockDownloadFile(inputsValues); // dummy function, use useFileDownload function from same custom hook when API will be ready;
      setFormDataLoading(false);
      clearInputsValues();
    }, 1000);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleDataLoad();
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
      <MainButton
        type="submit"
        Icon={AiOutlineSearch}
        disabled={formDataLoading}
        text="Search"
        place="search-form"
        isLoading={formDataLoading}
      />
    </form>
  );
}

export default SearchForm;