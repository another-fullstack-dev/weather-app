import "./styles.css";

const WEATHER_API = "SNX2NXYFQLT8982YAZEZ4V8DZ"; // free visual crossing api

async function fetchWeather(region, dataUnit = "metric") {
  try {
    let request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${region}?unitGroup=${dataUnit}&key=${WEATHER_API}&contentType=json`,
      { mode: "cors" }
    );
    return request;
  } catch (error) {
    console.error(error);
    return error;
  }
}

function processData(jsonData) {
  return new RegionWeather(
    jsonData.resolvedAddress,
    jsonData.description,
    jsonData.currentConditions,
    jsonData.days,
    jsonData.alerts
  );
}

class RegionWeather {
  constructor(
    fullAddress,
    generalDescription,
    currentConditions,
    days,
    alerts
  ) {
    this.fullAddress = fullAddress;
    this.generalDescription = generalDescription;
    this.currentConditions = currentConditions;
    this.days = days;
    this.alerts = alerts;
  }
}

const weatherForm = document.querySelector(".form-region-input");
const regionInput = document.querySelector("#region-input");
const weatherCardContainer = document.querySelector(".weather-card-container");
const weatherDescription = document.querySelector(".description");
const weatherAddress = document.querySelector(".address");
const weatherTemp = document.querySelector(".temp");
const weatherTempFeelsLike = document.querySelector(".temp-feelslike");
const weatherCondition = document.querySelector(".condition");
const weatherHumidity = document.querySelector(".humidity");
const weatherCloudCover = document.querySelector(".cloudcover");
const weatherWindSpeed = document.querySelector(".windspeed");

weatherForm.addEventListener("submit", (Event) => {
  Event.preventDefault(); // otherwise refreshes the pages and breaks stuff
  fetchWeather(regionInput.value.trim())
    .then((request) => {
      return request.json();
    })
    .then((request) => {
      let regionWeather = processData(request);
      weatherCardContainer.removeAttribute("hidden");
      weatherAddress.textContent = regionWeather.fullAddress;
      weatherDescription.textContent = regionWeather.generalDescription;
      weatherTemp.textContent =
        "Temperature: " + regionWeather.currentConditions.temp;
      weatherTempFeelsLike.textContent =
        "Feels like " + regionWeather.currentConditions.feelslike;
      weatherCondition.textContent = regionWeather.currentConditions.conditions;
      weatherHumidity.textContent =
        "Humidity: " + regionWeather.currentConditions.humidity;
      weatherCloudCover.textContent =
        "Cloud cover: " + regionWeather.currentConditions.cloudcover;
      weatherWindSpeed.textContent =
        "Wind speed: " + regionWeather.currentConditions.windspeed;
    })
    .catch((request) => {
      console.error(request);
    });
  regionInput.value = "";
});

/* function createWeatherCard(data){
  let description = document.createElement("h1");
  let address = document.createElement("h2");
  let currentConditionsContainer = document.createElement("div");
  let temp = document.createElement()
} */

/* fetchWeather("london", "metric")
  .then((request) => {
    return request.json();
  })
  .then((request) => {
    return processData(request);
  }); */
