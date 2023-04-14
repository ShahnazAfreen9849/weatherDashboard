const API_KEY = "7a02b801d5ba2290e31a45ac6b59b44a";
const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submit-btn");
const currentWeatherEl = document.getElementById("current-weather");
const forecastEl = document.getElementById("forecast");
const searchHistoryEl = document.getElementById("search-history");
// Get the weather data for a given city name
function getWeatherData(cityName) {
  // Fetch the current weather data
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display the current weather data
      const currentWeather = createCurrentWeather(data);
      currentWeatherEl.innerHTML = "";
      currentWeatherEl.appendChild(currentWeather);
      // Fetch the forecast weather data
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
    })
    .then((response) => response.json())
    .then((data) => {
      // Display the forecast weather data
      const forecast = createForecast(data);
      forecastEl.innerHTML = "";
      forecastEl.appendChild(forecast);
      // Add the city to the search history
      addToSearchHistory(cityName);
    })
    .catch((error) => console.error(error));
}
// Create a current weather element for a given weather data object
function createCurrentWeather(data) {
  const { name, dt, weather, main, wind } = data;
  const currentWeatherElement = document.createElement("div");
  currentWeatherElement.classList.add("current-weather");
  currentWeatherElement.innerHTML = `
    <h2>${name} (${moment.unix(dt).format("M/D/YYYY")})</h2>
  <img src="https://openweathermap.org/img/w/${weather[0].icon}.png" alt="${weather[0].description}" />
    <p>Temperature: ${main.temp} °F</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} MPH</p>
  `;
  return currentWeatherElement;
}
submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  const cityName = searchInput.value.trim();
  if (cityName) {
    getWeatherData(cityName);
    searchInput.value = "";
  }
});