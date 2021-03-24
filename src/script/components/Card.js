export class Card {
  constructor(itemTemplate, { openPopup }, item, api, userInfo, openWarning) {
    this._api = api;
    this._itemTemplate = itemTemplate;
    this._openPopup = openPopup;
    this._item = item;
    this._userInfo = userInfo;
    this._openWarning = openWarning;
  }

  getView() {
    return this._generateCard();
  }

  _setEventListeners() {
    this._element
      .querySelector(".photo-grid__button-like")
      .addEventListener("click", (evt) => {
        this._handlerButtonLike(evt);
      });
    this._element
      .querySelector(".photo-grid__delete-button")
      .addEventListener("click", (evt) => {
        this._openWarning.open(this._item, this._api, evt);
      });
    this._photoGridImage.addEventListener("click", () => {
      this._openPopup(this._item);
    });
  }

  _getTemplate() {
    const htmlElement = this._itemTemplate.cloneNode(true);
    return htmlElement;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._photoGridImage = this._element.querySelector(".photo-grid__image");
    this._element.querySelector(
      ".photo-grid__title"
    ).innerText = this._item.name;
    this._photoGridImage.setAttribute("src", this._item.link);
    this._photoGridImage.setAttribute("alt", this._item.name);
    if (this._item.likes.length) {
      if (this._item.likes.some((elem) => elem._id === this._userInfo._id)) {
        this._element
          .querySelector(".photo-grid__button-like")
          .classList.add("photo-grid__button-like_active");
      }
      this._element.querySelector(
        ".photo-grid__count-like"
      ).innerText = this._item.likes.length;
    }
    if (this._item.owner._id !== this._userInfo._id) {
      this._element.querySelector(".photo-grid__delete-button").style.display =
        "none";
    }
    this._setEventListeners();
    return this._element;
  }

  _handlerButtonLike(evt) {
    if (!evt.target.classList.contains("photo-grid__button-like_active")) {
      this._api
        .likeCard(this._item._id)
        .then((data) => {
          evt.target.classList.add("photo-grid__button-like_active");
          evt.target.nextElementSibling.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .deletelikeCard(this._item._id)
        .then((data) => {
          evt.target.classList.remove("photo-grid__button-like_active");
          if (data.likes.length) {
            evt.target.nextElementSibling.textContent = data.likes.length;
          } else {
            evt.target.nextElementSibling.textContent = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
