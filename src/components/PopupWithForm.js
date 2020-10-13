import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_form popup_type_${props.name} ${props.onOpen ? 'popup_opened' : ''}`}>
      <form onSubmit={props.onSubmit} className="form popup__container" name={`${props.name}-info`} noValidate>
        <button onClick={props.onClose} className="popup__close-icon hover-button" aria-label="Close"></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className={`popup__fields ${props.type}`}>
          {props.children}
          <input type="submit" className="popup__button hover-button" value={props.value} />
        </fieldset>
      </form>
    </div>
  );
}


export default PopupWithForm;
