import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

export default function EditProfilePopup ( { onUpdateUser, handleEditProfileClick, onOverlayClick, renderLoading, isOpen, onClose} ) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName]    = useState(''); // Стейт, в котором содержится значение инпута
  const [about, setAbout]  = useState('');

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen] ); 

  // запрещаем браузеру переходить по адресу формы. передаем значения управляемых компонентов во внешний обработчик
  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser(name, about);
  } 

  // Обработчик изменения инпута, обновляет стейт
  function handleChangeName (evt) {
    setName(evt.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeAbout (evt) {
    setAbout(evt.target.value);
  }

  return (
    <PopupWithForm 
      name ="edit" title="Редактировать профиль" 
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      handleEditProfileClick = {handleEditProfileClick}
      renderLoading={renderLoading}
      buttonText={renderLoading ? `Сохранение...` : `Сохранить`}
      >
        <input 
          value={name || ''}
          name={name}
          onChange={handleChangeName} // Значение элемента «привязывается» к значению стейта
          className="form__input popup__input nameInput" id="nickName" type="text" minLength="2" maxLength="40" placeholder="Имя" required
        />
        <span className="form__input-error nickName-error"></span>
      
        <input 
          name={about}
          value={about || ''} 
          onChange={handleChangeAbout}
          className="form__input popup__input jobInput" id="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required
        />
        <span className="form__input-error about-error"></span>
    </ PopupWithForm>
  )

}
