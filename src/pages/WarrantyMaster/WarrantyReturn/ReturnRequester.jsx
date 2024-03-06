import React, { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
} from "pages/Repair/CONSTANTS";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ReturnSearch from "./ReturnSearch";
import {
  returnPartHeaderReqObj,
  returnReqObj,
  returnShippingReqObj,
  shipmentHeaderReqObj,
} from "./WarrantyReturnConstents";
import { callPostApi } from "services/ApiCaller";
import {
  Warranty_Parts_Header_Create_POST,
  Warranty_Return_Create_POST,
  Warranty_Shipment_Header_Create_POST,
  Warranty_Shipping_Info_Create_POST,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { shipmentRetunTypeOptions } from "../CheckWarranty/claimWarrantyConstants";

const reasonForReturns = [
  {
    label: "Support Durability Failure Analysis",
    value: "SUPPORT_DURABILITY_FAILURE_ANALYSIS",
  },
  { label: "Support Part Rebuild", value: "SUPPORT_PART_REBUILD" },
  // { label: "Support Durabilit", value: "SUPPORT_DURABILIT" },
  // { label: "Failure Analysis", value: "FAILURE_ANALYSIS" },
  // { label: "Support parts rebuild", value: "SUPPORT_PARTS_REBUILD" },
];

const regionOptions = [
  { label: "India", value: "INDIA" },
  { label: "Australia", value: "AUSTRALIA" },
  { label: "Canada", value: "CANADA" },
  { label: "USA", value: "USA" },
];

const qecAssignedOptions = [
  { label: "Perth", value: "PERTH" },
  { label: "Sydney", value: "SYDNEY" },
];

const requestTypeOptions = [
  { label: "Part Number", value: "PART_NUMBER" },
  { label: "BEC Code", value: "BEC_CODE" },
  { label: "GTIN Number", value: "GTIN_NUMBER" },
];

const transactionTypeOptions = [
  { label: "Warranty Contract", value: "WARRANTY" },
  { label: "Safety Contract", value: "SAFETY" },
  { label: "Service Contract", value: "SERVICE_CONTRACT" },
];

const reasonOptions = [
  {
    label: "Supplier production Problem",
    value: "SUPPLIER_PRODUCTION_PROBLEM",
  },
  {
    label: "Incoming inspection Problem",
    value: "INCOMING_INSPECTION_PROBLEM",
  },
  {
    label: "In-production audit Problem",
    value: "IN_PRODUCTION_AUDIT_PROBLEM",
  },
  {
    label: "Final inspection and testing Problem",
    value: "FINAL_INSPECTION_AND_TESTING_PROBLEM",
  },
  { label: "PDI Problem", value: "PDI_PROBLEM" },
  { label: "Field Warranty failure Problem", value: "FIELDS_WARRANTY" },
  { label: "Customer complaint Problem", value: "CUSTOMER_COMPLAINT_pROBLEM" },
  {
    label: "Field survey result Problem",
    value: "FIELD_SURVEY_RESULT_PROBLEM",
  },
];

const warrantyDiagnosisOptions = [
  {
    label: "Symptoms observed by the Customer",
    value: "SYMPTOMS_OBSERVED_BY_THE_CUSTOMER",
  },
  {
    label: "Involvement of any related part (s) and/or its condition",
    value: "INVOLVEMENT_OF_ANY_PART_RELATED_PART_AND/OR_ITS_CONDITION",
  },
  {
    label: "Usage pattern of the customer",
    value: "USAGE_PATTERN_OF_CUSTOMER",
  },
  {
    label: "External environmental conditions",
    value: "EXTERNAL_ENVIRONMENTAL_CONDITIONS",
  },
  {
    label: "Observation during fault diagnosis",
    value: "OBSERVATION_DURING_FAULT_DIAGNOSIS",
  },
];

const dummyRecords = [
  {
    index: Math.floor(Math.random() * 900) + 10000,
    partNumber: "N90058041",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "Received",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "10R4469",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "Received",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "039720N2",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "Received",
  },
  {
    index: Math.floor(Math.random() * 9000) + 10000,
    partNumber: "5788987",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
    dispose: "Received",
  },
];

const failedPartAnalysisOptions = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
  `without any fault`,
];

