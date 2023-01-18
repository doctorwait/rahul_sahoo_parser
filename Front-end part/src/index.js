import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { LoadingContextProvider } from './contexts/LoadingContext';
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <CurrentUserProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </CurrentUserProvider>
    </React.StrictMode>
  </HashRouter>
);