import '../assets/styles/Main.css';
import Front from './Front';
import SearchForm from './SearchForm';

function Main() {
  return (
    <main className="main">
      <Front />
      <SearchForm />
      <p className="main__subtitle" >
        This tool is used by million web designer and SEO agency to scale there business.
      </p>
    </main>
  );
}

export default Main;