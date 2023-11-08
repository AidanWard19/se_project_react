import "./WeatherCard.css";
import { weatherList } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import React from "react";

const WeatherCard = ({ isDay, type, weatherTemp }) => {
  // console.log(isDay);
  // console.log(type);
  const { currentTemperatureUnit, handleUnitToggle } = React.useContext(
    CurrentTempUnitContext
  );

  const currentWeather = weatherList.find((condition) => {
    return condition.isDay === isDay && condition.type === type;
  });

  const currentWeatherUrl = currentWeather?.url;

  return (
    <div className="weather" id="weather">
      <div className="weather__temp">
        {weatherTemp} °{currentTemperatureUnit}
      </div>
      <img
        className="weather__image"
        src={currentWeatherUrl}
        alt="weather display"
      />
    </div>
  );
};

export default WeatherCard;
