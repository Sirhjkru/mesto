export class Card {
  constructor(
    itemTemplate,
    { openPopup },
    item,
    api,
    userInfo,
    { popupWarning }
  ) {
    this._api = api;
    this._itemTemplate = itemTemplate;
    this._openPopup = openPopup;
    this._item = item;
    this._userInfo = userInfo;
    this._popupWarning = popupWarning;
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
    if (this._item.owner._id !== this._userInfo._id) {
      this._element.querySelector(".photo-grid__delete-button").style.display =
        "none";
    }
    this._setEventListeners();
    return this._element;
  }

  _handlerButtonLike(evt) {
    evt.target.classList.toggle("photo-grid__button-like_active");
  }
// ДУмаю как лучше поднимать popup. НА днный момент добавлен callback
  _handlerButtonDelete(evt) {
    this._popupWarning;
    this._api.deleteCard(this._item._id).then(() => {
      evt.target.closest(".photo-grid__element").remove();
    });
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
        this._handlerButtonDelete(evt);
      });
    this._photoGridImage.addEventListener("click", () => {
      this._openPopup(this._item);
    });
  }

  getView() {
    return this._generateCard();
  }
}
