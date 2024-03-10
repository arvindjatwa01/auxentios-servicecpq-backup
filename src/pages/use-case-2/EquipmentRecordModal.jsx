import React, { useState } from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { Modal } from "react-bootstrap";
import SearchBox from "pages/Repair/components/SearchBox";
import { machineSearch } from "services/searchServices";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { TextField } from "@mui/material";
import { warrantyTypeOptions } from "pages/WarrantyMaster/CheckWarranty/claimWarrantyConstants";
import Select from "react-select";

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

const EquipmentRecordModal = ({ show, handleClose, handleSnack }) => {
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
        <Box className="mt-1" sx={{ width: "100%", typography: "body1" }}>
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
            <TabPanel value="productData">
              <div className="card border px-3 py-3">
                <div className="row input-fields">
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
                        // value={claimDetails.claimNumber}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
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
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        SERIAL NUMBER
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
                    </div>
                  </div>
                </div>
              </div>
              <h6>CUSTOMER DETAILS</h6>
              <div className="card border px-3 py-3">
                <div className="row mt-2 input-fields">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
              </div>
              <h6>PURCHASE DATA</h6>
              <div className="card border px-3 py-3">
                <div className="row mt-2 input-fields">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        PURCHASE DATE
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        USED FOR
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={customerRecord.usedFor}
                        name="usedFor"
                        placeholder="Used For"
                        onChange={handlePurchaseFieldsChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        USAGE CONDITIONS
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={customerRecord.usageConditions}
                        name="usageConditions"
                        placeholder="Usage Conditions"
                        onChange={handlePurchaseFieldsChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="warrantyData">
              <div className="card border px-3 py-3">
                <div className="row input-fields">
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
                        // value={claimDetails.claimNumber}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
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
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        SERIAL NUMBER
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
                    </div>
                  </div>
                </div>
              </div>
              <h6>INSATALLER DETAILS</h6>
              <div className="card border px-3 py-3">
                <div className="row mt-2 input-fields">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        INSATALLER NAME
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
                        ADDRESS 1
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
                        ADDRESS 2
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
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                </div>
              </div>
              <h6>WARRANTY DATA</h6>
              <div className="card border px-3 py-3">
                <div className="row mt-2 input-fields">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        WARRANTY TYPE
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
                        WARRANTY VALID FROM
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                        WARRANTY VALID TO
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                        DATE OF INSATALL
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                        DATE OF SALE
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default EquipmentRecordModal;
