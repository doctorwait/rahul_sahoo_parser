import { Switch, Route } from 'react-router-dom';
import '../assets/styles/App.css';
import Portal from './Portal';
import { MAIN_PAGE_ROUTE } from '../utils/constants';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={MAIN_PAGE_ROUTE} >
        </Route>
      </Switch>
      <Portal>

      </Portal>
    </div>
  );
}

export default App;
