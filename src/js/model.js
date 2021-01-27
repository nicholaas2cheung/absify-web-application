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
    const { latitude: lat, longitude: lng } = position.coords;
    state.runRecord.startTime = +Date.now();
    state.runRecord.startPosition = { lat, lng };
    console.log(state.runRecord);
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
    console.log(state.runRecord);
  } catch (e) {
    console.error(e);
    geoError();
  }
};

export const calRunRecord = function () {
  state.runRecord.duration =
    state.runRecord.endTime - state.runRecord.startTime;
  console.log(state.runRecord);
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
