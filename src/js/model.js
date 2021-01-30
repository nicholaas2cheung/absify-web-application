import { map } from "leaflet";
import {
  geoError,
  showMap,
  getCoordinates,
  formatRunRecord,
} from "../js/helper";

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
    //the assignment here will affect the original value of the runRecord object inside the array, it is because of Memory Heap
    state.runRecord.date = new Date();
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
    state.allRunRecord.push(state.runRecord);
  } catch (e) {
    console.error(e);
    geoError();
  }
};

export const loadRouteData = async function () {
  let route = state.allRunRecord[state.allRunRecord.length - 1];
  const response = await fetch(
    `https://graphhopper.com/api/1/route?point=${route.startPosition.lat},${route.startPosition.lng}&point=${route.endPosition.lat},${route.endPosition.lng}&vehicle=foot&locale=en&calc_points=true&details=street_name&details=road_class&key=96c455e1-52dc-45fa-80bf-cf4631d03354`
  );
  const data = await response.json();
  state.runRecord.distance = data.paths[0].distance;
  console.log(data);
};

export const loadRunRecord = function () {
  state.runRecord.duration =
    state.runRecord.endTime - state.runRecord.startTime;
  state.runRecord.speed =
    state.runRecord.distance / 1000 / (state.runRecord.duration / 3600000);
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
