import { faFileAlt, faFolderPlus, faPlus, faShareAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import EditIcon from "@mui/icons-material/EditTwoTone";
import $ from "jquery";

import { Typography } from "@mui/material";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { kitSearch } from "services/kitService";
import LoadingProgress from "./components/Loader";
import SearchComponent from "./components/SearchComponent";
import { GRID_STYLE, KIT_SEARCH_Q_OPTIONS } from "./CONSTANTS";
import { repairActions } from "./dropdowns/repairSlice";

export const RepairKits = () => {
  const [show, setShow] = React.useState(false);
  const [recentKits, setRecentKits] = useState([]);
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentKITsLoading, setRecentKITsLoading] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetcheRecentKits();
    if (JSON.parse(localStorage.getItem('exitingType'))) {
      localStorage.removeItem('exitingType');
    }
  }, []);

  const fetcheRecentKits = () => {
    setRecentKITsLoading(true);

    kitSearch(`kitId~KT&pageSize=10&sortColumn=updatedAt&orderBY=DESC`)
      .then((result) => {
        setRecentKits(result);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent kits");
      });
    setRecentKITsLoading(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const searchKitColumns = [
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
    { field: "totalPrice", headerName: "Total $", flex: 1, width: 130 },
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
            onClick={() => makeKitEditable(params.row)}
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
        const res = await kitSearch(`kitId~KT AND ${searchStr}`);
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

  const makeKitEditable = (selectedKIT) => {
    let kitDetails = {
      kitId: "",
      kitDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    kitDetails.kitId = selectedKIT.kitId;
    kitDetails.kitDBId = selectedKIT.id;
    // kitDetails.partListNo = kitDetails.;
    // kitDetails.partListId = selectedKIT.estimationNumber;
    kitDetails.versionNumber = selectedKIT.versionNumber;
    history.push({
      pathname: "/RepairKits/Kits",
      state: kitDetails,
    });
  };

  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };

  return (
    <>
      {/* <CommanComponents /> */}
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Kits</h5>
            <div>
              <Link
                to="/RepairKits/Kits"
                style={{ cursor: "pointer" }}
                className="btn bg-primary text-white"
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Create New<span className="ml-2"></span>
              </Link>
            </div>
          </div>

          <div className="card p-4 mt-5">
            <div className="mt-1">
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  {recentKITsLoading ? (
                    <LoadingProgress />
                  ) : recentKits.length > 0 ? (
                    recentKits.map((indKIT) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 ">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                {indKIT.kitId}
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
                                  onClick={() => makeKitEditable(indKIT)}
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
                              {/* <a href="#" className="ml-2">
                            <MuiMenuComponent options={activityOptions} />
                          </a> */}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="font-size-12 mb-0">
                            <Moment format="HH:MM a">
                              {indKIT.updatedAt}
                            </Moment>
                            ,{" "}
                            <Moment format="DD MMM YY">
                              {indKIT.updatedAt}
                            </Moment>
                          </p>
                          <p className="font-size-12 mb-0">Kits</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ml-3 mt-4">
                      <Typography>No Recent Kits Found</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="d-block d-md-flex justify-content-between align-items-center">
              <div className=" mx-2 ">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                  </div>
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={kitSearch}
                    searchClick={handleQuerySearchClick}
                    options={KIT_SEARCH_Q_OPTIONS}
                    color="white"
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
              columns={searchKitColumns}
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
