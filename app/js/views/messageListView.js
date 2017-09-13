import $ from "jquery";
import View from "../lib/view";

export default class MessageListView extends View {
  constructor() {
    super();
    this.wrapper = $(".content");
    this.contentInfoMsg = this.wrapper.find(".content__msg");
    this.msgList = this.wrapper.find(".msg-list");
    this.newMsgForm = this.wrapper.find(".form");
  }

  hideEmptyList() {
    this.contentInfoMsg.addClass("hidden");
  }

  showEmptyList() {
    this.contentInfoMsg.removeClass("hidden");
  }

  clearMessageList() {
    this.clear(this.msgList);
  }

  appendMessage(item) {
    this.msgList.append(item);
  }

  removeFromList(id) {
    this.msgList.find(`[data-id=${id}]`).remove();
  }

  changeAllCheckboxes(value) {
    const checkboxes = this.msgList.find(".msg-item__checkbox");
    Array.from(checkboxes).forEach((item) => {
      $(item).prop("checked", value);
    });
  }

  showNewMsgForm() {
    this.newMsgForm.addClass("form--active");
  }
}
