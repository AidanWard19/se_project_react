import { APIkey, latitude, longitude } from "./constants";

export const getApiWeatherData = () => {
  const apiWeather =
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
      `).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
