import React from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE_SELECT } from "pages/Common/constants";
import { claimRequestTypeOptions } from "./warrantyManagementConstants";

const QuickCreateModal = ({ show, hideModal, handleSnack }) => {
  return (
    <Modal show={true} onHide={hideModal} size="md">
      <Modal.Header className="d-block mb-0 pb-0">
        <Modal.Title className="h5">Quick Create</Modal.Title>
        <p>
          Create a warranty request, For pre authorization codes choose request
          type as PWA
        </p>
      </Modal.Header>
      <Modal.Body>
        <span>PATNER</span>
        <div className="row input-fields">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                ENTER REQUESTER DETAILS HERE
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="partnerDetails"
                placeholder="Partner Details"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                WARRANTY REQUEST TYPE
              </label>
              <Select
                // onChange={(e) =>
                //   setRecordData({
                //     ...recordData,
                //     requestType: e,
                //   })
                // }
                options={claimRequestTypeOptions}
                // value={recordData.requestType}
                styles={FONT_STYLE_SELECT}
              />
              <div className="css-w8dmq8">
                For request type PWA,GoodWill, and Late Warranty, search and add
                Customer ID if not available user reference field
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                CUSTOMER ID
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="customerNumber"
                placeholder="Enter Customer Number"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
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
                placeholder="if customer is not available in our database"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-border-primary w-100">Cancel</button>
        <button
          className="btn btn-primary w-100"
          // onClick={handleCreateClaimRecord}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickCreateModal;
