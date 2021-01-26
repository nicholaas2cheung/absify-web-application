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

  console.log(`${formattedHH}:${formattedMM}:${formattedSS}`);
  return `${formattedHH}:${formattedMM}:${formattedSS}`;
};

export const toggleClass = (element1, element2) => {
  element1.classList.toggle("hidden");
  element2.classList.toggle("hidden");
};
