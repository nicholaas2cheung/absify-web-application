import { formatTime, timerInterval, getStartTime } from '../helper';
import ButtonView from './ButtonView';

class stopwatchView extends ButtonView {
  _viewTimer = document.getElementById('time');
  _timerInterval;

  renderStopwatch() {
    const startTime = Date.now();
    let obj = this;
    obj._timerInterval = setInterval(function () {
      obj.printTime(startTime);
    }, 1000);
  }

  printTime(data) {
    let passedTime = Date.now() - data;
    this._viewTimer.innerHTML = formatTime(passedTime);
  }

  resetStopwatch() {
    clearInterval(this._timerInterval);
    this._viewTimer.innerHTML = `00:00:00`;
  }
}

export default new stopwatchView();
