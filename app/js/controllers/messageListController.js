import Controller from "../lib/controller";

class ListController extends Controller {
  constructor() {
    super();
    this.msgList = this.wrapper.find(".msg-list");
  }

  showInbox() {
    this.showList(this.msgList, "inbox" || "starred");
  }

  showStarred() {
    this.showList(this.msgList, "starred");
  }

  showDeleted() {
    this.showList(this.msgList, "deleted");
  }

  showDraft() {
    this.showList(this.msgList, "draft");
  }
}

const listController = new ListController();
export { listController, ListController };