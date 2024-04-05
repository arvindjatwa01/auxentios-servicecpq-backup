import React, { useCallback, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import returnIcon from "../../assets/icons/svg/returnIcon.svg";

import { Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import $ from "jquery";

import SearchComponent from "pages/components/SearchComponent";
import { sparePartSearch } from "services/searchServices";
import { GRID_STYLE, SPAREPART_SEARCH_Q_OPTIONS } from "pages/Common/constants";
import SearchPartListModal from "./SearchPartListModal";
import { callDeleteApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { RELATED_PARTS_MASTER_URL } from "services/CONSTANTS";
import SupplierClaimModal from "./SupplierClaimModal";

const ClaimRelatedPartList = ({
  handleBack,
  records,
  relatedPartsRecords = [],
  setRelatedPartsRecords,
  handleSnack,
  claimOrderId,
  handleEvaluationPartsReturn,
}) => {
  const [partsData, setPartsData] = useState({
    id: "",
    jobCode: "",
    jobOperation: "",
    description: "",
    pricingMethod: "",
    componentCode: "",
    user: "USER1",
  });

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
  const [searchResultOpen, setSearchResultOpen] = useState(false);

  const [rowModesModel, setRowModesModel] = useState({});
  const [openClaimSuplierModal, setOpenClaimSuplierModal] = useState(false);
  const [claimSupplierRecord, setClaimSupplierRecord] = useState("");

  // input fields value change
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setPartsData({ ...partsData, [name]: value });
  };

  // clear filter
  const clearFilteredData = () => {
    setMasterData([]);
  };

  // Consumable Search
  const handleQuerySearchClick = async (type) => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
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
        const res = await sparePartSearch(searchStr);
        // console.log("search Query Result :", res);
        setMasterData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  // Close SparePart search modal
  const handleSearchResClose = () => {
    setSearchResultOpen(false);
    // setSelectedMasterData([]);
  };

  //
  const handleSavePelatedParts = () => {
    handleBack();
  };

  const handleRowEditStart = (params, event) => {
    console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (relatedPartsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [relatedPartsId]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (relatedPartsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [relatedPartsId]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (relatedPartsId) => () => {
    callDeleteApi(
      null,
      `${RELATED_PARTS_MASTER_URL}/${relatedPartsId}`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setRelatedPartsRecords(
            relatedPartsRecords.filter(
              (row) => row.relatedPartsId !== relatedPartsId
            )
          );
        }
      }
    );
  };

  const handleCancelClick = (relatedPartsId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [relatedPartsId]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = relatedPartsRecords.find(
      (row) => row.relatedPartsId === relatedPartsId
    );
    if (editedRow.isNew) {
      setRelatedPartsRecords(
        relatedPartsRecords.filter(
          (row) => row.relatedPartsId !== relatedPartsId
        )
      );
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleClaimSupplierOpen = (row) => {
    setClaimSupplierRecord(row);
    setOpenClaimSuplierModal(true);
  };

  const handleClaimSupplierClose = (row) => {
    setClaimSupplierRecord("");
    setOpenClaimSuplierModal(false);
  };

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const updatedRow = { ...newRow, isNew: true };

        callPutApi(
          null,
          `${RELATED_PARTS_MASTER_URL}/${newRow.relatedPartsId}`,
          updatedRow,
          (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("success", "Parts updated successfully");
              setRelatedPartsRecords(
                relatedPartsRecords.map((row) =>
                  row.relatedPartsId === updatedRow.relatedPartsId
                    ? { ...updatedRow, isNew: undefined }
                    : row
                )
              );
              resolve(response.data);
            } else {
              handleSnack("error", "Parts details could not be updated");
              resolve(oldRow);
            }
          }
        );

        resolve(updatedRow);
      }),
    [relatedPartsRecords]
  );

  const partsColumns = [
    {
      field: "serialNo",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Part Description",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      editable: true,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "SP0023", value: "SP0023" },
        { label: "SP1987", value: "SP1987" },
        { label: "SP4987", value: "SP4987" },
      ],
      valueFormatter: ({ api, field, value }) => {
        const options = api.getColumn(field).valueOptions;
        const option = options.find(
          ({ value: optionValue }) => value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      renderCell: ({ row }) => <>{row.unitPrice * row.quantity}</>,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode =
          rowModesModel[row.relatedPartsId]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handleSaveClick(row.relatedPartsId)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.relatedPartsId)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit">
                <EditOutlinedIcon />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row.relatedPartsId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDeleteClick(row.relatedPartsId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Supplier Claim">
                <img
                  className="m-1"
                  src={"../../assets/images/supplierClaim.png"}
                  alt="Supplier Claim"
                  style={{ width: "20px", height: "20px", fill: "#872ff7" }}
                />
              </Tooltip>
            }
            label="Return"
            className="textPrimary"
            onClick={() => handleClaimSupplierOpen(row)}
            color="inherit"
          />,
        ];
      },
      // getActions: (params) => {
      //   return [
      //     <GridActionsCellItem
      //       icon={
      //         <div className=" cursor">
      //           <Tooltip title="Edit">
      //             <EditOutlinedIcon />
      //           </Tooltip>
      //         </div>
      //       }
      //       label="Edit"
      //       className="textPrimary"
      //       onClick={() => openSparePartRow(params.row)}
      //       color="inherit"
      //     />,
      //   ];
      // },
      // renderCell: (params) => (
      //   <button
      //     className="btn return-btn"
      //     onClick={() => handleEvaluationPartsReturn(params)}
      //   >
      //     Return
      //   </button>
      // ),
    },
  ];

  return (
    <>
      <div className="row d-flex justify-content-between align-items-center py-2 ">
        <h4 className="mx-3">Related Part List{"(s)"}</h4>
        <button
          className="btn btn-light bg-primary text-white mx-3"
          onClick={handleBack}
        >
          <ArrowBackIcon /> Back
        </button>
      </div>
      {/* <div className="card border px-3">
        <div className="row mt-2 input-fields">
          <div className="col-md-4 col-sm-4">
            <div className="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                JOB CODE
              </label>
              <input
                type="text"
                disabled
                className="form-control border-radius-10 text-primary"
                value={partsData.jobCode}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                JOB OPERATION
              </label>
              <input
                type="text"
                disabled
                className="form-control border-radius-10 text-primary"
                value={partsData.jobOperation}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                DESCRIPTION
              </label>
              <input
                type="text"
                disabled
                className="form-control border-radius-10 text-primary"
                value={partsData.description}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                COMPONENT CODE
              </label>
              <input
                type="text"
                disabled
                className="form-control border-radius-10 text-primary"
                value={partsData.componentCode}
              />
              <div className="css-w8dmq8">*Mandatory</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group mt-3">
              <label className="text-light-dark font-size-12 font-weight-600">
                USER
              </label>
              <input
                type="text"
                disabled
                className="form-control border-radius-10 text-primary"
                value={partsData.user}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="card border px-3 pb-3 mb-2">
        <div className="row align-items-center">
          <div className="col-8">
            <div className="d-flex align-items-center w-100">
              <div
                className="d-flex mr-3 col-auto pl-0"
                style={{ whiteSpace: "pre" }}
              >
                <h5 className="mr-2 mb-0 text-black">
                  <span>Parts Table</span>
                </h5>
              </div>
              <SearchComponent
                querySearchSelector={querySearchSelector}
                setQuerySearchSelector={setQuerySearchSelector}
                clearFilteredData={clearFilteredData}
                handleSnack={handleSnack}
                searchAPI={sparePartSearch}
                searchClick={handleQuerySearchClick}
                options={SPAREPART_SEARCH_Q_OPTIONS}
                background={"white"}
                type=""
                buttonText="ADD PART"
              />
            </div>
          </div>
        </div>
        <DataGrid
          sx={GRID_STYLE}
          getRowId={(row) => row.relatedPartsId}
          rows={relatedPartsRecords}
          autoHeight
          columns={partsColumns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          experimentalFeatures={{ newEditingApi: true }}
          onProcessRowUpdateError={(error) => console.log(error)}
          processRowUpdate={processRowUpdate}
          // paginationMode="server"
          // rowsPerPageOptions={[5, 10, 20]}
          // pagination
        />
      </div>
      <div className="row mb-2 mx-0" style={{ justifyContent: "right" }}>
        <button
          type="button"
          className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
          onClick={handleSavePelatedParts}
        >
          Save & Close
        </button>
      </div>
      {searchResultOpen && (
        <SearchPartListModal
          show={searchResultOpen}
          hideModal={handleSearchResClose}
          masterData={masterData}
          claimOrderId={claimOrderId}
          // relatedPartsRecords
          setRelatedPartsRecords={setRelatedPartsRecords}
          handleSnack={handleSnack}
        />
      )}
      {openClaimSuplierModal && (
        <SupplierClaimModal
          claimSupplierShow={openClaimSuplierModal}
          handleClaimSupplierClose={handleClaimSupplierClose}
          claimSupplierRecord={claimSupplierRecord}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default ClaimRelatedPartList;
