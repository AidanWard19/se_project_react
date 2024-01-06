import React from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, isLoading, onSubmit, onOrRegister }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      buttonText={isLoading ? "Loading ..." : "Next"}
      title={"Log In"}
      name={"Register"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="text"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="1"
          maxLength="300"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button
        className="modal__or-register-button"
        type="button"
        onClick={onOrRegister}
      >
        or Register
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
