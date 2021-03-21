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
  popupAvatarUpdate,
  popupWarning,
  profileUpdateAvatar,
  avatarUpdate,
  avatarImg,
  warning,
  apiConfig,
} from "../script/utils/constants.js";
import { Section } from "../script/components/Section.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { enableIconEdit } from "../script/utils/utils.js";
import { Api } from "../script/components/Api.js";

const api = new Api(apiConfig);

api.getInitialCards().then((data) => {
  createCardList(api, data.reverse()).renderer();
});

const openPopupImage = new PopupWithImage(popupImage);
openPopupImage.setEventListeners();

const openPopupAvatarForm = new PopupWithForm(popupAvatarUpdate, avatarUpdate, {
  handleFormSubmit: (items) => {
    console.log(items);
  },
});

const openWarning = new PopupWithForm(popupWarning, warning, {});
openPopupAvatarForm.setEventListeners();

const createCard = (item, info) => {
  return new Card(
    cardTemplate,
    {
      openPopup: () => {
        openPopupImage.open(item);
      },
    },
    item,
    api,
    info,
    openWarning
  );
};

const createCardList = (api, cards) => {
  return new Section(
    {
      items: cards,
      render: (element) => {
          api.getUser().then((info) => {
            createCardList().addItem(createCard(element, info).getView());
          })
        ;
      },
    },
    photoContainerSelector
  );
};
const userInfo = new UserInfo(editFormConfig);


//Проверить правильность работы функции
api.getUser().then((data) => {
  avatarImg.setAttribute("src", data.avatar);
  userInfo.setUserInfo(data);
});

const popupWithProfile = new PopupWithForm(popupEditProfile, profileForm, {
  handleFormSubmit: (input) => {
    userInfo.setUserInfo(input);
  },
});
popupWithProfile.setEventListeners();

//Создаем карточку из формы
const popupWithPlace = new PopupWithForm(popupAddCard, place, {
  handleFormSubmit: ({ designation: name, link }) => {
    api.addCard({ name, link }).then((item) => {
      api.getUser().then((info) => {
        createCardList().addItem(createCard(item, info).getView());
      })
    });
  },
});
popupWithPlace.setEventListeners();

profileUpdateAvatar.addEventListener("click", () => {
  addCardFormValidator.setDefaultForm();
  openPopupAvatarForm.open();
});

profileEditButton.addEventListener("click", () => {
  addEditFormValidator.setDefaultForm();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupWithProfile.open();
});

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.setDefaultForm();
  popupWithPlace.open();
});

const addUpdateFormAvatar = new FormValidator(
  validationConfig,
  popupAvatarUpdate
);
addUpdateFormAvatar.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, popupAddCard);
addCardFormValidator.enableValidation();

const addEditFormValidator = new FormValidator(
  validationConfig,
  popupEditProfile
);
addEditFormValidator.enableValidation();

enableIconEdit();
