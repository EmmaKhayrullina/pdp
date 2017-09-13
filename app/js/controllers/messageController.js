import Controller from "../lib/controller";
import { pagePath } from "../helpers/paths";

export default class MessageController extends Controller {
  constructor(msgView) {
    super();
    this.msgView = msgView;

    this.msgView.on("message:star", this.moveToStarred.bind(this));
    this.msgView.on("message:delete", this.moveToDeleted.bind(this));
    this.msgView.on("message:inbox", this.moveToInbox.bind(this));
    this.msgView.on("message:check", this.changeMessageFlag.bind(this));
  }

  moveToStarred(item) {
    if (!item.starred) {
      this.starMessage(item);
      this.msgView.notify("Moved to starred!");
    } else {
      this.unstarMessage(item);
      this.msgView.notify("Removed from starred!");
    }
  }

  starMessage(item) {
    const changeProps = { "starred": true };
    const status = ["inbox", "starred"];
    this.moveTo(item, changeProps, status);
  }

  unstarMessage(item) {
    const changeProps = { "starred": false };
    this.moveTo(item, changeProps, "inbox");
  }

  moveToInbox(item) {
    const changeProps = {
      "inbox": true,
      "deleted": false
    };
    this.moveTo(item, changeProps, "inbox");
    this.msgView.notify("Back to inbox!");
  }

  moveToDeleted(item) {
    if (pagePath.isDeleted() && item.deleted) {
      this.model.remove(item.id);
      this.msgView.notify("Deleted!");
    } else {
      const changeProps = {
        "deleted": true,
        "inbox": false,
        "starred": false
      };
      this.moveTo(item, changeProps, "deleted");
      this.msgView.notify("Moved to trash!");
    }
  }

  changeMessageFlag(item) {
    this.model.update(item.id, { "checked": !item.checked });
  }
}
