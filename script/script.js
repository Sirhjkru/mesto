const body = document.querySelector('body');
const form = document.querySelector('.popup_edit');
const buttonCloseForm = form.querySelector('.popup__image-button-close');
const place = document.querySelector('.popup_place');
const buttonClosePlace = place.querySelector('.popup__image-button-close');
const image = document.querySelector('.popup_form-disabled');
const buttonCloseImage = image.querySelector('.popup__image-button-close');
const imageTitle = image.querySelector('.popup__title');
const popupEditProfile = document.querySelector('.overlay_edit');
const popupAddCard = document.querySelector('.overlay_place');
const popupImage = document.querySelector('.overlay_image');
const overlays = document.querySelectorAll('.overlay');
const editButton = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__image-button-close');
const nameInput = form.elements.name;
const jobInput = form.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const photoGridElements = document.querySelector('.photo-grid__elements');
const popupImageCard = image.querySelector('.popup__image');
const itemTemplate = document.querySelector('.template').content;
const formElements = Array.from(overlays).filter(elem => {if (elem !== popupImage){return elem}});

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
  enableValidation()
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

renderInitialCards();
form.addEventListener('submit', editProfileHandler);
place.addEventListener('submit', addCardHandler);
editButton.addEventListener('click', () => {
  openPopup(popupEditProfile); 
  fillEditProfileFormFields();
  enableValidation();
  closeOverlayOnClickEsc(popupEditProfile)
  closeOverlayOnClickMouse(popupEditProfile)
}); 
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  enableValidation();
  closeOverlayOnClickEsc(popupAddCard)
  closeOverlayOnClickEsc(popupAddCard)
  closeOverlayOnClickMouse(popupAddCard)
});
buttonCloseForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
buttonClosePlace.addEventListener('click', () => {closePopup(popupAddCard); clearInputPlace();});
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
