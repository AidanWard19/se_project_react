import React from "react";
import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //   const [currentTemperatureUnit, setCurrentTemperatureUnit] =
  //     React.useState("F");

  //   const handleUnitToggle = (event) => {
  //     if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  //     if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  //   };

  const { currentTemperatureUnit, handleUnitToggle } = React.useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__checkbox"
        onChange={handleUnitToggle}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
