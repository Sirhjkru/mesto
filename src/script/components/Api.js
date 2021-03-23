export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUser() {
    return this._templateRequest("/users/me", {
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._templateRequest("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updateAvatar(url) {
    return this._templateRequest("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url.link,
      }),
    });
  }

  getInitialCards() {
    return this._templateRequest("/cards", {
      headers: this._headers,
    });
  }

  addCard({ name, link }) {
    return this._templateRequest("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    });
  }

  likeCard(id) {
    return this._templateRequest(`/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deletelikeCard(id) {
    return this._templateRequest(`/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._templateRequest(`/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  _templateRequest(path, settings) {
    return fetch(`${this._url}${path}`, settings).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
}
