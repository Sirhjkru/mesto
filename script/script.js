let body = document.querySelector('body');
let form = document.forms.popup;
let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = overlay.querySelector('.popup__image-button-close');
let photoGridLike = document.querySelectorAll('.photo-grid__button-like');
let formElement = document.querySelector('.popup__button-save');
let nameInput = form.elements.nameInput;
let jobInput = form.elements.jobInput;
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');



photoGridLike.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('photo-grid__button-like_active');
  })
})


function openPopup() {
  overlay.classList.add('overlay_popup-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};


function closePopup() {
  overlay.classList.remove('overlay_popup-opened');
};


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    overlay.classList.remove('overlay_popup-opened');
}


overlay.addEventListener("mousedown", (event) => {
  if (event.target === event.currentTarget){
    overlay.classList.remove('overlay_popup-opened');
  }
})


body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 27) {
    overlay.classList.remove('overlay_popup-opened');
  }
})


form.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup); 
popupClose.addEventListener('click', closePopup); 
