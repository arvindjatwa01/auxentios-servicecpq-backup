import React, { useEffect, useState } from "react";

// material ui import
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import $ from "jquery";

import { STANDARD_JOB_DETAIL } from "navigation/CONSTANTS";

import { GET_SEARCH_KIT_ID, GET_SEARCH_STANDARD_JOB_ID, } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { errorMessage } from "../utilities/toastMessage";
import { isEmpty, isEmptySelect } from "../utilities/textUtilities";
import { useAppSelector } from "../../../../app/hooks";

import {
    selectUpdateTaskList, selectStrategyTaskOption, selectCategoryList, selectUpdateList, taskActions,
} from "../../customerSegment/strategySlice";
import {
    createItemPriceData, getItemDataById, getItemPriceData, updateItemPriceData,
} from "../../../../services/index";
import { usageTypeKeyValuePair, defaultItemPriceObj, } from "pages/Common/PortfolioAndSolutionConstants";
import LoadingProgress from "pages/Repair/components/Loader";

const itemRequestDefaultObj = {
    itemId: 0,
    name: "",
    description: "",
    usageIn: "",
    strategyTask: "",
    taskType: "",
    year: { label: 1, value: 1 },
    noOfYear: 1,
    startUsage: "",
    endUsage: "",
    usageType: "",
    frequency: "",
    unit: "",
    recommendedValue: "",
    quantity: 1,
    numberOfEvents: "",
    standardJobId: "",
    standardJobIdSearch: false,
    templateDescription: "",
    repairKitId: "",
    repairKitIdSearch: false,
    repairOption: "",
    repairOption: "",
    headerdescription: "",
    branch: "",
    offerValidity: "",
    withBundleService: true,
    itemPriceId: null,
    bundleServiceNeed: true,
};

