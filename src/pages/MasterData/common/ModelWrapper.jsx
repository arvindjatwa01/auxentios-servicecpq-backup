import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalWrapper = ({
  show,
  hide,
  header,
  handleSubmit = null,
  children,
  size = null,
  ...options
}) => {
  const handleHide = () => {
    hide();
  };
  return (
    <Modal
      show={show}
      onHide={handleHide}
      size={size ? size : "lg"}
      {...options}
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          {handleSubmit && (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default ModalWrapper;
