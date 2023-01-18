import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import {
  createSegment,
  fetchOperations,
  fetchSegments,
  RemoveSegment,
} from "services/repairBuilderServices";
import {
  getComponentCodeSuggetions,
  jobCodeSearch,
} from "services/searchServices";
import SearchBox from "./components/SearchBox";
import { NEW_SEGMENT } from "./CONSTANTS";
import LoadingProgress from "./components/Loader";
import { ReadOnlyField } from "./components/ReadOnlyField";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "../../assets/icons/svg/delete.svg";
import NavIcon from "@mui/icons-material/SortOutlined";
import { RenderConfirmDialog } from "./components/ConfirmationBox";
import ListComp from "./components/ListComp";

function WithoutSparePartsSegments(props) {
  const { activeElement, setActiveElement, fetchAllDetails } =
    props.builderDetails;
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
  const [treeLoading, setTreeLoading] = useState(true);

  const [operations, setOperations] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
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
    fetchSegmentsOfBuilder();
    fetchSegOpOfBuilder();
  }, []);

  const [segIndex, setSegIndex] = useState(0);
  const fetchSegmentsOfBuilder = async () => {
    setSegmentLoading(true);
    if (activeElement.bId) {
      await fetchSegments(activeElement.bId)
        .then((result) => {
          if (result?.length > 0) {
            setSegments(result);
            setSegmentViewOnly(true);
            let segmentToLoad = activeElement.sId
              ? result.filter((x) => x.id === activeElement.sId)[0]
                ? result.filter((x) => x.id === activeElement.sId)[0]
                : result[result.length - 1]
              : result[result.length - 1];
            console.log(segmentToLoad);
            setSegIndex(
              result.findIndex((obj) => {
                return obj.id === segmentToLoad.id;
              })
            );
            setSegmentData({
              ...segmentToLoad,
              header: formatSegmentHeader(segmentToLoad),
            });
            if (segmentToLoad) populateOperations(segmentToLoad.id);
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

  const [segmentsTreeContent, setSegmentsTreeContent] = useState([]);

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
    if (segmentToLoad) populateOperations(segmentToLoad.id);
  };
  async function fetchSegOpOfBuilder() {
    if (activeElement.bId) {
      const result = await fetchSegments(activeElement.bId);

      const complete = await Promise.all(
        result.map(async (indSegment) => {
          let ops = await fetchOperations(indSegment.id);
          indSegment.operations = ops;
        })
      );
      console.log(result);
      if (complete) setSegmentsTreeContent(result);
    } else {
      handleSnack("error", "Not a valid builder!");
    }
  }

  const populateOperations = (segmentId) => {
    if (segmentId) {
      fetchOperations(segmentId)
        .then((result) => {
          if (result?.length > 0) {
            setOperations(result);
          } else {
            setOperations([]);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while fetching the operations");
        });
    }
  };

  const makeHeaderEditable = () => {
    if (segmentViewOnly) setSegmentViewOnly(false);
  };

  const removeSegmentFromBuilder = async () => {
    await RemoveSegment(segmentData.id)
      .then((result) => {
        handleSnack(
          "success",
          `Segment ${segmentData.segmentNumber} deleted successfully`
        );
        fetchSegmentsOfBuilder();
        setConfirmationOpen(false);
      })
      .catch((err) => {
        console.log(err);
        handleSnack("error", "Error occurred while deleting the segment");
        setConfirmationOpen(false);
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
      populateOperations(segments[index].id);
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
        populateOperations(segments[index].id);
      }
    }
  };

  const handleCreateSegment = () => {
    let bid = activeElement?.bId;
    let data = {
      ...(segmentData.id && { id: segmentData.id }),
      jobCode: segmentData.jobCode,
      jobCodeDescription: segmentData.jobCodeDescription,
      title: segmentData.title,
      componentCode: segmentData.componentCode,
      description: segmentData.description,
    };
    createSegment(bid, data)
      .then((result) => {
        console.log(segIndex);
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
      } else {
        setSegmentData(segments[segIndex]);
      }
      setShowAddNewButton(true);
      setSegmentViewOnly(true);
    } else {
      if (segmentData.header === NEW_SEGMENT) {
        setActiveElement({ ...activeElement, name: "header" });
      } else {
        setSegmentViewOnly(true);
        setShowAddNewButton(true);
      }
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
      <RenderConfirmDialog
        confimationOpen={confirmationOpen}
        message={`Are you sure you want to remove this segment?`}
        handleNo={() => setConfirmationOpen(false)}
        handleYes={removeSegmentFromBuilder}
      />
      <div className="card p-4 mt-5">
        <div className="row align-items-center mb-0">
          <div
            className="col-md-6 col-sm-6"
            style={{ fontSize: "1rem", fontWeight: 600, color: "black" }}
          >
            <span className="mr-3 white-space">{segmentData.header}</span>
            <span className="btn-sm cursor">
              <Tooltip title="Edit">
                <EditIcon
                  onClick={() =>
                    ["DRAFT", "REVISED"].indexOf(activeElement?.builderStatus) >
                    -1
                      ? makeHeaderEditable()
                      : handleSnack(
                          "info",
                          "Set revised status to modify active builders"
                        )
                  }
                />
              </Tooltip>
              <Tooltip title="Delete" className="ml-2">
                <img
                  src={DeleteIcon}
                  alt="Delete"
                  onClick={() =>
                    ["DRAFT", "REVISED"].indexOf(activeElement?.builderStatus) >
                    -1
                      ? setConfirmationOpen(true)
                      : handleSnack(
                          "info",
                          "Set revised status to modify active builders"
                        )
                  }
                />
              </Tooltip>
              <Tooltip title="Navigate" className="ml-2">
                <NavIcon onClick={handleClick} />
              </Tooltip>
            </span>
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
        </div>

        <div className="hr text-primary"></div>
        {segmentLoading ? (
          <LoadingProgress />
        ) : !segmentViewOnly ? (
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
                    onChange={(e) => handleComponentCodeSearch(e.target.value)}
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
                  segmentData.jobCode + " - " + segmentData.jobCodeDescription
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="COMPONENT CODE"
                value={
                  segmentData.componentCode + " - " + segmentData.description
                }
                className="col-md-6 col-sm-6"
              />
            </div>
            <div className="Add-new-segment-div p-3 border-radius-10">
              <button
                className="btn bg-primary text-white"
                onClick={() => {
                  setActiveElement({ ...activeElement, name: "header" });
                  fetchAllDetails(activeElement.bId);
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
      </div>
      {segmentsTreeContent.length > 0 && (
        <ListComp
          content={segmentsTreeContent}
          setActiveElement={setActiveElement}
          activeElement={activeElement}
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          loadSegmentOnSelect={loadSegmentOnSelect}
        />
      )}
    </>
  );
}

export default WithoutSparePartsSegments;
