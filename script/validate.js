const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass)
    errorElement.textContent = errorMessage;
  };

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = '';
  };
  
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>  {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
    checkInputValidity(formElement, inputElement, config);
  });
};
 
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldSetSelector));
  fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet, config)
    })
  })
}
  
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
  
function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.setAttribute('disabled', '')
  }else{
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

document.addEventListener('click', () => {
  if(document.querySelector('.overlay_popup-opened')){
    enableValidation({
      formSelector: '.overlay',
      fieldSetSelector: '.form-set',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_inactive',
      inputErrorClass: 'popup__input_error'
    }); 
  }
})

  