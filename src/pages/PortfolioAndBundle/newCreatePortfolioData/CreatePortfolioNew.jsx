import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';

import folderAddIcon from "../../..//assets/icons/svg/folder-add.svg";
import editIcon from "../../../assets/icons/svg/edit.svg";
import shareIcon from "../../../assets/icons/svg/share.svg";

import PortfolioHeader from './PortfolioHeader';
import { ToastContainer, toast } from 'react-toastify';
import { Box } from '@mui/material';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import $ from "jquery";
import Select from 'react-select';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import { getPortfolioCommonConfig, getSolutionPriceCommonConfig, getValidityKeyValue } from '../../..//services/index';
import { FONT_STYLE_SELECT } from "../../Repair/CONSTANTS";

import { isEmptyData, isEmptySelectData } from './utilities/textUtilities';
import { useAppSelector } from '../../..//app/hooks';
import {
    selectCategoryList,
    selectGeographicalList,
    selectProductList,
    selectResponseTimeList,
    selectStrategyTaskOption,
    selectUpdateList,
    selectUpdateTaskList,
    taskActions
} from '../customerSegment/strategySlice';
import { useDispatch } from 'react-redux';
import { convertTimestampToFormateDate } from './utilities/dateUtilities';
import { sparePartSearch } from 'services/searchServices';
import PortfolioCoverageSearch from './PortfolioCoverageSearch';
import CoveragePaginationTable from './coverage/CoveragePaginationTable';
import PortfolioItemsList from './portfolio-item/PortfolioItemsList';


const portfolioHeaderType = [
    { label: "PORTFOLIO", value: "PORTFOLIO", },
    { label: "PROGRAM", value: "PROGRAM", },
]

const priceAgreementItemsKeyValuePair = [
    { value: "PARTS", label: "Spare Parts" },
    { value: "LABOUR", label: "Labor" },
    { value: "SERVICE", label: "Service" },
    { value: "MISC", label: "Miscellaneous" },
]

const validityKeyValuePair = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
];

const salesOfficeKeyValuePair = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
];

