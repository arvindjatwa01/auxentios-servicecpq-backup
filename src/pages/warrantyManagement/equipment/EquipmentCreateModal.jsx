import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE_SELECT } from "../../common/constants";
import { callPostApi } from "../../../services/ApiCaller";
import { API_SUCCESS } from "../../../services/ResponseCode";
import { CLAIM_MASTER_URL } from "../../../services/CONSTANTS";
import { claimRequestObj } from "../warrantyManagementConstants";

const requestTypeOptions = [
  { label: "Warranty", value: "WARRANTY" },
  { label: "Repair", value: "REPAIR" },
  { label: "Maintenance", value: "MAINTENANCE" },
];

const EquipmentCreateModal = ({
  show,
  hideModal,
  handleSnack,
  serialNumber,
  equipmentRecord,
  setClaimRecordId,
  setClaimRecordDetail,
  handleShowClaimDetailsModal,
}) => {
  const [recordData, setRecordData] = useState({
    requestType: "",
    serialNumber: serialNumber || "",
    description: "",
    reference: "",
  });

  const handleInputFieldsChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // create new claim create
  const handleCreateQuote = () => {
    const rObj = {
      ...claimRequestObj,
      modelNumber: equipmentRecord?.model,
      equipmentNumber: equipmentRecord?.equipmentNumber,
      serialNumber: equipmentRecord?.equipmentNumber,
      claimStatus: "REGISTERED",
      claimType: "STANDARD",
      payer: "CUSTOMER",
      claimNumber: Math.floor(Math.random() * 9000) + 1000,
      warrantyId: equipmentRecord?.warrantyId || 18,
    };
    const rUrl = `${CLAIM_MASTER_URL}`;
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimRecordId(responseData.claimId);
        setClaimRecordDetail(responseData);
        handleSnack("success", `Claim Number ${responseData.claimNumber} Created successfully.`);
        handleShowClaimDetailsModal();
      } else {
        handleSnack("error", `Something went wrong.`);
      }
    });
  };

  return (
    <Modal show={show} onHide={hideModal} size="md" centered>
      <Modal.Body>
        <h5 className="modal-title" id="exampleModalLabel">
          Quote Create
        </h5>
        <p>Generate a warranty / service request by using the verified data.</p>
        <div className="row input-fields mt-3">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                REQUEST TYPE
              </label>
              <Select
                // defaultValue={selectedOption}
                onChange={(e) =>
                  setRecordData({
                    ...recordData,
                    requestType: e,
                  })
                }
                options={requestTypeOptions}
                value={recordData.requestType}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                SERIAL NUMBER
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="serialNumber"
                placeholder="Serial Number"
                disabled
                value={recordData.serialNumber}
                onChange={handleInputFieldsChange}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                DESCRIPTION
              </label>
              <textarea
                className="form-control border-radius-10 text-primary"
                name="description"
                value={recordData.description}
                cols="30"
                rows="3"
                placeholder="Placeholder(Optional)"
                onChange={handleInputFieldsChange}
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                REFERENCE
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="reference"
                placeholder="Reference"
                value={recordData.reference}
                onChange={handleInputFieldsChange}
              />
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-between"></div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary w-100" onClick={handleCreateQuote}>
          Create
        </button>
        <button className="btn btn-border-primary w-100" onClick={hideModal}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EquipmentCreateModal;
