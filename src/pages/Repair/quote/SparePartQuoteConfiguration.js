import {
  faCloudUploadAlt,
  faFileAlt,
  faFolderPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Tab from "@mui/material/Tab";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import { SPARE_PARTS_QUOTE_DETAILS } from "navigation/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { MuiMenuComponent } from "pages/Operational";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { kitSearch } from "services/kitService";
import { builderSearch } from "services/repairBuilderServices";
import penIcon from "../../../assets/images/pen.png";
import LoadingProgress from "../components/Loader";
import SearchComponent from "../components/SearchComponent";
import { GRID_STYLE, KIT_SEARCH_Q_OPTIONS } from "../CONSTANTS";
import { repairActions } from "../dropdowns/repairSlice";

const SparePartQuoteConfiguration = () => {
  const [value, setValue] = React.useState("partlist");
  const history = useHistory();
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [recentPartlists, setRecentPartlists] = useState([]);
  const [recentBuildersLoading, setRecentBuildersLoading] = useState(true);
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
    // kitDetails.versionNumber = selectedKIT.versionNumber;
    history.push({
      pathname: "/RepairKits/Kits",
      state: kitDetails,
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileTypes = ["xls", "xlsx"];
  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };
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
        res.map((kit) => {
          let family = [],
            model = [];
          kit.coverages.map((coverage) => {
            family.push(coverage.coversageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          kit.family = family;
          kit.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      console.log(err);
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    fetcheRecentPartlists();
    if (JSON.parse(localStorage.getItem("exitingType"))) {
      localStorage.removeItem("exitingType");
    }
  }, []);

  const fetcheRecentPartlists = () => {
    setRecentBuildersLoading(true);

    builderSearch(
      `builderType:PARTLIST AND saved:true&pageSize=10&sortColumn=updatedAt&orderBY=DESC`
    )
      .then((result) => {
        if(result){
          setRecentPartlists(result);
          setRecentBuildersLoading(false);
        }
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while fetching recent partlists");
        setRecentBuildersLoading(false);
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

  const searchKitColumns = [
    { field: "kitId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((model) => (
            <Typography display="block" style={{ fontSize: 12 }}>
              {model}
            </Typography>
          ))}
        </div>
      ),
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((family) => (
            <Typography display="block" style={{ fontSize: 12 }}>
              {family}
            </Typography>
          ))}
        </div>
      ),
    },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "source",
      headerName: "Source",
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

  const [show, setShow] = React.useState(false);
  const [masterData, setMasterData] = useState([]);

  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

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
            <h5 className="font-weight-600 mb-0">Spare Part Quote</h5>
          </div>
          <div className="card p-4 mt-5">
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    className="custom-tabs-div"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Use Part List " value="partlist" />
                    <Tab label="Use Kits " value="kit" />
                    <Tab label="Import From Excel" value="import" />
                  </TabList>
                </Box>
                <TabPanel value="partlist">
                  <div className="d-flex justify-content-end">
                    <Link
                      to={SPARE_PARTS_QUOTE_DETAILS}
                      style={{ cursor: "pointer" }}
                      className="btn bg-primary text-white"
                    >
                      <AddIcon className="mr-2" />
                      Create New
                    </Link>
                  </div>
                  <div className="recent-div mt-2 p-3">
                    <h6 className="font-weight-600 text-grey mb-0">
                      RECENT PART LISTS
                    </h6>
                    <div className="row">
                  {recentBuildersLoading ? (
                    <LoadingProgress />
                  ) : recentPartlists.length > 0 ? (
                    recentPartlists.map((indBuilder) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
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
                  {/* <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                    <h6 className="font-weight-600 text-light mb-0 ml-1">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                    <div>
                      <a href="#" className="btn">+Add</a>
                    </div>
                  </div> */}
                  {/* <div className="p-2 row">
                    <div className="col-md-6 col-sm-6">
                      <a href="/RepairPartlist/PartList" className="add-new-recod">
                        <div>
                          <FontAwesomeIcon icon={faPlus} />
                          <p className="font-weight-600">Add new record</p>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="add-new-recod">

                        <div>
                          <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                          <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                          <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                          <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </TabPanel>
                <TabPanel value="kit">
                  <div className="bg-primary px-3 my-3 border-radius-6 height-66">
                    <div className="d-block d-md-flex justify-content-between align-items-center">
                      <div className=" mx-2 ">
                        <div className="d-flex align-items-center bg-primary w-100">
                          <div
                            className="d-flex mr-3"
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
                      getRowHeight={() => "auto"}
                      getEstimatedRowHeight={() => 200}
                      autoHeight
                    />
                  </div>
                </TabPanel>
                <TabPanel value="import">
                  <div className="add-new-recod">
                    <div>
                      <FontAwesomeIcon
                        className="cloudupload"
                        icon={faCloudUploadAlt}
                      />
                      <h6 className="font-weight-500 mt-3">
                        Drag and drop files to upload <br /> or
                      </h6>
                      {/* <a href="/QuoteSolutionBuilder" className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a> */}
                      <FileUploader
                        // handleChange={handleReadFile}
                        name="file"
                        types={fileTypes}
                        onClick={(event) => {
                          event.currentTarget.value = null;
                        }}
                      />
                      <p className="mt-3">
                        Single upload file should not be more than <br />
                        10MB. Only the .xls, .xlsx file types are allowed
                      </p>
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

export default SparePartQuoteConfiguration;
