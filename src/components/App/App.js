import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
// import Weather from "../Weather/Weather";
// import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getApiWeatherData } from "../../utils/utils";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [temp, setTemp] = React.useState(0);
  const [sunrise, setSunrise] = React.useState(1698361876141);
  const [sunset, setSunset] = React.useState(1698361876141);
  const [weatherId, setWeatherId] = React.useState(400);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  React.useEffect(() => {
    getApiWeatherData().then((data) => {
      console.log(data);
      const location = data.name;
      const main = data.main;
      const temperature = main.temp;
      const sys = data.sys;
      setSunrise(sys.sunrise);
      setSunset(sys.sunset);
      setTemp(temperature);
      setLocation(location);
      setWeatherId(data.weather[0].id);
    });
  }, []);

  return (
    <div>
      <Header place={location} onCreateModal={handleCreateModal} />
      <Main
        sunrise={sunrise}
        sunset={sunset}
        weatherId={weatherId}
        weatherTemp={temp}
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
              <input type="radio" id="hot" value="hot" name="weather type" />
              <label className="modal__radio-label" id="hot">
                Hot
              </label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" name="weather type" />
              <label className="modal__radio-label" id="warm">
                Warm
              </label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" name="weather type" />
              <label className="modal__radio-label" id="cold">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
