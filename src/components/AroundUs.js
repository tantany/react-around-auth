import React from 'react';
import Card from './Card';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import * as auth from '../utils/auth.js';

function AroundUs(props) {
  //popup
  const [popupState, setPopupState] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    selectedCard: 0,
  });

  //currentUser
  const [currentUser, setCurrentUser] = React.useState({});

  //card
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((result) => {
      setCurrentUser(result);
    })
    .then(() => {
      api.getInitialCards().then(result => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });

    const jwt = localStorage.getItem('jwt');
    auth.getContent(jwt)
      .then((res) => {
        if(res) {
          props.setUserEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //popup handlers
  function handleEditAvatarClick() {
    setPopupState({
      isEditAvatarPopupOpen: true,
    });
  }

  function handleEditProfileClick() {
    setPopupState({
      isEditProfilePopupOpen: true,
    });
  }

  function handleAddPlaceClick() {
    setPopupState({
      isAddPlacePopupOpen: true,
    });
  }

  function closeAllPopups(evt) {
    setPopupState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: undefined,
    });
  }

  //card handlers
  function handleCardClick(card) {
    setPopupState({
      selectedCard: card,
    });
  }

  function handleCardLike(cardProps) {
    const isLiked = cardProps.card.likes.some(i => i._id === currentUser._id);
    api.changeLikeStatus(isLiked, cardProps.card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === cardProps.card._id ? newCard : c);
        setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(cardProps) {
    api.deleteCard(cardProps.card._id).then(() => {
      const newCards = cards.filter((c) => {
        return c._id !== cardProps.card._id
      });
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //edit user handler
  function handleUpdateUser(info) {
    api.sendUserInfo(info).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //add place handler
  function handleAddPlaceSubmit(cardProps) {
    api.sendCardData(cardProps).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //avatar handler
  function handleUpdateAvatar(avatar) {
    api.sendUserAvatar(avatar).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='around-us'>
      < Header redirect='Log out' link='/login' email={props.email} signOut={props.signOut} />
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={{cards, setCards }}>
          < Main
            onEditProfile={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditProfileClick}
            cards = {cards}
            onCardLike={handleCardLike}
          >
            {cards.map(card => (
              < Card key={card._id} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} card={card} />
            ))}
          </Main>
        </CardsContext.Provider>
      < Footer />
      {/* Edit name & occupation */}
      <EditProfilePopup  onOpen={popupState.isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isPopupOpen={popupState.isEditProfilePopupOpen} />
      </CurrentUserContext.Provider>
      {/* Adding new place */}
      <AddPlacePopup onOpen={popupState.isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      {/* Open image */}
      < ImagePopup
        onOpen={popupState.selectedCard}
        onClose={closeAllPopups}
      />
      {/* Delete card? */}
      < PopupWithForm name='delete' title='Are you sure?' value='Yes' type='popup__fields_type_delete' />
      {/* Changing profile picture */}
      <EditAvatarPopup onOpen={popupState.isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
    </div>
  );
}


export default AroundUs;
