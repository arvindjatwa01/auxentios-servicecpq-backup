import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import FormGroup from "@mui/material/FormGroup";
import Select from "react-select";
import Select1 from "@mui/material/Select";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import DataTable from "react-data-table-component";
import SelectFilter from "react-select";
import AddIcon from "@mui/icons-material/Add";
import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
} from "../../../services/index";
import $ from "jquery";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useHistory } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import { FileUploader } from "react-drag-drop-files";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";

import { MuiMenuComponent } from "pages/Operational";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { builderSearch, createBuilder } from "services/repairBuilderServices";
import { repairActions } from "../dropdowns/repairSlice";
import { useDispatch } from "react-redux";
import { WITHOUT_PARTS, WITH_PARTS } from "../CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import LoadingProgress from "../components/Loader";
import Moment from "react-moment";
import { Typography } from "@mui/material";

const QuoteWithEvaluation = () => {
  const [value, setValue] = React.useState("1");

  const [open, setOpen] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = ["None", "Atria", "Callisto"];
  const history = useHistory();

  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const [recentWithoutSpareBuilders, setRecentWithoutSpareBuilders] = useState([]);
  const [recentWithSpareBuilders, setRecentWithSpareBuilders] = useState([]);

  const [recentBuildersLoading, setRecentBuildersLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetchRecentBuilders(     
    );

    if (JSON.parse(localStorage.getItem("exitingType"))) {
      localStorage.removeItem("exitingType");
    }
  }, []);

  const fetchRecentBuilders = async (searchQuery) => {
    setRecentBuildersLoading(true);
    let searchWithoutSpareQuery = `builderType:${WITHOUT_PARTS} AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`;
    let searchWithSpareQuery = `builderType:${WITH_PARTS} AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`;

    await builderSearch(searchWithoutSpareQuery)
      .then((resultWithout) => {
        setRecentWithoutSpareBuilders(resultWithout);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching builders");
      });
      await builderSearch(searchWithSpareQuery)
      .then((resultWith) => {
        setRecentWithSpareBuilders(resultWith);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching builders");
      });
    setRecentBuildersLoading(false);
  };
  const makeBuilderEditable = (builder) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "fetch",
    };
    builderDetails.builderId = builder.builderId;
    builderDetails.bId = builder.id;
    history.push({
      pathname: "/RepairWithoutSpareParts/BuilderDetails",
      state: builderDetails,
    });
  };

  const makeSparePartsBuildEditable = (builder) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "fetch",
    };
    builderDetails.builderId = builder.builderId;
    builderDetails.bId = builder.id;
    history.push({
      pathname: "/RepairWithSpareParts/BuilderDetails",
      state: builderDetails,
    });
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#000",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#872ff7",
      width: "190px",
      display: "flex",
      justifyContent: "center",
      padding: "5px 10px",
      color: "#fff !important",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    }),
  };
  const createNewBuilder = (e) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "new",
    };
    if (e.value === "without") {
      createBuilder({
        builderType: WITHOUT_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: "/RepairWithoutSpareParts/BuilderDetails",
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
    } else if (e.value === "with") {
      createBuilder({
        builderType: WITH_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: "/RepairWithSpareParts/BuilderDetails",
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
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
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Quote With Evaluation</h5>
          </div>
          <div className="card p-4 mt-3">
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    className="custom-tabs-div"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Use Repair Builder " value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="d-flex align-items-center justify-content-end mt-2" >
                    <Select
                      className="customselect1"
                      id="custom"
                      placeholder=" + Create New"
                      styles={customStyles}
                      options={[
                        { label: "WITH SPAREPARTS", value: "with" },
                        { label: "WITHOUT SPAREPARTS", value: "without" },
                      ]}
                      onChange={createNewBuilder}
                    />
                  </div>

                  <div className="mt-3">
                    <div className="mt-1">
                      <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">
                          RECENT BUILDERS (WITHOUT SPARE PARTS)
                        </h6>
                        <div className="row">
                          {recentBuildersLoading ? (
                            <LoadingProgress />
                          ) : recentWithoutSpareBuilders.length > 0 ? (
                            recentWithoutSpareBuilders.map((indBuilder) => (
                              <div className="col-md-4">
                                <div className="recent-items mt-3">
                                  <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 overflow-hidden white-space">
                                      <FontAwesomeIcon
                                        className=" font-size-14"
                                        icon={faFileAlt}
                                      />
                                      <span className="font-weight-500 ml-2">
                                        {indBuilder.builderId}
                                      </span>
                                      <span
                                        className="ml-2"
                                        style={{ fontSize: 10 }}
                                      >
                                        V{" "}
                                        {parseFloat(
                                          indBuilder.versionNumber
                                        ).toFixed(1)}
                                      </span>
                                    </p>
                                    <div className="d-flex align-items-center">
                                      <a
                                        href={undefined}
                                        className="btn-sm"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                          onClick={() =>
                                            makeBuilderEditable(indBuilder)
                                          }
                                        ></i>
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faShareAlt} />
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faFolderPlus} />
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faUpload} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                  <p className="font-size-12 mb-0">
                                    <Moment format="HH:MM a">
                                      {indBuilder.updatedAt}
                                    </Moment>
                                    ,{" "}
                                    <Moment format="DD MMM YY">
                                      {indBuilder.updatedAt}
                                    </Moment>
                                  </p>
                                  <p className="font-size-12 mb-0">
                                    Without Spare Parts
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="ml-3 mt-4">
                              <Typography>No Builders Found</Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="mt-1">
                      <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">
                          RECENT BUILDERS (WITH SPARE PARTS)
                        </h6>
                        <div className="row">
                          {recentBuildersLoading ? (
                            <LoadingProgress />
                          ) : recentWithSpareBuilders.length > 0 ? (
                            recentWithSpareBuilders.map((indBuilder) => (
                              <div className="col-md-4">
                                <div className="recent-items mt-3">
                                  <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 overflow-hidden white-space">
                                      <FontAwesomeIcon
                                        className=" font-size-14"
                                        icon={faFileAlt}
                                      />
                                      <span className="font-weight-500 ml-2">
                                        {indBuilder.builderId}
                                      </span>
                                      <span
                                        className="ml-2"
                                        style={{ fontSize: 10 }}
                                      >
                                        V{" "}
                                        {parseFloat(
                                          indBuilder.versionNumber
                                        ).toFixed(1)}
                                      </span>
                                    </p>
                                    <div className="d-flex align-items-center">
                                      <a
                                        href={undefined}
                                        className="btn-sm"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                          onClick={() =>
                                            makeSparePartsBuildEditable(indBuilder)
                                          }
                                        ></i>
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faShareAlt} />
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faFolderPlus} />
                                      </a>
                                      <a href="#" className="ml-3 font-size-14">
                                        <FontAwesomeIcon icon={faUpload} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                  <p className="font-size-12 mb-0">
                                    <Moment format="HH:MM a">
                                      {indBuilder.updatedAt}
                                    </Moment>
                                    ,{" "}
                                    <Moment format="DD MMM YY">
                                      {indBuilder.updatedAt}
                                    </Moment>
                                  </p>
                                  <p className="font-size-12 mb-0">
                                    With Spare Parts
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="ml-3 mt-4">
                              <Typography>No Builders Found</Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteWithEvaluation;
