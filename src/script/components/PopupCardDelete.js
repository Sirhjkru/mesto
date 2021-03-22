import { Popup } from "./Popup.js";

export class PopupCardDelete extends Popup {
  constructor(popupElement, form) {
    super(popupElement);
    this._form = form;
  }

  open(item, api, evt) {
    super.open();
    this._item = item;
    this._api = api;
    this._evt = evt
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._api.deleteCard(this._item._id).then(() => {
        this._evt.target.closest(".photo-grid__element").remove();
      });
      this.close();
    });
  }
}
