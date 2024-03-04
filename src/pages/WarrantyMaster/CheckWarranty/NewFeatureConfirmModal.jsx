import React from "react";
import { Modal } from "react-bootstrap";

const NewFeatureConfirmModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  handleClickYes,
}) => {
  return (
    <Modal show={show} onHide={hideModal} centered size="sm">
      <Modal.Body>
        <h4>Can the component be evaluated/repaired onsite?</h4>
        <hr className="mb-0" />
        <div className="d-flex justify-content-around p-3">
          <button
            className="btn text-light border-light px-5 mx-2"
            onClick={hideModal}
          >
            No
          </button>
          <button
            className="btn btn-primary float-right px-5 mx-2"
            onClick={handleClickYes}
          >
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewFeatureConfirmModal;
