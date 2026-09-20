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

let currentTime = new Date();
let day = weekDays[currentTime.getDay()];
let month = monthsOfYear[currentTime.getMonth()];
let date = currentTime.getDate();
let year = currentTime.getFullYear();
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${month} ${date}, ${year} <br> ${hour}:${minutes}`;

function displayWeather(response) {
  let temperatureNum = document.querySelector("#temperatureNumber");
  let roundedTemp = Math.round(response.data.temperature.current);
  temperatureNum.innerHTML = roundedTemp;

  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let adaptedDescription = response.data.condition.description;
  let adaptedHumidity = response.data.temperature.humidity;
  let adaptedWind = response.data.wind.speed;
  descriptionElement.innerHTML = adaptedDescription;
  humidity.innerHTML = adaptedHumidity;
  wind.innerHTML = adaptedWind;
}

function getWeather(city) {
  let apiKey = "4b4301acf33210b672de34o3f362t059";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeDisplay(event) {
  event.preventDefault();
  let city = document.querySelector("#entered-city");
  let cityValue = city.value;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${cityValue}`;
  getWeather(cityValue);
}

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", changeDisplay);

getWeather("Paris");
