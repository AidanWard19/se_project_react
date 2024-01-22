import { APIkey } from "./constants";
import api from "./api";

export const getApiWeatherData = (latitude, longitude) => {
  const apiWeather =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
      `).then(api.handleServerResponse);
  return apiWeather;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  const tempsObj = {
    F: Math.round(temp),
    C: Math.round(((temp - 32) * 5) / 9),
  };
  return tempsObj;
};
