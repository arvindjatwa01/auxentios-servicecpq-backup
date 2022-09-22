import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { Link, useHistory } from "react-router-dom";
import { createSegment } from "services/repairBuilderServices";
import { jobCodeSearch, getComponentCodeSuggetions } from "services/searchServices";

import SearchBox from "./components/SearchBox";

function WithoutSpareParts(props) {
  const history = useHistory();
  // const { state } = props.location;
  const [selectedOption, setSelectedOption] = useState(null);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [segmentViewOnly, setSegmentViewOnly] = useState(false);
  const [segments, setSegments] = useState([]);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const newSegment = {
    header: "New Segment",
    segmentNumber: "",
    jobCode: "",
    title: "",
    componentCode: "",
    componentCodeDesc: "",
  };
  const [segmentData, setSegmentData] = useState(newSegment);

  // Search Job Code
  const handleJobCodeSearch = async (searchText) => {
    setSearchJobCodeResults([]);
    segmentData.jobCode = searchText;
    if (searchText) {
      await jobCodeSearch("jobCode~" + searchText)
        .then((result) => {
          setSearchJobCodeResults(result);
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
          setSearchCompCodeResults(result);
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
      componentCodeDesc: currentItem.description,
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

  const handleCreateSegment = () => {
    let bid = props.builderDetails?.bId ? props.builderDetails.bId : 77;
    let data = {
      jobCode: segmentData.jobCode,
      title: segmentData.title,
      componentCode: segmentData.componentCode,
      description: segmentData.componentCodeDesc,
    };
    createSegment(bid, data)
      .then((result) => {
        setSegmentData({
          ...segmentData,
          segmentNumber: result.segmentNumber,
          header:
            "Segment " + result.segmentNumber + " - " + result.description,
        });
        setSegmentViewOnly(true);
        handleSnack("success", `Successfully added Segment ${result.segmentNumber} details!`);
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while saving the segment data!");
      });
  };
  const loadNewSegmentUI = () => {
    setSegmentViewOnly(false);
    setSegmentData(newSegment);
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
            <a href="#" className="text-primary">
              <span>
                <KeyboardArrowLeftIcon />
              </span>
              {segmentData.header}
              <span>
                <KeyboardArrowRightIcon />
              </span>
            </a>
            <a
              href={undefined}
              className="text-primary ml-2 border-left"
              onClick={loadNewSegmentUI}
              style={{ cursor: "pointer" }}
            >
              <span className="ml-2">
                <AddIcon />
              </span>
              Add New
            </a>
          </div>
        </div>
        <h5 className="d-flex align-items-center mb-0">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 white-space">{segmentData.header}</span>
          </div>
          <div className="hr"></div>
        </h5>
        {!segmentViewOnly ? (
          <>
            <div className="row mt-4">
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
                    onChange={(e) => handleComponentCodeSearch(e.target.value)}
                    type="componentCode"
                    result={searchCompCodeResults}
                    onSelect={handleCompCodeSelect}
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
                    value={segmentData.componentCodeDesc}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className=" text-right">
              <button
                className="btn border bg-primary text-white"
                onClick={handleCreateSegment}
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
                  <p className="font-size-12 font-weight-500 mb-2">SEGMENT #</p>
                  <h6 className="font-weight-500">
                    {segmentData.segmentNumber}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">JOB CODE</p>
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
                    {segmentData.componentCodeDesc}
                  </h6>
                </div>
              </div>
            </div>
            <div className="Add-new-segment-div p-3 border-radius-10">
              <Link
                to={"/WithoutRepairOption01"}
                className="btn bg-primary text-white"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Add Operation
                <span className="ml-2">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
}

export default WithoutSpareParts;
