import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Profile = ({
  clothingItems,
  handleSelectedCard,
  handleAddNew,
  handleEditProfileModal,
  onCardLike,
  handleLogOut,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const usersItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__avatar-and-name">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
          <div className="profile__name">{currentUser.name}</div>
        </div>
        <div className="profile__change-data" onClick={handleEditProfileModal}>
          Change Profile Data
        </div>
        <div className="profile__logout" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
      <div className="profile__clothes-section">
        <div className="profile__clothes-header">
          <div className="profile__your-items">Your Items</div>
          <button onClick={handleAddNew} className="profile__add-new">
            + Add new
          </button>
        </div>

        <div className="profile__clothes-gallery">
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
    </div>
  );
};

export default Profile;
