let overlay = document.querySelector('.overlay');
let editButton = document.querySelector('.profile__edit-button');
let close = overlay.querySelector('.popup__close');
let definition = overlay.querySelector('.popup__definition');
let definitionLow = overlay.querySelector('.popup__definition_low');
let in_1 = overlay.querySelector('#in_1');
let in_2 = overlay.querySelector('#in_2');
let saveButton = overlay.querySelector('.popup__button-save');
let photoGridHeart = document.querySelectorAll('.photo-grid__heart')

 
photoGridHeart.forEach((item) => {
  item.addEventListener('click', () => {
    item.src = './images/title-heart-black.png'
  })
})

editButton.addEventListener("click", () => {
  overlay.style.display = 'block';
})


function textEdit (inspector, edit) {
  inspector.addEventListener('focus', () => {
    edit.style.display = 'None';
  })
  inspector.addEventListener('focusout', () => {
    if (inspector.value === '') {
      edit.style.display = 'block';
    }
  })
}


close.addEventListener("click", () => {
  if (in_1.value != '' || in_2.value != '') {
      saveButton.style.border = '2px solid red';
  }else{
    saveButton.style.border = 'none';
    overlay.style.display = 'none';
  }
})

textEdit (in_1, definition);
textEdit (in_2, definitionLow);


