import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

const Profile = ({
  clothingItems,
  handleSelectedCard,
  handleAddNew,
  handleEditProfileModal,
  onCardLike,
  handleLogOut,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar
        handleEditProfileModal={handleEditProfileModal}
        handleLogOut={handleLogOut}
      />
      <ClothesSection
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleAddNew={handleAddNew}
        handleSelectedCard={handleSelectedCard}
      />
    </div>
  );
};

export default Profile;
