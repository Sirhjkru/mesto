import { initialCards } from "./cards-list.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const profileForm = document.querySelector(".popup_edit");
const place = document.querySelector(".popup_place");
const image = document.querySelector(".popup_form-disabled");
const popupEditProfile = document.querySelector(".overlay_edit");
const popupAddCard = document.querySelector(".overlay_place");
const popupImage = document.querySelector(".overlay_image");
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.job;
const designation = place.elements.designation;
const url = place.elements.link;
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupImageCard = image.querySelector(".popup__image");
const popups = document.querySelectorAll(".overlay");
const imageTitle = image.querySelector(".popup__title");
const formElements = Array.from(document.querySelectorAll(".overlay"));

function clearInputPlace() {
  designation.value = "";
  url.value = "";
}

function closePopup(popup) {
  popup.classList.remove("overlay_popup-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function fillEditProfileFormFields() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openPopup(popup) {
  popup.classList.add("overlay_popup-opened");
  document.addEventListener("keydown", closeByEscape);
}

const cardList = new Card(
  ".photo-grid__elements",
  document.querySelector(".template").content,
  openImage
);

function openImage(item) {
  openPopup(popupImage);
  popupImageCard.setAttribute("src", item.link);
  popupImageCard.setAttribute("alt", item.name);
  imageTitle.innerText = item.name;
}

function addCard(elem) {
  document.querySelector(".photo-grid__elements").prepend(elem);
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    addCard(cardList.getView(item));
  });
}

function addCardHandler(evt) {
  evt.preventDefault();
  const item = {
    name: designation.value,
    link: url.value,
  };
  addCard(cardList.getView(item));
  closePopup(popupAddCard);
  clearInputPlace();
}

function editProfileHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function disableErrorMessage(popup) {
  popup.querySelectorAll(".popup__input").forEach((elem) => {
    elem.classList.remove("popup__input_error");
  });
  popup.querySelectorAll(".popup__input-error").forEach((elem) => {
    elem.innerText = "";
  });
}

function disableButtonSubmit(popup) {
  const buttonSubmit = popup.querySelector(".popup__button-save");
  buttonSubmit.setAttribute("disabled", true);
  buttonSubmit.classList.add("popup__button-save_inactive");
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".overlay_popup-opened");
    closePopup(openedPopup);
  }
}

renderInitialCards();

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("overlay_popup-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__image-button-close")) {
      closePopup(popup);
    }
  });
});

profileForm.addEventListener("submit", editProfileHandler);
place.addEventListener("submit", addCardHandler);
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    openPopup(popupEditProfile);
    disableErrorMessage(popupEditProfile);
    disableButtonSubmit(popupEditProfile);
    fillEditProfileFormFields();
  });
document.querySelector(".profile__add-button").addEventListener("click", () => {
  clearInputPlace();
  disableErrorMessage(popupAddCard);
  disableButtonSubmit(popupAddCard);
  openPopup(popupAddCard);
});

formElements.forEach((formElement) => {
  const validation = new FormValidator(
    {
      fieldSetSelector: ".form-set",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button-save",
      inactiveButtonClass: "popup__button-save_inactive",
      inputErrorClass: "popup__input_error",
    },
    formElement
  );
  validation.enableValidation();
});
