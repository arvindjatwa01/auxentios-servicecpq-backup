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

import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchIcon from "@mui/icons-material/Search";

import {
    Switch as Switch1,
} from "@mui/material";
import Solution from "pages/PortfolioAndBundle/Solution";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SearchBox from "../Repair/components/SearchBox";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormGroup from '@mui/material/FormGroup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastContainer, toast } from "react-toastify";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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

import { customerSearch, machineSearch } from "services/searchServices";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import DropdownButton from "react-bootstrap/DropdownButton";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import Validator from "../../utils/validator";

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

import AddCustomPortfolioItem from "./AddCustomPortfolioItem";
import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "../Repair/CONSTANTS";


import { MuiMenuComponent } from "../Operational/index";
import { useHistory } from 'react-router-dom';

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Cookies from "js-cookie";

import DataTable from "react-data-table-component";
import PriceCalculatorCustomItem from "./PriceCalculatorCustomItem";
import penIcon from "../../assets/images/pen.png";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Loader from "react-js-loader";
import $ from "jquery";
import ExpendCustomItemTablePopup from "./ExpendCustomItemTablePopup";

import {

    createPortfolio,
    getPortfolio,
    updatePortfolio,
    createCoverage,
    updateCustomCoverage,
    updateCoverage,
    getItemPrice,
    updateItemData,
    deleteItem,
    getComponentCodeSuggetions,
    itemPriceDataId,
    updateItemPriceData,
    customItemCreation,
    createCustomCoverage,
    updateCustomItemData,
    deleteCustomItem,
    customPriceCreation,
    customPortfolioItemPriceRkId,
    getQuoteMasterData,
    getSearchQuoteData,
    updateMasterQuoteData,
    deleteMasterQuote,
    getSolutionLevelKeyValue,
    getSolutionTypeKeyValue,

    escalationPriceCreation,
    additionalPriceCreation,
    updatePortfolioPrice,
    updateEscalationPriceById,
    updateAdditionalPriceById,
    getPortfolioPriceById,
    customPortfolioItemPriceSJID,
    getCustomItemPriceById,
    updateCustomPriceData,

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
    getSolutionPriceCommonConfig,
    getSearchQueryCoverage,
    getSearchCoverageForFamily,
    itemCreation,
    getCustomItemDataById,
    quoteCreation,
    convertPortfolioToQuoteData,
    portfolioPriceCreation,
    getSolutionPortfolioById,
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
    selectSolutionTaskList,
    selectSolutionLevelList,
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
            // backgroundColor: "#7571f9",
            backgroundColor: "#872ff7",
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

const customTableStyles = {
    rows: {
        style: {
            minHeight: "72px", // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
            backgroundColor: "#872ff7",
            color: "#fff",
            borderRight: "1px solid rgba(0,0,0,.12)",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
            borderRight: "1px solid rgba(0,0,0,.12)",
        },
    },
};

export function CreatedCustomPortfolioTemplate(props) {


    // let history = useHistory()
    const history = useHistory();
    const { state } = props.location;
    const location = useLocation();

    var CookiesSetData = Cookies.get("loginTenantDtl");
    var getCookiesJsonData;
    if (CookiesSetData != undefined) {
        getCookiesJsonData = JSON.parse(CookiesSetData);
    }
    const loginTenantId = CookiesSetData != undefined ? getCookiesJsonData?.user_tenantId : 74;

    var CreatedCustomPortfolioDetails = JSON.parse(localStorage.getItem('createdCustomPortfolioData'));

    const [makeKeyValue, setMakeKeyValue] = useState([]);
    const [modelKeyValue, setModelKeyValue] = useState([]);
    const [prefixKeyValue, setPrefixKeyValue] = useState([]);
    const [validityKeyValue, setValidityKeyValue] = useState([]);
    const [headerType, setHeaderType] = useState(null);
    const [headerTypeKeyValue, setHeaderTypeKeyValue] = useState([]);
    const [responseTimeTaskKeyValue, setResponseTimeTaskKeyValue] = useState([]);
    const [taskTypeKeyValue, setTaskTypeKeyValue] = useState([]);

    const [solutionTypeListKeyValue, setSolutionTypeListKeyValue] = useState([]);
    const [solutionLevelListKeyValue, setSolutionLevelListKeyValue] = useState([]);

    const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
        []
    );
    const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [headerLoading, setHeaderLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);
    const [value, setValue] = React.useState('general');

    const [value2, setValue2] = useState({
        value: "DRAFT",
        label: "Draft",
    });
    const [value3, setValue3] = useState({ value: "STANDARD", label: "Standard (Bronze)" });

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [openCoverage, setOpenCoveragetable] = React.useState(false);
    const [versionPopup, setVersionPopup] = useState(false)

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

    const [bundleAndServiceEditAble, setBundleAndServiceEditAble] = useState(false);
    const [selectedCustomerSegmentOption, setSelectedCustomerSegmentOption] = useState("");
    const [createdServiceData, setCreatedServiceData] = useState({});
    const [bundleServicePortfolioItemId, setBundleServicePortfolioItemId] = useState(0);
    const [bundleServiceItemPriceData, setBundleServiceItemPriceData] = useState([]);
    const [bundleServiceQuerySearchModelResult, setBundleServiceQuerySearchModelResult] = useState([])
    const [bundleServiceQuerySearchModelPrefixOption, setBundleServiceQuerySearchModelPrefixOption] = useState([])
    const [bundleServiceNeed, setBundleServiceNeed] = useState(false);
    const [createdBundleItems, setCreatedBundleItems] = useState("");
    const [updatedServiceBundleItemData, setUpdatedServiceBundleItemData] = useState("");
    const [associatedServiceOrBundleIndex, setAssociatedServiceOrBundleIndex] = useState(0);

    const [bundleOrServiceAdministrative, setBundleOrServiceAdministrative] = useState({
        preparedBy: null,
        approvedBy: null,
        preparedOn: new Date(),
        revisedBy: null,
        revisedOn: new Date(),
        salesOffice: null,
        offerValidity: null,
    });

    const [customerData, setCustomerData] = useState({
        source: "User Generated",
        customerID: "",
        customerName: "",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        customerGroup: "",
    });

    const [extWorkData, setExtWorkData] = useState({
        jobCode: "",
        jobCodeDescription: "",
        pricingMethod: "",
        totalPrice: 0.0,
        payer: "",
        flatRateIndicator: false,
        adjustedPrice: 0.0,
        basePrice: 0.0,
        percentageOfBase: 0,
    });
    const handleContinueOfServiceOrBundle = async () => {
        setTabs("4")
    }
    const tempBundleItemColumns1New = [

        // {
        //     name: (
        //         <>
        //             <div>Item Id</div>
        //         </>
        //     ),
        //     selector: (row) => row.customItemId,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.customItemId,
        // },
        {
            name: (
                <>
                    <div>Item Name</div>
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
                    <div>Item Description</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel.itemHeaderDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel.itemHeaderDescription,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel.taskType,
        },
        {
            name: (
                <>
                    <div>Quantity</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.quantity,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.quantity,
        },
        {
            name: (
                <>
                    <div>Net Price</div>
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
                    <div>Net Additional</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.additional,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.additional,
        },
        {
            name: (
                <>
                    <div>Net Parts Price</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.partsprice,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.partsprice,
        },
        {
            name: (
                <>
                    <div>Total Price</div>
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
                    <div>Comments</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.comments,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.comments,
        },
        {
            name: (
                <>
                    <div>Total $</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel.totalPrice,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel.totalPrice,
        },
    ];
    const handleExpandRowForPriceCalculator = (bool, row) => {
        setExpandedPriceCalculator({
            ...expandedPriceCalculator,
            itemId: row.customItemId,
            description: row.customItemBodyModel.itemBodyDescription,
            recommendedValue: row.customItemBodyModel.recommendedValue,
            frequency: row.customItemBodyModel.frequency
        })

    }
    const [expandedPriceCalculator, setExpandedPriceCalculator] = useState({
        itemId: "",
        description: "",
        startUsage: "",
        endUsage: "",
        frequency: "",
        recommendedValue: "",
        numberOfEvents: "",
        priceMethod: "",
        priceAdditionalSelect: "",
        priceAdditionalInput: "",
        priceEscalationSelect: "",
        priceEscalationInput: "",
        calculatedPrice: "",
        flatPrice: "",
        discountTypeSelect: "",
        discountTypeInput: "",
    });

    const ExpendedModelComponent = ({ data }) => (
        <div className="scrollbar" id="style">
            {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
                <div
                    key={i}
                    id="row-0"
                    role="row"
                    className="sc-evZas cMMpBL rdt_TableRow"
                    style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
                >
                    <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell"></div>
                    <div
                        id="cell-1-undefined"
                        data-column-id="1"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div>{bundleAndService.customItemId}</div>
                    </div>
                    <div
                        id="cell-1-undefined"
                        data-column-id="1"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div></div>
                        {/* <div>{bundleAndService.customItemId}</div> */}
                    </div>
                    <div
                        id="cell-2-undefined"
                        data-column-id="2"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.itemBodyDescription}
                        </div>
                    </div>
                    <div
                        id="cell-3-undefined"
                        data-column-id="3"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemHeaderModel?.strategy}
                        </div>
                    </div>
                    <div
                        id="cell-4-undefined"
                        data-column-id="4"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.standardJobId}
                        </div>
                    </div>
                    <div
                        id="cell-5-undefined"
                        data-column-id="5"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.repairOption}
                        </div>
                    </div>
                    <div
                        id="cell-6-undefined"
                        data-column-id="6"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.frequency}
                        </div>
                    </div>
                    <div
                        id="cell-7-undefined"
                        data-column-id="7"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.quantity}
                        </div>
                    </div>
                    <div
                        id="cell-8-undefined"
                        data-column-id="8"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.sparePartsPrice}
                        </div>
                    </div>
                    <div
                        id="cell-9-undefined"
                        data-column-id="9"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.servicePrice}
                        </div>
                    </div>
                    <div
                        id="cell-10-undefined"
                        data-column-id="10"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.customItemBodyModel?.totalPrice}
                        </div>
                    </div>
                    {bundleItems.length > 0 && (<div
                        id="cell-11-undefined"
                        data-column-id="11"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv kVRqLz custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div
                            className="cursor"
                            onClick={(e) =>
                                handleExpandedRowEdit(
                                    e,
                                    data.customItemId,
                                    data.associatedServiceOrBundle[i]
                                )
                            }
                        >
                            <Tooltip title="Edit">
                                <img className="mx-1" src={penIcon} style={{ width: "14px" }} />
                            </Tooltip>
                        </div>
                        <div
                            className="cursor"
                            onClick={(e) =>
                                handleExpandedRowDelete(
                                    e,
                                    data.customItemId,
                                    data.associatedServiceOrBundle[i].customItemId
                                )
                            }
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
                    </div>)}

                </div>
            ))}
        </div>
    );
    const [additionalPriceHeadTypeKeyValue, setAdditionalPriceHeadTypeKeyValue] = useState([
        // { label: "Surcharge Percentage", value: "PERCENTAGE" },
        // { label: "Surcharge Dollar", value: "ABSOLUTE", },
        { label: "Surcharge %", value: "PERCENTAGE" },
        { label: "Surcharge $", value: "ABSOLUTE", },
    ])
    const tempBundleCustomItemColumns = [
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
                            name={row.customItemId}
                            value={tempBundleItemCheckList[row.customItemId]}
                            checked={tempBundleItemCheckList[row.customItemId]}
                            onChange={(e) => handleTempbundleItemSelection(e, row)}
                            style={{ border: "1px solid #000" }}
                        />
                    )}
                </>
            ),
        },
        // {
        //     name: (
        //         <>
        //             <div>Item ID </div>
        //         </>
        //     ),
        //     selector: (row) => row.customItemId,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.customItemId,
        // },
        {
            name: (
                <>
                    <div>Item Name </div>
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
                    <div>Item Description</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel.itemHeaderDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel.itemHeaderDescription,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel.taskType,
        },
        {
            name: (
                <>
                    <div>Quantity</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.quantity,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.quantity,
        },
        {
            name: (
                <>
                    <div>Net Price</div>
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
                    <div>Net Additional</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.additional,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.additional,
        },
        {
            name: (
                <>
                    <div>Net Parts Price</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.partsprice,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.partsprice,
        },
        {
            name: (
                <>
                    <div>Total Price</div>
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
                    <div>Comments</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.comments,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.comments,
        },
    ];
    const [priceCurrencyKeyValue, setPriceCurrencyKeyvalue] = useState([]);
    const [tempBundleService1, setTempBundleService1] = useState([]);
    const [tempBundleService2, setTempBundleService2] = useState([]);
    const [tempBundleService3, setTempBundleService3] = useState([]);
    const tempBundleItemColumns1 = [

        // {
        //     name: (
        //         <>
        //             <div>Item Id</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemId,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemId,
        // },
        {
            name: (
                <>
                    <div>Item Name</div>
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
            selector: (row) => row.itemHeaderModel.itemHeaderDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.itemHeaderModel.itemHeaderDescription,
        },
        {
            name: (
                <>
                    <div>Usage In</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.usageIn,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.usageIn,
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.itemHeaderModel.itemHeaderStrategy,
            wrap: true,
            sortable: true,
            format: (row) => row.itemHeaderModel.itemHeaderStrategy,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.taskType,
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
                    <div>Recommended Value</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.recommendedValue,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.recommendedValue,
        },
        {
            name: (
                <>
                    <div>Template/Kit ID</div>
                </>
            ),
            selector: (row) => row.itemBodyModel.repairKitId,
            wrap: true,
            sortable: true,
            format: (row) => row.itemBodyModel.repairKitId,
        },
        // {
        //     name: (
        //         <>
        //             <div>Standard Job Id</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.standardJobId,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.standardJobId,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Repair Options</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.repairOption,
        //     sortable: true,
        //     maxWidth: "300px",
        //     format: (row) => row.itemBodyModel.repairOption,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Frequency</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.frequency,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.frequency,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Quantity</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.quantity,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.quantity,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Parts $</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.sparePartsPrice,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.sparePartsPrice,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Service $</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.servicePrice,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.servicePrice,
        // },
        // {
        //     name: (
        //         <>
        //             <div>Total $</div>
        //         </>
        //     ),
        //     selector: (row) => row.itemBodyModel.totalPrice,
        //     wrap: true,
        //     sortable: true,
        //     format: (row) => row.itemBodyModel.totalPrice,
        // },
    ];
    const [itemPriceCalculator, setItemPriceCalculator] = useState({
        netParts: "",
        netService: "",
        priceType: "",
        netPrice: "",
        netAdditionals: "",
    })
    const handleCreateCustomItem_SearchResult = async () => {
        console.log("tempBundleItems[i].customItemId 12345 : ", tempBundleItems)
        let reqObj = {};
        for (let i = 0; i < tempBundleItems.length; i++) {
            createdItemId = tempBundleItems[i].customItemId;
            if (tempBundleItems[i].customItemId === currentItemId) {
                // reqObj = {
                //     itemId: tempBundleItems[i].customItemId,
                //     standardJobId: tempBundleItems[i].customItemBodyModel.standardJobId,
                //     repairKitId: tempBundleItems[i].customItemBodyModel.repairKitId,
                // }
                reqObj = {
                    itemId: tempBundleItems[i].customItemId,
                    standardJobId: itemPriceData.standardJobId,
                    repairKitId: itemPriceData.repairKitId,
                    itemPriceDataId: itemPriceData.customItemPriceDataId
                }
                break;
            }
        }
        if (portfolioId === undefined || portfolioId == null) {
            toast("😐 Please Create Portfolio First", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // if (Object.keys(reqObj).length === 0) {
            //     toast("😐" + " Please Create an Item first", {
            //         position: "top-right",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });
            // } else {
            //     console.log("reqObj : ", reqObj)
            //     const res2 = await customPortfolioItemPriceSJID(reqObj)
            //     const res = await getCustomItemPriceById(itemPriceData.customItemPriceDataId)
            //     setItemPriceCalculator({
            //         netParts: res.data.sparePartsPrice,
            //         netService: res.data.netService,
            //         priceType: res.data.priceType,
            //         netPrice: res.data.totalPrice,
            //         netAdditionals: res.data.listPrice,
            //     })
            // }


            var createdItemId = 0;

            console.log("CreatedItemId : ", createdItemId);

            var createdNewCustomItems = [];
            console.log("tempBundleService2 is : ", tempBundleService2)
            for (let i = 0; i < tempBundleService2.length; i++) {
                console.log("i is :", i);
                var customItemsIdData = [];
                var customPriceIdArr = [];

                for (let j = 0; j < tempBundleService2[i].itemBodyModel.itemPrices.length; j++) {



                    /* =============== Search Custom Price Using selected Item PriceDataId ============== */

                    var itemsPrice = await itemPriceDataId(tempBundleService2[i].itemBodyModel.itemPrices[j].itemPriceDataId);
                    console.log("item price is before : ", itemsPrice)

                    let itemPriceObj = {

                        customItemPriceDataId: 0,
                        quantity: parseInt(itemsPrice.quantity),
                        startUsage: itemsPrice.startUsage,
                        endUsage: itemsPrice.endUsage,
                        standardJobId: itemsPrice.standardJobId,
                        repairKitId: itemsPrice.repairKitId,
                        templateDescription: itemsPrice.templateDescription,
                        repairOption: itemsPrice.repairOption,
                        frequency: itemsPrice.frequency,
                        additional: itemsPrice.additional,
                        recommendedValue: parseInt(itemsPrice.recommendedValue),
                        partListId: itemsPrice.partListId,
                        serviceEstimateId: itemsPrice.serviceEstimateId,
                        numberOfEvents: parseInt(itemsPrice.numberOfEvents),
                        priceMethod: itemsPrice.priceMethod,
                        priceType: itemsPrice.priceType,
                        listPrice: itemsPrice.listPrice,
                        priceEscalation: itemsPrice.priceEscalation,
                        calculatedPrice: itemsPrice.calculatedPrice,
                        flatPrice: itemsPrice.flatPrice,
                        discountType: itemsPrice.discountType,
                        year: itemsPrice.year,
                        noOfYear: itemsPrice.noOfYear,
                        sparePartsPrice: itemsPrice.sparePartsPrice,
                        sparePartsPriceBreakDownPercentage: itemsPrice.sparePartsPriceBreakDownPercentage,
                        servicePrice: itemsPrice.servicePrice,
                        labourPrice: itemsPrice.labourPrice,
                        labourPriceBreakDownPercentage: itemsPrice.labourPriceBreakDownPercentage,
                        miscPrice: itemsPrice.miscPrice,
                        miscPriceBreakDownPercentage: itemsPrice.miscPriceBreakDownPercentage,
                        totalPrice: itemsPrice.totalPrice,
                        netService: itemsPrice.netService,
                        customPortfolio: {
                            portfolioId: portfolioId
                        },
                        // tenantId: itemsPrice.tenantId,
                        tenantId: loginTenantId,
                        partsRequired: itemsPrice.partsRequired,
                        labourRequired: itemsPrice.labourRequired,
                        serviceRequired: itemsPrice.serviceRequired,
                        miscRequired: itemsPrice.miscRequired
                    }

                    customItemsIdData.push(itemPriceObj)

                }


                let customItemObj = {
                    customItemId: 0,
                    itemName: tempBundleService2[i].itemName,
                    customItemHeaderModel: {
                        customItemHeaderId: 0,
                        itemHeaderDescription: tempBundleService2[i].itemHeaderModel.itemHeaderDescription,
                        bundleFlag: tempBundleService2[i].itemHeaderModel.bundleFlag,
                        portfolioItemId: currentItemId,
                        // portfolioItemId: tempBundleService2[i].itemHeaderModel.portfolioItemId,
                        reference: tempBundleService2[i].itemHeaderModel.reference,
                        itemHeaderMake: tempBundleService2[i].itemHeaderModel.itemHeaderMake,
                        itemHeaderFamily: tempBundleService2[i].itemHeaderModel.itemHeaderFamily,
                        model: tempBundleService2[i].itemHeaderModel.model,
                        prefix: tempBundleService2[i].itemHeaderModel.prefix,
                        type: tempBundleService2[i].itemHeaderModel.type,
                        additional: tempBundleService2[i].itemHeaderModel.additional,
                        currency: tempBundleService2[i].itemHeaderModel.currency,
                        netPrice: tempBundleService2[i].itemHeaderModel.netPrice,
                        itemProductHierarchy: tempBundleService2[i].itemHeaderModel.itemProductHierarchy,
                        itemHeaderGeographic: tempBundleService2[i].itemHeaderModel.itemHeaderGeographic,
                        responseTime: tempBundleService2[i].itemHeaderModel.responseTime,
                        usage: tempBundleService2[i].itemHeaderModel.usage,
                        validFrom: tempBundleService2[i].itemHeaderModel.validFrom,
                        validTo: tempBundleService2[i].itemHeaderModel.validTo,
                        estimatedTime: tempBundleService2[i].itemHeaderModel.estimatedTime,
                        servicePrice: tempBundleService2[i].itemHeaderModel.servicePrice,
                        status: tempBundleService2[i].itemHeaderModel.status,
                        componentCode: tempBundleService2[i].itemHeaderModel.componentCode,
                        componentDescription: tempBundleService2[i].itemHeaderModel.componentDescription,
                        serialNumber: tempBundleService2[i].itemHeaderModel.serialNumber,
                        itemHeaderStrategy: tempBundleService2[i].itemHeaderModel.itemHeaderStrategy,
                        variant: tempBundleService2[i].itemHeaderModel.variant,
                        itemHeaderCustomerSegment: tempBundleService2[i].itemHeaderModel.itemHeaderCustomerSegment,
                        jobCode: tempBundleService2[i].itemHeaderModel.jobCode,
                        preparedBy: tempBundleService2[i].itemHeaderModel.preparedBy,
                        approvedBy: tempBundleService2[i].itemHeaderModel.approvedBy,
                        preparedOn: tempBundleService2[i].itemHeaderModel.preparedOn,
                        revisedBy: tempBundleService2[i].itemHeaderModel.revisedBy,
                        revisedOn: tempBundleService2[i].itemHeaderModel.revisedOn,
                        salesOffice: tempBundleService2[i].itemHeaderModel.salesOffice,
                        offerValidity: tempBundleService2[i].itemHeaderModel.offerValidity
                    },
                    customItemBodyModel: {
                        customItemBodyId: 0,
                        itemBodyDescription: tempBundleService2[i].itemBodyModel.itemBodyDescription,
                        spareParts: tempBundleService2[i].itemBodyModel.spareParts,
                        labours: tempBundleService2[i].itemBodyModel.labours,
                        miscellaneous: tempBundleService2[i].itemBodyModel.miscellaneous,
                        taskType: tempBundleService2[i].itemBodyModel.taskType,
                        solutionCode: tempBundleService2[i].itemBodyModel.solutionCode,
                        usageIn: tempBundleService2[i].itemBodyModel.usageIn,
                        usage: tempBundleService2[i].itemBodyModel.usage,
                        year: tempBundleService2[i].itemBodyModel.year,
                        avgUsage: tempBundleService2[i].itemBodyModel.avgUsage,
                        unit: tempBundleService2[i].itemBodyModel.unit,
                        customItemPrices: customPriceIdArr,
                    }
                }

                const itemRes = await customItemCreation(customItemObj)

                createdNewCustomItems.push(itemRes.data)

            }
            console.log("createdNewCustomItems before : ", createdNewCustomItems)
            setTempBundleService3([...tempBundleService3, ...createdNewCustomItems]);
            // setTempBundleService3(createdNewCustomItems);
            // console.log("tempBundleService3 after : ", tempBundleService3);
            setTempBundleService1([])
        }

    }
    const handleItemPriceCalculatorSave = () => {
        setLoadingItem("02")
        setTabs("6")
        const _tempBundleItems = [...tempBundleItems]
        for (let i = 0; i < _tempBundleItems.length; i++) {
            if (currentItemId === _tempBundleItems[i].customItemId) {
                if (_tempBundleItems[i].associatedServiceOrBundle) {
                    for (let j = 0; j < _tempBundleItems[i].associatedServiceOrBundle.length; j++) {
                        console.log("tempBundleService2", tempBundleService2)
                        for (let k = 0; k < tempBundleService2.length; k++) {
                            if (_tempBundleItems[i].associatedServiceOrBundle[j].customItemId == tempBundleService3[k].customItemId) {
                                tempBundleService2.splice(k, 1)//remove object if already exist
                                break;
                            }
                        }
                    }
                    _tempBundleItems[i].associatedServiceOrBundle = [..._tempBundleItems[i].associatedServiceOrBundle, ...tempBundleService3]
                } else {
                    _tempBundleItems[i] = { ..._tempBundleItems[i], associatedServiceOrBundle: [...tempBundleService3] }
                }
            }
            setTempBundleItems(_tempBundleItems)
            setLoadingItem("22")
        }
    }
    const frequencyOptions = [
        { label: "Cyclic", value: "Cyclic" },
        { label: "once", value: "once" },
        { label: "alternate", value: "alternate" },
        { label: "Custom", value: "Custom" },
    ];
    const [yearsOption, seYearsOption] = useState([
        {
            value: "1", label: "1"
        }
    ])
    const handleComponentDataSave = async () => {
        try {
            // call put API for portfolio item to get price calculator data
            let reqObj = {}
            for (let i = 0; i < tempBundleItems.length; i++) {
                if (tempBundleItems[i].customItemId === currentItemId) {
                    // reqObj = {
                    //     itemId: tempBundleItems[i].customItemId,
                    //     standardJobId: tempBundleItems[i].customItemBodyModel.standardJobId,
                    //     repairKitId: tempBundleItems[i].customItemBodyModel.repairKitId,
                    // }
                    reqObj = {
                        itemId: tempBundleItems[i].customItemId,
                        standardJobId: itemPriceData.standardJobId,
                        repairKitId: itemPriceData.repairKitId,
                        itemPriceDataId: itemPriceData.customItemPriceDataId
                    }
                    break;
                }
            }

            if ((itemPriceData.standardJobId == "") ||
                (itemPriceData.standardJobId == null) ||
                (itemPriceData.repairKitId != "")) {
                const price_RkIdUpdate = await customPortfolioItemPriceRkId(reqObj)
            }

            if ((itemPriceData.repairKitId == "") ||
                (itemPriceData.repairKitId == null) ||
                (itemPriceData.standardJobId != "")) {
                const price_SjIdUpdate = await customPortfolioItemPriceSJID(reqObj)
            }

            const res = await getCustomItemPriceById(itemPriceData.customItemPriceDataId)
            // const itemPriceRes = await customPortfolioItemPriceRkId(reqObj)
            // setItemPriceCalculator({
            //     netParts: "11",
            //     netService: "11",
            //     priceType: "11",
            //     netPrice: itemPriceRes.customItemHeaderModel.netPrice,
            //     netAdditionals: "11",
            // })
            // console.log("res 2 : ", res2)
            console.log("res 1 : ", res)
            // setItemPriceCalculator({
            //     netParts: res.data.sparePartsPrice,
            //     netService: res.data.netService,
            //     priceType: res.data.priceType,
            //     netPrice: res.data.totalPrice,
            //     netAdditionals: res.data.listPrice,
            // });
            setItemPriceCalculator({
                netParts: res.sparePartsPrice,
                netService: res.netService,
                priceType: res.priceType,
                netPrice: res.totalPrice,
                netAdditionals: res.listPrice,
            });
            setTabs("5")


        } catch (error) {
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    const handleFlatPriceIndicator = (e) => {
        // console.log("event ", e.target.checked)

        setExtWorkData({
            ...extWorkData,
            flatRateIndicator: e.target.checked,
            adjustedPrice: e.target.checked
                ? extWorkData.adjustedPrice
                : 0.0,
        })
        setPriceCalculator({
            ...priceCalculator,
            flatPrice: 0,
        })
    }
    const handleComponentChange = async (e) => {

        try {
            setComponentData({
                ...componentData,
                [e.target.name]: e.target.value
            })
            if (e.target.name === 'componentCode') {
                const res = await getComponentCodeSuggetions(`componentCode~${e.target.value}`)
                $(`.scrollbar`).css("display", "block");
                setComponentData({
                    ...componentData,
                    [e.target.name]: e.target.value,
                    codeSuggestions: res
                })
            }
            // if (e.target.name === 'make') {
            //     const res = await getSearchQueryCoverage(`make~${e.target.value}`)
            //     $(`#scrollbarMake`).css("display", "block");
            //     setComponentData({ ...componentData, [e.target.name]: e.target.value, makeSuggestions: res })
            // }
            if (e.target.name === 'model') {
                // if (componentData.make == "") {
                //     throw "Please select make"
                // }
                // const res = await getSearchQueryCoverage(`make:\"${componentData.make}\" AND model~${e.target.value}`)
                const res = await getSearchQueryCoverage(`model~${e.target.value}`)
                $(`#scrollbarModel`).css("display", "block");
                setComponentData({ ...componentData, [e.target.name]: e.target.value, modelSuggestions: res })
            }
            if (e.target.name === 'serialNo') {
                // if(componentData.make=="" || componentData.model==""){
                //   throw "Please select make/model"
                // }
                if (componentData.model == "") {
                    throw "Please select model"
                }
                const res = await getSearchQueryCoverage(`family~${e.target.value}`)
                // const res = await getSearchQueryCoverage(`make:\"${componentData.make}\" AND model:\"${componentData.model}\" AND family~${e.target.value}`)
                $(`#scrolbarSerialNo`).css("display", "block");
                setComponentData({ ...componentData, [e.target.name]: e.target.value, serialNoSuggestions: res })
            }

        } catch (error) {
            console.log("err")
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }


    }
    const [disable, setDisable] = useState(true);
    const [componentData, setComponentData] = useState({
        componentCode: "",
        codeSuggestions: [],
        description: "",
        model: "",
        modelSuggestions: [],
        make: "",
        makeSuggestions: [],
        serialNo: "",
        serialNoSuggestions: [],
        priceMethod: "",
        priceAdditionalSelect: "",
        priceEscalationSelect: "",
        discountTypeSelect: ""
    });
    const handleModelSelect = (type, currentItem) => {
        if (type === "model") {
            setComponentData({
                ...componentData,
                model: currentItem.model,
                make: currentItem.maker,
                family: currentItem.family,
                prefix: currentItem.prefix,
            });
            setSearchModelResults([]);
        } else if (type === "equipmentNumber") {
            setComponentData({
                ...componentData,
                model: currentItem.model,
                serialNo: currentItem.equipmentNumber,
                make: currentItem.maker,
                // family: currentItem.market,
            });
            setSearchSerialResults([]);
        }
    };
    const [noOptionsSerial, setNoOptionsSerial] = useState(false);
    const [searchSerialResults, setSearchSerialResults] = useState([]);

    // Machine search based on model and serial number
    const handleMachineSearch = async (searchMachinefieldName, searchText) => {
        let searchQueryMachine = "";
        setSearchModelResults([]);
        setSearchSerialResults([]);

        if (searchMachinefieldName === "model") {
            componentData.model = searchText;
            searchQueryMachine = searchText
                ? searchMachinefieldName + "~" + searchText
                : "";
        } else if (searchMachinefieldName === "serialNo") {
            componentData.serialNo = searchText;
            searchQueryMachine = searchText
                ? componentData.model
                    ? `model:${componentData.model} AND equipmentNumber~` + searchText
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
    const [searchModelResults, setSearchModelResults] = useState([]);

    //Individual machine field value change
    const handleMachineDataChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        setComponentData({
            ...componentData,
            [name]: value,
        });
    };
    const handleComponentCodeSuggetionsClick = (e, j) => {
        $(`.scrollbar`).css("display", "none");
        let { description, componentCode } = componentData.codeSuggestions[j]
        setComponentData({ ...componentData, description, componentCode })
    }
    const [noOptionsModel, setNoOptionsModel] = useState(false);


    const [searchCoverageSerialResults, setSearchCoverageSerialResults] = useState([]);
    const [coverageSerialResultList, setCoverageSerialResultList] = useState([]);

    const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
    const [bundleItems, setBundleItems] = useState([]);
    const [coverageItems, setCoverageItems] = useState([]);
    const [showAvailableCoverage, setShowAvailableCoverage] = useState(false);
    const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");
    const [priceAgreementRows, setPriceAgreementRows] = useState([]);

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
    const [priceListKeyValue, setPriceListKeyValue] = useState([]);
    const [priceTypeKeyValue, setPriceTypeKeyValue] = useState([]);
    const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);

    const [priceListKeyValue1, setPriceListKeyValue1] = useState([]);
    const [priceMethodKeyValue1, setPriceMethodKeyValue1] = useState([]);

    const [portfolioPriceDataId, setPortfolioPriceDataId] = useState({})
    const [portfolioAdditionalPriceDataId, setPortfolioAdditionalPriceDataId] = useState({})
    const [portfolioEscalationPriceDataId, setPortfolioEscalationPriceDataId] = useState({})

    const [priceDetails, setPriceDetails] = useState({
        priceDate: new Date()
    })
    const [priceTypeKeyValue1, setPriceTypeKeyValue1] = useState([]);
    const [priceAdditionalHeadKeyValue1, setPriceAdditionalHeadKeyValue1] = useState([]);
    const [priceEscalationHeadKeyValue1, setPriceEscalationHeadKeyValue1] = useState([]);
    const [escalationPriceValue, setEscalationPriceValue] = useState()
    const [additionalPriceValue, setAdditionalPriceValue] = useState()

    const [pricePriceData, setPricePriceData] = useState("");
    const [priceCalculatedPrice, setPriceCalculatedPrice] = useState("");
    const [additionalPriceDataId, setAdditionalPriceDataId] = useState("");
    const [escalationPriceDataId, setEscalationPriceDataId] = useState("");
    const [portfolioPriceDataIdForExiting, setPortfolioPriceDataIdForExiting] = useState("");


    const [querySearchModelResult, setQuerySearchModelResult] = useState([])
    const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] = useState([])
    const [selectedPrefixOption, setSelectedPrefixOption] = useState("");
    const [includedModelIndex, setIncludedModelIndex] = useState(0);

    const [currentExpendPortfolioItemRow, setCurrentExpendPortfolioItemRow] = useState(null)
    const [editItemShow, setEditItemShow] = useState(false);
    const [passItemEditRowData, setPassItemEditRowData] = useState();

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

    const [flagTemplate, setFlagTemplate] = useState(false);
    const [flagCommerce, setFlagCommerce] = useState(false);

    const [editAbleCustomPriceData, setEditAbleCustomPriceData] = useState([]);

    const [partsRequired, setPartsRequired] = useState(true);
    const [labourRequired, setlabourRequired] = useState(true);
    const [serviceRequired, setServiceRequired] = useState(false);
    const [miscRequired, setMiscRequired] = useState(true);
    const [needOnlyParts, setNeedOnlyParts] = useState(false)

    // const [selectePortfolioTempItemsData, setSelectedPortfolioTempItemsData] = useState([]);
    const [selectedSolutionCustomItems, setSelectedSolutionCustomItems] = useState([]);
    const [selectedSolutionCustomCoverages, setSelectedSolutionCustomCoverages] = useState([]);
    const [selectedSolutionItems, setSelectedSolutionItems] = useState([]);
    const [createCopyPortfolioCoverage, setCreateCopyPortfolioCoverage] = useState([]);

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


    const [quoteDataShow, setQuoteDataShow] = useState(false)
    const [quoteData, setQuoteData] = useState({
        contact: "",
        description: "",
        reference: "",
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

    const handleClick = (event) => {
        console.log("event", event);
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [portfolioId, setPortfolioId] = useState();
    const [prefilgabelGeneral, setPrefilgabelGeneral] = useState("PORTFOLIO");
    const [priceAgreementOption, setPriceAgreementOption] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleCreate = () => {

        console.log("quote Data 1 : ", quoteData)
        setQuoteDataShow(false)
        // setQuoteData({
        //     contact: "",
        //     description: "",
        //     reference: ""
        // });
        let quotesDetails = {
            quoteId: quoteData.contact,
            type: "fetch",
        };

        history.push({
            pathname: "/SolutionServicePortfolio",
            state: quotesDetails,
        });

        console.log("quote Data 2 : ", quoteData)
        // history.push("/quoteTemplate");
    };

    const handleCreateQuote = async () => {
        // alert("hello");
        let quoteObj = {
            quoteType: "SOLUTION",
            customerId: 0,
            equipmentId: 0,
            netValue: 0,
            currency: "string",
            grossValue: 0,
            discount: 0,
            margin: 0,
            tax: 0,
            status: "string",
            validFrom: "2022-10-18",
            validTo: "2022-10-18",
            quantity: 0,
            customPortfolioModels: portfolioId ? [
                { customPortfolioId: portfolioId }
            ] : [],
            quoteBodyModel: {
                quoteBodyId: 0,
                quoteBodyDescription: "string",
                payerId: 0,
                shortText: "string",
                longText: "string",
                terms: "string",
                conditions: "string",
                contact: "string",
                serialNumber: "string",
                statusNumber: "string",
                billingType: "PAY_SUPPORT",
                promisedDeliveryDate: "2022-10-18",
                salesOpportunity: "string",
                componentSerialNumber: "string",
                versionNumber: "string",
                serviceRecipientModel: {
                    serviceRecipientId: 0,
                    serviceRecipientName: "string",
                    serviceRecipientemail: "string",
                    serviceRecipientaddress: "string"
                }
            }
        }

        console.log("Quote Object is : ", portfolioId)

        const quoteRes = await convertPortfolioToQuoteData(portfolioId);
        // console.log("quoteRes : ", quoteRes);

        // console.log("quote Response data is : ", quoteRes.data)
        setQuoteData({ ...quoteData, contact: quoteRes.data.quoteId })

        // console.log("quoteData : ", quoteData);
        setQuoteDataShow(true);
    }

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
    const [showEditIncludeSerialNoModel, setShowEditIncludeSerialNoModel] = useState(false);
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

    const handleOption2 = (e) => {
        setValue2(e);
    };
    const handleOption3 = (e) => {
        setValue3(e);
    };

    const handleQuoteInputChange = (e) => {
        const { name, value } = e.target;
        setQuoteData({
            ...quoteData,
            [name]: value,
        });
    }


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

    const UpdateSelectCoverageData = async (exitsData) => {

        const _selectedMasterData = [...selectedMasterData]
        const obj = _selectedMasterData[includedModelIndex]
        console.log("edit serial No : ", obj);

        const editCoverageData = {
            coverageId: editSerialNo?.coverageId,
            serviceId: 0,
            modelNo: editSerialNo?.modelNo,
            serialNumber: editSerialNo?.serialNo,
            startSerialNumber: editSerialNo?.startSerialNo,
            endSerialNumber: editSerialNo?.endSerialNo,
            serialNumberPrefix: editSerialNo?.serialNoPrefix,
            family: editSerialNo?.family,
            make: editSerialNo?.make,
            fleet: editSerialNo?.fleet,
            fleetSize: editSerialNo?.fleetSize,
            location: editSerialNo?.location,
            startDate: "",
            endDate: "",
            actions: "",
        }
        // console.log("e54398u891");


        const updateCustomCoverageData = await updateCustomCoverage(
            editSerialNo.coverageId,
            editCoverageData
        );

        if (updateCustomCoverageData.status === 200) {
            toast("😎 Coverage data updated successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const tempObj = {
                ...obj,
                make: updateCustomCoverageData.data.make,
                model: updateCustomCoverageData.data.modelNo,
                prefix: updateCustomCoverageData.data.serialNumberPrefix,
                family: updateCustomCoverageData.data.family,
            }
            _selectedMasterData[includedModelIndex] = tempObj
            setSelectedMasterData(_selectedMasterData)
            setShowEditIncludeSerialNoModel(false)
        }
    }


    const handleRemove = (index) => {
        var temp = priceAgreementRows.slice();
        temp.splice(index, 1);
        setPriceAgreementRows(temp);
    };

    const handleModelInputSearch = (e) => {

        setEditSerialNo({ ...editSerialNo, modelNo: e.target.value })
        var searchStr = "model~" + e.target.value;
        getSearchQueryCoverage(searchStr)
            .then((res) => {
                // console.log("search Query Result --------- :", res);
                // setMasterData(res);
                $(`.scrollbar-model`).css("display", "block");
                setQuerySearchModelResult(res)
                var preArr = [];
                for (var n = 0; n < res.length; n++) {
                    preArr.push({ label: res[n].prefix, value: res[n].prefix })
                }
                setQuerySearchModelPrefixOption(preArr);
            })
            .catch((err) => {
                console.log("error in getSearchQueryCoverage", err);
            });
    }

    const handleSearchModelListClick = (e, currentItem) => {
        console.log(currentItem)

        setEditSerialNo({
            ...editSerialNo,
            modelNo: currentItem.model,
            make: currentItem.make,
            family: currentItem.family
        })
        $(`.scrollbar-model`).css("display", "none");
    }

    const selectPrefixOption = (e) => {
        console.log(e);
        setSelectedPrefixOption(e)
        setEditSerialNo({
            ...editSerialNo,
            serialNoPrefix: e.value,
        })
    }

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

    const handlePortfolioItemSaveAndContinue = async (itemData, itemPriceData) => {
        try {

            if ((portfolioId == "") ||
                (portfolioId == undefined) ||
                (portfolioId == null)) {
                throw "Please Create Solution First, then you can Add Item";
            }

            let reqObj = {
                customItemId: 0,
                itemName: itemData.name,
                customItemHeaderModel: {
                    customItemHeaderId: 0,
                    itemHeaderDescription: itemData.description,
                    bundleFlag: "PORTFOLIO",
                    withBundleService: bundleServiceNeed,
                    portfolioItemId: 0,
                    reference: generalComponentData.externalReference,
                    itemHeaderMake: itemData?.make,
                    itemHeaderFamily: itemData?.family,
                    model: itemData.model,
                    prefix: itemData.prefix,
                    type: "MACHINE",
                    additional: "",
                    currency: "",
                    netPrice: 0,
                    itemProductHierarchy: "END_PRODUCT",
                    itemHeaderGeographic: "ONSITE",
                    responseTime: "PROACTIVE",
                    usage: "",
                    validFrom: generalComponentData.validFrom,
                    validTo: generalComponentData.validTo,
                    estimatedTime: "",
                    servicePrice: 0,
                    status: "DRAFT",
                    componentCode: "",
                    componentDescription: "",
                    serialNumber: "",
                    itemHeaderStrategy: itemData.strategyTask !== "" ? itemData.strategyTask?.value : "PREVENTIVE_MAINTENANCE",
                    variant: "",
                    itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != "" ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
                    jobCode: "",
                    preparedBy: administrative.preparedBy,
                    approvedBy: administrative.approvedBy,
                    preparedOn: administrative.preparedOn,
                    revisedBy: administrative.revisedBy,
                    revisedOn: administrative.revisedOn,
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,
                    serviceChargable: true,
                    serviceOptional: true
                },
                customItemBodyModel: {
                    customItemBodyId: 0,
                    itemBodyDescription: itemData.description,
                    spareParts: ["WITH_SPARE_PARTS"],
                    labours: ["WITH_LABOUR"],
                    miscellaneous: ["LUBRICANTS"],
                    taskType: itemData.taskType != "" ? [itemData.taskType.value] : ["PM1"],
                    solutionCode: "",
                    usageIn: itemData.usageIn != "" ? itemData.usageIn.value : "REPAIR_OR_REPLACE",
                    usage: "",
                    year: itemData.year?.value,
                    avgUsage: 0,
                    unit: itemData.unit != "" ? itemData.unit?.value : "",
                    frequency: itemData.frequency != "" ? itemData.frequency?.value : "once",
                    customItemPrices: [
                        {
                            customItemPriceDataId: itemPriceData.customItemPriceDataId
                        }
                    ]
                }
            }


            const itemRes = await customItemCreation(reqObj);

            if (itemRes.status !== 200) {
                throw "Something went wrong/Item not created"
            }

            let reqObjSJId = {
                itemId: itemRes.data.customItemId,
                standardJobId: itemPriceData.standardJobId,
                repairKitId: itemPriceData.repairKitId,
                itemPriceDataId: itemPriceData.customItemPriceDataId
            }

            if ((itemPriceData.standardJobId == "") ||
                (itemPriceData.standardJobId == null) ||
                (itemPriceData.repairKitId != "")) {
                const price_RkIdUpdate = await customPortfolioItemPriceRkId(reqObjSJId)
            }

            if ((itemPriceData.repairKitId == "") ||
                (itemPriceData.repairKitId == null) ||
                (itemPriceData.standardJobId != "")) {
                const price_SjIdUpdate = await customPortfolioItemPriceSJID(reqObjSJId)
            }

            const resPrice = await getCustomItemPriceById(itemPriceData.customItemPriceDataId)
            setPriceCalculator({
                ...priceCalculator,
                priceMethod: (resPrice.data.priceMethod != "EMPTY" ||
                    resPrice.data.priceMethod != "" ||
                    resPrice.data.priceMethod != null) ? {
                    label: resPrice.data.priceMethod,
                    value: resPrice.data.priceMethod
                } : "",
                priceType: (resPrice.data.priceType != "EMPTY" ||
                    resPrice.data.priceType != "" ||
                    resPrice.data.priceType != null) ? {
                    label: resPrice.data.priceType,
                    value: resPrice.data.priceType
                } : "",
                priceAdditionalSelect: {
                    label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
                },
                priceAdditionalInput: resPrice.data.additionalPriceValue,
                discountTypeSelect: (resPrice.data.discountType != "EMPTY" ||
                    resPrice.data.discountType != "" ||
                    resPrice.data.discountType != null) ? {
                    label: resPrice.data.discountType,
                    value: resPrice.data.discountType
                } : "",
                discountTypeInput: resPrice.data.discountValue,
                year: {
                    label: resPrice.data.year, value: resPrice.data.year
                },
                noOfYear: resPrice.data.noOfYear,
                startUsage: resPrice.data.startUsage,
                endUsage: resPrice.data.endUsage,
                recommendedValue: resPrice.data.recommendedValue,
                netPrice: resPrice.data.netService,
                totalPrice: resPrice.data.totalPrice,
                id: resPrice.data.customItemPriceDataId,
            })

            setCurrentItemId(itemRes.data.customItemId);
            // setCreatedItemsIdData([...createdItemsIdData, itemRes.data.customItemId]);
            const _generalComponentData = { ...generalComponentData };
            _generalComponentData.items?.push({ customItemId: itemRes.data.customItemId });
            var _itemArrData = [...selectedSolutionCustomItems];
            _itemArrData.push({ customItemId: itemRes.data.customItemId })
            setSelectedSolutionCustomItems(_itemArrData);



            let obj = {
                name: generalComponentData.name,
                description: generalComponentData.description,
                customerId: parseInt(customerData.customerID),
                externalReference: generalComponentData.externalReference,
                customerGroup: customerData.customerGroup,
                customerSegment: generalComponentData?.customerSegment != "" ?
                    generalComponentData?.customerSegment?.value : "",
                template: flagTemplate,
                visibleInCommerce: flagCommerce,

                validFrom: validityData.fromDate,
                validTo: validityData.toDate,

                responseTime: stratgyResponseTimeKeyValue?.value ?
                    stratgyResponseTimeKeyValue?.value : "EMPTY",
                productHierarchy: stratgyHierarchyKeyValue?.value ?
                    stratgyHierarchyKeyValue?.value : "EMPTY",
                geographic: stratgyGeographicKeyValue?.value ?
                    stratgyGeographicKeyValue?.value : "EMPTY",
                solutionType: solutionTypeListKeyValue?.value ?
                    solutionTypeListKeyValue?.value : "EMPTY",
                solutionLevel: solutionLevelListKeyValue?.value ?
                    solutionLevelListKeyValue?.value : "EMPTY",

                portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                    ? portfolioPriceDataId : null,

                customCoverages: selectedSolutionCustomCoverages,

                preparedBy: (administrative.preparedBy != null ||
                    administrative.preparedBy != "" ? administrative.preparedBy : ""),
                approvedBy: (administrative.approvedBy != null ||
                    administrative.approvedBy != "" ? administrative.approvedBy : ""),
                preparedOn: administrative.preparedOn,
                revisedBy: (administrative.revisedBy != null ||
                    administrative.revisedBy != "" ? administrative.revisedBy : ""),
                revisedOn: administrative.revisedOn,
                salesOffice: (administrative.salesOffice != null ||
                    administrative.salesOffice != "" ? administrative.salesOffice?.value : ""),
                offerValidity: (administrative.offerValidity != null ||
                    administrative.offerValidity != "" ? administrative.offerValidity?.value : ""),

                status: value2.value,
                supportLevel: value3.value,

                machineType: "NEW",
                searchTerm: "",
                lubricant: true,
                strategyTask: "PREVENTIVE_MAINTENANCE",
                taskType: "PM1",
                usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
                availability: "AVAILABILITY_GREATER_95",
                type: "MACHINE",
                application: "HILL",
                contractOrSupport: "LEVEL_I",
                lifeStageOfMachine: "NEW_BREAKIN",
                numberOfEvents: 0,
                rating: "",
                startUsage: 0,
                endUsage: 0,
                unit: "HOURS",
                additionals: "",
                customItems: _itemArrData,
            }

            if ((portfolioId !== "" || (portfolioId !== undefined))) {
                const updatePortfolioRes = await updateCustomPortfolio(
                    portfolioId,
                    obj
                );
                if (updatePortfolioRes.status === 200) {
                    toast(`👏 Solution ${generalComponentData.name} saved Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    throw `${updatePortfolioRes.status}:Something went wrong`;
                }
            }

            setGeneralComponentData(_generalComponentData);
            setTempBundleItems([...tempBundleItems, itemRes.data]);

            setOpenAddBundleItem(false);
            setOpenSearchSolution(false);

        } catch (error) {
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    }

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
                customItems: selectedSolutionCustomItems,
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

    const createNewVersion = async () => {

        try {
            if (portfolioId != undefined || portfolioId != null) {
                if (newVersionName != "") {
                    let versionObj = await getCustomPortfolio(portfolioId);
                    console.log("versionObj : ", versionObj);
                    var verNewValue;
                    if (versionObj.supportLevel == "EMPTY") {
                        verNewValue = "STANDARD";
                    } else if (versionObj.supportLevel == "STANDARD") {
                        verNewValue = "SUPERIOR";
                    } else if (versionObj.supportLevel == "SUPERIOR") {
                        verNewValue = "PREMIUM";
                    } else {
                        verNewValue = versionObj.supportLevel;
                    }
                    let createNewVersionObj = {
                        customPortfolioId: 0,
                        name: newVersionName,
                        description: versionObj.description,
                        machineType: versionObj.machineType,
                        searchTerm: versionObj.searchTerm,
                        lubricant: versionObj.lubricant,
                        customerId: versionObj.customerId,
                        customerGroup: versionObj.customerGroup,
                        customerSegment: versionObj.customerSegment,
                        externalReference: versionObj.externalReference,
                        status: versionObj.status,
                        validFrom: versionObj.validFrom,
                        validTo: versionObj.validTo,
                        strategyTask: versionObj.strategyTask,
                        taskType: versionObj.taskType,
                        usageCategory: versionObj.usageCategory,
                        productHierarchy: versionObj.productHierarchy,
                        geographic: versionObj.geographic,
                        solutionType: versionObj.solutionType,
                        solutionLevel: versionObj.solutionLevel,
                        availability: versionObj.availability,
                        responseTime: versionObj.responseTime,
                        type: versionObj.type,
                        application: versionObj.application,
                        contractOrSupport: versionObj.contractOrSupport,
                        lifeStageOfMachine: versionObj.lifeStageOfMachine,
                        supportLevel: verNewValue,
                        numberOfEvents: versionObj.numberOfEvents,
                        itemRelations: versionObj.itemRelations,
                        rating: versionObj.rating,
                        startUsage: versionObj.startUsage,
                        endUsage: versionObj.endUsage,
                        unit: versionObj.unit,
                        additionals: versionObj.additionals,
                        preparedBy: versionObj.preparedBy,
                        approvedBy: versionObj.approvedBy,
                        preparedOn: versionObj.preparedOn,
                        revisedBy: versionObj.revisedBy,
                        revisedOn: versionObj.revisedOn,
                        salesOffice: versionObj.salesOffice,
                        offerValidity: versionObj.offerValidity,
                        customItems: versionObj.customItems,
                        customCoverages: versionObj.customCoverages,
                        portfolioPrice: versionObj.portfolioPrice,
                        additionalPrice: versionObj.additionalPrice,
                        escalationPrice: versionObj.escalationPrice,
                        saveState: versionObj.saveState,
                        userId: versionObj.userId,
                        template: versionObj.template,
                        visibleInCommerce: versionObj.visibleInCommerce
                    }

                    const portfolioRes = await createCustomPortfolio(createNewVersionObj);
                    if (portfolioRes.status === 200) {
                        toast("👏 New Version Created", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setVersionPopup(false)
                        // $('#versionpopup').modal('hide');
                    }



                } else {
                    throw "Please Crate a New Version Portfolio Name First";

                }
            } else {
                throw "Create Portfolio First";
            }
        } catch (error) {
            console.log("somehing went wrong:", error);
            // toast("😐" + "Create Portfolio First", {
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // setVersionPopup(false)
            return;
        }
        // if (portfolioId != undefined || portfolioId != null) {
        console.log("my portfolioId : ", portfolioId);
        // }
    }

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
                    customItems: selectedSolutionCustomItems,
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

    const handleServiceItemEdit = async (e, row) => {
        // setOpenAddBundleItem(true);
        // console.log("handleServiceItemEdit", row);
        console.log("row ------ : ", row);
        const editAbleRow = await getCustomItemDataById(row.customItemId);
        if (editAbleRow.status === 200) {
            setEditItemShow(true);
            setPassItemEditRowData({ ...editAbleRow.data, _itemId: editAbleRow.data.customItemId });
        } else {
            toast("😐" + "Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        console.log("EditAbleRow : ---- ", editAbleRow);
        // console.log("row ---- : ", row)

    };

    const handleItemEditSave = async (addPortFolioItem, editAbleItemPriceData, compoFlagData) => {
        console.log("addPortFolioItem ", addPortFolioItem)
        setAddportFolioItem(addPortFolioItem)
        console.log("editAbleItemPriceData ------4234343 ", editAbleItemPriceData)
        try {

            if (compoFlagData == "BUNDLE_ITEM" || compoFlagData == "SERVICE") {

                if ((editAbleItemPriceData?.customItemPriceDataId != "") ||
                    (editAbleItemPriceData?.customItemPriceDataId != undefined)) {

                    const priceUpdateData = {
                        customItemPriceDataId: editAbleItemPriceData.customItemPriceDataId,
                        quantity: 0,
                        standardJobId: addPortFolioItem.templateId,
                        repairKitId: addPortFolioItem.repairOption,
                        templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
                        repairOption: editAbleItemPriceData.repairOption,
                        additional: editAbleItemPriceData.additional,
                        partListId: editAbleItemPriceData.partListId,
                        serviceEstimateId: editAbleItemPriceData.serviceEstimateId,
                        numberOfEvents: 0,
                        priceMethod: editAbleItemPriceData.priceMethod,
                        priceType: editAbleItemPriceData.priceType,
                        listPrice: editAbleItemPriceData.listPrice,
                        priceEscalation: editAbleItemPriceData.priceEscalation,
                        calculatedPrice: 0,
                        flatPrice: 0,
                        year: addPortFolioItem?.year?.value,
                        noOfYear: addPortFolioItem?.noOfYear,
                        sparePartsPrice: 0,
                        sparePartsPriceBreakDownPercentage: 0,
                        servicePrice: 0,
                        labourPrice: 0,
                        labourPriceBreakDownPercentage: 0,
                        miscPrice: 0,
                        miscPriceBreakDownPercentage: 0,
                        totalPrice: 0,
                        netService: 0,
                        additionalPriceType: editAbleItemPriceData.additionalPriceType,
                        additionalPriceValue: editAbleItemPriceData.additionalPriceValue,
                        discountType: editAbleItemPriceData.discountType,
                        discountValue: editAbleItemPriceData.discountValue,
                        recommendedValue: addPortFolioItem?.recommendedValue,
                        startUsage: addPortFolioItem?.startUsage,
                        endUsage: addPortFolioItem?.endUsage,
                        sparePartsEscalation: 0,
                        labourEscalation: 0,
                        miscEscalation: 0,
                        serviceEscalation: 0,
                        withBundleService: bundleServiceNeed,
                        customPortfolio: {
                            portfolioId: portfolioId
                        },
                        tenantId: loginTenantId,
                        partsRequired: true,
                        labourRequired: true,
                        serviceRequired: false,
                        miscRequired: true,
                        inclusionExclusion: true
                    }

                    const updatePriceId = await updateCustomPriceData(
                        editAbleItemPriceData.customItemPriceDataId,
                        priceUpdateData
                    );
                    setItemPriceData(updatePriceId.data)

                }

                let reqObj = {
                    customItemId: parseInt(addPortFolioItem.id),
                    itemName: addPortFolioItem.name,
                    customItemHeaderModel: {
                        customItemHeaderId: 0,
                        itemHeaderDescription: addPortFolioItem.description,
                        bundleFlag: compoFlagData,
                        withBundleService: false,
                        portfolioItemId: bundleServicePortfolioItemId,
                        reference: createServiceOrBundle?.reference ? createServiceOrBundle?.reference : "",
                        itemHeaderMake: createServiceOrBundle?.make ? createServiceOrBundle?.make : "",
                        itemHeaderFamily: createServiceOrBundle?.family ? createServiceOrBundle?.family : "",
                        model: createServiceOrBundle?.model ? createServiceOrBundle?.model : "",
                        prefix: createServiceOrBundle?.prefix?.value ? createServiceOrBundle?.prefix?.value : "",
                        type: "MACHINE",
                        additional: createServiceOrBundle?.additional?.value ? createServiceOrBundle?.additional?.value : "",
                        currency: "",
                        netPrice: "",
                        itemProductHierarchy: compoFlagData == "BUNDLE" ? "END_PRODUCT" : "EMPTY",
                        itemHeaderGeographic: compoFlagData == "BUNDLE" ? "ONSITE" : "EMPTY",
                        responseTime: compoFlagData == "BUNDLE" ? "PROACTIVE" : "EMPTY",
                        usage: "",
                        validFrom: validityData?.fromDate ? validityData?.fromDate : "",
                        validTo: validityData?.toDate ? validityData?.toDate : "",
                        estimatedTime: "",
                        servicePrice: 0,
                        status: "DRAFT",
                        componentCode: componentData.componentCode != "" ? componentData.componentCode : "",
                        componentDescription: componentData.description != "" ? componentData.description : "",
                        serialNumber: componentData.serialNo != "" ? componentData.serialNo : "",
                        itemHeaderStrategy: compoFlagData == "BUNDLE" ? "PREVENTIVE_MAINTENANCE" : "EMPTY",
                        variant: "",
                        itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
                            ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
                        jobCode: "",
                        preparedBy: bundleOrServiceAdministrative.preparedBy,
                        approvedBy: bundleOrServiceAdministrative.approvedBy,
                        preparedOn: bundleOrServiceAdministrative.preparedOn,
                        revisedBy: bundleOrServiceAdministrative.revisedBy,
                        revisedOn: bundleOrServiceAdministrative.revisedOn,
                        salesOffice: bundleOrServiceAdministrative.salesOffice,
                        offerValidity: bundleOrServiceAdministrative.offerValidity,
                        serviceChargable: false,
                        serviceOptional: false
                    },
                    customItemBodyModel: {
                        customItemBodyId: 0,
                        itemBodyDescription: addPortFolioItem.description,
                        spareParts: ["WITH_SPARE_PARTS"],
                        labours: ["WITH_LABOUR"],
                        miscellaneous: ["LUBRICANTS"],
                        taskType: (compoFlagData == "BUNDLE" && addPortFolioItem.taskType != "") ? [addPortFolioItem.taskType.value] : ["EMPTY"],
                        solutionCode: "",
                        usageIn: (compoFlagData == "BUNDLE" && addPortFolioItem.usageIn != "") ? addPortFolioItem.usageIn.value : "",
                        usage: "",
                        year: addPortFolioItem.year != "" ? addPortFolioItem.year?.value : "",
                        avgUsage: 0,
                        unit: addPortFolioItem.unit != "" ? addPortFolioItem.unit?.value : "",
                        frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
                        customItemPrices: (editAbleItemPriceData?.customItemPriceDataId == "" ||
                            editAbleItemPriceData.customItemPriceDataId == undefined) ? [] : [
                            {
                                customItemPriceDataId: editAbleItemPriceData.customItemPriceDataId
                            }
                        ]
                    }
                }

                console.log("reqObj is : ", reqObj);
                const itemUpdateRes = await updateCustomItemData(
                    addPortFolioItem.id,
                    reqObj
                );

                if (itemUpdateRes.status === 200) {
                    toast(`😎 ${(compoFlagData == "BUNDLE_ITEM") ?
                        "Bundle" : (compoFlagData == "SERVICE") ?
                            "Service" : ""} Item ${addPortFolioItem.name} updated successfully`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setUpdatedServiceBundleItemData(itemUpdateRes.data);
                    setBundleTabs("bundleServicePriceCalculator")
                    // setAssociatedServiceOrBundleIndex
                }

            } else {
                if ((editAbleItemPriceData?.customItemPriceDataId != "") ||
                    (editAbleItemPriceData?.customItemPriceDataId != undefined)) {

                    const priceUpdateData = {
                        customItemPriceDataId: editAbleItemPriceData.customItemPriceDataId,
                        quantity: 0,
                        standardJobId: addPortFolioItem.templateId,
                        repairKitId: addPortFolioItem.repairOption,
                        templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
                        repairOption: editAbleItemPriceData.repairOption,
                        additional: editAbleItemPriceData.additional,
                        partListId: editAbleItemPriceData.partListId,
                        serviceEstimateId: editAbleItemPriceData.serviceEstimateId,
                        numberOfEvents: 0,
                        priceMethod: editAbleItemPriceData.priceMethod,
                        priceType: editAbleItemPriceData.priceType,
                        listPrice: editAbleItemPriceData.listPrice,
                        priceEscalation: editAbleItemPriceData.priceEscalation,
                        calculatedPrice: 0,
                        flatPrice: 0,
                        year: addPortFolioItem?.year?.value,
                        noOfYear: addPortFolioItem?.noOfYear,
                        sparePartsPrice: 0,
                        sparePartsPriceBreakDownPercentage: 0,
                        servicePrice: 0,
                        labourPrice: 0,
                        labourPriceBreakDownPercentage: 0,
                        miscPrice: 0,
                        miscPriceBreakDownPercentage: 0,
                        totalPrice: 0,
                        netService: 0,
                        additionalPriceType: editAbleItemPriceData.additionalPriceType,
                        additionalPriceValue: editAbleItemPriceData.additionalPriceValue,
                        discountType: editAbleItemPriceData.discountType,
                        discountValue: editAbleItemPriceData.discountValue,
                        recommendedValue: addPortFolioItem?.recommendedValue,
                        startUsage: addPortFolioItem?.startUsage,
                        endUsage: addPortFolioItem?.endUsage,
                        sparePartsEscalation: 0,
                        labourEscalation: 0,
                        miscEscalation: 0,
                        serviceEscalation: 0,
                        withBundleService: bundleServiceNeed,
                        customPortfolio: {
                            portfolioId: portfolioId
                        },
                        tenantId: loginTenantId,
                        partsRequired: true,
                        labourRequired: true,
                        serviceRequired: false,
                        miscRequired: true,
                        inclusionExclusion: true
                    }

                    const updatePriceId = await updateCustomPriceData(
                        editAbleItemPriceData.customItemPriceDataId,
                        priceUpdateData
                    );
                    setItemPriceData(updatePriceId.data)

                }

                let reqObj = {
                    customItemId: parseInt(addPortFolioItem.id),
                    itemName: addPortFolioItem.name,
                    customItemHeaderModel: {
                        customItemHeaderId: 0,
                        itemHeaderDescription: addPortFolioItem.description,
                        bundleFlag: compoFlagData,
                        withBundleService: bundleServiceNeed,
                        portfolioItemId: bundleServicePortfolioItemId,
                        reference: createServiceOrBundle?.reference ? createServiceOrBundle?.reference : "",
                        itemHeaderMake: createServiceOrBundle?.make ? createServiceOrBundle?.make : "",
                        itemHeaderFamily: createServiceOrBundle?.family ? createServiceOrBundle?.family : "",
                        model: createServiceOrBundle?.model ? createServiceOrBundle?.model : "",
                        prefix: createServiceOrBundle?.prefix?.value ? createServiceOrBundle?.prefix?.value : "",
                        type: "MACHINE",
                        additional: createServiceOrBundle?.additional?.value ? createServiceOrBundle?.additional?.value : "",
                        currency: "",
                        netPrice: "",
                        itemProductHierarchy: "END_PRODUCT",
                        itemHeaderGeographic: "ONSITE",
                        responseTime: "PROACTIVE",
                        usage: "",
                        validFrom: validityData?.fromDate ? validityData?.fromDate : "",
                        validTo: validityData?.toDate ? validityData?.toDate : "",
                        estimatedTime: "",
                        servicePrice: 0,
                        status: "DRAFT",
                        componentCode: componentData.componentCode != "" ? componentData.componentCode : "",
                        componentDescription: componentData.description != "" ? componentData.description : "",
                        serialNumber: componentData.serialNo != "" ? componentData.serialNo : "",
                        itemHeaderStrategy: (addPortFolioItem.strategyTask != "") ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
                        variant: "",
                        itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
                            ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
                        jobCode: "",
                        preparedBy: bundleOrServiceAdministrative.preparedBy,
                        approvedBy: bundleOrServiceAdministrative.approvedBy,
                        preparedOn: bundleOrServiceAdministrative.preparedOn,
                        revisedBy: bundleOrServiceAdministrative.revisedBy,
                        revisedOn: bundleOrServiceAdministrative.revisedOn,
                        salesOffice: bundleOrServiceAdministrative.salesOffice,
                        offerValidity: bundleOrServiceAdministrative.offerValidity,
                        serviceChargable: false,
                        serviceOptional: false
                    },
                    customItemBodyModel: {
                        customItemBodyId: 0,
                        itemBodyDescription: addPortFolioItem.description,
                        spareParts: ["WITH_SPARE_PARTS"],
                        labours: ["WITH_LABOUR"],
                        miscellaneous: ["LUBRICANTS"],
                        taskType: (addPortFolioItem.taskType != "") ? [addPortFolioItem.taskType.value] : ["EMPTY"],
                        solutionCode: "",
                        usageIn: (addPortFolioItem.usageIn != "") ? addPortFolioItem.usageIn.value : "",
                        usage: "",
                        year: addPortFolioItem.year != "" ? addPortFolioItem.year?.value : "",
                        avgUsage: 0,
                        unit: addPortFolioItem.unit != "" ? addPortFolioItem.unit?.value : "",
                        frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
                        customItemPrices: (editAbleItemPriceData?.customItemPriceDataId == "" ||
                            editAbleItemPriceData.customItemPriceDataId == undefined) ? [] : [
                            {
                                customItemPriceDataId: editAbleItemPriceData.customItemPriceDataId
                            }
                        ]
                    }
                }

                console.log("reqObj is : ", reqObj);
                const itemUpdateRes = await updateCustomItemData(
                    addPortFolioItem.id,
                    reqObj
                );

                var updateItemDataArr = [];
                setCurrentItemId(itemUpdateRes.data.customItemId)
                updateItemDataArr.push(itemUpdateRes.data)

                const _tempBundleItems = [...tempBundleItems]
                console.log("_tempBundleItems 2574 : ", _tempBundleItems)
                for (let i = 0; i < _tempBundleItems.length; i++) {
                    if (itemUpdateRes.data.customItemId === _tempBundleItems[i].customItemId) {
                        // if (_tempBundleItems[i].associatedServiceOrBundle) {
                        //   for (let j = 0; j < _tempBundleItems[i].associatedServiceOrBundle.length; j++) {
                        //     console.log("tempBundleService2", tempBundleService2)
                        //     for (let k = 0; k < tempBundleService2.length; k++) {
                        //       if (_tempBundleItems[i].associatedServiceOrBundle[j].customItemId == tempBundleService3[k].customItemId) {
                        //         tempBundleService2.splice(k, 1)//remove object if already exist
                        //         break;
                        //       }
                        //     }
                        //   }
                        //   _tempBundleItems[i].associatedServiceOrBundle = [..._tempBundleItems[i].associatedServiceOrBundle, ...tempBundleService3]
                        // } else {
                        _tempBundleItems[i] = { ...itemUpdateRes.data, associatedServiceOrBundle: [...tempBundleService3] }
                        // }
                    }
                    setTempBundleItems(_tempBundleItems)
                    // setLoadingItem("22")
                }

                if (itemUpdateRes.status === 200) {
                    toast(`😎 Item ${addPortFolioItem.name} updated successfully`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    if (bundleServiceNeed) {
                        setTabs("4");
                    } else {
                        setTabs("2");
                    }
                    console.log("itemUpdateRes is  : ", itemUpdateRes);
                    // setTempBundleItems([itemUpdateRes.data]);
                    // setTempBundleItems([...tempBundleItems, itemUpdateRes.data]);
                    setCurrentItemId(addPortFolioItem.id)
                }

                if (!bundleServiceNeed) {
                    const _bundleItems = [...bundleItems];
                    // to check if itemEdit or bundle/service edit
                    if (!(editItemShow && passItemEditRowData._bundleId)) {
                        for (let i = 0; i < _bundleItems.length; i++) {
                            if (_bundleItems[i].customItemId == passItemEditRowData._itemId) {
                                let obj = {
                                    ...data,
                                    associatedServiceOrBundle:
                                        _bundleItems[i].associatedServiceOrBundle,
                                };
                                _bundleItems[i] = obj;
                                break;
                            }
                        }
                        setBundleItems(_bundleItems);
                    } else {
                        for (let i = 0; i < _bundleItems.length; i++) {
                            if (_bundleItems[i].customItemId == passItemEditRowData._itemId) {
                                for (
                                    let j = 0;
                                    j < _bundleItems[i].associatedServiceOrBundle.length;
                                    j++
                                ) {
                                    if (
                                        _bundleItems[i].associatedServiceOrBundle[j].customItemId ==
                                        passItemEditRowData._bundleId
                                    ) {
                                        _bundleItems[i].associatedServiceOrBundle[j] = data;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        setBundleItems(_bundleItems);
                    }
                }
            }
        } catch (error) {
            console.log("err in handleItemEditSave", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    };


    const handleServiceItemDelete = async (e, row) => {
        try {
            console.log("row data ---- : ", row)
            const delRes = await deleteCustomItem(row.customItemBodyModel.customItemPrices.customItemPriceDataId);
            if (delRes.status == 200) {
                toast("😎 Item Deletion Successfull", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                const _bundleItems = [...bundleItems];
                const updated = _bundleItems.filter((currentItem) => {
                    if (currentItem.id !== row.id) {
                        return currentItem;
                    }
                });
                setBundleItems(updated);
                setServiceOrBundlePrefix("");
            }
        } catch (error) {
            console.log("error", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // toast("😐" + "Something went wrong !!", {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
    };


    const handleServiceItemSave = (e, row) => {
        alert("save");
    };

    const saveEditServiceOrBundleAdministrativeData = () => {
        // toast("😎" + `Service ${createServiceOrBundle.name} updated successfully`, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        setBundleServiceShow(false);
        setBundleTabs("bundleServiceHeader");
        setAddportFolioItem({})
    }
    const getFormattedDateTimeByTimeStamp = (timeStamp) => {

        var date = new Date(timeStamp);
        var year = date.getFullYear();
        // var m = date.getMonth() + 1;
        var m = date.getMonth();
        // var month = m < 10 ? '0' + m : m;
        var month = m;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var format = "AM";
        var hour = date.getHours();
        var minutes = date.getMinutes();

        var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (hour > 11) {
            format = "PM";
        }
        if (hour > 12) {
            hour = hour - 12;
        } else if (hour === 0) {
            hour = 12;
        }

        if (hour < 10) {
            hour = "0" + hour;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        // var finalDateString = day + "-" + month + "-" + year + " " + hour + ":" + minutes + " " + format;
        var finalDateString = year + "-" + month + "-" + day;
        return finalDateString;
    }
    const [itemPriceData, setItemPriceData] = useState({});
    const getPriceCalculatorDataFun = (data) => {
        setPriceCalculator(data);
        handleSavePrices()
    };
    const handleSelectCustomerSegment = (e) => {
        // console.log("e is : ", e)

        setSelectedCustomerSegmentOption(e)
        setCreateServiceOrBundle({
            ...createServiceOrBundle,
            customerSegment: e,
        });
    }

    const handleBundleServiceInputSearch = (e) => {
        setCreateServiceOrBundle({ ...createServiceOrBundle, [e.target.name]: e.target.value, });
        var searchStr = "model~" + e.target.value;
        getSearchQueryCoverage(searchStr)
            .then((res) => {
                $(`.scrollbar-model`).css("display", "block");
                setBundleServiceQuerySearchModelResult(res)

                var preArr = [];
                for (var n = 0; n < res.length; n++) {
                    preArr.push({ label: res[n].prefix, value: res[n].prefix })
                }
                setBundleServiceQuerySearchModelPrefixOption(preArr);

            })
            .catch((err) => {
                console.log("error in getSearchQueryCoverage", err);
            });
    }
    const selectBundleServicePrefixOption = (e) => {
        setSelectedPrefixOption(e)
        setCreateServiceOrBundle({
            ...createServiceOrBundle,
            prefix: e,
        })
    }
    const handleBundleServiceModelListClick = (e, currentItem) => {
        setCreateServiceOrBundle({
            ...createServiceOrBundle,
            model: currentItem.model,
            make: currentItem.make,
            family: currentItem.family
        })
        $(`.scrollbar-model`).css("display", "none");
    }
    const handleSavePrices = async () => {
        console.log("addPortFolioItem ", addPortFolioItem)
        try {
            if (serviceOrBundlePrefix === "PORTFOLIO") {

                let reqObj = {
                    itemId: parseInt(addPortFolioItem.id),
                    itemName: "",
                    itemHeaderModel: {
                        itemHeaderId: 0,
                        // itemHeaderId: parseInt(generalComponentData.portfolioId),
                        itemHeaderDescription: createServiceOrBundle.description,
                        bundleFlag:
                            serviceOrBundlePrefix === ""
                                ? "PORTFOLIO"
                                : serviceOrBundlePrefix === "SERVICE"
                                    ? "SERVICE"
                                    : "BUNDLE_ITEM",
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
                        numberOfEvents: parseInt(addPortFolioItem.numberOfEvents),
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
                const { data, status } = await updateCustomItemData(currentItemId, reqObj);
            }

        } catch (error) {
            console.log("error in handleSavePrices", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    };

    const [currentItemId, setCurrentItemId] = useState();
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
        try {
            if (e.target.id == "general") {

                if ((generalComponentData.name === "") ||
                    (generalComponentData.name == null)) {
                    throw "Solution code is a required field, you can’t leave it blank";
                }

                if ((generalComponentData.description === "") ||
                    (generalComponentData.description === null)) {
                    throw "Solution description is a required field, you can’t leave it blank";
                }

                if ((generalComponentData.externalReference === "") ||
                    (generalComponentData.externalReference === null)) {
                    throw "Reference is a required field, you can’t leave it blank";
                }
                // if (
                //     generalComponentData.name === "" ||
                //     generalComponentData.name == null ||
                //     generalComponentData.externalReference === "" ||
                //     generalComponentData.externalReference === null
                // ) {
                //     throw "Please fill required field properly";
                // }

                // Old Todo if Error Occurred

                // let reqData = {
                //     type: prefilgabelGeneral,
                //     name: generalComponentData.name,
                //     description: generalComponentData.description,
                //     externalReference: generalComponentData.externalReference,

                //     strategyTask: "PREVENTIVE_MAINTENANCE",
                //     taskType: "PM1",
                //     usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
                //     productHierarchy: "END_PRODUCT",
                //     geographic: "ONSITE",
                //     availability: "AVAILABILITY_GREATER_95",
                //     responseTime: "PROACTIVE",
                //     type: "MACHINE",
                //     application: "HILL",
                //     contractOrSupport: "LEVEL_I",
                //     lifeStageOfMachine: "NEW_BREAKIN",
                //     // supportLevel: "PREMIUM",
                //     supportLevel: value3.value,
                //     serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",


                //     visibleInCommerce: true,
                //     customerId: 0,
                //     lubricant: true,
                //     customerSegment: generalComponentData.customerSegment?.value
                //         ? generalComponentData.customerSegment?.value
                //         : "EMPTY",
                //     machineType: generalComponentData.machineType
                //         ? generalComponentData.machineType
                //         : "EMPTY",
                //     status: generalComponentData.status
                //         ? generalComponentData.status
                //         : "EMPTY",
                //     // strategyTask: generalComponentData.strategyTask
                //     //     ? generalComponentData.strategyTask
                //     //     : "EMPTY",
                //     // taskType: generalComponentData.taskType
                //     //     ? generalComponentData.taskType
                //     //     : "EMPTY",
                //     usageCategory: generalComponentData.usageCategory
                //         ? generalComponentData.usageCategory
                //         : "EMPTY",
                //     // productHierarchy: generalComponentData.productHierarchy
                //     //     ? generalComponentData.productHierarchy
                //     //     : "EMPTY",
                //     // geographic: generalComponentData.geographic
                //     //     ? generalComponentData.geographic
                //     //     : "EMPTY",
                //     availability: generalComponentData.availability
                //         ? generalComponentData.availability
                //         : "EMPTY",
                //     // responseTime: generalComponentData.responseTime
                //     //     ? generalComponentData.responseTime
                //     //     : "EMPTY",
                //     type: generalComponentData.type ? generalComponentData.type : "EMPTY",
                //     application: generalComponentData.application
                //         ? generalComponentData.application
                //         : "EMPTY",
                //     contractOrSupport: generalComponentData.contractOrSupport
                //         ? generalComponentData.contractOrSupport
                //         : "EMPTY",
                //     lifeStageOfMachine: generalComponentData.lifeStageOfMachine
                //         ? generalComponentData.lifeStageOfMachine
                //         : "EMPTY",
                //     supportLevel: generalComponentData.supportLevel
                //         ? generalComponentData.supportLevel
                //         : "EMPTY",

                //     customCoverages: [],
                //     customerGroup: generalComponentData.customerGroup
                //         ? generalComponentData.customerGroup
                //         : "EMPTY",
                //     searchTerm: "EMPTY",
                //     supportLevel: "EMPTY",
                //     portfolioPrice: {},
                //     additionalPrice: {},
                //     escalationPrice: {},

                //     // usageCategory: categoryUsageKeyValue1.value,
                //     // taskType: stratgyTaskTypeKeyValue.value,
                //     // strategyTask: stratgyTaskUsageKeyValue.value,
                //     // responseTime: stratgyResponseTimeKeyValue.value,
                //     // productHierarchy: stratgyHierarchyKeyValue.value,
                //     // geographic: stratgyGeographicKeyValue.value,
                //     customItems: selectedSolutionCustomItems,

                //     template: flagTemplate,
                //     visibleInCommerce: flagCommerce,

                // };

                // New Todo without Error
                let reqData = {
                    name: generalComponentData.name,
                    description: generalComponentData.description,
                    externalReference: generalComponentData.externalReference,
                    customerSegment: generalComponentData.customerSegment?.value ?
                        generalComponentData.customerSegment?.value : "Customer Segment",
                    template: flagTemplate,
                    visibleInCommerce: flagCommerce,

                    validFrom: validityData.fromDate,
                    validTo: validityData.toDate,

                    responseTime: stratgyResponseTimeKeyValue?.value ?
                        stratgyResponseTimeKeyValue?.value : "PROACTIVE",
                    productHierarchy: stratgyHierarchyKeyValue?.value ?
                        stratgyHierarchyKeyValue?.value : "END_PRODUCT",
                    geographic: stratgyGeographicKeyValue?.value ?
                        stratgyGeographicKeyValue?.value : "ONSITE",
                    solutionType: solutionTypeListKeyValue?.value ?
                        solutionTypeListKeyValue?.value : "CONTRACT",
                    solutionLevel: solutionLevelListKeyValue?.value ?
                        solutionLevelListKeyValue?.value : "LEVEL_I",

                    preparedBy: administrative.preparedBy,
                    approvedBy: administrative.approvedBy,
                    preparedOn: administrative.preparedOn,
                    revisedBy: administrative.revisedBy,
                    revisedOn: administrative.revisedOn,
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,

                    supportLevel: value3.value,
                    status: value2.value,

                    customItems: selectedSolutionCustomItems,
                    // customCoverages: [],
                    customCoverages: selectedSolutionCustomCoverages,

                    machineType: "NEW",
                    searchTerm: "",
                    lubricant: true,
                    customerId: 0,
                    customerGroup: "",
                    strategyTask: "PREVENTIVE_MAINTENANCE",
                    taskType: "PM1",
                    usageCategory: "ROUTINE_MAINTENANCE_OR_TASK",
                    availability: "AVAILABILITY_GREATER_95",
                    type: "MACHINE",
                    application: "HILL",
                    contractOrSupport: "LEVEL_I",
                    lifeStageOfMachine: "NEW_BREAKIN",
                    numberOfEvents: 0,
                    rating: "",
                    startUsage: 0,
                    endUsage: 0,
                    unit: "HOURS",
                    additionals: "",

                    portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                        ? portfolioPriceDataId : null,
                    additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                        ? portfolioAdditionalPriceDataId : null,
                    escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                        ? portfolioEscalationPriceDataId : null,
                }

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

                var portfolioRes = await updateCustomPortfolio(
                    portfolioId,
                    reqData
                )

                if (portfolioRes.status === 200) {
                    toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setValue("validity");
                    setGeneralComponentData({
                        ...generalComponentData,
                        portfolioId: portfolioRes.data.customPortfolioId,
                    });
                    setPortfolioId(portfolioRes.data.customPortfolioId);
                } else {
                    throw `Error in portfolio update`;
                }
            } else if (e.target.id == "validity") {
                let reqData;
                if (
                    validityData.fromInput &&
                    validityData.toInput &&
                    validityData.inputFlag
                ) {
                    reqData = {
                        validFrom: validityData.fromInput + validityData.from,
                        validTo: validityData.toInput + validityData.from,
                    };
                } else if (
                    validityData.fromDate &&
                    validityData.toDate &&
                    validityData.dateFlag
                ) {
                    reqData = {
                        validFrom: validityData.fromDate.toISOString().substring(0, 10),
                        validTo: validityData.toDate.toISOString().substring(0, 10),
                    };
                } else {
                    throw "Please fill date fields";
                }
                setValue("strategy");
                // if (validityData.fromDate && validityData.toDate) {
                //     reqData = {
                //         validFrom: validityData.fromDate.toISOString().substring(0, 10),
                //         validTo: validityData.toDate.toISOString().substring(0, 10),
                //     };
                // } else if (validityData.fromInput && validityData.toInput) {
                //     reqData = {
                //         validFrom: validityData.fromInput + validityData.from,
                //         validTo: validityData.toInput + validityData.from,
                //     };
                // }
                setGeneralComponentData({
                    ...generalComponentData,
                    ...reqData,
                });
                // console.log("validityData Data => ", validityData)
            } else if (e.target.id == "strategy") {

                if ((solutionTypeListKeyValue.value === "") ||
                    (solutionTypeListKeyValue.value === undefined)) {
                    throw "Solution Type is a required field, you can’t leave it blank";
                }

                setGeneralComponentData({
                    ...generalComponentData,
                    usageCategory: categoryUsageKeyValue1.value,
                    taskType: stratgyTaskTypeKeyValue.value,
                    strategyTask: stratgyTaskUsageKeyValue.value,
                    optionals: stratgyOptionalsKeyValue.value,
                    responseTime: stratgyResponseTimeKeyValue.value,
                    productHierarchy: stratgyHierarchyKeyValue.value,
                    geographic: stratgyGeographicKeyValue.value,
                    solutionType: solutionTypeListKeyValue.value,
                    solutionLevel: solutionLevelListKeyValue.value,
                });

                const { portfolioId, ...res } = generalComponentData;

                let obj = {
                    ...res,
                    visibleInCommerce: true,

                    customerId: 0,
                    lubricant: true,
                    customerSegment: generalComponentData.customerSegment.value
                        ? generalComponentData.customerSegment.value
                        : "Customer Segment",



                    supportLevel: value3.value,
                    status: value2.value,

                    customItems: selectedSolutionCustomItems,
                    customCoverages: selectedSolutionCustomCoverages,

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

                    type: generalComponentData.type ? generalComponentData.type : "MACHINE",
                    application: generalComponentData.application
                        ? generalComponentData.application
                        : "EMPTY",
                    contractOrSupport: generalComponentData.contractOrSupport
                        ? generalComponentData.contractOrSupport
                        : "EMPTY",
                    machineType: machineTypeKeyValue.value,
                    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,

                    customerGroup: generalComponentData.customerGroup
                        ? generalComponentData.customerGroup
                        : "EMPTY",
                    searchTerm: "EMPTY",

                    portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                        ? portfolioPriceDataId : null,
                    additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                        ? portfolioAdditionalPriceDataId : null,
                    escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                        ? portfolioEscalationPriceDataId : null,

                    solutionType: solutionTypeListKeyValue.value ?
                        solutionTypeListKeyValue.value : "EMPTY",
                    solutionLevel: solutionLevelListKeyValue.value ?
                        solutionLevelListKeyValue.value : "EMPTY",

                    usageCategory: categoryUsageKeyValue1.value,
                    taskType: stratgyTaskTypeKeyValue.value,
                    strategyTask: stratgyTaskUsageKeyValue.value,
                    responseTime: stratgyResponseTimeKeyValue.value,
                    productHierarchy: stratgyHierarchyKeyValue.value,
                    geographic: stratgyGeographicKeyValue.value,
                    customItems: selectedSolutionCustomItems,
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
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,
                    template: flagTemplate,
                    visibleInCommerce: flagCommerce,
                };

                const strategyRes = await updateCustomPortfolio(
                    generalComponentData.portfolioId,
                    obj
                );
                if (strategyRes.status === 200) {
                    toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setValue("price");
                    console.log("strategy updating", strategyRes.data);
                } else {
                    throw `${strategyRes.status}:error in update portfolio`;
                };
            } else if (e.target.id == "price") {

                if ((priceMethodKeyValue1.length === 0 ||
                    priceMethodKeyValue1?.value === "" ||
                    priceMethodKeyValue1?.value === null ||
                    priceMethodKeyValue1?.value === undefined)
                ) {
                    throw "Price Method is a required field, you can’t leave it blank";
                }

                if ((priceTypeKeyValue1.value == "") ||
                    (priceTypeKeyValue1.value == undefined)) {
                    throw "Price Type is a required field, you can’t leave it blank";
                }
                // if ((priceMethodKeyValue1.length === 0 ||
                //     priceMethodKeyValue1?.value === "" ||
                //     priceMethodKeyValue1?.value === null ||
                //     priceMethodKeyValue1?.value === undefined)
                // ) {
                //     throw "Please fill required field properly";
                // }

                let priceEscalation = {
                    priceMethod: priceMethodKeyValue1.value,
                    priceHeadType: (priceEscalationHeadKeyValue1?.value == "" ||
                        priceEscalationHeadKeyValue1?.value == null ||
                        priceEscalationHeadKeyValue1?.value == undefined) ?
                        "LABOR" : priceEscalationHeadKeyValue1?.value,
                    escalationPercentage: (escalationPriceValue === "" ||
                        escalationPriceValue === null ||
                        escalationPriceValue === undefined) ? 0 : parseInt(escalationPriceValue),
                    validFrom: validityData.fromDate.toISOString().substring(0, 10),
                    validTo: validityData.toDate.toISOString().substring(0, 10),
                    userId: "string"
                }

                let priceAdditional = {
                    priceMethod: priceMethodKeyValue1.value,
                    priceHeadType: (priceAdditionalHeadKeyValue1?.value === "" ||
                        priceAdditionalHeadKeyValue1?.value === null ||
                        priceAdditionalHeadKeyValue1?.value === undefined)
                        ? "LABOR" : priceAdditionalHeadKeyValue1?.value,
                    additionalPercentage: (additionalPriceValue === "" ||
                        additionalPriceValue === null ||
                        additionalPriceValue === undefined)
                        ? 0 : parseInt(additionalPriceValue),
                    validFrom: validityData.fromDate.toISOString().substring(0, 10),
                    validTo: validityData.toDate.toISOString().substring(0, 10),
                    userId: "string"
                }

                let portfolioPriceCreate = {
                    priceMethod: priceMethodKeyValue1.value,
                    priceType: (priceTypeKeyValue1?.value === "" ||
                        priceTypeKeyValue1?.value === null ||
                        priceTypeKeyValue1?.value === undefined) ?
                        "FIXED" : priceTypeKeyValue1?.value,
                    priceList: (priceListKeyValue1?.value === "" ||
                        priceListKeyValue1?.value === null ||
                        priceListKeyValue1?.value === undefined)
                        ? "CUSTOMER_SEGMENT" : priceListKeyValue1?.value,
                    priceDate: priceDetails.priceDate.toISOString().substring(0, 10),
                }

                console.log("portfolioPriceCreate --- : ", portfolioPriceCreate)

                const escalationPrice = await escalationPriceCreation(priceEscalation);

                const additionalPrice = await additionalPriceCreation(priceAdditional);

                const portfolioPriceAPIData = await portfolioPriceCreation(portfolioPriceCreate);

                setPortfolioEscalationPriceDataId({
                    escalationPriceId: escalationPrice.data.escalationPriceId,
                })
                setPortfolioAdditionalPriceDataId({
                    additionalPriceId: additionalPrice.data.additionalPriceId,
                })
                setPortfolioPriceDataId({
                    portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
                })

                setPortfolioPriceDataIdForExiting(portfolioPriceAPIData.data.portfolioPriceId);
                setEscalationPriceDataId(escalationPrice.data.escalationPriceId);
                setAdditionalPriceDataId(additionalPrice.data.additionalPriceId);

                const { portfolioId, ...res } = generalComponentData;

                let priceobjData = {
                    ...res,
                    visibleInCommerce: true,
                    customerId: 0,
                    lubricant: true,
                    customerSegment: generalComponentData.customerSegment.value
                        ? generalComponentData.customerSegment.value
                        : "EMPTY",

                    machineType: machineTypeKeyValue.value,
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

                    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
                    supportLevel: generalComponentData.supportLevel
                        ? generalComponentData.supportLevel
                        : "EMPTY",

                    // customCoverages: [],
                    customerGroup: generalComponentData.customerGroup
                        ? generalComponentData.customerGroup
                        : "EMPTY",
                    searchTerm: "EMPTY",

                    status: value2.value,
                    supportLevel: value3.value,


                    solutionType: solutionTypeListKeyValue.value ?
                        solutionTypeListKeyValue.value : "EMPTY",
                    solutionLevel: solutionLevelListKeyValue.value ?
                        solutionLevelListKeyValue.value : "EMPTY",

                    portfolioPrice: {
                        portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
                    },
                    additionalPrice: {
                        additionalPriceId: additionalPrice.data.additionalPriceId,
                    },
                    escalationPrice: {
                        escalationPriceId: escalationPrice.data.escalationPriceId,
                    },

                    usageCategory: categoryUsageKeyValue1.value,
                    taskType: stratgyTaskTypeKeyValue.value,
                    strategyTask: stratgyTaskUsageKeyValue.value,
                    responseTime: stratgyResponseTimeKeyValue.value,
                    productHierarchy: stratgyHierarchyKeyValue.value,
                    geographic: stratgyGeographicKeyValue.value,


                    customItems: selectedSolutionCustomItems,
                    customCoverages: selectedSolutionCustomCoverages,

                    preparedBy: administrative.preparedBy,
                    approvedBy: administrative.approvedBy,
                    preparedOn: administrative.preparedOn,
                    revisedBy: administrative.revisedBy,
                    revisedOn: administrative.revisedOn,
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,
                    template: flagTemplate,
                    visibleInCommerce: flagCommerce,
                };

                const priceObjRes = await updateCustomPortfolio(
                    generalComponentData.portfolioId,
                    priceobjData
                )
                if (priceObjRes.status === 200) {
                    toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // setValue("administrative");
                    setValue("priceAgreement");
                    // setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: true });
                    // console.log("administryRes updating", administryRes.data);
                } else {
                    throw `${priceObjRes.status}:error in update portfolio`;
                };
            } else if (e.target.id == "priceAgreement") {
                setValue("coverage");
            } else if (e.target.id == "coverage") {


                let cvgIds = [];
                setValue("administrative");
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
                    const res = await createCustomCoverage(reqObj);
                    console.log("createCoverage res:", res);
                    cvgIds.push({ coverageId: res.customCoverageId });
                }
                setGeneralComponentData({
                    ...generalComponentData,
                    customCoverages: cvgIds,
                });

                setSelectedSolutionCustomCoverages(cvgIds);

                const { portfolioId, ...res } = generalComponentData;
                let obj = {
                    ...res,
                    visibleInCommerce: true,
                    customerId: 0,
                    lubricant: true,
                    customerSegment: generalComponentData.customerSegment
                        ? generalComponentData.customerSegment.value
                        : "EMPTY",

                    supportLevel: value3.value,
                    status: value2.value,

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

                    machineType: machineTypeKeyValue.value,
                    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,

                    customerGroup: generalComponentData.customerGroup
                        ? generalComponentData.customerGroup
                        : "EMPTY",
                    searchTerm: "EMPTY",


                    solutionType: solutionTypeListKeyValue.value ?
                        solutionTypeListKeyValue.value : "EMPTY",
                    solutionLevel: solutionLevelListKeyValue.value ?
                        solutionLevelListKeyValue.value : "EMPTY",

                    portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                        ? portfolioPriceDataId : null,
                    additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                        ? portfolioAdditionalPriceDataId : null,
                    escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                        ? portfolioEscalationPriceDataId : null,

                    customItems: selectedSolutionCustomItems,
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
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,
                    template: flagTemplate,
                    visibleInCommerce: flagCommerce,
                };
                if (generalComponentData.portfolioId) {
                    const updatePortfolioRes = await updateCustomPortfolio(
                        generalComponentData.portfolioId,
                        obj
                    );
                    if (updatePortfolioRes.status === 200) {
                        toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setValue("administrative");
                    } else {
                        throw `${updatePortfolioRes.status}:unable to update`;
                    }
                }
            } else if (e.target.id == "administrative") {
                const validator = new Validator();

                if ((administrative.preparedBy == "") ||
                    (administrative.preparedBy == undefined)) {
                    throw "Prepared By is a required field, you can’t leave it blank";
                }

                if ((administrative.salesOffice == "") ||
                    (administrative.salesOffice == undefined)) {
                    throw "Sales Office/Branch is a required field, you can’t leave it blank";
                }

                if ((administrative.offerValidity == "") ||
                    (administrative.offerValidity == undefined)) {
                    throw "Offer Validity is a required field, you can’t leave it blank";
                }

                // if ((!validator.emailValidation(administrative.preparedBy) ||
                //     administrative.preparedBy == "" ||
                //     administrative.preparedBy == undefined) ||
                //     (administrative.approvedBy != "" &&
                //         administrative.approvedBy != undefined &&
                //         !validator.emailValidation(administrative.approvedBy)) ||
                //     (administrative.revisedBy != "" &&
                //         administrative.revisedBy != undefined &&
                //         !validator.emailValidation(administrative.revisedBy)) ||
                //     (administrative.salesOffice?.value == "" ||
                //         administrative.salesOffice?.value == undefined)
                // )
                // if ((
                //     administrative.preparedBy == "" ||
                //     administrative.preparedBy == undefined) ||
                //     (administrative.salesOffice == "" ||
                //         administrative.salesOffice == undefined)
                // ) {
                //     throw "Please fill mandatory fields with valid data";
                // }

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

                    supportLevel: value3.value,
                    status: value2.value,

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
                    machineType: machineTypeKeyValue.value,
                    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,

                    customItems: selectedSolutionCustomItems,
                    customCoverages: selectedSolutionCustomCoverages,
                    // customCoverages: [],

                    customerGroup: generalComponentData.customerGroup
                        ? generalComponentData.customerGroup
                        : "EMPTY",
                    searchTerm: "EMPTY",


                    portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                        ? portfolioPriceDataId : null,
                    additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                        ? portfolioAdditionalPriceDataId : null,
                    escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                        ? portfolioEscalationPriceDataId : null,

                    solutionType: solutionTypeListKeyValue.value ?
                        solutionTypeListKeyValue.value : "EMPTY",
                    solutionLevel: solutionLevelListKeyValue.value ?
                        solutionLevelListKeyValue.value : "EMPTY",
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
                    salesOffice: administrative.salesOffice?.value,
                    offerValidity: administrative.offerValidity?.value,
                    template: flagTemplate,
                    visibleInCommerce: flagCommerce,

                };

                const administryRes = await updateCustomPortfolio(
                    generalComponentData.portfolioId,
                    Administryobj
                );
                if (administryRes.status === 200) {
                    toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // setValue("administrative");
                    // setValue("4");
                    console.log("administryRes updating", administryRes.data);
                } else {
                    throw `${administryRes.status}:error in update portfolio`;
                };

                // setValue("4");

            }
        } catch (error) {
            console.log("something went wrong:", error);
            toast("😐" + error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

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
    // const handleWithSparePartsCheckBox = (e) => {
    //     setPartsRequired(e.target.checked)
    //     // // if(e.target.checked){

    //     // // }
    //     // console.log("event is : ", e.target.checked)
    //     // console.log("event : ",e);
    // }

    const handleWithSparePartsCheckBox = (e, selectToggle) => {
        if (selectToggle == "with") {
            setPartsRequired(e.target.checked)
        } else {
            var rowChecked = e.target.checked;
            setPartsRequired(!rowChecked)
        }
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

    const handleNeedOnlySparePartsCheckBox = (e) => {
        if (e.target.checked) {
            setPartsRequired(true)
            setServiceRequired(false)
            setlabourRequired(false)
            setMiscRequired(false)
            setNeedOnlyParts(true)
        } else {
            setNeedOnlyParts(false)
        }
    }

    const UpdateCustomPriceInclusion = async () => {
        console.log("hello");
        if (editAbleCustomPriceData.length > 0) {
            // console.log("hello")
            for (let y = 0; y < editAbleCustomPriceData.length; y++) {
                var getCustomPriceData = await getCustomItemPriceById(editAbleCustomPriceData[y].customItemPriceDataId);
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
        // getPortfolioCommonConfig("price-method")
        //     .then((res) => {
        //         const options = res.map((d) => ({
        //             value: d.key,
        //             label: d.value,
        //         }));
        //         setPriceMethodKeyValue(options);
        //     })
        //     .catch((err) => {
        //         alert(err);
        //     });
        getSolutionPriceCommonConfig("price-method")
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

        getSolutionPriceCommonConfig("price-type")
            .then((res) => {
                console.log("res ------", res)
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPriceTypeKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });

        getSolutionPriceCommonConfig("price-list")
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPriceListKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });

        getSolutionPriceCommonConfig("price-head-type")
            .then((res) => {
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPriceHeadTypeKeyValue(options);
            })
            .catch((err) => {
                alert(err);
            });
        getSolutionPriceCommonConfig("support-level")
            .then((res) => {
                res.pop();
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setVersionOption(options);
            })
            .catch((err) => {
                alert(err);
            });

        getSolutionPriceCommonConfig("status")
            .then((res) => {
                res.pop();
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setStatusOption(options);
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
        if (portfolioPriceDataIdForExiting !== "") {
            fetchPortfolioPriceDataById(portfolioPriceDataIdForExiting);
        }
    }, [value])

    const fetchPortfolioPriceDataById = async (id) => {

        // alert(id)
        const portfolioPriceDataFetch = await getPortfolioPriceById(id);
        setPricePriceData(portfolioPriceDataFetch.data.price)
        setPriceCalculatedPrice(portfolioPriceDataFetch.data.calculatedPrice);

    };


    localStorage.setItem("distroyAble", true);

    useEffect(() => {

        if (state && state.type == "fetch") {
            fetchCopiedPortfolioAllDetails(state.portfolioId);
            setPortfolioId(state.portfolioId);
        }

    }, [])


    const fetchCopiedPortfolioAllDetails = async (portfolioIdData) => {

        if (portfolioIdData) {
            setHeaderLoading(true);
            await getSolutionPortfolioById(portfolioIdData)
                .then((result) => {
                    populateHeader(result);
                })
                .catch((err) => {
                    handleSnack("error", "Error occurred while fetching header details");
                });
            setHeaderLoading(false);
        }
        // console.log("portfolioIdData")
        // getSolutionPortfolioById
        // alert(portfolioIdData);
    }


    const populateHeader = (result) => {
        console.log("result ----", result);

        // Set Portfolio Id for Created Copied Portfolio  
        setPortfolioId(result.customPortfolioId);

        // For set Status state 
        var statusVal, statusLabel;
        if (result.status == "" || result.status == "EMPTY" || result.status == null) {
            statusVal = "DRAFT";
            statusLabel = "Draft";
        } else {
            statusVal = result.status;
            statusLabel = result.status;
        }
        setValue2({ label: statusLabel, value: statusVal })

        // For set SupportLevel state
        var supportLevelVal, supportLevelLabel;
        if (result.supportLevel == "" || result.supportLevel == "EMPTY" || result.supportLevel == null) {
            supportLevelVal = "STANDARD";
            supportLevelLabel = "Standard (Bronze)";
        } else {
            supportLevelVal = result.supportLevel;
            supportLevelLabel = result.supportLevel;
        }
        setValue3({ label: supportLevelLabel, value: supportLevelVal })

        let itemsArrData = [];
        let customItemArr = [];
        let createdCustomCoverages = [];

        let newArrItem = [];

        console.log("result.customItems : ", result.customItems)
        if (result.customItems.length > 0) {

            for (let i = 0; i < result.customItems.length; i++) {



                if (result.customItems[i].customItemHeaderModel.bundleFlag === "PORTFOLIO") {
                    let myObj = result.customItems[i];
                    console.log("myObj data : ", myObj)
                    let expendedArrObj = [];
                    if (result.itemRelations != null) {
                        if (result.itemRelations.length > 0) {
                            for (let b = 0; b < result.itemRelations.length; b++) {
                                if (result.customItems[i].customItemId === result.itemRelations[b].portfolioItemId) {
                                    for (let c = 0; c < result.itemRelations[b].bundles.length; c++) {

                                        let bundleObj = result.customItems.find((objBundle, i) => {
                                            if (objBundle.customItemId == result.itemRelations[b].bundles[c]) {

                                                return objBundle; // stop searching
                                            }
                                        });
                                        expendedArrObj.push(bundleObj);
                                    }

                                    for (let d = 0; d < result.itemRelations[b].services.length; d++) {
                                        let serviceObj = result.customItems.find((objService, i) => {
                                            if (objService.customItemId == result.itemRelations[b].services[d]) {
                                                return objService; // stop searching
                                            }
                                        });
                                        expendedArrObj.push(serviceObj);
                                    }
                                }

                                myObj.associatedServiceOrBundle = expendedArrObj;
                                itemsArrData.push(myObj);
                                // let obj = result.customItems.find(obj => obj.customItemId == result.itemRelations[b].portfolioItemId);
                            }
                        } else {
                            myObj.associatedServiceOrBundle = expendedArrObj;
                            itemsArrData.push(myObj);
                        }

                    } else {
                        myObj.associatedServiceOrBundle = expendedArrObj;
                        itemsArrData.push(myObj);
                    }

                    console.log("itemsArrDat 4560 : ", itemsArrData)

                }

                console.log("itemsArrData : ", itemsArrData)

                setSelectedSolutionItems(itemsArrData);

                // console.log("result.customItems ", result.customItems[i].customItemId, result.customItems[i].customItemHeaderModel.bundleFlag)


            }
        }

        // // Set Data By Item Relation Data Data
        // for (let b = 0; b < result.itemRelations.length; b++) {
        //     let expendedArrObj = [];
        //     let obj = result.customItems.find(obj => obj.customItemId == result.itemRelations[b].portfolioItemId);
        //     for (let c = 0; c < result.itemRelations[b].bundles.length; c++) {

        //         let bundleObj = result.customItems.find((objBundle, i) => {
        //             if (objBundle.customItemId == result.itemRelations[b].bundles[c]) {

        //                 return objBundle; // stop searching
        //             }
        //         });
        //         expendedArrObj.push(bundleObj);
        //     }

        //     for (let d = 0; d < result.itemRelations[b].services.length; d++) {
        //         let serviceObj = result.customItems.find((objService, i) => {
        //             if (objService.customItemId == result.itemRelations[b].services[d]) {
        //                 return objService; // stop searching
        //             }
        //         });
        //         expendedArrObj.push(serviceObj);
        //     }

        //     obj.associatedServiceOrBundle = expendedArrObj;
        //     itemsArrData.push(obj);
        // }
        // setSelectedSolutionItems(itemsArrData);

        // for Update  Custom-Item in Portfolio Item Data BY Id 
        for (let i = 0; i < result.customItems.length; i++) {
            customItemArr.push({ customItemId: result.customItems[i].customItemId })
        }
        setSelectedSolutionCustomItems(customItemArr)

        setSelectedMasterData(result.customCoverages)

        // setBundleItems(itemsArrData)

    }

    console.log("setSelectedSolutionItems : ", selectedSolutionItems)

    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };
    // console.log("selected Custom Items Data are  : ", selectedSolutionCustomItems)

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


    const solutionTypeList = useAppSelector(
        selectStrategyTaskOption(selectSolutionTaskList)
    );


    const solutionLevelList = useAppSelector(
        selectStrategyTaskOption(selectSolutionLevelList)
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

    const usageTypeOption = [
        { value: "Planned Usage", label: "Planned Usage" },
        { value: "sRecommended usage", label: "Recommended usage" },
      ];

    const discountTypeOptions = [
        { value: "PROGRAM_DISCOUNT", label: "Program" },
        { value: "CUSTOMER_DISCOUNT", label: "Customer" },
        { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
    ]

    const options2 = [
        { value: "chocolate", label: "Archived" },
        { value: "strawberry", label: "Draft" },
        { value: "vanilla", label: "Active" },
        { value: "Construction", label: "Revised" },
    ];
    const options3 = [
        { value: "chocolate", label: "Gold" },
        { value: "strawberry", label: "1" },
        { value: "vanilla", label: "2" },
        { value: "Construction", label: "3" },
    ];

    const validityOptions = [
        { value: "15", label: "15 days" },
        { value: "30", label: "1 month" },
        { value: "45", label: "45 days" },
        { value: "60", label: "2 months" },
    ];

    const salesOfficeOptions = [
        { value: "Location1", label: "Location1" },
        { value: "Location2", label: "Location2" },
        { value: "Location3", label: "Location3" },
        { value: "Location4", label: "Location4" },
    ];

    const [versionOption, setVersionOption] = useState([]);
    const [statusOption, setStatusOption] = useState([]);
    const [newVersionName, setNewVersionName] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handleCoveragetable = () => setOpenCoveragetable(false);
    const data = [
        {
            id: 1,
            caseId: 13322,
            BundleId: "Pc",
            Bundledescription: "Ex2487518",
            S1: "CAT DEO",
            strategy: "3",
            Standardjob: "$43.09",
            repairoption: "$100",
            frequency: "USD",
            quantity: "80%",
            part$: "$80",
            srevic$: "80% usage observed on previous work.",
            Total$: "80% usage observed on previous work.",
        },
    ];
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


    // View Custom Portfolio Bundle/Service
    const handleExpendedBundleServiceUpdate = async (i, data) => {

        // alert(i)
        // serviceOrBundlePrefix
        setAssociatedServiceOrBundleIndex(i)
        setEditBundleService(true);
        setBundleAndServiceEditAble(true)
        setBundleTabs("bundleServiceHeader");

        const newData = await getCustomItemDataById(data.customItemId)

        console.log("my newData : ", newData)

        if (newData.customItemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
            setServiceOrBundlePrefix("BUNDLE");
        } else if (newData.customItemHeaderModel.bundleFlag === "SERVICE") {
            setServiceOrBundlePrefix("SERVICE");
        }


        setCreateServiceOrBundle({
            id: newData.customItemId,
            name: newData.itemName,
            description: newData.customItemHeaderModel.itemHeaderDescription,
            bundleFlag: newData.customItemHeaderModel.bundleFlag,
            reference: newData.customItemHeaderModel.itemHeaderDescription,
            customerSegment: "",
            make: newData.customItemHeaderModel.itemHeaderMake,
            model: newData.customItemHeaderModel.model,
            family: newData.customItemHeaderModel.itemHeaderFamily,
            prefix: { label: newData.customItemHeaderModel.prefix, value: newData.customItemHeaderModel.prefix },
            machine: { label: newData.customItemHeaderModel.type, value: newData.customItemHeaderModel.type },
            additional: "",
            machineComponent: { label: newData.customItemHeaderModel.type, value: newData.customItemHeaderModel.type },
        });

        setSelectedPrefixOption({ label: newData.customItemHeaderModel.prefix, value: newData.customItemHeaderModel.prefix });

        setPassItemEditRowData(newData);
        setBundleServicePortfolioItemId(newData.customItemHeaderModel.portfolioItemId);

        setBundleServiceItemPriceData(newData.customItemBodyModel.itemPrices)


        var offerValidityLabel;
        if (newData.customItemHeaderModel.offerValidity == "15") {
            offerValidityLabel = "15 days";
        } else if (newData.customItemHeaderModel.offerValidity == "30") {
            offerValidityLabel = "1 month";
        } else if (newData.customItemHeaderModel.offerValidity == "45") {
            offerValidityLabel = "45 days";
        } else if (newData.customItemHeaderModel.offerValidity == "60") {
            offerValidityLabel = "2 month";
        } else {
            offerValidityLabel = newData.customItemHeaderModel.offerValidity;
        }

        setBundleOrServiceAdministrative({
            preparedBy: newData.customItemHeaderModel.preparedBy,
            approvedBy: newData.customItemHeaderModel.approvedBy,
            preparedOn: newData.customItemHeaderModel.preparedOn,
            revisedBy: newData.customItemHeaderModel.revisedBy,
            revisedOn: newData.customItemHeaderModel.revisedOn,
            salesOffice: {
                value: newData.customItemHeaderModel.salesOffice,
                label: newData.customItemHeaderModel.salesOffice,
            },
            offerValidity: {
                value: newData.customItemHeaderModel.offerValidity,
                label: offerValidityLabel,
            },
        })

        setBundleServiceShow(true);
    }

    const [editBundleService, setEditBundleService] = useState(false);

    const showPriceDataOfBundleOrService = async (bundleServiceData) => {
        // setBundleServicePriceCalculator
        // serviceOrBundlePrefix={serviceOrBundlePrefix}
        if (bundleServiceData.customItemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
            setServiceOrBundlePrefix("BUNDLE");
        } else if (bundleServiceData.customItemHeaderModel.bundleFlag === "SERVICE") {
            setServiceOrBundlePrefix("SERVICE");
        }

        console.log("bundleServiceData.itemBodyModel : ", bundleServiceData.customItemHeaderModel)

        if (bundleServiceData.customItemBodyModel.customItemPrices.length > 0) {
            const rObjId = bundleServiceData.customItemBodyModel.customItemPrices[0].customItemPriceDataId;

            //   const res = await getItemPriceData(rObjId)
            //   console.log("ressss : ", res)
            //   var newVal = res.data;
            //   setPriceCalculator(res.data)
        }

        setBundleServicePriceCalculator(true);
    }
    const [bundleServicePriceCalculator, setBundleServicePriceCalculator] = useState(false);

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

    const handleCoverageCheckBoxData = () => {
        //   setSelectedMasterData(filterMasterData);
        //   setMasterData([]);
        var _selectedCoverageData = [...filterMasterData];
        // console.log("_selectedBundleServiceItemData : ", _selectedBundleServiceItemData);

        let cloneArr = []
        filterMasterData.map((data, i) => {
            console.log("data: ", data)
            const exist = selectedMasterData.some(item => item.id === data.id)
            console.log("exist: ", exist)
            if (!exist) {
                cloneArr.push(data)
                // setSelectedMasterData([...selectedMasterData, data])
            }
        })
        setSelectedMasterData([...selectedMasterData, ...cloneArr])
        setMasterData([])
    }

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

    const handleEditIncludeSerialNo = (i, e, row) => {
        console.log("handleEditIncludeSerialNo row:", row);
        var editSerialNo = "";


        const _selectedMasterData = [...selectedMasterData]
        const objMaster = _selectedMasterData[i]

        if (objMaster.associatedIncludedModelData) {
            editSerialNo = objMaster.associatedIncludedModelData[0].serialNumber?.value;
        }

        let obj = {
            coverageId: row.customCoverageId ? row.customCoverageId : row.id,
            make: row.make,
            family: row.family,
            modelNo: row.modelNo ? row.modelNo : row.model,
            serialNoPrefix: row.serialNumberPrefix ? row.serialNumberPrefix : row.prefix,
            startSerialNo: row.startSerialNumber ? row.startSerialNumber : row.startSerialNo,
            endSerialNo: row.endSerialNumber ? row.endSerialNumber : row.endSerialNo,
            fleet: row.fleet,
            fleetSize: row.fleetSize,
            serialNo: editSerialNo,
        };
        setEditSerialNo(obj);
        setIncludedModelIndex(i)
        setShowEditIncludeSerialNoModel(true);
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

    const HandleSolutionType = (e) => {
        setSolutionLevelListKeyValue([]);
        // setSolutionLevelKeyValue([]);
        addPortFolioItem.taskType = "";
        setSolutionTypeListKeyValue(e);
        dispatch(taskActions.updateSolution(e.value));
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
        // {
        //     name: (
        //         <>
        //             <div>Select</div>
        //         </>
        //     ),
        //     selector: (row) => row.check1,
        //     wrap: true,
        //     sortable: true,
        //     maxWidth: "300px",
        //     cell: (row) => (
        //         <Checkbox
        //             className="text-black"
        //             checked={row.check1}
        //             onChange={(e) => handleCheckboxData(e, row)}
        //         />
        //     ),
        // },
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
            cell: (row, i) => (
                <div>
                    <Link
                        to="#"
                        onClick={(e) => handleEditIncludeSerialNo(i, e, row)}
                        className="btn-svg text-white cursor mx-2"
                    // data-toggle="modal"
                    // data-target="#AddCoverage"
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
                        onClick={() => ShowRelatedIncludeModelBox(i, row)}
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
            cell: (i, row) => (
                <div>
                    {/* <SearchBox
                value={row.noSeriese}
                onChange={(e) =>
                  handleCoverageHandleMachineSearch(
                    "serialNo",
                    row.model,
                    e.target.value
                  )
                }
                type="equipmentNumber"
                result={searchCoverageSerialResults}
                onSelect={handleModelSelect}
                noOptions={noCoverageOptionSerial}
              /> */}
                    <Select
                        className="customselect"
                        maxMenuHeight={80}
                        onChange={(e) => handleIncludedeSerialNoSelectChange(e, i, row)}
                        value={row.serialNumber}
                        options={coverageSerialResultList}
                    // isOptionDisabled={(e) => handleDisableSerialNoChangesOptions(e,i,row)}
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
                        />
                    </MuiPickersUtilsProvider>
                </div>
            ),
        },
    ];
    const handleEditPortfolioItem = (e, row) => {

        console.log("row 1942 : ", row);
        setTempBundleService3(row.associatedServiceOrBundle)
        setComponentData({
            ...componentData,
            componentCode: row.customItemHeaderModel.componentCode,
            description: row.customItemHeaderModel.componentDescription,
            model: row.customItemHeaderModel.model,
            make: row.customItemHeaderModel.itemHeaderMake,
            serialNo: row.customItemHeaderModel.serialNumber,
        });
        // data.associatedServiceOrBundle?.map((bundleAndService, i)
        setTabs("1");
        setItemModelShow(true);
        setPortfolioItemDataEditable(true);
        setPassItemEditRowData({ ...row, _customItemId: row.customItemId });

        setOpenSearchSolution(false);
        setCreateNewBundle(false);
        setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
    const [portfolioItemDataEditable, setPortfolioItemDataEditable] = useState(false);
    const Inclusion_Exclusion = (e, data) => {
        console.log("event is : ", e);
        console.log("itemData : ", data);
        if (data.customItemBodyModel.itemPrices.length > 0) {
            setEditAblePriceData(data.customItemBodyModel.itemPrices)
        } else {
            setEditAblePriceData([])
        }

        console.log("editable Custom Price data : ", editAblePriceData);

    }
    const [editAblePriceData, setEditAblePriceData] = useState([]);
    const selectedportfolioTempItemsColumn = [
        {
            name: (
                <>
                    <div className="d-flex align-items-baseline">
                        <span className="portfolio-icon mr-1">
                            <svg style={{ width: "11px" }}
                                id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 119.30736 133.59966"
                            >
                                <path
                                    className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                                    d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
                                />
                            </svg>
                        </span>
                        <p className="mb-0 font-size-12 font-weight-500">Solution Sequence</p>
                    </div>
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
                    <div>Solution ID</div>
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
                    <div>Solution Description</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel.itemHeaderDescription,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel.itemHeaderDescription,
            minWidth: "150px",
            maxWidth: "150px",
        },
        {
            name: (
                <>
                    <div>Strategy</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.itemHeaderStrategy,
        },
        {
            name: (
                <>
                    <div>Task Type</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel.taskType,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel.taskType,
        },
        {
            name: (
                <>
                    <div>Quantity</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.quantity,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.quantity,
        },
        {
            name: (
                <>
                    <div>Unit Price (per one)</div>
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
                    <div>Net Parts</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.additional,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.additional,
        },
        {
            name: (
                <>
                    <div>Net Service</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.partsprice,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.partsprice,
        },
        {
            name: (
                <>
                    <div>Net Price</div>
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
                    <div>Comments</div>
                </>
            ),
            selector: (row) => row.customItemHeaderModel?.comments,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemHeaderModel?.comments,
        },
        {
            name: (
                <>
                    <div>Actions</div>
                </>
            ),
            selector: (row) => row.customItemBodyModel?.type,
            wrap: true,
            sortable: true,
            format: (row) => row.customItemBodyModel?.type,
            cell: (row) => (
                <div
                    className="d-flex justify-content-center align-items-center row-svg-div"
                    style={{ minWidth: "180px !important" }}
                >
                    <div>
                        <Tooltip title="View">
                            <Link to="#" className="px-1" onClick={(e) => handleEditPortfolioItem(e, row)}>
                                <VisibilityOutlinedIcon />
                            </Link>
                        </Tooltip>
                    </div>
                    <div>
                        <DropdownButton
                            className="customDropdown ml-2 width-p"
                            id="dropdown-item-button"
                        >
                            <Dropdown.Item className=" cursor" data-toggle="modal" data-target="#myModal12">
                                <Tooltip title="Inclusion">
                                    <Link to="#" className="px-1" onClick={(e) => Inclusion_Exclusion(e, row)} >
                                        <img src={cpqIcon}></img><span className="ml-2">Inclusion/Exclusion</span>
                                    </Link>
                                </Tooltip>
                            </Dropdown.Item>
                            <Dropdown.Item className="" onClick={(e) => handleServiceItemDelete(e, row)}>
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
                                        </svg><span className="ml-2">Delete</span>
                                    </Link>
                                </Tooltip>
                            </Dropdown.Item>
                        </DropdownButton>
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

    const handleAddNewServiceOrBundle = async () => {
        try {

            // ====== Validation for Bundle Item Create/Update ====== //
            if (serviceOrBundlePrefix === "BUNDLE") {
                if ((createServiceOrBundle.name == "") ||
                    (createServiceOrBundle.name == undefined)) {
                    throw "Bundle Name is a required field, you can’t leave it blank";
                }
                if ((createServiceOrBundle.description == "") ||
                    (createServiceOrBundle.description == undefined)) {
                    throw "Bundle Description is a required field, you can’t leave it blank";
                }
                if ((createServiceOrBundle.model == "") ||
                    (createServiceOrBundle.model == undefined)) {
                    throw "Model is a required field, you can’t leave it blank";
                }
                setBundleTabs("bundleServiceItems");
            }

            // ====== Validation for Service Item Create/Update ====== //
            if (serviceOrBundlePrefix === "SERVICE") {
                // if ((createServiceOrBundle.name == "") ||
                //   (createServiceOrBundle.name == undefined)) {
                //   throw "Service Name is a required field, you can’t leave it blank";
                // }
                // if ((createServiceOrBundle.description == "") ||
                //   (createServiceOrBundle.description == undefined)) {
                //   throw "Service Description is a required field, you can’t leave it blank";
                // }
                // if ((createServiceOrBundle.model == "") ||
                //   (createServiceOrBundle.model == undefined)) {
                //   throw "Model is a required field, you can’t leave it blank";
                // }

                // let reqObj = {
                //   itemId: createServiceOrBundle.id,
                //   itemName: createServiceOrBundle.name,
                //   itemHeaderModel: {
                //     itemHeaderId: createServiceOrBundle.id,
                //     itemHeaderDescription: createServiceOrBundle.description,
                //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                //     portfolioItemId: bundleServicePortfolioItemId,
                //     reference: createServiceOrBundle.reference,
                //     itemHeaderMake: createServiceOrBundle.make,
                //     itemHeaderFamily: createServiceOrBundle.family,
                //     model: createServiceOrBundle.model,
                //     prefix: createServiceOrBundle.prefix?.value,
                //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "MACHINE",
                //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
                //     currency: "",
                //     netPrice: 0,
                //     itemProductHierarchy: "END_PRODUCT",
                //     itemHeaderGeographic: "ONSITE",
                //     responseTime: "PROACTIVE",
                //     usage: "",
                //     validFrom: "",
                //     validTo: "",
                //     estimatedTime: "",
                //     servicePrice: 0,
                //     status: "DRAFT",
                //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
                //     componentCode: "",
                //     componentDescription: "",
                //     serialNumber: "",
                //     variant: "",
                //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
                //     jobCode: "",
                //     preparedBy: administrative.preparedBy,
                //     approvedBy: administrative.approvedBy,
                //     preparedOn: administrative.preparedOn,
                //     revisedBy: administrative.revisedBy,
                //     revisedOn: administrative.revisedOn,
                //     salesOffice: administrative.salesOffice?.value,
                //     offerValidity: administrative.offerValidity?.value
                //   },
                //   itemBodyModel: {
                //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
                //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
                //     frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
                //     spareParts: ["WITH_SPARE_PARTS"],
                //     labours: ["WITH_LABOUR"],
                //     miscellaneous: ["LUBRICANTS"],
                //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
                //     solutionCode: "",
                //     usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
                //     recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
                //     usage: "",
                //     year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
                //     avgUsage: 0,
                //     unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
                //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ?
                //       bundleServiceItemPriceData : [],
                //   }
                // }


                let reqObj = {
                    customItemId: createServiceOrBundle.id,
                    itemName: createServiceOrBundle.name,
                    customItemHeaderModel: {
                        customItemHeaderId: createServiceOrBundle.id,
                        itemHeaderDescription: createServiceOrBundle.description,
                        bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                        withBundleService: false,
                        portfolioItemId: bundleServicePortfolioItemId,
                        reference: createServiceOrBundle.reference,
                        itemHeaderMake: createServiceOrBundle.make,
                        itemHeaderFamily: createServiceOrBundle.family,
                        model: createServiceOrBundle.model,
                        prefix: createServiceOrBundle.prefix?.value,
                        type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "MACHINE",
                        additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
                        currency: "",
                        netPrice: "",
                        itemProductHierarchy: "EMPTY",
                        itemHeaderGeographic: "EMPTY",
                        responseTime: "EMPTY",
                        usage: "",
                        validFrom: "",
                        validTo: "",
                        estimatedTime: "",
                        servicePrice: "",
                        status: "DRAFT",
                        componentCode: componentData.componentCode,
                        componentDescription: componentData.description,
                        serialNumber: componentData.serialNo,
                        itemHeaderStrategy: "EMPTY",
                        variant: "",
                        itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
                        jobCode: "",
                        preparedBy: bundleOrServiceAdministrative.preparedBy,
                        approvedBy: bundleOrServiceAdministrative.approvedBy,
                        preparedOn: bundleOrServiceAdministrative.preparedOn,
                        revisedBy: bundleOrServiceAdministrative.revisedBy,
                        revisedOn: bundleOrServiceAdministrative.revisedOn,
                        salesOffice: bundleOrServiceAdministrative.salesOffice?.value,
                        offerValidity: bundleOrServiceAdministrative.offerValidity?.value,
                        serviceChargable: false,
                        serviceOptional: false
                    },
                    customItemBodyModel: {
                        customItemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
                        itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
                        spareParts: ["WITH_SPARE_PARTS"],
                        labours: ["WITH_LABOUR"],
                        miscellaneous: ["LUBRICANTS"],
                        taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
                        solutionCode: "",
                        usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
                        usage: "",
                        year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
                        avgUsage: 0,
                        unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
                        frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
                        customItemPrices: serviceOrBundlePrefix === "BUNDLE" ?
                            bundleServiceItemPriceData : [],
                    }
                }
                const res = await updateCustomItemData(createServiceOrBundle.id, reqObj);
                if (res.status === 200) {
                    toast("😎" + `Service ${createServiceOrBundle.name} updated successfully`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCreatedServiceData(res.data);
                    setUpdatedServiceBundleItemData(res.data);
                    setBundleTabs("bundleServicePriceCalculator")
                }
            }

        } catch (error) {

        }
        if (serviceOrBundlePrefix === "BUNDLE") {
            setBundleTabs("2");
        }
        if (serviceOrBundlePrefix === "SERVICE") {
            setBundleTabs("3");
            saveAddNewServiceOrBundle();
        }
        setTabs("4") //moving to component Data tab in create Item model

    };

    const ShowRelatedIncludeModelBox = async (i, dataRow) => {
        const _selectedMasterData = [...selectedMasterData]
        const obj = _selectedMasterData[i]

        if (!obj.associatedIncludedModelData) {
            const tempObj = {
                ...obj, associatedIncludedModelData: [{
                    family: dataRow.family,
                    model: dataRow.model,
                    noSeriese: "0JAPA000470",
                    location: "LIMA",
                    startDate: "08/04/2017",
                    endDate: "08/04/2017",
                    serialNumber: ""
                }]
            }
            _selectedMasterData[i] = tempObj
            setSelectedMasterData(_selectedMasterData)
        }
        // else{
        //   // const tempObj={...obj,associatedIncludedModelData:[...obj.associatedIncludedModelData]}
        //   // _selectedMasterData[i]=tempObj
        //   // console.log("_selectedMasterData",_selectedMasterData[i])
        //   // setSelectedMasterData(_selectedMasterData)  
        // }
        var searchQueryMachine = dataRow.model
            ? "model~" + dataRow.model
            : "";
        var serialArr = [];
        await machineSearch(searchQueryMachine)
            .then((result) => {
                console.log("my rsult is ---- ", result)
                for (let i = 0; i < result.length; i++) {
                    serialArr.push({ label: result[i].equipmentNumber, value: result[i].equipmentNumber })
                }
            })
        setCoverageSerialResultList(serialArr)
        setIncludedModelIndex(i)
        setShowRelatedModel(true);
        // setModelIncludedData([]);

        // var ModelBoxKeys = [];
        // var KeyValues = [];

        // for (var key in openedModelBoxData) {
        //     ModelBoxKeys.push(Object.keys(openedModelBoxData[key]));
        // }

        // const ValIs = ModelBoxKeys.map((i, data) => {
        //     KeyValues.push(Number(i[0]));
        // });

        // if (!KeyValues.includes(dataRow.id)) {
        //     openedModelBoxData.push({
        //         [dataRow.id]: [
        //             {
        //                 family: dataRow.family,
        //                 model: dataRow.model,
        //                 noSeriese: "0JAPA000470",
        //                 location: "LIMA",
        //                 startDate: "08/04/2017",
        //                 endDate: "08/04/2017",
        //             },
        //         ],
        //     });
        // }

        // setOpenedModelBoxData([...openedModelBoxData]);

        // const NewAddedData = openedModelBoxData.map((currentItem, i) => {
        //     if (currentItem.hasOwnProperty(dataRow.id)) {
        //         var valueOf = Object.values(currentItem);
        //         const Addval = valueOf.map((myVal, i) => {
        //             setModelIncludedData([...myVal]);
        //         });
        //     }
        // });

        // var searchQueryMachine = dataRow.model
        //     ? "model~" + dataRow.model
        //     : "";
        // var serialArr = [];
        // console.log("dataRow ---- ", searchQueryMachine)
        // await machineSearch(searchQueryMachine)
        //     .then((result) => {
        //         console.log("my rsult is ---- ", result)
        //         for (let i = 0; i < result.length; i++) {
        //             serialArr.push({ label: result[i].equipmentNumber, value: result[i].equipmentNumber })
        //         }
        //     })
        // setCoverageSerialResultList(serialArr)
        // console.log("serialArr --- : ", serialArr);
        // setShowRelatedModel(true);
        // setOpenModelBoxDataId(dataRow);
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

    const handleIncludedeSerialNoSelectChange = (e, i, row) => {
        let _selectedMasterData = [...selectedMasterData]
        let tempObj = _selectedMasterData[includedModelIndex].associatedIncludedModelData[i]

        tempObj = { ...tempObj, serialNumber: e }
        _selectedMasterData[includedModelIndex].associatedIncludedModelData[i] = tempObj
        setSelectedMasterData(_selectedMasterData)
        // return
        //   const _modelIncludedData=[...modelIncludedData]
        //   const obj=_modelIncludedData[i]
        //  _modelIncludedData[i]={...row,serialNumber:e}
        //  setModelIncludedData(_modelIncludedData)
        //  console.log("_modelIncludedData[i]",obj)
        //   console.log("handleIncludedeSerialNoSelectChange",row,i)

    }

    const handleIncludedSerialNoStartDataChange = (e, i, row) => {

        let _selectedMasterData = [...selectedMasterData]
        let tempObj = _selectedMasterData[includedModelIndex].associatedIncludedModelData[i]

        tempObj = { ...tempObj, startDate: e }
        _selectedMasterData[includedModelIndex].associatedIncludedModelData[i] = tempObj
        setSelectedMasterData(_selectedMasterData)
    }

    const handleIncludedSerialNoEndDataChange = (e, i, row) => {

        let _selectedMasterData = [...selectedMasterData]
        let tempObj = _selectedMasterData[includedModelIndex].associatedIncludedModelData[i]

        tempObj = { ...tempObj, endDate: e }
        _selectedMasterData[includedModelIndex].associatedIncludedModelData[i] = tempObj
        setSelectedMasterData(_selectedMasterData)
    }

    const handleIncludeSerialNumberSaveChanges = async (data) => {
        console.log("data is ----- : ", data);

        if (data.associatedIncludedModelData.length > 1) {
            let cvgIds = [];
            for (let i = 0; i < data.associatedIncludedModelData.length; i++) {
                if (i > 0) {
                    let reqObj = {
                        customCoverageId: 0,
                        serviceId: 0,
                        modelNo: data.model,
                        serialNumber: data.associatedIncludedModelData[i].serialNumber?.value ? data.associatedIncludedModelData[i].serialNumber?.value : "",
                        startSerialNumber: "",
                        endSerialNumber: "",
                        serialNumberPrefix: "",
                        family: data.family,
                        make: data.make,
                        fleet: "",
                        fleetSize: "SMALL",
                        location: "",
                        startDate: "",
                        endDate: "",
                        actions: "",
                    }
                    const cvgRes = await createCustomCoverage(reqObj);
                    console.log("createCoverage res:", cvgRes);
                    cvgIds.push({ coverageId: cvgRes.customCoverageId });
                } else {
                    console.log("0 index");
                }
            }
        }
    }

    const handleDisableSerialNoChangesOptions = (e, i, row) => {

        // const selectedValue = coverageSerialResultList.value;
        // const changeToValue = e.value;
        // console.log(" value is : ",changeToValue)

        // return !(coverageSerialResultList.includes(e));

    }

    const handleExpandedRowDelete = (e, id) => {
        const _bundleItems = [...bundleItems];
        _bundleItems[0].associatedServiceOrBundle.splice(id, 1);
        setBundleItems(_bundleItems);
    };

    const handleExpandedRowEdit = (e, id) => {
        alert("Edit row");
    };

    const getAddPortfolioItemDataFun = async (data) => {
        console.log("dataaaaa23324442", data)
        setAddportFolioItem(data);

        // Old Todo 
        // const rObj = {
        //     itemPriceDataId: 0,
        //     quantity: parseInt(data.quantity),
        //     startUsage: "",
        //     endUsage: "",
        //     standardJobId: data.templateId,
        //     repairKitId: "",
        //     templateDescription: data.templateDescription?.value,
        //     repairOption: "",
        //     additional: "",
        //     partListId: "",
        //     serviceEstimateId: "",
        //     numberOfEvents: parseInt(data.numberOfEvents),
        //     priceMethod: "LIST_PRICE",
        //     priceType: "FIXED",
        //     listPrice: 0,
        //     priceEscalation: "",
        //     calculatedPrice: 0,
        //     flatPrice: 0,
        //     discountType: "",
        //     year: data.year,
        //     noOfYear: data.noOfYear,
        //     sparePartsPrice: 0,
        //     sparePartsPriceBreakDownPercentage: 0,
        //     servicePrice: 0,
        //     labourPrice: 0,
        //     labourPriceBreakDownPercentage: 0,
        //     miscPrice: 0,
        //     miscPriceBreakDownPercentage: 0,
        //     totalPrice: 0,
        //     netService: 0,
        //     portfolio: {
        //         portfolioId: ((portfolioId == 0 || portfolioId == null || portfolioId == undefined) ? 1 : portfolioId)
        //     },
        //     tenantId: 0,
        //     createdAt: "2022-12-09T13:52:27.880Z",
        //     partsRequired: true,
        //     serviceRequired: false,
        //     labourRequired: true,
        //     miscRequired: true
        // };

        // New Todo
        const rObj = {
            customItemPriceDataId: 0,
            quantity: 0,
            standardJobId: data.templateId,
            repairKitId: data.repairOption,
            templateDescription: data.templateId != "" ? data.templateDescription?.value : "",
            repairOption: "",
            additional: "",
            partListId: "",
            serviceEstimateId: "",
            numberOfEvents: 0,
            priceMethod: "EMPTY",
            priceType: "EMPTY",
            listPrice: 0,
            priceEscalation: "",
            calculatedPrice: 0,
            flatPrice: 0,
            year: data.year?.value,
            noOfYear: parseInt(data.noOfYear),
            sparePartsPrice: 0,
            sparePartsPriceBreakDownPercentage: 0,
            servicePrice: 0,
            labourPrice: 0,
            labourPriceBreakDownPercentage: 0,
            miscPrice: 0,
            miscPriceBreakDownPercentage: 0,
            totalPrice: 0,
            netService: 0,
            additionalPriceType: "ABSOLUTE",
            additionalPriceValue: 0,
            discountType: "EMPTY",
            discountValue: 0,
            recommendedValue: data.recommendedValue,
            startUsage: data.startUsage,
            endUsage: data.endUsage,
            sparePartsEscalation: 0,
            labourEscalation: 0,
            miscEscalation: 0,
            serviceEscalation: 0,
            withBundleService: bundleServiceNeed,
            customPortfolio: {
                portfolioId: ((portfolioId == 0 || portfolioId == null || portfolioId == undefined) ? 1 : portfolioId)
            },
            tenantId: loginTenantId,
            partsRequired: true,
            labourRequired: true,
            miscRequired: true,
            serviceRequired: false,
            inclusionExclusion: true
        }

        const itemPriceDataRes = await customPriceCreation(rObj)

        if (itemPriceDataRes.status === 200) {

            setItemPriceData(itemPriceDataRes.data)
            // handleBundleItemSaveAndContinue(data, itemPriceDataRes.data);
            handlePortfolioItemSaveAndContinue(data, itemPriceDataRes.data)
            setTempBundleService1([]);
            setTempBundleService2([]);
            setTempBundleService3([]);
        } else {
            toast("😐" + "Something Went wrong/ Item not Created", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

    };

    // const ExpandedComponent = ({ data }) => (
    //     // {data?.}
    //     <div>
    //         {/* {data.associatedServiceOrBundle?.length > 0 ?
    //     <> */}
    //         <div
    //             id="row-0"
    //             role="row"
    //             className="border-radius-5 bg-primary text-white sc-evZas cMMpBL rdt_TableRow table-row-baseline"
    //             style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
    //         >
    //             <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell py-2">
    //                 {/* <div class="checkbox">
    //             <input type="checkbox" value=""></input>
    //         </div> */}
    //             </div>
    //             <div
    //                 id="cell-1-undefined"
    //                 data-column-id="1"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <span className="portfolio-icon mr-1">
    //                     <svg style={{ width: "11px" }}
    //                         id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         viewBox="0 0 119.30736 133.59966"
    //                     >
    //                         <path
    //                             className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
    //                             d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
    //                         />
    //                     </svg>
    //                 </span>
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Solution Sequence</p>
    //             </div>
    //             <div
    //                 id="cell-2-undefined"
    //                 data-column-id="2"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Bundle ID</p>
    //             </div>
    //             <div
    //                 id="cell-3-undefined"
    //                 data-column-id="3"
    //                 role="gridcell"
    //                 className="py-2 justify-content-between m-w-150 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Bundle Description</p>
    //             </div>
    //             <div
    //                 id="cell-4-undefined"
    //                 data-column-id="4"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Strategy</p>
    //             </div>
    //             <div
    //                 id="cell-5-undefined"
    //                 data-column-id="5"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Standard Job Ids</p>
    //             </div>
    //             <div
    //                 id="cell-6-undefined"
    //                 data-column-id="6"
    //                 role="gridcell"
    //                 className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Repair Option</p>
    //             </div>
    //             <div
    //                 id="cell-7-undefined"
    //                 data-column-id="7"
    //                 role="gridcell"
    //                 className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Frequency</p>
    //             </div>
    //             <div
    //                 id="cell-8-undefined"
    //                 data-column-id="8"
    //                 role="gridcell"
    //                 className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Quantity</p>
    //             </div>
    //             <div
    //                 id="cell-9-undefined"
    //                 data-column-id="9"
    //                 role="gridcell"
    //                 className=" justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Part $</p>
    //             </div>
    //             <div
    //                 id="cell-10-undefined"
    //                 data-column-id="10"
    //                 role="gridcell"
    //                 className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Service $</p>
    //             </div>
    //             <div
    //                 id="cell-10-undefined"
    //                 data-column-id="10"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Total $</p>
    //             </div>
    //             <div
    //                 id="cell-10-undefined"
    //                 data-column-id="11"
    //                 role="gridcell"
    //                 className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                 data-tag="allowRowEvents"
    //             >
    //                 <p className="mb-0 font-size-12 font-weight-500 text-white">Actions</p>
    //             </div>
    //         </div>
    //         <div className="scrollbar" id="style">
    //             {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
    //                 <div
    //                     key={i}
    //                     id="row-0"
    //                     role="row"
    //                     className="sc-evZas cMMpBL rdt_TableRow table-row-baseline"
    //                     style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
    //                 >
    //                     <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell py-2">
    //                         {/* <div class="checkbox">
    //             <input type="checkbox" value=""></input>
    //         </div> */}
    //                     </div>
    //                     <div
    //                         id="cell-1-undefined"
    //                         data-column-id="1"
    //                         role="gridcell"
    //                         className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>{(i + 1) * 10}</div>
    //                     </div>
    //                     <div
    //                         id="cell-2-undefined"
    //                         data-column-id="2"
    //                         role="gridcell"
    //                         className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="icons-table mr-2 align-items-center d-flex justify-content-center">
    //                             <span className="bundle"><svg version="1.1" id="Layer_1" style={{ width: "12px" }} viewBox="0 0 200 200">
    //                                 <path class="st0" d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
    //               c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
    //               c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
    //               c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
    //               l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
    //               c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
    //               c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
    //               M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
    //               c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
    //               c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
    //               c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
    //               c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
    //               c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
    //               c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
    //               c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
    //               c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"/>
    //                             </svg></span>
    //                         </div>
    //                         <div className="align-items-center d-flex justify-content-center">
    //                             {bundleAndService.itemName}
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-3-undefined"
    //                         data-column-id="3"
    //                         role="gridcell"
    //                         className="py-2 justify-content-between m-w-150 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="d-flex align-items-center" data-tag="allowRowEvents">
    //                             {bundleAndService.customItemHeaderModel.itemHeaderDescription}
    //                         </div>
    //                         <div className="d-flex align-items-center">
    //                             <div
    //                                 className="description cursor mr-1"
    //                                 onClick={() => handleExpendedBundleServiceUpdate(i, bundleAndService)}
    //                             >
    //                                 <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
    //                                     <g>
    //                                         <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
    //                   c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
    //                   c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
    //                   c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
    //                   c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
    //                                         <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
    //                   c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
    //                   c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
    //                   c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
    //                                     </g>
    //                                 </svg>
    //                             </div>
    //                             <div className=""><KeyboardArrowDownIcon /></div>
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-4-undefined"
    //                         data-column-id="4"
    //                         role="gridcell"
    //                         className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="icons-table overflow-visible mr-2 align-items-center d-flex justify-content-center">
    //                             <span className="bundle"><svg version="1.1" id="Layer_1" style={{ width: "12px" }} viewBox="0 0 200 200">
    //                                 <path class="st0" d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
    //               c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
    //               c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
    //               c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
    //               l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
    //               c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
    //               c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
    //               M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
    //               c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
    //               c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
    //               c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
    //               c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
    //               c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
    //               c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
    //               c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
    //               c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"/>
    //                             </svg></span>
    //                         </div>
    //                         <div className="align-items-center d-flex" data-tag="allowRowEvents">
    //                             {bundleAndService.customItemHeaderModel.itemHeaderStrategy}
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-5-undefined"
    //                         data-column-id="5"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="d-flex " data-tag="allowRowEvents">SJ1034
    //                         </div>
    //                         <div
    //                             className="description cursor mr-1"
    //                             onClick={() => setBundleServiceShow(true)}
    //                         >
    //                             <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
    //                                 <g>
    //                                     <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
    //                   c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
    //                   c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
    //                   c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
    //                   c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
    //                                     <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
    //                   c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
    //                   c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
    //                   c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
    //                                 </g>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-6-undefined"
    //                         data-column-id="6"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="d-flex " data-tag="allowRowEvents">RB1034</div>
    //                         <div
    //                             className="description mr-1"
    //                         >
    //                             <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
    //                                 <g>
    //                                     <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
    //                   c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
    //                   c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
    //                   c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
    //                   c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
    //                                     <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
    //                   c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
    //                   c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
    //                   c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
    //                                 </g>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-7-undefined"
    //                         data-column-id="7"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div className="d-flex " data-tag="allowRowEvents">250 hours</div>
    //                     </div>
    //                     <div
    //                         id="cell-8-undefined"
    //                         data-column-id="8"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>4</div>
    //                         <div className="funds-grey">

    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-9-undefined"
    //                         data-column-id="9"
    //                         role="gridcell"
    //                         className=" justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>4</div>
    //                         <div className="funds-grey">

    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-10-undefined"
    //                         data-column-id="10"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>4</div>
    //                         <div
    //                             className="funds-grey "
    //                         >
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-10-undefined"
    //                         data-column-id="10"
    //                         role="gridcell"
    //                         className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>4</div>
    //                         <div
    //                             className="funds-grey cursor"
    //                             onClick={() => showPriceDataOfBundleOrService(bundleAndService)}
    //                         >
    //                             <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
    //                                 <g>
    //                                     <g>
    //                                         <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
    //                   C74.2,101.4,70.7,105,66.3,105.1z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
    //                   C103.4,89.1,106.9,92.9,106.8,97.2z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
    //                   C135.6,88.9,139.3,92.5,139.4,96.8z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
    //                   C70.7,121.6,74.3,125.2,74.3,129.6z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
    //                   C103.2,121.5,106.8,125.2,106.8,129.5z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
    //                   C70.7,154.1,74.3,157.7,74.3,162.1z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
    //                   C90.7,157.7,94.3,154.1,98.6,154z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
    //                   C135.8,121.5,139.4,125.2,139.4,129.5z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
    //                   C123.2,157.7,126.8,154.1,131.1,154z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
    //                   c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
    //                   c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
    //                                     </g>
    //                                     <g>
    //                                         <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
    //                   S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
    //                   c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
    //                                     </g>
    //                                 </g>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                     <div
    //                         id="cell-10-undefined"
    //                         data-column-id="11"
    //                         role="gridcell"
    //                         className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
    //                         data-tag="allowRowEvents"
    //                     >
    //                         <div>
    //                             <Tooltip title="View">
    //                                 <Link
    //                                     to="#"
    //                                     className="px-1"
    //                                     onClick={() => handleExpendedBundleServiceUpdate(i, bundleAndService)}
    //                                 >
    //                                     <VisibilityOutlinedIcon />
    //                                 </Link>
    //                             </Tooltip>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //         {/* </> : <></>} */}

    //     </div>
    // );

    const ExpandedComponent = ({ data }) => (
        // {data?.}
        <div>
            {/* {data.associatedServiceOrBundle?.length > 0 ?
            <> */}
            <div className="p-5">
                <div className="border border-radius-10">
                    <div className="d-flex align-items-center justify-content-between p-3">
                        <div className="d-flex align-items-center">
                            <h6 className="mb-0 font-weight-600 font-size-14 mr-3">Item tree</h6>
                            <div className="d-flex align-items-center">
                                <a href="#" className="mr-2">
                                    <span><ModeEditOutlineOutlinedIcon /></span>
                                </a>
                                <a href="#" className="mr-2">
                                    <span><ShareOutlinedIcon /></span>
                                </a>
                                <a href="#" className="">
                                    <span><SearchIcon /></span>
                                </a>
                            </div>
                        </div>
                        <div className="border-left d-flex align-items-center">
                            <a href="#" style={{ whiteSpace: "pre" }} className="btn-sm"><span className="mr-2"><AddIcon /></span>Add</a>
                        </div>
                    </div>


                    <div
                        id="row-0"
                        role="row"
                        className="border-radius-5 bg-primary text-white sc-evZas cMMpBL rdt_TableRow table-row-baseline"
                        style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
                    >
                        <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell py-2">
                            {/* <div class="checkbox">
                    <input type="checkbox" value=""></input>
                </div> */}
                        </div>
                        <div
                            id="cell-1-undefined"
                            data-column-id="1"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <span className="portfolio-icon mr-1">
                                <svg style={{ width: "11px" }}
                                    id="uuid-fd97eedc-9e4d-4a33-a68e-8d9f474ba343"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 119.30736 133.59966"
                                >
                                    <path
                                        className="uuid-e6c3fd4e-386b-4059-8b00-0f6ea13faef9"
                                        d="M119.3072,35.67679c-.00098-.24805-.03125-.49072-.0752-.72974-.01123-.06348-.02441-.12573-.03857-.18799-.05225-.22827-.11768-.45239-.20703-.66675l-.021-.04858c-.09033-.20923-.20215-.40698-.3252-.59839-.03369-.05298-.06836-.10449-.10498-.15576-.13037-.18457-.27197-.36133-.43164-.52295-.00732-.00781-.01367-.0166-.02148-.02441-.16553-.16504-.3501-.31226-.54395-.44897-.0542-.03784-.10889-.073-.16455-.1084-.05908-.0376-.11377-.08057-.17529-.11548L61.71247,.54446c-1.27637-.72607-2.84082-.72607-4.11719,0L2.10895,32.06937c-.06152,.03491-.11621,.07788-.17529,.11548-.05566,.0354-.11035,.07056-.16406,.1084-.19434,.13672-.37891,.28394-.54443,.44897-.00781,.00781-.01367,.0166-.02148,.02441-.15967,.16162-.30078,.33838-.43164,.52295-.03613,.05127-.0708,.10278-.10498,.15576-.12305,.19141-.23486,.38916-.32471,.59839-.00732,.01636-.01465,.03198-.02148,.04858-.08936,.21436-.1543,.43848-.20703,.66675-.01416,.06226-.02734,.12451-.03857,.18799-.04346,.23901-.07422,.48169-.0752,.72974l.00049,.01001-.00049,.0061v63.37842l59.65381,34.52832,59.65332-34.52832V35.6929l-.00049-.0061,.00049-.01001ZM59.65387,8.96097l47.10889,26.76636-18.42969,10.66675L43.24177,18.28592l16.41211-9.32495Zm4.16748,61.25146l21.55762-12.47778v51.34448l-21.55762,12.47754v-51.34424ZM35.00007,22.96854l45.16357,28.15381-20.50977,11.87085L12.54499,35.72732l22.45508-12.75879ZM8.33503,42.92117l47.15137,27.29126v51.34424L8.33503,94.26565V42.92117Zm85.37891,61.33374V52.91043l17.2583-9.98926v51.34448l-17.2583,9.98926Z"
                                    />
                                </svg>
                            </span>
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Solution Sequence</p>
                        </div>
                        <div
                            id="cell-2-undefined"
                            data-column-id="2"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Bundle ID</p>
                        </div>
                        <div
                            id="cell-3-undefined"
                            data-column-id="3"
                            role="gridcell"
                            className="py-2 justify-content-between m-w-150 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Bundle Description</p>
                        </div>
                        <div
                            id="cell-4-undefined"
                            data-column-id="4"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Strategy</p>
                        </div>
                        <div
                            id="cell-5-undefined"
                            data-column-id="5"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Standard Job Ids</p>
                        </div>
                        <div
                            id="cell-6-undefined"
                            data-column-id="6"
                            role="gridcell"
                            className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Repair Option</p>
                        </div>
                        <div
                            id="cell-7-undefined"
                            data-column-id="7"
                            role="gridcell"
                            className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Frequency</p>
                        </div>
                        <div
                            id="cell-8-undefined"
                            data-column-id="8"
                            role="gridcell"
                            className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Quantity</p>
                        </div>
                        <div
                            id="cell-9-undefined"
                            data-column-id="9"
                            role="gridcell"
                            className=" justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Part $</p>
                        </div>
                        <div
                            id="cell-10-undefined"
                            data-column-id="10"
                            role="gridcell"
                            className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Service $</p>
                        </div>
                        <div
                            id="cell-10-undefined"
                            data-column-id="10"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Total $</p>
                        </div>
                        <div
                            id="cell-10-undefined"
                            data-column-id="11"
                            role="gridcell"
                            className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                            data-tag="allowRowEvents"
                        >
                            <p className="mb-0 font-size-12 font-weight-500 text-white">Actions</p>
                        </div>
                    </div>
                    <div className="scrollbar" id="style">
                        {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
                            <div
                                key={i}
                                id="row-0"
                                role="row"
                                className="sc-evZas cMMpBL rdt_TableRow table-row-baseline"
                                style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
                            >
                                <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell py-2">
                                    {/* <div class="checkbox">
                    <input type="checkbox" value=""></input>
                </div> */}
                                </div>
                                <div
                                    id="cell-1-undefined"
                                    data-column-id="1"
                                    role="gridcell"
                                    className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>{(i + 1) * 10}</div>
                                </div>
                                <div
                                    id="cell-2-undefined"
                                    data-column-id="2"
                                    role="gridcell"
                                    className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="icons-table mr-2 align-items-center d-flex justify-content-center">
                                        <span className="bundle"><svg version="1.1" id="Layer_1" style={{ width: "12px" }} viewBox="0 0 200 200">
                                            <path class="st0" d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
                      c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
                      c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
                      c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
                      l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
                      c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
                      c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
                      M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
                      c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
                      c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
                      c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
                      c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
                      c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
                      c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
                      c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
                      c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"/>
                                        </svg></span>
                                    </div>
                                    <div className="align-items-center d-flex justify-content-center">
                                        {bundleAndService.itemName}
                                    </div>
                                </div>
                                <div
                                    id="cell-3-undefined"
                                    data-column-id="3"
                                    role="gridcell"
                                    className="py-2 justify-content-between m-w-150 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="d-flex align-items-center" data-tag="allowRowEvents">
                                        {bundleAndService.customItemHeaderModel.itemHeaderDescription}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="description cursor mr-1"
                                            onClick={() => handleExpendedBundleServiceUpdate(i, bundleAndService)}
                                        >
                                            <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                                <g>
                                                    <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                          c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                          c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                          c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                          c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
                                                    <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                          c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                          c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                          c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className=""><KeyboardArrowDownIcon /></div>
                                    </div>
                                </div>
                                <div
                                    id="cell-4-undefined"
                                    data-column-id="4"
                                    role="gridcell"
                                    className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="icons-table overflow-visible mr-2 align-items-center d-flex justify-content-center">
                                        <span className="bundle"><svg version="1.1" id="Layer_1" style={{ width: "12px" }} viewBox="0 0 200 200">
                                            <path class="st0" d="M191,51.6c-3.2-10.2-9.7-15.2-19.7-15.2c-0.5,0-1,0-1.5,0c-3.3,0.2-6.8,0.2-11.1,0.2c0,0,0,0,0,0
                      c-2.9,0-5.9,0-8.7-0.1c-2.9,0-5.9-0.1-8.8-0.1h-1.9c0-0.2,0-0.3,0-0.5c0-1.9,0-3.7,0-5.5c-0.2-11.3-7.2-19.4-16.8-19.6
                      c-7.4-0.1-14.9-0.2-22.4-0.2c-7.4,0-15,0.1-22.4,0.2c-9.7,0.2-16.6,8.2-16.8,19.5c0,1.7,0,3.5,0,5.3c0,0.2,0,0.4,0,0.7
                      c-0.5,0-1,0.1-1.5,0.1c-2.8,0-5.6,0-8.4,0.1c-3,0-6.2,0.1-9.3,0.1c-4.4,0-8-0.1-11.3-0.2c-0.5,0-1,0-1.5,0c-10.1,0-16.5,5-19.7,15.2
                      l-0.1,0.3v119.5l0.1,0.3c3.3,10.4,9.9,15.2,20.9,15.2l0.2,0c23.3-0.1,46.8-0.2,69.9-0.2c23.3,0,46.8,0.1,69.8,0.2l0.2,0
                      c11,0,17.6-4.8,20.9-15.2l0.1-0.3V51.9L191,51.6z M127.3,35.6c0,0.2,0,0.5,0,0.7H72.8c0-0.3,0-0.5,0-0.8c-0.1-2.1-0.1-4.1,0.1-6
                      c0.3-3.4,2.2-5.4,5.1-5.4c7.3,0,14.8-0.1,22.3-0.1c7,0,14.3,0,21.6,0.1c4.2,0,5.2,3.7,5.3,5.9C127.4,31.8,127.3,33.6,127.3,35.6z
                      M104.8,101.2v12.1h-9.7v-12.1H104.8z M179,88.6c0,6.6-2.3,7.9-6.6,7.9c-8,0-16,0-23.9,0l-31.3,0c0-0.5,0-0.9,0-1.4
                      c0-4.4-2.4-7.1-6.3-7.2c-3.6-0.1-7.2-0.1-10.8-0.1c-3.6,0-7.2,0-10.8,0.1c-3,0-6.3,2-6.3,7.2c0,0.4,0,0.8,0,1.3c-0.4,0-0.9,0-1.3,0
                      c-10.5,0-21,0-31.5,0c-7.4,0-14.8,0-22.2,0c-4.9,0-6.9-1.2-6.9-8.3c0-11.9,0-21.6,0-30.5c0-6.7,2.2-7.9,6.6-7.9
                      c24.1,0,48.3,0,72.4,0c24.1,0,48.3,0,72.4,0c4.3,0,6.5,1.2,6.5,8C179,68.2,179,78.6,179,88.6z M21,165.2c0-16.7,0-33.6,0-50
                      c0,0,0-6.2,0-6.2c0.9,0.1,1.8,0.1,2.8,0.2c3.6,0.3,7.4,0.5,11.1,0.6c5.9,0,12.3,0.1,20.1,0.1c4.3,0,8.7,0,13,0c4.3,0,8.7,0,13,0H83
                      c0,0.5,0,1,0,1.6c0,2.6,0,5.1,0,7.6c0.1,3.9,0.9,7.8,7,7.9c2.1,0,4.1,0,6.2,0c1.4,0,2.8,0,4.2,0c1.4,0,2.8,0,4.2,0
                      c1.8,0,3.7,0,5.5,0h0.1c2.1,0,3.8-0.6,5-1.8c1.3-1.3,2-3.3,1.9-5.9c0-2.5,0-5.1,0-7.8c0-0.5,0-1,0-1.6h2.1c4.5,0,8.9,0,13.4,0
                      c4.5,0,8.9,0,13.4,0c9.2,0,16.4,0,23.1-0.1c2.8,0,5.6-0.3,8.5-0.7c0.5-0.1,1-0.1,1.5-0.2l0,16.7c0,13.1,0,26.2,0,39.3
                      c0,7.4-1.8,8.7-7.3,8.7c-23.3,0-46.6,0-69.9,0c-24.5,0-49,0-73.6,0C22.9,173.6,21,172.3,21,165.2z"/>
                                        </svg></span>
                                    </div>
                                    <div className="align-items-center d-flex" data-tag="allowRowEvents">
                                        {bundleAndService.customItemHeaderModel.itemHeaderStrategy}
                                    </div>
                                </div>
                                <div
                                    id="cell-5-undefined"
                                    data-column-id="5"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="d-flex " data-tag="allowRowEvents">SJ1034
                                    </div>
                                    <div
                                        className="description cursor mr-1"
                                        onClick={() => setBundleServiceShow(true)}
                                    >
                                        <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                            <g>
                                                <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                          c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                          c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                          c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                          c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
                                                <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                          c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                          c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                          c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    id="cell-6-undefined"
                                    data-column-id="6"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="d-flex " data-tag="allowRowEvents">RB1034</div>
                                    <div
                                        className="description mr-1"
                                    >
                                        <svg style={{ width: "12px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                            <g>
                                                <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                          c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                          c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                          c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                          c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
                                                <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                          c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                          c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                          c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    id="cell-7-undefined"
                                    data-column-id="7"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div className="d-flex " data-tag="allowRowEvents">250 hours</div>
                                </div>
                                <div
                                    id="cell-8-undefined"
                                    data-column-id="8"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>4</div>
                                    <div className="funds-grey">

                                    </div>
                                </div>
                                <div
                                    id="cell-9-undefined"
                                    data-column-id="9"
                                    role="gridcell"
                                    className=" justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>4</div>
                                    <div className="funds-grey">

                                    </div>
                                </div>
                                <div
                                    id="cell-10-undefined"
                                    data-column-id="10"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>4</div>
                                    <div
                                        className="funds-grey "
                                    >
                                    </div>
                                </div>
                                <div
                                    id="cell-10-undefined"
                                    data-column-id="10"
                                    role="gridcell"
                                    className="justify-content-between py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>4</div>
                                    <div
                                        className="funds-grey cursor"
                                        onClick={() => showPriceDataOfBundleOrService(bundleAndService)}
                                    >
                                        <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                            <g>
                                                <g>
                                                    <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
                          C74.2,101.4,70.7,105,66.3,105.1z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
                          C103.4,89.1,106.9,92.9,106.8,97.2z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
                          C135.6,88.9,139.3,92.5,139.4,96.8z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                          C70.7,121.6,74.3,125.2,74.3,129.6z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                          C103.2,121.5,106.8,125.2,106.8,129.5z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                          C70.7,154.1,74.3,157.7,74.3,162.1z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                          C90.7,157.7,94.3,154.1,98.6,154z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                          C135.8,121.5,139.4,125.2,139.4,129.5z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                          C123.2,157.7,126.8,154.1,131.1,154z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                          c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                          c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
                                                </g>
                                                <g>
                                                    <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                          S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                          c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    id="cell-10-undefined"
                                    data-column-id="11"
                                    role="gridcell"
                                    className="py-2 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                                    data-tag="allowRowEvents"
                                >
                                    <div>
                                        <Tooltip title="View">
                                            <Link
                                                to="#"
                                                className="px-1"
                                                onClick={() => handleExpendedBundleServiceUpdate(i, bundleAndService)}
                                            >
                                                <VisibilityOutlinedIcon />
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="p-5">
                        <div className="border border-radius-10">
                            <div className="d-flex align-items-center border-bottom justify-content-between p-3">
                                <div className="d-flex align-items-center">
                                    <h6 className="mb-0 font-weight-600 font-size-14 mr-3">Components</h6>
                                    <div className="d-flex align-items-center">
                                        <a href="#" className="mr-2">
                                            <span><ModeEditOutlineOutlinedIcon /></span>
                                        </a>
                                        <a href="#" className="mr-2">
                                            <span><ShareOutlinedIcon /></span>
                                        </a>
                                        <a href="#" className="">
                                            <span><SearchIcon /></span>
                                        </a>
                                    </div>
                                </div>
                                <div className="border-left d-flex align-items-center">
                                    <a href="#" style={{ whiteSpace: "pre" }} className="btn-sm"><span className="mr-2"><AddIcon /></span>Add</a>
                                </div>
                            </div>
                            <ul className="mb-0 component-li">
                                <li className="border-bottom p-3">
                                    <div className="d-flex align-items-center">
                                        <div class="checkbox mr-3">
                                            <input type="checkbox" value=""></input>
                                        </div>
                                        <p className="mb-0 font-size-14">Component Code</p>
                                    </div>
                                </li>
                                <li className="border-bottom p-3">
                                    <div className="d-flex align-items-center">
                                        <div class="checkbox mr-3">
                                            <input type="checkbox" value=""></input>
                                        </div>
                                        <p className="mb-0 font-size-14">Component Code</p>
                                    </div>
                                </li>
                                <li className="border-bottom p-3">
                                    <div className="d-flex align-items-center">
                                        <div class="checkbox mr-3">
                                            <input type="checkbox" value=""></input>
                                        </div>
                                        <p className="mb-0 font-size-14">Component Code</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* </> : <></>} */}

        </div>
    );

    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid ">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <h5 className="font-weight-600 mb-0">Custom Portfolio Template</h5>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="ml-3">
                                    <Select
                                        className="customselectbtn1"
                                        onChange={(e) => handleOption3(e)}
                                        options={versionOption}
                                        value={value3}
                                    />
                                </div>

                                <div className="ml-3">
                                    <Select
                                        className="customselectbtn"
                                        onChange={(e) => handleOption2(e)}
                                        options={statusOption}
                                        value={value2}
                                    />
                                </div>
                                <div className="rating-star">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <IconButton
                                            className="btn bg-primary text-white font-size-14 pr-0 ml-2"
                                            style={{ borderRadius: "5px" }}
                                            onClick={handleClick}
                                            size="small"
                                            aria-controls={open ? "account-menu" : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? "true" : undefined}
                                        >
                                            <span className="convert mx-2">
                                                Convert to
                                                <span>
                                                    <KeyboardArrowDownIcon />
                                                </span>
                                            </span>
                                        </IconButton>
                                    </Box>
                                    <Menu className=""
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&:before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform: "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                    >
                                        <MenuItem className="custommenu">Templates</MenuItem>
                                        {/* <MenuItem className="custommenu">Standard Job</MenuItem>
                                        <MenuItem className="custommenu">Kit</MenuItem> */}
                                        <MenuItem className="custommenu" data-toggle="modal" data-target="#quotecreat">
                                            Quote
                                        </MenuItem>
                                        <Divider />
                                    </Menu>
                                </React.Fragment>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <a href="#" className="ml-3 font-size-14" title="Share">
                                    <img src={shareIcon}></img>
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 font-size-14"
                                    title="Items to Review"
                                >
                                    <img src={folderaddIcon}></img>
                                </a>
                                <a href="#" className="ml-3 font-size-14" title="Upload">
                                    <img src={uploadIcon}></img>
                                </a>
                                {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
                                <a href="#" className="ml-3 font-size-14" title="Delete">
                                    <img src={deleteIcon}></img>
                                </a>
                                <a href="#" className="ml-3 font-size-14" title="Copy">
                                    <img src={copyIcon}></img>
                                </a>
                                <DropdownButton
                                    className="customDropdown ml-2"
                                    id="dropdown-item-button"
                                >
                                    <Dropdown.Item
                                        as="button"
                                        // data-toggle="modal" data-target="#versionpopup2"
                                        onClick={() => setVersionPopup(true)}
                                    >
                                        New Versions
                                    </Dropdown.Item>
                                    <Dropdown.Item as="button" data-toggle="modal" data-target="#myModal2">Show Errors</Dropdown.Item>
                                    <Dropdown.Item as="button">Review</Dropdown.Item>
                                </DropdownButton>

                            </div>
                        </div>
                        {/* <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            
                        </div> */}
                    </div>
                    <div className="card p-4 mt-5">
                        <h5 className="d-flex align-items-center mb-0">
                            <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                            {/* <div class="input-group icons border-radius-10 border">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={searchLogo} /></span>
                                </div>
                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                            </div> */}
                        </h5>
                        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="General" value={"general"} />
                                        <Tab label="Validity " value={"validity"} />
                                        <Tab label="Strategy" value={"strategy"} />
                                        <Tab label="Price" value={"price"} />
                                        <Tab label="Price Agreement" value={"priceAgreement"} />
                                        <Tab label="Coverage" value={"coverage"} />
                                        <Tab label="Administrative" value={"administrative"} />
                                    </TabList>
                                </Box>
                                <TabPanel value={"general"}>
                                    <div className="row mt-4 input-fields">
                                        {/* <div className="col-md-3 col-sm-3">
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
                                            </div>
                                        </div> */}
                                        {/* <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                   SOLUTION ID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10"
                                                    placeholder="(Auto-generated)"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    SOLUTION{/*  NAME */} CODE
                                                    {/* SOLUTION NAME */}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={generalComponentData.name}
                                                    onChange={handleGeneralInputChange}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    {/* SERVICE {prefilgabelGeneral} DESCRIPTION (IF ANY) */}
                                                    SOLUTION DESCRIPTION
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={generalComponentData.description}
                                                    onChange={handleGeneralInputChange}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    REFERENCE
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="externalReference"
                                                    placeholder="Reference"
                                                    value={generalComponentData.externalReference}
                                                    onChange={handleGeneralInputChange}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                    CUSTOMER SEGMENT
                                                </label>
                                                <Select
                                                    onChange={handleCustomerSegmentChange}
                                                    className="text-primary"
                                                    value={generalComponentData.customerSegment}
                                                    options={customerSegmentKeyValue}
                                                    defa
                                                // options={strategyList}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3 col-sm-3 d-flex justify-content-between align-items-center">
                                            <div className=" d-flex justify-content-between align-items-center">
                                                <div>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Switch checked={flagTemplate} />}
                                                            label=" FLAG FOR TEMPLATE"
                                                            value={flagTemplate}
                                                            onChange={(e) => setFlagTemplate(e.target.checked)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 d-flex justify-content-between align-items-center">
                                            <div className=" d-flex justify-content-between align-items-center">
                                                <div>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Switch checked={flagCommerce} />}
                                                            label=" FLAG FOR COMMERCE"
                                                            value={flagCommerce}
                                                            onChange={(e) => setFlagCommerce(e.target.checked)}
                                                        />
                                                    </FormGroup>
                                                </div>
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
                                                    <h6 className="font-weight-500 text-primary font-size-17">
                                                        CVA - Premium plan
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PORTFOLIO DESCRIPTION
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">
                                                        Premium Customer Value Agreement D8T and D6T
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        SERVICE PROGRAM DESCRIPTION (IF ANY)
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        REFERENCE
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">NA</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CUSTOMER SEGMENT
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">Construction</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </TabPanel>

                                <TabPanel value={"validity"}>

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
                                                                    className="form-controldate border-radius-10 text-primary"
                                                                    label=""
                                                                    value={validityData.fromDate}
                                                                    onChange={(e) =>
                                                                        setValidityData({
                                                                            ...validityData,
                                                                            fromDate: e,
                                                                            inputFlag: false,
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
                                                                    className="form-controldate border-radius-10 text-primary"
                                                                    label=""
                                                                    format="dd/MM/yyyy"
                                                                    value={validityData.toDate}
                                                                    onChange={(e) =>
                                                                        setValidityData({
                                                                            ...validityData,
                                                                            toDate: e,
                                                                            dateFlag: true,
                                                                            inputFlag: false,
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
                                            <div className="row input-fields">
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
                                                                        className="select-input text-primary"
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
                                                                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
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
                                                                        className="select-input text-primary"
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
                                                                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
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

                                <TabPanel value={"strategy"}>
                                    <div className="row input-fields">
                                        {/* <div className="col-md-4 col-sm-4">
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
                                            </div>
                                        </div>
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
                                                />
                                            </div>
                                        </div> */}
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
                                                    className="text-primary"
                                                    value={stratgyResponseTimeKeyValue}
                                                    onChange={(e) => setStratgyResponseTimeKeyValue(e)}
                                                />
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
                                                    className="text-primary"
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
                                                    className="text-primary"
                                                    value={stratgyGeographicKeyValue}
                                                    onChange={(e) => setStratgyGeographicKeyValue(e)}
                                                    placeholder="Geographic"
                                                />
                                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4">
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
                                                    isLoading={
                                                        machineTypeKeyValueList.length > 0 ? false : true
                                                    }
                                                />
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
                                                    options={lifeStageOfMachineKeyValueList}
                                                    value={lifeStageOfMachineKeyValue}
                                                    onChange={(e) => setLifeStageOfMachineKeyValue(e)}
                                                    isLoading={
                                                        lifeStageOfMachineKeyValueList.length > 0 ? false : true
                                                    }
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    SOLUTION TYPE
                                                </label>
                                                <Select
                                                    options={solutionTypeList}
                                                    value={solutionTypeListKeyValue}
                                                    // onChange={(e) => setSelectedOption(e)}
                                                    onChange={(e) => HandleSolutionType(e)}
                                                    className="text-primary"
                                                // isLoading={
                                                //     lifeStageOfMachineKeyValueList.length > 0 ? false : true
                                                // }
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    SOLUTION LEVEL
                                                </label>
                                                <Select
                                                    options={solutionLevelList}
                                                    className="text-primary"
                                                    // defaultValue={selectedOption}
                                                    value={solutionLevelListKeyValue}
                                                    onChange={(e) => setSolutionLevelListKeyValue(e)}
                                                />
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
                                                    <h6 className="font-weight-500 text-primary font-size-17">PM</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CATEGORY USAGE
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">Contract</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        OPTIONALS
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">Misc</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        RESPONSE TIME
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">
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
                                                    <h6 className="font-weight-500 text-primary font-size-17">End Product</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        GEOGRAPHIC
                                                    </p>
                                                    <h6 className="font-weight-500 text-primary font-size-17">Field Support</h6>
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

                                <TabPanel value={"price"}>
                                    <div className="row input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE LIST
                                                </label>
                                                <Select
                                                    // defaultValue={priceListKeyValue}
                                                    onChange={(e) => setPriceListKeyValue1(e)}
                                                    className="text-primary"
                                                    options={priceListKeyValue}
                                                    value={priceListKeyValue1}
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
                                                    // defaultValue={selectedOption}
                                                    className="text-primary"
                                                    onChange={(e) => setPriceMethodKeyValue1(e)}
                                                    options={priceMethodKeyValue}
                                                    value={priceMethodKeyValue1}
                                                    placeholder="required"
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
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
                                                <div className="d-flex align-items-center date-box w-100">
                                                    <div className="form-group w-100">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                variant="inline"
                                                                format="dd/MM/yyyy"
                                                                className="form-controldate border-radius-10"
                                                                label=""
                                                                name="preparedOn"
                                                                value={priceDetails.priceDate}
                                                                onChange={(e) =>
                                                                    setPriceDetails({
                                                                        ...priceDetails,
                                                                        priceDate: e,
                                                                    })
                                                                }
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                                {/* <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    className="text-primary"
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    {/* <h6>PRICES</h6> */}
                                    <div className="row input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    PRICE TYPE
                                                </label>
                                                <Select
                                                    // defaultValue={priceTypeKeyValue}
                                                    className="text-primary"
                                                    onChange={(e) => setPriceTypeKeyValue1(e)}
                                                    options={priceTypeKeyValue}
                                                    value={priceTypeKeyValue1}
                                                    placeholder="placeholder (Optional)"
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    {/* PRICE{" "} */}
                                                    NET PRICE{" "}
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control border-radius-10 text-primary"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    // placeholder="$100"
                                                    placeholder="Auto Generated"
                                                    value={pricePriceData}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group date-box">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    for="exampleInputEmail1"
                                                >
                                                    ADDITIONAL
                                                </label>
                                                <div className=" d-flex form-control-date">

                                                    <div className="">
                                                        <Select
                                                            onChange={(e) => setPriceAdditionalHeadKeyValue1(e)}
                                                            className="text-primary"
                                                            isClearable={true}
                                                            // value={options}
                                                            value={priceAdditionalHeadKeyValue1}
                                                            options={priceHeadTypeKeyValue}
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-top-left-0 text-primary rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="optional"
                                                        value={additionalPriceValue}
                                                        onChange={(e) => setAdditionalPriceValue(e.target.value)}
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
                                                        className="select-input text-primary"
                                                        // defaultValue={selectedOption}
                                                        onChange={(e) => setPriceEscalationHeadKeyValue1(e)}
                                                        options={priceHeadTypeKeyValue}
                                                        value={priceEscalationHeadKeyValue1}
                                                        placeholder="Select "
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="optional"
                                                        value={escalationPriceValue}
                                                        onChange={(e) => setEscalationPriceValue(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row input-fields">

                                    </div> */}
                                    <hr />
                                    <div className="row input-fields">
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
                                                    className="form-control border-radius-10 text-primary"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    // placeholder="$100"
                                                    placeholder="Auto Generated"
                                                    value={priceCalculatedPrice}
                                                    disabled
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
                                                        className="select-input text-primary"
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        // optionals={options}
                                                        options={priceHeadTypeKeyValue}
                                                        placeholder="placeholder "
                                                    />
                                                    <input
                                                        type="email"
                                                        className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
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
                                            // onClick={() => setValue("5")}
                                            onClick={handleNextClick}
                                            id="price"
                                            className="btn btn-light"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>

                                <TabPanel value={"priceAgreement"}>
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
                                            onClick={handleNextClick}
                                            className="btn btn-light"
                                            id="priceAgreement"
                                        >
                                            Save & Next
                                        </button>
                                    </div>
                                </TabPanel>

                                <TabPanel value={"coverage"}>
                                    <ul class="submenu templateResultheading accordion" style={{ display: 'block' }}>
                                        <li><a className="cursor result" >Search Coverage</a></li>
                                    </ul>
                                    <div
                                        className="custom-table card p-1 "
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
                                                <Link to="#" onClick={() => setOpen(true)} className="btn bg-primary text-white">
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
                                                    customStyles={customTableStyles}
                                                    selectableRows
                                                    onSelectedRowsChange={(state) => setFilterMasterData(state.selectedRows)}
                                                    pagination
                                                />
                                                <div>
                                                    <div className="text-right">
                                                        <input
                                                            // onClick={() => {
                                                            //     setSelectedMasterData(filterMasterData);
                                                            //     setMasterData([]);
                                                            // }}
                                                            onClick={handleCoverageCheckBoxData}
                                                            className="btn bg-primary text-white"
                                                            value="+ Add Selected"
                                                            // disabled={!flagIs}
                                                            disabled={filterMasterData.length == 0}
                                                        />
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
                                                    customStyles={customTableStyles}
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
                                                Save & Next
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </TabPanel>

                                <TabPanel value={"administrative"}>
                                    <div className="row input-fields">
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
                                                    className="form-control border-radius-10 text-primary"
                                                    name="preparedBy"
                                                    placeholder="Required (ex-abc@gmail.com)"
                                                    value={administrative.preparedBy}
                                                    onChange={handleAdministrativreChange}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
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
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="Optional (ex-abc@gmail.com)"
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
                                                        <div className="css-w8dmq8">*Mandatory</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row input-fields">
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
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="Optional (ex-abc@gmail.com)"
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
                                                    SALES OFFICE / BRANCH
                                                </label>
                                                <Select
                                                    onChange={(e) =>
                                                        setAdministrative({
                                                            ...administrative,
                                                            salesOffice: e,
                                                        })
                                                    }
                                                    className="text-primary"
                                                    options={salesOfficeOptions}
                                                    placeholder="Required"
                                                    value={administrative.salesOffice}
                                                    styles={FONT_STYLE_SELECT}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                                {/* <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    name="salesOffice"
                                                    placeholder="Required"
                                                    value={administrative.salesOffice}
                                                    onChange={handleAdministrativreChange}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    OFFER VALIDITY
                                                </label>
                                                <Select
                                                    // defaultValue={selectedOption}
                                                    onChange={(e) =>
                                                        setAdministrative({
                                                            ...administrative,
                                                            offerValidity: e,
                                                        })
                                                    }
                                                    className="text-primary"
                                                    options={validityOptions}
                                                    placeholder="Optional"
                                                    value={administrative.offerValidity}
                                                    styles={FONT_STYLE_SELECT}
                                                />
                                                <div className="css-w8dmq8">*Mandatory</div>
                                                {/* <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="Optional"
                                                    name="offerValidity"
                                                    value={administrative.offerValidity}
                                                    onChange={handleAdministrativreChange}
                                                /> */}
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
                                            Save
                                        </button>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                    {/* hide portfolio item querySearch */}
                    <div className="card mt-4 px-4">
                        <div className="row align-items-center mt-3">
                            <div className="col-11 mx-1">
                                <div className="d-flex align-items-center w-100">
                                    <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                                        <h5 className="mb-3 text-black">
                                            <span>Solution Items</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedSolutionItems.length > 0 ? <>
                            <div className="" style={{ minHeight: 200, height: "auto", width: '100%', backgroundColor: '#fff' }}>

                                <DataTable
                                    className=""
                                    title=""
                                    columns={selectedportfolioTempItemsColumn}
                                    data={selectedSolutionItems}
                                    customStyles={customTableStyles}
                                    expandableRows
                                    expandableRowExpanded={(row) => (row === currentExpendPortfolioItemRow)}
                                    expandOnRowClicked
                                    onRowClicked={(row) => setCurrentExpendPortfolioItemRow(row)}
                                    expandableRowsComponent={ExpandedComponent}
                                    onRowExpandToggled={(bool, row) => setCurrentExpendPortfolioItemRow(row)}
                                    pagination
                                />
                            </div>
                        </> : <></>}
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
                                                control={<Switch disabled={needOnlyParts} />}
                                                // label="With Spare Parts"
                                                label="With Parts"
                                                onChange={(e) => handleWithSparePartsCheckBox(e, "with")}
                                                // value={partsRequired}
                                                checked={partsRequired}
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled={needOnlyParts} />}
                                                label="I have Spare Parts"
                                                onChange={(e) => handleWithSparePartsCheckBox(e, "without")}
                                                checked={!partsRequired && !needOnlyParts}
                                            />
                                            <FormControlLabel
                                                control={<Switch />}
                                                label="I need only Spare Parts"
                                                onChange={(e) => handleNeedOnlySparePartsCheckBox(e)}
                                                checked={needOnlyParts}
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
                                                        control={<Switch disabled={needOnlyParts} />}
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
                                                control={<Switch disabled={needOnlyParts} />}
                                                // label="Travel Expenses"
                                                label="Misc Required"
                                                onChange={(e) => handleWithMiscCheckBox(e)}
                                                checked={miscRequired}
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label=" Lubricants"
                                            />
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="Tools"
                                            />
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
                                                        control={<Switch disabled={needOnlyParts} />}
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
                                            <FormControlLabel
                                                control={<Switch disabled />}
                                                label="Rotete Tires"
                                            />
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
                    <Modal show={open3} onHide={() => setOpen3(false)} size="md"
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
                            {/* <div className="recent-div p-3">
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
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                    <p className="font-size-12 mb-0">Part List </p>
                                </div>
                            </div> */}


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
                    <Modal
                        size="xl"
                        show={itemModelShow}
                        onHide={() => setItemModelShow(false)}
                    >
                        <Modal.Body>
                            <Box sx={{ typography: "body1" }}>
                                <TabContext value={tabs}>
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <TabList className="custom-tabs-div"
                                            onChange={(e, newValue) => setTabs(newValue)}
                                            aria-label="lab API tabs example"
                                        >
                                            <Tab label="Portfolio Item" value="1" />
                                            <Tab label="Service/Bundle" value="2" />
                                            {/* <Tab label="Solution" value="3" /> */}
                                            {/*use it in useCase-4 */}
                                            {/* {categoryUsageKeyValue1.value === "REPAIR_OR_REPLACE" && <Tab label="Component Data" value="4" />} */}
                                            <Tab label="Component Data" value="4" />
                                            <Tab label="Price Calculator" value="5" />
                                            <Tab label="Review" value="6" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">

                                        {!portfolioItemDataEditable ?
                                            <>
                                                <AddCustomPortfolioItem
                                                    stratgyTaskTypeKeyValue={stratgyTaskTypeKeyValue}
                                                    setTabs={setTabs}
                                                    getAddPortfolioItemDataFun={getAddPortfolioItemDataFun}
                                                    compoFlag="ITEM"
                                                    setBundleServiceNeed={setBundleServiceNeed}
                                                    createdBundleItems={createdBundleItems}
                                                    portfolioDataId={portfolioId}
                                                    itemModelShow={setItemModelShow}
                                                />
                                            </> :
                                            <>
                                                <AddCustomPortfolioItem
                                                    passItemEditRowData={passItemEditRowData}
                                                    handleItemEditSave={handleItemEditSave}
                                                    compoFlag="itemEdit"
                                                    compoFlagTest="itemEditPort"
                                                    setBundleServiceNeed={setBundleServiceNeed}
                                                />
                                            </>
                                        }


                                        {/*  */}
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <QuerySearchComp
                                            compoFlag="bundleSearch"
                                            options={[
                                                { label: "Make", value: "itemHeaderMake" },
                                                { label: "Family", value: "itemHeaderFamily" },
                                                { label: "Model", value: "model" },
                                                { label: "Prefix", value: "prefix" },
                                                // { label: "Item Id", value: "itemId" },
                                                { label: "Item Name", value: "itemName" },
                                                { label: "Description", value: "description" },
                                            ]}
                                            setTempBundleService1={setTempBundleService1}
                                            setLoadingItem={setLoadingItem}
                                        />
                                        {loadingItem === "01" ? ("loading") :
                                            <>
                                                {tempBundleService1.length > 0 && (<>
                                                    <DataTable
                                                        title=""
                                                        columns={tempBundleItemColumns1}
                                                        data={tempBundleService1}
                                                        customStyles={customStyles}
                                                        selectableRows
                                                        onSelectedRowsChange={(state) => setTempBundleService2(state.selectedRows)}
                                                        pagination
                                                    />{tempBundleService2.length > 0 && (<div className="row mt-5" style={{ justifyContent: "right" }}>
                                                        <button
                                                            type="button"
                                                            className="btn btn-light"
                                                            // onClick={() => {
                                                            //     setTempBundleService3(tempBundleService2)
                                                            //     setTempBundleService1([])
                                                            // }}
                                                            onClick={handleCreateCustomItem_SearchResult}
                                                        >
                                                            Add Selected
                                                        </button>
                                                    </div>)}
                                                </>)}
                                            </>

                                        }
                                        {tempBundleService3.length > 0 && <>
                                            <DataTable
                                                title=""
                                                columns={tempBundleItemColumns1New}
                                                data={tempBundleService3}
                                                customStyles={customStyles}
                                                expandableRows
                                                // expandableRowsComponent={ExpandedPriceCalculator}
                                                expandableRowsComponent={ExpendCustomItemTablePopup}
                                                onRowExpandToggled={handleExpandRowForPriceCalculator}
                                                pagination
                                            />
                                            <div className="row mt-5" style={{ justifyContent: "right" }}>
                                                <button type="button" className="btn btn-light"
                                                    onClick={handleContinueOfServiceOrBundle}>Continue</button>
                                            </div>
                                        </>}

                                    </TabPanel>
                                    <TabPanel value="3">
                                        <Solution setTabs={setTabs} />
                                    </TabPanel>
                                    <TabPanel value="4">
                                        <>
                                            <div className="ligt-greey-bg p-3 mb-5">
                                                {/* <div>
                                            <span className="mr-3">
                                                <FormatListBulletedOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related part list(s)</span>
                                            </span>
                                            <span className="mr-3">
                                                <AccessAlarmOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related template(s)</span>
                                            </span>
                                            <span>
                                                <SellOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related repair option</span>
                                            </span>
                                        </div> */}
                                                <div>
                                                    <span className="mr-3 cursor">
                                                        <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                                                        <span className="ml-2">Edit</span>
                                                    </span>
                                                    <span className="mr-3">
                                                        <SellOutlinedIcon className=" font-size-16" />
                                                        <span className="ml-2">Related repair option</span>
                                                    </span>
                                                    <span className="mr-3">
                                                        <FormatListBulletedOutlinedIcon className=" font-size-16" />
                                                        <span className="ml-2">Related Standard Job</span>
                                                    </span>
                                                    <span className="mr-3">
                                                        <AccessAlarmOutlinedIcon className=" font-size-16" />
                                                        <span className="ml-2">Related Kit</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row input-fields">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label className="text-light-dark font-size-14 font-weight-500">
                                                            Component Code
                                                        </label>

                                                        <div className="customselectsearch">
                                                            <input
                                                                type="text"
                                                                className="form-control border-radius-10 text-primary"
                                                                name="componentCode"
                                                                value={componentData.componentCode}
                                                                onChange={handleComponentChange}
                                                                autoComplete="off"
                                                                placeholder="Search Component Code Here"
                                                            />

                                                            {<ul className={`list-group customselectsearch-list scrollbar scrolbarCode style`}>
                                                                {componentData.codeSuggestions.map(
                                                                    (currentItem, j) => (
                                                                        <li className="list-group-item" key={j} onClick={(e) => handleComponentCodeSuggetionsClick(e, j)}
                                                                        >
                                                                            {currentItem.componentCode}
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label className="text-light-dark font-size-14 font-weight-500">
                                                            Component Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-radius-10"
                                                            name="description"
                                                            value={componentData.description}
                                                            onChange={handleComponentChange}
                                                            placeholder="Optional"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Make
                                                </label>
                                                <div className="customselectsearch">
                                                    <input
                                                        type="text"
                                                        className="form-control border-radius-10 text-primary"
                                                        name="make"
                                                        value={componentData.make}
                                                        onChange={handleComponentChange}
                                                        autoComplete="off"
                                                    // disable
                                                    />
                                                    {<ul className={`list-group customselectsearch-list scrollbar style`} id="scrollbarMake">
                                                        {componentData.makeSuggestions.map(
                                                            (currentItem, j) => (
                                                                <li className="list-group-item" key={j} onClick={(e) => handleComponentMakeSuggetionsClick(e, j)}>
                                                                    {currentItem.make}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Model
                                                </label>
                                                <div className="customselectsearch">
                                                    <input
                                                        type="text"
                                                        className="form-control border-radius-10 text-primary"
                                                        name="model"
                                                        value={componentData.model}
                                                        onChange={handleComponentChange}
                                                        autoComplete="off"
                                                    />
                                                    {<ul className={`list-group customselectsearch-list scrollbar style`} id="scrollbarModel">
                                                        {componentData.modelSuggestions.map(
                                                            (currentItem, j) => (
                                                                <li className="list-group-item" key={j} onClick={(e) => handleComponentModelSuggetionsClick(e, j)}>
                                                                    {currentItem.model}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">
                                                    Serial No.
                                                </label>
                                                <div className="customselectsearch">
                                                    <input
                                                        type="text"
                                                        className="form-control border-radius-10 text-primary"
                                                        name="serialNo"
                                                        value={componentData.serialNo}
                                                        onChange={handleComponentChange}
                                                        autoComplete="off"
                                                    />

                                                    {<ul className={`list-group customselectsearch-list scrollbar style`} id="scrolbarSerialNo">
                                                        {componentData.serialNoSuggestions.map(
                                                            (currentItem, j) => (
                                                                <li className="list-group-item" key={j} onClick={(e) => handleComponentSerialNoSuggetionsClick(e, j)}>
                                                                    {currentItem.family}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>}
                                                </div>
                                            </div>
                                        </div> */}
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
                                                            value={componentData.make}
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
                                                            value={componentData.model}
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
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label className="text-light-dark font-size-12 font-weight-500">
                                                            SERIAL #
                                                        </label>
                                                        <SearchBox
                                                            value={componentData.serialNo}
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
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mt-2 input-fields">
                                                <div className="col-md-6 col-sm-6 input-fields">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            PRICE METHOD
                                                        </label>
                                                        <Select
                                                            options={priceMethodKeyValue}
                                                            value={componentData.priceMethod}
                                                            name="priceMethod"
                                                            onChange={(e) => setComponentData({ ...componentData, priceMethod: e })}
                                                            placeholder="placeholder (Optional)"
                                                            className="text-primary"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            ADDITIONAL
                                                        </label>
                                                        <div className=" d-flex form-control-date">
                                                            <div className="">
                                                                <Select
                                                                    isClearable={true}
                                                                    value={componentData.priceAdditionalSelect}
                                                                    name="priceAdditionalSelect"
                                                                    onChange={(e) => setComponentData({ ...componentData, priceAdditionalSelect: e })}
                                                                    options={options}
                                                                    placeholder="Select"
                                                                    className="text-primary"
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                placeholder="10%"
                                                                // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                                                                value={componentData.priceAdditionalInput}
                                                                name="priceAdditionalInput"
                                                                onChange={handleComponentChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            PRICE ESCALATON
                                                        </label>
                                                        <div className=" d-flex align-items-center form-control-date">
                                                            <Select
                                                                className="select-input text-primary"
                                                                value={componentData.priceEscalationSelect}
                                                                name="priceEscalationSelect"
                                                                onChange={(e) => setComponentData({ ...componentData, priceEscalationSelect: e })}
                                                                options={options}
                                                                placeholder="placeholder "
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                placeholder="20%"
                                                                // defaultValue={props?.priceCalculator?.priceEscalationInput}
                                                                value={componentData.priceEscalationInput}
                                                                name="priceEscalationInput"
                                                                onChange={handleComponentChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            CALCULATED PRICE
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-radius-10 text-primary"
                                                            // defaultValue={props?.priceCalculator?.calculatedPrice}
                                                            value={componentData.calculatedPrice}
                                                            name="calculatedPrice"
                                                            onChange={handleComponentChange}
                                                            placeholder="$100"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            FLAT PRICE / ADJUSTED PRICE
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-radius-10 text-primary"
                                                            value={componentData.flatPrice}
                                                            name="flatPrice"
                                                            onChange={handleComponentChange}
                                                            placeholder="$100"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            DISCOUNT TYPE
                                                        </label>
                                                        <div className=" d-flex form-control-date">
                                                            <div className="">
                                                                <Select
                                                                    value={componentData.discountTypeSelect}
                                                                    name="discountTypeSelect"
                                                                    onChange={(e) => setComponentData({ ...componentData, discountTypeSelect: e })}
                                                                    isClearable={true}
                                                                    options={options}
                                                                    placeholder="Select"
                                                                    className="text-primary"
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                value={componentData.discountTypeInput}
                                                                name="discountTypeInput"
                                                                onChange={handleComponentChange}
                                                                placeholder="10%"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-5" style={{ justifyContent: "right" }}>
                                                <button
                                                    type="button"
                                                    onClick={handleComponentDataSave}
                                                    className="btn btn-light"
                                                >
                                                    Save and Continue
                                                </button>
                                            </div>
                                        </>
                                    </TabPanel>
                                    <TabPanel value="5">
                                        {/* <PriceCalculatorCustomItem
                  setTabs={setTabs}
                  priceCalculator={priceCalculator}
                  serviceOrBundlePrefix={serviceOrBundlePrefix}
                  getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                  // handleSavePrices={handleSavePrices}
                /> */}

                                        <div className="ligt-greey-bg p-3">
                                            <div>
                                                <span className="mr-3 cursor" onClick={() => setDisable(!disable)}>
                                                    <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                                                    <span className="ml-2">Edit</span>
                                                </span>
                                                <span className="mr-3">
                                                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                                                    <span className="ml-2"> Adjust price</span>
                                                </span>
                                                {/* <span className="mr-3">
                                            <FormatListBulletedOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">Related part list(s)</span>
                                        </span>
                                        <span className="mr-3">
                                            <AccessAlarmOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">Related service estimate(s)</span>
                                        </span> */}
                                                <span>
                                                    <SellOutlinedIcon className=" font-size-16" />
                                                    <span className="ml-2">Split price</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="row input-fields">
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            PRICE METHOD
                                                        </label>
                                                        <Select
                                                            options={priceMethodKeyValue}
                                                            className="text-primary"
                                                            // defaultValue={props?.priceCalculator?.priceMethod}
                                                            value={priceCalculator.priceMethod}
                                                            name="priceMethod"
                                                            onChange={(e) =>
                                                                setPriceCalculator({ ...priceCalculator, priceMethod: e })
                                                            }
                                                            placeholder="placeholder (Optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            CURRENCY
                                                        </label>
                                                        <Select
                                                            options={priceCurrencyKeyValue}
                                                            className="text-primary"
                                                            // defaultValue={props?.priceCalculator?.priceMethod}
                                                            value={priceCalculator.currency}
                                                            name="priceMethod"
                                                            onChange={(e) =>
                                                                setPriceCalculator({ ...priceCalculator, currency: e })
                                                            }
                                                            placeholder="placeholder (Optional)"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-14 font-weight-500"
                                                            htmlFor="exampleInputEmail1"
                                                        >
                                                            PRICE DATE
                                                        </label>
                                                        <div className="d-flex align-items-center date-box w-100">
                                                            <div className="form-group w-100">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <DatePicker
                                                                        variant="inline"
                                                                        format="dd/MM/yyyy"
                                                                        className="form-controldate border-radius-10"
                                                                        label=""
                                                                        name="preparedOn"
                                                                        value={priceCalculator.priceDate}
                                                                        onChange={(e) =>
                                                                            setPriceCalculator({
                                                                                ...priceCalculator,
                                                                                priceDate: e,
                                                                            })
                                                                        }
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-14 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            PRICE TYPE
                                                        </label>
                                                        <Select
                                                            // defaultValue={priceTypeKeyValue}
                                                            className="text-primary"
                                                            onChange={(e) =>
                                                                // setPriceTypeKeyValue1(e)
                                                                setPriceCalculator({ ...priceCalculator, priceType: e })
                                                            }
                                                            options={priceTypeKeyValue}
                                                            placeholder="placeholder (Optional)"
                                                            value={priceCalculator.priceType}
                                                        />
                                                        {/* <input
                  type="text"
                  className="form-control border-radius-10"
                  placeholder="Optional"
                  name="priceType"
                  disabled={disable}
                  value={itemPriceCalculator.priceType}
                  onChange={handleItemPriceCalculatorChange}
                /> */}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            ADDITIONAL
                                                        </label>
                                                        <div className=" d-flex form-control-date">
                                                            <div className="">
                                                                <Select
                                                                    // isClearable={true}
                                                                    className="text-primary"
                                                                    value={priceCalculator.priceAdditionalSelect}
                                                                    name="priceAdditionalSelect"
                                                                    onChange={(e) =>
                                                                        setPriceCalculator({
                                                                            ...priceCalculator,
                                                                            priceAdditionalSelect: e,
                                                                        })
                                                                    }
                                                                    // options={options}
                                                                    options={additionalPriceHeadTypeKeyValue}
                                                                    placeholder="Select"
                                                                // isDisabled
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                                                placeholder="10%"
                                                                // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                                                                value={priceCalculator.priceAdditionalInput}
                                                                name="priceAdditionalInput"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        priceAdditionalInput: e.target.value,
                                                                    })
                                                                }
                                                            // disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            PRICE ESCALATON
                                                        </label>
                                                        <div className=" d-flex align-items-center form-control-date">
                                                            <Select
                                                                className="select-input text-primary"
                                                                id="priceEscalationSelect"
                                                                options={priceHeadTypeKeyValue}
                                                                placeholder="placeholder "
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        priceEscalationSelect: e,
                                                                    })
                                                                }
                                                                value={priceCalculator.priceEscalationSelect}
                                                            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
                                                            // value={expandedPriceCalculator.priceEscalationSelect}
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                                                placeholder="20%"
                                                                id="priceEscalationInput"
                                                                value={priceCalculator.priceEscalationInput}
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        priceEscalationInput: e.target.value
                                                                    })
                                                                }
                                                            // defaultValue={data.itemBodyModel.priceEscalation}
                                                            // value={expandedPriceCalculator.priceEscalationInput}
                                                            // onChange={handleExpandePriceChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div class="form-group mt-1">
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                style={{
                                                                    alignItems: "start",
                                                                    marginLeft: 0,
                                                                }}
                                                                control={
                                                                    <Switch1
                                                                        checked={priceCalculator.flatRateIndicator}
                                                                        onChange={(e) =>
                                                                            handleFlatPriceIndicator(e)
                                                                        }
                                                                    />
                                                                }
                                                                labelPlacement="top"
                                                                label={
                                                                    <span className="text-light-dark font-size-12 font-weight-500">
                                                                        FLAT RATE INDICATOR
                                                                    </span>
                                                                }
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            FLAT PRICE / ADJUSTED PRICE
                                                        </label>
                                                        <input
                                                            // type="text"
                                                            type="number"
                                                            className="form-control border-radius-10 text-primary"
                                                            value={priceCalculator.flatPrice}
                                                            name="flatPrice"
                                                            onChange={(e) =>
                                                                setPriceCalculator({
                                                                    ...priceCalculator,
                                                                    flatPrice: e.target.value,
                                                                })
                                                            }
                                                            disabled={!priceCalculator.flatRateIndicator}
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            for="exampleInputEmail1"
                                                        >
                                                            DISCOUNT TYPE
                                                        </label>
                                                        <div className=" d-flex form-control-date">
                                                            <div className="">
                                                                <Select
                                                                    value={priceCalculator.discountTypeSelect}
                                                                    name="discountTypeSelect"
                                                                    className="text-primary"
                                                                    onChange={(e) =>
                                                                        setPriceCalculator({
                                                                            ...priceCalculator,
                                                                            discountTypeSelect: e,
                                                                        })
                                                                    }
                                                                    isClearable={true}
                                                                    options={discountTypeOptions}
                                                                    placeholder="Select"
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                                                value={priceCalculator.discountTypeInput}
                                                                name="discountTypeInput"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        discountTypeInput: e.target.value,
                                                                    })
                                                                }
                                                                placeholder="10%"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="form-group date-box">
                                                        <label
                                                            className="text-light-dark font-size-12 font-weight-500"
                                                            htmlFor="exampleInputEmail1"
                                                        >
                                                            PRICE BREAK DOWN
                                                        </label>
                                                        <div className=" d-flex form-control-date">
                                                            <Select
                                                                className="select-input text-primary"
                                                                defaultValue={selectedOption}
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        priceBrackDownType: e,
                                                                    })}
                                                                value={priceCalculator.priceBrackDownType}
                                                                options={priceHeadTypeKeyValue}
                                                                placeholder="Select "
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                                                id="exampleInputEmail1"
                                                                aria-describedby="emailHelp"
                                                                placeholder="optional"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        priceBrackDownPercantage: e.target.value,
                                                                    })
                                                                }
                                                                value={priceCalculator.priceBrackDownPercantage}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-radius-10 mt-3 py-2 px-3">
                                                <div className="row input-fields">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                YEAR
                                                            </label>


                                                            <Select
                                                                // options={[
                                                                //   { value: "1", label: "1" },
                                                                //   { value: "2", label: "2" },
                                                                //   { value: "3", label: "3" },
                                                                // ]}
                                                                options={yearsOption}
                                                                placeholder="Select..."
                                                                className="text-primary"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        year: e
                                                                    })
                                                                }
                                                                value={priceCalculator.year}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                NO. OF YEARS
                                                            </label>
                                                            <input
                                                                type="number"
                                                                // type="text"
                                                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                placeholder="No. of Years"
                                                                // defaultValue={props?.priceCalculator?.startUsage}
                                                                // value={priceCalculator.startUsage}
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        noOfYear: e.target.value,
                                                                    })}
                                                                value={priceCalculator.noOfYear}
                                                                name="noOfYear"
                                                            />
                                                            {/* <Select
                                  options={[
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                  ]}
                                  placeholder="Select..."
                                  className="text-primary"
                                  onChange={(e) =>
                                    setAddportFolioItem({ ...addPortFolioItem, noOfYear: e })
                                  }
                                  value={addPortFolioItem.noOfYear}
                                /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
                                                <div className="row input-fields">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                START USAGE
                                                            </label>
                                                            <div
                                                                className=" d-flex form-control-date"
                                                                style={{ overflow: "hidden" }}
                                                            >
                                                                <input
                                                                    type="number"
                                                                    // type="text"
                                                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                    placeholder="10,000 hours"
                                                                    // defaultValue={props?.priceCalculator?.startUsage}
                                                                    // value={priceCalculator.startUsage}
                                                                    onChange={(e) =>
                                                                        setPriceCalculator({
                                                                            ...priceCalculator,
                                                                            startUsage: e.target.value,
                                                                        })}
                                                                    value={priceCalculator.startUsage}
                                                                    name="startUsage"
                                                                />
                                                                <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
                                                            </div>
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                END USAGE
                                                            </label>
                                                            <div
                                                                className=" d-flex form-control-date"
                                                                style={{ overflow: "hidden" }}
                                                            >
                                                                <input
                                                                    type="number"
                                                                    // type="text"
                                                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                    placeholder="16,000 hours"
                                                                    // defaultValue={props?.priceCalculator?.startUsage}
                                                                    // value={priceCalculator.startUsage}
                                                                    onChange={(e) =>
                                                                        setPriceCalculator({
                                                                            ...priceCalculator,
                                                                            endUsage: e.target.value,
                                                                        })}
                                                                    value={priceCalculator.endUsage}
                                                                    name="endUsage"
                                                                />
                                                                <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
                                                            </div>
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                USAGE TYPE
                                                            </label>
                                                            <Select
                                                                options={usageTypeOption}
                                                                placeholder="Planned Usage"
                                                                className="text-primary"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        usageType: e,
                                                                    })
                                                                }
                                                                value={priceCalculator.usageType}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                FREQUENCY
                                                            </label>
                                                            <Select
                                                                options={frequencyOptions}
                                                                placeholder="Select....."
                                                                className="text-primary"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        frequency: e,
                                                                    })
                                                                }
                                                                value={priceCalculator.frequency}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                UNIT
                                                            </label>
                                                            <Select
                                                                options={[
                                                                    { value: "per Hr", label: "per Hr" },
                                                                    { value: "per Km", label: "per Km" },
                                                                    { value: "per Miles", label: "per Miles" },
                                                                    { value: "per year", label: "per year" },
                                                                    { value: "per month", label: "per month" },
                                                                    { value: "per day", label: "per day" },
                                                                    { value: "per quarter", label: "per quarter" },
                                                                ]}
                                                                placeholder="Select..."
                                                                className="text-primary"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator, unit: e
                                                                    })
                                                                }
                                                                value={priceCalculator.unit}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                RECOMMENDED VALUE
                                                            </label>
                                                            <div
                                                                className=" d-flex form-control-date"
                                                                style={{ overflow: "hidden" }}
                                                            >
                                                                <input
                                                                    type="number"
                                                                    // type="text"
                                                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                                                    placeholder="Recommended Value"
                                                                    // defaultValue={props?.priceCalculator?.startUsage}
                                                                    // value={priceCalculator.startUsage}
                                                                    onChange={(e) =>
                                                                        setPriceCalculator({
                                                                            ...priceCalculator,
                                                                            recommendedValue: e.target.value,
                                                                        })}
                                                                    value={priceCalculator.recommendedValue}
                                                                    name="recommendedValue"
                                                                // name="startUsage"
                                                                // onChange={(e) =>
                                                                //   setPriceCalculator({
                                                                //     ...priceCalculator,
                                                                //     startUsage: e.target.value,
                                                                //   })
                                                                // }
                                                                />
                                                                <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
                                                            </div>
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="form-group w-100">
                                                            <label
                                                                className="text-light-dark font-size-12 font-weight-500"
                                                                for="exampleInputEmail1"
                                                            >
                                                                NO. OF EVENTS
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control border-radius-10 text-primary"
                                                                placeholder="NO. OF EVENTS"
                                                                onChange={(e) =>
                                                                    setPriceCalculator({
                                                                        ...priceCalculator,
                                                                        numberOfEvents: e.target.value,
                                                                    })
                                                                }
                                                                value={priceCalculator.numberOfEvents}
                                                            />
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div class="form-group mt-1">
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    style={{
                                                                        alignItems: "start",
                                                                        marginLeft: 0,
                                                                    }}
                                                                    control={
                                                                        <Switch1
                                                                            checked={extWorkData.flatRateIndicator}
                                                                            onChange={(e) =>
                                                                                setExtWorkData({
                                                                                    ...extWorkData,
                                                                                    flatRateIndicator: e.target.checked,
                                                                                    adjustedPrice: e.target.checked
                                                                                        ? extWorkData.adjustedPrice
                                                                                        : 0.0,
                                                                                })
                                                                            }
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
                                                    <Link to="#" className="btn border mr-4">Cancel</Link>
                                                    <Link to="#" className="btn d-flex align-items-center border bg-primary text-white">
                                                        <span className="mr-2 funds">
                                                            <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                                                <g>
                                                                    <g>
                                                                        <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
                              C74.2,101.4,70.7,105,66.3,105.1z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
                              C103.4,89.1,106.9,92.9,106.8,97.2z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
                              C135.6,88.9,139.3,92.5,139.4,96.8z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C70.7,121.6,74.3,125.2,74.3,129.6z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C103.2,121.5,106.8,125.2,106.8,129.5z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C70.7,154.1,74.3,157.7,74.3,162.1z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                              C90.7,157.7,94.3,154.1,98.6,154z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C135.8,121.5,139.4,125.2,139.4,129.5z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                              C123.2,157.7,126.8,154.1,131.1,154z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                              c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                              c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
                                                                    </g>
                                                                    <g>
                                                                        <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                              S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                              c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </span>Calculate<span className="ml-2"><KeyboardArrowDownIcon /></span></Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="d-block mr-4">
                                                        <p className="mb-0 font-size-14 text-grey">NET PRICE</p>
                                                        <p className="mb-0 font-size-14 text-black">${priceCalculator.netPrice}</p>
                                                    </div>
                                                    <div className="d-block">
                                                        <p className="mb-0 font-size-14 text-grey">TOTAL PRICE</p>
                                                        <p className="mb-0 font-size-14 text-black">${priceCalculator.totalPrice}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <a
                                                        href="#"
                                                        className="btn text-white bg-primary"
                                                        onClick={handleItemPriceCalculatorSave}
                                                    >
                                                        Save
                                                    </a>
                                                </div>
                                            </div>
                                            {/* <div className="m-3 text-right">
                                        <a
                                            href="#"
                                            className="btn text-white bg-primary"
                                            onClick={handleItemPriceCalculatorSave}
                                        >
                                            Save
                                        </a>
                                    </div> */}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="6">
                                        {loadingItem === "02" ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <Loader
                                                    type="spinner-default"
                                                    bgColor={"#872ff7"}
                                                    title={"spinner-default"}
                                                    color={"#FFFFFF"}
                                                    size={35}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="custom-table  card"
                                                style={{ height: 400, width: "100%" }}
                                            >
                                                <DataTable
                                                    title=""
                                                    columns={tempBundleCustomItemColumns}
                                                    data={tempBundleItems}
                                                    customStyles={customStyles}
                                                    expandableRows
                                                    // expandableRowsComponent={ExpandedComponent}
                                                    expandableRowsComponent={ExpendedModelComponent}
                                                    pagination
                                                />
                                            </div>
                                        )}
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Modal.Body>
                        <Modal.Footer>
                            {tabs === "6" && (
                                <Button variant="primary" onClick={addTempItemIntobundleItem}>
                                    Add Selected
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal>

                    <div
                        class="modal fade"
                        id="quotecreat"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog" role="document">
                            <div class="modal-content bg-white border-none">
                                <div class="modal-header border-none">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                        Quote Create
                                    </h5>
                                    <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <p className="d-block px-3">
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout.
                                </p>
                                <hr className="my-1" />
                                <div class="modal-body">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Quote Type
                                                </label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Cyclical"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Quote ID
                                                </label>
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    // placeholder="Enter email"
                                                    name="contact"
                                                    value={quoteData.contact}
                                                    // onChange={handleQuoteInputChange}
                                                    placeholder="(Auto-generated)"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    class="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    name="description"
                                                    value={quoteData.description}
                                                    onChange={handleQuoteInputChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Reference
                                                </label>
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter email"
                                                    name="reference"
                                                    value={quoteData.reference}
                                                    onChange={handleQuoteInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {quoteDataShow ? <>
                                        <div className="row">
                                            <div class="col-md-12 col-sm-12">
                                                <div class="form-group mt-3">
                                                    <p class="font-size-12 font-weight-500 mb-2">QUOTE TYPE </p>
                                                    <h6 class="font-weight-500">
                                                        {/* Repair Quote with Spare Parts */}SOLUTION
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-sm-12">
                                                <div class="form-group mt-3">
                                                    <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                                                    {/* <h6 class="font-weight-500">SB12345</h6> */}
                                                    <h6 class="font-weight-500">{quoteData.contact}</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-sm-12">
                                                <div class="form-group mt-3">
                                                    <p class="font-size-12 font-weight-500 mb-2">
                                                        QUOTE DESCRIPTION
                                                    </p>
                                                    {/* <h6 class="font-weight-500">Holder text</h6> */}
                                                    <h6 class="font-weight-500">{quoteData.description}</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-sm-12">
                                                <div class="form-group mt-3">
                                                    <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                                    {/* <h6 class="font-weight-500">Holder text</h6> */}
                                                    <h6 class="font-weight-500">{quoteData.reference}</h6>
                                                </div>
                                            </div>
                                        </div></> : <></>}

                                </div>
                                <div class="modal-footer" style={{ display: "unset" }}>
                                    {quoteDataShow ? <>
                                        <div className="mb-2">
                                            <a
                                                href="#"
                                                onClick={() => handleCreate()}
                                                data-dismiss="modal"
                                                className="btn bg-primary d-block text-white"
                                            >
                                                Done
                                            </a>
                                            {/* <a
                                    href="#"
                                    data-dismiss="modal"
                                    onClick={() => setQuoteDataShow(false)}
                                    className="btn bg-primary d-block text-white"
                                >
                                    Done
                                </a> */}
                                        </div>
                                    </> : <></>}
                                    <div>
                                        <button class="btn  btn-primary" onClick={() => handleCreateQuote()}>Create</button>
                                        <button
                                            type="button"
                                            class="btn pull-right border"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                <div class="modal right fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">

                                            <div class="modal-header">
                                                <h4 class="modal-title" id="myModalLabel2"><ErrorOutlineIcon className="mr-2" style={{ fontSize: '32px' }} />Errors</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div class="modal-body">
                                                <div className='d-flex justify-content-between align-items-center px-3 border-bottom'>
                                                    <h6 className='mb-0'>3 errors found in line items</h6>
                                                    <div>
                                                        <a href='#' className='btn'><ClearIcon className="mr-2" style={{ color: '#000' }} />Clear All</a>
                                                    </div>
                                                </div>
                                                <div className=' mt-2'>
                                                    <h6 className="px-3">FILTER</h6>
                                                    <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                                                        <TabContext value={value}>
                                                            <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                                <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                                                    <Tab label="Part list" value="1" />
                                                                    <Tab label="Service Estimates" value="2" />
                                                                    <Tab label="Form" value="3" />

                                                                </TabList>
                                                            </Box>
                                                            <TabPanel className="px-3" value="1">
                                                                <div className="card border p-3 mb-0">
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <p className="mb-0">Invalid data</p>
                                                                        <h6 className="mb-0">2 min ago</h6>
                                                                    </div>
                                                                    <h6 className="mb-0"> Part list header component code</h6>
                                                                    <p className="mb-0">Fix <a href="#" className="btn">Go to field</a></p>
                                                                </div>
                                                            </TabPanel>
                                                            <TabPanel value="2">Item Two</TabPanel>
                                                            <TabPanel value="3">Item Three</TabPanel>
                                                        </TabContext>
                                                    </Box>
                                                    <hr className="mb-0" />
                                                    <div className="p-3">
                                                        <a href='#' className='btn text-light border-light px-2'>Go Back to Solution</a>
                                                        <a href='#' className='btn btn-primary float-right px-2'>Choose the correct portfolio</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">

                                            <div class="modal-header">
                                                <h4 class="modal-title" id="myModalLabel2"><ErrorOutlineIcon className="mr-2" style={{ fontSize: '32px' }} />Errors</h4>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div class="modal-body">
                                                <div className='d-flex justify-content-between align-items-center px-3 border-bottom'>
                                                    <h6 className='mb-0'>3 errors found in line items</h6>
                                                    <div>
                                                        <a href='#' className='btn'><ClearIcon className="mr-2" style={{ color: '#000' }} />Clear All</a>
                                                    </div>
                                                </div>
                                                <div className=' mt-2'>
                                                    <h6 className="px-3">FILTER</h6>
                                                    <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                                                        <TabContext value={value}>
                                                            <Box className="custom-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                                <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                                                    <Tab label="Part list" value="1" />
                                                                    <Tab label="Service Estimates" value="2" />
                                                                    <Tab label="Form" value="3" />

                                                                </TabList>
                                                            </Box>
                                                            <TabPanel className="px-3" value="1">
                                                                <div className="card border p-3 mb-0">
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <p className="mb-0">Invalid data</p>
                                                                        <h6 className="mb-0">2 min ago</h6>
                                                                    </div>
                                                                    <h6 className="mb-0"> Part list header component code</h6>
                                                                    <p className="mb-0">Fix <a href="#" className="btn">Go to field</a></p>
                                                                </div>
                                                            </TabPanel>
                                                            <TabPanel value="2">Item Two</TabPanel>
                                                            <TabPanel value="3">Item Three</TabPanel>
                                                        </TabContext>
                                                    </Box>
                                                    <hr className="mb-0" />
                                                    <div className="p-3">
                                                        <a href='#' className='btn text-light border-light px-2'>Go Back to Solution</a>
                                                        <a href='#' className='btn btn-primary float-right px-2'>Choose the correct portfolio</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                    <Modal
                        size="lg"
                        show={editItemShow}
                        onHide={() => setEditItemShow(false)}
                    >
                        <Modal.Body>
                            {/* itemEdit flag will work for item,bundle/service */}
                            <AddCustomPortfolioItem
                                passItemEditRowData={passItemEditRowData}
                                handleItemEditSave={handleItemEditSave}
                                compoFlag="itemEdit"
                            />
                        </Modal.Body>
                    </Modal>


                    {/* Model Box For Coverage Included Serial No */}
                    <Modal
                        show={showRelatedModel}
                        onHide={() => setShowRelatedModel(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="align-items-center">
                            <div>
                                <Modal.Title>Included Serial No</Modal.Title>
                            </div>
                            <div>
                                <Link
                                    to="#"
                                    className=" btn bg-primary text-white"
                                    onClick={() => AddNewRowData(selectedMasterData[includedModelIndex])}
                                >
                                    Add New
                                </Link>
                            </div>
                        </Modal.Header>
                        <Modal.Body className="included_table">
                            <DataTable
                                className=""
                                title=""
                                columns={columns4}
                                data={selectedMasterData[includedModelIndex]?.associatedIncludedModelData}
                                customStyles={customStyles}
                            // pagination
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowRelatedModel(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleIncludeSerialNumberSaveChanges(selectedMasterData[includedModelIndex])}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Model Box For Update/Edit Coverage Data */}

                    <Modal
                        show={showEditIncludeSerialNoModel}
                        onHide={() => setShowEditIncludeSerialNoModel(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="align-items-center">
                            <div>
                                <Modal.Title>Edit Coverage</Modal.Title>
                            </div>
                        </Modal.Header>
                        <Modal.Body className="included_table">
                            <div className="row input-fields">
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group w-100">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Coverage ID
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            disabled
                                            placeholder="(AUTO GENERATE)"
                                            value={editSerialNo.coverageId}
                                            defaultValue={editSerialNo.coverageId}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Service ID</label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Make
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="make"
                                            placeholder="Auto Fill Search Model...."
                                            value={editSerialNo.make}
                                            defaultValue={editSerialNo.make}
                                            disabled
                                        />
                                        {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.make}
                      value={editSerialNo.make}
                      defaultValue={editSerialNo.make}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, make: e.value })
                      }
                    /> */}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Family
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="family"
                                            placeholder="Auto Fill Search Model...."
                                            value={editSerialNo.family}
                                            defaultValue={editSerialNo.family}
                                            disabled
                                        />
                                        {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.family}
                      value={editSerialNo.family}
                      defaultValue={editSerialNo.family}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, family: e.value })
                      }
                    // onChange={(e) => HandleCatUsage(e)}
                    /> */}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Model No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="model"
                                            placeholder="Model(Required*)"
                                            value={editSerialNo.modelNo}
                                            defaultValue={editSerialNo.modelNo}
                                            // onChange={handleAddServiceBundleChange}
                                            onChange={(e) => handleModelInputSearch(e)}
                                        />
                                        {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.modelNo}
                      value={editSerialNo.modelNo}
                      defaultValue={editSerialNo.modelNo}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, modelNo: e.value })
                      }
                    /> */}
                                        {
                                            <ul
                                                className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                id="style"
                                            >
                                                {querySearchModelResult.map((currentItem, j) => (
                                                    <li
                                                        className="list-group-item"
                                                        key={j}
                                                        onClick={(e) => handleSearchModelListClick(
                                                            e,
                                                            currentItem
                                                        )}
                                                    // onClick={(e) =>
                                                    //   handleSearchListClick(
                                                    //     e,
                                                    //     currentItem,
                                                    //   )
                                                    // }
                                                    >
                                                        {currentItem.model}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Serial No Prefix
                                        </label>
                                        <Select
                                            // options={categoryList}
                                            options={querySearchModelPrefixOption}
                                            placeholder={editSerialNo.serialNoPrefix}
                                            value={editSerialNo.serialNoPrefix}
                                            defaultValue={editSerialNo.serialNoPrefix}
                                            // onChange={(e) =>
                                            //   setEditSerialNo({
                                            //     ...editSerialNo,
                                            //     serialNoPrefix: e.value,
                                            //   })
                                            // }
                                            className="text-primary"
                                            onChange={(e) => selectPrefixOption(e)}
                                        // onChange={(e) => HandleCatUsage(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Start Serial No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            placeholder="(Optional)"
                                            value={editSerialNo.startSerialNo}
                                            defaultValue={editSerialNo.startSerialNo}
                                            onChange={(e) =>
                                                setEditSerialNo({
                                                    ...editSerialNo,
                                                    startSerialNo: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            End Serial No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            placeholder="(Optional)"
                                            value={editSerialNo.endSerialNo}
                                            defaultValue={editSerialNo.endSerialNo}
                                            onChange={(e) =>
                                                setEditSerialNo({
                                                    ...editSerialNo,
                                                    endSerialNo: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Fleet
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            placeholder="(Optional)"
                                            value={editSerialNo.fleet}
                                            defaultValue={editSerialNo.fleet}
                                            onChange={(e) =>
                                                setEditSerialNo({
                                                    ...editSerialNo,
                                                    fleet: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            htmlFor="exampleInputEmail1"
                                        >
                                            Fleet Size
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            placeholder="(Optional)"
                                            value={editSerialNo.fleetSize}
                                            defaultValue={editSerialNo.fleetSize}
                                            onChange={(e) =>
                                                setEditSerialNo({
                                                    ...editSerialNo,
                                                    fleetSize: e.target.value,
                                                })
                                            }
                                        />
                                        {/* <Select
                      value={editSerialNo.fleetSize}
                      defaultValue={editSerialNo.fleetSize}
                      placeholder={editSerialNo.fleetSize}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, fleetSize: e.value })
                      }
                      options={categoryList}
                    // onChange={(e) => HandleCatUsage(e)}
                    /> */}
                                    </div>
                                </div>
                                {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Location
                    </label>
                    <Select
                      // value={}
                      options={categoryList}
                      onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>

                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Start Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">End Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Actions </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                className="btn border w-100"
                                onClick={() => setShowEditIncludeSerialNoModel(false)}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                className="btn btn-primary w-100"
                                onClick={(e) => UpdateSelectCoverageData(selectedMasterData[includedModelIndex])}>Save changes</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={versionPopup}
                        onHide={() => setVersionPopup(false)}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton className="border-none">
                            <Modal.Title>New Version</Modal.Title>
                            {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> */}
                        </Modal.Header>
                        <p className="mx-3 mt-0">
                            Description, Product experts convert the repair option to a standard job or template.
                        </p>
                        <div className="hr"></div>
                        <Modal.Body>
                            <div class="form-group">
                                <label for="usr">Select Version</label>
                                <Select
                                    className="text-primary"
                                    // value={createServiceOrBundle.customerSegment}
                                    onChange={(e) => handleOption3(e)}
                                    options={versionOption}
                                    value={value3}
                                    placeholder="Version Type"
                                />
                            </div>
                            <div class="form-group">
                                <label for="usr">Name</label>
                                <input type="text" class="form-control" id="usr" placeholder="Enter Name" onChange={(e) => setNewVersionName(e.target.value)} value={newVersionName} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn  btn-primary w-100" onClick={createNewVersion}>Create </button>
                            <button type="button" className="btn btn-primary w-100" onClick={() => setVersionPopup(false)}>Cancel</button>
                        </Modal.Footer>
                    </Modal>


                    <Modal
                        size="xl"
                        show={bundleServiceShow}
                        onHide={() => setBundleServiceShow(false)}
                    >
                        <Modal.Body>
                            <Box sx={{ typography: "body1" }}>
                                <TabContext value={bundleTabs}>
                                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                        <TabList className="custom-tabs-div"
                                            onChange={(e, newValue) => setBundleTabs(newValue)}
                                            aria-label="lab API tabs example"
                                        >
                                            <Tab label={`${serviceOrBundlePrefix} HEADER`} value="bundleServiceHeader" />
                                            <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>

                                            {serviceOrBundlePrefix === "BUNDLE" && (
                                                <Tab label={`${serviceOrBundlePrefix} ITEMS`} value="bundleServiceItems" />
                                            )}
                                            {serviceOrBundlePrefix === "BUNDLE" && (
                                                <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                                            )}

                                            {/* {serviceOrBundlePrefix === "BUNDLE" && (
                    <Tab label={`${serviceOrBundlePrefix} BODY`} value="2" />
                  )} */}
                                            <Tab label="PRICE CALCULATOR" value="bundleServicePriceCalculator" />
                                            <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>

                                            <Tab label="ADMINISTRATIVE" value="bundleServiceAdministrative" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="bundleServiceHeader">
                                        <div className="container-fluid ">
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                <h5 className="font-weight-600 mb-0">
                                                    {/* ADD {serviceOrBundlePrefix} */}
                                                </h5>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={shareIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={folderaddIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={uploadIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={cpqIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={deleteIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-3 font-size-14">
                                                        <img src={copyIcon}></img>
                                                    </a>
                                                    <a href="#" className="ml-2">
                                                        <MuiMenuComponent
                                                            onClick={() => alert()}
                                                            options={activityOptions}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="card p-4 mt-5">
                                                <h5 className="d-flex align-items-center mb-0">
                                                    <div className="" style={{ display: "contents" }}>
                                                        <span className="mr-3">Header</span>
                                                        <a href={undefined} className="btn-sm" style={{ cursor: "pointer" }}
                                                        // onClick={() => setBundleAndServiceEditAble(false)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </a>
                                                        <a href="#" className="btn-sm">
                                                            <i
                                                                className="fa fa-bookmark-o"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </a>
                                                        <a href="#" className="btn-sm">
                                                            <img
                                                                style={{ width: "14px" }}
                                                                src={folderaddIcon}
                                                            ></img>
                                                        </a>
                                                    </div>
                                                    <div className="input-group icons border-radius-10 border">
                                                        <div className="input-group-prepend">
                                                            <span
                                                                className="input-group-text bg-transparent border-0 pr-0 "
                                                                id="basic-addon1"
                                                            >
                                                                <img src={shearchIcon} />
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="search"
                                                            className="form-control search-form-control"
                                                            aria-label="Search Dashboard"
                                                        />
                                                    </div>
                                                </h5>
                                                {bundleAndServiceEditAble ?
                                                    <>
                                                        <div className="row mt-4 ">
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{serviceOrBundlePrefix} NAME</p>

                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                        {(createServiceOrBundle.name == "" ||
                                                                            createServiceOrBundle.name == null ||
                                                                            createServiceOrBundle.name == undefined ||
                                                                            createServiceOrBundle.name == "string") ? "NA" : createServiceOrBundle.name}
                                                                    </h6>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{serviceOrBundlePrefix} DESCRIPTION</p>

                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                        {(createServiceOrBundle.description == "" ||
                                                                            createServiceOrBundle.description == null ||
                                                                            createServiceOrBundle.description == undefined ||
                                                                            createServiceOrBundle.description == "string") ? "NA" : createServiceOrBundle.description}
                                                                    </h6>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">BUNDLE/SERVICE</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                        {serviceOrBundlePrefix === "SERVICE"
                                                                            ? "SERVICE"
                                                                            : "BUNDLE_ITEM"}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(createServiceOrBundle.reference == "" ||
                                                                            createServiceOrBundle.reference == null ||
                                                                            createServiceOrBundle.reference == undefined ||
                                                                            createServiceOrBundle.reference == "string") ? "NA" : createServiceOrBundle.reference}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(selectedCustomerSegmentOption.length == 0 ||
                                                                            selectedCustomerSegmentOption?.value == "" ||
                                                                            selectedCustomerSegmentOption?.value == null ||
                                                                            selectedCustomerSegmentOption?.value == undefined ||
                                                                            selectedCustomerSegmentOption?.value == "string") ? "NA"
                                                                            : selectedCustomerSegmentOption?.value}

                                                                        {/* {createServiceOrBundle.customerSegment?.value} */}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MACHINE/COMPONENT</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(createServiceOrBundle.machineComponent?.value == "" ||
                                                                            createServiceOrBundle.machineComponent?.value == null ||
                                                                            createServiceOrBundle.machineComponent?.value == undefined ||
                                                                            createServiceOrBundle.machineComponent?.value == "EMPTY")
                                                                            ? "NA" : createServiceOrBundle.machineComponent?.value}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MAKE</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(createServiceOrBundle.make == "" ||
                                                                            createServiceOrBundle.make == null ||
                                                                            createServiceOrBundle.make == undefined ||
                                                                            createServiceOrBundle.make == "string") ?
                                                                            "NA" : createServiceOrBundle.make}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">FAMILY</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(createServiceOrBundle.family == "" ||
                                                                            createServiceOrBundle.family == null ||
                                                                            createServiceOrBundle.family == undefined ||
                                                                            createServiceOrBundle.family == "string") ?
                                                                            "NA" : createServiceOrBundle.family}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group customselectmodelSerch">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MODEL(S)</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(createServiceOrBundle.model == "" ||
                                                                            createServiceOrBundle.model == null ||
                                                                            createServiceOrBundle.model == undefined ||
                                                                            createServiceOrBundle.model == "string") ?
                                                                            "NA" : createServiceOrBundle.model}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREFIX(S)</p>
                                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                                                        {(selectedPrefixOption.length == 0 ||
                                                                            selectedPrefixOption?.value == "" ||
                                                                            selectedPrefixOption?.value == null ||
                                                                            selectedPrefixOption?.value == undefined ||
                                                                            selectedPrefixOption?.value == "string") ?
                                                                            "NA" : selectedPrefixOption?.value}

                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> :
                                                    <>
                                                        <div className="row mt-4 input-fields">
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        {serviceOrBundlePrefix} NAME
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="name"
                                                                        placeholder="Name (Required*)"
                                                                        onChange={handleAddServiceBundleChange}
                                                                        value={createServiceOrBundle.name}
                                                                    />
                                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        {serviceOrBundlePrefix} DESCRIPTION
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="description"
                                                                        placeholder="Description (Required*)"
                                                                        value={createServiceOrBundle.description}
                                                                        onChange={handleAddServiceBundleChange}
                                                                    />
                                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        BUNDLE/SERVICE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="bundleFlag"
                                                                        placeholder="Bundle Flag"
                                                                        value={
                                                                            serviceOrBundlePrefix === "SERVICE"
                                                                                ? "SERVICE"
                                                                                : "BUNDLE_ITEM"
                                                                        }
                                                                        onChange={handleAddServiceBundleChange}
                                                                        disabled
                                                                    />
                                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label
                                                                        className="text-light-dark font-size-12 font-weight-500"
                                                                        htmlFor="exampleInputEmail1"
                                                                    >
                                                                        REFERENCE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="reference"
                                                                        placeholder="Reference"
                                                                        value={createServiceOrBundle.reference}
                                                                        onChange={handleAddServiceBundleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CUSTOMER SEGMENT
                                                                    </label>
                                                                    <Select
                                                                        onChange={(e) => handleSelectCustomerSegment(e)}
                                                                        className="text-primary"
                                                                        value={selectedCustomerSegmentOption}
                                                                        options={customerSegmentKeyValue}
                                                                        placeholder="Customer Segment"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label
                                                                        className="text-light-dark font-size-12 font-weight-500"
                                                                        htmlFor="exampleInputEmail1"
                                                                    >
                                                                        MACHINE/COMPONENT
                                                                    </label>
                                                                    <Select
                                                                        isClearable={true}
                                                                        className="text-primary"
                                                                        value={createServiceOrBundle.machineComponent}
                                                                        onChange={(e) =>
                                                                            setCreateServiceOrBundle({
                                                                                ...createServiceOrBundle,
                                                                                machineComponent: e,
                                                                            })
                                                                        }
                                                                        isLoading={typeKeyValue.length > 0 ? false : true}
                                                                        options={typeKeyValue}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group customselectmodelSerch">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        MODEL(S)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="model"
                                                                        placeholder="Model(Required*)"
                                                                        value={createServiceOrBundle.model}
                                                                        onChange={(e) => handleBundleServiceInputSearch(e)}
                                                                    />
                                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                                    {
                                                                        <ul
                                                                            className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                                            id="style"
                                                                        >
                                                                            {bundleServiceQuerySearchModelResult.map((currentItem, j) => (
                                                                                <li
                                                                                    className="list-group-item text-primary"
                                                                                    key={j}
                                                                                    onClick={(e) => handleBundleServiceModelListClick(
                                                                                        e,
                                                                                        currentItem
                                                                                    )}
                                                                                >
                                                                                    {currentItem.model}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        FAMILY
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="make"
                                                                        placeholder="Auto Fill Search Model...."
                                                                        value={createServiceOrBundle.family}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        MAKE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-primary border-radius-10"
                                                                        name="make"
                                                                        placeholder="Auto Fill Search Model...."
                                                                        value={createServiceOrBundle.make}
                                                                        onChange={handleAddServiceBundleChange}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-3">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        PREFIX(S)
                                                                    </label>
                                                                    <Select
                                                                        onChange={(e) => selectBundleServicePrefixOption(e)}
                                                                        className="text-primary"
                                                                        value={selectedPrefixOption}
                                                                        options={bundleServiceQuerySearchModelPrefixOption}
                                                                        placeholder="select....."
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>}

                                                <div className="row" style={{ justifyContent: "right" }}>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddNewServiceOrBundle}
                                                        // className="btn btn-light"
                                                        className="btn text-white bg-primary"
                                                    >
                                                        Save & Next
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="bundleServiceItems">
                                        <AddCustomPortfolioItem
                                            passItemEditRowData={passItemEditRowData}
                                            handleItemEditSave={handleItemEditSave}
                                            compoFlag="itemEdit"
                                            compoFlagTest="itemEditBundle"
                                            setBundleTabs={setBundleTabs}
                                        />
                                        {/* <AddPortfolioItem
                                    passItemEditRowData={passItemEditRowData}
                                    handleItemEditSave={handleItemEditSave}
                                    compoFlag="itemEdit"
                                    compoFlagTest="itemEditBundle"
                                    setBundleTabs={setBundleTabs}
                                /> */}
                                    </TabPanel>
                                    <TabPanel value="bundleServicePriceCalculator">
                                        <PriceCalculatorCustomItem
                                            serviceOrBundlePrefix={serviceOrBundlePrefix}
                                            setBundleTabs={setBundleTabs}
                                            setBundleServiceShow={setBundleServiceShow}
                                            getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                                            priceCalculator={itemPriceData}
                                            priceCompFlag="editAble"
                                        />
                                        {/* <PriceCalculatorCustomItem
                  serviceOrBundlePrefix={serviceOrBundlePrefix}
                  setBundleTabs={setBundleTabs}
                  setBundleServiceShow={setBundleServiceShow}
                  priceCalculator={priceCalculator}
                  getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                // handleSavePrices={handleSavePrices}
                /> */}
                                    </TabPanel>
                                    <TabPanel value="bundleServiceAdministrative">
                                        {bundleAndServiceEditAble ?
                                            <>
                                                <div className="row mt-4">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED BY</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.preparedBy == "" ||
                                                                        bundleOrServiceAdministrative.preparedBy == "string" ||
                                                                        bundleOrServiceAdministrative.preparedBy == undefined ||
                                                                        bundleOrServiceAdministrative.preparedBy == null
                                                                        ? "NA" : bundleOrServiceAdministrative.preparedBy
                                                                )}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">APPROVED BY</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.approvedBy == "" ||
                                                                        bundleOrServiceAdministrative.approvedBy == "string" ||
                                                                        bundleOrServiceAdministrative.approvedBy == undefined ||
                                                                        bundleOrServiceAdministrative.approvedBy == null
                                                                        ? "NA" : bundleOrServiceAdministrative.approvedBy
                                                                )}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED ON</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.preparedOn == "" ||
                                                                        bundleOrServiceAdministrative.preparedOn == "string" ||
                                                                        bundleOrServiceAdministrative.preparedOn == undefined ||
                                                                        bundleOrServiceAdministrative.preparedOn == null
                                                                        ? "NA" :
                                                                        getFormattedDateTimeByTimeStamp(bundleOrServiceAdministrative.preparedOn)
                                                                )}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED BY</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.revisedBy == "" ||
                                                                        bundleOrServiceAdministrative.revisedBy == "string" ||
                                                                        bundleOrServiceAdministrative.revisedBy == undefined ||
                                                                        bundleOrServiceAdministrative.revisedBy == null ?
                                                                        "NA" : bundleOrServiceAdministrative.revisedBy)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED ON</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.revisedOn == "" ||
                                                                        bundleOrServiceAdministrative.revisedOn == "string" ||
                                                                        bundleOrServiceAdministrative.revisedOn == undefined ||
                                                                        bundleOrServiceAdministrative.revisedOn == null
                                                                        ? "NA" :
                                                                        getFormattedDateTimeByTimeStamp(bundleOrServiceAdministrative.revisedOn)
                                                                )}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.salesOffice == "" ||
                                                                        bundleOrServiceAdministrative.salesOffice == undefined ||
                                                                        bundleOrServiceAdministrative.salesOffice?.value == "string" ||
                                                                        bundleOrServiceAdministrative.salesOffice == null
                                                                        ? "NA" : bundleOrServiceAdministrative.salesOffice?.value)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">OFFER VALIDITY</p>
                                                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                                                {(
                                                                    bundleOrServiceAdministrative.offerValidity == "" ||
                                                                        bundleOrServiceAdministrative.offerValidity == undefined ||
                                                                        bundleOrServiceAdministrative.offerValidity?.value == "string" ||
                                                                        bundleOrServiceAdministrative.offerValidity == null
                                                                        ? "NA" : bundleOrServiceAdministrative.offerValidity?.label)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <>
                                                <div className="row mt-4 input-fields">
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
                                                                className="form-control text-primary border-radius-10"
                                                                name="preparedBy"
                                                                value={administrative.preparedBy}
                                                                onChange={handleAdministrativreChange}
                                                                placeholder="Required (ex-abc@gmail.com)"
                                                            />
                                                            <div className="css-w8dmq8">*Mandatory</div>
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
                                                                className="form-control text-primary border-radius-10"
                                                                placeholder="Optional  (ex-abc@gmail.com)"
                                                                name="approvedBy"
                                                                value={administrative.approvedBy}
                                                                onChange={handleAdministrativreChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        {/* <div className="form-group"> */}
                                                        <label
                                                            className="text-light-dark font-size-14 font-weight-500"
                                                            htmlFor="exampleInputEmail1"
                                                        >
                                                            PREPARED ON
                                                        </label>
                                                        {/* <input
                          type="text"
                          className="form-control border-radius-10"
                          placeholder="Optional"
                          name="preparedOn"
                          value={administrative.preparedOn}
                          onChange={handleAdministrativreChange}
                        /> */}
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
                                                                        onChange={(e) =>
                                                                            setAdministrative({
                                                                                ...administrative,
                                                                                preparedOn: e,
                                                                            })
                                                                        }
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                                <div className="css-w8dmq8">*Mandatory</div>
                                                            </div>
                                                        </div>
                                                        {/* </div> */}
                                                    </div>
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
                                                                className="form-control border-radius-10 text-primary"
                                                                placeholder="Optional  (ex-abc@gmail.com)"
                                                                name="revisedBy"
                                                                value={administrative.revisedBy}
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
                                                                REVISED ON
                                                            </label>
                                                            {/* <input
                          type="text"
                          className="form-control border-radius-10"
                          placeholder="Optional"
                          name="revisedOn"
                          value={administrative.revisedOn}
                          onChange={handleAdministrativreChange}
                        /> */}
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
                                                                SALES OFFICE / BRANCH
                                                            </label>
                                                            <Select
                                                                onChange={(e) =>
                                                                    setAdministrative({
                                                                        ...administrative,
                                                                        salesOffice: e,
                                                                    })
                                                                }
                                                                className="text-primary"
                                                                options={salesOfficeOptions}
                                                                placeholder="Required"
                                                                value={administrative.salesOffice}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                            {/* <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            name="salesOffice"
                            value={administrative.salesOffice}
                            onChange={handleAdministrativreChange}
                            placeholder="Required"
                          /> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label
                                                                className="text-light-dark font-size-14 font-weight-500"
                                                                htmlFor="exampleInputEmail1"
                                                            >
                                                                OFFER VALIDITY
                                                            </label>
                                                            <Select
                                                                // defaultValue={selectedOption}
                                                                onChange={(e) =>
                                                                    setAdministrative({
                                                                        ...administrative,
                                                                        offerValidity: e,
                                                                    })
                                                                }
                                                                className="text-primary"
                                                                options={validityOptions}
                                                                placeholder="Optional"
                                                                value={administrative.offerValidity}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                            <div className="css-w8dmq8">*Mandatory</div>
                                                            {/* <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            placeholder="Optional"
                            name="offerValidity"
                            value={administrative.offerValidity}
                            onChange={handleAdministrativreChange}
                          /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        <div className="row" style={{ justifyContent: "right" }}>
                                            <button
                                                type="button"
                                                onClick={saveEditServiceOrBundleAdministrativeData}
                                                className="btn text-white bg-primary"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Modal.Body>
                    </Modal>

                    <div class="modal fade" id="versionpopup2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header border-none">
                                    <h5 class="modal-title" id="exampleModalLongTitle">
                                        New Version
                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <p className="mx-3 mt-0">
                                    Description, Product experts convert the repair option to a standard job or template.
                                </p>
                                <div className="hr"></div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="usr">Name</label>
                                        <input type="text" class="form-control" id="usr" placeholder="Enter Name" onChange={(e) => setNewVersionName(e.target.value)} value={newVersionName} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" className="btn  btn-primary w-100" onClick={createNewVersion}>Create </button>
                                    <button type="button" className="btn btn-primary w-100" data-dismiss="modal">Cancel</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="AddCoverage"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div
                            className="modal-dialog modal-dialog-centered modal-lg"
                            role="document"
                        >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Edit Coverage
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row input-fields">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group w-100">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Coverage ID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    disabled
                                                    placeholder="(AUTO GENERATE)"
                                                    value={editSerialNo.coverageId}
                                                    defaultValue={editSerialNo.coverageId}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Service ID</label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Make
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control text-primary border-radius-10"
                                                    name="make"
                                                    placeholder="Auto Fill Search Model...."
                                                    value={editSerialNo.make}
                                                    defaultValue={editSerialNo.make}
                                                    disabled
                                                />
                                                {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.make}
                      value={editSerialNo.make}
                      defaultValue={editSerialNo.make}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, make: e.value })
                      }
                    /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Family
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control text-primary border-radius-10"
                                                    name="family"
                                                    placeholder="Auto Fill Search Model...."
                                                    value={editSerialNo.family}
                                                    defaultValue={editSerialNo.family}
                                                    disabled
                                                />
                                                {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.family}
                      value={editSerialNo.family}
                      defaultValue={editSerialNo.family}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, family: e.value })
                      }
                    // onChange={(e) => HandleCatUsage(e)}
                    /> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Model No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control text-primary border-radius-10"
                                                    name="model"
                                                    placeholder="Model(Required*)"
                                                    value={editSerialNo.modelNo}
                                                    defaultValue={editSerialNo.modelNo}
                                                    // onChange={handleAddServiceBundleChange}
                                                    onChange={(e) => handleModelInputSearch(e)}
                                                />
                                                {/* <Select
                      options={categoryList}
                      placeholder={editSerialNo.modelNo}
                      value={editSerialNo.modelNo}
                      defaultValue={editSerialNo.modelNo}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, modelNo: e.value })
                      }
                    /> */}
                                                {
                                                    <ul
                                                        className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                        id="style"
                                                    >
                                                        {querySearchModelResult.map((currentItem, j) => (
                                                            <li
                                                                className="list-group-item"
                                                                key={j}
                                                                onClick={(e) => handleSearchModelListClick(
                                                                    e,
                                                                    currentItem
                                                                )}
                                                            // onClick={(e) =>
                                                            //   handleSearchListClick(
                                                            //     e,
                                                            //     currentItem,
                                                            //   )
                                                            // }
                                                            >
                                                                {currentItem.model}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Serial No Prefix
                                                </label>
                                                <Select
                                                    // options={categoryList}
                                                    options={querySearchModelPrefixOption}
                                                    placeholder={editSerialNo.serialNoPrefix}
                                                    value={editSerialNo.serialNoPrefix}
                                                    defaultValue={editSerialNo.serialNoPrefix}
                                                    // onChange={(e) =>
                                                    //   setEditSerialNo({
                                                    //     ...editSerialNo,
                                                    //     serialNoPrefix: e.value,
                                                    //   })
                                                    // }
                                                    className="text-primary"
                                                    onChange={(e) => selectPrefixOption(e)}
                                                // onChange={(e) => HandleCatUsage(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Start Serial No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="(Optional)"
                                                    value={editSerialNo.startSerialNo}
                                                    defaultValue={editSerialNo.startSerialNo}
                                                    onChange={(e) =>
                                                        setEditSerialNo({
                                                            ...editSerialNo,
                                                            startSerialNo: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    End Serial No
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="(Optional)"
                                                    value={editSerialNo.endSerialNo}
                                                    defaultValue={editSerialNo.endSerialNo}
                                                    onChange={(e) =>
                                                        setEditSerialNo({
                                                            ...editSerialNo,
                                                            endSerialNo: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Fleet
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="(Optional)"
                                                    value={editSerialNo.fleet}
                                                    defaultValue={editSerialNo.fleet}
                                                    onChange={(e) =>
                                                        setEditSerialNo({
                                                            ...editSerialNo,
                                                            fleet: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-14 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
                                                >
                                                    Fleet Size
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-radius-10 text-primary"
                                                    placeholder="(Optional)"
                                                    value={editSerialNo.fleetSize}
                                                    defaultValue={editSerialNo.fleetSize}
                                                    onChange={(e) =>
                                                        setEditSerialNo({
                                                            ...editSerialNo,
                                                            fleetSize: e.target.value,
                                                        })
                                                    }
                                                />
                                                {/* <Select
                      value={editSerialNo.fleetSize}
                      defaultValue={editSerialNo.fleetSize}
                      placeholder={editSerialNo.fleetSize}
                      onChange={(e) =>
                        setEditSerialNo({ ...editSerialNo, fleetSize: e.value })
                      }
                      options={categoryList}
                    // onChange={(e) => HandleCatUsage(e)}
                    /> */}
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Location
                    </label>
                    <Select
                      // value={}
                      options={categoryList}
                      onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>

                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Start Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">End Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">Actions </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn border w-100 bg-white"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary w-100">
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default CreatedCustomPortfolioTemplate