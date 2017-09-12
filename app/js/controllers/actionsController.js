import Controller from "../lib/controller";
import { msgController, MessageController } from "./messageController";
import { newMsgController, NewMessageController } from "./newMessageController";

class ActionsController extends Controller {
  constructor() {
    super();
    this.actions = this.wrapper.find(".actions");
    this.button = this.actions.find(".button");
    this.mainCheckbox = this.actions.find(".actions__checkbox");
    this.setUpListeners();
  }

  setUpListeners() {
    this.button.on("click", this.buttonActions.bind(this));
    this.mainCheckbox.on("change", this.checkAllMsgs.bind(this));
  }

  buttonActions(e) {
    e.preventDefault();
    const btn = $(e.target);
    const action = btn.data("action");

    if (action === "new") {
      btn.addClass("button--disable");
      this.showForm();
    }
    else {
      const checkboxes = msgController.checkedMessages();

      checkboxes.forEach(checkbox => {
        const msg = $(checkbox).closest(".msg-item");
        const id = msg.data("id");

        if (action === "starred") {
          msgController.moveToStarred(id);
        }
        if (action === "deleted") {
          msgController.moveToDeleted(id);
        }
      });
    }
  }

  showForm() {
    newMsgController.toggleForm();
  }

  checkAllMsgs() {
    const isChecked = this.mainCheckbox.is(":checked");
    msgController.changeMessageCheckbox(isChecked);
  }
}

const actionsController = new ActionsController();
export { actionsController, ActionsController };