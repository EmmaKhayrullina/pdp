import Controller from "../lib/controller";
import MessageListModel from "../models/messageListModel";
import MessageListView from "../views/messageListView";
import MessageView from "../views/messageView";
import MessageController from "./messageController";
import ActionsView from "../views/actionsView";
import { pagePath } from "../helpers/paths";

export default class MessageListController extends Controller {
  constructor() {
    super();
    this.msgListView = new MessageListView();
    this.msgListModel = new MessageListModel();
    this.msgListModel.on("change", this.updateModel.bind(this));
  }

  getFilteredList() {
    return this.msgListModel.filterMessages();
  }

  showList(listName) {
    this.msgListModel.listStatus = listName;
    const currentList = this.getFilteredList();

    this.msgListView.clearMessageList();
    if (currentList.length > 0) {
      const actionsView = this.showActions();
      this.msgListModel.uncheckAllMsgs();
      this.msgListView.hideEmptyList();

      currentList.forEach(msg => {
        this.showItem(msg);
      });
    } else {
      this.msgListView.showEmptyList();
    }
  }

  showActions() {
    const checkedMsgs = this.msgListModel.returnMarkedMsgs();
    this.actionsView = new ActionsView(checkedMsgs);

    this.actionsView.on("actions:changeCheckboxes", this.changeCheckboxes.bind(this));
    this.actionsView.on("form:toggle", this.toggleNewMsgForm.bind(this));
    this.actionsView.on("message:star", this.starMessages.bind(this));
    this.actionsView.on("message:delete", this.deleteMessages.bind(this));
    return this.actionsView;
  }

  showItem(msg) {
    this.msgView = new MessageView(msg);
    this.msgController = new MessageController(this.msgView);
    this.msgListView.appendMessage(this.msgView.renderMsg());
    this.msgView.on("checkboxes:updated", this.updateCheckedList.bind(this));
  }

  showInbox() {
    this.showList("inbox" || "starred");
  }

  showStarred() {
    this.showList("starred");
  }

  showDeleted() {
    this.showList("deleted");
  }

  showDraft() {
    this.showList("draft");
  }

  toggleNewMsgForm() {
    this.msgListView.showNewMsgForm();
  }

  changeCheckboxes(value) {
    const currentList = this.getFilteredList();
    currentList.forEach((item) => {
      return this.msgListModel.update(item.id, { "checked": value });
    });
    this.msgListView.changeAllCheckboxes(value);
    return this.updateCheckedList();
  }

  updateCheckedList() {
    this.actionsView.checkedMsgs = this.msgListModel.returnMarkedMsgs();
  }

  starMessages(msg) {
    if (pagePath.isStarred() && msg.starred) {
      this.msgListView.removeFromList(msg.id);
    }
    this.msgController.moveToStarred(msg);
  }

  deleteMessages(msg) {
    this.msgListView.removeFromList(msg.id);
    this.msgController.moveToDeleted(msg);
  }
}
