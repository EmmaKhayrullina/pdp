import $ from "jquery";
import View from "../lib/view";
import MessageView from "./messageView";
import NewMessageView from "./newMessageView";

export default class ActionsView extends View {
  constructor() {
    super();
    this.actions = $(".actions");
    this.button = this.actions.find(".button");
    this.buttonNew = this.actions.find("[data-action='new']");
    this.mainCheckbox = this.actions.find(".actions__checkbox");
    // this.messageView = new MessageView();
    // this.newMsgView = new NewMessageView();
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
      this.toggleButtonNew();
      this.showForm();
    }
    else {
      const checkboxes = this.messageView.checkedMessages();

      checkboxes.forEach(checkbox => {
        const msg = $(checkbox).closest(".msg-item");
        const id = msg.data("id");

        if (action === "starred") {
          this.messageView.emit("message:star", id);
        } else {
          this.messageView.emit("message:delete", id);
        }
      });
    }
  }

  toggleButtonNew() {
    this.buttonNew.toggleClass("button--disable");
  }

  showForm() {
    // this.newMsgView.toggleForm();
    // this.emit("form:toggle", {});
    $(".form").slideToggle();
  }

  checkAllMsgs() {
    const isChecked = this.mainCheckbox.is(":checked");
    // this.messageView.changeMessageCheckbox(isChecked);
    $(".msg-item__checkbox").prop("checked", isChecked);
  }
}
