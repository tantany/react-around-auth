import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: title,
      link,
    });
  }

  function onKeyDown(evt) {
    props.onAddPlace({
      name: title,
      link,
    });
  }

  return (
    < PopupWithForm name="add" title="New Place" value="Create" type=""
    onOpen={props.onOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    onKeyDown={onKeyDown} >
      <label className="popup__field">
      <input onChange={handleTitleChange} type="text" id="title-input" className="form__input popup__item popup__place-title" name="name" placeholder="Title" minLength="1" maxLength="30" required />
          <span id="title-input-error" className="form__input-error"></span>
      </label>
      <label className="popup__field">
      <input onChange={handleLinkChange} type="url" id="link-input" className="form__input popup__item popup__image-link" name="link" placeholder="Link" required />
          <span id="link-input-error" className="form__input-error"></span>
      </label>
    </ PopupWithForm>
  );
}

export default AddPlacePopup;
