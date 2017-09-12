import Controller from "../lib/controller";

class NewMessageController extends Controller {
  constructor() {
    super();
    this.form = this.wrapper.find(".form");
    this.closeBtn = this.form.find(".form__link");
    this.setUpListeners();
  }

  setUpListeners() {
    this.closeBtn.on("click", this.closeForm.bind(this));
  }

  toggleForm() {
    this.form.stop(true, true).slideToggle();
  }

  closeForm(e) {
    e.preventDefault();
    this.toggleForm();
    this.wrapper.find("[data-action='new']").removeClass("button--disable");
  }
}

const newMsgController = new NewMessageController();
export { newMsgController, NewMessageController };