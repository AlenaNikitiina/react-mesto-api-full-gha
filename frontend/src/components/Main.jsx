import Card from "./Card.jsx";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import { useContext } from "react";


export default function Main ( {handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, cards, onCardClick, onCardLike, onClickDeleteCard} ) {

  const currentUser = useContext(CurrentUserContext);

  return (
  <>
    <div className="page">
      <section className="profile">
        <div className="profile__description">
          <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" onClick={handleEditAvatarClick} />
          <div className="profile__info">
            <h1 className="profile__name titleName">{currentUser.name}</h1>
            <p className="profile__job titleJob">{currentUser.about}</p>
            <button className="profile__edit-button" type="button" onClick={handleEditProfileClick} />
          </div>
        </div>
          <button className="profile__add-button" type="button" onClick={handleAddPlaceClick} />
      </section>

      <section className="elements" aria-label="ваши фотографии">
          <ul className="elements__list">
            {cards.map(card => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  name={card.name}
                  link={card.link}
                  likes={card.likes}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onClickDeleteCard={onClickDeleteCard}
                />)
            })}
          </ul>
      </section>
    
    </div>
  </>
  )
}

// компонент- это ф кот возвр джсх разметку