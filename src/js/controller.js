"use strict";
import { map } from "leaflet";
import * as model from "./model";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { toggleClass } from "./helper";

const controlStopwatch = function () {
  //callback function here
  const startTime = Date.now();

  setInterval(function () {
    stopwatchView.render(startTime);
  }, 1000);

  toggleClass(stopwatchView.btnStart(), stopwatchView.btnEnd());
};

const controlStartRecord = function () {
  //render the finish button
  //capture startTime and startPosition to state
};

const controlEndRecord = function () {};

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addHandlerRender(controlStopwatch);
};

init();
