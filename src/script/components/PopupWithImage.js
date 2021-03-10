import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }
  open({ link, name }) {
    // Метод перезаписывает родительский метод open и добавляет при открытии popup картинку и атрибут src, а так же подпись.
    super.open();
    super.setEventListeners();
    const image = document.querySelector(".popup_form-disabled");
    const popupImageCard = image.querySelector(".popup__image");
    popupImageCard.setAttribute("src", link);
    popupImageCard.setAttribute("alt", name);
    image.querySelector(".popup__title").innerText = name;
  }
}
