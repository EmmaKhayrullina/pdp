import Model from "../lib/model"

export default class MessageModel extends Model {
  constructor() {
    super();
  }

  addStatus(item, status) {
    item.status.push(status);
    this.emit("change", this.getData());
  }

  removeStatus(item, status) {
    const index = item.status.indexOf(status);
    if (index > -1) {
      item.status.splice(index, 1);
    }
    this.emit("change", this.getData());
  }
}
