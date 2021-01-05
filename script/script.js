let body = document.querySelector('body')
let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.profile__edit-button');
let close = overlay.querySelector('.popup__close');
let definition = overlay.querySelector('.popup__definition');
let definitionLow = overlay.querySelector('.popup__definition_low');
let photoGridLike = document.querySelectorAll('.photo-grid__button-like')
let formElement = document.querySelector('.popup__button-save')
let nameInput = overlay.querySelector('#nameInput');
let jobInput = overlay.querySelector('#jobInput');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

definition.innerText = profileTitle.innerText;
definitionLow.innerText = profileSubtitle.innerText;


photoGridLike.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('photo-grid__button-like_active');
  })
})


editButton.addEventListener("click", () => {
  overlay.style.display = 'block';
})


close.addEventListener("click", () => {
    overlay.style.display = 'none';
})


overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget){
    overlay.style.display = 'none';
  }
})


function handleFormSubmit (event) {
    event.preventDefault(); 
    if (nameInput.value == '') {
      profileTitle.textContent = definition.innerText;
    }else{
      profileTitle.textContent = nameInput.value;
    }
    if (jobInput.value == '') {
      profileSubtitle.textContent = definitionLow.innerText;
    }else{
      profileSubtitle.textContent = jobInput.value;
    }
    overlay.style.display = 'none';
}


function textEdit (inspector, edit) {
  inspector.addEventListener('focus', () => {
    edit.style.display = 'None';
  })
  inspector.addEventListener('focusout', () => {
    if (inspector.value == '') {
      edit.style.display = 'block';
    }
  })
}


textEdit (nameInput, definition);
textEdit (jobInput, definitionLow);


body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if ((event.keyCode === 27) && (overlay.style.display = 'block')) {
    overlay.style.display = 'none';
  }
})


body.addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    handleFormSubmit(event);
  }
})


formElement.addEventListener('click', handleFormSubmit)
