import React, { useState } from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import TextField from "@mui/material/TextField";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Select from "react-select";
import Moment from "react-moment";

import { isEmpty } from "pages/Common/textUtilities";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { CLAIM_ORDER_MASTER_URL } from "services/CONSTANTS";
import { callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { customerSearch, machineSearch } from "services/searchServices";
import SearchBox from "pages/Common/SearchBox";

const ClaimOrderDetails = (props) => {
    const {
        claimOrderId,
        returnDetailsTab,
        setReturnDetailsTab,
        viewOnlyTab,
        setViewOnlyTab,
        setRequestTab,
        generalData,
        setGeneralData,
        reference,
        setReference,
        estimationData,
        setEstimationData,
        customerData,
        setCustomerData,
        machineData,
        setMachineData,
        handleSnack,
        claimStatusOptions,
        claimStatus,
        setClaimStatus,
        warrantyData,
        setClaimOrderId,
        claimNumber,
        setClaimNumber,
        claimOrderData,
        handleAddUpdateClaimOrder,
        warrantyId,
        warrantyTitle,
        authorizationCode,
    } = props;

    const [searchCustResults, setSearchCustResults] = useState([]);
    const [noOptionsCust, setNoOptionsCust] = useState(false);
    const [searchModelResults, setSearchModelResults] = useState([]);
    const [noOptionsModel, setNoOptionsModel] = useState(false);
    const [searchSerialResults, setSearchSerialResults] = useState([]);
    const [noOptionsSerial, setNoOptionsSerial] = useState(false);

    // Individual genral tab >> request details select fields change
    const handleGeneralSelectFieldChange = (e, keyName) => {
        setGeneralData({ ...generalData, [keyName]: e });
    };

    // Individual genral tab >> request details field value chnage
    const handleGeneralInputFieldChange = (e) => {
        const { name, value } = e.target;
        setGeneralData({ ...generalData, [name]: value });
    };

    //Individual estimation details  >> request details field value change
    const handleEstimationDataChange = (e) => {
        const { name, value } = e.target;
        setEstimationData({ ...estimationData, [name]: value });
    };

    //Individual customer field value change
    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
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
                    handleSnack(
                        "error",
                        "Error occurred while searching the customer!"
                    );
                });
        }
    };

    // Select the customer from search result
    const handleCustSelect = (type, currentItem) => {
        setCustomerData({
            ...customerData,
            customerID: currentItem.customerId,
            customerName: currentItem.fullName,
            contactEmail: currentItem.email,
        });
        setSearchCustResults([]);
    };

    //Individual machine field value change
    const handleMachineDataChange = (e) => {
        const { name, value } = e.target;
        setMachineData({ ...machineData, [name]: value });
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
                    ? `model:${machineData.model} AND makerSerialNumber~` +
                      searchText
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
                    handleSnack(
                        "error",
                        "Error occurred while searching the machine!"
                    );
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
        } else if (type === "makerSerialNumber") {
            setMachineData({
                ...machineData,
                make: currentItem.maker,
                model: currentItem.model,
                serialNo: currentItem.makerSerialNumber,
                smu: currentItem.sensorId,
                fleetNo: currentItem.stockNumber,
                // warrantyId: currentItem.warrantyId,
                equipmentNumber: currentItem.equipmentNumber,
            });
            setCustomerData({
                ...customerData,
                customerID: currentItem.currentClient,
                customerName: currentItem.customer,
            });
            setSearchSerialResults([]);
        }
    };

    // view general tab details
    const viewGeneralDetails = () => {
        return (
            <>
                {!viewOnlyTab.generalViewOnly ? (
                    <>
                        <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WARRANTY ID
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="form-control border-radius-10 text-primary"
                                        id="warrantyId"
                                        // value={warrantyData?.warrantyId}
                                        value={warrantyId}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CLAIM REQUEST ID
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="form-control border-radius-10 text-primary"
                                        id="warrantyRequestId"
                                        value={claimOrderId}
                                        // value={claimRecordDetail?.claimNumber}
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
                                        name="description"
                                        maxLength={140}
                                        value={generalData.description}
                                        onChange={handleGeneralInputFieldChange}
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
                                        name="reference"
                                        // maxLength={140}
                                        // value={generalData.reference}
                                        value={reference}
                                        onChange={(e) =>
                                            setReference(e.target.value)
                                        }
                                        // onChange={handleGeneralInputFieldChange}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        <span className=" mr-2">
                                            WARRANTY REQUEST DATE
                                        </span>
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                minDate={
                                                    generalData.claimRequestDate
                                                }
                                                maxDate={new Date()}
                                                closeOnSelect
                                                value={
                                                    generalData.claimRequestDate
                                                }
                                                onChange={(e) =>
                                                    setGeneralData({
                                                        ...generalData,
                                                        claimRequestDate: e,
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
                                        AUTHORIZATION CODE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="reference"
                                        // maxLength={140}
                                        value={authorizationCode}
                                        disabled
                                    />
                                </div>
                            </div>
                            {/* <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WARRANTY REQUEST STATUS
                                    </label>
                                    <Select
                                        // defaultValue={selectedOption}
                                        onChange={(e) => {
                                            setGeneralData({
                                                ...generalData,
                                                warrantyClaimStatus: e,
                                            });
                                            setClaimStatus(e);
                                        }}
                                        options={claimStatusOptions}
                                        // value={
                                        //     generalData.warrantyClaimStatus
                                        // }
                                        value={claimStatus}
                                        styles={FONT_STYLE_SELECT}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div
                            className="row"
                            style={{
                                justifyContent: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                disabled={
                                    !generalData.description || !reference
                                    // !generalData.reference
                                }
                                id="general"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Save & Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="WARRANTY ID"
                                value={warrantyData?.warrantyId}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="CLAIM REQUEST ID"
                                // label="WARRANTY REQUEST ID"
                                // value={generalData.estimationNo}
                                value={claimOrderId}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="DESCRIPTION"
                                value={generalData.description}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="REFERENCE"
                                value={reference}
                                // value={generalData.reference}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="WARRANTY REQUEST DATE"
                                // value={
                                //     "NA"
                                // }
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {generalData.claimRequestDate}
                                    </Moment>
                                }
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="AUTHORIZATION CODE"
                                value={authorizationCode}
                                className="col-md-4 col-sm-4"
                            />
                            {/* <ReadOnlyField
                            label="WARRANTY REQUEST STATUS"
                            // value={
                            //     generalData
                            //         .warrantyClaimStatus
                            //         ?.label
                            // }
                            value={claimStatus?.label}
                            className="col-md-4 col-sm-4"
                        /> */}
                        </div>
                        <div
                            className="row"
                            style={{ justifyContent: "right" }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                id="general"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    };

    // view estimation tab details
    const viewEstimationDetails = () => {
        return (
            <>
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
                            {/* <div className="col-md-6 col-sm-6">
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
                                        </div> */}
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        PREPARED ON
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // minDate={
                                                //   estimationData.preparedOn
                                                // }
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={
                                                    estimationData.preparedOn
                                                }
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
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                minDate={
                                                    estimationData.revisedOn
                                                }
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
                        </div>
                        <div
                            className="row"
                            style={{
                                justifyContent: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                disabled={
                                    !estimationData.preparedBy ||
                                    !estimationData.preparedOn
                                }
                                id="estimate"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Save & Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="PREPARED BY"
                                value={estimationData.preparedBy}
                                className="col-md-4 col-sm-4"
                            />
                            {/* <ReadOnlyField
                                        label="APPROVED BY"
                                        value={estimationData.approvedBy}
                                        className="col-md-4 col-sm-4"
                                      /> */}

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
                        </div>
                        <div
                            className="row"
                            style={{ justifyContent: "right" }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                id="estimation"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    };

    // view customer tab details
    const viewCustomerDetails = () => {
        return (
            <>
                {!viewOnlyTab.custViewOnly ? (
                    <>
                        <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CUSTOMER ID
                                    </label>
                                    <SearchBox
                                        value={customerData.customerID}
                                        onChange={(e) =>
                                            handleCustSearch(
                                                "customerId",
                                                e.target.value
                                            )
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
                                    {/* <div className="css-w8dmq8">*Mandatory</div> */}
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
                        </div>
                        <div
                            className="row"
                            style={{
                                justifyContent: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                // disabled={
                                //     customerData.contactEmail &&
                                //     (noOptionsCust ||
                                //         searchCustResults.length !== 0)
                                // }
                                id="customer"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Save & Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row mt-3">
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
                                label="CONTACT PHONE"
                                value={customerData.contactPhone}
                                className="col-md-4 col-sm-4"
                            />
                        </div>
                        <div
                            className="row"
                            style={{ justifyContent: "right" }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                id="customer"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    };

    // view Machine tab details
    const viewMachineDetails = () => {
        return (
            <>
                {!viewOnlyTab.machineViewOnly ? (
                    <>
                        <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        MAKE
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
                            {/* <div className="col-md-6 col-sm-6">
                                          <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                              FAMILY
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
                                        </div> */}
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        MODEL
                                    </label>
                                    <SearchBox
                                        value={machineData.model}
                                        onChange={(e) =>
                                            handleMachineSearch(
                                                "model",
                                                e.target.value
                                            )
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
                                            handleMachineSearch(
                                                "serialNo",
                                                e.target.value
                                            )
                                        }
                                        type="makerSerialNumber"
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
                        </div>
                        <div
                            className="row"
                            style={{
                                justifyContent: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                disabled={
                                    !(
                                        machineData.model &&
                                        machineData.serialNo
                                    ) ||
                                    noOptionsModel ||
                                    noOptionsSerial
                                }
                                id="machine"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Save & Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="MAKE"
                                value={machineData.make}
                                className="col-md-4 col-sm-4"
                            />
                            {/* <ReadOnlyField
                                        label="FAMILY"
                                        value={machineData.family}
                                        className="col-md-4 col-sm-4"
                                      /> */}
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
                        </div>
                        <div
                            className="row"
                            style={{ justifyContent: "right" }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                id="machine"
                                onClick={handleAddUpdateClaimOrder}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    };

    return (
        <div
            className={`card border`}
            // style={{
            //     backgroundColor: `${
            //         claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
            //     }`,
            // }}
        >
            <Box
                className="mt-0"
                sx={{
                    width: "100%",
                    typography: "body1",
                    backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`,
                }}
            >
                <TabContext value={returnDetailsTab}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            backgroundColor: "#f8f8f8",
                        }}
                    >
                        <TabList
                            className="custom-tabs-div"
                            sx={{ paddingX: 2 }}
                            onChange={(e, value) => setReturnDetailsTab(value)}
                        >
                            <Tab label="GENERAL DETAILS" value="general" />
                            <Tab
                                label="ESTIMATION DETAILS"
                                value="estimation"
                            />
                            <Tab label="CUSTOMER" value="customer" />
                            <Tab label="MACHINE" value="machine" />
                        </TabList>
                    </Box>
                    <TabPanel value={returnDetailsTab}>
                        {returnDetailsTab === "general" && viewGeneralDetails()}
                        {returnDetailsTab === "estimation" &&
                            viewEstimationDetails()}
                        {returnDetailsTab === "customer" &&
                            viewCustomerDetails()}
                        {returnDetailsTab === "machine" && viewMachineDetails()}
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default ClaimOrderDetails;
