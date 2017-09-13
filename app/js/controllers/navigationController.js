import Controller from "../lib/controller";
import NavigationView from "../views/navigationView";
import { PATHS } from "../helpers/paths";

export default class NavigationController extends Controller {
  constructor() {
    super();
    this.navView = new NavigationView();
    this.navigate();
  }

  navigate() {
    this.navView.highlightActiveLink(PATHS.currentPath());
  }
}
