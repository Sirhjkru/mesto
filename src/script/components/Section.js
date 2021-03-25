export class Section {
  constructor({render}, elemSelector) {
    this._render = render;
    this._container = document.querySelector(elemSelector);
  }
  renderer(items) {
    items.forEach((item) => {
      this._render(item);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }
}
