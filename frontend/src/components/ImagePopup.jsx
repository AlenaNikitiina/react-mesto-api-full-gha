export default function ImagePopup ( {card, onOverlayClick, onClose} ) {
  
  return (
    <div 
      className={`popup popup_zoom ${card && 'popup_opened'}`}
      onMouseDown={onOverlayClick}
    >
      <div className="popup__box">
        <figure className="popup__figure">
          <button
            className="popup__close-button"
            aria-label="закрыть фотографию"
            type="button"
            onClick={onClose}
          />
          <img
            className="popup__image" 
            src={card && card.link}
            alt={`${card && card.name}`}
          />
          <figcaption className="popup__figcaption">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
