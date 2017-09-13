import $ from "jquery";
import View from "../lib/view";
import messageTemplate from "../../templates/partials/message.pug";

export default class MessageListView extends View {
  constructor() {
    super();
    this.msgList = $(".msg-list");
  }

  renderMessageList(data) {
    this.clear(this.msgList);
    data.forEach(msg => this.appendMessage({ msg }));
  }

  appendMessage(data) {
    this.msgList.append(this.render(messageTemplate, data));
  }
}
