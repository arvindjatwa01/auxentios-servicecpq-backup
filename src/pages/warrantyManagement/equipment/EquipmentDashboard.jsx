import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Box, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import $ from "jquery";
import SelectFilter from "react-select";
import { Link } from "react-router-dom";

import CustomizedSnackbar from "../../../shared/CustomSnackBar";
import { equipmentSearch } from "../../../services/searchServices";
import { GRID_STYLE } from "../../common/constants";
import EquipmentSummaryModal from "./EquipmentSummaryModal";
import EquipmentDetailsModal from "./EquipmentDetailsModal";
import EquipmentCreateModal from "./EquipmentCreateModal";
import ClaimDetailsModal from "../claimMaster/ClaimDetailsModal";
import WarrantyOverviewModal from "../warrantyMaster/WarrantyOverviewModal";
import EquipmentEnrollModal from "./EquipmentEnrollModal";
import ClaimReportModal from "./ClaimReportModal";

// Equipment Master Search Select Options
const equipmentSearchOptions = [
  { label: "Serial No", value: "makerSerialNumber" },
  { label: "Model", value: "model" },
  { label: "Family", value: "family" },
  { label: "Equipment Id", value: "equipmentNumber" },
  { label: "Description", value: "description" },
];

const EquipmentDashboard = () => {
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
  const [openEquSummaryModal, setOpenEquSummaryModal] = useState(false);
  const [openEquDtlModal, setOpenEquDtlModal] = useState(false);
  const [openEquCreateModal, setOpenEquCreateModal] = useState(false);
  const [serialNumber, setSerialNumber] = useState(null);
  const [equRecordId, setEquRecordId] = useState(null);
  const [equipmentData, setEquipmentData] = useState(null);

  const [claimRecordDetail, setClaimRecordDetail] = useState(null);
  const [claimRecordId, setClaimRecordId] = useState(null);
  const [openClaimDetailsModal, setOpenClaimDetailsModal] = useState(false);

  const [warrantyRecordId, setWarrantyRecordId] = useState(null);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [openClaimCreateModal, setOpenClaimCreateModal] = useState(false);
  const [openClaimEditModal, setOpenClaimEditModal] = useState(false);
  const [openClaimRequestModal, setOpenClaimRequestModal] = useState(false);
  const [openPartCreateModal, setOpenPartCreateModal] = useState(false);
  const [openFileUploadModal, setOpenFileUploadModal] = useState(false);

  const [equEnrollModal, setEquEnrollModal] = useState(false);
  const [createEnrollment, setCreateEnrollment] = useState(true);

  const [openClaimReport, setOpenClaimReport] = useState(false);

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

  //  handle AND || OR operator
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };

  // select search category
  const handleSearchCategory = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectCategory = e;
    obj.inputSearch = "";
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };

  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    let searchString =
      tempArray[id].selectCategory.value + "~" + e.target.value;
    if (tempArray[id].selectCategory.value && e.target.value) {
      equipmentSearch(searchString)
        .then((res) => {
          obj.selectOptions = res;
          tempArray[id] = obj;
          setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          handleSnack("error", "Error occurred while searching spare parts!");
        });
    } else {
      handleSnack("info", "Please fill search criteria!");
      obj.selectOptions = [];
    }
    obj.inputSearch = e.target.value;
  };

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem[obj.selectCategory.value];
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  const handleDeleteQuerySearch = () => {
    setQuerySearchSelector([
      {
        id: 0,
        selectCategory: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
  };

  //
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
        const res = await equipmentSearch(searchStr);
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const handleCreateEnrollement = () => {
    setEquipmentData(null);
    setCreateEnrollment(true);
    setEquRecordId(null);
    setEquEnrollModal(!equEnrollModal);
  };

  // edit ewuipment data
  const handleViewEquModal = (params) => {
    const serialNo = params.row["equipmentNumber"];
    const id = params.row["id"];
    setEquipmentData(params.row);
    setSerialNumber(serialNo);
    setEquRecordId(id);
    setOpenEquSummaryModal(true);
    setCreateEnrollment(false);
  };

  // show|hide equipment details modal
  const handleEquipmentDtlModal = () => {
    setOpenEquSummaryModal(!openEquSummaryModal);
    setOpenEquDtlModal(!openEquDtlModal);
  };

  // show|hide equipment details modal
  const handleEquipmentCreateModal = () => {
    setOpenEquSummaryModal(!openEquSummaryModal);
    setOpenEquCreateModal(!openEquCreateModal);
  };

  // show claim details modal
  const handleShowClaimDetailsModal = () => {
    setOpenEquCreateModal(!openEquCreateModal);
    setOpenClaimDetailsModal(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID #",
      flex: 1,
    },
    {
      field: "equipmentNumber",
      headerName: "Serial Number",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
    },
    //   {
    //     field: "warrantyStatus",
    //     headerName: "Warranty Status",
    //     flex: 1,
    //   },
    //   {
    //     field: "purchaseDate",
    //     headerName: "Purchase Date",
    //     flex: 1,
    //   },
    {
      field: "yearOfManufacture",
      headerName: "Manufacture Date",
      flex: 1,
    },
    //   {
    //     field: "installer",
    //     headerName: "Installer",
    //     flex: 1,
    //   },
    {
      field: "installationDate",
      headerName: "Date of Install",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "currentClient",
      headerName: "Customer Id",
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
                onClick={() => handleViewEquModal(params)}
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
                className=" cursor"
                onClick={() => handleOpenWarrantyOverview(params)}
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
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => handleOpenClaimHistory(params)}
              >
                <Tooltip title="Claim History">
                  <img
                    className="text-primary"
                    src="../../assets/images/claimReport.png"
                    style={{ width: "18px", height: "18px" }}
                  />
                </Tooltip>
              </div>
            }
            label="Claim History"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Open|Hide warranty overview modal
  const handleOpenWarrantyOverview = (params) => {
    const warrantyId = params.row["warrantyId"];
    setWarrantyRecordId(warrantyId);
    setShowOverviewModal(true);
  };

  // open|Hide claim History modal
  const handleOpenClaimHistory = (params) => {
    const _serialNumber = params.row["equipmentNumber"];
    setSerialNumber(_serialNumber);

    const warrantyId = params.row["warrantyId"];
    setWarrantyRecordId(warrantyId);
    setOpenClaimReport(true);
  };

  // open new claim create modal
  const handleOpenClaimCreateModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimCreateModal(!openClaimCreateModal);
  };

  // open new Claim create modal from Claim Report Modal
  const handleOpenClaimCreateByHistory = () => {
    setOpenClaimReport(!openClaimReport);
    setOpenClaimCreateModal(!openClaimCreateModal);
  };

  // open claim Edit modal
  const handleOpenClaimEditModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimEditModal(!openClaimEditModal);
  };

  // open claim edit modal (from claim report modal)
  const handleOpenClaimEditByHistory = () => {
    setOpenClaimReport(!openClaimReport);
    setOpenClaimEditModal(!openClaimEditModal);
  };

  // open claim request Process modal
  const handleOpenClaimRequestModal = () => {
    setOpenClaimEditModal(false);
    setOpenClaimRequestModal(true);
  };

  // open claim request Process modal  (from claim report modal)
  const handleOpenClaimRequestByHistory = () => {
    setOpenClaimEditModal(false);
    setOpenClaimRequestModal(true);
  };

  // close claim request Process modal
  const handleCloseClaimRequestModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setOpenClaimRequestModal(!openClaimRequestModal);
  };

  // close claim request Process modal  (from claim report modal)
  const handleCloseClaimRequestModalByHistory = () => {
    setOpenClaimReport(!openClaimReport);
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

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body bg-white" style={{ minHeight: "884px" }}>
        <div className="container-fluid mt-3">
          <h4 className="font-weight-600 mb-3 mt-4">Equipment Search</h4>
          <div className="bg-primary px-3 mb-3 border-radius-10">
            <div className="row align-items-center">
              <div className="col-12 mx-2">
                <div className="d-flex align-items-center w-100">
                  <div className="d-flex align-items-center bg-primary w-100">
                    <div
                      className="d-flex mr-3 py-3"
                      style={{ whiteSpace: "pre" }}
                    >
                      <h5 className="mr-2 mb-0 text-white">
                        <span>Search</span>
                      </h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                      <div className="row align-items-center m-0">
                        {querySearchSelector.map((obj, i) => (
                          <div
                            className={`customselectPortfolio d-flex align-items-center mr-3 my-2 border-radius-6`}
                            style={{ position: "relative", zIndex: 20 - i }}
                            key={"query" + i}
                          >
                            {i > 0 && (
                              <SelectFilter
                                isClearable={true}
                                defaultValue={{ label: "And", value: "AND" }}
                                options={[
                                  { label: "And", value: "AND", id: i },
                                  { label: "OR", value: "OR", id: i },
                                ]}
                                placeholder="And/Or"
                                onChange={(e) => handleOperator(e, i)}
                                value={obj.selectOperator}
                              />
                            )}

                            <div>
                              <SelectFilter
                                // isClearable={true}
                                options={equipmentSearchOptions}
                                onChange={(e) => handleSearchCategory(e, i)}
                                value={obj.selectCategory}
                              />
                            </div>
                            <div className="customselectsearch customize">
                              <input
                                className="custom-input-sleact pr-1"
                                style={{ position: "relative" }}
                                type="text"
                                placeholder="Search string"
                                value={obj.inputSearch}
                                onChange={(e) => handleInputSearch(e, i)}
                                id={"inputSearch-" + i}
                                autoComplete="off"
                              />
                              {querySearchSelector.length - 1 === i && (
                                <div
                                  className="btn bg-primary text-white"
                                  onClick={() => handleQuerySearchClick()}
                                >
                                  <span className="mr-2">
                                    <SearchIcon />
                                  </span>
                                  SEARCH
                                </div>
                              )}
                              {obj.selectOptions &&
                                obj.selectOptions.length > 0 && (
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar-repair-autocomplete scrollbar-${i} style`}
                                    id="style"
                                  >
                                    {obj.selectOptions.map((currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={(e) =>
                                          handleSearchListClick(
                                            e,
                                            currentItem,
                                            obj,
                                            i
                                          )
                                        }
                                      >
                                        {currentItem[obj.selectCategory.value]}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </div>
                          </div>
                        ))}
                        <div>
                          <Link
                            to="#"
                            className="btn-sm text-black border mr-2"
                            style={{ border: "1px solid #872FF7" }}
                          >
                            <span style={{ color: "white" }}>+</span>
                          </Link>
                        </div>

                        <div onClick={handleDeleteQuerySearch}>
                          <Link to="#" className="btn-sm border mr-2">
                            <i
                              className="fa fa-trash fa-lg"
                              style={{ color: "white" }}
                            ></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="btn bg-white text-dark font-weight-500 mx-2"
                    onClick={handleCreateEnrollement}
                  >
                    Enroll Equipment
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <Box
              sx={{
                width: "100%",
                height: 400,
                // marginBottom: 8,
                // marginInline: 2,
              }}
            >
              <DataGrid
                sx={GRID_STYLE}
                rows={masterData}
                columns={columns}
                autoHeight
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20, 50]}
                getRowId={(row) => row.id}
              />
            </Box>
          </div>
        </div>
      </div>
      {(openEquSummaryModal || openEquDtlModal || openEquCreateModal) && (
        <EquipmentSummaryModal
          show={openEquSummaryModal}
          handleClose={() => setOpenEquSummaryModal(false)}
          handleSnack={handleSnack}
          serialNumber={serialNumber}
          handleViewDetails={handleEquipmentDtlModal}
          handleConfirm={handleEquipmentCreateModal}
          equipmentRecord={equipmentData}
        />
      )}

      {/* {openEquDtlModal && (
        <EquipmentDetailsModal
          show={openEquDtlModal}
          handleClose={handleEquipmentDtlModal}
          handleSnack={handleSnack}
          recordId={equRecordId}
        />
      )} */}

      {(openEquDtlModal || equEnrollModal) && (
        <EquipmentEnrollModal
          show={createEnrollment ? equEnrollModal : openEquDtlModal}
          hideModal={
            createEnrollment ? handleCreateEnrollement : handleEquipmentDtlModal
          }
          handleSnack={handleSnack}
          recordId={equRecordId}
          equipmentRecord={equipmentData}
        />
      )}

      {openEquCreateModal && (
        <EquipmentCreateModal
          show={openEquCreateModal}
          hideModal={handleEquipmentCreateModal}
          handleSnack={handleSnack}
          serialNumber={serialNumber}
          equipmentRecord={equipmentData}
          setClaimRecordId={setClaimRecordId}
          setClaimRecordDetail={setClaimRecordDetail}
          handleShowClaimDetailsModal={handleShowClaimDetailsModal}
        />
      )}

      {openClaimDetailsModal && (
        <ClaimDetailsModal
          show={openClaimDetailsModal}
          hideModal={() => setOpenClaimDetailsModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          // handleOpenClaimRequestModal={handleOpenClaimRequestModal}
        />
      )}
      {!openClaimReport &&
        (showOverviewModal ||
          openClaimCreateModal ||
          openClaimEditModal ||
          openClaimRequestModal ||
          openPartCreateModal ||
          openFileUploadModal) && (
          <WarrantyOverviewModal
            show={showOverviewModal}
            warrantyRecordId={warrantyRecordId}
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
          />
        )}
      {!showOverviewModal &&
        (openClaimReport ||
          openClaimCreateModal ||
          openClaimEditModal ||
          openClaimRequestModal) && (
          <ClaimReportModal
            show={openClaimReport}
            hideModal={() => setOpenClaimReport(false)}
            serialNumber={serialNumber}
            warrantyRecordId={warrantyRecordId}
            openClaimCreateModal={openClaimCreateModal}
            handleClaimCreate={handleOpenClaimCreateByHistory}
            handleSnack={handleSnack}
            openClaimEditModal={openClaimEditModal}
            handleOpenClaimEditModal={handleOpenClaimEditByHistory}
            handleOpenClaimRequestModal={handleOpenClaimRequestByHistory}
            openClaimRequestModal={openClaimRequestModal}
            handleCloseClaimRequestModal={handleCloseClaimRequestModalByHistory}
          />
        )}
    </>
  );
};

export default EquipmentDashboard;
