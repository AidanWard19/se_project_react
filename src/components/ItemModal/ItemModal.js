import "./ItemModal.css";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, openModal }) => {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(selectedCard, currentUser);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item-modal__delete-button ${
    isOwn
      ? "item-modal__delete-button_visible"
      : "item-modal__delete-button_hidden"
  }`;

  return (
    <div className={"modal item-modal"}>
      <div className="item-modal__content">
        <button
          className="item-modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="item-modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />

        <div className="item-modal__footer">
          <div className="item-modal__info">
            <div className="item-modal__item-name">{selectedCard.name}</div>
            <div className="item-modal__item-weather-type">
              Weather type: {selectedCard.weather}
            </div>
          </div>

          <button
            onClick={openModal}
            className={itemDeleteButtonClassName}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
