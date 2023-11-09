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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      console.log(e);
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    const handleClickAwayClose = (event) => {
      console.log(event);
      console.log(activeModal);
      if (event.target.classList[0] === "modal") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleClickAwayClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleClickAwayClose);
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
    setIsLoading(true);
    api
      .addItem(item)
      .then((newItem) => {
        console.log(newItem);
        setClothingItems([newItem, ...clothingItems]);
      })
      .then(() => {
        handleCloseModal();
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = () => {
    setIsLoading(true);
    api
      .removeItem(selectedCard._id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((c) => selectedCard._id !== c._id)
        );
      })
      .then(() => {
        handleCloseModal();
      })
      .then(() => {
        setIsLoading(false);
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
              handleAddNew={handleCreateModal}
            />
          </Route>
        </Switch>

        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
        )}
        {activeModal === "confirm" && (
          <ModalWithConfirm
            onClose={handleCloseModal}
            onSubmit={handleDeleteItem}
            isLoading={isLoading}
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
