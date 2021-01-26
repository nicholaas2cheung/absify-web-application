import { map } from "leaflet";
import { geoError, showMap } from "../js/helper";

export const state = {
  runningRecord: {
    // startTime,
    // endTime,
    // duration,
    // startPosition,
    // endPosition,
  },
};

export const loadStartData = function () {
  state.runningRecord.startTime = +Date.now();
  console.log(typeof state.runningRecord.startTime);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      state.runningRecord.startPosition = position.coords;
    }, geoError);
  }
};

export const loadEndData = function () {
  state.runningRecord.endTime = +Date.now();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      state.runningRecord.endPosition = position.coords;
    }, geoError);
  }
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