const ReturnRequester = ({
  show,
  hideModal,
  handleSnack,
  countryRegionOptionsList,
  partSelectionData = [],
  disposenNeed = true,
}) => {
  const [tabValue, setTabValue] = useState("overview");
  const [returnReceivedTabValue, setReturnReceivedTabValue] =
    useState("returnRequested");

  console.log("------ ", partSelectionData);

  const [returnData, setReturnData] = useState({ ...returnReqObj });
  const [returnPartsHeaderData, setReturnPartsHeaderData] = useState({
    ...returnPartHeaderReqObj,
  });
  const [shippingInfoData, setShippingInfoData] = useState({
    ...returnShippingReqObj,
  });
  const [shipmentHeaderData, setShipmentHeaderData] = useState({
    ...shipmentHeaderReqObj,
  });

  const [returnRecivedData, setReturnRecivedData] = useState({
    ...shipmentHeaderReqObj,
  });

  // return Input text change
  const handleReturnInputChange = (e) => {
    const { name, value } = e.target;
    setReturnData({ ...returnData, [name]: value });
  };

  //  return Select and Date Value Change
  const handleReturnSelectChange = (e, keyName) => {
    setReturnData({ ...returnData, [keyName]: e });
  };

  // end Customer checkbox check- uncheck
  const handleEndCustomerCheckBox = (e) => {
    const { checked } = e.target;
    const requesterObj = {
      requesterName: "",
      requesterBU: "",
      requesterEmail: "",
      requesterPhone: "",
    };

    setReturnData({ ...returnData, endRequester: checked, ...requesterObj });
  };

  // parts header Input text change
  const handlePartsHeaderInputChange = (e) => {
    const { name, value } = e.target;
    setReturnPartsHeaderData({ ...returnPartsHeaderData, [name]: value });
  };

  //  parts header Select and Date Value Change
  const handlePartsHeaderSelectChange = (e, keyName) => {
    setReturnPartsHeaderData({ ...returnPartsHeaderData, [keyName]: e });
  };

  // change Part header checkbox check-uncheck
  const handelePartHeaderCheckbox = (e) => {
    const { name, checked } = e.target;
    setReturnPartsHeaderData({ ...returnPartsHeaderData, [name]: checked });
  };

  // shipping info input text change
  const handleShippingInfoTextChange = (e) => {
    const { name, value } = e.target;
    setShippingInfoData({ ...shippingInfoData, [name]: value });
  };

  // shipment header text change
  const handleShipmentHeaderTextChange = (e) => {
    const { name, value } = e.target;
    setShipmentHeaderData({ ...shipmentHeaderData, [name]: value });
  };

  // shipment select & date change
  const handleShipmentHeaderSelectChange = (e, keyName) => {
    setShipmentHeaderData({ ...shipmentHeaderData, [keyName]: e });
  };

  // view Overview tab form
  const viewOverviewTabData = () => {
    return (
      <>
        <div className="row input-fields px-3">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Reason For Return
              </label>
              <Select
                className="text-primary"
                options={reasonForReturns}
                onChange={(e) =>
                  handleReturnSelectChange(e, `reasonForReturnType`)
                }
                value={returnData.reasonForReturnType}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Region
              </label>
              <Select
                className="text-primary"
                // options={regionOptions}
                options={countryRegionOptionsList}
                onChange={(e) => handleReturnSelectChange(e, `region`)}
                value={returnData.region}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                QEC Assigned
              </label>
              <Select
                className="text-primary"
                options={qecAssignedOptions}
                onChange={(e) => handleReturnSelectChange(e, `qecAssigned`)}
                value={returnData.qecAssigned}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Assign Specialist
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="assignSpecialist"
                placeholder="Assign Specialist"
                value={returnData.assignSpecialist}
                onChange={handleReturnInputChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Request Title
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="requestTitle"
                placeholder="Request Title"
                value={returnData.requestTitle}
                onChange={handleReturnInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Geographical Group
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="geographicalGroup"
                placeholder="Geographical Group"
                value={returnData.geographicalGroup}
                onChange={handleReturnInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Type of Request
              </label>
              <Select
                className="text-primary"
                options={requestTypeOptions}
                onChange={(e) => handleReturnSelectChange(e, `requestType`)}
                value={returnData.requestType}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Transaction Type
              </label>
              <Select
                className="text-primary"
                options={transactionTypeOptions}
                onChange={(e) =>
                  handleReturnSelectChange(e, `claimTransactionType`)
                }
                value={returnData.claimTransactionType}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={returnData.endRequester}
                    onChange={handleEndCustomerCheckBox}
                  />
                }
                label="Are you the end requestor?"
              />
            </div>
          </div>
        </div>
        <div className="card border px-3 py-2">
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Requestor Name
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="requesterName"
                  placeholder="Requestor Name"
                  disabled={!returnData.endRequester}
                  readOnly={!returnData.endRequester}
                  value={returnData.requesterName}
                  onChange={handleReturnInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Business Unit
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="requesterBU"
                  placeholder="Business Unit"
                  disabled={!returnData.endRequester}
                  readOnly={!returnData.endRequester}
                  value={returnData.requesterBU}
                  onChange={handleReturnInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="requesterEmail"
                  placeholder="Email"
                  disabled={!returnData.endRequester}
                  readOnly={!returnData.endRequester}
                  value={returnData.requesterEmail}
                  onChange={handleReturnInputChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="requesterPhone"
                  placeholder="Phone Number"
                  disabled={!returnData.endRequester}
                  readOnly={!returnData.endRequester}
                  value={returnData.requesterPhone}
                  onChange={handleReturnInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-primary mx-3" onClick={hideModal}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreateReturnRequest}
          >
            Save & Next
          </button>
        </div>
      </>
    );
  };

  // view PartsSelection Creitria
  const viewPartsSelectioncritria = () => {
    return (
      <div className="card border px-3 py-2">
        <div className="row input-fields">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Max Quantity Requested
              </label>
              <input
                type="number"
                className="form-control border-radius-10 text-primary"
                name="maxQuantityRequested"
                placeholder="Max Quantity Requested"
                //   value={evaluatedByRecordObj.firstName}
                //   onChange={handleEvaluatedByInputTextChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Number
              </label>
              <input
                type="number"
                className="form-control border-radius-10 text-primary"
                name="claimNumber"
                placeholder="Claim Number"
                value={returnPartsHeaderData.claimNumber}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={returnPartsHeaderData.claimDate}
                    onChange={(e) =>
                      handlePartsHeaderSelectChange(e, "claimDate")
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
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Repair Date From
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={returnPartsHeaderData.repairDateFrom}
                    onChange={(e) =>
                      handlePartsHeaderSelectChange(e, "repairDateFrom")
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
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Repair Date To
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={returnPartsHeaderData.repairDateTo}
                    onChange={(e) =>
                      handlePartsHeaderSelectChange(e, "repairDateTo")
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
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Failure Code
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="failureCode"
                placeholder="Failure Code"
                value={returnPartsHeaderData.failureCode}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Message Code
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="messageCode"
                placeholder="Message Code"
                value={returnPartsHeaderData.messageCode}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                GTIN/BEC Code
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="gtinBCECode"
                placeholder="GTIN/BEC Code"
                value={returnPartsHeaderData.gtinBCECode}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Part Cost Range
              </label>
              <input
                type="number"
                className="form-control border-radius-10 text-primary"
                name="partCostRange"
                placeholder="Part Cost Range"
                value={returnPartsHeaderData.partCostRange}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                SMU Unit
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="smuUnit"
                placeholder="SMU Unit"
                value={returnPartsHeaderData.smuUnit}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                SMU From to SMU To
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="smuFromToSmuTo"
                placeholder="SMU From to SMU To"
                value={returnPartsHeaderData.smuFromToSmuTo}
                onChange={handlePartsHeaderInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row input-fields">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="form-group align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={returnPartsHeaderData.failurePartOnly}
                    name="failurePartOnly"
                    onChange={handelePartHeaderCheckbox}
                  />
                }
                label="Failure Part Only"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="form-group align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={returnPartsHeaderData.casualPartOnly}
                    name="casualPartOnly"
                    onChange={handelePartHeaderCheckbox}
                  />
                }
                label="Causal Part Only"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // view Shipping Info
  const viewShippingInfo = () => {
    return (
      <div className="card border px-3 py-2">
        <div className="row input-fields">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Warehouse Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="wareHouseNumber"
                placeholder="Warehouse Number"
                value={shippingInfoData.wareHouseNumber}
                onChange={handleShippingInfoTextChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Storage Location
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="storageLocation"
                placeholder="Storage Location"
                value={shippingInfoData.storageLocation}
                onChange={handleShippingInfoTextChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Shipping Method
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="shippingMethod"
                placeholder="Shipping Method"
                value={shippingInfoData.shippingMethod}
                onChange={handleShippingInfoTextChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Shipping Address
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="shippingAddress"
                placeholder="Shipping Address"
                value={shippingInfoData.shippingAddress}
                onChange={handleShippingInfoTextChange}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Alternate Shipping Address
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="alternateShippingAddress"
                placeholder="Shipping Address"
                value={shippingInfoData.alternateShippingAddress}
                onChange={handleShippingInfoTextChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const partsSelectionColumns = [
    {
      field: "partNumber",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partDescription",
      headerName: "Part Descritpion",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Requested Quantity",
      flex: 1,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      type: "singleSelect",
      valueOptions: ({ row }) => failedPartAnalysisOptions,
      valueFormatter: (params) => {
        const option = failedPartAnalysisOptions.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "dispose",
      headerName: "Dispose",
      flex: 1,
    },
    // {
    //   field: "partsCost",
    //   headerName: "Parts Cost",
    //   flex: 1,
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    // },
  ];

  const shipmentColumns = [
    {
      field: "partNumber",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partDescription",
      headerName: "Part Descritpion",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Requested Quantity",
      flex: 1,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      type: "singleSelect",
      valueOptions: ({ row }) => failedPartAnalysisOptions,
      valueFormatter: (params) => {
        const option = failedPartAnalysisOptions.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
    // {
    //   field: "partsCost",
    //   headerName: "Parts Cost",
    //   flex: 1,
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    // },
  ];

  // view parts selections details
  const viewPartsSelectionDetails = () => {
    return (
      <>
        <div className="row mb-1" style={{ justifyContent: "right" }}>
          <button className="btn btn-primary mx-3">+ Add</button>
        </div>
        <Box
          sx={{
            width: "100%",
            height: 400,
            // marginBottom: 8,
            // marginInline: 2,
          }}
        >
          <DataGrid
            rows={partSelectionData}
            columns={disposenNeed ? partsSelectionColumns : shipmentColumns}
            sx={GRID_STYLE}
            pageSizeOptions={[5, 10, 50, 100]}
            // disableRowSelectionOnClick
            getRowId={(row) => row.index}
          />
        </Box>
      </>
    );
  };

  // view shipment information
  const viewShipmentInformation = () => {
    return (
      <>
        <div className="card border px-3 py-2">
          <div className="row input-fields">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Return Number
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="returnNumber"
                  disabled
                  placeholder="Auto generated"
                  value={shipmentHeaderData.returnNumber}
                  onChange={handleShipmentHeaderTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Return Type
                </label>
                <Select
                  className="text-primary"
                  options={shipmentRetunTypeOptions}
                  onChange={(e) =>
                    handleShipmentHeaderSelectChange(e, `returnType`)
                  }
                  value={shipmentHeaderData.returnType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Shiped On
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      value={shipmentHeaderData.shippedOn}
                      onChange={(e) =>
                        handleShipmentHeaderSelectChange(e, "shippedOn")
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
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Tracking Number
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="trackingNumber"
                  placeholder="Tracking Number"
                  value={shipmentHeaderData.trackingNumber}
                  onChange={handleShipmentHeaderTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Sender Location
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="senderLocation"
                  placeholder="Sender Location"
                  value={shipmentHeaderData.senderLocation}
                  onChange={handleShipmentHeaderTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Receiver Location
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="returnNumber"
                  placeholder="Recevier Location"
                  value={shipmentHeaderData.receiverLocation}
                  onChange={handleShipmentHeaderTextChange}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Receiver Address
                </label>
                <textarea
                  className="form-control border-radius-10 text-primary"
                  name="receiverAddress"
                  value={shipmentHeaderData.receiverAddress}
                  cols="30"
                  rows="2"
                  placeholder="Receiver Address..."
                  onChange={handleShipmentHeaderTextChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <h5 style={{ fontWeight: "bold" }}>Shipment Items</h5>
          <div className="row" style={{ justifyContent: "right" }}>
            <button className="btn btn-primary mx-3">+ Add</button>
          </div>
        </div>
        <Box
          sx={{
            width: "100%",
            height: 400,
            // marginBottom: 8,
            // marginInline: 2,
          }}
        >
          <DataGrid
            rows={dummyRecords}
            columns={shipmentColumns}
            sx={GRID_STYLE}
            pageSizeOptions={[5, 10, 50, 100]}
            disableRowSelectionOnClick
            getRowId={(row) => row.index}
          />
        </Box>
      </>
    );
  };

  // view Return Received  info
  const viewReturnReceivedInfo = () => {
    return (
      <>
        <>
          <ReturnSearch
            number={shipmentHeaderData["returnNumber"]}
            setReturnRecivedData={setReturnRecivedData}
          />
          <div className="card border px-3 py-2">
            <div className="row input-fields">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Return Number
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="returnNumber"
                    disabled
                    placeholder="Return Number"
                    value={returnRecivedData.returnNumber}
                    //   onChange={handleEvaluatedByInputTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Return Type
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="returnType"
                    placeholder="Return Type"
                    value={"Intra Company"}
                    //   value={evaluatedByRecordObj.firstName}
                    //   onChange={handleEvaluatedByInputTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Shiped On
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        // maxDate={new Date()}
                        closeOnSelect
                        // value={claimRecord.fillDate}
                        // onChange={(e) => handleSelectChange(e, "fillDate")}
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
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="trackingNumber"
                    placeholder="Tracking Number"
                    value={"RTN-6883"}
                    //   value={evaluatedByRecordObj.firstName}
                    //   onChange={handleEvaluatedByInputTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Sender Location
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="senderLocation"
                    placeholder="Sender Location"
                    value={"Australia"}
                    //   value={evaluatedByRecordObj.firstName}
                    //   onChange={handleEvaluatedByInputTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Receiver Location
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    name="returnNumber"
                    placeholder="Recevier Location"
                    value={"Australia"}
                    //   value={evaluatedByRecordObj.firstName}
                    //   onChange={handleEvaluatedByInputTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Receiver Address
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="receiverAddress"
                    cols="30"
                    rows="2"
                    placeholder="Receiver Address..."
                    value={"20 Kullara Cl, Beresfield NSW 2322, Australia"}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <h5 style={{ fontWeight: "bold" }}>Shipment Items</h5>
          <Box
            sx={{
              width: "100%",
              height: 400,
              // marginBottom: 8,
              // marginInline: 2,
            }}
          >
            <DataGrid
              rows={dummyRecords}
              columns={partsSelectionColumns}
              sx={GRID_STYLE}
              pageSizeOptions={[5, 10, 50, 100]}
              disableRowSelectionOnClick
              getRowId={(row) => row.index}
            />
          </Box>
        </>
        {/* <Box sx={{ typography: "body1" }}>
          <TabContext value={returnReceivedTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                variant="fullWidth"
                aria-label="lab API tabs example"
                onChange={(e, value) => setReturnReceivedTabValue(value)}
              >
                <Tab label={`Return Requested`} value="returnRequested" />
                <Tab label={`Return Received`} value="returnReceived" />
              </TabList>
            </Box>
            <TabPanel value={"returnRequested"}>
              
            </TabPanel>
            <TabPanel value={"returnReceived"}></TabPanel>
          </TabContext>
        </Box> */}
      </>
    );
  };

  // save and Create New Claim Return Value
  const handleCreateReturnRequest = () => {
    const reqUrl = Warranty_Return_Create_POST;
    const reqObj = {
      ...returnData,
      reasonForReturnType: returnData.reasonForReturnType?.value || "EMPTY",
      region: returnData.region?.value || "",
      qecAssigned: returnData.qecAssigned?.value || "",
      requestType: returnData.requestType?.value || "EMPTY",
      claimTransactionType: returnData.claimTransactionType?.value || "EMPTY",
    };
    callPostApi(
      null,
      reqUrl,
      reqObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Warranty Return Created Successfully");
          setTabValue("partsSelection");
        } else {
          handleSnack("error", "Something went wrong.");
        }
      },
      (error) => {
        handleSnack("error", "Something went wrong.");
      }
    );
  };

  // save and Create Part Header
  const handleCreatePartHeader = () => {
    const rUrl = `${Warranty_Parts_Header_Create_POST}`;
    const rObj = { ...returnPartsHeaderData };
    callPostApi(
      null,
      rUrl,
      rObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Parts Header Created Successfully");
        } else {
          handleSnack("error", "Something went wrong");
        }
      },
      (error) => {
        handleSnack("error", "Something went wrong");
      }
    );
  };

  // save and Create Shipping Info
  const handleSaveShippingInfo = () => {
    const rUrl = `${Warranty_Shipping_Info_Create_POST}`;
    const reqObj = {
      ...shippingInfoData,
    };
    callPostApi(
      null,
      rUrl,
      reqObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Shipping Info Saved Successfully");
        } else {
          handleSnack("error", "Something went wrong");
        }
      },
      (error) => {
        handleSnack("error", "Something went wrong");
      }
    );
  };

  // save the Shipment Header Details
  const handleSaveShippmentDetails = () => {
    const rUrl = `${Warranty_Shipment_Header_Create_POST}`;
    const reqObj = {
      ...shipmentHeaderData,
      returnType: shipmentHeaderData.returnType?.value || "EMPTY",
      disposeType: "RECEIVED",
    };
    const shipmentNumber = Math.floor(Math.random() * 9000) + 1000;
    handleSnack(
      "success",
      `Shipment with return number ${shipmentNumber} Created Successfully.`
    );
    setShipmentHeaderData({
      ...shipmentHeaderData,
      returnNumber: "RM-" + shipmentNumber,
      disposeType: "RECEIVED",
    });
    // setReturnRecivedData({
    //   ...returnRecivedData,
    //   returnNumber: "RM-" + shipmentNumber,
    // })

    setTabValue("returnRecived");
    // callPostApi(
    //   null,
    //   rUrl,
    //   reqObj,
    //   (response) => {
    //     if (response.status === API_SUCCESS) {
    //       const shipmentNumber = Math.floor(Math.random() * 9000) + 1000;
    //       handleSnack(
    //         "success",
    //         `Shipment with return number ${shipmentNumber} Created Successfully.`
    //       );
    //       setShipmentHeaderData({
    //         ...shipmentHeaderData,
    //         returnNumber: "RM-" + shipmentNumber,
    //         disposeType: "RECEIVED",
    //       });
    //       setTabValue("shipment");
    //     } else {
    //       handleSnack("error", "Something went wrong");
    //     }
    //   },
    //   (error) => {
    //     handleSnack("error", "Something went wrong");
    //   }
    // );
  };

  // create parts header and shippping info
  const handleCreatePartsAndShiipingInfo = () => {
    // handleCreatePartHeader();
    // handleSaveShippmentDetails();
    setTabValue("shipment");
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                aria-label="lab API tabs example"
                onChange={(e, value) => setTabValue(value)}
              >
                <Tab label={`Return Request`} value="overview" />
                <Tab label={`Parts Selection`} value="partsSelection" />
                <Tab label={`Shipment`} value="shipment" />
                <Tab label={`Return Received`} value="returnRecived" />
                <Tab label={`Corrective Action`} value="correctiveAction" />
              </TabList>
            </Box>
            <TabPanel value={"overview"}>{viewOverviewTabData()}</TabPanel>
            <TabPanel value={"partsSelection"}>
              <h5 style={{ fontWeight: "bold" }}>Parts Selection Critria</h5>
              {viewPartsSelectioncritria()}
              <h5 style={{ fontWeight: "bold" }}>Shipping Details</h5>
              {viewShippingInfo()}
              {viewPartsSelectionDetails()}
              <div
                className="row mt-2 mb-2"
                style={{ justifyContent: "right" }}
              >
                <button
                  className="btn btn-primary mx-3"
                  onClick={handleCreatePartsAndShiipingInfo}
                >
                  Save & Next
                </button>
              </div>
            </TabPanel>
            <TabPanel value={"shipment"}>
              {viewShipmentInformation()}
              <div
                className="row mt-2 mb-2"
                style={{ justifyContent: "right" }}
              >
                <button
                  className="btn btn-primary mx-3"
                  onClick={handleSaveShippmentDetails}
                >
                  Create Shipment
                </button>
              </div>
            </TabPanel>
            <TabPanel value={"returnRecived"}>
              {viewReturnReceivedInfo()}
            </TabPanel>
            <TabPanel value={"correctiveAction"}>
              <>
                <ReturnSearch number={shipmentHeaderData["returnNumber"]} />
                <div className="card border px-3 py-2">
                  <div className="row input-fields">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Return Reason
                        </label>
                        <Select
                          className="text-primary"
                          options={reasonOptions}
                          //   onChange={(e) => handleSelectChange(e, `question1`)}
                          //   value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Part Number
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="partNumber"
                          placeholder="Part Number"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Part Group
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="partGroup"
                          placeholder="Part Group"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Part Sub Group
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="partSubGroup"
                          placeholder="Part Sub Group"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Warranty Claim Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="warrantyCliatNumber"
                          placeholder="Warranty Claim Number"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Fail Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              // value={claimRecord.fillDate}
                              // onChange={(e) => handleSelectChange(e, "fillDate")}
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
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Source
                        </label>
                        <textarea
                          className="form-control border-radius-10 text-primary"
                          name="source"
                          cols="30"
                          rows="2"
                          placeholder="Source..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Warranty Diagnosis Notes
                        </label>
                        <Select
                          className="text-primary"
                          options={warrantyDiagnosisOptions}
                          //   onChange={(e) => handleSelectChange(e, `question1`)}
                          //   value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Potential Failure Mode
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="potentialFailureMode"
                          placeholder="Potential Failure Mode"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Service Code
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="serviceCode"
                          placeholder="Service Code"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Potential Effects of Failure
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="potentialEffectsOfFailure"
                          placeholder="Potential Effects of Failure"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Severity
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="severity"
                          placeholder="Severity"
                          min={1}
                          max={10}
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Cause
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="cause"
                          placeholder="Cause"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Potential Cause(s) of Failure
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="potentialCauseOfFailure"
                          placeholder="Potential Cause(s) of Failure"
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Occurrence
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="occurrence"
                          placeholder="occurrence"
                          min={1}
                          max={10}
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Actions to Take
                        </label>
                        <textarea
                          className="form-control border-radius-10 text-primary"
                          name="actionsToTake"
                          cols="30"
                          rows="2"
                          placeholder="Actions to Take..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Creation Date / Update Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              // value={claimRecord.fillDate}
                              // onChange={(e) => handleSelectChange(e, "fillDate")}
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
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created by / Reviewed by
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="createdBy"
                          placeholder="Created by / Reviewed by "
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Revised Severity
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="revisedSeverity"
                          placeholder="Revised Severity"
                          min={1}
                          max={10}
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Revised Occurrence
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="revisedOccurrence"
                          placeholder="Revised Occurrence"
                          min={1}
                          max={10}
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Revised Detection
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          name="revisedDetection"
                          placeholder="Revised Detection"
                          min={1}
                          max={10}
                          //   value={evaluatedByRecordObj.firstName}
                          //   onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnRequester;
