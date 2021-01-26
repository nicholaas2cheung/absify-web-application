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
  state.runningRecord.startTime = new Date();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      state.runningRecord.startPosition = position.coords;
    }, geoError);
  }

  console.log(state.runningRecord);
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
