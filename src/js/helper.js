import { months } from "./config";
import { map } from "leaflet";
import { state } from "./model";

export const formatTime = (time) => {
  let diffInHour = time / 3600000;
  let hh = Math.floor(diffInHour);

  let diffInMinute = (diffInHour - hh) * 60;
  let mm = Math.floor(diffInMinute);

  let diffInSecond = (diffInMinute - mm) * 60;
  let ss = Math.floor(diffInSecond);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
};

export const toggleClass = (element1, element2) => {
  element1.classList.toggle("hidden");
  element2.classList.toggle("hidden");
};

export const geoError = () => {
  alert("😐 Cannot Locate Current Position. Please Try Again🙏🏻");
};

export const showMap = (lat, lng) => {
  var L = require("leaflet");
  require("leaflet-routing-machine");
  require("lrm-graphhopper");
  const map = L.map("mapID").setView([lat, lng], 20);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 256,
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("📍 Your Starting Position")
    .openPopup();

  L.Routing.control({
    waypoints: [L.latLng(lat, lng), L.latLng(lat + 0.01, lng + 0.0121)],
    router: new L.Routing.graphHopper("96c455e1-52dc-45fa-80bf-cf4631d03354"),
  }).addTo(map);
};

export const getCoordinates = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

export const getMonthName = (month) => months[month.getMonth()];

export const getMinute = (time) => Math.ceil(time / 60000);

export const getDateUnit = (date) => {
  if ((date + "").slice(-1) === "1") return "st";
  if ((date + "").slice(-1) === "2") return "nd";
  if ((date + "").slice(-1) === "3") return "rd";
  return "th";
};
