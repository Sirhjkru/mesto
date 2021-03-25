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
  warning,
  apiConfig,
  avatarForm,
} from "../script/utils/constants.js";
import { Section } from "../script/components/Section.js";
import { PopupWithDeleteCard } from "../script/components/PopupWithDeleteCard.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { enableIconEdit } from "../script/utils/utils.js";
import { Api } from "../script/components/Api.js";
let userId;

const api = new Api(apiConfig);
const userInfo = new UserInfo(editFormConfig);

const openPopupImage = new PopupWithImage(popupImage);
openPopupImage.setEventListeners();

const openPopupAvatarForm = new PopupWithForm(popupAvatarUpdate, avatarUpdate, {
  handleFormSubmit: (items) => {
    api
      .updateAvatar(items)
      .then((data) => {
        userInfo.setImgAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        openPopupAvatarForm.renderLoading(false);
        openPopupAvatarForm.close();
      });
  },
});
openPopupAvatarForm.setEventListeners();

const openWarning = new PopupWithDeleteCard(popupWarning, warning);
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

const createCardList = new Section(
  {
    render: (items) => {
      createCardList.addItem(createCard(items, userId).getView());
    },
  },
  photoContainerSelector
);
Promise.all([api.getInitialCards(), api.getUser()])
  .then((res) => {
    userId = res[1]._id;
    createCardList.renderer(res[0]);
    userInfo.setUserInfo(res[1]);
    userInfo.setImgAvatar(res[1].avatar);
  })
  .catch((err) => {
    console.log(err);
  });

//Добавлние информации о юзере
const popupWithProfile = new PopupWithForm(popupEditProfile, profileForm, {
  handleFormSubmit: (input) => {
    api
      .editProfile(input)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithProfile.close();
        popupWithProfile.renderLoading(false);
      });
  },
});
popupWithProfile.setEventListeners();

//Создаем карточку из формы
const popupWithPlace = new PopupWithForm(popupAddCard, place, {
  handleFormSubmit: ({ designation: name, link }) => {
    api
      .addCard({ name, link })
      .then((item) => {
            createCardList.addItem(createCard(item, userId).getView());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithPlace.close();
        popupWithPlace.renderLoading(false);
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
