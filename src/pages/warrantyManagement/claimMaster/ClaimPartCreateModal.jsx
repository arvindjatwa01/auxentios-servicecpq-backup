import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import SearchBox from "pages/Common/SearchBox";
import { sparePartSearch } from "services/searchServices";

const ClaimPartCreateModal = ({
  show,
  hideModal,
  handleSnack,
  setNewPartRecord,
}) => {
  const [recordData, setRecordData] = useState({
    partNumber: "",
    partDescription: "",
    quantity: "",
    analysis: "",
  });

  const [searchPartsResult, setSearchPartsResult] = useState([]);
  const [noOptionsParts, setNoOptionsParts] = useState(false);

  // change input fields values
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // Search Part with part number
  const handlePartSearch = async (searchCustfieldName, searchText) => {
    setSearchPartsResult([]);

    recordData.partNumber = searchText;
    // customerData.customerID = searchText;
    if (searchText) {
      await sparePartSearch(`partNumber~${searchText}`)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchPartsResult(result);
            setNoOptionsParts(false);
          } else {
            setNoOptionsParts(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the part number from search result
  const handlePartSelect = (type, currentItem) => {
    setRecordData({
      ...recordData,
      partNumber: currentItem.partNumber,
      partDescription: currentItem.partDescription,
    });
    setSearchPartsResult([]);
  };

  // save new part record
  const handleSavePartsData = () => {
    setNewPartRecord((pre) => [
      ...pre,
      {
        ...recordData,
        index: Math.floor(Math.random() * 1000) + 100,
      },
    ]);
    hideModal();
  };

  return (
    <Modal show={show} onHide={hideModal} size="lg" centered>
      <Modal.Body>
        <h5>Create New Part</h5>
        <div className="card border px-3 py-2 mb-2">
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART NUMBER
                </label>
                <SearchBox
                  value={recordData.partNumber}
                  onChange={(e) =>
                    handlePartSearch("customerId", e.target.value)
                  }
                  type="partNumber"
                  result={searchPartsResult}
                  onSelect={handlePartSelect}
                  noOptions={noOptionsParts}
                  placeholder="Search Part Number"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART DESCRIPTION
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
                <label className="text-light-dark font-size-12 font-weight-500">
                  QUANTITY
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
                <label className="text-light-dark font-size-12 font-weight-500">
                  ANALYSIS
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

export default ClaimPartCreateModal;
