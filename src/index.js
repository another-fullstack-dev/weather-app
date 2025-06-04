const WEATHER_API = "SNX2NXYFQLT8982YAZEZ4V8DZ"; // free visual crossing api

async function fetchWeather(region, dataUnit = "metric") {
  try {
    let request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${region}?unitGroup=${dataUnit}&key=${WEATHER_API}&contentType=json`,
      { mode: "cors" }
    );
    return request;
  } catch (error) {
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
weatherForm.addEventListener("submit", () => {
  fetchWeather(regionInput.value.trim())
    .then((request) => {
      return request.json();
    })
    .then((request) => {
      console.log(processData(request));
    })
    .catch((request)=>{
      console.error(request);
    });
    regionInput.value = "";
});

/* fetchWeather("london", "metric")
  .then((request) => {
    return request.json();
  })
  .then((request) => {
    return processData(request);
  }); */
