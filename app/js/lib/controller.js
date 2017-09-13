import $ from "jquery";
import { storage } from "../helpers/storage";
import Model from "./model";
import View from "./view";
import messageTemplate from "../../templates/partials/message.pug";

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    // this.model.on("change", this.updateModel.bind(this));
  }

  updateModel(state) {
    storage.set(state);
  }

  addMessage(title, text) {
    const message = this.model.add({
      id: Date.now(),
      title,
      text,
      status: "draft",
      inbox: false,
      starred: false,
      deleted: false,
      draft: true
    });
  }

  moveTo(id, propObj, status) {
    const item = this.model.get(id);
    item["status"] = [status];
    this.model.update(id, propObj);
  }
}
