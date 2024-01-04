import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  onCardLike,
  clothingItems,
  handleAddNew,
  handleSelectedCard,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const usersItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <div className="clothes-section__your-items">Your Items</div>
        <button onClick={handleAddNew} className="clothes-section__add-new">
          + Add new
        </button>
      </div>

      <div className="clothes-section__gallery">
        {usersItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={handleSelectedCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
