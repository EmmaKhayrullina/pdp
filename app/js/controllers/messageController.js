import $ from "jquery";
import { PATHS } from "../helpers/paths";
import { storage } from "../helpers/storage";
import Controller from "../lib/controller";
import MessageModel from "../models/messageModel";
import MessageView from "../views/messageView";
import Notifications from "../shared/notifications";

export default class MessageController extends Controller {
  constructor() {
    super();
    this.msgView = new MessageView();
    this.messageModel = new MessageModel();
    this.notification = new Notifications($(".notification"));

    this.msgView.on("message:star", this.moveToStarred.bind(this));
    this.msgView.on("message:delete", this.moveToDeleted.bind(this));
    this.msgView.on("message:inbox", this.moveToInbox.bind(this));
    this.messageModel.on("change", this.updateModel.bind(this));
  }

  moveToStarred(id) {
    const item = this.messageModel.get(id);

    if (!item.starred) {
      this.starMessage(item, id);
    } else {
      this.unstarMessage(item, id);
    }
    this.msgView.markCurrentMgs(id);
  }

  starMessage(item, id) {
    this.messageModel.addStatus(item, "starred");
    this.messageModel.update(id, { "starred": true });
    this.notification.show("Move to starred!");
  }

  unstarMessage(item, id) {
    if (PATHS.isStarred()) {
      this.msgView.removeItem(id);
    }

    this.messageModel.removeStatus(item, "starred");
    this.messageModel.update(id, { "starred": false });
    this.notification.show("Remove from starred!");
  }

  moveToInbox(id) {
    const changeProps = {
      "inbox": true,
      "deleted": false
    };
    this.moveTo(id, changeProps, "inbox");
    this.notification.show("Back to inbox!");
    this.msgView.removeItem(id);
  }

  moveToDeleted(id) {
    const changeProps = {
      "deleted": true,
      "inbox": false,
      "starred": false
    };
    this.moveTo(id, changeProps, "deleted");
    this.notification.show("Moved to trash!");
    this.msgView.removeItem(id);
  }
}
