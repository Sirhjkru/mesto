export const profileForm = document.querySelector(".popup_edit");
export const place = document.querySelector(".popup_place");
export const popupEditProfile = document.querySelector(".overlay_edit");
export const popupAddCard = document.querySelector(".overlay_place");
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