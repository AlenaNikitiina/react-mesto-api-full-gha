import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card ( {card, name, link, likes, onCardClick, onCardLike, onClickDeleteCard} ) {
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.owner._id === currentUser._id; // мы ли владельцы текущей карточки ?

  const isLiked = card.likes.some(i => i._id === currentUser._id); // есть ли у карточки лайк, поставленный текущим пользователем ?
  const cardLikeButton = ( `element__like 
    ${isLiked && 'element__like_active' }` ); // Создаём переменную, кот после зададим в `className` для кнопки лайка

  // увеличить карточку, zoom
  function handleCardClickZoom() {
    onCardClick(card);
  } 

  // обработчик клика лайка
  function handleLikeClick() {
    onCardLike(card);
  }

  // удалить карточку
  function handleDeleteClick() {
    onClickDeleteCard(card); // обработчик в кот мы вызывваем ф из пропсов, передаем в него карточку
  }

  return (
    <div className="element-template">
      <li className="elements__card">
        <article className="element">
          {isOwn && ( <button 
              className="element__trash-button"
              type="button"
              aria-label="удалить карточку"
              onClick={handleDeleteClick}
            />
          )}
          <img 
            className="element__foto" 
            src={link} 
            alt={`изображение: ${name}`}
            onClick={handleCardClickZoom}
            />
          <h2 className="element__title">{name}</h2>
          <button 
            className={cardLikeButton}
            type="button"
            aria-label="поставить лайк карточке"
            onClick={handleLikeClick}
            />
          <span className="element__like-counter">{likes.length}</span>
        </article>
      </li>
    </div>
  );
}


// тег <template></> не работает
// isOwn Далее в разметке используем переменную для условного рендеринга

// alt={`изображение: ${card.name}`}  /  {props.name}
