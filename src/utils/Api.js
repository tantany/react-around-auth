class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //receive initial cards data
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //send card data to the server
  sendCardData(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //send the server the new profile picture link
  sendUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(avatar),
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //send new user info to the server
  sendUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // loading user information from the server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //delete card data from the server
  deleteCard(cardIdDelete) {
    return fetch(`${this._baseUrl}/cards/${cardIdDelete}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Something went wrong: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changeLikeStatus(LikeButtonIsActive, cardId){
    if(LikeButtonIsActive) {
      //unlike heart button
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      //like heart button
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Something went wrong: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "ba7e8983-1c58-4c25-a942-eec3a1c30fce",
    "Content-Type": "application/json"
  }
});

export default api;
