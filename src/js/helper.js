import { months } from './config';
import { map } from 'leaflet';
import { state } from './model';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import cardView from './views/cardView';

let myMap;

export const formatTime = (time) => {
  let diffInHour = time / 3600000;
  let hh = Math.floor(diffInHour);

  let diffInMinute = (diffInHour - hh) * 60;
  let mm = Math.floor(diffInMinute);

  let diffInSecond = (diffInMinute - mm) * 60;
  let ss = Math.floor(diffInSecond);

  let formattedHH = hh.toString().padStart(2, '0');
  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
};

export const toggleClass = (element1, element2) => {
  element1.classList.toggle('hidden');
  element2.classList.toggle('hidden');
};

export const geoError = () => {
  alert('😐 Cannot Locate Current Position. Please Try Again🙏🏻');
};

export const showMap = function (lat, lng) {
  myMap = L.map('mapID').setView([lat, lng], 20);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 256,
  }).addTo(myMap);

  L.marker([lat, lng]).addTo(myMap).bindPopup('📍 Your Starting Position').openPopup();
};

export const showRoute = async function (data) {
  try {
    let runRecord = data[data.length - 1];
    let route = await L.Routing.control({
      waypoints: [
        L.latLng(runRecord.startPosition.lat, runRecord.startPosition.lng),
        L.latLng(runRecord.endPosition.lat, runRecord.endPosition.lng),
      ],
      router: new L.Routing.graphHopper('96c455e1-52dc-45fa-80bf-cf4631d03354', {
        urlParameters: { vehicle: 'foot' },
      }),
    });

    route.addTo(myMap);
  } catch (err) {
    console.log(err);
  }
};

export const getRouteData = async function (lat1, lng1, lat2, lng2) {
  const response = await fetch(
    `https://graphhopper.com/api/1/route?point=${lat1},${lng1}&point=${lat2},${lng2}&vehicle=foot&locale=de&calc_points=false&key=96c455e1-52dc-45fa-80bf-cf4631d03354`
  );
  const data = await response.json();
};

export const getCoordinates = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

export const getMonthName = (month) => months[month.getMonth()];

export const getMinute = (time) => Math.ceil(time / 60000);

export const getDateUnit = (date) => {
  if ((date + '').slice(-1) === '1') return 'st';
  if ((date + '').slice(-1) === '2') return 'nd';
  if ((date + '').slice(-1) === '3') return 'rd';
  return 'th';
};

export const initCardScroll = (El) => {
  El.forEach((card) => {
    card.style.transform = `translateX(0%)`;
  });
};

export const moveCard = (data) => {
  cardView.benefitCard.forEach((card) => {
    card.style.transform = `translateX(${-105 * data}%)`;
  });
};

export const resetCard = () => {
  cardView.curCard = 0;
  cardView.benefitCard.forEach((card) => {
    card.style.transform = `translateX(${card}%)`;
  });
};
