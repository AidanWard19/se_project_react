import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { currentTime } from "../../utils/constants";
// import { useMemo } from "react";

function Main({ sys, weather, weatherTemp, onSelectCard }) {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const getIsDay = () => {
    const sunriseUnix = sys.sunrise * 1000;
    const sunsetUnix = sys.sunset * 1000;
    // const sunriseTime = new Date(sunriseUnix * 1000).toLocaleString("default");
    // const sunsetTime = new Date(sunsetUnix * 1000).toLocaleString("default");

    console.log(sunriseUnix, sunsetUnix, currentTime);
    if (sunsetUnix >= currentTime >= sunriseUnix) {
      return true;
    } else if (sunsetUnix <= currentTime) {
      return false;
    } else {
      console.log("error with isDay logic");
    }
  };

  const getWeatherCondition = () => {
    const weatherId = weather.id;
    if (200 <= weatherId <= 232) {
      return "storm";
    } else if (300 <= weatherId <= 531) {
      return "rain";
    } else if (600 <= weatherId <= 622) {
      return "snow";
    } else if (weatherId === 800) {
      return "clear";
    } else if (801 <= weatherId <= 804) {
      return "cloudy";
    }
  };

  const weatherType = getWeatherType();
  const isDay = getIsDay();
  const weatherCondition = getWeatherCondition();
  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      {/* need to pass weathercard api values for accurate picture */}
      <WeatherCard
        isDay={isDay}
        type={weatherCondition}
        weatherTemp={weatherTemp}
      />
      <section className="card__section" id="card-section">
        <div className="card__section-title">
          Today is {weatherTemp}°F / You may want to wear:
        </div>

        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
