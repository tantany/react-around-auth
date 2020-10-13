import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


  return (
    < PopupWithForm name="picture" title="Change profile picture" value="Create" type="popup__fields_type_picture"
      onOpen={props.onOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >
      <label className="popup__field">
        <input ref={avatarRef} type="url" id="link-input" className="form__input popup__item popup__image-link" name="link" placeholder="Link" required />
        <span id="link-input-error" className="form__input-error"></span>
      </label>
  </ PopupWithForm>
  );
}

export default EditAvatarPopup;
