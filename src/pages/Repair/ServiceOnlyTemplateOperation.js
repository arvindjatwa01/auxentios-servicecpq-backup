import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import React, { useEffect, useState } from "react";
import { AddOperation, fetchOperations } from "services/repairBuilderServices";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import SearchBox from "./components/SearchBox";
import { NEW_OPERATION } from "./CONSTANTS";
import LoadingProgress from "./components/Loader";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ReadOnlyField } from "./components/ReadOnlyField";

function ServiceOnlyTemplateOperation(props) {
  const { activeElement, setActiveElement } = props.templateDetails;

  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [operationViewOnly, setOperationViewOnly] = useState(false);
  const [operations, setOperations] = useState([]);
  const [noOptionsCompCode, setNoOptionsCompCode] = useState(false);
  const [noOptionsJobCode, setNoOptionsJobCode] = useState(false);
  const [showAddNewButton, setShowAddNewButton] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const newOperation = {
    header: NEW_OPERATION,
    operationNumber: "",
    jobCode: "",
    componentCode: "",
    componentCodeDescription: "",
    jobCodeDescription: "",
    modifier: "",
    description: "",
    requiredIndicator: true,
  };
  const [operationData, setOperationData] = useState(newOperation);
  useEffect(() => {
    fetchOperationsOfSegment();
  }, []);

  const fetchOperationsOfSegment = () => {
    setOperationLoading(true);
    if (activeElement.sId) {
      fetchOperations(activeElement.sId)
        .then((result) => {
          if (result?.length > 0) {
            setOperations(result);
            setOperationViewOnly(true);
            // Default last operation or selected operation for back traverse from service estimate
            let opToLoad = activeElement.oId
              ? result.filter((x) => x.id === activeElement.oId)[0]
              : result[result.length - 1];

            setOperationData({
              ...opToLoad,
              header:
                "Operation " +
                formatOperationNum(opToLoad.operationNumber) +
                " - " +
                opToLoad.description, //Rename after modifications in UI
            });
          } else {
            loadNewOperationUI();
          }
          setOperationLoading(false);
        })
        .catch((err) => {
          loadNewOperationUI();
          handleSnack(
            "error",
            "Error occurred while fetching the existing operations!"
          );
          setOperationLoading(false);
        });
    } else {
      handleSnack("error", "Not a valid segment!");
      setOperationLoading(false);
    }
  };

  function formatOperationNum(num) {
    return String(num).padStart(3, "0");
  }

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
    if (direction === "backward") {
      let operationToLoad = [];
      if (operationData.header === NEW_OPERATION) {
        operationToLoad = operations.filter(
          (x) => x.operationNumber === operations.length - 1
        );
        setOperationViewOnly(true);
      } else {
        operationToLoad = operations.filter(
          (x) => x.operationNumber === operationData.operationNumber - 1
        );
      }
      setOperationData({
        ...operationToLoad[0],
        header:
          "Operation " +
          formatOperationNum(operationToLoad[0].operationNumber) +
          " - " +
          operationToLoad[0].description, //Rename once changed in API
      });
    } else if (direction === "forward") {
      let operationToLoad = [];
      if (
        operations[operations.length - 1].header === NEW_OPERATION &&
        operations.length - 1 === operationData.operationNumber
      ) {
        setOperationData({ ...operations[operations.length - 1] });
        setOperationViewOnly(false);
      } else if (operations.length > operationData.operationNumber) {
        operationToLoad = operations.filter(
          (x) => x.operationNumber === operationData.operationNumber + 1
        );
        setOperationData({
          ...operationToLoad[0],
          header:
            "Operation " +
            formatOperationNum(operationToLoad[0].operationNumber) +
            " - " +
            operationToLoad[0].description, //Rename
        });
      }
    }
  };

  const handleCreateOperation = () => {
    let sid = activeElement?.sId;
    let data = {
      jobCode: operationData.jobCode,
      jobCodeDescription: operationData.jobCodeDescription,
      componentCode: operationData.componentCode,
      componentCodeDescription: operationData.componentCodeDescription,
      // modifier: operationData.modifier,
      description: operationData.description,
    };
    AddOperation(sid, data)
      .then((result) => {
        setOperationData({
          ...operationData,
          operationNumber: result.operationNumber,
          description: result.description,
          id: result.id,
          header:
            "Operation " +
            formatOperationNum(result.operationNumber) +
            " - " +
            result.description, //Rename to description once API is changed
        });
        operations[operations.length - 1] = result;
        setShowAddNewButton(true);
        setOperationViewOnly(true);
        handleSnack(
          "success",
          `Successfully added Operation ${result.operationNumber} details!`
        );
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while saving the operation data!");
      });
  };
  const loadNewOperationUI = () => {
    setOperationViewOnly(false);
    setOperationData(newOperation);
    operations.push(newOperation);
    setShowAddNewButton(false);
  };

  const handleCancelOperation = () => {
    if (operations.length > 1) {
      operations.splice(
        operations.findIndex((a) => a.header === NEW_OPERATION),
        1
      );
      setOperationData({
        ...operations[operations.length - 1],
        header:
          "Operation " +
          formatOperationNum(
            operations[operations.length - 1].operationNumber
          ) +
          " - " +
          operations[operations.length - 1].description,
      });
      setShowAddNewButton(true);
      setOperationViewOnly(true);
    } else {
      setActiveElement({ ...activeElement, name: "segment" });
    }
  };
  // To indicate whether operation price will be included in total price
  const handleChangeSwitch = (event) => {
    setOperationData({
      ...operationData,
      requiredIndicator: event.target.checked,
    });
    // updateOperation(activeElement.sId, {
    //   requiredIndicator: event.target.checked,
    // })
    //   .then((result) => {
    //     handleSnack("success", "Segment updated successfully!");
    //   })
    //   .catch((e) => {
    //     handleSnack("error", "Error occured while updating the details!");
    //   });
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
              disabled={
                !(
                  operationData.operationNumber > 1 ||
                  (operationData.header === NEW_OPERATION &&
                    operations.length > 1)
                )
              }
            >
              <KeyboardArrowLeftIcon />
            </button>
            <span className="text-primary">{operationData.header}</span>
            <button
              onClick={() => handleAnchors("forward")}
              className="btn-no-border"
              disabled={
                operationData.operationNumber === operations.length ||
                operationData.header === NEW_OPERATION
              }
            >
              <KeyboardArrowRightIcon />
            </button>
            {showAddNewButton &&
              ["DRAFT", "REVISED"].indexOf(activeElement?.templateStatus) >
                -1 && (
                <button
                  className="btn-no-border ml-2"
                  onClick={loadNewOperationUI}
                >
                  <span className="ml-2">
                    <AddIcon />
                  </span>
                  Add New Operation
                </button>
              )}
          </div>
        </div>
        <h5 className="d-flex align-items-center mb-0">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 white-space">{operationData.header}</span>
          </div>
          <div className="hr"></div>
        </h5>
        {operationLoading ? (
          <LoadingProgress />
        ) : (
          <>
            <div className="col-md-12 col-sm-12">
              <div className=" d-flex justify-content-between align-items-center">
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={operationData.requiredIndicator}
                          onChange={handleChangeSwitch}
                          name="operationRequired"
                        />
                      }
                      label="REQUIRED"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            {!operationViewOnly ? (
              <>
                <div className="row mt-4 input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        TITLE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        value={operationData.description}
                        onChange={(e) =>
                          setOperationData({
                            ...operationData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Auto Filled"
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6"></div>
                  <div className="col-md-6 col-sm-6">
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
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB CODE DESCRIPTION
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        value={operationData.jobCodeDescription}
                        disabled
                        placeholder="Auto Filled"
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        COMPONENT CODE
                      </label>
                      <SearchBox
                        value={operationData.componentCode}
                        onChange={(e) =>
                          handleComponentCodeSearch(e.target.value)
                        }
                        type="componentCode"
                        result={searchCompCodeResults}
                        onSelect={handleCompCodeSelect}
                        noOptions={noOptionsCompCode}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        COMPONENT CODE DESCRIPTION
                      </label>
                      <input
                        type="email"
                        class="form-control border-radius-10"
                        value={operationData.componentCodeDescription}
                        placeholder="Auto Filled"
                        disabled
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                </div>

                <div className=" text-right">
                  {operations.length > 0 && (
                    <button
                      className="btn border bg-primary text-white mr-2"
                      onClick={handleCancelOperation}
                    >
                      Cancel
                    </button>
                  )}
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
                      ) ||
                      noOptionsCompCode ||
                      noOptionsJobCode
                    }
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <React.Fragment>
                <div className="row mt-4">
                  <ReadOnlyField
                    label="OPERATION #"
                    value={String(operationData.operationNumber).padStart(
                      3,
                      "0"
                    )}
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="TITLE"
                    value={operationData.description}
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="JOB CODE"
                    value={
                      operationData.jobCode +
                      " - " +
                      operationData.jobCodeDescription
                    }
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="COMPONENT CODE"
                    value={
                      operationData.componentCode +
                      " - " +
                      operationData.componentCodeDescription
                    }
                    className="col-md-4 col-sm-4"
                  />
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
                      setActiveElement({
                        ...activeElement,
                        name: "service",
                        oId: operationData.id,
                      })
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
          </>
        )}
      </div>
    </>
  );
}

export default ServiceOnlyTemplateOperation;
