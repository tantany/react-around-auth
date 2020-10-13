import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
            <div onClick={props.onEditProfile} className="profile__overlay-container">
              <div className="profile__overlay"></div>
              <img src={currentUser.avatar} alt="profile-picture" className="profile__picture" />
            </div>
            <div className="profile__info">
            <div className="profile__wrapper">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button onClick={props.onEditAvatar} className="profile__edit-button hover-button" aria-label="Edit"></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
            </div>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button hover-button" aria-label="Add"></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {props.children}
        </ul>
      </section>
    </main>
  );
}


export default Main;
