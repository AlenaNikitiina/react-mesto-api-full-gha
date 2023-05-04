import registration_success from "../images/registration_success.png";
import registration_unsuccess from "../images/registration_unsuccess.png";

export default function InfoTooltip( { isOpen, onClose, registrationForm} ) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : "" }`} >
      <div className="popup__container form">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img className="popup__image-l"
          src={registrationForm.status ? registration_success : registration_unsuccess}
          alt="статус регистрации"
        />
        <h3 className="popup__text">{registrationForm.text}</h3>
      </div>
    </section>
  )
}
