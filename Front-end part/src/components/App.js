import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../assets/styles/App.css';
import Header from './Header';
import Navigation from './Navigation';
import Main from './Main';
import Footer from './Footer';
import Portal from './Portal';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import { MAIN_PAGE_ROUTE } from '../utils/constants';

function App() {
  const [registerPopupState, setRegisterPopupState] = useState(false);
  const [loginPopupState, setLoginPopupState] = useState(false);

  function closeAllPopups() {
    setRegisterPopupState(false);
    setLoginPopupState(false);
  }

  function openLoginPopup() {
    setLoginPopupState(true);
  }

  function openRegisterPopup() {
    setRegisterPopupState(true);
  }

  return (
    <div className="App">
      <Header
        openLoginPopup={openLoginPopup}
        openRegisterPopup={openRegisterPopup}
      />
      <Navigation />
      <Switch>
        <Route exact path={MAIN_PAGE_ROUTE} >
          <Main />
        </Route>
      </Switch>
      <Footer />
      <Portal>
        {registerPopupState &&
          <RegisterPopup
            handleClose={closeAllPopups}
          />
        }
        {loginPopupState &&
          <LoginPopup
            handleClose={closeAllPopups}
          />
        }
      </Portal>
    </div>
  );
}

export default App;
