import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { NEW_SEGMENT } from "./CONSTANTS";
import EditIcon from "@mui/icons-material/EditOutlined";
import { fetchOperations } from "services/repairBuilderServices";
import NavIcon from "@mui/icons-material/SortOutlined";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import LoadingProgress from "./components/Loader";
import SearchBox from "./components/SearchBox";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { FormControlLabel, FormGroup, Switch, Tooltip } from "@mui/material";
import { ReadOnlyField } from "./components/ReadOnlyField";
import {
  createSegmentStandardJob,
  fetchSegmentsStandardJob,
} from "services/templateService";
import ListComp from "./components/ListComp";

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
      convertSegment.jobCodeDescription +
      " " +
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
    required: true,
    jobCodeDescription: "",
  };
  const [segmentData, setSegmentData] = useState(newSegment);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchSegments();
  }, []);

  const [segIndex, setSegIndex] = useState(0);
  const fetchSegments = () => {
    setSegmentLoading(true);
    if (activeElement.templateDBId) {
      fetchSegmentsStandardJob(activeElement.templateDBId)
        .then((result) => {
          if (result?.length > 0) {
            setSegments(result);
            setSegmentViewOnly(true);
            let segmentToLoad = activeElement.sId
              ? result.filter((x) => x.id === activeElement.sId)[0]
                ? result.filter((x) => x.id === activeElement.sId)[0]
                : result[result.length - 1]
              : result[result.length - 1];
            setSegIndex(
              result.findIndex((obj) => {
                return obj.id === segmentToLoad.id;
              })
            );
            setSegmentData({
              ...segmentToLoad,
              header: formatSegmentHeader(segmentToLoad),
            });
            if (segmentToLoad) setOperations(segmentToLoad.operations);
          } else {
            loadNewSegmentUI();
          }
          setSegmentLoading(false);
        })
        .catch((err) => {
          loadNewSegmentUI();
          console.log(err);
          handleSnack("error", "Error occurred while fetching segments!");
          setSegmentLoading(false);
        });
    } else {
      handleSnack("error", "Not a valid builder!");
    }
  };

  const loadSegmentOnSelect = (segmentId) => {
    setActiveElement({ ...activeElement, name: "segment", sId: segmentId });
    let segmentToLoad = segmentId
      ? segments.filter((x) => x.id === segmentId)[0]
        ? segments.filter((x) => x.id === segmentId)[0]
        : segments[segments.length - 1]
      : segments[segments.length - 1];
    console.log(segmentToLoad);
    setSegIndex(
      segments.findIndex((obj) => {
        return obj.id === segmentToLoad.id;
      })
    );
    setSegmentData({
      ...segmentToLoad,
      header: formatSegmentHeader(segmentToLoad),
    });
    if (segmentToLoad) setOperations(segmentToLoad.operations);
  };

  const makeHeaderEditable = () => {
    if (segmentViewOnly) setSegmentViewOnly(false);
  };
  // To indicate whether segment price will be included in total price
  const handleChangeSwitch = (event) => {
    createSegmentStandardJob(activeElement.templateDBId, {
      id: segmentData.id,
      required: event.target.checked,
    })
      .then((result) => {
        setSegmentData({ ...segmentData, required: result.required });
        handleSnack("success", "Segment updated successfully!");
      })
      .catch((e) => {
        handleSnack("error", "Error occured while updating the details!");
      });
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
      jobCodeDescription: currentItem.description,
      title:
        currentItem.description && segmentData.description
          ? currentItem.description + " " + segmentData.description
          : "",
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
      title:
        segmentData.jobCodeDescription && currentItem.description
          ? segmentData.jobCodeDescription + " " + currentItem.description
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

  const handleAnchors = (direction, index) => {
    setSegmentViewOnly(true);
    if (direction === "backward") {
      setOperations(segments[index].operations);
      if (segIndex > 0) setSegIndex(segIndex - 1);
      setSegmentData({
        ...segments[index],
        header: formatSegmentHeader(segments[index]),
      });
    } else if (direction === "forward") {
      if (
        segments[segments.length - 1].header === NEW_SEGMENT &&
        segments.length - 1 === index
      ) {
        setSegmentData({ ...segments[index] });
        setSegmentViewOnly(false);
      } else {
        if (segIndex < segments.length - 1) setSegIndex(segIndex + 1);
        setSegmentData({
          ...segments[index],
          header: formatSegmentHeader(segments[index]),
        });
        setOperations(segments[index].operations);
      }
    }
  };

  const handleCreateSegment = () => {
    let templateDBId = activeElement?.templateDBId;
    let data = {
      ...(segmentData.id && { id: segmentData.id }),
      jobCode: segmentData.jobCode,
      title: segmentData.title,
      jobCodeDescription: segmentData.jobCodeDescription,
      componentCode: segmentData.componentCode,
      description: segmentData.description,
    };
    createSegmentStandardJob(templateDBId, data)
      .then((result) => {
        setSegmentData({
          ...segmentData,
          segmentNumber: result.segmentNumber,
          id: result.id,
          header: formatSegmentHeader(result),
        });
        // fetchSegmentsOfBuilder();
        segments[segIndex] = result;
        setShowAddNewButton(true);
        setSegmentViewOnly(true);
        handleSnack(
          "success",
          `Successfully added Segment ${result.segmentNumber} details!`
        );
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while saving the segment data!");
      });
  };
  const loadNewSegmentUI = () => {
    setSegmentViewOnly(false);
    setSegmentData(newSegment);
    segments.push(newSegment);
    setSegIndex(segments.length - 1);
    setShowAddNewButton(false);
  };

  const handleCancelSegment = () => {
    if (segments.length > 1) {
      if (segmentData.header === NEW_SEGMENT) {
        segments.splice(
          segments.findIndex((a) => a.header === NEW_SEGMENT),
          1
        );
        setSegIndex(segments.length - 1);
        setSegmentData({
          ...segments[segments.length - 1],
          header: formatSegmentHeader(segments[segments.length - 1]),
        });
      }
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
        <div className="row align-items-center mb-0">
          <div
            className="col-md-6 col-sm-6"
            style={{ fontSize: "1rem", fontWeight: 600, color: "black" }}
          >
            <span className="mr-3 white-space">{segmentData.header}</span>
            {segmentViewOnly && (
              <span className="btn-sm cursor">
                <Tooltip title="Edit">
                  <EditIcon
                    onClick={() =>
                      ["DRAFT", "REVISED"].indexOf(
                        activeElement?.templateStatus
                      ) > -1
                        ? makeHeaderEditable()
                        : handleSnack(
                            "info",
                            "Set revised status to modify active templates"
                          )
                    }
                  />
                </Tooltip>
                <Tooltip title="Navigate" className="ml-2">
                  <NavIcon onClick={handleClick} />
                </Tooltip>
              </span>
            )}
          </div>
          <div className="col-md-6 col-sm-6 align-items-center mb-0 ">
            <div className="justify-content-end text-right">
              <button
                onClick={() => handleAnchors("backward", segIndex - 1)}
                className="btn-no-border"
                disabled={
                  !(
                    segIndex > 0 ||
                    (segmentData.header === NEW_SEGMENT && segments.length > 1)
                  )
                }
              >
                <KeyboardArrowLeftIcon />
              </button>
              <span className="text-primary">{segmentData.header}</span>
              <button
                onClick={() => handleAnchors("forward", segIndex + 1)}
                className="btn-no-border"
                disabled={
                  segIndex === segments.length - 1 ||
                  segmentData.header === NEW_SEGMENT
                }
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="hr text-primary"></div>

        {segmentLoading ? (
          <LoadingProgress />
        ) : (
          <>
            {!segmentViewOnly ? (
              <>
                <div className="row mt-4 input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        TITLE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        placeholder="Auto Filled"
                        value={segmentData.title}
                        onChange={(e) =>
                          setSegmentData({
                            ...segmentData,
                            title: e.target.value,
                          })
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6"></div>
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
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        JOB CODE DESCRIPTION
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10"
                        placeholder="Auto Filled"
                        value={segmentData.jobCodeDescription}
                        onChange={(e) =>
                          setSegmentData({
                            ...segmentData,
                            jobCodeDescription: e.target.value,
                          })
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
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
                      <div className="css-w8dmq8">*Mandatory</div>
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
                        placeholder="Auto Filled"
                        value={segmentData.description}
                        disabled
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
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
                        segmentData.jobCode &&
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
                  <div className="col-md-12 col-sm-12 mb-4">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={segmentData.required}
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
                  <ReadOnlyField
                    label="SEGMENT #"
                    value={String(segmentData.segmentNumber).padStart(2, "0")}
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="TITLE"
                    value={segmentData.title}
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="JOB CODE"
                    value={
                      segmentData.jobCode +
                      " - " +
                      segmentData.jobCodeDescription
                    }
                    className="col-md-6 col-sm-6"
                  />
                  <ReadOnlyField
                    label="COMPONENT CODE"
                    value={
                      segmentData.componentCode +
                      " - " +
                      segmentData.description
                    }
                    className="col-md-6 col-sm-6"
                  />
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
      {segments.length > 0 && (
        <ListComp
          content={segments}
          setActiveElement={setActiveElement}
          activeElement={activeElement}
          open={open}
          idSelected={segmentData.id}
          handleClose={handleClose}
          anchorEl={anchorEl}
          loadSegmentOnSelect={loadSegmentOnSelect}
        />
      )}
    </>
  );
}

export default ServiceOnlyTemplateSegment;
