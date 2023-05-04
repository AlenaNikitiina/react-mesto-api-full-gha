import React, { useState } from "react";

export default function Login ( {handleLogin} ) {
  const [message, setMessage] = useState (''); // асинхрон ф меняется когда мен пропсы или юстейт

  const [userData, setUserData] = useState ({
    email: "",
    password: "",
  });

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    const email = e.target.value;
  
    setUserData ({
      ...userData,
      email
    });
  };

  // Обработчик изменения инпута обновляет стейт
  function handleChangePassword(e) {
    const password = e.target.value;
    
    setUserData ({
      ...userData,
      password
    });
  };

  //отправляет данные на сервер
  function handleSubmit(e) {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return false
      .then(() => setMessage(""))
    }
    handleLogin(userData);

    setUserData({ 
      email: "",
      password: ""
    })
  }

  return (
    <section className="login" onSubmit={handleSubmit}>
      <h3 className="login__title">Вход</h3>
      <p className="login__error">{message}</p>
      <form className="form popup__form login__container">
        <input
          className="form__input login__input"
          name="email"
          id="youEmail"
          type="text"
          placeholder="Электронная почта"
          minLength={2}
          maxLength={30}
          required
          value={userData.email || ''}
          onChange={handleChangeName}
        />
        <span className="form__input-error youEmail-error"></span>
        <input
          className="form__input login__input"
          name="password"
          id="youPassword"
          type="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={20}
          required
          value={userData.password || ''}
          onChange={handleChangePassword}
        />
        <span className="form__input-error youPassword-error"></span>
        <button className="login__button form__submit" type="submit">Войти</button>
      </form>
    </section>
  )

}
