import Controller from "../lib/controller";
import MessageListModel from "../models/messageListModel";
import MessageListView from "../views/messageListView";

export default class MessageListController extends Controller {
  constructor() {
    super();
    this.msgListModel = new MessageListModel();
    this.msgListView = new MessageListView();
  }

  showList(listName) {
    const listData = this.msgListModel.fiterMessages(listName);
    this.msgListView.renderMessageList(listData);
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
}
