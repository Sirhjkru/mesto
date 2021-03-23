import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, form, { handleFormSubmit }) {
    super(popupElement);
    this._popupElement = popupElement;
    this._handleFormSubmit = handleFormSubmit;
    this._form = form;
  }
  setEventListeners() {
    //перезаписываем родительский метод, добавляя в него обработчик формы.
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    //Перезаписываем метод close, что бы при закрытии popup форма сбрасывалась.
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    //функция собирает данные всех полей
    this._inputFields = this._popupElement.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputFields.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupElement.querySelector(".popup__button-save").textContent =
        "Сохранение...";
    } else {
      this._popupElement.querySelector(".popup__button-save").textContent =
        "Сохранить";
    }
  }
}
