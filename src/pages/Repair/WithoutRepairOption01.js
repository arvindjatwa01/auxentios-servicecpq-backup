import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Autocomplete } from "@mui/material";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AddOperation, fetchOperations } from "services/repairBuilderServices";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import SearchBox from "./components/SearchBox";
function WithoutRepairOption01(props) {
  const { activeElement, setActiveElement } = props.builderDetails;

  const history = useHistory();
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [operationViewOnly, setOperationViewOnly] = useState(false);
  const [operations, setOperations] = useState([]);
  const [noOptionsCompCode, setNoOptionsCompCode] = useState(false);
  const [noOptionsJobCode, setNoOptionsJobCode] = useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const newOperation = {
    header: "New Operation",
    operationNumber: "",
    jobCode: "",
    componentCode: "",
    componentCodeDescription: "",
    jobCodeDescription: "",
    modifier: "",
    description: "",
  };
  const [operationData, setOperationData] = useState(newOperation);
  useEffect(() => {
    fetchOperationsOfSegment();
  }, []);

  const fetchOperationsOfSegment = () => {
    if (activeElement.sId) {
      fetchOperations(activeElement.sId)
        .then((result) => {
          if (result?.length > 0) {
            setOperations(result);
            setOperationViewOnly(true);
            let lastOperation = result[result.length - 1];
            setOperationData({
              ...lastOperation,
              header:
                "Operation " +
                lastOperation.operationNumber +
                " - " +
                lastOperation.modifierDescription, //Rename after modifications in UI
            });
          } else {
            setOperationData(newOperation);
          }
        })
        .catch((err) => {
          handleSnack("error", "Error occurred while fetching operations!");
        });
    } else {
      handleSnack("error", "Not a valid segment!");
    }
  };

  // Search Job Code
  const handleJobCodeSearch = async (searchText) => {
    setSearchJobCodeResults([]);
    operationData.jobCode = searchText;
    if (searchText) {
      await jobCodeSearch("jobCode~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchJobCodeResults(result);
            setNoOptionsJobCode(false);
          } else {
            setNoOptionsJobCode(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };
  // Select the job code from search result
  const handleJobCodeSelect = (type, currentItem) => {
    setOperationData({
      ...operationData,
      jobCode: currentItem.jobCode,
      jobCodeDescription: currentItem.description,
      description: operationData.componentCodeDescription
        ? currentItem.description + " " + operationData.componentCodeDescription
        : "",
    });
    setSearchJobCodeResults([]);
  };

  // Search component code
  const handleComponentCodeSearch = async (searchText) => {
    setSearchCompCodeResults([]);
    operationData.componentCode = searchText;
    if (searchText) {
      await getComponentCodeSuggetions("componentCode~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCompCodeResults(result);
            setNoOptionsCompCode(false);
          } else {
            setNoOptionsCompCode(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the component!");
        });
    }
  };
  // Select the job code from search result
  const handleCompCodeSelect = (type, currentItem) => {
    setOperationData({
      ...operationData,
      componentCode: currentItem.componentCode,
      componentCodeDescription: currentItem.description,
      // description: currentItem.componentCode + " - " + currentItem.description,
      description: operationData.jobCodeDescription
        ? operationData.jobCodeDescription + " " + currentItem.description
        : "",
    });
    setSearchCompCodeResults([]);
  };

  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const handleAnchors = (direction) => {
    console.log("entered handle anchors");
    if (operationData.operationNumber > 1 && direction === "backward") {
      let operationToLoad = operations.filter(
        (x) => x.operationNumber === operationData.operationNumber - 1
      );
      setOperationData({
        ...operationToLoad[0],
        header:
          "Operation " +
          operationToLoad[0].operationNumber +
          " - " +
          operationToLoad[0].modifierDescription, //Rename once changed in API
      });
    } else if (
      operationData.operationNumber < operations.length &&
      direction === "forward"
    ) {
      let operationToLoad = operations.filter(
        (x) => x.operationNumber === operationData.operationNumber + 1
      );
      setOperationData({
        ...operationToLoad[0],
        header:
          "Operation " +
          operationToLoad[0].operationNumber +
          " - " +
          operationToLoad[0].modifierDescription, //Rename
      });
    }
  };

  const handleCreateOperation = () => {
    let sid = activeElement?.sId ? activeElement.sId : 77;
    let data = {
      jobCode: operationData.jobCode,
      jobCodeDescription: operationData.jobCodeDescription,
      componentCode: operationData.componentCode,
      componentCodeDescription: operationData.componentCodeDescription,
      modifier: operationData.modifier,
      modifierDescription: operationData.description,
    };
    AddOperation(sid, data)
      .then((result) => {
        setOperationData({
          ...operationData,
          operationNumber: result.operationNumber,
          description: result.modifierDescription,
          header:
            "Operation " +
            result.operationNumber +
            " - " +
            result.modifierDescription, //Rename to description once API is changed
        });
        operations.push(result);
        setOperationViewOnly(true);
        handleSnack(
          "success",
          `Successfully added Operation ${result.segmentNumber} details!`
        );
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while saving the segment data!");
      });
  };
  const loadNewOperationUI = () => {
    setOperationViewOnly(false);
    setOperationData(newOperation);
  };

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="card p-4 mt-5">
        <div className="d-flex justify-content-end align-items-center mb-0">
          <div className="text-right">
            <button
              onClick={() => handleAnchors("backward")}
              className="btn-no-border"
              disabled={!(operationData.operationNumber > 1)}
            >
              <KeyboardArrowLeftIcon />
            </button>
            <span className="text-primary">{operationData.header}</span>
            <button
              onClick={() => handleAnchors("forward")}
              className="btn-no-border"
              disabled={!(operationData.operationNumber !== operations.length)}
            >
              <KeyboardArrowRightIcon />
            </button>

            <button className="btn-no-border ml-2" onClick={loadNewOperationUI}>
              <span className="ml-2">
                <AddIcon />
              </span>
              Add New
            </button>
          </div>
        </div>
        <h5 className="d-flex align-items-center mb-0">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 white-space">{operationData.header}</span>
          </div>
          <div className="hr"></div>
        </h5>
        {!operationViewOnly ? (
          <>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    JOB CODE
                  </label>
                  <SearchBox
                    value={operationData.jobCode}
                    onChange={(e) => handleJobCodeSearch(e.target.value)}
                    type="jobCode"
                    result={searchJobCodeResults}
                    onSelect={handleJobCodeSelect}
                    noOptions={noOptionsJobCode}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    JOB CODE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.jobCodeDescription}
                    disabled
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    COMPONENT CODE
                  </label>
                  <SearchBox
                    value={operationData.componentCode}
                    onChange={(e) => handleComponentCodeSearch(e.target.value)}
                    type="componentCode"
                    result={searchCompCodeResults}
                    onSelect={handleCompCodeSelect}
                    noOptions={noOptionsCompCode}
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    COMPONENT CODE DESCRIPTION
                  </label>
                  <input
                    type="email"
                    class="form-control border-radius-10"
                    value={operationData.componentCodeDescription}
                    placeholder="Required"
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    MODIFIER
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.modifier}
                    onChange={(e) =>
                      setOperationData({
                        ...operationData,
                        modifier: e.target.value,
                      })
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    class="form-control border-radius-10"
                    value={operationData.description}
                    disabled
                    placeholder="Required"
                  />
                </div>
              </div>
            </div>
            <div className=" text-right">
              <button
                className="btn border bg-primary text-white"
                onClick={handleCreateOperation}
                disabled={
                  !(
                    operationData.componentCode &&
                    operationData.componentCodeDescription &&
                    operationData.jobCode &&
                    operationData.jobCodeDescription &&
                    operationData.description
                  )
                }
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <React.Fragment>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    OPERATION #
                  </p>
                  <h6 className="font-weight-600">
                    {operationData.operationNumber}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    COMPONENT CODE
                  </p>
                  <h6 className="font-weight-600">
                    {operationData.componentCode}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    JOB CODE DESCRIPTION{" "}
                  </p>
                  <h6 className="font-weight-600">
                    {operationData.jobCodeDescription}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    COMPONENT CODE DESCRIPTION
                  </p>
                  <h6 className="font-weight-600">
                    {operationData.componentCodeDescription}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                  <h6 className="font-weight-600">
                    {operationData.jobCodeDescription}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">MODIFIER </p>
                  <h6 className="font-weight-600">{operationData.modifier}</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    DESCRIPTION
                  </p>
                  <h6 className="font-weight-600">
                    {operationData.description}
                  </h6>
                </div>
              </div>
            </div>
            <div className="Add-new-segment-div p-3 border-radius-10 mb-3">
              <button
                className="btn bg-primary text-white"
                onClick={() =>
                  setActiveElement({ ...activeElement, name: "segment" })
                }
              >
                Back
              </button>
              <button
                // to="/RepairServiceEstimate"
                onClick={() =>
                  setActiveElement({ name: "service", oId: operationData.id })
                }
                className="btn bg-primary text-white ml-2"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Add Service Estimate
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
}

export default WithoutRepairOption01;
