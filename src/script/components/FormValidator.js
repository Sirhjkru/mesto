export class FormValidator {
  constructor(config, formItem) {
    this._config = config;
    this._formItem = formItem;
    this._buttonElement = this._formItem.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formItem.querySelectorAll(this._config.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formItem.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._buttonElement) {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "");
      } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled");
      }
    }
  }

  setDefaultForm() {
    this._formItem
      .querySelectorAll(this._config.inputSelector)
      .forEach((elem) => {
        elem.classList.remove(this._config.inputErrorClass);
      });
    this._formItem
      .querySelectorAll(`${this._config.inputSelector}-error`)
      .forEach((elem) => {
        elem.innerText = "";
      });
    const buttonSubmit = this._formItem.querySelector(
      this._config.submitButtonSelector
    );
    buttonSubmit.setAttribute("disabled", true);
    buttonSubmit.classList.add(this._config.inactiveButtonClass);
  }
}
