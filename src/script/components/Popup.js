export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._evtForHandlerEscClose = (evt) => this._handleEscClose(evt);
  }
  open() {
    this._popupElement.classList.add("overlay_popup-opened");
    document.addEventListener("keydown", this._evtForHandlerEscClose);
  }
  close() {
    this._popupElement.classList.remove("overlay_popup-opened");
    document.removeEventListener("keydown", this._evtForHandlerEscClose);
  }
  setEventListeners() {
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
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
