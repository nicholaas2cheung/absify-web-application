"use strict";
import { control, map } from "leaflet";
import * as model from "./model";
import ButtonView from "./views/ButtonView";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { toggleClass } from "./helper";

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

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
};

init();
