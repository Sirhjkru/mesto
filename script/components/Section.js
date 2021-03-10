export class Section {
  constructor({ items, render }, elemSelector) {
    this._renderedItems = items;
    this._render = render;
    this._container = document.querySelector(elemSelector);
  }
  renderer() {
    this._renderedItems.forEach((item) => {
      this._render(item);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }
}
