// const inboxPath = "/inbox";
// const draftPath = "/draft";
// const starsPath = "/starred";
// const trashPath = "/deleted";

class Paths {
  constructor() {
    this.location = window.location;
  }

  currentPath() {
    return this.location.pathname.slice(1);
  }

  checkPath(path) {
    return this.location.pathname == path ? true : false;
  }

  isInbox() {
    this.checkPath("/inbox");
  }

  isDraft() {
    this.checkPath("/draft");
  }

  isStarred() {
    this.checkPath("/starred");
  }

  isDeleted() {
    this.checkPath("/deleted");
  }
}
const PATHS = new Paths();
export { PATHS };
// export {inboxPath, draftPath, starsPath, trashPath, Paths };
