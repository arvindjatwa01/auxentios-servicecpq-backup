import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Select from "react-select";

import { Box, TextField } from '@mui/material';
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Validator from "utils/validator";
import SearchBox from 'pages/Common/SearchBox';
import {
    FONT_STYLE_SELECT, FONT_STYLE, STATUS_OPTIONS, INITIAL_PAGE_NO,
    INITIAL_PAGE_SIZE,
} from 'pages/Repair/CONSTANTS';
import { ReadOnlyField } from 'pages/Common/ReadOnlyField';
import PriceMethodTable from "pages/Repair/components/PriceMethodTable";
import PriceSummaryTable from "pages/Repair/components/PriceSummaryTable";
import LoadingProgress from 'pages/Repair/components/Loader';
import {
    customerSearch,
    machineSearch,
    sparePartSearch,
} from "services/searchServices";
import {
    updateBuilderEstimation,
    updateBuilderGeneralDet,
    updateBuilderPrice,
    updateBuilderCustomer,
    updateBuilderMachine,
    fetchPartlistFromBuilder,
    fetchBuilderVersionDet,
    fetchPartsFromPartlist,
} from 'services/repairBuilderServices';


const ServiceTabDetails = (props) => {
    
    const { edit = false, type = "new" } = props;
    const [searchCustResults, setSearchCustResults] = useState([]);
    const [noOptionsCust, setNoOptionsCust] = useState(false);
    const [noOptionsModel, setNoOptionsModel] = useState(false);
    const [noOptionsSerial, setNoOptionsSerial] = useState(false);
    const [value, setValue] = useState("customer");
    const [builderId, setBuilderId] = useState("");
    const [bId, setBId] = useState("");
    const [savedBuilderHeaderDetails, setSavedBuilderHeaderDetails] = useState([]);
    const [searchModelResults, setSearchModelResults] = useState([]);
    const [searchSerialResults, setSearchSerialResults] = useState([]);
    const [partListNo, setPartListNo] = useState("");
    const [headerLoading, setHeaderLoading] = useState(false);
    const [partsLoading, setPartsLoading] = useState(false);
    const [partListId, setPartListId] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [filterQuery, setFilterQuery] = useState("");
    const [totalPartsCount, setTotalPartsCount] = useState(0);
    const [spareparts, setSpareparts] = useState([]);
    const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [selectedVersion, setSelectedVersion] = useState({
        label: "Version 1",
        value: 1,
    });
    const [selBuilderStatus, setSelBuilderStatus] = useState({
        value: "DRAFT",
        label: "Draft",
    });
    const validityOptions = [
        { value: 15, label: "15 days" },
        { value: 30, label: "1 month" },
        { value: 45, label: "45 days" },
        { value: 60, label: "2 months" },
    ];
    const [builderVersionOptions, setBuilderVersionOptions] = useState([
        { label: "Version 1", value: 1 },
    ]);
    // TODO: Replace it with tenant details
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
    });
    const [estimationData, setEstimationData] = useState({
        preparedBy: "user1",
        approvedBy: "user1",
        preparedOn: new Date(),
        revisedBy: "user1",
        revisedOn: new Date(),
        salesOffice: null,
    });
    const [pricingData, setPricingData] = useState({
        netPrice: 0.0,
        priceDate: new Date(),
        adjustedPrice: 0.0,
        currency: "",
        priceDetailDTO: [],
        priceEstimateDTO: [],
    });
    const currencyOptions = [{ value: "USD", label: "USD" }];
    const salesOfficeOptions = [
        { value: "Location1", label: "Location1" },
        { value: "Location2", label: "Location2" },
        { value: "Location3", label: "Location3" },
        { value: "Location4", label: "Location4" },
    ];

    const handleMachineSearch = async (searchMachinefieldName, searchText) => {
        // console.log("cleared the result", searchText);
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
        // console.log("search query", searchQueryMachine);
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


    const handleCustSearch = async (searchText) => {
        // console.log("clear data", searchText);
        setSearchCustResults([]);
        customerData.customerID = searchText;
        if (searchText) {
            await customerSearch(
                "customerId~" + searchText + " OR fullName~" + searchText
            )
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
    const handleResetData = (action) => {
        if (action === "RESET") {
            value === "customer" && populateCustomerData(savedBuilderHeaderDetails);
            value === "machine" && populateMachineData(savedBuilderHeaderDetails);
            value === "general" && populateGeneralData(savedBuilderHeaderDetails);
            value === "estimation" && populateEstData(savedBuilderHeaderDetails);
            value === "price" && populatePricingData(savedBuilderHeaderDetails);
        } else if (action === "CANCEL") {
            populateHeader(savedBuilderHeaderDetails);
        }
        // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updatePriceData = () => {
        let data = {
            builderId,
            priceDetailDTO: pricingData.priceDetailDTO,
            priceEstimateDTO: pricingData.priceEstimateDTO,
            currency: pricingData.currency?.value,
            priceDate: pricingData.priceDate,
            // adjustedPrice:
            //   pricingData.priceMethod?.value === "FLAT_RATE"
            //     ? pricingData.adjustedPrice
            //     : 0,
        };
        updateBuilderPrice(bId, data)
            .then((result) => {
                setSavedBuilderHeaderDetails(result);
                if (result) {
                    setPricingData({
                        ...pricingData,
                        adjustedPrice: result.adjustedPrice,
                        priceDetailDTO: result.priceDetailDTO,
                        priceEstimateDTO: result.priceEstimateDTO,
                        netPrice: result.netPrice,
                    });
                }
                fetchAllDetails(builderId, generalData.version);
                setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
                handleSnack("success", "Pricing details updated!");
            })
            .catch((err) => {
                setPricingData({
                    ...pricingData,
                    adjustedPrice: savedBuilderHeaderDetails.adjustedPrice,
                    priceDetailDTO: savedBuilderHeaderDetails.priceDetailDTO,
                    priceEstimateDTO: savedBuilderHeaderDetails.priceEstimateDTO,
                    netPrice: savedBuilderHeaderDetails.netPrice,
                });
                handleSnack(
                    "error",
                    "Error occurred while updating the pricing details!"
                );
            });
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
                setSavedBuilderHeaderDetails(result);
                setValue("estimation");
                setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
                handleSnack("success", "Machine details updated!");
            })
            .catch((err) => {
                handleSnack("error", "Error occurred while updating the machine data!");
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
                setSavedBuilderHeaderDetails(result);
                setValue("price");
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
                setSavedBuilderHeaderDetails(result);
                setValue("general");
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
        const validator = new Validator();
        if (!validator.emailValidation(customerData.contactEmail)) {
            handleSnack("error", "Please enter the email address in correct format");
        } else {
            updateBuilderCustomer(bId, data)
                .then((result) => {
                    setSavedBuilderHeaderDetails(result);
                    setValue("machine");
                    setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
                    handleSnack(
                        "success",
                        "Partlist header customer details updated successfully!"
                    );
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
        console.log(
            result.validityDays,
            validityOptions.find((element) => element.value === result.validityDays)
        );
        setGeneralData({
            description: result.description ? result.description : "",
            estimationDate: result.estimationDate
                ? result.estimationDate
                : new Date(),
            estimationNo: result.estimationNumber ? result.estimationNumber : "",
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
    const populatePricingData = (result) => {
        setPricingData({
            priceDate: result.priceDate ? result.priceDate : new Date(),
            netPrice: result.netPrice ? result.netPrice : 0.0,
            adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
            currency: result.currency
                ? currencyOptions.find((element) => element.value === result.currency)
                : { label: "", value: "" },
            priceDetailDTO: result.priceDetailDTO,
            priceEstimateDTO: result.priceEstimateDTO,
        });
    };
    const populateHeader = (result) => {
        setSavedBuilderHeaderDetails(result);
        setViewOnlyTab({
            custViewOnly: result.customerId ? true : false,
            machineViewOnly: result.serialNo ? true : false,
            generalViewOnly: result.estimationDate ? true : false,
            estViewOnly: result.preparedBy ? true : false,
            priceViewOnly:
                result.priceMethod !== "EMPTY" &&
                    result.priceMethod !== null &&
                    result.priceMethod !== ""
                    ? true
                    : false,
        });
        // setRating(result.rating);
        setSelBuilderStatus(
            STATUS_OPTIONS.filter((x) => x.value === result.status)[0]
        );
        let versions = result.versionList?.map((versionNo) => ({
            value: versionNo,
            label: "Version " + versionNo,
        }));
        setBuilderVersionOptions(versions);
        setSelectedVersion({
            label: "Version " + result.versionNumber,
            value: result.versionNumber,
        });
        populateCustomerData(result);
        populateMachineData(result);
        populateGeneralData(result);
        populateEstData(result);
        populatePricingData(result);
    };

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
        setSearchCustResults([]);
    };

    const handleCustomerDataChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handleEstimationDataChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setEstimationData({
            ...estimationData,
            [name]: value,
        });
    };

    const handleMachineDataChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setMachineData({
            ...machineData,
            [name]: value,
        });
    };

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
                productSegment: currentItem.productSegment,
                productGroup: currentItem.productGroup,
            });
            setSearchSerialResults([]);
        }
    };

    const fetchPartsOfPartlist = async (partlistId, pageNo, rowsPerPage) => {
        setPartsLoading(true);
        setPage(pageNo);
        setPageSize(rowsPerPage);
        let sort = sortDetail.sortColumn
            ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
            : "&sortColumn=createdAt&orderBY=ASC";
        let filter = filterQuery ? `&search=${filterQuery}` : "";
        const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
        await fetchPartsFromPartlist(partlistId, query)
            .then((partsResult) => {
                setTotalPartsCount(partsResult.totalRows);
                // partsResult.result.map((element, i) => {
                //   // setSlPart((pageNo*rowsPerPage - rowsPerPage) + i)
                //   console.log(pageNo,rowsPerPage, i)
                //   element.rowNum = (((pageNo+1)*rowsPerPage - rowsPerPage) + (i+1)) * 10

                // })
                setSpareparts(partsResult.result);
            })
            .catch((err) => {
                handleSnack("error", "Error occured while fetching parts");
            });
        setPartsLoading(false);
    };

    const fetchAllDetails = (builderId, versionNumber) => {
        var versionHistoryData = {
            builderId: "",
            exitingType: "repair",
            editable: false,
        };
        localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
        console.log(builderId, versionNumber);
        if (builderId && versionNumber) {
            setHeaderLoading(true);
            fetchBuilderVersionDet(builderId, versionNumber)
                .then((result) => {
                    populateHeader(result);
                    setHeaderLoading(false);
                    fetchPartlist(result.id);
                })
                .catch((err) => {
                    setHeaderLoading(false);
                    handleSnack(
                        "error",
                        "Error occurred while fetching the version details"
                    );
                });
        }
    };
    const fetchPartlist = (id) => {
        fetchPartlistFromBuilder(id)
            .then((partListResult) => {
                if (partListResult) {
                    setPartListNo(partListResult[0]);
                    fetchPartsOfPartlist(
                        partListResult[0],
                        INITIAL_PAGE_NO,
                        INITIAL_PAGE_SIZE
                    );
                }
            })
            .catch((err) => {
                handleSnack(
                    "error",
                    "Error occurred while fetching all parts of partlist"
                );
            });
    };

    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };


    useEffect(() => {
        // console.log("partListNo", partListNo);
        if (partListNo) fetchPartsOfPartlist(partListNo, page, pageSize);
    }, [sortDetail, filterQuery]);
    useEffect(() => {
        if (type === "new") {
            setBuilderId(props.builderId);
            setBId(props.bId);
            setPartListNo(props.partListNo);
            setPartListId(props.partListId);
            setGeneralData({ ...generalData, estimationNo: props.partListId });
            if (type === "new") {
                // fetchAllDetails(state.bId, state.partListNo);
                console.log("Created a new builder");
            }
        }
    }, []);
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };


    return (
        <div className="card border p-4 ">
            <Box className="" sx={{ width: "100%", typography: "body1" }}>
                {headerLoading ? (
                    <LoadingProgress />
                ) : (
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList className="custom-tabs-div" onChange={handleChange}>
                                <Tab label="Customer" value="customer" />
                                <Tab label="Machine " value="machine" />
                                <Tab label="Estimation Details" value="estimation" />
                                <Tab label="General Details" value="general" />
                                <Tab label="Price" value="price" />
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
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    CUSTOMER ID
                                                </label>
                                                <SearchBox
                                                    value={customerData.customerID}
                                                    onChange={(e) => handleCustSearch(e.target.value)}
                                                    type="customerId"
                                                    result={searchCustResults}
                                                    onSelect={handleCustSelect}
                                                    noOptions={noOptionsCust}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
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
                                                <div className="css-w8dmq8">*Mandatory</div>
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
                                            className="btn btn-light bg-primary text-white"
                                            onClick={() => handleResetData("CANCEL")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white ml-1"
                                            disabled={
                                                !(
                                                    customerData.source &&
                                                    customerData.contactEmail &&
                                                    customerData.customerGroup &&
                                                    customerData.contactName
                                                ) || noOptionsCust
                                            }
                                            onClick={updateCustomerData}
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
                                            className="btn btn-light bg-primary text-white"
                                            onClick={() => handleResetData("CANCEL")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white ml-1"
                                            disabled={
                                                !(machineData.model && machineData.serialNo) ||
                                                noOptionsModel ||
                                                noOptionsSerial
                                            }
                                            onClick={updateMachineData}
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
                                                <div className="css-w8dmq8">*Mandatory</div>
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
                                            className="btn btn-light bg-primary text-white"
                                            onClick={() => handleResetData("CANCEL")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white ml-1"
                                            onClick={updateEstData}
                                            disabled={
                                                !(
                                                    estimationData.preparedBy &&
                                                    estimationData.preparedOn &&
                                                    estimationData.salesOffice?.value
                                                )
                                            }
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
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white"
                                            onClick={() => handleResetData("CANCEL")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white ml-1"
                                            onClick={updateGeneralData}
                                            disabled={
                                                !(
                                                    generalData.estimationDate &&
                                                    generalData.description &&
                                                    generalData.estimationNo &&
                                                    generalData.reference &&
                                                    generalData.validity?.value
                                                )
                                            }
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
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value="price">
                            {!viewOnlyTab.priceViewOnly ? (
                                <React.Fragment>
                                    <div className="row input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    NET PRICE
                                                </label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="form-control border-radius-10 text-primary"
                                                    value={pricingData.netPrice}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    PRICE DATE
                                                </label>
                                                <div className="align-items-center date-box">
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <MobileDatePicker
                                                            inputFormat="dd/MM/yyyy"
                                                            className="form-controldate border-radius-10"
                                                            // minDate={pricingData.priceDate}
                                                            // maxDate={new Date()}
                                                            closeOnSelect
                                                            value={pricingData.priceDate}
                                                            onChange={(e) =>
                                                                setPricingData({
                                                                    ...pricingData,
                                                                    priceDate: e,
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
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    ADJUSTED PRICE
                                                </label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="form-control border-radius-10 text-primary"
                                                    value={pricingData.adjustedPrice}
                                                // onChange={(e) =>
                                                //   setPricingData({
                                                //     ...pricingData,
                                                //     adjustedPrice: e.target.value,
                                                //   })
                                                // }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    CURRENCY
                                                </label>
                                                <Select
                                                    onChange={(e) =>
                                                        setPricingData({
                                                            ...pricingData,
                                                            currency: e,
                                                        })
                                                    }
                                                    options={currencyOptions}
                                                    value={pricingData.currency}
                                                    styles={FONT_STYLE_SELECT}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white"
                                            onClick={() => handleResetData("CANCEL")}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light bg-primary text-white"
                                            onClick={updatePriceData}
                                            disabled={
                                                !(
                                                    pricingData.priceDate &&
                                                    pricingData.currency?.value !== ""
                                                )
                                            }
                                        >
                                            Save
                                        </button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <>
                                    <div className="row mt-3">
                                        <ReadOnlyField
                                            label="NET PRICE"
                                            value={pricingData.netPrice}
                                            className="col-md-4 col-sm-4"
                                        />
                                        <ReadOnlyField
                                            label="PRICE DATE"
                                            value={
                                                <Moment format="DD/MM/YYYY">
                                                    {pricingData.priceDate}
                                                </Moment>
                                            }
                                            className="col-md-4 col-sm-4"
                                        />
                                        <ReadOnlyField
                                            label="ADJUSTED PRICE"
                                            value={pricingData.adjustedPrice}
                                            className="col-md-4 col-sm-4"
                                        />
                                        <ReadOnlyField
                                            label="CURRENCY"
                                            value={pricingData.currency?.label}
                                            className="col-md-4 col-sm-4"
                                        />
                                    </div>
                                    <hr />
                                    <div className="mb-5">
                                        <PriceMethodTable
                                            rows={pricingData.priceDetailDTO}
                                            setRows={(rows) => {
                                                console.log(rows);
                                                setPricingData({
                                                    ...pricingData,
                                                    priceDetailDTO: rows,
                                                });
                                            }}
                                        />
                                        <div
                                            className="row my-3 mr-2"
                                            style={{ justifyContent: "right" }}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-light bg-primary text-white"
                                                onClick={updatePriceData}
                                                disabled={
                                                    !(pricingData.priceDate && pricingData.currency)
                                                }
                                            >
                                                Save Price Methods
                                            </button>
                                        </div>
                                        <PriceSummaryTable
                                            rows={pricingData.priceEstimateDTO}
                                            setRows={(rows) =>
                                                setPricingData({
                                                    ...pricingData,
                                                    priceEstimateDTO: rows,
                                                })
                                            }
                                        />
                                        <div
                                            className="row my-3 mr-2"
                                            style={{ justifyContent: "right" }}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-light bg-primary text-white"
                                                onClick={updatePriceData}
                                                disabled={
                                                    !(pricingData.priceDate && pricingData.currency)
                                                }
                                            >
                                                Save Price Summary
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </TabPanel>
                    </TabContext>
                )}
            </Box>
        </div>
    )
}

export default ServiceTabDetails