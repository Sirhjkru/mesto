export class UserInfo {
  constructor({ selectorUserName, selectorUserDescription }) {
    this._userName = document.querySelector(selectorUserName);
    this._userjob = document.querySelector(selectorUserDescription);
  }
  getUserInfo() {
    return { name: this._userName.textContent, job: this._userjob.textContent };
  }
  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userjob.textContent = job;
  }
}
