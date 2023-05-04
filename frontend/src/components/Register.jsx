import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register ( {handelRegistration} ) {
  const [userData, setUserData] = useState ({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState (''); // асинхрон ф меняется когда мен пропсы или юстейт

  // Обработчик изменения инпута обновляет стейт
  function handleChangeEmail(e) {
    const email = e.target.value;
  
    setUserData ({
      ...userData,
      email,
    });
  };

  // Обработчик изменения инпута обновляет стейт
  function handleChangePassword(e) {
    const password = e.target.value;
    
    setUserData ({
      ...userData,
      password,
    });
  };

  // отправляет данные на сервер
  function handleSubmit(e) {
    e.preventDefault();
  
    if (!userData.email || !userData.password) {
      return setMessage('Что-то заполнено не верно') 
    }
    handelRegistration(userData);

    setUserData({ 
      email: "",
      password: ""
    })
  };

  return (
    <section className="login" onSubmit={handleSubmit}>
      <h3 className="login__title">Регистрация</h3>
      <p className="login__error">{message}</p>
      <form className="form popup__form login__container">
        <input className="form__input login__input"
          name="email"
          id="youEmail"
          type="text"
          placeholder="Электронная почта"
          minLength={2}
          maxLength={30}
          onChange={handleChangeEmail}
          value={userData.email || ''}
          required
        />
        <span className="form__input-error youEmail-error"></span>
        <input className="form__input login__input"
          name="password"
          id="youPassword"
          type="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={30}
          onChange={handleChangePassword}
          value={userData.password || ''}
          required
        />
        <span className="form__input-error youPassword-error"></span>
        <button className="login__button form__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__link">Уже зарегистированы?&nbsp;
        <Link to="/" className="login__link">Войти</Link>
      </p>
    </section>
  )
}


  /* очистить форму
  const resetForm = () => {
    setUserEmail('');
    setUserPassword('');
    setMessage('');
  }*/
