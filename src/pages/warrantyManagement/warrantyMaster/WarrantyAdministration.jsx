import React, { useEffect, useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import { Box, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import $ from "jquery";
import Select from "react-select";

import {
  FILL_DATA_PROPERLY_ERROR_MESSAGE,
  INPUT_SEARCH_API_ERROR_MESSAGE,
  INPUT_SEARCH_ERROR_MESSAGE,
  INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE,
  GRID_STYLE,
} from "pages/Common/constants";
import { warrantySearchOptions } from "../warrantyManagementConstants";

import { isEmpty } from "pages/Common/textUtilities";
import {
  Recent_Warranty_List_GET,
  Search_By_Fields_Warranty_List_GET,
  WARRANTY_MASTER_URL,
  Warranty_Country_List_GET,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import WarrantyEditModal from "./WarrantyEditModal";
import WarrantyOverviewModal from "./WarrantyOverviewModal";
import { equipmentSearch } from "services/searchServices";
import WarrantyRequestCreateModal from "../claimMaster/WarrantyRequestCreateModal";

const WarrantyAdministration = () => {
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [recordId, setRecordId] = useState(null);

  const [warrantyRecord, setWarrantyRecord] = useState([]);
  const [openWarrantyEditModal, setOpenWarrantyEditModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [openClaimCreateModal, setOpenClaimCreateModal] = useState(false);
  const [openClaimEditModal, setOpenClaimEditModal] = useState(false);
  const [openClaimRequestModal, setOpenClaimRequestModal] = useState(false);
  const [openPartCreateModal, setOpenPartCreateModal] = useState(false);
  const [openFileUploadModal, setOpenFileUploadModal] = useState(false);

  const [openWarrantyRequestModal, setOpenWarrantyRequestModal] =
    useState(false);

  const [searchWarranty, setSearchWarranty] = useState([
    {
      id: 0,
      fieldName: "",
      operator: "",
      inputSearch: "",
      selectedOption: "",
      dropdownOptions: [],
    },
  ]);
  const [equWarrantyId, setEquWarrantyId] = useState(null);
  const [equWarrantyData, setEquWarrantyData] = useState({
    modelNumber: "",
    serialNumber: "",
  });

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
      !openWarrantyEditModal &&
      !showOverviewModal &&
      !openClaimCreateModal &&
      !openClaimEditModal &&
      !openClaimRequestModal &&
      !openPartCreateModal &&
      !openFileUploadModal
    ) {
      setRecordId(null);
    }
  }, [
    openWarrantyEditModal,
    showOverviewModal,
    openClaimCreateModal,
    openClaimEditModal,
    openClaimRequestModal,
    openPartCreateModal,
    openFileUploadModal,
  ]);

  useEffect(() => {
    getRecentWarrantyList();
    getCountryKeyValueList();
  }, []);

  // get the recent warranty List without any Filter applied
  const getRecentWarrantyList = async () => {
    setLoading(true);
    const rUrl = Recent_Warranty_List_GET;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          if (responseData.length !== 0) {
            handleGetEquipmentData(responseData);
          }
          // setWarrantyRecord(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  //
  const handleGetEquipmentData = async (responseData) => {
    const recordArr = [];
    for (let row of responseData) {
      const searchStr = `equipmentNumber:${row.equipmentNumber}`;
      const res = await equipmentSearch(searchStr);

      recordArr.push({
        ...row,
        modelNumber: res[0].model,
        serialNumber: res[0].makerSerialNumber,
      });
    }

    setWarrantyRecord(recordArr);
  };

  // country key value list
  const getCountryKeyValueList = () => {
    const rUrl = `${Warranty_Country_List_GET}?pageNumber=${0}&pageSize=${10}`;
    callGetApi( rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        const options = [];
        responseData.map((row) =>
          // options.push({ label: row.countryName, value: row.countryId })
          options.push({ label: row.countryName, value: row.countryName })
        );
        setCountryList(options);
      }
    });
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
      selectedOption: "",
      dropdownOptions: [],
      fieldName: e,
    };
    _searchWarranty[i] = updateObj;
    setSearchWarranty(_searchWarranty);
    setEquWarrantyId(null);
    setEquWarrantyData({
      modelNumber: "",
      serialNumber: "",
    });
  };

  //add more Search fields
  const addMoreSearchParameters = () => {
    const _searchWarranty = [...searchWarranty];
    if (_searchWarranty.length !== 1) {
      _searchWarranty.push({
        id: _searchWarranty.length,
        inputSearch: "",
        selectedOption: "",
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

  const handleWarrantyInputSearch = async (e, id) => {
    try {
      const { value } = e.target;
      let _searchWarranty = [...searchWarranty];
      let obj = _searchWarranty[id];
      let dropdownResult = [];
      if (!isEmpty(obj.fieldName.value)) {
        if (value.length !== 0) {
          let searchString =
            (obj.fieldName.value === "serialNumber"
              ? "makerSerialNumber"
              : obj.fieldName.value) +
            "~" +
            e.target.value;

          await equipmentSearch(searchString)
            .then((res) => {
              obj.dropdownOptions = res;
              _searchWarranty[id] = obj;
              setSearchWarranty([..._searchWarranty]);
              $(`.scrollbar-${id}`).css("display", "block");
            })
            .catch((err) => {
              handleSnack("error", INPUT_SEARCH_API_ERROR_MESSAGE);
            });
          // const rUrl = SEARCH_EQUIPMENT(searchString);
          // // const rUrl = `${Search_By_Fields_Warranty_List_GET}field_name=${obj.fieldName.value}&field_value=${value}`;
          // await callGetApi(
          //   rUrl,
          //   (response) => {
          //     if (response.status === API_SUCCESS) {
          //       const responseData = response.data;
          //       // if (responseData.length === 0) {
          //       //   handleSnack(
          //       //     "info",
          //       //     INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE
          //       //   );
          //       // }
          //       obj.dropdownOptions = responseData;
          //       _searchWarranty[id] = obj;
          //       setSearchWarranty([..._searchWarranty]);
          //       $(`.scrollbar-${id}`).css("display", "block");
          //     } else {
          //       handleSnack("info", INPUT_SEARCH_API_ERROR_MESSAGE);
          //     }
          //   },
          //   (error) => {}
          // );
        } else {
          obj.dropdownOptions = [];
          obj.inputSearch = "";
          _searchWarranty[id] = obj;
          setSearchWarranty([..._searchWarranty]);
        }
      } else {
        handleSnack("info", INPUT_SEARCH_ERROR_MESSAGE);
      }
      setEquWarrantyId(null);
      setEquWarrantyData({
        modelNumber: "",
        serialNumber: "",
      });
      obj.inputSearch = value;
    } catch (error) {
      return;
    }
  };

  const handleSelectDropdownItem = (currentItem, id) => {
    console.log("currentItem :: ", currentItem);

    setEquWarrantyId(currentItem.warrantyId);
    setEquWarrantyData({
      modelNumber: currentItem.model,
      serialNumber: currentItem.makerSerialNumber,
    });
    let _searchWarranty = [...searchWarranty];
    let obj = _searchWarranty[id];
    obj.inputSearch =
      currentItem[
        obj.fieldName?.value === "serialNumber"
          ? "makerSerialNumber"
          : obj.fieldName?.value
      ];
    obj.selectedOption =
      currentItem[
        obj.fieldName?.value === "serialNumber"
          ? "makerSerialNumber"
          : obj.fieldName?.value
      ];
    _searchWarranty[id] = obj;
    setSearchWarranty([..._searchWarranty]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  const handleSearchWarranty = () => {
    try {
      if (
        isEmpty(searchWarranty[0].fieldName?.value) ||
        isEmpty(searchWarranty[0].inputSearch)
      ) {
        handleSnack("info", FILL_DATA_PROPERLY_ERROR_MESSAGE);
      } else {
        if(equWarrantyId){
          const rUrl = `${WARRANTY_MASTER_URL}/${equWarrantyId}`;
          // const rUrl = `${Search_By_Fields_Warranty_List_GET}field_name=${searchWarranty[0].fieldName.value}&field_value=${searchWarranty[0].inputSearch}`;
          callGetApi(
            rUrl,
            (response) => {
              if (response.status === API_SUCCESS) {
                const responseData = response.data;
                if (responseData.length === 0) {
                  handleSnack("info", INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE);
                  return;
                }
                setWarrantyRecord([
                  {
                    ...responseData,
                    modelNumber: equWarrantyData.modelNumber,
                    serialNumber: equWarrantyData.serialNumber,
                  },
                ]);
                // if (responseData.length !== 0) {
                // handleGetEquipmentData(responseData);
                // } else {
                //   setWarrantyRecord([]);
                // }
                // setWarrantyRecord(responseData);
              } else {
                handleSnack("info", INPUT_SEARCH_API_ERROR_MESSAGE);
              }
            },
            (error) => {}
          );
        }else{
          handleSnack("info", INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE);
        }
      }
    } catch (error) {}
  };

  const warrantyColumns = [
    {
      field: "warrantyId",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      //   width: 90,
      flex: 1,
    },
    {
      field: "modelNumber",
      headerName: "Model Number",
      width: 150,
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Serial No.",
      flex: 1,
      // renderCell: (params) => <div>ZMX00507</div>,
    },
    {
      field: "componentNumber",
      headerName: "Component Code",
      flex: 1,
      renderCell: (params) => <div>NA</div>,
      // renderCell: (params) => <div></div>,
    },
    {
      field: "basis",
      headerName: "Basis",
      flex: 1,
      renderCell: ({ row }) => (
        <div>
          {row.yearlyWarranties ? row["yearlyWarranties"][0]["basis"] : "TIME"}
        </div>
      ),
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "warrantyStartDate",
      headerName: "Start Date",
      flex: 1,
      // renderCell: (params) => <div>12/11/2023</div>,
      renderCell: ({ row }) => (
        <div>
          {row?.yearlyWarranties
            ? row["yearlyWarranties"][0]["warrantyStartDate"]
            : "NA"}
        </div>
      ),
    },
    {
      field: "warrantyEndDate",
      headerName: "End Date",
      flex: 1,
      // renderCell: (params) => <div>11/11/2023</div>,
      renderCell: ({ row }) => (
        <div>
          {row.yearlyWarranties
            ? row["yearlyWarranties"][0]["warrantyEndDate"]
            : "NA"}
        </div>
      ),
    },
    {
      field: "warrantyStartUsage",
      headerName: "Start Usage",
      flex: 1,
      // renderCell: (params) => <div>NA</div>,
      renderCell: ({ row }) => (
        <div>
          {row.yearlyWarranties
            ? row["yearlyWarranties"][0]["warrantyStartUsage"]
              ? row["yearlyWarranties"][0]["warrantyStartUsage"]
              : "NA"
            : "NA"}
        </div>
      ),
    },
    {
      field: "warrantyEndUsage",
      headerName: "End Usage",
      flex: 1,
      // renderCell: (params) => <div>NA</div>,
      renderCell: ({ row }) => (
        <div>
          {row.yearlyWarranties
            ? row["yearlyWarranties"][0]["warrantyEndUsage"]
              ? row["yearlyWarranties"][0]["warrantyEndUsage"]
              : "NA"
            : "NA"}
        </div>
      ),
    },
    // {
    //   field: "warrantyStatus",
    //   headerName: "Warranty Status",
    //   width: 150,
    //   flex: 1,
    // },
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
                onClick={() => handlOpenWarrantyDetailsModal(params)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
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
                className="cursor"
                onClick={() => handleOpenWarrantyOverview(params)}
              >
                <Tooltip title="Overview">
                  {/* <VisibilityIcon /> */}
                  <img
                    className="text-primary"
                    src="../../assets/images/claimReport.png"
                    style={{ width: "17px", height: "17px" }}
                  />
                </Tooltip>

                {/* 
                const handleOpenClaimCreateModal = () => {

                } */}
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

  // view warranty details model show
  const handlOpenWarrantyDetailsModal = (params) => {
    const warrantyId = params.row["warrantyId"];
    setRecordId(warrantyId);
    setOpenWarrantyEditModal(true);
  };

  // Open|Hide warranty overview modal
  const handleOpenWarrantyOverview = (params) => {
    const warrantyId = params.row["warrantyId"];
    setRecordId(warrantyId);
    setShowOverviewModal(true);
  };

  // open new claim create modal
  const handleOpenClaimCreateModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimCreateModal(!openClaimCreateModal);
  };

  // oepn claim Edit modal
  const handleOpenClaimEditModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimEditModal(!openClaimEditModal);
  };

  // open claim request Process modal
  const handleOpenClaimRequestModal = () => {
    setOpenClaimEditModal(false);
    setOpenClaimRequestModal(true);
  };

  // close claim request Process modal
  const handleCloseClaimRequestModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimRequestModal(!openClaimRequestModal);
  };

  // show claim part create modal
  const handleShowPartCreateModal = () => {
    setOpenClaimRequestModal(!openClaimRequestModal);
    setOpenPartCreateModal(!openPartCreateModal);
  };

  // open file Upload Modal
  const handleShowFileUploadModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenFileUploadModal(!openFileUploadModal);
  };

  //
  const handleRaiseClaimRequest = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimRequestModal(!openClaimRequestModal);
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
          <div className="d-flex justify-content-between align-items-baseline mt-3 mb-3">
            <h5 className="font-weight-600 mb-0 ">Warranty Administration</h5>
          </div>

          <div className="card border mt-4 px-4">
            <div className="bg-primary px-3 mt-2 mb-2 border-radius-10 ">
              <div className="row align-items-center">
                <div className="col-12 mx-2">
                  <div className="d-flex align-items-center w-100">
                    <div className="d-flex align-items-center bg-primary w-100">
                      <div
                        className="d-flex mr-2"
                        style={{ whiteSpace: "pre" }}
                      >
                        <h5 className="mr-2 mb-0 text-white">
                          <span>Search</span>
                        </h5>
                        <p className="ml-4 mb-0">
                          <a className="ml-3 cursor text-white cursor">
                            <EditOutlinedIcon />
                          </a>
                          <a
                            href={undefined}
                            className="ml-3 cursor text-white"
                          >
                            <ShareOutlinedIcon />
                          </a>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                        <div className="row align-items-center m-0">
                          {searchWarranty.map((obj, i) => (
                            <div
                              className={`customselectPortfolio d-flex align-items-center mr-3 my-2 border-radius-6`}
                              style={{ position: "relative", zIndex: 20 - i }}
                              key={"query" + i}
                              // className={`customselect ${
                              //   i < searchWarranty.length - 1 ? "p-2" : ""
                              // } border-white d-flex align-items-center mr-3 my-2 border-radius-10`}
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
                              <div className="customselectsearch customize">
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
                                {searchWarranty.length - 1 === i && (
                                  <div
                                    className="btn bg-primary text-white cursor"
                                    onClick={handleSearchWarranty}
                                  >
                                    <span className="mr-2">
                                      <SearchIcon />
                                    </span>
                                    SEARCH
                                  </div>
                                )}
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
                                    {obj.dropdownOptions.map(
                                      (currentItem, j) => (
                                        <li
                                          className="list-group-item"
                                          key={j}
                                          onClick={() =>
                                            handleSelectDropdownItem(
                                              currentItem,
                                              i
                                            )
                                          }
                                        >
                                          {
                                            currentItem[
                                              obj.fieldName?.value ===
                                              "serialNumber"
                                                ? "makerSerialNumber"
                                                : obj.fieldName?.value
                                            ]
                                          }
                                          {/* {currentItem[obj.fieldName?.value]} */}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                }
                              </div>
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
                    {/* <div
                      className="btn bg-white text-dark font-weight-500 mx-2"
                      onClick={() => setOpenWarrantyRequestModal(true)}
                    >
                      Warranty Request
                    </div> */}
                  </div>
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
                  loading={loading}
                  rows={warrantyRecord}
                  columns={warrantyColumns}
                  sx={GRID_STYLE}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  getRowId={(row) => row.warrantyId}
                />
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      {openWarrantyEditModal && (
        <WarrantyEditModal
          show={openWarrantyEditModal}
          hideModal={() => setOpenWarrantyEditModal(false)}
          recordId={recordId}
          handleSnack={handleSnack}
        />
      )}

      {(showOverviewModal ||
        openClaimCreateModal ||
        openClaimEditModal ||
        openClaimRequestModal ||
        openPartCreateModal ||
        openFileUploadModal) && (
        <WarrantyOverviewModal
          show={showOverviewModal}
          warrantyRecordId={recordId}
          hideModal={() => setShowOverviewModal(false)}
          handleSnack={handleSnack}
          openClaimCreateModal={openClaimCreateModal}
          handleClaimCreate={handleOpenClaimCreateModal}
          openClaimEditModal={openClaimEditModal}
          handleOpenClaimEditModal={handleOpenClaimEditModal}
          handleOpenClaimRequestModal={handleOpenClaimRequestModal}
          handleCloseClaimRequestModal={handleCloseClaimRequestModal}
          openClaimRequestModal={openClaimRequestModal}
          openPartCreateModal={openPartCreateModal}
          handleShowPartCreateModal={handleShowPartCreateModal}
          openFileUploadModal={openFileUploadModal}
          handleShowFileUploadModal={handleShowFileUploadModal}
          handleRaiseClaimRequest={handleRaiseClaimRequest}
        />
      )}

      {openWarrantyRequestModal && (
        <WarrantyRequestCreateModal
          show={openWarrantyRequestModal}
          hideModal={() => setOpenWarrantyRequestModal(false)}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default WarrantyAdministration;
