import Controller from "../lib/controller";
import ActionsView from "../views/actionsView";
import NewMessageController from "./newMessageController";

export default class ActionsController extends Controller {
  constructor() {
    super();
    this.actionsView = new ActionsView();
    this.newMsgController = new NewMessageController();

    this.actionsView.on("form:toggle", this.toggleNewMsgForm.bind(this));
  }

  toggleNewMsgForm() {
    this.newMsgController.toggleMsgForm();
  }
}
