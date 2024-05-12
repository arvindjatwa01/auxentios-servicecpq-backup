import React, { useEffect, useState } from "react";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Tab,
    Tooltip,
    TextField,
    FormControlLabel,
    FormGroup,
    Switch,
} from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import {
    claimRequestObj,
    claimRequestTypeOptions,
    questionsOptions,
} from "../warrantyManagementConstants";
import SearchBox from "pages/Common/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { CLAIM_MASTER_URL } from "services/CONSTANTS";

const WarrantyRequestAuthorization = ({
    show,
    hideModal,
    handleSnack,
    pwaNumber,
    warrantyRequestType = "",
    claimRecordId,
    handleGoBackToQurestionsModal,
}) => {
    const [tabValue, setTabValue] = useState("generalRequest");

    const [recordData, setRecordData] = useState({
        ...claimRequestObj,
        claimType: warrantyRequestType || "",
        claiment: "",
        climentDetails: "",
        requestDescription: "",
        make: "",
        usedFor: "",
        usageCondition: "",
    });

    const [noOptionsModel, setNoOptionsModel] = useState(false);
    const [noOptionsSerial, setNoOptionsSerial] = useState(false);
    const [searchModelResults, setSearchModelResults] = useState([]);
    const [searchSerialResults, setSearchSerialResults] = useState([]);

    const [searchCustResults, setSearchCustResults] = useState([]);
    const [noOptionsCust, setNoOptionsCust] = useState(false);

    useEffect(() => {
        if (claimRecordId) {
            const rUrl = `${CLAIM_MASTER_URL}/${claimRecordId}`;
            callGetApi(rUrl, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;

                    // request type
                    const _claimType = claimRequestTypeOptions.find(
                        (obj) => obj.value === responseData.claimType
                    );

                    setRecordData({
                        ...recordData,
                        ...responseData,
                        claimType: _claimType,
                    });
                    console.log("responsr Data ::", responseData);
                }
            });
        }
    }, [claimRecordId]);

    // select option change
    const handleSelectChange = (e, keyName) => {
        setRecordData({ ...recordData, [keyName]: e });
    };

    // select option change
    const handleInputTextChange = (e) => {
        const { name, value } = e.target;
        setRecordData({ ...recordData, [name]: value });
    };

    // Machine search based on model and serial number
    const handleMachineSearch = async (searchMachinefieldName, searchText) => {
        let searchQueryMachine = "";
        setSearchModelResults([]);
        setSearchSerialResults([]);

        if (searchMachinefieldName === "model") {
            recordData.modelNumber = searchText;
            searchQueryMachine = searchText
                ? searchMachinefieldName + "~" + searchText
                : "";
        } else if (searchMachinefieldName === "serialNo") {
            recordData.serialNumber = searchText;
            searchQueryMachine = searchText
                ? recordData.modelNumber
                    ? `model:${recordData.modelNumber} AND equipmentNumber~` +
                      searchText
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
            setRecordData({
                ...recordData,
                modelNumber: currentItem.model,
                make: currentItem.maker,
                // equipmentId: currentItem.id,
            });
            setSearchModelResults([]);
        } else if (type === "equipmentNumber") {
            setRecordData({
                ...recordData,
                serialNumber: currentItem.equipmentNumber,
                // equipmentId: currentItem.id,
            });
            setSearchSerialResults([]);
        }
    };

    // Search Customer with customer ID
    const handleCustSearch = async (searchCustfieldName, searchText) => {
        setSearchCustResults([]);
        recordData.customerNumber = searchText;
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
        setRecordData({
            ...recordData,
            // id: currentItem.id,
            customerNumber: currentItem.customerId,
            customerName: currentItem.fullName,
            // address: currentItem.addressDTO?.fullAddress,
            // city: currentItem.addressDTO?.district,
            // state: currentItem.addressDTO?.regionOrState,
            // zipCode: currentItem.addressDTO?.zipCode,
            // email: currentItem.email,
            // addressId: currentItem.addressDTO?.id,
        });
        setSearchCustResults([]);
    };

    // click on Save and Next button
    const handleClickSaveBtn = (e) => {
        const { id } = e.target;
        const rObj = {
            ...recordData,
            claimType:
                recordData.claimType?.value || recordData.claimType || "EMPTY",
            claiment:
                recordData.claiment?.value || recordData.claiment || "EMPTY",
            usedFor: recordData.usedFor?.value || recordData.usedFor || "EMPTY",
            usageCondition:
                recordData.usageCondition?.value ||
                recordData.usageCondition ||
                "EMPTY",
        };
        if (claimRecordId) {
            const rUrl = `${CLAIM_MASTER_URL}/${claimRecordId}`;
            callPutApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    if (id === "generalRequest") {
                        setTabValue("machine");
                    } else if (id === "machine") {
                        setTabValue("customer");
                    } else if (id === "customer") {
                        handleGoBackToQurestionsModal();
                    }
                }
            });
        } else {
            const rUrl = `${CLAIM_MASTER_URL}`;
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        `Authorization code ${responseData.authorizationCode} created successfully.`
                    );
                    if (id === "generalRequest") {
                        setTabValue("machine");
                    } else if (id === "machine") {
                        setTabValue("customer");
                    } else if (id === "customer") {
                        handleGoBackToQurestionsModal();
                    }
                }
            });
        }
    };

    // General tab
    const viewGereralTabData = () => {
        return (
            <>
                <div className="card border px-3 py-2 mb-3">
                    <div className="row input-fields">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    REQUEST TYPE
                                </label>
                                <Select
                                    onChange={(e) =>
                                        handleSelectChange(e, "claimType")
                                    }
                                    options={claimRequestTypeOptions}
                                    value={recordData.claimType}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    CLAIMENT
                                </label>
                                <Select
                                    onChange={(e) =>
                                        handleSelectChange(e, "claiment")
                                    }
                                    options={claimRequestTypeOptions}
                                    value={recordData.claiment}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    CLAIMENT DETAILS
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="climentDetails"
                                    placeholder="Claiment Details"
                                    value={recordData.climentDetails}
                                    onChange={handleInputTextChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border px-3 py-2 mb-3 mt-2">
                    <div className="row input-fields">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    REQUEST DESCRIPTION
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="requestDescription"
                                    placeholder="Request Description"
                                    value={recordData.requestDescription}
                                    onChange={handleInputTextChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    NAME OF APPROVER
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="claimApprover"
                                    placeholder="Name of Approver"
                                    value={recordData.claimApprover}
                                    onChange={handleInputTextChange}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    APPROVED ON
                                </label>
                                <div className="align-items-center date-box">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <MobileDatePicker
                                            inputFormat="dd/MM/yyyy"
                                            className="form-controldate border-radius-10"
                                            // maxDate={new Date()}
                                            closeOnSelect
                                            value={recordData.appoverRejectedOn}
                                            onChange={(e) =>
                                                handleSelectChange(
                                                    e,
                                                    "appoverRejectedOn"
                                                )
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
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    FAILURE DATE
                                </label>
                                <div className="align-items-center date-box">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <MobileDatePicker
                                            inputFormat="dd/MM/yyyy"
                                            className="form-controldate border-radius-10"
                                            // maxDate={new Date()}
                                            closeOnSelect
                                            value={recordData.failDate}
                                            onChange={(e) =>
                                                handleSelectChange(
                                                    e,
                                                    "failDate"
                                                )
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
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <FormGroup>
                                    <FormControlLabel
                                        style={{
                                            alignItems: "start",
                                            marginLeft: 0,
                                        }}
                                        control={
                                            <Switch
                                                checked={recordData.replacement}
                                                onChange={(e) =>
                                                    setRecordData({
                                                        ...recordData,
                                                        replacement:
                                                            e.target.checked,
                                                    })
                                                }
                                            />
                                        }
                                        labelPlacement="top"
                                        label={
                                            <span className="text-light-dark font-size-12 font-weight-500">
                                                REPLACEMENT
                                            </span>
                                        }
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-3" style={{ justifyContent: "right" }}>
                    <button
                        className="btn btn-border-primary mx-3"
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleClickSaveBtn}
                        id="generalRequest"
                    >
                        Save & Next
                    </button>
                </div>
            </>
        );
    };

    //  machine tab
    const viewMachineTabData = () => {
        return (
            <>
                <div className="row px-3" style={{ justifyContent: "right" }}>
                    <button
                        className="btn btn-primary"
                        // onClick={handleClickSaveBtn}
                        id="general"
                    >
                        + Create New
                    </button>
                </div>
                <div className="card border px-3 py-2 mb-3 mt-2">
                    <div className="row input-fields">
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    MAKE
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="reference"
                                    placeholder="Reference"
                                    value={recordData.make}
                                    disabled={true}
                                    //   onChange={handleInputFieldsChange}
                                />
                                {/* <SearchBox
                                    value={recordData.make}
                                    onChange={(e) =>
                                        handleMachineSearch(
                                            "make",
                                            e.target.value
                                        )
                                    }
                                    type="model"
                                    // result={searchModelResults}
                                    // onSelect={handleModelSelect}
                                    // noOptions={noOptionsModel}
                                    disabled={true}
                                    placeholder="Make"
                                /> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    MODEL
                                </label>
                                <SearchBox
                                    value={recordData.modelNumber}
                                    onChange={(e) =>
                                        handleMachineSearch(
                                            "model",
                                            e.target.value
                                        )
                                    }
                                    type="model"
                                    placeholder="Search Model"
                                    result={searchModelResults}
                                    onSelect={handleModelSelect}
                                    noOptions={noOptionsModel}
                                />
                                {/* <div className="css-w8dmq8">*Mandatory</div> */}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    SERIAL NUMBER
                                </label>
                                <SearchBox
                                    value={recordData.serialNumber}
                                    onChange={(e) =>
                                        handleMachineSearch(
                                            "serialNo",
                                            e.target.value
                                        )
                                    }
                                    type="equipmentNumber"
                                    result={searchSerialResults}
                                    onSelect={handleModelSelect}
                                    noOptions={noOptionsSerial}
                                    placeholder="Search Serial Number"
                                />
                                {/* <div className="css-w8dmq8">*Mandatory</div> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    USED FOR
                                </label>
                                <Select
                                    // onChange={(e) =>
                                    //   setRecordData({
                                    //     ...recordData,
                                    //     claimType: e,
                                    //   })
                                    // }
                                    options={claimRequestTypeOptions}
                                    // value={recordData.claimType}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    USAGE CONDITION
                                </label>
                                <Select
                                    // onChange={(e) =>
                                    //   setRecordData({
                                    //     ...recordData,
                                    //     claimType: e,
                                    //   })
                                    // }
                                    options={claimRequestTypeOptions}
                                    // value={recordData.claimType}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-3" style={{ justifyContent: "right" }}>
                    <button
                        className="btn btn-border-primary mx-3"
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleClickSaveBtn}
                        id="machine"
                    >
                        Save & Next
                    </button>
                </div>
            </>
        );
    };

    // customer tab
    const viewCustomerTabData = () => {
        return (
            <>
                <div className="card border px-3 py-2 mb-3 mt-2">
                    <div className="row input-fields">
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    CUSTOMER NUMBER
                                </label>
                                <SearchBox
                                    value={recordData.customerNumber}
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
                                    placeholder="Customer Number"
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    CUSTOMER NAME
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="reference"
                                    placeholder="Reference"
                                    value={recordData.customerName}
                                    //   onChange={handleInputFieldsChange}
                                    disabled={true}
                                />
                                {/* <SearchBox
                                    value={recordData.customerName}
                                    // onChange={(e) =>
                                    //   handleCustSearch("customerId", e.target.value)
                                    // }
                                    type="customerId"
                                    // result={searchCustResults}
                                    // onSelect={handleCustSelect}
                                    // noOptions={noOptionsCust}
                                    disabled={true}
                                    placeholder="Customer Name"
                                /> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    REFERENCE
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    name="reference"
                                    placeholder="Reference"
                                    //   value={recordData.serialNumber}
                                    //   onChange={handleInputFieldsChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row px-3" style={{ justifyContent: "right" }}>
                    <button
                        className="btn btn-border-primary mx-3"
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleClickSaveBtn}
                        id="customer"
                    >
                        Save & Next
                    </button>
                </div>
            </>
        );
    };

    return (
        <Modal show={show} onHide={hideModal} size="xl">
            {/* <Modal.Header>
                <Modal.Title class="h5 mb-0">Warranty Request</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <Box sx={{ typography: "body1" }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                className="custom-tabs-div"
                                aria-label="lab API tabs example"
                                onChange={(e, newTabValue) =>
                                    setTabValue(newTabValue)
                                }
                                centered
                            >
                                <Tab
                                    label={`GENERAL REQUEST`}
                                    value="generalRequest"
                                />
                                <Tab label={`MACHINE`} value="machine" />
                                <Tab label={`CUSTOMER`} value="customer" />
                            </TabList>
                        </Box>
                        <div className="ligt-greey-bg p-3">
                            <div>
                                <span className="mr-3 cursor">
                                    <i
                                        className="fa fa-pencil font-size-12"
                                        aria-hidden="true"
                                    ></i>
                                    <span className="ml-2">Edit</span>
                                </span>
                                <span className={`mr-3 cursor `}>
                                    <SellOutlinedIcon className=" font-size-16" />
                                    <span className="ml-2">
                                        {" "}
                                        Authorization Code({pwaNumber})
                                    </span>
                                </span>
                            </div>
                        </div>
                        <TabPanel value={tabValue}>
                            {tabValue === "generalRequest" &&
                                viewGereralTabData()}
                            {tabValue === "machine" && viewMachineTabData()}
                            {tabValue === "customer" && viewCustomerTabData()}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal.Body>
        </Modal>
    );
};

export default WarrantyRequestAuthorization;
