import {
  faFileAlt,
  faFolderPlus,
  faPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-js-loader";
import { Typography } from "@material-ui/core";
import EditIcon from "@mui/icons-material/EditTwoTone";
import $ from "jquery";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import Moment from "react-moment";
import { builderSearch, createBuilder } from "services/repairBuilderServices";
import DynamicSearchComponent from "./components/DynamicSearchComponent";
import { BUILDER_SEARCH_Q_OPTIONS, GRID_STYLE } from "./CONSTANTS";
import LoadingProgress from "./components/Loader";
import { useDispatch } from "react-redux";
import { repairActions } from "./dropdowns/repairSlice";
import SearchComponent from "./components/SearchComponent";

export const RepairWithoutSpareParts = () => {
  const [recentBuilders, setRecentBuilders] = useState([]);
  const [recentBuildersLoading, setRecentBuildersLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetchRecentBuilders(
      `builderType:BUILDER_WITHOUT_SPAREPART AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
    );
  }, []);

  const fetchRecentBuilders = async (searchQuery) => {
    setRecentBuildersLoading(true);
    await builderSearch(searchQuery)
      .then((result) => {
        setRecentBuilders(result);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching builders");
      });
    setRecentBuildersLoading(false);
  };

  const searchBuilderColumns = [
    { field: "builderId", headerName: "ID#", flex: 1, width: 70 },
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
            onClick={() => makeBuilderEditable(params.row)}
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
        searchStr = item.selectCategory.value + ":" + encodeURI('"' + item.inputSearch + '"');
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
          `builderType:BUILDER_WITHOUT_SPAREPART AND saved:true AND ${searchStr}`
        );
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
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
  const createNewBuilder = () => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "new",
    };
    createBuilder({
      builderType: "BUILDER_WITHOUT_SPAREPART",
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
            <h5 className="font-weight-600 mb-0">Without Spare Parts</h5>
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
                    <LoadingProgress/>
                  ) : recentBuilders.length > 0 ? (
                    recentBuilders.map((indBuilder) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 ">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                {indBuilder.builderId}
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
                    options={BUILDER_SEARCH_Q_OPTIONS}
                    color="white"
                    builderType="BUILDER_WITHOUT_SPAREPART"
                    buttonText="SEARCH"
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
