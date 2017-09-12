export default class View {
  render(template, data) {
    if (data) {
      return template(data);
    }
    else {
      return template;
    }
  }

  clear(el) {
    el.html("");
  }
}
