import Controller from "../lib/controller";
import { notification, Notifications } from "../shared/notifications";

class MessageController extends Controller {
  constructor() {
    super();
    this.msg = this.wrapper.find(".msg-item");
    this.actionLink = this.msg.find(".msg-link");
    this.msgCheckbox = this.wrapper.find(".msg-item__checkbox");
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
      this.moveToStarred(id);
    }
    if (link.hasClass("msg-link--back")) {
      this.moveToInbox(id);
    }
    if (link.hasClass("msg-link--remove")) {
      this.moveToDeleted(id);
    }
  }

  toggleMessage(link, msg) {
    msg.find(".msg-item__text").stop(true, true).slideToggle();
    link.toggleClass("msg-link--open");
  }

  moveToStarred(id) {
    const item = this.model.get(id);
    const currentMsg = this.wrapper.find(`[data-id=${id}]`);
    const starIcon = currentMsg.find(".msg-link--star");

    if (!item.starred) {
      item.status.push("starred");
      notification.show("Status changed!");
    }
    if (item.starred) {
      const index = item.status.indexOf("starred");
      if (index > -1) {
        item.status.splice(index, 1);
        notification.show("Status changed!");
      }

      if (window.location.pathname == "/starred") {
        currentMsg.remove();
      }
    }

    starIcon.toggleClass("msg-link--marked");
    this.model.update(id, "starred");
  }

  moveToInbox(id) {
    const changePropArr = ["inbox", "deleted"];
    this.moveTo(id, changePropArr, "inbox");
    notification.show("Back to inbox!");
  }

  moveToDeleted(id) {
    const changePropArr = ["deleted", "inbox", "starred"];
    this.moveTo(id, changePropArr, "deleted");
    notification.show("Moved to trash!");
  }

  checkedMessages() {
    const arr = [];
    Array.from(this.msgCheckbox).forEach(checkbox => {
      if ($(checkbox).is(":checked")) {
        arr.push(checkbox);
      }
    });
    return arr;
  }

  changeMessageCheckbox(value) {
    console.log(this.msgCheckbox);
    this.msgCheckbox.prop("checked", value);
  }
}

const msgController = new MessageController();
export { msgController, MessageController };