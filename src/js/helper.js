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
};

export const getCoordinates = () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};
