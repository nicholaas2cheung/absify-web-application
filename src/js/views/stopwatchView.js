import { formatTime } from "../helper";
import btnView from "./btnView";

class stopwatchView extends btnView {
  _viewTimer = document.getElementById("time");

  render(data) {
    let passedTime = Date.now() - data;
    this._viewTimer.innerHTML = formatTime(passedTime);
  }

  addHandlerRender(handler) {
    this._btnStart.addEventListener("click", handler);
  }
}

export default new stopwatchView();
