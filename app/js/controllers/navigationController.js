import Controller from "../lib/controller";

class NavigationController extends Controller {
  constructor() {
    super();
    this.navLink = this.wrapper.find(".header-nav__link");
    this.setUpListeners();
  }

  setUpListeners() {
    this.navLink.on("click", this.changeActiveLink.bind(this));
  }

  changeActiveLink(e) {
    const list = $(e.target).data("list");
    this.highlightActiveLink(list);
  }

  highlightActiveLink(list) {
    const activeClass = "header-nav__link--active";
    const link = this.wrapper.find(`[data-list='${list}']`);
    link.addClass(activeClass).siblings().removeClass(activeClass);
  }
}

const navController = new NavigationController();
export { navController, NavigationController };