import React, { useCallback, useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { Modal } from "react-bootstrap";
import Select from "react-select";
import $ from "jquery";

import ReturnSearch from "./ReturnSearch";
import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  SPAREPART_SEARCH_Q_OPTIONS,
} from "pages/Common/constants";
import {
  rmaResonOptions,
  rmaTypeOptions,
  partsShipmentObj,
  shipmentRetunTypeOptions,
} from "../warrantyManagementConstants";
import {
  SHIPMENT_HEADER_MASTER_URL,
  SHIPMENT_PARTS_MASTER_URL,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callDeleteApi, callPostApi, callPutApi } from "services/ApiCaller";
import { sparePartSearch } from "services/searchServices";
import SearchComponent from "pages/components/SearchComponent";
import SearchPartListModal from "../claimMaster/SearchPartListModal";

const dummyRecords = [
  {
    index: Math.floor(Math.random() * 900) + 10000,
    partNumber: "N90058041",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "RECEIVED",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "10R4469",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "RECEIVED",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "039720N2",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "RECEIVED",
  },
  {
    index: Math.floor(Math.random() * 9000) + 10000,
    partNumber: "5788987",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "RECEIVED",
  },
];

const failedPartAnalysisOptions = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
  `without any fault`,
];
const disposeOptions = [
  { label: "Received", value: "RECEIVED" },
  { label: "Wrong Part", value: "WRONG_PART" },
  { label: "No Part", value: "NO_PART" },
];

