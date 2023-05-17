//export const BASE_URL = "https://auth.nomoreparties.co"; от яндекса
// export const BASE_URL = "http://localhost:3000"; //тренировка
export const BASE_URL = "https://api.nikitina.nomoredomains.monster";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

// Регистрация
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {email, password} ),
  })
  .then(checkResponse);
};

// Авторизация
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify( {email, password} ),
  })
  .then(checkResponse);
};

// Проверка токена
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(checkResponse);
};
