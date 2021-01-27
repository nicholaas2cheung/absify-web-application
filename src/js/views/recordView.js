import ButtonView from "./ButtonView";

class recordView extends ButtonView {
  _renderedEl = document.getElementById("run-record");

  renderRecord(data) {
    const obj = this;
    data.forEach((record) => {
      obj._renderedEl.insertAdjacentHTML(
        "afterend",
        `<div class="run-card">
        <div class="color-header"></div>
        <p class="run-date">Running on ${record.startTime}</p>
        <p class="run-location">🏃🏻‍♂️ Kam Tai Court - ⛳️ City One </p>
        <div class="run-data flex">
          <div class="run-distance"><p>👟 12 <span>KM</span></p></div>
          <div class="run-duration"><p>⏱ ${record.duration} <span>MIN</span></p></div>
          <div class="run-speed"><p>⚡️ 30 <span>KM/H</span></p></div>
        </div>
      </div>
      `
      );
    });
  }
}

export default new recordView();
