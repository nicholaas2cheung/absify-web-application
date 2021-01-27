"use strict";
import "regenerator-runtime/runtime";
import { control, map } from "leaflet";
import * as model from "./model";
import ButtonView from "./views/ButtonView";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { geoError, toggleClass } from "./helper";

const controlStartButton = async function () {
  try {
    //capture startTime and startPosition to state
    await model.loadStartData();

    //load the inital time
    const startTime = Date.now();

    //update the timer for every 1 second
    setInterval(function () {
      stopwatchView.render(startTime);
    }, 1000);

    //render the finish button
    stopwatchView.toggleClass();
  } catch (err) {
    console.err(err);
  }
};

const controlEndButton = async function () {
  try {
    //capture endTime and endPosition to state
    await model.loadEndData();

    //calculate the whole running record
    model.calRunRecord();

    //render the finish button
    stopwatchView.toggleClass();
  } catch (err) {
    console.err(err);
  }
};

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addEndButtonHandler(controlEndButton);
  stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
};

init();
