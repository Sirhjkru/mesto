let body = document.querySelector('body');
let form = document.forms.popup;
let place = document.forms.place;
let overlay = document.querySelector('.overlay');
let popup = overlay.querySelectorAll('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = overlay.querySelectorAll('.popup__image-button-close');
let formElement = document.querySelector('.popup__button-save');
let nameInput = form.elements.name;
let jobInput = form.elements.job;
let designation = place.elements.designation;
let url = place.elements.link;
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let addButton = document.querySelector('.profile__add-button');
let photoGridElements = document.querySelector('.photo-grid__elements');
// let deleteButton = document.querySelectorAll('.photo-grid__delete-button');
let photoGridLike;
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

let addPlace = () => {
  initialCards.forEach((item) => {
    photoGridElements.insertAdjacentHTML('beforeEnd', `
        <li class="photo-grid__element">
          <img src=${item.link} class="photo-grid__image" alt="Фото ${item.name}">
          <div class="photo-grid__container">
            <h2 class="photo-grid__title">${item.name}</h2>
            <button class="photo-grid__button-like" type="button"></button>
          </div>
          <img src='./images/delete-button.svg' class="photo-grid__delete-button" alt="кнопка 'Удалить'">
        </li>
    `)
  })
  photoGridLike = document.querySelectorAll('.photo-grid__button-like');
  deleteButton = document.querySelectorAll('.photo-grid__delete-button');
};

let photoLike = () => {
  photoGridLike.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('photo-grid__button-like_active');
    })
  })
}

let openOverlay = () => {
  overlay.classList.add('overlay_popup-opened');
}

let popupOpened = () => {
  form.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

let placeOpened = () => {
  place.classList.add('popup_opened');
}


popupClose.forEach((item) => {
  item.addEventListener('click', () => {
    overlay.classList.remove('overlay_popup-opened');
    form.classList.remove('popup_opened');
    place.classList.remove('popup_opened');
  })
})


let placeHandlerFormSubmit = (evt) => {
  evt.preventDefault();
  if (designation.value !== '' || url.value !== '') {
    initialCards.unshift(
      {
        name: designation.value,
        link: url.value
      }
    )
    photoGridElements.innerHTML = '';
    addPlace();
    photoLike();
  }
  overlay.classList.remove('overlay_popup-opened');
  place.classList.remove('popup_opened');
}

let handleFormSubmit = (evt) => {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    overlay.classList.remove('overlay_popup-opened');
    form.classList.remove('popup_opened');
}


overlay.addEventListener("mousedown", (event) => {
  if (event.target === event.currentTarget){
    overlay.classList.remove('overlay_popup-opened');
    form.classList.remove('popup_opened');
    place.classList.remove('popup_opened');
  }
})


body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 27) {
    overlay.classList.remove('overlay_popup-opened');
    form.classList.remove('popup_opened');
    place.classList.remove('popup_opened');
  }
})

// deleteButton.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//     console.log('hello')
//   })
// });

addPlace();
photoLike();

form.addEventListener('submit', handleFormSubmit);
place.addEventListener('submit', placeHandlerFormSubmit);
editButton.addEventListener('click', openOverlay); 
editButton.addEventListener('click', popupOpened); 
addButton.addEventListener('click', openOverlay);
addButton.addEventListener('click', placeOpened);

