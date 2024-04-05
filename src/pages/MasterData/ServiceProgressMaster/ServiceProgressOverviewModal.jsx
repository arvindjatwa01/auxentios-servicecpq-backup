import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { Box, Switch, Tab, TextField, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";


import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import penIcon from "../../../assets/images/pen.png";
import ServiceProgressIssueComponent from "./ServiceProgressIssueComponent";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { GRID_STYLE } from "pages/Common/constants";
import { FONT_STYLE } from "pages/Repair/CONSTANTS";
import ServiceTabDetails from "./ServiceTabDetails";
import EquipmentSearchComponent from "../EquipmentSearchComponent";

const itemDetailsObj = {
  componentId: "123",
  description: "abcd",
  type: "",
  availableDate: new Date(),
  status: "",
  salePrice: "",
  location: "",
  manufacturer: "",
  modelNumber: "",
  serialNumber: "",
  coreId: "",
  returnable: false,
  valuation: "",
};

const erpDetailsObj = {
  materialCode: "",
  materialDescription: "",
  materialGroup: "",
  averageCost: "",
  salePrice: "",
  availablityStatus: "",
  stockQuantity: "",
  status: "",
  warehouse: "",
};

const returnDetailsObj = {
  customerId: "",
  customerName: "",
  description: "",
  programName: "",
  comment: "",
  employeName: "",
};

const returnCoreParts = [
  {
    itemCode: "2471437",
    itemDescription: "VALVE GP-CON",
    serialNumber: "ZMX00507",
    salesUnit: "PC",
    quantity: "1",
    category: "Base",
    netValue: "$ 64789.45",
    itemStatus: "NEW",
    cerficate: "STD-12",
  },
];

const tableTwoData = [
  {
    itemNumber: "10R4469",
    itemDescription: "Full Core Deposit - Engine Stage III A",
    category: "Core",
    dateOfIssue: "10/02/2017",
    status: "Returned",
  },
  {
    itemNumber: "2102582",
    itemDescription: "CORE AS-AFTC",
    category: "Core",
    dateOfIssue: "21/11/2019",
    status: "Pending",
  },
];


const ComponentColumns = [
  {
    field: "id",
    headerName: "Id",
    flex: 1,
  },
  {
    field: "itemCode",
    headerName: "Item Code",
    flex: 1,
  },
  {
    field: "itemDescription",
    headerName: "Item Description",
    flex: 1,
  },
  {
    field: "serialNumber",
    headerName: "Serial Number",
    flex: 1,
  },
  {
    field: "salesUnit",
    headerName: "Sales Unit",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Cateogry",
    flex: 1,
  },
  {
    field: "netValue",
    headerName: "Net Value",
    flex: 1,
  },
  {
    field: "itemStatus",
    headerName: "Item Status",
    flex: 1,
  },
  {
    field: "action",
    type: "actions",
    headerName: "Actions",
    flex: 1,
    cellClassName: "actions",
    getActions: (params) => {
      return [
        <GridActionsCellItem
          icon={
            <div
              className="cursor"
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
            >
              <Tooltip title="Delete">
                <DeleteOutlineOutlinedIcon />
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
]


const addAutoIncrementIds = (rows) => {
  return rows.map((row, index) => ({
    id: index + 1, // Auto-incrementing ID starting from 1
    ...row,
  }));
};

const ServiceProgressOverviewModal = ({
  show,
  hideModal,
  handleRetrunProcessModal,
}) => {
  const [activeTab, setActiveTab] = useState("itemDetails");
  const [itemDetails, setItemDetails] = useState({ ...itemDetailsObj });
  const [erpDetails, setErpDetails] = useState({ ...erpDetailsObj });

  const [returnTabDetails, setReturnTabDetails] = useState({
    ...returnDetailsObj,
  });
  const activeComponentColumns = [
    {
      field: "itemNumber",
      headerName: "Item Number",
      flex: 1,
    },
    {
      field: "itemDescription",
      headerName: "Item Description",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "dateOfIssue",
      headerName: "Date of Issue",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
              >
                <button
                  className="btn btn-primary"
                  onClick={handleRetrunProcessModal}
                >
                  Return Process
                </button>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
        ];
      },
    },
  ]

  const [editable, setEditable] = useState(false);
  const handleEdit = () => {
    setEditable(!editable);
  }

  // view item details tab view
  const viewItemDetails = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">ITEM DETAILS</h5>
          <div>
            <button
              className="border-primary text-primary rounded-pill cursor px-3 py-1"
              onClick={handleEdit}
            >
              <img className="m-1" src={penIcon} alt="Edit" /> Edit
            </button>
          </div>
        </div>
        <div className="card border px-2 py-3 mt-2">
          {!editable ?
            <>
              <div className="row align-items-end px-2 py-2">
                <ReadOnlyField
                  label="COMPONENT ID"
                  value={isEmpty(itemDetails.componentId) ? "N/A" : itemDetails.componentId}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="DESCRIPTION"
                  value={isEmpty(itemDetails.description) ? "N/A" : itemDetails.description}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="TYPE"
                  value={isEmpty(itemDetails.type) ? "N/A" : itemDetails.type}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="AVAILABLE DATE"
                  value={isEmpty(itemDetails.availableDate) ? "N/A" : getFormatDateTime(itemDetails.availableDate, false)}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="STATUS"
                  value={isEmpty(itemDetails.status?.label) ? "N/A" : itemDetails.status?.label}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="SALE PRICE"
                  value={isEmpty(itemDetails.salePrice) ? "N/A" : itemDetails.salePrice}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="LOCATION"
                  value={isEmpty(itemDetails.location) ? "N/A" : itemDetails.location}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="MANUFACTURER"
                  value={isEmpty(itemDetails.manufacturer) ? "N/A" : itemDetails.manufacturer}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="MODEL NUMBER"
                  value={isEmpty(itemDetails.modelNumber) ? "N/A" : itemDetails.modelNumber}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="SERIAL NUMBER"
                  value={isEmpty(itemDetails.serialNumber) ? "N/A" : itemDetails.serialNumber}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="COMP ID (CORE)"
                  value={isEmpty(itemDetails.coreId) ? "N/A" : itemDetails.coreId}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="RETURNABLE"
                  value={itemDetails.returnable ? "Yes" : "No"}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="VALUATION"
                  value={isEmpty(itemDetails.valuation) ? "N/A" : `${itemDetails.valuation} $`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
              </div>
            </> :
            <>
              <div className="row input-fields px-2 py-2 align-items-end">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      COMPONENT ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="componentId"
                      placeholder="Component Id"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.componentId) ? "" : itemDetails.componentId}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="description"
                      placeholder="Description"
                      value={isEmpty(itemDetails.description) ? "" : itemDetails.description}
                      onChange={() => { }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      TYPE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="type"
                      placeholder="Type"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.type) ? "" : itemDetails.type}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      AVAILABLE DATE
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          // maxDate={new Date()}
                          closeOnSelect
                          value={new Date()}
                          //onChange={() => { }}
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
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      STATUS
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="status"
                      placeholder="Status"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.status) ? "" : itemDetails.status}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      SALE PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="salePrice"
                      placeholder="Sale Price"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.salePrice) ? "" : itemDetails.salePrice}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      LOCATION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="location"
                      placeholder="Location"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.location) ? "" : itemDetails.location}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      MANUFACTURER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="manufacturer"
                      placeholder="Manufacturer"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.manufacturer) ? "" : itemDetails.manufacturer}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      MODEL NUMBER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="modelNumber"
                      placeholder="Model Number"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.modelNumber) ? "" : itemDetails.modelNumber}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      SERIAL NUMBER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="serialNumber"
                      placeholder="Serial Number"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.serialNumber) ? "" : itemDetails.serialNumber}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      COMP ID (CORE)
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="compid"
                      placeholder="Comp Id (Core)"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.coreId) ? "" : itemDetails.coreId}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <FormGroup>
                      <FormControlLabel
                        style={{ alignItems: "start", marginLeft: 0 }}
                        control={
                          <Switch
                            onChange={(e) => { }}
                            checked={!isEmpty(itemDetails.returnable)}
                          />
                        }
                        labelPlacement="top"
                        label={
                          <span className="text-light-dark font-size-14 font-weight-500">
                            RETURNABLE
                          </span>
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      VALUATION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="valuation"
                      placeholder="Valuation"
                      onChange={() => { }}
                      value={isEmpty(itemDetails.valuation) ? "" : itemDetails.valuation}
                    />
                  </div>
                </div>
              </div>
            </>}
        </div>
        <h5 className="font-weight-bold fw-bold mb-0">ERP DETAILS</h5>
        <div className="card border px-2 py-3 mt-2">
          {!editable ?
            <>
              <div className="row align-items-end px-2 py-2">
                <ReadOnlyField
                  label="MATERIAL CODE"
                  value={isEmpty(erpDetails.materialCode) ? "N/A" : `${erpDetails.materialCode}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="MATERIAL DESCRIPTION"
                  value={isEmpty(erpDetails.materialDescription) ? "N/A" : `${erpDetails.materialDescription}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="MATERIAL GROUP"
                  value={isEmpty(erpDetails.materialGroup) ? "N/A" : `${erpDetails.materialGroup}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="AVERAGE COST"
                  value={isEmpty(erpDetails.averageCost) ? "N/A" : `${erpDetails.averageCost} $`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="SALE PRICE"
                  value={isEmpty(erpDetails.salePrice) ? "N/A" : `${erpDetails.salePrice} $`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="AVAILABILITY STATUS"
                  value={isEmpty(erpDetails.availablityStatus) ? "N/A" : `${erpDetails.availablityStatus}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="STOCK QUANTITY"
                  value={isEmpty(erpDetails.stockQuantity) ? "N/A" : `${erpDetails.stockQuantity}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="STATUS"
                  value={isEmpty(erpDetails.status) ? "N/A" : `${erpDetails.status}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
                <ReadOnlyField
                  label="PLANT / WAREHOUSE"
                  value={isEmpty(erpDetails.warehouse) ? "N/A" : `${erpDetails.warehouse}`}
                  className="col-lg-3 col-md-3 col-sm-6 col-12"
                />
              </div>
            </> :
            <>
              <div className="row input-fields px-2 py-2 align-items-end">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      MATERIAL CODE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="materialCode"
                      placeholder="Material Code"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.materialCode) ? "" : erpDetails.materialCode}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      MATERIAL DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="materialDescription"
                      placeholder="Material Description"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.materialDescription) ? "" : erpDetails.materialDescription}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      MATERIAL GROUP
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="materialgroup"
                      placeholder="Material Group"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.materialGroup) ? "" : erpDetails.materialGroup}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      AVERAGE COST
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="averageCost"
                      placeholder="Average Cost"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.averageCost) ? "" : erpDetails.averageCost}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      SALE PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="salePrice"
                      placeholder="SALE PRICE"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.salePrice) ? "" : erpDetails.salePrice}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      AVAILABLE STATUS
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="availableStatus"
                      placeholder="Available Status"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.availablityStatus) ? "" : erpDetails.availablityStatus}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      STOCK QUANTITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="stockQuantity"
                      placeholder="Stock Quantity"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.stockQuantity) ? "" : erpDetails.stockQuantity}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      STATUS
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="status"
                      placeholder="Status"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.status) ? "" : erpDetails.status}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      PLANT / WAREHOUSE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="wareHouse"
                      placeholder="Plant / WareHouse"
                      onChange={() => { }}
                      value={isEmpty(erpDetails.warehouse) ? "" : erpDetails.warehouse}
                    />
                  </div>
                </div>
              </div>
            </>
          }
        </div>
        <div className="d-flex justify-content-end mt-2">
          {editable && <button className='btn btn-primary mx-2' onClick={handleEdit}>Save</button>}
          {/* <button
            className="btn btn-primary"
            // id="details"
            onClick={handleEdit}
          >
            {editable ? "Save & Close" : "Close"}
          </button> */}
        </div>
      </>
    );
  };

  const handleReturnInputChange = (e) => {
    const { name, value } = e.target;
    setReturnTabDetails({ ...returnTabDetails, [name]: value });
  };

  // view return tab view
  const viewReturnTabView = () => {
    const componentRows = addAutoIncrementIds(returnCoreParts);
    return (
      <>
        {/* <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">
            Rent a New Equipment
          </h5>
        </div>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="row input-fields">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Customer Id
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.customerId}
                      name="customerId"
                      placeholder="Customer Id"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.customerName}
                      name="customerName"
                      placeholder="Customer Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Program Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.programName}
                      name="programName"
                      placeholder="Program Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.employeName}
                      name="employeName"
                      placeholder="Employee Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="row input-fields">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Description
                    </label>
                    <textarea
                      name="description"
                      cols="30"
                      rows="4"
                      value={returnTabDetails.description}
                      onChange={handleReturnInputChange}
                      placeholder="Description"
                      className="form-control border-radius-10 text-primary"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      cols="30"
                      rows="4"
                      value={returnTabDetails.comment}
                      onChange={handleReturnInputChange}
                      placeholder="Comment"
                      className="form-control border-radius-10 text-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <ServiceTabDetails />
        <div className="card border px-4 mt-4">
          <div className="m-3">
            <div className="d-flex align-items-center w-100">
              <h5 className="font-weight-bold fw-bold mb-1">
                REPLACEMENT
              </h5>
              <div className="ml-3">
                <EquipmentSearchComponent searchPlaceholder={"Replacement"}/>
              </div>
            </div>
            <div className="p-3 mt-3">
              <div style={{ height: 170, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={componentRows} columns={ComponentColumns} getRowId={(row) => row.id} pageSize={5} />
              </div>
            </div>
          </div>
        </div>
        <div className="card border px-4 mt-4">
          <div className="m-3">
            <div className="d-flex align-items-center w-100">
              <h5 className="font-weight-bold fw-bold mt-3">
                RETURNED
              </h5>
              <div className="ml-3">
                <EquipmentSearchComponent searchPlaceholder={"Returned"} />
              </div>
            </div>
            <div className="p-3 mt-3">
              <div style={{ height: 220, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={tableTwoData} columns={activeComponentColumns} getRowId={(row) => row.itemNumber} pageSize={5} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                aria-label="lab API tabs example"
                onChange={(e, tabValue) => setActiveTab(tabValue)}
                centered
              >
                <Tab label={`ITEM DETAILS`} value="itemDetails" />
                <Tab label={`ISSUE`} value="issue" />
                <Tab label={`RETURN`} value="return" />
              </TabList>
            </Box>
            <TabPanel value={activeTab}>
              {activeTab === "itemDetails" && viewItemDetails()}
              {activeTab === "issue" && <ServiceProgressIssueComponent />}
              {activeTab === "return" && viewReturnTabView()}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceProgressOverviewModal;
