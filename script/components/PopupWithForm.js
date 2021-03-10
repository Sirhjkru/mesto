import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  //Для каждого popup создается свой экземпляр класса PopupWithForm
  constructor(popupSelector, selectorForm, { handleFormSubmit }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._selectorForm = selectorForm;
  }
  open() {
    super.open();
    this._disableButtonSubmit();
    this._disableErrorMessage();
  }
  setEventListeners() {
    //перезаписываем родительский метод, добавляя в него обработчик формы.
    super.setEventListeners();
    this._selectorForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close(this._popupSelector);
    });
  }
  close(item) {
    //Перезаписываем метод close, что бы при закрытии popup форма сбрасывалась.
    super.close(item);
    this._selectorForm.reset();
  }

  _getInputValues() {
    //функция собирает данные всех полей
    this._inputField = this._popupSelector.querySelectorAll(".popup__input");
    this._InputValues = {};
    this._inputField.forEach((item) => {
      this._InputValues[item.name] = item.value;
    });
    return this._InputValues;
  }

  _disableErrorMessage() {
    this._popupSelector.querySelectorAll(".popup__input").forEach((elem) => {
      elem.classList.remove("popup__input_error");
    });
    this._popupSelector
      .querySelectorAll(".popup__input-error")
      .forEach((elem) => {
        elem.innerText = "";
      });
  }
  _disableButtonSubmit() {
    const buttonSubmit = this._popupSelector.querySelector(
      ".popup__button-save"
    );
    buttonSubmit.setAttribute("disabled", true);
    buttonSubmit.classList.add("popup__button-save_inactive");
  }
}
