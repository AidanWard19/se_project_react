import "./WeatherCard.css";
import { weatherList } from "../../utils/constants";

const WeatherCard = ({ isDay, type, weatherTemp }) => {
  console.log(isDay);
  console.log(type);

  let currentWeatherUrl;

  const currentWeather = weatherList.find((condition) => {
    if (condition.isDay === isDay && condition.type === type) {
      currentWeatherUrl = condition.url;
      return true;
    }
  });
  console.log(currentWeather);

  return (
    <section className="weather" id="weather">
      <img
        className="weather__image"
        src={currentWeatherUrl}
        alt="weather display"
      />
      <div className="weather__temp">{weatherTemp} °F</div>
    </section>
  );
};

export default WeatherCard;
