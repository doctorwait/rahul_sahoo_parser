import { Switch, Route } from 'react-router-dom';
import '../assets/styles/App.css';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';
import Portal from './Portal';
import { MAIN_PAGE_ROUTE } from '../utils/constants';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Switch>
        <Route exact path={MAIN_PAGE_ROUTE} >
          <Main />
        </Route>
      </Switch>
      <Footer />
      <Portal>

      </Portal>
    </div>
  );
}

export default App;
