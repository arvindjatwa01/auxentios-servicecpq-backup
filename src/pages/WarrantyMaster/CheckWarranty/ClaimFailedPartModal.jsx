import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ClaimFailedPartModal = ({ show, hideModal, newPartRecord }) => {
  const [recordData, setRecordData] = useState({
    partNumber: "",
    partDescription: "",
    quantity: "",
    analysis: "",
  });

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  const handleSavePartsData = () => {
    newPartRecord = {
      ...recordData,
      index: Math.floor(Math.random() * 1000) + 100,
    };
    hideModal();
  };
  return (
    <Modal show={show} onHide={hideModal} size={"md"} centered>
      <Modal.Body>
        <h4>Create New Part</h4>
        <div className="card border px-3 py-2 mb-2">
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Part Number
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  value={recordData.partNumber}
                  name="partNumber"
                  placeholder="Part Number"
                  onChange={handleInputFieldChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Part Description
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  value={recordData.partDescription}
                  name="partDescription"
                  placeholder="Part Description"
                  onChange={handleInputFieldChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  value={recordData.quantity}
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleInputFieldChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Analysis
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  value={recordData.analysis}
                  name="analysis"
                  placeholder="Analysis"
                  onChange={handleInputFieldChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            className="btn btn-light bg-primary text-white mx-2"
            onClick={handleSavePartsData}
          >
            Save & Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimFailedPartModal;
