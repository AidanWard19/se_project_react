import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ItemModal from "../ItemModal/ItemModal";
import { getApiWeatherData, parseWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Switch, Route, useHistory } from "react-router-dom";
import api from "../../utils/api";
import { login, register, checkToken } from "../../utils/auth";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

//
//
//

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [tempsObject, setTempsObject] = React.useState({ F: 0, C: 0 });
  const [sunrise, setSunrise] = React.useState(1698361876141);
  const [sunset, setSunset] = React.useState(1698361876141);
  const [weatherId, setWeatherId] = React.useState(400);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [firstLetter, setFirstLetter] = React.useState("");

  const history = useHistory();
  // Handlers
  //
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleConfirmModal = () => {
    setActiveModal("confirm");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleUnitToggle = () => {
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    }
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  };
  const handleAddItem = (item) => {
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

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    return login({ email, password }).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        checkToken(res.token)
          .then((user) => {
            setCurrentUser(user);
            if (!user.avatar) {
              setFirstLetter(Array.from(res.name)[0]);
            }
            history.push("/profile");
            handleCloseModal();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      }
    });
  };

  const handleRegister = (data) => {
    console.log(data);
    setIsLoading(true);
    return register(data)
      .then(() => {
        handleLogin(data);
        history.push("/profile");
        handleCloseModal();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    console.log(isLiked);
    isLiked
      ? api
          .removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c.owner === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : api
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c.owner === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    return api
      .editProfile({ name, avatar })
      .then((updated) => {
        console.log(updated.user);
        setCurrentUser(updated.user);
        handleCloseModal();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // useEffects
  //
  React.useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    const handleClickAwayClose = (event) => {
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
        const location = data.name;
        const sys = data.sys;
        const tempsObj = parseWeatherData(data);
        setTempsObject(tempsObj);
        setSunrise(sys.sunrise);
        setSunset(sys.sunset);
        setLocation(location);
        setWeatherId(data.weather[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            if (!res.avatar) {
              setFirstLetter(Array.from(res.name)[0]);
            }
          }
        })
        .then(() => {
          history.push("/profile");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleUnitToggle }}
        >
          <Header
            place={location}
            onCreateModal={handleCreateModal}
            onLoginModal={handleLoginModal}
            onRegisterModal={handleRegisterModal}
            isLoggedIn={isLoggedIn}
            firstLetter={firstLetter}
          />
          <Switch>
            <Route exact path="/">
              <Main
                sunrise={sunrise}
                sunset={sunset}
                weatherId={weatherId}
                weatherTempsObj={tempsObject}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                onCardLike={handleCardLike}
              />
            </Route>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
              <Profile
                clothingItems={clothingItems}
                handleSelectedCard={handleSelectedCard}
                handleAddNew={handleCreateModal}
                handleEditProfileModal={handleEditModal}
                onCardLike={handleCardLike}
                handleLogOut={handleLogOut}
              />
            </ProtectedRoute>
          </Switch>

          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              handleAddItem={handleAddItem}
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
              openModal={handleConfirmModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              onSubmit={handleLogin}
              onClose={handleCloseModal}
              isLoading={isLoading}
              onOrRegister={handleRegisterModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              onSubmit={handleRegister}
              onClose={handleCloseModal}
              isLoading={isLoading}
              onOrLogIn={handleLoginModal}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              onClose={handleCloseModal}
              isLoading={isLoading}
              onSubmit={handleEditProfileSubmit}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
