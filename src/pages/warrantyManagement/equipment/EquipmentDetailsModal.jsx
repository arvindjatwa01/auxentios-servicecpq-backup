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

import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import SearchBox from "pages/Common/SearchBox";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { machineSearch } from "../../../services/searchServices";
import { warrantyTypeOptions } from "../warrantyManagementConstants";
import { Get_Equipment_Datails_By_Id_GET } from "../../../services/CONSTANTS";
import { callGetApi } from "../../../services/ApiCaller";
import { API_SUCCESS } from "../../../services/ResponseCode";

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
  insatallerNamer: "",
  address1: "",
  address2: "",
  zipCode: "",
  country: "",
};

const warrantyObj = {
  warrantyType: "",
  warrantyValidFrom: new Date(),
  warrantyValidTo: new Date(),
  dateOfInstall: new Date(),
  dateOfSale: new Date(),
};

const EquipmentDetailsModal = ({
  show,
  handleClose,
  handleSnack,
  recordId = null,
}) => {
  const [tabValue, setTabValue] = useState("productData");

  const [equipmentData, setEquipmentData] = useState({
    ...equipmentObj,
  });

  const [customerRecord, setCustomerRecord] = useState({
    ...customerRequestObj,
  });

  const [purchaseRecord, setPurchaseRecord] = useState({ ...purchaseObj });
  const [insatallerRecord, setInsatallerRecord] = useState({ ...insatllerObj });
  const [warrantyRecord, setWarrantyRecord] = useState({ ...warrantyObj });

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
      const rUrl = `${Get_Equipment_Datails_By_Id_GET}${recordId}`;
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;

            setEquipmentData({
              ...equipmentData,
              equipmentId: responseData.id,
              model: responseData.model,
              serialNo: responseData.equipmentNumber,
            });

            setCustomerRecord({
              ...customerRecord,
              customerId: responseData.currentClient,
              customerName: responseData.customer,
              email: "www.mtgibsoniron.com.au",
              address: responseData.addressDTO["fullAddress"],
              city: responseData.addressDTO["district"],
              state: responseData.addressDTO["regionOrState"],
              // zipCode: responseData.addressDTO["fullAddress"],
              country: responseData.addressDTO["country"],
              // address:
              //   "L 12, Kings Park Rd, West Perth, WESTERN AUSTRALIA, 6005 Australia",
              // city: "Kings Park Rd",
              // state: "West Perth",
              // country: "AUSTRALIA",
              zipCode: "6005",
              phoneNumber: "+619658632420",
            });
          } else {
          }
        },
        (error) => {}
      );
    }
    if (recordId) {
      setViewOnlyTab({
        productViewOnly: true,
        warrantyViewOnly: true,
      });

      setEquipmentData({
        ...equipmentData,
        equipmentId: "ZMX00507",
        model: "992K",
        serialNo: "ZMX00507",
      });

      setCustomerRecord({
        ...customerRecord,
        customerId: "101211",
        customerName: "KOOLAN IRON ORE PTY LTD",
        email: "www.mtgibsoniron.com.au",
        address:
          "L 12, Kings Park Rd, West Perth, WESTERN AUSTRALIA, 6005 Australia",
        city: "Kings Park Rd",
        state: "West Perth",
        country: "AUSTRALIA",
        zipCode: "6005",
        phoneNumber: "+619658632420",
      });

      setPurchaseRecord({
        ...purchaseRecord,
        purchaseDate: "12/11/2023",
        placeOfPurchase: "AUSTRALIA",
        usageConditions: "Remote",
      });

      setWarrantyRecord({
        ...warrantyRecord,
        warrantyType: { label: "Standard", value: "STANDARD" },
        warrantyValidFrom: "12/01/2024",
        warrantyValidTo: "11/01/2026",
        dateOfInstall: "12/01/2024",
        dateOfSale: "11/01/2024",
      });
    }
  }, [recordId]);

  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

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

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Body>
        <Modal.Title className="mb-2">
          {recordId ? "Update " : "Registered New "}Equipment and Warranty
        </Modal.Title>
        <div className="card border px-2 py-1">
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
                sx={{ paddingTop: recordId ? 0.3 : 1.5 }}
              >
                {recordId && (
                  <div className="row my-2">
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
                          label="Equipment Id"
                          value={equipmentData.equipmentId}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="Model"
                          value={equipmentData.model}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="Serial Number"
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
                              Equipment Id
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="equipmentId"
                              placeholder="Equipment Id"
                              value={equipmentData.equipmentId}
                              onChange={handleEquipmentFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              Model
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="model"
                              placeholder="Model Number"
                              value={equipmentData.model}
                              onChange={handleEquipmentFieldsChange}
                            />
                            {/* <SearchBox
                        value={machineData.model}
                        onChange={(e) =>
                          handleMachineSearch("model", e.target.value)
                        }
                        type="model"
                        result={searchModelResults}
                        onSelect={handleModelSelect}
                        noOptions={noOptionsModel}
                        placeholder="Model Number"
                      /> */}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              Serial Number
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="serialNo"
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
                          label="Customer Id"
                          value={customerRecord.customerId}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Customer Name"
                          value={customerRecord.customerName}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Address"
                          value={customerRecord.address}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="City"
                          value={customerRecord.city}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="State"
                          value={customerRecord.state}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Zip Code"
                          value={customerRecord.zipCode}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Contact Email"
                          value={customerRecord.email}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Phone Number"
                          value={customerRecord.phoneNumber}
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Customer Id
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.customerId}
                              name="customerId"
                              placeholder="Customer Id"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Customer Name
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Address
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              City
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              State
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Zip Code
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Contact Email
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.email}
                              name="email"
                              placeholder="Email"
                              onChange={handleCustomerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={customerRecord.phoneNumber}
                              name="phoneNumber"
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
                          label="Purchase Date"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {purchaseRecord.purchaseDate}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Place of Purchase"
                          value={purchaseRecord.placeOfPurchase}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Attach Proof"
                          value={purchaseRecord.attachProof}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Used For"
                          value={purchaseRecord.usedFor}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Usage Conditions"
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Purchase Date
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Place of Purchase
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Attach Proof
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Used For
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Usage Conditions
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
                    <button className="btn btn-primary text-white">
                      {recordId ? "Update Equipment" : "Register Equipment"}
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
                sx={{ paddingTop: recordId ? 0.3 : 1.5 }}
              >
                {recordId && (
                  <div className="row my-2">
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
                          label="Equipment Id"
                          value={equipmentData.equipmentId}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="Model"
                          value={equipmentData.model}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="Serial Number"
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
                              Equipment Id
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="equipmentId"
                              placeholder="Equipment Id"
                              value={equipmentData.equipmentId}
                              onChange={handleEquipmentFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              Model
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="model"
                              placeholder="Model Number"
                              value={equipmentData.model}
                              onChange={handleEquipmentFieldsChange}
                            />
                            {/* <SearchBox
                        value={machineData.model}
                        onChange={(e) =>
                          handleMachineSearch("model", e.target.value)
                        }
                        type="model"
                        result={searchModelResults}
                        onSelect={handleModelSelect}
                        noOptions={noOptionsModel}
                        placeholder="Model Number"
                      /> */}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              Serial Number
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="serialNo"
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
                <h5>Installer Details</h5>
                <div className="card border px-3 py-2 mb-3">
                  {viewOnlyTab.warrantyViewOnly ? (
                    <>
                      <div className="row mt-2">
                        <ReadOnlyField
                          label="Installer Name"
                          value={insatallerRecord.insatallerNamer}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Address 1"
                          value={insatallerRecord.address1}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Address 2"
                          value={insatallerRecord.address2}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Zip Code"
                          value={insatallerRecord.zipCode}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Country"
                          value={insatallerRecord.country}
                          className="col-md-3 col-sm-3"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row mt-2 input-fields">
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Insataller Name
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.insatallerNamer}
                              name="insatallerName"
                              placeholder="Insataller Name"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Address 1
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.address1}
                              name="address1"
                              placeholder="Address 1"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Address 2
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={insatallerRecord.address2}
                              name="address2"
                              placeholder="Address 2"
                              onChange={handleInsatllerFieldsChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Zip Code
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Country
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
                          label="Warranty Type"
                          value={warrantyRecord.warrantyType?.label}
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Warranty Valid From"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {warrantyRecord.warrantyValidFrom}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Warranty Valid Tp"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {warrantyRecord.warrantyValidTo}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Date of Insatall"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {warrantyRecord.dateOfInstall}
                            </Moment>
                          }
                          className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                          label="Date of Sale"
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Type
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setWarrantyRecord({
                                  ...warrantyRecord,
                                  warrantyType: e,
                                })
                              }
                              options={warrantyTypeOptions}
                              value={warrantyRecord.warrantyType}
                              styles={FONT_STYLE_SELECT}
                            />
                            {/* <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={insatallerRecord.insatallerNamer}
                        name="insatallerName"
                        placeholder="Insataller Name"
                        onChange={handleInsatllerFieldsChange}
                      /> */}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Valid From
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
                                  value={warrantyRecord.warrantyValidFrom}
                                  onChange={(e) =>
                                    setWarrantyRecord({
                                      ...warrantyRecord,
                                      warrantyValidFrom: e,
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Valid To
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
                                  value={warrantyRecord.warrantyValidTo}
                                  onChange={(e) =>
                                    setWarrantyRecord({
                                      ...warrantyRecord,
                                      warrantyValidTo: e,
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Date of Install
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
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Date of Sale
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
                    <button className="btn btn-primary text-white">
                      {recordId ? "Update Warranty" : "Register Warranty"}
                    </button>
                  )}
                  <button
                    className="btn btn-primary text-white mx-2"
                    onClick={handleClose}
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

export default EquipmentDetailsModal;
