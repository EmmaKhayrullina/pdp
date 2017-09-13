import "../css/styles.css";
import "normalize.css";
import json from "../json/data.json";
import { storage, Storage } from "./helpers/storage";

import router from "page";
import NavigationController from "./controllers/navigationController";
import MessageListController from "./controllers/messageListController";
import MessageController from "./controllers/messageController";
// import NewMessageController from "./controllers/newMessageController";
import ActionsController from "./controllers/actionsController";

if(!localStorage.length) {
  storage.set(json);
}

const listController = new MessageListController();

router.redirect("/", "/inbox");
router("/inbox", () => {
  listController.showInbox();
});
router("/starred", () => {
  listController.showStarred();
});
router("/draft", () => {
  listController.showDraft();
});
router("/deleted", () => {
  listController.showDeleted();
});
router();

new NavigationController();
new MessageController();
// new NewMessageController();
new ActionsController();
