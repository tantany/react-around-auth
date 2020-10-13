import React from 'react';
import success from '../images/success.jpg'
import failure from '../images/failure.jpg'

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_form popup_type_register ${props.popupState ? 'popup_opened' : ''}`}>
      <div className='popup__container form'>
        <button onClick={props.closePopup} className='popup__close-icon hover-button' aria-label='Close'></button>
        <img src={props.mode ? success : failure } alt="Message icon" className='popup__auth-image'></img>
        <h2 className='popup__auth-title'>{props.message.message}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
