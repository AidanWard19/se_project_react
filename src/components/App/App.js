import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
// import Weather from "../Weather/Weather";
// import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getApiWeatherData, parseWeatherData } from "../../utils/weatherApi";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [location, setLocation] = React.useState("");
  // const [temp, setTemp] = React.useState(0);
  const [tempsObject, setTempsObject] = React.useState({ F: 0, C: 0 });
  const [sunrise, setSunrise] = React.useState(1698361876141);
  const [sunset, setSunset] = React.useState(1698361876141);
  const [weatherId, setWeatherId] = React.useState(400);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleUnitToggle = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  React.useEffect(() => {
    getApiWeatherData()
      .then((data) => {
        console.log(data);
        const location = data.name;
        // const main = data.main;
        // const temperature = main.temp;
        const sys = data.sys;
        const tempsObj = parseWeatherData(data);
        setTempsObject(tempsObj);
        setSunrise(sys.sunrise);
        setSunset(sys.sunset);
        // setTemp(temperature);
        setLocation(location);
        setWeatherId(data.weather[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTemperatureUnit, handleUnitToggle }}
      >
        <Header place={location} onCreateModal={handleCreateModal} />
        <Main
          sunrise={sunrise}
          sunset={sunset}
          weatherId={weatherId}
          weatherTempsObj={tempsObject}
          onSelectCard={handleSelectedCard}
        />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            buttonText="Add garment"
            title="New garment"
            onClose={handleCloseModal}
          >
            <label className="modal__label">
              Name
              <input
                className="modal__input"
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
              />
            </label>
            <label className="modal__label">
              Image
              <input
                className="modal__input"
                type="url"
                name="link"
                minLength="1"
                maxLength="300"
                placeholder="Image URL"
              />
            </label>
            <label className="modal__label">Select the weather type:</label>
            <div className="modal__temp-options-list">
              <div>
                <label className="modal__radio-option" id="hot">
                  <input
                    className="modal__radio-button"
                    type="radio"
                    id="hot"
                    value="hot"
                    name="weather-type"
                  />
                  <p className="modal__radio-label">Hot</p>
                </label>
              </div>
              <div>
                <label className="modal__radio-option" id="warm">
                  <input
                    className="modal__radio-button"
                    type="radio"
                    id="warm"
                    value="warm"
                    name="weather-type"
                  />
                  <p className="modal__radio-label">Warm</p>
                </label>
              </div>
              <div>
                <label className="modal__radio-option" id="cold">
                  <input
                    className="modal__radio-button"
                    type="radio"
                    id="cold"
                    value="cold"
                    name="weather-type"
                  />
                  <p className="modal__radio-label">Cold</p>
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
