import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import React from "react";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  const handleLikeClick = (event) => {
    event.preventDefault();
    console.log("testing");
    onCardLike({ id: item.owner, isLiked });
  };

  return (
    <div className="card__element">
      <div>
        <img
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card__name">
        <p className="card__name-text">{item.name}</p>
        <div className="card__like-button-container">
          {currentUser && (
            <button
              className={`card__like-button ${likeButtonClassName}`}
              onClick={handleLikeClick}
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
