export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //Получаем данные юзера
  getUser() {
    return this._sendRequest("/users/me", {
      headers: this._headers,
    });
  }

  //Редактируем данные юзера
  editProfile({ name, about }) {
    return this._sendRequest("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  //Обновить картинку
  updateAvatar(url) {
    return this._sendRequest("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url.link,
      }),
    });
  }

  //Получаем карты
  getInitialCards() {
    return this._sendRequest("/cards", {
      headers: this._headers,
    });
  }

  //Добавляем карты на сервер
  addCard({ name, link }) {
    return this._sendRequest("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    });
  }

  //Ставим лайки карточке
  likeCard(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  //Удаляем лайк с карточки
  deletelikeCard(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //Удаляем карту с сервера
  deleteCard(id) {
    return this._sendRequest(`/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //Шаблон запроса
  _sendRequest(path, settings) {
    return fetch(`${this._url}${path}`, settings)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(
            new Error(`Произошла ошибка, статус-код:${res.status}`)
          );
        }
      })
      .catch((err) => Promise.reject(err));
  }
}
