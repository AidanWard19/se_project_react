import "./ItemModal.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose }) => {
  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className={"item-modal"}>
      <div className="item-modal__content">
        <button
          className="item-modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="item-modal__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="item-modal__info">
          <div className="item-modal__item-name">{selectedCard.name}</div>
          <div className="item-modal__item-weather-type">
            Weather type: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