export const CreatePortfolio = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const categoryUsageKeyValuePair = useAppSelector(selectStrategyTaskOption(selectCategoryList));
    const strategyTaskKeyValuePair = useAppSelector(selectStrategyTaskOption(selectUpdateList));
    const taskTypeKeyValuePair = useAppSelector(selectStrategyTaskOption(selectUpdateTaskList));
    const responseTimeKeyValuePair = useAppSelector(selectStrategyTaskOption(selectResponseTimeList));
    const productHierarchyKeyValuePair = useAppSelector(selectStrategyTaskOption(selectProductList));
    const geographicKeyValuePair = useAppSelector(selectStrategyTaskOption(selectGeographicalList));


    // Price tab Key-Value -pair list
    const [priceListKeyValuePair, setPriceListKeyValuePair] = useState([])
    const [priceMethodKeyValuePair, setPriceMethodKeyValuePair] = useState([])
    const [priceTypeKeyValuePair, setPriceTypeKeyValuePair] = useState([])
    const [additionalPriceKeyValuePair, setAdditionalPriceHeadTypeKeyValue] = useState([
        { label: "Surcharge %", value: "PERCENTAGE" },
        { label: "Surcharge $", value: "ABSOLUTE", },
    ]);
    const [priceHeadTypeKeyValuePair, setPriceHeadTypeKeyValuePair] = useState([])


    const [supportLevelKeyValuePair, setSupportLevelKeyValuePair] = useState([]);
    const [portfolioSupportLevel, setPortfolioSupportLevel] = useState({ value: "STANDARD", label: "Standard (Bronze)" })

    const [portfolioStatusKeyValuePair, setPortfolioStatusKeyValuePair] = useState([]);
    const [portfolioStatus, setPortfolioStatus] = useState({ value: "DRAFT", label: "Draft", })
    const [isActivePortfolio, setIsActivePortfolio] = useState(false);

    const [portfolioId, setPortfolioId] = useState(null);
    const [portfolioHeaderActiveTab, setPortfolioHeaderActiveTab] = useState("general");
    const [portfolioTabsEditView, setPortfolioTabsEditView] = useState({
        generalTabEdit: false,
        validityTabEdit: false,
        strategyTabEdit: false,
        administrativeTabEdit: false,
        priceTabEdit: false,
        priceAgreementTabEdit: false,
        coverageTabEdit: false,
    });

    const [isPriceAgreementDisable, setIsPriceAgreementDisable] = useState(false);
    const [customerSegmentKeyValuePair, setCustomerSegmentKeyValue] = useState([]);
    const [validityKeyValuePair, setValidityKeyValuePair] = useState([])

    const [generalTabData, setGeneralTabData] = useState({
        headerType: { label: "PORTFOLIO", value: "PORTFOLIO", },
        name: "",
        description: "",
        serviceDescription: "",
        externalReference: "",
        customerSegment: "",
    });

    const [validityTabData, setValidityTabData] = useState({
        fromDate: new Date(),
        toDate: new Date(),
        from: null,
        to: null,
        fromInput: "",
        toInput: "",
        dateFlag: false,
        inputFlag: false,
    });

    const [strategyTabData, setStrategyTabData] = useState({
        categoryUsage: "",
        strategyTask: "",
        taskType: "",
        optionals: "",
        responseTime: "",
        productHierarchy: "",
        geographic: "",
    })

    const [priceTabData, setPriceTabData] = useState({
        priceList: "",
        priceMethod: "",
        priceDate: new Date(),
        priceType: "",
        netPrice: "",
        additionalPriceType: "",
        additionalPriceValue: "",
        priceEscalatonType: "",
        priceEscaltonValue: "",
        calculatedPrice: "",
        priceBreakDownType: "",
        priceBreakDownValue: ""
    })

    const [priceAgreementTableRow, setPriceAgreementTableRow] = useState([])

    const [searchCoverageData, setSearchCoverageData] = useState([])
    const [checkedCoverageData, setCheckedCoverageData] = useState([])
    const [selectedCoverageData, setSelectedCoverageData] = useState([])
    const [portfolioCoverageIds, setPortfolioCoverageIds] = useState([])

    const [administrativeTabData, setAdministrativeTabData] = useState({
        preparedBy: null,
        approvedBy: null,
        preparedOn: new Date(),
        revisedBy: null,
        revisedOn: new Date(),
        salesOffice: null,
        offerValidity: null,
    });

    // Optional Service 
    const [checkedService, setCheckedService] = useState([])
    const [selectedService, setSelectedService] = useState([])
    const [inclusionService, setInclusionService] = useState([])


    useEffect(() => {
        getInitialData()
    }, []);

    useEffect(() => {
        dispatch(taskActions.fetchTaskList());
    }, [dispatch])

    const getInitialData = () => {
        // get Portfolio support-level Options Key-Value List
        getSolutionPriceCommonConfig("support-level")
            .then((res) => {
                const supportLevelOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { supportLevelOptions.push({ value: d.key, label: d.value, }) }
                });
                setSupportLevelKeyValuePair(supportLevelOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get Portfolio Status Options Key-value List
        getSolutionPriceCommonConfig("status")
            .then((res) => {
                const portfolioStatusOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { portfolioStatusOptions.push({ value: d.key, label: d.value, }) }
                });
                setPortfolioStatusKeyValuePair(portfolioStatusOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get customer segment key value pair list 
        getPortfolioCommonConfig("customer-segment")
            .then((res) => {
                const customerSegmentOptions = res.map((d) => ({ value: d.key, label: d.value, }));
                setCustomerSegmentKeyValue(customerSegmentOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get Validity Key-Value Pair list
        getValidityKeyValue()
            .then((res) => {
                const validityOptions = []
                res.map((d) => {
                    if (d.key !== "EMPTY") { validityOptions.push({ value: d.key, label: d.value, }) }
                });
                setValidityKeyValuePair(validityOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get Price-List key-value pair
        getSolutionPriceCommonConfig("price-list")
            .then((res) => {
                const priceListOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { priceListOptions.push({ value: d.key, label: d.value, }) }
                });
                setPriceListKeyValuePair(priceListOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get PRice-method key-value Pair
        getSolutionPriceCommonConfig("price-method")
            .then((res) => {
                const priceMethodOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { priceMethodOptions.push({ value: d.key, label: d.value, }) }
                });
                setPriceMethodKeyValuePair(priceMethodOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        // get Price-Type key-value Pair
        getSolutionPriceCommonConfig("price-type")
            .then((res) => {
                const priceTypeOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { priceTypeOptions.push({ value: d.key, label: d.value, }) }
                });
                setPriceTypeKeyValuePair(priceTypeOptions);
            })
            .catch((err) => {
                toast.error(err);
            });

        //get price-head-type key-value pair
        getSolutionPriceCommonConfig("price-head-type")
            .then((res) => {
                const priceHeadTypeOptions = []
                res.map((d) => {
                    if (d.key != "EMPTY") { priceHeadTypeOptions.push({ value: d.key, label: d.value, }) }
                });
                setPriceHeadTypeKeyValuePair(priceHeadTypeOptions);
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    // handle Portfolio Support level
    const handlePortfolioSupportLevel = (e) => {
        setPortfolioSupportLevel(e);
    }

    // handle Portfolio Status
    const handlePortfolioStatus = (e) => {
        setPortfolioStatus(e);
    }

    // handle portfolio tabs edit flag
    const handlePortfolioHeaderTabDataViews = () => {
        try {
            if (portfolioStatus.value === "ACTIVE") {
                const errorMessage = "The portfolio data cannot be changed on active status, change to revise status to edit";
                toast("😐 " + errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                if (portfolioHeaderActiveTab === "general" && portfolioTabsEditView.generalTabEdit) {
                    setPortfolioTabsEditView({ ...portfolioTabsEditView, generalTabEdit: false });
                } else if (portfolioHeaderActiveTab === "validity" && portfolioTabsEditView.validityTabEdit) {
                    setPortfolioTabsEditView({ ...portfolioTabsEditView, validityTabEdit: false });
                } else if (portfolioHeaderActiveTab === "strategy" && portfolioTabsEditView.strategyTabEdit) {
                    setPortfolioTabsEditView({ ...portfolioTabsEditView, strategyTabEdit: false });
                } else if (portfolioHeaderActiveTab === "administrative" && portfolioTabsEditView.administrativeTabEdit) {
                    setPortfolioTabsEditView({ ...portfolioTabsEditView, administrativeTabEdit: false });
                } else if (portfolioHeaderActiveTab === "price" && portfolioTabsEditView.priceTabEdit) {
                    setPortfolioTabsEditView({ ...portfolioTabsEditView, priceTabEdit: false });
                }
            }
        } catch (error) {
            return;
        }
    };

    // goTo Recent Portfolio/Bundles/Service
    const goBackToRecentPortfolio = () => {
        history.push({ pathname: "/portfolio", });
    }

    // Change Portfolio tabs
    const handleTabChange = (e, value) => {
        setPortfolioHeaderActiveTab(value)
    }

    // handle general Tab input data change 
    const handleGeneralTabTextChange = (e) => {
        const { name, value } = e.target;
        setGeneralTabData({ ...generalTabData, [name]: value });
    };

    // handle validity Tab input data change 
    const handleValidityTabTextChange = (e, keyName, type,) => {
        const _validityTabData = { ...validityTabData };
        if (type == "date") {
            _validityTabData.inputFlag = false;
            _validityTabData[keyName] = e.toISOString().substring(0, 10);
            if (keyName === "toDate") {
                _validityTabData.dateFlag = true;
            }
        }

        if (type == "select") { _validityTabData[keyName] = e; }

        if (type === "text") {
            _validityTabData[keyName] = e;
            if (keyName === "fromInput") { _validityTabData.dateFlag = false; }
        }

        setValidityTabData(_validityTabData)
    }

    //  handle strategy tab input data change
    const handleStrategyTabSelectChange = (e, keyName) => {
        try {
            const _strategyTabData = { ...strategyTabData };
            _strategyTabData[keyName] = e;
            if (keyName === "categoryUsage") {
                _strategyTabData.strategyTask = "";
                _strategyTabData.taskType = "";
                dispatch(taskActions.updateList(e.value))
            }

            if (keyName === "strategyTask") {
                _strategyTabData.taskType = "";
                dispatch(taskActions.updateList(e.value))
            }
            setStrategyTabData(_strategyTabData)
        } catch (error) {
            return;
        }
    }

    // handle price tab input data change
    const handlePriceTabTextChange = (e, type, keyName) => {
        if (type === "text") {
            setPriceTabData({ ...priceTabData, [keyName]: e.target.value })
        } else {
            setPriceTabData({ ...priceTabData, [keyName]: e })
        }
    }

    // Price Agreement tab Actions
    // Add new Rows
    const handleAddNewPriceAgreementRow = () => {
        setPriceAgreementTableRow([
            ...priceAgreementTableRow,
            {
                id: priceAgreementTableRow.length + 1,
                itemType: "",
                itemTypeKeyValue: "",
                selectOptions: [],
                itemNumber: "",
                specialPrice: 0,
                discount: 0,
                absoluteDiscount: 0,
            }
        ]);
    }

    // Remove selected Row
    const handleRemovePriceAgreementRow = (i) => {
        var _priceAgreementTableRow = [...priceAgreementTableRow];
        _priceAgreementTableRow.splice(i, 1)
        setPriceAgreementTableRow(_priceAgreementTableRow);
    }

    //handle table input text change
    const handlePriceAgreementData = (e, i, type) => {
        var _priceAgreementTableRow = [...priceAgreementTableRow];
        var selectedRow = priceAgreementTableRow[i];

        if (type === "select") {
            selectedRow = { ...selectedRow, itemType: e.value, itemTypeKeyValue: e, }
        } else if (type === "text") {
            selectedRow = { ...selectedRow, [e.target.name]: e.target.value }
        } else if (type === "number") {
            if (e.target.value < 0) {
                return;
            }
            selectedRow = { ...selectedRow, [e.target.name]: e.target.value }
        }
        // priceAgreementTableRow[i] = selectedRow;
        _priceAgreementTableRow.splice(i, 1, selectedRow)
        setPriceAgreementTableRow(_priceAgreementTableRow);
    }

    // Search Item number for parts
    const handleItemNumberSearch = async (e, i) => {
        try {
            let tempArray = [...priceAgreementTableRow];
            let obj = tempArray[i];
            obj.itemNumber = e.target.value;
            if (obj.itemType === "") {
                throw "Select Item Type First."
            }
            if (obj.itemType === "PARTS") {
                let searchString = "partNumber~" + e.target.value;
                sparePartSearch(searchString)
                    .then((res) => {
                        obj.selectOptions = res;
                        tempArray[i] = obj;
                        setPriceAgreementTableRow([...tempArray]);
                        $(`.scrollbar-${i}`).css("display", "block");
                    })
                    .catch((err) => {
                        return;
                    });

                obj.itemNumber = e.target.value;
            } else {
                obj.itemNumber = e.target.value;
                tempArray[i] = obj;
                setPriceAgreementTableRow([...tempArray]);
            }
        } catch (error) {
            toast("😐" + error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    // Select search item number
    const handleSearchItemNumberListClick = (currentItem, i) => {
        let tempArray = [...priceAgreementTableRow];
        let obj = tempArray[i];
        obj.itemNumber = currentItem;
        tempArray[i] = obj;
        setPriceAgreementTableRow([...tempArray]);
        $(`.scrollbar-${i}`).css("display", "none");
    };

    // Coverage
    const handleSetSearchCoverageData = (data) => {
        setSearchCoverageData(data)
    }

    const handleCheckedCoverageData = () => {
        let selectedCoverageDataClone = []
        checkedCoverageData.map((data, i) => {
            const exist = selectedCoverageData.some(item => item.id === data.id)
            if (!exist) {
                selectedCoverageDataClone.push(data)
            }
        })
        setSelectedCoverageData([...selectedCoverageData, ...selectedCoverageDataClone])
        setSearchCoverageData([])
        setCheckedCoverageData([]);
    }

    const handleUpdateCoverageData = (updatedData, isFiltered = false) => {
        setSelectedCoverageData(updatedData)
        if (isFiltered) {
            setCheckedCoverageData(updatedData);
        }
    }

    const handlePortfolioCoverageIds = (idsData) => {
        setPortfolioCoverageIds(idsData);
    }

    // Administrative tab text change
    const handleAdministrativeTabTextChange = (e, keyName, type) => {
        if (type === "text") {
            setAdministrativeTabData({ ...administrativeTabData, [keyName]: e.target.value })
        } else if (type === "date") {
            setAdministrativeTabData({ ...administrativeTabData, [keyName]: e })
        } else if (type === "select") {
            setAdministrativeTabData({ ...administrativeTabData, [keyName]: e })
        }
    }

    // Change tab
    const handleTabSelectChange = (e, tabType, keyName) => {
        if (tabType === "general") {
            if (keyName === "headerType") {
                if (e.value == "PROGRAM") { setIsPriceAgreementDisable(true); }
                else { setIsPriceAgreementDisable(false); }
            }
            setGeneralTabData({ ...generalTabData, [keyName]: e });
        }
    }

    // view general tab data
    const viewGeneralTabData = () => {
        return (
            <>
                {!portfolioTabsEditView.generalViewOnly ?
                    <>
                        <div className="row mt-4 input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500"> SELECT TYPE</label>
                                    <Select
                                        placeholder="Select..."
                                        className="text-primary"
                                        options={portfolioHeaderType}
                                        value={generalTabData.headerType}
                                        onChange={(e) => handleTabSelectChange(e, "general", "headerType")}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                        </div>
                        <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        {generalTabData.headerType.value} NAME
                                    </label>
                                    <input type="text" name="name" className="form-control text-primary border-radius-10" placeholder="Name"
                                        value={generalTabData.name}
                                        onChange={handleGeneralTabTextChange}
                                        disabled={portfolioId === null ? false : true}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        {/* SERVICE {generalTabData.headerType.value} DESCRIPTION (IF ANY) */}
                                        {generalTabData.headerType.value} DESCRIPTION (IF ANY)
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-primary border-radius-10"
                                        name="description"
                                        placeholder="Optional"
                                        value={generalTabData.description}
                                        onChange={handleGeneralTabTextChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        REFERENCE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control text-primary border-radius-10"
                                        name="externalReference"
                                        placeholder="Reference"
                                        value={generalTabData.externalReference}
                                        onChange={handleGeneralTabTextChange}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        CUSTOMER SEGMENT
                                    </label>
                                    <Select
                                        onChange={(e) => handleTabSelectChange(e, "general", "customerSegment")}
                                        className="text-primary"
                                        value={generalTabData.customerSegment}
                                        options={customerSegmentKeyValuePair}
                                        placeholder="Optionals"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ justifyContent: "right" }}>
                            <button
                                type="button"
                                onClick={handleNextClick}
                                className="btn btn-light"
                                id="general"
                            >
                                Save & Next
                            </button>
                        </div>
                    </> :
                    <>
                        <div className="row mt-4">
                            <div className="col-md-4 col-sm-3">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">
                                        PORTFOLIO NAME
                                    </p>
                                    <h6 className="font-weight-500 text-primary font-size-17">
                                        {generalTabData.name == "" || generalTabData.name == null ? "NA" : generalTabData.name}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-3">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">
                                        PORTFOLIO DESCRIPTION
                                    </p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {generalTabData.description == "" || generalTabData.description == null ? "NA" : generalTabData.description}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-3">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">
                                        REFERENCE
                                    </p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {generalTabData.externalReference == "" ||
                                            generalTabData.externalReference == null ||
                                            generalTabData.externalReference == "string"
                                            ? "NA" : generalTabData.externalReference}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-3">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">
                                        CUSTOMER SEGMENT
                                    </p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {generalTabData?.customerSegment == "" ||
                                            generalTabData?.customerSegment == null ||
                                            generalTabData?.customerSegment == undefined ||
                                            generalTabData?.customerSegment?.label == "string"
                                            ? "NA" : generalTabData?.customerSegment?.label}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </>}
            </>
        )
    }

    // view general tab data
    const viewValidityTabData = () => {
        return (
            <>
                <div className="row mt-4 input-fields">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="d-flex align-items-center date-box">
                                    <label
                                        className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                        htmlFor="exampleInputEmail1"
                                    >
                                        <span className=" mr-2">FROM</span>
                                    </label>
                                    <div className="form-group w-100">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                className={`form-controldate text-primary border-radius-10 ${portfolioTabsEditView.validityTabEdit ? "dateNotEditable" : ""}`}
                                                label=""
                                                value={validityTabData.fromDate}
                                                onChange={(e) => handleValidityTabTextChange(e, "fromDate", "date")}
                                                readOnly={portfolioTabsEditView.validityTabEdit}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">
                                        TO
                                    </label>
                                    <div className="form-group w-100">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                variant="inline"
                                                className={`form-controldate text-primary border-radius-10 ${portfolioTabsEditView.validityTabEdit ? "dateNotEditable" : ""}`}
                                                label=""
                                                format="dd/MM/yyyy"
                                                value={validityTabData.toDate}
                                                onChange={(e) => handleValidityTabTextChange(e, "toDate", "date")}
                                                readOnly={portfolioTabsEditView.validityTabEdit}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{ textAlign: "center", margin: "8px" }}
                        >
                            <div className="col-6">
                                <h6 className="font-weight-500">OR</h6>
                            </div>
                            <div className="col-6"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center date-box w-100">
                                        <label
                                            className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            <span className="mr-2">FROM</span>
                                        </label>
                                        <div className="form-group w-100">
                                            <div className=" d-flex form-control-date ">
                                                <Select
                                                    className="select-input text-primary"
                                                    value={validityTabData.from}
                                                    onChange={(e) => handleValidityTabTextChange(e, "from", "select")}
                                                    options={validityKeyValuePair}
                                                    placeholder="Select "
                                                    isDisabled={portfolioTabsEditView.validityTabEdit}
                                                />
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="fromInput"
                                                        aria-describedby="emailHelp"
                                                        placeholder="From"
                                                        value={validityTabData.fromInput}
                                                        onChange={(e) => handleValidityTabTextChange(e.target.value, "fromInput", "text")}
                                                        disabled={portfolioTabsEditView.validityTabEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center date-box w-100">
                                        <label
                                            className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            <span className="">TO</span>
                                        </label>
                                        <div className="form-group w-100">
                                            <div className=" d-flex form-control-date">
                                                <Select
                                                    className="select-input"
                                                    value={validityTabData.from}
                                                    onChange={(e) => handleValidityTabTextChange(e.target.value, "to", "text")}
                                                    isDisabled={true}
                                                    options={validityKeyValuePair}
                                                    placeholder="Select "
                                                // isDisabled={portfolioTabsEditView.validityTabEdit}
                                                />
                                                <div>
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder=""
                                                        value={validityTabData.toInput}
                                                        onChange={(e) =>
                                                            setValidityTabData({
                                                                ...validityTabData,
                                                                toInput: e.target.value,
                                                                dateFlag: false,
                                                                inputFlag: true,
                                                            })
                                                        }
                                                        disabled={portfolioTabsEditView.validityTabEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {!portfolioTabsEditView.validityTabEdit &&
                    <div className="row" style={{ justifyContent: "right" }}>
                        <button type="button" onClick={handleNextClick} className="btn btn-light" id="validity"> Save & Next</button>
                    </div>
                }
            </>
        )
    }

    // view strategy tab data
    const viewStrategyTabData = () => {
        return (
            <>
                {!portfolioTabsEditView.strategyTabEdit ? <>
                    <div className="row input-fields">
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">CATEGORY USAGE </label>
                                <Select
                                    options={categoryUsageKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData.categoryUsage}
                                    onChange={(e) => handleStrategyTabSelectChange(e, "categoryUsage")}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> STRATEGY TASK </label>
                                <Select
                                    options={strategyTaskKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData?.strategyTask}
                                    onChange={(e) => handleStrategyTabSelectChange(e, "strategyTask")}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> TASK TYPE </label>
                                <Select
                                    options={taskTypeKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData.taskType}
                                    placeholder="Optional"
                                    onChange={(e) => handleStrategyTabSelectChange(e, "taskType")}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> OPTIONALS </label>
                                <div className="optionl-service-input bg-white border-radius-10 d-flex align-items-center justify-content-between">
                                    <h6 className="text-primary m-0 font-size-17 font-weight-500">{selectedService.length === 0 ? "Add Services" : selectedService.length + " Services Selected"} </h6>
                                    {selectedService.length !== 0 ?
                                        <RemoveRedEyeIcon className="text-primary font-size-30 cursor" />
                                        : <AddCircleOutlineIcon className="text-primary font-size-30 cursor" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> RESPONSE TIME </label>
                                <Select
                                    placeholder="Optional"
                                    options={responseTimeKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData.responseTime}
                                    onChange={(e) => handleStrategyTabSelectChange(e, "responseTime")}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> PRODUCT HIERARCHY </label>
                                <Select
                                    placeholder="Optional"
                                    options={productHierarchyKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData.productHierarchy}
                                    onChange={(e) => handleStrategyTabSelectChange(e, "productHierarchy")}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">GEOGRAPHIC </label>
                                <Select
                                    placeholder="Optional"
                                    options={geographicKeyValuePair}
                                    className="text-primary"
                                    value={strategyTabData.geographic}
                                    onChange={(e) => handleStrategyTabSelectChange(e, "geographic")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                        <button
                            type="button"
                            onClick={handleNextClick}
                            className="btn btn-light"
                            id="strategy"
                        >
                            Save & Next
                        </button>
                    </div>
                </> : <>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    CATEGORY USAGE
                                </p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.categoryUsage?.value) ? "NA" : strategyTabData?.categoryUsage?.label}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    STRATEGY TASK
                                </p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.strategyTask?.value) ? "NA" : strategyTabData?.strategyTask?.label}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">TASK TYPE</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.taskType?.value) ? "NA" : strategyTabData?.taskType?.label}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <p className="font-size-12 font-weight-500 mb-2">OPTIONALS</p>
                            {/* <h6 className="cursor font-weight-500 text-uppercase text-primary font-size-17">{selectedService.length !== 0 ? selectedService.length + " Service Selected" : "No Service Selected"}</h6> */}
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">RESPONSE TIME</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.responseTime?.value) ? "NA" : strategyTabData?.responseTime?.label}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">PRODUCT HIERARCHY</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.productHierarchy?.value) ? "NA" : strategyTabData?.productHierarchy?.label}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">GEOGRAPHIC</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {isEmptySelectData(strategyTabData.geographic?.value) ? "NA" : strategyTabData?.geographic?.label}
                                </h6>
                            </div>
                        </div>
                    </div>
                </>}
            </>
        )
    }

    // view Price Tab Data
    const viewPriceTabData = () => {
        return (
            <>
                {!portfolioTabsEditView.priceTabEdit ?
                    <>
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">PRICE LIST </label>
                                    <Select
                                        onChange={(e) => handlePriceTabTextChange(e, "select", "priceList")}
                                        className="text-primary"
                                        options={priceListKeyValuePair}
                                        placeholder="placeholder (Optional)"
                                        value={priceTabData.priceList}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500"> PRICE METHOD</label>
                                    <Select
                                        className="text-primary"
                                        onChange={(e) => handlePriceTabTextChange(e, "select", "priceMethod")}
                                        options={priceMethodKeyValuePair}
                                        placeholder="required"
                                        value={priceTabData.priceMethod}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">PRICE DATE</label>
                                    <div className="d-flex align-items-center date-box w-100">
                                        <div className="form-group w-100">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    variant="inline"
                                                    format="dd/MM/yyyy"
                                                    className="form-controldate border-radius-10"
                                                    label=""
                                                    name="preparedOn"
                                                    value={priceTabData.priceDate}
                                                    onChange={(e) => handlePriceTabTextChange(e, "date", "priceDate")}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">PRICE TYPE</label>
                                    <Select
                                        className="text-primary"
                                        onChange={(e) => handlePriceTabTextChange(e, "select", "priceType")}
                                        options={priceTypeKeyValuePair}
                                        placeholder="placeholder (Optional)"
                                        value={priceTabData.priceType}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500"> NET PRICE{" "}</label>
                                    <input
                                        type="text"
                                        className="form-control text-primary border-radius-10"
                                        placeholder="Optional"
                                        value={priceTabData.netPrice}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <label className="text-light-dark font-size-12 font-weight-500">ADDITIONAL </label>
                                    <div className=" d-flex form-control-date">
                                        <div className="">
                                            <Select
                                                onChange={(e) => handlePriceTabTextChange(e, "select", "additionalPriceType")}
                                                className="text-primary"
                                                options={additionalPriceKeyValuePair}
                                                placeholder="Select"
                                                value={priceTabData.additionalPriceType}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control rounded-top-left-0 text-primary rounded-bottom-left-0"
                                            placeholder="optional"
                                            value={priceTabData.additionalPriceValue}
                                            onChange={(e) => handlePriceTabTextChange(e, "text", "additionalPriceValue")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <label className="text-light-dark font-size-12 font-weight-500">PRICE ESCALATON</label>
                                    <div className=" d-flex align-items-center form-control-date">
                                        <Select
                                            className="select-input text-primary"
                                            onChange={(e) => handlePriceTabTextChange(e, "select", "priceEscalatonType")}
                                            options={priceHeadTypeKeyValuePair}
                                            placeholder="Select "
                                            value={priceTabData.priceEscalatonType}
                                        />
                                        <input
                                            type="text"
                                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                            placeholder="optional"
                                            value={priceTabData.priceEscaltonValue}
                                            onChange={(e) => handlePriceTabTextChange(e, "text", "priceEscaltonValue")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500" >CALCULATED PRICE</label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        value={priceTabData.calculatedPrice}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <label className="text-light-dark font-size-12 font-weight-500">PRICE BREAK DOWN </label>
                                    <div className=" d-flex form-control-date">
                                        <Select
                                            className="select-input text-primary"
                                            // onChange={setSelectedOption}
                                            onChange={(e) => handlePriceTabTextChange(e, "select", "priceBreakDownType")}
                                            options={priceHeadTypeKeyValuePair}
                                            placeholder="Select "
                                            value={priceTabData.priceBreakDownType}
                                        />
                                        <input
                                            type="text"
                                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                            placeholder="optional"
                                            value={priceTabData.priceBreakDownValue}
                                            onChange={(e) => handlePriceTabTextChange(e, "text", "priceBreakDownValue")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ justifyContent: "right" }}>
                            <button type="button" onClick={handleNextClick} className="btn btn-light" id="price">{" "}Save & Next</button>
                        </div>
                    </> :
                    <>
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE LIST</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.priceList?.value) ? "NA" : priceTabData?.priceList?.label}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.priceMethod?.value) ? "NA" : priceTabData?.priceMethod?.label}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(priceTabData.priceDate) ? "NA" : convertTimestampToFormateDate(priceTabData.priceDate)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE TYPE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.priceType?.value) ? "NA" : priceTabData?.priceType?.label}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2"> NET PRICE{" "}</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(priceTabData.netPrice) ? "NA" : parseInt(priceTabData.netPrice)}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <p className="font-size-12 font-weight-500 mb-2">ADDITIONAL</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.additionalPriceType?.value) ? "NA" : priceTabData?.additionalPriceType?.label}
                                        {isEmptyData(priceTabData.additionalPriceValue) ? "NA" : parseInt(priceTabData.additionalPriceValue)}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE ESCALATON</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.priceEscalatonType?.value) ? "NA" : priceTabData?.priceEscalatonType?.label}
                                        {isEmptyData(priceTabData.priceEscaltonValue) ? "NA" : parseInt(priceTabData.priceEscaltonValue)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">CALCULATED PRICE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(priceTabData.calculatedPrice) ? "NA" : parseInt(priceTabData.calculatedPrice)}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group date-box">
                                    <p className="font-size-12 font-weight-500 mb-2">PRICE BREAK DOWN</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(priceTabData.priceBreakDownType?.value) ? "NA" : priceTabData?.priceBreakDownType?.label}
                                        {isEmptyData(priceTabData.priceBreakDownValue) ? "NA" : parseInt(priceTabData.priceBreakDownValue)}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }

    // view Price-Agreement Tab View
    const viewPriceAgreementTabData = () => {
        return (
            <>
                <div className="card border">
                    <div className="d-flex align-items-center justify-content-between px-3">
                        <div className="">
                            <div className="d-flex ">
                                <h5 className=" mb-0"><span>Price Agreement</span></h5>
                                <p className=" mb-0">
                                    <a className="ml-3 cursor"><img src={editIcon} /></a>
                                    <a className="ml-3 cursor"><img src={shareIcon} /></a>
                                </p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center ">
                            <div className=" text-center border-left py-4 pl-3">
                                <a className="cursor" onClick={handleAddNewPriceAgreementRow}> + Add </a>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive custometable">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item Type</th>
                                    <th scope="col">Item Number</th>
                                    <th scope="col">Special Price</th>
                                    <th scope="col">Discount%</th>
                                    <th scope="col">Absolute discount</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceAgreementTableRow.length > 0 && priceAgreementTableRow.map((data, i) => {
                                    return (
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td><div className="form-group mb-0">
                                                <Select
                                                    value={data.itemTypeKeyValue}
                                                    onChange={(e) => handlePriceAgreementData(e, i, "select")}
                                                    options={priceAgreementItemsKeyValuePair}
                                                    placeholder="Select..."
                                                />
                                            </div></td>
                                            <td>
                                                <div className="form-group mb-0">
                                                    <input
                                                        type="text"
                                                        className="form-control text-primary border-radius-10 position-relative"
                                                        name="itemNumber"
                                                        placeholder="Search..."
                                                        value={data.itemNumber}
                                                        onChange={(e) => handleItemNumberSearch(e, i)}
                                                    />
                                                    {
                                                        <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}>
                                                            {data.selectOptions.map(
                                                                (currentItem, j) => (
                                                                    <li className="list-group-item cursor" key={j}
                                                                        onClick={(e) => handleSearchItemNumberListClick(currentItem["partNumber"], i)}
                                                                    >
                                                                        {currentItem["partNumber"]}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="NA"
                                                    name="specialPrice"
                                                    value={data.specialPrice}
                                                    onChange={(e) => handlePriceAgreementData(e, i, "number")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="5%"
                                                    name="discount"
                                                    value={data.discount}
                                                    onChange={(e) => handlePriceAgreementData(e, i, "number")}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    placeholder="NA"
                                                    name="absoluteDiscount"
                                                    value={data.absoluteDiscount}
                                                    onChange={(e) => handlePriceAgreementData(e, i, "number")}
                                                />
                                            </td>
                                            <td>
                                                <div>
                                                    <a className="mr-3 cursor"> <RemoveRedEyeOutlinedIcon className="font-size-16 mr-2" /> View detail</a>
                                                    <a onClick={() => handleRemovePriceAgreementRow(i)} className="cursor"><ModeEditIcon className="font-size-16 mr-2" />View detail</a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div >
                <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" onClick={handleNextClick} className="btn btn-light" id="priceAgreement">
                        Save & Next
                    </button>
                </div>
            </>
        )
    }

    // view Coverage Tab Data
    const viewCoverageTabData = () => {
        return (
            <>
                <ul class="submenu templateResultheading accordion" style={{ display: 'block' }}>
                    <li><a className="cursor result" >Search Coverage</a></li>
                </ul>
                <div className="custom-table card p-3" style={{ width: "100%", backgroundColor: "#fff" }}>
                    <div className="row align-items-center m-0" style={{ flexFlow: "unset" }}>
                        <PortfolioCoverageSearch
                            searchFlag="coverage"
                            handleAddSearchItem={handleSetSearchCoverageData}
                        />
                        <div className=" ml-3">
                            <Link className="btn bg-primary cursor text-white cursor">
                                <FileUploadOutlinedIcon />{" "}
                                <span className="ml-1">Upload</span>
                            </Link>
                        </div>
                    </div>
                    {searchCoverageData.length !== 0 && <>
                        <hr />
                        <CoveragePaginationTable
                            className=""
                            isSelectAble={true}
                            tableData={searchCoverageData}
                            setCheckedCoverageData={setCheckedCoverageData}
                        />
                        <div> <div className="text-right">
                            <input className="btn bg-primary text-white" value="+ Add Selected"
                                onClick={handleCheckedCoverageData}
                                disabled={checkedCoverageData.length === 0}
                            />
                        </div></div>
                    </>}
                    {selectedCoverageData.length !== 0 && (
                        <>
                            <hr />
                            <label htmlFor="Included-model">
                                <h5 className="font-weight-400 text-black mb-2 mt-1">Included models</h5>
                            </label>
                            <CoveragePaginationTable
                                className="mt-3"
                                isSelectAble={false}
                                tableData={selectedCoverageData}
                                handleUpdateCoverageData={handleUpdateCoverageData}
                                handlePortfolioCoverageIds={handlePortfolioCoverageIds}
                            />
                        </>
                    )}
                </div>
                <div className="row" style={{ justifyContent: "right" }}>
                    {selectedCoverageData.length !== 0 &&
                        <button type="button" className="btn btn-light" id="coverage" onClick={handleNextClick}>
                            Save & Next
                        </button>
                    }
                </div>
            </>
        )
    }

    // view administrative tab data
    const viewAdministrativeTabData = () => {
        return (
            <>
                {!portfolioTabsEditView.administrativeTabEdit ?
                    <>
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">PREPARED BY</label>
                                    <input type="text" className="form-control text-primary border-radius-10"
                                        name="preparedBy"
                                        value={administrativeTabData.preparedBy}
                                        onChange={(e) => handleAdministrativeTabTextChange(e, "preparedBy", "input")}
                                        placeholder="Required (ex-abc@gmail.com)"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500"> APPROVED BY </label>
                                    <input type="text" className="form-control text-primary border-radius-10"
                                        placeholder="Optional (ex-abc@gmail.com)"
                                        name="approvedBy"
                                        value={administrativeTabData.approvedBy}
                                        onChange={(e) => handleAdministrativeTabTextChange(e, "approvedBy", "input")}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <label className="text-light-dark font-size-14 font-weight-500">PREPARED ON </label>
                                <div className="d-flex align-items-center date-box w-100">
                                    <div className="form-group w-100">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                label=""
                                                name="preparedOn"
                                                value={administrativeTabData.preparedOn}
                                                onChange={(e) => handleAdministrativeTabTextChange(e, "approvedBy", "date")}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <div className="css-w8dmq8">*Mandatory</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">REVISED BY</label>
                                    <input type="text" className="form-control border-radius-10 text-primary"
                                        placeholder="Optional (ex-abc@gmail.com)"
                                        name="revisedBy"
                                        value={administrativeTabData.revisedBy}
                                        onChange={(e) => handleAdministrativeTabTextChange(e, "approvedBy", "input")}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">REVISED ON</label>
                                    <div className="d-flex align-items-center date-box w-100">
                                        <div className="form-group w-100 m-0">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    variant="inline"
                                                    format="dd/MM/yyyy"
                                                    className="form-controldate border-radius-10"
                                                    label=""
                                                    name="revisedOn"
                                                    value={administrativeTabData.revisedOn}
                                                    onChange={(e) => handleAdministrativeTabTextChange(e, "revisedOn", "date")}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500"> SALES OFFICE / BRANCH</label>
                                    <Select
                                        className="text-primary"
                                        options={salesOfficeKeyValuePair}
                                        placeholder="Required"
                                        value={administrativeTabData.salesOffice}
                                        onChange={(e) => handleAdministrativeTabTextChange(e, "salesOffice", "select")}
                                        styles={FONT_STYLE_SELECT}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                        </div>
                        <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">OFFER VALIDITY</label>
                                    <Select
                                        className="text-primary"
                                        options={validityKeyValuePair}
                                        placeholder="Required"
                                        value={administrativeTabData.offerValidity}
                                        onChange={(e) => handleAdministrativeTabTextChange(e, "offerValidity", "select")}
                                        styles={FONT_STYLE_SELECT}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ justifyContent: "right" }}>
                            <button type="button" className="btn btn-light" id="administrative" onClick={handleNextClick}>
                                Save
                            </button>
                        </div>
                    </> :
                    <>
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2"> PREPARED BY</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(administrativeTabData.preparedBy) ? "NA" : administrativeTabData.preparedBy}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2"> APPROVED BY</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(administrativeTabData.preparedBy) ? "NA" : administrativeTabData.preparedBy}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">PREPARED ON</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(administrativeTabData.preparedOn) ? "NA" : convertTimestampToFormateDate(administrativeTabData.preparedBy)}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">REVISED BY</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(administrativeTabData.revisedBy) ? "NA" : administrativeTabData.revisedBy}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">REVISED  ON</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptyData(administrativeTabData.revisedOn) ? "NA" : convertTimestampToFormateDate(administrativeTabData.revisedOn)}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(administrativeTabData.salesOffice?.value) ? "NA" : administrativeTabData.salesOffice?.label}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <p className="font-size-12 font-weight-500 mb-2"> OFFER VALIDITY</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {isEmptySelectData(administrativeTabData.offerValidity?.value) ? "NA" : administrativeTabData.offerValidity?.label}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </>}
            </>
        )
    }

    // handle next Click for Portfolio Create/Update
    const handleNextClick = () => {

    }

    return (
        <>
            <div className="content-body" style={{ minHeight: "884px" }}>
                <div className="container-fluid ">
                    <PortfolioHeader
                        portfolioSupportLevel={portfolioSupportLevel}
                        portfolioStatus={portfolioStatus}
                        supportLevelKeyValuePair={supportLevelKeyValuePair}
                        portfolioStatusKeyValuePair={portfolioStatusKeyValuePair}
                        setIsActivePortfolio={setIsActivePortfolio}
                        handlePortfolioSupportLevel={handlePortfolioSupportLevel}
                        handlePortfolioStatus={handlePortfolioStatus}
                    />
                    <div className="card p-4 mt-5">
                        <h5 className="d-flex justify-content-between align-items-center mb-0">
                            <div className="d-flex align-items-center">
                                <span className="mr-3" style={{ whiteSpace: "pre" }}>
                                    {portfolioId ? "Portfolio Details" : "New Portfolio*"}
                                </span>
                                <a className="btn-sm cursor">
                                    <i className="fa fa-pencil" aria-hidden="true" onClick={handlePortfolioHeaderTabDataViews} />
                                </a>
                                <a className="btn-sm cursor"><i className="fa fa-bookmark-o" aria-hidden="true" /> </a>
                                <a className="btn-sm cursor"><img style={{ width: "14px" }} src={folderAddIcon} /> </a>
                            </div>
                            <button onClick={goBackToRecentPortfolio} className="btn bg-primary text-white cursor">Back</button>
                        </h5>
                        <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={portfolioHeaderActiveTab}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList className="custom-tabs-div" aria-label="lab API tabs example" onChange={handleTabChange}>
                                        <Tab label="General" value={"general"} />
                                        <Tab label="Validity" value={"validity"} />
                                        <Tab label="Strategy" value={"strategy"} />
                                        <Tab label="Price" disabled={isPriceAgreementDisable} value={"price"} />
                                        <Tab label="Price Agreement" disabled={!isPriceAgreementDisable} value={"priceAgreement"} />
                                        <Tab label="Coverage" value={"coverage"} />
                                        <Tab label="Administrative" value={"administrative"} />
                                    </TabList>
                                </Box>
                                <TabPanel value={"general"}> {viewGeneralTabData()}</TabPanel>
                                <TabPanel value={"validity"}>{viewValidityTabData()}</TabPanel>
                                <TabPanel value={"strategy"}>{viewStrategyTabData()}</TabPanel>
                                <TabPanel value={"price"}>{viewPriceTabData()}</TabPanel>
                                <TabPanel value={"priceAgreement"} className="customTabPanel">{viewPriceAgreementTabData()}</TabPanel>
                                <TabPanel value="coverage">{viewCoverageTabData()}</TabPanel>
                                <TabPanel value="administrative">{viewAdministrativeTabData()}</TabPanel>
                            </TabContext>
                        </Box>
                    </div>
                    <PortfolioItemsList />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}