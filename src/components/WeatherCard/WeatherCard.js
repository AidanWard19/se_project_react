import "./WeatherCard.css";
import { weatherList } from "../../utils/constants";

const WeatherCard = ({ isDay, type, weatherTemp }) => {
  console.log(isDay);
  console.log(type);

  const currentWeather = weatherList.find((condition) => {
    return condition.isDay === isDay && condition.type === type;
  });

  const currentWeatherUrl = currentWeather?.url;

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
