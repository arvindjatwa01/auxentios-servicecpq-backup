import {
  faFileAlt,
  faFolderPlus,
  faPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import penIcon from "../../assets/images/pen.png";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { repairActions } from "./dropdowns/repairSlice";
import { templateSearch } from "services/templateService";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { Tooltip, Typography } from "@mui/material";
import Moment from "react-moment";
import LoadingProgress from "./components/Loader";
import SearchComponent from "./components/SearchComponent";
import { COLOR_BRONZE, COLOR_GOLD, COLOR_SILVER, GRID_STYLE, TEMPLATE_SEARCH_Q_OPTIONS } from "./CONSTANTS";
import { createBuilder } from "services/repairBuilderServices";

export const RepairServiceOnlyTemplate = () => {
  const [recentTemplates, setRecentTemplates] = useState([]);
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentTemplatesLoading, setRecentTemplatesLoading] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetchRecentTemplates();
    if (JSON.parse(localStorage.getItem("exitingType"))) {
      localStorage.removeItem("exitingType");
    }
  }, []);

  const fetchRecentTemplates = () => {
    setRecentTemplatesLoading(true);

    templateSearch(`standardJobId~SJ&pageSize=10&sortColumn=updatedAt&orderBY=DESC`)
      .then((result) => {
        setRecentTemplates(result);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent templates");
      });
    setRecentTemplatesLoading(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const searchKitColumns = [
    { field: "standardJobId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    { field: "model", headerName: "Model", flex: 1, width: 130, 
    renderCell: (params) => (
      <div>
      {params.value?.map(model => 
      <Typography style={{ fontSize: 12 }}>
        {model}
      </Typography>
      )}</div>
    ),},
    { field: "family", headerName: "Family", flex: 1, width: 130,
    renderCell: (params) => (

      <div>
      {params.value?.map(family => 
      <Typography style={{ fontSize: 12 }}>
        {family}
      </Typography>)}
      </div>
      
    ) 
  },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "totalLabourPrice",
      headerName: "Labor $",
      flex: 1,
      width: 130,      
    },
    {
      field: "totalMiscPrice",
      headerName: "Misc $",
      flex: 1,
      width: 130,      
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 },
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
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
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
        const res = await templateSearch(`standardJobId~SJ AND ${searchStr}`);
        res.map(template => {
          let family = [], model = [];
          template.coverages.map(coverage => {          
          family.push(coverage.family);
          model.push(coverage.model);          
        });
        // return {...kit, family : family, model: model};
        template.family = family;
        template.model =  model;
      })
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching templates!");
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

  function versionColor(versionType) {
    console.log(versionType);
    if (versionType === "BRONZE") return COLOR_BRONZE;
    else if (versionType === "GOLD") return COLOR_GOLD;
    else return COLOR_SILVER;
  }

  const makeKitEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    templateDetails.templateId = selectedTemplate.templateId;
    templateDetails.templateDBId = selectedTemplate.id;
    // templateDetails.partListNo = templateDetails.;
    // templateDetails.partListId = selectedTemplate.estimationNumber;
    // templateDetails.versionNumber = selectedTemplate.versionNumber;
    history.push({
      pathname: "/RepairServiceOnlyTemplate/ServiceOnlyTemplates",
      state: templateDetails,
    });
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
        <div class="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Service Only Templates</h5>
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
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                {recentTemplatesLoading ? (
                    <LoadingProgress />
                  ) : recentTemplates.length > 0 ? (
                    recentTemplates.map((indTemplate) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                {indTemplate.standardJobId}
                              </span>
                              <span
                                className="ml-2"
                                style={{
                                  fontSize: 9,
                                  color: versionColor(indTemplate.version),
                                  fontWeight: 800,
                                }}
                              >
                                {indTemplate.version}
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
                                  onClick={() => makeKitEditable(indTemplate)}
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
                            <Moment format="HH:MM a">{indTemplate.updatedAt}</Moment>
                            ,{" "}
                            <Moment format="DD MMM YY">
                              {indTemplate.updatedAt}
                            </Moment>
                          </p>
                          <p className="font-size-12 mb-0">Service Only Templates</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ml-3 mt-4">
                      <Typography>No Recent Templates Found</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="d-md-flex d-block justify-content-between align-items-center">
              <div className=" mx-2">
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
                    searchAPI={templateSearch}
                    searchClick={handleQuerySearchClick}
                    options={TEMPLATE_SEARCH_Q_OPTIONS}
                    color="white"
                    buttonText={"SEARCH"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className=""
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
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
      </div>
    </>
  );
};
