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
  } catch (e) {
    console.error(e);
    geoError();
  }
};

// export const loadStartData = function () {
//   state.runRecord.startTime = +Date.now();
//   console.log(typeof state.runRecord.startTime);
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       const { latitude: lat, longitude: lng } = position.coords;
//       state.runRecord.startPosition = { lat, lng };
//     }, geoError);
//   }
//   console.log(state.runRecord.startPosition);
// };

export const loadEndData = function () {
  state.runRecord.endTime = +Date.now();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      state.runRecord.endPosition = { lat, lng };
    }, geoError);
  }

  state.runRecord.duration =
    state.runRecord.endTime - state.runRecord.startTime;

  state.allRunRecord.push(state.runRecord);
  // console.log(state.allRunRecord);
  // console.log(state.runRecord);
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
