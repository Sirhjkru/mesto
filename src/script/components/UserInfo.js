export class UserInfo {
  constructor({ selectorUserName, selectorUserDescription }) {
    this._userName = document.querySelector(selectorUserName);
    this._userjob = document.querySelector(selectorUserDescription);
    this._profileForm = document.querySelector(".popup_edit");
    this._nameInput = this._profileForm.elements.name;
    this._jobInput = this._profileForm.elements.job;
  }
  getUserInfo() {
    return { name: this._userName.textContent, job: this._userjob.textContent };
  }
  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userjob.textContent = job;
    this._nameInput.value = name;
    this._jobInput.value = job;
  }
}
