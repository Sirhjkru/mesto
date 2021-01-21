const body = document.querySelector('body');
const form = document.forms.popup;
const place = document.forms.place;
const image = document.forms.image;
const overlay = document.querySelector('.overlay');
const editButton = document.querySelector('.profile__edit-button');
const popupClose = overlay.querySelectorAll('.popup__image-button-close');
const nameInput = form.elements.name;
const jobInput = form.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const photoGridElements = document.querySelector('.photo-grid__elements');
const popupImage = image.querySelector('.popup__image');
const itemTemplate = document.querySelector('.item_template').content;
const popup = document.querySelector('.popup');
let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  }
];

function enablePopup (name) {
  name.classList.add('popup_opened');
}

function disPopup (name) {
  name.classList.remove('popup_opened');
}
  

function render () {
  initialCards.forEach(renderItem);
};

function renderItem(item) {
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.photo-grid__image').setAttribute("src", item.link);
  htmlElement.querySelector('.photo-grid__image').setAttribute("alt", item.name);
  htmlElement.querySelector('.photo-grid__title').innerText = item.name;
  htmlElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteElement);
  htmlElement.querySelector('.photo-grid__button-like').addEventListener('click', photoLike);
  htmlElement.querySelector('.photo-grid__image').addEventListener('click', openImage)
  photoGridElements.prepend(htmlElement);
}

function openImage (evt) {
  openOverlay();
  enablePopup(image, 1)
  popupImage.setAttribute('src', evt.target.src)
  let name = evt.target.offsetParent.querySelector('.photo-grid__title').innerText
  image.querySelector('.popup__title').innerText = name
}

function hendlerSubmit(evt) {
  evt.preventDefault();
  if (designation.value !== '' || url.value !== '') {
    let item =
      {
        name: designation.value,
        link: url.value
      }
    renderItem(item)
  }
  overlay.classList.remove('overlay_popup-opened');
  disPopup(place);
}

function photoLike (evt) {
  evt.target.classList.toggle('photo-grid__button-like_active');
}

function openOverlay () {
  overlay.classList.add('overlay_popup-opened');
}

function popupOpened () {
  enablePopup(form)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function placeOpened () {
  enablePopup(place)
}

popupClose.forEach((item) => {
  item.addEventListener('click', () => {
    overlay.classList.remove('overlay_popup-opened');
    disPopup(place);
    disPopup(form);
    disPopup(image);
  })
})

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    overlay.classList.remove('overlay_popup-opened');
    disPopup(form);
    disPopup(image);
}

overlay.addEventListener("mousedown", (event) => {
  if (event.target === event.currentTarget){
    overlay.classList.remove('overlay_popup-opened');
    disPopup(place);
    disPopup(form);
    disPopup(image);
  }
})

body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 27) {
    overlay.classList.remove('overlay_popup-opened');
    disPopup(place);
    disPopup(form);
    disPopup(image);
  }
})

function deleteElement (evt) {
  evt.target.closest('.photo-grid__element').remove();
}

render();
form.addEventListener('submit', handleFormSubmit);
place.addEventListener('submit', hendlerSubmit);
editButton.addEventListener('click', openOverlay); 
editButton.addEventListener('click', popupOpened); 
addButton.addEventListener('click', openOverlay);
addButton.addEventListener('click', placeOpened);