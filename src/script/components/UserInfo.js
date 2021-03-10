import {
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
} from "../utils/constants.js";
export class UserInfo {
  constructor({ name, job }) {
    this._userName = name;
    this._infoUser = job;
  }
  getUserInfo() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  setUserInfo() {
    profileTitle.textContent = this._userName
    profileSubtitle.textContent = this._infoUser
  }
}
