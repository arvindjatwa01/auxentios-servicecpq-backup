import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { Modal } from 'react-bootstrap'
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import $ from "jquery";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import shearchIcon from "../../../assets/icons/svg/search.svg";

import { MuiMenuComponent } from "../../Operational/index";
import { errorToastMessage, isEmptyData, isEmptySelectData, successToastMessage } from './utilities/textUtilities';
import ItemAddEdit from './portfolio-item/ItemAddEdit';
import ItemPriceCalculator from './portfolio-item/ItemPriceCalculator';
import { convertTimestampToFormateDate } from './utilities/dateUtilities';
import { FONT_STYLE_SELECT } from 'pages/Repair/CONSTANTS';
import {
    getItemDataById,
    getSearchQueryCoverage,
    itemCreation,
    updateItemData
} from '../../../services/index';

import { updateItemPriceSjRkId } from './portfolio-item/SJRKIdUpdate';

const offerValidityKeyValuePairs = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
];

const salesOfficeKeyValuePairs = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
];

const serviceTypeKeyValuePairs = [
    { value: "free", label: "Free" },
    { value: "chargeable", label: "Chargeable" },
];

const additionalPriceKeyValuePair = [
    { label: "Surcharge %", value: "PERCENTAGE" },
    { label: "Surcharge $", value: "ABSOLUTE", },
];

