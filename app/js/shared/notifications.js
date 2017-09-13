export default class Notifications {
  constructor(el) {
    this.notifyElement = el;
  }

  show(message) {
    this.notifyElement.text(message).addClass("notification--active");
    setTimeout(() => {
      this.hide();
    }, 3500);
  }

  hide() {
    this.notifyElement.removeClass("notification--active");
  }
}

// const notification = new Notifications($(".notification"))
