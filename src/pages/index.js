import "./index.css";
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
  avatarUpdate,
  avatarImg,
  warning,
  apiConfig,
  avatarForm,
} from "../script/utils/constants.js";
import { Section } from "../script/components/Section.js";
import { PopupCardDelete } from "../script/components/PopupCardDelete.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { enableIconEdit } from "../script/utils/utils.js";
import { Api } from "../script/components/Api.js";

const api = new Api(apiConfig);
const userInfo = new UserInfo(editFormConfig);


const openPopupImage = new PopupWithImage(popupImage);
openPopupImage.setEventListeners();

const openPopupAvatarForm = new PopupWithForm(popupAvatarUpdate, avatarUpdate, {
  handleFormSubmit: (items) => {
    api.updateAvatar(items).then((data) => {
      userInfo.setImgAvatar(avatarImg, data);
    });
  },
});
openPopupAvatarForm.setEventListeners();

const openWarning = new PopupCardDelete(popupWarning, warning);
openWarning.setEventListeners();

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


api.getInitialCards().then((data) => {
  createCardList(api, data.reverse()).renderer();
});

//Проверить правильность работы функции
api.getUser().then((data) => {
  avatarImg.setAttribute("src", data.avatar);
  userInfo.setUserInfo(data);
});
//Добавлние информации о юзере
const popupWithProfile = new PopupWithForm(popupEditProfile, profileForm, {
  handleFormSubmit: (input) => {
    api.editProfile(input).then(data => {
      userInfo.setUserInfo(data);})
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

avatarForm.addEventListener("click", () => {
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
