export default function PopupWithForm ( {name, title, children, onOverlayClick, onSubmit, buttonText, isOpen, onClose} ) {

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : "" }  popup_edit popup_add popup_change-avatar popup_delete-card`} 
     onMouseDown={onOverlayClick}>
      <div className="popup__container form">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{`${title}`}</h3>
        <form 
          name={`popup_${name}`}
          onSubmit={onSubmit}
          className="popup__form form__edit form__add form__avatar"
        >
          {children}
          <button className="popup__save-button popup__button form__submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}
