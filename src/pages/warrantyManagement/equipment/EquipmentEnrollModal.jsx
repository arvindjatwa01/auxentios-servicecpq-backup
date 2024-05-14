import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import { TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { Modal } from "react-bootstrap";
import Select from "react-select";
import Moment from "react-moment";

import {
  equipmentAddressDtoObj,
  equipmentContractRecordsObj,
  equipmentFailureRecordsObj,
  equipmentRequestObj,
  equipmentSensorRecordsObj,
  equipmentServiceRecords,
  equipmentUsageRecordsObj,
  equipmentWarrantyRecordsObj,
  installerCreateObj,
  warrantyCreateObj,
  warrantyTypeOptions,
  yearlyWarrantyObj,
} from "../warrantyManagementConstants";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import SearchBox from "pages/Common/SearchBox";

import {
  DATA_SVC_EQUIPMENT,
  WARRANTY_INSTALLER_MASTER_URL,
  WARRANTY_MASTER_URL,
  Warranty_Yearly_GetById_GET,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { customerSearch, machineSearch } from "services/searchServices";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";

const equipmentObj = {
  equipmentId: "",
  model: "",
  serialNo: "",
};

const customerRequestObj = {
  customerId: 0,
  customerName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  phoneNumber: "",
};

const purchaseObj = {
  purchaseDate: new Date(),
  placeOfPurchase: "",
  attachProof: "",
  usedFor: "",
  usageConditions: "",
};

const insatllerObj = {
  insatallerName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  contactEmail: "",
  phoneNumber: "",
};

const warrantyObj = {
  warrantyType: "",
  warrantyValidFrom: new Date(),
  warrantyValidTo: new Date(),
  dateOfInstall: new Date(),
  dateOfSale: new Date(),
};

const EquipmentEnrollModal = ({
  show,
  hideModal,
  handleSnack,
  recordId = null,
  equipmentRecord,
}) => {
  const [tabValue, setTabValue] = useState("productData");

  const [equipmentRecordData, setEquipmentRecordData] = useState({
    ...equipmentRequestObj,
  });

  const [equipmentData, setEquipmentData] = useState({
    ...equipmentObj,
  });
  const [equipmentId, setEquipmentId] = useState(null);

  const [customerRecord, setCustomerRecord] = useState({
    id: "",
    customerID: "",
    customerName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactEmail: "",
    contactPhone: "",
    country: "",
    addressId: "",
  });

  const [purchaseRecord, setPurchaseRecord] = useState({ ...purchaseObj });
  const [insatallerRecord, setInsatallerRecord] = useState({
    ...installerCreateObj,
  });
  const [yearlyWarrantyRecord, setYearlyWarrantyRecord] = useState({
    ...yearlyWarrantyObj,
  });
  const [warrantyRecord, setWarrantyRecord] = useState({
    ...warrantyCreateObj,
  });

  const [yearlyWarrantyId, setYearlyWarrantyId] = useState(null);
  const [warrantyId, setWarrantyId] = useState(null);
  const [installerId, setInstallerId] = useState(null);

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

  const [viewOnlyTab, setViewOnlyTab] = useState({
    productViewOnly: false,
    warrantyViewOnly: false,
  });

  useEffect(() => {
    if (recordId) {
      setViewOnlyTab({
        productViewOnly: true,
        warrantyViewOnly: true,
      });
      const rUrl = DATA_SVC_EQUIPMENT() + "/" + equipmentRecord?.id;
      callGetApi(rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          //
          setEquipmentData({
            ...equipmentData,
            equipmentId: responseData?.id,
            model: responseData?.model,
            serialNo: responseData?.equipmentNumber,
          });

          setCustomerRecord({
            id: responseData.customerId,
            customerID: responseData.currentClient,
            customerName: responseData.customer,
            address: responseData.addressDTO?.fullAddress,
            city: responseData.addressDTO?.district,
            state: responseData.addressDTO?.regionOrState,
            zipCode: responseData.addressDTO?.zipCode,
            contactEmail: responseData.addressDTO?.email,
            contactPhone: responseData.addressDTO?.phoneNumber,
            country: responseData.addressDTO?.country,
            addressId: responseData.addressDTO?.id,
          });

          setPurchaseRecord({
            ...purchaseRecord,
            purchaseDate: responseData?.purchaseDate,
            placeOfPurchase: responseData?.placeOfPurchase,
            attachProof: "",
            usedFor: responseData?.usedFor,
            usageConditions: responseData?.usageCondition,
          });
          if (responseData.warrantyId) {
            setEquipmentId(responseData.warrantyId);
            getWarrantyDetails(responseData.warrantyId);
          }
        }
      });
    }
  }, [recordId]);

  // get warranty details
  const getWarrantyDetails = (warrantyId) => {
    const rUrl = `${WARRANTY_MASTER_URL}/${warrantyId}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setWarrantyRecord({ ...responseData });
        setInstallerId(responseData.installerId);
        getInstallerDetails(responseData.installerId);
        getYearlyWarrantyDetails(responseData["yearlyWarrantyIds"][0]);
      }
    });
  };

  // get warranty installer details
  const getInstallerDetails = (installerId) => {
    const rUrl = `${WARRANTY_INSTALLER_MASTER_URL}/${installerId}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setInsatallerRecord({ ...responseData });
      }
    });
  };

  // get yearly warranty details
  const getYearlyWarrantyDetails = (yearId) => {
    const rUrl = `${Warranty_Yearly_GetById_GET}/${yearId}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;

        const _warrantyType = warrantyTypeOptions.find(
          (obj) => obj.value === responseData.warrantyType
        );
        setYearlyWarrantyRecord({
          ...responseData,
          warrantyType: _warrantyType,
        });
      }
    });
  };

  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [searchCustResults, setSearchCustResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);

  // Machine search based on model and serial number
  const handleMachineSearch = async (searchMachinefieldName, searchText) => {
    let searchQueryMachine = "";
    setSearchModelResults([]);
    setSearchSerialResults([]);

    if (searchMachinefieldName === "model") {
      equipmentData.model = searchText;
      searchQueryMachine = searchText
        ? searchMachinefieldName + "~" + searchText
        : "";
    } else if (searchMachinefieldName === "serialNo") {
      equipmentData.serialNo = searchText;
      searchQueryMachine = searchText
        ? equipmentData.model
          ? `model:${equipmentData.model} AND makerSerialNumber~` + searchText
          : "makerSerialNumber~" + searchText
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
      setEquipmentData({
        ...equipmentData,
        model: currentItem.model,
        // equipmentId: currentItem.id,
      });
      setSearchModelResults([]);
    } else if (type === "equipmentNumber") {
      setEquipmentData({
        ...equipmentData,
        model: currentItem.model,
        // equipmentId: currentItem.id,
      });
      setSearchSerialResults([]);
    }
  };

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    setSearchCustResults([]);
    customerRecord.customerID = searchText;
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
    setCustomerRecord({
      ...customerRecord,
      id: currentItem.id,
      customerID: currentItem.customerId,
      customerName: currentItem.fullName,
      address: currentItem.addressDTO?.fullAddress,
      city: currentItem.addressDTO?.district,
      state: currentItem.addressDTO?.regionOrState,
      zipCode: currentItem.addressDTO?.zipCode,
      email: currentItem.email,
      addressId: currentItem.addressDTO?.id,
    });
    setSearchCustResults([]);
  };

  // customer fields value change
  const handleEquipmentFieldsChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({ ...equipmentData, [name]: value });
  };

  // customer fields value change
  const handleCustomerFieldsChange = (e) => {
    const { name, value } = e.target;
    setCustomerRecord({ ...customerRecord, [name]: value });
  };

  // purchase fields value change
  const handlePurchaseFieldsChange = (e) => {
    const { name, value } = e.target;
    setPurchaseRecord({ ...purchaseRecord, [name]: value });
  };

  // purchase fields value change
  const handleInsatllerFieldsChange = (e) => {
    const { name, value } = e.target;
    setInsatallerRecord({ ...insatallerRecord, [name]: value });
  };

  // create equipment  data
  const handleAddUpdateEquipment = () => {
    const rUrl = DATA_SVC_EQUIPMENT();
    const rObj = {
      ...equipmentRecordData,
      model: equipmentData.model,
      equipmentNumber: equipmentData.serialNo,
      makerSerialNumber: equipmentData.serialNo,
      currentClient: customerRecord.customerID,
      customer: customerRecord.customerName,
      customerId: customerRecord.id,
      addressDTO: customerRecord.addressId
        ? {
            id: customerRecord.addressId,
          }
        : null,
      purchaseDate: purchaseRecord.purchaseDate,
      placeOfPurchase: purchaseRecord.placeOfPurchase,
      usedFor: purchaseRecord.usedFor,
      usageCondition: purchaseRecord.usageConditions,
    };
    if (equipmentId) {
      callPutApi(
        null,
        `${rUrl}/${equipmentId}`,
        rObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            setViewOnlyTab({
              ...viewOnlyTab,
              productViewOnly: true,
            });
            handleSnack("success", "Equipment updated successfully.");
          } else {
            handleSnack("info", "Equipment update is unsuccessful.");
          }
        },
        (error) => {
          handleSnack("error", "Equipment update is unsuccessful.");
        }
      );
    } else {
      callPostApi(
        null,
        rUrl,
        rObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            setEquipmentId(responseData.id);
            setEquipmentData({
              ...equipmentData,
              equipmentId: responseData.id,
            });
            setViewOnlyTab({
              ...viewOnlyTab,
              productViewOnly: true,
            });
            handleSnack("success", "New Equipment Enrolled successfully.");
          } else {
            handleSnack("info", "Enrollment is unsuccessful.");
          }
        },
        (error) => {
          handleSnack("error", "Enrollment is unsuccessful.");
        }
      );
    }
  };

  // add update warranty
  const handleAddUpdateWarranty = () => {
    const rUrl = WARRANTY_MASTER_URL;
    const rObj = {
      ...warrantyRecord,
      dateOfInstall: warrantyRecord.dateOfInstall,
      dateOfSale: warrantyRecord.dateOfSale,
      equipmentId: equipmentId,
      warrantyTitle: yearlyWarrantyRecord.warrantyType?.value || "STANDARD",
      title: yearlyWarrantyRecord.warrantyType?.value || "STANDARD",
      //   yearlyWarrantyIds: [yearlyWarrrantyId],
      unit: "MONTHS",
    };
    if (warrantyId) {
      callPutApi(null, `${rUrl}/${warrantyId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          //   handleAddUpdateInstaller(warrantyId);
          handleAddUpdateYearlyWarranty(warrantyId);
        }
      });
    } else {
      callPostApi(null, rUrl, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setWarrantyId(responseData.warrantyId);
          handleAddUpdateYearlyWarranty(responseData.warrantyId);
          //   handleAddUpdateInstaller(responseData.warrantyId);
        }
      });
    }
  };

  // add update yearly-warranty
  const handleAddUpdateYearlyWarranty = (warrantyId) => {
    const rUrl = Warranty_Yearly_GetById_GET;
    const rObj = {
      ...yearlyWarrantyRecord,
      title:
        yearlyWarrantyRecord?.title ||
        yearlyWarrantyRecord.warrantyType?.value ||
        "STANDARD",
      warrantyType:
        yearlyWarrantyRecord.warrantyType?.value ||
        yearlyWarrantyRecord?.warrantyType ||
        "STANDARD",
      basis: "TIME",
      warrantyStartDate: yearlyWarrantyRecord.warrantyStartDate,
      warrantyEndDate: yearlyWarrantyRecord.warrantyEndDate,
      warrantyIds: [warrantyId],
    };
    if (yearlyWarrantyId) {
      callPutApi(null, `${rUrl}/${yearlyWarrantyId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          handleAddUpdateInstaller(warrantyId);
        }
      });
    } else {
      callPostApi(null, rUrl, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setYearlyWarrantyId(responseData.yearlyWarrantyId);
          handleAddUpdateInstaller(warrantyId);
        }
      });
    }
  };

  // add update installer
  const handleAddUpdateInstaller = (warrantyId) => {
    const rUrl = WARRANTY_INSTALLER_MASTER_URL;
    const rObj = {
      ...insatallerRecord,
      companyName: insatallerRecord.companyName,
      email: insatallerRecord.email,
      address: insatallerRecord.address,
      city: insatallerRecord.city,
      state: insatallerRecord.state,
      country: insatallerRecord.country,
      zipCode: insatallerRecord.zipCode,
      phoneNumber: insatallerRecord.phoneNumber,
      warrantyId: warrantyId,
    };
    if (installerId) {
      callPutApi(null, `${rUrl}/${installerId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          handleUpdateEquipmet(warrantyId);
        }
      });
    } else {
      callPostApi(null, rUrl, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setInstallerId(responseData.installerId);
          handleUpdateEquipmet(warrantyId);
        } else {
          handleSnack("error", "Warranty Regestration Failed");
        }
      });
    }
  };

  const handleGenerateWarranty = () => {
    handleAddUpdateWarranty();
  };

  const handleUpdateEquipmet = async (warrantyId) => {
    const rUrl = DATA_SVC_EQUIPMENT();
    const rObj = {
      ...equipmentRecordData,
      model: equipmentData.model,
      equipmentNumber: equipmentData.serialNo,
      makerSerialNumber: equipmentData.serialNo,
      currentClient: customerRecord.customerID,
      customer: customerRecord.customerName,
      customerId: customerRecord.id,
      addressDTO: customerRecord.addressId
        ? {
            id: customerRecord.addressId,
          }
        : null,
      purchaseDate: purchaseRecord.purchaseDate,
      placeOfPurchase: purchaseRecord.placeOfPurchase,
      usedFor: purchaseRecord.usedFor,
      usageCondition: purchaseRecord.usageConditions,
      warrantyId: `${warrantyId}`,
    };
    await callPutApi(
      null,
      `${rUrl}/${equipmentId}`,
      rObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          setViewOnlyTab({
            ...viewOnlyTab,
            warrantyViewOnly: true,
          });
          handleSnack("success", "Equipment updated successfully.");
        } else {
          handleSnack("info", "Equipment update is unsuccessful.");
        }
      },
      (error) => {
        handleSnack("error", "Equipment update is unsuccessful.");
      }
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Modal.Title className="mb-2">
          {recordId ? "Update " : "Registered New "}Equipment and Warranty
        </Modal.Title>
        <div className="card border px-2 py-1 mb-0">
          <Box className="mt-0" sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  onChange={(e, value) => setTabValue(value)}
                >
                  <Tab label="Product Data" value="productData" />
                  <Tab label="Warranty Data" value="warrantyData" />
                </TabList>
              </Box>
              <TabPanel
                value="productData"
                sx={{ paddingTop: recordId ? 0.3 : 1.5, paddingBottom: 1 }}
              >
                {recordId && (
                  <div
                    className="row my-2 mx-1"
                    style={{ justifyContent: "right" }}
                  >
                    <button
                      className="btn btn-primary text-white"
                      onClick={() =>
                        setViewOnlyTab({
                          ...viewOnlyTab,
                          productViewOnly: false,
                        })
                      }
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className="card border px-3 py-2 mb-3">
                  {viewOnlyTab.productViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="EQUIPMENT ID"
                          value={equipmentData.equipmentId}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="MODEL"
                          value={equipmentData.model}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SERIAL NUMBER"
                          value={equipmentData.serialNo}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              EQUIPMENT ID
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="equipmentId"
                              placeholder="Equipment Id"
                              value={equipmentData.equipmentId}
                              disabled
                              onChange={handleEquipmentFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MODEL
                            </label>
                            {/* <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="model"
                              placeholder="Model Number"
                              value={equipmentData.model}
                              onChange={handleEquipmentFieldsChange}
                            /> */}
                            <SearchBox
                              value={equipmentData.model}
                              onChange={(e) =>
                                handleMachineSearch("model", e.target.value)
                              }
                              type="model"
                              result={searchModelResults}
                              onSelect={handleModelSelect}
                              noOptions={noOptionsModel}
                              placeholder="Model Number"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SERIAL NUMBER
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              name="serialNo"
                              placeholder="Serial Number"
                              value={equipmentData.serialNo}
                              onChange={handleEquipmentFieldsChange}
                            />
                            {/* <SearchBox
                      value={machineData.serialNo}
                      onChange={(e) =>
                        handleMachineSearch("serialNo", e.target.value)
                      }
                      type="equipmentNumber"
                      result={searchSerialResults}
                      onSelect={handleModelSelect}
                      noOptions={noOptionsSerial}
                    /> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <h5>Customer Details</h5>
                <div className="card border px-3 py-2 mb-3">
                  {viewOnlyTab.productViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="CUSTOMER ID"
                          value={customerRecord.customerID}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="CUSTOMER NAME"
                          value={customerRecord.customerName}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="ADDRESS"
                          value={customerRecord.address}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="CITY"
                          value={customerRecord.city}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="STATE"
                          value={customerRecord.state}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="ZIP CODE"
                          value={customerRecord.zipCode}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="CONTACT EMAIL"
                          value={customerRecord.contactEmail}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="PHONE NUMBER"
                          value={customerRecord.contactPhone}
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER ID
                            </label>
                            <SearchBox
                              value={customerRecord.customerID}
                              onChange={(e) =>
                                handleCustSearch("customerId", e.target.value)
                              }
                              type="customerId"
                              result={searchCustResults}
                              onSelect={handleCustSelect}
                              noOptions={noOptionsCust}
                              placeholder="Customer Id"
                            />
                            {/* <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.customerId}
                              name="customerId"
                              placeholder="Customer Id"
                              onChange={handleCustomerFieldsChange}
                            /> */}
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER NAME
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.customerName}
                              name="customerName"
                              placeholder="Customer Name"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ADDRESS
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.address}
                              name="address"
                              placeholder="Address"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CITY
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.city}
                              name="city"
                              placeholder="City"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              STATE
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.state}
                              name="state"
                              placeholder="State"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ZIP CODE
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.zipCode}
                              name="zipCode"
                              placeholder="Zip Code"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CONTACT EMAIL
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.contactEmail}
                              name="contactEmail"
                              placeholder="Email"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PHONE NUMBER
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.contactPhone}
                              name="contactPhone"
                              placeholder="Phone Number"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <h5>Purchase Data</h5>
                <div className="card border px-3 py-2 mb-0">
                  {viewOnlyTab.productViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="PURCHASE DATE"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {purchaseRecord.purchaseDate}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="PLACE OF PURCHASE"
                          value={purchaseRecord.placeOfPurchase}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="ATTACH PROOF"
                          value={purchaseRecord.attachProof}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="USED FOR"
                          value={purchaseRecord.usedFor}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="USAGE CONDITIONS"
                          value={purchaseRecord.usageConditions}
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PURCHASE DATE
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalData.estimationDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={purchaseRecord.purchaseDate}
                                  onChange={(e) =>
                                    setPurchaseRecord({
                                      ...purchaseRecord,
                                      purchaseDate: e,
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
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PLACE OF PURCHASE
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={purchaseRecord.placeOfPurchase}
                              name="placeOfPurchase"
                              placeholder="Place of purchase"
                              onChange={handlePurchaseFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ATTACH PROOF
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={purchaseRecord.attachProof}
                              name="attachProof"
                              placeholder="Attach Proof"
                              onChange={handlePurchaseFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              USED FOR
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={purchaseRecord.usedFor}
                              name="usedFor"
                              placeholder="Used For"
                              onChange={handlePurchaseFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              USAGE CONDITIONS
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={purchaseRecord.usageConditions}
                              name="usageConditions"
                              placeholder="Usage Conditions"
                              onChange={handlePurchaseFieldsChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="row mt-2 mb-0"
                  style={{ justifyContent: "right" }}
                >
                  {!viewOnlyTab.productViewOnly && (
                    <button
                      className="btn btn-primary text-white"
                      onClick={handleAddUpdateEquipment}
                    >
                      {equipmentId ? "Update Equipment" : "Register Equipment"}
                    </button>
                  )}
                  <button
                    className="btn btn-primary text-white mx-2"
                    onClick={() => setTabValue("warrantyData")}
                  >
                    Next
                  </button>
                </div>
              </TabPanel>
              <TabPanel
                value="warrantyData"
                sx={{ paddingTop: recordId ? 0.3 : 1.5, paddingBottom: 1 }}
              >
                {recordId && (
                  <div
                    className="row my-2 mx-1"
                    style={{ justifyContent: "right" }}
                  >
                    <button
                      className="btn btn-primary text-white"
                      onClick={() =>
                        setViewOnlyTab({
                          ...viewOnlyTab,
                          warrantyViewOnly: false,
                        })
                      }
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className="card border px-3 py-2 mb-3">
                  {viewOnlyTab.warrantyViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="EQUIPMENT ID"
                          value={equipmentData.equipmentId}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="MODEL"
                          value={equipmentData.model}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SERIAL NUMBER"
                          value={equipmentData.serialNo}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              EQUIPMENT ID
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="equipmentId"
                              placeholder="Equipment Id"
                              value={equipmentData.equipmentId}
                              onChange={handleEquipmentFieldsChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MODEL
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="model"
                              placeholder="Model Number"
                              value={equipmentData.model}
                              onChange={handleEquipmentFieldsChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SERIAL NUMBER
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="serialNo"
                              placeholder="Serial Number"
                              value={equipmentData.serialNo}
                              onChange={handleEquipmentFieldsChange}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <h5>Installer Details</h5>
                <div className="card border px-3 py-2 mb-3">
                  {viewOnlyTab.warrantyViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="INSTALLER NAME"
                          value={insatallerRecord.companyName}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="ADDRESS"
                          value={insatallerRecord.address}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="CITY"
                          value={insatallerRecord.city}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="STATE"
                          value={insatallerRecord.state}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="ZIP CODE"
                          value={insatallerRecord.zipCode}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="COUNTRY"
                          value={insatallerRecord.country}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="CONTACT EMAIL"
                          value={insatallerRecord.email}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="PHONE NUMBER"
                          value={insatallerRecord.phoneNumber}
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              INSTALLER NAME
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.companyName}
                              name="companyName"
                              placeholder="Insataller Name"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ADDRESS
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.address}
                              name="address"
                              placeholder="Address"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CITY
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.city}
                              name="city"
                              placeholder="City"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              STATE
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.state}
                              name="state"
                              placeholder="State"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ZIP CODE
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.zipCode}
                              name="zipCode"
                              placeholder="Zip Code"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              COUNTRY
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.country}
                              name="country"
                              placeholder="Country"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CONTACT EMAIL
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.email}
                              name="email"
                              placeholder="Email Address"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PHONE NUMBER
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.phoneNumber}
                              name="phoneNumber"
                              placeholder="Phone Number"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <h5>Warranty Data</h5>
                <div className="card border px-3 py-2 mb-0">
                  {viewOnlyTab.warrantyViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="WARRANTY TYPE"
                          value={yearlyWarrantyRecord.warrantyType?.label}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="WARRANTY VALID FROM"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {yearlyWarrantyRecord.warrantyStartDate}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="WARRANTY VALID TO"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {yearlyWarrantyRecord.warrantyEndDate}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="DATE OF INSTALL"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {warrantyRecord.dateOfInstall}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="DATE OF SALE"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {warrantyRecord.dateOfSale}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              WARRANTY TYPE
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setYearlyWarrantyRecord({
                                  ...yearlyWarrantyRecord,
                                  warrantyType: e,
                                })
                              }
                              options={warrantyTypeOptions}
                              value={yearlyWarrantyRecord.warrantyType}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              WARRANTY VALID FROM
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalData.estimationDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={yearlyWarrantyRecord.warrantyStartDate}
                                  onChange={(e) =>
                                    setYearlyWarrantyRecord({
                                      ...yearlyWarrantyRecord,
                                      warrantyStartDate: e,
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              WARRANTY VALID TO
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalData.estimationDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={yearlyWarrantyRecord.warrantyEndDate}
                                  onChange={(e) =>
                                    setWarrantyRecord({
                                      ...yearlyWarrantyRecord,
                                      warrantyEndDate: e,
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              DATE OF INSTALL
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalData.estimationDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={warrantyRecord.dateOfInstall}
                                  onChange={(e) =>
                                    setWarrantyRecord({
                                      ...warrantyRecord,
                                      dateOfInstall: e,
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              DATE OF SALE
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalData.estimationDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={warrantyRecord.dateOfSale}
                                  onChange={(e) =>
                                    setWarrantyRecord({
                                      ...warrantyRecord,
                                      dateOfSale: e,
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
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="row mt-2 mb-0"
                  style={{ justifyContent: "right" }}
                >
                  {!viewOnlyTab.warrantyViewOnly && (
                    <button
                      className="btn btn-primary text-white"
                      onClick={handleGenerateWarranty}
                    >
                      {recordId ? "Update Warranty" : "Register Warranty"}
                    </button>
                  )}
                  <button
                    className="btn btn-primary text-white mx-2"
                    onClick={hideModal}
                  >
                    Close
                  </button>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EquipmentEnrollModal;