const ItemAddEdit = (props) => {
    const {
        itemType, isEditable, isPortfolioItem, bundleServiceNeed, handleBundleServiceNeed,
        componentDataTabShow, handleGetPortfolioItemsData,
        itemId, portfolioId, hideItemAddUpdateModel = null, reviewModeActive = false,
    } = props;

    const { frequencyKeyValuePairs, unitKeyValuePairs, } = useSelector((state) => state.commonAPIReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const usageInKeyValuePair = useAppSelector(
        selectStrategyTaskOption(selectCategoryList)
    );
    const strategyTaskKeyValuePair = useAppSelector(
        selectStrategyTaskOption(selectUpdateList)
    );
    const taskTypeKeyValuePair = useAppSelector(
        selectStrategyTaskOption(selectUpdateTaskList)
    );

    const [itemActiveTab, setItemActiveTab] = useState("itemSummary");
    const [typeOfSearch, setTypeOfSearch] = useState(null);
    const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null);
    const [columnSearchText, setColumnSearchText] = useState("");
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [showRelatedKitModal, setShowRelatedKitModal] = useState(false);

    const [editItemData, setEditItemData] = useState(isEditable ? true : false);

    const [itemPriceDataId, setItemPriceDataId] = useState(0);

    const [itemRequestObj, setItemRequestObj] = useState({
        ...itemRequestDefaultObj,
    });
    const [itemPriceRequestObj, setItemPriceRequestObj] = useState({
        ...defaultItemPriceObj,
    });

    const [yearsKeyValuePairs, seYearsKeyValuePairs] = useState([
        { value: 1, label: 1 },
    ]);
    const [searchedStandardJobIdList, setSearchedStandardJobIdList] = useState(
        []
    );
    const [searchedRepairKitIdList, setSearchedRepairKitIdList] = useState([]);
    const [standardJobIdDetails, setStandardJobIdDetails] = useState({
        templateDBId: "",
        templateType: "",
        templateId: "",
    });

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (itemId) {
            handleGetItemDetails(itemId);
        }
    }, [itemId]);

    // get Select Bundle/Service Item Details
    const handleGetItemDetails = async (itemId) => {
        setLoader(true);
        const itemDetails = await getItemDataById(itemId);
        if (itemDetails.status === 200) {
            const { itemId, itemName, itemHeaderModel, itemBodyModel } =
                itemDetails.data;

            const _usageIn = usageInKeyValuePair.find(
                (obj) => obj.value === itemBodyModel.usageIn
            );

            dispatch(taskActions.updateList(itemBodyModel.usageIn));
            const _strategyTask = strategyTaskKeyValuePair.find(
                (obj) => obj.value === itemHeaderModel.itemHeaderStrategy
            );

            dispatch(taskActions.updateTask(itemHeaderModel.itemHeaderStrategy));
            const _taskType = taskTypeKeyValuePair.find(
                (obj) => obj.value === itemBodyModel.taskType[0]
            );
            const _usageType = usageTypeKeyValuePair.find(
                (obj) => obj.value === itemBodyModel.usage
            );

            setItemRequestObj({
                ...itemRequestObj,
                name: itemName,
                description: itemBodyModel.itemBodyDescription,
                usageIn: _usageIn || "",
                strategyTask: _strategyTask,
                taskType: _taskType,
                usageType: _usageType,
            });

            if (itemBodyModel.itemPrices.length !== 0) {
                setLoader(true);
                setItemPriceDataId(
                    itemBodyModel.itemPrices[itemBodyModel.itemPrices.length - 1]
                        .itemPriceDataId
                );
                const itemPriceDetails = await getItemPriceData(
                    itemBodyModel.itemPrices[itemBodyModel.itemPrices.length - 1]
                        .itemPriceDataId
                );
                if (itemPriceDetails.status === 200) {
                    let _frequency = frequencyKeyValuePairs.find(
                        (obj) => obj.value === itemPriceDetails.data.frequency
                    );

                    // set unit key value
                    let _usageUnit = unitKeyValuePairs.find(
                        (obj) => obj.value === itemPriceDetails.data.usageUnit
                    );

                    setItemPriceRequestObj({
                        ...itemPriceDetails.data,
                        numberOfEvents: itemPriceDetails.data.numberOfEvents,
                        itemPriceId: itemPriceDetails.data.itemPriceDataId,
                        year: isEmpty(itemPriceDetails.data.year)
                            ? ""
                            : {
                                label: itemPriceDetails.data.year,
                                value: itemPriceDetails.data.year,
                            },
                        frequency: _frequency || "",
                        usageUnit: _usageUnit || "",
                        portfolio: isEmpty(portfolioId) ? isEmpty(itemPriceDetails.data.portfolio?.portfolioId)
                            ? null
                            : Object.keys(itemPriceDetails.data.portfolio).length === 0
                                ? null
                                : itemPriceDetails.data.portfolio : { portfolioId: portfolioId },
                    });
                    setLoader(false);
                }
            }
            setLoader(false);
        }
    };

    useEffect(() => {
        var yearsOptionArr = [];
        for (let i = 1; i <= itemRequestObj.noOfYear; i++) {
            yearsOptionArr.push({ value: i, label: i });
        }
        seYearsKeyValuePairs(yearsOptionArr);
    }, [itemRequestObj.noOfYear]);

    useEffect(() => {
        dispatch(taskActions.fetchTaskList());
    }, [dispatch]);

    // handle input text change
    const handleInputTextChange = (e) => {
        const { id, type, name, value, checked } = e.target;
        if (type === "number") {
            setItemRequestObj((prev) => ({ ...prev, [name]: parseInt(value) }));
        } else if (type === "checkbox") {
            setItemRequestObj((prev) => ({ ...prev, [name]: checked }));
        } else {
            setItemRequestObj((prev) => ({ ...prev, [name]: value }));
        }
    };

    // price related input text change
    const handlePriceInputChange = (e) => {
        const { id, type, name, value, checked } = e.target;
        if (type === "number") {
            setItemPriceRequestObj((prev) => ({ ...prev, [name]: parseInt(value) }));
        } else if (type === "checkbox") {
            setItemPriceRequestObj((prev) => ({ ...prev, [name]: checked }));
        } else {
            setItemPriceRequestObj((prev) => ({ ...prev, [name]: value }));
        }
    };

    // handle Select change
    const handleSelectChange = (e, keyName) => {
        if (keyName === "usageIn") {
            dispatch(taskActions.updateList(e.value));
            setItemRequestObj((prev) => ({
                ...prev,
                [keyName]: e,
                strategyTask: "",
                taskType: "",
            }));
        } else if (keyName === "strategyTask") {
            dispatch(taskActions.updateTask(e.value));
            setItemRequestObj((prev) => ({ ...prev, [keyName]: e, taskType: "" }));
        } else {
            setItemRequestObj((prev) => ({ ...prev, [keyName]: e }));
        }
    };

    // handle Price related Select change
    const handlePriceSelectChange = (e, keyName) => {
        setItemPriceRequestObj((prev) => ({ ...prev, [keyName]: e }));
    };

    // template Id(StandardJobId) search
    const handleSearchStandardJobId = async (e) => {
        const { value } = e.target;
        setItemRequestObj((prev) => ({
            ...prev,
            standardJobId: value,
            standardJobIdSearch: true,
        }));
        setItemPriceRequestObj((prev) => ({
            ...prev,
            standardJobId: value,
            standardJobIdSearch: true,
        }));
        setStandardJobIdDetails({
            templateDBId: "",
            templateType: "",
            templateId: "",
        });
        if (value.length === 0) {
            setSearchedStandardJobIdList([]);
        } else {
            callGetApi(
                GET_SEARCH_STANDARD_JOB_ID + value,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        $(`.scrollbar-model`).css("display", "block");
                        setSearchedStandardJobIdList(response.data);
                    } else {
                        setSearchedStandardJobIdList([]);
                    }
                },
                (error) => {
                    setSearchedStandardJobIdList([]);
                }
            );
        }
    };

    // handle Select Standard Job Id
    const handleSelectStandardJobId = (currentItem) => {
        setStandardJobIdDetails({
            templateDBId: currentItem.id,
            templateType: currentItem.templateType,
            templateId: currentItem.templateId,
        });
        setItemRequestObj((prev) => ({
            ...prev,
            standardJobId: currentItem.standardJobId,
            templateDescription: currentItem.description,
            standardJobIdSearch: false,
        }));
        setItemPriceRequestObj((prev) => ({
            ...prev,
            standardJobId: currentItem.standardJobId,
            templateDescription: currentItem.description,
            standardJobIdSearch: false,
        }));
        setSearchedStandardJobIdList([]);
    };

    // go to template Screen
    const goToTemplateScreen = () => {
        try {
            if (isEmpty(standardJobIdDetails.templateDBId)) {
                throw "Search and Select any one Template Id";
            }
            let templateDetails = {
                templateId: standardJobIdDetails.templateId,
                templateDBId: standardJobIdDetails.templateDBId,
                partListNo: "",
                partListId: "",
                type: "fetch",
                templateType: standardJobIdDetails.templateType,
            };
            history.push({
                pathname: STANDARD_JOB_DETAIL,
                state: templateDetails,
            });
        } catch (error) {
            errorMessage(error);
            return;
        }
    };

    // Related kit Id(RepairKitId) search
    const handleSearchRepairKitId = async (e) => {
        const { value } = e.target;
        setItemRequestObj((prev) => ({
            ...prev,
            repairKitId: value,
            repairKitIdSearch: true,
        }));
        setItemPriceRequestObj((prev) => ({
            ...prev,
            repairKitId: value,
            repairKitIdSearch: true,
        }));
        if (value.length === 0) {
            setSearchedRepairKitIdList([]);
        } else {
            callGetApi(
                `${GET_SEARCH_KIT_ID + value}`,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        $(`.scrollbar-model`).css("display", "block");
                        setSearchedRepairKitIdList(response.data);
                    } else {
                        setSearchedRepairKitIdList([]);
                    }
                },
                (error) => {
                    setSearchedRepairKitIdList([]);
                }
            );
        }
    };

    // handle Select Repair Kit Id
    const handleSelectRepairKitId = (currentItem) => {
        setItemRequestObj((prev) => ({
            ...prev,
            repairKitId: currentItem.kitId,
            repairOption: currentItem.description,
            repairKitIdSearch: false,
        }));
        setItemPriceRequestObj((prev) => ({
            ...prev,
            repairKitId: currentItem.kitId,
            repairOption: currentItem.description,
            repairKitIdSearch: false,
        }));
        setSearchedRepairKitIdList([]);
    };

    // handle Item Edit flag
    const handleItemDataEdit = () => {
        if (!reviewModeActive) {
            setEditItemData(false);
        }
    };

    // handle Template Editable
    const handleTemplateEditable = () => {
        let templateDetails = {
            templateId: "",
            templateDBId: "",
            partListNo: "",
            partListId: "",
            type: "fetch",
        };
    };

    // handle Template Editable
    const handleKitEditable = () => {
        let templateDetails = {
            templateId: "",
            templateDBId: "",
            partListNo: "",
            partListId: "",
            type: "fetch",
        };
    };

    // Validation check for each required field
    const checkInputValidation = (isItem) => {
        if (itemActiveTab === "itemSummary") {
            if (isItem && isPortfolioItem && isEmpty(portfolioId)) {
                errorMessage("Create Portfolio First, then you can add Items,");
                hideItemAddUpdateModel();
                return false;
            } else if (isItem && isPortfolioItem && isEmpty(itemRequestObj.name)) {
                errorMessage("Name is a required field, you can’t leave it blank");
                return false;
            } else if (
                isItem &&
                isPortfolioItem &&
                isEmpty(itemRequestObj.description)
            ) {
                errorMessage(
                    "Description is a required field, you can’t leave it blank"
                );
                return false;
            } else if (isItem && isEmpty(isItem && itemRequestObj.usageIn)) {
                errorMessage("Usage In is a required field, you can’t leave it blank");
                return false;
            } else if (isItem && isEmpty(isItem && itemRequestObj.taskType)) {
                errorMessage("Task Type is a required field, you can’t leave it blank");
                return false;
            } else if (isEmpty(itemPriceRequestObj.startUsage)) {
                errorMessage(
                    "Start Usage is a required field, you can’t leave it blank"
                );
                return false;
            } else if (parseInt(itemPriceRequestObj.startUsage) < 0) {
                errorMessage("Start Usage must not be negative");
                return false;
            } else if (isEmpty(itemPriceRequestObj.endUsage)) {
                errorMessage("End Usage is a required field, you can’t leave it blank");
                return false;
            } else if (parseInt(itemPriceRequestObj.endUsage) < 0) {
                errorMessage("End Usage must not be negative");
                return false;
            } else if (
                parseInt(itemPriceRequestObj.startUsage) >
                parseInt(itemPriceRequestObj.endUsage)
            ) {
                errorMessage("Start Usage must not be greater to End Usage");
                return false;
            } else if (isEmpty(itemPriceRequestObj.usageUnit)) {
                errorMessage("Unit is a required field, you can’t leave it blank");
                return false;
            } else if (isEmpty(itemPriceRequestObj.recommendedValue)) {
                errorMessage(
                    "Recommended Value is a required field, you can’t leave it blank"
                );
                return false;
            } else if (parseInt(itemPriceRequestObj.recommendedValue) < 0) {
                errorMessage("Recommended Value must not be negative");
                return false;
            }
            return true;
        }
        return true;
    };

    //   Validation Check for Related Template | Kit Tabs;
    const checkMismatchInputValidation = (isItem) => {
        if (itemActiveTab !== "itemSummary") {
            if (
                (isItem && isPortfolioItem && isEmpty(portfolioId)) ||
                (isItem && isPortfolioItem && isEmpty(itemRequestObj.name)) ||
                (isItem && isPortfolioItem && isEmpty(itemRequestObj.description)) ||
                (isItem && isEmpty(isItem && itemRequestObj.usageIn)) ||
                (isItem && isEmpty(isItem && itemRequestObj.taskType)) ||
                isEmpty(itemPriceRequestObj.startUsage) ||
                parseInt(itemPriceRequestObj.startUsage) < 0 ||
                isEmpty(itemPriceRequestObj.endUsage) ||
                parseInt(itemPriceRequestObj.endUsage) < 0 ||
                parseInt(itemPriceRequestObj.startUsage) >
                parseInt(itemPriceRequestObj.endUsage) ||
                isEmpty(itemPriceRequestObj.usageUnit) ||
                isEmpty(itemPriceRequestObj.recommendedValue)
            ) {
                errorMessage(
                    "Somthing went wrong at Item Summary Tab, Please fill data properly"
                );
                return false;
            }
            return true;
        }
        return true;
    };

    // Common function for item price add/Edit/ view
    const handleItemAddUpdateAction = async () => {
        try {
            if (editItemData) {
                // if Editable true,then we on call get API not Put/Post are acceptable
                handleGetPortfolioItemsData(
                    editItemData,
                    itemRequestObj,
                    itemPriceRequestObj,
                    isPortfolioItem,
                    editItemData
                );
            } else {
                handleAddUpdateItemPrice(false).then((itemPriceData) => {
                    handleGetPortfolioItemsData(
                        editItemData,
                        itemRequestObj,
                        itemPriceData,
                        isPortfolioItem,
                        editItemData
                    );
                });
            }
        } catch (error) {
            return;
        }
    };

    // Item Data Add/Update/View mode actions
    const handleAddUpdateItem = async () => {
        try {
            if (!editItemData && !checkInputValidation(true)) {
                return;
            }

            if (!editItemData && !checkMismatchInputValidation(true)) {
                return;
            }
            if (itemActiveTab === "itemSummary") {
                if (
                    !isEmpty(itemId) &&
                    isEmpty(itemPriceRequestObj.repairKitId) &&
                    !isEmpty(itemPriceRequestObj.standardJobId)
                ) {
                    setItemActiveTab("relatedTemplate");
                } else if (
                    !isEmpty(itemId) &&
                    !isEmpty(itemPriceRequestObj.repairKitId) &&
                    isEmpty(itemPriceRequestObj.standardJobId)
                ) {
                    setItemActiveTab("relatedKit");
                } else {
                    setItemActiveTab("relatedTemplate");
                }
            } else if (itemActiveTab === "relatedTemplate") {
                if (isEmpty(itemPriceRequestObj.standardJobId)) {
                    setItemActiveTab("relatedKit");
                } else {
                    handleItemAddUpdateAction();
                }
            } else if (itemActiveTab === "relatedKit") {
                handleItemAddUpdateAction();
            }
        } catch (error) {
            return;
        }
    };

    // calculate Item Price
    const handleCalculateItemPrice = async () => {
        try {
            if (!checkInputValidation(false)) {
                return;
            }
            handleAddUpdateItemPrice(true);
        } catch (error) {
            return;
        }
    };

    // common function for Item Price Update/Create
    const handleAddUpdateItemPrice = async (isCalculated) => {
        try {
            let priceReqObj = {
                ...itemPriceRequestObj,
                recommendedUnit:
                    itemPriceRequestObj.usageUnit?.value === "YEAR"
                        ? "MONTH"
                        : itemPriceRequestObj.usageUnit?.value,
                usageUnit: itemPriceRequestObj.usageUnit?.value || "",
                year: itemPriceRequestObj.year?.value || "",
                startUsage: itemPriceRequestObj.startUsage,
                endUsage: itemPriceRequestObj.endUsage,
                standardJobId: itemPriceRequestObj.standardJobId,
                templateDescription: itemPriceRequestObj.templateDescription,
                repairKitId: itemPriceRequestObj.repairKitId,
                repairOption: itemPriceRequestObj.repairOption,
                frequency: !isEmptySelect(itemPriceRequestObj.frequency?.value)
                    ? itemPriceRequestObj.frequency?.value
                    : "CYCLIC",
                priceMethod: !isEmpty(itemPriceRequestObj.priceMethod)
                    ? itemPriceRequestObj.priceMethod
                    : "LIST_PRICE",
                priceType: !isEmpty(itemPriceRequestObj.priceType)
                    ? itemPriceRequestObj.priceType
                    : "EVENT_BASED",
                additionalPriceType: !isEmpty(itemPriceRequestObj.additionalPriceType)
                    ? itemPriceRequestObj.additionalPriceType
                    : "ABSOLUTE",
                discountType: !isEmpty(itemPriceRequestObj.discountType)
                    ? itemPriceRequestObj.discountType
                    : "PORTFOLIO_DISCOUNT",
                portfolio: isEmpty(portfolioId) ? isEmpty(itemPriceRequestObj.portfolio?.portfolioId)
                    ? null
                    : Object.keys(itemPriceRequestObj.portfolio).length === 0
                        ? null
                        : itemPriceRequestObj.portfolio
                    : { portfolioId: portfolioId },
            };


            if (!itemPriceDataId || itemPriceDataId === "") {
                const updateItemPrice = await createItemPriceData(priceReqObj);
                if (updateItemPrice.status === 200) {
                    // set frequency key-value
                    let _frequency = frequencyKeyValuePairs.find(
                        (obj) => obj.value === updateItemPrice.data.frequency
                    );

                    // set unit key value
                    let _usageUnit = unitKeyValuePairs.find(
                        (obj) => obj.value === updateItemPrice.data.usageUnit
                    );

                    setItemPriceRequestObj({
                        ...updateItemPrice.data,
                        year: isEmpty(updateItemPrice.data.year)
                            ? ""
                            : {
                                label: updateItemPrice.data.year,
                                value: updateItemPrice.data.year,
                            },

                        frequency: _frequency || "",
                        usageUnit: _usageUnit || "",
                        portfolio: isEmpty(portfolioId) ? isEmpty(updateItemPrice.data.portfolio?.portfolioId)
                            ? null
                            : Object.keys(updateItemPrice.data.portfolio).length === 0
                                ? null
                                : updateItemPrice.data.portfolio : { portfolioId: portfolioId },
                    });
                    setItemRequestObj({
                        ...itemRequestObj,
                        numberOfEvents: updateItemPrice.data.numberOfEvents,
                        itemPriceId: updateItemPrice.data.itemPriceDataId,
                        year: isEmpty(updateItemPrice.data.year)
                            ? ""
                            : {
                                label: updateItemPrice.data.year,
                                value: updateItemPrice.data.year,
                            },
                        frequency: _frequency || "",
                        usageUnit: _usageUnit || "",
                    });
                    if (!isCalculated) {
                        return {
                            ...updateItemPrice.data,
                            year: isEmpty(updateItemPrice.data.year)
                                ? ""
                                : {
                                    label: updateItemPrice.data.year,
                                    value: updateItemPrice.data.year,
                                },

                            frequency: _frequency || "",
                            usageUnit: _usageUnit || "",
                        };
                    }
                }
            } else {
                const createItemPrice = await updateItemPriceData(
                    itemPriceDataId,
                    priceReqObj
                );
                if (createItemPrice.status === 200) {
                    // set frequency key-value
                    let _frequency = frequencyKeyValuePairs.find(
                        (obj) => obj.value === createItemPrice.data.frequency
                    );

                    // set unit key value
                    let _usageUnit = unitKeyValuePairs.find(
                        (obj) => obj.value === createItemPrice.data.usageUnit
                    );

                    setItemPriceDataId(createItemPrice.data.itemPriceDataId);
                    setItemPriceRequestObj({
                        ...createItemPrice.data,
                        year: isEmpty(createItemPrice.data.year)
                            ? ""
                            : {
                                label: createItemPrice.data.year,
                                value: createItemPrice.data.year,
                            },

                        frequency: _frequency || "",
                        usageUnit: _usageUnit || "",

                        portfolio: isEmpty(portfolioId) ? isEmpty(createItemPrice.data.portfolio?.portfolioId)
                            ? null
                            : Object.keys(createItemPrice.data.portfolio).length === 0
                                ? null
                                : createItemPrice.data.portfolio : { portfolioId: portfolioId },
                    });
                    setItemRequestObj({
                        ...itemRequestObj,
                        numberOfEvents: createItemPrice.data.numberOfEvents,
                        itemPriceId: createItemPrice.data.itemPriceDataId,
                        year: isEmpty(createItemPrice.data.year)
                            ? ""
                            : {
                                label: createItemPrice.data.year,
                                value: createItemPrice.data.year,
                            },

                        frequency: _frequency || "",
                        usageUnit: _usageUnit || "",
                    });

                    if (!isCalculated) {
                        return {
                            ...createItemPrice.data,
                            year: isEmpty(createItemPrice.data.year)
                                ? ""
                                : {
                                    label: createItemPrice.data.year,
                                    value: createItemPrice.data.year,
                                },

                            frequency: _frequency || "",
                            usageUnit: _usageUnit || "",
                        };
                    }
                }
            }
        } catch (error) {
            return;
        }
    };

    return (
        <div>
            {loader ? (
                <LoadingProgress />
            ) : (
                <>
                    {isEditable && (
                        <span className="mr-3 cursor" onClick={handleItemDataEdit}>
                            <i className="fa fa-pencil font-size-12" aria-hidden="true" />
                            <span className="ml-2">Edit</span>
                        </span>
                    )}
                    <TabContext value={itemActiveTab}>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                backgroundColor: "#F8F8F8",
                                borderRadius: "5px",
                            }}
                        >
                            <TabList
                                className="custom-tabs-div"
                                onChange={(e, activeItemTab) => isEditable && setItemActiveTab(activeItemTab)}
                            >
                                <Tab label="Item Summary(s)" value="itemSummary" />
                                <div className="align-items-center d-flex justify-content-center">
                                    <ArrowForwardIosIcon />
                                </div>
                                <Tab
                                    label="Related template(s)"
                                    value="relatedTemplate"
                                    disabled={
                                        !isEmpty(itemPriceRequestObj.repairKitId) &&
                                        isEmpty(itemPriceRequestObj.standardJobId)
                                    }
                                />
                                <div className="align-items-center d-flex justify-content-center">
                                    <ArrowForwardIosIcon />
                                </div>
                                <Tab
                                    label="Related Kit"
                                    value="relatedKit"
                                    disabled={
                                        !isEmpty(itemPriceRequestObj.standardJobId) &&
                                        isEmpty(itemPriceRequestObj.repairKitId)
                                    }
                                />
                            </TabList>
                        </Box>
                        <TabPanel value="itemSummary">
                            {isEditable && editItemData ? (
                                <>
                                    <div className="row input-fields">
                                        {isPortfolioItem && (
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        NAME
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemRequestObj.name)
                                                            ? "NA"
                                                            : itemRequestObj.name}
                                                    </h6>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                    DESCRIPTION
                                                </p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                    {isEmpty(itemRequestObj.description)
                                                        ? "NA"
                                                        : itemRequestObj.description}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-radius-10 py-2 px-3">
                                        <p className="mt-4">STRATEGY</p>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        USAGE IN
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemRequestObj.usageIn?.value)
                                                            ? "NA"
                                                            : itemRequestObj.usageIn?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        STRATEGY TASK
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemRequestObj.strategyTask?.value)
                                                            ? "NA"
                                                            : itemRequestObj.strategyTask?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        TASK TYPE
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemRequestObj.taskType?.value)
                                                            ? "NA"
                                                            : itemRequestObj.taskType?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-radius-10 mt-3 py-2 px-3">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        YEAR
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemPriceRequestObj.year?.value)
                                                            ? "NA"
                                                            : itemPriceRequestObj.year?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        NO. OF YEARS
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemPriceRequestObj.noOfYear)
                                                            ? "NA"
                                                            : itemPriceRequestObj.noOfYear}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <p className="font-size-14 text-black font-weight-500 mb-1">
                      USAGE
                    </p> */}
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        START USAGE
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemPriceRequestObj.startUsage)
                                                            ? "NA"
                                                            : itemPriceRequestObj.startUsage}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        END USAGE
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemPriceRequestObj.endUsage)
                                                            ? "NA"
                                                            : itemPriceRequestObj.endUsage}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        USAGE TYPE
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemRequestObj.usageType?.value)
                                                            ? "NA"
                                                            : itemRequestObj.usageType?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="font-size-12 text-light-dark font-weight-500 mb-2">
                                                        FREQUENCY
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemPriceRequestObj.frequency?.value)
                                                            ? "NA"
                                                            : itemPriceRequestObj.frequency?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        UNIT
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmptySelect(itemPriceRequestObj.usageUnit?.value)
                                                            ? "NA"
                                                            : itemPriceRequestObj.usageUnit?.label}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        RECOMMENDED VALUE
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemPriceRequestObj.recommendedValue)
                                                            ? "NA"
                                                            : itemPriceRequestObj.recommendedValue}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                        No. OF EVENTS
                                                    </p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                        {isEmpty(itemPriceRequestObj.numberOfEvents)
                                                            ? "NA"
                                                            : itemPriceRequestObj.numberOfEvents}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="row mt-4 input-fields">
                                        {isPortfolioItem && (
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group w-100">
                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                        NAME
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control border-radius-10"
                                                        placeholder="Required*"
                                                        name="name"
                                                        value={itemRequestObj.name}
                                                        onChange={handleInputTextChange}
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group w-100">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    {" "}
                                                    DESCRIPTION
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder={
                                                        isPortfolioItem ? "Required*" : "Optional"
                                                    }
                                                    name="description"
                                                    value={itemRequestObj.description}
                                                    onChange={handleInputTextChange}
                                                />
                                                {isPortfolioItem && (
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                )}
                                            </div>
                                        </div>
                                        {isPortfolioItem && (
                                            <div className="col-md-6 col-sm-6 checkbox-input">
                                                <div class="form-group form-check">
                                                    <label
                                                        class="form-check-label"
                                                        for="bundleServiceNeed"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            class="form-check-input"
                                                            id="bundleServiceNeed"
                                                            checked={!bundleServiceNeed}
                                                            onChange={(e) =>
                                                                handleBundleServiceNeed(e.target.checked)
                                                            }
                                                        />
                                                        I don’t need bundles / services
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border border-radius-10 py-2 px-3">
                                        <p className="mt-4">STRATEGY</p>
                                        <div className="row mt-4 input-fields">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group w-100">
                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                        USAGE IN
                                                    </label>
                                                    <Select
                                                        className="text-primary"
                                                        placeholder="Select(Required*)"
                                                        options={usageInKeyValuePair}
                                                        value={itemRequestObj.usageIn}
                                                        onChange={(e) => handleSelectChange(e, "usageIn")}
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        STRATEGY
                                                    </label>
                                                    <Select
                                                        className="text-primary"
                                                        placeholder="Select(Required*)"
                                                        options={strategyTaskKeyValuePair}
                                                        onChange={(e) =>
                                                            handleSelectChange(e, "strategyTask")
                                                        }
                                                        value={itemRequestObj.strategyTask}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        TASK TYPE
                                                    </label>
                                                    <Select
                                                        className="text-primary"
                                                        options={taskTypeKeyValuePair}
                                                        value={itemRequestObj.taskType}
                                                        onChange={(e) => handleSelectChange(e, "taskType")}
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-radius-10 mt-3 py-2 px-3">
                                        <div className="row input-fields">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        YEAR
                                                    </label>
                                                    <Select
                                                        options={yearsKeyValuePairs}
                                                        className="text-primary"
                                                        value={itemPriceRequestObj.year}
                                                        onChange={(e) => handlePriceSelectChange(e, "year")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        NO. OF YEARS
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                        placeholder="No. of Years"
                                                        name="noOfYear"
                                                        value={itemPriceRequestObj.noOfYear}
                                                        onChange={(e) => {
                                                            handleInputTextChange(e);
                                                            handlePriceInputChange(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <p className="font-size-14 text-black font-weight-500 mb-1">
                      USAGE
                    </p> */}
                                        <div className="row input-fields">
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        START USAGE
                                                    </label>
                                                    <div
                                                        className=" d-flex form-control-date"
                                                        style={{ overflow: "hidden" }}
                                                    >
                                                        <input
                                                            type="number"
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                            placeholder="Required*"
                                                            name="startUsage"
                                                            value={itemPriceRequestObj.startUsage}
                                                            onChange={handlePriceInputChange}
                                                        />
                                                        <span className="hours-div text-primary">
                                                            {itemPriceRequestObj.usageUnit === ""
                                                                ? "Select unit"
                                                                : itemPriceRequestObj.usageUnit?.label}
                                                        </span>
                                                    </div>
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        END USAGE
                                                    </label>
                                                    <div
                                                        className=" d-flex form-control-date"
                                                        style={{ overflow: "hidden" }}
                                                    >
                                                        <input
                                                            type="number"
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                            placeholder="Required*"
                                                            name="endUsage"
                                                            value={itemPriceRequestObj.endUsage}
                                                            onChange={handlePriceInputChange}
                                                        />
                                                        <span className="hours-div text-primary">
                                                            {itemPriceRequestObj.usageUnit === ""
                                                                ? "Select unit"
                                                                : itemPriceRequestObj.usageUnit?.label}
                                                        </span>
                                                    </div>
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        USAGE TYPE
                                                    </label>
                                                    <Select
                                                        className="text-primary"
                                                        options={usageTypeKeyValuePair}
                                                        value={itemRequestObj.usageType}
                                                        onChange={(e) => handleSelectChange(e, "usageType")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        {" "}
                                                        FREQUENCY
                                                    </label>
                                                    <Select
                                                        placeholder="Select....."
                                                        className="text-primary"
                                                        options={frequencyKeyValuePairs}
                                                        value={itemPriceRequestObj.frequency}
                                                        onChange={(e) =>
                                                            handlePriceSelectChange(e, "frequency")
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        UNIT
                                                    </label>
                                                    <Select
                                                        placeholder="Select..."
                                                        className="text-primary"
                                                        options={unitKeyValuePairs}
                                                        value={itemPriceRequestObj.usageUnit}
                                                        onChange={(e) =>
                                                            handlePriceSelectChange(e, "usageUnit")
                                                        }
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">
                                                        RECOMMENDED VALUE
                                                    </label>
                                                    <div
                                                        className="d-flex form-control-date"
                                                        style={{ overflow: "hidden" }}
                                                    >
                                                        <input
                                                            type="number"
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                            placeholder="Recommended Value"
                                                            name="recommendedValue"
                                                            value={itemPriceRequestObj.recommendedValue}
                                                            onChange={handlePriceInputChange}
                                                        />
                                                        <span className="hours-div text-primary">
                                                            {itemPriceRequestObj.usageUnit === ""
                                                                ? "Select unit"
                                                                : itemPriceRequestObj.usageUnit?.value.toLowerCase() ===
                                                                    "year"
                                                                    ? "Month"
                                                                    : itemPriceRequestObj.usageUnit?.label}
                                                        </span>
                                                    </div>
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="form-group w-100">
                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                        NO. OF EVENTS
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control border-radius-10 text-primary"
                                                        placeholder="NO. OF EVENTS"
                                                        value={itemPriceRequestObj.numberOfEvents}
                                                        onChange={handlePriceInputChange}
                                                        disabled
                                                        readOnly
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div class="form-group mt-1">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            style={{ alignItems: "start", marginLeft: 0 }}
                                                            control={
                                                                <Switch
                                                                // checked={extWorkData.flatRateIndicator}
                                                                // onChange={(e) =>
                                                                //     setExtWorkData({
                                                                //         ...extWorkData,
                                                                //         flatRateIndicator: e.target.checked,
                                                                //         adjustedPrice: e.target.checked
                                                                //             ? extWorkData.adjustedPrice
                                                                //             : 0.0,
                                                                //     })
                                                                // }
                                                                />
                                                            }
                                                            labelPlacement="top"
                                                            label={
                                                                <span className="text-light-dark font-size-12 font-weight-500">
                                                                    SUPRESSION
                                                                </span>
                                                            }
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-1 d-flex align-items-center justify-content-end">
                                            <a className="btn border mr-4 cursor">Cancel</a>
                                            <a
                                                className="btn d-flex align-items-center border bg-primary text-white"
                                                onClick={handleCalculateItemPrice}
                                            >
                                                <span className="mr-2 funds">
                                                    <svg
                                                        style={{ width: "13px" }}
                                                        version="1.1"
                                                        id="Layer_1"
                                                        viewBox="0 0 200 200"
                                                    >
                                                        <g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2C74.2,101.4,70.7,105,66.3,105.1z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9C103.4,89.1,106.9,92.9,106.8,97.2z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3C135.6,88.9,139.3,92.5,139.4,96.8z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1C70.7,121.6,74.3,125.2,74.3,129.6z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C103.2,121.5,106.8,125.2,106.8,129.5z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,154.1,74.3,157.7,74.3,162.1z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C90.7,157.7,94.3,154.1,98.6,154z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C135.8,121.5,139.4,125.2,139.4,129.5z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C123.2,157.7,126.8,154.1,131.1,154z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                      c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                      c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"
                                                                />
                                                            </g>
                                                            <g>
                                                                <path
                                                                    class="st0"
                                                                    d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                      S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                      c0-3.5-2.9-6.4-6.4-6.4H71.3z"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </span>
                                                Calculate
                                                <span className="ml-2">
                                                    <KeyboardArrowDownIcon />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel value="relatedTemplate">
                            <p className="mt-4">TEMPLATES</p>
                            {isEditable && editItemData ? (
                                <div className="row mt-4 ">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                TEMPLATE ID
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {isEmpty(itemPriceRequestObj.standardJobId)
                                                    ? "NA"
                                                    : itemPriceRequestObj.standardJobId}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                TEMPLATE DESCRIPTION
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {isEmpty(itemPriceRequestObj.templateDescription)
                                                    ? "NA"
                                                    : itemPriceRequestObj.templateDescription}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row input-fields">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                TEMPLATE ID
                                            </label>
                                            {itemType === "portfolioItem" && isEditable ? (
                                                <a
                                                    className="input-search cursor text-primary"
                                                    onClick={handleTemplateEditable}
                                                >
                                                    <svg
                                                        style={{
                                                            width: "20px",
                                                            fill: "#872ff7",
                                                            paddingBottom: "5px",
                                                        }}
                                                        version="1.1"
                                                        id="Layer_1"
                                                        viewBox="0 0 200 200"
                                                    >
                                                        <g>
                                                            <path
                                                                class="st0"
                                                                d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                      c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                      c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                      c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                      c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"
                                                            />
                                                            <path
                                                                class="st0"
                                                                d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                      c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                      c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                      c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </a>
                                            ) : (
                                                <a
                                                    className="input-search cursor text-primary cursor"
                                                    onClick={() => setShowTemplateModal(true)}
                                                >
                                                    <SearchIcon style={{ fontSize: "34px" }} />
                                                </a>
                                            )}
                                            <input
                                                type="text"
                                                className="form-control text-primary border-radius-10 position-relative"
                                                name="templateId"
                                                placeholder="TEMPLATE ID"
                                                value={itemPriceRequestObj.standardJobId}
                                                onChange={handleSearchStandardJobId}
                                            />
                                            {
                                                <ul
                                                    className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                    id="style"
                                                    style={{ display: "block" }}
                                                >
                                                    {!isEmpty(itemPriceRequestObj.standardJobId) &&
                                                        itemPriceRequestObj.standardJobId.length !== 0 &&
                                                        itemPriceRequestObj.standardJobIdSearch &&
                                                        searchedStandardJobIdList.length === 0 ? (
                                                        <li className="list-group-item">No Record Found</li>
                                                    ) : (
                                                        searchedStandardJobIdList.map((currentItem, i) => (
                                                            <li
                                                                className="list-group-item"
                                                                key={i}
                                                                onClick={() =>
                                                                    handleSelectStandardJobId(currentItem)
                                                                }
                                                            >
                                                                {currentItem.standardJobId}{" "}
                                                                {currentItem.description}
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                TEMPLATE DESCRIPTION
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control text-primary border-radius-10"
                                                name="templateDescription"
                                                placeholder="TEMPLATE DESCRIPTION"
                                                value={itemPriceRequestObj.templateDescription}
                                                onChange={handlePriceInputChange}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <div className="mt-4">
                                                <a
                                                    className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2 cursor"
                                                    onClick={goToTemplateScreen}
                                                >
                                                    <span className="mr-2">+</span>Go to Template
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showTemplateModal && (
                                <div className="maintableheader py-3 px-2 bg-primary mt-3 border-radius-10">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <div className="customselect d-flex align-items-center border-white border-radius-10 d-flex ml-3">
                                                <Select
                                                    className="p-2"
                                                    placeholder="Add by"
                                                //   onChange={handleTypeOfSearchChange}
                                                // value={typeOfSearch}
                                                // options={columnSearchKeyValue}
                                                />
                                                {typeOfSearch !== null && (
                                                    <div className="customselect d-flex align-items-center border-radius-10 d-flex ml-3">
                                                        <span>
                                                            <a className="btn-sm cursor">+</a>
                                                        </span>
                                                        <Select
                                                            placeholder="Select"
                                                        // onChange={handleTypeOfSearchColumnChange}
                                                        // value={typeOfSearchColumn}
                                                        // options={typeOfSearchColumnKeyValue}
                                                        />
                                                        {typeOfSearchColumn !== null && (
                                                            <input
                                                                type="email"
                                                                className="mr-2"
                                                                placeholder="Enter text"
                                                                style={{
                                                                    border: "none",
                                                                    background: "transparent",
                                                                    width: "95px",
                                                                    fontWeight: "600",
                                                                    paddingLeft: "10px",
                                                                }}
                                                            // value={columnSearchText}
                                                            // onChange={(e) => setColumnSearchText(e.target.value)}
                                                            />
                                                        )}
                                                        <Link
                                                            className="btn bg-primary cursor text-white"
                                                        // onClick={handleLandingPageQuerySearchClick}
                                                        >
                                                            <SearchIcon />
                                                            <span className="ml-1">Search</span>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                    {columnSearchText.trim() !== "" &&
                                        typeOfSearchColumn !== null && (
                                            <div className="tableheader">
                                                <ul
                                                    className="submenu accordion mt-2"
                                                    style={{ display: "block" }}
                                                >
                                                    <li>
                                                        <a className="result cursor">RESULTS</a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="cursor"
                                                        // onClick={handleBundleItemSaveAndContinue}
                                                        >
                                                            PM125
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="cursor"
                                                        // onClick={handleBundleItemSaveAndContinue}
                                                        >
                                                            PM2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="lastOption text-violet cursor"
                                                        // onClick={handleCreateNewServiceBundle}
                                                        >
                                                            <span className="mr-2">+</span>Create New{" "}
                                                            {typeOfSearch.value === "bundle"
                                                                ? "Bundle"
                                                                : typeOfSearch.value === "service"
                                                                    ? "Service"
                                                                    : typeOfSearch.value === "portfolioItem"
                                                                        ? "Portfolio Item"
                                                                        : ""}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel value="relatedKit">
                            <p className="mt-4">RELATED KIT</p>
                            {isEditable && editItemData ? (
                                <div className="row mt-4 ">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                RELATED KIT
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {isEmpty(itemPriceRequestObj.repairKitId)
                                                    ? "NA"
                                                    : itemPriceRequestObj.repairKitId}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                                                KIT DESCRIPTION
                                            </p>
                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                {isEmpty(itemPriceRequestObj.repairOption)
                                                    ? "NA"
                                                    : itemPriceRequestObj.repairOption}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row input-fields">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                {" "}
                                                RELATED KIT
                                            </label>
                                            {itemType === "portfolioItem" && isEditable ? (
                                                <a
                                                    className="input-search cursor text-primary cursor"
                                                    onClick={handleKitEditable}
                                                >
                                                    <svg
                                                        style={{
                                                            width: "20px",
                                                            fill: "#872ff7",
                                                            paddingBottom: "5px",
                                                        }}
                                                        version="1.1"
                                                        id="Layer_1"
                                                        viewBox="0 0 200 200"
                                                    >
                                                        <g>
                                                            <path
                                                                class="st0"
                                                                d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                      c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                      c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                      c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                      c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"
                                                            />
                                                            <path
                                                                class="st0"
                                                                d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                      c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                      c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                      c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </a>
                                            ) : (
                                                <a
                                                    className="input-search cursor text-primary"
                                                    onClick={() => setShowRelatedKitModal(true)}
                                                >
                                                    <SearchIcon style={{ fontSize: "34px" }} />
                                                </a>
                                            )}
                                            <input
                                                type="text"
                                                className="form-control text-primary border-radius-10"
                                                name="repairOption"
                                                placeholder="RELATED KIT"
                                                value={itemPriceRequestObj.repairKitId}
                                                onChange={handleSearchRepairKitId}
                                            />
                                            {
                                                <ul
                                                    className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                    id="style"
                                                    style={{ display: "block" }}
                                                >
                                                    {!isEmpty(itemPriceRequestObj.repairKitId) &&
                                                        itemPriceRequestObj.repairKitId.length !== 0 &&
                                                        itemPriceRequestObj.repairKitIdSearch &&
                                                        searchedRepairKitIdList.length === 0 ? (
                                                        <li className="list-group-item">No Record Found</li>
                                                    ) : (
                                                        searchedRepairKitIdList.map((currentItem, i) => (
                                                            <li
                                                                className="list-group-item"
                                                                key={i}
                                                                onClick={() =>
                                                                    handleSelectRepairKitId(currentItem)
                                                                }
                                                            >
                                                                {currentItem.kitId} {currentItem.description}
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                {" "}
                                                KIT DESCRIPTION
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control text-primary border-radius-10"
                                                name="repairOption"
                                                placeholder="KIT DESCRIPTION"
                                                value={itemPriceRequestObj.repairOption}
                                                onChange={handlePriceInputChange}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="form-group">
                                            <div className="mt-4">
                                                <a className="form-control Add-new-segment-div cursor text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2 cursor">
                                                    <span className="mr-2">+</span>Go to Related Kit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showRelatedKitModal && (
                                <div className="maintableheader py-3 px-2 bg-primary mt-3 border-radius-10">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <div className="customselect d-flex align-items-center border-white border-radius-10 d-flex ml-3">
                                                <Select
                                                    className="p-2"
                                                    placeholder="Add by"
                                                // onChange={handleTypeOfSearchChange}
                                                // value={typeOfSearch}
                                                // options={columnSearchKeyValue}
                                                />
                                                {typeOfSearch === null && (
                                                    <div className="customselect d-flex align-items-center border-radius-10 d-flex ml-3">
                                                        <span>
                                                            {" "}
                                                            <a className="btn-sm cursor"> +</a>
                                                        </span>
                                                        <Select
                                                            value={typeOfSearchColumn}
                                                        // onChange={handleTypeOfSearchColumnChange}
                                                        // options={typeOfSearchColumnKeyValue}
                                                        />
                                                        {typeOfSearchColumn !== null && (
                                                            <input
                                                                type="email"
                                                                className="mr-2"
                                                                placeholder="Enter text"
                                                                style={{
                                                                    border: "none",
                                                                    background: "transparent",
                                                                    width: "95px",
                                                                    fontWeight: "600",
                                                                    paddingLeft: "10px",
                                                                }}
                                                            // value={columnSearchText}
                                                            // onChange={(e) => setColumnSearchText(e.target.value)}
                                                            />
                                                        )}
                                                        <Link
                                                            className="btn bg-primary cursor text-white"
                                                        // onClick={handleLandingPageQuerySearchClick}
                                                        >
                                                            <SearchIcon />
                                                            <span className="ml-1">Search</span>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                    {columnSearchText.trim() !== "" &&
                                        typeOfSearchColumn !== null && (
                                            <div className="tableheader">
                                                <ul
                                                    className="submenu accordion mt-2"
                                                    style={{ display: "block" }}
                                                >
                                                    <li>
                                                        <a className="result cursor">RESULTS</a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="cursor"
                                                        // onClick={handleBundleItemSaveAndContinue}
                                                        >
                                                            PM125
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="cursor"
                                                        // onClick={handleBundleItemSaveAndContinue}
                                                        >
                                                            PM2
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            // onClick={handleCreateNewServiceBundle}
                                                            className="lastOption text-violet cursor"
                                                        >
                                                            <span className="mr-2">+</span>Create New{" "}
                                                            {typeOfSearch != null
                                                                ? typeOfSearch.value === "bundle"
                                                                    ? "Bundle"
                                                                    : typeOfSearch.value === "service"
                                                                        ? "Service"
                                                                        : typeOfSearch.value === "portfolioItem"
                                                                            ? "Portfolio Item"
                                                                            : ""
                                                                : ""}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                </div>
                            )}
                        </TabPanel>
                    </TabContext>
                    <div className="pull-right mt-3">
                        <Link
                            className="btn cursor bg-primary text-white border mr-4"
                            onClick={handleAddUpdateItem}
                        >
                            {editItemData ? "Next" : "Save & Next"}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ItemAddEdit;
