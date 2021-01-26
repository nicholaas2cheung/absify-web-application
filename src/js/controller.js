"use strict";
import { map } from "leaflet";
import * as model from "./model";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { toggleClass } from "./helper";

const controlStopwatch = function () {
  //load the inital time
  const startTime = Date.now();
  //update the timer for every 1 second
  setInterval(function () {
    stopwatchView.render(startTime);
  }, 1000);
  //render the "Finish" button
  stopwatchView.toggleClass();
};

const controlStartRecord = function () {
  //render the finish button
  //capture startTime and startPosition to state
  model.loadStartData();
};

// const controlEndRecord = function () {};

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addHandlerRender(controlStopwatch);
};

init();
controlStartRecord();
