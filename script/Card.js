export class Card {
  constructor(selector, itemTemplate, openImage) {
    this._container = document.querySelector(`${selector}`);
    this._itemTemplate = itemTemplate;
    this._openImage = openImage;
  }

  _getTemplate(item) {
    this._htmlElement = this._itemTemplate.cloneNode(true);
    this._photoGridImage = this._htmlElement.querySelector(
      ".photo-grid__image"
    );
    this._htmlElement.querySelector(".photo-grid__title").innerText = item.name;
    this._photoGridImage.setAttribute("src", item.link);
    this._photoGridImage.setAttribute("alt", item.name);
    this._photoGridElement = this._htmlElement.querySelector(
      ".photo-grid__element"
    );
    this._deleteButton = this._htmlElement.querySelector(
      ".photo-grid__delete-button"
    );
    this._buttonLike = this._htmlElement.querySelector(
      ".photo-grid__button-like"
    );
    this._photoGridImage = this._htmlElement.querySelector(
      ".photo-grid__image"
    );
    this._setEventListeners(item);
  }

  _setEventListeners(item) {
    this._listenerButtonDelete();
    this._listenerButtonLike();
    this._listenerImage(item);
  }

  getView(item) {
    this._getTemplate(item);
    return this._photoGridElement;
  }

  _listenerButtonLike() {
    this._buttonLike.addEventListener("click", (evt) => {
      evt.target.classList.toggle("photo-grid__button-like_active");
    });
  }

  _listenerButtonDelete() {
    this._deleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".photo-grid__element").remove();
    });
  }

  _listenerImage(item) {
    this._photoGridImage.addEventListener("click", () => {
      this._openImage(item);
    });
  }
}
