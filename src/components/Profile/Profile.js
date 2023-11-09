import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import avatar from "../../images/avatar.svg";

const Profile = ({ clothingItems, handleSelectedCard }) => {
  return (
    <div className="profile">
      <div className="profile__header">
        <img className="profile__avatar" src={avatar} alt="avatar" />
        <div className="profile__name">Terrence Tegegne</div>
      </div>
      <div className="profile__clothes-section">
        <div className="profile__clothes-header">
          <div className="profile__your-items">Your Items</div>
          <div className="profile__add-new">+ Add new</div>
        </div>

        <div className="profile__clothes-gallery">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={handleSelectedCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
