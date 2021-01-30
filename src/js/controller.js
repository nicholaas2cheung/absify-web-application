"use strict";
import "regenerator-runtime/runtime";
import { control, map } from "leaflet";
import * as model from "./model";
import ButtonView from "./views/ButtonView";
import stopwatchView from "./views/stopwatchView";
import recordView from "./views/recordView";
import { geoError, toggleClass, showRoute } from "./helper";

const controlStartButton = async function () {
  try {
    // update the timer for every 1 second
    stopwatchView.renderStopwatch();

    //render the finish button
    stopwatchView.toggleClass();

    //capture startTime and startPosition to state
    await model.loadStartData();
  } catch (err) {
    console.log(err);
  }
};

const controlEndButton = async function () {
  try {
    //clear the timer
    stopwatchView.resetStopwatch();

    //render the finish button
    stopwatchView.toggleClass();

    //capture endTime and endPosition to state
    //formate the Result
    await model.loadEndData();

    //first render the route
    showRoute(model.state.allRunRecord);

    //get the data of the route (in model.js)
    model.loadRouteData();

    //render the record using model.state data
    // recordView.renderRecord(model.state.allRunRecord);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  model.loadCurrentPosition();
  stopwatchView.addEndButtonHandler(controlEndButton);
  stopwatchView.addStartButtonHandler(controlStartButton); //if it is possible: create an object using ButtonView class so that I can call the .addStartButtonHandler on ButtonView
};

init();

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
  },
  function () {
    alert("cannot get your location");
  }
);
