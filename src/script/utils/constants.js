export const profileForm = document.querySelector(".popup_edit");
export const place = document.querySelector(".popup_place");
export const popupEditProfile = document.querySelector(".overlay_edit");
export const popupAddCard = document.querySelector(".overlay_place");
export const popupAvatarUpdate = document.querySelector(".overlay_avatar");
export const avatarUpdate = document.querySelector(".popup_avatar");
export const popupWarning = document.querySelector(".overlay_warning");
export const warning = document.querySelector(".popup_warning");
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.about;
export const avatarForm = document.querySelector(".profile__avatar-form");
export const avatarImg = avatarForm.querySelector(".profile__avatar");
export const avatarBtnEdit = avatarForm.querySelector(
  ".profile__avatar-button-edit"
);
export const cardTemplate = document.querySelector(".template").content;
export const popupImage = document.querySelector(".overlay_image");
export const photoContainerSelector = ".photo-grid__elements";
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const validationConfig = {
  fieldSetSelector: ".form-set",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input_error",
};

export const editFormConfig = {
  selectorUserName: ".profile__title",
  selectorUserDescription: ".profile__subtitle",
  selctorAvatarImg: ".profile__avatar",
};

export const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-21",
  headers: {
    authorization: "31bbe037-e04a-4b38-8826-f28fc60ec73b",
    "Content-Type": "application/json",
  },
};
