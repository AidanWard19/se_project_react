import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import ItemModal from "../ItemModal/ItemModal";
import { getApiWeatherData, parseWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import api from "../../utils/api";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/constants";

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
  const [clothingItems, setClothingItems] =
    React.useState(defaultClothingItems);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (!activeModal) return;
    const modal = document.querySelector(".modal");
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    const handleClickAwayClose = (event) => {
      if (event.target === event.currentTarget) {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    modal.addEventListener("click", handleClickAwayClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      modal.removeEventListener("click", handleClickAwayClose);
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

  const openConfirmModal = () => {
    setActiveModal("confirm");
  };

  const onAddItem = (item) => {
    console.log(item);
    api
      .addItem(item)
      .then((newItem) => {
        console.log(newItem);
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = () => {
    console.log(selectedCard, selectedCard._id);
    api
      .removeItem(selectedCard._id)
      .then(() => {
        return api.getItemList();
      })
      .then((newList) => {
        setClothingItems(newList);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    api
      .getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleUnitToggle }}
      >
        <Header place={location} onCreateModal={handleCreateModal} />
        <Switch>
          <Route exact path="/">
            <Main
              sunrise={sunrise}
              sunset={sunset}
              weatherId={weatherId}
              weatherTempsObj={tempsObject}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              clothingItems={clothingItems}
              handleSelectedCard={handleSelectedCard}
            />
          </Route>
        </Switch>

        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "confirm" && (
          <ModalWithConfirm
            onClose={handleCloseModal}
            onSubmit={handleDeleteItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            openModal={openConfirmModal}
            // ^^^ Couldn't I also just go back and turn my activeModal into a context and just have item modal set active modal to delete?
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
