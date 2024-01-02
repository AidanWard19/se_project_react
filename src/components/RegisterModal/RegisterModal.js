import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, isLoading, onSubmit }) => {
  return (
    <ModalWithForm
      onClose={onClose}
      buttonText={isLoading ? "Loading ..." : "Next"}
      title={"Sign up"}
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
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="url"
          name="link"
          minLength="1"
          maxLength="300"
          placeholder="Name"
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="link"
          minLength="1"
          maxLength="300"
          placeholder="Avatar URL"
        />
      </label>
      <button className="modal__or-button" type="submit">
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