const discountTypeKeyValuePair = [
    { value: "PROGRAM_DISCOUNT", label: "Program" },
    { value: "CUSTOMER_DISCOUNT", label: "Customer" },
    { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
];

const usageTypeKeyValuePair = [
    { value: "Planned Usage", label: "Planned Usage" },
    { value: "Recommended usage", label: "Recommended usage" },
];

const defaultItemHeaderObj = {
    itemHeaderId: 0,
    itemHeaderDescription: "",
    bundleFlag: "SERVICE",
    withBundleService: false,
    portfolioItemIds: [],
    reference: "",
    itemHeaderMake: "",
    itemHeaderFamily: "",
    model: "",
    prefix: "",
    type: "",
    additional: "",
    currency: "",
    netPrice: 0,
    itemProductHierarchy: "EMPTY",
    itemHeaderGeographic: "EMPTY",
    responseTime: "EMPTY",
    usage: "",
    validFrom: "",
    validTo: "",
    estimatedTime: "",
    servicePrice: 0,
    status: "DRAFT",
    componentCode: "",
    componentDescription: "",
    serialNumber: "",
    itemHeaderStrategy: "EMPTY",
    variant: "",
    itemHeaderCustomerSegment: "",
    jobCode: "",
    preparedBy: "",
    approvedBy: "",
    preparedOn: "",
    revisedBy: "",
    revisedOn: "",
    salesOffice: "",
    offerValidity: "",
    serviceChargable: true,
    serviceOptional: false,
}

const defaultItemBodyObj = {
    itemBodyId: 0,
    itemBodyDescription: "",
    spareParts: ["EMPTY"],
    labours: ["EMPTY"],
    miscellaneous: ["EMPTY"],
    taskType: ["EMPTY"],
    solutionCode: "",
    usageIn: "",
    usage: "",
    year: "",
    avgUsage: 0,
    itemPrices: [],
}

const activityOptions = ["None", "Atria", "Callisto"];

const BundleServiceAddUpdate = (props) => {
    const { show, hideModel, itemFlag, customerSegmentKeyValuePair,
        machineComponentKeyValuePair, itemVersionKeyValuePairs,
        itemStatusKeyValuePairs, itemId, frequencyKeyValuePairs,
        unitKeyValuePairs, priceHeadTypeKeyValuePair, priceTypeKeyValuePair,
        priceMethodKeyValuePair, currencyKeyValuePair } = props;

    const [activeTab, setActiveTab] = useState("bundleServiceHeader")
    const [itemActive, setItemActive] = useState(false)

    const [bundleServiceItemHeader, setBundleServiceItemHeader] = useState({ ...defaultItemHeaderObj })
    const [bundleServiceItemBody, setBundleServiceItemBody] = useState({ ...defaultItemBodyObj })

    const [bundleServiceEdit, setBundleServiceEdit] = useState({
        bundleServiceHeader: false,
        bundleServiceItems: false,
        bundleServicePrice: false,
        bundleServiceAdministrative: false,
    })

    const [bundleServiceObj, setBundleServiceObj] = useState({
        itemId: 0,
        name: "",
        description: "",
        itemBodyDescription: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        model: "",
        family: "",
        prefix: "",
        additional: "",
        estimatedTime: "",
        unit: "",
        usageType: "",
        frequency: "",
        currency: "",
        machineComponent: "",
        serviceChargable: { value: "chargeable", label: "Chargeable" },
        supportLevel: { value: "STANDARD", label: "Standard (Bronze)" },
        status: { value: "DRAFT", label: "Draft" },
    })

    const [administrative, setAdministrative] = useState({
        preparedBy: "",
        approvedBy: "",
        preparedOn: new Date(),
        revisedBy: "",
        revisedOn: new Date(),
        salesOffice: "",
        offerValidity: "",
    });

    const [modelSearchList, setModelSearchList] = useState([])
    const [modelSelect, setModelSelect] = useState(false)
    const [prefixKeyValuePair, setPrefixKeyValuePair] = useState([])

    useEffect(() => {
        if (itemId) {
            handleGetItemDetails(itemId)
            setBundleServiceEdit({
                bundleServiceHeader: true,
                bundleServiceItems: true,
                bundleServicePrice: true,
                bundleServiceAdministrative: true,
            })
        }
    }, [itemId])

    // get Select Bundle/Service Item Details
    const handleGetItemDetails = async (itemId) => {
        const itemDetails = await getItemDataById(itemId);
        if (itemDetails.status === 200) {
            const { itemId, itemName, itemHeaderModel, itemBodyModel } = itemDetails.data;

            // set customer Segment
            const _customerSegment = customerSegmentKeyValuePair.find(obj => obj.value === itemHeaderModel.itemHeaderCustomerSegment);

            // Set machine-component Type
            const _machineType = machineComponentKeyValuePair.find(obj => obj.value === itemHeaderModel.type);

            // set Item Status
            const _status = itemStatusKeyValuePairs.find(obj => obj.value === itemHeaderModel.status)

            setBundleServiceObj({
                ...bundleServiceObj,
                itemId: itemId,
                name: itemName,
                description: itemHeaderModel.itemHeaderDescription,
                bundleFlag: itemHeaderModel.bundleFlag,
                reference: itemHeaderModel.reference,
                customerSegment: _customerSegment || "",
                make: itemHeaderModel.itemHeaderMake,
                model: itemHeaderModel.model,
                family: itemHeaderModel.itemHeaderFamily,
                prefix: itemHeaderModel.prefix,
                additional: "",
                estimatedTime: itemHeaderModel.estimatedTime,
                unit: "",
                usageType: "",
                frequency: "",
                currency: itemHeaderModel.currency,
                machineComponent: _machineType || "",
                serviceChargable: itemHeaderModel.serviceChargable ? { value: "chargeable", label: "Chargeable" } : { value: "free", label: "Free" },
                supportLevel: { value: "STANDARD", label: "Standard (Bronze)" },
                status: _status,
            })

            setModelSelect(!isEmptyData(itemHeaderModel.model))
            setBundleServiceItemHeader({ ...itemHeaderModel })
            setBundleServiceItemBody({ ...itemBodyModel })

        }
    }

    // handle Bundle/Service Edit falg
    const handleBundleServiceEditFlag = () => {
        setBundleServiceEdit({
            ...bundleServiceEdit,
            bundleServiceHeader: itemId ? !bundleServiceEdit.bundleServiceHeader : false,
        })
    }

    // search model
    const handleModelSearch = (e) => {
        setModelSelect(false);
        var searchStr = "model~" + e.target.value;
        getSearchQueryCoverage(searchStr)
            .then((res) => {
                $(`.scrollbar-model`).css("display", "block");
                setModelSearchList(res)
                var prefixOptions = [];
                for (var n = 0; n < res.length; n++) {
                    prefixOptions.push({ label: res[n].prefix, value: res[n].prefix })
                }
                setPrefixKeyValuePair(prefixOptions);
            })
            .catch((err) => {
                return;
            });
    }

    // Select Search Model from list
    const handleSelectModel = (currentItem) => {
        setBundleServiceObj(pre => ({
            ...pre,
            model: currentItem.model,
            make: currentItem.make,
            family: currentItem.family
        }))
        setModelSelect(true);
        $(`.scrollbar-model`).css("display", "none");
    }

    // input fields text change
    const handleTextChange = (e) => {
        const { name, type, value } = e.target;
        if (type === "number") {
            setBundleServiceObj(pre => ({ ...pre, [name]: parseInt(value) }))
        } else {
            setBundleServiceObj(pre => ({ ...pre, [name]: value }))
        }
    }

    // administrative tab text change
    const handleAdministrativeTextChange = (e, type, keyName) => {
        if (type === "text") {
            setAdministrative(pre => ({ ...pre, [e.target.name]: e.target.value }))
        } else if (type === "date") {
            setAdministrative(pre => ({ ...pre, [keyName]: e }))
        } else if (type === "select") {
            setAdministrative(pre => ({ ...pre, [keyName]: e }))
        }
    }

    // Select text change
    const handleSelectChange = (e, keyName) => {
        setBundleServiceObj(pre => ({ ...pre, [keyName]: e }))
    }

    // make item status options disable 
    const handleStatusOptionsDisable = (optionData) => {
        if ((optionData.value === "DRAFT" && bundleServiceObj.status.value == "ACTIVE")) {
            setItemActive(false)
            return true;
        }

        if (((optionData.value === "DRAFT" || optionData.value === "ACTIVE") && (bundleServiceObj.status.value == "REVISED"))) {
            return true;
        }

        if (((optionData.value === "DRAFT" || optionData.value === "ACTIVE" || optionData.value === "REVISED") &&
            (bundleServiceObj.status.value == "ARCHIVED"))) {
            return true;
        }
    }

    // check bundle Header input validation
    const checkHeaderValidation = () => {
        try {
            if (isEmptyData(bundleServiceObj.name)) {
                errorToastMessage(itemFlag === "SERVICE" ? "Service" : "Bundle" + " Name is a required field, you can’t leave it blank");
                return false;
            } else if (isEmptyData(bundleServiceObj.description)) {
                errorToastMessage(itemFlag === "SERVICE" ? "Service" : "Bundle" + " Description is a required field, you can’t leave it blank");
                return false;
            } else if (isEmptyData(bundleServiceObj.model)) {
                errorToastMessage("Model is a required field, you can’t leave it blank");
                return false;
            } else if (!modelSelect) {
                errorToastMessage("Please Enter valid Model .");
                return false;
            }
            return true;
        } catch (error) {
            return
        }
    }

    // Bundle/Service Header Tab Button Action
    const handleBundleServiceHeader = async () => {
        try {
            if (!bundleServiceEdit.bundleServiceHeader && !checkHeaderValidation()) {
                return;
            }
            if (itemFlag === "SERVICE") {
                if (bundleServiceEdit.bundleServiceHeader) {
                    setActiveTab("bundleServicePrice")
                }
                if (!bundleServiceEdit.bundleServiceHeader && bundleServiceObj.status?.value === "ACTIVE") {
                    errorToastMessage("Service Status is Active, change Status for change item details.");
                    return;
                }
                let serviceReqObj = {
                    itemId: bundleServiceObj.itemId,
                    itemName: bundleServiceObj.name,
                    itemHeaderModel: {
                        ...bundleServiceItemHeader,
                        itemHeaderDescription: bundleServiceObj.description,
                        bundleFlag: "SERVICE",
                        reference: bundleServiceObj.reference,
                        itemHeaderMake: bundleServiceObj.make,
                        itemHeaderFamily: bundleServiceObj.family,
                        model: bundleServiceObj.model,
                        prefix: bundleServiceObj.prefix?.value || "",
                        type: bundleServiceObj.machineComponent?.value || "EMPTY",
                        estimatedTime: bundleServiceObj.estimatedTime,
                        status: "DRAFT",
                        itemHeaderCustomerSegment: bundleServiceObj.customerSegment?.value || "",
                        preparedBy: administrative.preparedBy,
                        approvedBy: administrative.approvedBy,
                        preparedOn: administrative.preparedOn,
                        revisedBy: administrative.revisedBy,
                        revisedOn: administrative.revisedOn,
                        salesOffice: administrative.salesOffice?.value || "",
                        offerValidity: administrative.offerValidity?.value || "",
                        serviceChargable: (bundleServiceObj.serviceChargable?.value === "chargeable"),
                        serviceOptional: (!(bundleServiceObj.serviceChargable?.value === "chargeable"))
                    },
                    itemBodyModel: { ...bundleServiceItemBody },
                }
                if (itemId) {
                    const updateService = await updateItemData(itemId, serviceReqObj)
                    if (updateService.status === 200) {
                        successToastMessage(bundleServiceObj.name + " Update Successfully.")
                        setActiveTab("bundleServicePrice")
                    }
                } else {
                    const createService = await itemCreation(serviceReqObj);
                    if (createService.status === 200) {
                        successToastMessage(bundleServiceObj.name + " Create Successfully.")
                        setActiveTab("bundleServicePrice")
                    }
                }
            } else {
                setActiveTab("bundleServiceItems")
            }
        } catch (error) {
            return;
        }
    }

    const handleBundleServiceItems = async (editItemData, itemRequestObj, itemPriceDataId, isPortfolioItem) => {
        setBundleServiceItemHeader({
            ...bundleServiceItemHeader,
            usage: itemRequestObj.usageType?.value || "",
        });
        setBundleServiceItemBody({
            ...bundleServiceItemBody,
            itemBodyDescription: "",
            taskType: itemRequestObj.taskType,
            usageIn: itemRequestObj.usageIn,
            usage: itemRequestObj.usageType,
            year: itemRequestObj.year,
            itemPrices: [...bundleServiceItemBody, { itemPriceDataId: itemPriceDataId }],
        });
        // updateItemPriceSjRkId({
        //     standardJobId: itemRequestObj.standardJobId,
        //     repairKitId: itemRequestObj.repairKitId,
        //     itemId: 0,
        //     itemPriceDataId: 0
        // })
    }

    return (
        <Modal size="xl" show={show} onHide={hideModel}>
            <Modal.Body>
                <Box sx={{ typography: "body1" }}>
                    <TabContext value={activeTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList className="custom-tabs-div" aria-label="lab API tabs example"
                                onChange={(e, tabValue) => setActiveTab(tabValue)}
                            // onChange={(e, newValue) => bundleAndServiceEditAble && setBundleTabs(newValue)}
                            >
                                <Tab label={`${itemFlag} HEADER`} value="bundleServiceHeader" />
                                <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                                {itemFlag === "BUNDLE" && <Tab label={`${itemFlag} ITEMS`} value="bundleServiceItems" />}
                                {itemFlag === "BUNDLE" && <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>}
                                <Tab label="PRICE CALCULATOR" value="bundleServicePrice" />
                                <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                                <Tab label="ADMINISTRATIVE" value="bundleServiceAdministrative" />
                            </TabList>
                        </Box>
                        <TabPanel value="bundleServiceHeader">
                            <div className="container-fluid ">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div className="ml-3 green-custom-btn ">
                                        {itemFlag === "SERVICE" &&
                                            <Select
                                                className={`customselectbtn1 p-${bundleServiceEdit.bundleServiceHeader ? 0 : 2} border-radius-10 ${bundleServiceObj.serviceChargable?.value == "chargeable" ? "bg-gray-light" : "bg-green-light"}`}
                                                onChange={(e) => handleSelectChange(e, "serviceChargable")}
                                                options={serviceTypeKeyValuePairs}
                                                value={bundleServiceObj.serviceChargable}
                                                isDisabled={bundleServiceEdit.bundleServiceHeader}
                                            />
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="ml-3">
                                            <Select className="customselectbtn1"
                                                onChange={(e) => handleSelectChange(e, "supportLevel")}
                                                options={itemVersionKeyValuePairs}
                                                value={bundleServiceObj.supportLevel}
                                                isDisabled={bundleServiceEdit.bundleServiceHeader}
                                            />
                                        </div>

                                        <div className="ml-3">
                                            <Select className="customselectbtn"
                                                onChange={(e) => handleSelectChange(e, "status")}
                                                options={itemStatusKeyValuePairs}
                                                value={bundleServiceObj.status}
                                                isOptionDisabled={(option) => handleStatusOptionsDisable(option)}
                                                isDisabled={bundleServiceEdit.bundleServiceHeader}
                                            />
                                        </div>
                                        <a className="ml-3 font-size-14 cursor"><img src={shareIcon} /></a>
                                        <a className="ml-3 font-size-14 cursor"><img src={folderaddIcon} /></a>
                                        <a className="ml-3 font-size-14 cursor"><img src={uploadIcon} /></a>
                                        <a className="ml-3 font-size-14 cursor"> <img src={cpqIcon} /></a>
                                        <a className="ml-3 font-size-14 cursor"><img src={deleteIcon} /></a>
                                        <a className="ml-3 font-size-14 cursor"><img src={copyIcon} /></a>
                                        <a className="ml-2 cursor"><MuiMenuComponent options={activityOptions} /></a>
                                    </div>
                                </div>
                                <div className="card p-4 mt-5">
                                    <h5 className="d-flex align-items-center mb-0">
                                        <div className="" style={{ display: "contents" }}>
                                            <span className="mr-3">Header</span>
                                            <a className="btn-sm cursor" onClick={handleBundleServiceEditFlag}
                                            // onClick={makeBundleServiceHeaderEditable}
                                            >
                                                <i className="fa fa-pencil" aria-hidden="true" />
                                            </a>
                                            <a className="btn-sm cursor">
                                                <i className="fa fa-bookmark-o" aria-hidden="true" />
                                            </a>
                                            <a className="btn-sm cursor">
                                                <img style={{ width: "14px" }} src={folderaddIcon} />
                                            </a>
                                        </div>
                                        <div className="input-group icons border-radius-10 border">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                                    <img src={shearchIcon} />
                                                </span>
                                            </div>
                                            <input type="search" className="form-control search-form-control" aria-label="Search Dashboard" />
                                        </div>
                                    </h5>
                                    {bundleServiceEdit.bundleServiceHeader ?
                                        <div className="row mt-4 ">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{itemFlag} NAME</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.name) ? "NA" : bundleServiceObj.name}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{itemFlag} DESCRIPTION</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.description) ? "NA" : bundleServiceObj.description}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">BUNDLE/SERVICE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{itemFlag === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM"}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.reference) ? "NA" : bundleServiceObj.reference}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.customerSegment?.value) ? "NA" : bundleServiceObj.customerSegment?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MACHINE/COMPONENT</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.machineComponent?.value) ? "NA" : bundleServiceObj.machineComponent?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group customselectmodelSerch">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MODEL(S)</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.model) ? "NA" : bundleServiceObj.model}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">FAMILY</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.family) ? "NA" : bundleServiceObj.family}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MAKE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.make) ? "NA" : bundleServiceObj.make}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREFIX(S)</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.prefix?.value) ? "NA" : bundleServiceObj.prefix?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">ESTIMATED HOURS</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.estimatedTime) ? "NA" : bundleServiceObj.estimatedTime}</h6>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="row mt-4 input-fields">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">{itemFlag} NAME</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="name"
                                                        placeholder="Name (Required*)" onChange={handleTextChange}
                                                        value={bundleServiceObj.name} disabled={bundleServiceObj.itemId !== 0} />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">{itemFlag} DESCRIPTION</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="description"
                                                        placeholder="Description (Required*)" value={bundleServiceObj.description}
                                                        onChange={handleTextChange} />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">BUNDLE/SERVICE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="bundleFlag"
                                                        placeholder="Bundle Flag" value={itemFlag === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM"}
                                                        onChange={handleTextChange} disabled />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">REFERENCE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="reference"
                                                        placeholder="Reference" value={bundleServiceObj.reference}
                                                        onChange={handleTextChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">CUSTOMER SEGMENT</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "customerSegment")}
                                                        className="text-primary"
                                                        value={bundleServiceObj.customerSegment}
                                                        options={customerSegmentKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MACHINE/COMPONENT</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "machineComponent")}
                                                        value={bundleServiceObj.machineComponent}
                                                        className="text-primary"
                                                        options={machineComponentKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group customselectmodelSerch">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MODEL(S)</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="model"
                                                        placeholder="Model(Required*)" value={bundleServiceObj.model}
                                                        onChange={(e) => { handleTextChange(e); handleModelSearch(e); }}
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                    {
                                                        <ul className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`} id="style">
                                                            {modelSearchList.map((currentItem, j) => (
                                                                <li className="list-group-item text-primary" key={j}
                                                                    onClick={() => handleSelectModel(currentItem)}>
                                                                    {currentItem.model}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">FAMILY</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="make"
                                                        placeholder="Auto Fill Search Model...." value={bundleServiceObj.family} disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MAKE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="make"
                                                        placeholder="Auto Fill Search Model...." value={bundleServiceObj.make}
                                                        onChange={handleTextChange} disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">PREFIX(S)</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "prefix")}
                                                        className="text-primary"
                                                        value={bundleServiceObj.prefix}
                                                        options={prefixKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">ESTIMATED HOURS</label>
                                                    <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                                        <input type="number"
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary" name="estimatedTime"
                                                            onChange={handleTextChange}
                                                            value={bundleServiceObj.estimatedTime}
                                                        />
                                                        <span className="hours-div text-primary">hours/day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button type="button" className="btn text-white bg-primary" onClick={handleBundleServiceHeader}>
                                            {bundleServiceEdit.bundleServiceHeader ? "Next" : "Save & Next"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="bundleServiceItems">
                            <ItemAddEdit
                                itemType="bundleItem"
                                isEditable={bundleServiceEdit.bundleServiceItems}
                                isPortfolioItem={false}
                                // bundleServiceNeed={bundleServiceNeed}
                                // handleBundleServiceNeed={() => setBundleServiceNeed(!bundleServiceNeed)}
                                frequencyKeyValuePairs={frequencyKeyValuePairs}
                                unitKeyValuePairs={unitKeyValuePairs}
                                handleGetPortfolioItemsData={handleBundleServiceItems}
                            />
                        </TabPanel>
                        <TabPanel value="bundleServicePrice">
                            <ItemPriceCalculator
                                priceMethodKeyValuePair={priceMethodKeyValuePair}
                                priceTypeKeyValuePair={priceTypeKeyValuePair}
                                priceHeadTypeKeyValuePair={priceHeadTypeKeyValuePair}
                                unitKeyValuePairs={unitKeyValuePairs}
                                frequencyKeyValuePairs={frequencyKeyValuePairs}
                                currencyKeyValuePair={currencyKeyValuePair}
                                additionalPriceKeyValuePair={additionalPriceKeyValuePair}
                                discountTypeKeyValuePair={discountTypeKeyValuePair}
                                usageTypeKeyValuePair={usageTypeKeyValuePair}
                            />
                        </TabPanel>
                        <TabPanel value="bundleServiceAdministrative">
                            <div>
                                <div className="ligt-greey-bg p-3">
                                    <div><span className="mr-3 cursor">
                                        <i className="fa fa-pencil font-size-12" aria-hidden="true" />
                                        <span className="ml-2">Edit</span>
                                    </span></div>
                                </div>
                                {bundleServiceEdit.bundleServiceAdministrative ?
                                    <div className="row mt-4">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED BY</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.preparedBy) ? "NA" : administrative.preparedBy}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">APPROVED BY</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.approvedBy) ? "NA" : administrative.preparedBy}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED ON</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.preparedOn) ? "NA" : convertTimestampToFormateDate(administrative.preparedOn)}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED BY</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.revisedBy) ? "NA" : administrative.revisedBy}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED ON</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.revisedOn) ? "NA" : convertTimestampToFormateDate(administrative.revisedOn)}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.salesOffice?.value) ? "NA" : administrative.salesOffice?.label}</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <p className="text-light-dark font-size-12 font-weight-500 mb-2">OFFER VALIDITY</p>
                                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(administrative.offerValidity?.value) ? "NA" : administrative.offerValidity?.label}</h6>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="row mt-4  input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">PREPARED BY</label>
                                                <input type="text" className="form-control text-primary border-radius-10" name="preparedBy"
                                                    placeholder="Required (ex-abc@gmail.com)" value={administrative.preparedBy}
                                                    onChange={(e) => handleAdministrativeTextChange(e, "text")}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">APPROVED BY</label>
                                                <input type="text" className="form-control text-primary border-radius-10" name="approvedBy"
                                                    placeholder="Optional  (ex-abc@gmail.com)" value={administrative.approvedBy}
                                                    onChange={(e) => handleAdministrativeTextChange(e, "text")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-14 font-weight-500">PREPARED ON</label>
                                            <div className="d-flex align-items-center date-box w-100">
                                                <div className="form-group w-100">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DatePicker
                                                            variant="inline"
                                                            format="dd/MM/yyyy"
                                                            className="form-controldate border-radius-10"
                                                            label=""
                                                            name="preparedOn"
                                                            value={administrative.preparedOn}
                                                            onChange={(e) => handleAdministrativeTextChange(e, "date", "preparedOn")}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">REVISED BY</label>
                                                <input type="text" className="form-control border-radius-10 text-primary" name="revisedBy"
                                                    placeholder="Optional  (ex-abc@gmail.com)" value={administrative.revisedBy}
                                                    onChange={(e) => handleAdministrativeTextChange(e, "text")}
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
                                                                value={administrative.revisedOn}
                                                                onChange={(e) => handleAdministrativeTextChange(e, "date", "revisedOn")}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500"> SALES OFFICE / BRANCH</label>
                                                <Select className="text-primary"
                                                    options={salesOfficeKeyValuePairs}
                                                    onChange={(e) => handleAdministrativeTextChange(e, "select", "salesOffice")}
                                                    value={administrative.salesOffice}
                                                    styles={FONT_STYLE_SELECT}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">OFFER VALIDITY</label>
                                                <Select className="text-primary"
                                                    options={offerValidityKeyValuePairs}
                                                    onChange={(e) => handleAdministrativeTextChange(e, "select", "offerValidity")}
                                                    value={administrative.offerValidity}
                                                    styles={FONT_STYLE_SELECT}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row" style={{ justifyContent: "right" }}>
                                    <button type="button" className="btn text-white bg-primary"
                                    // onClick={editBundleService ? saveAddNewServiceOrBundle : handleUpdateNewServiceOrBundle}
                                    > {bundleServiceEdit.bundleServiceAdministrative ? "Close" : "Save & CLose"}</button>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal.Body>
        </Modal>
    )
}

export default BundleServiceAddUpdate