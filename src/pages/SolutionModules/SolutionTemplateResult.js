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
import Validator from "../../utils/validator";
import $ from "jquery";
import LoadingProgress from "../Repair/components/Loader";

import { useHistory } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import DropdownButton from "react-bootstrap/DropdownButton";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';


import { customerSearch, machineSearch } from "services/searchServices";

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
import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "../Repair/CONSTANTS";


import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DataTable from "react-data-table-component";
import PriceCalculator from "../PortfolioAndBundle/PriceCalculator";
import AddCustomPortfolioItem from "./AddCustomPortfolioItem";

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
   convertPortfolioToQuoteData,
   getPortfolioCommonConfig,
   getSolutionPriceCommonConfig,
   getSearchQueryCoverage,
   getSearchCoverageForFamily,
   itemCreation,
   createCoverage,
   createCustomCoverage,
   updateCustomCoverage,
   getItemPrice,
   getcustomItemPriceById,
   updateCustomPriceData,
   escalationPriceCreation,
   additionalPriceCreation,
   portfolioPriceCreation,
   deleteCustomItem,
   updateCustomItemData,
   getSolutionPortfolioById,
   updatePortfolioPrice,
   updateEscalationPriceById,
   updateAdditionalPriceById,
   getPortfolioPriceById,
   getCustomItemData,
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

