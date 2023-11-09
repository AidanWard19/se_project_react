import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [weatherType, setWeatherType] = React.useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };
  const handleLinkChange = (event) => {
    setLink(event.target.value);
    console.log(event.target.value);
  };

  const handleWeatherTypeChange = (event) => {
    console.log(`pressed ${event.target.value}`);
    if (event.target.value === "hot") {
      setWeatherType("hot");
    } else if (event.target.value === "warm") {
      setWeatherType("warm");
    } else if (event.target.value === "cold") {
      setWeatherType("cold");
    }
    console.log(`now set to ${weatherType}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem({ name, link, weatherType });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
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
              onClick={handleWeatherTypeChange}
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
              onClick={handleWeatherTypeChange}
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
              onClick={handleWeatherTypeChange}
            />
            <p className="modal__radio-label">Cold</p>
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
