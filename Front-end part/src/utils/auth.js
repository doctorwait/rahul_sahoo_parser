import { REGISTER_FETCH_URL, LOGIN_FETCH_URL, TOKEN_FETCH_URL } from "./constants";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = ({ name, password, email }) => {

  // Mock URL. Change to real server URL.

  return fetch(REGISTER_FETCH_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email,
      name
    })
  })
    .then(response => checkResponse(response));
}

export const login = ({ password, email }) => {

  // Mock URL. Change to real server URL.

  return fetch(LOGIN_FETCH_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: 'kminchelle', // Mock data. Change to data from function arguments when back-end will be ready.
      password: '0lelplR',  // Mock data. Change to data from function arguments when back-end will be ready.
    })
  })
    .then(response => checkResponse(response));
}

export const checkToken = (token) => {

  // Mock URL. Change to real server URL.

  return fetch(TOKEN_FETCH_URL, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  })
    .then(response => checkResponse(response));
}