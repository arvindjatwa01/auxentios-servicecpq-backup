import SearchBox from "pages/Repair/components/SearchBox";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { sparePartSearch } from "services/searchServices";

const ClaimFailedPartModal = ({
  show,
  hideModal,
  newPartRecord,
  setNewPartRecord,
  handleSnack,
}) => {
  const [recordData, setRecordData] = useState({
    partNumber: "",
    partDescription: "",
    quantity: "",
    analysis: "",
  });

  const [searchPartsResult, setSearchPartsResult] = useState([]);
  const [noOptionsParts, setNoOptionsParts] = useState(false);

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
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

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    console.log("current Item", currentItem);
    setRecordData({
      ...recordData,
      partNumber: currentItem.partNumber,
      partDescription: currentItem.partDescription,
    });
    setSearchPartsResult([]);
  };

  const handleSavePartsData = () => {
    setNewPartRecord({
      ...recordData,
      index: Math.floor(Math.random() * 1000) + 100,
    });
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
                <SearchBox
                  value={recordData.partNumber}
                  onChange={(e) =>
                    handleCustSearch("customerId", e.target.value)
                  }
                  type="partNumber"
                  result={searchPartsResult}
                  onSelect={handleCustSelect}
                  noOptions={noOptionsParts}
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
