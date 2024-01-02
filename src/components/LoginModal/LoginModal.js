import React from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, isLoading }) => {
  return (
    <ModalWithForm
      onClose={onClose}
      buttonText={isLoading ? "Loading ..." : "Next"}
      title={"Log In"}
      name={"Register"}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Email"
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="url"
          name="link"
          minLength="1"
          maxLength="300"
          placeholder="Password"
        />
      </label>
      <button className="modal__or-button" type="submit">
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
