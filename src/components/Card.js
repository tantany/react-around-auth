import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = (
    `element__delete-button hover-button ${isOwn ? 'element__delete-button_active' : ''}`
  );

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = (
    `element__heart hover-button ${isLiked ? 'element__heart_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <li className="element">
      <div className="element__rectangle"></div>
      <div className="element__container">
        <div onClick={handleClick} className="element__image" style={{ backgroundImage: `url(${props.card.link})` }}></div>
        <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} aria-label="Delete"></button>
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__wrapper">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Like"></button>
          <p className="element__counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );

}

export default Card;
