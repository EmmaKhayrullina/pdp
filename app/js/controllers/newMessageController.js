import Controller from "../lib/controller";
import NewMessageView from "../views/newMessageView";
import { PATHS } from "../helpers/paths";

export default class NewMessageController extends Controller {
  constructor() {
    super();
    this.newMsgView = new NewMessageView();
    this.newMsgView.on("message:create", this.createNewMessage.bind(this));
    // this.newMsgModel.on("change", this.updateModel.bind(this));
  }

  createNewMessage(data) {
    let item = this.addMessage(data.title, data.text);

    if (PATHS.isDraft()) {
      this.newMsgView.showNewMessageOnList(item);
    }
  }

  toggleMsgForm() {
    this.newMsgView.toggleForm();
  }
}
