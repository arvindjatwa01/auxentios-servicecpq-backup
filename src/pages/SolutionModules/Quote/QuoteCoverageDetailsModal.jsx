import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";
import $ from "jquery";

import { callGetApi } from "services/ApiCaller";
import { CUSTOM_COVERAGE_REST, GET_SEARCH_COVERAGE } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { getApiCall } from "services/searchQueryService";
import { coverageFleetSizeOptions } from "pages/Common/PortfolioAndSolutionConstants";

const recordObj = {
  customCoverageId: 0,
  serviceId: 0,
  modelNo: "",
  serialNumber: "",
  startSerialNumber: "",
  endSerialNumber: "",
  serialNumberPrefix: "",
  family: "",
  make: "",
  fleet: "",
  fleetSize: "SMALL",
  location: "",
  startDate: new Date(),
  endDate: new Date(),
  actions: "",
};

const QuoteCoverageDetailsModal = ({ show, hideModal, recordId }) => {
  const [recordData, setRecordData] = useState({ ...recordObj });
  const [searchedModalList, setSearchedModalList] = useState([]);
  const [modalPrefixKeyValuePair, setModalPrefixKeyValuePair] = useState([]);

  useEffect(() => {
    if (recordId) {
      const rUrl = `${CUSTOM_COVERAGE_REST()}/${recordId}`;
      callGetApi(rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setRecordData(responseData);
          console.log("responseData :::: ", responseData);
        }
      });
    }
  }, [recordId]);

  // modal input search
  const handleModelSearchInput = (e) => {
    // setEditSerialNo({ ...editSerialNo, modelNo: e.target.value })
    var searchStr = "model~" + e.target.value;
    let loading, data, failure;
    getApiCall(GET_SEARCH_COVERAGE + searchStr, data)
      // getSearchQueryCoverage(searchStr)
      .then((res) => {
        $(`.scrollbar-model`).css("display", "block");
        setSearchedModalList(res);
        var preArr = [];
        for (var n = 0; n < res.length; n++) {
          preArr.push({ label: res[n].prefix, value: res[n].prefix });
        }
        setModalPrefixKeyValuePair(preArr);
      })
      .catch((err) => {
        return;
      });
  };

  // select search modal
  const handleSelectSearchModel = (currentItem) => {
    setRecordData({
      ...recordData,
      modelNo: currentItem.model,
      make: currentItem.make,
      family: currentItem.family,
    });
    $(`.scrollbar-model`).css("display", "none");
  };

  return (
    <Modal show={show} onHide={hideModal} centered size="lg">
      <Modal.Header className="align-items-center">
        <div>
          <Modal.Title>Edit Coverage</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="included_table">
        <div className="row input-fields">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Make
              </label>
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="make"
                placeholder="Auto Fill Search Model...."
                value={recordData.make}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Family
              </label>
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="family"
                placeholder="Auto Fill Search Model...."
                value={recordData.family}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Model No
              </label>
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="modelNo"
                placeholder="Model(Required*)"
                value={recordData.modelNo}
                onChange={(e) => {
                  handleModelSearchInput(e);
                  setRecordData({
                    ...recordData,
                    modelNo: e.target.value,
                  });
                }}
                readOnly
              />
              {
                <ul
                  className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                  id="style"
                >
                  {searchedModalList.map((currentItem, j) => (
                    <li
                      className="list-group-item"
                      key={j}
                      onClick={() => handleSelectSearchModel(currentItem)}
                    >
                      {currentItem.model}
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Serial No Prefix
              </label>
              <Select
                options={modalPrefixKeyValuePair}
                placeholder="Select..."
                value={recordData.serialNoPrefix}
                className="text-primary"
                // onChange={(e) =>
                //   handleCoverageInputChange(e, "serialNoPrefix", "select")
                // }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Start Serial No
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                placeholder="(Optional)"
                value={recordData.startSerialNumber}
                // onChange={(e) =>
                //   handleCoverageInputChange(e, "startSerialNumber", "text")
                // }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                End Serial No
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                placeholder="(Optional)"
                value={recordData.endSerialNumber}
                // onChange={(e) =>
                //   handleCoverageInputChange(e, "endSerialNumber", "text")
                // }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Fleet
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                placeholder="(Optional)"
                value={recordData.fleet}
                // onChange={(e) => handleCoverageInputChange(e, "fleet", "text")}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Fleet Size
              </label>
              <Select
                options={coverageFleetSizeOptions}
                placeholder="Select..."
                value={recordData.fleetSize}
                className="text-primary"
                // onChange={(e) =>
                //   handleCoverageInputChange(e, "fleetSize", "select")
                // }
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuoteCoverageDetailsModal;
