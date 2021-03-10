import { initialCards } from "./utils/cards-list.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import {
  profileForm,
  place,
  popupEditProfile,
  popupAddCard,
  formElements,
} from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";


const cardList = (item) => {
  return new Card(
    document.querySelector(".template").content,
    {
      openPopup: () => {
        const openPopup = new PopupWithImage(
          document.querySelector(".overlay_image")
        );
        openPopup.open(item);
      },
    },
    item
  );
};

const renderInitialCards = (cards) => {
  return new Section(
    {
      items: cards,
      render: (element) => {
        renderInitialCards().addItem(cardList(element).getView());
      },
    },
    ".photo-grid__elements"
  );
};
const userInfo = (item) => {return new UserInfo (item)}

renderInitialCards(initialCards).renderer();

const popupWithProfile = new PopupWithForm(popupEditProfile, profileForm, {
  handleFormSubmit: (input) => {
    userInfo(input).setUserInfo();
  },
});
popupWithProfile.setEventListeners();

const popupWithPlace = new PopupWithForm(popupAddCard, place, {
  handleFormSubmit: ({ designation: name, link }) => {
    renderInitialCards().addItem(cardList({ name, link }).getView());
  },
});
popupWithPlace.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    userInfo({}).getUserInfo()
    popupWithProfile.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupWithPlace.open();
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