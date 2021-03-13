export class FormValidator {
  constructor(config, formItem) {
    this._config = config;
    this._formItem = formItem;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formItem.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formItem.querySelector(
      `.${inputElement.id}-error`
    );
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
    const inputList = Array.from(
      this._formItem.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formItem.querySelector(
      this._config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formItem.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._config.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
      } else {
        buttonElement.classList.remove(this._config.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
    }
  }

  setDefaultForm() {
    this._formItem
      .querySelectorAll(this._config.inputSelector)
      .forEach((elem) => {
        elem.classList.remove("popup__input_error");
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
    buttonSubmit.classList.add("popup__button-save_inactive");
  }
}
