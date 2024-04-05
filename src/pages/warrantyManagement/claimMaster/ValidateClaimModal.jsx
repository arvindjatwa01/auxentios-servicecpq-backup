import React from "react";
import { Modal } from "react-bootstrap";

const ValidateClaimModal = ({ show, hideModal }) => {
  return (
    <Modal show={show} onHide={hideModal} size="md" centered>
      <Modal.Header className="py-2">
        <h4 className="mb-0">Warning</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="px-0">
          <div className="card border px-2 mb-3 ">
            <p className="my-2">1 warning found</p>
          </div>
          <div className="card border px-2 py-2 mb-0">
            <div className="d-flex justify-content-between align-item baseline">
              <div>
                <p className="mb-0">Outdated Price</p>
                <div className="d-flex mt-1 align-items-center ">
                  <span className="font-size-12">Part list table</span>
                  <span
                    className="mx-2"
                    style={{
                      height: "6px",
                      width: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#9ca5ae",
                    }}
                  ></span>
                  <span className="font-size-12">Parts price</span>
                </div>
                <div className="d-flex align-items-center my-2">
                  <span
                    className="font-size-12 font-weight-600"
                    style={{ color: "#000000" }}
                  >
                    Fix
                  </span>
                  <span className="font-size-12 ml-3">Ignore</span>
                </div>
              </div>
              <span>Just now</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <button
          className="btn btn-primary w-100"
          // onClick={handleCreateClaimRecord}
        >
          Go To
        </button> */}
        <button className="btn btn-border-primary w-50" onClick={hideModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ValidateClaimModal;
