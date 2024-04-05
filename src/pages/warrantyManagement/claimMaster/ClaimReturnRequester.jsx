import React, { useCallback, useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";

import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import Select from "react-select";
import $ from "jquery";
import { Tooltip } from "@mui/material";

import {
  partsAnalysisOption,
  partsReturnHeaderObj,
  partsReturnShippingObj,
  partsShipmentObj,
  reasonForReturns,
  requestTypeOptions,
  returnRequestObj,
  rmaResonOptions,
  rmaTypeOptions,
  shipmentRetunTypeOptions,
  transactionTypeOptions,
} from "../warrantyManagementConstants";
import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  SPAREPART_SEARCH_Q_OPTIONS,
} from "pages/Common/constants";
import {
  PARTS_HEADER_MASTER_URL,
  RELATED_PARTS_MASTER_URL,
  SHIPMENT_HEADER_MASTER_URL,
  SHIPMENT_PARTS_MASTER_URL,
  SHIPPING_INFO_MASTER_URL,
  WARRANTY_RETURN_MASTER_URL,
  Warranty_Return_Create_POST,
} from "services/CONSTANTS";
import {
  callDeleteApi,
  callGetApi,
  callPostApi,
  callPutApi,
} from "services/ApiCaller";
import { sparePartSearch } from "services/searchServices";
import { API_SUCCESS } from "services/ResponseCode";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import SearchComponent from "pages/components/SearchComponent";
import SearchPartListModal from "./SearchPartListModal";

const qecAssignedOptions = [
  { label: "Perth", value: "PERTH" },
  { label: "Sydney", value: "SYDNEY" },
];

const data = [
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

const shippmentReportData = [
  {
    index: Math.floor(Math.random() * 90000) + 10000,
    returnNumber: "RN00237",
    returnType: "Intra company",
    rmaNumber: "812374582",
    trackingNumber: "TN7458263",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    returnNumber: "RN00259",
    returnType: "Intra company",
    rmaNumber: "812374592",
    trackingNumber: "TN7458233",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 900) + 10000,
    returnNumber: "RN00291",
    returnType: "Intra company",
    rmaNumber: "812374522",
    trackingNumber: "TN7458213",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 90) + 10000,
    returnNumber: "RN00242",
    returnType: "Intra company",
    rmaNumber: "812374572",
    trackingNumber: "TN7458203",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 900) + 1000,
    returnNumber: "RN00834",
    returnType: "Intra company",
    rmaNumber: "812374882",
    trackingNumber: "TN7458963",
    shipedOn: "11/02/2024",
  },
];

