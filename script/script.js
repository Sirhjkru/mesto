const body = document.querySelector('body'),
      form = document.querySelector('.popup_edit'),
      buttonCloseForm = form.querySelector('.popup__image-button-close'),
      place = document.querySelector('.popup_place'),
      buttonClosePlace = place.querySelector('.popup__image-button-close'),
      image = document.querySelector('.popup_form-disabled'),
      buttonCloseImage = image.querySelector('.popup__image-button-close'),
      imageTitle = image.querySelector('.popup__title'),
      popupEditProfile = document.querySelector('.overlay_edit'),
      popupAddCard = document.querySelector('.overlay_place'),
      popupImage = document.querySelector('.overlay_image'),
      overlays = document.querySelectorAll('.overlay'),
      editButton = document.querySelector('.profile__edit-button'),
      buttonsClose = document.querySelectorAll('.popup__image-button-close'),
      nameInput = form.elements.name,
      jobInput = form.elements.job,
      designation = place.elements.designation,
      url = place.elements.link,
      profileTitle = document.querySelector('.profile__title'),
      profileSubtitle = document.querySelector('.profile__subtitle'),
      addCardButton = document.querySelector('.profile__add-button'),
      photoGridElements = document.querySelector('.photo-grid__elements'),
      popupImageCard = image.querySelector('.popup__image'),
      itemTemplate = document.querySelector('.template').content,
      formElements = Array.from(overlays).filter(elem => {if (elem !== popupImage){return elem}});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function clearInputPlace () {
  designation.value = "";
  url.value = "";
}

function closePopup (elem) {
  elem.classList.remove('overlay_popup-opened');
}

function fillEditProfileFormFields () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  validation()
}

function openPopup (elem) {
  elem.classList.add('overlay_popup-opened');
}

function deleteElement (evt) {
  evt.target.closest('.photo-grid__element').remove();
}

function photoLike (evt) {
  evt.target.classList.toggle('photo-grid__button-like_active');
}

function openImage (evt) {
  openPopup(popupImage);
  popupImageCard.setAttribute('src', evt.target.src);
  popupImageCard.setAttribute('alt', evt.target.alt);
  imageTitle.innerText = evt.target.alt;
}

function createCard (item) {
  const htmlElement = itemTemplate.cloneNode(true);
  const deleteButton = htmlElement.querySelector('.photo-grid__delete-button');
  const photoGridImage = htmlElement.querySelector('.photo-grid__image');
  const buttonLike = htmlElement.querySelector('.photo-grid__button-like');
  htmlElement.querySelector('.photo-grid__title').innerText = item.name;
  photoGridImage.setAttribute("src", item.link);
  photoGridImage.setAttribute("alt", item.name);
  const photoGridElement = htmlElement.querySelector('.photo-grid__element');
  addCard(htmlElement);
  listenerButtonDelete(deleteButton);
  listenerButtonLike(buttonLike);
  listenerImage(photoGridImage)
  return photoGridElement
}

function listenerImage (elem) {
  elem.addEventListener('click', openImage)
}

function listenerButtonLike (elem) {
  elem.addEventListener('click', photoLike);
}

function listenerButtonDelete (elem) {
  elem.addEventListener('click', deleteElement);
}

function addCard (elem) {
  photoGridElements.prepend(elem);
}

function renderInitialCards () {
  initialCards.forEach(item => {addCard(createCard(item))})
};

function addCardHandler(evt) {
  evt.preventDefault();
  if (designation.value !== '' || url.value !== '') {
    const item =
      {
        name: designation.value,
        link: url.value
      }
      addCard(createCard(item))
  }
  closePopup(popupAddCard);
  clearInputPlace();
}

function editProfileHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup (popupEditProfile);
}

function closeOverlayOnClickMouse (elem) {
  elem.addEventListener("mousedown", function clouse (evt) {
    if (evt.target === evt.currentTarget){
      closePopup(elem);
      elem.removeEventListener("mousedown", clouse)
    }
  })
  
}

function closeOverlayOnClickEsc (elem) {
  const buttonEsc = 27
  body.addEventListener('keyup', function clouse (evt) {
    evt.preventDefault();
    if (evt.keyCode === buttonEsc) {
      closePopup(elem);
      body.removeEventListener('keyup', clouse)
    }
  })
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error')
  errorElement.textContent = errorMessage;
 
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error')
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save')
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>  {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
      console.log()
    });
    checkInputValidity(formElement, inputElement);
  });
};

function validation () {
  const formList = Array.from(formElements); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet)
    })
  })
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_inactive')
    buttonElement.setAttribute('disabled', '')
  }else{
    buttonElement.classList.remove('popup__button-save_inactive')
    buttonElement.removeAttribute('disabled')
  }
}


renderInitialCards();
form.addEventListener('submit', editProfileHandler);
place.addEventListener('submit', addCardHandler);
editButton.addEventListener('click', () => {
  openPopup(popupEditProfile); 
  fillEditProfileFormFields();
  validation();
  closeOverlayOnClickEsc(popupEditProfile)
  closeOverlayOnClickMouse(popupEditProfile)
}); 
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  validation();
  closeOverlayOnClickEsc(popupAddCard)
  closeOverlayOnClickEsc(popupAddCard)
  closeOverlayOnClickMouse(popupAddCard)
});
buttonCloseForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
buttonClosePlace.addEventListener('click', () => {closePopup(popupAddCard); clearInputPlace();});
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
