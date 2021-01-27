import { formatTime, timerInterval, getStartTime } from "../helper";
import ButtonView from "./ButtonView";

class stopwatchView extends ButtonView {
  _viewTimer = document.getElementById("time");
  _timerInterval;

  // render(data) {
  //   let passedTime = Date.now() - data;
  //   this._viewTimer.innerHTML = formatTime(passedTime);
  // }

  renderStopwatch() {
    const startTime = Date.now();
    console.log(this);
    let obj = this;
    obj._timerInterval = setInterval(function () {
      obj.printTime(startTime);
    }, 1000);
  }

  printTime(data) {
    let passedTime = Date.now() - data;
    this._viewTimer.innerHTML = formatTime(passedTime);
  }

  // render() {
  //   setInterval(function () {
  //     this.printTime(getStartTime()).bind(this), 1000;
  //   });
  // }

  // reset() {
  //   clearInterval;
  // }

  // timerInterval() {
  //   setInterval(printTimer(data), 1000);
  // }

  // printTimer(data) {
  //   return function (data) {
  //     let passedTime = Date.now() - data;
  //     this._viewTimer.innerHTML = document.getElementById("time");
  //   };
  // }

  // getCurrentTime() {
  //   return Date.now();
  // }

  // timerInterval() {
  //   const startTime = Date.now();
  //   console.log(stopwatchView.printTime());
  //   setInterval(this.printTime(startTime).bind(stopwatchView), 1000);
  // }

  // printTime(data) {
  //   let passedTime = Date.now() - data;
  //   this._viewTimer.innerHTML = document.getElementById("time");
  // }

  // renderStopwatch() {
  //   const startTime = Date.now();

  //   const printTimer = setInterval(function () {
  //     let passedTime = Date.now() - startTime;
  //     this._viewTimer.innerHTML = document.getElementById("time");
  //   }, 1000);
  // }
}

export default new stopwatchView();
