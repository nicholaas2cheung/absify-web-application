"use strict";
import { control, map } from "leaflet";
import * as model from "./model";
import ButtonView from "./views/ButtonView";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { geoError, toggleClass } from "./helper";

navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);
}, geoError);

const controlStartButton = function () {
  //capture startTime and startPosition to state
  model.loadStartData();

  //load the inital time
  const startTime = Date.now();

  //update the timer for every 1 second
  setInterval(function () {
    stopwatchView.render(startTime);
  }, 1000);

  //render the finish button
  stopwatchView.toggleClass();
};

const controlEndButton = function () {
  //capture endTime and endPosition to state
  model.loadEndData();
  //render the finish button
  stopwatchView.toggleClass();
};

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addEndButtonHandler(controlEndButton);
  stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
};

init();
