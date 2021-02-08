import ButtonView from './ButtonView';
import { getMonthName, getMinute, getDateUnit } from '../helper';

class recordView extends ButtonView {
  _renderedEl = document.getElementById('run-record');
  _data;

  renderRecord(data) {
    this._data = [...data];
    let record = this._data[this._data.length - 1];

    this._renderedEl.insertAdjacentHTML(
      'afterend',
      `<div class="run-card">
    <div class="color-header"></div>
    <p class="run-date">Running on ${record.date.getDate()}${getDateUnit(
        record.date.getDate()
      )}, ${getMonthName(record.date)}</p>
    <div class="run-data flex">
      <div class="run-distance run-data-item"><p>👟 ${(record.distance / 1000).toFixed(
        2
      )} <span>KM</span></p></div>
      <div class="run-duration run-data-item"><p>⏱ ${getMinute(
        record.duration
      )} <span>MIN</span></p></div>
      <div class="run-speed run-data-item"><p>⚡️ ${Math.trunc(
        record.speed
      )} <span>KM/H</span></p></div>
    </div>
  </div>`
    );
  }

  //it is for loading data from the localStorage
  renderAllRecord(data) {
    if (data === []) return;
    this._data = [...data];
    const obj = this;
    this._data.forEach((record) => {
      console.log(record);
      let time = new Date(record.date);
      console.log(time);
      obj._renderedEl.insertAdjacentHTML(
        'afterbegin',
        `<div class="run-card">
        <div class="color-header"></div>
        <p class="run-date">Running on ${time.getDate()}${getDateUnit(
          time
        )}, ${getMonthName(time)}</p>
        <div class="run-data flex">
          <div class="run-distance"><p>👟 ${(record.distance / 1000).toFixed(
            2
          )} <span>KM</span></p></div>
          <div class="run-duration"><p>⏱ ${getMinute(
            record.duration
          )} <span>MIN</span></p></div>
          <div class="run-speed"><p>⚡️${Math.trunc(
            record.speed
          )}<span>KM/H</span></p></div>
        </div>
      </div>
      `
      );
    });
  }
}

export default new recordView();
