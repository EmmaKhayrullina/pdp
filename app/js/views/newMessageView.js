import $ from "jquery";
import View from "../lib/view";
import ActionsView from "./actionsView";
import messageTemplate from "../../templates/partials/message.pug";

export default class NewMessageView extends View {
  constructor() {
    super();
    this.form = $(".form");
    this.closeBtn = this.form.find(".form__link");
    this.fields = this.form.find(".form__field");
    // this.actionsView = new ActionsView();
    this.setUpListeners();
  }

  setUpListeners() {
    this.closeBtn.on("click", this.closeForm.bind(this));
    this.form.on("submit", this.saveNewMessage.bind(this));
  }

  toggleForm() {
    this.form.stop(true, true).slideToggle();
  }

  closeForm(e) {
    e.preventDefault();
    this.toggleForm();
    $("#button_new").toggleClass("button--disable");
    // this.actionsView.toggleButtonNew();
    // this.emit("action:new", {});
  }

  checkFields() {
    return this.fields.filter( field => {
      let value = $(field).val();
      if(!value.length) {
        return false;
      } else {
        return value;
      }
    });
  }

  saveNewMessage(e) {
    e.preventDefault();
    let data = this.checkFields();
    this.emit("message:create", data);
  }

  showNewMessageOnList(data) {
    // this.render(messageTemplate, data);
  }
}
