import "./index.css";
import { initialCards } from "../script/utils/cards-list.js";
import { Card } from "../script/components/Card.js";
import { FormValidator } from "../script/components/FormValidator.js";
import {
  profileForm,
  place,
  popupEditProfile,
  popupAddCard,
  cardTemplate,
  popupImage,
  photoContainerSelector,
  profileEditButton,
  profileAddButton,
  nameInput,
  jobInput,
  validationConfig,
  editFormConfig,
} from "../script/utils/constants.js";
import { Section } from "../script/components/Section.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";

const openPopupImage = new PopupWithImage(popupImage);
openPopupImage.setEventListeners();

const createCard = (item) => {
  return new Card(
    cardTemplate,
    {
      openPopup: () => {
        openPopupImage.open(item);
      },
    },
    item
  );
};

const createCardList = (cards) => {
  return new Section(
    {
      items: cards,
      render: (element) => {
        createCardList().addItem(createCard(element).getView());
      },
    },
    photoContainerSelector
  );
};
const userInfo = new UserInfo(editFormConfig);

createCardList(initialCards).renderer();

const popupWithProfile = new PopupWithForm(popupEditProfile, profileForm, {
  handleFormSubmit: (input) => {
    userInfo.setUserInfo(input);
  },
});
popupWithProfile.setEventListeners();

const popupWithPlace = new PopupWithForm(popupAddCard, place, {
  handleFormSubmit: ({ designation: name, link }) => {
    createCardList().addItem(createCard({ name, link }).getView());
  },
});
popupWithPlace.setEventListeners();

profileEditButton.addEventListener("click", () => {
  addEditFormValidator.setDefaultForm();
  const info = userInfo.getUserInfo()
  nameInput.value = info.name;
  jobInput.value = info.job; 
  popupWithProfile.open();
});

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.setDefaultForm();
  popupWithPlace.open();
});

const addCardFormValidator = new FormValidator(validationConfig, popupAddCard);
addCardFormValidator.enableValidation();

const addEditFormValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
addEditFormValidator.enableValidation();