const ReturnReceivedModal = ({ show, hideModal, handleSnack }) => {
  const [shipmentHeaderData, setShipmentHeaderData] = useState({
    ...partsShipmentObj,
  });
  const [shipmentData, setShipmentData] = useState({
    ...partsShipmentObj,
  });
  const [shipmentTableRecords, setShipmentTableRecords] = useState([
    ...dummyRecords,
  ]);

  const [shipmentHeaderId, setShipmentHeaderId] = useState(null);
  const [shipmentSearchSelector, setShipmentSearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const [partsSearchData, setPartsSearchData] = useState([]);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [shipmentTableData, setShipmentTableData] = useState([]);
  const [shipmentRowModesModal, setShipmentRowModesModal] = useState({});

  // shipment header text change
  const handleShipmentextChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({ ...shipmentData, [name]: value });
  };

  // shipment select & date change
  const handleShipmentSelectChange = (e, keyName) => {
    setShipmentData({ ...shipmentData, [keyName]: e });
  };

  // Consumable Search
  const handlePartsSearchClick = async (type, shipmentSearch = false) => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    shipmentSearchSelector.map(function (item, i) {
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
        setPartsSearchData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStart = (params, event) => {
    console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const [rowModesModel, setRowModesModel] = React.useState({});

  const shipmentColumns = [
    {
      field: "shipmentPartNumber",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "shipmentPartDescription",
      headerName: "Part Descritpion",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Requested Quantity",
      flex: 1,
      editable: true,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "Known To be Faulty", value: "KNOWN_TO_BE_FAULTY" },
        { label: "Suspected", value: "SUSPECTED" },
        { label: "Without any fault", value: "WITHOUT_ANY_FAULT" },
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
      field: "disposeType",
      headerName: "Dispose",
      width: 180,
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { label: "Received", value: "RECEIVED" },
        { label: "Wrong Part", value: "WRONG_PART" },
        { label: "No Part", value: "NO_PART" },
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode =
          shipmentRowModesModal[row.shipmentPartId]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handleShipmentSaveClick(row.shipmentPartId)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleShipmentCancelClick(row.shipmentPartId)}
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
            onClick={handleShipmentRowEditClick(row.shipmentPartId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleShipmentDeleteClick(row.shipmentPartId)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleShipmentRowModesModelChange = (newRowModesModel) => {
    setShipmentRowModesModal(newRowModesModel);
  };

  const handleShipmentRowEditStart = (params, event) => {
    console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handleShipmentRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleShipmentRowEditClick = (shipmentPartId) => () => {
    setShipmentRowModesModal({
      ...shipmentRowModesModal,
      [shipmentPartId]: { mode: GridRowModes.Edit },
    });
  };

  const handleShipmentSaveClick = (shipmentPartId) => () => {
    setShipmentRowModesModal({
      ...shipmentRowModesModal,
      [shipmentPartId]: { mode: GridRowModes.View },
    });
  };

  const handleShipmentDeleteClick = (shipmentPartId) => () => {
    callDeleteApi(
      null,
      `${SHIPMENT_PARTS_MASTER_URL}/${shipmentPartId}`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setShipmentTableData(
            shipmentTableData.filter(
              (row) => row.shipmentPartId !== shipmentPartId
            )
          );
        }
      }
    );
  };

  const handleShipmentCancelClick = (shipmentPartId) => () => {
    setShipmentRowModesModal({
      ...shipmentRowModesModal,
      [shipmentPartId]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = shipmentTableData.find(
      (row) => row.shipmentPartId === shipmentPartId
    );
    if (editedRow.isNew) {
      setShipmentTableData(
        shipmentTableData.filter((row) => row.shipmentPartId !== shipmentPartId)
      );
    }
  };

  // const handleRowModesModelChange = (newRowModesModel) => {
  //   setPartsRowModesModel(newRowModesModel);
  // };

  const processShipmentRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const updatedRow = { ...newRow, isNew: true };

        callPutApi(
          null,
          `${SHIPMENT_PARTS_MASTER_URL}/${newRow.shipmentPartId}`,
          updatedRow,
          (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("success", "Parts updated successfully");
              setShipmentTableData(
                shipmentTableData.map((row) =>
                  row.shipmentPartId === updatedRow.shipmentPartId
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
    [shipmentTableData]
  );

  // go to the shipemnt report tab from shippment tab
  const handleAddUpdateShipmentDetails = () => {
    const rUrl = SHIPMENT_HEADER_MASTER_URL;
    const _shipmentParts = shipmentTableData.map((row) => row.shipmentPartId);
    const rObj = {
      ...shipmentData,
      // warrantyReturnId: warrantyReturnId,
      returnType: shipmentData.returnType?.value || "INTRA_COMPANY",
      rmaType: shipmentData.rmaType?.value || "STANDARD",
      rmaReason: shipmentData.rmaReason?.value || "",
      shipmentParts: [...shipmentData["shipmentParts"], ..._shipmentParts],
    };
    if (shipmentHeaderId) {
      callPutApi(null, `${rUrl}/${shipmentHeaderId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Shipment Details Updated successfully.");
        } else {
          handleSnack("info", "Something went wrong.");
        }
      });
    } else {
      callPostApi(null, `${rUrl}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleSnack("success", "Shipment Details Created successfully.");
          setShipmentHeaderId(responseData.shipmentHeaderId);
        } else {
          handleSnack("info", "Something went wrong.");
        }
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <Modal.Title className="mb-0">Return Received</Modal.Title>
          <ReturnSearch
            number={shipmentHeaderData["returnNumber"]}
            setShipmentData={setShipmentData}
          />
          <div className="card border px-3 py-2">
            <div className="row input-fields mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RETURN NUMBER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="returnNumber"
                    disabled
                    placeholder="Return Number"
                    value={shipmentData.returnNumber}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RETURN TYPE
                  </label>
                  <Select
                    className="text-primary"
                    options={shipmentRetunTypeOptions}
                    onChange={(e) =>
                      handleShipmentSelectChange(e, `returnType`)
                    }
                    value={shipmentData.returnType}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RMA TYPE
                  </label>
                  <Select
                    className="text-primary"
                    options={rmaTypeOptions}
                    onChange={(e) => handleShipmentSelectChange(e, `rmaType`)}
                    value={shipmentData.rmaType}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RMA REASON
                  </label>
                  <Select
                    className="text-primary"
                    options={rmaResonOptions}
                    onChange={(e) => handleShipmentSelectChange(e, `rmaReason`)}
                    value={shipmentData.rmaReason}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RMA NUMBER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="rmaNumber"
                    placeholder="RMA Number"
                    value={shipmentData.rmaNumber}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SHIPED ON
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        // maxDate={new Date()}
                        closeOnSelect
                        value={shipmentData.shippedOn}
                        onChange={(e) =>
                          handleShipmentSelectChange(e, "shippedOn")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              style: FONT_STYLE,
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    TRACKING NUMBER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="trackingNumber"
                    placeholder="Tracking Number"
                    value={shipmentData.trackingNumber}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SSENDER LOCATION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="senderLocation"
                    placeholder="Sender Location"
                    value={shipmentData.senderLocation}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RECEIVER LOCATION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="receiverLocation"
                    placeholder="Recevier Location"
                    value={shipmentData.receiverLocation}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RECEIVER ADDRESS
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="receiverAddress"
                    cols="30"
                    rows="2"
                    placeholder="Receiver Address..."
                    value={shipmentData.receiverAddress}
                    onChange={handleShipmentextChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="card border px-2 py-2">
            <div className="row align-items-center">
              <div className="col-8">
                <div className="d-flex align-items-center w-100">
                  <div
                    className="d-flex mr-3 col-auto pl-0"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-black">
                      <span>Shipment Items</span>
                    </h5>
                  </div>
                  <SearchComponent
                    querySearchSelector={shipmentSearchSelector}
                    setQuerySearchSelector={setShipmentSearchSelector}
                    // clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={sparePartSearch}
                    searchClick={handlePartsSearchClick}
                    options={SPAREPART_SEARCH_Q_OPTIONS}
                    background={"white"}
                    type=""
                    buttonText="ADD PART"
                    isShipmentSearch={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <DataGrid
            sx={GRID_STYLE}
            getRowId={(row) => row.shipmentPartId}
            rows={shipmentTableData}
            autoHeight
            columns={shipmentColumns}
            editMode="row"
            rowModesModel={shipmentRowModesModal}
            onRowModesModelChange={handleShipmentRowModesModelChange}
            onRowEditStart={handleShipmentRowEditStart}
            onRowEditStop={handleShipmentRowEditStop}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.log(error)}
            processRowUpdate={processShipmentRowUpdate}
            pageSizeOptions={[5, 10, 50, 100]}
          />
          <div className="row mt-2" style={{ justifyContent: "right" }}>
            <button className="btn btn-primary " onClick={hideModal}>
              Close
            </button>
            <button
              className="btn btn-primary mx-3"
              onClick={handleAddUpdateShipmentDetails}
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {searchResultOpen && (
        <SearchPartListModal
          show={searchResultOpen}
          hideModal={() => setSearchResultOpen(false)}
          masterData={partsSearchData}
          // claimOrderId={claimOrderId}
          setRelatedPartsRecords={setShipmentTableData}
          isShipmentSearch={true}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default ReturnReceivedModal;
