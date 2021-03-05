export default class Section {
  constructor({ item, render }, selector) {
    this._item = item;
    this._render = render;
    this._selector = document.querySelector(selector);
  }
  renderer() {};
  addItem() {};
}