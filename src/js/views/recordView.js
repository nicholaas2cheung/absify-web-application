import ButtonView from "./ButtonView";

class recordView extends ButtonView {
  #renderedEl = document.getElementById("run-record");

  render(data) {}

  renderMarkUp() {}

  // addStartDataHandler(handler) {
  //   this._btnStart.addEventListener("click", handler);
  // }
}

export default new recordView();
