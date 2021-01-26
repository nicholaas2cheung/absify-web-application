import { map } from "leaflet";

export const state = {
  runningRecord: {
    // startTime,
    // endTime,
    // duration,
    // startPosition,
    // endPosition,
  },
};

export const loadStartRecord = function () {};

export const loadCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude: lat, longitude: lng } = position.coords;

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
      },
      function () {
        alert("Please Reload the Website to Get Your Current Location!🗺");
      }
    );
  }
  if (!navigator.geolocation) console.log(`not working!`);
};
