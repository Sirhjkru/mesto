export class UserInfo {
  constructor({ selectorUserName, selectorUserDescription, selctorAvatarImg }) {
    this._userName = document.querySelector(selectorUserName);
    this._userjob = document.querySelector(selectorUserDescription);
    this._avatarImg = document.querySelector(selctorAvatarImg);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userjob.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userjob.textContent = about;
  }
  setImgAvatar(link) {
    this._avatarImg.setAttribute("src", `${link}`);
  }
}