const ClaimReturnRequester = ({
  show,
  hideModal,
  handleSnack,
  countryOptions = [],
  partsRecords = [],
  disposenNeed = true,
  shipmentHeaderId,
  setShipmentHeaderId,
  // warrantyReturnId,
  // setWarrantyReturnId,
  requestCreation = true,
  setRequestCreation = null,
  shipmentReportRecords = [],
}) => {
  const [tabValue, setTabValue] = useState("overview");
  const [returnData, setReturnData] = useState({ ...returnRequestObj });

  const [viewOnlyTab, setViewOnlyTab] = useState({
    returnReqViewOnly: false,
    partsViewOnly: false,
    shipmentViewOnly: false,
    reportViewOnly: false,
  });

  const [partsHeaderData, setPartsHeaderData] = useState({
    ...partsReturnHeaderObj,
  });
  const [shippingData, setShippingData] = useState({
    ...partsReturnShippingObj,
  });
  const [shipmentData, setShipmentData] = useState({
    ...partsShipmentObj,
  });

  const [partsSearchSelector, setPartsSearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
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
  const [partsRecordData, setPartsRecordData] = useState([]);
  const [partsRowModesModel, setPartsRowModesModel] = useState({});
  const [isShipmentSearch, setIsShipmentSearch] = useState(false);
  const [shipmentTableData, setShipmentTableData] = useState([]);

  const [partsHeaderId, setPartsHeaderId] = useState(null);
  const [shippingInfoId, setShippingInfoId] = useState(null);
  const [warrantyReturnId, setWarrantyReturnId] = useState(null);
  
  // const [shipmentHeaderId, setShipmentHeaderId] = useState(null);

  const [shipmentRowModesModal, setShipmentRowModesModal] = useState({});

  useEffect(() => {
    if (!requestCreation && shipmentHeaderId) {
      const rUrl = `${SHIPMENT_HEADER_MASTER_URL}/${shipmentHeaderId}`;
      // const rUrl = `${WARRANTY_RETURN_MASTER_URL}/${warrantyReturnId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          // setShipmentHeaderId(responseData.shipmentHeaderId);
          if (responseData.warrantyReturnId) {
            getWarrantyReturnDetails(responseData.warrantyReturnId);
          }

          setViewOnlyTab({
            returnReqViewOnly: true,
            partsViewOnly: true,
            shipmentViewOnly: true,
            reportViewOnly: false,
          });

          // return type value set
          const _returnType = shipmentRetunTypeOptions.find(
            (obj) => obj.value === responseData.returnType
          );

          // rma type value set
          const _rmaType = rmaTypeOptions.find(
            (obj) => obj.value === responseData.rmaType
          );

          // rma type value set
          const _rmaReason = rmaResonOptions.find(
            (obj) => obj.value === responseData.rmaReason
          );
          setShipmentData({
            ...responseData,
            returnType: _returnType || "",
            rmaType: _rmaType || "",
            rmaReason: _rmaReason || "",
          });
          shipmentHeaderId(responseData.shipmentHeaderId);

          // // set  return type
          // const _reasonForReturnType = reasonForReturns.find(
          //   (obj) => obj.value === responseData.reasonForReturnType
          // );

          // // set region
          // const _region = countryOptions.find(
          //   (obj) => obj.value === responseData.region
          // );

          // // set QEC assigned
          // const _qecAssigned = qecAssignedOptions.find(
          //   (obj) => obj.value === responseData.qecAssigned
          // );

          // // set request type
          // const _requestType = requestTypeOptions.find(
          //   (obj) => obj.value === responseData.requestType
          // );

          // // set Claim Transaction type
          // const _claimTransactionType = transactionTypeOptions.find(
          //   (obj) => obj.value === responseData.claimTransactionType
          // );

          // setReturnData({
          //   ...responseData,
          //   reasonForReturnType: _reasonForReturnType || "",
          //   region: _region || "",
          //   qecAssigned: _qecAssigned || "",
          //   requestType: _requestType || "",
          //   claimTransactionType: _claimTransactionType || "",
          // });

          // if (responseData.shippingInfoModel) {
          //   const { shippingInfoModel } = responseData;
          //   setShippingData(shippingInfoModel);
          //   setShippingInfoId(shippingInfoModel.shippingInfoId);
          // }

          // if (responseData.shipmentHeaderModel) {
          //   const { shipmentHeaderModel } = responseData;

          //   // return type value set
          //   const _returnType = shipmentRetunTypeOptions.find(
          //     (obj) => obj.value === shipmentHeaderModel.returnType
          //   );

          //   // rma type value set
          //   const _rmaType = rmaTypeOptions.find(
          //     (obj) => obj.value === shipmentHeaderModel.rmaType
          //   );

          //   // rma type value set
          //   const _rmaReason = rmaResonOptions.find(
          //     (obj) => obj.value === shipmentHeaderModel.rmaReason
          //   );
          //   setShipmentData({
          //     ...shipmentHeaderModel,
          //     returnType: _returnType || "",
          //     rmaType: _rmaType || "",
          //     rmaReason: _rmaReason || "",
          //   });
          //   shipmentHeaderId(shipmentHeaderModel.shipmentHeaderId);
          // }
        }
      });
    }
  }, [warrantyReturnId, requestCreation]);

  // get warranty return details
  const getWarrantyReturnDetails = (warrantyReturnId) => {
    const rUrl = `${WARRANTY_RETURN_MASTER_URL}/${warrantyReturnId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;

        // set  return type
        const _reasonForReturnType = reasonForReturns.find(
          (obj) => obj.value === responseData.reasonForReturnType
        );

        // set region
        const _region = countryOptions.find(
          (obj) => obj.value === responseData.region
        );

        // set QEC assigned
        const _qecAssigned = qecAssignedOptions.find(
          (obj) => obj.value === responseData.qecAssigned
        );

        // set request type
        const _requestType = requestTypeOptions.find(
          (obj) => obj.value === responseData.requestType
        );

        // set Claim Transaction type
        const _claimTransactionType = transactionTypeOptions.find(
          (obj) => obj.value === responseData.claimTransactionType
        );

        if (responseData.partsHeaderId) {
          getPartsHeaderDetails(responseData.partsHeaderId);
        }

        if (responseData.shippingInfoId) {
          getShippinInfoDetails(responseData.shippingInfoId);
        }

        setReturnData({
          ...responseData,
          reasonForReturnType: _reasonForReturnType || "",
          region: _region || "",
          qecAssigned: _qecAssigned || "",
          requestType: _requestType || "",
          claimTransactionType: _claimTransactionType || "",
        });
      }
    });
  };

  // get parts header details
  const getPartsHeaderDetails = (partsHeaderId) => {
    const rUrl = `${PARTS_HEADER_MASTER_URL}/${partsHeaderId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setPartsHeaderData({ ...responseData });
      }
    });
  };

  // get shipping info details
  const getShippinInfoDetails = (shippingInfoId) => {
    const rUrl = `${SHIPPING_INFO_MASTER_URL}/${shippingInfoId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setShippingData({ ...responseData });
      }
    });
  };

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
    if (viewOnlyTab.returnReqViewOnly) {
      return;
    }
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
  const handlePartsInputChange = (e) => {
    const { name, value } = e.target;
    setPartsHeaderData({ ...partsHeaderData, [name]: value });
  };

  //  parts header Select and Date Value Change
  const handlePartsSelectChange = (e, keyName) => {
    setPartsHeaderData({ ...partsHeaderData, [keyName]: e });
  };

  // change Part header checkbox check-uncheck
  const handelePartCheckboxCheck = (e) => {
    if (viewOnlyTab.partsViewOnly) {
      return;
    }
    const { name, checked } = e.target;
    setPartsHeaderData({ ...partsHeaderData, [name]: checked });
  };

  // shipping info input text change
  const handleShippingTextChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  // shipment header text change
  const handleShipmentextChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({ ...shipmentData, [name]: value });
  };

  // shipment select & date change
  const handleShipmentSelectChange = (e, keyName) => {
    setShipmentData({ ...shipmentData, [keyName]: e });
  };

  // save and Create New Claim Return Value
  const handleCreateReturnRequest = () => {
    if (viewOnlyTab.returnReqViewOnly) {
      setTabValue("partsSelection");
    } else {
      const reqUrl = Warranty_Return_Create_POST;
      const reqObj = {
        ...returnData,
        reasonForReturnType: returnData.reasonForReturnType?.value || "EMPTY",
        region: returnData.region?.value || "",
        qecAssigned: returnData.qecAssigned?.value || "",
        requestType: returnData.requestType?.value || "EMPTY",
        claimTransactionType: returnData.claimTransactionType?.value || "EMPTY",
      };
      if (warrantyReturnId) {
        callPutApi(
          null,
          `${reqUrl}/${warrantyReturnId}`,
          reqObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("success", "Warranty Return Updated Successfully");
              setViewOnlyTab({ ...viewOnlyTab, returnReqViewOnly: true });
              setTabValue("partsSelection");
            } else {
              handleSnack("error", "Something went wrong.");
            }
          },
          (error) => {
            handleSnack("error", "Something went wrong.");
          }
        );
      } else {
        callPostApi(
          null,
          reqUrl,
          reqObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              const responseData = response.data;
              handleSnack("success", "Warranty Return Created Successfully");
              setWarrantyReturnId(responseData.warrantyReturnId);
              setViewOnlyTab({ ...viewOnlyTab, returnReqViewOnly: true });
              setTabValue("partsSelection");
            } else {
              handleSnack("error", "Something went wrong.");
            }
          },
          (error) => {
            handleSnack("error", "Something went wrong.");
          }
        );
      }
    }
  };

  // create parts header and shippping info
  const handleAddUpdatePartsAndShipingInfo = () => {
    handleAddUpdatePartHeader();
    // handleAddUpdateShippingInfo();
  };

  // add update parts header
  const handleAddUpdatePartHeader = () => {
    if (viewOnlyTab.partsViewOnly) {
      setTabValue("shipment");
    } else {
      const rUrl = PARTS_HEADER_MASTER_URL;
      const rObj = {
        ...partsHeaderData,
        warrantyReturnEntityId: warrantyReturnId,
      };
      if (partsHeaderId) {
        callPutApi(null, `${rUrl}/${partsHeaderId}`, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleAddUpdateShippingInfo();
          }
        });
      } else {
        callPostApi(null, `${rUrl}`, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            setPartsHeaderId(responseData.partsHeaderId);
            handleAddUpdateShippingInfo();
          }
        });
      }
    }
  };

  // add update shipping info
  const handleAddUpdateShippingInfo = () => {
    const rUrl = SHIPPING_INFO_MASTER_URL;
    const rObj = {
      ...shippingData,
      warrantyReturnEntityId: warrantyReturnId,
    };
    if (shippingInfoId) {
      callPutApi(null, `${rUrl}/${shippingInfoId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleSnack(
            "success",
            "Parts header & Shipping info updated Successfully."
          );
          setViewOnlyTab({ ...viewOnlyTab, partsViewOnly: true });
          setTabValue("shipment");
        } else {
          handleSnack("info", "Something went wrong.");
        }
      });
    } else {
      callPostApi(null, `${rUrl}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setShippingInfoId(responseData.shippingInfoId);
          handleSnack(
            "success",
            "Parts header & Shipping info Created Successfully."
          );
          setViewOnlyTab({ ...viewOnlyTab, partsViewOnly: true });
          setTabValue("shipment");
        } else {
          handleSnack("info", "Something went wrong.");
        }
      });
    }
  };

  // go to the shipemnt report tab from shippment tab
  const handleAddUpdateShipmentDetails = () => {
    if (viewOnlyTab.shipmentViewOnly) {
      setTabValue("shipmentReport");
    } else {
      const rUrl = SHIPMENT_HEADER_MASTER_URL;
      const _shipmentParts = shipmentTableData.map((row) => row.shipmentPartId);
      const rObj = {
        ...shipmentData,
        warrantyReturnId: warrantyReturnId,
        returnType: shipmentData.returnType?.value || "INTRA_COMPANY",
        rmaType: shipmentData.rmaType?.value || "STANDARD",
        rmaReason: shipmentData.rmaReason?.value || "",
        shipmentParts: [...shipmentData["shipmentParts"], ..._shipmentParts],
      };
      if (shipmentHeaderId) {
        callPutApi(null, `${rUrl}/${shipmentHeaderId}`, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            handleSnack("success", "Shipment Details Updated successfully.");
            setViewOnlyTab({ ...viewOnlyTab, shipmentViewOnly: true });
            setTabValue("shipmentReport");
          } else {
            handleSnack("info", "Something went wrong.");
          }
        });
      } else {
        callPostApi(null, `${rUrl}`, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleSnack("success", "Shipment Details Created successfully.");
            setViewOnlyTab({ ...viewOnlyTab, shipmentViewOnly: true });
            setShipmentHeaderId(responseData.shipmentHeaderId);
            setTabValue("shipmentReport");
          } else {
            handleSnack("info", "Something went wrong.");
          }
        });
      }
    }
  };

  // view Overview tab form
  const viewOverviewTabData = () => {
    return (
      <>
        <div className="row mx-2 mb-2" style={{ justifyContent: "right" }}>
          <button
            className="btn btn-primary"
            onClick={() =>
              setViewOnlyTab({ ...viewOnlyTab, returnReqViewOnly: false })
            }
          >
            Edit
          </button>
        </div>
        {!viewOnlyTab.returnReqViewOnly ? (
          <>
            <div className="card border px-3 py-2 mb-3">
              <div className="row input-fields mt-2">
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      REASON FOR RETURN
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      REGION
                    </label>
                    <Select
                      className="text-primary"
                      options={countryOptions}
                      onChange={(e) => handleReturnSelectChange(e, `region`)}
                      value={returnData.region}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      QEC ASSIGNED
                    </label>
                    <Select
                      className="text-primary"
                      options={qecAssignedOptions}
                      onChange={(e) =>
                        handleReturnSelectChange(e, `qecAssigned`)
                      }
                      value={returnData.qecAssigned}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      ASSIGN SPECIALIST
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      REQUEST TITLE
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      GEOGRAPHICAL GROUP
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TYPE OF REQUEST
                    </label>
                    <Select
                      className="text-primary"
                      options={requestTypeOptions}
                      onChange={(e) =>
                        handleReturnSelectChange(e, `requestType`)
                      }
                      value={returnData.requestType}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CLAIM TRANSACTION TYPE
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
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card border px-3 py-2 mb-3">
              <div className="row input-fields mt-2">
                <ReadOnlyField
                  label="REASON FOR RETURN"
                  value={returnData.reasonForReturnType?.label}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="REGION"
                  value={returnData.region?.label}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="QEC ASSIGNED"
                  value={returnData.qecAssigned?.label}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="ASSIGN SPECIALIST"
                  value={returnData.assignSpecialist}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="REQUEST TITLE"
                  value={returnData.requestTitle}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="GEOGRAPHICAL GROUP"
                  value={returnData.geographicalGroup}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="TYPE OF REQUEST"
                  value={returnData.requestType?.label}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CLAIM TRANSACTION TYPE"
                  value={returnData.claimTransactionType?.label}
                  className="col-md-3 col-sm-3"
                />
              </div>
            </div>
          </>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={returnData.endRequester}
              onChange={handleEndCustomerCheckBox}
            />
          }
          label="ARE YOU THE END REQUESTOR?"
        />
        {!viewOnlyTab.returnReqViewOnly ? (
          <div className="card border px-3 py-2 mb-0 mt-0">
            <div className="row input-fields">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    REQUESTOR NAME
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    BUSINESS UNIT
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    EMAIL
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
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
        ) : (
          <div className="card border px-3 py-2 mb-3">
            <div className="row input-fields mt-2">
              <ReadOnlyField
                label="REQUESTOR NAME"
                value={returnData.requesterName}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="BUSINESS UNIT"
                value={returnData.requesterBU}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="EMAIL"
                value={returnData.requesterEmail}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="PHONE NUMBER"
                value={returnData.requesterPhone}
                className="col-md-6 col-sm-6"
              />
            </div>
          </div>
        )}
        <div className="d-flex justify-content-end mt-2 mb-2">
          <button className="btn btn-primary mx-3" onClick={hideModal}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={handleCreateReturnRequest}
          >
            {!viewOnlyTab.returnReqViewOnly && "Save & "}Next
          </button>
        </div>
      </>
    );
  };

  // Part Selection tab data view

  const columnsWithDisp = [
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
      valueOptions: ({ row }) => partsAnalysisOption,
      valueFormatter: (params) => {
        const option = partsAnalysisOption.find(
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
  ];

  const columnsWithoutDisp = [
    {
      field: "serialNo",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "description",
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        const isInEditMode =
          partsRowModesModel[row.relatedPartsId]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Save">
                  <SaveIcon />
                </Tooltip>
              }
              label="Save"
              onClick={handlePartsSaveClick(row.relatedPartsId)}
            />,
            <GridActionsCellItem
              icon={
                <Tooltip title="Cancel">
                  <CancelIcon />
                </Tooltip>
              }
              label="Cancel"
              className="textPrimary"
              onClick={handlePartsCancelClick(row.relatedPartsId)}
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
            onClick={handlePartsRowEditClick(row.relatedPartsId)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handlePartsDeleteClick(row.relatedPartsId)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handlePartsRowEditStart = (params, event) => {
    console.log(params);
    event.defaultMuiPrevented = true;
  };

  const handlePartsRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handlePartsRowEditClick = (relatedPartsId) => () => {
    setPartsRowModesModel({
      ...partsRowModesModel,
      [relatedPartsId]: { mode: GridRowModes.Edit },
    });
  };

  const handlePartsSaveClick = (relatedPartsId) => () => {
    setPartsRowModesModel({
      ...partsRowModesModel,
      [relatedPartsId]: { mode: GridRowModes.View },
    });
  };

  const handlePartsDeleteClick = (relatedPartsId) => () => {
    callDeleteApi(
      null,
      `${RELATED_PARTS_MASTER_URL}/${relatedPartsId}`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setPartsRecordData(
            partsRecordData.filter(
              (row) => row.relatedPartsId !== relatedPartsId
            )
          );
        }
      }
    );
  };

  const handlePartsCancelClick = (relatedPartsId) => () => {
    setPartsRowModesModel({
      ...partsRowModesModel,
      [relatedPartsId]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = partsRecordData.find(
      (row) => row.relatedPartsId === relatedPartsId
    );
    if (editedRow.isNew) {
      setPartsRecordData(
        partsRecordData.filter((row) => row.relatedPartsId !== relatedPartsId)
      );
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setPartsRowModesModel(newRowModesModel);
  };

  const processPartsRowUpdate = useCallback(
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
              setPartsRecordData(
                partsRecordData.map((row) =>
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
    [partsRecordData]
  );

  // view PartsSelection Creitria
  const viewPartsSelectioncritria = () => {
    return (
      <div className="card border px-3 py-2">
        {!viewOnlyTab.partsViewOnly ? (
          <div className="row input-fields mt-2">
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MAX QUANTITY REQUESTED
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="maxQuantityRequested"
                  placeholder="Max Quantity Requested"
                  value={partsHeaderData.maxQuantityRequested}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIM NUMBER
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="claimNumber"
                  placeholder="Claim Number"
                  value={partsHeaderData.claimNumber}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIM DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      value={partsHeaderData.claimDate}
                      onChange={(e) => handlePartsSelectChange(e, "claimDate")}
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
                  REPAIR DATE FROM
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      value={partsHeaderData.repairDateFrom}
                      onChange={(e) =>
                        handlePartsSelectChange(e, "repairDateFrom")
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
                  REPAIR DATE TO
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      value={partsHeaderData.repairDateTo}
                      onChange={(e) =>
                        handlePartsSelectChange(e, "repairDateTo")
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
                  FAILURE CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="failureCode"
                  placeholder="Failure Code"
                  value={partsHeaderData.failureCode}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MESSAGE CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="messageCode"
                  placeholder="Message Code"
                  value={partsHeaderData.messageCode}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  GTIN/BEC CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="gtinBCECode"
                  placeholder="GTIN/BEC Code"
                  value={partsHeaderData.gtinBCECode}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART COST RANGE
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="partCostRange"
                  placeholder="Part Cost Range"
                  value={partsHeaderData.partCostRange}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SMU UNIT
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="smuUnit"
                  placeholder="SMU Unit"
                  value={partsHeaderData.smuUnit}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SMU FROM TO SMU TO
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="smuFromToSmuTo"
                  placeholder="SMU From to SMU To"
                  value={partsHeaderData.smuFromToSmuTo}
                  onChange={handlePartsInputChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-2">
            <ReadOnlyField
              label="MAX QUANTITY REQUESTED"
              value={partsHeaderData.maxQuantityRequested}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="CLAIM NUMBER"
              value={partsHeaderData.claimNumber}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="CLAIM DATE"
              value={
                <Moment format="DD/MM/YYYY">{partsHeaderData.claimDate}</Moment>
              }
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="REPAIR DATE FROM"
              value={
                <Moment format="DD/MM/YYYY">
                  {partsHeaderData.repairDateFrom}
                </Moment>
              }
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="REPAIR DATE TO"
              value={
                <Moment format="DD/MM/YYYY">
                  {partsHeaderData.repairDateFrom}
                </Moment>
              }
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="FAILURE CODE"
              value={partsHeaderData.failureCode}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="MESSAGE CODE"
              value={partsHeaderData.messageCode}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="GTIN/BEC CODE"
              value={partsHeaderData.gtinBCECode}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="PART COST RANGE"
              value={partsHeaderData.partCostRange}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="SMU UNIT"
              value={partsHeaderData.smuUnit}
              className="col-md-3 col-sm-3"
            />
            <ReadOnlyField
              label="SMU FROM TO SMU TO"
              value={partsHeaderData.smuFromToSmuTo}
              className="col-md-3 col-sm-3"
            />
          </div>
        )}
        <div className="row input-fields mt-2">
          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="form-group align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={partsHeaderData.failurePartOnly}
                    name="failurePartOnly"
                    onChange={handelePartCheckboxCheck}
                  />
                }
                label="FAILURE PART ONLY"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-12">
            <div className="form-group align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={partsHeaderData.casualPartOnly}
                    name="casualPartOnly"
                    onChange={handelePartCheckboxCheck}
                  />
                }
                label="CAUSAL PART ONLY"
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
        {!viewOnlyTab.partsViewOnly ? (
          <div className="row input-fields mt-2">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  WAREHOUSE NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="wareHouseNumber"
                  placeholder="Warehouse Number"
                  value={shippingData.wareHouseNumber}
                  onChange={handleShippingTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  STORAGE LOCATION
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="storageLocation"
                  placeholder="Storage Location"
                  value={shippingData.storageLocation}
                  onChange={handleShippingTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SHIPPING METHOD
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="shippingMethod"
                  placeholder="Shipping Method"
                  value={shippingData.shippingMethod}
                  onChange={handleShippingTextChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SHIPPING ADDRESS
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  value={shippingData.shippingAddress}
                  onChange={handleShippingTextChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  ALTERNATE SHIPPING ADDRESS
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="alternateShippingAddress"
                  placeholder="Shipping Address"
                  value={shippingData.alternateShippingAddress}
                  onChange={handleShippingTextChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-2">
            <ReadOnlyField
              label="WAREHOUSE NUMBER"
              value={shippingData.wareHouseNumber}
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="STORAGE LOCATION"
              value={shippingData.storageLocation}
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="SHIPPING METHOD"
              value={shippingData.shippingMethod}
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="SHIPPING ADDRESS"
              value={shippingData.shippingAddress}
              className="col-md-6 col-sm-6"
            />
            <ReadOnlyField
              label="ALTERNATE SHIPPING ADDRESS"
              value={shippingData.alternateShippingAddress}
              className="col-md-6 col-sm-6"
            />
          </div>
        )}
      </div>
    );
  };

  // Consumable Search
  const handlePartsSearchClick = async (type, shipmentSearch = false) => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    const tempSearchSelector = shipmentSearch
      ? [...shipmentSearchSelector]
      : [...partsSearchSelector];
    tempSearchSelector.map(function (item, i) {
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
        setIsShipmentSearch(shipmentSearch);
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

  // view parts selections details
  const viewPartsDataTable = () => {
    return (
      <>
        <div className="card border px-2 py-2 mb-2">
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
                  querySearchSelector={partsSearchSelector}
                  setQuerySearchSelector={setPartsSearchSelector}
                  // clearFilteredData={clearFilteredData}
                  handleSnack={handleSnack}
                  searchAPI={sparePartSearch}
                  searchClick={handlePartsSearchClick}
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
            // rows={partsRecords}
            rows={partsRecordData}
            autoHeight
            columns={disposenNeed ? columnsWithDisp : columnsWithoutDisp}
            editMode="row"
            rowModesModel={partsRowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handlePartsRowEditStart}
            onRowEditStop={handlePartsRowEditStop}
            experimentalFeatures={{ newEditingApi: true }}
            onProcessRowUpdateError={(error) => console.log(error)}
            processRowUpdate={processPartsRowUpdate}
            pageSizeOptions={[5, 10, 50, 100]}
          />
        </div>
      </>
    );
  };

  //part selection tab data
  const viewPartSelectionTabData = () => {
    return (
      <>
        <div className="row d-flex justify-content-between align-items-center mx-2 mb-2 mt-0">
          <h5 style={{ fontWeight: "bold" }}>Parts Selection Critria</h5>
          <button
            className="btn btn-primary"
            onClick={() =>
              setViewOnlyTab({ ...viewOnlyTab, partsViewOnly: false })
            }
          >
            Edit
          </button>
        </div>
        {viewPartsSelectioncritria()}
        <h5 style={{ fontWeight: "bold" }}>Shipping Details</h5>
        {viewShippingInfo()}
        {viewPartsDataTable()}
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            className="btn btn-primary mx-3"
            onClick={handleAddUpdatePartsAndShipingInfo}
          >
            {!viewOnlyTab.partsViewOnly && "Save & "} Next
          </button>
        </div>
      </>
    );
  };

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

  // view shipment information
  const viewShipmentTabData = () => {
    return (
      <>
        <div className="row mx-2 mb-2" style={{ justifyContent: "right" }}>
          <button
            className="btn btn-primary mt-0"
            onClick={() =>
              setViewOnlyTab({ ...viewOnlyTab, shipmentViewOnly: false })
            }
          >
            Edit
          </button>
        </div>
        <div className="card border px-3 py-2">
          {!viewOnlyTab.shipmentViewOnly ? (
            <div className="row input-fields">
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
                    placeholder="Auto generated"
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
                    type="number"
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
                    SENDER LOCATION
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
                    name="returnNumber"
                    placeholder="Recevier Location"
                    value={shipmentData.receiverLocation}
                    onChange={handleShipmentextChange}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RECEIVER ADDRESS
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="receiverAddress"
                    value={shipmentData.receiverAddress}
                    cols="30"
                    rows="2"
                    placeholder="Receiver Address..."
                    onChange={handleShipmentextChange}
                  ></textarea>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mt-2">
              <ReadOnlyField
                label="RETURN NUMBER"
                value={shipmentData.returnNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RETURN TYPE"
                value={shipmentData.returnType?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RMA TYPE"
                value={shipmentData.rmaType?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RMA REASON"
                value={shipmentData.rmaReason?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RMA NUMBER"
                value={shipmentData.rmaNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="SHIPED ON"
                value={
                  <Moment format="DD/MM/YYYY">{shipmentData.shippedOn}</Moment>
                }
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="TRACKING NUMBER"
                value={shipmentData.trackingNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="SENDER LOCATION"
                value={shipmentData.senderLocation}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RECEIVER LOCATION"
                value={shipmentData.receiverLocation}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RECEIVER ADDRESS"
                value={shipmentData.receiverAddress}
                className="col-md-12 col-sm-12"
              />
            </div>
          )}
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
                    <span>Shipment Items Table</span>
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
        </div>
        <div className="row mt-2 mb-2" style={{ justifyContent: "right" }}>
          <button
            className="btn btn-primary mx-3"
            onClick={handleAddUpdateShipmentDetails}
          >
            {!viewOnlyTab.shipmentViewOnly && "Save & "}Next
          </button>
        </div>
      </>
    );
  };

  // Shipment Report Tabs content
  const shipmentReportcolumns = [
    {
      field: "returnNumber",
      headerName: "Return Number",
      flex: 1,
      renderCell: ({ row }) => <>{row.shipmentHeaderModel?.returnNumber}</>,
    },
    {
      field: "returnType",
      headerName: "Return Type",
      flex: 1,
      renderCell: ({ row }) => <>{row.shipmentHeaderModel?.returnType}</>,
    },
    {
      field: "rmaNumber",
      headerName: "RMA Number",
      // width: 150,
      flex: 1,
      renderCell: ({ row }) => <>{row.shipmentHeaderModel?.rmaNumber}</>,
    },
    {
      field: "trackingNumber",
      headerName: "Tracking Number",
      flex: 1,
      renderCell: ({ row }) => <>{row.shipmentHeaderModel?.trackingNumber}</>,
    },
    {
      field: "shipedOn",
      headerName: "Shiped On",
      flex: 1,
      renderCell: ({ row }) => <>{row.shipmentHeaderModel?.shippedOn}</>,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleEditShipmentReport(row)}
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
        ];
      },
    },
  ];

  // edit the shipment report row data
  const handleEditShipmentReport = (row) => {
    setWarrantyReturnId(row.warrantyReturnId);
    setRequestCreation(false);
    setTabValue("overview");
  };

  // view shipment Report
  const viewShipmentReport = () => {
    return (
      <>
        <Grid
          container
          sx={{
            width: "100%",
            backgroundColor: "#f3eafe",
            borderRadius: 5,
            marginBlock: 3,
            padding: 2,
            marginTop: 0.5,
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 400,
              marginInline: 2,
            }}
          >
            <DataGrid
              sx={GRID_STYLE}
              getRowId={(row) => row.warrantyReturnId}
              rows={shipmentReportRecords}
              columns={shipmentReportcolumns}
              rowsPerPageOptions={[10, 20, 50]}
              checkboxSelection={true}
              keepNonExistentRowsSelected
            />
          </Box>
        </Grid>

        <div className="row mt-2 mb-2" style={{ justifyContent: "right" }}>
          <button className="btn btn-primary mx-3" onClick={hideModal}>
            Close
          </button>
        </div>
      </>
    );
  };

  return (
    <>
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
                  <Tab label={`Shipment Report`} value="shipmentReport" />
                </TabList>
              </Box>
              <TabPanel
                value={tabValue}
                sx={{
                  paddingTop: tabValue === "shipmentReport" ? 3 : 1.4,
                  paddingBottom: 0,
                }}
              >
                {tabValue === "overview" && viewOverviewTabData()}
                {tabValue === "partsSelection" && viewPartSelectionTabData()}
                {tabValue === "shipment" && viewShipmentTabData()}
                {tabValue === "shipmentReport" && viewShipmentReport()}
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
      {searchResultOpen && (
        <SearchPartListModal
          show={searchResultOpen}
          hideModal={handleSearchResClose}
          masterData={partsSearchData}
          // claimOrderId={claimOrderId}
          // partsRecordData
          setRelatedPartsRecords={
            isShipmentSearch ? setShipmentTableData : setPartsRecordData
          }
          isShipmentSearch={isShipmentSearch}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default ClaimReturnRequester;
