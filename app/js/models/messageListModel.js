import Model from "../lib/model";

export default class MessageListModel extends Model {
  constructor() {
    super();
  }

  fiterMessages(status) {
    const messages = this.getData() || [];

    return messages.filter(msg => {
      if (msg[status]) {
        return msg;
      }
    });
  }
}
