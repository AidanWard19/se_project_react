import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card__element">
      <div>
        <img
          className="card__image"
          src={item.link}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card__name">
        <p className="card__name-text">{item.name}</p>
      </div>
    </div>
  );
};

export default ItemCard;
