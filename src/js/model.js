import { map } from "leaflet";
import { geoError, showMap, getCoordinates } from "../js/helper";

export const state = {
  allRunRecord: [],
  runRecord: {
    // startTime,
    // endTime,
    // duration,
    // startPosition,
    // endPosition,
  },
};

export const loadStartData = async function () {
  try {
    const position = await getCoordinates();
    console.log(state);
    const { latitude: lat, longitude: lng } = position.coords;
    //the assignment here will affect the original value of the runRecord object inside the array
    state.runRecord.startTime = +Date.now();
    state.runRecord.startPosition = { lat, lng };
  } catch (e) {
    console.error(e);
    geoError();
  }
};

export const loadEndData = async function () {
  try {
    const position = await getCoordinates();
    const { latitude: lat, longitude: lng } = position.coords;
    state.runRecord.endTime = +Date.now();
    state.runRecord.endPosition = { lat, lng };
  } catch (e) {
    console.error(e);
    geoError();
  }
};

export const formatRunRecord = function () {
  console.log(state.allRunRecord);
  state.runRecord.duration =
    state.runRecord.endTime - state.runRecord.startTime;
  state.allRunRecord.push(state.runRecord);
  return (state.runRecord = {});
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
