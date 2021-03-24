export class Section {
  constructor({render}, elemSelector) {
    this._render = render;
    this._container = document.querySelector(elemSelector);
  }
  renderer(items) {
    items[0].forEach((item) => {
      this._render(item, items[1]);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }
}
