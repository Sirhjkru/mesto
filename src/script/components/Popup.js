export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._evtForHandlerEscClose = (evt) => this._handleEscClose(evt);
  }
  open() {
    //Открывает popup
    this._popupSelector.classList.add("overlay_popup-opened");
    document.addEventListener("keydown", this._evtForHandlerEscClose);
  }
  close(popup) {
    //Закрывает popup
    popup.classList.remove("overlay_popup-opened");
    document.removeEventListener("keydown", this._evtForHandlerEscClose);
  }
  setEventListeners() {
    //Добавляет обработчиков на закрытие popup по кнопке close и overlay
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("overlay_popup-opened") ||
        evt.target.classList.contains("popup__image-button-close")
      ) {
        this.close(this._popupSelector);
      }
    });
  }
  _handleEscClose(evt) {
    //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".overlay_popup-opened");
      this.close(openedPopup);
    }
  }
}
