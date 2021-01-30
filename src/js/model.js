import { map } from "leaflet";
import {
  geoError,
  showMap,
  getCoordinates,
  formatRunRecord,
  getRouteData,
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
    // const routeData = await getRouteData(
    //   state.runRecord.startPosition.lat,
    //   state.runRecord.startPosition.lng,
    //   state.runRecord.endPosition.lat,
    //   state.runRecord.endPosition.lng
    // );
    formatRunRecord();

    // console.log(routeData);
    console.log(state.allRunRecord);
  } catch (e) {
    console.error(e);
    geoError();
  }
};

export const loadRouteData = async function () {
  let route = state.allRunRecord[state.allRunRecord.length - 1];
  const response = await fetch(
    `https://graphhopper.com/api/1/route?point=${route.startPosition.lat},${route.startPosition.lng}&point=${route.endPosition.lat},${route.endPosition.lng}&vehicle=car&locale=de&calc_points=false&key=96c455e1-52dc-45fa-80bf-cf4631d03354`
  );

  const data = await response.json();

  console.log(data);
};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      showMap(lat, lng);
    }, geoError);
  }
};
