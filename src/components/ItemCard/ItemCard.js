import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import React from "react";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    setIsLiked(item.likes.some((id) => id === currentUser._id));
  }, [currentUser]);

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  const handleLikeClick = (event) => {
    event.preventDefault();
    onCardLike({ id: item._id, isLiked, setIsLiked });
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
      <div className="card__header">
        <div className="card__name">
          <p className="card__name-text">{item.name}</p>
        </div>
        <div className="card__like-button-container">
          {currentUser.name && (
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
