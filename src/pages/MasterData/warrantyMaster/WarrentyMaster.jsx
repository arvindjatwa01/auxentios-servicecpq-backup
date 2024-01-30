import React, { useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import penIcon from "../../../assets/images/pen.png";
import WarrantyDetails from "./WarrantyDetails";
import {
  warrantyDummyRecord,
  warrantySearchOptions,
} from "./WarrantyConstants";
import WarrantyOverView from "./WarrantyOverView";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";
import ClaimDetails from "./ClaimDetails";
import {
  Recent_Warranty_List_GET,
  Search_By_Fields_Warranty_List_GET,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import {
  INPUT_SEARCH_API_ERROR_MESSAGE,
  INPUT_SEARCH_ERROR_MESSAGE,
  INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE,
} from "../equipmentMasterConstants";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import $ from "jquery";
import WarrantyOverviewModal from "./WarrantyOverviewModal";

const WarrantyMaster = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showClaimAddEditModal, setShowClaimAddEditModal] = useState(false);
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);
  const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [warrantyRecord, setWarrantyRecord] = useState([]);

  const [searchWarranty, setSearchWarranty] = useState([
    {
      id: 0,
      fieldName: "",
      operator: "",
      inputSearch: "",
      dropdownOptions: [],
    },
  ]);

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

  useEffect(() => {
    if (
      !showDetailsModal &&
      !showOverviewModal &&
      !showClaimAddEditModal &&
      !showClaimDetailsModal &&
      !showUploadFilesModal
    ) {
      setRecordId(null);
    }
  }, [
    showDetailsModal,
    showOverviewModal,
    showClaimAddEditModal,
    showClaimDetailsModal,
    showUploadFilesModal,
  ]);

  useEffect(() => {
    getRecentWarrantyList();
  }, []);

  // get the recent warranty List without any Filter applied
  const getRecentWarrantyList = () => {
    const rUrl = Recent_Warranty_List_GET;
    callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          setWarrantyRecord(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleShowClaimAddEditModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowClaimAddEditModal(!showClaimAddEditModal);
  };

  const handleShowClaimDetails = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowClaimDetailsModal(!showClaimDetailsModal);
  };

  const handleFilesUploadModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowUploadFilesModal(!showUploadFilesModal);
  };

  const warrantyColumns = [
    {
      field: "warrantyId",
      headerName: "Id",
      //   width: 90,
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      //   width: 90,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      //   width: 90,
      flex: 1,
    },
    {
      field: "serilaNumber",
      headerName: "Serial No.",
      //   width: 90,
      flex: 1,
      renderCell: (params) => <div>ZMX00507</div>,
    },
    {
      field: "componentCode",
      headerName: "Component Code",
      //   width: 90,
      flex: 1,
      renderCell: (params) => <div></div>,
    },
    {
      field: "warrantyBasics",
      headerName: "Basis",
      //   width: 90,
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Unit",
      //   width: 90,
      flex: 1,
    },
    // {
    //   field: "modelNo",
    //   headerName: "Model Number",
    //   width: 150,
    //   flex: 1,
    // },
    // {
    //   field: "serialNumber",
    //   headerName: "Serial Number",
    //   width: 120,
    //   flex: 1,
    // },
    {
      field: "warrantyStartDate",
      headerName: "Start Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyEndDate",
      headerName: "End Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyStartUsage",
      headerName: "Start Usage",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyEndUsage",
      headerName: "End Usage",
      //   width: 120,
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleViewWarrantyDetails(params)}
              >
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => handleViewWarrantyOverview(params)}
              >
                <Tooltip title="Overview">
                  <VisibilityIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  // const warrantyColumns = [
  //   {
  //     field: "warrantyId",
  //     headerName: "Warranty Id",
  //     //   width: 90,
  //     flex: 1,
  //   },
  //   {
  //     field: "modelNo",
  //     headerName: "Model Number",
  //     width: 150,
  //     flex: 1,
  //   },
  //   {
  //     field: "serialNumber",
  //     headerName: "Serial Number",
  //     width: 120,
  //     flex: 1,
  //   },
  //   {
  //     field: "warrantyStartDate",
  //     headerName: "Warranty Start Date",
  //     //   width: 120,
  //     flex: 1,
  //   },
  //   {
  //     field: "warrantyEndDate",
  //     headerName: "Warranty End Date",
  //     //   width: 120,
  //     flex: 1,
  //   },
  //   {
  //     field: "replacement",
  //     headerName: "Replacement",
  //     //   width: 90,
  //     flex: 1,
  //   },
  //   {
  //     field: "insataller",
  //     headerName: "Distributor",
  //     //   width: 90,
  //     flex: 1,
  //   },
  //   {
  //     field: "warrantyStatus",
  //     headerName: "Warranty Status",
  //     width: 150,
  //     flex: 1,
  //   },
  //   {
  //     field: "action",
  //     type: "actions",
  //     headerName: "Action",
  //     //   width: 150,
  //     flex: 1,
  //     cellClassName: "actions",
  //     getActions: (params) => {
  //       return [
  //         <GridActionsCellItem
  //           icon={
  //             <div
  //               className=" cursor"
  //               onClick={() => handleViewWarrantyDetails(params)}
  //             >
  //               <Tooltip title="Edit">
  //                 <img className="m-1" src={penIcon} alt="Edit" />
  //               </Tooltip>
  //             </div>
  //           }
  //           label="Edit"
  //           className="textPrimary"
  //           color="inherit"
  //         />,
  //         <GridActionsCellItem
  //           icon={
  //             <div
  //               className=" cursor"
  //               onClick={() => setShowOverviewModal(true)}
  //             >
  //               <Tooltip title="Overview">
  //                 <VisibilityIcon />
  //               </Tooltip>
  //             </div>
  //           }
  //           label="Edit"
  //           className="textPrimary"
  //           color="inherit"
  //         />,
  //       ];
  //     },
  //   },
  // ];

  const handleViewWarrantyDetails = (params) => {
    const warrantyId = params.row["warrantyId"];
    setRecordId(warrantyId);
    setShowDetailsModal(true);
  };

  const handleViewWarrantyOverview = (params) => {
    const warrantyId = params.row["warrantyId"];
    setRecordId(warrantyId);
    setShowOverviewModal(true);
  };

  // select AND/OR operator for search
  const handleSelectOperator = (e, id) => {
    const _searchWarranty = [...searchWarranty];
    let obj = _searchWarranty[id];
    obj.operator = e;
    _searchWarranty[id] = obj;
    setSearchWarranty([..._searchWarranty]);
  };

  // select the search field
  const handleSelectFieldName = (e, i) => {
    const _searchWarranty = [...searchWarranty];
    const updateObj = {
      ..._searchWarranty[i],
      inputSearch: "",
      dropdownOptions: [],
      fieldName: e,
    };
    _searchWarranty[i] = updateObj;
    setSearchWarranty(_searchWarranty);
  };

  //add more Search fields
  const addMoreSearchParameters = () => {
    const _searchWarranty = [...searchWarranty];
    if (_searchWarranty.length !== 2) {
      _searchWarranty.push({
        id: _searchWarranty.length,
        inputSearch: "",
        dropdownOptions: [],
        fieldName: "",
      });
    }
    setSearchWarranty(_searchWarranty);
  };

  //remove the search fields
  const removeSearchCritria = () => {
    setSearchWarranty([]);
  };

  const handleWarrantyInputSearch = (e, id) => {
    try {
      const { value } = e.target;
      let _searchWarranty = [...searchWarranty];
      let obj = _searchWarranty[id];
      let dropdownResult = [];
      if (!isEmpty(obj.fieldName.value)) {
        if (value.length !== 0) {
          const rUrl = `${Search_By_Fields_Warranty_List_GET}field_name=${obj.fieldName.value}&field_value=${value}`;
          callGetApi(
            null,
            rUrl,
            (response) => {
              if (response.status === API_SUCCESS) {
                const responseData = response.data;
                if (responseData.length === 0) {
                  handleSnack(
                    "info",
                    INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE
                  );
                }
                obj.dropdownOptions = responseData;
                _searchWarranty[id] = obj;
                setSearchWarranty([..._searchWarranty]);
                $(`.scrollbar-${id}`).css("display", "block");
              } else {
                handleSnack("info", INPUT_SEARCH_API_ERROR_MESSAGE);
              }
            },
            (error) => {}
          );
        } else {
          obj.dropdownOptions = [];
          obj.inputSearch = "";
          _searchWarranty[id] = obj;
          setSearchWarranty([..._searchWarranty]);
        }
      } else {
        handleSnack("info", INPUT_SEARCH_ERROR_MESSAGE);
      }
      obj.inputSearch = value;
    } catch (error) {
      return;
    }
  };

  const handleSelectDropdownItem = (currentItem, id) => {
    console.log("currentItem :: ", currentItem);
    // let _searchWarranty = [...searchWarranty];
    // let obj = _searchWarranty[id];
    // obj.inputSearch = 
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
          <h5 className="font-weight-600 mb-0">Warranty Master</h5>

          <div className="card border mt-4 px-4">
            <div className="bg-primary px-3 mt-2 mb-0 border-radius-10 ">
              <div className="d-block height-66 d-md-flex justify-content-between align-items-center">
                <div className="mx-2">
                  <div className="d-flex align-items-center bg-primary w-100">
                    <div className="d-flex mr-2" style={{ whiteSpace: "pre" }}>
                      <h5 className="mr-2 mb-0 text-white">
                        <span>Search</span>
                      </h5>
                      <p className="ml-4 mb-0">
                        <a className="ml-3 cursor text-white cursor">
                          <EditOutlinedIcon />
                        </a>
                        <a href={undefined} className="ml-3 cursor text-white">
                          <ShareOutlinedIcon />
                        </a>
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                      <div className="row align-items-center m-0">
                        {searchWarranty.map((obj, i) => (
                          <div
                            className={`customselect ${
                              i < searchWarranty.length - 1 ? "p-2" : ""
                            } border-white d-flex align-items-center mr-3 my-2 border-radius-10`}
                          >
                            {i > 0 && (
                              <Select
                                isClearable={true}
                                defaultValue={{ label: "AND", value: "AND" }}
                                options={[
                                  { label: "AND", value: "AND", id: i },
                                  { label: "OR", value: "OR", id: i },
                                ]}
                                placeholder="AND/OR"
                                onChange={(e) => handleSelectOperator(e, i)}
                                value={obj.operator}
                              />
                            )}
                            <div>
                              <Select
                                options={warrantySearchOptions}
                                onChange={(e) => handleSelectFieldName(e, i)}
                                value={obj.fieldName}
                                // isOptionDisabled={(option) =>
                                //   handleCheckDisableOptions(option)
                                // }
                              />
                            </div>
                            <div className="customselectsearch">
                              <input
                                className="custom-input-sleact pr-1"
                                type="text"
                                placeholder="Search string"
                                id={"inputSearch-" + i}
                                value={obj.inputSearch}
                                autoComplete="off"
                                onChange={(e) =>
                                  handleWarrantyInputSearch(e, i)
                                }
                              />
                              {
                                <ul
                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                  id="style"
                                >
                                  {obj.inputSearch.length !== 0 &&
                                    obj.dropdownOptions.length === 0 && (
                                      <li className="list-group-item">
                                        No Result found
                                      </li>
                                    )}
                                  {obj.dropdownOptions.map((currentItem, j) => (
                                    <li
                                      className="list-group-item"
                                      key={j}
                                      onClick={() =>
                                        handleSelectDropdownItem(currentItem, i)
                                      }
                                    >
                                      {currentItem[obj.fieldName?.value]}
                                    </li>
                                  ))}
                                </ul>
                              }
                            </div>
                            {searchWarranty.length - 1 === i && (
                              <a
                                className="btn bg-primary text-white border-radius-10 cursor"
                                // onClick={handleSearchData}
                              >
                                <SearchIcon />
                                <span className="ml-1">Search</span>
                              </a>
                            )}
                          </div>
                        ))}
                        <div onClick={(e) => addMoreSearchParameters(e)}>
                          <a
                            className="btn-sm text-white border mr-2 cursor"
                            style={{ border: "1px solid #872FF7" }}
                          >
                            +
                          </a>
                        </div>
                        <div onClick={removeSearchCritria}>
                          <a className="btn-sm border cursor">
                            <svg
                              data-name="Layer 41"
                              id="Layer_41"
                              fill="white"
                              viewBox="0 0 50 50"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title />
                              <path
                                className="cls-1"
                                d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                              />
                              <path
                                className="cls-1"
                                d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                              />
                              <path
                                className="cls-1"
                                d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-center pl-3 py-3" />
                </div>
              </div>
            </div>
            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: "#f3eafe",
                borderRadius: 5,
                marginBlock: 3,
                padding: 2,
                marginTop: 0.5,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 700,
                  // marginBottom: 8,
                  marginInline: 2,
                }}
              >
                <DataGrid
                  rows={warrantyRecord}
                  columns={warrantyColumns}
                  sx={GRID_STYLE}
                  //   initialState={{
                  //     pagination: {
                  //       paginationModel: {
                  //         pageSize: 5,
                  //       },
                  //     },
                  //   }}
                  pageSizeOptions={[5]}
                  // checkboxSelection
                  disableRowSelectionOnClick
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  getRowId={(row) => row.warrantyId}
                />
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      {showDetailsModal && (
        <WarrantyDetails
          show={showDetailsModal}
          hideModal={() => setShowDetailsModal(false)}
          recordId={recordId}
          handleSnack={handleSnack}
        />
      )}

      <WarrantyOverviewModal
        show={showOverviewModal}
        hideModal={() => setShowOverviewModal(!showOverviewModal)}
        recordId={recordId}
        showClaimAddEditModal={showClaimAddEditModal}
        handleShowClaimAddEditModal={handleShowClaimAddEditModal}
        showClaimDetailsModal={showClaimDetailsModal}
        handleShowClaimDetails={handleShowClaimDetails}
        showUploadFilesModal={showUploadFilesModal}
        handleFilesUploadModal={handleFilesUploadModal}
        handleSnack={handleSnack}
      />
    </>
  );
};

export default WarrantyMaster;
