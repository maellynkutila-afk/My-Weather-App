let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let current = new Date();
let day = weekDays[current.getDay()];
let month = monthsOfYear[current.getMonth()];
let date = current.getDate();
let year = current.getFullYear();

console.log(year);

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${month} ${date}, ${year}`;

let apiKey = "4b4301acf33210b672de34o3f362t059";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key={key}&units=metric";
