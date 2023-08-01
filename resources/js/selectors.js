class Selectors {
  static query(selector) {
    return document.querySelector(selector);
  }

  static queryAll(selector) {
    return document.querySelectorAll(selector);
  }

  static canvas() {
    return this.query('main');
  }
}
