import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { currentTime } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import React from "react";
import "./Main.css";

function Main({
  sunrise,
  sunset,
  weatherId,
  weatherTempsObj,
  onSelectCard,
  clothingItems,
}) {
  const { currentTemperatureUnit, handleUnitToggle } = React.useContext(
    CurrentTempUnitContext
  );
  console.log(clothingItems);
  const weatherTemp = weatherTempsObj?.[currentTemperatureUnit] || 0;

  const getWeatherType = () => {
    if (weatherTempsObj?.["F"] >= 86) {
      return "hot";
    } else if (weatherTempsObj?.["F"] >= 66 && weatherTempsObj?.["F"] <= 85) {
      return "warm";
    } else if (weatherTempsObj?.["F"] <= 65) {
      return "cold";
    }
  };

  const getIsDay = () => {
    const sunriseUnix = sunrise * 1000;
    const sunsetUnix = sunset * 1000;
    // console.log(sunriseUnix, sunsetUnix, currentTime);
    if (sunsetUnix >= currentTime && currentTime >= sunriseUnix) {
      return true;
    } else if (sunsetUnix <= currentTime && currentTime <= sunriseUnix) {
      return false;
    } else {
      return false;
    }
  };

  const getWeatherCondition = () => {
    console.log(weatherId);

    if (200 <= weatherId && weatherId <= 232) {
      return "storm";
    } else if (300 <= weatherId && weatherId <= 531) {
      return "rain";
    } else if (600 <= weatherId && weatherId <= 622) {
      return "snow";
    } else if (weatherId === 800) {
      return "clear";
    } else if (801 <= weatherId && weatherId <= 804) {
      return "cloudy";
    }
  };

  const weatherType = getWeatherType();
  const isDay = getIsDay();
  const weatherCondition = getWeatherCondition();
  console.log(weatherCondition);
  const filteredCards = clothingItems.filter((item) => {
    console.log(item.weather);
    return item.weather === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard
        isDay={isDay}
        type={weatherCondition}
        weatherTemp={weatherTemp}
      />
      <section className="main__section" id="main-section">
        <div className="main__section-title">
          Today is {weatherTemp}°{currentTemperatureUnit} / You may want to
          wear:
        </div>

        <div className="main__items">
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
