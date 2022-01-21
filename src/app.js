let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hours = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];
h2.innerHTML = " " + day + " " + hours + ":" + minutes + " ";

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "02a6bdfe1e53457a4cd2bb67cb4d8376";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let form = document.querySelector("#city-enter");
form.addEventListener("submit", submitCity);

function showLocation(position) {
  let apiKeyLocation = "42dafe8c3d49bf6107877f49e5eca947";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyLocation}`;
  axios.get(urlLocation).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
searchCity(Tehran);
