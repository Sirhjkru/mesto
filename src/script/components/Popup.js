export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._evtForHandlerEscClose = (evt) => this._handleEscClose(evt);
  }
  open() {
    //Открывает popup
    this._popupElement.classList.add("overlay_popup-opened");
    document.addEventListener("keydown", this._evtForHandlerEscClose);
  }
  close() {
    //Закрывает popup
    this._popupElement.classList.remove("overlay_popup-opened");
    document.removeEventListener("keydown", this._evtForHandlerEscClose);
  }
  setEventListeners() {
    //Добавляет обработчиков на закрытие popup по кнопке close и overlay
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("overlay_popup-opened") ||
        evt.target.classList.contains("popup__image-button-close")
      ) {
        this.close();
      }
    });
  }
  _handleEscClose(evt) {
    //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
