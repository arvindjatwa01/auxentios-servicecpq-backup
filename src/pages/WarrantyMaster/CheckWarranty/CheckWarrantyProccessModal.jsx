import React, { useEffect, useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, FormControlLabel, FormGroup, Switch } from "@mui/material";

import Select from "react-select";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";

import SearchBox from "pages/Repair/components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";
import Validator from "utils/validator";
import {
  updateBuilderCustomer,
  updateBuilderEstimation,
  updateBuilderGeneralDet,
  updateBuilderMachine,
} from "services/repairBuilderServices";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import {
  claimRequestObj,
  payerOptions,
} from "pages/MasterData/warrantyMaster/WarrantyConstants";
import {
  claimStatusOptions,
  claimTypeOptions,
} from "pages/MasterData/claimMaster/ClaimMasterConstants";
import ClaimRelatedPartList from "./ClaimRelatedPartList";
import ClaimRelatedServiceEstimate from "./ClaimRelatedServiceEstimate";
import { useAppSelector } from "app/hooks";
import {
  selectActivityIdList,
  selectChargeCodeList,
  selectConsumableTypeList,
  selectDimensionList,
  selectDropdownOption,
  selectLaborCodeList,
  selectLaborTypeList,
  selectMiscTypeList,
  selectPricingMethodList,
  selectServiceTypeList,
} from "pages/Repair/dropdowns/repairSlice";
import ClaimAdjustPrice from "./ClaimAdjustPrice";
import ClaimSplitPrice from "./ClaimSplitPrice";
import { claimOrderReqObj } from "./claimWarrantyConstants";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import {
  Claim_Details_By_Id_Get,
  Claim_Order_Create_POST,
  Claim_Order_Update_PUT,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

const validityOptions = [
  { value: 15, label: "15 days" },
  { value: 30, label: "1 month" },
  { value: 45, label: "45 days" },
  { value: 60, label: "2 months" },
];

const salesOfficeOptions = [
  { value: "Location1", label: "Location1" },
  { value: "Location2", label: "Location2" },
  { value: "Location3", label: "Location3" },
  { value: "Location4", label: "Location4" },
];

const warrantyClaimStatusOption = [
  { label: "Registered", value: "REGISTERED" },
  { label: "Acknowledged", value: "ACKNOWLEDGED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Closed", value: "CLOSED" },
];

const CheckWarrantyProccessModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  claimProcessActiveTabClaim = false,
  claimDetails,
  claimOrderId,
  setClaimOrderId,
  handleShowClaimEvaluation,
}) => {
  // Retrieve labor codes
  const laborCodeList = useAppSelector(
    selectDropdownOption(selectLaborCodeList)
  );

  // Retrieve charge codes
  const chargeCodeList = useAppSelector(
    selectDropdownOption(selectChargeCodeList)
  );

  // Retrieve labor types
  const laborTypeList = useAppSelector(
    selectDropdownOption(selectLaborTypeList)
  );

  // Retrieve service types
  const serviceTypeList = useAppSelector(
    selectDropdownOption(selectServiceTypeList)
  );

  // Retrieve misc types
  const miscTypeList = useAppSelector(selectDropdownOption(selectMiscTypeList));

  // Retrieve dimensions
  const dimensionList = useAppSelector(
    selectDropdownOption(selectDimensionList)
  );
  // Retrieve consumables
  const consumableTypeList = useAppSelector(
    selectDropdownOption(selectConsumableTypeList)
  );
  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );

  // Retrieve activity Ids
  const activityIdList = useAppSelector(
    selectDropdownOption(selectActivityIdList)
  );

  const [activeTab, setActiveTab] = useState(
    claimProcessActiveTabClaim ? "claim" : "customer"
  );

  const [activeHigherTab, setActiveHigherTab] = useState(null);
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [savedHeaderDetails, setSavedBuilderDetails] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);

  const [claimOrderData, setClaimOrderData] = useState({ ...claimOrderReqObj });

  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });

  const [viewOnlyTab, setViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
  });

  const [customerData, setCustomerData] = useState({
    source: "User Generated",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
    customerSegment: "",
    regionOrState: "",
    country: "",
  });

  const [machineData, setMachineData] = useState({
    make: "",
    family: "",
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
    productSegment: "",
    productGroup: "",
  });

  const [generalData, setGeneralData] = useState({
    estimationDate: new Date(),
    estimationNo: "",
    description: "",
    reference: "",
    validity: null,
    version: "",
    warrantyClaimStatus: "",
  });

  const [estimationData, setEstimationData] = useState({
    preparedBy: "user1",
    approvedBy: "user1",
    preparedOn: new Date(),
    revisedBy: "user1",
    revisedOn: new Date(),
    salesOffice: null,
  });
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          setClaimRecord({
            ...responseData,
            claimStatus: _claimStatus,
            claimType: _claimType,
            payer: _payer,
          });
        }
      });
    }
  }, [recordId, claimProcessActiveTabClaim]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChangeHigherActiveTab = (tabName) => {
    setActiveHigherTab(tabName);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  const handleSelectChange = (e, keyName) => {
    setClaimRecord({ ...claimRecord, [keyName]: e });
  };

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCustResults(result);
            setNoOptionsCust(false);
          } else {
            setNoOptionsCust(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
      customerSegment: currentItem.customerSegment,
      country: currentItem.addressDTO?.country,
      regionOrState: currentItem.addressDTO?.regionOrState,
    });
    console.log(currentItem);
    setSearchCustResults([]);
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimationData({
      ...estimationData,
      [name]: value,
    });
  };

  // Reset the data
  const handleResetData = (action) => {
    if (action === "RESET") {
      activeTab === "customer" && populateCustomerData(savedHeaderDetails);
      activeTab === "machine" && populateMachineData(savedHeaderDetails);
      activeTab === "general" && populateGeneralData(savedHeaderDetails);
      activeTab === "estimation" && populateEstData(savedHeaderDetails);
    } else if (action === "CANCEL") {
      // populateHeader(savedHeaderDetails);
    }
    // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
  };

  // create  claim order
  const handleCreateClaimOrder = () => {
    const reqObj = {
      customerNumber: customerData.customerID,
      customerName: customerData.customerName || "",
      emailId: customerData.contactEmail || "",
      address: "",
      contactNumber: customerData.contactPhone || "",
      make: machineData.make || "",
      model: machineData.model || "",
      serialNumber: machineData.serialNo || "",
      location: "",
      smu: machineData.smu || "",
      unitNumber: "",
      repairFromDate: new Date(),
      repairToDate: new Date(),
      preparedBy: estimationData.preparedBy || "",
      preparedOn: estimationData.preparedOn || new Date(),
      revisedBy: estimationData.revisedBy || "",
      revisedOn: estimationData.revisedOn || new Date(),
      claimRequestDate: new Date(),
      claimType: claimDetails?.claimType || "EMPTY",
      description: "",
      claimNumber: claimDetails.claimNumber || "",
      reference: "",
    };
    callPostApi(null, Claim_Order_Create_POST, reqObj, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimOrderId(responseData.claimOrderId);
        setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
        setActiveTab("machine");
        handleSnack("success", "Claim Order Create Successfully");
      } else {
      }
    });
  };

  const handleUpdateClaimOrder = () => {
    const reqObj = {
      customerNumber: customerData.customerID,
      customerName: customerData.customerName || "",
      emailId: customerData.contactEmail || "",
      address: "",
      contactNumber: customerData.contactPhone || "",
      make: machineData.make || "",
      model: machineData.model || "",
      serialNumber: machineData.serialNo || "",
      location: "",
      smu: machineData.smu || "",
      unitNumber: "",
      repairFromDate: new Date(),
      repairToDate: new Date(),
      preparedBy: estimationData.preparedBy || "",
      preparedOn: estimationData.preparedOn || new Date(),
      revisedBy: estimationData.revisedBy || "",
      revisedOn: estimationData.revisedOn || new Date(),
      claimRequestDate: new Date(),
      claimType: claimDetails?.claimType || "EMPTY",
      description: generalData.description || "",
      claimNumber: claimDetails.claimNumber || "",
      reference: generalData.reference || "",
    };
    if (isEmpty(claimOrderId)) {
      setActiveTab("customer");
      handleSnack("error", "Create Claim order First at Customer Tab");
      return;
    }
    const reqUrl = `${Claim_Order_Update_PUT}/${claimOrderId}`;
    callPutApi(null, reqUrl, reqObj, (response) => {
      if (response.status === API_SUCCESS) {
        if (activeTab === "customer") {
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          setActiveTab("machine");
        } else if (activeTab === "machine") {
          setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
          setActiveTab("estimation");
        } else if (activeTab === "estimation") {
          setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
          setActiveTab("general");
        } else if (activeTab === "general") {
          setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
          if (!claimProcessActiveTabClaim) {
            handleShowClaimEvaluation();
          }
        }
        handleSnack("success", "Claim Request Updated Sucessfully");
      }
    });
  };

  const updateCustomerData = () => {
    let data = {
      builderId,
      source: customerData.source,
      customerId: customerData.customerID,
      customerName: customerData.customerName,
      contactName: customerData.contactName,
      contactEmail: customerData.contactEmail,
      customerGroup: customerData.customerGroup,
      contactPhone: customerData.contactPhone,
      customerSegment: customerData.customerSegment,
      regionOrState: customerData.regionOrState,
      country: customerData.country,
    };
    console.log(data);
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      handleSnack("error", "Please enter the email address in correct format");
    } else {
      updateBuilderCustomer(bId, data)
        .then((result) => {
          setSavedBuilderDetails(result);
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          setActiveTab("machine");
          handleSnack("success", "Customer details updated!");
        })
        .catch((err) => {
          handleSnack(
            "error",
            "Error occurred while updating the customer data!"
          );
        });
    }
  };

  const populateCustomerData = (result) => {
    setCustomerData({
      customerID: result.customerId ? result.customerId : "",
      contactEmail: result.contactEmail ? result.contactEmail : "",
      contactName: result.contactName ? result.contactName : "",
      contactPhone: result.contactPhone ? result.contactPhone : "",
      customerGroup: result.customerGroup ? result.customerGroup : "",
      customerName: result.customerName ? result.customerName : "",
      source: result.source ? result.source : "User Generated",
      customerSegment: result.customerSegment ? result.customerSegment : "",
      country: result.country ? result.country : "",
      regionOrState: result.regionOrState ? result.regionOrState : "",
    });
    setSearchCustResults([]);
  };
  const populateMachineData = (result) => {
    setMachineData({
      make: result.make ? result.make : "",
      family: result.family ? result.family : "",
      model: result.model ? result.model : "",
      serialNo: result.serialNo ? result.serialNo : "",
      fleetNo: result.fleetNo ? result.fleetNo : "",
      smu: result.smu ? result.smu : "",
      registrationNo: result.registrationNo ? result.registrationNo : "",
      chasisNo: result.chasisNo ? result.chasisNo : "",
      productSegment: result.productSegment ? result.productSegment : "",
      productGroup: result.productGroup ? result.productGroup : "",
    });
    setSearchModelResults([]);
    setSearchSerialResults([]);
  };
  const populateGeneralData = (result) => {
    setGeneralData({
      description: result.description ? result.description : "",
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      // estimationNo: result.builderId ? result.builderId : state.builderId,
      estimationNo: result.builderId ? result.builderId : "",
      reference: result.reference ? result.reference : "",
      validity:
        result.validityDays && result.validityDays !== "EMPTY"
          ? validityOptions.find(
              (element) => element.value === result.validityDays
            )
          : { label: "", value: "" },
      version: result.versionNumber ? result.versionNumber : "",
    });
  };

  const populateEstData = (result) => {
    setEstimationData({
      approvedBy: result.approver ? result.approver : "",
      preparedBy: result.preparedBy ? result.preparedBy : "",
      preparedOn: result.preparedOn ? result.preparedOn : new Date(),
      revisedBy: result.revisedBy ? result.revisedBy : "",
      revisedOn: result.revisedOn ? result.revisedOn : new Date(),
      salesOffice: result.salesOffice
        ? salesOfficeOptions.find(
            (element) => element.value === result.salesOffice
          )
        : { label: "", value: "" },
    });
  };

  // Machine search based on model and serial number
  const handleMachineSearch = async (searchMachinefieldName, searchText) => {
    let searchQueryMachine = "";
    setSearchModelResults([]);
    setSearchSerialResults([]);

    if (searchMachinefieldName === "model") {
      machineData.model = searchText;
      searchQueryMachine = searchText
        ? searchMachinefieldName + "~" + searchText
        : "";
    } else if (searchMachinefieldName === "serialNo") {
      machineData.serialNo = searchText;
      searchQueryMachine = searchText
        ? machineData.model
          ? `model:${machineData.model} AND equipmentNumber~` + searchText
          : "equipmentNumber~" + searchText
        : "";
    }
    if (searchQueryMachine) {
      await machineSearch(searchQueryMachine)
        .then((result) => {
          if (result) {
            if (searchMachinefieldName === "model") {
              if (result && result.length > 0) {
                setSearchModelResults(result);
                setNoOptionsModel(false);
              } else {
                setNoOptionsModel(true);
              }
            } else if (searchMachinefieldName === "serialNo") {
              if (result && result.length > 0) {
                setSearchSerialResults(result);
                setNoOptionsSerial(false);
              } else {
                setNoOptionsSerial(true);
              }
            }
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the machine!");
        });
    } else {
      searchMachinefieldName === "model"
        ? setSearchModelResults([])
        : setSearchSerialResults([]);
    }
  };

  // Select machine from the search result
  const handleModelSelect = (type, currentItem) => {
    if (type === "model") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
      });
      setSearchModelResults([]);
    } else if (type === "equipmentNumber") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        serialNo: currentItem.equipmentNumber,
        smu: currentItem.sensorId,
        make: currentItem.maker,
        family: currentItem.market,
        productGroup: currentItem.productGroup,
        productSegment: currentItem.productSegment,
      });
      setSearchSerialResults([]);
    }
  };

  const updateMachineData = () => {
    let data = {
      builderId,
      make: machineData.make,
      family: machineData.family,
      model: machineData.model,
      fleetNo: machineData.fleetNo,
      smu: machineData.smu,
      registrationNo: machineData.registrationNo,
      chasisNo: machineData.chasisNo,
      serialNo: machineData.serialNo,
      productGroup: machineData.productGroup,
      productSegment: machineData.productSegment,
    };
    updateBuilderMachine(bId, data)
      .then((result) => {
        setSavedBuilderDetails(result);
        setActiveTab("estimation");
        setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
        handleSnack("success", "Machine details updated!");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating the machine data!");
      });
  };

  const updateEstData = () => {
    let data = {
      builderId,
      preparedBy: estimationData.preparedBy,
      preparedOn: estimationData.preparedOn,
      revisedBy: estimationData.revisedBy,
      revisedOn: estimationData.revisedOn,
      approver: estimationData.approvedBy,
      salesOffice: estimationData.salesOffice?.value,
    };
    updateBuilderEstimation(bId, data)
      .then((result) => {
        setSavedBuilderDetails(result);
        setActiveTab("general");
        setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
        handleSnack("success", "Estimation details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the estimation details!"
        );
      });
  };

  const updateGeneralData = () => {
    let data = {
      builderId,
      estimationDate: generalData.estimationDate,
      description: generalData.description,
      reference: generalData.reference,
      validityDays: generalData.validity?.value,
      estimationNumber: generalData.estimationNo,
    };
    updateBuilderGeneralDet(bId, data)
      .then((result) => {
        setSavedBuilderDetails(result);
        // setActiveTab("price");
        setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
        handleSnack("success", "General details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the general details!"
        );
      });
  };

  // claim details tab
  const viewClaimDetailsTab = () => {
    return (
      <div className="card px-2 py-3 border">
        <div className="row input-fields">
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.claimNumber}
                name="claimNumber"
                placeholder="Claim Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Model Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.modelNumber}
                name="modelNumber"
                placeholder="Model Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Equipment Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.equipmentNumber}
                name="equipmentNumber"
                placeholder="Equipment Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Serial Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.serialNumber}
                name="serialNumber"
                placeholder="Serial Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Component Code
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.componentCode}
                name="componentCode"
                placeholder="Component Code"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Status
              </label>
              <Select
                className="text-primary"
                options={claimStatusOptions}
                onChange={(e) => handleSelectChange(e, "claimStatus")}
                value={claimRecord.claimStatus}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Type
              </label>
              <Select
                className="text-primary"
                options={claimTypeOptions}
                onChange={(e) => handleSelectChange(e, "claimType")}
                value={claimRecord.claimType}
                styles={FONT_STYLE_SELECT}
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
                      checked={claimRecord.replacement}
                      onChange={(e) =>
                        setClaimRecord({
                          ...claimRecord,
                          replacement: e.target.checked,
                        })
                      }
                    />
                  }
                  labelPlacement="top"
                  label={
                    <span className="text-light-dark font-size-12 font-weight-500">
                      Replacement
                    </span>
                  }
                />
              </FormGroup>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Fill Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.fillDate}
                    onChange={(e) => handleSelectChange(e, "fillDate")}
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
                Failure Part Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.failurePartNumber}
                name="failurePartNumber"
                placeholder="Failure Part Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Hour on Machine
              </label>
              <input
                type="number"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.hourOnMachine}
                name="hourOnMachine"
                placeholder="Hour on Machine"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Hours on Failed Part
              </label>
              <input
                type="number"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.hoursOnFailedPart}
                name="hoursOnFailedPart"
                placeholder="Hours on Failed Part"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Upload Photo
                </label>
                <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.hoursOnFailedPart}
                        name="hoursOnFailedPart"
                        placeholder="Hours on Failed Part"
                        onChange={handleInputChange}
                      /> 
              </div>
            </div>*/}
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Part List
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.partList}
                name="partList"
                placeholder="Part List"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Time taken for the Repair
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.repairTime}
                name="repairTime"
                placeholder="Time taken for the Repair"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Claim Questionnaire
                </label>
                <textarea
                  name="claimQuestionnaire"
                  cols="30"
                  rows="3 "
                  value={claimRecord.claimQuestionnaire}
                  onChange={handleInputChange}
                  placeholder="Claim Questionnaire"
                  className="form-control border-radius-10 text-primary"
                ></textarea>
              </div>
            </div> */}
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Payer
              </label>
              <Select
                className="text-primary"
                options={payerOptions}
                onChange={(e) => handleSelectChange(e, "payer")}
                value={claimRecord.payer}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Approver
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.claimApprover}
                name="claimApprover"
                placeholder="Claim Approver"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Created By
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.createdBy}
                name="createdBy"
                placeholder="Created By"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Updated By
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={claimRecord.updatedBy}
                name="updatedBy"
                placeholder="Updated By"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Created On
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.createdOn}
                    onChange={(e) => handleSelectChange(e, "createdOn")}
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
                Updated On
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.updatedOn}
                    onChange={(e) => handleSelectChange(e, "updatedOn")}
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
                Claim Receipt Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.claimReceiptDate}
                    onChange={(e) => handleSelectChange(e, "claimReceiptDate")}
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
                Created Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.createdDate}
                    onChange={(e) => handleSelectChange(e, "createdDate")}
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
                Closed Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.closedDate}
                    onChange={(e) => handleSelectChange(e, "closedDate")}
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
                Approved / Rejected On
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={claimRecord.appoverRejectedOn}
                    onChange={(e) => handleSelectChange(e, "appoverRejectedOn")}
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
        </div>
        <div className="row input-fields">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Story
              </label>
              <textarea
                name="claimStory"
                cols="30"
                rows="3"
                value={claimRecord.claimStory}
                onChange={handleInputChange}
                placeholder="Claim Story"
                className="form-control border-radius-10 text-primary"
              ></textarea>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Approval / Rejection Notes
              </label>
              <textarea
                name="claimNotes"
                cols="30"
                rows="3 "
                value={claimRecord.claimNotes}
                onChange={handleInputChange}
                placeholder="Claim Approval / Rejection Notes"
                className="form-control border-radius-10 text-primary"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Claim Requester information
  const claimRequesterInfo = () => {
    return (
      <>
        <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList className="custom-tabs-div" onChange={handleTabChange}>
                <Tab label="Customer" value="customer" />
                <Tab label="Machine " value="machine" />
                <Tab label="Estimation Details" value="estimation" />
                <Tab label="General Details" value="general" />
                <Tab
                  label="Claim"
                  value="claim"
                  disabled={!claimProcessActiveTabClaim}
                />
              </TabList>
            </Box>
            <TabPanel value="customer">
              {!viewOnlyTab.custViewOnly ? (
                <>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SOURCE
                        </label>
                        <input
                          type="text"
                          disabled
                          className="form-control border-radius-10 text-primary"
                          id="customer-src"
                          value={customerData.source}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CUSTOMER ID
                        </label>
                        <SearchBox
                          value={customerData.customerID}
                          onChange={(e) =>
                            handleCustSearch("customerId", e.target.value)
                          }
                          type="customerId"
                          result={searchCustResults}
                          onSelect={handleCustSelect}
                          noOptions={noOptionsCust}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CUSTOMER NAME
                        </label>
                        <input
                          type="text"
                          value={customerData.customerName}
                          name="customerName"
                          onChange={handleCustomerDataChange}
                          className="form-control border-radius-10 text-primary"
                          id="customerNameid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONTACT NAME
                        </label>
                        <input
                          type="text"
                          value={customerData.contactName}
                          name="contactName"
                          onChange={handleCustomerDataChange}
                          className="form-control border-radius-10 text-primary"
                          id="contactNameid"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONTACT EMAIL
                        </label>
                        <input
                          type="email"
                          value={customerData.contactEmail}
                          name="contactEmail"
                          onChange={handleCustomerDataChange}
                          className="form-control border-radius-10 text-primary"
                          id="contatEmail"
                          aria-describedby="emailHelp"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONTACT PHONE
                        </label>
                        <input
                          type="tel"
                          className="form-control border-radius-10 text-primary"
                          onChange={handleCustomerDataChange}
                          value={customerData.contactPhone}
                          name="contactPhone"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CUSTOMER GROUP
                        </label>
                        <input
                          type="text"
                          value={customerData.customerGroup}
                          name="customerGroup"
                          onChange={handleCustomerDataChange}
                          className="form-control border-radius-10 text-primary"
                          id="custGroup"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white mr-1"
                      onClick={() => handleResetData("CANCEL")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white"
                      disabled={
                        !(
                          customerData.source &&
                          customerData.contactEmail &&
                          customerData.customerGroup &&
                          customerData.contactName
                        ) || noOptionsCust
                      }
                      // onClick={updateCustomerData}
                      onClick={handleCreateClaimOrder}
                    >
                      Save & Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="row mt-3">
                  <ReadOnlyField
                    label="SOURCE"
                    value={customerData.source}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CUSTOMER ID"
                    value={customerData.customerID}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CUSTOMER NAME"
                    value={customerData.customerName}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CUSTOMER EMAIL"
                    value={customerData.contactEmail}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CONTACT NAME"
                    value={customerData.contactName}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CONTACT PHONE"
                    value={customerData.contactPhone}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CUSTOMER GROUP"
                    value={customerData.customerGroup}
                    className="col-md-4 col-sm-4"
                  />
                </div>
              )}
            </TabPanel>
            <TabPanel value="machine">
              {!viewOnlyTab.machineViewOnly ? (
                <>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          Make
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="make-id"
                          name="make"
                          value={machineData.make}
                          onChange={handleMachineDataChange}
                          placeholder="Auto Filled"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          Family
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="family-id"
                          name="family"
                          value={machineData.family}
                          onChange={handleMachineDataChange}
                          placeholder="Auto Filled"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          MODEL
                        </label>
                        <SearchBox
                          value={machineData.model}
                          onChange={(e) =>
                            handleMachineSearch("model", e.target.value)
                          }
                          type="model"
                          result={searchModelResults}
                          onSelect={handleModelSelect}
                          noOptions={noOptionsModel}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SERIAL #
                        </label>
                        <SearchBox
                          value={machineData.serialNo}
                          onChange={(e) =>
                            handleMachineSearch("serialNo", e.target.value)
                          }
                          type="equipmentNumber"
                          result={searchSerialResults}
                          onSelect={handleModelSelect}
                          noOptions={noOptionsSerial}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SMU (Service Meter Unit)
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="smu-id"
                          name="smu"
                          value={machineData.smu}
                          onChange={handleMachineDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT NO / FLEET NO
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          onChange={handleMachineDataChange}
                          value={machineData.fleetNo}
                          name="fleetNo"
                          id="fleet-id"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          REGISTRATION NO
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          onChange={handleMachineDataChange}
                          value={machineData.registrationNo}
                          name="registrationNo"
                          id="registration-id"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CHASIS NO
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="chasis-id"
                          onChange={handleMachineDataChange}
                          value={machineData.chasisNo}
                          name="chasisNo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white mr-1"
                      onClick={() => handleResetData("CANCEL")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white"
                      disabled={
                        !(machineData.model && machineData.serialNo) ||
                        noOptionsModel ||
                        noOptionsSerial
                      }
                      // onClick={updateMachineData}
                      onClick={handleUpdateClaimOrder}
                    >
                      Save & Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="row mt-3">
                  <ReadOnlyField
                    label="MAKE"
                    value={machineData.make}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="FAMILY"
                    value={machineData.family}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="MODEL"
                    value={machineData.model}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="SERIAL NO"
                    value={machineData.serialNo}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="SMU (Service Meter Unit)"
                    value={machineData.smu}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="UNIT NO / FLEET NO"
                    value={machineData.fleetNo}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="REGISTRATION NO"
                    value={machineData.registrationNo}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CHASSIS NO"
                    value={machineData.chasisNo}
                    className="col-md-4 col-sm-4"
                  />
                </div>
              )}
            </TabPanel>
            <TabPanel value="estimation">
              {!viewOnlyTab.estViewOnly ? (
                <>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          PREPARED BY
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={estimationData.preparedBy}
                          name="preparedBy"
                          onChange={handleEstimationDataChange}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          APPROVED BY
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={estimationData.approvedBy}
                          name="approvedBy"
                          onChange={handleEstimationDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          PREPARED ON
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // sx={{
                              //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                              //   }}
                              // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                              minDate={estimationData.preparedOn}
                              maxDate={new Date()}
                              closeOnSelect
                              value={estimationData.preparedOn}
                              onChange={(e) =>
                                setEstimationData({
                                  ...estimationData,
                                  preparedOn: e,
                                })
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
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          REVISED BY
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={estimationData.revisedBy}
                          name="revisedBy"
                          onChange={handleEstimationDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          REVISED ON
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              minDate={estimationData.revisedOn}
                              maxDate={new Date()}
                              closeOnSelect
                              value={estimationData.revisedOn}
                              onChange={(e) =>
                                setEstimationData({
                                  ...estimationData,
                                  revisedOn: e,
                                })
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
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SALES OFFICE / BRANCH
                        </label>
                        <Select
                          onChange={(e) =>
                            setEstimationData({
                              ...estimationData,
                              salesOffice: e,
                            })
                          }
                          options={salesOfficeOptions}
                          value={estimationData.salesOffice}
                          styles={FONT_STYLE_SELECT}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white mr-1"
                      onClick={() => handleResetData("CANCEL")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white"
                      disabled={
                        !estimationData.preparedBy ||
                        !estimationData.preparedOn ||
                        !estimationData.salesOffice
                      }
                      // onClick={updateEstData}
                      onClick={handleUpdateClaimOrder}
                    >
                      Save & Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="row mt-3">
                  <ReadOnlyField
                    label="PREPARED BY"
                    value={estimationData.preparedBy}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="APPROVED BY"
                    value={estimationData.approvedBy}
                    className="col-md-4 col-sm-4"
                  />

                  <ReadOnlyField
                    label="PREPARED ON"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {estimationData.preparedOn}
                      </Moment>
                    }
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="REVISED BY"
                    value={estimationData.revisedBy}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="REVISED ON"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {estimationData.revisedOn}
                      </Moment>
                    }
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="SALES OFFICE / BRANCH"
                    value={estimationData.salesOffice?.label}
                    className="col-md-4 col-sm-4"
                  />
                </div>
              )}
            </TabPanel>
            <TabPanel value="general">
              {!viewOnlyTab.generalViewOnly ? (
                <>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          <span className=" mr-2">ESTIMATION DATE</span>
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              minDate={generalData.estimationDate}
                              maxDate={new Date()}
                              closeOnSelect
                              value={generalData.estimationDate}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  estimationDate: e,
                                })
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
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ESTIMATION #
                        </label>
                        <input
                          type="text"
                          disabled
                          className="form-control border-radius-10 text-primary"
                          id="estNoId"
                          value={generalData.estimationNo}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          DESCRIPTION
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="desc-id"
                          maxLength={140}
                          value={generalData.description}
                          onChange={(e) =>
                            setGeneralData({
                              ...generalData,
                              description: e.target.value,
                            })
                          }
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          REFERENCE
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          id="desc-id"
                          maxLength={140}
                          value={generalData.reference}
                          onChange={(e) =>
                            setGeneralData({
                              ...generalData,
                              reference: e.target.value,
                            })
                          }
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          VALIDITY
                        </label>
                        <Select
                          // defaultValue={selectedOption}
                          onChange={(e) =>
                            setGeneralData({
                              ...generalData,
                              validity: e,
                            })
                          }
                          options={validityOptions}
                          value={generalData.validity}
                          styles={FONT_STYLE_SELECT}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          VERSION
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          disabled
                          value={parseFloat(selectedVersion.value).toFixed(1)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          WARRANTY CLAIM STATUS
                        </label>
                        <Select
                          // defaultValue={selectedOption}
                          onChange={(e) =>
                            setGeneralData({
                              ...generalData,
                              warrantyClaimStatus: e,
                            })
                          }
                          options={warrantyClaimStatusOption}
                          value={generalData.warrantyClaimStatus}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white mr-1"
                      onClick={() => handleResetData("CANCEL")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white"
                      disabled={
                        !generalData.estimationDate ||
                        !generalData.description ||
                        // !generalData.estimationNo ||
                        !generalData.reference ||
                        !generalData.validity
                      }
                      // onClick={updateGeneralData}
                      onClick={handleUpdateClaimOrder}
                    >
                      Save & Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="row mt-3">
                  <ReadOnlyField
                    label="ESTIMATION DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {generalData.estimationDate}
                      </Moment>
                    }
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="ESTIMATION #"
                    value={generalData.estimationNo}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="DESCRIPTION"
                    value={generalData.description}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="REFERENCE"
                    value={generalData.reference}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="VALIDTITY (DAYs)"
                    value={generalData.validity?.label}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="VERSION"
                    value={parseFloat(selectedVersion.value).toFixed(1)}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="WARRANTY CLAIM STATUS"
                    value={generalData.warrantyClaimStatus?.label}
                    className="col-md-4 col-sm-4"
                  />
                </div>
              )}
            </TabPanel>
            <TabPanel value="claim">{viewClaimDetailsTab()}</TabPanel>
          </TabContext>
        </Box>
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="card border my-2 px-3">
          <div className="row mt-2 py-3">
            <div className="col-md-4 col-sm-4 d-flex  claim-requester-info">
              <img src="../assets/images/member/2.jpg" alt="" />
              <div className="mx-2">
                <h2 className="mb-0">David Krasniy</h2>
                <h6>Associate Programmer Analyst</h6>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 d-flex">
              <DateRangeIcon fontSize="large" />
              <div className="mx-2">
                <h6 className="mb-0">Year-end</h6>
                <h4>2018</h4>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 d-flex">
              <PeopleAltOutlinedIcon fontSize="large" />
              <div className="mx-2">
                <h6 className="mb-0">Manager</h6>
                <h4>Andrew Studer</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="ligt-greey-bg p-3">
          <div>
            <span
              className="mr-3 cursor"
              // onClick={() => setDisable(false)}
            >
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
            {claimOrderId && (
              <>
                <span
                  className={`mr-3 cursor ${
                    activeHigherTab === "adjustPrice" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeHigherActiveTab("adjustPrice")}
                >
                  <MonetizationOnOutlinedIcon className=" font-size-16" />
                  <span className="ml-2"> Adjust price</span>
                </span>
                <span
                  className={`mr-3 cursor ${
                    activeHigherTab === "realtedPartList" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeHigherActiveTab("realtedPartList")}
                >
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related part list(s)</span>
                </span>
                <span
                  className={`mr-3 cursor ${
                    activeHigherTab === "realtedServiceEstimate"
                      ? "active-span"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeHigherActiveTab("realtedServiceEstimate")
                  }
                >
                  <AccessAlarmOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related service estimate(s)</span>
                </span>
                <span
                  className={`cursor ${
                    activeHigherTab === "splitPrice" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeHigherActiveTab("splitPrice")}
                >
                  <SellOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Split price</span>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="card border my-2 px-3">
          {!activeHigherTab && claimRequesterInfo()}

          {activeHigherTab === "realtedPartList" && (
            <ClaimRelatedPartList
              selectedVersion={selectedVersion}
              handleSnack={handleSnack}
            />
          )}
          {activeHigherTab === "realtedServiceEstimate" && (
            <ClaimRelatedServiceEstimate
              selectedVersion={selectedVersion}
              handleSnack={handleSnack}
              laborCodeList={laborCodeList}
              chargeCodeList={chargeCodeList}
              laborTypeList={laborTypeList}
              serviceTypeList={serviceTypeList}
              miscTypeList={miscTypeList}
              dimensionList={dimensionList}
              consumableTypeList={consumableTypeList}
              priceMethodOptions={priceMethodOptions}
              activityIdList={activityIdList}
            />
          )}
          {activeHigherTab === "adjustPrice" && (
            <ClaimAdjustPrice handleSnack={handleSnack} />
          )}
          {activeHigherTab === "splitPrice" && (
            <ClaimSplitPrice handleSnack={handleSnack} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckWarrantyProccessModal;