export function SolutionTemplateResult(props) {

   let history = useHistory();
   const { state } = props.location;

   const location = useLocation();

   var selectedSolutionTemplateItemsVal = JSON.parse(localStorage.getItem('selectedSolutionTemplateItems'));
   var SolutionValueIs = localStorage.getItem('solutionValueIs');

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
   const [convertToPopup, setConvertToPopup] = useState(false)

   const [productHierarchyKeyValue, setProductHierarchyKeyValue] = useState([]);
   const [geographicKeyValue, setGeographicKeyValue] = useState([]);
   const [typeKeyValue, setTypeKeyValue] = useState([]);

   const [currentExpendPortfolioItemRow, setCurrentExpendPortfolioItemRow] = useState(null)

   const [machineTypeKeyValueList, setMachineTypeKeyValueList] = useState([])
   const [lifeStageOfMachineKeyValueList, setLifeStageOfMachineKeyValueList] = useState([])



   const [searchCoverageSerialResults, setSearchCoverageSerialResults] = useState([]);
   const [coverageSerialResultList, setCoverageSerialResultList] = useState([]);

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


   // const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
   const [priceListKeyValue, setPriceListKeyValue] = useState([]);
   const [priceTypeKeyValue, setPriceTypeKeyValue] = useState([]);
   const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);

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

   const [selectedSolutionCustomItems, setSelectedSolutionCustomItems] = useState([]);
   const [selectedSolutionCustomCoverages, setSelectedSolutionCustomCoverages] = useState([]);

   const [selectedSolutionItems, setSelectedSolutionItems] = useState([]);
   const [editAbleCustomPriceData, setEditAbleCustomPriceData] = useState([]);

   const [partsRequired, setPartsRequired] = useState(true);
   const [labourRequired, setlabourRequired] = useState(true);
   const [serviceRequired, setServiceRequired] = useState(false);
   const [miscRequired, setMiscRequired] = useState(true);
   const [needOnlyParts, setNeedOnlyParts] = useState(false);

   // const [selectePortfolioTempItemsData, setSelectedPortfolioTempItemsData] = useState([]);
   const [selectedCustomItems, setSelectedCustomItems] = useState([]);

   const [viewOnlyTab, setViewOnlyTab] = useState({
      generalViewOnly: true,
      validityViewOnly: true,
      strategyViewOnly: true,
      administrativeViewOnly: true,
      priceViewOnly: true,
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
      items: [],
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
   const [open3, setOpen3] = useState(false);

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
   const [priceEscalationHeadKeyValue1, setPriceEscalationKeyValue1] = useState([]);
   const [escalationPriceValue, setEscalationPriceValue] = useState()
   const [additionalPriceValue, setAdditionalPriceValue] = useState()
   const [editItemShow, setEditItemShow] = useState(false);
   const [passItemEditRowData, setPassItemEditRowData] = useState();

   const [pricePriceData, setPricePriceData] = useState("");
   const [priceCalculatedPrice, setPriceCalculatedPrice] = useState("");
   const [additionalPriceDataId, setAdditionalPriceDataId] = useState("");
   const [escalationPriceDataId, setEscalationPriceDataId] = useState("");
   const [portfolioPriceDataIdForExiting, setPortfolioPriceDataIdForExiting] = useState("");



   const [querySearchModelResult, setQuerySearchModelResult] = useState([])
   const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] = useState([])
   const [selectedPrefixOption, setSelectedPrefixOption] = useState("");
   const [includedModelIndex, setIncludedModelIndex] = useState(0);

   const [anchorEl, setAnchorEl] = React.useState(null);

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

   const [tabs, setTabs] = useState("1");
   const [itemModelShow, setItemModelShow] = useState(false);
   const [loadingItem, setLoadingItem] = useState(false);
   const [tempBundleItems, setTempBundleItems] = useState([]);
   const [valueOfUseCase, setValueOfUseCase] = useState(4);
   const [tempBundleItemCheckList, setTempBundleItemCheckList] = useState({});
   const [bundleTabs, setBundleTabs] = useState("1");
   const [bundleServiceShow, setBundleServiceShow] = useState(false);


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

   const makeHeaderEditable = () => {
      // console.log("Data is : ", location.selectedTemplateItems[0])

      // priceAgreement
      // coverage
      // console.log("data-------- : ", viewOnlyTab, value);
      if (value === "general" && viewOnlyTab.generalViewOnly)
         setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: false });

      else if (value === "validity" && viewOnlyTab.validityViewOnly) {
         setViewOnlyTab({ ...viewOnlyTab, validityViewOnly: false });
      } else if (value === "strategy" && viewOnlyTab.strategyViewOnly) {
         setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: false });
      }
      else if (value === "administrative" && viewOnlyTab.administrativeViewOnly) {
         setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: false });
      }
      else if (value === "price" && viewOnlyTab.priceViewOnly) {
         setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: false });
      }
   }


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

      // =================== Convert to Quote ================== //
      if ((portfolioId == "" ||
         portfolioId == null ||
         portfolioId == "string" ||
         portfolioId == undefined)) {
         toast("😐" + "Create Portfolio first", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         setConvertToPopup(false);
      } else {

         console.log("Quote Object is : ", portfolioId)

         const quoteRes = await convertPortfolioToQuoteData(portfolioId);
         setQuoteData({ ...quoteData, contact: quoteRes.data.quoteId })
         setQuoteDataShow(true);
      }
      // console.log("Quote Object is : ", CreatedCustomPortfolioDetails.customPortfolioId)

      // const quoteRes = await convertPortfolioToQuoteData(portfolioId);
      // // console.log("quoteRes : ", quoteRes);

      // // console.log("quote Response data is : ", quoteRes.data)
      // setQuoteData({ ...quoteData, contact: quoteRes.data.quoteId })

      // // console.log("quoteData : ", quoteData);
      // setQuoteDataShow(true);
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
               <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco custom-rdt_TableCell"></div>
               <div
                  id="cell-1-undefined"
                  data-column-id="1"
                  role="gridcell"
                  className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                  data-tag="allowRowEvents"
               >
                  {/* <div>{bundleAndService.customItemId}</div> */}
                  <div>{bundleAndService.itemName}</div>
               </div>
               <div
                  id="cell-2-undefined"
                  data-column-id="2"
                  role="gridcell"
                  className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                  data-tag="allowRowEvents"
               >
                  <div data-tag="allowRowEvents">
                     {bundleAndService.customItemHeaderModel.itemHeaderDescription}
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
                     {bundleAndService.customItemHeaderModel.itemHeaderStrategy}
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
                     {bundleAndService.customItemBodyModel.taskType}
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
                     {bundleAndService.customItemHeaderModel?.quantity}
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
                     {bundleAndService.customItemHeaderModel.netPrice}
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
                     {bundleAndService.customItemHeaderModel.additional}
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
                     {bundleAndService.customItemHeaderModel?.price}
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
                     {bundleAndService.customItemHeaderModel.netPrice}
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
                     {bundleAndService.customItemHeaderModel?.comments}
                  </div>
               </div>
               {/* <div
                        id="cell-10-undefined"
                        data-column-id="10"
                        role="gridcell"
                        className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                        data-tag="allowRowEvents"
                    >
                        <div data-tag="allowRowEvents">
                            {bundleAndService.itemBodyModel.totalPrice}
                        </div>
                    </div> */}
               <div
                  id="cell-10-undefined"
                  data-column-id="10"
                  role="gridcell"
                  className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu custom-rdt_TableCell rdt_TableCell"
                  data-tag="allowRowEvents"
               >
                  <div data-tag="allowRowEvents">
                     {/* {bundleAndService.itemBodyModel.totalPrice} */}
                  </div>
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
   );

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
            // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
            //     ? generalComponentData.lifeStageOfMachine
            //     : "EMPTY",
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
            customCoverages: generalComponentData.coverages
               ? generalComponentData.coverages
               : [],
            items: _generalComponentData.items,
            usageCategory: categoryUsageKeyValue1.value,
            taskType: stratgyTaskTypeKeyValue.value,
            strategyTask: stratgyTaskUsageKeyValue.value,
            responseTime: stratgyResponseTimeKeyValue.value,
            productHierarchy: stratgyHierarchyKeyValue.value,
            geographic: stratgyGeographicKeyValue.value,
         };
         if (generalComponentData.portfolioId) {
            const updatePortfolioRes = await updateCustomPortfolio(
               portfolioId,
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
               // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
               //     ? generalComponentData.lifeStageOfMachine
               //     : "EMPTY",
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
               customCoverages: generalComponentData.coverages
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
               const updatePortfolioRes = await updateCustomPortfolio(
                  portfolioId,
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
      const editAbleRow = await getCustomItemData(row.customItemId);
      if (editAbleRow.status === 200) {
         setPassItemEditRowData({ ...editAbleRow.data, _itemId: editAbleRow.data.customItemId });
         setEditItemShow(true);
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
      // setEditItemShow(true);
      // setPassItemEditRowData({ ...row, _itemId: row.customtemId });
   };

   const handleItemEditSave = async (addPortFolioItem, compoFlag) => {
      try {
         setEditItemShow(false); //hide screen
         // Old Todo
         // let reqObj = {
         //    customItemId: parseInt(addPortFolioItem.id),
         //    itemName: "",
         //    customItemHeaderModel: {
         //       itemHeaderId: 0,
         //       itemHeaderDescription: createServiceOrBundle.description,
         //       bundleFlag: "PORTFOLIO",
         //       reference: createServiceOrBundle.reference,
         //       itemHeaderMake: createServiceOrBundle.make,
         //       itemHeaderFamily: "",
         //       model: createServiceOrBundle.models,
         //       prefix: createServiceOrBundle.prefix,
         //       type: "MACHINE",
         //       additional: createServiceOrBundle.additional.value,
         //       currency: "",
         //       netPrice: 0,
         //       itemProductHierarchy: generalComponentData.productHierarchy,
         //       itemHeaderGeographic: generalComponentData.geographic,
         //       responseTime: generalComponentData.responseTime,
         //       usage: "",
         //       validFrom: generalComponentData.validFrom,
         //       validTo: generalComponentData.validTo,
         //       estimatedTime: "",
         //       servicePrice: 0,
         //       status: "NEW",
         //    },
         //    customItemBodyModel: {
         //       itemBodyId: parseInt(addPortFolioItem.id),
         //       itemBodyDescription: addPortFolioItem.description,
         //       quantity: parseInt(addPortFolioItem.quantity),
         //       startUsage: priceCalculator.startUsage,
         //       endUsage: priceCalculator.endUsage,
         //       standardJobId: "",
         //       frequency: addPortFolioItem.frequency.value,
         //       additional: "",
         //       spareParts: ["WITH_SPARE_PARTS"],
         //       labours: ["WITH_LABOUR"],
         //       miscellaneous: ["LUBRICANTS"],
         //       taskType: [...addPortFolioItem.taskType.value],
         //       solutionCode: "",
         //       usageIn: addPortFolioItem.usageIn.value,
         //       recommendedValue: 0,
         //       usage: "",
         //       repairKitId: "",
         //       templateDescription: addPortFolioItem.description.value,
         //       partListId: "",
         //       serviceEstimateId: "",
         //       numberOfEvents: parseInt(addPortFolioItem.numberOfEvents),
         //       repairOption: addPortFolioItem.repairOption.value,
         //       priceMethod: "LIST_PRICE",
         //       listPrice: parseInt(priceCalculator.listPrice),
         //       priceEscalation: "",
         //       calculatedPrice: parseInt(priceCalculator.calculatedPrice),
         //       flatPrice: parseInt(priceCalculator.flatPrice),
         //       discountType: "",
         //       year: priceCalculator.priceYear.value,
         //       avgUsage: 0,
         //       unit: addPortFolioItem.unit.value,
         //       sparePartsPrice: 0,
         //       sparePartsPriceBreakDownPercentage: 0,
         //       servicePrice: 0,
         //       servicePriceBreakDownPercentage: 0,
         //       miscPrice: 0,
         //       miscPriceBreakDownPercentage: 0,
         //       totalPrice: 0,
         //    },
         // };

         // New Todo CustomITem Update
         let reqObj = {
            customItemId: parseInt(addPortFolioItem.id),
            itemName: addPortFolioItem.name,
            customItemHeaderModel: {
               customItemHeaderId: 0,
               itemHeaderDescription: addPortFolioItem.description,
               bundleFlag: "PORTFOLIO",
               portfolioItemId: 0,
               reference: createServiceOrBundle.description,
               itemHeaderMake: createServiceOrBundle.make,
               itemHeaderFamily: createServiceOrBundle.family,
               model: createServiceOrBundle.model,
               prefix: createServiceOrBundle.prefix,
               type: "MACHINE",
               additional: "",
               currency: "",
               netPrice: 0,
               itemProductHierarchy: generalComponentData.productHierarchy != "" ?
                  generalComponentData.productHierarchy : "END_PRODUCT",
               itemHeaderGeographic: generalComponentData.geographic != "" ?
                  generalComponentData.geographic : "ONSITE",
               responseTime: generalComponentData.responseTime != ""
                  ? generalComponentData.responseTime : "PROACTIVE",
               usage: "",
               validFrom: generalComponentData.validFrom,
               validTo: generalComponentData.validTo,
               estimatedTime: "",
               servicePrice: 0,
               status: "DRAFT",
               componentCode: "",
               componentDescription: "",
               serialNumber: "",
               itemHeaderStrategy: addPortFolioItem.strategyTask.value,
               variant: "",
               itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != ""
                  ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
               jobCode: "",
               preparedBy: administrative.preparedBy,
               approvedBy: administrative.approvedBy,
               preparedOn: administrative.preparedOn,
               revisedBy: administrative.revisedBy,
               revisedOn: administrative.revisedOn,
               salesOffice: administrative.salesOffice?.value,
               offerValidity: administrative.offerValidity?.value
            },
            customItemBodyModel: {
               customItemBodyId: parseInt(addPortFolioItem.id),
               itemBodyDescription: addPortFolioItem.description,
               spareParts: ["WITH_SPARE_PARTS"],
               labours: ["WITH_LABOUR"],
               miscellaneous: ["LUBRICANTS"],
               taskType: [addPortFolioItem.taskType?.value],
               solutionCode: "",
               usageIn: addPortFolioItem.usageIn?.value,
               usage: "",
               year: "",
               avgUsage: 0,
               unit: addPortFolioItem.unit?.value,
               frequency: addPortFolioItem.frequency?.value,
               recommendedValue: parseInt(addPortFolioItem.recommendedValue),
               customItemPrices: []
            },
         }
         const { data, status } = await updateCustomItemData(
            addPortFolioItem.id,
            reqObj
         );
         if (status == 200) {
            toast("😎 Updated Successfully", {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
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

   const handleClick = (event) => {
      console.log("event", event);
      setAnchorEl(event.currentTarget);
      setOpen(true);
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
            //    generalComponentData.name === "" ||
            //    generalComponentData.name == null ||
            //    generalComponentData.externalReference === "" ||
            //    generalComponentData.externalReference === null ||
            //    prefilgabelGeneral === ""
            // ) {
            //    throw "Please fill required field properly";
            // }


            // Old Todo
            // let reqData = {
            //    type: prefilgabelGeneral,
            //    name: generalComponentData.name,
            //    description: generalComponentData.description,
            //    externalReference: generalComponentData.externalReference,

            //    strategyTask: stratgyTaskUsageKeyValue.value,
            //    taskType: stratgyTaskTypeKeyValue.value,
            //    usageCategory: categoryUsageKeyValue1.value,
            //    productHierarchy: stratgyHierarchyKeyValue.value,
            //    geographic: stratgyGeographicKeyValue.value,

            //    availability: "AVAILABILITY_GREATER_95",
            //    responseTime: stratgyResponseTimeKeyValue.value,
            //    type: "MACHINE",
            //    application: "HILL",
            //    contractOrSupport: "LEVEL_I",
            //    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
            //    supportLevel: value3.value,
            //    serviceProgramDescription: "SERVICE_PROGRAM_DESCRIPTION",

            //    machineType: machineTypeKeyValue.value,
            //    searchTerm: "EMPTY",
            //    lubricant: true,
            //    customerId: 0,
            //    visibleInCommerce: true,
            //    customerGroup: generalComponentData.customerGroup
            //       ? generalComponentData.customerGroup
            //       : "EMPTY",
            //    customerSegment: generalComponentData.customerSegment.value
            //       ? generalComponentData.customerSegment.value
            //       : "EMPTY",
            //    status: generalComponentData.status
            //       ? generalComponentData.status
            //       : "EMPTY",
            //    solutionType: solutionTypeListKeyValue.value ?
            //       solutionTypeListKeyValue.value : "EMPTY",
            //    solutionLevel: solutionLevelListKeyValue.value ?
            //       solutionLevelListKeyValue.value : "EMPTY",

            //    items: [],
            //    customCoverages: [],
            //    customItems: [],
            //    preparedBy: administrative.preparedBy,
            //    approvedBy: administrative.approvedBy,
            //    preparedOn: administrative.preparedOn,
            //    revisedBy: administrative.revisedBy,
            //    revisedOn: administrative.revisedOn,
            //    salesOffice: administrative.salesOffice?.value,
            //    offerValidity: administrative.offerValidity?.value,
            //    template: flagTemplate,
            //    visibleInCommerce: flagCommerce,
            //    // portfolioPrice: {},
            //    // additionalPrice: {},
            //    // escalationPrice: {},

            // };

            // New Todo
            let reqData = {
               name: generalComponentData.name,
               description: generalComponentData.description,
               externalReference: generalComponentData.externalReference,
               customerSegment: generalComponentData?.customerSegment?.value,
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

               portfolioPrice: portfolioPriceDataId,
               additionalPrice: portfolioAdditionalPriceDataId,
               escalationPrice: portfolioEscalationPriceDataId,


               supportLevel: value3.value,
               status: value2.value,

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

               customItems: selectedSolutionCustomItems,
               customCoverages: selectedSolutionCustomCoverages,

            };

            console.log("req dat : ", reqData);

            setGeneralComponentData({
               ...generalComponentData,
               usageCategory: categoryUsageKeyValue1.value,
               taskType: stratgyTaskTypeKeyValue.value,
               strategyTask: stratgyTaskUsageKeyValue.value,
               optionals: stratgyOptionalsKeyValue.value,
               responseTime: stratgyResponseTimeKeyValue.value,
               productHierarchy: stratgyHierarchyKeyValue.value,
               geographic: stratgyGeographicKeyValue.value,
               machineType: machineTypeKeyValue.value,
               lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
               preparedBy: administrative.preparedBy,
               approvedBy: administrative.approvedBy,
               preparedOn: administrative.preparedOn,
               revisedBy: administrative.revisedBy,
               revisedOn: administrative.revisedOn,
               salesOffice: administrative.salesOffice?.value,
               offerValidity: administrative.offerValidity?.value,
               template: flagTemplate,
               visibleInCommerce: flagCommerce,
            });

            const portfolioRes = await updateCustomPortfolio(
               portfolioId,
               reqData
            );

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
               setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
               setGeneralComponentData({
                  ...generalComponentData,
                  portfolioId: portfolioRes.data.customPortfolioId,
               });
               setPortfolioId(portfolioRes.data.customPortfolioId);
            } else {
               throw `${portfolioRes.status}:error in portfolio updating`;
            }

         } else if (e.target.id == "validity") {
            let reqData;
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
                  // console.log("reqObj : ", reqData)
                  throw "Please fill date fields";
               }
            }
            setValue("strategy");
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
               machineType: machineTypeKeyValue.value,
               lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
               solutionType: solutionTypeListKeyValue.value,
               solutionLevel: solutionLevelListKeyValue.value,
            });

            const { portfolioId, ...res } = generalComponentData;
            // // Old Todo
            // let obj = {
            //    ...res,
            //    visibleInCommerce: true,
            //    customerId: 0,
            //    lubricant: true,
            //    customerSegment: generalComponentData.customerSegment.value
            //       ? generalComponentData.customerSegment.value
            //       : "EMPTY",
            //    machineType: machineTypeKeyValue.value,
            //    status: generalComponentData.status
            //       ? generalComponentData.status
            //       : "EMPTY",
            //    strategyTask: generalComponentData.strategyTask
            //       ? generalComponentData.strategyTask
            //       : "EMPTY",
            //    taskType: generalComponentData.taskType
            //       ? generalComponentData.taskType
            //       : "EMPTY",
            //    usageCategory: generalComponentData.usageCategory
            //       ? generalComponentData.usageCategory
            //       : "EMPTY",
            //    productHierarchy: generalComponentData.productHierarchy
            //       ? generalComponentData.productHierarchy
            //       : "EMPTY",
            //    geographic: generalComponentData.geographic
            //       ? generalComponentData.geographic
            //       : "EMPTY",
            //    availability: generalComponentData.availability
            //       ? generalComponentData.availability
            //       : "EMPTY",
            //    responseTime: generalComponentData.responseTime
            //       ? generalComponentData.responseTime
            //       : "EMPTY",
            //    type: generalComponentData.type ? generalComponentData.type : "EMPTY",
            //    application: generalComponentData.application
            //       ? generalComponentData.application
            //       : "EMPTY",
            //    contractOrSupport: generalComponentData.contractOrSupport
            //       ? generalComponentData.contractOrSupport
            //       : "EMPTY",
            //    // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
            //    //     ? generalComponentData.lifeStageOfMachine
            //    //     : "EMPTY",
            //    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
            //    supportLevel: generalComponentData.supportLevel
            //       ? generalComponentData.supportLevel
            //       : "EMPTY",
            //    items: [],
            //    customCoverages: [],
            //    customerGroup: generalComponentData.customerGroup
            //       ? generalComponentData.customerGroup
            //       : "EMPTY",
            //    searchTerm: "EMPTY",
            //    // supportLevel: "PREMIUM",
            //    supportLevel: value3.value,
            //    solutionType: solutionTypeListKeyValue.value ?
            //       solutionTypeListKeyValue.value : "EMPTY",
            //    solutionLevel: solutionLevelListKeyValue.value ?
            //       solutionLevelListKeyValue.value : "EMPTY",
            //    // portfolioPrice: {},
            //    // additionalPrice: {},
            //    // escalationPrice: {},

            //    usageCategory: categoryUsageKeyValue1.value,
            //    taskType: stratgyTaskTypeKeyValue.value,
            //    strategyTask: stratgyTaskUsageKeyValue.value,
            //    responseTime: stratgyResponseTimeKeyValue.value,
            //    productHierarchy: stratgyHierarchyKeyValue.value,
            //    geographic: stratgyGeographicKeyValue.value,
            //    customItems: selectedCustomItems,

            //    preparedBy: administrative.preparedBy,
            //    approvedBy: administrative.approvedBy,
            //    preparedOn: administrative.preparedOn,
            //    revisedBy: administrative.revisedBy,
            //    revisedOn: administrative.revisedOn,
            //    salesOffice: administrative.salesOffice?.value,
            //    offerValidity: administrative.offerValidity?.value,
            //    template: flagTemplate,
            //    visibleInCommerce: flagCommerce,
            // };

            // New Todo
            let reqData = {
               name: generalComponentData.name,
               description: generalComponentData.description,
               externalReference: generalComponentData.externalReference,
               customerSegment: generalComponentData?.customerSegment?.value,
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

               portfolioPrice: portfolioPriceDataId,
               additionalPrice: portfolioAdditionalPriceDataId,
               escalationPrice: portfolioEscalationPriceDataId,


               supportLevel: value3.value,
               status: value2.value,

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

               customItems: selectedSolutionCustomItems,
               customCoverages: selectedSolutionCustomCoverages,

            };
            const strategyRes = await updateCustomPortfolio(
               portfolioId,
               reqData
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
               setViewOnlyTab({ ...viewOnlyTab, strategyViewOnly: true });
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
            // update Exiting Escalation Price
            if (escalationPriceDataId !== "" ||
               escalationPriceDataId !== null ||
               escalationPriceDataId !== "string" ||
               escalationPriceDataId !== undefined
            ) {
               let exitingEscalationPriceObj = {
                  escalationPriceId: escalationPriceDataId,
                  priceMethod: priceMethodKeyValue1.value,
                  priceHeadType: priceEscalationHeadKeyValue1.value,
                  escalationPercentage: parseInt(escalationPriceValue),
                  validFrom: validityData.fromDate,
                  validTo: validityData.toDate,
                  userId: "string"
               };

               const updateEscalationPriceData = await updateEscalationPriceById(
                  exitingEscalationPriceObj,
                  escalationPriceDataId
               );
            }

            // update Additional Price
            if (additionalPriceDataId !== "" ||
               additionalPriceDataId !== null ||
               additionalPriceDataId !== "string" ||
               additionalPriceDataId !== undefined
            ) {
               let exitingAdditionalPriceObj = {
                  additionalPriceId: additionalPriceDataId,
                  priceMethod: priceMethodKeyValue1.value,
                  priceHeadType: priceAdditionalHeadKeyValue1.value,
                  additionalPercentage: parseInt(additionalPriceValue),
                  validFrom: validityData.fromDate,
                  validTo: validityData.toDate,
                  userId: "string"
               }

               const updateAdditionalPriceData = await updateAdditionalPriceById(
                  exitingAdditionalPriceObj,
                  additionalPriceDataId
               )
            }

            // update Portfolio Price 
            if (portfolioPriceDataIdForExiting !== "" ||
               portfolioPriceDataIdForExiting !== null ||
               portfolioPriceDataIdForExiting !== "string" ||
               portfolioPriceDataIdForExiting !== undefined
            ) {
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
            }

            // Create Escalation Price Obj
            let priceEscalation = {
               priceMethod: priceMethodKeyValue1.value,
               priceHeadType: priceEscalationHeadKeyValue1.value,
               escalationPercentage: parseInt(escalationPriceValue),
               validFrom: validityData.fromDate.toISOString().substring(0, 10),
               validTo: validityData.toDate.toISOString().substring(0, 10),
               userId: "string"
            }

            // Create Additional Price Obj
            let priceAdditional = {
               priceMethod: priceMethodKeyValue1.value,
               priceHeadType: priceAdditionalHeadKeyValue1.value,
               additionalPercentage: parseInt(additionalPriceValue),
               validFrom: validityData.fromDate.toISOString().substring(0, 10),
               validTo: validityData.toDate.toISOString().substring(0, 10),
               userId: "string"
            }

            // Create Portfolio Price Obj
            let portfolioPriceCreate = {
               priceMethod: priceMethodKeyValue1.value,
               priceType: priceTypeKeyValue1.value,
               priceList: priceListKeyValue1.value,
               priceDate: priceDetails.priceDate,
            }

            // console.log("portfolioPriceCreate --- : ", portfolioPriceCreate)

            // const escalationPrice = await escalationPriceCreation(priceEscalation);
            // const additionalPrice = await additionalPriceCreation(priceAdditional);
            // const portfolioPriceAPIData = await portfolioPriceCreation(portfolioPriceCreate);

            // setPortfolioEscalationPriceDataId({
            //    escalationPriceId: escalationPrice.data.escalationPriceId,
            // })
            // setPortfolioAdditionalPriceDataId({
            //    additionalPriceId: additionalPrice.data.additionalPriceId,
            // })
            // setPortfolioPriceDataId({
            //    portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
            // })
            // const { portfolioId, ...res } = generalComponentData;

            // Old Todo
            // let priceobjData = {
            //    ...res,
            //    visibleInCommerce: true,
            //    customerId: 0,
            //    lubricant: true,
            //    customerSegment: generalComponentData.customerSegment.value
            //       ? generalComponentData.customerSegment.value
            //       : "EMPTY",
            //    // machineType: generalComponentData.machineType
            //    //     ? generalComponentData.machineType
            //    //     : "EMPTY",
            //    machineType: machineTypeKeyValue.value,
            //    status: generalComponentData.status
            //       ? generalComponentData.status
            //       : "EMPTY",
            //    strategyTask: generalComponentData.strategyTask
            //       ? generalComponentData.strategyTask
            //       : "EMPTY",
            //    taskType: generalComponentData.taskType
            //       ? generalComponentData.taskType
            //       : "EMPTY",
            //    usageCategory: generalComponentData.usageCategory
            //       ? generalComponentData.usageCategory
            //       : "EMPTY",
            //    productHierarchy: generalComponentData.productHierarchy
            //       ? generalComponentData.productHierarchy
            //       : "EMPTY",
            //    geographic: generalComponentData.geographic
            //       ? generalComponentData.geographic
            //       : "EMPTY",
            //    availability: generalComponentData.availability
            //       ? generalComponentData.availability
            //       : "EMPTY",
            //    responseTime: generalComponentData.responseTime
            //       ? generalComponentData.responseTime
            //       : "EMPTY",
            //    type: generalComponentData.type ? generalComponentData.type : "EMPTY",
            //    application: generalComponentData.application
            //       ? generalComponentData.application
            //       : "EMPTY",
            //    contractOrSupport: generalComponentData.contractOrSupport
            //       ? generalComponentData.contractOrSupport
            //       : "EMPTY",
            //    // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
            //    //     ? generalComponentData.lifeStageOfMachine
            //    //     : "EMPTY",
            //    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
            //    supportLevel: generalComponentData.supportLevel
            //       ? generalComponentData.supportLevel
            //       : "EMPTY",
            //    items: [],
            //    customCoverages: [],
            //    customerGroup: generalComponentData.customerGroup
            //       ? generalComponentData.customerGroup
            //       : "EMPTY",
            //    searchTerm: "EMPTY",
            //    // supportLevel: "PREMIUM",
            //    supportLevel: value3.value,
            //    solutionType: solutionTypeListKeyValue.value ?
            //       solutionTypeListKeyValue.value : "EMPTY",
            //    solutionLevel: solutionLevelListKeyValue.value ?
            //       solutionLevelListKeyValue.value : "EMPTY",
            //    portfolioPrice: {
            //       portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
            //    },
            //    additionalPrice: {
            //       additionalPriceId: additionalPrice.data.additionalPriceId,
            //    },
            //    escalationPrice: {
            //       escalationPriceId: escalationPrice.data.escalationPriceId,
            //    },

            //    usageCategory: categoryUsageKeyValue1.value,
            //    taskType: stratgyTaskTypeKeyValue.value,
            //    strategyTask: stratgyTaskUsageKeyValue.value,
            //    responseTime: stratgyResponseTimeKeyValue.value,
            //    productHierarchy: stratgyHierarchyKeyValue.value,
            //    geographic: stratgyGeographicKeyValue.value,
            //    customItems: selectedCustomItems,

            //    preparedBy: administrative.preparedBy,
            //    approvedBy: administrative.approvedBy,
            //    preparedOn: administrative.preparedOn,
            //    revisedBy: administrative.revisedBy,
            //    revisedOn: administrative.revisedOn,
            //    salesOffice: administrative.salesOffice?.value,
            //    offerValidity: administrative.offerValidity?.value,
            //    template: flagTemplate,
            //    visibleInCommerce: flagCommerce,
            // };

            // New Todo
            // New Todo
            let priceObjData = {
               name: generalComponentData.name,
               description: generalComponentData.description,
               externalReference: generalComponentData.externalReference,
               customerSegment: generalComponentData?.customerSegment?.value,
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

               portfolioPrice: portfolioPriceDataId,
               additionalPrice: portfolioAdditionalPriceDataId,
               escalationPrice: portfolioEscalationPriceDataId,

               // portfolioPrice: {
               //    portfolioPriceId: portfolioPriceAPIData.data.portfolioPriceId,
               // },
               // additionalPrice: {
               //    additionalPriceId: additionalPrice.data.additionalPriceId,
               // },
               // escalationPrice: {
               //    escalationPriceId: escalationPrice.data.escalationPriceId,
               // },

               supportLevel: value3.value,
               status: value2.value,

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

               customItems: selectedSolutionCustomItems,
               customCoverages: selectedSolutionCustomCoverages,

            };


            const priceObjRes = await updateCustomPortfolio(
               portfolioId,
               priceObjData
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
               setValue("priceAgreement");
               setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
            } else {
               throw `${priceObjRes.status}:error in update portfolio`;
            };
         } else if (e.target.id == "priceAgreement") {
            setValue("coverage");
         } else if (e.target.id == "coverage") {


            let cvgIds = [];
            setValue("coverage");
            for (let i = 0; i < selectedMasterData.length; i++) {
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
               const res = await createCustomCoverage(reqObj);
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
               solutionType: solutionTypeListKeyValue.value ?
                  solutionTypeListKeyValue.value : "EMPTY",
               solutionLevel: solutionLevelListKeyValue.value ?
                  solutionLevelListKeyValue.value : "EMPTY",
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
               lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
               supportLevel: generalComponentData.supportLevel
                  ? generalComponentData.supportLevel
                  : "EMPTY",
               customerGroup: generalComponentData.customerGroup
                  ? generalComponentData.customerGroup
                  : "EMPTY",
               searchTerm: "EMPTY",
               // supportLevel: "PREMIUM",
               supportLevel: value3.value,
               portfolioPrice: portfolioPriceDataId,
               additionalPrice: portfolioAdditionalPriceDataId,
               escalationPrice: portfolioEscalationPriceDataId,
               items: [],
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
               salesOffice: administrative.salesOffice?.value,
               offerValidity: administrative.offerValidity?.value,
               template: flagTemplate,
               visibleInCommerce: flagCommerce,
            };
            if (generalComponentData.portfolioId) {
               const updatePortfolioRes = await updateCustomPortfolio(
                  portfolioId,
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
            //    administrative.preparedBy == "" ||
            //    administrative.preparedBy == undefined) ||
            //    (administrative.approvedBy != "" &&
            //       administrative.approvedBy != undefined &&
            //       !validator.emailValidation(administrative.approvedBy)) ||
            //    (administrative.revisedBy != "" &&
            //       administrative.revisedBy != undefined &&
            //       !validator.emailValidation(administrative.revisedBy)) ||
            //    (administrative.salesOffice == "" ||
            //       administrative.salesOffice == undefined)
            // )
            // if ((administrative.preparedBy == "" ||
            //    administrative.preparedBy == undefined) ||
            //    (administrative.salesOffice == "" ||
            //       administrative.salesOffice == undefined)
            // ) {
            //    throw "Please fill mandatory fields with valid data";
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

            // Old Todo
            // let Administryobj = {
            //    ...res,
            //    visibleInCommerce: true,
            //    customerId: 0,
            //    lubricant: true,
            //    customerSegment: generalComponentData.customerSegment.value
            //       ? generalComponentData.customerSegment.value
            //       : "EMPTY",
            //    machineType: generalComponentData.machineType
            //       ? generalComponentData.machineType
            //       : "EMPTY",
            //    status: generalComponentData.status
            //       ? generalComponentData.status
            //       : "EMPTY",
            //    strategyTask: generalComponentData.strategyTask
            //       ? generalComponentData.strategyTask
            //       : "EMPTY",
            //    taskType: generalComponentData.taskType
            //       ? generalComponentData.taskType
            //       : "EMPTY",
            //    usageCategory: generalComponentData.usageCategory
            //       ? generalComponentData.usageCategory
            //       : "EMPTY",
            //    productHierarchy: generalComponentData.productHierarchy
            //       ? generalComponentData.productHierarchy
            //       : "EMPTY",
            //    geographic: generalComponentData.geographic
            //       ? generalComponentData.geographic
            //       : "EMPTY",
            //    availability: generalComponentData.availability
            //       ? generalComponentData.availability
            //       : "EMPTY",
            //    responseTime: generalComponentData.responseTime
            //       ? generalComponentData.responseTime
            //       : "EMPTY",
            //    type: generalComponentData.type ? generalComponentData.type : "EMPTY",
            //    application: generalComponentData.application
            //       ? generalComponentData.application
            //       : "EMPTY",
            //    contractOrSupport: generalComponentData.contractOrSupport
            //       ? generalComponentData.contractOrSupport
            //       : "EMPTY",
            //    solutionType: solutionTypeListKeyValue.value ?
            //       solutionTypeListKeyValue.value : "EMPTY",
            //    solutionLevel: solutionLevelListKeyValue.value ?
            //       solutionLevelListKeyValue.value : "EMPTY",
            //    // lifeStageOfMachine: generalComponentData.lifeStageOfMachine
            //    //     ? generalComponentData.lifeStageOfMachine
            //    //     : "EMPTY",
            //    lifeStageOfMachine: lifeStageOfMachineKeyValue.value,
            //    supportLevel: generalComponentData.supportLevel
            //       ? generalComponentData.supportLevel
            //       : "EMPTY",
            //    customItems: [],
            //    items: [],
            //    customCoverages: [],
            //    customerGroup: generalComponentData.customerGroup
            //       ? generalComponentData.customerGroup
            //       : "EMPTY",
            //    searchTerm: "EMPTY",
            //    // supportLevel: "PREMIUM",
            //    supportLevel: value3.value,
            //    // portfolioPrice: {},
            //    // additionalPrice: {},
            //    // escalationPrice: {},

            //    usageCategory: categoryUsageKeyValue1.value,
            //    taskType: stratgyTaskTypeKeyValue.value,
            //    strategyTask: stratgyTaskUsageKeyValue.value,
            //    responseTime: stratgyResponseTimeKeyValue.value,
            //    productHierarchy: stratgyHierarchyKeyValue.value,
            //    geographic: stratgyGeographicKeyValue.value,
            //    numberOfEvents: 0,
            //    rating: "",
            //    startUsage: "",
            //    endUsage: "",
            //    unit: "HOURS",
            //    additionals: "",
            //    preparedBy: administrative.preparedBy,
            //    approvedBy: administrative.approvedBy,
            //    preparedOn: administrative.preparedOn,
            //    revisedBy: administrative.revisedBy,
            //    revisedOn: administrative.revisedOn,
            //    salesOffice: administrative.salesOffice?.value,
            //    offerValidity: administrative.offerValidity,
            //    template: flagTemplate,
            //    visibleInCommerce: flagCommerce,

            // };

            // New Todo
            let administrativeObj = {
               name: generalComponentData.name,
               description: generalComponentData.description,
               externalReference: generalComponentData.externalReference,
               customerSegment: generalComponentData?.customerSegment?.value,
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

               portfolioPrice: portfolioPriceDataId,
               additionalPrice: portfolioAdditionalPriceDataId,
               escalationPrice: portfolioEscalationPriceDataId,


               supportLevel: value3.value,
               status: value2.value,

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

               customItems: selectedSolutionCustomItems,
               customCoverages: selectedSolutionCustomCoverages,

            };

            const administrativeRes = await updateCustomPortfolio(
               portfolioId,
               administrativeObj
            );
            if (administrativeRes.status === 200) {
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
               setViewOnlyTab({ ...viewOnlyTab, administrativeViewOnly: true });
               console.log("administrativeRes updating", administrativeRes.data);
            } else {
               throw `${administrativeRes.status}:error in update portfolio`;
            };

         }

      } catch (error) {
         console.log("somehing went wrong:", error);
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
      console.log("editAbleCustomPriceData : ", editAbleCustomPriceData);
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

      if (state && state.type == "fetch") {
         if (portfolioPriceDataIdForExiting !== "" ||
            portfolioPriceDataIdForExiting !== null ||
            portfolioPriceDataIdForExiting !== "string" ||
            portfolioPriceDataIdForExiting !== undefined
         ) {
            fetchPortfolioPriceDataById(portfolioPriceDataIdForExiting);
         }
      }
      // 
   }, [value])

   const fetchPortfolioPriceDataById = async (id) => {
      const portfolioPriceDataFetch = await getPortfolioPriceById(id);

      setPricePriceData(portfolioPriceDataFetch.data.price)
      setPriceCalculatedPrice(portfolioPriceDataFetch.data.calculatedPrice);

   };

   useEffect(() => {

      if (state && state.type == "fetch") {
         fetchCopiedPortfolioAllDetails(state.portfolioId);
         setPortfolioId(state.portfolioId);
      }


      // let itemsArrData = [];

      // for (let b = 0; b < selectedSolutionTemplateItemsVal[0].itemRelations.length; b++) {
      //    // console.log("item relations ", b + ": " + selectedSolutionTemplateItemsVal[0].itemRelations[b].portfolioItemId)
      //    // console.log("hello user -----", b)
      //    let expendedArrObj = [];
      //    let obj = selectedSolutionTemplateItemsVal[0].customItems.find(obj => obj.customItemId == selectedSolutionTemplateItemsVal[0].itemRelations[b].portfolioItemId);
      //    for (let c = 0; c < selectedSolutionTemplateItemsVal[0].itemRelations[b].bundles.length; c++) {

      //       let bundleObj = selectedSolutionTemplateItemsVal[0].customItems.find((objBundle, i) => {
      //          if (objBundle.customItemId == selectedSolutionTemplateItemsVal[0].itemRelations[b].bundles[c]) {

      //             return objBundle; // stop searching
      //          }
      //       });
      //       expendedArrObj.push(bundleObj);
      //    }

      //    for (let d = 0; d < selectedSolutionTemplateItemsVal[0].itemRelations[b].services.length; d++) {

      //       let serviceObj = selectedSolutionTemplateItemsVal[0].customItems.find((objService, i) => {
      //          if (objService.customItemId == selectedSolutionTemplateItemsVal[0].itemRelations[b].services[d]) {

      //             return objService; // stop searching
      //          }
      //       });
      //       expendedArrObj.push(serviceObj);
      //    }
      //    obj.associatedServiceOrBundle = expendedArrObj;
      //    itemsArrData.push(obj);
      // }

      // console.log("item arr is : ", itemsArrData)


      // // console.log("data are here ", location.selectedTemplateItems)
      // setGeneralComponentData({
      //    // name: location.selectedTemplateItems[0].name,
      //    // description: location.selectedTemplateItems[0].description,
      //    // serviceDescription: "",
      //    // externalReference: location.selectedTemplateItems[0].externalReference,
      //    // customerSegment: { value: location.selectedTemplateItems[0].customerSegment, label: "Energy" },
      //    // items: [],
      //    // customCoverages: [],

      //    name: selectedSolutionTemplateItemsVal[0].name,
      //    description: selectedSolutionTemplateItemsVal[0].description,
      //    serviceDescription: "",
      //    externalReference: selectedSolutionTemplateItemsVal[0].externalReference,
      //    customerSegment: { value: selectedSolutionTemplateItemsVal[0].customerSegment, label: "Energy" },
      //    items: [],
      //    customCoverages: [],
      // });
      // setPortfolioId(selectedSolutionTemplateItemsVal[0].customPortfolioId);

      // setValidityData({
      //    ...validityData,
      //    fromDate: selectedSolutionTemplateItemsVal[0].validFrom,
      //    toDate: selectedSolutionTemplateItemsVal[0].validTo,
      //    from: null,
      //    to: null,
      //    fromInput: "",
      //    toInput: "",
      // })

      // setAdministrative({
      //    // preparedBy: location.selectedTemplateItems[0].preparedBy,
      //    // approvedBy: location.selectedTemplateItems[0].approvedBy,
      //    // preparedOn: location.selectedTemplateItems[0].preparedOn,
      //    // revisedBy: location.selectedTemplateItems[0].revisedBy,
      //    // revisedOn: location.selectedTemplateItems[0].revisedOn,
      //    // salesOffice: location.selectedTemplateItems[0].salesOffice,
      //    // offerValidity: location.selectedTemplateItems[0].offerValidity

      //    preparedBy: selectedSolutionTemplateItemsVal.preparedBy,
      //    approvedBy: selectedSolutionTemplateItemsVal.approvedBy,
      //    preparedOn: selectedSolutionTemplateItemsVal.preparedOn,
      //    revisedBy: selectedSolutionTemplateItemsVal.revisedBy,
      //    revisedOn: selectedSolutionTemplateItemsVal.revisedOn,
      //    salesOffice: selectedSolutionTemplateItemsVal.salesOffice,
      //    offerValidity: selectedSolutionTemplateItemsVal.offerValidity
      // })


      // setCategoryUsageKeyValue1({
      //    // "label": location.selectedTemplateItems[0].usageCategory,
      //    // "value": location.selectedTemplateItems[0].usageCategory

      //    "label": selectedSolutionTemplateItemsVal[0].usageCategory,
      //    "value": selectedSolutionTemplateItemsVal[0].usageCategory
      // });

      // setStratgyTaskUsageKeyValue({
      //    // "label": location.selectedTemplateItems[0].strategyTask,
      //    // "value": location.selectedTemplateItems[0].strategyTask

      //    "label": selectedSolutionTemplateItemsVal[0].strategyTask,
      //    "value": selectedSolutionTemplateItemsVal[0].strategyTask
      // });

      // setStratgyTaskTypeKeyValue({
      //    // "label": location.selectedTemplateItems[0].taskType,
      //    // "value": location.selectedTemplateItems[0].taskType

      //    "label": selectedSolutionTemplateItemsVal[0].taskType,
      //    "value": selectedSolutionTemplateItemsVal[0].taskType
      // });

      // setStratgyResponseTimeKeyValue({
      //    // "label": location.selectedTemplateItems[0].responseTime,
      //    // "value": location.selectedTemplateItems[0].responseTime

      //    "label": selectedSolutionTemplateItemsVal[0].responseTime,
      //    "value": selectedSolutionTemplateItemsVal[0].responseTime
      // });

      // setStratgyHierarchyKeyValue({
      //    // "label": location.selectedTemplateItems[0].productHierarchy,
      //    // "value": location.selectedTemplateItems[0].productHierarchy

      //    "label": selectedSolutionTemplateItemsVal[0].productHierarchy,
      //    "value": selectedSolutionTemplateItemsVal[0].productHierarchy
      // });

      // setStratgyGeographicKeyValue({
      //    // "label": location.selectedTemplateItems[0].geographic,
      //    // "value": location.selectedTemplateItems[0].geographic

      //    "label": selectedSolutionTemplateItemsVal[0].geographic,
      //    "value": selectedSolutionTemplateItemsVal[0].geographic
      // });

      // setMachineTypeKeyValue({
      //    // "label": location.selectedTemplateItems[0].machineType,
      //    // "value": location.selectedTemplateItems[0].machineType

      //    "label": selectedSolutionTemplateItemsVal[0].machineType,
      //    "value": selectedSolutionTemplateItemsVal[0].machineType
      // });

      // setLifeStageOfMachineKeyValue({
      //    // "label": location.selectedTemplateItems[0].lifeStageOfMachine,
      //    // "value": location.selectedTemplateItems[0].lifeStageOfMachine

      //    "label": selectedSolutionTemplateItemsVal[0].lifeStageOfMachine,
      //    "value": selectedSolutionTemplateItemsVal[0].lifeStageOfMachine
      // });

      // // setSelectedSolutionItems(selectedSolutionTemplateItemsVal[0].customItems);
      // setSelectedSolutionItems(itemsArrData);

      var versionHistoryData = {
         portfolioId: selectedSolutionTemplateItemsVal[0].customPortfolioId,
         exitingType: "solution",
         editable: true,
      };
      localStorage.setItem('exitingType', JSON.stringify(versionHistoryData));


   }, [portfolioId])


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

      // setViewOnlyTab({
      //     generalViewOnly: true,
      //     validityViewOnly: true,
      //     strategyViewOnly: true,
      //     administrativeViewOnly: true,
      //     priceViewOnly: true,
      //     priceAgreementViewOnly: true,
      //     coverageViewOnly: true,
      // });

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
         customerSegment: { value: result.customerSegment, label: result.customerSegment },
         items: [],
         customCoverages: [],
      });

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
      });

      // set Stratgy Geographic Key-Value
      setStratgyGeographicKeyValue({
         label: result.geographic,
         value: result.geographic
      });

      // set Stratgy Machine-Type Key-Value
      setMachineTypeKeyValue({
         label: result.machineType,
         value: result.machineType
      });

      // set Stratgy LifeStage-of-Machine Key-Value
      setLifeStageOfMachineKeyValue({
         label: result.lifeStageOfMachine,
         value: result.lifeStageOfMachine
      });

      // set Stratgy Solution-Type Key-Value
      setSolutionTypeListKeyValue({
         label: result.solutionType,
         value: result.solutionType
      });

      // set Stratgy Solution-Level Key-Value
      setSolutionLevelListKeyValue({
         label: result.solutionLevel,
         value: result.solutionLevel
      });

      // set FlagTemplate 
      setFlagTemplate(result.template);

      // set Flag-Commerce 
      setFlagCommerce(result.visibleInCommerce);

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

      // set Administrative Tab Field state Value
      setAdministrative({
         preparedBy: result.preparedBy,
         approvedBy: result.approvedBy,
         preparedOn: result.preparedOn,
         revisedBy: result.revisedBy,
         revisedOn: result.revisedOn,
         salesOffice: { label: result.salesOffice, value: result.salesOffice },
         offerValidity: { label: offerValidityLabel, value: result.offerValidity },
      });


      setPortfolioId(result.customPortfolioId);

      let itemsArrData = [];
      let customItemArr = [];
      let createdCustomCoverages = [];

      for (let b = 0; b < result.itemRelations.length; b++) {
         let expendedArrObj = [];
         let obj = result.customItems.find(obj => obj.customItemId == result.itemRelations[b].portfolioItemId);
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

         obj.associatedServiceOrBundle = expendedArrObj;
         itemsArrData.push(obj);
      }
      setSelectedSolutionItems(itemsArrData);

      for (let i = 0; i < result.customItems.length; i++) {
         customItemArr.push({ customItemId: result.customItems[i].customItemId })
      }
      setSelectedSolutionCustomItems(customItemArr)

      for (let k = 0; k < result.customCoverages.length; k++) {
         createdCustomCoverages.push({ coverageId: result.customCoverages[k].customCoverageId })
      }
      setSelectedSolutionCustomCoverages(createdCustomCoverages)


      setSelectedMasterData(result.customCoverages);
      // setCreatedCustomPortfolioItems(itemsArrData);

      let itemIdData = [];
      const customItemsId = result.customItems.map((data, i) => {
         itemIdData.push({ "customItemId": parseInt(data.customItemId) })
      })
      setSelectedCustomItems(itemIdData)


      // 


      // var additionalPriceObj = Object.keys(result.additionalPrice).length;
      // console.log("additional PRice length : ", Object.keys(result.additionalPrice).length)
      // console.log("escalationPrice PRice length : ", Object.keys(result.escalationPrice).length)
      // console.log("portfolioPrice PRice length : ", Object.keys(result.portfolioPrice).length)
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
         setPriceEscalationKeyValue1({
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

   }

   const handleSnack = (snackSeverity, snackMessage) => {
      setSnackMessage(snackMessage);
      setSeverity(snackSeverity);
      setOpenSnack(true);
   };



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
      localStorage.setItem("distroyAble", true);
   }, [masterData]);

   // useEffect(() => {
   //     location.selectedTemplateItems.customItems
   // })

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
      console.log("handleEditIncludeSerialNo 3423434 row:", row);
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

   // const selectedCustomItemsColumn = 

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

   const selectedportfolioTempItemsColumn = [
      {
         name: (
            <>
               <div>ID</div>
            </>
         ),
         selector: (row) => row.customPortfolioId,
         wrap: true,
         sortable: true,
         format: (row) => row.customPortfolioId,
      },
      {
         name: (
            <>
               <div>Name</div>
            </>
         ),
         selector: (row) => row.name,
         wrap: true,
         sortable: true,
         format: (row) => row.name,
      },
      {
         name: (
            <>
               <div>Description</div>
            </>
         ),
         selector: (row) => row.description,
         wrap: true,
         sortable: true,
         format: (row) => row.description,
      },
      {
         name: (
            <>
               <div>Reference</div>
            </>
         ),
         selector: (row) => row.externalReference,
         wrap: true,
         sortable: true,
         format: (row) => row.externalReference,
      },
      {
         name: (
            <>
               <div>Response Time</div>
            </>
         ),
         selector: (row) => row.responseTime,
         wrap: true,
         sortable: true,
         format: (row) => row.responseTime,
      },
      {
         name: (
            <>
               <div>Support Level</div>
            </>
         ),
         selector: (row) => row.supportLevel,
         wrap: true,
         sortable: true,
         format: (row) => row.supportLevel,
      },
      {
         name: (
            <>
               <div>Geographic</div>
            </>
         ),
         selector: (row) => row.geographic,
         wrap: true,
         sortable: true,
         format: (row) => row.geographic,
      },
      {
         name: (
            <>
               <div>Total Events</div>
            </>
         ),
         selector: (row) => row.numberOfEvents,
         wrap: true,
         sortable: true,
         format: (row) => row.numberOfEvents,
      },
   ];

   const selectedCustomItemsColumn = [
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
               {row.customItemBodyModel.customItemPrices != null && row.customItemBodyModel.customItemPrices.length > 0 ?
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
                  </div> : <></>}
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

   const getAddportfolioItemDataFun = (data) => {
      setAddportFolioItem(data)
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
      <>
         {/* <CommanComponents /> */}
         <div className="content-body" style={{ minHeight: '884px' }}>
            <div class="container-fluid ">
               <div className="d-flex align-items-center justify-content-between mt-2">
                  <div className="d-flex justify-content-center align-items-center">
                     <h5 className="font-weight-600 mb-0">Custom Solution Template</h5>
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
                              <MenuItem
                                 className="custommenu"
                                 // data-toggle="modal"
                                 // data-target="#quotecreat"
                                 onClick={() => setConvertToPopup(true)}
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
                     <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href={undefined} className="btn-sm" style={{ cursor: "pointer" }}><i class="fa fa-pencil" aria-hidden="true" onClick={makeHeaderEditable}></i></a>
                        <a href={undefined} className="btn-sm" style={{ cursor: "pointer" }}><i class="fa fa-bookmark-o" aria-hidden="true" ></i></a>
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
                     {headerLoading ? (
                        <LoadingProgress />
                     ) : (
                        <TabContext value={value}>
                           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                 <Tab label="General" value={"general"} />
                                 <Tab label="Validity " value={"validity"} />
                                 <Tab label="Strategy" value={"strategy"} />
                                 <Tab label="Price" value={"price"} />
                                 {/* <Tab label="Price Agreement" disabled={!priceAgreementOption} value="5" /> */}
                                 <Tab label="Price Agreement" value={"priceAgreement"} />
                                 <Tab label="Coverage" value={"coverage"} />
                                 <Tab label="Administrative" value={"administrative"} />
                              </TabList>
                           </Box>
                           <TabPanel value={"general"}>
                              {!viewOnlyTab.generalViewOnly ? (
                                 <>
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
                                                </div>
                                                <div className="col-md-3 col-sm-3">
                                                    <div className="form-group">
                                                        <label className="text-light-dark font-size-12 font-weight-500">
                                                            SOLUTION ID
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control border-radius-10"
                                                            placeholder="(Auto-generated)"
                                                            value={portfolioId}
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
                                                value={generalComponentData.customerSegment}
                                                options={customerSegmentKeyValue}
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
                                 </>
                              ) : (<div className="row mt-4 ">
                                 {/* <div className="col-md-4 col-sm-3">
                                            <div className="form-group">
                                                <p className="font-size-12 font-weight-500 mb-2">
                                                    PORTFOLIO ID
                                                </p>
                                                <h6 className="font-weight-500">
                                                    {portfolioId}
                                                </h6>
                                            </div>
                                        </div> */}
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          SOLUTION{/*  NAME */} CODE
                                          {/* SOLUTION NAME */}
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {(generalComponentData.name == "" ||
                                             generalComponentData.name == null ||
                                             generalComponentData.name == "string" ||
                                             generalComponentData.name == undefined)
                                             ? "NA" : generalComponentData.name}
                                       </h6>
                                    </div>
                                 </div>
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          SOLUTION DESCRIPTION
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {(generalComponentData.description == "" ||
                                             generalComponentData.description == null ||
                                             generalComponentData.description == "string" ||
                                             generalComponentData.description == undefined)
                                             ? "NA" : generalComponentData.description}
                                       </h6>
                                    </div>
                                 </div>
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          REFERENCE
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {(generalComponentData.externalReference == "" ||
                                             generalComponentData.externalReference == null ||
                                             generalComponentData.externalReference == "string" ||
                                             generalComponentData.externalReference == undefined)
                                             ? "NA" : generalComponentData.externalReference}
                                       </h6>
                                    </div>
                                 </div>
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          CUSTOMER SEGMENT
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {(generalComponentData?.customerSegment == "" ||
                                             generalComponentData?.customerSegment == null ||
                                             generalComponentData?.customerSegment == undefined ||
                                             generalComponentData?.customerSegment?.label == "string")
                                             ? "NA" : generalComponentData?.customerSegment?.label}
                                          {/* Customer Segment */}
                                          {/* {console.log("generalComponentData.customerSegment ", generalComponentData.customerSegment)} */}
                                          {/* {generalComponentData.customerSegment} */}
                                          {/* {location.selectedTemplateItems[0].customerSegment} */}
                                       </h6>
                                    </div>
                                 </div>
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          TEMPLATE FLAG
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {flagTemplate ? "True" : "False"}
                                       </h6>
                                    </div>
                                 </div>
                                 <div className="col-md-4 col-sm-3">
                                    <div className="form-group">
                                       <p className="font-size-12 font-weight-500 mb-2">
                                          COMMERCE FLAG
                                       </p>
                                       <h6 className="font-weight-500 text-primary font-size-17">
                                          {flagCommerce ? "True" : "False"}
                                       </h6>
                                    </div>
                                 </div>
                              </div>)}
                              {/* {isView ? (
                                        <div className="row mt-4">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PORTFOLIO ID
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {portfolioId}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PORTFOLIO NAME
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {location.selectedTemplateItems[0].name}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        SERVICE PROGRAM DESCRIPTION (IF ANY)
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].description.length !== 0 ? location.selectedTemplateItems[0].description : "NA"}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        REFERENCE
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].externalReference}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CUSTOMER SEGMENT
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].customerSegment}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )} */}
                           </TabPanel>

                           <TabPanel value={"validity"}>

                              <div className="row mt-4 input-fields">
                                 <div className="col-md-12">
                                    <div className="row input-fields">
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
                                             >TO</label>
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
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
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
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
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
                              {!viewOnlyTab.strategyViewOnly ? (
                                 <>
                                    <div className="row input-fields">
                                       {/* <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
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
                                                    htmlFor="exampleInputEmail1"
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
                                                    htmlFor="exampleInputEmail1"
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
                                                    htmlFor="exampleInputEmail1"
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
                                                htmlFor="exampleInputEmail1"
                                             >
                                                RESPONSE TIME
                                             </label>
                                             <Select
                                                options={rTimeList}
                                                value={stratgyResponseTimeKeyValue}
                                                onChange={(e) => setStratgyResponseTimeKeyValue(e)}
                                                className="text-primary"
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
                                                options={productList}
                                                value={stratgyHierarchyKeyValue}
                                                onChange={(e) => setStratgyHierarchyKeyValue(e)}
                                                className="text-primary"
                                             />
                                             {/* <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" /> */}
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
                                                options={geographicList}
                                                value={stratgyGeographicKeyValue}
                                                onChange={(e) => setStratgyGeographicKeyValue(e)}
                                                placeholder="Geographic"
                                                className="text-primary"
                                             />
                                          </div>
                                       </div>
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
                                       {/* <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-500"
                                                    htmlFor="exampleInputEmail1"
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
                                                    htmlFor="exampleInputEmail1"
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
                                 </>) :
                                 (
                                    <>
                                       <div className="row">
                                          {/* <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CATEGORY USAGE
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {(console.log("categoryUsageKeyValue1 : ", categoryUsageKeyValue1))}
                                                        {(categoryUsageKeyValue1.label)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        STRATEGY TASK
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {(stratgyTaskUsageKeyValue.label)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        TASK TYPE
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {(stratgyTaskTypeKeyValue.label)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
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
                                                   RESPONSE TIME
                                                </p>
                                                <h6 className="font-weight-500 text-primary font-size-17">
                                                   {(stratgyResponseTimeKeyValue?.label == "" ||
                                                      stratgyResponseTimeKeyValue?.label == null ||
                                                      stratgyResponseTimeKeyValue?.label == "string" ||
                                                      stratgyResponseTimeKeyValue?.label == undefined)
                                                      ? "NA" : stratgyResponseTimeKeyValue?.label}
                                                </h6>
                                             </div>
                                          </div>
                                          <div className="col-md-4 col-sm-4">
                                             <div className="form-group">
                                                <p className="font-size-12 font-weight-500 mb-2">
                                                   PRODUCT HIERARCHY
                                                </p>
                                                <h6 className="font-weight-500 text-primary font-size-17">
                                                   {(stratgyHierarchyKeyValue?.label == "" ||
                                                      stratgyHierarchyKeyValue?.label == null ||
                                                      stratgyHierarchyKeyValue?.label == "string" ||
                                                      stratgyHierarchyKeyValue?.label == undefined)
                                                      ? "NA" : stratgyHierarchyKeyValue?.label}
                                                </h6>
                                             </div>
                                          </div>
                                          <div className="col-md-4 col-sm-4">
                                             <div className="form-group">
                                                <p className="font-size-12 font-weight-500 mb-2">
                                                   GEOGRAPHIC
                                                </p>
                                                <h6 className="font-weight-500 text-primary font-size-17">
                                                   {(stratgyGeographicKeyValue?.label == "" ||
                                                      stratgyGeographicKeyValue?.label == null ||
                                                      stratgyGeographicKeyValue?.label == "string" ||
                                                      stratgyGeographicKeyValue?.label == undefined)
                                                      ? "NA" : stratgyGeographicKeyValue?.label}
                                                </h6>
                                             </div>
                                          </div>
                                          <div className="col-md-4 col-sm-4">
                                             <div className="form-group">
                                                <p className="font-size-12 font-weight-500 mb-2">
                                                   SOLUTION TYPE
                                                </p>
                                                <h6 className="font-weight-500 text-primary font-size-17">
                                                   {(solutionTypeListKeyValue?.label == "" ||
                                                      solutionTypeListKeyValue?.label == null ||
                                                      solutionTypeListKeyValue?.label == "string" ||
                                                      solutionTypeListKeyValue?.label == undefined)
                                                      ? "NA" : solutionTypeListKeyValue?.label}
                                                </h6>
                                             </div>
                                          </div>
                                          <div className="col-md-4 col-sm-4">
                                             <div className="form-group">
                                                <p className="font-size-12 font-weight-500 mb-2">
                                                   SOLUTION LEVEL
                                                </p>
                                                <h6 className="font-weight-500 text-primary font-size-17">
                                                   {(solutionLevelListKeyValue?.label == "" ||
                                                      solutionLevelListKeyValue?.label == null ||
                                                      solutionLevelListKeyValue?.label == "string" ||
                                                      solutionLevelListKeyValue?.label == undefined)
                                                      ? "NA" : solutionLevelListKeyValue?.label}
                                                </h6>
                                             </div>
                                          </div>
                                          {/* <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        MACHINE TYPE
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {(machineTypeKeyValue.label)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        LIFE STAGE
                                                    </p>
                                                    <h6 className="font-weight-500">
                                                        {(lifeStageOfMachineKeyValue.label)}
                                                        {console.log("object123")}
                                                    </h6>
                                                </div>
                                            </div> */}
                                       </div>
                                    </>
                                 )
                              }

                              {/* {isView ? (
                                        <div className="row">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        STRATEGY TASK
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].strategyTask}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        CATEGORY USAGE
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].usageCategory}</h6>
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
                                                        {location.selectedTemplateItems[0].responseTime}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        PRODUCT HIERARCHY
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].productHierarchy}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <p className="font-size-12 font-weight-500 mb-2">
                                                        GEOGRAPHIC
                                                    </p>
                                                    <h6 className="font-weight-500">{location.selectedTemplateItems[0].geographic}</h6>
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
                                             <div className="css-w8dmq8">*Mandatory</div>
                                          </div>
                                       </div>
                                       <div className="col-md-4 col-sm-4">
                                          <div className="form-group">
                                             <label
                                                className="text-light-dark font-size-14 font-weight-500"
                                                htmlFor="exampleInputEmail1"
                                             >
                                                {/* PRICE{" "} */}NET PRICE{" "}
                                             </label>
                                             <input
                                                type="email"
                                                className="form-control border-radius-10 text-primary"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                // placeholder="$100"
                                                placeholder="Auto Created"
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
                                                <div className="">
                                                   <Select
                                                      onChange={(e) => setPriceAdditionalHeadKeyValue1(e)}
                                                      className="text-primary"
                                                      isClearable={true}
                                                      // value={options}
                                                      options={priceHeadTypeKeyValue}
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
                                                   onChange={(e) => setPriceEscalationKeyValue1(e)}
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
                                    {/* <div className="row input-fields">

                                    </div> */}
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
                                                type="email"
                                                className="form-control border-radius-10 text-primary"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                // placeholder="$100"
                                                placeholder="Auto Created"
                                                value={priceCalculatedPrice}
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
                                                PRICE BREAK DOWN
                                             </label>
                                             <div className=" d-flex form-control-date">
                                                <Select
                                                   className="select-input text-primary"
                                                   defaultValue={selectedOption}
                                                   onChange={setSelectedOption}
                                                   options={priceHeadTypeKeyValue}
                                                   // options={options}
                                                   placeholder="placeholder "
                                                />
                                                <input
                                                   type="email"
                                                   className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
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
                                                {/* PRICE{" "} */}NET PRICE{" "}
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
                                    // type="button"
                                    // onClick={() => setValue("6")}
                                    // className="btn btn-light"
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
                                    className="row align-items-center m-0 "
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
                                                         className="form-controldate border-radius-10 text-primary"
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
                                                      <div className="css-w8dmq8">*Mandatory</div>
                                                   </MuiPickersUtilsProvider>
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
                                                   <span className=" mr-2">REVISED ON</span>
                                                </label>

                                                <div className="form-group w-100">
                                                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <DatePicker
                                                         variant="inline"
                                                         format="dd/MM/yyyy"
                                                         className="form-controldate border-radius-10 text-primary"
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
                                                value={administrative.salesOffice?.value}
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
                                 </> : (<div className="row">
                                    <div className="col-md-4 col-sm-4">
                                       <div className="form-group">
                                          <p className="font-size-12 font-weight-500 mb-2">
                                             PREPARED BY
                                             {/* {console.log("new dataa : ", coverageData.machineType)} */}
                                          </p>
                                          <h6 className="font-weight-500 text-primary font-size-17">
                                             {(administrative?.preparedBy == "" ||
                                                administrative?.preparedBy == null ||
                                                administrative?.preparedBy == "string" ||
                                                administrative?.preparedBy == undefined)
                                                ? "NA" : administrative?.preparedBy}
                                          </h6>
                                       </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                       <div className="form-group">
                                          <p className="font-size-12 font-weight-500 mb-2">
                                             APPROVED BY
                                          </p>
                                          <h6 className="font-weight-500 text-primary font-size-17">
                                             {(administrative?.approvedBy == "" ||
                                                administrative?.approvedBy == null ||
                                                administrative?.approvedBy == "string" ||
                                                administrative?.approvedBy == undefined)
                                                ? "NA" : administrative?.approvedBy}
                                          </h6>
                                       </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                       <div className="form-group">
                                          <p className="font-size-12 font-weight-500 mb-2">
                                             PREPARED ON
                                          </p>
                                          <h6 className="font-weight-500 text-primary font-size-17">
                                             {(
                                                administrative.preparedOn == "" ||
                                                   administrative.preparedOn == "string" ||
                                                   administrative.preparedOn == undefined ||
                                                   administrative.preparedOn == null
                                                   ? "NA" :
                                                   getFormattedDateTimeByTimeStamp(administrative.preparedOn)
                                             )}
                                          </h6>
                                       </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                       <div className="form-group">
                                          <p className="font-size-12 font-weight-500 mb-2">
                                             REVISED BY
                                          </p>
                                          <h6 className="font-weight-500 text-primary font-size-17">
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
                                          <h6 className="font-weight-500 text-primary font-size-17">
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
                                          <h6 className="font-weight-500 text-primary font-size-17">
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
                                          <h6 className="font-weight-500 text-primary font-size-17">
                                             {(
                                                administrative.offerValidity == "" ||
                                                   administrative.offerValidity == "string" ||
                                                   administrative.offerValidity == undefined ||
                                                   administrative.offerValidity == null
                                                   ? "NA" : administrative.offerValidity?.label)}
                                          </h6>
                                       </div>
                                    </div>
                                 </div>)}
                           </TabPanel>
                        </TabContext>
                     )}
                  </Box>

               </div>
               {/* hide portfolio item querySearch */}
               <div className="card mt-4 px-4">
                  {headerLoading ? <></> :
                     <>
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
                     </>
                  }

                  <div className="" style={{ minHeight: 200, height: "auto", width: '100%', backgroundColor: '#fff' }}>
                     {headerLoading ? <></> :
                        <>
                           <DataTable
                              className=""
                              title=""
                              columns={selectedCustomItemsColumn}
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
                        </>}
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
                                    control={<Switch disabled={needOnlyParts} />}
                                    label="With Spare Parts"
                                    // label="With Parts"
                                    onChange={(e) => handleWithSparePartsCheckBox(e, "with")}
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
                  <Modal.Body>
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
                     <Button variant="primary">Save changes</Button>
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
                     </> : <></>}
                     <div className="d-flex align-items-center justify-content-between">
                        <button class="btn  btn-primary" onClick={() => handleCreateQuote()}>Create</button>
                        <button
                           type="button"
                           class="btn pull-right border"
                           data-dismiss="modal"
                           onClick={() => setConvertToPopup(false)}
                        >
                           Cancel
                        </button>
                     </div>
                     {/* <button type="button" className="btn  btn-primary w-100" onClick={createNewVersion}>Create </button>
                    <button type="button" className="btn btn-primary w-100" onClick={() => setVersionPopup(false)}>Cancel</button> */}
                  </Modal.Footer>
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
