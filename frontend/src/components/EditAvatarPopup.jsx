import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

export default function EditAvatarPopup ( {onUpdateAvatar, onOverlayClick, renderLoading, isOpen, onClose} ) {
  const currentUser = useContext(CurrentUserContext);
 
  const [avatar, setAvatar] = useState(''); // Стейт, в котором содержится значение инпута

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
      setAvatar(currentUser.avatar);
      setAvatar(''); //
    }, [currentUser, isOpen] ); 

  //
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar); // Значение инпута, полученное с помощью рефа
  }

   // Обработчик изменения инпута, обновляет стейт
   function handleChangeAvatar (evt) {
    setAvatar(evt.target.value);
  }

  return (
    <PopupWithForm 
      name ="change-avatar"
      title="Обновить аватар"
      isOpen ={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText={renderLoading ? `Сохранение...` : `Сохранить`}
    >
      <input
        onChange={handleChangeAvatar}
        value={avatar || ''}
        className="form__input popup__input linkInput" type="url" id="avatarlink" placeholder="Ссылка на картинку" required
      />
      <span className="form__input-error avatarlink-error"></span>
  </ PopupWithForm>
  )
}
