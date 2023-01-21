import { useLoadingContext } from '../contexts/LoadingContext';
import { AiOutlineSearch } from 'react-icons/ai';
import useCollectInputsData from '../hooks/useCollectInputsData';
import useFormValidation from '../hooks/useFormValidation';
import useFileDownload from '../hooks/useFileDownload';
import FormInput from './FormInput';
import MainButton from './MainButton';
import '../assets/styles/SearchForm.css';

function SearchForm() {
  const { inputsValues, handleCollectData, clearInputsValues } = useCollectInputsData();
  const { formDataLoading, setFormDataLoading } = useLoadingContext();
  const { isValid, handleValidityCheck } = useFormValidation();
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

    if(isValid) {
      handleDataLoad();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleValidityCheck}
      className="search-form"
      noValidate
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
          handleChange={handleCollectData}
          place="main"
          validation={false}
        />
        <FormInput
          id="city-input"
          type="text"
          name="city"
          placeholder="Enter a city"
          value={inputsValues.city}
          handleChange={handleCollectData}
          place="main"
          validation={false}
        />
      </fieldset>
      <MainButton
        type="submit"
        Icon={AiOutlineSearch}
        disabled={formDataLoading}
        text="Search"
        place="search-form"
        classType={formDataLoading && "form-loading"}
        isLoading={formDataLoading}
      />
    </form>
  );
}

export default SearchForm;