import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../assets/styles/App.css';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';
import { useLoadingContext } from '../contexts/LoadingContext';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Portal from './Portal';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import { MAIN_PAGE_ROUTE } from '../utils/constants';

function App() {
  const [registerPopupState, setRegisterPopupState] = useState(false);
  const [loginPopupState, setLoginPopupState] = useState(false);
  const { setLoginState, setCurrentUser, removeCurrentUser } = useCurrentUserContext();
  const { setUserDataLoading, setFormDataLoading } = useLoadingContext();

  // popup states handlers

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

  // register, login, logout handlers

  function handleUserRegister(data) {
    setFormDataLoading(true);

    auth.register(data)
      .then(() => closeAllPopups())
      .catch(err => console.log(`Unable to sign up new user. Error: ${err}`))
      .finally(() => setFormDataLoading(false));
  }

  function handleUserLogin(data, keepSignIn = false) {
    const storage = keepSignIn ? localStorage : sessionStorage;

    setFormDataLoading(true);

    auth.login(data)
      .then(data => {
        if (data.token) {
          storage.setItem('token', data.token);
          return data;
        } else {
          return;
        }
      })
      .then(userData => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Unable to sign in. Error: ${err}`))
      .finally(() => setFormDataLoading(false));
  }

  function handleUserLogout() {
    removeCurrentUser();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

    if (token) {
      setLoginState(true);
      setUserDataLoading(true);

      auth.checkToken(token)
        .then(data => {
          if (data) {
            setCurrentUser(data);
          }
        })
        .then(() => setUserDataLoading(false))
        .catch(err => console.log(`Unable to check token. Error: ${err}`));
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  // JSX

  return (
    <div className="App">
      <Header
        openLoginPopup={openLoginPopup}
        openRegisterPopup={openRegisterPopup}
        handleLogout={handleUserLogout}
      />
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
            handleRegister={handleUserRegister}
          />
        }
        {loginPopupState &&
          <LoginPopup
            handleClose={closeAllPopups}
            handleLogin={handleUserLogin}
          />
        }
      </Portal>
    </div>
  );
}

export default App;
