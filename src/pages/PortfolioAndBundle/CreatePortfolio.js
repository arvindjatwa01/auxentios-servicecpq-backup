import React, { useEffect, useState } from "react";
import {
  Modal,
  SplitButton,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from "@mui/x-data-grid";
import FormGroup from "@mui/material/FormGroup";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchIcon from "@mui/icons-material/Search";
import shearchIcon from "../../assets/icons/svg/search.svg";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as ENUM from "./CONSTS.js";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from "../Operational/index";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import cpqIcon from "../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import editIcon from "../../assets/icons/svg/edit.svg";
import searchstatusIcon from "../../assets/icons/svg/search-status.svg";
import { CommanComponents } from "../../components/index";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import deleticon from "../../assets/images/delete.png";
import link1Icon from "../../assets/images/link1.png";
import penIcon from "../../assets/images/pen.png";

import SearchBox from "../Repair/components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";
import { ReactTableNested } from "../Test/ReactTableNested";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Validator from "../../utils/validator";

import DataTable from "react-data-table-component";

import boxicon from "../../assets/icons/png/box.png";
import DropdownButton from "react-bootstrap/DropdownButton";
import Portfoliosicon from "../../assets/icons/svg/Portfolios-icon.svg";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import contract from "../../assets/icons/svg/contract.svg";
import repairicon from "../../assets/icons/svg/repair-icon.svg";
import Table from "react-bootstrap/Table";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import Tooltip from "@mui/material/Tooltip";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Loader from "react-js-loader";

import ExpendTablePopup from "./ExpendTablePopup";

import {
  createPortfolio,
  getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue,
  getModelKeyValue,
  getPrefixKeyValue,
  updatePortfolio,
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getResponseTimeTaskKeyValue,
  getValidityKeyValue,
  getStrategyTaskKeyValue,
  getProductHierarchyKeyValue,
  getGergraphicKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
  getPortfolioCommonConfig,
  getSolutionPriceCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation,
  createCoverage,
  updateCoverage,
  getItemPrice,
  updateItemData,
  deleteItem,
  getComponentCodeSuggetions,
  itemPriceDataId,
  quoteCreation,
  updateItemPriceData,
  escalationPriceCreation,
  additionalPriceCreation,
  portfolioPriceCreation,
  portfolioItemPriceSjid,
  updatePortfolioPrice,
  updateEscalationPriceById,
  updateAdditionalPriceById,
  getPortfolioPriceById,
  getItemPriceData,
  createItemPriceData,
  getItemDataById,

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
} from "./customerSegment/strategySlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { portfolioItemActions } from "./createItem/portfolioSlice";
import { createItemPayload } from "./createItem/createItemPayload";
import $ from "jquery";
import { display } from "@mui/system";
import { CreateService } from "pages/Service";
import SelectFilter from "react-select";
import QuerySearchComp from "./QuerySearchComp";
import { FormControlLabel, Switch } from "@material-ui/core";
import {
  Switch as Switch1,
} from "@mui/material";
import AddPortfolioItem from "./AddPortfolioItem";
import PriceCalculator from "./PriceCalculator";
import { PortfolioContext } from "./ProtfolioContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import Solution from "./Solution";
import LoadingProgress from "../Repair/components/Loader";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "../Repair/CONSTANTS";


const label = { inputProps: { "aria-label": "Checkbox demo" } };
// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "72px", // override the row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//       backgroundColor: "#872ff7",
//       color: "#fff",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };

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

export function CreatePortfolio(props) {

  const history = useHistory();
  const { state } = props.location;

  const [disable, setDisable] = useState(true);
  const [quoteDataShow, setQuoteDataShow] = useState(false)
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
  const [yearsOption, seYearsOption] = useState([
    {
      value: "1", label: "1"
    }
  ])
  const [makeKeyValue, setMakeKeyValue] = useState([]);
  const [modelKeyValue, setModelKeyValue] = useState([]);
  const [prefixKeyValue, setPrefixKeyValue] = useState([]);
  const [validityKeyValue, setValidityKeyValue] = useState([]);
  // const [headerType, setHeaderType] = useState(null);
  const [headerType, setHeaderType] = useState({ label: "PORTFOLIO", value: "PORTFOLIO" });
  const [headerTypeKeyValue, setHeaderTypeKeyValue] = useState([]);
  const [responseTimeTaskKeyValue, setResponseTimeTaskKeyValue] = useState([]);
  const [taskTypeKeyValue, setTaskTypeKeyValue] = useState([]);

  const [currentExpendBundleServiceRow, setCurrentExpendBundleServiceRow] = useState(null);
  const [currentExpendModelComponentRow, setCurrentExpendModelComponentRow] = useState(null);
  const [currentExpendPortfolioItemRow, setCurrentExpendPortfolioItemRow] = useState(null)

  const [itemPriceData, setItemPriceData] = useState({});

  const [value1, setValue1] = useState({
    value: "Archived",
    label: "Archived",
  });
  const [value2, setValue2] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [value3, setValue3] = useState({ value: "STANDARD", label: "Standard (Bronze)" });

  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
    []
  );
  const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("general");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [versionPopup, setVersionPopup] = useState(false)
  const [convertToPopup, setConvertToPopup] = useState(false);
  const [openCoverage, setOpenCoveragetable] = useState(false);

  const [productHierarchyKeyValue, setProductHierarchyKeyValue] = useState([]);
  const [geographicKeyValue, setGeographicKeyValue] = useState([]);
  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
  const [age, setAge] = useState("5");
  const [isView, setIsView] = useState(false); //Use for show data into label format
  const [showExitPrompt, setShowExitPrompt] = useState(true);
  const [createNewBundle, setCreateNewBundle] = useState(false);
  const [openSearchSolution, setOpenSearchSolution] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(null);
  const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null);
  const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([
    { label: "Bundle", value: "bundle" },
    { label: "Service", value: "service" },
    { label: "Portfolio Item", value: "portfolioItem" },
  ]);
  const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([
    { label: "Make", value: "make" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
  ]);
  const [columnSearchText, setColumnSearchText] = useState("");
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
  const [bundleItems, setBundleItems] = useState([]);
  const [coverageItems, setCoverageItems] = useState([]);
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false);
  const [showAvailableCoverage, setShowAvailableCoverage] = useState(false);
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");
  const [portfolioMenuOpen, setPortfolioMenuOpen] = useState(false);
  const [priceAgreementRows, setPriceAgreementRows] = useState([]);
  const [taskItemList, setTaskItemList] = useState(null);
  const [categoryItem, setCategoryItem] = useState(null);

  const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
  const [priceListKeyValue, setPriceListKeyValue] = useState([]);
  const [priceTypeKeyValue, setPriceTypeKeyValue] = useState([]);
  const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);
  const [additionalPriceHeadTypeKeyValue, setAdditionalPriceHeadTypeKeyValue] = useState([
    // { label: "Surcharge Percentage", value: "PERCENTAGE" },
    // { label: "Surcharge Dollar", value: "ABSOLUTE", },
    { label: "Surcharge %", value: "PERCENTAGE" },
    { label: "Surcharge $", value: "ABSOLoptionalsUTE", },
  ])


  const [priceCurrencyKeyValue, setPriceCurrencyKeyvalue] = useState([]);


  const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([]);
  const [strategyOptionals, setStrategyOptionals] = useState([]);

  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [searchCoverageSerialResults, setSearchCoverageSerialResults] = useState([]);
  const [coverageSerialResultList, setCoverageSerialResultList] = useState([]);

  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const [noCoverageOptionSerial, setNoCoverageOptionSerial] = useState(false);

  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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

  const [editAblePriceData, setEditAblePriceData] = useState([]);

  const [partsRequired, setPartsRequired] = useState(true);
  const [labourRequired, setlabourRequired] = useState(true);
  const [serviceRequired, setServiceRequired] = useState(false);
  const [miscRequired, setMiscRequired] = useState(true);
  const [needOnlyParts, setNeedOnlyParts] = useState(false)

  //  Set Quotes Data State 
  const [quoteData, setQuoteData] = useState({
    contact: "",
    description: "",
    reference: "",
  });

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

  const [optionalPopup, setOptionalPopup] = useState(false)
  const PopupOptionalShow = () => {
    setOptionalPopup(true)
  }

  const [strategyData, setStrategyData] = useState({
    strategyTask: null,
    taskType: null,
    categoryUsage: null,
    options: null,
    responseTime: null,
    productHierarchy: null,
    geographic: null,
  });
  const [administrative, setAdministrative] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });

  const [bundleOrServiceAdministrative, setBundleOrServiceAdministrative] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });

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



  const handleOption = (e) => {
    setValue1(e);
  };
  const handleOption2 = (e) => {
    setValue2(e);
  };
  const handleOption3 = (e) => {
    setValue3(e);
  };

  const [validityData, setValidityData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    from: null,
    to: null,
    fromInput: "",
    toInput: "",
    dateFlag: false,
    inputFlag: false,
  });

  const [headerLoading, setHeaderLoading] = useState(false);

  const [viewOnlyTab, setViewOnlyTab] = useState({
    generalViewOnly: false,
    validityViewOnly: false,
    strategyViewOnly: false,
    administrativeViewOnly: false,
    priceViewOnly: false,
    priceAgreementViewOnly: false,
    coverageViewOnly: false,
  });

  const [generalComponentData, setGeneralComponentData] = useState({
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: null,
    items: [],
    coverages: [],
  });

  const [newBundle, setNewBundle] = useState({
    serviceDescription: "",
    bundleFlag: "",
    reference: "",
    customerSegment: null,
    machineComponent: null,
  });

  const [portfolioId, setPortfolioId] = useState();
  const [currentItemId, setCurrentItemId] = useState();
  const [nameIsNotEditAble, setNameIsNotEditAble] = useState(false)

  const [createdItemsIdData, setCreatedItemsIdData] = useState([]);

  const [alignment, setAlignment] = useState("Portfolio");
  const [prefilgabelGeneral, setPrefilgabelGeneral] = useState("PORTFOLIO");
  const [priceAgreementOption, setPriceAgreementOption] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [count, setCount] = useState(1);
  const [updateCount, setUpdateCount] = useState(0);
  const [autoState, setAutoState] = useState({
    value: "",
    suggestions: [],
  });

  const [portfolioCoverage, setPortfolioCoverage] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);

  const [addPortFolioItem, setAddportFolioItem] = useState({
    id: 0,
    name: "",
    description: "",
    usageIn: categoryUsageKeyValue1,
    taskType: "",
    frequency: "",
    unit: "",
    recomondedValue: "",
    quantity: "",
    numberOfEvents: "",
    templateId: "",
    templateDescription: "",
    repairOption: "",
    strategyTask: "",
    year: "",
    noOfYear: "",
    headerdescription: "",
  });
  const [addMiniPortFolioItem, setAddMiniportFolioItem] = useState({
    id: "",
    description: "",
    usageIn: categoryUsageKeyValue1,
    taskType: "",
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
    serialNo: "",
  });

  const [itemHeaderSearch, setItemHeaderSearch] = useState({
    searchBy: "",
    family: "",
    inputField: "",
  });
  const [priceCalculator, setPriceCalculator] = useState({
    priceMethod: "",
    currency: "",
    priceDate: new Date(),
    priceType: "",
    priceAdditionalSelect: "",
    priceAdditionalInput: "",
    priceEscalationSelect: "",
    discountTypeSelect: "",
    priceEscalationInput: "",
    flatRateIndicator: false,
    flatPrice: "",
    discountTypeInput: "",
    priceBrackDownType: "",
    priceBrackDownPercantage: "",
    year: "",
    noOfYear: 1,
    startUsage: "",
    endUsage: "",
    usageType: "",
    frequency: "",
    unit: "",
    recommendedValue: "",
    numberOfEvents: "",
    netPrice: 1200,
    totalPrice: 1200,
    listPrice: "",
    calculatedPrice: "",
    priceYear: "",
    usageType: "",
    frequency: "",
    cycle: "",
    suppresion: "",
    id: "",
  });

  const [serialNumber, setSerialNumber] = useState("");

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
  const [openMiniBundleItem, setOpenMiniBundleItem] = useState(false);
  const [serviceOrBundleShow, setServiceOrBundleShow] = useState(false);
  const [serviceOrBundlePrefix, setServiceOrBundlePrefix] = useState("");


  const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
    id: "",
    name: "",
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

  const [editBundleService, setEditBundleService] = useState(false);


  const [tabs, setTabs] = useState("1");
  const [itemModelShow, setItemModelShow] = useState(false);
  const [loadingItem, setLoadingItem] = useState("");
  const [tempBundleItems, setTempBundleItems] = useState([]);
  const [valueOfUseCase, setValueOfUseCase] = useState(3);
  const [tempBundleItemCheckList, setTempBundleItemCheckList] = useState({});
  const [bundleTabs, setBundleTabs] = useState("bundleServiceHeader");

  const [bundleServiceShow, setBundleServiceShow] = useState(false);
  const [bundleServicePriceCalculator, setBundleServicePriceCalculator] = useState(false);

  const [editItemShow, setEditItemShow] = useState(false);
  const [passItemEditRowData, setPassItemEditRowData] = useState();

  const [portfolioItemDataEditable, setPortfolioItemDataEditable] = useState(false);

  const [passBundleEditRowData, setPassBundleEditRowData] = useState();
  const [isPriceShow, setIsPriceShow] = useState(false);
  const [tempBundleService1, setTempBundleService1] = useState([]);
  const [tempBundleService2, setTempBundleService2] = useState([]);
  const [tempBundleService3, setTempBundleService3] = useState([]);
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
    discountTypeSelect: "",
    make: "",
    family: "",
  });

  const [itemPriceCalculator, setItemPriceCalculator] = useState({
    netParts: "",
    netService: "",
    priceType: "",
    netPrice: "",
    netAdditionals: "",
  })

  const location = useLocation();

  const frequencyOptions = [
    { label: "Cyclic", value: "Cyclic" },
    { label: "once", value: "once" },
    { label: "alternate", value: "alternate" },
    { label: "Custom", value: "Custom" },
  ];
  const handleCustomerSegmentChange = (e) => {
    setGeneralComponentData({
      ...generalComponentData,
      customerSegment: e,
    });
  };

  const handleFlatPriceIndicator = (e) => {
    setExtWorkData({
      ...extWorkData,
      flatRateIndicator: e.target.checked,
      adjustedPrice: e.target.checked
        ? extWorkData.adjustedPrice
        : 0.0,
    })
    setPriceCalculator({
      ...priceCalculator,
      flatRateIndicator: e.target.checked,
      flatPrice: 0,
    })
  }


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

  const handleBundleServiceModelListClick = (e, currentItem) => {
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      model: currentItem.model,
      make: currentItem.make,
      family: currentItem.family
    })
    $(`.scrollbar-model`).css("display", "none");
  }



  const selectPrefixOption = (e) => {
    console.log(e);
    // setSelectedPrefixOption(e)
    setEditSerialNo({
      ...editSerialNo,
      serialNoPrefix: e.value,
    })
  }

  const selectBundleServicePrefixOption = (e) => {
    setSelectedPrefixOption(e)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      prefix: e,
    })
  }

  const handleMoreAction = (type) => {
    if (type == 1) {
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setCreateNewBundle(true);
    } else if (type == 2) {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (type == 3) {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
  };

  const handleAddSolutionPress = () => {
    setOpenSearchSolution(true);
    getPortfolioSchema()
      .then((res) => {
        const options = res.map((d) => ({
          value: d,
          label: d,
        }));
      })
      .catch((err) => { });
  };

  const UpdateSelectCoverageData = async () => {
    console.log("edit serial No : ", editSerialNo);

    const _selectedMasterData = [...selectedMasterData]
    const obj = _selectedMasterData[includedModelIndex]

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
    console.log("editCoverageData : ", editCoverageData);

    const updatePortfolioCoverage = await updateCoverage(
      editSerialNo.coverageId,
      editCoverageData
    );

    console.log("updatePortfolioCoverage 2423 : ", updatePortfolioCoverage)

    if (updatePortfolioCoverage.status === 200) {
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
        make: updatePortfolioCoverage.data.make,
        model: updatePortfolioCoverage.data.modelNo,
        prefix: updatePortfolioCoverage.data.serialNumberPrefix,
        family: updatePortfolioCoverage.data.family,
      }
      _selectedMasterData[includedModelIndex] = tempObj
      setSelectedMasterData(_selectedMasterData)
      setShowEditIncludeSerialNoModel(false)
    }
  }

  const handleClosePortfolioMenu = () => {
    setPortfolioMenuOpen(!portfolioMenuOpen);
  };

  const handleShowAddSolution = () => {
    setShowAddSolutionModal(!showAddSolutionModal);
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

  const handleCreateSolution = (event) => {
    if (event == "bundle") {
      setCreateNewBundle(true);
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setOpenAddBundleItemHeader("Add New Bundle Item");
    } else if (event == "service") {
      setCreateNewBundle(false);
      setOpenSearchSolution(false);
      setOpenAddBundleItem(true);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (event == "bundleItem") {
      setCreateNewBundle(false);
      setOpenSearchSolution(false);
      setOpenAddBundleItem(true);
      setOpenAddBundleItemHeader("Add New Bundle Item");
    }
  };

  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
    setPrefilgabelGeneral(newAlignment.toUpperCase());
  };

  const handleMenuItemClick = (event, index) => {
    alert();
    // setSelectedIndex(index);
    // setAnchorEl(null);
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

  const handleTypeOfSearchChange = (e) => {
    setTypeOfSearch(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };
  const handleTypeOfSearchColumnChange = (e) => {
    setTypeOfSearchColumn(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };

  const handlePortfolioItemSaveAndContinue = async (itemData, itemPriceData) => {
    try {

      if ((portfolioId == "") ||
        (portfolioId == undefined) ||
        (portfolioId == null)) {
        throw "Please Create Portfolio First, then you can Add Item";
      }

      let reqObj = {
        itemId: 0,
        itemName: itemData.name,
        itemHeaderModel: {
          itemHeaderId: 0,
          itemHeaderDescription: itemData.headerdescription,
          bundleFlag: "PORTFOLIO",
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
          itemHeaderStrategy: itemData.strategyTask !== "" ? itemData.strategyTask?.value : "PREVENTIVE_MAINTENANCE",
          componentCode: "",
          componentDescription: "",
          serialNumber: "",
          variant: "",
          itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != "" ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
          jobCode: "",
          preparedBy: administrative.preparedBy,
          approvedBy: administrative.approvedBy,
          preparedOn: administrative.preparedOn,
          revisedBy: administrative.revisedBy,
          revisedOn: administrative.revisedOn,
          salesOffice: administrative.salesOffice?.value,
          offerValidity: administrative.offerValidity?.value
        },
        itemBodyModel: {
          itemBodyId: 0,
          itemBodyDescription: itemData.description,
          frequency: itemData.frequency != "" ? itemData.frequency?.value : "once",
          spareParts: ["WITH_SPARE_PARTS"],
          labours: ["WITH_LABOUR"],
          miscellaneous: ["LUBRICANTS"],
          taskType: itemData.taskType != "" ? [itemData.taskType.value] : ["PM1"],
          solutionCode: "",
          usageIn: itemData.usageIn != "" ? itemData.usageIn.value : "REPAIR_OR_REPLACE",
          recommendedValue: parseInt(itemData.recommendedValue),
          usage: "",
          year: itemData.year?.value,
          avgUsage: 0,
          unit: itemData.unit != "" ? itemData.unit?.value : "",
          itemPrices: [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ],
        }
      }

      const itemRes = await itemCreation(reqObj);

      if (itemRes.status !== 200) {
        throw "Something went wrong/Item not created"
      }

      let reqObjSJId = {
        itemId: itemRes.data.itemId,
        standardJobId: itemPriceData.standardJobId,
        repairKitId: itemPriceData.repairKitId,
        itemPriceDataId: itemPriceData.itemPriceDataId
      }

      const price_SjIdUpdate = await portfolioItemPriceSjid(reqObjSJId)
      const resPrice = await getItemPriceData(itemPriceData.itemPriceDataId)
      setPriceCalculator({
        ...priceCalculator,
        priceAdditionalSelect: {
          label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
        },
        year: {
          label: resPrice.data.year, value: resPrice.data.year
        },
        noOfYear: resPrice.data.noOfYear,
        startUsage: resPrice.data.startUsage,
        endUsage: resPrice.data.endUsage,
        recommendedValue: resPrice.data.recommendedValue,
        netPrice: resPrice.data.netService,
        totalPrice: resPrice.data.totalPrice,
        id: resPrice.data.itemPriceDataId,
      })
      setCurrentItemId(itemRes.data.itemId);
      setCreatedItemsIdData([...createdItemsIdData, itemRes.data.itemId]);
      const _generalComponentData = { ...generalComponentData };
      _generalComponentData.items?.push({ itemId: itemRes.data.itemId });
      var _itemArrData = [...portfolioItems];
      _itemArrData.push({ itemId: itemRes.data.itemId })
      setPortfolioItems(_itemArrData);

      let obj = {
        portfolioId: portfolioId,
        name: generalComponentData.name,
        description: generalComponentData.description,
        externalReference: generalComponentData.externalReference,
        customerSegment: generalComponentData.customerSegment?.value,

        validFrom: validityData.fromDate,
        validTo: validityData.toDate,

        usageCategory: categoryUsageKeyValue1.value
          ? categoryUsageKeyValue1.value : "EMPTY",
        strategyTask: stratgyTaskUsageKeyValue.value ?
          stratgyTaskUsageKeyValue.value : "EMPTY",
        taskType: stratgyTaskTypeKeyValue.value ?
          stratgyTaskTypeKeyValue.value : "EMPTY",
        responseTime: stratgyResponseTimeKeyValue.value ?
          stratgyResponseTimeKeyValue.value : "EMPTY",
        productHierarchy: stratgyHierarchyKeyValue.value ?
          stratgyHierarchyKeyValue.value : "EMPTY",
        geographic: stratgyGeographicKeyValue.value ?
          stratgyGeographicKeyValue.value : "EMPTY",

        preparedBy: administrative.preparedBy,
        approvedBy: administrative.approvedBy,
        preparedOn: administrative.preparedOn,
        revisedBy: administrative.revisedBy,
        revisedOn: administrative.revisedOn,
        offerValidity: administrative.offerValidity?.value,
        salesOffice: administrative.salesOffice?.value,

        portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
          ? portfolioPriceDataId : null,
        additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
          ? portfolioAdditionalPriceDataId : null,
        escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
          ? portfolioEscalationPriceDataId : null,

        supportLevel: value3.value,
        status: value2.value,

        items: _itemArrData,
        coverages: portfolioCoverage,

        machineType: "NEW",
        searchTerm: "",
        lubricant: true,
        customerId: 0,
        customerGroup: "",
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
        template: true,
        visibleInCommerce: true
      }

      if ((portfolioId !== "" || (portfolioId !== undefined))) {
        const updatePortfolioRes = await updatePortfolio(
          portfolioId,
          obj
        );
        if (updatePortfolioRes.status === 200) {
          toast(`👏 Portfolio ${generalComponentData.name} saved Successfully`, {
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

  const handleBundleItemSaveAndContinue = async (data, itemPriceData) => {

    try {
      // let reqObj = {
      //   itemId: 0,
      //   itemName: addPortFolioItem.name,
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //     // itemHeaderDescription: generalComponentData.description,
      //     itemHeaderDescription: addPortFolioItem.headerdescription,
      //     bundleFlag: "PORTFOLIO",
      //     reference: generalComponentData.externalReference,
      //     itemHeaderMake: "",
      //     itemHeaderFamily: "",
      //     model: "",
      //     prefix: "",
      //     type: "MACHINE",
      //     additional: "",
      //     currency: "",
      //     netPrice: 0,
      //     itemProductHierarchy: generalComponentData.productHierarchy,
      //     itemHeaderGeographic: generalComponentData.geographic,
      //     responseTime: generalComponentData.responseTime,
      //     usage: "",
      //     validFrom: generalComponentData.validFrom,
      //     validTo: generalComponentData.validTo,
      //     estimatedTime: "",
      //     servicePrice: 0,
      //     status: "NEW",
      //   },
      //   itemBodyModel: {
      //     itemBodyId: parseInt(addPortFolioItem.id),
      //     itemBodyDescription: addPortFolioItem.description,
      //     quantity: parseInt(addPortFolioItem.quantity),
      //     startUsage: priceCalculator.startUsage,
      //     endUsage: priceCalculator.endUsage,
      //     standardJobId: "",
      //     frequency: addPortFolioItem.frequency.value,
      //     additional: "",
      //     spareParts: ["WITH_SPARE_PARTS"],
      //     labours: ["WITH_LABOUR"],
      //     miscellaneous: ["LUBRICANTS"],
      //     taskType: [addPortFolioItem.taskType.value],
      //     solutionCode: "",
      //     usageIn: addPortFolioItem.usageIn.value,
      //     recommendedValue: 0,
      //     usage: "",
      //     repairKitId: "",
      //     templateDescription: addPortFolioItem.description.value,
      //     partListId: "",
      //     serviceEstimateId: "",
      //     numberOfEvents: parseInt(addPortFolioItem.numberOfEvents),
      //     repairOption: addPortFolioItem.repairOption.value,
      //     priceMethod: "LIST_PRICE",
      //     listPrice: parseInt(priceCalculator.listPrice),
      //     priceEscalation: "",
      //     calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //     flatPrice: parseInt(priceCalculator.flatPrice),
      //     discountType: "",
      //     // year: priceCalculator.priceYear.value,
      //     year: addPortFolioItem.year,
      //     avgUsage: 0,
      //     unit: addPortFolioItem.unit.value,
      //     sparePartsPrice: 0,
      //     sparePartsPriceBreakDownPercentage: 0,
      //     servicePrice: 0,
      //     servicePriceBreakDownPercentage: 0,
      //     miscPrice: 0,
      //     miscPriceBreakDownPercentage: 0,
      //     totalPrice: 0,
      //   },
      // };

      //  Old Todo
      // let reqObj = {
      //   itemId: 0,
      //   itemName: data.name,
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //     // itemHeaderDescription: generalComponentData.description,
      //     itemHeaderDescription: data.headerdescription,
      //     bundleFlag: "PORTFOLIO",
      //     reference: generalComponentData.externalReference,
      //     itemHeaderMake: "",
      //     itemHeaderFamily: "",
      //     model: "",
      //     prefix: "",
      //     type: "MACHINE",
      //     additional: "",
      //     currency: "",
      //     netPrice: 0,
      //     itemProductHierarchy: generalComponentData.productHierarchy,
      //     itemHeaderGeographic: generalComponentData.geographic,
      //     responseTime: generalComponentData.responseTime,
      //     usage: "",
      //     validFrom: generalComponentData.validFrom,
      //     validTo: generalComponentData.validTo,
      //     estimatedTime: "",
      //     servicePrice: 0,
      //     status: "DRAFT",
      //   },
      //   itemBodyModel: {
      //     itemBodyId: parseInt(data.id),
      //     itemBodyDescription: data.description,
      //     quantity: parseInt(data.quantity),
      //     startUsage: priceCalculator.startUsage,
      //     endUsage: priceCalculator.endUsage,
      //     standardJobId: "",
      //     frequency: data.frequency.value,
      //     additional: "",
      //     spareParts: ["WITH_SPARE_PARTS"],
      //     labours: ["WITH_LABOUR"],
      //     miscellaneous: ["LUBRICANTS"],
      //     taskType: [data.taskType.value],
      //     solutionCode: "",
      //     usageIn: data.usageIn.value,
      //     recommendedValue: 0,
      //     usage: "",
      //     repairKitId: "",
      //     templateDescription: data.description.value,
      //     partListId: "",
      //     serviceEstimateId: "",
      //     numberOfEvents: parseInt(data.numberOfEvents),
      //     repairOption: data.repairOption.value,
      //     priceMethod: "LIST_PRICE",
      //     listPrice: parseInt(priceCalculator.listPrice),
      //     priceEscalation: "",
      //     calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //     flatPrice: parseInt(priceCalculator.flatPrice),
      //     discountType: "",
      //     // year: priceCalculator.priceYear.value,
      //     year: data.year,
      //     avgUsage: 0,
      //     unit: data.unit.value,
      //     sparePartsPrice: 0,
      //     sparePartsPriceBreakDownPercentage: 0,
      //     servicePrice: 0,
      //     servicePriceBreakDownPercentage: 0,
      //     miscPrice: 0,
      //     miscPriceBreakDownPercentage: 0,
      //     totalPrice: 0,
      //   },
      // };

      // New Todo

      let reqObj = {
        itemId: 0,
        itemName: data.name,
        itemHeaderModel: {
          itemHeaderId: 0,
          itemHeaderDescription: data.headerdescription,
          bundleFlag: "PORTFOLIO",
          portfolioItemId: 0,
          reference: generalComponentData.externalReference,
          itemHeaderMake: data?.make,
          itemHeaderFamily: data?.family,
          model: data.model,
          prefix: data.prefix,
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
          itemHeaderStrategy: data.strategyTask !== "" ? data.strategyTask?.value : "PREVENTIVE_MAINTENANCE",
          componentCode: "",
          componentDescription: "",
          serialNumber: "",
          variant: "",
          itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != "" ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
          jobCode: "",
          preparedBy: administrative.preparedBy,
          approvedBy: administrative.approvedBy,
          preparedOn: administrative.preparedOn,
          revisedBy: administrative.revisedBy,
          revisedOn: administrative.revisedOn,
          salesOffice: administrative.salesOffice?.value,
          offerValidity: administrative.offerValidity?.value
        },
        itemBodyModel: {
          itemBodyId: 0,
          itemBodyDescription: data.description,
          frequency: data.frequency != "" ? data.frequency?.value : "once",
          spareParts: ["WITH_SPARE_PARTS"],
          labours: ["WITH_LABOUR"],
          miscellaneous: ["LUBRICANTS"],
          taskType: data.taskType != "" ? [data.taskType.value] : ["PM1"],
          solutionCode: "",
          usageIn: data.usageIn != "" ? data.usageIn.value : "REPAIR_OR_REPLACE",
          recommendedValue: parseInt(data.recommendedValue),
          usage: "",
          year: data.year?.value,
          avgUsage: 0,
          unit: data.unit != "" ? data.unit?.value : "",
          itemPrices: [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ],
        }
      }


      // console.log("new reqObj: 12345 ----- : ", reqObj)

      // console.log("requested obj : ", reqObj);
      // console.log("requested obj 2 : ", addPortFolioItem);

      const itemRes = await itemCreation(reqObj);
      if (itemRes.status !== 200) {
        throw "Something went wrong/Item not created"
      }
      let reqObjSJId = {
        itemId: itemRes.data.itemId,
        standardJobId: itemPriceData.standardJobId,
        repairKitId: itemPriceData.repairKitId,
        itemPriceDataId: itemPriceData.itemPriceDataId
      }
      const priceSJIDResult2 = await portfolioItemPriceSjid(reqObjSJId)
      const resPrice = await getItemPriceData(itemPriceData.itemPriceDataId)
      setPriceCalculator({
        ...priceCalculator,
        priceAdditionalSelect: {
          label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
        },
        year: {
          label: resPrice.data.year, value: resPrice.data.year
        },
        noOfYear: resPrice.data.noOfYear,
        startUsage: resPrice.data.startUsage,
        endUsage: resPrice.data.endUsage,
        recommendedValue: resPrice.data.recommendedValue,
        netPrice: resPrice.data.netService,
        totalPrice: resPrice.data.totalPrice,
        id: resPrice.data.itemPriceDataId,
      })
      setCurrentItemId(itemRes.data.itemId);
      setCreatedItemsIdData([...createdItemsIdData, itemRes.data.itemId]);
      const _generalComponentData = { ...generalComponentData };
      _generalComponentData.items?.push({ itemId: itemRes.data.itemId });
      var _itemArrData = [...portfolioItems];
      _itemArrData.push({ itemId: itemRes.data.itemId })
      setPortfolioItems(_itemArrData);
      // put API for porfolio update Item id
      // call here
      // const { portfolioId, ...res } = generalComponentData;
      // let obj = {
      //   ...res,
      //   visibleInCommerce: true,
      //   customerId: 0,
      //   lubricant: true,
      //   customerSegment: generalComponentData.customerSegment
      //     ? generalComponentData.customerSegment.value
      //     : "EMPTY",
      //   machineType: generalComponentData.machineType
      //     ? generalComponentData.machineType
      //     : "EMPTY",
      //   strategyTask: generalComponentData.strategyTask
      //     ? generalComponentData.strategyTask
      //     : "EMPTY",
      //   taskType: generalComponentData.taskType
      //     ? generalComponentData.taskType
      //     : "EMPTY",
      //   usageCategory: generalComponentData.usageCategory
      //     ? generalComponentData.usageCategory
      //     : "EMPTY",
      //   productHierarchy: generalComponentData.productHierarchy
      //     ? generalComponentData.productHierarchy
      //     : "EMPTY",
      //   geographic: generalComponentData.geographic
      //     ? generalComponentData.geographic
      //     : "EMPTY",
      //   availability: generalComponentData.availability
      //     ? generalComponentData.availability
      //     : "EMPTY",
      //   responseTime: generalComponentData.responseTime
      //     ? generalComponentData.responseTime
      //     : "EMPTY",
      //   type: generalComponentData.type ? generalComponentData.type : "EMPTY",
      //   application: generalComponentData.application
      //     ? generalComponentData.application
      //     : "EMPTY",
      //   contractOrSupport: generalComponentData.contractOrSupport
      //     ? generalComponentData.contractOrSupport
      //     : "EMPTY",
      //   lifeStageOfMachine: generalComponentData.lifeStageOfMachine
      //     ? generalComponentData.lifeStageOfMachine
      //     : "EMPTY",
      //   supportLevel: generalComponentData.supportLevel
      //     ? generalComponentData.supportLevel
      //     : "EMPTY",
      //   customerGroup: generalComponentData.customerGroup
      //     ? generalComponentData.customerGroup
      //     : "EMPTY",
      //   searchTerm: "EMPTY",

      //   usageCategory: categoryUsageKeyValue1.value
      //     ? categoryUsageKeyValue1.value : "EMPTY",
      //   strategyTask: stratgyTaskUsageKeyValue.value ?
      //     stratgyTaskUsageKeyValue.value : "EMPTY",
      //   taskType: stratgyTaskTypeKeyValue.value ?
      //     stratgyTaskTypeKeyValue.value : "EMPTY",
      //   responseTime: stratgyResponseTimeKeyValue.value ?
      //     stratgyResponseTimeKeyValue.value : "EMPTY",
      //   productHierarchy: stratgyHierarchyKeyValue.value ?
      //     stratgyHierarchyKeyValue.value : "EMPTY",
      //   geographic: stratgyGeographicKeyValue.value ?
      //     stratgyGeographicKeyValue.value : "EMPTY",

      //   preparedBy: administrative.preparedBy,
      //   approvedBy: administrative.approvedBy,
      //   preparedOn: administrative.preparedOn,
      //   revisedBy: administrative.revisedBy,
      //   revisedOn: administrative.revisedOn,
      //   offerValidity: administrative.offerValidity?.value,
      //   salesOffice: administrative.salesOffice?.value,

      //   portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
      //     ? portfolioPriceDataId : null,
      //   additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
      //     ? portfolioAdditionalPriceDataId : null,
      //   escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
      //     ? portfolioEscalationPriceDataId : null,

      //   supportLevel: value3.value,
      //   status: value2.value,

      //   items: _itemArrData,
      //   coverages: portfolioCoverage,

      // };

      let obj = {
        portfolioId: portfolioId,
        name: generalComponentData.name,
        description: generalComponentData.description,
        externalReference: generalComponentData.externalReference,
        customerSegment: generalComponentData.customerSegment?.value,

        validFrom: validityData.fromDate,
        validTo: validityData.toDate,

        usageCategory: categoryUsageKeyValue1.value
          ? categoryUsageKeyValue1.value : "EMPTY",
        strategyTask: stratgyTaskUsageKeyValue.value ?
          stratgyTaskUsageKeyValue.value : "EMPTY",
        taskType: stratgyTaskTypeKeyValue.value ?
          stratgyTaskTypeKeyValue.value : "EMPTY",
        responseTime: stratgyResponseTimeKeyValue.value ?
          stratgyResponseTimeKeyValue.value : "EMPTY",
        productHierarchy: stratgyHierarchyKeyValue.value ?
          stratgyHierarchyKeyValue.value : "EMPTY",
        geographic: stratgyGeographicKeyValue.value ?
          stratgyGeographicKeyValue.value : "EMPTY",

        preparedBy: administrative.preparedBy,
        approvedBy: administrative.approvedBy,
        preparedOn: administrative.preparedOn,
        revisedBy: administrative.revisedBy,
        revisedOn: administrative.revisedOn,
        offerValidity: administrative.offerValidity?.value,
        salesOffice: administrative.salesOffice?.value,

        portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
          ? portfolioPriceDataId : null,
        additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
          ? portfolioAdditionalPriceDataId : null,
        escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
          ? portfolioEscalationPriceDataId : null,

        supportLevel: value3.value,
        status: value2.value,

        items: _itemArrData,
        coverages: portfolioCoverage,

        machineType: "NEW",
        searchTerm: "",
        lubricant: true,
        customerId: 0,
        customerGroup: "",
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
        template: true,
        visibleInCommerce: true
      }

      console.log("generalComponentData.portfolioId 1337 : ", portfolioId)

      if ((portfolioId !== "" || (portfolioId !== undefined))) {
        const updatePortfolioRes = await updatePortfolio(
          portfolioId,
          obj
        );
        if (updatePortfolioRes.status === 200) {
          toast(`👏 Portfolio ${generalComponentData.name} saved Successfully`, {
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

      // if (generalComponentData.portfolioId) {
      //   const updatePortfolioRes = await updatePortfolio(
      //     portfolioId,
      //     obj
      //   );
      //   if (updatePortfolioRes.status === 200) {
      //     toast(`👏 Portfolio ${generalComponentData.name} saved Successfully`, {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   } else {
      //     throw `${updatePortfolioRes.status}:Something went wrong`;
      //   }
      //   // if (updatePortfolioRes.status != 200) {
      //   //   throw `${updatePortfolioRes.status}:Something went wrong`;
      //   // }
      // }

      setGeneralComponentData(_generalComponentData);
      setTempBundleItems([...tempBundleItems, itemRes.data]);

      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
    } catch (error) {
      console.log("error in item creation err:", error);
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

  const saveAddNewServiceOrBundle = async () => {
    try {
      // if (editBundleService) {

      //   // let reqObj = {
      //   //   itemId: parseInt(addPortFolioItem.id),
      //   //   itemName: addPortFolioItem.name,
      //   //   itemHeaderModel: {
      //   //     itemHeaderId: 0,
      //   //     itemHeaderDescription: addPortFolioItem.description,
      //   //     bundleFlag: compoFlagData,
      //   //     portfolioItemId: bundleServicePortfolioItemId,
      //   //     reference: createServiceOrBundle?.reference ? createServiceOrBundle?.reference : "",
      //   //     itemHeaderMake: createServiceOrBundle?.make ? createServiceOrBundle?.make : "",
      //   //     itemHeaderFamily: createServiceOrBundle?.family ? createServiceOrBundle?.family : "",
      //   //     model: createServiceOrBundle?.model ? createServiceOrBundle?.model : "",
      //   //     prefix: createServiceOrBundle?.prefix?.value ? createServiceOrBundle?.prefix?.value : "",
      //   //     type: "MACHINE",
      //   //     additional: createServiceOrBundle?.additional?.value ? createServiceOrBundle?.additional?.value : "",
      //   //     currency: "",
      //   //     netPrice: 0,
      //   //     itemProductHierarchy: "END_PRODUCT",
      //   //     itemHeaderGeographic: "ONSITE",
      //   //     responseTime: "PROACTIVE",
      //   //     usage: "",
      //   //     validFrom: validityData?.fromDate ? validityData?.fromDate : "",
      //   //     validTo: validityData?.toDate ? validityData?.toDate : "",
      //   //     estimatedTime: "",
      //   //     servicePrice: 0,
      //   //     status: "DRAFT",
      //   //     componentCode: "",
      //   //     componentDescription: "",
      //   //     serialNumber: "",
      //   //     itemHeaderStrategy: "PREVENTIVE_MAINTENANCE",
      //   //     variant: "",
      //   //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
      //   //       ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
      //   //     jobCode: "",
      //   //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
      //   //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
      //   //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
      //   //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
      //   //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
      //   //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
      //   //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
      //   //   },
      //   //   itemBodyModel: {
      //   //     itemBodyId: 0,
      //   //     itemBodyDescription: addPortFolioItem.description,
      //   //     spareParts: ["WITH_SPARE_PARTS"],
      //   //     labours: ["WITH_LABOUR"],
      //   //     miscellaneous: ["LUBRICANTS"],
      //   //     taskType: addPortFolioItem.taskType != "" ? [addPortFolioItem.taskType.value] : ["PM1"],
      //   //     solutionCode: "",
      //   //     usageIn: addPortFolioItem.usageIn != "" ? addPortFolioItem.usageIn.value : "REPAIR_OR_REPLACE",
      //   //     usage: "",
      //   //     year: addPortFolioItem.year?.value ? addPortFolioItem.year?.value : "",
      //   //     avgUsage: 0,
      //   //     unit: addPortFolioItem.unit != "" ? addPortFolioItem.unit?.value : "",
      //   //     frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
      //   //     recommendedValue: parseInt(addPortFolioItem.recommendedValue),
      //   //     itemPrices: (editAbleItemPriceData?.itemPriceDataId == "" ||
      //   //       editAbleItemPriceData.itemPriceDataId == undefined) ? [] : [
      //   //       {
      //   //         itemPriceDataId: editAbleItemPriceData.itemPriceDataId
      //   //       }
      //   //     ],
      //   //   },
      //   // }

      //   // console.log("reqObj 1370 is : ", reqObj);
      //   // const itemUpdateRes = await updateItemData(
      //   //   addPortFolioItem.id,
      //   //   reqObj
      //   // );
      // } else {

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

      const res = await itemCreation(reqObj);
      setCurrentItemId(res.data.itemId);
      if (res.status == 200) {
        toast(`👏 ${serviceOrBundlePrefix} created`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const itemPriceRes = await getItemPrice({
          standardJobId: res.data.itemBodyModel.standardJobId,
          repairKitId: res.data.itemBodyModel.repairKitId,
          itemId: res.data.itemId,
        });
        const {
          priceMethod,
          listPrice,
          priceEscalation,
          additional,
          calculatedPrice,
          flatPrice,
          discountType,
          year,
          totalPrice,
          usage,
          avgUsage,
          frequency,
        } = itemPriceRes.itemBodyModel;

        setPriceCalculator({
          ...priceCalculator,
          priceMethod: { label: priceMethod, value: priceMethod },
          listPrice,
          priceEscalationInput: priceEscalation,
          priceAdditionalInput: additional,
          calculatedPrice,
          flatPrice,
          discountTypeInput: discountType,
          priceYear: { label: year, value: year },
          totalPrice,
          frequency: { label: frequency, value: frequency },
          usageType: { label: usage, value: usage },
          startUsage: avgUsage,
          endUsage: avgUsage,
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
        setBundleItems(_bundleItems);
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
          coverages: generalComponentData.coverages
            ? generalComponentData.coverages
            : [],
          items: [...generalComponentData.items, { itemId: res.data.itemId }],
          usageCategory: categoryUsageKeyValue1.value,
          taskType: stratgyTaskTypeKeyValue.value,
          strategyTask: stratgyTaskUsageKeyValue.value,
          responseTime: stratgyResponseTimeKeyValue.value,
          productHierarchy: stratgyHierarchyKeyValue.value,
          geographic: stratgyGeographicKeyValue.value,
        };
        console.log("request obj for update:", obj);
        if (generalComponentData.portfolioId) {
          const updatePortfolioRes = await updatePortfolio(
            generalComponentData.portfolioId,
            obj
          );
          if (updatePortfolioRes.status == 200) {
            toast(`👏 Portfolio <${generalComponentData.name}> saved Successfully`, {
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
          // if (updatePortfolioRes.status != 200) {
          //   throw `${updatePortfolioRes.status}:Something went wrong`;
          // }
        } else {
          throw `Please Create portfolio first`;
        }
      } else {
        throw `${res.status}: ${serviceOrBundlePrefix} not created`;
      }
      // }
    } catch (error) {
      console.log("itemCreation err:", error);
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

  const showPriceDataOfBundleOrService = async (bundleServiceData) => {
    // setBundleServicePriceCalculator
    // serviceOrBundlePrefix={serviceOrBundlePrefix}
    if (bundleServiceData.itemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
      setServiceOrBundlePrefix("BUNDLE");
    } else if (bundleServiceData.itemHeaderModel.bundleFlag === "SERVICE") {
      setServiceOrBundlePrefix("SERVICE");
    }

    console.log("bundleServiceData.itemBodyModel : ", bundleServiceData.itemBodyModel)

    if (bundleServiceData.itemBodyModel.itemPrices.length > 0) {
      const rObjId = bundleServiceData.itemBodyModel.itemPrices[0].itemPriceDataId;

      const res = await getItemPriceData(rObjId)
      console.log("ressss : ", res)
      var newVal = res.data;
      setPriceCalculator(res.data)
    }

    setBundleServicePriceCalculator(true);
  }

  const handleSavePrices = async () => {
    try {
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
      const { data, status } = await updateItemData(currentItemId, reqObj);
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

  const handleItemEditSave = async (addPortFolioItem, editAbleItemPriceData, compoFlagData) => {

    try {

      if (compoFlagData == "BUNDLE_ITEM" || compoFlagData == "SERVICE") {

        if ((editAbleItemPriceData?.itemPriceDataId != "") ||
          (editAbleItemPriceData?.itemPriceDataId != undefined)) {
          let priceUpdateData = {
            itemPriceDataId: editAbleItemPriceData.itemPriceDataId,
            quantity: parseInt(addPortFolioItem.quantity),
            startUsage: addPortFolioItem.startUsage,
            endUsage: addPortFolioItem.endUsage,
            standardJobId: addPortFolioItem.templateId,
            repairKitId: addPortFolioItem.repairOption,
            templateDescription: addPortFolioItem.templateDescription?.value,
            repairOption: editAbleItemPriceData.repairOption,
            additional: editAbleItemPriceData.additional,
            partListId: editAbleItemPriceData.partListId,
            serviceEstimateId: editAbleItemPriceData.serviceEstimateId,
            numberOfEvents: addPortFolioItem.numberOfEvents,
            priceMethod: editAbleItemPriceData.priceMethod,
            priceType: editAbleItemPriceData.priceType,
            listPrice: editAbleItemPriceData.listPrice,
            priceEscalation: editAbleItemPriceData.priceEscalation,
            calculatedPrice: editAbleItemPriceData.calculatedPrice,
            flatPrice: editAbleItemPriceData.flatPrice,
            discountType: editAbleItemPriceData.discountType,
            year: addPortFolioItem.year?.value,
            noOfYear: addPortFolioItem.noOfYear,
            sparePartsPrice: editAbleItemPriceData.sparePartsPrice,
            sparePartsPriceBreakDownPercentage: editAbleItemPriceData.sparePartsPriceBreakDownPercentage,
            servicePrice: editAbleItemPriceData.servicePrice,
            labourPrice: editAbleItemPriceData.labourPrice,
            labourPriceBreakDownPercentage: editAbleItemPriceData.labourPriceBreakDownPercentage,
            miscPrice: editAbleItemPriceData.miscPrice,
            miscPriceBreakDownPercentage: editAbleItemPriceData.miscPriceBreakDownPercentage,
            totalPrice: editAbleItemPriceData.totalPrice,
            netService: editAbleItemPriceData.netService,
            portfolio: {
              portfolioId: portfolioId
            },
            tenantId: editAbleItemPriceData.tenantId,
            partsRequired: true,
            serviceRequired: false,
            labourRequired: true,
            miscRequired: true
          }
          // console.log("priceUpdateData Now : ", priceUpdateData)
          const updatePriceId = await updateItemPriceData(
            editAbleItemPriceData.itemPriceDataId,
            priceUpdateData
          );
          setItemPriceData(updatePriceId.data)
        }

        let reqObj = {
          itemId: parseInt(addPortFolioItem.id),
          itemName: addPortFolioItem.name,
          itemHeaderModel: {
            itemHeaderId: 0,
            itemHeaderDescription: addPortFolioItem.description,
            bundleFlag: compoFlagData,
            portfolioItemId: bundleServicePortfolioItemId,
            reference: createServiceOrBundle?.reference ? createServiceOrBundle?.reference : "",
            itemHeaderMake: createServiceOrBundle?.make ? createServiceOrBundle?.make : "",
            itemHeaderFamily: createServiceOrBundle?.family ? createServiceOrBundle?.family : "",
            model: createServiceOrBundle?.model ? createServiceOrBundle?.model : "",
            prefix: createServiceOrBundle?.prefix?.value ? createServiceOrBundle?.prefix?.value : "",
            type: "MACHINE",
            additional: createServiceOrBundle?.additional?.value ? createServiceOrBundle?.additional?.value : "",
            currency: "",
            netPrice: 0,
            itemProductHierarchy: "END_PRODUCT",
            itemHeaderGeographic: "ONSITE",
            responseTime: "PROACTIVE",
            usage: "",
            validFrom: validityData?.fromDate ? validityData?.fromDate : "",
            validTo: validityData?.toDate ? validityData?.toDate : "",
            estimatedTime: "",
            servicePrice: 0,
            status: "DRAFT",
            componentCode: "",
            componentDescription: "",
            serialNumber: "",
            itemHeaderStrategy: "PREVENTIVE_MAINTENANCE",
            variant: "",
            itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
              ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
            jobCode: "",
            preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
          },
          itemBodyModel: {
            itemBodyId: 0,
            itemBodyDescription: addPortFolioItem.description,
            spareParts: ["WITH_SPARE_PARTS"],
            labours: ["WITH_LABOUR"],
            miscellaneous: ["LUBRICANTS"],
            taskType: addPortFolioItem.taskType != "" ? [addPortFolioItem.taskType.value] : ["PM1"],
            solutionCode: "",
            usageIn: addPortFolioItem.usageIn != "" ? addPortFolioItem.usageIn.value : "REPAIR_OR_REPLACE",
            usage: "",
            year: addPortFolioItem.year?.value ? addPortFolioItem.year?.value : "",
            avgUsage: 0,
            unit: addPortFolioItem.unit != "" ? addPortFolioItem.unit?.value : "",
            frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
            recommendedValue: parseInt(addPortFolioItem.recommendedValue),
            itemPrices: (editAbleItemPriceData?.itemPriceDataId == "" ||
              editAbleItemPriceData.itemPriceDataId == undefined) ? [] : [
              {
                itemPriceDataId: editAbleItemPriceData.itemPriceDataId
              }
            ],
          },
        }

        console.log("reqObj is : ", reqObj);
        const itemUpdateRes = await updateItemData(
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
        // setEditItemShow(false); //hide screen

        if ((editAbleItemPriceData?.itemPriceDataId != "") ||
          (editAbleItemPriceData?.itemPriceDataId != undefined)) {
          let priceUpdateData = {
            itemPriceDataId: editAbleItemPriceData.itemPriceDataId,
            quantity: parseInt(addPortFolioItem.quantity),
            startUsage: addPortFolioItem.startUsage,
            endUsage: addPortFolioItem.endUsage,
            standardJobId: addPortFolioItem.templateId,
            repairKitId: addPortFolioItem.repairOption,
            templateDescription: addPortFolioItem.templateDescription?.value,
            repairOption: editAbleItemPriceData.repairOption,
            additional: editAbleItemPriceData.additional,
            partListId: editAbleItemPriceData.partListId,
            serviceEstimateId: editAbleItemPriceData.serviceEstimateId,
            numberOfEvents: addPortFolioItem.numberOfEvents,
            priceMethod: editAbleItemPriceData.priceMethod,
            priceType: editAbleItemPriceData.priceType,
            listPrice: editAbleItemPriceData.listPrice,
            priceEscalation: editAbleItemPriceData.priceEscalation,
            calculatedPrice: editAbleItemPriceData.calculatedPrice,
            flatPrice: editAbleItemPriceData.flatPrice,
            discountType: editAbleItemPriceData.discountType,
            year: addPortFolioItem.year?.value,
            noOfYear: addPortFolioItem.noOfYear,
            sparePartsPrice: editAbleItemPriceData.sparePartsPrice,
            sparePartsPriceBreakDownPercentage: editAbleItemPriceData.sparePartsPriceBreakDownPercentage,
            servicePrice: editAbleItemPriceData.servicePrice,
            labourPrice: editAbleItemPriceData.labourPrice,
            labourPriceBreakDownPercentage: editAbleItemPriceData.labourPriceBreakDownPercentage,
            miscPrice: editAbleItemPriceData.miscPrice,
            miscPriceBreakDownPercentage: editAbleItemPriceData.miscPriceBreakDownPercentage,
            totalPrice: editAbleItemPriceData.totalPrice,
            netService: editAbleItemPriceData.netService,
            portfolio: {
              portfolioId: portfolioId
            },
            tenantId: editAbleItemPriceData.tenantId,
            partsRequired: true,
            serviceRequired: false,
            labourRequired: true,
            miscRequired: true
          }
          // console.log("priceUpdateData Now : ", priceUpdateData)
          const updatePriceId = await updateItemPriceData(
            editAbleItemPriceData.itemPriceDataId,
            priceUpdateData
          );
          setItemPriceData(updatePriceId.data)
        }

        let reqObj = {
          itemId: parseInt(addPortFolioItem.id),
          itemName: addPortFolioItem.name,
          itemHeaderModel: {
            itemHeaderId: 0,
            itemHeaderDescription: addPortFolioItem.description,
            bundleFlag: compoFlagData,
            portfolioItemId: 0,
            reference: createServiceOrBundle?.reference ? createServiceOrBundle?.reference : "",
            itemHeaderMake: createServiceOrBundle?.make ? createServiceOrBundle?.make : "",
            itemHeaderFamily: createServiceOrBundle?.family ? createServiceOrBundle?.family : "",
            model: createServiceOrBundle?.model ? createServiceOrBundle?.model : "",
            prefix: createServiceOrBundle?.prefix?.value ? createServiceOrBundle?.prefix?.value : "",
            type: "MACHINE",
            additional: createServiceOrBundle?.additional?.value ? createServiceOrBundle?.additional?.value : "",
            currency: "",
            netPrice: 0,
            itemProductHierarchy: "END_PRODUCT",
            itemHeaderGeographic: "ONSITE",
            responseTime: "PROACTIVE",
            usage: "",
            validFrom: validityData?.fromDate ? validityData?.fromDate : "",
            validTo: validityData?.toDate ? validityData?.toDate : "",
            estimatedTime: "",
            servicePrice: 0,
            status: "DRAFT",
            componentCode: "",
            componentDescription: "",
            serialNumber: "",
            itemHeaderStrategy: "PREVENTIVE_MAINTENANCE",
            variant: "",
            itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
              ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
            jobCode: "",
            preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
          },
          itemBodyModel: {
            itemBodyId: 0,
            itemBodyDescription: addPortFolioItem.description,
            spareParts: ["WITH_SPARE_PARTS"],
            labours: ["WITH_LABOUR"],
            miscellaneous: ["LUBRICANTS"],
            taskType: addPortFolioItem.taskType != "" ? [addPortFolioItem.taskType.value] : ["PM1"],
            solutionCode: "",
            usageIn: addPortFolioItem.usageIn != "" ? addPortFolioItem.usageIn.value : "REPAIR_OR_REPLACE",
            usage: "",
            year: addPortFolioItem.year?.value ? addPortFolioItem.year?.value : "",
            avgUsage: 0,
            unit: addPortFolioItem.unit != "" ? addPortFolioItem.unit?.value : "",
            frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
            recommendedValue: parseInt(addPortFolioItem.recommendedValue),
            itemPrices: (editAbleItemPriceData?.itemPriceDataId == "" ||
              editAbleItemPriceData.itemPriceDataId == undefined) ? [] : [
              {
                itemPriceDataId: editAbleItemPriceData.itemPriceDataId
              }
            ],
          },
        }

        console.log("reqObj is : ", reqObj);
        const itemUpdateRes = await updateItemData(
          addPortFolioItem.id,
          reqObj
        );

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
          setTabs("2");
          console.log("itemUpdateRes is  : ", itemUpdateRes);
          // setTempBundleItems([itemUpdateRes.data]);
          // setTempBundleItems([...tempBundleItems, itemUpdateRes.data]);
          setCurrentItemId(addPortFolioItem.id)
        }

        const _bundleItems = [...bundleItems];
        // to check if itemEdit or bundle/service edit
        if (!(editItemShow && passItemEditRowData._bundleId)) {
          for (let i = 0; i < _bundleItems.length; i++) {
            if (_bundleItems[i].itemId == passItemEditRowData._itemId) {
              // let obj = {
              //   ...data,
              //   associatedServiceOrBundle:
              //   _bundleItems[i].associatedServiceOrBundle,
              // };
              let obj = {
                ..._bundleItems[i],
                associatedServiceOrBundle:
                  _bundleItems[i].associatedServiceOrBundle,
              };
              _bundleItems[i] = obj;
              // setTempBundleItems([...tempBundleItems, _bundleItems[i]]);
              setTempBundleItems([_bundleItems[i]]);
              break;
            }
          }
          setBundleItems(_bundleItems);

        }
        //  else {
        //   for (let i = 0; i < _bundleItems.length; i++) {
        //     if (_bundleItems[i].itemId == passItemEditRowData._itemId) {
        //       for (
        //         let j = 0;
        //         j < _bundleItems[i].associatedServiceOrBundle.length;
        //         j++
        //       ) {
        //         if (
        //           _bundleItems[i].associatedServiceOrBundle[j].itemId ==
        //           passItemEditRowData._bundleId
        //         ) {
        //           _bundleItems[i].associatedServiceOrBundle[j] = data;
        //           break;
        //         }
        //       }
        //       break;
        //     }
        //   }
        //   setBundleItems(_bundleItems);
        // }
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

  const handleAddNewBundle = () => {
    // alert("Save And Continue")
    var temp = [...bundleItems];
    var bundleId = Math.floor(Math.random() * 100);
    var dict = {
      id: 1,
      bundleId: "PM" + bundleId,
      bundleDescription: "Preventive Maintenance " + bundleId,
      strategy: "Preventive Maintenance",
      standardJobId: "SJ1034",
      frequency: "125 hours",
      quantity: "4",
      part: "$1250",
      service: "$350",
      total: "$1575",
      action: "-",
    };
    temp.push(dict);
    setBundleItems(temp);
    setOpenAddBundleItem(false);
    setOpenSearchSolution(false);
    setCreateNewBundle(true);
    toast("👏 Bundle Added", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setCreateNewBundle(false);
  };

  const handleEditPortfolioItem = (e, row) => {

    console.log("row 1942 : ", row);
    setTempBundleService3(row.associatedServiceOrBundle)
    // data.associatedServiceOrBundle?.map((bundleAndService, i)
    setTabs("1");
    setItemModelShow(true);
    setPortfolioItemDataEditable(true);
    setPassItemEditRowData({ ...row, _itemId: row.itemId });

    setOpenSearchSolution(false);
    setCreateNewBundle(false);
    setOpenAddBundleItemHeader("Add New Portfolio Item");
  }

  const handleNewBundleItem = () => {

    setTabs("1");
    setItemModelShow(true);

    setOpenSearchSolution(false);
    setCreateNewBundle(false);
    setOpenAddBundleItemHeader("Add New Portfolio Item");

  };

  const handleServiceItemEdit = (e, row) => {
    if (value2.value == "ACTIVE") {
      toast("😐" + " Portfolio is Active", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setEditItemShow(true);
      setPassItemEditRowData({ ...row, _itemId: row.itemId });
    }
  };
  const handleServiceItemDelete = async (e, row) => {
    try {
      const delRes = await deleteItem(row.itemId);
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
  };

  const handleServiceItemSave = async (e, row) => {
    // const res=await updateItemData(itemId,payLoad)
    // console.log("handleServiceItemSave",res)
    alert("save");
  };

  const handleCreateNewServiceBundle = () => {
    if (typeOfSearch.value == "bundle") {
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setCreateNewBundle(true);
      setOpenAddBundleItemHeader("Add New Bundle");
    } else if (typeOfSearch.value == "service") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (typeOfSearch.value == "portfolioItem") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
  };
  const handleCreateNewItem = () => {
    if (itemHeaderSearch.searchBy.value == "bundle") {
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setCreateNewBundle(true);
      setOpenAddBundleItemHeader("Add New Bundle");
    } else if (itemHeaderSearch.searchBy.value == "service") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (itemHeaderSearch.searchBy.value == "portfolioItem") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
  };

  //  Convert To :- Quotes function onClick Create


  const handleCreateQuote = async () => {
    // alert("hello");

    try {

      if (portfolioId == "" || portfolioId == undefined) {
        setConvertToPopup(false);
        throw "Please Create Portfolio First";
      } else {
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
          validFrom: "2022-11-14",
          validTo: "2022-11-14",
          quantity: 0,
          // customPortfolioModels: portfolioId ? [
          //   { customPortfolioId: portfolioId }
          // ] : [],
          customPortfolioModels: [],
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
            promisedDeliveryDate: "2022-11-14",
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

        const quoteRes = await quoteCreation(quoteObj);
        console.log("quoteRes : ", quoteRes);

        setQuoteData({ ...quoteData, contact: quoteRes.data.quoteMasterId })
        setQuoteDataShow(true);
      }
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
      // setConvertToPopup(false);
      return;
    }

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
      validFrom: "2022-11-14",
      validTo: "2022-11-14",
      quantity: 0,
      // customPortfolioModels: portfolioId ? [
      //   { customPortfolioId: portfolioId }
      // ] : [],
      customPortfolioModels: [],
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
        promisedDeliveryDate: "2022-11-14",
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

    // console.log("Quote Object is : ", quoteObj)

    const quoteRes = await quoteCreation(quoteObj);
    console.log("quoteRes : ", quoteRes);

    // console.log("quote Response data is : ", quoteRes.data)
    setQuoteData({ ...quoteData, contact: quoteRes.data.quoteMasterId })

    // console.log("quoteData : ", quoteData);
    setQuoteDataShow(true);
  }

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
  const handleAddBundleDropdownChange = (type, e) => {
    if (type == ENUM.MACHINE_COMPONENT) {
      setNewBundle({
        ...newBundle,
        machineComponent: e,
      });
    } else if (type == ENUM.MACHINE_TYPE) {
      setCoverageData({
        ...coverageData,
        machineType: e,
      });
    }
  };
  const handleNextClick = async (e) => {
    try {
      if (e.target.id == "general") {
        console.log("state general : ", state)
        console.log("state.type general : ", state.type)


        if (prefilgabelGeneral === "") {
          throw "Select Type is a required field, you can’t leave it blank";
        }
        if ((generalComponentData.name === "") ||
          (generalComponentData.name == null)) {
          throw `${prefilgabelGeneral == "PORTFOLIO" ? "Portfolio " : prefilgabelGeneral == "PROGRAM" ? "Program " : ""}Name is a required field, you can’t leave it blank`;
        }
        if ((generalComponentData.externalReference === "") ||
          (generalComponentData.externalReference === null)) {
          throw "Reference is a required field, you can’t leave it blank";
        }

        // if (
        //   generalComponentData.name === "" ||
        //   generalComponentData.name == null ||
        //   generalComponentData.externalReference === "" ||
        //   generalComponentData.externalReference === null ||
        //   prefilgabelGeneral === ""
        // ) {
        //   throw "Please fill mandatory field properly";
        // }
        // alert(state.type)
        if (state && state.type === "fetch") {
          // Old Todo Obj
          // let reqObj = {
          //   portfolioId: portfolioId,
          //   // type: prefilgabelGeneral,
          //   type: "MACHINE",

          //   name: generalComponentData.name,
          //   description: generalComponentData.description,
          //   customerSegment: generalComponentData.customerSegment?.value,
          //   externalReference: generalComponentData.externalReference,

          //   validFrom: validityData.fromDate,
          //   validTo: validityData.fromDate,

          //   usageCategory: categoryUsageKeyValue1.value,
          //   strategyTask: stratgyTaskUsageKeyValue.value,
          //   taskType: stratgyTaskTypeKeyValue.value,
          //   responseTime: stratgyResponseTimeKeyValue.value,
          //   productHierarchy: stratgyHierarchyKeyValue.value,
          //   geographic: stratgyGeographicKeyValue.value,

          //   preparedBy: administrative.preparedBy,
          //   approvedBy: administrative.approvedBy,
          //   preparedOn: administrative.preparedOn,
          //   revisedBy: administrative.revisedBy,
          //   revisedOn: administrative.revisedOn,
          //   offerValidity: administrative.offerValidity?.value,
          //   salesOffice: administrative.salesOffice?.value,

          //   machineType: generalComponentData?.machineType
          //     ? generalComponentData?.machineType
          //     : "EMPTY",
          //   searchTerm: "EMPTY",
          //   lubricant: true,
          //   customerId: 0,
          //   customerGroup: generalComponentData?.customerGroup
          //     ? generalComponentData?.customerGroup
          //     : "EMPTY",
          //   status: generalComponentData?.status
          //     ? generalComponentData?.status
          //     : "EMPTY",
          //   availability: generalComponentData?.availability
          //     ? generalComponentData?.availability
          //     : "EMPTY",
          //   application: generalComponentData?.application
          //     ? generalComponentData?.application
          //     : "EMPTY",
          //   contractOrSupport: generalComponentData?.contractOrSupport
          //     ? generalComponentData?.contractOrSupport
          //     : "EMPTY",
          //   lifeStageOfMachine: "NEW_BREAKIN",
          //   // supportLevel: "PREMIUM",
          //   supportLevel: value3.value,
          //   status: value2.value,
          //   numberOfEvents: 0,
          //   itemRelations: [],
          //   rating: "string",
          //   startUsage: 0,
          //   endUsage: 0,
          //   unit: "HOURS",
          //   additionals: "string",
          //   portfolioPrice: null,
          //   additionalPrice: null,
          //   escalationPrice: null,
          //   saveState: false,
          //   userId: null,
          //   visibleInCommerce: true,
          //   template: true,
          // }

          // New Todo Obj

          let reqObj = {
            portfolioId: portfolioId,
            name: generalComponentData.name,
            description: generalComponentData.description,
            externalReference: generalComponentData.externalReference,
            customerSegment: generalComponentData.customerSegment?.value,

            validFrom: validityData.fromDate,
            validTo: validityData.toDate,

            usageCategory: categoryUsageKeyValue1.value
              ? categoryUsageKeyValue1.value : "EMPTY",
            strategyTask: stratgyTaskUsageKeyValue.value ?
              stratgyTaskUsageKeyValue.value : "EMPTY",
            taskType: stratgyTaskTypeKeyValue.value ?
              stratgyTaskTypeKeyValue.value : "EMPTY",
            responseTime: stratgyResponseTimeKeyValue.value ?
              stratgyResponseTimeKeyValue.value : "EMPTY",
            productHierarchy: stratgyHierarchyKeyValue.value ?
              stratgyHierarchyKeyValue.value : "EMPTY",
            geographic: stratgyGeographicKeyValue.value ?
              stratgyGeographicKeyValue.value : "EMPTY",

            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            offerValidity: administrative.offerValidity?.value,
            salesOffice: administrative.salesOffice?.value,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            supportLevel: value3.value,
            status: value2.value,

            items: portfolioItems,
            coverages: portfolioCoverage,

            machineType: "NEW",
            searchTerm: "",
            lubricant: true,
            customerId: 0,
            customerGroup: "",
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
            template: true,
            visibleInCommerce: true
          }


          const exitsPortfolioUpdate = await updatePortfolio(
            portfolioId,
            reqObj
          );
          if (exitsPortfolioUpdate.status === 200) {
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
            setValue("validity");
            setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
          } else {
            throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
          };
        } else {
          if (portfolioId == undefined || portfolioId == null) {
            let reqData = {
              type: prefilgabelGeneral,
              name: generalComponentData.name,
              description: generalComponentData.description,
              externalReference: generalComponentData.externalReference,
              customerSegment: generalComponentData.customerSegment
                ? generalComponentData.customerSegment.value
                : "",

              supportLevel: value3.value,
              status: value2.value,

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
              serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",
            };
            const portfolioRes = await createPortfolio(reqData);
            if (portfolioRes.status === 200) {
              toast(`👏 Portfolio ${generalComponentData.name} Created`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setValue("validity");
              setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
              setGeneralComponentData({
                ...generalComponentData,
                portfolioId: portfolioRes.data.portfolioId,
              });
              setPortfolioId(portfolioRes.data.portfolioId);
              setNameIsNotEditAble(true);
            } else {
              throw `${portfolioRes.status}:error in portfolio creation`;
            }
          } else {
            let reqObj = {
              portfolioId: portfolioId,
              name: generalComponentData.name,
              description: generalComponentData.description,
              externalReference: generalComponentData.externalReference,
              customerSegment: generalComponentData.customerSegment?.value,

              validFrom: validityData.fromDate,
              validTo: validityData.toDate,

              usageCategory: categoryUsageKeyValue1.value
                ? categoryUsageKeyValue1.value : "EMPTY",
              strategyTask: stratgyTaskUsageKeyValue.value ?
                stratgyTaskUsageKeyValue.value : "EMPTY",
              taskType: stratgyTaskTypeKeyValue.value ?
                stratgyTaskTypeKeyValue.value : "EMPTY",
              responseTime: stratgyResponseTimeKeyValue.value ?
                stratgyResponseTimeKeyValue.value : "EMPTY",
              productHierarchy: stratgyHierarchyKeyValue.value ?
                stratgyHierarchyKeyValue.value : "EMPTY",
              geographic: stratgyGeographicKeyValue.value ?
                stratgyGeographicKeyValue.value : "EMPTY",

              preparedBy: administrative.preparedBy,
              approvedBy: administrative.approvedBy,
              preparedOn: administrative.preparedOn,
              revisedBy: administrative.revisedBy,
              revisedOn: administrative.revisedOn,
              offerValidity: administrative.offerValidity?.value,
              salesOffice: administrative.salesOffice?.value,

              portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                ? portfolioPriceDataId : null,
              additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                ? portfolioAdditionalPriceDataId : null,
              escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                ? portfolioEscalationPriceDataId : null,

              supportLevel: value3.value,
              status: value2.value,

              items: portfolioItems,
              coverages: portfolioCoverage,

              machineType: "NEW",
              searchTerm: "",
              lubricant: true,
              customerId: 0,
              customerGroup: "",
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
              template: true,
              visibleInCommerce: true
            }

            const exitsPortfolioUpdate = await updatePortfolio(
              portfolioId,
              reqObj
            );
            if (exitsPortfolioUpdate.status === 200) {
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
              setValue("validity");
              setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
            } else {
              throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
            };
          }
        }
      } else if (e.target.id == "validity") {
        console.log("state validity : ", state)
        console.log("state.type validity : ", state.type)
        let reqData;
        var diff = validityData.toDate.getTime() - validityData.fromDate.getTime();

        // var daydiff = diff / (1000 * 60 * 60 * 24);
        // console.log("difference between dates : ", daydiff);
        if (!viewOnlyTab.validityViewOnly) {
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
        }
        setValue("strategy");
        setGeneralComponentData({
          ...generalComponentData,
          ...reqData,
        });
        setNameIsNotEditAble(true);
        setViewOnlyTab({ ...viewOnlyTab, validityViewOnly: true });
        toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (e.target.id == "strategy") {
        console.log("state strategy : ", state)
        console.log("state.type strategy : ", state.type)

        if ((categoryUsageKeyValue1.value == "") ||
          (categoryUsageKeyValue1.value == undefined)) {
          throw "Category usage is a required field, you can’t leave it blank";
        }
        if ((stratgyTaskUsageKeyValue.value == "") ||
          (stratgyTaskUsageKeyValue.value == undefined)) {
          throw "Strategy Task is a required field, you can’t leave it blank";
        }
        // if (
        //   categoryUsageKeyValue1.value == "" ||
        //   stratgyTaskUsageKeyValue.value == "" ||
        //   categoryUsageKeyValue1.value == undefined ||
        //   stratgyTaskUsageKeyValue.value == undefined
        // ) {
        //   throw "Please fill mandatory fields properly";
        // }

        if (state && state.type === "new") {
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
            type: generalComponentData.type
              ? generalComponentData.type : "EMPTY",
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

            supportLevel: value3.value,
            status: value2.value,

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
            offerValidity: administrative.offerValidity?.value,
            salesOffice: administrative.salesOffice?.value,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            items: portfolioItems,
            coverages: portfolioCoverage,
          };
          if (generalComponentData.portfolioId) {
            const strategyRes = await updatePortfolio(
              generalComponentData.portfolioId,
              obj
            );
            if (strategyRes.status === 200) {
              toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              priceAgreementOption
                ? setValue("priceAgreement")
                : setValue("price");

              setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: true });
              console.log("strategy updating", strategyRes.data);
            } else {
              throw `${strategyRes.status}:error in update portfolio`;
            }
          } else {
            throw "Please Create portfolio first";
          }

        } else {
          // Old Todo Obj
          // let reqObj = {
          //   portfolioId: portfolioId,
          //   // type: prefilgabelGeneral,
          //   type: "MACHINE",
          //   name: generalComponentData.name,
          //   description: generalComponentData.description,
          //   customerSegment: generalComponentData.customerSegment?.value,
          //   externalReference: generalComponentData.externalReference,

          //   validFrom: validityData.fromDate.toISOString().substring(0, 10),
          //   validTo: validityData.fromDate.toISOString().substring(0, 10),

          //   usageCategory: categoryUsageKeyValue1.value,
          //   taskType: stratgyTaskTypeKeyValue.value,
          //   strategyTask: stratgyTaskUsageKeyValue.value,
          //   responseTime: stratgyResponseTimeKeyValue.value,
          //   productHierarchy: stratgyHierarchyKeyValue.value,
          //   geographic: stratgyGeographicKeyValue.value,

          //   preparedBy: administrative.preparedBy,
          //   approvedBy: administrative.approvedBy,
          //   preparedOn: administrative.preparedOn,
          //   revisedBy: administrative.revisedBy,
          //   revisedOn: administrative.revisedOn,
          //   offerValidity: administrative.offerValidity?.value,
          //   salesOffice: administrative.salesOffice?.value,

          //   machineType: generalComponentData?.machineType
          //     ? generalComponentData?.machineType
          //     : "EMPTY",
          //   searchTerm: "EMPTY",
          //   lubricant: true,
          //   customerId: 0,
          //   customerGroup: generalComponentData?.customerGroup
          //     ? generalComponentData?.customerGroup
          //     : "EMPTY",
          //   status: generalComponentData?.status
          //     ? generalComponentData?.status
          //     : "EMPTY",
          //   availability: generalComponentData?.availability
          //     ? generalComponentData?.availability
          //     : "EMPTY",
          //   application: generalComponentData?.application
          //     ? generalComponentData?.application
          //     : "EMPTY",
          //   contractOrSupport: generalComponentData?.contractOrSupport
          //     ? generalComponentData?.contractOrSupport
          //     : "EMPTY",
          //   lifeStageOfMachine: "NEW_BREAKIN",
          //   // supportLevel: "PREMIUM",
          //   supportLevel: value3.value,
          //   status: value2.value,
          //   numberOfEvents: 0,
          //   itemRelations: [],
          //   rating: "string",
          //   startUsage: 0,
          //   endUsage: 0,
          //   unit: "HOURS",
          //   additionals: "string",
          //   portfolioPrice: null,
          //   additionalPrice: null,
          //   escalationPrice: null,
          //   saveState: false,
          //   userId: null,
          //   visibleInCommerce: true,
          //   template: true,
          // }

          // New Todo Obj
          let reqObj = {
            portfolioId: portfolioId,
            name: generalComponentData.name,
            description: generalComponentData.description,
            externalReference: generalComponentData.externalReference,
            customerSegment: generalComponentData.customerSegment?.value,

            validFrom: validityData.fromDate,
            validTo: validityData.toDate,

            usageCategory: categoryUsageKeyValue1.value
              ? categoryUsageKeyValue1.value : "EMPTY",
            strategyTask: stratgyTaskUsageKeyValue.value ?
              stratgyTaskUsageKeyValue.value : "EMPTY",
            taskType: stratgyTaskTypeKeyValue.value ?
              stratgyTaskTypeKeyValue.value : "EMPTY",
            responseTime: stratgyResponseTimeKeyValue.value ?
              stratgyResponseTimeKeyValue.value : "EMPTY",
            productHierarchy: stratgyHierarchyKeyValue.value ?
              stratgyHierarchyKeyValue.value : "EMPTY",
            geographic: stratgyGeographicKeyValue.value ?
              stratgyGeographicKeyValue.value : "EMPTY",

            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            offerValidity: administrative.offerValidity?.value,
            salesOffice: administrative.salesOffice?.value,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            supportLevel: value3.value,
            status: value2.value,

            items: portfolioItems,
            coverages: portfolioCoverage,

            machineType: "NEW",
            searchTerm: "",
            lubricant: true,
            customerId: 0,
            customerGroup: "",
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
            template: true,
            visibleInCommerce: true
          }

          const exitsPortfolioUpdate = await updatePortfolio(
            portfolioId,
            reqObj
          );
          if (exitsPortfolioUpdate.status === 200) {
            toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            priceAgreementOption
              ? setValue("priceAgreement")
              : setValue("price");
            setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: true });
          } else {
            throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
          };
        }

      } else if (e.target.id == "price") {
        console.log("state price : ", state)
        console.log("state.type price : ", state.type)
        if ((priceMethodKeyValue1.value == "") ||
          (priceMethodKeyValue1.value == undefined)) {
          throw "Price method is a required field, you can’t leave it blank";
        }
        // if ((priceMethodKeyValue1.length === 0 ||
        //   priceMethodKeyValue1?.value === "" ||
        //   priceMethodKeyValue1?.value === null ||
        //   priceMethodKeyValue1?.value === undefined)
        // ) {
        //   throw "Please fill required field properly";
        // }

        if (state && state.type === "new") {
          console.log("new ---")
          if (portfolioId == "") {
            throw "Please Create portfolio first";
          } else {



            if (
              (portfolioPriceDataIdForExiting !== "")
            ) {

              // // update Exiting Escalation Price
              // let exitingEscalationPriceObj = {
              //   escalationPriceId: escalationPriceDataId,
              //   priceMethod: priceMethodKeyValue1.value,
              //   priceHeadType: priceEscalationHeadKeyValue1.value,
              //   escalationPercentage: parseInt(escalationPriceValue),
              //   validFrom: validityData.fromDate,
              //   validTo: validityData.toDate,
              //   userId: "string"
              // };
              // const updateEscalationPriceData = await updateEscalationPriceById(
              //   exitingEscalationPriceObj,
              //   escalationPriceDataId
              // );

              // update Additional Price
              // let exitingAdditionalPriceObj = {
              //   additionalPriceId: additionalPriceDataId,
              //   priceMethod: priceMethodKeyValue1.value,
              //   priceHeadType: priceAdditionalHeadKeyValue1.value,
              //   additionalPercentage: parseInt(additionalPriceValue),
              //   validFrom: validityData.fromDate,
              //   validTo: validityData.toDate,
              //   userId: "string"
              // }
              // const updateAdditionalPriceData = await updateAdditionalPriceById(
              //   exitingAdditionalPriceObj,
              //   additionalPriceDataId
              // )

              // update Portfolio Price 
              let exitingPortfolioPriceObj = {
                portfolioPriceId: portfolioPriceDataIdForExiting,
                priceMethod: priceMethodKeyValue1.value,
                priceType: priceTypeKeyValue1.value,
                priceList: priceListKeyValue1.value,
                priceDate: priceDetails.priceDate,
              }
              const updatePortfolioPriceData = await updatePortfolioPrice(
                exitingPortfolioPriceObj,
                portfolioPriceDataIdForExiting
              )

              let reqObj = {
                portfolioId: portfolioId,
                name: generalComponentData.name,
                description: generalComponentData.description,
                externalReference: generalComponentData.externalReference,
                customerSegment: generalComponentData.customerSegment?.value,

                validFrom: validityData.fromDate,
                validTo: validityData.toDate,

                usageCategory: categoryUsageKeyValue1.value
                  ? categoryUsageKeyValue1.value : "EMPTY",
                strategyTask: stratgyTaskUsageKeyValue.value ?
                  stratgyTaskUsageKeyValue.value : "EMPTY",
                taskType: stratgyTaskTypeKeyValue.value ?
                  stratgyTaskTypeKeyValue.value : "EMPTY",
                responseTime: stratgyResponseTimeKeyValue.value ?
                  stratgyResponseTimeKeyValue.value : "EMPTY",
                productHierarchy: stratgyHierarchyKeyValue.value ?
                  stratgyHierarchyKeyValue.value : "EMPTY",
                geographic: stratgyGeographicKeyValue.value ?
                  stratgyGeographicKeyValue.value : "EMPTY",

                preparedBy: administrative.preparedBy,
                approvedBy: administrative.approvedBy,
                preparedOn: administrative.preparedOn,
                revisedBy: administrative.revisedBy,
                revisedOn: administrative.revisedOn,
                offerValidity: administrative.offerValidity?.value,
                salesOffice: administrative.salesOffice?.value,

                portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                  ? portfolioPriceDataId : null,
                additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                  ? portfolioAdditionalPriceDataId : null,
                escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                  ? portfolioEscalationPriceDataId : null,

                supportLevel: value3.value,
                status: value2.value,

                items: portfolioItems,
                coverages: portfolioCoverage,

                machineType: "NEW",
                searchTerm: "",
                lubricant: true,
                customerId: 0,
                customerGroup: "",
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
                template: true,
                visibleInCommerce: true
              }

              const exitsPortfolioUpdate = await updatePortfolio(
                portfolioId,
                reqObj
              );
              if (exitsPortfolioUpdate.status === 200) {
                toast(`👏 Portfolio ${generalComponentData.name} Updated Successfully`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                // priceAgreementOption
                //   ? setValue("priceAgreement")
                //   : setValue("coverage");
                setValue("coverage");
                setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
              } else {
                throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
              };

            } else {

              // let priceEscalation = {
              //   priceMethod: priceMethodKeyValue1.value,
              //   priceHeadType: priceEscalationHeadKeyValue1.value,
              //   escalationPercentage: parseInt(escalationPriceValue),
              //   validFrom: validityData.fromDate,
              //   validTo: validityData.toDate,
              //   userId: "string"
              // }

              // let priceAdditional = {
              //   priceMethod: priceMethodKeyValue1.value,
              //   priceHeadType: priceAdditionalHeadKeyValue1.value,
              //   additionalPercentage: parseInt(additionalPriceValue),
              //   validFrom: validityData.fromDate,
              //   validTo: validityData.toDate,
              //   userId: "string"
              // }

              let portfolioPriceCreate = {
                priceMethod: priceMethodKeyValue1.value,
                priceType: priceTypeKeyValue1.value,
                priceList: priceListKeyValue1.value,
                priceDate: priceDetails.priceDate,
              }

              // const escalationPrice = await escalationPriceCreation(priceEscalation);
              // const additionalPrice = await additionalPriceCreation(priceAdditional);

              const portfolioPriceAPIData = await portfolioPriceCreation(portfolioPriceCreate);

              // setPortfolioEscalationPriceDataId({
              //   escalationPriceId: escalationPrice.data.escalationPriceId,
              // })
              // setPortfolioAdditionalPriceDataId({
              //   additionalPriceId: additionalPrice.data.additionalPriceId,
              // })
              setPortfolioPriceDataId({
                portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
              })

              setPortfolioPriceDataIdForExiting(portfolioPriceAPIData.data.portfolioPriceId);
              // setEscalationPriceDataId(escalationPrice.data.escalationPriceId);
              // setAdditionalPriceDataId(additionalPrice.data.additionalPriceId);

              const { portfolioId, ...res } = generalComponentData;

              let priceObjData = {
                ...res,
                visibleInCommerce: true,
                customerId: 0,
                lubricant: true,
                customerSegment: generalComponentData.customerSegment.value
                  ? generalComponentData.customerSegment.value
                  : "EMPTY",
                status: generalComponentData.status
                  ? generalComponentData.status
                  : "DRAFT",
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
                supportLevel: generalComponentData.supportLevel
                  ? generalComponentData.supportLevel
                  : "PREMIUM",
                customerGroup: generalComponentData.customerGroup
                  ? generalComponentData.customerGroup
                  : "EMPTY",
                searchTerm: "EMPTY",

                // supportLevel: "PREMIUM",
                supportLevel: value3.value,
                status: value2.value,

                portfolioPrice: {
                  portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
                },
                additionalPrice: null,
                escalationPrice: null,
                // additionalPrice: {
                //   additionalPriceId: additionalPrice.data.additionalPriceId,
                // },
                // escalationPrice: {
                //   escalationPriceId: escalationPrice.data.escalationPriceId,
                // },

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

                items: portfolioItems,
                coverages: portfolioCoverage,
              };

              const priceObjRes = await updatePortfolio(
                generalComponentData.portfolioId,
                priceObjData
              );
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
                setValue("coverage")
                setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
              } else {
                throw `${priceObjRes.status}:error in update portfolio`;
              };
            }

          }
        } else {

          // if((portfolioPriceDataIdForExiting !== "") ||
          // (additionalPriceDataId !== "") ||
          // (escalationPriceDataId !== ""))
          if (portfolioPriceDataIdForExiting !== "") {
            console.log("fetch if ---")
            console.log("price create on if 1 : ", state.type + " , portfolioId : " + portfolioId)
            // update Exiting Escalation Price
            // let exitingEscalationPriceObj = {
            //   escalationPriceId: escalationPriceDataId,
            //   priceMethod: priceMethodKeyValue1.value,
            //   priceHeadType: priceEscalationHeadKeyValue1.value,
            //   escalationPercentage: parseInt(escalationPriceValue),
            //   validFrom: validityData.fromDate,
            //   validTo: validityData.toDate,
            //   userId: "string"
            // };
            // const updateEscalationPriceData = await updateEscalationPriceById(
            //   exitingEscalationPriceObj,
            //   escalationPriceDataId
            // );

            // update Additional Price
            // let exitingAdditionalPriceObj = {
            //   additionalPriceId: additionalPriceDataId,
            //   priceMethod: priceMethodKeyValue1.value,
            //   priceHeadType: priceAdditionalHeadKeyValue1.value,
            //   additionalPercentage: parseInt(additionalPriceValue),
            //   validFrom: validityData.fromDate,
            //   validTo: validityData.toDate,
            //   userId: "string"
            // }
            // const updateAdditionalPriceData = await updateAdditionalPriceById(
            //   exitingAdditionalPriceObj,
            //   additionalPriceDataId
            // )

            // update Portfolio Price 
            let exitingPortfolioPriceObj = {
              portfolioPriceId: portfolioPriceDataIdForExiting,
              priceMethod: priceMethodKeyValue1.value,
              priceType: priceTypeKeyValue1.value,
              priceList: priceListKeyValue1.value,
              priceDate: priceDetails.priceDate,
            }
            const updatePortfolioPriceData = await updatePortfolioPrice(
              exitingPortfolioPriceObj,
              portfolioPriceDataIdForExiting
            )

            let reqObj = {
              portfolioId: portfolioId,
              name: generalComponentData.name,
              description: generalComponentData.description,
              externalReference: generalComponentData.externalReference,
              customerSegment: generalComponentData.customerSegment?.value,

              validFrom: validityData.fromDate,
              validTo: validityData.toDate,

              usageCategory: categoryUsageKeyValue1.value
                ? categoryUsageKeyValue1.value : "EMPTY",
              strategyTask: stratgyTaskUsageKeyValue.value ?
                stratgyTaskUsageKeyValue.value : "EMPTY",
              taskType: stratgyTaskTypeKeyValue.value ?
                stratgyTaskTypeKeyValue.value : "EMPTY",
              responseTime: stratgyResponseTimeKeyValue.value ?
                stratgyResponseTimeKeyValue.value : "EMPTY",
              productHierarchy: stratgyHierarchyKeyValue.value ?
                stratgyHierarchyKeyValue.value : "EMPTY",
              geographic: stratgyGeographicKeyValue.value ?
                stratgyGeographicKeyValue.value : "EMPTY",

              preparedBy: administrative.preparedBy,
              approvedBy: administrative.approvedBy,
              preparedOn: administrative.preparedOn,
              revisedBy: administrative.revisedBy,
              revisedOn: administrative.revisedOn,
              offerValidity: administrative.offerValidity?.value,
              salesOffice: administrative.salesOffice?.value,

              portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
                ? portfolioPriceDataId : null,
              additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
                ? portfolioAdditionalPriceDataId : null,
              escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
                ? portfolioEscalationPriceDataId : null,

              supportLevel: value3.value,
              status: value2.value,

              items: portfolioItems,
              coverages: portfolioCoverage,

              machineType: "NEW",
              searchTerm: "",
              lubricant: true,
              customerId: 0,
              customerGroup: "",
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
              template: true,
              visibleInCommerce: true
            }

            const exitsPortfolioUpdate = await updatePortfolio(
              portfolioId,
              reqObj
            );
            if (exitsPortfolioUpdate.status === 200) {
              toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // priceAgreementOption
              //   ? setValue("priceAgreement")
              //   : setValue("coverage");
              setValue("coverage");
              setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
            } else {
              throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
            };
          } else {

            // const { portfolioId, ...res } = generalComponentData;
            console.log("price create on else 1 : ", state.type + " , portfolioId : " + portfolioId)

            // let priceEscalation = {
            //   priceMethod: priceMethodKeyValue1.value,
            //   priceHeadType: priceEscalationHeadKeyValue1.value,
            //   escalationPercentage: parseInt(escalationPriceValue),
            //   validFrom: validityData.fromDate,
            //   validTo: validityData.toDate,
            //   userId: "string"
            // }

            // let priceAdditional = {
            //   priceMethod: priceMethodKeyValue1.value,
            //   priceHeadType: priceAdditionalHeadKeyValue1.value,
            //   additionalPercentage: parseInt(additionalPriceValue),
            //   validFrom: validityData.fromDate,
            //   validTo: validityData.toDate,
            //   userId: "string"
            // }

            let portfolioPriceCreate = {
              priceMethod: priceMethodKeyValue1.value,
              priceType: priceTypeKeyValue1.value,
              priceList: priceListKeyValue1.value,
              priceDate: priceDetails.priceDate,
            }

            // const escalationPrice = await escalationPriceCreation(priceEscalation);
            // const additionalPrice = await additionalPriceCreation(priceAdditional);
            const portfolioPriceAPIData = await portfolioPriceCreation(portfolioPriceCreate);

            // setPortfolioEscalationPriceDataId({
            //   escalationPriceId: escalationPrice.data.escalationPriceId,
            // })
            // setPortfolioAdditionalPriceDataId({
            //   additionalPriceId: additionalPrice.data.additionalPriceId,
            // })
            setPortfolioPriceDataId({
              portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
            })

            setPortfolioPriceDataIdForExiting(portfolioPriceAPIData.data.portfolioPriceId);
            // setEscalationPriceDataId(escalationPrice.data.escalationPriceId);
            // setAdditionalPriceDataId(additionalPrice.data.additionalPriceId);

            let reqObj = {
              portfolioId: portfolioId,
              name: generalComponentData.name,
              description: generalComponentData.description,
              externalReference: generalComponentData.externalReference,
              customerSegment: generalComponentData.customerSegment?.value,

              validFrom: validityData.fromDate,
              validTo: validityData.toDate,

              usageCategory: categoryUsageKeyValue1.value
                ? categoryUsageKeyValue1.value : "EMPTY",
              strategyTask: stratgyTaskUsageKeyValue.value ?
                stratgyTaskUsageKeyValue.value : "EMPTY",
              taskType: stratgyTaskTypeKeyValue.value ?
                stratgyTaskTypeKeyValue.value : "EMPTY",
              responseTime: stratgyResponseTimeKeyValue.value ?
                stratgyResponseTimeKeyValue.value : "EMPTY",
              productHierarchy: stratgyHierarchyKeyValue.value ?
                stratgyHierarchyKeyValue.value : "EMPTY",
              geographic: stratgyGeographicKeyValue.value ?
                stratgyGeographicKeyValue.value : "EMPTY",

              preparedBy: administrative.preparedBy,
              approvedBy: administrative.approvedBy,
              preparedOn: administrative.preparedOn,
              revisedBy: administrative.revisedBy,
              revisedOn: administrative.revisedOn,
              offerValidity: administrative.offerValidity?.value,
              salesOffice: administrative.salesOffice?.value,

              portfolioPrice: {
                portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
              },
              // additionalPrice: {
              //   additionalPriceId: additionalPrice.data.additionalPriceId,
              // },
              // escalationPrice: {
              //   escalationPriceId: escalationPrice.data.escalationPriceId,
              // },

              additionalPrice: null,
              escalationPrice: null,

              supportLevel: value3.value,
              status: value2.value,

              items: portfolioItems,
              coverages: portfolioCoverage,

              machineType: "NEW",
              searchTerm: "",
              lubricant: true,
              customerId: 0,
              customerGroup: "",
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
              template: true,
              visibleInCommerce: true
            }

            const priceObjRes = await updatePortfolio(
              portfolioId,
              reqObj
            )

            // console.log("price create on else 1A : ", state.type + " , portfolioId : " + portfolioId)

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
              // priceAgreementOption
              //   ? setValue("priceAgreement")
              //   : setValue("coverage");
              setValue("coverage");
              setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
            } else {
              throw `${priceObjRes.status}:error in update portfolio`;
            };
          }
        }
      } else if (e.target.id == "priceAgreement") {
        setValue("coverage");
      } else if (e.target.id == "coverage") {

        if (state && state.type === "new") {
          let cvgIds = [];
          for (let i = 0; i < selectedMasterData.length; i++) {
            if (
              selectedMasterData[i].model === "" ||
              selectedMasterData[i].family === ""
            ) {
              throw "Family or Model values are missing";
            }
            let reqObj = {
              coverageId: 0,
              serviceId: 0,
              modelNo: selectedMasterData[i].model,
              serialNumber: selectedMasterData[i].associatedIncludedModelData[0].serialNumber?.value,
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
            const cvgRes = await createCoverage(reqObj);
            console.log("createCoverage res:", cvgRes);
            cvgIds.push({ coverageId: cvgRes.coverageId });
          }

          setPortfolioCoverage(cvgIds);

          setGeneralComponentData({
            ...generalComponentData,
            coverages: cvgIds,
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
            // supportLevel: "PREMIUM",
            supportLevel: value3.value,
            status: value2.value,

            // portfolioPrice: portfolioPriceDataId,
            // additionalPrice: portfolioAdditionalPriceDataId,
            // escalationPrice: portfolioEscalationPriceDataId,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            items: portfolioItems,
            coverages: cvgIds,

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
          };

          console.log("Obj data is ", obj)

          if (generalComponentData.portfolioId) {
            const updatePortfolioRes = await updatePortfolio(
              generalComponentData.portfolioId,
              obj
            );
            if (updatePortfolioRes.status === 200) {
              toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setValue("administrative");
            } else {
              throw `${updatePortfolioRes.status}:error in update portfolio`;
            }
          } else {
            throw "Please Create portfolio first";
          }
        } else {

          let cvgIds = [];
          for (let i = 0; i < selectedMasterData.length; i++) {
            if (
              selectedMasterData[i].model === "" ||
              selectedMasterData[i].family === ""
            ) {
              throw "Family or Model values are missing";
            }
            let reqObj = {
              coverageId: 0,
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
            const cvgRes = await createCoverage(reqObj);
            console.log("createCoverage res:", cvgRes);
            cvgIds.push({ coverageId: cvgRes.coverageId });
          }

          setPortfolioCoverage(cvgIds);

          // Old Todo Obj
          // let reqObj = {
          //   portfolioId: portfolioId,
          //   // type: prefilgabelGeneral,
          //   type: "MACHINE",
          //   name: generalComponentData.name,
          //   description: generalComponentData.description,
          //   customerSegment: generalComponentData.customerSegment?.value,
          //   externalReference: generalComponentData.externalReference,

          //   validFrom: validityData.fromDate.toISOString().substring(0, 10),
          //   validTo: validityData.fromDate.toISOString().substring(0, 10),

          //   usageCategory: categoryUsageKeyValue1.value,
          //   taskType: stratgyTaskTypeKeyValue.value,
          //   strategyTask: stratgyTaskUsageKeyValue.value,
          //   responseTime: stratgyResponseTimeKeyValue.value,
          //   productHierarchy: stratgyHierarchyKeyValue.value,
          //   geographic: stratgyGeographicKeyValue.value,

          //   preparedBy: administrative.preparedBy,
          //   approvedBy: administrative.approvedBy,
          //   preparedOn: administrative.preparedOn,
          //   revisedBy: administrative.revisedBy,
          //   revisedOn: administrative.revisedOn,
          //   offerValidity: administrative.offerValidity?.value,
          //   salesOffice: administrative.salesOffice?.value,

          //   machineType: generalComponentData?.machineType
          //     ? generalComponentData?.machineType
          //     : "EMPTY",
          //   searchTerm: "EMPTY",
          //   lubricant: true,
          //   customerId: 0,
          //   customerGroup: generalComponentData?.customerGroup
          //     ? generalComponentData?.customerGroup
          //     : "EMPTY",
          //   status: generalComponentData?.status
          //     ? generalComponentData?.status
          //     : "EMPTY",
          //   availability: generalComponentData?.availability
          //     ? generalComponentData?.availability
          //     : "EMPTY",
          //   application: generalComponentData?.application
          //     ? generalComponentData?.application
          //     : "EMPTY",
          //   contractOrSupport: generalComponentData?.contractOrSupport
          //     ? generalComponentData?.contractOrSupport
          //     : "EMPTY",
          //   lifeStageOfMachine: "NEW_BREAKIN",
          //   // supportLevel: "PREMIUM",
          //   supportLevel: value3.value,
          //   status: value2.value,
          //   numberOfEvents: 0,
          //   itemRelations: [],
          //   rating: "string",
          //   startUsage: 0,
          //   endUsage: 0,
          //   unit: "HOURS",
          //   additionals: "string",
          //   portfolioPrice: null,
          //   additionalPrice: null,
          //   escalationPrice: null,
          //   saveState: false,
          //   userId: null,
          //   visibleInCommerce: true,
          //   template: true,

          //   items: portfolioItems,
          //   coverages: cvgIds,
          // }

          // New Todo Obj
          let reqObj = {
            portfolioId: portfolioId,
            name: generalComponentData.name,
            description: generalComponentData.description,
            externalReference: generalComponentData.externalReference,
            customerSegment: generalComponentData.customerSegment?.value,

            validFrom: validityData.fromDate,
            validTo: validityData.toDate,

            usageCategory: categoryUsageKeyValue1.value
              ? categoryUsageKeyValue1.value : "EMPTY",
            strategyTask: stratgyTaskUsageKeyValue.value ?
              stratgyTaskUsageKeyValue.value : "EMPTY",
            taskType: stratgyTaskTypeKeyValue.value ?
              stratgyTaskTypeKeyValue.value : "EMPTY",
            responseTime: stratgyResponseTimeKeyValue.value ?
              stratgyResponseTimeKeyValue.value : "EMPTY",
            productHierarchy: stratgyHierarchyKeyValue.value ?
              stratgyHierarchyKeyValue.value : "EMPTY",
            geographic: stratgyGeographicKeyValue.value ?
              stratgyGeographicKeyValue.value : "EMPTY",

            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            offerValidity: administrative.offerValidity?.value,
            salesOffice: administrative.salesOffice?.value,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            supportLevel: value3.value,
            status: value2.value,

            items: portfolioItems,
            coverages: cvgIds,

            machineType: "NEW",
            searchTerm: "",
            lubricant: true,
            customerId: 0,
            customerGroup: "",
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
            template: true,
            visibleInCommerce: true
          }

          // console.log("portfolioID --- : ", portfolioId)
          const updatePortfolioRes = await updatePortfolio(
            portfolioId,
            reqObj
          );

          // console.log("updatePortfolioRes 123 : ", updatePortfolioRes);
          if (updatePortfolioRes.status === 200) {
            toast(`👏 Portfolio <${generalComponentData.name}> Updated Successfully`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setValue("administrative");
          } else {
            throw `${updatePortfolioRes.status}:error in update portfolio`;
          }
        }
      } else if (e.target.id == "administrative") {
        const validator = new Validator();

        if ((administrative.preparedBy == "" ||
          administrative.preparedBy == undefined)) {
          throw "Prepared By is a required field, you can’t leave it blank";
        }
        if ((administrative.salesOffice == "" ||
          administrative.salesOffice == undefined)) {
          throw "Sales Office / Branch is a required field, you can’t leave it blank";
        }
        if ((administrative.offerValidity == "" ||
          administrative.offerValidity == undefined)) {
          throw "Offer validity is a required field, you can’t leave it blank";
        }

        // if ((!validator.emailValidation(administrative.preparedBy) ||
        //   administrative.preparedBy == "" ||
        //   administrative.preparedBy == undefined) ||
        //   (administrative.approvedBy != "" &&
        //     administrative.approvedBy != undefined &&
        //     !validator.emailValidation(administrative.approvedBy)) ||
        //   (administrative.revisedBy != "" &&
        //     administrative.revisedBy != undefined &&
        //     !validator.emailValidation(administrative.revisedBy)) ||
        //   (administrative.salesOffice == "" ||
        //     administrative.salesOffice == undefined)
        // )
        // if ((administrative.preparedBy == "" ||
        //   administrative.preparedBy == undefined) ||
        //   (administrative.salesOffice == "" ||
        //     administrative.salesOffice == undefined)
        // ) {
        //   throw "Please fill mandatory fields with valid data";
        // }
        if (state && state.type === "new") {
          setGeneralComponentData({
            ...generalComponentData,
            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            salesOffice: administrative.salesOffice?.value,
            offerValidity: administrative.offerValidity?.value,
          });

          const { portfolioId, ...res } = generalComponentData;

          let AdministrativeObj = {
            ...res,
            visibleInCommerce: true,
            customerId: 0,
            lubricant: true,
            customerSegment: generalComponentData.customerSegment.value
              ? generalComponentData.customerSegment.value
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
            supportLevel: generalComponentData.supportLevel
              ? generalComponentData.supportLevel
              : "EMPTY",

            customerGroup: generalComponentData.customerGroup
              ? generalComponentData.customerGroup
              : "EMPTY",
            searchTerm: "EMPTY",

            supportLevel: value3.value,
            status: value2.value,

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

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            items: portfolioItems,
            coverages: portfolioCoverage,
          };

          if (generalComponentData.portfolioId) {
            const administrativeRes = await updatePortfolio(
              generalComponentData.portfolioId,
              AdministrativeObj
            );
            if (administrativeRes.status === 200) {
              toast(`👏 Portfolio <${generalComponentData.name}> saved Successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              // setValue("administrative");
              // setValue("price");
              setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: true });
              console.log("administrativeRes updating", administrativeRes.data);
            } else {
              throw `${administrativeRes.status}:already exist or something else`;
            };
            console.log("administrative", administrative);
          } else {
            throw "Please Create portfolio first";
          }
        } else {
          // Old Todo Obj
          // let reqObj = {
          //   portfolioId: portfolioId,
          //   // type: prefilgabelGeneral,
          //   type: "MACHINE",
          //   name: generalComponentData.name,
          //   description: generalComponentData.description,
          //   customerSegment: generalComponentData.customerSegment?.value,
          //   externalReference: generalComponentData.externalReference,

          //   validFrom: validityData.fromDate.toISOString().substring(0, 10),
          //   validTo: validityData.fromDate.toISOString().substring(0, 10),

          //   usageCategory: categoryUsageKeyValue1.value,
          //   taskType: stratgyTaskTypeKeyValue.value,
          //   strategyTask: stratgyTaskUsageKeyValue.value,
          //   responseTime: stratgyResponseTimeKeyValue.value,
          //   productHierarchy: stratgyHierarchyKeyValue.value,
          //   geographic: stratgyGeographicKeyValue.value,

          //   preparedBy: administrative.preparedBy,
          //   approvedBy: administrative.approvedBy,
          //   preparedOn: administrative.preparedOn,
          //   revisedBy: administrative.revisedBy,
          //   revisedOn: administrative.revisedOn,
          //   offerValidity: administrative.offerValidity?.value,
          //   salesOffice: administrative.salesOffice?.value,

          //   machineType: generalComponentData?.machineType
          //     ? generalComponentData?.machineType
          //     : "EMPTY",
          //   searchTerm: "EMPTY",
          //   lubricant: true,
          //   customerId: 0,
          //   customerGroup: generalComponentData?.customerGroup
          //     ? generalComponentData?.customerGroup
          //     : "EMPTY",
          //   status: generalComponentData?.status
          //     ? generalComponentData?.status
          //     : "EMPTY",
          //   availability: generalComponentData?.availability
          //     ? generalComponentData?.availability
          //     : "EMPTY",
          //   application: generalComponentData?.application
          //     ? generalComponentData?.application
          //     : "EMPTY",
          //   contractOrSupport: generalComponentData?.contractOrSupport
          //     ? generalComponentData?.contractOrSupport
          //     : "EMPTY",
          //   lifeStageOfMachine: "NEW_BREAKIN",
          //   // supportLevel: "PREMIUM",
          //   supportLevel: value3.value,
          //   status: value2.value,
          //   numberOfEvents: 0,
          //   itemRelations: [],
          //   rating: "string",
          //   startUsage: 0,
          //   endUsage: 0,
          //   unit: "HOURS",
          //   additionals: "string",
          //   portfolioPrice: null,
          //   additionalPrice: null,
          //   escalationPrice: null,
          //   saveState: false,
          //   userId: null,
          //   visibleInCommerce: true,
          //   template: true,
          // }

          // New Todo Obj 
          let reqObj = {
            portfolioId: portfolioId,
            name: generalComponentData.name,
            description: generalComponentData.description,
            externalReference: generalComponentData.externalReference,
            customerSegment: generalComponentData.customerSegment?.value,

            validFrom: validityData.fromDate,
            validTo: validityData.toDate,

            usageCategory: categoryUsageKeyValue1.value
              ? categoryUsageKeyValue1.value : "EMPTY",
            strategyTask: stratgyTaskUsageKeyValue.value ?
              stratgyTaskUsageKeyValue.value : "EMPTY",
            taskType: stratgyTaskTypeKeyValue.value ?
              stratgyTaskTypeKeyValue.value : "EMPTY",
            responseTime: stratgyResponseTimeKeyValue.value ?
              stratgyResponseTimeKeyValue.value : "EMPTY",
            productHierarchy: stratgyHierarchyKeyValue.value ?
              stratgyHierarchyKeyValue.value : "EMPTY",
            geographic: stratgyGeographicKeyValue.value ?
              stratgyGeographicKeyValue.value : "EMPTY",

            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            offerValidity: administrative.offerValidity?.value,
            salesOffice: administrative.salesOffice?.value,

            portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
              ? portfolioPriceDataId : null,
            additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
              ? portfolioAdditionalPriceDataId : null,
            escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
              ? portfolioEscalationPriceDataId : null,

            supportLevel: value3.value,
            status: value2.value,

            items: portfolioItems,
            coverages: portfolioCoverage,

            machineType: "NEW",
            searchTerm: "",
            lubricant: true,
            customerId: 0,
            customerGroup: "",
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
            template: true,
            visibleInCommerce: true
          }

          const exitsPortfolioUpdate = await updatePortfolio(
            portfolioId,
            reqObj
          );
          if (exitsPortfolioUpdate.status === 200) {
            toast(`👏 Portfolio <${generalComponentData.name}> saved Successfully`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setValue("price");
            setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: true });
          } else {
            throw `${exitsPortfolioUpdate.status}:error in update portfolio`;
          };
        }

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
  };
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
  const handleAddBundleInputChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setNewBundle({
      ...newBundle,
      [name]: value,
    });
  };
  const handleCoverageInputChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setCoverageData({
      ...coverageData,
      [name]: value,
    });
  };

  const createNewVersion = async () => {

    try {
      if (portfolioId != undefined || portfolioId != null) {
        if (newVersionName != "") {
          let versionObj = await getPortfolio(portfolioId);

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
            portfolioId: 0,
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
            additionals: versionObj.additional,
            preparedBy: versionObj.preparedBy,
            approvedBy: versionObj.approvedBy,
            preparedOn: versionObj.preparedOn,
            revisedBy: versionObj.revisedBy,
            revisedOn: versionObj.revisedOn,
            salesOffice: versionObj.salesOffice,
            offerValidity: versionObj.offerValidity,
            items: versionObj.items,
            coverages: versionObj.coverages,
            portfolioPrice: versionObj.portfolioPrice,
            additionalPrice: versionObj.additionalPrice,
            escalationPrice: versionObj.escalationPrice,
            saveState: versionObj.saveState,
            userId: versionObj.userId,
            template: versionObj.template,
            visibleInCommerce: versionObj.visibleInCommerce,
          }

          const portfolioRes = await createPortfolio(createNewVersionObj);
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
      setVersionPopup(false)
      return;
    }
    // if (portfolioId != undefined || portfolioId != null) {
    console.log("my portfolioId : ", portfolioId);
    // }
  }

  const Inclusion_Exclusion = async (e, data) => {
    console.log("event is : ", e);
    console.log("itemData : ", data);
    if (data.itemBodyModel.itemPrices.length > 0) {
      setEditAblePriceData(data.itemBodyModel.itemPrices)

      var getPriceData = await getItemPriceData(data.itemBodyModel.itemPrices[0].itemPriceDataId);

      setPartsRequired(getPriceData.partsRequired)
      setlabourRequired(getPriceData.labourRequired)
      setServiceRequired(getPriceData.serviceRequired)
      setMiscRequired(getPriceData.miscRequired)

    } else {
      setEditAblePriceData([])
    }

    console.log("editable Custom Price data : ", editAblePriceData);

  }

  const populateHeader = (result) => {
    console.log("result ----", result);

    // Name Editable Or not State Set
    setNameIsNotEditAble(true);

    setViewOnlyTab({
      generalViewOnly: true,
      validityViewOnly: true,
      strategyViewOnly: true,
      administrativeViewOnly: true,
      priceViewOnly: true,
      priceAgreementViewOnly: true,
      coverageViewOnly: true,
    });


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


    // set General Tab states Data 
    setGeneralComponentData({
      name: result.name,
      description: result.description,
      serviceDescription: "",
      externalReference: result.externalReference,
      customerSegment: { label: result.customerSegment, value: result.customerSegment },
      items: result.items,
      coverages: result.coverages,
    })

    // set Validity Tab States Data
    setValidityData({
      fromDate: result.validFrom,
      toDate: result.validTo,
      from: null,
      to: null,
      fromInput: "",
      toInput: "",
    })

    // set Category Usage Key-Value 
    setCategoryUsageKeyValue1({
      label: result.usageCategory,
      value: result.usageCategory
    });

    // set StratgyTask Usage Key-Value 
    setStratgyTaskUsageKeyValue({
      label: result.strategyTask,
      value: result.strategyTask
    });

    // set Stratgy Task-Type Key-Value
    setStratgyTaskTypeKeyValue({
      label: result.taskType,
      value: result.taskType
    });

    // set Stratgy Response-Time Key-Value
    setStratgyResponseTimeKeyValue({
      label: result.responseTime,
      value: result.responseTime
    });

    // set Stratgy Product-Hierarchy Key-Value
    setStratgyHierarchyKeyValue({
      label: result.productHierarchy,
      value: result.productHierarchy
    })

    // set Stratgy Geographic Key-Value
    setStratgyGeographicKeyValue({
      label: result.geographic,
      value: result.geographic
    })

    // set Stratgy Machine-Type Key-Value
    setMachineTypeKeyValue({
      label: result.machineType,
      value: result.machineType
    });

    var offerValidityLabel;
    if (result.offerValidity == "15") {
      offerValidityLabel = "15 days";
    } else if (result.offerValidity == "30") {
      offerValidityLabel = "1 month";
    } else if (result.offerValidity == "45") {
      offerValidityLabel = "45 days";
    } else if (result.offerValidity == "60") {
      offerValidityLabel = "2 month";
    } else {
      offerValidityLabel = result.offerValidity;
    }

    // set Administrative Tab state Value
    setAdministrative({
      preparedBy: result.preparedBy,
      approvedBy: result.approvedBy,
      preparedOn: result.preparedOn,
      revisedBy: result.revisedBy,
      revisedOn: result.revisedOn,
      salesOffice: { label: result.salesOffice, value: result.salesOffice },
      offerValidity: { label: offerValidityLabel, value: result.offerValidity },
    });

    // set Portfolio Id 
    setPortfolioId(result.portfolioId);


    let itemsArrData = [];
    let customItemArr = [];
    let createdCoverages = [];

    // Set Data By Item Relation Data Data
    if (result.itemRelations.length > 0) {
      for (let b = 0; b < result.itemRelations.length; b++) {
        let expendedArrObj = [];
        let obj = result.items.find(obj => obj.itemId == result.itemRelations[b].portfolioItemId);
        for (let c = 0; c < result.itemRelations[b].bundles.length; c++) {

          let bundleObj = result.items.find((objBundle, i) => {
            if (objBundle.itemId == result.itemRelations[b].bundles[c]) {

              return objBundle; // stop searching
            }
          });
          expendedArrObj.push(bundleObj);
        }

        for (let d = 0; d < result.itemRelations[b].services.length; d++) {

          let serviceObj = result.items.find((objService, i) => {
            if (objService.itemId == result.itemRelations[b].services[d]) {

              return objService; // stop searching
            }
          });
          expendedArrObj.push(serviceObj);
        }
        obj.associatedServiceOrBundle = expendedArrObj;
        itemsArrData.push(obj);
      }
      setBundleItems(itemsArrData);
    } else {
      var newPortfolioItemRelation = [];
      var newExpendedItemsData = [];
      // for (let i = 0; i < result.items.length; i++) {
      let obj1 = result.items.find((objBundleService, i) => {
        if (objBundleService.itemHeaderModel.bundleFlag === "PORTFOLIO") {
          return objBundleService;
        }
      });
      // let bundleServiceObjData = result.items.find((objBundleService, i) => {
      //   if (objBundleService.itemHeaderModel.bundleFlag !== "PORTFOLIO") {
      //     return objBundleService;
      //   }
      // });
      // newExpendedItemsData.push(bundleServiceObjData);
      // obj1.associatedServiceOrBundle = newExpendedItemsData;


      newPortfolioItemRelation.push(obj1);
      // }
      console.log("newPortfolioItemRelation data is: ", newPortfolioItemRelation);
      setBundleItems(newPortfolioItemRelation);
    }


    // for Update Item in Portfolio Item Data BY Id 
    for (let i = 0; i < result.items.length; i++) {
      customItemArr.push({ itemId: result.items[i].itemId })
    }
    setPortfolioItems(customItemArr)

    // for Update Coverage in Portfolio Coverage Data BY Id
    for (let k = 0; k < result.coverages.length; k++) {
      createdCoverages.push({ coverageId: result.coverages[k].coverageId })
    }
    setPortfolioCoverage(createdCoverages)


    // set Coverage Master Data 
    setSelectedMasterData(result.coverages);

    if (Object.keys(result.additionalPrice).length > 0) {
      setAdditionalPriceValue(result.additionalPrice.additionalPercentage);
      setPriceAdditionalHeadKeyValue1(
        {
          label: result.additionalPrice.priceHeadType,
          value: result.additionalPrice.priceHeadType
        }
      );
      setAdditionalPriceDataId(result.additionalPrice.additionalPriceId);
      setPortfolioAdditionalPriceDataId({
        additionalPriceId: result.additionalPrice.additionalPriceId,
      })
    }

    if (Object.keys(result.escalationPrice).length > 0) {
      setEscalationPriceValue(result.escalationPrice.escalationPercentage);
      setPriceEscalationHeadKeyValue1({
        label: result.escalationPrice.priceHeadType,
        value: result.escalationPrice.priceHeadType
      });
      setEscalationPriceDataId(result.escalationPrice.escalationPriceId);
      setPortfolioEscalationPriceDataId({
        escalationPriceId: result.escalationPrice.escalationPriceId,
      })
    }

    if (Object.keys(result.portfolioPrice).length > 0) {

      setPriceListKeyValue1({
        label: result.portfolioPrice.priceList,
        value: result.portfolioPrice.priceList
      });

      setPriceMethodKeyValue1({
        label: result.portfolioPrice.priceMethod,
        value: result.portfolioPrice.priceMethod
      });

      setPriceDetails({
        ...priceDetails,
        priceDate: result.portfolioPrice.priceDate,
      });

      setPriceTypeKeyValue1({
        label: result.portfolioPrice.priceType,
        value: result.portfolioPrice.priceType
      });

      setPricePriceData(result.portfolioPrice.price)
      setPriceCalculatedPrice(result.portfolioPrice.calculatedPrice);
      setPortfolioPriceDataIdForExiting(result.portfolioPrice.portfolioPriceId);
      setPortfolioPriceDataId({
        portfolioPriceId: result.portfolioPrice.portfolioPriceId,
      })
    }

    // let itemsArrData = [];

    // for (let b = 0; b < result.itemRelations.length; b++) {
    //   let expendedArrObj = [];
    //   let obj = result.items.find(obj => obj.itemId == result.itemRelations[b].portfolioItemId);
    //   for (let c = 0; c < result.itemRelations[b].bundles.length; c++) {

    //     let bundleObj = result.items.find((objBundle, i) => {
    //       if (objBundle.itemId == result.itemRelations[b].bundles[c]) {

    //         return objBundle; // stop searching
    //       }
    //     });
    //     expendedArrObj.push(bundleObj);
    //   }

    //   for (let d = 0; d < result.itemRelations[b].services.length; d++) {

    //     let serviceObj = result.items.find((objService, i) => {
    //       if (objService.itemId == result.itemRelations[b].services[d]) {

    //         return objService; // stop searching
    //       }
    //     });
    //     expendedArrObj.push(serviceObj);
    //   }
    //   obj.associatedServiceOrBundle = expendedArrObj;
    //   itemsArrData.push(obj);
    // }

    // setPortfolioitems(result.items)

    // setBundleItems(result.items)


  }
  // console.log("generalComponentData ---- : ", generalComponentData)

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

  const handleWithMiscCheckBox = (e) => {
    setMiscRequired(e.target.checked)
  }

  const UpdatePriceInclusionExclusion = async () => {
    console.log("hello");
    if (editAblePriceData.length > 0) {
      // console.log("hello")
      for (let y = 0; y < editAblePriceData.length; y++) {
        var getCustomPriceData = await itemPriceDataId(editAblePriceData[y].itemPriceDataId);
        console.log("y is : ", getCustomPriceData);

        getCustomPriceData.partsRequired = partsRequired;
        getCustomPriceData.labourRequired = labourRequired;
        getCustomPriceData.serviceRequired = serviceRequired;
        getCustomPriceData.miscRequired = miscRequired;

        // console.log("updated y is : ", getCustomPriceData)

        var UpdateCustomPriceInclusion = updateItemPriceData(editAblePriceData[y].itemPriceDataId, getCustomPriceData)

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
      getPortfolio(portfolioId)
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
        setMachineTypeKeyValue(options);
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
    //   .then((res) => {
    //     const options = res.map((d) => ({
    //       value: d.key,
    //       label: d.value,
    //     }));
    //     setPriceMethodKeyValue(options);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });

    getSolutionPriceCommonConfig("price-method")
      .then((res) => {
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceMethodKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("price-type")
      .then((res) => {
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("price-list")
      .then((res) => {
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceListKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });


    getSolutionPriceCommonConfig("currency")
      .then((res) => {
        console.log("Price currency Response is : ", res)
        const options = res.map((d) => ({
          value: d,
          label: d,
        }));
        setPriceCurrencyKeyvalue(options);
      })
      .catch((err) => {
        alert(err);
      })


    getSolutionPriceCommonConfig("price-head-type")
      .then((res) => {
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceHeadTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("support-level")
      .then((res) => {
        // res.pop();
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setVersionOption(options);
      })
      .catch((err) => {
        alert(err);
      });
    getSolutionPriceCommonConfig("status")
      .then((res) => {
        // res.pop();
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setStatusOption(options);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const dispatch = useDispatch();
  // const usageIn=useSelector((state)=>state.task.categoryList)
  // console.log("useSelector((state)=>state.categoryList)",usageIn)

  useEffect(() => {
    // const portfolioId1=location.state
    const portfolioId = 362;
    getPortfolioDetails(portfolioId);
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  useEffect(() => {
    var yearsOptionArr = [];
    for (let i = 1; i <= priceCalculator.noOfYear; i++) {
      yearsOptionArr.push({ value: i, label: i })
    }
    seYearsOption(yearsOptionArr);
  }, [priceCalculator.noOfYear])

  useEffect(() => {

    if (
      (state && state.type == "fetch") &&
      (portfolioPriceDataIdForExiting !== ""
        // ||
        //     portfolioPriceDataIdForExiting == null ||
        //     portfolioPriceDataIdForExiting == "string" ||
        //     portfolioPriceDataIdForExiting == undefined
      )
    ) {
      // if  {
      fetchPortfolioPriceDataById(portfolioPriceDataIdForExiting);
      // }
    } else if (
      (state && state.type == "new") &&
      (portfolioPriceDataIdForExiting !== ""
        // ||
        //     portfolioPriceDataIdForExiting !== null ||
        //     portfolioPriceDataIdForExiting !== "string" ||
        //     portfolioPriceDataIdForExiting !== undefined
      )
    ) {
      // if  {
      fetchPortfolioPriceDataById(portfolioPriceDataIdForExiting);
      // }
    }
    // 
  }, [value]);

  const fetchPortfolioPriceDataById = async (id) => {

    // alert(id)
    const portfolioPriceDataFetch = await getPortfolioPriceById(id);
    setPricePriceData(portfolioPriceDataFetch.data.price)
    setPriceCalculatedPrice(portfolioPriceDataFetch.data.calculatedPrice);

  };

  useEffect(() => {

    if (state && state.type === "new") {
      // setPortfolioId(state.portfolioId);
      // setGeneralData({ ...generalData, estimationNo: state.builderId });
      var versionHistoryData = {
        portfolioId: "",
        exitingType: "portfolio",
        editable: false,
      }
      localStorage.setItem('exitingType', JSON.stringify(versionHistoryData));
    } else if (state) {
      setPortfolioId(state.portfolioId);
      fetchAllDetails(state.portfolioId);
      var versionHistoryData = {
        portfolioId: state.portfolioId,
        exitingType: "portfolio",
        editable: true,
      }
      localStorage.setItem('exitingType', JSON.stringify(versionHistoryData));
    }
  }, []);

  const fetchAllDetails = async (PortfolioId) => {
    if (PortfolioId) {
      setHeaderLoading(true);
      await getPortfolio(PortfolioId)
        .then((result) => {
          populateHeader(result);
        })
        .catch((err) => {
          handleSnack("error", "Error occured while fetching header details");
        });
      setHeaderLoading(false);
    }
  };

  const strategyList = useAppSelector(
    selectStrategyTaskOption(selectStrategyTaskList)
  );

  const taskList = useAppSelector(selectStrategyTaskOption(selectTaskList));

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
  const unitList = useAppSelector(selectStrategyTaskOption(selectUnitList));
  const frequencyList = useAppSelector(
    selectStrategyTaskOption(selectFrequencyList)
  );

  const updatedList = useAppSelector(
    selectStrategyTaskOption(selectUpdateList)
  );

  const updatedTaskList = useAppSelector(
    selectStrategyTaskOption(selectUpdateTaskList)
  );

  // const updateList = useSelector((state)=>state.taskReducer)
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
  const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
      // Show prompt based on state
      if (showExitPrompt) {
        alert("Reload Lose Data");
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = "";
        }
        return "";
      }
    };
  };

  window.onload = function () {
    // initBeforeUnLoad(showExitPrompt)
  };
  // const handleTaskChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value as string);
  // };

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];

  const discountTypeOptions = [
    { value: "PROGRAM_DISCOUNT", label: "Program" },
    { value: "CUSTOMER_DISCOUNT", label: "Customer" },
    { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
  ]

  const additionaloptions = [
    { value: "LIST_PRICE", label: "List Price" },
    { value: "OPTION_PRICE", label: "Option Price" },
    { value: "SPECIAL_PRICE", label: "Special Price" },
    { value: "FLAT_PRICE", label: "Flat Price" },
    { value: "EMPTY", label: "" },
  ];
  const options2 = [
    { value: "chocolate", label: "Archived" },
    { value: "strawberry", label: "Draft" },
    { value: "vanilla", label: "Active" },
    { value: "Construction", label: "Revised" },
  ];
  const options3 = [
    { value: "chocolate", label: "Gold 12" },
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
    console.log(newValue);
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];

  const activityOptions = ["Create Versions", "Show Errors", "Review"];
  const portfolioBodyMoreActions = [
    "New Bundle",
    "New Service",
    "New Portfolio Item",
  ];

  const rows = [
    {
      id: 1,
      GroupNumber: "Snow",
      Type: "Jon",
      Partnumber: 35,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Inconsistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Actions: "Inconsistent",
    },
    {
      id: 2,
      GroupNumber: "Lannister",
      Type: "Cersei",
      Partnumber: 42,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Actions: "Inconsistent",
    },
    {
      id: 3,
      GroupNumber: "Lannister",
      Type: "Jaime",
      Partnumber: 45,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Actions: "Inconsistent",
    },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];

  const handleBundleServiceItemCheckBoxData = () => {

    var _selectedBundleServiceItemData = [...tempBundleService2];
    // console.log("_selectedBundleServiceItemData : ", _selectedBundleServiceItemData);

    // if(createdItemsIdData)
    // var createdItemsLength = createdItemsIdData.length;
    // console.log("createdItemsLength : ", createdItemsLength)
    // if(currentItemId === createdItemsIdData.)
    // if (createdItemsLength > 0) {
    //   if (currentItemId === createdItemsIdData.at(createdItemsLength - 1)) {

    //   }
    // } else {
    // }

    // console.log("tempBundleService2 : ",tempBundleService2);
    let cloneArr = []
    tempBundleService2.map((data, i) => {
      console.log("data: ", data)
      const exist = tempBundleService3.some(item => item.itemId === data.itemId)
      console.log("exist: ", exist)
      if (!exist) {
        cloneArr.push(data)
        // setTempBundleService3([...tempBundleService3, data])
      }
    })
    // console.log("createdItemsIdData : ", createdItemsIdData);

    setTempBundleService3([...tempBundleService3, ...cloneArr])
    setTempBundleService1([])
  }

  // console.log("tempbundleService3 New : ", tempBundleService3);

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
  const handleEditIncludeSerialNo = async (i, e, row) => {

    var editSerialNo = "";

    console.log("handleEditIncludeSerialNo row:", row);

    const _selectedMasterData = [...selectedMasterData]
    const objMaster = _selectedMasterData[i]

    if (objMaster.associatedIncludedModelData) {
      editSerialNo = objMaster.associatedIncludedModelData[0].serialNumber?.value;
    }


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

  const addTempItemIntobundleItem = async () => {
    setLoadingItem(true);
    setItemModelShow(false);
    let temp = [];
    let itemsData = [];
    for (let key1 in tempBundleItemCheckList) {
      for (let i = 0; i < tempBundleItems.length; i++) {
        if (
          (tempBundleItems[i].itemId == key1 &&
            tempBundleItemCheckList[key1]) ||
          tempBundleItems[i].itemId == tempBundleItemCheckList.selectedId
        ) {
          itemsData.push({ itemId: tempBundleItems[i].itemId });
          for (let k = 0; k < tempBundleItems[i].associatedServiceOrBundle.length; k++) {
            itemsData.push({ itemId: tempBundleItems[i].associatedServiceOrBundle[k].itemId })
          }
          temp.push(tempBundleItems[i]);
          break;
        }
      }
    }
    console.log("temp record is : ", temp);
    console.log("itemsData is : ", itemsData);
    setPortfolioItems(itemsData);

    // const { portfolioId, ...res } = generalComponentData;
    // let obj = {
    //   ...res,
    //   visibleInCommerce: true,
    //   customerId: 0,
    //   lubricant: true,
    //   customerSegment: generalComponentData.customerSegment
    //     ? generalComponentData.customerSegment.value
    //     : "EMPTY",
    //   machineType: generalComponentData.machineType
    //     ? generalComponentData.machineType
    //     : "EMPTY",
    //   status: generalComponentData.status
    //     ? generalComponentData.status
    //     : "EMPTY",
    //   strategyTask: generalComponentData.strategyTask
    //     ? generalComponentData.strategyTask
    //     : "EMPTY",
    //   taskType: generalComponentData.taskType
    //     ? generalComponentData.taskType
    //     : "EMPTY",
    //   usageCategory: generalComponentData.usageCategory
    //     ? generalComponentData.usageCategory
    //     : "EMPTY",
    //   productHierarchy: generalComponentData.productHierarchy
    //     ? generalComponentData.productHierarchy
    //     : "EMPTY",
    //   geographic: generalComponentData.geographic
    //     ? generalComponentData.geographic
    //     : "EMPTY",
    //   availability: generalComponentData.availability
    //     ? generalComponentData.availability
    //     : "EMPTY",
    //   responseTime: generalComponentData.responseTime
    //     ? generalComponentData.responseTime
    //     : "EMPTY",
    //   type: generalComponentData.type ? generalComponentData.type : "EMPTY",
    //   application: generalComponentData.application
    //     ? generalComponentData.application
    //     : "EMPTY",
    //   contractOrSupport: generalComponentData.contractOrSupport
    //     ? generalComponentData.contractOrSupport
    //     : "EMPTY",
    //   lifeStageOfMachine: generalComponentData.lifeStageOfMachine
    //     ? generalComponentData.lifeStageOfMachine
    //     : "EMPTY",
    //   supportLevel: generalComponentData.supportLevel
    //     ? generalComponentData.supportLevel
    //     : "EMPTY",
    //   customerGroup: generalComponentData.customerGroup
    //     ? generalComponentData.customerGroup
    //     : "EMPTY",
    //   searchTerm: "EMPTY",
    //   supportLevel: "EMPTY",
    //   // portfolioPrice: {},
    //   // additionalPrice: {},
    //   // escalationPrice: {},
    //   items: itemsData,
    //   coverages: portfolioCoverage,
    //   usageCategory: categoryUsageKeyValue1.value,
    //   taskType: stratgyTaskTypeKeyValue.value,
    //   strategyTask: stratgyTaskUsageKeyValue.value,
    //   responseTime: stratgyResponseTimeKeyValue.value,
    //   productHierarchy: stratgyHierarchyKeyValue.value,
    //   geographic: stratgyGeographicKeyValue.value,
    //   preparedBy: administrative.preparedBy,
    //   approvedBy: administrative.approvedBy,
    //   preparedOn: administrative.preparedOn,
    //   revisedBy: administrative.revisedBy,
    //   revisedOn: administrative.revisedOn,
    //   salesOffice: administrative.salesOffice?.value,
    //   offerValidity: administrative.offerValidity?.value,
    // };
    let obj = {
      portfolioId: portfolioId,
      name: generalComponentData.name,
      description: generalComponentData.description,
      externalReference: generalComponentData.externalReference,
      customerSegment: generalComponentData.customerSegment?.value,

      validFrom: validityData.fromDate,
      validTo: validityData.toDate,

      usageCategory: categoryUsageKeyValue1.value
        ? categoryUsageKeyValue1.value : "EMPTY",
      strategyTask: stratgyTaskUsageKeyValue.value ?
        stratgyTaskUsageKeyValue.value : "EMPTY",
      taskType: stratgyTaskTypeKeyValue.value ?
        stratgyTaskTypeKeyValue.value : "EMPTY",
      responseTime: stratgyResponseTimeKeyValue.value ?
        stratgyResponseTimeKeyValue.value : "EMPTY",
      productHierarchy: stratgyHierarchyKeyValue.value ?
        stratgyHierarchyKeyValue.value : "EMPTY",
      geographic: stratgyGeographicKeyValue.value ?
        stratgyGeographicKeyValue.value : "EMPTY",

      preparedBy: administrative.preparedBy,
      approvedBy: administrative.approvedBy,
      preparedOn: administrative.preparedOn,
      revisedBy: administrative.revisedBy,
      revisedOn: administrative.revisedOn,
      offerValidity: administrative.offerValidity?.value,
      salesOffice: administrative.salesOffice?.value,

      portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
        ? portfolioPriceDataId : null,
      additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
        ? portfolioAdditionalPriceDataId : null,
      escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
        ? portfolioEscalationPriceDataId : null,

      supportLevel: value3.value,
      status: value2.value,

      items: portfolioItems,
      coverages: portfolioCoverage,

      machineType: "NEW",
      searchTerm: "",
      lubricant: true,
      customerId: 0,
      customerGroup: "",
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
      template: true,
      visibleInCommerce: true
    }

    if ((portfolioId !== "") || (portfolioId !== undefined)) {
      const updatePortfolioRes = await updatePortfolio(
        portfolioId,
        obj
      );
    }
    // if (generalComponentData.portfolioId) {
    //   const updatePortfolioRes = await updatePortfolio(
    //     generalComponentData.portfolioId,
    //     obj
    //   );
    // }
    setBundleItems(temp);
    setLoadingItem(false);
    setTabs("1");
  };

  const makeHeaderEditable = () => {
    // console.log("Data is : ", "helloooooo")
    // if (state && state.type == "fetch") {
    if (value2.value == "ACTIVE") {
      toast("😐" + " The portfolio data cannot be changed on active status, change to revise status to edit", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (value === "general" && viewOnlyTab.generalViewOnly)
        setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: false });
      else if (value === "validity" && viewOnlyTab.validityViewOnly) {
        setViewOnlyTab({ ...viewOnlyTab, validityViewOnly: false });
      }
      else if (value === "strategy" && viewOnlyTab.strategyViewOnly) {
        setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: false });
      }
      else if (value === "administrative" && viewOnlyTab.administrativeViewOnly) {
        setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: false });
      }
      else if (value === "price" && viewOnlyTab.priceViewOnly) {
        setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: false });
      }
    }
    // } else {
    //   if (value === "general" && viewOnlyTab.generalViewOnly)
    //     setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: false });
    //   else if (value === "validity" && viewOnlyTab.validityViewOnly) {
    //     setViewOnlyTab({ ...viewOnlyTab, validityViewOnly: false });
    //   }
    //   else if (value === "strategy" && viewOnlyTab.strategyViewOnly) {
    //     setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: false });
    //   }
    //   else if (value === "administrative" && viewOnlyTab.administrativeViewOnly) {
    //     setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: false });
    //   }
    // }


  }

  const columns = [
    {
      name: (
        <>
          <div>
            <Checkbox className="text-white" {...label} />
          </div>
        </>
      ),
      selector: (row) => row.standardJobId,
      wrap: true,
      sortable: true,
      maxWidth: "300px",
      cell: (row) => <Checkbox className="text-black" />,
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
      selector: (row) => row.modelDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.modelDescription,
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
    {
      name: (
        <>
          <div>Serial No</div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      format: (row) => row.bundleId,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Start Serial No
          </div>
        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>End Serial No</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
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
          <img className="mr-2" src={penIcon} />
          <img className="mr-2" src={deleticon} />
          <img src={link1Icon} />
        </div>
      ),
    },
  ];

  const masterColumns = [
    // {
    //   name: (
    //     <>
    //       <div>Select</div>
    //     </>
    //   ),
    //   selector: (row) => row.check1,
    //   wrap: true,
    //   sortable: true,
    //   maxWidth: "300px",
    //   cell: (row) => (
    //     <Checkbox
    //       className="text-black"
    //       checked={row.check1}
    //       onChange={(e) => handleCheckboxData(e, row)}
    //     />
    //   ),
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
            className="btn-svg text-white cursor"
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
      selector: (row, i) => ((i + 1) * 10), // row.itemId,
      wrap: true,
      sortable: true,
      format: (row, i) => ((i + 1) * 10), // row.itemId,
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
      selector: (row) => row.itemHeaderModel.itemHeaderDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel.itemHeaderDescription,
      minWidth: "150px",
      maxWidth: "150px",
    },
    // --------------- New (Add on Update Item Fileds) Start ------------------- //
    {
      name: (
        <>
          <div>Strategy</div>
        </>
      ),
      selector: (row) => row.itemBodyModel.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel.itemHeaderStrategy,
    },
    {
      name: (
        <>
          <div>Task Type</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.taskType,
    },
    {
      name: (
        <>
          <div>Quantity</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.quantity,
    },
    //  additional
    {
      name: (
        <>
          <div>Unit Price (per one)</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.netPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.netPrice,
    },
    {
      name: (
        <>
          <div>Net Parts</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.partsprice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.partsprice,
    },
    {
      name: (
        <>
          <div>Net Service</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.servicePrice,
    },
    {
      name: (
        <>
          <div>Net Price</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.totalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.totalPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.comments,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.comments,
    },

    // --------------- New (Add on Update Item Fileds) End ------------------- //

    // {
    //   name: (
    //     <>
    //       <div>Standard Job Id</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.standardJobId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.standardJobId,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Repair Options</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.repairOption,
    //   sortable: true,
    //   maxWidth: "300px",
    //   format: (row) => row.itemBodyModel.repairOption,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Frequency</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.frequency,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.frequency,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Quantity</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.quantity,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.quantity,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Parts $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.sparePartsPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.sparePartsPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Service $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.servicePrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.servicePrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Total $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.totalPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.totalPrice,
    // },
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
          {/* <div className=" cursor" onClick={handleBundleItemOpen}>
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
          </div> */}
          <div>
            <Tooltip title="View">
              <Link to="#" className="px-1" onClick={(e) => handleEditPortfolioItem(e, row)}>
                <VisibilityOutlinedIcon />
              </Link>
            </Tooltip>
          </div>
          {/* <div
            className=" cursor"
            onClick={(e) => handleServiceItemEdit(e, row)}
          >
            
            <Tooltip title="Edit">
              <Link to="#" className="px-1">
                <img className="m-1" src={penIcon} />
              </Link>
            </Tooltip>
          </div> */}
          <div>
            <DropdownButton
              className="customDropdown ml-2"
              id="dropdown-item-button"
            >
              <Dropdown.Item className=" cursor" data-toggle="modal" data-target="#myModal12">
                <Tooltip title="Inclusion">
                  <Link to="#" className="px-1" onClick={(e) => Inclusion_Exclusion(e, row)} >
                    <img src={cpqIcon}></img><span className="ml-2">Inclusion /<br></br> Exclusion</span>
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

          {/* <div
            className=" cursor"
            onClick={(e) => handleServiceItemSave(e, row)}
          >
            <Tooltip title="Save">
              <Link to="#" className="px-1">
                <SaveOutlinedIcon />
              </Link>
            </Tooltip>
          </div> */}
          <div >

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
      maxWidth: "51px",
      minWidth: "51px",
      cell: (row) => (
        <>
          {valueOfUseCase == 3 ? (
            <input
              type="radio"
              name="selectedId"
              className="cursor"
              value={row.itemId}
              onChange={(e) => handleTempbundleItemSelection(e, row.id)}
              style={{ border: "1px solid #000" }}
            />
          ) : (
            <input
              type="checkbox"
              className="cursor"
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
          <div>Solution Id</div>
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
      selector: (row) => row.itemHeaderModel.itemHeaderDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel.itemHeaderDescription,
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

    // --------------- New (Add on Update Item Fileds) Start ------------------- //
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
      selector: (row) => row.itemBodyModel?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.quantity,
    },
    {
      name: (
        <>
          <div>Net Price</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.netPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.netPrice,
    },
    {
      name: (
        <>
          <div>Net Additional</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel.additional,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel.additional,
    },
    {
      name: (
        <>
          <div>Net Parts Price</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.partsprice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.partsprice,
    },
    {
      name: (
        <>
          <div>Net Service Price</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.servicePrice,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.itemBodyModel?.totalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.itemBodyModel?.totalPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.itemHeaderModel?.comments,
      wrap: true,
      sortable: true,
      format: (row) => row.itemHeaderModel?.comments,
    },

    // --------------- New (Add on Update Item Fileds) End ------------------- //

    // {
    //   name: (
    //     <>
    //       <div>Standard Job Id</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.standardJobId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.standardJobId,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Repair Options</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.repairOption,
    //   sortable: true,
    //   maxWidth: "300px",
    //   format: (row) => row.itemBodyModel.repairOption,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Frequency</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.frequency,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.frequency,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Quantity</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.quantity,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.quantity,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Parts $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.sparePartsPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.sparePartsPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Service $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.servicePrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.servicePrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Total $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.totalPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.totalPrice,
    // },
  ];
  const tempBundleItemColumns1 = [
    // {
    //   name: (
    //     <>
    //       <div>Item Id</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemId,
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
    // ---------------------- To do Portfolio Items --------------------//

    // {
    //   name: (
    //     <>
    //       <div>Net Price</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemHeaderModel.netPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemHeaderModel.netPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Net Additional</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemHeaderModel.additional,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemHeaderModel.additional,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Net Parts Price</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.sparePartsPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.sparePartsPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Net Service Price</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.servicePrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.servicePrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Total Price</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.totalPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.totalPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Comments</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.standardJobId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.standardJobId,
    // },

    // ---------------------- To do Portfolio Items End--------------------//

    // {
    //   name: (
    //     <>
    //       <div>Id31</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemId,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Description</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.itemBodyDescription,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.itemBodyDescription,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Strategy</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemHeaderModel.strategy,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemHeaderModel.strategy,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Standard Job Id</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.standardJobId,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.standardJobId,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Repair Options</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.repairOption,
    //   sortable: true,
    //   maxWidth: "300px",
    //   format: (row) => row.itemBodyModel.repairOption,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Frequency</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.frequency,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.frequency,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Quantity</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.quantity,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.quantity,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Parts $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.sparePartsPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.sparePartsPrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Service $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.servicePrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.servicePrice,
    // },
    // {
    //   name: (
    //     <>
    //       <div>Total $</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemBodyModel.totalPrice,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemBodyModel.totalPrice,
    // },
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
      cell: (row, i) => (
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
      cell: (row, i) => (
        <div className="date-box tabledate-box">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              format="dd/MM/yyyy"
              className="form-controldate border-radius-10 mr-3"
              label=""
              // value={row.serialNumber}
              // value={row.startDate}
              onChange={(e) => handleIncludedSerialNoStartDataChange(e, i, row)}
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
      maxWidth: "127px",
      minWidth: "127px",
      sortable: true,
      format: (row) => row.endDate,
      cell: (row, i) => (
        <div className="date-box tabledate-box">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              format="dd/MM/yyyy"
              className="form-controldate border-radius-10"
              label=""
              // value={row.endDate}
              onChange={(e) => handleIncludedSerialNoEndDataChange(e, i, row)}
            // value={validityData.fromDate}
            />
          </MuiPickersUtilsProvider>
        </div>
      ),
    },
  ];

  // console.log("setSerialNumber 1234 : ", serialNumber);

  const data4 = [
    {
      family: "MOTONIVELADORAS",
      model: 120,
      noSeriese: "0JAPA000470",
      location: "LIMA",
      startDate: "08/04/20017",
      endDate: "08/04/20017",
    },
    {
      family: "MOTONIVELADORAS",
      model: 120,
      noSeriese: "0JAPA000470",
      location: "LIMA",
      startDate: "08/04/20017",
      endDate: "08/04/20017",
    },
  ];

  const handleGetheaderSearch = () => {
    console.log("handleGetheaderSearch");
    let { searchBy, family, inputField } = itemHeaderSearch;
    if (searchBy.value == "" || family.value === "" || inputField == "") {
      alert("Please select/fill values properly");
      return;
    }
    const searchStr = `${family.value}~${inputField}`;
    if (searchBy.value === "portfolioItem") {
      console.log("service called...");
    }
  };

  const handleServiceItemOpen = () => {
    setServiceOrBundlePrefix("SERVICE");
    // setServiceOrBundleShow(true);
    setBundleServiceShow(true);
    setBundleTabs("bundleServiceHeader");
  };
  const handleBundleItemOpen = () => {
    setServiceOrBundlePrefix("BUNDLE");
    // setServiceOrBundleShow(true);
    setBundleServiceShow(true);
    setBundleTabs("bundleServiceHeader");
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
        if ((createServiceOrBundle.name == "") ||
          (createServiceOrBundle.name == undefined)) {
          throw "Service Name is a required field, you can’t leave it blank";
        }
        if ((createServiceOrBundle.description == "") ||
          (createServiceOrBundle.description == undefined)) {
          throw "Service Description is a required field, you can’t leave it blank";
        }
        if ((createServiceOrBundle.model == "") ||
          (createServiceOrBundle.model == undefined)) {
          throw "Model is a required field, you can’t leave it blank";
        }

        let reqObj = {
          itemId: createServiceOrBundle.id,
          itemName: createServiceOrBundle.name,
          itemHeaderModel: {
            itemHeaderId: createServiceOrBundle.id,
            itemHeaderDescription: createServiceOrBundle.description,
            bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            portfolioItemId: bundleServicePortfolioItemId,
            reference: createServiceOrBundle.reference,
            itemHeaderMake: createServiceOrBundle.make,
            itemHeaderFamily: createServiceOrBundle.family,
            model: createServiceOrBundle.model,
            prefix: createServiceOrBundle.prefix?.value,
            type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "MACHINE",
            additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
            currency: "",
            netPrice: 0,
            itemProductHierarchy: "END_PRODUCT",
            itemHeaderGeographic: "ONSITE",
            responseTime: "PROACTIVE",
            usage: "",
            validFrom: "",
            validTo: "",
            estimatedTime: "",
            servicePrice: 0,
            status: "DRAFT",
            itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
            componentCode: "",
            componentDescription: "",
            serialNumber: "",
            variant: "",
            itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
            jobCode: "",
            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            salesOffice: administrative.salesOffice?.value,
            offerValidity: administrative.offerValidity?.value
          },
          itemBodyModel: {
            itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
            itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
            frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
            spareParts: ["WITH_SPARE_PARTS"],
            labours: ["WITH_LABOUR"],
            miscellaneous: ["LUBRICANTS"],
            taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
            solutionCode: "",
            usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
            recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
            usage: "",
            year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
            avgUsage: 0,
            unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
            itemPrices: serviceOrBundlePrefix === "BUNDLE" ?
              bundleServiceItemPriceData : [],
          }
        }

        const res = await updateItemData(createServiceOrBundle.id, reqObj);
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

    // if (serviceOrBundlePrefix === "BUNDLE") {
    //   setBundleTabs("bundleServiceItems");
    // }
    // if (serviceOrBundlePrefix === "SERVICE") {
    //   setBundleTabs("bundleServicePriceCalculator");
    //   saveAddNewServiceOrBundle();
    // }
    // setTabs("bundleServiceAdministrative") //moving to component Data tab in create Item model

  };
  const columns2 = [
    { field: "GroupNumber", headerName: "ID#", flex: 1, width: 70 },
    { field: "Type", headerName: "Description", flex: 1, width: 130 },
    { field: "Partnumber", headerName: "Customer#", flex: 1, width: 130 },
    { field: "PriceExtended", headerName: "Make", flex: 1, width: 130 },
    { field: "Pricecurrency", headerName: "Model", flex: 1, width: 130 },
    { field: "Usage", headerName: "Family", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Serial#", flex: 1, width: 130 },
    { field: "Comments", headerName: "Created by", flex: 1, width: 130 },
    { field: "Created", headerName: "Created On", flex: 1, width: 130 },
    { field: "Total", headerName: "Total $", flex: 1, width: 130 },
    { field: "Status", headerName: "Status", flex: 1, width: 130 },
  ];
  const handleRowClick = (e) => {
    setShow(true);
  };
  const [show, setShow] = React.useState(false);

  const [querySearchModelResult, setQuerySearchModelResult] = useState([])
  const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] = useState([])

  const [selectedPrefixOption, setSelectedPrefixOption] = useState("");
  const [includedModelIndex, setIncludedModelIndex] = useState(0);


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
          // var serialValue = {label: equipmentNumber, value: equipmentNumber}
          serialArr.push({ label: result[i].equipmentNumber, value: result[i].equipmentNumber })
        }
      })
    setCoverageSerialResultList(serialArr)
    setIncludedModelIndex(i)
    setShowRelatedModel(true);

    // return

    // console.log("datarow ----- : ", dataRow, obj);
    // setModelIncludedData([]);

    // var ModelBoxKeys = [];
    // var KeyValues = [];

    // for (var key in openedModelBoxData) {
    //   ModelBoxKeys.push(Object.keys(openedModelBoxData[key]));
    // }

    // const ValIs = ModelBoxKeys.map((i, data) => {
    //   KeyValues.push(Number(i[0]));
    // });

    // if (!KeyValues.includes(dataRow.id)) {
    //   openedModelBoxData.push({
    //     [dataRow.id]: [
    //       {
    //         family: dataRow.family,
    //         model: dataRow.model,
    //         noSeriese: "0JAPA000470",
    //         location: "LIMA",
    //         startDate: "08/04/2017",
    //         endDate: "08/04/2017",
    //         serialNumber: ""
    //       },
    //     ],
    //   });
    // }

    // setOpenedModelBoxData([...openedModelBoxData]);

    // const NewAddedData = openedModelBoxData.map((currentItem, i) => {
    //   if (currentItem.hasOwnProperty(dataRow.id)) {
    //     var valueOf = Object.values(currentItem);
    //     const Addval = valueOf.map((myVal, i) => {
    //       console.log("currentItem1234567", myVal)
    //       setModelIncludedData([...myVal]);
    //     });
    //   }
    // });

    // var searchQueryMachine = dataRow.model
    //   ? "model~" + dataRow.model
    //   : "";
    // var serialArr = [];
    // console.log("dataRow ---- ", searchQueryMachine)
    // await machineSearch(searchQueryMachine)
    //   .then((result) => {
    //     console.log("my rsult is ---- ", result)
    //     for (let i = 0; i < result.length; i++) {
    //       serialArr.push({ label: result[i].equipmentNumber, value: result[i].equipmentNumber })
    //     }
    //   })
    // setCoverageSerialResultList(serialArr)
    // console.log("serialArr --- : ", serialArr);
    // setShowRelatedModel(true);
    // setOpenModelBoxDataId(dataRow);
  };

  const AddNewRowData = (rowItem) => {
    let _selectedMasterData = [...selectedMasterData]
    let obj = _selectedMasterData[includedModelIndex]
    obj = {
      ...obj, associatedIncludedModelData: [...obj.associatedIncludedModelData, {
        family: rowItem.family,
        model: rowItem.model,
        noSeriese: "0JAPA000470",
        location: "LIMA",
        startDate: "08/04/20017",
        endDate: "08/04/20017",
        serialNumber: ""
      }]
    }
    _selectedMasterData[includedModelIndex] = obj

    setSelectedMasterData([..._selectedMasterData])
    // return


    // if (showRelatedModel === true) {
    //   const _IncludedDataList = [...openedModelBoxData];

    //   const NewAddedData = _IncludedDataList.map((currentItem, i) => {
    //     for (var j in currentItem) {
    //       if (j == rowItem.id) {
    //         currentItem[j].push({
    //           family: rowItem.family,
    //           model: rowItem.model,
    //           noSeriese: "0JAPA000470",
    //           location: "LIMA",
    //           startDate: "08/04/20017",
    //           endDate: "08/04/20017",
    //           serialNumber:""
    //         });
    //         setModelIncludedData([...currentItem[j]]);

    //         setOpenedModelBoxData([...openedModelBoxData]);
    //       }
    //     }
    //   });
    // }
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
        // if (
        //   data.associatedIncludedModelData[i].model === "" ||
        //   data.associatedIncludedModelData[i].family === ""
        // ) {
        //   throw "Family or Model values are missing";
        // }
        if (i > 0) {
          let reqObj = {
            coverageId: 0,
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
            // startDate: data.associatedIncludedModelData[i].startDate,
            // endDate: data.associatedIncludedModelData[i].endDate,
            startDate: "",
            endDate: "",
            actions: "",
            createdAt: "",
          };
          const cvgRes = await createCoverage(reqObj);
          console.log("createCoverage res:", cvgRes);
          cvgIds.push({ coverageId: cvgRes.coverageId });
        } else {
          console.log("0 index");
        }

      }

      setPortfolioCoverage(cvgIds);
      setShowRelatedModel(false)
    }

    // const cvgObj = {
    //   coverageId: 0,
    //   serviceId: 0,
    //   modelNo: string,
    //   serialNumber: string,
    //   startSerialNumber: string,
    //   endSerialNumber: string,
    //   serialNumberPrefix: string,
    //   family: string,
    //   make: string,
    //   fleet: string,
    //   fleetSize: SMALL,
    //   location: string,
    //   startDate: 2022 - 12 - 09,
    //   endDate: 2022 - 12 - 09,
    //   actions: string,
    // }



  }

  const handleDisableSerialNoChangesOptions = (e, i, row) => {

    // const selectedValue = coverageSerialResultList.value;
    // const changeToValue = e.value;
    // console.log(" value is : ",changeToValue)

    // return !(coverageSerialResultList.includes(e));

  }


  const handleExpandedRowDelete = async (e, itemId, bundleId) => {
    try {
      const delRes = await deleteItem(bundleId);
      if (delRes.status == 200) {
        toast("😎 Deletion Successfull", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const _bundleItems = [...bundleItems];
        for (let i = 0; i < _bundleItems.length; i++) {
          if (_bundleItems[i].itemId == itemId) {
            for (
              let j = 0;
              j < _bundleItems[i].associatedServiceOrBundle.length;
              j++
            ) {
              if (
                _bundleItems[i].associatedServiceOrBundle[j].itemId == bundleId
              ) {
                _bundleItems[i].associatedServiceOrBundle.splice(j, 1);
                break;
              }
            }
            break;
          }
        }
        setBundleItems(_bundleItems);
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
  };

  const handleExpandedRowEdit = (e, itemId, rowData) => {
    setPassItemEditRowData({
      ...rowData,
      _itemId: itemId,
      _bundleId: rowData.itemId,
    });
    setEditItemShow(true);
  };

  const getAddPortfolioItemDataFun = async (data) => {

    console.log("my data is: ", data)
    setAddportFolioItem(data);
    // console.log("data------ : ", data)


    const newPriceObj = {
      itemPriceDataId: 0,
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
      recommendedValue: parseInt(data.recommendedValue),
      startUsage: parseInt(data.startUsage),
      endUsage: parseInt(data.endUsage),
      sparePartsEscalation: 0,
      labourEscalation: 0,
      miscEscalation: 0,
      serviceEscalation: 0,
      withBundleService: data.withBundleService,
      portfolio: {
        portfolioId: ((portfolioId == 0 || portfolioId == null || portfolioId == undefined) ? 1 : portfolioId)
      },
      tenantId: 0,
      partsRequired: true,
      labourRequired: true,
      serviceRequired: false,
      miscRequired: true,
      inclusionExclusion: true
    }

    // const rObj = {
    //   itemPriceDataId: 0,
    //   quantity: addPortFolioItem.quantity,
    //   startUsage: addPortFolioItem.startUsage,
    //   endUsage: addPortFolioItem.endUsage,
    //   standardJobId: addPortFolioItem.templateId,
    //   repairKitId: addPortFolioItem.repairOption,
    //   templateDescription: addPortFolioItem.templateDescription?.value,
    //   repairOption: "",
    //   additional: "",
    //   partListId: "",
    //   serviceEstimateId: "",
    //   numberOfEvents: addPortFolioItem?.numberOfEvents,
    //   priceMethod: "LIST_PRICE",
    //   priceType: "FIXED",
    //   listPrice: 0,
    //   priceEscalation: "",
    //   calculatedPrice: 0,
    //   flatPrice: 0,
    //   discountType: "",
    //   year: addPortFolioItem.year?.value,
    //   noOfYear: addPortFolioItem.noOfYear,
    //   sparePartsPrice: 0,
    //   sparePartsPriceBreakDownPercentage: 0,
    //   servicePrice: 0,
    //   labourPrice: 0,
    //   labourPriceBreakDownPercentage: 0,
    //   miscPrice: 0,
    //   miscPriceBreakDownPercentage: 0,
    //   totalPrice: 0,
    //   netService: 0,
    //   portfolio: {
    //     portfolioId: ((portfolioId == 0 || portfolioId == null || portfolioId == undefined) ? 1 : portfolioId)
    //   },
    //   tenantId: 0,
    //   createdAt: "2022-12-09T13:52:27.880Z",
    //   partsRequired: true,
    //   serviceRequired: false,
    //   labourRequired: true,
    //   miscRequired: true
    // }

    const itemPriceDataRes = await createItemPriceData(newPriceObj)

    if (itemPriceDataRes.status === 200) {
      setItemPriceData(itemPriceDataRes.data)
      // handleBundleItemSaveAndContinue(data, itemPriceDataRes.data);
      handlePortfolioItemSaveAndContinue(data, itemPriceDataRes.data)
      setTempBundleService1([]);
      setTempBundleService2([]);
      setTempBundleService3([]);
      console.log("addPortfolioItem : ", addPortFolioItem);
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
  const getPriceCalculatorDataFun = (data) => {
    if (bundleServicePriceCalculator) {
      setBundleServicePriceCalculator(false)
    }

    if (serviceOrBundlePrefix === "SERVICE") {
      setBundleTabs("bundleServiceAdministrative")
    } else if (serviceOrBundlePrefix === "BUNDLE") {
      setBundleTabs("bundleServiceAdministrative")
    } else {
      setPriceCalculator(data);
      handleSavePrices()
    }
  };
  const handleExpandRowForPriceCalculator = (bool, row) => {
    console.log("expended true/false ---- ", bool);
    setExpandedPriceCalculator({
      ...expandedPriceCalculator,
      itemId: row.itemId,
      description: row.itemBodyModel.itemBodyDescription,
      recommendedValue: row.itemBodyModel.recommendedValue,
      frequency: row.itemBodyModel.frequency
    })

    setCurrentExpendBundleServiceRow(row)

  }

  const handleExpandePriceChange = (e) => {
    // setExpandedPriceCalculator({ ...expandedPriceCalculator, [e.target.name]: e.target.value })
  }
  const handleExpandedPriceSave = async (e, rowData) => {
    try {
      const { itemId, itemName, itemHeaderModel, itemBodyModel } = rowData
      let reqObj1 = {
        itemId,
        itemName,
        itemHeaderModel,
        itemBodyModel: {
          ...itemBodyModel,
          itemBodyDescription: $("#description").val(),
          startUsage: $("#startUsage").val(),
          endUsage: $("#endUsage").val(),
          frequency: $("#frequency").val(),
          recommendedValue: parseInt($("#recommendedValue").val()),
          numberOfEvents: parseInt($("#numberOfEvents").val()),
          priceMethod: expandedPriceCalculator.priceMethod.value,
          additional: $("#priceAdditionalInput").val(),
          priceEscalation: $("#priceEscalationInput").val(),
          calculatedPrice: parseInt($("#calculatedPrice").val()),
          flatPrice: parseInt($("#flatPrice").val()),
          discountType: $("#discountTypeInput").val(),
        }
      }
      const res = await updateItemData(itemId, reqObj1)
      if (res.status == 200) {
        toast(`😎 ${itemId}: price updated`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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

  const ExpendedModelComponent = ({ data }) => (
    <div className="scrollbar" id="style">
      {data.associatedServiceOrBundle?.length > 0 ?
        <>
          {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
            <div
              key={i}
              id="row-0"
              role="row"
              className="sc-evZas cMMpBL rdt_TableRow"
              style={{ backgroundColor: "rgb(241 241 241 / 26%)" }}
            >
              <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell"></div>
              {/* <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell"></div> */}
              <div
                id="cell-1-undefined"
                data-column-id="1"
                role="gridcell"
                className="m-w-51 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div></div>
                {/* <div>{bundleAndService.itemId}</div> */}
              </div>
              <div
                id="cell-1-undefined"
                data-column-id="1"
                role="gridcell"
                className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div>{bundleAndService.itemId}</div>
              </div>
              <div
                id="cell-2-undefined"
                data-column-id="2"
                role="gridcell"
                className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div data-tag="allowRowEvents">
                  {bundleAndService.itemHeaderModel.itemHeaderDescription}
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
                  {bundleAndService.itemHeaderModel.itemHeaderStrategy}
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
                  {bundleAndService.itemBodyModel.taskType}
                </div>
              </div>
              <div
                id="cell-5-undefined"
                data-column-id="5"
                role="gridcell"
                className="m-w-92 sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY custom-rdt_TableCell rdt_TableCell"
                data-tag="allowRowEvents"
              >
                <div data-tag="allowRowEvents">
                  {bundleAndService.itemBodyModel?.quantity}
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
                  {bundleAndService.itemHeaderModel.netPrice}
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
                  {bundleAndService.itemHeaderModel.additional}
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
                  {bundleAndService.itemBodyModel?.sparePartsPrice}
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
                  {bundleAndService.itemBodyModel?.totalPrice}
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
                  {bundleAndService.itemBodyModel?.comments}
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
                      data.itemId,
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
                      data.itemId,
                      data.associatedServiceOrBundle[i].itemId
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
        </> : <></>}
    </div>
  );

  // const expendAbleRowColor = (bool) => {
  //   alert(bool);
  // }

  const ExpandedComponent = ({ data }) => (
    // {data?.}
    <div>
      {/* {data.associatedServiceOrBundle?.length > 0 ?
        <> */}
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
                {/* {bundleAndService.itemId} */}
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
                {bundleAndService.itemHeaderModel.itemHeaderDescription}
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
                {bundleAndService.itemHeaderModel.itemHeaderStrategy}
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
                {/* <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
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
              </svg> */}
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
                {/* <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
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
              </svg> */}
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
                {/* <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
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
              </svg> */}
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
                  <Link to="#" className="px-1" onClick={() => handleExpendedBundleServiceUpdate(i, bundleAndService)}>
                    <VisibilityOutlinedIcon />
                  </Link>
                </Tooltip>
              </div>
              {/* <div
              className="cursor"
              onClick={(e) =>
                handleExpandedRowEdit(
                  e,
                  data.itemId,
                  data.associatedServiceOrBundle[i]
                )
              }
            >
              <Tooltip title="Edit">
                <img className="mx-1" src={penIcon} style={{ width: "14px" }} />
              </Tooltip>
            </div>
             */}
            </div>

            {/* {bundleItems.length > 0 && (
          <div
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
                  data.itemId,
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
                  data.itemId,
                  data.associatedServiceOrBundle[i].itemId
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
          </div>)} */}

          </div>
        ))}
      </div>
      {/* </> : <></>} */}

    </div>
  );

  const handleExpendedBundleServiceUpdate = async (i, data) => {

    // alert(i)
    setAssociatedServiceOrBundleIndex(i)
    setEditBundleService(true);
    setBundleAndServiceEditAble(true)
    setBundleTabs("bundleServiceHeader");

    const newData = await getItemDataById(data.itemId)

    console.log("my newData : ", newData)

    if (newData.itemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
      setServiceOrBundlePrefix("BUNDLE");
    } else if (newData.itemHeaderModel.bundleFlag === "SERVICE") {
      setServiceOrBundlePrefix("SERVICE");
    }


    setCreateServiceOrBundle({
      id: newData.itemId,
      name: newData.itemName,
      description: newData.itemHeaderModel.itemHeaderDescription,
      bundleFlag: newData.itemHeaderModel.bundleFlag,
      reference: newData.itemHeaderModel.itemHeaderDescription,
      customerSegment: "",
      make: newData.itemHeaderModel.itemHeaderMake,
      model: newData.itemHeaderModel.model,
      family: newData.itemHeaderModel.itemHeaderFamily,
      prefix: { label: newData.itemHeaderModel.prefix, value: newData.itemHeaderModel.prefix },
      machine: { label: newData.itemHeaderModel.type, value: newData.itemHeaderModel.type },
      additional: "",
      machineComponent: { label: newData.itemHeaderModel.type, value: newData.itemHeaderModel.type },
    });

    setSelectedPrefixOption({ label: newData.itemHeaderModel.prefix, value: newData.itemHeaderModel.prefix });

    setPassItemEditRowData(newData);
    setBundleServicePortfolioItemId(newData.itemHeaderModel.portfolioItemId);

    setBundleServiceItemPriceData(newData.itemBodyModel.itemPrices)


    var offerValidityLabel;
    if (newData.itemHeaderModel.offerValidity == "15") {
      offerValidityLabel = "15 days";
    } else if (newData.itemHeaderModel.offerValidity == "30") {
      offerValidityLabel = "1 month";
    } else if (newData.itemHeaderModel.offerValidity == "45") {
      offerValidityLabel = "45 days";
    } else if (newData.itemHeaderModel.offerValidity == "60") {
      offerValidityLabel = "2 month";
    } else {
      offerValidityLabel = newData.itemHeaderModel.offerValidity;
    }

    setBundleOrServiceAdministrative({
      preparedBy: newData.itemHeaderModel.preparedBy,
      approvedBy: newData.itemHeaderModel.approvedBy,
      preparedOn: newData.itemHeaderModel.preparedOn,
      revisedBy: newData.itemHeaderModel.revisedBy,
      revisedOn: newData.itemHeaderModel.revisedOn,
      salesOffice: {
        value: newData.itemHeaderModel.salesOffice,
        label: newData.itemHeaderModel.salesOffice,
      },
      offerValidity: {
        value: newData.itemHeaderModel.offerValidity,
        label: offerValidityLabel,
      },
    })

    setBundleServiceShow(true);
  }



  const handleSelectCustomerSegment = (e) => {
    // console.log("e is : ", e)

    setSelectedCustomerSegmentOption(e)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      customerSegment: e,
    });
  }

  const ExpandedPriceCalculator = ({ data }) => (<>
    <div className="ligt-greey-bg p-2">
      <div>
        {/* <span className="mr-3">
          <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
          <span className="ml-2 font-size-14">Edit</span>
        </span> */}
        <span className="mr-3">
          <FormatListBulletedOutlinedIcon className=" font-size-16" />
          <span className="ml-2 font-size-14">Related Standard Job</span>
        </span>
        <span className="mr-3">
          <AccessAlarmOutlinedIcon className=" font-size-16" />
          <span className="ml-2 font-size-14">Related Kit</span>
        </span>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            ID
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            defaultValue={data.itemId}
            // value={expandedPriceCalculator.itemId}
            placeholder="Service/Bundle ID"
            disabled
          />
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            Description
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            placeholder="Description"
            name="description"
            id="description"
            defaultValue={data.itemBodyModel.itemBodyDescription}
            // value={expandedPriceCalculator.description}
            // onChange={handleExpandePriceChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            Frequency
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            id="frequency"
            defaultValue={data.itemBodyModel.frequency}
            // value={expandedPriceCalculator.frequency}
            // onChange={handleExpandePriceChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            Recommonded Value
          </label>
          <input
            type="number"
            className="form-control border-radius-10"
            id="recommendedValue"
            defaultValue={data.itemBodyModel.recommendedValue}
            // value={expandedPriceCalculator.recommendedValue}
            // onChange={handleExpandePriceChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            Start Usage
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            id="startUsage"
          // value={expandedPriceCalculator.startUsage}
          // onChange={handleExpandePriceChange}
          />
        </div>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            End Usage
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            id="endUsage"
          // value={expandedPriceCalculator.endUsage}
          // onChange={handleExpandePriceChange}
          />
        </div>
      </div>

      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            No. of Events
          </label>
          <input
            className="form-control border-radius-10"
            type="text"
            // placeholder="Description"
            id="numberOfEvents"
          // value={expandedPriceCalculator.numberOfEvents}
          // onChange={handleExpandePriceChange}
          />
        </div>
      </div>
    </div>
    <div className="row mb-3 ">
      <div className="col-md-6 col-sm-6">
        <div className="form-group">
          <label
            className="text-light-dark font-size-12 font-weight-500"
          >
            PRICE METHOD
          </label>
          <Select
            options={priceMethodKeyValue}
            id="priceMethod"
            value={expandedPriceCalculator.priceMethod}
            name="priceMethod"
            onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceMethod: e })}
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
                id="priceAdditionalSelect"
                options={options}
                placeholder="Select"
              // value={expandedPriceCalculator.priceAdditionalSelect}
              // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
              />
            </div>
            <input
              type="text"
              className="form-control rounded-top-left-0 rounded-bottom-left-0"
              placeholder="10%"
              value={expandedPriceCalculator.priceAdditionalInput}
              id="priceAdditionalInput"
              onChange={handleExpandePriceChange}
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
              className="select-input"
              id="priceEscalationSelect"
              options={options}
              placeholder="placeholder "
            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
            // value={expandedPriceCalculator.priceEscalationSelect}
            />
            <input
              type="text"
              className="form-control rounded-top-left-0 rounded-bottom-left-0"
              placeholder="20%"
              id="priceEscalationInput"
            // value={escalationPriceValue}
            // onchange={(e) = setEscalationPriceValue(e.target.value)}
            // defaultValue={data.itemBodyModel.priceEscalation}
            // value={expandedPriceCalculator.priceEscalationInput}
            // onChange={handleExpandePriceChange}
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
            className="form-control border-radius-10"
            id="calculatedPrice"
            placeholder="$100"
          // value={expandedPriceCalculator.calculatedPrice}
          // onChange={handleExpandePriceChange}
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
            className="form-control border-radius-10"
            id="flatPrice"
            placeholder="$100"
          // value={expandedPriceCalculator.flatPrice}
          // onChange={handleExpandePriceChange}
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
                id="discountTypeSelect"
                isClearable={true}
                options={options}
                placeholder="Select"
              // defaultValue={data.itemBodyModel.startUsage}
              // value={expandedPriceCalculator.discountTypeSelect}
              // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, discountTypeSelect: e })}
              />
            </div>
            <input
              type="text"
              className="form-control rounded-top-left-0 rounded-bottom-left-0"
              id="discountTypeInput"
              placeholder="10%"
            // defaultValue={data.itemBodyModel.discountType}
            // value={expandedPriceCalculator.discountTypeInput}
            // onChange={handleExpandePriceChange}
            />
          </div>
        </div>
      </div>

    </div>
    <div className="text-right">
      <button type="button" className="btn btn-light" onClick={(e) => handleExpandedPriceSave(e, data)}>Save</button>
    </div>
  </>)
  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open3, setOpen3] = React.useState(false);

  // Function for done Quote Convert to 
  const handleCreate = () => {
    console.log("quote Data 1 : ", quoteData)
    setQuoteDataShow(false)
    setQuoteData({
      contact: "",
      description: "",
      reference: ""
    });
    // console.log("quote Data 2 : ", quoteData)
    // history.push("/quoteTemplate");
  };

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
      if (e.target.name === 'make') {
        const res = await getSearchQueryCoverage(`make~${e.target.value}`)
        $(`#scrollbarMake`).css("display", "block");
        setComponentData({ ...componentData, [e.target.name]: e.target.value, makeSuggestions: res })
      }
      if (e.target.name === 'model') {
        if (componentData.make == "") {
          throw "Please select make"
        }
        const res = await getSearchQueryCoverage(`make:\"${componentData.make}\" AND model~${e.target.value}`)
        $(`#scrollbarModel`).css("display", "block");
        setComponentData({ ...componentData, [e.target.name]: e.target.value, modelSuggestions: res })
      }
      if (e.target.name === 'serialNo') {
        // if(componentData.make=="" || componentData.model==""){
        //   throw "Please select make/model"
        // }
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

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

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


  const handleCoverageHandleMachineSearch = async (searchCoverageMachineFieldName, modelValue, SearchText) => {
    let searchQueryMachine = "";

    if (searchCoverageMachineFieldName === "serialNo") {
      // componentData.serialNo = searchText;
      searchQueryMachine = SearchText
        ? modelValue
          ? `model:${modelValue} AND equipmentNumber~` + SearchText
          : "equipmentNumber~" + SearchText
        : "";
    }

    if (searchQueryMachine) {
      await machineSearch(searchQueryMachine)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCoverageSerialResults(result);
            setNoCoverageOptionSerial(false);
          } else {
            setNoCoverageOptionSerial(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the machine!");
        });
    }
  }

  // Select machine from the search result
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

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setComponentData({
      ...componentData,
      [name]: value,
    });
  };

  const handleComponentDataSave = async () => {
    try {
      // call put API for portfolio item to get price calculator data
      let reqObj = {}
      let itemReqObj = {};
      for (let i = 0; i < tempBundleItems.length; i++) {
        if (tempBundleItems[i].itemId === currentItemId) {
          // reqObj = {
          //   itemId: tempBundleItems[i].itemId,
          //   standardJobId: tempBundleItems[i].itemBodyModel.standardJobId,
          //   repairKitId: tempBundleItems[i].itemBodyModel.repairKitId,
          // }
          reqObj = {
            itemId: tempBundleItems[i].itemId,
            standardJobId: itemPriceData.standardJobId,
            repairKitId: itemPriceData.repairKitId,
            itemPriceDataId: itemPriceData.itemPriceDataId
          }
          itemReqObj = tempBundleItems[i];
          break;
        }
      }

      let UpdateItemreqObj = {
        itemId: itemReqObj.itemId,
        itemName: itemReqObj.itemName,
        itemHeaderModel: {
          itemHeaderId: itemReqObj.itemHeaderModel.itemHeaderId,
          itemHeaderDescription: itemReqObj.itemHeaderModel.itemHeaderDescription,
          bundleFlag: itemReqObj.itemHeaderModel.bundleFlag,
          portfolioItemId: itemReqObj.itemHeaderModel.portfolioItemId,
          reference: itemReqObj.itemHeaderModel.reference,
          itemHeaderMake: componentData.make,
          itemHeaderFamily: componentData.family,
          model: componentData.model,
          prefix: componentData.prefix,
          type: itemReqObj.itemHeaderModel.type,
          additional: itemReqObj.itemHeaderModel.additional,
          currency: itemReqObj.itemHeaderModel.currency,
          netPrice: itemReqObj.itemHeaderModel.netPrice,
          itemProductHierarchy: itemReqObj.itemHeaderModel.itemProductHierarchy,
          itemHeaderGeographic: itemReqObj.itemHeaderModel.itemHeaderGeographic,
          responseTime: itemReqObj.itemHeaderModel.responseTime,
          usage: itemReqObj.itemHeaderModel.usage,
          validFrom: itemReqObj.itemHeaderModel.validFrom,
          validTo: itemReqObj.itemHeaderModel.validTo,
          estimatedTime: itemReqObj.itemHeaderModel.estimatedTime,
          servicePrice: itemReqObj.itemHeaderModel.servicePrice,
          status: itemReqObj.itemHeaderModel.status,
          componentCode: componentData.componentCode,
          componentDescription: componentData.description,
          serialNumber: itemReqObj.itemHeaderModel.serialNumber,
          itemHeaderStrategy: itemReqObj.itemHeaderModel.itemHeaderStrategy,
          variant: itemReqObj.itemHeaderModel.variant,
          itemHeaderCustomerSegment: itemReqObj.itemHeaderModel.itemHeaderCustomerSegment,
          jobCode: itemReqObj.itemHeaderModel.jobCode,
          preparedBy: itemReqObj.itemHeaderModel.preparedBy,
          approvedBy: itemReqObj.itemHeaderModel.approvedBy,
          preparedOn: itemReqObj.itemHeaderModel.preparedOn,
          revisedBy: itemReqObj.itemHeaderModel.revisedBy,
          revisedOn: itemReqObj.itemHeaderModel.revisedOn,
          salesOffice: itemReqObj.itemHeaderModel.salesOffice,
          offerValidity: itemReqObj.itemHeaderModel.offerValidity,
        },
        itemBodyModel: {
          avgUsage: 0,
          frequency: itemReqObj.itemBodyModel.frequency,
          itemBodyDescription: itemReqObj.itemBodyModel.itemBodyDescription,
          itemBodyId: parseInt(itemReqObj.itemBodyModel.itemBodyId),
          itemPrices: itemReqObj.itemBodyModel.itemPrices,
          labours: itemReqObj.itemBodyModel.labours,
          miscellaneous: itemReqObj.itemBodyModel.miscellaneous,
          recommendedValue: itemReqObj.itemBodyModel.recommendedValue,
          solutionCode: itemReqObj.itemBodyModel.solutionCode,
          spareParts: itemReqObj.itemBodyModel.spareParts,
          taskType: itemReqObj.itemBodyModel.taskType,
          unit: itemReqObj.itemBodyModel.unit,
          usage: itemReqObj.itemBodyModel.usage,
          usageIn: itemReqObj.itemBodyModel.usageIn,
          year: itemReqObj.itemBodyModel.year,
        },
      };

      console.log("Adminstartuve res : ", UpdateItemreqObj);
      if (Object.keys(reqObj).length === 0) {
        toast("😐" + " Please Create an Item first", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("reqObj : ", reqObj)

        const res2 = await portfolioItemPriceSjid(reqObj)

        const updateItem = await updateItemData(currentItemId, UpdateItemreqObj);
        const res = await getItemPriceData(itemPriceData.itemPriceDataId)

        const resPrice = await getItemPriceData(itemPriceData.itemPriceDataId)
        setPriceCalculator({
          ...priceCalculator,
          priceAdditionalSelect: {
            label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
          },
          year: {
            label: resPrice.data.year, value: resPrice.data.year
          },
          noOfYear: resPrice.data.noOfYear,
          startUsage: resPrice.data.startUsage,
          endUsage: resPrice.data.endUsage,
          recommendedValue: resPrice.data.recommendedValue,
          netPrice: resPrice.data.netService,
          totalPrice: resPrice.data.totalPrice,
          id: resPrice.data.itemPriceDataId,
        })


        // const itemPriceRes = await getItemPrice(reqObj)
        setItemPriceCalculator({
          netParts: res.data.sparePartsPrice,
          netService: res.data.netService,
          priceType: res.data.priceType,
          netPrice: res.data.totalPrice,
          netAdditionals: res.data.listPrice,
        })
        setTabs("5")
      }
      // const res2 = await customPortfolioItemPriceSJID(reqObj)
      // const res = await getcustomItemPriceById(itemPriceData.customItemPriceDataId)
      // const itemPriceRes = await getItemPrice(reqObj)
      // console.log("updateItem ------ : ", updateItem);
      // setItemPriceCalculator({
      //   netParts: "11",
      //   netService: "11",
      //   priceType: "11",
      //   netPrice: itemPriceRes.itemHeaderModel.netPrice,
      //   netAdditionals: "11",
      // })



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

  const handleComponentCodeSuggetionsClick = (e, j) => {
    $(`.scrollbar`).css("display", "none");
    let { description, componentCode } = componentData.codeSuggestions[j]
    setComponentData({ ...componentData, description, componentCode })
  }
  const handleComponentMakeSuggetionsClick = (e, j) => {
    $(`#scrollbarMake`).css("display", "none");
    let { make } = componentData.makeSuggestions[j]
    setComponentData({ ...componentData, make: make })
  }
  const handleComponentModelSuggetionsClick = (e, j) => {
    $(`#scrollbarModel`).css("display", "none");
    let { model } = componentData.modelSuggestions[j]
    setComponentData({ ...componentData, model })
  }
  const handleComponentSerialNoSuggetionsClick = (e, j) => {
    $(`#scrolbarSerialNo`).css("display", "none");
    let obj = componentData.serialNoSuggestions[j]
    if ((obj.make !== componentData.make && componentData.make !== "") || (componentData.model !== obj.model && componentData.model !== "")) {
      if (window.confirm("Make/Model did not matched with selected serial number.\nDo you want to reset them?")) {
        setComponentData({ ...componentData, serialNo: obj.family, model: obj.model, make: obj.make })
      } else {
        return
      }
    } else {
      setComponentData({ ...componentData, serialNo: obj.family })
      throw "Please fill make/model"
    }

  }


  const handleItemPriceCalculatorChange = (e) => {
    setItemPriceCalculator({ ...itemPriceCalculator, [e.target.name]: e.target.value })
  }

  const handleItemPriceCalculatorSave = async () => {
    setLoadingItem("02")
    setTabs("6")
    // console.log("tempBundleService2 9999999 ", tempBundleService2)


    const updateItemPrice = {
      itemPriceDataId: priceCalculator.id,
      quantity: 0,
      standardJobId: addPortFolioItem.templateId,
      repairKitId: addPortFolioItem.repairOption,
      templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
      repairOption: "",
      additional: "",
      partListId: "",
      serviceEstimateId: "",
      numberOfEvents: 0,
      priceMethod: priceCalculator.priceMethod?.value,
      priceType: priceCalculator.priceType?.value,
      listPrice: 0,
      priceEscalation: "",
      calculatedPrice: 0,
      flatPrice: 0,
      year: priceCalculator?.year?.value,
      noOfYear: priceCalculator?.noOfYear,
      sparePartsPrice: 0,
      sparePartsPriceBreakDownPercentage: 0,
      servicePrice: 0,
      labourPrice: 0,
      labourPriceBreakDownPercentage: 0,
      miscPrice: 0,
      miscPriceBreakDownPercentage: 0,
      totalPrice: 0,
      netService: 0,
      additionalPriceType: priceCalculator?.priceAdditionalSelect?.value,
      additionalPriceValue: priceCalculator?.priceAdditionalInput,
      discountType: priceCalculator?.discountTypeSelect?.value,
      discountValue: priceCalculator?.discountTypeInput,
      recommendedValue: priceCalculator?.recommendedValue,
      startUsage: priceCalculator?.startUsage,
      endUsage: priceCalculator?.endUsage,
      sparePartsEscalation: 0,
      labourEscalation: 0,
      miscEscalation: 0,
      serviceEscalation: 0,
      withBundleService: true,
      portfolio: {
        portfolioId: ((portfolioId == 0 || portfolioId == null || portfolioId == undefined) ? 1 : portfolioId)
      },
      tenantId: 0,
      partsRequired: true,
      labourRequired: true,
      serviceRequired: false,
      miscRequired: true,
      inclusionExclusion: true
    }


    const updatePriceId = await updateItemPriceData(
      priceCalculator.id,
      updateItemPrice
    );



    const _tempBundleItems = [...tempBundleItems]
    for (let i = 0; i < _tempBundleItems.length; i++) {
      if (currentItemId === _tempBundleItems[i].itemId) {
        if (_tempBundleItems[i].associatedServiceOrBundle) {
          for (let j = 0; j < _tempBundleItems[i].associatedServiceOrBundle.length; j++) {
            console.log("tempBundleService2", tempBundleService2)
            for (let k = 0; k < tempBundleService2.length; k++) {
              if (_tempBundleItems[i].associatedServiceOrBundle[j].itemId == tempBundleService2[k].itemId) {
                tempBundleService2.splice(k, 1)//remove object if already exist
                break;
              }
            }
          }
          _tempBundleItems[i].associatedServiceOrBundle = [..._tempBundleItems[i].associatedServiceOrBundle, ...tempBundleService2]
        } else {
          _tempBundleItems[i] = { ..._tempBundleItems[i], associatedServiceOrBundle: [...tempBundleService2] }
        }
      }
      setTempBundleItems(_tempBundleItems)
      setLoadingItem("22")
    }
  }

  // function for Click on selected Bundle or Service
  const handleContinueOfAddedServiceOrBundle = async () => {

    try {

      if ((portfolioId == "") ||
        (portfolioId == undefined)) {
        setItemModelShow(false)
        throw "Please Create Portfolio First, then you can Add Items";
      }

      if (categoryUsageKeyValue1.value === "REPAIR_OR_REPLACE") {
        setTabs("4")//navigate to component data tab
      }

      let reqObj = {};

      for (let i = 0; i < tempBundleItems.length; i++) {
        if (tempBundleItems[i].itemId === currentItemId) {
          reqObj = {
            itemId: tempBundleItems[i].itemId,
            standardJobId: itemPriceData.standardJobId,
            repairKitId: itemPriceData.repairKitId,
            itemPriceDataId: itemPriceData.itemPriceDataId
          }
          break;
        }
      }

      if (Object.keys(reqObj).length === 0) {
        throw "Please Create an Item first, then you can add Bundle/Service";
      }

      const res2 = await portfolioItemPriceSjid(reqObj)

      const res = await getItemPriceData(itemPriceData.itemPriceDataId)
      const resPrice = await getItemPriceData(itemPriceData.itemPriceDataId)
      setPriceCalculator({
        ...priceCalculator,
        priceAdditionalSelect: {
          label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
        },
        year: {
          label: resPrice.data.year, value: resPrice.data.year
        },
        noOfYear: resPrice.data.noOfYear,
        startUsage: resPrice.data.startUsage,
        endUsage: resPrice.data.endUsage,
        recommendedValue: resPrice.data.recommendedValue,
        netPrice: resPrice.data.netService,
        totalPrice: resPrice.data.totalPrice,
        id: resPrice.data.itemPriceDataId,
      })

      var UpdatedBundleService3Data = [];
      for (let a = 0; a < tempBundleService3.length; a++) {
        var reqObjUpdatebundleService = {
          itemId: tempBundleService3[a].itemId,
          itemName: tempBundleService3[a].itemName,
          itemHeaderModel: {
            itemHeaderId: tempBundleService3[a].itemHeaderModel.itemHeaderId,
            itemHeaderDescription: tempBundleService3[a].itemHeaderModel.itemHeaderDescription,
            bundleFlag: tempBundleService3[a].itemHeaderModel.bundleFlag,
            portfolioItemId: currentItemId,
            reference: tempBundleService3[a].itemHeaderModel.reference,
            itemHeaderMake: tempBundleService3[a].itemHeaderModel.itemHeaderMake,
            itemHeaderFamily: tempBundleService3[a].itemHeaderModel.itemHeaderFamily,
            model: tempBundleService3[a].itemHeaderModel.model,
            prefix: tempBundleService3[a].itemHeaderModel.prefix,
            type: tempBundleService3[a].itemHeaderModel.type,
            additional: tempBundleService3[a].itemHeaderModel.additional,
            currency: tempBundleService3[a].itemHeaderModel.currency,
            netPrice: tempBundleService3[a].itemHeaderModel.netPrice,
            itemProductHierarchy: tempBundleService3[a].itemHeaderModel.itemProductHierarchy,
            itemHeaderGeographic: tempBundleService3[a].itemHeaderModel.itemHeaderGeographic,
            responseTime: tempBundleService3[a].itemHeaderModel.responseTime,
            usage: tempBundleService3[a].itemHeaderModel.usage,
            validFrom: tempBundleService3[a].itemHeaderModel.validFrom,
            validTo: tempBundleService3[a].itemHeaderModel.validTo,
            estimatedTime: tempBundleService3[a].itemHeaderModel.estimatedTime,
            servicePrice: tempBundleService3[a].itemHeaderModel.servicePrice,
            status: tempBundleService3[a].itemHeaderModel.status,
            itemHeaderStrategy: tempBundleService3[a].itemHeaderModel.itemHeaderStrategy,
            componentCode: tempBundleService3[a].itemHeaderModel.componentCode,
            componentDescription: tempBundleService3[a].itemHeaderModel.componentDescription,
            serialNumber: tempBundleService3[a].itemHeaderModel.serialNumber,
            variant: tempBundleService3[a].itemHeaderModel.variant,
            itemHeaderCustomerSegment: tempBundleService3[a].itemHeaderModel.itemHeaderCustomerSegment,
            jobCode: tempBundleService3[a].itemHeaderModel.jobCode,
            preparedBy: tempBundleService3[a].itemHeaderModel.preparedBy,
            approvedBy: tempBundleService3[a].itemHeaderModel.approvedBy,
            preparedOn: tempBundleService3[a].itemHeaderModel.preparedOn,
            revisedBy: tempBundleService3[a].itemHeaderModel.revisedBy,
            revisedOn: tempBundleService3[a].itemHeaderModel.revisedOn,
            salesOffice: tempBundleService3[a].itemHeaderModel.salesOffice,
            offerValidity: tempBundleService3[a].itemHeaderModel.offerValidity
          },
          itemBodyModel: {
            itemBodyId: tempBundleService3[a].itemBodyModel.itemBodyId,
            itemBodyDescription: tempBundleService3[a].itemBodyModel.itemBodyDescription,
            frequency: tempBundleService3[a].itemBodyModel.frequency,
            spareParts: tempBundleService3[a].itemBodyModel.spareParts,
            labours: tempBundleService3[a].itemBodyModel.labours,
            miscellaneous: tempBundleService3[a].itemBodyModel.miscellaneous,
            taskType: tempBundleService3[a].itemBodyModel.taskType,
            solutionCode: tempBundleService3[a].itemBodyModel.solutionCode,
            usageIn: tempBundleService3[a].itemBodyModel.usageIn,
            recommendedValue: tempBundleService3[a].itemBodyModel.recommendedValue,
            usage: tempBundleService3[a].itemBodyModel.usage,
            year: tempBundleService3[a].itemBodyModel.year,
            avgUsage: tempBundleService3[a].itemBodyModel.avgUsage,
            unit: tempBundleService3[a].itemBodyModel.unit,
            itemPrices: tempBundleService3[a].itemBodyModel.itemPrices,
          }
        };

        updateItemData(tempBundleService3[a].itemId, reqObjUpdatebundleService)
          .then((res) => {
            UpdatedBundleService3Data.push(res.data)
          })
          .catch((err) => {
            console.log("err in api call", err);
          });
      }

      setTempBundleService3(UpdatedBundleService3Data);
      setTempBundleService2(UpdatedBundleService3Data);

      setPriceCalculator({
        ...priceCalculator,
        priceAdditionalSelect: {
          label: res.data.additionalPriceType, value: res.data.additionalPriceType
        },
        year: {
          label: res.data.year, value: res.data.year
        },
        noOfYear: res.data.noOfYear,
        startUsage: res.data.startUsage,
        endUsage: res.data.endUsage,
        recommendedValue: res.data.recommendedValue,
        netPrice: res.data.netService,
        totalPrice: res.data.totalPrice,
        id: res.data.itemPriceDataId,
      })

      setItemPriceCalculator({
        netParts: res.data.sparePartsPrice,
        netService: res.data.netService,
        priceType: res.data.priceType,
        netPrice: res.data.totalPrice,
        netAdditionals: res.data.listPrice,
      })
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
      return;
    }
  }

  const handleContinueOfServiceOrBundle = async () => {
    // setTempBundleService3([])
    if (categoryUsageKeyValue1.value === "REPAIR_OR_REPLACE") {
      setTabs("4")//navigate to component data tab
    } else {
      // let find that id and get reqData for API
      let reqObj = {}

      console.log("tempBundleItems data 12345 : ", tempBundleService3);
      console.log("tempBundleItems : ", tempBundleItems);
      for (let i = 0; i < tempBundleItems.length; i++) {
        if (tempBundleItems[i].itemId === currentItemId) {
          // reqObj = {
          //   itemId: tempBundleItems[i].itemId,
          //   standardJobId: tempBundleItems[i].itemBodyModel.standardJobId,
          //   repairKitId: tempBundleItems[i].itemBodyModel.repairKitId,
          // }
          reqObj = {
            itemId: tempBundleItems[i].itemId,
            standardJobId: itemPriceData.standardJobId,
            repairKitId: itemPriceData.repairKitId,

            itemPriceDataId: itemPriceData.itemPriceDataId
          }
          console.log("my reqObj : ", reqObj)
          break;
        }
      }
      if (Object.keys(reqObj).length === 0) {
        toast("😐" + " Please Create an Item first", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.log("reqObj : ", reqObj)

        const res2 = await portfolioItemPriceSjid(reqObj)

        const res = await getItemPriceData(itemPriceData.itemPriceDataId)
        const resPrice = await getItemPriceData(itemPriceData.itemPriceDataId)
        setPriceCalculator({
          ...priceCalculator,
          priceAdditionalSelect: {
            label: resPrice.data.additionalPriceType, value: resPrice.data.additionalPriceType
          },
          year: {
            label: resPrice.data.year, value: resPrice.data.year
          },
          noOfYear: resPrice.data.noOfYear,
          startUsage: resPrice.data.startUsage,
          endUsage: resPrice.data.endUsage,
          recommendedValue: resPrice.data.recommendedValue,
          netPrice: resPrice.data.netService,
          totalPrice: resPrice.data.totalPrice,
          id: resPrice.data.itemPriceDataId,
        })

        var UpdatedBundleService3Data = [];
        for (let a = 0; a < tempBundleService3.length; a++) {
          var reqObjUpdatebundleService = {
            itemId: tempBundleService3[a].itemId,
            itemName: tempBundleService3[a].itemName,
            itemHeaderModel: {
              itemHeaderId: tempBundleService3[a].itemHeaderModel.itemHeaderId,
              itemHeaderDescription: tempBundleService3[a].itemHeaderModel.itemHeaderDescription,
              bundleFlag: tempBundleService3[a].itemHeaderModel.bundleFlag,
              portfolioItemId: currentItemId,
              reference: tempBundleService3[a].itemHeaderModel.reference,
              itemHeaderMake: tempBundleService3[a].itemHeaderModel.itemHeaderMake,
              itemHeaderFamily: tempBundleService3[a].itemHeaderModel.itemHeaderFamily,
              model: tempBundleService3[a].itemHeaderModel.model,
              prefix: tempBundleService3[a].itemHeaderModel.prefix,
              type: tempBundleService3[a].itemHeaderModel.type,
              additional: tempBundleService3[a].itemHeaderModel.additional,
              currency: tempBundleService3[a].itemHeaderModel.currency,
              netPrice: tempBundleService3[a].itemHeaderModel.netPrice,
              itemProductHierarchy: tempBundleService3[a].itemHeaderModel.itemProductHierarchy,
              itemHeaderGeographic: tempBundleService3[a].itemHeaderModel.itemHeaderGeographic,
              responseTime: tempBundleService3[a].itemHeaderModel.responseTime,
              usage: tempBundleService3[a].itemHeaderModel.usage,
              validFrom: tempBundleService3[a].itemHeaderModel.validFrom,
              validTo: tempBundleService3[a].itemHeaderModel.validTo,
              estimatedTime: tempBundleService3[a].itemHeaderModel.estimatedTime,
              servicePrice: tempBundleService3[a].itemHeaderModel.servicePrice,
              status: tempBundleService3[a].itemHeaderModel.status,
              itemHeaderStrategy: tempBundleService3[a].itemHeaderModel.itemHeaderStrategy,
              componentCode: tempBundleService3[a].itemHeaderModel.componentCode,
              componentDescription: tempBundleService3[a].itemHeaderModel.componentDescription,
              serialNumber: tempBundleService3[a].itemHeaderModel.serialNumber,
              variant: tempBundleService3[a].itemHeaderModel.variant,
              itemHeaderCustomerSegment: tempBundleService3[a].itemHeaderModel.itemHeaderCustomerSegment,
              jobCode: tempBundleService3[a].itemHeaderModel.jobCode,
              preparedBy: tempBundleService3[a].itemHeaderModel.preparedBy,
              approvedBy: tempBundleService3[a].itemHeaderModel.approvedBy,
              preparedOn: tempBundleService3[a].itemHeaderModel.preparedOn,
              revisedBy: tempBundleService3[a].itemHeaderModel.revisedBy,
              revisedOn: tempBundleService3[a].itemHeaderModel.revisedOn,
              salesOffice: tempBundleService3[a].itemHeaderModel.salesOffice,
              offerValidity: tempBundleService3[a].itemHeaderModel.offerValidity
            },
            itemBodyModel: {
              itemBodyId: tempBundleService3[a].itemBodyModel.itemBodyId,
              itemBodyDescription: tempBundleService3[a].itemBodyModel.itemBodyDescription,
              frequency: tempBundleService3[a].itemBodyModel.frequency,
              spareParts: tempBundleService3[a].itemBodyModel.spareParts,
              labours: tempBundleService3[a].itemBodyModel.labours,
              miscellaneous: tempBundleService3[a].itemBodyModel.miscellaneous,
              taskType: tempBundleService3[a].itemBodyModel.taskType,
              solutionCode: tempBundleService3[a].itemBodyModel.solutionCode,
              usageIn: tempBundleService3[a].itemBodyModel.usageIn,
              recommendedValue: tempBundleService3[a].itemBodyModel.recommendedValue,
              usage: tempBundleService3[a].itemBodyModel.usage,
              year: tempBundleService3[a].itemBodyModel.year,
              avgUsage: tempBundleService3[a].itemBodyModel.avgUsage,
              unit: tempBundleService3[a].itemBodyModel.unit,
              itemPrices: tempBundleService3[a].itemBodyModel.itemPrices,
            }
          };

          console.log("reqObjUpdatebundleService : ", reqObjUpdatebundleService)

          updateItemData(tempBundleService3[a].itemId, reqObjUpdatebundleService)
            .then((res) => {
              // console.log("response are : ", res)
              UpdatedBundleService3Data.push(res.data)
            })
            .catch((err) => {
              console.log("err in api call", err);
            });
        }

        setTempBundleService3(UpdatedBundleService3Data);
        setTempBundleService2(UpdatedBundleService3Data);

        // const itemPriceRes = await getItemPrice(reqObj)
        setItemPriceCalculator({
          netParts: res.data.sparePartsPrice,
          netService: res.data.netService,
          priceType: res.data.priceType,
          netPrice: res.data.totalPrice,
          netAdditionals: res.data.listPrice,
        })
        setTabs("5")
      }


      // call put  rkid API to get price and populate it in tab 5
      // const itemPriceRes = await getItemPrice({
      //   standardJobId: itemRes.data.itemBodyModel.standardJobId,
      //   repairKitId: itemRes.data.itemBodyModel.repairKitId,
      //   itemId: itemRes.data.itemId,
      // });
      // const {priceMethod,listPrice,priceEscalation,additional,calculatedPrice,flatPrice,discountType,year,totalPrice,usage,avgUsage,frequency,} = itemPriceRes.itemBodyModel;
      // setPriceCalculator({
      //   ...priceCalculator,
      //   priceMethod: { label: priceMethod, value: priceMethod },
      //   listPrice,
      //   priceEscalationInput: priceEscalation,
      //   priceAdditionalInput: additional,
      //   calculatedPrice,
      //   flatPrice,
      //   discountTypeInput: discountType,
      //   priceYear: { label: year, value: year },
      //   totalPrice,
      //   frequency: { label: frequency, value: frequency },
      //   usageType: { label: usage, value: usage },
      //   startUsage: avgUsage,
      //   endUsage: avgUsage,
      // });





    }
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

  return (
    <PortfolioContext.Provider
      value={{
        generalComponentData,
        categoryUsageKeyValue1,
        stratgyTaskTypeKeyValue,
      }}
    >
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
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
                  <Menu className="convert-top-left"
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
                    {/* <MenuItem className="custommenu">Templates</MenuItem>
                    <MenuItem className="custommenu">Standard Job</MenuItem>
                    <MenuItem className="custommenu">Kit</MenuItem> */}
                    <MenuItem
                      className="custommenu"
                      onClick={() => setConvertToPopup(true)}
                    // data-toggle="modal"
                    // data-target="#quotecreat"
                    >
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
                    // data-toggle="modal" data-target="#versionpopup"
                    onClick={() => setVersionPopup(true)}
                  >
                    New Versions
                  </Dropdown.Item>
                  <Dropdown.Item as="button" data-toggle="modal" data-target="#myModal2">Show Errors</Dropdown.Item>
                  <Dropdown.Item as="button">Review</Dropdown.Item>
                </DropdownButton>

              </div>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3" style={{ whiteSpace: "pre" }}>
                  {portfolioId ? "Portfolio Details" : "New Portfolio*"}
                </span>
                <a href={undefined} className="btn-sm" style={{ cursor: "pointer" }}>
                  <i className="fa fa-pencil" aria-hidden="true" onClick={makeHeaderEditable}></i>
                  {/* <i className="fa fa-pencil" aria-hidden="true" onClick={() => value2.value == "ACTIVE" ? handleSnack("info", "Builder is active!") : makeHeaderEditable() }></i> */}
                </a>
                <a href="#" className="btn-sm">
                  <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                </a>
                <a href="#" className="btn-sm">
                  <img style={{ width: "14px" }} src={folderaddIcon}></img>
                </a>
              </div>
              {/* <div className="input-group icons border-radius-10 border">
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
              </div> */}
            </h5>
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              {headerLoading ? (
                <LoadingProgress />
              ) : (
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList className="custom-tabs-div"
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="General" value={"general"} />
                      <Tab label="Validity " value={"validity"} />
                      <Tab label="Strategy" value={"strategy"} />

                      <Tab
                        label="Price"
                        disabled={priceAgreementOption}
                        value={"price"} />
                      <Tab
                        label="Price Agreement"
                        disabled={!priceAgreementOption}
                        value={"priceAgreement"}
                      />
                      <Tab label="Coverage" value={"coverage"} />
                      <Tab label="Administrative" value={"administrative"} />
                    </TabList>
                  </Box>
                  <TabPanel value={"general"}>

                    {!viewOnlyTab.generalViewOnly ? <>
                      <div className="row mt-4 input-fields">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SELECT TYPE
                            </label>
                            <Select
                              placeholder="Select"
                              className="text-primary"
                              options={headerTypeKeyValue}
                              value={headerType}
                              onChange={handleHeaderTypeChange}
                              isLoading={
                                headerTypeKeyValue.length > 0 ? false : true
                              }
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
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
                        {/* <div className="col-md-3 col-sm-3">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            {prefilgabelGeneral} ID
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10"
                            placeholder="(Auto-generated)"
                           disabled={true}
                          />
                        </div>
                      </div> */}


                      </div>
                      <div className="row input-fields">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              {prefilgabelGeneral} NAME
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="name"
                              placeholder="Name"
                              value={generalComponentData.name}
                              onChange={handleGeneralInputChange}
                              disabled={nameIsNotEditAble}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              {/* SERVICE {prefilgabelGeneral} DESCRIPTION (IF ANY) */}
                              {prefilgabelGeneral} DESCRIPTION (IF ANY)
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="description"
                              placeholder="Optional"
                              value={generalComponentData.description}
                              onChange={handleGeneralInputChange}
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
                              value={generalComponentData.externalReference}
                              onChange={handleGeneralInputChange}
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
                              onChange={handleCustomerSegmentChange}
                              className="text-primary"
                              value={generalComponentData.customerSegment}
                              options={customerSegmentKeyValue}
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
                    </> : <>
                      <div className="row mt-4">
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              PORTFOLIO NAME
                            </p>
                            <h6 className="font-weight-500 text-primary font-size-17">
                              {generalComponentData.name == "" || generalComponentData.name == null ? "NA" : generalComponentData.name}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              PORTFOLIO DESCRIPTION
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {generalComponentData.description == "" || generalComponentData.description == null ? "NA" : generalComponentData.description}
                            </h6>
                          </div>
                        </div>
                        {/* <div className="col-md-4 col-sm-3">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                             PROGRAM DESCRIPTION (IF ANY)
                          </p>
                          <h6 className="font-weight-500">NA</h6>
                        </div>
                      </div> */}
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              REFERENCE
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {generalComponentData.externalReference == "" ||
                                generalComponentData.externalReference == null ||
                                generalComponentData.externalReference == "string"
                                ? "NA" : generalComponentData.externalReference}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CUSTOMER SEGMENT
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {generalComponentData?.customerSegment == "" ||
                                generalComponentData?.customerSegment == null ||
                                generalComponentData?.customerSegment == undefined ||
                                generalComponentData?.customerSegment?.label == "string"
                                ? "NA" : generalComponentData?.customerSegment?.label}
                              {/* {generalComponentData?.customerSegment?.label} */}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </>}

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
                                    className={`form-controldate text-primary border-radius-10 ${viewOnlyTab.validityViewOnly ? "dateNotEditable" : ""}`}
                                    label=""
                                    value={validityData.fromDate}
                                    onChange={(e) =>
                                      setValidityData({
                                        ...validityData,
                                        fromDate: e,
                                        inputFlag: false,
                                      })
                                    }
                                    readOnly={viewOnlyTab.validityViewOnly}
                                  />
                                </MuiPickersUtilsProvider>
                                {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
                              </div>
                              <label
                                className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                                htmlFor="exampleInputEmail1"
                              >
                                TO
                              </label>
                              <div className="form-group w-100">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    variant="inline"
                                    className={`form-controldate text-primary border-radius-10 ${viewOnlyTab.validityViewOnly ? "dateNotEditable" : ""}`}
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
                                    readOnly={viewOnlyTab.validityViewOnly}
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
                                      value={validityData.from}
                                      onChange={(e) =>
                                        setValidityData({
                                          ...validityData,
                                          from: e,
                                        })
                                      }
                                      options={validityKeyValue}
                                      placeholder="Select "
                                      isDisabled={viewOnlyTab.validityViewOnly}
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
                                            dateFlag: false,
                                          })
                                        }
                                        disabled={viewOnlyTab.validityViewOnly}
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
                                    // isDisabled={viewOnlyTab.validityViewOnly}
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
                                            dateFlag: false,
                                            inputFlag: true,
                                          })
                                        }
                                        disabled={viewOnlyTab.validityViewOnly}
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
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100">
                                                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">HR</label>
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
                    {/* <div className="row mt-4">
                                        <div className="col-md-6 col-sm-6">

                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">DATE</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">FROM</small>31st October 2021</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">TO</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">30st October 2022</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">HOURS</small>10,000 hours</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" htmlFor="exampleInputEmail1">HR</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">15,000 hours</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                    {!viewOnlyTab.validityViewOnly ? <>
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
                    </> : <></>}
                  </TabPanel>

                  <TabPanel value={"strategy"}>

                    {!viewOnlyTab.strategyViewOnly ? <>
                      <div className="row input-fields">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              htmlFor="exampleInputEmail1"
                            >
                              CATEGORY USAGE
                            </label>
                            <Select
                              options={categoryList}
                              className="text-primary"
                              value={categoryUsageKeyValue1}
                              onChange={(e) => HandleCatUsage(e)}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                            {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              htmlFor="exampleInputEmail1"
                            >
                              STRATEGY TASK
                            </label>
                            <Select
                              options={updatedList}
                              className="text-primary"
                              value={stratgyTaskUsageKeyValue}
                              onChange={(e) => HandleStrategyUsage(e)}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              htmlFor="exampleInputEmail1"
                            >
                              TASK TYPE
                            </label>
                            <Select
                              options={updatedTaskList}
                              className="text-primary"
                              value={stratgyTaskTypeKeyValue}
                              placeholder="Optional"
                              onChange={(e) => {
                                setStratgyTaskTypeKeyValue(e);
                                addPortFolioItem.taskType = "";
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          {/* <a className="input-search"><SearchIcon style={{ fontSize: "34px" }} /></a> */}
                              <label
                                className="text-light-dark font-size-12 font-weight-500"
                                htmlFor="exampleInputEmail1"
                              >
                                OPTIONALS
                              </label>
                              <input
                                // type="text"
                                className="cursor form-control border-radius-10 text-primary"
                                // id="exampleInputEmail1"
                                onClick={PopupOptionalShow}
                                placeholder="Click here"
                                // value={stratgyOptionalsKeyValue}
                              />
                            </div>
                          {/* <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                            >
                              OPTIONALS
                            </label>
                            <Select
                              placeholder="Optional"
                              options={strategyOptionals}
                              className="text-primary"
                              value={stratgyOptionalsKeyValue}
                              onClick={PopupOptionalShow}
                              onChange={(e) => setStratgyOptionalsKeyValue(e)}
                          
                            />
                          </div> */}
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              htmlFor="exampleInputEmail1"
                            >
                              RESPONSE TIME
                            </label>
                            <Select
                              placeholder="Optional"
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
                              htmlFor="exampleInputEmail1"
                            >
                              PRODUCT HIERARCHY
                            </label>
                            <Select
                              placeholder="Optional"
                              options={productList}
                              className="text-primary"
                              value={stratgyHierarchyKeyValue}
                              onChange={(e) => setStratgyHierarchyKeyValue(e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              htmlFor="exampleInputEmail1"
                            >
                              GEOGRAPHIC
                            </label>
                            <Select
                              placeholder="Optional"
                              options={geographicList}
                              className="text-primary"
                              value={stratgyGeographicKeyValue}
                              onChange={(e) => setStratgyGeographicKeyValue(e)}
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
                              {categoryUsageKeyValue1.length == 0 ||
                                categoryUsageKeyValue1.value == "" ||
                                categoryUsageKeyValue1.value == "string" ||
                                categoryUsageKeyValue1.value == null ||
                                categoryUsageKeyValue1.value == undefined
                                ? "NA" : categoryUsageKeyValue1.value}
                              {/* {categoryUsageKeyValue1.value} */}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              STRATEGY TASK
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {stratgyTaskUsageKeyValue.length == 0 ||
                                stratgyTaskUsageKeyValue.value == "" ||
                                stratgyTaskUsageKeyValue.value == "string" ||
                                stratgyTaskUsageKeyValue.value == null ||
                                stratgyTaskUsageKeyValue.value == undefined ?
                                "NA" : stratgyTaskUsageKeyValue.value}
                              {/* {stratgyTaskUsageKeyValue.value} */}
                            </h6>
                          </div>
                        </div>

                        {/* <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            OPTIONALS
                          </p>
                          <h6 className="font-weight-500">Misc</h6>
                        </div>
                      </div> */}
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              TASK TYPE
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {stratgyTaskTypeKeyValue.length == 0 ||
                                stratgyTaskTypeKeyValue.value == "" ||
                                stratgyTaskTypeKeyValue.value == "string" ||
                                stratgyTaskTypeKeyValue.value == null ||
                                stratgyTaskTypeKeyValue.value == undefined
                                ? "NA" : stratgyTaskTypeKeyValue.value}
                              {/* {stratgyTaskTypeKeyValue.value} */}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              RESPONSE TIME
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {stratgyResponseTimeKeyValue.length == 0 ||
                                stratgyResponseTimeKeyValue.value == null ||
                                stratgyResponseTimeKeyValue.value == "" ||
                                stratgyResponseTimeKeyValue.value == "string" ||
                                stratgyResponseTimeKeyValue.value == undefined
                                ? "NA" : stratgyResponseTimeKeyValue.value}
                              {/* {stratgyResponseTimeKeyValue.value} */}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              PRODUCT HIERARCHY
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {stratgyHierarchyKeyValue.length == 0 ||
                                stratgyHierarchyKeyValue.value == "" ||
                                stratgyHierarchyKeyValue.value == "string" ||
                                stratgyHierarchyKeyValue.value == null ||
                                stratgyHierarchyKeyValue.value == undefined
                                ? "NA" : stratgyHierarchyKeyValue.value}
                              {/* {stratgyHierarchyKeyValue.value} */}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              GEOGRAPHIC
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {stratgyGeographicKeyValue.length == 0 ||
                                stratgyGeographicKeyValue.value == "" ||
                                stratgyGeographicKeyValue.value == "string" ||
                                stratgyGeographicKeyValue.value == null ||
                                stratgyGeographicKeyValue.value == undefined
                                ? "NA" : stratgyGeographicKeyValue.value}
                              {/* {stratgyGeographicKeyValue.value} */}
                            </h6>
                          </div>

                        </div>
                      </div>
                    </>}

                    {/* {isView ? (
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
                  )} */}


                  </TabPanel>

                  <TabPanel value={"price"}>

                    {!viewOnlyTab.priceViewOnly ?
                      <>

                        <div className="row input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label
                                className="text-light-dark font-size-14 font-weight-500"
                                htmlFor="exampleInputEmail1"
                              >
                                PRICE LIST
                              </label>
                              <Select
                                // defaultValue={priceListKeyValue}
                                onChange={(e) => setPriceListKeyValue1(e)}
                                className="text-primary"
                                options={priceListKeyValue}
                                placeholder="placeholder (Optional)"

                                value={priceListKeyValue1}

                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label
                                className="text-light-dark font-size-14 font-weight-500"
                                htmlFor="exampleInputEmail1"
                              >
                                PRICE METHOD
                              </label>
                              <Select
                                // defaultValue={selectedOption}
                                className="text-primary"
                                onChange={(e) => setPriceMethodKeyValue1(e)}
                                options={priceMethodKeyValue}
                                placeholder="required"

                                value={priceMethodKeyValue1}

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
                                htmlFor="exampleInputEmail1"
                              >
                                PRICE TYPE
                              </label>
                              <Select
                                // defaultValue={priceTypeKeyValue}
                                className="text-primary"
                                onChange={(e) => setPriceTypeKeyValue1(e)}
                                options={priceTypeKeyValue}
                                placeholder="placeholder (Optional)"
                                value={priceTypeKeyValue1}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label
                                className="text-light-dark font-size-14 font-weight-500"
                                htmlFor="exampleInputEmail1"
                              >
                                {/* PRICE{" "} */}
                                NET PRICE{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control text-primary border-radius-10"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Optional"
                                value={pricePriceData}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group date-box">
                              <label
                                className="text-light-dark font-size-12 font-weight-500"
                                htmlFor="exampleInputEmail1"
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
                                    onChange={(e) => setPriceAdditionalHeadKeyValue1(e)}
                                    className="text-primary"
                                    isClearable={true}
                                    // value={options}
                                    // options={priceHeadTypeKeyValue}
                                    options={additionalPriceHeadTypeKeyValue}
                                    placeholder="Select"
                                    value={priceAdditionalHeadKeyValue1}
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
                                htmlFor="exampleInputEmail1"
                              >
                                PRICE ESCALATON
                              </label>
                              <div className=" d-flex align-items-center form-control-date">
                                <Select
                                  className="select-input text-primary"
                                  // defaultValue={selectedOption}

                                  onChange={(e) => setPriceEscalationHeadKeyValue1(e)}
                                  options={priceHeadTypeKeyValue}
                                  placeholder="Select "
                                  value={priceEscalationHeadKeyValue1}

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

                        <hr />
                        <div className="row input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label
                                className="text-light-dark font-size-12 font-weight-500"
                                htmlFor="exampleInputEmail1"
                              >
                                CALCULATED PRICE
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="required"
                                disabled
                                value={priceCalculatedPrice}
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
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
                                  onChange={setSelectedOption}
                                  // options={options}
                                  options={priceHeadTypeKeyValue}
                                  placeholder="Select "
                                />
                                <input
                                  type="text"
                                  className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="optional"
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-md-4 col-sm-4">
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
                            onChange={setSelectedOption}
                            options={options}
                            placeholder="placeholder "
                          />
                          <input
                            type="text"
                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="optional"
                          />
                        </div>
                      </div>
                    </div> */}
                        </div>
                        <div className="row" style={{ justifyContent: "right" }}>
                          <button
                            type="button"
                            onClick={handleNextClick}
                            className="btn btn-light"
                            id="price"
                          >
                            {" "}
                            Save & Next
                          </button>
                        </div>

                      </> :
                      <>
                        <div className="row">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE LIST
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  priceListKeyValue1?.label == "" ||
                                    priceListKeyValue1?.label == "string" ||
                                    priceListKeyValue1?.label == undefined ||
                                    priceListKeyValue1?.label == null
                                    ? "NA" : priceListKeyValue1?.label)}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  priceMethodKeyValue1?.label == "" ||
                                    priceMethodKeyValue1?.label == "string" ||
                                    priceMethodKeyValue1?.label == undefined ||
                                    priceMethodKeyValue1?.label == null
                                    ? "NA" : priceMethodKeyValue1?.label)}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE DATE
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  priceDetails?.priceDate == "" ||
                                    priceDetails?.priceDate == "string" ||
                                    priceDetails?.priceDate == undefined ||
                                    priceDetails?.priceDate == null
                                    ? "NA"
                                    : getFormattedDateTimeByTimeStamp(priceDetails?.priceDate))}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE TYPE
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  priceTypeKeyValue1?.label == "" ||
                                    priceTypeKeyValue1?.label == "string" ||
                                    priceTypeKeyValue1?.label == undefined ||
                                    priceTypeKeyValue1?.label == null
                                    ? "NA" : priceTypeKeyValue1?.label)}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                {/* PRICE{" "} */}
                                NET PRICE{" "}
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  pricePriceData == "" ||
                                    pricePriceData == "string" ||
                                    pricePriceData == undefined ||
                                    pricePriceData == null
                                    ? "NA" : parseInt(pricePriceData))}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group date-box">
                              <p className="font-size-12 font-weight-500 mb-2">
                                ADDITIONAL
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  additionalPriceValue == "" ||
                                    additionalPriceValue == "string" ||
                                    additionalPriceValue == undefined ||
                                    additionalPriceValue == null
                                    ? "NA" : parseInt(additionalPriceValue))}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group date-box">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE ESCALATON
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(escalationPriceValue == "" ||
                                  escalationPriceValue == "string" ||
                                  escalationPriceValue == undefined ||
                                  escalationPriceValue == null
                                  ? "NA" : parseInt(escalationPriceValue))}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                CALCULATED PRICE
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(priceCalculatedPrice == "" ||
                                  priceCalculatedPrice == "string" ||
                                  priceCalculatedPrice == undefined ||
                                  priceCalculatedPrice == null
                                  ? "NA" : parseInt(priceCalculatedPrice)
                                )}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group date-box">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE BREAK DOWN
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {/* {(priceTypeKeyValue1?.label == "" ||
                              priceTypeKeyValue1?.label == "string" ||
                              priceTypeKeyValue1?.label == undefined ||
                              priceTypeKeyValue1?.label == null
                              ? "NA" : priceTypeKeyValue1?.label
                           )} */} NA
                              </h6>
                            </div>
                          </div>
                        </div>
                      </>
                    }


                  </TabPanel>

                  <TabPanel value={"priceAgreement"} className="customTabPanel">
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
                        onClick={() => setValue("coverage")}
                        className="btn btn-light"
                      >
                        Save & Next
                      </button>
                    </div>
                  </TabPanel>

                  <TabPanel value="coverage">
                    <ul class="submenu templateResultheading accordion" style={{ display: 'block' }}>
                      <li><a className="cursor result" >Search Coverage</a></li>
                    </ul>
                    <div
                      className="custom-table card p-3"
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
                          <Link to="#" onClick={() => setOpen3(true)} className="btn bg-primary text-white">
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
                            selectableRows
                            onSelectedRowsChange={(state) => setFilterMasterData(state.selectedRows)}
                            pagination
                          />
                          <div>
                            <div className="text-right">
                              <input
                                // onClick={() => {
                                //   setSelectedMasterData(filterMasterData);
                                //   setMasterData([]);
                                // }}
                                onClick={handleCoverageCheckBoxData}
                                className="btn bg-primary text-white"
                                value="+ Add Selected"
                                // disabled={!flagIs}
                                disabled={filterMasterData.length == 0}
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
                              type="text"
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
                            htmlFor="exampleInputEmail1"
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
                            htmlFor="exampleInputEmail1"
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
                                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">COVERAGE DATA</label>
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
                    {!viewOnlyTab.administrativeViewOnly ?
                      <>
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
                                placeholder="Optional (ex-abc@gmail.com)"
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
                      </> :
                      <>
                        <div className="row">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PREPARED BY
                                {/* {console.log("new dataa : ", coverageData.machineType)} */}
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.preparedBy == "" ||
                                    administrative.preparedBy == "string" ||
                                    administrative.preparedBy == undefined ||
                                    administrative.preparedBy == null
                                    ? "NA" : administrative.preparedBy
                                )}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                APPROVED BY
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.approvedBy == "" ||
                                    administrative.approvedBy == "string" ||
                                    administrative.approvedBy == undefined ||
                                    administrative.approvedBy == null
                                    ? "NA" : administrative.approvedBy
                                )}
                                {/* {Object.keys(stratgyTaskUsageKeyValue).length > 0 ? (stratgyTaskUsageKeyValue.label) : (location.selectedTemplateItems[0].strategyTask)} */}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PREPARED ON
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.preparedOn == "" ||
                                    administrative.preparedOn == "string" ||
                                    administrative.preparedOn == undefined ||
                                    administrative.preparedOn == null
                                    ? "NA" :
                                    getFormattedDateTimeByTimeStamp(administrative.preparedOn)
                                )}
                                {/* {Object.keys(stratgyTaskTypeKeyValue).length > 0 ? (stratgyTaskTypeKeyValue.label) : (location.selectedTemplateItems[0].taskType)} */}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                REVISED BY
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.revisedBy == "" ||
                                    administrative.revisedBy == "string" ||
                                    administrative.revisedBy == undefined ||
                                    administrative.revisedBy == null ?
                                    "NA" : administrative.revisedBy)}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                REVISED  ON
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.revisedOn == "" ||
                                    administrative.revisedOn == "string" ||
                                    administrative.revisedOn == undefined ||
                                    administrative.revisedOn == null
                                    ? "NA" :
                                    getFormattedDateTimeByTimeStamp(administrative.revisedOn)
                                )}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                SALES OFFICE / BRANCH
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.salesOffice == "" ||
                                    administrative.salesOffice == "string" ||
                                    administrative.salesOffice == undefined ||
                                    administrative.salesOffice == null
                                    ? "NA" : administrative.salesOffice?.value)}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                OFFER VALIDITY
                              </p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                {(
                                  administrative.offerValidity == "" ||
                                    administrative.offerValidity == "string" ||
                                    administrative.offerValidity == undefined ||
                                    administrative.offerValidity == null
                                    ? "NA" : administrative.offerValidity?.label)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </>}


                  </TabPanel>
                </TabContext>
              )}
            </Box>
          </div>

          {/* hide portfolio item querySearch */}
          <div className="card mt-4 px-4">
            <div className="row align-items-center mt-3">
              <div className="col-11 mx-1">
                <div className="d-flex align-items-center w-100">
                  <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                    <h5 className="mb-0 text-black">
                      <span>Portfolio Items</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {bundleItems.length > 0 ? (
              <div>
                <div
                  className="custom-table  card table-child"
                  style={{ minHeight: 200, height: "auto", width: "100%" }}
                >
                  <DataTable
                    title=""
                    columns={bundleItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    expandableRows
                    expandableRowExpanded={(row) => (row === currentExpendPortfolioItemRow)}
                    expandOnRowClicked
                    onRowClicked={(row) => setCurrentExpendPortfolioItemRow(row)}
                    expandableRowsComponent={ExpandedComponent}
                    onRowExpandToggled={(bool, row) => setCurrentExpendPortfolioItemRow(row)}
                    pagination
                  />
                </div>
              </div>
            ) : loadingItem === "03" ? (
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
              <div className="p-4  row">
                <div
                  className="col-md-6 col-sm-6"
                  onClick={handleNewBundleItem}
                >
                  <Link to="#" className="add-new-recod">
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                      <p className="font-weight-600">Add Portfolio Item</p>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="add-new-recod">
                    <div>
                      <FontAwesomeIcon
                        className="cloudupload"
                        icon={faCloudUploadAlt}
                      />
                      <h6 className="font-weight-500 mt-3">
                        Drag and drop files to upload <br /> or
                      </h6>
                      <a
                        onClick={() => setOpen3(true)}
                        style={{ cursor: "pointer" }}
                        className="btn text-light border-light font-weight-500 border-radius-10 mt-3"
                      >
                        <span className="mr-2">
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Select files to upload
                      </a>
                      <p className="mt-3">
                        Single upload file should not be more than <br />
                        10MB. Only the .lgs, .lgsx file types are allowed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={open1}
        onHide={handleClose1}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Coverage</h5>
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
                <MuiMenuComponent options={activityOptions} />
              </a>
            </div>
          </div>
          <div className="card mt-4">
            <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
              <h6 className="font-weight-600 text-light mb-0 ml-3">
                Table Name
                <span>
                  {" "}
                  <a href="#" className="ml-3 font-size-14">
                    <FontAwesomeIcon icon={faPen} />
                  </a>
                </span>
              </h6>
              <div>
                <a href="#" className="btn">
                  +Add
                </a>
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
                    <FontAwesomeIcon
                      className="cloudupload"
                      icon={faCloudUploadAlt}
                    />
                    <h6 className="font-weight-500 mt-3">
                      Drag and drop files to upload <br /> or
                    </h6>
                    <a
                      onClick={() => setOpen(true)}
                      style={{ cursor: "pointer" }}
                      className="btn text-light border-light font-weight-500 border-radius-10 mt-3"
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Select files to upload
                    </a>
                    <p className="mt-3">
                      Single upload file should not be more than <br />
                      10MB. Only the .lgs, .lgsx file types are allowed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAvailableCoverage}
        onHide={() => setShowAvailableCoverage(!showAvailableCoverage)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Coverage</h5>
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
                <MuiMenuComponent options={activityOptions} />
              </a>
            </div>
          </div>
          <div className="card mt-4">
            {/* <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                            <h6 className="font-weight-600 text-light mb-0 ml-3">Fleets<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <div>
                                <a href="#" className="btn">+Add</a>
                            </div>
                        </div> */}
            <ReactTableNested />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={open3}
        onHide={() => setOpen3(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Files</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3">
            <div className="add-new-recod">
              <div>
                <FontAwesomeIcon
                  className="cloudupload"
                  icon={faCloudUploadAlt}
                />
                <h6 className="font-weight-500 mt-3">
                  Drag and drop files to upload <br /> or
                </h6>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
            </div>
            <p className="mt-3">
              Single upload file should not be more than 10MB. Only the .lgs,
              .lgsx file types are allowed
            </p>
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
                                    <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
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
                                    <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
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
            <button
              className="btn border w-100 bg-white"
              onClick={() => setOpen3(false)}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-6 col-sm-6">
            <button
              className="btn btn-primary w-100"
              onClick={() => setOpenCoveragetable(true)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />
              Upload
            </button>
          </div>
        </div>
      </Modal>


      <Modal
        show={openCoverage}
        onHide={handleCoveragetable}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Coverage</h5>
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
                <MuiMenuComponent options={activityOptions} />
              </a>
            </div>
          </div>
          <div className="card px-4 pb-4 mt-5 pt-0">
            <div className="row align-items-center">
              <div className="col-3">
                <div className="d-flex ">
                  <h5 className=" mb-0">
                    <span>Coverage123</span>
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
              <div className="col-5">
                <div
                  className="d-flex align-items-center"
                  style={{
                    background: "#F9F9F9",
                    padding: "10px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="search-icon mr-2"
                    style={{ lineHeight: "24px" }}
                  >
                    <img src={searchstatusIcon}></img>
                  </div>
                  <div className="w-100 mx-2">
                    <div className="machine-drop d-flex align-items-center">
                      <div>
                        <lable className="label-div">Machine</lable>
                      </div>
                      <FormControl className="" sx={{ m: 1 }}>
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
                    <a href="#" className="p-1 more-btn">
                      + 3 more
                      <span className="c-btn">C</span>
                      <span className="b-btn">B</span>
                      <span className="a-btn">A</span>
                    </a>
                  </div>
                  <div className="col-5 text-center border-left py-4">
                    <a href="#" className=" ">
                      + Add Part
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
              <DataGrid
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#872ff7",
                    color: "#fff",
                  },
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
        show={openSearchSolution}
        onHide={() => setOpenSearchSolution(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          Search Solution
          <div className="maintableheader bg-white mt-3 border-radius-10">
            <div className="d-flex justify-content-between align-items-center pl-2">
              <div className="d-flex align-items-center">
                <div className="customselect d-flex ml-3">
                  {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                  <Select
                    onChange={handleTypeOfSearchChange}
                    isClearable={true}
                    value={typeOfSearch}
                    options={columnSearchKeyValue}
                    placeholder="Add by"
                  />
                </div>
                {typeOfSearch != null ? (
                  <div className="customselect d-flex ml-3">
                    <span>
                      <a href="#" className="btn-sm">
                        +
                      </a>
                    </span>
                    <Select
                      onChange={handleTypeOfSearchColumnChange}
                      isClearable={true}
                      value={typeOfSearchColumn}
                      options={typeOfSearchColumnKeyValue}
                      placeholder="Select"
                    />
                    {typeOfSearchColumn != null ? (
                      // <></>
                      <input
                        type="email"
                        className=""
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter text"
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "80px",
                          fontWeight: "600",
                          paddingLeft: "10px",
                        }}
                        value={columnSearchText}
                        onChange={(e) => setColumnSearchText(e.target.value)}
                      ></input>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div className="">
                  <a
                    href="#"
                    style={{ cursor: "pointer" }}
                    className="btn border-left"
                  >
                    <span>+</span> Add
                  </a>
                  <a href="#" className="btn border-left">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
            {columnSearchText.trim() != "" && typeOfSearchColumn != null ? (
              <div className="tableheader">
                <ul
                  className="submenu accordion mt-0"
                  style={{ display: "block" }}
                >
                  <li>
                    <a className="result cursor">RESULTS</a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={handleBundleItemSaveAndContinue}
                    >
                      PM125
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor"
                      onClick={handleBundleItemSaveAndContinue}
                    >
                      PM2
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleCreateNewServiceBundle}
                      className="lastOption text-violet cursor"
                    >
                      <span className="mr-2">+</span>Create New{" "}
                      {typeOfSearch != null
                        ? typeOfSearch.value == "bundle"
                          ? "Bundle"
                          : typeOfSearch.value == "service"
                            ? "Service"
                            : typeOfSearch.value == "portfolioItem"
                              ? "Portfolio Item"
                              : ""
                        : ""}
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={createNewBundle}
        onHide={() => setCreateNewBundle(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          <div className="container-fluid ">
            <div className="d-flex align-items-center justify-content-between mt-2">
              <h5 className="font-weight-600 mb-0">Add Bundle</h5>
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
                  <a href="#" className="btn-sm">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                  <a href="#" className="btn-sm">
                    <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                  </a>
                  <a href="#" className="btn-sm">
                    <img style={{ width: "14px" }} src={folderaddIcon}></img>
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
              <div className="row mt-4">
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      SERVICE ID
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      disabled
                      name="name"
                      placeholder="Service ID(AUTO)"
                      value={generalComponentData.name}
                      onChange={handleGeneralInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      SERVICE DESCRIPTION
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      name="serviceDescription"
                      placeholder="Service Description"
                      value={newBundle.serviceDescription}
                      onChange={handleAddBundleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      BUNDLE FLAG
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      name="bundleFlag"
                      placeholder="Bundle Flag"
                      value={newBundle.bundleFlag}
                      onChange={handleAddBundleInputChange}
                    />
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
                      type="email"
                      className="form-control border-radius-10"
                      name="reference"
                      placeholder="Reference"
                      value={newBundle.reference}
                      onChange={handleAddBundleInputChange}
                    />
                    {/* <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            placeholder="Preventive Maintenance"
                                        /> */}
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CUSTOMER SEGMENT
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Customer Segment"
                    />
                    {/* <input type="email" className="form-control border-radius-10" name="reference" placeholder="Customer Segment" value={generalComponentData.externalReference} onChange={handleGeneralInputChange} /> */}
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      MAKE
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      name="customerSegment"
                      placeholder="Placeholder"
                      value={generalComponentData.customerSegment}
                      onChange={handleGeneralInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      MODEL(S)
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      name="customerSegment"
                      placeholder="Placeholder"
                      value={generalComponentData.customerSegment}
                      onChange={handleGeneralInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PREFIX(S)
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      name="customerSegment"
                      placeholder="Placeholder"
                      value={generalComponentData.customerSegment}
                      onChange={handleGeneralInputChange}
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
                      onChange={(e) =>
                        handleAddBundleDropdownChange(ENUM.MACHINE_COMPONENT, e)
                      }
                      isClearable={true}
                      value={newBundle.machineComponent}
                      isLoading={typeKeyValue.length > 0 ? false : true}
                      options={typeKeyValue}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      ADDITIONALS
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Preventive Maintenance"
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ justifyContent: "right" }}>
                <button
                  type="button"
                  onClick={handleAddNewBundle}
                  className="btn btn-light"
                >
                  Save
                </button>
              </div>
              {isView ? (
                <div className="row mt-4">
                  <div className="col-md-4 col-sm-3">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PORTFOLIO ID
                      </p>
                      <h6 className="font-weight-600">CVA - Premium plan</h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-3">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PORTFOLIO DESCRIPTION
                      </p>
                      <h6 className="font-weight-600">
                        Premium Customer Value Agreement D8T and D6T
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-3">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        SERVICE PROGRAM DESCRIPTION (IF ANY)
                      </p>
                      <h6 className="font-weight-600">NA</h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-3">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        REFERENCE
                      </p>
                      <h6 className="font-weight-600">NA</h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-3">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        CUSTOMER SEGMENT
                      </p>
                      <h6 className="font-weight-600">Construction</h6>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="card mt-5">
              <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="font-weight-600 text-light mb-0">
                  Bundle Items
                  <span>
                    {" "}
                    <a href="#" className="ml-3 font-size-14">
                      <FontAwesomeIcon icon={faPen} />
                    </a>
                  </span>
                </h6>
              </div>
              <div className="p-4  row">
                <div className="col-md-6 col-sm-6">
                  <a
                    href="#"
                    className="add-new-recod"
                    onClick={handleNewBundleItem}
                  >
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                      <p className="font-weight-600">Add new record</p>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="add-new-recod">
                    <div>
                      <FontAwesomeIcon
                        className="cloudupload"
                        icon={faCloudUploadAlt}
                      />
                      <h6 className="font-weight-500 mt-3">
                        Drag and drop files to upload <br /> or
                      </h6>
                      <a
                        onClick={() => setOpen(true)}
                        style={{ cursor: "pointer" }}
                        className="btn text-light border-light font-weight-500 border-radius-10 mt-3"
                      >
                        <span className="mr-2">
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Select files to upload
                      </a>
                      <p className="mt-3">
                        Single upload file should not be more than <br />
                        10MB. Only the .lgs, .lgsx file types are allowed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal
        show={openAddBundleItem}
        onHide={() => setOpenAddBundleItem(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          {openAddBundleItemHeader}
          <Modal.Body className="p-0 bg-white">
            <div className="ligt-greey-bg p-3">
              <div>
                <span className="mr-3">
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related part list(s)</span>
                </span>
                <span className="mr-3">
                  <AccessAlarmOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related service estimate(s)</span>
                </span>
                <span>
                  <SellOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Split price</span>
                </span>
              </div>
            </div>
            <div className="px-3">
              <p className="mt-4">SUMMARY</p>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      disabled
                      aria-describedby="emailHelp"
                      placeholder="(AUTO GENERATE)"
                      value={addPortFolioItem.id ? addPortFolioItem.id : ""}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="DESCRIPTION"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          description: e.target.value,
                        })
                      }
                      value={addPortFolioItem.description}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      USAGE IN
                    </label>
                    <Select
                      placeholder={categoryUsageKeyValue1.label}
                      options={categoryList}
                      // selectedValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                      defaultValue={
                        categoryUsageKeyValue1.value
                          ? categoryUsageKeyValue1.value
                          : ""
                      }
                      value={addPortFolioItem.usageIn}
                      onChange={(e) =>
                        setAddportFolioItem({ ...addPortFolioItem, usageIn: e })
                      }
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4">STRATEGY</p>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      TASK TYPE
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={updatedTaskList}
                          placeholder={stratgyTaskTypeKeyValue.value}
                          // selectedValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                          defaultValue={
                            stratgyTaskTypeKeyValue.value
                              ? stratgyTaskTypeKeyValue.value
                              : ""
                          }
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              taskType: e,
                            })
                          }
                          value={addPortFolioItem.taskType}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      FREQUENCY
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={frequencyOptions}
                          placeholder="FREQUENCY"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              frequency: e,
                            })
                          }
                          value={addPortFolioItem.frequency}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
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
                      placeholder="HOURS"
                      onChange={(e) =>
                        setAddportFolioItem({ ...addPortFolioItem, unit: e })
                      }
                      value={addPortFolioItem.unit}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      RECOMMENDED VALUE
                    </label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          recomondedValue: e,
                        })
                      }
                      value={addPortFolioItem.recomondedValue}
                      options={options}
                      placeholder="RECOMMENDED VALUE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      // id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      placeholder="QUANTITY"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          quantity: e.target.value,
                        })
                      }
                      value={addPortFolioItem.quantity}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      NO. OF EVENTS
                    </label>
                    <input
                      type="email"
                      className="form-control border-radius-10"
                      // id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      placeholder="NO. OF EVENTS"
                      onChange={(e) =>
                        setAddportFolioItem({
                          ...addPortFolioItem,
                          numberOfEvents: e.target.value,
                        })
                      }
                      value={addPortFolioItem.numberOfEvents}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4">TEMPLATES</p>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      TEMPLATE ID
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}
                          options={options}
                          placeholder="TEMPLATE ID"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              templateId: e,
                            })
                          }
                          value={addPortFolioItem.templateId}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      TEMPLATE DESCRIPTION
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}
                          options={options}
                          placeholder="TEMPLATE DESCRIPTION"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              templateDescription: e,
                            })
                          }
                          value={addPortFolioItem.templateDescription}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <div className="mt-4">
                      <a
                        href="#"
                        className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                      >
                        <span className="mr-2">+</span>Add Template / Kit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4">REPAIR OPTIONS</p>
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      REPAIR OPTION
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          // defaultValue={selectedOption}
                          // onChange={setSelectedOption}
                          options={options}
                          placeholder="REPAIR OPTION"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              repairOption: e,
                            })
                          }
                          value={addPortFolioItem.repairOption}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <div className="mt-4">
                      <a
                        href="#"
                        className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                      >
                        <span className="mr-2">+</span>Add Repair Option
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right pb-2">
                <a
                  href="#"
                  className="btn border mr-4"
                  onClick={() => setOpenAddBundleItem(false)}
                >
                  Cancel
                </a>
                <Link
                  to="#"
                  className="btn border mr-4"
                  onClick={() => {
                    setOpenAddBundleItem(false);
                    setOpen2(true);
                  }}
                >
                  Save & Continue
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        show={open2}
        onHide={() => setOpen2(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Price Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
          <div className="ligt-greey-bg p-3">
            <div>
              <span className="mr-3">
                <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                <span className="ml-2">Edit</span>
              </span>
              <span className="mr-3">
                <MonetizationOnOutlinedIcon className=" font-size-16" />
                <span className="ml-2"> Adjust price</span>
              </span>
              <span className="mr-3">
                <FormatListBulletedOutlinedIcon className=" font-size-16" />
                <span className="ml-2">Related part list(s)</span>
              </span>
              <span className="mr-3">
                <AccessAlarmOutlinedIcon className=" font-size-16" />
                <span className="ml-2">Related service estimate(s)</span>
              </span>
              <span>
                <SellOutlinedIcon className=" font-size-16" />
                <span className="ml-2">Split price</span>
              </span>
            </div>
          </div>
          <div>
            <div className="p-3">
              <h6 className="text-light-dark font-size-12 font-weight-500">
                PRICES
              </h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      PRICE TYPE
                    </label>
                    <Select
                      options={options}
                      value={priceCalculator.priceMethod}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          priceMethod: e,
                        })
                      }
                      placeholder="placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      LIST PRICE{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      aria-describedby="emailHelp"
                      placeholder="$100"
                      value={priceCalculator.listPrice}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          listPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      ADDITIONAL
                    </label>
                    <div className=" d-flex form-control-date">
                      <div className="">
                        <Select
                          isClearable={true}
                          value={priceCalculator.priceAdditionalSelect}
                          onChange={(e) =>
                            setPriceCalculator({
                              ...priceCalculator,
                              priceAdditionalSelect: e,
                            })
                          }
                          options={options}
                          placeholder="Select"
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="10%"
                        value={priceCalculator.priceAdditionalInput}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            priceAdditionalInput: e.target.value,
                          })
                        }
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
                      PRICE ESCALATON
                    </label>
                    <div className=" d-flex align-items-center form-control-date">
                      <Select
                        className="select-input"
                        value={priceCalculator.priceEscalationSelect}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            priceEscalationSelect: e,
                          })
                        }
                        options={options}
                        placeholder="placeholder "
                      />
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="20%"
                        value={priceCalculator.priceEscalationInput}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            priceEscalationInput: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      CALCULATED PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      value={priceCalculator.calculatedPrice}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          calculatedPrice: e.target.value,
                        })
                      }
                      placeholder="$100"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      FLAT PRICE / ADJUSTED PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      value={priceCalculator.flatPrice}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          flatPrice: e.target.value,
                        })
                      }
                      placeholder="$100"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      DISCOUNT TYPE
                    </label>
                    <div className=" d-flex form-control-date">
                      <div className="">
                        <Select
                          value={priceCalculator.discountTypeSelect}
                          onChange={(e) =>
                            setPriceCalculator({
                              ...priceCalculator,
                              discountTypeSelect: e,
                            })
                          }
                          isClearable={true}
                          options={options}
                          placeholder="Select"
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        value={priceCalculator.discountTypeInput}
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
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      YEAR
                    </label>
                    <Select
                      value={priceCalculator.priceYear}
                      onChange={(e) =>
                        setPriceCalculator({ ...priceCalculator, priceYear: e })
                      }
                      options={options}
                      placeholder="Year"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-light-dark font-size-12 font-weight-500">
                USAGE
              </h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      START USAGE
                    </label>
                    <div
                      className=" d-flex form-control-date"
                      style={{ overflow: "hidden" }}
                    >
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="per hour"
                        value={priceCalculator.startUsage}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            startUsage: e.target.value,
                          })
                        }
                      />
                      <span className="hours-div">hours</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      END USAGE
                    </label>
                    <div
                      className=" d-flex form-control-date"
                      style={{ overflow: "hidden" }}
                    >
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="10%"
                        value={priceCalculator.endUsage}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            endUsage: e.target.value,
                          })
                        }
                      />
                      <span className="hours-div">hours</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      USAGE TYPE
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      options={options}
                      value={priceCalculator.usageType}
                      onChange={(e) =>
                        setPriceCalculator({ ...priceCalculator, usageType: e })
                      }
                      placeholder="placeholder (Optional)"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-light-dark font-size-12 font-weight-500">
                QUANTITY
              </h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      FREQUENCY
                    </label>
                    <Select
                      defaultValue={addPortFolioItem.frequency}
                      options={frequencyOptions}
                      value={priceCalculator.frequency}
                      onChange={(e) =>
                        setPriceCalculator({ ...priceCalculator, frequency: e })
                      }
                      placeholder="Cyclical"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      CYCLE
                    </label>
                    <div
                      className=" d-flex form-control-date"
                      style={{ overflow: "hidden" }}
                    >
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="250"
                        value={priceCalculator.cycle}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            cycle: e.target.value,
                          })
                        }
                      />
                      <span className="hours-div">hours</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div>
                  <h6 className="text-light-dark font-size-12 font-weight-500 mr-4">
                    NET PRICE
                  </h6>
                  ${priceCalculator.netPrice}
                </div>
                <div>
                  <h6 className="text-light-dark font-size-12 font-weight-500">
                    TOTAL PRICE
                  </h6>
                  ${priceCalculator.netPrice}
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <a
                href="#"
                onClick={() => setOpen2(false)}
                className="btn border mr-3 "
              >
                {" "}
                Cancel
              </a>
              <a
                href="#"
                className="btn text-white bg-primary"
                onClick={
                  serviceOrBundlePrefix === ""
                    ? handleBundleItemSaveAndContinue
                    : saveAddNewServiceOrBundle
                }
              >
                Save
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal
        show={showAddSolutionModal}
        onHide={handleShowAddSolution}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="">Choose what solution you want to build</h5>
            </div>
            {/* <div>
                        <a href='#' className='btn border-light font-weight-500 bg-light-grey font-size-18'>Explore available solution</a>
                    </div> */}
          </div>
          <div className="card mt-4 p-4">
            <div className="row">
              <div className="col-md-6 my-3 ">
                <div className="d-flex">
                  <div className="mr-2">
                    <img src={Portfoliosicon}></img>
                  </div>
                  <div>
                    <h5 className="text-light">Bundle</h5>
                    <p>
                      <b>You build Bundle here. </b>
                      Examples of Portfolios are Premium Maintenance Plan, Value
                      added plan etc. A service program is a marketing or
                      product improvement program.
                    </p>
                    <div className="">
                      <a
                        onClick={() => handleCreateSolution("bundle")}
                        className="btn bg-primary text-white cursor"
                      >
                        Create <img className="ml-2" src={Buttonarrow}></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="d-flex">
                  <div className="mr-2">
                    <img src={contract}></img>
                  </div>
                  <div>
                    <h5 className="text-light">Service</h5>
                    <p>
                      <b>
                        You build Service & maintenance solutions for your
                        customer segment here.{" "}
                      </b>
                      Examples of pre-built template are Level I contracts like
                      subscriptions or Level IV contract for Total Maintenance
                      and Repair.
                    </p>
                    <div className="">
                      <a
                        onClick={() => handleCreateSolution("service")}
                        className="btn bg-primary text-white cursor"
                      >
                        Create <img className="ml-2" src={Buttonarrow}></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 my-3">
                <div className="d-flex">
                  <div className="mr-2">
                    <img src={repairicon}></img>
                  </div>
                  <div>
                    <h5 className="text-light">Bundle Item</h5>
                    <p>
                      <b>You build Bundle Item here. </b>
                      Examples of repair solutions are complex engine overhaul,
                      engine reconditioning, componenet replacment , assembly of
                      comlex
                    </p>
                    <div className="">
                      <a
                        onClick={() => handleCreateSolution("bundleItem")}
                        className="btn bg-primary text-white cursor"
                      >
                        Create <img className="ml-2" src={Buttonarrow}></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={(e) => UpdateSelectCoverageData(selectedMasterData[includedModelIndex])}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* <div className="modal fade" id="relatedTable" tabindex="-1" role="dialog" aria-labelledby="exampleReleted" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document"> */}

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
          {/* <div>
            <Link
              to="#"
              className=" btn bg-primary text-white"
              onClick={() => AddNewRowData(selectedMasterData[includedModelIndex])}
            >
              Add New
            </Link>
          </div> */}
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
        show={openMiniBundleItem}
        onHide={() => setOpenMiniBundleItem(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="p-0 bg-white">
          <div className="px-3">
            <p className="mt-4">SUMMARY</p>
            <div className="row mt-4">
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    htmlFor="exampleInputEmail1"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10"
                    disabled
                    placeholder="(AUTO GENERATE)"
                    value={
                      addMiniPortFolioItem.id ? addMiniPortFolioItem.id : ""
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    htmlFor="exampleInputEmail1"
                  >
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10"
                    placeholder="DESCRIPTION"
                    onChange={(e) =>
                      setAddMiniportFolioItem({
                        ...addMiniPortFolioItem,
                        description: e.target.value,
                      })
                    }
                    value={addMiniPortFolioItem.description}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    htmlFor="exampleInputEmail1"
                  >
                    USAGE IN
                  </label>
                  <Select
                    placeholder={categoryUsageKeyValue1.label}
                    options={categoryList}
                    // selectedValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                    defaultValue={
                      categoryUsageKeyValue1.value
                        ? categoryUsageKeyValue1.value
                        : ""
                    }
                    value={addMiniPortFolioItem.usageIn}
                    onChange={(e) =>
                      setAddMiniportFolioItem({
                        ...addMiniPortFolioItem,
                        usageIn: e,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    htmlFor="exampleInputEmail1"
                  >
                    TASK TYPE
                  </label>
                  <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={updatedTaskList}
                        placeholder={stratgyTaskTypeKeyValue.value}
                        // selectedValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                        defaultValue={
                          stratgyTaskTypeKeyValue.value
                            ? stratgyTaskTypeKeyValue.value
                            : ""
                        }
                        onChange={(e) =>
                          setAddMiniportFolioItem({
                            ...addMiniPortFolioItem,
                            taskType: e,
                          })
                        }
                        value={addPortFolioItem.taskType}
                      />
                      <span className="search-icon searchIcon">
                        <SearchOutlinedIcon className="font-size-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right pb-2">
              <a
                href="#"
                className="btn border mr-4"
                onClick={() => setOpenMiniBundleItem(false)}
              >
                Cancel
              </a>
              <Link
                to="#"
                className="btn border mr-4"
                onClick={() => alert("action require")}
              >
                Save & Continue
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal
        show={serviceOrBundleShow}
        onHide={() => setServiceOrBundleShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          <div className="container-fluid ">
            <div className="d-flex align-items-center justify-content-between mt-2">
              <h5 className="font-weight-600 mb-0">
                ADD {serviceOrBundlePrefix}
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
                  <a href="#" className="btn-sm">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                  <a href="#" className="btn-sm">
                    <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                  </a>
                  <a href="#" className="btn-sm">
                    <img style={{ width: "14px" }} src={folderaddIcon}></img>
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
              <div className="row mt-4">
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      {serviceOrBundlePrefix} ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      disabled
                      name="id"
                      placeholder="ID(AUTO)"
                      value={
                        createServiceOrBundle.id ? createServiceOrBundle.id : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      {serviceOrBundlePrefix} DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      name="description"
                      placeholder="Description"
                      value={createServiceOrBundle.description}
                      onChange={handleAddServiceBundleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      BUNDLE FLAG
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      name="bundleFlag"
                      placeholder="Bundle Flag"
                      value={
                        serviceOrBundlePrefix === "SERVICE"
                          ? "SERVICE"
                          : "BUNDLE_ITEM"
                      }
                      // value={createServiceOrBundle.bundleFlag}
                      onChange={handleAddServiceBundleChange}
                      disabled
                    />
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
                      className="form-control border-radius-10"
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
                      // defaultValue={selectedOption}
                      onChange={(e) =>
                        setCreateServiceOrBundle({
                          ...createServiceOrBundle,
                          customerSegment: e,
                        })
                      }
                      value={createServiceOrBundle.customerSegment}
                      options={options}
                      placeholder="Customer Segment"
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
                      className="form-control border-radius-10"
                      name="make"
                      placeholder="Make"
                      value={createServiceOrBundle.make}
                      onChange={handleAddServiceBundleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      MODEL(S)
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      name="models"
                      placeholder="Model(S)"
                      value={createServiceOrBundle.models}
                      onChange={handleAddServiceBundleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PREFIX(S)
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      name="prefix"
                      placeholder="Prefix(S)"
                      value={createServiceOrBundle.prefix}
                      onChange={handleAddServiceBundleChange}
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
                      onChange={(e) =>
                        setCreateServiceOrBundle({
                          ...createServiceOrBundle,
                          machineComponent: e,
                        })
                      }
                      value={newBundle.machineComponent}
                      isLoading={typeKeyValue.length > 0 ? false : true}
                      options={typeKeyValue}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      ADDITIONALS
                    </label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={(e) =>
                        setCreateServiceOrBundle({
                          ...createServiceOrBundle,
                          additional: e,
                        })
                      }
                      value={createServiceOrBundle.additional}
                      options={options}
                      placeholder="Preventive Maintenance"
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ justifyContent: "right" }}>
                <button
                  type="button"
                  onClick={handleAddNewServiceOrBundle}
                  className="btn btn-light"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

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
                  CHOICE OF SPARE PARTS
                </h5>
              </div>
              <div className="bg-white p-3">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch disabled={needOnlyParts} />}
                    label="With Spare Parts"
                    onChange={(e) => handleWithSparePartsCheckBox(e, "with")}
                    checked={partsRequired}
                  />
                  <FormControlLabel
                    control={<Switch disabled={needOnlyParts} />}
                    onChange={(e) => handleWithSparePartsCheckBox(e, "without")}
                    label="I have Spare Parts"
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
                  <div>
                    <a href="#" className="ml-3 font-size-14">
                      <img src={deleteIcon}></img>
                    </a>
                  </div>
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
                    control={<Switch disabled />}
                    label=" Lubricants" />
                  <FormControlLabel
                    control={<Switch disabled />}
                    label="Travel Expenses"
                  />
                  <FormControlLabel
                    control={<Switch disabled />}
                    label="Tools" />
                  <FormControlLabel
                    control={<Switch disabled={needOnlyParts} />}
                    label="External Work"
                    onChange={(e) => handleWithMiscCheckBox(e)}
                    checked={miscRequired}
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
                        label=" Changee Oil and Filter"
                        onChange={(e) => handleWithServiceCheckBox(e)}
                        checked={serviceRequired}
                      />
                    </FormGroup>
                  </div>
                  <div>
                    <a href="#" className="ml-3 font-size-14">
                      <img src={deleteIcon}></img>
                    </a>
                  </div>
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
                    label="Rotete Tires" />
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
                      href="#"
                      className="btn-sm text-white mr-2"
                      style={{ background: "#79CBA2" }}
                    >
                      Free
                    </a>{" "}
                    50 Point Inspection
                  </h6>
                  <h6 className="mt-3">
                    <a
                      href="#"
                      className="btn-sm text-white mr-2 "
                      style={{ background: "#79CBA2" }}
                    >
                      Free
                    </a>{" "}
                    50 Point Inspection
                  </h6>
                </div>
                <div className=" d-flex justify-content-between mt-4">
                  <div>
                    <a href="#" className="btn text-violet bg-light-blue">
                      <b>
                        <span className="mr-2">+</span>Add more services
                      </b>
                    </a>
                  </div>
                  <div>
                    <a href="#" className="btn text-violet">
                      <b>I Have Parts</b>
                    </a>
                  </div>
                </div>
                <div>
                  <button className="btn text-violet mt-2" onClick={UpdatePriceInclusionExclusion} data-dismiss="modal" ><b>Save Changes</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <Tab
                    label="Service/Bundle"
                    value="2"
                    disabled={bundleServiceNeed}
                  />
                  {/* <Tab label="Solution" value="3" /> */}
                  {/*use it in useCase-4 */}
                  {categoryUsageKeyValue1.value === "REPAIR_OR_REPLACE" && <Tab label="Component Data" value="4" />}
                  <Tab label="Price Calculator" value="5" />
                  <Tab label="Review" value="6" />
                </TabList>
              </Box>
              <TabPanel value="1">

                {!portfolioItemDataEditable ?
                  <>
                    <AddPortfolioItem
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
                    <AddPortfolioItem
                      passItemEditRowData={passItemEditRowData}
                      handleItemEditSave={handleItemEditSave}
                      compoFlag="itemEdit"
                      compoFlagTest="itemEditPort"
                    />
                  </>}

              </TabPanel>
              <TabPanel value="2">
                <QuerySearchComp
                  compoFlag="bundleSearch"
                  options={[
                    { label: "Make", value: "itemHeaderMake" },
                    { label: "Family", value: "itemHeaderFamily" },
                    { label: "Model", value: "model" },
                    { label: "Prefix", value: "prefix" },
                    { label: "Item Name", value: "itemName" },
                    { label: "Description", value: "description" },
                  ]}
                  setTempBundleService1={setTempBundleService1}
                  setTempBundleService2={setTempBundleService2}
                  setTempBundleService3={setTempBundleService3}
                  setLoadingItem={setLoadingItem}
                // cancelSearchCriteria={cancelSearchCriteria}
                />
                {loadingItem === "01" ? ("loading") :
                  <>
                    {tempBundleService1?.length > 0 && (<>
                      <DataTable
                        title=""
                        columns={tempBundleItemColumns1}
                        data={tempBundleService1}
                        customStyles={customStyles}
                        selectableRows
                        onSelectedRowsChange={(state) => setTempBundleService2(state.selectedRows)}
                        pagination
                      />
                      {/* {tempBundleService2.length > 0 && ( */}
                      <div className="row mb-3 justify-content-end">
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn bg-primary text-white mr-3"
                            onClick={() => {
                              setTempBundleService1([])
                            }}
                          // disabled={tempBundleService2.length === 0}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn bg-primary text-white"
                            onClick={handleBundleServiceItemCheckBoxData}
                            // onClick={() => {
                            //   setTempBundleService3(tempBundleService2)
                            //   setTempBundleService1([])
                            // }}

                            disabled={tempBundleService2.length === 0}
                          >
                            + Add Selected
                          </button>
                        </div>
                        {/* <button
                          type="button"
                          className="btn bg-primary text-white"
                          onClick={handleBundleServiceItemCheckBoxData}
                          disabled={tempBundleService2.length === 0}
                        >
                          + Add Selected
                        </button> */}
                      </div>
                      {/*  )} */}
                    </>)}
                  </>

                }
                {tempBundleService3?.length > 0 && <>
                  <DataTable
                    title=""
                    columns={tempBundleItemColumns1}
                    data={tempBundleService3}
                    customStyles={customStyles}
                    expandableRows
                    // expandableRowsComponent={ExpandedPriceCalculator}
                    expandableRowExpanded={(row) => (row === currentExpendBundleServiceRow)}
                    expandOnRowClicked
                    onRowClicked={(row) => setCurrentExpendBundleServiceRow(row)}
                    expandableRowsComponent={ExpendTablePopup}
                    onRowExpandToggled={handleExpandRowForPriceCalculator}
                    //onRowExpandToggled={(bool, row) => setCurrentRow(row)}
                    pagination
                  />
                  <div className="row mt-5" style={{ justifyContent: "right" }}>
                    {/* <button type="button" className="btn btn-light" 
                      onClick={handleContinueOfServiceOrBundle}>Continue</button> */}
                    <button type="button" className="btn btn-light"
                      onClick={handleContinueOfAddedServiceOrBundle}>Continue</button>
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
                          className="form-control border-radius-10 text-primary"
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
                            className="form-control border-radius-10"
                            name="make"
                            value={componentData.make}
                            onChange={handleComponentChange}
                            autoComplete="off"
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
                            className="form-control border-radius-10"
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
                            className="form-control border-radius-10"
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
                  <div className="row mt-3 input-fields">
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
                          value={componentData.priceMethod}
                          name="priceMethod"
                          onChange={(e) => setComponentData({ ...componentData, priceMethod: e })}
                          placeholder="placeholder (Optional)"
                          className=" text-primary"
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
                              className=" text-primary"
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
                            className="select-input  text-primary"
                            value={componentData.priceEscalationSelect}
                            name="priceEscalationSelect"
                            onChange={(e) => setComponentData({ ...componentData, priceEscalationSelect: e })}
                            options={options}
                            placeholder="placeholder "
                          />
                          <input
                            type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                          disabled
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
                              className=" text-primary"
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
                {/* <PriceCalculator
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
                  {/* <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          Net Parts $
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          name="netParts"
                          disabled={disable}
                          value={itemPriceCalculator.netParts}
                          onChange={handleItemPriceCalculatorChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          Net Service $
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          name="netService"
                          disabled={disable}
                          value={itemPriceCalculator.netService}
                          onChange={handleItemPriceCalculatorChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          Price type
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          placeholder="Optional"
                          name="priceType"
                          disabled={disable}
                          value={itemPriceCalculator.priceType}
                          onChange={handleItemPriceCalculatorChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          Net Price
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          name="netPrice"
                          disabled={disable}
                          value={itemPriceCalculator.netPrice}
                          onChange={handleItemPriceCalculatorChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          Net Additionals $
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          name="netAdditionals"
                          disabled={disable}
                          value={itemPriceCalculator.netAdditionals}
                          onChange={handleItemPriceCalculatorChange}
                        />
                      </div>
                    </div>
                  </div> */}
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
                              isClearable={true}
                              className="text-primary"
                              value={priceCalculator.priceAdditionalSelect}
                              name="priceAdditionalSelect"
                              onChange={(e) =>
                                setPriceCalculator({
                                  ...priceCalculator,
                                  priceAdditionalSelect: e,
                                })
                              }
                              options={additionalPriceHeadTypeKeyValue}
                              placeholder="Select"
                            // isDisabled
                            />
                          </div>
                          <input
                            type="text"
                            className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                            placeholder="10%"
                            defaultValue={props?.priceCalculator?.priceAdditionalInput}
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
                            onchange={(e) =>
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
                        {/* <FormGroup>
                          <FormControlLabel
                            style={{
                              alignItems: "start",
                              marginLeft: 0,
                            }}
                            control={
                              <Switch
                                checked={extWorkData.flatRateIndicator}
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
                        </FormGroup> */}
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
                            // options={options}
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
                              })}
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
                            <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit.label}</span>
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
                            <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit.label}</span>
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
                            options={options}
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
                            <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit.label}</span>
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
                    className="custom-table  card expand-last-child"
                    style={{ height: 400, width: "100%" }}
                  >
                    <DataTable
                      title=""
                      columns={tempBundleItemColumns}
                      expandableRowExpanded={(row) => (row === currentExpendModelComponentRow)}
                      expandOnRowClicked
                      onRowClicked={(row) => setCurrentExpendModelComponentRow(row)}
                      data={tempBundleItems}
                      customStyles={customStyles}
                      expandableRows
                      // expandableRowsComponent={ExpandedComponent}
                      expandableRowsComponent={ExpendedModelComponent}
                      onRowExpandToggled={(bool, row) => setCurrentExpendModelComponentRow(row)}
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
                        <a href={undefined} className="btn-sm" style={{ cursor: "pointer" }} onClick={() => setBundleAndServiceEditAble(false)}>
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
                <AddPortfolioItem
                  passItemEditRowData={passItemEditRowData}
                  handleItemEditSave={handleItemEditSave}
                  compoFlag="itemEdit"
                  compoFlagTest="itemEditBundle"
                  setBundleTabs={setBundleTabs}
                />
              </TabPanel>
              <TabPanel value="bundleServicePriceCalculator">
                <PriceCalculator
                  serviceOrBundlePrefix={serviceOrBundlePrefix}
                  setBundleTabs={setBundleTabs}
                  setBundleServiceShow={setBundleServiceShow}
                  getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                  priceCalculator={itemPriceData}
                  priceCompFlag="editAble"
                />
                {/* <PriceCalculator
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
      <Modal
        size="xl"
        show={bundleServicePriceCalculator}
        onHide={() => setBundleServicePriceCalculator(false)}
      >
        <Modal.Body>
          <PriceCalculator
            serviceOrBundlePrefix={serviceOrBundlePrefix}
            setBundleTabs={setBundleTabs}
            setBundleServiceShow={setBundleServiceShow}
            priceCalculator={priceCalculator}
            getPriceCalculatorDataFun={getPriceCalculatorDataFun}
          // handleSavePrices={handleSavePrices}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={editItemShow}
        onHide={() => setEditItemShow(false)}
      >
        <Modal.Body>
          {/* itemEdit flag will work for item,bundle/service */}
          <AddPortfolioItem
            passItemEditRowData={passItemEditRowData}
            handleItemEditSave={handleItemEditSave}
            compoFlag="itemEdit"
            compoFlagTest="itemEditPort"
          />
        </Modal.Body>
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
                      placeholder="Enter email"
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
                        Repair Quote with Spare Parts
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                      <h6 class="font-weight-500">SB12345</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">
                        QUOTE DESCRIPTION
                      </p>
                      <h6 class="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                      <h6 class="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                </div>
              </> : <></>}

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
          </div>
        </div>
      </div>
      <div class="modal fade" id="versionpopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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


      {/* Model Box for Convert to Quote */}
      <Modal
        show={convertToPopup}
        onHide={() => setConvertToPopup(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-none">
          <Modal.Title>Quote Create</Modal.Title>
        </Modal.Header>
        <p className="d-block px-3">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
        </p>
        <hr className="my-1" />
        <Modal.Body>
          {!quoteDataShow ?
            <>
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
                      placeholder="Enter email"
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
                    />
                  </div>
                </div>
              </div>
            </> :
            <>
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
              </div>
            </>}

          {quoteDataShow ? <>
          </> : <></>}
        </Modal.Body>
        <Modal.Footer style={{ display: "unset" }}>
          {quoteDataShow ? <>
            <div className="mb-2">
              <a
                // href="#"
                href={undefined}
                onClick={() => handleCreate()}
                data-dismiss="modal"
                className="btn cursor bg-primary d-block text-white"

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
          </> :
            <>
              {/* <div className="d-flex align-items-center justify-content-between"> */}
              <div className="d-flex align-items-center justify-content-end">
                <button
                  class="btn btn-primary mr-2"
                  onClick={() => handleCreateQuote()}
                >
                  Create
                </button>
                <button
                  type="button"
                  class="btn pull-right border"
                  data-dismiss="modal"
                  onClick={() => setConvertToPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </>}

          {/* <button type="button" className="btn  btn-primary w-100" onClick={createNewVersion}>Create </button>
                    <button type="button" className="btn btn-primary w-100" onClick={() => setVersionPopup(false)}>Cancel</button> */}
        </Modal.Footer>
      </Modal>
      <Modal show={optionalPopup} onHide={() => setOptionalPopup(false)} size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="border-none align-items-center">
               <Modal.Title><b>Select Optional Services</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className=' p-2'>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="card p-4">
                        <div className="d-flex align-items-center ">
                        <div class="checkbox mr-3">
                          <input type="checkbox" value=""></input>
                        </div>
                        <p className="mb-0 font-size-16 text-black"><b>AIR FILTER REPLACEMENT</b></p>
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="mb-0 font-size-14">The air filter is recommended to be repplaced once every 12 to 18 months, and often done in tandum with this service.</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="card p-4">
                        <div className="d-flex align-items-center ">
                        <div class="checkbox mr-3">
                          <input type="checkbox" value=""></input>
                        </div>
                        <p className="mb-0 font-size-16 text-black"><b>ROTATE TIRES</b></p>
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="mb-0 font-size-14">Tire rotation is recommended every 7,500 miles to maintain even tread wear and extend the life of your wheels.</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="card mt-4 p-4">
                        <div className="d-flex align-items-center ">
                        <div class="checkbox mr-3">
                          <input type="checkbox" value=""></input>
                        </div>
                        <p className="mb-0 font-size-16 text-black"><b>CABIN AIR FILTER REPLACEMENT</b></p>
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="mb-0 font-size-14">Tire rotation is recommended every 7,500 miles to maintain even tread wear and extend the life of your wheels.</p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0 font-size-14 text-black"><b>AIR FILTER REPLACEMENT</b></p>
                </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

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
    </PortfolioContext.Provider>
  );
}
