const body = document.querySelector('body');
const form = document.forms.popup;
const place = document.forms.place;
const overlay = document.querySelector('.overlay');
const popup = overlay.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupClose = overlay.querySelectorAll('.popup__image-button-close');
const formElement = document.querySelector('.popup__button-save');
const nameInput = form.elements.name;
const jobInput = form.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const photoGridElements = document.querySelector('.photo-grid__elements');
const itemTemplate = document.querySelector('.item_template').content;
let deleteButton;
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

function openImage () {
  openOverlay();
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
  place.classList.remove('popup_opened');
}

function photoLike (evt) {
  evt.target.classList.toggle('photo-grid__button-like_active');
}

function openOverlay () {
  overlay.classList.add('overlay_popup-opened');
}

function popupOpened () {
  form.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function placeOpened () {
  place.classList.add('popup_opened');
}


popupClose.forEach((item) => {
  item.addEventListener('click', () => {
    overlay.classList.remove('overlay_popup-opened');
    form.classList.remove('popup_opened');
    place.classList.remove('popup_opened');
  })
})


function handleFormSubmit (evt) {
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






// function placeHandlerFormSubmit (evt) {
//   evt.preventDefault();
//   if (designation.value !== '' || url.value !== '') {
//     initialCards.unshift(
//       {
//         name: designation.value,
//         link: url.value
//       }
//     )
//     photoGridElements.insertAdjacentHTML('afterbegin', `
//     <li class="photo-grid__element">
//       <img src=${url.value} class="photo-grid__image" alt="Фото ${designation.value}">
//       <div class="photo-grid__container">
//         <h2 class="photo-grid__title">${designation.value}</h2>
//         <button class="photo-grid__button-like" type="button"></button>
//       </div>
//       <img src='./images/delete-button.svg' class="photo-grid__delete-button" alt="кнопка 'Удалить'">
//     </li>
//     `)
//     photoGridLike = document.querySelectorAll('.photo-grid__button-like');
//     deleteButton = document.querySelectorAll('.photo-grid__delete-button');
//     photoLike();
//     deleteElement()
//   }
  // overlay.classList.remove('overlay_popup-opened');
  // place.classList.remove('popup_opened');
// }


  // initialCards.forEach((item) => {
  //   photoGridElements.insertAdjacentHTML('beforeEnd', `
  //       <li class="photo-grid__element">
  //         <img src=${item.link} class="photo-grid__image" alt="Фото ${item.name}">
  //         <div class="photo-grid__container">
  //           <h2 class="photo-grid__title">${item.name}</h2>
  //           <button class="photo-grid__button-like" type="button"></button>
  //         </div>
  //         <img src='./images/delete-button.svg' class="photo-grid__delete-button" alt="кнопка 'Удалить'">
  //       </li>
  //   `)
  // })
  // photoGridLike = document.querySelectorAll('.photo-grid__button-like');
  // deleteButton = document.querySelectorAll('.photo-grid__delete-button');


  // 
// 