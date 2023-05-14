/*
const apiSettings = {
  url:"https://mesto.nomoreparties.co/v1/cohort-54", // ссылка на бэкенд
  headers: {
    authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    "Content-type": 'application/json'
  }
};
*/

//export class Api { old
class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;

    const token = localStorage.getItem("jwt")
    if (token)
      this.setAuthToken(token);
  }

  // проверка ответа от сервера. Венесено в метод, чтобы не писать одно и тоже
  _checkServerAnswer (response) {
    if (response.ok) {
      return response.json(); // если все ок
    } else {
      return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`); //если все не ок скажи ошибка
    }
  }

  //
  setAuthToken (token) {
    console.log("setAuthToken")
    this._headers.Authorization = `Bearer ${token}`;
  }

  // 1 Получить информацию о пользователе обо мне
  getUserInfo () {
    const token = localStorage.getItem('jwt');

    console.log("getUserInfo:", this._headers)
    console.log("getUserInfo:!!!, token=", token)
    return fetch(this._url + `/users/me`, {
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 2 Загрузка списка карточек с сервера
  getInitialCards () {
    console.log('getInitialCards!!')
    return fetch(this._url + `/cards`, {
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 3 Редактирование профиля
  editingProfile (newName, newAbout) {
    return fetch(this._url + `/users/me`, {
      method: 'PATCH', // заменить имя и работу
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
    })})
    .then(this._checkServerAnswer);
  }

  // 4 Добавить новую карточку
  uploadNewCard (name, link) {
    return fetch(this._url + `/cards`, {
      method: 'POST', // добавить карточку (POST)
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })})
      .then(this._checkServerAnswer);
  }

  // 5 Удалить карточку, ток свою
  removeCard (id) {
    return fetch(this._url + `/cards/` + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerAnswer);
  };

  // 6 Поменять аватар
  updateAvatar (avatarLink) { //ссылка на нов аватар принимает строку
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })})
      .then(this._checkServerAnswer);
  }

  // 7 Поставить лайк
  addLike(id) {
    return fetch(this._url + `/cards/` + id + `/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 7 Снять лайк
  deleteLike(id) {
    return fetch(this._url + `/cards/` + id + `/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

}


//// экзмпляр апи
const api = new Api({
  //url:"https://mesto.nomoreparties.co/v1/cohort-54", // ссылка на бэкенд
  url:"http://localhost:3000", // ссылка на бэкенд
  headers: {
    //authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    //authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVmY2I1N2FhNDQ1NGE4NTNlMTE5YzEiLCJpYXQiOjE2ODQwMDA1NzMsImV4cCI6MTY4NDYwNTM3M30.t6Cx4erPdNIoPZghQw-cIbbI6qhN0hY90J1a5IJHRcI',
    "Content-type": 'application/json'
  }
}); 

//export const api = new Api(apiSettings);
export default api;