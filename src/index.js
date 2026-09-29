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

  let emoji = document.querySelector("#emoji");
  emoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="weatherLogo"></img>`;

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "4b4301acf33210b672de34o3f362t059";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</div>
    <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</div>
  </div>
</div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", changeDisplay);

getWeather("Paris");
displayForecast();
