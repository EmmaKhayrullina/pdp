import "../css/styles.css";
import "normalize.css";
import json from "../json/data.json";
import { storage, Storage } from "./helpers/storage";

import router from "page";
import { navController, NavigationController } from "./controllers/navigationController";
import { listController, ListController } from "./controllers/messageListController";
import { msgController, MessageController } from "./controllers/messageController";
import { actionsController, ActionsController } from "./controllers/actionsController";
import { newMsgController, NewMessageController } from "./controllers/newMessageController";

if(!localStorage.length) {
  storage.set(json);
}

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

navController.highlightActiveLink(window.location.pathname.slice(1));

(() => {
 new MessageController();
})();