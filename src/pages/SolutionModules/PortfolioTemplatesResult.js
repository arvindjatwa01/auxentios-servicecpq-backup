import React, { useEffect, useState } from "react";
import {
    Modal,
    SplitButton,
    Dropdown,
    ButtonGroup,
    Button,
} from "react-bootstrap";
import { DataGrid } from '@mui/x-data-grid';
import { CommanComponents } from "../../components/index"
import FormGroup from '@mui/material/FormGroup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import shearchIcon from "../../assets/icons/svg/search.svg";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as ENUM from "../PortfolioAndBundle/CONSTS.js";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Link, useLocation } from 'react-router-dom'
// import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControlLabel, Switch } from "@material-ui/core";
import { FileUploader } from "react-drag-drop-files";
// import MuiMenuComponent from "../Operational/MuiMenuComponent";
import Tooltip from "@mui/material/Tooltip";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import searchLogo from '../../assets/icons/svg/search.svg'

import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";

import AddPortfolioItem from "../PortfolioAndBundle/AddPortfolioItem";


import { MuiMenuComponent } from "../Operational/index";


import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DataTable from "react-data-table-component";
import PriceCalculator from "../PortfolioAndBundle/PriceCalculator";
import penIcon from "../../assets/images/pen.png";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Loader from "react-js-loader";


import {
    createCustomPortfolio,
    getCustomPortfolio,
    getPortfolioSchema,
    getMakeKeyValue,
    getModelKeyValue,
    getPrefixKeyValue,
    updateCustomPortfolio,
    getUsageCategoryKeyValue,
    getTaskTypeKeyValue,
    getResponseTimeTaskKeyValue,
    getValidityKeyValue,
    getStrategyTaskKeyValue,
    getProductHierarchyKeyValue,
    getGergraphicKeyValue,
    getMachineTypeKeyValue,
    getLifeStageKeyValue,
    getTypeKeyValue,
    getPortfolioCommonConfig,
    getSearchQueryCoverage,
    getSearchCoverageForFamily,
    itemCreation,
    createCoverage,
    createCutomCoverage,
    getItemPrice,
    getCustomItemData,
    getcustomItemPriceById,
    updateCustomPriceData,
} from "../../services/index";
import {
    selectCategoryList,
    selectFrequencyList,
    selectGeographicalList,
    selectProductList,
    selectResponseTimeList,
    selectStrategyTaskList,
    selectStrategyTaskOption,
    selectTaskList,
    selectUnitList,
    selectUpdateList,
    selectUpdateTaskList,
    taskActions,
} from "../PortfolioAndBundle/customerSegment/strategySlice";

import QuerySearchComp from '../PortfolioAndBundle/QuerySearchComp';

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const customStyles = {
    rows: {
        style: {
            minHeight: "72px", // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
            backgroundColor: "#7571f9",
            // backgroundColor: "#872ff7",
            color: "#fff",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
        },
    },
};

