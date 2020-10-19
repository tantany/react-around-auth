import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isPopupOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function onKeyDown(evt) {
    if(evt.key === 'Enter') {
      evt.preventDefault();
      evt.stopPropagation();
      props.onUpdateUser({
        name,
        about: description,
      });
    }
  }

  return (
    < PopupWithForm name="edit" title="Edit profile" value="Save" type=""
      onOpen={props.onOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onKeyDown={onKeyDown} >
      <label className="popup__field">
        <input onChange={handleNameChange} value={name|| ''} type="text" id="name-input" className="form__input popup__item popup__name" name="userName" placeholder={"Name"} minLength="2" maxLength="40" pattern="[A-Za-z -]{1,}" required />
        <span id="name-input-error" className="form__input-error"></span>
      </label>
      <label className="popup__field">
        <input onChange={handleDescriptionChange} value={description|| ''} type="text" id="about-input" className="form__input popup__item popup__about" name="userJob" placeholder="About me" minLength="2" maxLength="200" required />
        <span id="about-input-error" className="form__input-error"></span>
      </label>
    </ PopupWithForm>
  );
}

export default EditProfilePopup;
