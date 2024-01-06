import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, isLoading, onSubmit, onOrLogIn }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      buttonText={isLoading ? "Loading ..." : "Next"}
      title={"Sign up"}
      name={"Register"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          minLength="1"
          maxLength="30"
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={password}
          minLength="1"
          maxLength="300"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={name}
          minLength="1"
          maxLength="300"
          placeholder="Name"
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={avatar}
          minLength="1"
          maxLength="300"
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
        />
      </label>
      <button className="modal__or-button" type="button" onClick={onOrLogIn}>
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
