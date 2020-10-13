import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.onOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button onClick={props.onClose} className="popup__close-icon hover-button" aria-label="Close"></button>
        <img src={`${props.onOpen ? props.onOpen.card.link : '#'}`} alt={`${props.onOpen ? props.onOpen.card.name : ''}`} className="popup__image" />
        <p className="popup__image-title">{`${props.onOpen ? props.onOpen.card.name : ''}`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
