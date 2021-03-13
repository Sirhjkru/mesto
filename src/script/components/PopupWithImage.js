import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupElement = popupElement;
  }
  open({ link, name }) {
    // Метод перезаписывает родительский метод open и добавляет при открытии popup картинку и атрибут src, а так же подпись.
    super.open();
    const popupImageCard = this._popupElement.querySelector(".popup__image");
    popupImageCard.setAttribute("src", link);
    popupImageCard.setAttribute("alt", name);
    this._popupElement.querySelector(".popup__title").innerText = name;
  }
}
