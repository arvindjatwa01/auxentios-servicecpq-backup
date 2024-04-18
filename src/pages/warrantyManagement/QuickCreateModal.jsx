import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE_SELECT } from "pages/Common/constants";
import { claimRequestTypeOptions } from "./warrantyManagementConstants";
import { customerSearch } from "services/searchServices";
import SearchBox from "pages/Common/SearchBox";

const QuickCreateModal = ({
  show,
  hideModal,
  handleSnack,
  setPwaNumber,
  setWarrantyRequestType,
  openWarrantyDetailsModal,
}) => {
  const [recordData, setRecordData] = useState({
    requesterDetails: "",
    requestType: "",
    customerId: "",
    reference: "",
  });

  const [searchCustResults, setSearchCustResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);

  // input field text change
  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    setSearchCustResults([]);
    recordData.customerId = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCustResults(result);
            setNoOptionsCust(false);
          } else {
            setNoOptionsCust(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setRecordData({
      ...recordData,
      customerId: currentItem.customerId,
      // customerName: currentItem.fullName,
      // contactEmail: currentItem.email,
    });
    setSearchCustResults([]);
  };

  //
  const handleCreateWarranty = () => {
    const pwaNumber = `AC${Math.floor(Math.random() * 90000) + 100000}`;
    handleSnack("success", `Authorization code ${pwaNumber} created successfully.`)
    setPwaNumber(pwaNumber);
    openWarrantyDetailsModal();
  };

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header className="d-block mb-0 pb-0">
        <Modal.Title className="h5">Quick Create</Modal.Title>
        <p>
          Create a warranty request, For pre authorization codes choose request
          type as PWA
        </p>
      </Modal.Header>
      <Modal.Body>
        <span>PARTNER</span>
        <div className="row input-fields">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                ENTER REQUESTER DETAILS HERE
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="requesterDetails"
                placeholder="Requester Details"
                value={recordData.requesterDetails}
                onChange={handleInputTextChange}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                WARRANTY REQUEST TYPE
              </label>
              <Select
                onChange={(e) => {
                  setRecordData({
                    ...recordData,
                    requestType: e,
                  });
                  setWarrantyRequestType(e);
                }}
                options={claimRequestTypeOptions}
                value={recordData.requestType}
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
              <SearchBox
                value={recordData.customerId}
                onChange={(e) => handleCustSearch("customerId", e.target.value)}
                type="customerId"
                result={searchCustResults}
                onSelect={handleCustSelect}
                noOptions={noOptionsCust}
              />
              {/* <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="customerNumber"
                placeholder="Enter Customer Number"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              /> */}
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
                value={recordData.reference}
                onChange={handleInputTextChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-border-primary w-100" onClick={hideModal}>
          Cancel
        </button>
        <button
          className="btn btn-primary w-100"
          onClick={handleCreateWarranty}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickCreateModal;
