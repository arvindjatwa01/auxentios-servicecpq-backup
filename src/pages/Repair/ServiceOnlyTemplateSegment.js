import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MuiMenuComponent } from "pages/Operational";
import searchstatusIcon from "../../assets/icons/svg/search-status.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useHistory } from "react-router-dom";
import { NEW_SEGMENT } from "./CONSTANTS";
import { createSegment, fetchSegments } from "services/repairBuilderServices";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import LoadingProgress from "./components/Loader";
import SearchBox from "./components/SearchBox";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
function ServiceOnlyTemplateSegment(props) {
  const { activeElement, setActiveElement, fetchAllDetails } =
    props.templateDetails;
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [segmentViewOnly, setSegmentViewOnly] = useState(false);
  const [segments, setSegments] = useState([]);
  const [noOptionsCompCode, setNoOptionsCompCode] = useState(false);
  const [noOptionsJobCode, setNoOptionsJobCode] = useState(false);
  const [showAddNewButton, setShowAddNewButton] = useState(true);
  const [segmentLoading, setSegmentLoading] = useState(false);
  const [operations, setOperations] = useState([]);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  function formatSegmentHeader(convertSegment) {
    return (
      "Segment " +
      String(convertSegment.segmentNumber).padStart(2, "0") +
      " - " +
      convertSegment.description
    );
  }
  const newSegment = {
    header: NEW_SEGMENT,
    segmentNumber: "",
    jobCode: "",
    title: "",
    componentCode: "",
    description: "",
    id: "",
    requiredIndicator: true,
  };
  const [segmentData, setSegmentData] = useState(newSegment);
  useEffect(() => {
    fetchSegmentsOfBuilder();
  }, []);

  const fetchSegmentsOfBuilder = () => {
    // setSegmentLoading(true);
    // if (activeElement.templateDBId) {
    //   fetchSegments(activeElement.templateDBId)
    //        .then((result) => {
    // if (result?.length > 0) {
    //   setSegments(result);
    //   setSegmentViewOnly(true);
    //   let segmentToLoad = activeElement.sId
    //     ? result.filter((x) => x.id === activeElement.sId)[0]
    //     : result[result.length - 1];
    //   setSegmentData({
    //     ...segmentToLoad,
    //     header: formatSegmentHeader(segmentToLoad),
    //   });
    //   if (activeElement.sId) {
    //     fetchOperations(activeElement.sId)
    //       .then((result) => {
    //         if (result?.length > 0) {
    //           setOperations(result);
    //         }
    //       })
    //       .catch((e) => {
    //         handleSnack(
    //           "error",
    //           "Error occurred while fetching the operations"
    //         );
    //       });
    //   }
    // } else {
    loadNewSegmentUI();
    //       }
    //       setSegmentLoadig(false);
    //     })
    //     .catch((err) => {
    //       loadNewSegmentUI();
    //       handleSnack("error", "Error occurred while fetching segments!");
    //       setSegmentLoadig(false);
    //     });
    // } else {
    //   handleSnack("error", "Not a valid builder!");
    // }
  };

  // To indicate whether segment price will be included in total price
  const handleChangeSwitch = (event) => {
    setSegmentData({
      ...segmentData,
      requiredIndicator: event.target.checked,
    });
    // updateSegment(activeElement.templateDBId, {
    //   requiredIndicator: event.target.checked,
    // })
    //   .then((result) => {
    //     handleSnack("success", "Segment updated successfully!");
    //   })
    //   .catch((e) => {
    //     handleSnack("error", "Error occured while updating the details!");
    //   });
  };
  // Search Job Code
  const handleJobCodeSearch = async (searchText) => {
    setSearchJobCodeResults([]);
    segmentData.jobCode = searchText;
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
    setSegmentData({
      ...segmentData,
      jobCode: currentItem.jobCode,
    });
    setSearchJobCodeResults([]);
  };

  // Search component code
  const handleComponentCodeSearch = async (searchText) => {
    setSearchCompCodeResults([]);
    segmentData.componentCode = searchText;
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
    setSegmentData({
      ...segmentData,
      componentCode: currentItem.componentCode,
      description: currentItem.description,
      title: currentItem.componentCode + " - " + currentItem.description,
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
    setSegmentViewOnly(true);
    if (direction === "backward") {
      let segmentToLoad = [];
      if (segmentData.header === NEW_SEGMENT) {
        segmentToLoad = segments.filter(
          (x) => x.segmentNumber === segments.length - 1
        );
      } else {
        segmentToLoad = segments.filter(
          (x) => x.segmentNumber === segmentData.segmentNumber - 1
        );
      }

      setSegmentData({
        ...segmentToLoad[0],
        header: formatSegmentHeader(segmentToLoad[0]),
        // "Segment " +
        // segmentToLoad[0].segmentNumber +
        // " - " +
        // segmentToLoad[0].description,
      });
    } else if (direction === "forward") {
      let segmentToLoad = [];
      if (
        segments[segments.length - 1].header === NEW_SEGMENT &&
        segments.length - 1 === segmentData.segmentNumber
      ) {
        setSegmentData({ ...segments[segments.length - 1] });
        setSegmentViewOnly(false);
      } else if (segments.length > segmentData.segmentNumber) {
        segmentToLoad = segments.filter(
          (x) => x.segmentNumber === segmentData.segmentNumber + 1
        );
        setSegmentData({
          ...segmentToLoad[0],
          header: formatSegmentHeader(segmentToLoad[0]),
          // "Segment " +
          // segmentToLoad[0].segmentNumber +
          // " - " +
          // segmentToLoad[0].description,
        });
      }
    }
  };

  const handleCreateSegment = () => {
    let templateDBId = activeElement?.templateDBId;
    let data = {
      jobCode: segmentData.jobCode,
      title: segmentData.title,
      componentCode: segmentData.componentCode,
      description: segmentData.description,
    };
    // createSegment(templateDBId, data)
    //   .then((result) => {
    //     setSegmentData({
    //       ...segmentData,
    //       segmentNumber: result.segmentNumber,
    //       id: result.id,
    //       header: formatSegmentHeader(result),
    //       // "Segment " + result.segmentNumber + " - " + result.description,
    //     });
    //     // fetchSegmentsOfBuilder();
    //     segments[segments.length - 1] = result;
    //     setShowAddNewButton(true);
    setSegmentViewOnly(true);
    //     handleSnack(
    //       "success",
    //       `Successfully added Segment ${result.segmentNumber} details!`
    //     );
    //   })
    //   .catch((e) => {
    //     handleSnack("error", "Error occurred while saving the segment data!");
    //   });
  };
  const loadNewSegmentUI = () => {
    setSegmentViewOnly(false);
    setSegmentData(newSegment);
    segments.push(newSegment);
    setShowAddNewButton(false);
  };

  const handleCancelSegment = () => {
    if (segments.length > 1) {
      segments.splice(
        segments.findIndex((a) => a.header === NEW_SEGMENT),
        1
      );
      setSegmentData({
        ...segments[segments.length - 1],
        header: formatSegmentHeader(segments[segments.length - 1]),
        // "Segment " +
        // segments[segments.length - 1].segmentNumber +
        // " - " +
        // segments[segments.length - 1].description,
      });
      setShowAddNewButton(true);
      setSegmentViewOnly(true);
    } else {
      setActiveElement({ ...activeElement, name: "header" });
    }
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
                  segmentData.segmentNumber > 1 ||
                  (segmentData.header === NEW_SEGMENT && segments.length > 1)
                )
              }
            >
              <KeyboardArrowLeftIcon />
            </button>
            <span className="text-primary">{segmentData.header}</span>
            <button
              onClick={() => handleAnchors("forward")}
              className="btn-no-border"
              disabled={
                segmentData.segmentNumber === segments.length ||
                segmentData.header === NEW_SEGMENT
              }
            >
              <KeyboardArrowRightIcon />
            </button>
            {showAddNewButton &&
              ["DRAFT", "REVISED"].indexOf(activeElement?.builderStatus) >
                -1 && (
                <button
                  className="btn-no-border ml-2"
                  onClick={loadNewSegmentUI}
                >
                  <span className="ml-2">
                    <AddIcon />
                  </span>
                  Add New Segment
                </button>
              )}
          </div>
        </div>
        <h5 className="d-flex align-items-center mb-0">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 white-space">{segmentData.header}</span>
          </div>
          <div className="hr"></div>
        </h5>
        {segmentLoading ? (
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
                          checked={segmentData.requiredIndicator}
                          onChange={handleChangeSwitch}
                          name="segmentRequired"
                        />
                      }
                      label="REQUIRED"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            {!segmentViewOnly ? (
              <>
                <div className="row mt-4 input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        JOB CODE
                      </label>
                      <SearchBox
                        value={segmentData.jobCode}
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
                      <label className="text-light-dark font-size-12 font-weight-500">
                        TITLE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        placeholder="Required"
                        value={segmentData.title}
                        onChange={(e) =>
                          setSegmentData({
                            ...segmentData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        COMPONENT CODE
                      </label>
                      <SearchBox
                        value={segmentData.componentCode}
                        onChange={(e) =>
                          handleComponentCodeSearch(e.target.value)
                        }
                        type="componentCode"
                        result={searchCompCodeResults}
                        onSelect={handleCompCodeSelect}
                        noOptions={noOptionsCompCode}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        COMPONENT CODE DESCRIPTION
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        placeholder="Required"
                        value={segmentData.description}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className=" text-right">
                  {segments.length > 0 && (
                    <button
                      className="btn border bg-primary text-white mr-2"
                      onClick={handleCancelSegment}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="btn border bg-primary text-white"
                    onClick={handleCreateSegment}
                    disabled={
                      !(
                        segmentData.componentCode &&
                        segmentData.description &&
                        segmentData.title
                      ) || noOptionsCompCode
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
                        SEGMENT #
                      </p>
                      <h6 className="font-weight-500">
                        {segmentData.segmentNumber}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        JOB CODE
                      </p>
                      <h6 className="font-weight-500">{segmentData.jobCode}</h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">TITLE</p>
                      <h6 className="font-weight-500">{segmentData.title} </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        COMPONENT CODE
                      </p>
                      <h6 className="font-weight-500">
                        {segmentData.componentCode}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        COMPONENT CODE DESCRIPTION{" "}
                      </p>
                      <h6 className="font-weight-500">
                        {segmentData.description}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="Add-new-segment-div p-3 border-radius-10">
                  <button
                    className="btn bg-primary text-white"
                    onClick={() => {
                      setActiveElement({ ...activeElement, name: "header" });
                      fetchAllDetails(activeElement.templateDBId);
                    }}
                  >
                    Back To Header
                  </button>
                  {operations.length > 0 ? (
                    <div class="repairbtn-dropdown">
                      <button className="btn bg-primary text-white ml-2 dropbtn">
                        View Job Operations
                        <span className="ml-2">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                      </button>
                      <div class="repairbtn-dropdown-content" id="drp">
                        {operations.map((element) => (
                          <li
                            onClick={() =>
                              setActiveElement({
                                ...activeElement,
                                name: "operation",
                                sId: segmentData.id,
                                oId: element.id,
                              })
                            }
                          >
                            {"Operation " +
                              String(element.operationNumber).padStart(3, "0") +
                              " - " +
                              element.jobCode +
                              " " +
                              element.jobCodeDescription +
                              " " +
                              element.componentCodeDescription}
                          </li>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setActiveElement({
                          ...activeElement,
                          name: "operation",
                          sId: segmentData.id,
                        })
                      }
                      className="btn bg-primary text-white ml-2"
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Add Job Operation
                    </button>
                  )}
                </div>
              </React.Fragment>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ServiceOnlyTemplateSegment;
