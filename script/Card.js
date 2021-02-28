export class Card {
  constructor(selector, itemTemplate, openPopup, item) {
    this._container = document.querySelector(`${selector}`);
    this._itemTemplate = itemTemplate;
    this._openPopup = openPopup;
    this._item = item;
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
    this._setEventListeners();
    return this._element;
  }

  _handlerButtonLike(evt) {
    evt.target.classList.toggle("photo-grid__button-like_active");
  }

  _handlerButtonDelete(evt) {
    evt.target.closest(".photo-grid__element").remove();
  }

  _handlerImage() {
    const image = document.querySelector(".popup_form-disabled");
    const popupImageCard = image.querySelector(".popup__image");
    this._openPopup(document.querySelector(".overlay_image"));
    popupImageCard.setAttribute("src", this._item.link);
    popupImageCard.setAttribute("alt", this._item.name);
    image.querySelector(".popup__title").innerText = this._item.name;
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
    this._element
      .querySelector(".photo-grid__image")
      .addEventListener("click", (evt) => {
        this._handlerImage(evt);
      });
  }

  getView() {
    return this._generateCard();
  }
}
