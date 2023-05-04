import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithSubmmitDelete ( {currentCard, onOverlayClick, onConfirmDelete, renderLoading, isOpen, onClose} ) {

  // обработчик удаления карточки, в кот вызвали ф из пропсов
  function handleSubmit (e) {
    e.preventDefault();
    onConfirmDelete(currentCard);
  }

  return (
    <PopupWithForm 
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      renderLoading={renderLoading}
      buttonText={renderLoading ? `Сохранение...` : `да`}
    >
    </ PopupWithForm>
  )

}
