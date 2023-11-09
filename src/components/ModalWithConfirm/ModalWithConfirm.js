import "./ModalWithConfirm.css";

const ModalWithConfirm = ({ onClose, onSubmit, isLoading }) => {
  return (
    <div className="modal confirm-modal">
      <div className="confirm-modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__paragraph">
          <p className="modal__text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>

          <button
            onClick={onSubmit}
            type="button"
            className="modal__delete-button"
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>

          <button
            onClick={onClose}
            type="button"
            className="modal__cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWithConfirm;
