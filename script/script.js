const profileForm = document.querySelector('.popup_edit');
const place = document.querySelector('.popup_place');
const image = document.querySelector('.popup_form-disabled');
const popupEditProfile = document.querySelector('.overlay_edit');
const popupAddCard = document.querySelector('.overlay_place');
const popupImage = document.querySelector('.overlay_image');
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupImageCard = image.querySelector('.popup__image');
const itemTemplate = document.querySelector('.template').content;
const popups = document.querySelectorAll('.overlay');
const imageTitle = image.querySelector('.popup__title');

function clearInputPlace () {
  designation.value = "";
  url.value = "";
}

function closePopup(popup) {
  popup.classList.remove('overlay_popup-opened');
  document.removeEventListener('keydown', closeByEscape); 
} 

function fillEditProfileFormFields () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
  popup.classList.add('overlay_popup-opened');
  document.addEventListener('keydown', closeByEscape); 
}

function deleteElement (evt) {
  evt.target.closest('.photo-grid__element').remove();
}

function photoLike (evt) {
  evt.target.classList.toggle('photo-grid__button-like_active');
}

function openImage (item) {
  openPopup(popupImage);
  popupImageCard.setAttribute('src', item.link);
  popupImageCard.setAttribute('alt', item.name);
  imageTitle.innerText = item.name;
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
  listenerImage(photoGridImage, item)
  return photoGridElement
}

function listenerImage (elem, item) {
  elem.addEventListener('click', () => {openImage(item)})
}

function listenerButtonLike (elem) {
  elem.addEventListener('click', photoLike);
}

function listenerButtonDelete (elem) {
  elem.addEventListener('click', deleteElement);
}

function addCard (elem) {
  document.querySelector('.photo-grid__elements').prepend(elem);
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

function disableErrorMessage (popup) {
  popup.querySelectorAll('.popup__input').forEach((elem) => {
    elem.classList.remove('popup__input_error');
  })
  popup.querySelectorAll('.popup__input-error').forEach((elem) => {
    elem.innerText = ''
  })
}

function disableButtonSubmit (popup) {
  const buttonSubmit = popup.querySelector('.popup__button-save')
  buttonSubmit.setAttribute('disabled', true)
  buttonSubmit.classList.add('popup__button-save_inactive')
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.overlay_popup-opened')
    closePopup(openedPopup);
  }
}

renderInitialCards();

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('overlay_popup-opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__image-button-close')) {
          closePopup(popup);
        }
    })
})

profileForm.addEventListener('submit', editProfileHandler);
place.addEventListener('submit', addCardHandler);
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  openPopup(popupEditProfile); 
  disableErrorMessage(popupEditProfile)
  disableButtonSubmit(popupEditProfile)
  fillEditProfileFormFields();
}); 
document.querySelector('.profile__add-button').addEventListener('click', () => {
  clearInputPlace();
  disableErrorMessage(popupAddCard)
  disableButtonSubmit(popupAddCard)
  openPopup(popupAddCard);
});