import {
  faFileAlt,
  faFolderPlus,
  faPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/EditTwoTone";
import SelectFilter from "react-select";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import {
  addPartlist,
  builderSearch,
  createBuilder,
} from "services/repairBuilderServices";
import moment from "moment-timezone";
import Moment from "react-moment";
import { GRID_STYLE, PARTLIST_BUILDER_SEARCH_Q_OPTIONS } from "./CONSTANTS";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { repairActions } from "./dropdowns/repairSlice";
import LoadingProgress from "./components/Loader";
import SearchComponent from "./components/SearchComponent";

export const RepairPartlist = () => {
  const [show, setShow] = React.useState(false);
  const [recentPartlists, setRecentPartlists] = useState([]);
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentBuildersLoading, setRecentBuildersLoading] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetcheRecentPartlists();
    if (JSON.parse(localStorage.getItem('exitingType'))) {
      localStorage.removeItem('exitingType');
   }
  }, []);

  const fetcheRecentPartlists = () => {
    setRecentBuildersLoading(true);

    builderSearch(
      `builderType:PARTLIST AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
    )
      .then((result) => {
        setRecentPartlists(result);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent partlists");
      });
    setRecentBuildersLoading(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const searchBuilderColumns = [
    { field: "estimationNumber", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    { field: "customerId", headerName: "Customer#", flex: 1, width: 130 },
    { field: "make", headerName: "Make", flex: 1, width: 130 },
    { field: "model", headerName: "Model", flex: 1, width: 130 },
    { field: "family", headerName: "Family", flex: 1, width: 130 },
    { field: "serialNo", headerName: "Serial#", flex: 1, width: 130 },
    { field: "createdBy", headerName: "Created by", flex: 1, width: 130 },
    {
      field: "createdAt",
      headerName: "Created On",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <Moment format="DD MMM YY HH:MM a" style={{ fontSize: 12 }}>
          {params.value}
        </Moment>
      ),
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 , renderCell: (params) => <span style={{fontSize: 12}}>{parseFloat(params.value)?.toFixed(2)}</span>},
    { field: "status", headerName: "Status", flex: 1, width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => makePartlistEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await builderSearch(
          `builderType:PARTLIST AND saved:true AND ${searchStr}`
        );
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  const [masterData, setMasterData] = useState([]);

  const history = useHistory();
  const createNewBuilder = () => {
    let builderDetails = {
      builderId: "",
      bId: "",
      partListNo: "",
      partListId: "",
      type: "new",
    };
    createBuilder({
      builderType: "PARTLIST",
      activeVersion: true,
      versionNumber: 1,
      status: "DRAFT",
    })
      .then((result) => {
        builderDetails.builderId = result.builderId;
        builderDetails.bId = result.id;

        addPartlist(result.id, {
          activeVersion: true,
          versionNumber: 1,
        })
          .then((partlistResult) => {
            builderDetails.partListNo = partlistResult.id;
            builderDetails.partListId = partlistResult.partlistId;
            history.push({
              pathname: "/RepairPartList/PartList",
              state: builderDetails,
            });
          })
          .catch((err) => {
            console.log("Error Occurred", err);
            handleSnack("error", "Error occurred while creating partlist!");
          });
      })
      .catch((err) => {
        console.log("Error Occurred", err);
        handleSnack("error", "Error occurred while creating builder!");
      });
  };

  const makePartlistEditable = (selectedBuilder) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    builderDetails.builderId = selectedBuilder.builderId;
    builderDetails.bId = selectedBuilder.id;
    // builderDetails.partListNo = builderDetails.;
    builderDetails.partListId = selectedBuilder.estimationNumber;
    builderDetails.versionNumber = selectedBuilder.versionNumber;
    history.push({
      pathname: "/RepairPartList/PartList",
      state: builderDetails,
    });
  };

  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
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
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Part List</h5>
            <div>
              <button
                onClick={createNewBuilder}
                className="btn bg-primary text-white"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Create New<span className="ml-2"></span>
              </button>
            </div>
          </div>

          <div className="card p-4 mt-5">
            <div className="mt-1">
              {/* <h6 className="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  {recentBuildersLoading ? (
                    <LoadingProgress />
                  ) : recentPartlists.length > 0 ? (
                    recentPartlists.map((indBuilder) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 ">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                {indBuilder.estimationNumber}
                              </span>
                              <span className="ml-2" style={{ fontSize: 10 }}>
                                V{" "}
                                {parseFloat(indBuilder.versionNumber).toFixed(
                                  1
                                )}
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
                                    makePartlistEditable(indBuilder)
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
                          <p className="font-size-12 mb-0">Part List </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ml-3 mt-4">
                      <Typography>No Recent Partlists Found</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="row align-items-center">
              <div className="col-11 mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div
                    className="d-flex mr-3 py-3"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                  </div>
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={builderSearch}
                    searchClick={handleQuerySearchClick}
                    options={PARTLIST_BUILDER_SEARCH_Q_OPTIONS}
                    color="white"
                    builderType="PARTLIST"
                    buttonText={"SEARCH"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <DataGrid
              sx={GRID_STYLE}
              rows={masterData}
              columns={searchBuilderColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
};
