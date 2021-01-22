const body = document.querySelector('body');
const form = document.forms.popup;
const place = document.forms.place;
const image = document.forms.image;
const overlayEdit = document.querySelector('#edit');
const overlayPlace = document.querySelector('#place');
const overlayImage = document.querySelector('#image');
let overlay = document.querySelectorAll('.overlay');
const editButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelectorAll('.popup__image-button-close');
const nameInput = form.elements.name;
const jobInput = form.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const photoGridElements = document.querySelector('.photo-grid__elements');
const popupImage = image.querySelector('.popup__image');
const itemTemplate = document.querySelector('.template').content;
const popup = document.querySelectorAll('.popup');
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
  openOverlayimage();
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
  disOverlay ();
}

function photoLike (evt) {
  evt.target.classList.toggle('photo-grid__button-like_active');
}

function disOverlay () {
  overlayEdit.classList.remove('overlay_popup-opened');
  overlayPlace.classList.remove('overlay_popup-opened');
  overlayImage.classList.remove('overlay_popup-opened');
}

function openOverlayEdit () {
  overlayEdit.classList.add('overlay_popup-opened');
}

function openOverlayPlace () {
  overlayPlace.classList.add('overlay_popup-opened');
}

function openOverlayimage () {
  overlayImage.classList.add('overlay_popup-opened');
}

function popupOpened () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

popupClose.forEach((item) => {
  item.addEventListener('click', () => {
    disOverlay ();
  })
})

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    disOverlay ();
}

overlay.forEach((item) => {
  item.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget){
      disOverlay ();
    }
  })
})

body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 27) {
    disOverlay ();
  }
})

function deleteElement (evt) {
  evt.target.closest('.photo-grid__element').remove();
}

render();
form.addEventListener('submit', handleFormSubmit);
place.addEventListener('submit', hendlerSubmit);
editButton.addEventListener('click', openOverlayEdit); 
editButton.addEventListener('click', popupOpened); 
addButton.addEventListener('click', openOverlayPlace);