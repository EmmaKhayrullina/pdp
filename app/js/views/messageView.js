import $ from "jquery";
import View from "../lib/view";
import Notifications from "../shared/notifications";

export default class MessageView extends View {
  constructor() {
    super();
    this.msg = $(".msg-item");
    this.actionLink = this.msg.find(".msg-link");
    this.msgCheckbox = this.msg.find(".msg-item__checkbox");
    this.notification = new Notifications($(".notification"));
    this.setUpListeners();
  }

  setUpListeners() {
    this.actionLink.on("click", this.msgActions.bind(this));
  }

  msgActions(e) {
    e.preventDefault();
    const link = $(e.target);
    const msg = link.closest(".msg-item");
    const id = msg.data("id");

    if (link.hasClass("msg-link--toggle")) {
      this.toggleMessage(link, msg);
    }
    if (link.hasClass("msg-link--star")) {
      this.emit("message:star", id);
    }
    if (link.hasClass("msg-link--back")) {
      this.emit("message:inbox", id);
    }
    if (link.hasClass("msg-link--remove")) {
      this.emit("message:delete", id);
    }
  }

  toggleMessage(link, msg) {
    msg.find(".msg-item__text").stop(true, true).slideToggle();
    link.toggleClass("msg-link--open");
  }

  markCurrentMgs(id) {
    let msg = $(`[data-id=${id}]`);
    let starIcon = msg.find(".msg-link--star");
    starIcon.toggleClass("msg-link--marked");
  }

  removeItem(id) {
    $(`[data-id=${id}]`).remove();
  }

  checkedMessages() {
    return Array.from(this.msgCheckbox).filter(checkbox => {
      if ($(checkbox).is(":checked")) {
        return checkbox;
      }
    });
  }

  changeMessageCheckbox(value) {
    this.msgCheckbox.prop("checked", value);
  }
}
