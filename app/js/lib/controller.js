import { storage, Storage } from "../helpers/storage";
import Model from "./model";
import View from "./view";
import messageTemplate from "../../templates/partials/message.pug";

export default class Controller {
  constructor() {
    this.state = storage.get();
    this.model = new Model(this.state || undefined);
    this.view = new View();
    this.wrapper = $(".container");
    this.setUpEventListener();
  }

  setUpEventListener() {
    this.model.on("change", () => storage.set(this.model.getData()));
  }

  fiterMessages(status) {
    const messages = this.model.getData() || [];
    const arr = [];
    messages.forEach(
      msg => {
      if(msg[status]) {
        arr.push(msg)
      }
    });
    return arr;
  }

  showList(listSelector, listName) {
    const listData = this.fiterMessages(listName);
    this.view.clear(listSelector);

    listData.forEach(msg =>
      listSelector.append(this.view.render(messageTemplate, {msg}))
    );
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

  moveTo(id, propArr, status) {
    const item = this.model.get(id);
    item["status"] = [status];
    propArr.forEach(prop => {
      this.model.update(id, prop);
    });
    this.wrapper.find(`[data-id=${id}]`).remove();
  }
}