export function PortfolioTemplatesResult(props) {

    const location = useLocation();

    const [makeKeyValue, setMakeKeyValue] = useState([]);
    const [modelKeyValue, setModelKeyValue] = useState([]);
    const [prefixKeyValue, setPrefixKeyValue] = useState([]);
    const [validityKeyValue, setValidityKeyValue] = useState([]);
    const [headerType, setHeaderType] = useState(null);
    const [headerTypeKeyValue, setHeaderTypeKeyValue] = useState([]);
    const [responseTimeTaskKeyValue, setResponseTimeTaskKeyValue] = useState([]);
    const [taskTypeKeyValue, setTaskTypeKeyValue] = useState([]);

    const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
        []
    );
    const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [openCoverage, setOpenCoveragetable] = React.useState(false);

    const [productHierarchyKeyValue, setProductHierarchyKeyValue] = useState([]);
    const [geographicKeyValue, setGeographicKeyValue] = useState([]);
    const [typeKeyValue, setTypeKeyValue] = useState([]);

    const [machineTypeKeyValueList, setMachineTypeKeyValueList] = useState([])
    const [lifeStageOfMachineKeyValueList, setLifeStageOfMachineKeyValueList] = useState([])

    const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
    const [lifeStageOfMachineKeyValue, setLifeStageOfMachineKeyValue] = useState([]);
    const [isView, setIsView] = useState(false);
    const [createNewBundle, setCreateNewBundle] = useState(false);
    const [openSearchSolution, setOpenSearchSolution] = useState(false);

    const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
    const [bundleItems, setBundleItems] = useState([]);
    const [coverageItems, setCoverageItems] = useState([]);
    const [showAvailableCoverage, setShowAvailableCoverage] = useState(false);
    const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");
    const [priceAgreementRows, setPriceAgreementRows] = useState([]);

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
    const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([]);
    const [strategyOptionals, setStrategyOptionals] = useState([]);

    const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
    const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
    const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);
    const [stratgyResponseTimeKeyValue, setStratgyResponseTimeKeyValue] =
        useState([]);
    const [stratgyHierarchyKeyValue, setStratgyHierarchyKeyValue] = useState([]);
    const [stratgyGeographicKeyValue, setStratgyGeographicKeyValue] = useState(
        []
    );
    const [stratgyOptionalsKeyValue, setStratgyOptionalsKeyValue] = useState([]);

    const [masterData, setMasterData] = useState([]);
    const [filterMasterData, setFilterMasterData] = useState([]);
    const [selectedMasterData, setSelectedMasterData] = useState([]);
    const [flagIs, setFlagIs] = useState(false);
    const [openModelBoxDataId, setOpenModelBoxDataId] = useState({});
    const [openModelRowData, setOpenModelRowData] = useState({});
    const [openedModelBoxData, setOpenedModelBoxData] = useState([]);
    const [modelIncludedData, setModelIncludedData] = useState([]);


    const [editAbleCustomPriceData, setEditAbleCustomPriceData] = useState([]);

    const [partsRequired, setPartsRequired] = useState(true);
    const [labourRequired, setlabourRequired] = useState(true);
    const [serviceRequired, setServiceRequired] = useState(true);
    const [miscRequired, setMiscRequired] = useState(true);

    // const [selectePortfolioTempItemsData, setSelectedPortfolioTempItemsData] = useState([]);
    const [selectedCustomItems, setSelectedCustomItems] = useState([]);

    const [coverageData, setCoverageData] = useState({
        make: "",
        modal: "",
        prefix: "",
        makeSelect: null,
        modelSelect: null,
        prefixSelect: null,
        machineComponent: null,
        machineType: null,
        marchineDate: new Date(),
    });

    const [strategyData, setStrategyData] = useState({
        make: "",
        model: "",
        prefix: "",
        machineComponent: "",
        machineType: "",
        machineDate: "",
    })

    const [administrative, setAdministrative] = useState({
        preparedBy: null,
        approvedBy: null,
        preparedOn: new Date(),
        revisedBy: null,
        revisedOn: new Date(),
        salesOffice: null,
        offerValidity: null,
    });

    const [validityData, setValidityData] = useState({
        fromDate: new Date(),
        toDate: new Date(),
        from: null,
        to: null,
        fromInput: "",
        toInput: "",
    });

    const [generalComponentData, setGeneralComponentData] = useState({
        name: "",
        description: "",
        serviceDescription: "",
        externalReference: "",
        customerSegment: null,
        customItems: [],
        customCoverages: [],
    });

    const [newBundle, setNewBundle] = useState({
        serviceDescription: "",
        bundleFlag: "",
        reference: "",
        customerSegment: null,
        machineComponent: null,
    });

    const [portfolioId, setPortfolioId] = useState();
    const [prefilgabelGeneral, setPrefilgabelGeneral] = useState("PORTFOLIO");
    const [priceAgreementOption, setPriceAgreementOption] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [addPortFolioItem, setAddportFolioItem] = useState({
        id: 0,
        description: "",
        usageIn: categoryUsageKeyValue1,
        taskType: "",
        frequency: "",
        unit: "",
        recomondedValue: "",
        quantity: "",
        strategyEvents: "",
        templateId: "",
        templateDescription: "",
        repairOption: "",
    });

    const [showRelatedModel, setShowRelatedModel] = useState(false);
    const [editSerialNo, setEditSerialNo] = useState({
        coverageId: "",
        make: "",
        family: "",
        modelNo: "",
        serialNoPrefix: "",
        startSerialNo: "",
        endSerialNo: "",
        fleet: "",
        fleetSize: "",
    });

    const [priceCalculator, setPriceCalculator] = useState({
        priceMethod: "",
        listPrice: "",
        priceAdditionalSelect: "",
        priceAdditionalInput: "",
        priceEscalationSelect: "",
        priceEscalationInput: "",
        calculatedPrice: "",
        flatPrice: "",
        discountTypeSelect: "",
        discountTypeInput: "",
        priceYear: "",
        startUsage: "",
        endUsage: "",
        usageType: "",
        frequency: "",
        cycle: "",
        suppresion: "",
        netPrice: 1200,
        totalPrice: 1200,
    });

    const [serviceOrBundlePrefix, setServiceOrBundlePrefix] = useState("");

    const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
        id: "",
        description: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        models: "",
        prefix: "",
        machine: "",
        additional: "",
    });

    const [tabs, setTabs] = useState("1");
    const [itemModelShow, setItemModelShow] = useState(false);
    const [loadingItem, setLoadingItem] = useState(false);
    const [tempBundleItems, setTempBundleItems] = useState([]);
    const [valueOfUseCase, setValueOfUseCase] = useState(4);
    const [tempBundleItemCheckList, setTempBundleItemCheckList] = useState({});
    const [bundleTabs, setBundleTabs] = useState("1");
    const [bundleServiceShow, setBundleServiceShow] = useState(false);


    const handleCustomerSegmentChange = (e) => {
        setGeneralComponentData({
            ...generalComponentData,
            customerSegment: e,
        });
    };

    const handleRemove = (index) => {
        var temp = priceAgreementRows.slice();
        temp.splice(index, 1);
        setPriceAgreementRows(temp);
    };

    const handleAddNewRowPriceAgreement = () => {
        var temp = [...priceAgreementRows];
        var index = temp.length;
        var rowHtml = (
            <>
                <tr>
                    <th scope="row">{temp.length + 1}</th>
                    <td>
                        <div className="form-group mb-0">
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder="1000-ENGINE"
                            />
                        </div>
                    </td>
                    <td>
                        <div className="form-group mb-0">
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder="1000-ENGINE"
                            />
                        </div>
                    </td>
                    <td>
                        <input type="text" placeholder="NA" />
                    </td>
                    <td>
                        <input type="text" placeholder="5%" />
                    </td>
                    <td>
                        <input type="text" placeholder="NA" />
                    </td>
                    <td>
                        <div>
                            <a href="#" className="mr-3">
                                <RemoveRedEyeOutlinedIcon className="font-size-16 mr-2" />
                                View detail
                            </a>
                            <a href="#" onClick={() => handleRemove(index)} className="">
                                <ModeEditIcon className="font-size-16 mr-2" />
                                View detail
                            </a>
                        </div>
                    </td>
                </tr>
            </>
        );
        temp.push(rowHtml);
        setPriceAgreementRows(temp);
    };

    const handleHeaderTypeChange = (e) => {
        setPrefilgabelGeneral(e.value);
        if (e.value == "PROGRAM") {
            setPriceAgreementOption(true);
        } else {
            setPriceAgreementOption(false);
        }
        setHeaderType(e);
    };

    const handleBundleItemSaveAndContinue = async () => {
        setTabs(`${parseInt(tabs) + 1}`);
        setLoadingItem(true);
        try {
            let reqObj = {
                itemId: 0,
                itemName: "",
                itemHeaderModel: {
                    itemHeaderId: 0,
                    // itemHeaderId: parseInt(generalComponentData.portfolioId),
                    itemHeaderDescription: generalComponentData.description,
                    bundleFlag: "PORTFOLIO",
                    reference: generalComponentData.externalReference,
                    itemHeaderMake: "",
                    itemHeaderFamily: "",
                    model: "",
                    prefix: "",
                    type: "MACHINE",
                    additional: "",
                    currency: "",
                    netPrice: 0,
                    itemProductHierarchy: generalComponentData.productHierarchy,
                    itemHeaderGeographic: generalComponentData.geographic,
                    responseTime: generalComponentData.responseTime,
                    usage: "",
                    validFrom: generalComponentData.validFrom,
                    validTo: generalComponentData.validTo,
                    estimatedTime: "",
                    servicePrice: 0,
                    status: "NEW",
                },
                itemBodyModel: {
                    itemBodyId: parseInt(addPortFolioItem.id),
                    itemBodyDescription: addPortFolioItem.description,
                    quantity: parseInt(addPortFolioItem.quantity),
                    startUsage: priceCalculator.startUsage,
                    endUsage: priceCalculator.endUsage,
                    standardJobId: "",
                    frequency: addPortFolioItem.frequency.value,
                    additional: "",
                    spareParts: ["WITH_SPARE_PARTS"],
                    labours: ["WITH_LABOUR"],
                    miscellaneous: ["LUBRICANTS"],
                    taskType: [addPortFolioItem.taskType.value],
                    solutionCode: "",
                    usageIn: addPortFolioItem.usageIn.value,
                    recommendedValue: 0,
                    usage: "",
                    repairKitId: "",
                    templateDescription: addPortFolioItem.description.value,
                    partListId: "",
                    serviceEstimateId: "",
                    numberOfEvents: parseInt(addPortFolioItem.strategyEvents),
                    repairOption: addPortFolioItem.repairOption.value,
                    priceMethod: "LIST_PRICE",
                    listPrice: parseInt(priceCalculator.listPrice),
                    priceEscalation: "",
                    calculatedPrice: parseInt(priceCalculator.calculatedPrice),
                    flatPrice: parseInt(priceCalculator.flatPrice),
                    discountType: "",
                    year: priceCalculator.priceYear.value,
                    avgUsage: 0,
                    unit: addPortFolioItem.unit.value,
                    sparePartsPrice: 0,
                    sparePartsPriceBreakDownPercentage: 0,
                    servicePrice: 0,
                    servicePriceBreakDownPercentage: 0,
                    miscPrice: 0,
                    miscPriceBreakDownPercentage: 0,
                    totalPrice: 0,
                },
            };
            const itemRes = await itemCreation(reqObj);
            console.log("itemCreation res:", itemRes);
            if (itemRes.status !== 200) {
                alert("something went wrong");
                return;
            }
            const itemPriceRes = await getItemPrice({
                standardJobId: itemRes.data.itemBodyModel.standardJobId,
                repairKitId: itemRes.data.itemBodyModel.repairKitId,
                itemId: itemRes.data.itemId
            })
            const { priceMethod, listPrice,
                priceEscalation, additional,
                calculatedPrice, flatPrice,
                discountType, year,
                totalPrice,
            } = itemRes.data.itemBodyModel

            setPriceCalculator({
                ...priceCalculator,
                priceMethod, listPrice,
                priceEscalationInput: priceEscalation,
                priceAdditionalInput: additional,
                calculatedPrice, flatPrice,
                discountTypeInput: discountType,
                year,
                totalPrice,

            })

            console.log("itemPriceRes", itemPriceRes)

            const _generalComponentData = { ...generalComponentData };
            _generalComponentData.items?.push({ itemId: itemRes.data.itemId });
            setGeneralComponentData(_generalComponentData);
            // put API for porfolio update Item id
            // call here
            const { portfolioId, ...res } = generalComponentData;
            let obj = {
                ...res,
                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment
                    ? generalComponentData.customerSegment.value
                    : "EMPTY",
                machineType: generalComponentData.machineType
                    ? generalComponentData.machineType
                    : "EMPTY",
                status: generalComponentData.status
                    ? generalComponentData.status
                    : "EMPTY",
                strategyTask: generalComponentData.strategyTask
                    ? generalComponentData.strategyTask
                    : "EMPTY",
                taskType: generalComponentData.taskType
                    ? generalComponentData.taskType
                    : "EMPTY",
                usageCategory: generalComponentData.usageCategory
                    ? generalComponentData.usageCategory
                    : "EMPTY",
                productHierarchy: generalComponentData.productHierarchy
                    ? generalComponentData.productHierarchy
                    : "EMPTY",
                geographic: generalComponentData.geographic
                    ? generalComponentData.geographic
                    : "EMPTY",
                availability: generalComponentData.availability
                    ? generalComponentData.availability
                    : "EMPTY",
                responseTime: generalComponentData.responseTime
                    ? generalComponentData.responseTime
                    : "EMPTY",
                type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                application: generalComponentData.application
                    ? generalComponentData.application
                    : "EMPTY",
                contractOrSupport: generalComponentData.contractOrSupport
                    ? generalComponentData.contractOrSupport
                    : "EMPTY",
                lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                    ? generalComponentData.lifeStageOfMachine
                    : "EMPTY",
                supportLevel: generalComponentData.supportLevel
                    ? generalComponentData.supportLevel
                    : "EMPTY",
                customerGroup: generalComponentData.customerGroup
                    ? generalComponentData.customerGroup
                    : "EMPTY",
                searchTerm: "EMPTY",
                supportLevel: "EMPTY",
                portfolioPrice: {},
                additionalPrice: {},
                escalationPrice: {},
                customCoverages: generalComponentData.coverages
                    ? generalComponentData.coverages
                    : [],
                customItems: selectedCustomItems,
                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,
            };
            if (generalComponentData.portfolioId) {
                const updatePortfolioRes = await updateCustomPortfolio(
                    generalComponentData.portfolioId,
                    obj
                );
                if (updatePortfolioRes.status != 200) {
                    throw `${updatePortfolioRes.status}:Something went wrong`;
                }
            }

            setGeneralComponentData(_generalComponentData);
            setTempBundleItems([...tempBundleItems, itemRes.data]);

            setOpenAddBundleItem(false);
            setOpenSearchSolution(false);
            setLoadingItem(false);
        } catch (error) {
            console.log("error in item creation err:", error);
        }
    };

    const saveAddNewServiceOrBundle = async () => {
        setTabs(`${parseInt(tabs) + 1}`);
        try {
            let reqObj = {
                itemId: 0,
                itemName: "",
                itemHeaderModel: {
                    itemHeaderId: 0,
                    // itemHeaderId: parseInt(generalComponentData.portfolioId),
                    itemHeaderDescription: createServiceOrBundle.description,
                    bundleFlag:
                        serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                    reference: createServiceOrBundle.reference,
                    itemHeaderMake: createServiceOrBundle.make,
                    itemHeaderFamily: "",
                    model: createServiceOrBundle.models,
                    prefix: createServiceOrBundle.prefix,
                    type: "MACHINE",
                    additional: createServiceOrBundle.additional.value,
                    currency: "",
                    netPrice: 0,
                    itemProductHierarchy: generalComponentData.productHierarchy,
                    itemHeaderGeographic: generalComponentData.geographic,
                    responseTime: generalComponentData.responseTime,
                    usage: "",
                    validFrom: generalComponentData.validFrom,
                    validTo: generalComponentData.validTo,
                    estimatedTime: "",
                    servicePrice: 0,
                    status: "NEW",
                },
                itemBodyModel: {
                    itemBodyId: parseInt(addPortFolioItem.id),
                    itemBodyDescription: addPortFolioItem.description,
                    quantity: parseInt(addPortFolioItem.quantity),
                    startUsage: priceCalculator.startUsage,
                    endUsage: priceCalculator.endUsage,
                    standardJobId: "",
                    frequency: addPortFolioItem.frequency.value,
                    additional: "",
                    spareParts: ["WITH_SPARE_PARTS"],
                    labours: ["WITH_LABOUR"],
                    miscellaneous: ["LUBRICANTS"],
                    taskType: [addPortFolioItem.taskType.value],
                    solutionCode: "",
                    usageIn: addPortFolioItem.usageIn.value,
                    recommendedValue: 0,
                    usage: "",
                    repairKitId: "",
                    templateDescription: addPortFolioItem.description.value,
                    partListId: "",
                    serviceEstimateId: "",
                    numberOfEvents: parseInt(addPortFolioItem.strategyEvents),
                    repairOption: addPortFolioItem.repairOption.value,
                    priceMethod: "LIST_PRICE",
                    listPrice: parseInt(priceCalculator.listPrice),
                    priceEscalation: "",
                    calculatedPrice: parseInt(priceCalculator.calculatedPrice),
                    flatPrice: parseInt(priceCalculator.flatPrice),
                    discountType: "",
                    year: priceCalculator.priceYear.value,
                    avgUsage: 0,
                    unit: addPortFolioItem.unit.value,
                    sparePartsPrice: 0,
                    sparePartsPriceBreakDownPercentage: 0,
                    servicePrice: 0,
                    servicePriceBreakDownPercentage: 0,
                    miscPrice: 0,
                    miscPriceBreakDownPercentage: 0,
                    totalPrice: 0,
                },
            };
            setOpen2(false); //Hide Price Calculator Screen

            const res = await itemCreation(reqObj);
            console.log("service or bundle res:", res);
            if (res.status == 200) {
                toast(`👏 ${serviceOrBundlePrefix} created`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // call update API for portfolio to update item with service or bundle
                const _bundleItems = [...bundleItems];
                if (_bundleItems[0].associatedServiceOrBundle) {
                    _bundleItems[0].associatedServiceOrBundle.push(res.data);
                } else {
                    _bundleItems[0] = {
                        ..._bundleItems[0],
                        associatedServiceOrBundle: [res.data],
                    };
                }
                setBundleItems([..._bundleItems]);
                // API call to update portfolio for service or bundle
                const { portfolioId, ...rest } = generalComponentData;
                let obj = {
                    ...rest,
                    visibleInCommerce: true,
                    customerId: 0,
                    lubricant: true,
                    customerSegment: generalComponentData.customerSegment
                        ? generalComponentData.customerSegment.value
                        : "EMPTY",
                    machineType: generalComponentData.machineType
                        ? generalComponentData.machineType
                        : "EMPTY",
                    status: generalComponentData.status
                        ? generalComponentData.status
                        : "EMPTY",
                    strategyTask: generalComponentData.strategyTask
                        ? generalComponentData.strategyTask
                        : "EMPTY",
                    taskType: generalComponentData.taskType
                        ? generalComponentData.taskType
                        : "EMPTY",
                    usageCategory: generalComponentData.usageCategory
                        ? generalComponentData.usageCategory
                        : "EMPTY",
                    productHierarchy: generalComponentData.productHierarchy
                        ? generalComponentData.productHierarchy
                        : "EMPTY",
                    geographic: generalComponentData.geographic
                        ? generalComponentData.geographic
                        : "EMPTY",
                    availability: generalComponentData.availability
                        ? generalComponentData.availability
                        : "EMPTY",
                    responseTime: generalComponentData.responseTime
                        ? generalComponentData.responseTime
                        : "EMPTY",
                    type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                    application: generalComponentData.application
                        ? generalComponentData.application
                        : "EMPTY",
                    contractOrSupport: generalComponentData.contractOrSupport
                        ? generalComponentData.contractOrSupport
                        : "EMPTY",
                    lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                        ? generalComponentData.lifeStageOfMachine
                        : "EMPTY",
                    supportLevel: generalComponentData.supportLevel
                        ? generalComponentData.supportLevel
                        : "EMPTY",
                    customerGroup: generalComponentData.customerGroup
                        ? generalComponentData.customerGroup
                        : "EMPTY",
                    searchTerm: "EMPTY",
                    supportLevel: "EMPTY",
                    portfolioPrice: {},
                    additionalPrice: {},
                    escalationPrice: {},
                    customCoverages: generalComponentData.coverages
                        ? generalComponentData.coverages
                        : [],
                    customItems: selectedCustomItems,
                    usageCategory: categoryUsageKeyValue1.value,
                    taskType: stratgyTaskTypeKeyValue.value,
                    strategyTask: stratgyTaskUsageKeyValue.value,
                    responseTime: stratgyResponseTimeKeyValue.value,
                    productHierarchy: stratgyHierarchyKeyValue.value,
                    geographic: stratgyGeographicKeyValue.value,
                };
                console.log("request obj for update:", obj);
                if (generalComponentData.portfolioId) {
                    const updatePortfolioRes = await updateCustomPortfolio(
                        generalComponentData.portfolioId,
                        obj
                    );
                    if (updatePortfolioRes.status != 200) {
                        throw `${updatePortfolioRes.status}:Something went wrong`;
                    }
                    console.log("portfolio updated:", updatePortfolioRes);
                } else {
                    throw `Please Create portfolio`;
                }
            } else {
                throw `${res.status}: ${serviceOrBundlePrefix} not created`;
            }
        } catch (error) {
            console.log("itemCreation err:", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    };

    const handleNewBundleItem = () => {
        setTabs("1");
        setItemModelShow(true);
        // setOpenAddBundleItem(true);

        setOpenSearchSolution(false);
        setCreateNewBundle(false);
        setOpenAddBundleItemHeader("Add New Portfolio Item");
    };

    const handleServiceItemEdit = (e, row) => {
        setOpenAddBundleItem(true);
        console.log("handleServiceItemEdit", row);
    };

    const handleServiceItemDelete = (e, row) => {
        const _bundleItems = [...bundleItems];
        const updated = _bundleItems.filter((currentItem) => {
            if (currentItem.id !== row.id) {
                return currentItem;
            }
        });
        setBundleItems(updated);
    };

    const handleServiceItemSave = (e, row) => {
        alert("save");
    };

    const handleDropdownChange = (type, e) => {
        if (type == ENUM.STRATEGY_TASK) {
            setStrategyData({
                ...strategyData,
                strategyTask: e,
            });
            if (e == null) {
                setTaskTypeKeyValue([]);
                setStrategyData({
                    ...strategyData,
                    taskType: null,
                    strategyTask: null,
                });
            } else {
                const options = e.second.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setTaskTypeKeyValue(options);
            }
        } else if (type == ENUM.TASK_TYPE) {
            setStrategyData({
                ...strategyData,
                taskType: e,
            });
        } else if (type == ENUM.CATEGORY_USAGE) {
            setStrategyData({
                ...strategyData,
                categoryUsage: e,
            });
        } else if (type == ENUM.RESPONSE_TIME) {
            setStrategyData({
                ...strategyData,
                responseTime: e,
            });
        } else if (type == ENUM.PRODUCT_HIERARCHY) {
            setStrategyData({
                ...strategyData,
                productHierarchy: e,
            });
        } else if (type == ENUM.GEOGRAPHIC) {
            setStrategyData({
                ...strategyData,
                geographic: e,
            });
        } else if (type == ENUM.MACHINE_COMPONENT) {
            setCoverageData({
                ...coverageData,
                machineComponent: e,
            });
        } else if (type == ENUM.MACHINE_TYPE) {
            setCoverageData({
                ...coverageData,
                machineType: e,
            });
        } else if (type == ENUM.LIFE_STAGE_OF_MACHINE) {
            setCoverageData({
                ...coverageData,
                lifeStageOfMachine: e,
            });
        } else if (type == ENUM.MAKE) {
            setCoverageData({
                ...coverageData,
                makeSelect: e,
            });
        } else if (type == ENUM.MODEL) {
            setCoverageData({
                ...coverageData,
                modelSelect: e,
            });
        } else if (type == ENUM.PREFIX) {
            setCoverageData({
                ...coverageData,
                prefixSelect: e,
            });
        }
    };

    const handleNextClick = async (e) => {

        if (e.target.id == "general") {


            let reqData = {
                type: prefilgabelGeneral,
                name: generalComponentData.name,
                description: generalComponentData.description,
                externalReference: generalComponentData.externalReference,

                strategyTask: "PREVENTIVE_MAINTENANCE",
                taskType: "PM1",
                usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
                productHierarchy: "END_PRODUCT",
                geographic: "ONSITE",
                availability: "AVAILABILITY_GREATER_95",
                responseTime: "PROACTIVE",
                type: "MACHINE",
                application: "HILL",
                contractOrSupport: "LEVEL_I",
                lifeStageOfMachine: "NEW_BREAKIN",
                supportLevel: "PREMIUM",
                serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",



                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment.value
                    ? generalComponentData.customerSegment.value
                    : "EMPTY",
                machineType: generalComponentData.machineType
                    ? generalComponentData.machineType
                    : "EMPTY",
                status: generalComponentData.status
                    ? generalComponentData.status
                    : "EMPTY",
                // strategyTask: generalComponentData.strategyTask
                //     ? generalComponentData.strategyTask
                //     : "EMPTY",
                // taskType: generalComponentData.taskType
                //     ? generalComponentData.taskType
                //     : "EMPTY",
                usageCategory: generalComponentData.usageCategory
                    ? generalComponentData.usageCategory
                    : "EMPTY",
                // productHierarchy: generalComponentData.productHierarchy
                //     ? generalComponentData.productHierarchy
                //     : "EMPTY",
                // geographic: generalComponentData.geographic
                //     ? generalComponentData.geographic
                //     : "EMPTY",
                availability: generalComponentData.availability
                    ? generalComponentData.availability
                    : "EMPTY",
                // responseTime: generalComponentData.responseTime
                //     ? generalComponentData.responseTime
                //     : "EMPTY",
                type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                application: generalComponentData.application
                    ? generalComponentData.application
                    : "EMPTY",
                contractOrSupport: generalComponentData.contractOrSupport
                    ? generalComponentData.contractOrSupport
                    : "EMPTY",
                lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                    ? generalComponentData.lifeStageOfMachine
                    : "EMPTY",
                supportLevel: generalComponentData.supportLevel
                    ? generalComponentData.supportLevel
                    : "EMPTY",

                customCoverages: [],
                customerGroup: generalComponentData.customerGroup
                    ? generalComponentData.customerGroup
                    : "EMPTY",
                searchTerm: "EMPTY",
                supportLevel: "EMPTY",
                portfolioPrice: {},
                additionalPrice: {},
                escalationPrice: {},

                // usageCategory: categoryUsageKeyValue1.value,
                // taskType: stratgyTaskTypeKeyValue.value,
                // strategyTask: stratgyTaskUsageKeyValue.value,
                // responseTime: stratgyResponseTimeKeyValue.value,
                // productHierarchy: stratgyHierarchyKeyValue.value,
                // geographic: stratgyGeographicKeyValue.value,
                customItems: selectedCustomItems,

            };

            setGeneralComponentData({
                ...generalComponentData,
                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                optionals: stratgyOptionalsKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,
            });

            console.log("reqData is : ", reqData);
            if (location.solutionValueIs == 1) {
                var portfolioRes = await createCustomPortfolio(reqData);
            } else {
                var portfolioRes = await updateCustomPortfolio(
                    location.autocreatedcustomPortfolioData.customPortfolioId,
                    reqData
                )
                // console.log("My new row");
            }

            // const portfolioRes = {
            //     status: 3000
            // };
            // const portfolioRes = await createCustomPortfolio(reqData);
            if (portfolioRes.status === 200) {
                toast("👏 Portfolio Update Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setValue("2");
                setGeneralComponentData({
                    ...generalComponentData,
                    portfolioId: portfolioRes.data.customPortfolioId,
                });
                setPortfolioId(portfolioRes.data.customPortfolioId);
            } else {
                throw `${portfolioRes.status}:error in portfolio creation`;
            }
            // console.log("req data : ", reqData)

            // setValue("2");
            // console.log("general Data => ", generalData)
        } else if (e.target.id == "validity") {
            setValue("3");
            let reqData;
            if (validityData.fromDate && validityData.toDate) {
                reqData = {
                    validFrom: validityData.fromDate.toISOString().substring(0, 10),
                    validTo: validityData.toDate.toISOString().substring(0, 10),
                };
            } else if (validityData.fromInput && validityData.toInput) {
                reqData = {
                    validFrom: validityData.fromInput + validityData.from,
                    validTo: validityData.toInput + validityData.from,
                };
            }
            setGeneralComponentData({
                ...generalComponentData,
                ...reqData,
            });
            // console.log("validityData Data => ", validityData)
        } else if (e.target.id == "strategy") {
            setGeneralComponentData({
                ...generalComponentData,
                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                optionals: stratgyOptionalsKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,
            });

            const { portfolioId, ...res } = generalComponentData;

            let obj = {
                ...res,
                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment.value
                    ? generalComponentData.customerSegment.value
                    : "EMPTY",
                // machineType: generalComponentData.machineType
                //     ? generalComponentData.machineType
                //     : "EMPTY",
                status: generalComponentData.status
                    ? generalComponentData.status
                    : "EMPTY",
                strategyTask: generalComponentData.strategyTask
                    ? generalComponentData.strategyTask
                    : "EMPTY",
                taskType: generalComponentData.taskType
                    ? generalComponentData.taskType
                    : "EMPTY",
                usageCategory: generalComponentData.usageCategory
                    ? generalComponentData.usageCategory
                    : "EMPTY",
                productHierarchy: generalComponentData.productHierarchy
                    ? generalComponentData.productHierarchy
                    : "EMPTY",
                geographic: generalComponentData.geographic
                    ? generalComponentData.geographic
                    : "EMPTY",
                availability: generalComponentData.availability
                    ? generalComponentData.availability
                    : "EMPTY",
                responseTime: generalComponentData.responseTime
                    ? generalComponentData.responseTime
                    : "EMPTY",
                type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                application: generalComponentData.application
                    ? generalComponentData.application
                    : "EMPTY",
                contractOrSupport: generalComponentData.contractOrSupport
                    ? generalComponentData.contractOrSupport
                    : "EMPTY",
                // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                //     ? generalComponentData.lifeStageOfMachine
                //     : "EMPTY",
                machineType: machineTypeKeyValue.value,
                lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
                supportLevel: generalComponentData.supportLevel
                    ? generalComponentData.supportLevel
                    : "EMPTY",
                customItems: [],
                customCoverages: [],
                customerGroup: generalComponentData.customerGroup
                    ? generalComponentData.customerGroup
                    : "EMPTY",
                searchTerm: "EMPTY",
                supportLevel: "EMPTY",
                portfolioPrice: {},
                additionalPrice: {},
                escalationPrice: {},

                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,
                customItems: selectedCustomItems,
            };
            // console.log(" res is : ", res);
            // console.log("obj", obj);

            const strategyRes = await updateCustomPortfolio(
                generalComponentData.portfolioId,
                obj
            );
            if (strategyRes.status === 200) {
                toast("👏 Portfolio updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setValue("administrative");
                // setValue("4");
                console.log("strategy updating", strategyRes.data);
            } else {
                throw `${strategyRes.status}:error in update portfolio`;
            };
        } else if (e.target.id == "administrative") {
            setGeneralComponentData({
                ...generalComponentData,
                preparedBy: administrative.preparedBy,
                approvedBy: administrative.approvedBy,
                preparedOn: administrative.preparedOn,
                revisedBy: administrative.revisedBy,
                revisedOn: administrative.revisedOn,
                salesOffice: administrative.salesOffice,
                offerValidity: administrative.offerValidity,
            });

            const { portfolioId, ...res } = generalComponentData;

            let Administryobj = {
                ...res,
                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment.value
                    ? generalComponentData.customerSegment.value
                    : "EMPTY",
                // machineType: generalComponentData.machineType
                //     ? generalComponentData.machineType
                //     : "EMPTY",
                status: generalComponentData.status
                    ? generalComponentData.status
                    : "EMPTY",
                strategyTask: generalComponentData.strategyTask
                    ? generalComponentData.strategyTask
                    : "EMPTY",
                taskType: generalComponentData.taskType
                    ? generalComponentData.taskType
                    : "EMPTY",
                usageCategory: generalComponentData.usageCategory
                    ? generalComponentData.usageCategory
                    : "EMPTY",
                productHierarchy: generalComponentData.productHierarchy
                    ? generalComponentData.productHierarchy
                    : "EMPTY",
                geographic: generalComponentData.geographic
                    ? generalComponentData.geographic
                    : "EMPTY",
                availability: generalComponentData.availability
                    ? generalComponentData.availability
                    : "EMPTY",
                responseTime: generalComponentData.responseTime
                    ? generalComponentData.responseTime
                    : "EMPTY",
                type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                application: generalComponentData.application
                    ? generalComponentData.application
                    : "EMPTY",
                contractOrSupport: generalComponentData.contractOrSupport
                    ? generalComponentData.contractOrSupport
                    : "EMPTY",
                // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                //     ? generalComponentData.lifeStageOfMachine
                //     : "EMPTY",
                machineType: machineTypeKeyValue.value,
                lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
                supportLevel: generalComponentData.supportLevel
                    ? generalComponentData.supportLevel
                    : "EMPTY",
                customItems: [],
                items: [],
                customCoverages: [],
                customerGroup: generalComponentData.customerGroup
                    ? generalComponentData.customerGroup
                    : "EMPTY",
                searchTerm: "EMPTY",
                supportLevel: "EMPTY",
                // portfolioPrice: {},
                // additionalPrice: {},
                // escalationPrice: {},

                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,
                numberOfEvents: 0,
                rating: "",
                startUsage: "",
                endUsage: "",
                unit: "HOURS",
                additionals: "",
                preparedBy: administrative.preparedBy,
                approvedBy: administrative.approvedBy,
                preparedOn: administrative.preparedOn,
                revisedBy: administrative.revisedBy,
                revisedOn: administrative.revisedOn,
                salesOffice: administrative.salesOffice,
                offerValidity: administrative.offerValidity,

                // preparedBy: generalComponentData.preparedBy
                // ? generalComponentData.preparedBy
                // : "",
                // approvedBy: generalComponentData.approvedBy
                // ? generalComponentData.approvedBy
                // : "",
                // preparedOn: generalComponentData.preparedOn
                // ? generalComponentData.preparedOn
                // : "",
                // revisedBy: generalComponentData.revisedBy
                // ? generalComponentData.revisedBy
                // : "",
                // revisedOn: generalComponentData.revisedOn
                // ? generalComponentData.revisedOn
                // : "",
                // salesOffice: generalComponentData.salesOffice
                // ? generalComponentData.salesOffice
                // : "",
                // offerValidity: generalComponentData.offerValidity
                // ? generalComponentData.offerValidity
                // : "",
            };

            const administryRes = await updateCustomPortfolio(
                generalComponentData.portfolioId,
                Administryobj
            );
            if (administryRes.status === 200) {
                toast("👏 Portfolio updated", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // setValue("administrative");
                setValue("4");
                console.log("administryRes updating", administryRes.data);
            } else {
                throw `${administryRes.status}:error in update portfolio`;
            };

            // setValue("4");

        } else if (e.target.id == "coverage") {


            let cvgIds = [];
            setValue("6");
            for (let i = 0; i < selectedMasterData.length; i++) {
                let reqObj = {
                    customCoverageId: 0,
                    serviceId: 0,
                    modelNo: selectedMasterData[i].model,
                    serialNumber: "",
                    startSerialNumber: "",
                    endSerialNumber: "",
                    serialNumberPrefix: "",
                    family: selectedMasterData[i].family,
                    make: selectedMasterData[i].make,
                    fleet: "",
                    fleetSize: "SMALL",
                    location: "",
                    startDate: "",
                    endDate: "",
                    actions: "",
                    createdAt: "",
                };
                const res = await createCutomCoverage(reqObj);
                console.log("createCoverage res:", res);
                cvgIds.push({ coverageId: res.customCoverageId });
            }
            setGeneralComponentData({
                ...generalComponentData,
                customCoverages: cvgIds,
            });
            const { portfolioId, ...res } = generalComponentData;
            let obj = {
                ...res,
                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment
                    ? generalComponentData.customerSegment.value
                    : "EMPTY",
                // machineType: generalComponentData.machineType
                //     ? generalComponentData.machineType
                //     : "EMPTY",
                status: generalComponentData.status
                    ? generalComponentData.status
                    : "EMPTY",
                strategyTask: generalComponentData.strategyTask
                    ? generalComponentData.strategyTask
                    : "EMPTY",
                taskType: generalComponentData.taskType
                    ? generalComponentData.taskType
                    : "EMPTY",
                usageCategory: generalComponentData.usageCategory
                    ? generalComponentData.usageCategory
                    : "EMPTY",
                productHierarchy: generalComponentData.productHierarchy
                    ? generalComponentData.productHierarchy
                    : "EMPTY",
                geographic: generalComponentData.geographic
                    ? generalComponentData.geographic
                    : "EMPTY",
                availability: generalComponentData.availability
                    ? generalComponentData.availability
                    : "EMPTY",
                responseTime: generalComponentData.responseTime
                    ? generalComponentData.responseTime
                    : "EMPTY",
                type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                application: generalComponentData.application
                    ? generalComponentData.application
                    : "EMPTY",
                contractOrSupport: generalComponentData.contractOrSupport
                    ? generalComponentData.contractOrSupport
                    : "EMPTY",
                // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                //     ? generalComponentData.lifeStageOfMachine
                //     : "EMPTY",
                machineType: machineTypeKeyValue.value,
                lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
                supportLevel: generalComponentData.supportLevel
                    ? generalComponentData.supportLevel
                    : "EMPTY",
                customerGroup: generalComponentData.customerGroup
                    ? generalComponentData.customerGroup
                    : "EMPTY",
                searchTerm: "EMPTY",
                supportLevel: "EMPTY",
                portfolioPrice: {},
                additionalPrice: {},
                escalationPrice: {},
                customItems: [],
                customCoverages: cvgIds,
                usageCategory: categoryUsageKeyValue1.value,
                taskType: stratgyTaskTypeKeyValue.value,
                strategyTask: stratgyTaskUsageKeyValue.value,
                responseTime: stratgyResponseTimeKeyValue.value,
                productHierarchy: stratgyHierarchyKeyValue.value,
                geographic: stratgyGeographicKeyValue.value,

                preparedBy: administrative.preparedBy,
                approvedBy: administrative.approvedBy,
                preparedOn: administrative.preparedOn,
                revisedBy: administrative.revisedBy,
                revisedOn: administrative.revisedOn,
                salesOffice: administrative.salesOffice,
                offerValidity: administrative.offerValidity,
            };
            if (generalComponentData.portfolioId) {
                const updatePortfolioRes = await updateCustomPortfolio(
                    generalComponentData.portfolioId,
                    obj
                );
                if (updatePortfolioRes.status === 200) {
                    toast("👏 Portfolio updated", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setValue("6");
                } else {
                    throw `${updatePortfolioRes.status}:unable to update`;
                }
            }
        }
        // else if (e.target.id == "coverage") {
        //     let cvgIds = [];

        //     for (let i = 0; i < selectedMasterData.length; i++) {
        //         let reqObj = {
        //           coverageId: 0,
        //           serviceId: 0,
        //           modelNo: "992k",
        //           serialNumber: "",
        //           startSerialNumber: "",
        //           endSerialNumber: "",
        //           serialNumberPrefix: "",
        //           family: "10",
        //           make: "RM5",
        //           fleet: "",
        //           fleetSize: "SMALL",
        //           location: "",
        //           startDate: "",
        //           endDate: "",
        //           actions: "",
        //           createdAt: "",
        //         };
        //         const res = await createCoverage(reqObj);
        //         console.log("createCoverage res:", res);
        //         cvgIds.push({ coverageId: res.coverageId });
        //       }

        // }

    }

    const handleGeneralInputChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setGeneralComponentData({
            ...generalComponentData,
            [name]: value,
        });
    };

    const handleAdministrativreChange = (e) => {
        console.log("handleAdministrativreChange", administrative);
        var value = e.target.value;
        var name = e.target.name;
        setAdministrative({ ...administrative, [name]: value });
    };

    const handleCoverageInputChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setCoverageData({
            ...coverageData,
            [name]: value,
        });
    };

    const Inclusive_Exclusive = (e, data) => {
        console.log("event is : ", e);
        console.log("itemData : ", data);
        if (data.customItemBodyModel.customItemPrices.length > 0) {
            setEditAbleCustomPriceData(data.customItemBodyModel.customItemPrices)
        } else {
            setEditAbleCustomPriceData([])
        }

        console.log("editable Custom Price data : ", editAbleCustomPriceData);

    }
    const handleWithSparePartsCheckBox = (e) => {
        setPartsRequired(e.target.checked)
        // // if(e.target.checked){

        // // }
        // console.log("event is : ", e.target.checked)
        // console.log("event : ",e);
    }

    const handleWithLabourCheckBox = (e) => {
        setlabourRequired(e.target.checked)
    }

    const handleWithServiceCheckBox = (e) => {
        setServiceRequired(e.target.checked)
    }

    const handleWithMiscCheckBox = (e) => {
        setMiscRequired(e.target.checked)
    }

    const UpdateCustomPriceInclusion = async () => {
        console.log("hello");
        if (editAbleCustomPriceData.length > 0) {
            // console.log("hello")
            for (let y = 0; y < editAbleCustomPriceData.length; y++) {
                var getCustomPriceData = await getcustomItemPriceById(editAbleCustomPriceData[y].customItemPriceDataId);
                console.log("y is : ", getCustomPriceData);

                getCustomPriceData.partsRequired = partsRequired;
                getCustomPriceData.labourRequired = labourRequired;
                getCustomPriceData.serviceRequired = serviceRequired;
                getCustomPriceData.miscRequired = miscRequired;

                // console.log("updated y is : ", getCustomPriceData)

                var UpdateCustomPriceInclusion = updateCustomPriceData(editAbleCustomPriceData[y].customItemPriceDataId, getCustomPriceData)

            }
        } else {
            console.log("empty");
        }
    }

    const getPortfolioDetails = (portfolioId) => {
        // getAllUsers()
        //     .then((res) => {
        //         console.log("Dashboard > getAllUsers > res=", res);
        //         setUsers(res);
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log("axios err=", err);
        //         setUsers([]);
        //         setIsLoading(false);
        //     });

        if (portfolioId != null) {
            getCustomPortfolio(portfolioId)
                .then((res) => {
                    const portfolioDetails = res;
                    console.log("portfolioDetails", portfolioDetails);
                    if (portfolioDetails.portfolioId != null) {
                        setGeneralComponentData({
                            ...generalComponentData,
                            name: portfolioDetails.name,
                            description: portfolioDetails.description,
                            externalReference: portfolioDetails.externalReference,
                            customerSegment: portfolioDetails.customerSegment,
                            // serviceProgramDescription: "",
                        });
                    }
                })
                .catch((err) => {
                    console.log("error:", err);
                });
        }
    };

    const initFetch = () => {
        setHeaderTypeKeyValue([
            {
                label: "PORTFOLIO",
                value: "PORTFOLIO",
            },
            {
                label: "PROGRAM",
                value: "PROGRAM",
            },
        ]);

        setCoverageItems([
            {
                id: 1,
                fleet: "Spare Part 1",
                make: "P",
                products: "$20",
                services: "100%",
                bundles: "%",
                quantity: "4",
                part: "$1250",
                service: "$350",
                total: "$1575",
                action: "-",
            },
        ]);

        // setBundleItemTaskTypeKeyValue

        getTaskTypeKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setBundleItemTaskTypeKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getPrefixKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPrefixKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getModelKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setModelKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getMakeKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setMakeKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });

        getValidityKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setValidityKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        // getStrategyTaskKeyValue().then((res) => {
        //     console.log(res)
        //     const options = res.map((d) => ({
        //         value: d.key,
        //         label: d.value,
        //         second: d.nestedKeyValues
        //     }));
        //     setStrategyTaskKeyValue(options)
        // }).catch((err) => {
        //     alert(err)
        // })
        getResponseTimeTaskKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setResponseTimeTaskKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getUsageCategoryKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setCategoryUsageKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getProductHierarchyKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setProductHierarchyKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getGergraphicKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setGeographicKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getTypeKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setTypeKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getMachineTypeKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setMachineTypeKeyValueList(options);
            })
            .catch((err) => {
                alert(err);
            });

        getLifeStageKeyValue()
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setLifeStageOfMachineKeyValueList(options);
            })
            .catch((err) => {
                alert(err);
            });

        getPortfolioCommonConfig("item-type")
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setStrategyOptionals(options);
            })
            .catch((err) => {
                alert(err);
            });
        getPortfolioCommonConfig("customer-segment")
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setCustomerSegmentKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getPortfolioCommonConfig("price-method")
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPriceMethodKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const portfolioId = 362;
        getPortfolioDetails(portfolioId);
        initFetch();
        dispatch(taskActions.fetchTaskList());



    }, [dispatch]);

    useEffect(() => {

        // Solution Templates Auto fill  Data Conditons 

        if (location.solutionValueIs == 1) {

            console.log("data are here ", location.selectedTemplateItems)
            setGeneralComponentData({
                name: location.selectedTemplateItems[0].name,
                description: location.selectedTemplateItems[0].description,
                serviceDescription: "",
                externalReference: location.selectedTemplateItems[0].externalReference,
                customerSegment: null,
                customItems: [],
                customCoverages: [],
            });
            setValidityData({
                ...validityData,
                fromDate: location.selectedTemplateItems[0].validFrom,
                toDate: location.selectedTemplateItems[0].validTo,
                from: null,
                to: null,
                fromInput: "",
                toInput: "",
            })
            // stratgyTaskTypeKeyValue({value: location.selectedTemplateItems[0].itemBodyModel.taskType})
            setStratgyResponseTimeKeyValue([{
                "label": location.selectedTemplateItems[0].responseTime,
                "value": location.selectedTemplateItems[0].responseTime
            }])
            setStratgyHierarchyKeyValue([{
                "label": location.selectedTemplateItems[0].productHierarchy,
                "value": location.selectedTemplateItems[0].productHierarchy
            }])

            setStratgyGeographicKeyValue([{
                "label": location.selectedTemplateItems[0].geographic,
                "value": location.selectedTemplateItems[0].geographic
            }])

            // setPriceMethodKeyValue([{
            //     "label": location.selectedTemplateItems[0].itemBodyModel.priceMethod,
            //     "value": location.selectedTemplateItems[0].itemBodyModel.priceMethod
            // }])
            // setPriceCalculator({
            //     ...priceCalculator,
            //     priceMethod: location.selectedTemplateItems[0].itemBodyModel.priceMethod,
            //     listPrice: location.selectedTemplateItems[0].itemBodyModel.listPrice,
            //     priceEscalationInput: location.selectedTemplateItems[0].itemBodyModel.priceEscalation,
            //     priceAdditionalInput: location.selectedTemplateItems[0].itemBodyModel.additional,
            //     calculatedPrice: location.selectedTemplateItems[0].itemBodyModel.calculatedPrice,
            //     flatPrice: location.selectedTemplateItems[0].itemBodyModel.flatPrice,
            //     discountTypeInput: location.selectedTemplateItems[0].itemBodyModel.discountType,
            //     year: location.selectedTemplateItems[0].itemBodyModel.year,
            //     totalPrice: location.selectedTemplateItems[0].itemBodyModel.totalPrice,
            // })


        }

        console.log("location.selectedTemplateItems : ", location.selectedTemplateItems)

        let itemIdData = []
        let priceDataId = []
        // itemIdData.push({ "itemId": location.selectedTemplateItems[0].itemId })

        const customItemsId = location.selectedTemplateItems.map((data, i) => {

            console.log("my map data is :=> ", data);
            console.log("itemHeaderId is :=>  ", data.customItemHeaderModel?.itemHeaderId);
            console.log("itemHeaderModel is => :  ", data.customItemHeaderModel);
            itemIdData.push({ "customItemId": parseInt(data.customItemId) })
            // itemIdValue.push(data)

            // data.itemBodyModel.itemPrices.map((pricedata, j) => {
            //     priceDataId.push({ "customItemPriceDataId": pricedata.itemPriceDataId })
            // });


            // itemIdData.push({
            //     customItemId: "",
            //     itemName: data.itemName,
            //     customItemHeaderModel: {
            //         customItemHeaderId: data.itemHeaderModel.itemHeaderId,
            //         itemHeaderDescription: data.itemHeaderModel.itemHeaderDescription,
            //         bundleFlag: data.itemHeaderModel.bundleFlag,
            //         portfolioItemId: data.itemHeaderModel.portfolioItemId,
            //         reference: data.itemHeaderModel.reference,
            //         itemHeaderMake: data.itemHeaderModel.itemHeaderMake,
            //         itemHeaderFamily: data.itemHeaderModel.itemHeaderFamily,
            //         model: data.itemHeaderModel.model,
            //         prefix: data.itemHeaderModel.prefix,
            //         type: data.itemHeaderModel.type,
            //         additional: data.itemHeaderModel.additional,
            //         currency: data.itemHeaderModel.currency,
            //         netPrice: data.itemHeaderModel.netPrice,
            //         itemProductHierarchy: data.itemHeaderModel.itemProductHierarchy,
            //         itemHeaderGeographic: data.itemHeaderModel.itemHeaderGeographic,
            //         responseTime: data.itemHeaderModel.responseTime,
            //         usage: data.itemHeaderModel.usage,
            //         validFrom: data.itemHeaderModel.validFrom,
            //         validTo: data.itemHeaderModel.validTo,
            //         estimatedTime: data.itemHeaderModel.estimatedTime,
            //         servicePrice: data.itemHeaderModel.servicePrice,
            //         status: data.itemHeaderModel.status,
            //         componentCode: data.itemHeaderModel.componentCode,
            //         componentDescription: data.itemHeaderModel.componentDescription,
            //         serialNumber: data.itemHeaderModel.serialNumber,
            //         itemHeaderStrategy: data.itemHeaderModel.itemHeaderStrategy,
            //         variant: data.itemHeaderModel.variant,
            //         itemHeaderCustomerSegment: data.itemHeaderModel.itemHeaderCustomerSegment,
            //         jobCode: data.itemHeaderModel.jobCode,
            //         preparedBy: data.itemHeaderModel.preparedBy,
            //         approvedBy: data.itemHeaderModel.approvedBy,
            //         preparedOn: data.itemHeaderModel.preparedOn,
            //         revisedBy: data.itemHeaderModel.revisedBy,
            //         revisedOn: data.itemHeaderModel.revisedOn,
            //         salesOffice: data.itemHeaderModel.salesOffice,
            //         offerValidity: data.itemHeaderModel.offerValidity
            //     },
            //     customItemBodyModel: {
            //         customItemBodyId: data.itemBodyModel.itemBodyId,
            //         itemBodyDescription: data.itemBodyModel.itemBodyDescription,
            //         spareParts: data.itemBodyModel.spareParts,
            //         labours: data.itemBodyModel.labours,
            //         miscellaneous: data.itemBodyModel.miscellaneous,
            //         taskType: data.itemBodyModel.taskType,
            //         solutionCode: data.itemBodyModel.solutionCode,
            //         usageIn: data.itemBodyModel.usageIn,
            //         usage: data.itemBodyModel.usage,
            //         year: data.itemBodyModel.year,
            //         avgUsage: data.itemBodyModel.avgUsage,
            //         unit: data.itemBodyModel.unit,
            //         customItemPrices: priceDataId,
            //     },
            //     createdAt: data.createdAt
            // })


            // console.log("map function data is => " ,data)

            // setSelectedCustomItems([...selectedCustomItems, { "itemId": data.itemId }])
            // console.log("Item Id's : ", data.itemId)
        })
        setSelectedCustomItems(itemIdData)
        // console.log("selected Custom Items Data are  : ", selectedCustomItems)
    }, [])

    // console.log("selected Custom Items Data are  : ", selectedCustomItems)

    const categoryList = useAppSelector(
        selectStrategyTaskOption(selectCategoryList)
    );

    const rTimeList = useAppSelector(
        selectStrategyTaskOption(selectResponseTimeList)
    );

    const productList = useAppSelector(
        selectStrategyTaskOption(selectProductList)
    );

    const geographicList = useAppSelector(
        selectStrategyTaskOption(selectGeographicalList)
    );

    const updatedList = useAppSelector(
        selectStrategyTaskOption(selectUpdateList)
    );

    const updatedTaskList = useAppSelector(
        selectStrategyTaskOption(selectUpdateTaskList)
    );

    const HandleCatUsage = (e) => {
        setStratgyTaskUsageKeyValue([]);
        setStratgyTaskTypeKeyValue([]);
        addPortFolioItem.taskType = "";
        setCategoryUsageKeyValue1(e);
        dispatch(taskActions.updateList(e.value));
    };

    const HandleStrategyUsage = (e) => {
        setStratgyTaskTypeKeyValue([]);
        addPortFolioItem.taskType = "";
        setStratgyTaskUsageKeyValue(e);
        dispatch(taskActions.updateTask(e.value));
    };

    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };

    const [age, setAge] = React.useState('5');
    const [age1, setAge1] = React.useState('5');
    const [age2, setAge2] = React.useState('5');

    const handleChangedrop1 = (event) => {
        setAge1(event.target.value);
    };
    const handleChangedrop2 = (event) => {
        setAge2(event.target.value);
    };

    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handleCoveragetable = () => setOpenCoveragetable(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fileTypes = ["JPG", "PNG", "GIF"];

    const activityOptions = [
        'None',
        'Atria',
        'Callisto'
    ];

    const rows = [
        { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
        // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
        // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
        // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
        // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
        // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
    ];

    const handleCheckboxData = (e, row) => {
        if (e.target.checked) {
            var _searchedData = [...masterData];

            const updated = _searchedData.map((currentItem, i) => {
                if (row.id == currentItem.id) {
                    return { ...currentItem, ["check1"]: e.target.checked };
                } else return currentItem;
            });

            setMasterData([...updated]);

            const isFound = filterMasterData.some((element) => {
                if (element.id === row.id) {
                    return true;
                }

                return false;
            });

            if (!isFound) {
                const _filterMasterData = [...filterMasterData, { ...row }];
                const updatedItems = _filterMasterData.map((currentItem, i) => {
                    return {
                        ...currentItem,
                        items: [
                            {
                                family: currentItem.family,
                                model: currentItem.model,
                                noSeriese: "0JAPA000470",
                                location: "LIMA",
                                startDate: "08/04/20017",
                                endDate: "08/04/20017",
                            },
                        ],
                    };
                });
                setFilterMasterData(updatedItems);
                // setFilterMasterData([...filterMasterData, { ...row }])
            }
        } else {
            var _masterData = [...masterData];
            const updated1 = _masterData.map((currentItem, i) => {
                if (row.id == currentItem.id) {
                    return { ...currentItem, ["check1"]: e.target.checked };
                } else return currentItem;
            });
            setMasterData([...updated1]);
            var _filterMasterData = [...filterMasterData];
            const updated = _filterMasterData.filter((currentItem, i) => {
                if (row.id !== currentItem.id) return currentItem;
            });
            setFilterMasterData(updated);
        }
    };

    useEffect(() => {
        if (masterData.some((masterDataitem) => masterDataitem.check1 === true)) {
            setFlagIs(true);
        } else {
            setFlagIs(false);
        }
    }, [masterData]);

    const handleDeleteIncludeSerialNo = (e, row) => {
        const updated = selectedMasterData.filter((obj) => {
            if (obj.id !== row.id) return obj;
        });

        const _IncludedDataList = [...openedModelBoxData];

        const NewAddedData = _IncludedDataList.map((currentItem, i) => {
            for (var j in currentItem) {
                if (j == row.id) {
                    openedModelBoxData.splice(i, 1);
                }
            }
        });

        setSelectedMasterData(updated);
        setFilterMasterData(updated);
    };

    const handleEditIncludeSerialNo = (e, row) => {
        console.log("handleEditIncludeSerialNo row:", row);
        let obj = {
            coverageId: row.id,
            make: row.make,
            family: row.family,
            modelNo: row.model,
            serialNoPrefix: row.prefix,
            startSerialNo: row.startSerialNo,
            endSerialNo: row.endSerialNo,
            fleet: row.fleet,
            fleetSize: row.fleetSize,
        };
        setEditSerialNo(obj);
    };

    const handleTempbundleItemSelection = (e, row) => {
        if (e.target.name === "selectedId") {
            setTempBundleItemCheckList({
                [e.target.name]: e.target.value,
            });
            return;
        }
        let _tempBundleItemCheckList = { ...tempBundleItemCheckList };
        if (e.target.checked) {
            _tempBundleItemCheckList[row.itemId] =
                !_tempBundleItemCheckList[row.itemId];
        } else {
            _tempBundleItemCheckList[row.itemId] =
                !_tempBundleItemCheckList[row.itemId];
        }
        setTempBundleItemCheckList(_tempBundleItemCheckList);
    };

    const addTempItemIntobundleItem = () => {
        setLoadingItem(true);
        setItemModelShow(false);
        let temp = [];
        for (let key1 in tempBundleItemCheckList) {
            for (let i = 0; i < tempBundleItems.length; i++) {
                if (
                    (tempBundleItems[i].itemId == key1 &&
                        tempBundleItemCheckList[key1]) ||
                    tempBundleItems[i].itemId == tempBundleItemCheckList.selectedId
                ) {
                    temp.push(tempBundleItems[i]);
                    break;
                }
            }
        }
        setBundleItems(temp);
        setLoadingItem(false);
        setTabs("1");
    };

    const columns = [
        { field: 'GroupNumber', headerName: 'Group Number', flex: 1, width: 70 },
        { field: 'Type', headerName: 'Type', flex: 1, width: 130 },
        { field: 'Partnumber', headerName: 'Part number', flex: 1, width: 130 },
        { field: 'PriceExtended', headerName: 'Price Extended', flex: 1, width: 130 },
        { field: 'Pricecurrency', headerName: 'Price currency', flex: 1, width: 130 },
        { field: 'Usage', headerName: 'Usage', flex: 1, width: 130 },
        { field: 'TotalPrice', headerName: 'Total Price', flex: 1, width: 130 },
        { field: 'Comments', headerName: 'Comments', flex: 1, width: 130 },
        { field: 'Actions', headerName: 'Actions', flex: 1, width: 130 },
        // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
        // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
        //   `${params.getValue(params.id, 'firstName') || ''} ${
        //       params.getValue(params.id, 'DocumentType') || ''
        //     }`,

    ];

    const masterColumns = [
        {
            name: (
                <>
                    <div>Select</div>
                </>
            ),
            selector: (row) => row.check1,
            wrap: true,
            sortable: true,
            maxWidth: "300px",
            cell: (row) => (
                <Checkbox
                    className="text-black"
                    checked={row.check1}
                    onChange={(e) => handleCheckboxData(e, row)}
                />
            ),
        },
        {
            name: (
                <>
                    <div>Make</div>
                </>
            ),
            selector: (row) => row.make,
            wrap: true,
            sortable: true,
            format: (row) => row.make,
        },
        {
            name: (
                <>
                    <div>Family</div>
                </>
            ),
            selector: (row) => row.family,
            wrap: true,
            sortable: true,
            format: (row) => row.family,
        },
        {
            name: (
                <>
                    <div>Model</div>
                </>
            ),
            selector: (row) => row.model,
            wrap: true,
            sortable: true,
            format: (row) => row.model,
        },
        {
            name: (
                <>
                    <div>Prefix</div>
                </>
            ),
            selector: (row) => row.prefix,
            wrap: true,
            sortable: true,
            format: (row) => row.prefix,
        },
        // {
        //   name: (
        //     <>
        //       <div>
        //         Serial No
        //       </div>
        //     </>
        //   ),
        //   selector: (row) => row.bundleId,
        //   sortable: true,
        //   maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        //   // cell: row => row.bundleId,
        //   // cell: (row) => <button onClick={() => alert()}>1</button>,
        //   // cell: (row) => <Checkbox className="text-black" {...label} />,
        //   format: (row) => row.bundleId,
        // },
        // {
        //   name: (
        //     <>
        //       <div>
        //         <img className="mr-2" src={boxicon}></img>Start Serial No
        //       </div>

        //     </>
        //   ),
        //   selector: (row) => row.bundleDescription,
        //   wrap: true,
        //   sortable: true,
        //   format: (row) => row.bundleDescription,
        // },
        // {
        //   name: (
        //     <>
        //       <div>End Serial No</div>
        //     </>
        //   ),
        //   selector: (row) => row.strategy,
        //   wrap: true,
        //   sortable: true,
        //   format: (row) => row.strategy,
        // },
    ];

    const selectedMasterColumns = [
        {
            name: (
                <>
                    <div>Make</div>
                </>
            ),
            selector: (row) => row.make,
            wrap: true,
            sortable: true,
            format: (row) => row.make,
        },
        {
            name: (
                <>
                    <div>Family</div>
                </>
            ),
            selector: (row) => row.family,
            wrap: true,
            sortable: true,
            format: (row) => row.family,
        },
        {
            name: (
                <>
                    <div>Model</div>
                </>
            ),
            selector: (row) => row.model,
            wrap: true,
            sortable: true,
            format: (row) => row.model,
        },
        {
            name: (
                <>
                    <div>Prefix</div>
                </>
            ),
            selector: (row) => row.prefix,
            wrap: true,
            sortable: true,
            format: (row) => row.prefix,
        },
        // {
        //   name: (
        //     <>
        //       <div>
        //         Serial No
        //       </div>
        //     </>
        //   ),
        //   selector: (row) => row.bundleId,
        //   sortable: true,
        //   maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        //   // cell: row => row.bundleId,
        //   // cell: (row) => <button onClick={() => alert()}>1</button>,
        //   // cell: (row) => <Checkbox className="text-black" {...label} />,
        //   format: (row) => row.bundleId,
        // },
        // {
        //   name: (
        //     <>
        //       <div>
        //         <img className="mr-2" src={boxicon}></img>Start Serial No
        //       </div>

        //     </>
        //   ),
        //   selector: (row) => row.bundleDescription,
        //   wrap: true,
        //   sortable: true,
        //   format: (row) => row.bundleDescription,
        // },
        // {
        //   name: (
        //     <>
        //       <div>End Serial No</div>
        //     </>
        //   ),
        //   selector: (row) => row.strategy,
        //   wrap: true,
        //   sortable: true,
        //   format: (row) => row.strategy,
        // },
        {
            name: (
                <>
                    <div>Action</div>
                </>
            ),
            selector: (row) => row.action,
            wrap: true,
            sortable: true,
            format: (row) => row.action,
            cell: (row) => (
                <div>
                    <Link
                        to="#"
                        onClick={(e) => handleEditIncludeSerialNo(e, row)}
                        className="btn-svg text-white cursor mx-2"
                        data-toggle="modal"
                        data-target="#AddCoverage"
                    >
                        <svg
                            version="1.1"
                            viewBox="0 0 1696.162 1696.143"
                            xmlSpace="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnslgink="http://www.w3.org/1999/lgink"
                        >
                            <g id="pen">
                                <path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" />
                            </g>
                            <g id="Layer_1" />
                        </svg>
                    </Link>
                    <Link
                        to="#"
                        onClick={(e) => handleDeleteIncludeSerialNo(e, row)}
                        className="btn-svg text-white cursor mr-2"
                    >
                        <svg
                            data-name="Layer 41"
                            id="Layer_41"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title />
                            <path
                                className="cls-1"
                                d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                            />
                            <path
                                className="cls-1"
                                d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                            />
                            <path
                                className="cls-1"
                                d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                            />
                        </svg>
                    </Link>
                    <Link
                        to="#"
                        className="btn-svg text-white cursor "
                        onClick={() => ShowRelatedIncludeModelBox(row)}
                    >
                        <svg
                            data-name="Layer 1"
                            id="Layer_1"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                fill: "none",
                                width: "18px",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2px",
                            }}
                        >
                            <title />
                            <g data-name="&lt;Group&gt;" id="_Group_">
                                <path
                                    className="cls-1"
                                    d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86"
                                    data-name="&lt;Path&gt;"
                                    id="_Path_"
                                />
                                <path
                                    className="cls-1"
                                    d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86"
                                    data-name="&lt;Path&gt;"
                                    id="_Path_2"
                                />
                            </g>
                        </svg>
                    </Link>
                </div>
            ),
        },
    ];

    const bundleItemColumns = [
        {
            name: (
                <>
                    <div>Id</div>
                </>
            ),
            selector: (row) => row.itemId,
            wrap: true,
            sortable: true,
            format: (row) => row.itemId,
        },
        {
            name: (
                <>
                    <div>Description</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.itemBodyDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.itemBodyDescription,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.itemHeaderModel.strategy,
            wrap: true,
            sortable: true,
            format: (row) => row.itemHeaderModel.strategy,
        },
        {
            name: (
                <>
                    <div>Standard Job Id</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.standardJobId,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.standardJobId,
        },
        {
            name: (
                <>
                    <div>Repair Options</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.repairOption,
            sortable: true,
            maxWidth: "300px",
            format: (row) => row.itemBodyModel.repairOption,
        },
        {
            name: (
                <>
                    <div>Frequency</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.frequency,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.frequency,
        },
        {
            name: (
                <>
                    <div>Quantity</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.quantity,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.quantity,
        },
        {
            name: (
                <>
                    <div>Parts $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.sparePartsPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.sparePartsPrice,
        },
        {
            name: (
                <>
                    <div>Service $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.servicePrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.servicePrice,
        },
        {
            name: (
                <>
                    <div>Total $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.totalPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.totalPrice,
        },
        {
            name: (
                <>
                    <div>Actions</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.type,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.type,
            cell: (row) => (
                <div
                    className="d-flex justify-content-center align-items-center row-svg-div"
                    style={{ minWidth: "180px !important" }}
                >

                    <div className=" cursor" onClick={handleBundleItemOpen}>
                        <Tooltip title="Create Bundle">
                            <Link to="#" className="px-1">
                                <BusinessCenterOutlinedIcon />
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="cursor" onClick={handleServiceItemOpen}>
                        <Tooltip title="Create Service">
                            <Link to="#" className="px-1">
                                <LayersOutlinedIcon />
                            </Link>
                        </Tooltip>
                    </div>
                    <div
                        className=" cursor"
                        onClick={(e) => handleServiceItemEdit(e, row)}
                    >
                        <Tooltip title="Edit">
                            <Link to="#" className="px-1">
                                <img className="m-1" src={penIcon} />
                            </Link>
                        </Tooltip>
                    </div>
                    <div className=" cursor" data-toggle="modal" data-target="#myModal2">
                        <Tooltip title="Inclusion">
                            <Link to="#" className="px-1">
                                <img src={cpqIcon}></img>
                            </Link>
                        </Tooltip>
                    </div>
                    <div
                        className=" cursor"
                        onClick={(e) => handleServiceItemSave(e, row)}
                    >
                        <Tooltip title="Save">
                            <Link to="#" className="px-1">
                                <SaveOutlinedIcon />
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="" onClick={(e) => handleServiceItemDelete(e, row)}>
                        <Tooltip title="Delete">
                            <Link to="#" className="px-1">
                                <svg
                                    data-name="Layer 41"
                                    id="Layer_41"
                                    viewBox="0 0 50 50"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title />
                                    <path
                                        className="cls-1"
                                        d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                    />
                                    <path
                                        className="cls-1"
                                        d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                    />
                                    <path
                                        className="cls-1"
                                        d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                    />
                                </svg>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ];

    const tempBundleItemColumns = [
        {
            name: (
                <>
                    <div>Select</div>
                </>
            ),
            selector: (row) => row.check1,
            wrap: true,
            sortable: true,
            maxWidth: "300px",
            cell: (row) => (
                <>
                    {valueOfUseCase == 3 ? (
                        <input
                            type="radio"
                            name="selectedId"
                            value={row.itemId}
                            onChange={(e) => handleTempbundleItemSelection(e, row.id)}
                            style={{ border: "1px solid #000" }}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            name={row.itemId}
                            value={tempBundleItemCheckList[row.itemId]}
                            checked={tempBundleItemCheckList[row.itemId]}
                            onChange={(e) => handleTempbundleItemSelection(e, row)}
                            style={{ border: "1px solid #000" }}
                        />
                    )}
                </>
            ),
        },
        {
            name: (
                <>
                    <div>Id</div>
                </>
            ),
            selector: (row) => row.itemId,
            wrap: true,
            sortable: true,
            format: (row) => row.itemId,
        },
        {
            name: (
                <>
                    <div>Description</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.itemBodyDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.itemBodyDescription,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.itemHeaderModel.strategy,
            wrap: true,
            sortable: true,
            format: (row) => row.itemHeaderModel.strategy,
        },
        {
            name: (
                <>
                    <div>Standard Job Id</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.standardJobId,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.standardJobId,
        },
        {
            name: (
                <>
                    <div>Repair Options</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.repairOption,
            sortable: true,
            maxWidth: "300px",
            format: (row) => row.itemBodyModel.repairOption,
        },
        {
            name: (
                <>
                    <div>Frequency</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.frequency,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.frequency,
        },
        {
            name: (
                <>
                    <div>Quantity</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.quantity,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.quantity,
        },
        {
            name: (
                <>
                    <div>Parts $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.sparePartsPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.sparePartsPrice,
        },
        {
            name: (
                <>
                    <div>Service $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.servicePrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.servicePrice,
        },
        {
            name: (
                <>
                    <div>Total $</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.totalPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.totalPrice,
        },
    ];

    const columns4 = [
        {
            name: (
                <>
                    <div>Family</div>
                </>
            ),
            selector: (row) => row.family,
            wrap: true,
            sortable: true,
            format: (row) => row.family,
        },
        {
            name: (
                <>
                    <div>Model</div>
                </>
            ),
            selector: (row) => row.model,
            wrap: true,
            sortable: true,
            format: (row) => row.model,
        },
        {
            name: (
                <>
                    <div>Serial Number</div>
                </>
            ),
            selector: (row) => row.noSeriese,
            wrap: true,
            sortable: true,
            format: (row) => row.noSeriese,
            cell: (row) => (
                <div>
                    <Select
                        className="customselect"
                        options={[
                            { label: "12345", value: "12345" },
                            { label: "12345", value: "12345" },
                        ]}
                    />
                </div>
            ),
        },
        {
            name: (
                <>
                    <div>Location</div>
                </>
            ),
            selector: (row) => row.location,
            wrap: true,
            sortable: true,
            format: (row) => row.location,
        },
        {
            name: (
                <>
                    <div>Start Date</div>
                </>
            ),
            selector: (row) => row.startDate,
            wrap: true,
            sortable: true,
            format: (row) => row.startDate,
            cell: (row) => (
                <div className="date-box tabledate-box">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            format="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            label=""
                        // value={row.startDate}
                        // onChange={(e) =>
                        //   setValidityData({
                        //     ...validityData,
                        //     startDate: e,
                        //   })
                        // }
                        />
                    </MuiPickersUtilsProvider>
                </div>
            ),
        },
        {
            name: (
                <>
                    <div>End Date</div>
                </>
            ),
            selector: (row) => row.endDate,
            wrap: true,
            sortable: true,
            format: (row) => row.endDate,
            cell: (row) => (
                <div className="date-box tabledate-box">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            variant="inline"
                            format="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            label=""
                        // value={validityData.fromDate}
                        // onChange={(e) =>
                        //   setValidityData({
                        //     ...validityData,
                        //     fromDate: e,
                        //   })
                        // }
                        />
                    </MuiPickersUtilsProvider>
                </div>
            ),
        },
    ];

    const selectedportfolioTempItemsColumn = [
        {
            name: (
                <>
                    <div>ID</div>
                </>
            ),
            selector: (row) => row.customItemId,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemId,
        },
        {
            name: (
                <>
                    <div>Name</div>
                </>
            ),
            selector: (row) => row.itemName,
            wrap: true,
            sortable: true,
            format: (row) => row.itemName,
        },
        {
            name: (
                <>
                    <div>Description</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.itemHeaderDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.itemHeaderDescription,
        },
        {
            name: (
                <>
                    <div>Solution Code</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.solutionCode,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.solutionCode,
        },
        {
            name: (
                <>
                    <div>Repair Option</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.itemHeaderGeographic,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.itemHeaderGeographic,
        },
        {
            name: (
                <>
                    <div>Component Code</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.componentCode,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.componentCode,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.taskType,
        },
        {
            name: (
                <>
                    <div>Total $</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.netPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.netPrice,
        },
        {
            name: (
                <>
                    <div>Actions</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel.type,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel.type,
            cell: (row) => (
                <div
                    className="d-flex justify-content-center align-items-center row-svg-div"
                    style={{ minWidth: "180px !important" }}
                >

                    <div className=" cursor" data-toggle="modal" data-target="#myModal12">
                        <Tooltip title="Inclusion" onClick={(e) => Inclusive_Exclusive(e, row)}>
                            <div className="px-1">
                                <img src={cpqIcon}></img>
                            </div>
                            {/* <Link to="#" className="px-1">
                                <img src={cpqIcon}></img>
                            </Link> */}
                        </Tooltip>
                    </div>
                </div>
            ),
        },
    ];


    const handleServiceItemOpen = () => {
        setServiceOrBundlePrefix("SERVICE");
        // setServiceOrBundleShow(true);
        setBundleServiceShow(true);
        setBundleTabs("1")
    };

    const handleBundleItemOpen = () => {
        setServiceOrBundlePrefix("BUNDLE");
        // setServiceOrBundleShow(true);
        setBundleServiceShow(true);
        setBundleTabs("1")
    };

    const handleAddServiceBundleChange = (e) => {
        setCreateServiceOrBundle({
            ...createServiceOrBundle,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddNewServiceOrBundle = () => {
        // setServiceOrBundleShow(false);
        if (serviceOrBundlePrefix === "SERVICE") {
            setBundleTabs("3")
        }
        if (serviceOrBundlePrefix === "BUNDLE") {
            // setOpenAddBundleItem(true);
            setBundleTabs("2")
        }
    };

    const ShowRelatedIncludeModelBox = (dataRow) => {
        setModelIncludedData([]);

        var ModelBoxKeys = [];
        var KeyValues = [];

        for (var key in openedModelBoxData) {
            ModelBoxKeys.push(Object.keys(openedModelBoxData[key]));
        }

        const ValIs = ModelBoxKeys.map((i, data) => {
            KeyValues.push(Number(i[0]));
        });

        if (!KeyValues.includes(dataRow.id)) {
            openedModelBoxData.push({
                [dataRow.id]: [
                    {
                        family: dataRow.family,
                        model: dataRow.model,
                        noSeriese: "0JAPA000470",
                        location: "LIMA",
                        startDate: "08/04/20017",
                        endDate: "08/04/20017",
                    },
                ],
            });
        }

        setOpenedModelBoxData([...openedModelBoxData]);

        const NewAddedData = openedModelBoxData.map((currentItem, i) => {
            if (currentItem.hasOwnProperty(dataRow.id)) {
                var valueOf = Object.values(currentItem);
                const Addval = valueOf.map((myVal, i) => {
                    setModelIncludedData([...myVal]);
                });
            }
        });

        setShowRelatedModel(true);
        setOpenModelBoxDataId(dataRow);
    };

    const AddNewRowData = (rowItem) => {
        if (showRelatedModel === true) {
            const _IncludedDataList = [...openedModelBoxData];

            const NewAddedData = _IncludedDataList.map((currentItem, i) => {
                for (var j in currentItem) {
                    if (j == rowItem.id) {
                        currentItem[j].push({
                            family: rowItem.family,
                            model: rowItem.model,
                            noSeriese: "0JAPA000470",
                            location: "LIMA",
                            startDate: "08/04/20017",
                            endDate: "08/04/20017",
                        });
                        setModelIncludedData([...currentItem[j]]);

                        setOpenedModelBoxData([...openedModelBoxData]);
                    }
                }
            });
        }
    };

    const handleExpandedRowDelete = (e, id) => {
        const _bundleItems = [...bundleItems];
        _bundleItems[0].associatedServiceOrBundle.splice(id, 1);
        setBundleItems(_bundleItems);
    };

    const handleExpandedRowEdit = (e, id) => {
        alert("Edit row");
    };

    const getAddportfolioItemDataFun = (data) => {
        setAddportFolioItem(data)
    }

    const ExpandedComponent = ({ data }) => (
        <div className="scrollbar" id="style">
            {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
                <div
                    key={i}
                    id="row-0"
                    role="row"
                    className="sc-evZas cMMpBL rdt_TableRow"
                    style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
                >
                    <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco"></div>
                    <div
                        id="cell-1-undefined"
                        data-column-id="1"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div>{bundleAndService.itemId}</div>
                    </div>
                    <div
                        id="cell-2-undefined"
                        data-column-id="2"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.itemBodyDescription}
                        </div>
                    </div>
                    <div
                        id="cell-3-undefined"
                        data-column-id="3"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemHeaderModel.strategy}
                        </div>
                    </div>
                    <div
                        id="cell-4-undefined"
                        data-column-id="4"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.standardJobId}
                        </div>
                    </div>
                    <div
                        id="cell-5-undefined"
                        data-column-id="5"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.repairOption}
                        </div>
                    </div>
                    <div
                        id="cell-6-undefined"
                        data-column-id="6"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.frequency}
                        </div>
                    </div>
                    <div
                        id="cell-7-undefined"
                        data-column-id="7"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.quantity}
                        </div>
                    </div>
                    <div
                        id="cell-8-undefined"
                        data-column-id="8"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.sparePartsPrice}
                        </div>
                    </div>
                    <div
                        id="cell-9-undefined"
                        data-column-id="9"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.servicePrice}
                        </div>
                    </div>
                    <div
                        id="cell-10-undefined"
                        data-column-id="10"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.totalPrice}
                        </div>
                    </div>
                    <div
                        id="cell-11-undefined"
                        data-column-id="11"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv kVRqLz rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div
                            className="cursor"
                            onClick={(e) => handleExpandedRowEdit(e, i)}
                        >
                            <Tooltip title="Edit">
                                <img className="mx-1" src={penIcon} style={{ width: "14px" }} />
                            </Tooltip>
                        </div>
                        <div
                            className="cursor"
                            onClick={(e) => handleExpandedRowDelete(e, i)}
                        >
                            <Tooltip title="Delete">
                                <Link to="#" className="mx-1">
                                    <svg
                                        data-name="Layer 41"
                                        id="Layer_41"
                                        width="14px"
                                        viewBox="0 0 50 50"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title />
                                        <path
                                            className="cls-1"
                                            d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                        />
                                        <path
                                            className="cls-1"
                                            d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                        />
                                        <path
                                            className="cls-1"
                                            d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                        />
                                    </svg>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid ">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Custom Portfolio Template</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                        </div>
                    </div>
                    <div className="card p-4 mt-5">
                        <h5 className="d-flex align-items-center mb-0">
                            <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                            <div class="input-group icons border-radius-10 border">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={searchLogo} /></span>
                                </div>
                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                            </div>
                        </h5>
                        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="General" value="1" />
                                        <Tab label="Validity " value="2" />
                                        <Tab label="Strategy" value="3" />
                                        <Tab label="Administrative" value={"administrative"} />
                                        <Tab label="Price" value="4" />
                                        <Tab label="Price Agreement" disabled={!priceAgreementOption} value="5" />
                                        <Tab label="Coverage" value="6" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className="row mt-4">
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    SELECT TYPE
                                                </label>
                                                <Select
                                                    placeholder="Select"
                                                    options={headerTypeKeyValue}
                                                    value={headerType}
                                                    onChange={handleHeaderTypeChange}
                                                    isClearable={true}
                                                    isLoading={
                                                        headerTypeKeyValue.length > 0 ? false : true
                                                    }
                                                />
                                                {/* <div>
                                                    <ToggleButtonGroup
                                                        color="primary"
                                                        value={alignment}
                                                        exclusive
                                                        onChange={handleChangeToggle}
                                                    >
                                                        <ToggleButton value="Portfolio">Portfolio</ToggleButton>
                                                        <ToggleButton value="Program">Program</ToggleButton>
                                                    </ToggleButtonGroup>
                                                </div> */}

                                                {/* <input type="email" className="form-control border-radius-10" name="portfolioName" placeholder="Placeholder" value={generalComponentData.portfolioName} onChange={handleGeneralInputChange} /> */}
                                            </div>
                                        </div>
                                        {/* {console.log("error are : ", location.autocreatedcustomPortfolioData.customPortfolioId)} */}
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    {prefilgabelGeneral} ID
                                                </label>
                                                {/* {location.solutionValueIs == 1 ? <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="(Auto-generated11)"
                                                     {location.solutionValueIs }
                                                    comment this value={location.autocreatedcustomPortfolioData.customPortfolioId}
                                                   omment this onChange={handleGeneralInputChange}
                                                   omment this disabled={true}
                                                /> :  */}
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="(Auto-generated)"
                                                    // {location.solutionValueIs }
                                                    // value={location?.autocreatedcustomPortfolioData?.customPortfolioId}
                                                    // onChange={handleGeneralInputChange}
                                                    disabled={true}
                                                />
                                                {/* } */}
                                                {/* <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="(Auto-generated)"
                                                    // {location.solutionValueIs }
                                                    value={location.autocreatedcustomPortfolioData.customPortfolioId}
                                                    // onChange={handleGeneralInputChange}
                                                    disabled={true}
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    {prefilgabelGeneral} NAME
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={generalComponentData.name}
                                                    onChange={handleGeneralInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    SERVICE {prefilgabelGeneral} DESCRIPTION (IF ANY)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={generalComponentData.description}
                                                    onChange={handleGeneralInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    REFERENCE
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    name="externalReference"
                                                    placeholder="Reference"
                                                    value={generalComponentData.externalReference}
                                                    onChange={handleGeneralInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    CUSTOMER SEGMENT
                                                </label>
                                                <Select
                                                    onChange={handleCustomerSegmentChange}
                                                    value={generalComponentData.customerSegment}
                                                    options={customerSegmentKeyValue}
                                                    defa
                                                // options={strategyList}
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
                                    {isView ? (
                                        <div className="row mt-4">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PORTFOLIO ID
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        CVA - Premium plan
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PORTFOLIO DESCRIPTION
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        Premium Customer Value Agreement D8T and D6T
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        SERVICE PROGRAM DESCRIPTION (IF ANY)
                                                    </p>
                                                    <h6 className="font-weight-500">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        REFERENCE
                                                    </p>
                                                    <h6 className="font-weight-500">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CUSTOMER SEGMENT
                                                    </p>
                                                    <h6 className="font-weight-500">Construction</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </TabPanel>
                                <TabPanel value="2">

                                    <div className="row mt-4">
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
                                                                    className="form-controldate border-radius-10"
                                                                    label=""
                                                                    value={validityData.fromDate}
                                                                    onChange={(e) =>
                                                                        setValidityData({
                                                                            ...validityData,
                                                                            fromDate: e,
                                                                        })
                                                                    }
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                            {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
                                                        </div>
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                                            for="exampleInputEmail1"
                                                        >
                                                            TO
                                                        </label>
                                                        <div className="form-group w-100">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DatePicker
                                                                    variant="inline"
                                                                    className="form-controldate border-radius-10"
                                                                    label=""
                                                                    format="dd/MM/yyyy"
                                                                    value={validityData.toDate}
                                                                    onChange={(e) =>
                                                                        setValidityData({
                                                                            ...validityData,
                                                                            toDate: e,
                                                                        })
                                                                    }
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                            {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
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
                                                                for="exampleInputEmail1"
                                                            >
                                                                <span className="mr-2">FROM</span>
                                                            </label>
                                                            <div className="form-group w-100">
                                                                <div className=" d-flex form-control-date ">
                                                                    <Select
                                                                        className="select-input"
                                                                        value={validityData.from}
                                                                        onChange={(e) =>
                                                                            setValidityData({
                                                                                ...validityData,
                                                                                from: e,
                                                                            })
                                                                        }
                                                                        options={validityKeyValue}
                                                                        placeholder="Select "
                                                                    />
                                                                    <div>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                                            id="fromInput"
                                                                            aria-describedby="emailHelp"
                                                                            placeholder="From"
                                                                            value={validityData.fromInput}
                                                                            onChange={(e) =>
                                                                                setValidityData({
                                                                                    ...validityData,
                                                                                    fromInput: e.target.value,
                                                                                })
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center date-box w-100">
                                                            <label
                                                                className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                                                for="exampleInputEmail1"
                                                            >
                                                                <span className="">TO</span>
                                                            </label>
                                                            <div className="form-group w-100">
                                                                <div className=" d-flex form-control-date">
                                                                    <Select
                                                                        className="select-input"
                                                                        value={validityData.from}
                                                                        defaultValue={selectedOption}
                                                                        onChange={(e) =>
                                                                            setValidityData({
                                                                                ...validityData,
                                                                                to: e,
                                                                            })
                                                                        }
                                                                        isDisabled={true}
                                                                        options={validityKeyValue}
                                                                        placeholder="Select "
                                                                    />
                                                                    <div>
                                                                        <input
                                                                            type="email"
                                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                                            id="exampleInputEmail1"
                                                                            aria-describedby="emailHelp"
                                                                            placeholder=""
                                                                            value={validityData.toInput}
                                                                            onChange={(e) =>
                                                                                setValidityData({
                                                                                    ...validityData,
                                                                                    toInput: e.target.value,
                                                                                })
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6 col-sm-6">
                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100">
                                                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">HR</label>
                                                <div className="form-group w-100">
                                                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  <Link to={"/repairOption"} className="btn bg-primary text-white">
                 Next
                  </Link>
                </div>
                </div> */}
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            onClick={handleNextClick}
                                            className="btn btn-light"
                                            id="validity"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    CATEGORY USAGE
                                                </label>
                                                <Select
                                                    options={categoryList}
                                                    value={categoryUsageKeyValue1}
                                                    onChange={(e) => HandleCatUsage(e)}
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    STRATEGY TASK
                                                </label>
                                                <Select
                                                    options={updatedList}
                                                    value={stratgyTaskUsageKeyValue}
                                                    onChange={(e) => HandleStrategyUsage(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    TASK TYPE
                                                </label>
                                                <Select
                                                    options={updatedTaskList}
                                                    value={stratgyTaskTypeKeyValue}
                                                    onChange={(e) =>
                                                        setStratgyTaskTypeKeyValue(e)(
                                                            (addPortFolioItem.taskType = "")
                                                        )
                                                    }
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CATEGORY USAGE</label>
                                                <Select options={categoryList} />
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" />
                                            </div>
                                        </div> */}
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    OPTIONALS
                                                </label>
                                                <Select
                                                    options={strategyOptionals}
                                                    value={stratgyOptionalsKeyValue}
                                                    onChange={(e) => setStratgyOptionalsKeyValue(e)}
                                                // options={rTimeList}
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Optionais" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    RESPONSE TIME
                                                </label>
                                                <Select
                                                    options={rTimeList}
                                                    value={stratgyResponseTimeKeyValue}
                                                    onChange={(e) => setStratgyResponseTimeKeyValue(e)}
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Response Time" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRODUCT HIERARCHY
                                                </label>
                                                <Select
                                                    options={productList}
                                                    value={stratgyHierarchyKeyValue}
                                                    onChange={(e) => setStratgyHierarchyKeyValue(e)}
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    GEOGRAPHIC
                                                </label>
                                                <Select
                                                    options={geographicList}
                                                    value={stratgyGeographicKeyValue}
                                                    onChange={(e) => setStratgyGeographicKeyValue(e)}
                                                    placeholder="Geographic"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    MACHINE TYPE
                                                </label>
                                                <Select
                                                    options={machineTypeKeyValueList}
                                                    value={machineTypeKeyValue}
                                                    onChange={(e) => setMachineTypeKeyValue(e)}
                                                    // onChange={(e) =>
                                                    //     handleDropdownChange(ENUM.MACHINE_TYPE, e)
                                                    // }
                                                    // isClearable={true}
                                                    // value={coverageData.machineType}
                                                    isLoading={
                                                        machineTypeKeyValueList.length > 0 ? false : true
                                                    }
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    LIFE STAGE
                                                </label>
                                                <Select
                                                    // options={geographicList}
                                                    // value={stratgyGeographicKeyValue}
                                                    // onChange={(e) => setStratgyGeographicKeyValue(e)}
                                                    // defaultValue={selectedOption}
                                                    // onChange={setSelectedOption}
                                                    // options={options}
                                                    // placeholder="Life Stage"
                                                    options={lifeStageOfMachineKeyValueList}
                                                    value={lifeStageOfMachineKeyValue}
                                                    onChange={(e) => setLifeStageOfMachineKeyValue(e)}
                                                    // onChange={(e) =>
                                                    //     handleDropdownChange(ENUM.LIFE_STAGE_OF_MACHINE, e)
                                                    // }
                                                    // isClearable={true}
                                                    // value={coverageData.lifeStageOfMachine}
                                                    isLoading={
                                                        lifeStageOfMachineKeyValueList.length > 0 ? false : true
                                                    }
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    {isView ? (
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        STRATEGY TASK
                                                    </p>
                                                    <h6 className="font-weight-500">PM</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CATEGORY USAGE
                                                    </p>
                                                    <h6 className="font-weight-500">Contract</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        OPTIONALS
                                                    </p>
                                                    <h6 className="font-weight-500">Misc</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        RESPONSE TIME
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        Fast - 24x7 available,response within 4 hours of
                                                        call
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PRODUCT HIERARCHY
                                                    </p>
                                                    <h6 className="font-weight-500">End Product</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        GEOGRAPHIC
                                                    </p>
                                                    <h6 className="font-weight-500">Field Support</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
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
                                </TabPanel>
                                <TabPanel value={"administrative"}>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    PREPARED BY
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    name="preparedBy"
                                                    value={administrative.preparedBy}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    APPROVED BY
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="Optional"
                                                    name="approvedBy"
                                                    value={administrative.approvedBy}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            {/* <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    PREPARED ON
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="Optional"
                                                    name="preparedOn"
                                                    value={administrative.preparedOn}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div> */}
                                            <div className="form-group">
                                                <div className=" date-box w-100">
                                                    <label
                                                        className="text-light-dark font-size-14 font-weight-500"
                                                        htmlFor="exampleInputEmail1"
                                                    >
                                                        <span className=" mr-2">PREPARED ON</span>
                                                    </label>

                                                    <div className="form-group w-100">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                variant="inline"
                                                                format="dd/MM/yyyy"
                                                                className="form-controldate border-radius-10"
                                                                label=""
                                                                name="preparedOn"
                                                                value={administrative.preparedOn}
                                                                onChange={(e) =>
                                                                    setAdministrative({
                                                                        ...administrative,
                                                                        preparedOn: e,
                                                                    })
                                                                }
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    REVISED BY
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="Optional"
                                                    name="revisedBy"
                                                    value={administrative.revisedBy}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                {/* <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    REVISED ON
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="Optional"
                                                    name="revisedOn"
                                                    value={administrative.revisedOn}
                                                    onChange={handleAdministrativreChange}
                                                /> */}
                                                <div className=" date-box w-100">
                                                    <label
                                                        className="text-light-dark font-size-14 font-weight-500"
                                                        htmlFor="exampleInputEmail1"
                                                    >
                                                        <span className=" mr-2">PREPARED ON</span>
                                                    </label>

                                                    <div className="form-group w-100">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                variant="inline"
                                                                format="dd/MM/yyyy"
                                                                className="form-controldate border-radius-10"
                                                                label=""
                                                                name="revisedOn"
                                                                value={administrative.revisedOn}
                                                                onChange={(e) =>
                                                                    setAdministrative({
                                                                        ...administrative,
                                                                        revisedOn: e,
                                                                    })
                                                                }
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    SALSE OFFICE/BRANCH
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    name="salesOffice"
                                                    value={administrative.salesOffice}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    OFFER VALIDITY
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="Optional"
                                                    name="offerValidity"
                                                    value={administrative.offerValidity}
                                                    onChange={handleAdministrativreChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            onClick={handleNextClick}
                                            className="btn btn-light"
                                            id="administrative"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>
                                <TabPanel value="4">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE LIST
                                                </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE METHOD
                                                </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={priceMethodKeyValue}
                                                    //   options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE DATE
                                                </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>PRICES</h6>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE TYPE
                                                </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE{" "}
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control border-radius-10"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="$100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group date-box">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    ADDITIONAL
                                                </label>
                                                <div className=" d-flex form-control-date">
                                                    {/* <Select className="select-input"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            placeholder="placeholder "
                          /> */}
                                                    <div className="">
                                                        <Select
                                                            onChange={setSelectedOption}
                                                            isClearable={true}
                                                            // value={options}
                                                            options={options}
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="10%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group date-box">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE ESCALATON
                                                </label>
                                                <div className=" d-flex align-items-center form-control-date">
                                                    <Select
                                                        className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="20%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    CALCULATED PRICE
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control border-radius-10"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="$100"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group date-box">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE BREAK DOWN
                                                </label>
                                                <div className=" d-flex form-control-date">
                                                    <Select
                                                        className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="20%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group date-box">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE BREAK DOWN
                                                </label>
                                                <div className=" d-flex form-control-date">
                                                    <Select
                                                        className="select-input"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="placeholder "
                                                    />
                                                    <input
                                                        type="email"
                                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="20%"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            onClick={() => setValue("5")}
                                            className="btn btn-light"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>
                                <TabPanel value="5">
                                    <div className="card border">
                                        <div className="d-flex align-items-center justify-content-between px-3">
                                            <div className="">
                                                <div className="d-flex ">
                                                    <h5 className=" mb-0">
                                                        <span>Price Agreement</span>
                                                    </h5>
                                                    <p className=" mb-0">
                                                        <a href="#" className="ml-3 ">
                                                            <img src={editIcon}></img>
                                                        </a>
                                                        <a href="#" className="ml-3 ">
                                                            <img src={shareIcon}></img>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center ">
                                                <div className=" text-center border-left py-4 pl-3">
                                                    <a
                                                        className="cursor"
                                                        onClick={handleAddNewRowPriceAgreement}
                                                    >
                                                        + Add
                                                    </a>
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
                                                <tbody>{priceAgreementRows}</tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button
                                            type="button"
                                            onClick={() => setValue("6")}
                                            className="btn btn-light"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>
                                <TabPanel value="6">
                                    <div
                                        className="custom-table card p-3 "
                                        style={{ width: "100%", backgroundColor: "#fff" }}
                                    >
                                        <div
                                            className="row align-items-center m-0"
                                            style={{ flexFlow: "unset" }}
                                        >
                                            <QuerySearchComp
                                                setMasterData={setMasterData}
                                                setFilterMasterData={setFilterMasterData}
                                                setSelectedMasterData={setSelectedMasterData}
                                                setFlagIs={setFlagIs}
                                                compoFlag="coverage"
                                                options={[
                                                    { label: "Make", value: "make" },
                                                    { label: "Model", value: "model" },
                                                    { label: "Prefix", value: "prefix" },
                                                    { label: "Family", value: "family" },
                                                ]}
                                            />
                                            <div className=" ml-3">
                                                <Link to="#" className="btn bg-primary text-white">
                                                    <FileUploadOutlinedIcon />{" "}
                                                    <span className="ml-1">Upload</span>
                                                </Link>
                                            </div>
                                        </div>
                                        {masterData.length > 0 ? (
                                            <>
                                                <hr />
                                                <DataTable
                                                    className=""
                                                    title=""
                                                    columns={masterColumns}
                                                    data={masterData}
                                                    customStyles={customStyles}
                                                    pagination
                                                />
                                                <div>
                                                    <div className="text-right">
                                                        <input
                                                            onClick={() => {
                                                                setSelectedMasterData(filterMasterData);
                                                                setMasterData([]);
                                                            }}
                                                            className="btn bg-primary text-white"
                                                            value="+ Add Selected"
                                                            disabled={!flagIs}
                                                        />

                                                        {/* <Link to="#"
                          onClick={() => {
                            setSelectedMasterData(filterMasterData)
                            setMasterData([])
                          }}
                          className="btn bg-primary text-white"
                        >+ Add Selected</Link> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {selectedMasterData.length > 0 ? (
                                            <>
                                                <hr />
                                                <label htmlFor="Included-model">
                                                    <h5 className="font-weight-400 text-black mb-2 mt-1">
                                                        Included models
                                                    </h5>
                                                </label>
                                                <DataTable
                                                    className="mt-3"
                                                    title=""
                                                    columns={selectedMasterColumns}
                                                    data={selectedMasterData}
                                                    customStyles={customStyles}
                                                    pagination
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    <div className="row" style={{ display: "none" }}>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    <Checkbox className="text-white" {...label} />
                                                </label>
                                                {makeKeyValue.length > 0 ? (
                                                    <Select
                                                        onChange={(e) => handleDropdownChange(ENUM.MAKE, e)}
                                                        isClearable={true}
                                                        value={coverageData.makeSelect}
                                                        isLoading={makeKeyValue.length > 0 ? false : true}
                                                        options={makeKeyValue}
                                                    />
                                                ) : (
                                                    <input
                                                        type="email"
                                                        className="form-control border-radius-10"
                                                        name="make"
                                                        placeholder=""
                                                        value={coverageData.make}
                                                        onChange={handleCoverageInputChange}
                                                    />
                                                )}

                                                {/* <input type="email" className="form-control border-radius-10" name="make" placeholder="" value={coverageData.make} onChange={handleCoverageInputChange} /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    MAKE
                                                </label>
                                                {makeKeyValue.length > 0 ? (
                                                    <Select
                                                        onChange={(e) => handleDropdownChange(ENUM.MAKE, e)}
                                                        isClearable={true}
                                                        value={coverageData.makeSelect}
                                                        isLoading={makeKeyValue.length > 0 ? false : true}
                                                        options={makeKeyValue}
                                                    />
                                                ) : (
                                                    <input
                                                        type="email"
                                                        className="form-control border-radius-10"
                                                        name="make"
                                                        placeholder=""
                                                        value={coverageData.make}
                                                        onChange={handleCoverageInputChange}
                                                    />
                                                )}

                                                {/* <input type="email" className="form-control border-radius-10" name="make" placeholder="" value={coverageData.make} onChange={handleCoverageInputChange} /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    MODEL(S)
                                                </label>
                                                {/* <Select
                                                    onChange={(e) => handleDropdownChange(ENUM.MACHINE_COMPONENT, e)}
                                                    isClearable={true}
                                                    value={coverageData.machineComponent}
                                                    isLoading={typeKeyValue.length > 0 ? false : true}
                                                    options={typeKeyValue}
                                                /> */}
                                                {modelKeyValue.length > 0 ? (
                                                    <Select
                                                        onChange={(e) =>
                                                            handleDropdownChange(ENUM.MODEL, e)
                                                        }
                                                        isClearable={true}
                                                        value={coverageData.modelSelect}
                                                        isLoading={modelKeyValue.length > 0 ? false : true}
                                                        options={modelKeyValue}
                                                    />
                                                ) : (
                                                    <input
                                                        type="email"
                                                        className="form-control border-radius-10"
                                                        name="modal"
                                                        placeholder=""
                                                        value={coverageData.modal}
                                                        onChange={handleCoverageInputChange}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    PREFIX(S)
                                                </label>
                                                {prefixKeyValue.length > 0 ? (
                                                    <Select
                                                        onChange={(e) =>
                                                            handleDropdownChange(ENUM.PREFIX, e)
                                                        }
                                                        isClearable={true}
                                                        value={coverageData.prefixSelect}
                                                        isLoading={prefixKeyValue.length > 0 ? false : true}
                                                        options={prefixKeyValue}
                                                    />
                                                ) : (
                                                    <input
                                                        type="email"
                                                        className="form-control border-radius-10"
                                                        name="prefix"
                                                        placeholder=""
                                                        value={coverageData.prefix}
                                                        onChange={handleCoverageInputChange}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    MACHINE/COMPOMENT
                                                </label>
                                                <Select
                                                    onChange={(e) =>
                                                        handleDropdownChange(ENUM.MACHINE_COMPONENT, e)
                                                    }
                                                    isClearable={true}
                                                    value={coverageData.machineComponent}
                                                    isLoading={typeKeyValue.length > 0 ? false : true}
                                                    options={typeKeyValue}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    MACHINE TYPE
                                                </label>
                                                <Select
                                                    onChange={(e) =>
                                                        handleDropdownChange(ENUM.MACHINE_TYPE, e)
                                                    }
                                                    isClearable={true}
                                                    value={coverageData.machineType}
                                                    isLoading={
                                                        machineTypeKeyValue.length > 0 ? false : true
                                                    }
                                                    options={machineTypeKeyValue}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4"> */}
                                        {/* <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COVERAGE DATA</label>
                                            </div> */}
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    COVERAGE DATA
                                                </label>
                                                <h6>
                                                    Coverage123
                                                    <span
                                                        className="ml-3 cursor"
                                                        onClick={() => setShowAvailableCoverage(true)}
                                                    >
                                                        <i className="fa fa-external-link"></i>
                                                    </span>
                                                </h6>
                                            </div>
                                        </div>
                                        {/* <a href="#" className="btn btn-primary w-100" onClick={() => setShowAvailableCoverage(true)}> Create New</a> */}
                                        {/* </div> */}
                                    </div>

                                    {isView ? (
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MAKE
                                                    </p>
                                                    <h6 className="font-weight-600">Caterpillar</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MODEL(S)
                                                    </p>
                                                    <h6 className="font-weight-600">D8T,D6T</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PREFIX(S)
                                                    </p>
                                                    <h6 className="font-weight-600">MBB</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MACHINE/COMPOMENT
                                                    </p>
                                                    <h6 className="font-weight-600">Machine</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MACHINE TYPE
                                                    </p>
                                                    <h6 className="font-weight-600">New</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MACHINE DATE
                                                    </p>
                                                    <h6 className="font-weight-600">Coverrage123</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <div className="row" style={{ justifyContent: "right" }}>
                                        {selectedMasterData.length > 0 ? (
                                            <button
                                                type="button"
                                                onClick={handleNextClick}
                                                className="btn btn-light"
                                                id="coverage"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                    {/* hide portfolio item querySearch */}
                    <div className="card mt-4 px-4">

                        <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                            {/* <DataGrid
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#7380E4', color: '#fff'
                                    }
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                // onCellClick={(e) => handleRowClick(e)}
                            /> */}

                            <DataTable
                                className=""
                                title=""
                                columns={selectedportfolioTempItemsColumn}
                                data={location.selectedTemplateItems}
                                customStyles={customStyles}
                                pagination
                            />
                        </div>
                    </div>

                    <div
                        className="modal right fade"
                        id="myModal12"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="myModalLabel2"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header d-block">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title" id="myModalLabel2">
                                        Inclusion/Exclusion
                                    </h4>
                                </div>
                                <div className="modal-body p-0">
                                    <div className="bg-light-blue p-3">
                                        <h5 className="font-weight-normal text-violet mb-0">
                                            {/* CHOICE OF SPARE PARTS */}
                                            CHOICE OF PARTS
                                        </h5>
                                    </div>
                                    <div className="bg-white p-3">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Switch />}
                                                // label="With Spare Parts"
                                                label="With Parts"
                                                onChange={(e) => handleWithSparePartsCheckBox(e)}
                                                // value={partsRequired}
                                                checked={partsRequired}
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="I have Spare Parts"
                                                
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="I need only Spare Parts"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="bg-light-blue p-3">
                                        <h5 className="font-weight-normal text-violet mb-0">
                                            CHOICE OF LABOR
                                        </h5>
                                    </div>
                                    <div className="bg-white p-3">
                                        <div className=" d-flex justify-content-between ">
                                            <div>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Switch />}
                                                        label="With Labor"
                                                        onChange={(e) => handleWithLabourCheckBox(e)}
                                                        checked={labourRequired}
                                                    />
                                                    <FormControlLabel
                                                        control={<Switch disabled />}
                                                        label="Without Labor"
                                                    />
                                                </FormGroup>
                                            </div>
                                            {/* <div>
                                                <a href="#" className="ml-3 font-size-14">
                                                    <img src={deleteIcon}></img>
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="bg-light-blue p-3">
                                        <h5 className="font-weight-normal text-violet mb-0">
                                            CHOICE MISC.
                                        </h5>
                                    </div>
                                    <div className="bg-white p-3">
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Switch />}
                                                // label="Travel Expenses"
                                                label="Misc Required"
                                                onChange={(e) => handleWithMiscCheckBox(e)}
                                                checked={miscRequired}
                                            />
                                            <FormControlLabel control={<Switch disabled />} label=" Lubricants" />
                                            <FormControlLabel control={<Switch disabled />} label="Tools" />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="External Work"
                                            />
                                        </FormGroup>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: "contents" }}>
                                                <span className="mr-3 white-space">Includes</span>
                                            </div>
                                            <div className="hr"></div>
                                        </h5>
                                    </div>
                                    <div className="bg-light-blue p-3">
                                        <h5 className="font-weight-normal text-violet mb-0">
                                            SERVICES
                                        </h5>
                                    </div>
                                    <div className="bg-white p-3">
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <div>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Switch />}
                                                        // label=" Changee Oil and Filter"
                                                        label=" Service Required"
                                                        onChange={(e) => handleWithServiceCheckBox(e)}
                                                        checked={serviceRequired}
                                                    />
                                                </FormGroup>
                                            </div>
                                            {/* <div>
                                                <a href="#" className="ml-3 font-size-14">
                                                    <img src={deleteIcon}></img>
                                                </a>
                                            </div> */}
                                        </div>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: "contents" }}>
                                                <span className="mr-3 white-space">Optianal services</span>
                                            </div>
                                            <div className="hr"></div>
                                        </h5>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="Air Filter Replacement"
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="Cabin Air Filter"
                                            />
                                            <FormControlLabel control={<Switch disabled />} label="Rotete Tires" />
                                        </FormGroup>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: "contents" }}>
                                                <span className="mr-3 white-space">Includes</span>
                                            </div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="mt-3">
                                            <h6>
                                                <a
                                                    // href="#"
                                                    className="btn-sm text-white mr-2"
                                                    style={{ background: "#79CBA2", cursor: "pointer" }}
                                                >
                                                    Free
                                                </a>{" "}
                                                50 Point Inspection
                                            </h6>
                                            <h6 className="mt-3">
                                                <a
                                                    // href="#"
                                                    className="btn-sm text-white mr-2 "
                                                    style={{ background: "#79CBA2", cursor: "pointer" }}
                                                >
                                                    Free
                                                </a>{" "}
                                                50 Point Inspection
                                            </h6>
                                        </div>
                                        <div className=" d-flex justify-content-between mt-4">
                                            {/* <div>
                                                <a href="#" className="btn text-violet bg-light-blue">
                                                    <b>
                                                        <span className="mr-2">+</span>Add more services
                                                    </b>
                                                </a>
                                            </div> */}
                                            <div>
                                                <button className="btn text-violet" onClick={UpdateCustomPriceInclusion} data-dismiss="modal" ><b>Save</b></button>
                                                {/* <div className="btn text-violet" style={{cusrsor: "pointer"}}>
                                                    <b>Save</b>
                                                </div> */}
                                                {/* <a href="#" className="btn text-violet">
                                                    <b>I Have Parts</b>
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={open1} onHide={handleClose1} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>

                        <Modal.Body className="">
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <h5 className="font-weight-600 mb-0">Coverage</h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                                    {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                                </div>
                            </div>
                            <div className="card mt-4">
                                <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                                    <h6 className="font-weight-600 text-light mb-0 ml-3">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                                    <div>
                                        <a href="#" className="btn">+Add</a>
                                    </div>
                                </div>
                                <div className="p-4  row">
                                    <div className="col-md-6 col-sm-6">
                                        <a href="#" className="add-new-recod">
                                            <div>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <p className="font-weight-600">Add new record</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="add-new-recod">

                                            <div>
                                                <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                                <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                                <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                                <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={open} onHide={handleClose} size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Import Files</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="p-3">
                                <div className="add-new-recod">
                                    <div>
                                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                    </div>
                                </div>
                                <p className="mt-3">Single upload file should not be more than 10MB. Only the  .xls, .xlsx file types are allowed</p>
                            </div>
                            <div className="recent-div p-3">
                                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                                <div className="recent-items mt-3">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                                        <div className="d-flex align-items-center">
                                            <div className="white-space custom-checkbox">
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                </FormGroup>
                                            </div>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                    <p className="font-size-12 mb-0">Part List </p>
                                </div>
                                <div className="recent-items mt-3">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                                        <div className="d-flex align-items-center">
                                            <div className="white-space custom-checkbox">
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox />} label="" />
                                                </FormGroup>
                                            </div>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                    <p className="font-size-12 mb-0">Part List </p>
                                </div>
                            </div>


                        </Modal.Body>
                        <div className="row m-0 p-3">
                            <div className="col-md-6 col-sm-6">
                                <button className="btn border w-100 bg-white" onClick={handleClose}>Cancel</button>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
                            </div>
                        </div>


                    </Modal>
                    <Modal show={openCoverage} onHide={handleCoveragetable} size="xl"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>

                        <Modal.Body className="">
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <h5 className="font-weight-600 mb-0">Coverage</h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                                    {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                                </div>
                            </div>
                            <div className="card px-4 pb-4 mt-5 pt-0">
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <div className="d-flex ">
                                            <h5 className=" mb-0"><span>Coverage123</span></h5>
                                            <p className=" mb-0">
                                                <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                                <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '10px 15px', borderRadius: '10px' }}>
                                            <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                                                <img src={searchstatusIcon}></img>
                                            </div>
                                            <div className="w-100 mx-2">
                                                <div className="machine-drop d-flex align-items-center">
                                                    <div><lable className="label-div">Machine</lable></div>
                                                    <FormControl className="" sx={{ m: 1, }}>
                                                        <Select
                                                            id="demo-simple-select-autowidth"
                                                            value={age}
                                                            onChange={handleChangedrop}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="5">
                                                                <em>Engine</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Twenty</MenuItem>
                                                            <MenuItem value={21}>Twenty one</MenuItem>
                                                            <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-4">
                                        <div className="d-flex align-items-center">
                                            <div className="col-7 text-center">
                                                <a href="#" className="p-1 more-btn">+ 3 more
                                                    <span className="c-btn">C</span>
                                                    <span className="b-btn">B</span>
                                                    <span className="a-btn">A</span>
                                                </a>
                                            </div>
                                            <div className="col-5 text-center border-left py-4">
                                                <a href="#" className=" ">+ Add Part</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                                    <DataGrid
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: '#872ff7', color: '#fff'
                                            }
                                        }}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection


                                    />
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )
}
