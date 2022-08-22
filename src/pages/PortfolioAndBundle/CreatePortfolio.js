import React, { useEffect, useState } from "react";
import { Modal, SplitButton, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import FormGroup from "@mui/material/FormGroup";
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
import SearchIcon from '@mui/icons-material/Search';
import shearchIcon from "../../assets/icons/svg/search.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as ENUM from "./CONSTS.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import deleticon from "../../assets/images/delete.png";
import link1Icon from "../../assets/images/link1.png";
import penIcon from "../../assets/images/pen.png";

import { ReactTableNested } from "../Test/ReactTableNested";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DataTable from "react-data-table-component";



import boxicon from "../../assets/icons/png/box.png";

import Portfoliosicon from "../../assets/icons/svg/Portfolios-icon.svg";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import contract from "../../assets/icons/svg/contract.svg";
import repairicon from "../../assets/icons/svg/repair-icon.svg";
import Table from 'react-bootstrap/Table';


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
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation,
  createCoverage
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
import { Link } from "react-router-dom";
import $ from "jquery"
import { display } from "@mui/system";
import { CreateService } from "pages/Service";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
      color: "#fff"
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};



export function CreatePortfolio() {
  const [makeKeyValue, setMakeKeyValue] = useState([]);
  const [modelKeyValue, setModelKeyValue] = useState([]);
  const [prefixKeyValue, setPrefixKeyValue] = useState([]);
  const [validityKeyValue, setValidityKeyValue] = useState([]);
  const [headerType, setHeaderType] = useState(null);
  const [headerTypeKeyValue, setHeaderTypeKeyValue] = useState([]);
  const [responseTimeTaskKeyValue, setResponseTimeTaskKeyValue] = useState([]);
  const [taskTypeKeyValue, setTaskTypeKeyValue] = useState([]);

  const [value1, setValue1] = useState({ value: 'Archived', label: 'Archived' });
  const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
  const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });


  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState([]);
  const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
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
  const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([]);
  const [strategyOptionals, setStrategyOptionals] = useState([]);

  const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
  const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);
  const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
  const [stratgyOptionalsKeyValue, setStratgyOptionalsKeyValue] = useState([]);
  const [stratgyResponseTimeKeyValue, setStratgyResponseTimeKeyValue] =
    useState([]);
  const [stratgyHierarchyKeyValue, setStratgyHierarchyKeyValue] = useState([]);
  const [stratgyGeographicKeyValue, setStratgyGeographicKeyValue] = useState(
    []
  );

  const [masterData, setMasterData] = useState([])
  const [filterMasterData, setFilterMasterData] = useState([])
  const [selectedMasterData, setSelectedMasterData] = useState([])
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
    strategyTask: null,
    taskType: null,
    categoryUsage: null,
    options: null,
    responseTime: null,
    productHierarchy: null,
    geographic: null,
  });
  const handleOption = (e) => {
    setValue1(e)
  }
  const handleOption2 = (e) => {
    setValue2(e)
  }
  const handleOption3 = (e) => {
    setValue3(e)
  }
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
  const [alignment, setAlignment] = useState("Portfolio");
  const [prefixLabelGeneral, setPrefixLabelGeneral] = useState("PORTFOLIO");
  const [priceAgreementOption, setPriceAgreementOption] = useState(false);
  const [open2, setOpen2] = useState(false);
  // const handleOpen2 = () => setOpen2(true);
  // const handleClose2 = () => setOpen2(false);


  const [count, setCount] = useState(1)
  const [updateCount, setUpdateCount] = useState(0)
  const [querySearchSelector, setQuerySearchSelector] = useState([{
    id: 0,
    selectFamily: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: ""
  }])

  const [autoState, setAutoState] = useState({
    value: '',
    suggestions: []
  })

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
    repairOption: ""

  })
  const [addMiniPortFolioItem, setAddMiniportFolioItem] = useState({
    id: "",
    description: "",
    usageIn: categoryUsageKeyValue1,
    taskType: "",
  })
  const [showRelatedModel, setShowRelatedModel] = useState(false)
  const [editSerialNo, setEditSerialNo] = useState({
    coverageId: "",
    make: "",
    family: "",
    modelNo: "",
    serialNoPrefix: "",
    startSerialNo: "",
    endSerialNo: "",
    fleet: "",
    fleetSize: ""
  })

  const [itemHeaderSearch, setItemHeaderSearch] = useState({
    searchBy: "",
    family: "",
    inputField: ""
  })
  const [priceCalculator, setPriceCalculator] = useState({
    priceType: "",
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
    totalPrice: 1200
  })
  const [openMiniBundleItem, setOpenMiniBundleItem] = useState(false)
  const [serviceOrBundleShow, setServiceOrBundleShow] = useState(false)
  const [serviceOrBundlePrefix, setServiceOrBundlePrefix] = useState("")
  const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
    id: '',
    description: "",
    bundleFlag: "",
    reference: "",
    customerSegment: "",
    make: "",
    models: "",
    prefix: "",
    machine: "",
    additional: "",
  })
  const [serviceOrBundleList, setServiceOrBundleList] = useState([])
  const [tabs, setTabs] = useState("2")

  const frequencyOptions = [
    { label: "Cyclic", value: "Cyclic" },
    { label: "once", value: "once" },
    { label: "alternate", value: "alternate" },
    { label: "Custom", value: "Custom" }
  ]
  const handleCustomerSegmentChange = (e) => {
    setGeneralComponentData({
      ...generalComponentData,
      customerSegment: e,
    });
  };

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
    setPrefixLabelGeneral(newAlignment.toUpperCase());
  };

  const handleMenuItemClick = (event, index) => {
    alert();
    // setSelectedIndex(index);
    // setAnchorEl(null);
  };

  const handleHeaderTypeChange = (e) => {
    setPrefixLabelGeneral(e.value);
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

  const handleBundleItemSaveAndContinue = async () => {
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
          status: "NEW"
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
          totalPrice: 0
        },
      }
      const itemRes = await itemCreation(reqObj)
      console.log("itemCreation res:", itemRes)
      if (itemRes.status !== 200) {
        alert("something went wrong")
        return
      }
      const _generalComponentData = { ...generalComponentData }
      _generalComponentData.items?.push({ itemId: itemRes.data.itemId })
      setGeneralComponentData(_generalComponentData)
      // put API for porfolio update Item id 
      // call here

      const { portfolioId, ...res } = generalComponentData
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
        coverages: [],
        items: _generalComponentData.items,
        usageCategory: categoryUsageKeyValue1.value,
        taskType: stratgyTaskTypeKeyValue.value,
        strategyTask: stratgyTaskUsageKeyValue.value,
        responseTime: stratgyResponseTimeKeyValue.value,
        productHierarchy: stratgyHierarchyKeyValue.value,
        geographic: stratgyGeographicKeyValue.value,

      }
      if (generalComponentData.portfolioId) {
        const updatePortfolioRes = await updatePortfolio(generalComponentData.portfolioId, obj)

        console.log("portfolio updated:", updatePortfolioRes)

      }


      setOpen2(false)   //Hide Price Calculator Screen
      setGeneralComponentData(_generalComponentData)
      setBundleItems([...bundleItems, itemRes.data])
      // setServiceOrBundleList([itemRes.data])

      // dispatch(portfolioItemActions.createItem(createItemPayload(taskItemList)));
      // alert("Save And Continue")
      // var temp = [...bundleItems];
      // var bundleId = Math.floor(Math.random() * 100)
      // var dict = {
      //     id: 1,
      //     bundleId: "PM" + bundleId,
      //     bundleDescription: 'Preventive Maintenance ' + bundleId,
      //     strategy: 'Preventive Maintenance',
      //     standardJobId: 'SJ1034',
      //     frequency: '125 hours',
      //     quantity: '4',
      //     part: '$1250',
      //     service: '$350',
      //     total: '$1575',
      //     action: "-"
      // }
      // temp.push(dict)
      // setBundleItems(temp)
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      // toast('👏 Item Added', {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      // });


      // }
      // else {
      //   toast("🙄 Please create item header first", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }
    } catch (error) {
      console.log("error in item creation err:", error)
    }

  };

  const saveAddNewServiceOrBundle = async () => {
    try {
      // alert("handleAddNewServiceOrBundle called")
      let reqObj = {
        itemId: 0,
        itemName: "",
        itemHeaderModel: {
          itemHeaderId: 0,
          // itemHeaderId: parseInt(generalComponentData.portfolioId),
          itemHeaderDescription: createServiceOrBundle.description,
          bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
          reference: createServiceOrBundle.reference,
          itemHeaderMake: createServiceOrBundle.make,
          itemHeaderFamily: "",
          model: createServiceOrBundle.models,
          prefix: createServiceOrBundle.prefix,
          type: "MACHINE",
          additional: createServiceOrBundle.additional,
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
          status: "NEW"
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
          totalPrice: 0
        },
      }
      setOpen2(false)   //Hide Price Calculator Screen

      const res = await itemCreation(reqObj)
      console.log("service or bundle res:", res)
      if (res.status !== 200) {
        alert("something went wrong")
        return
      }
      // call update API for portfolio to update item with service or bundle 
      const _bundleItems = [...bundleItems]

      if (_bundleItems[0].associatedServiceOrBundle) {
        _bundleItems[0].associatedServiceOrBundle.push(res.data)
      } else {
        _bundleItems[0] = { ..._bundleItems[0], associatedServiceOrBundle: [res.data] }
      }
      setBundleItems(_bundleItems)




    } catch (error) {
      console.log("itemCreation err:", error)
    }

  }

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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // alert()
    setCreateNewBundle(false);
  };

  const handleNewBundleItem = () => {
    setOpenAddBundleItem(true);
    // setOpenMiniBundleItem(true)
    setOpenSearchSolution(false);
    setCreateNewBundle(false);
    setOpenAddBundleItemHeader("Add New Portfolio Item");
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
  const handleNextClick = (e) => {
    value < 6 && setValue(value + 1);
    if (e.target.id == "general") {

      let reqData = {
        type: prefixLabelGeneral,
        name: generalComponentData.name,
        description: generalComponentData.description,
        externalReference: generalComponentData.externalReference,
        customerSegment: generalComponentData.customerSegment ? generalComponentData.customerSegment.value : "",

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
      };
      console.log("Portfolio creation reqObj", reqData);
      createPortfolio(reqData)
        .then((res) => {
          console.log("portFolio id", res.portfolioId);
          setGeneralComponentData({
            ...generalComponentData,
            portfolioId: res.portfolioId,
          });
          setPortfolioId(res.portfolioId);
        })
        .catch((err) => {
          console.log("err in createPortfolio", err);
        });
    } else if (e.target.id == "validity") {
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
      // service Call for updating Date
      setGeneralComponentData({
        ...generalComponentData,
        ...reqData,
      });

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

      const { portfolioId, ...res } = generalComponentData
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
        items: [],
        coverages: [],
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

      }
      updatePortfolio(generalComponentData.portfolioId, obj)
        .then((res) => {
          console.log("strategy updating", res);
        })
        .catch((err) => {
          console.log(" Error in strategy updating", err);
        });
    } else if (e.target.id == "coverage") {
      let cvgIds = []
      const tempFun = async () => {
        try {
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
              createdAt: ""
            }
            const res = await createCoverage(reqObj)
            console.log("createCoverage res:", res)
            cvgIds.push({ coverageId: res.coverageId })
          }
          setGeneralComponentData({ ...generalComponentData, coverages: cvgIds })
          const { portfolioId, ...res } = generalComponentData
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
            items: [],
            customerGroup: generalComponentData.customerGroup
              ? generalComponentData.customerGroup
              : "EMPTY",
            searchTerm: "EMPTY",
            supportLevel: "EMPTY",
            portfolioPrice: {},
            additionalPrice: {},
            escalationPrice: {},
            coverages: cvgIds,
            usageCategory: categoryUsageKeyValue1.value,
            taskType: stratgyTaskTypeKeyValue.value,
            strategyTask: stratgyTaskUsageKeyValue.value,
            responseTime: stratgyResponseTimeKeyValue.value,
            productHierarchy: stratgyHierarchyKeyValue.value,
            geographic: stratgyGeographicKeyValue.value,

          }
          if (generalComponentData.portfolioId) {
            const updatePortfolioRes = await updatePortfolio(generalComponentData.portfolioId, obj)
            console.log("portfolio updated")

          }


        } catch (error) {
          console.log("err in createCoverage", error)
          alert(error)
          return
        }

      }
      tempFun()
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
        .catch((err) => { console.log("error:", err) });
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
  // const usageIn=useSelector((state)=>state.task.categoryList)
  // console.log("useSelector((state)=>state.categoryList)",usageIn)

  useEffect(() => {
    const portfolioId = 80;
    getPortfolioDetails(portfolioId);
    initFetch();
    dispatch(taskActions.fetchTaskList());

  }, [dispatch]);
  // useEffect(() => {


  // }, []);


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

    // console.log("e.target.value", e.target.value);
    setCategoryUsageKeyValue1(e);
    dispatch(taskActions.updateList(e.value));
  };

  const HandleStrategyUsage = (e) => {
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

  const activityOptions = ["None", "Atria", "Callisto"];
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

  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.selectFamily = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.selectOperator = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }

  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value).then((res) => {
      obj.selectOptions = res
      tempArray[id] = obj
      setQuerySearchSelector([...tempArray]);
      $(`.scrollbar-${id}`).css("display", "block")
    }).catch((err) => {
      console.log("err in api call", err)
    })
    obj.inputSearch = e.target.value

  }

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.inputSearch = currentItem
    obj.selectedOption = currentItem
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
    $(`.scrollbar-${id}`).css("display", "none")
  }

  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none")
    console.log("handleQuerySearchClick", querySearchSelector)
    if (querySearchSelector[0]?.selectFamily?.value == "" || querySearchSelector[0]?.inputSearch == "" || querySearchSelector[0]?.selectFamily?.value === undefined) {
      alert("please fill data properly for search")
      return
    }
    var searchStr = querySearchSelector[0]?.selectFamily?.value + "~" + querySearchSelector[0]?.inputSearch

    for (let i = 1; i < querySearchSelector.length; i++) {
      if (querySearchSelector[i]?.selectOperator?.value == "" || querySearchSelector[i]?.selectFamily?.value == "" || querySearchSelector[i]?.inputSearch == "") {
        alert("please fill data properly for search")
        return
      }
      searchStr = searchStr + " " + querySearchSelector[i].selectOperator.value + " " + querySearchSelector[i].selectFamily.value + "~" + querySearchSelector[i].inputSearch
    }

    console.log("searchStr", searchStr)
    getSearchQueryCoverage(searchStr).then((res) => {
      console.log("search Query Result :", res)
      setMasterData(res)

    }).catch((err) => {
      console.log("error in getSearchQueryCoverage", err)
    })

  }

  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([...querySearchSelector, {
      id: count,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: ""
    }])
    setCount(count + 1)
  }

  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([])
    setCount(0)
    setMasterData([])
    setFilterMasterData([])
    setSelectedMasterData([])
  }

  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData]
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked }
        } else return currentItem
      })
      setMasterData([...updated])
      setFilterMasterData([...filterMasterData, { ...row }])
    } else {
      var _masterData = [...masterData]
      const updated1 = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked }
        } else return currentItem
      })
      setMasterData([...updated1])
      var _filterMasterData = [...filterMasterData]
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id)
          return currentItem
      })
      setFilterMasterData(updated)
    }

  }

  const handleDeleteIncludeSerialNo = (e, row) => {
    const updated = selectedMasterData.filter((obj) => {
      if (obj.id !== row.id)
        return obj
    })
    setSelectedMasterData(updated)
  }
  const handleEditIncludeSerialNo = (e, row) => {
    console.log("handleEditIncludeSerialNo row:", row)
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
    }
    setEditSerialNo(obj)

  }
  const columns = [
    {
      name: (
        <>
          <div><Checkbox className="text-white" {...label} /></div>
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
          <div>
            Serial No
          </div>
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
      cell: (row) => <div><img className="mr-2" src={penIcon} /><img className="mr-2" src={deleticon} /><img src={link1Icon} /></div>,
    },
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
      cell: (row) => <Checkbox className="text-black" checked={row.check1} onChange={(e) => handleMasterCheck(e, row)} />,
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
      cell: (row) =>
        <div>
          <Link to="#" onClick={(e) => handleEditIncludeSerialNo(e, row)} className="btn-svg text-white cursor mx-2" data-toggle="modal" data-target="#AddCoverage">
            <svg version="1.1" viewBox="0 0 1696.162 1696.143" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="pen"><path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" /></g><g id="Layer_1" /></svg>
          </Link>
          <Link to="#" onClick={(e) => handleDeleteIncludeSerialNo(e, row)} className="btn-svg text-white cursor mr-2"><svg data-name="Layer 41" id="Layer_41" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path className="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path className="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg></Link>
          <Link to="#" className="btn-svg text-white cursor " onClick={() => setShowRelatedModel(true)}><svg data-name="Layer 1" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'none', width: '18px', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2px' }}><title /><g data-name="&lt;Group&gt;" id="_Group_"><path className="cls-1" d="M13.38,10.79h0a3.5,3.5,0,0,1,0,5L10.52,18.6a3.5,3.5,0,0,1-5,0h0a3.5,3.5,0,0,1,0-5l.86-.86" data-name="&lt;Path&gt;" id="_Path_" /><path className="cls-1" d="M11,13.21h0a3.5,3.5,0,0,1,0-5L13.81,5.4a3.5,3.5,0,0,1,5,0h0a3.5,3.5,0,0,1,0,5l-.86.86" data-name="&lt;Path&gt;" id="_Path_2" /></g></svg></Link>
        </div>,
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
          <div>
            Repair Options
          </div>
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
          <div>
            Frequency
          </div>

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
      cell: (row) =>
        <div>
          {/* <Select
            options={[{ label: "Service", value: "Service" }, { label: "Bundle", value: "Bundle" }]}
            placeholder="Include"
          /> */}
          <div className="m-2 cursor" onClick={handleBundleItemOpen}>Add Bundle</div>
          <div className="cursor" onClick={handleServiceItemOpen}>Add Service</div>

        </div>,
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
      cell: (row) => <div><Select className="customselect" options={[{ label: "12345", value: "12345" }, { label: "12345", value: "12345" },]} /></div>,
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
      cell: (row) =>
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
      cell: (row) =>
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
    },

  ];
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
    console.log("handleGetheaderSearch")
    let { searchBy, family, inputField } = itemHeaderSearch
    if (searchBy.value == "" || family.value === "" || inputField == "") {
      alert("Please select/fill values properly")
      return
    }
    const searchStr = `${family.value}~${inputField}`
    if (searchBy.value === "portfolioItem") {
      console.log("service called...")
    }

  }

  const handleServiceItemOpen = () => {
    setServiceOrBundlePrefix("SERVICE")
    setServiceOrBundleShow(true)
    console.log("handleServiceItemOpen")
  }
  const handleBundleItemOpen = () => {
    setServiceOrBundlePrefix("BUNDLE")
    setServiceOrBundleShow(true)
    console.log("handleBundleItemOpen")
  }

  const handleAddServiceBundleChange = (e) => {
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      [e.target.name]: e.target.value
    })

  }
  const handleAddNewServiceOrBundle = () => {
    setServiceOrBundleShow(false)
    if (serviceOrBundlePrefix === "SERVICE") {
      setOpen2(true)
    }
    if (serviceOrBundlePrefix === "BUNDLE") {
      setOpenAddBundleItem(true);
    }
  }




  // const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const ExpandedComponent = ({ data }) => <>
    {/* <Table className="ml-5">
      <tbody>
        {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
          <div className="sc-evZas cMMpBL rdt_TableRow" key={i}>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemId}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.itemBodyDescription}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemHeaderModel.strategy}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.standardJobId}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.repairOption}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.frequency}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.quantity}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.sparePartsPrice}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.servicePrice}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">{bundleAndService.itemBodyModel.totalPrice}</div>
            <div className="sc-iBkjds eLCUDv hUvRIg">icon1 icon2</div>

          </div>
        ))}
      </tbody>
    </Table> */}


    {data.associatedServiceOrBundle?.map((bundleAndService, i) => (
      <div id="row-0" role="row" className="sc-evZas cMMpBL rdt_TableRow" style={{backgroundColor:"#f1f1f1"}} >
        <div className="sc-iBkjds sc-iqcoie iXqCvb bMkWco"  >

        </div>
        <div id="cell-1-undefined" data-column-id="1" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div>{bundleAndService.itemId}</div>
        </div>
        <div id="cell-2-undefined" data-column-id="2" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.itemBodyDescription}</div>
        </div>
        <div id="cell-3-undefined" data-column-id="3" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemHeaderModel.strategy}</div>
        </div>
        <div id="cell-4-undefined" data-column-id="4" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.standardJobId}</div>
        </div>
        <div id="cell-5-undefined" data-column-id="5" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eVkrRQ bzejeY rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.repairOption}</div>
        </div>
        <div id="cell-6-undefined" data-column-id="6" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.frequency}</div>
        </div>
        <div id="cell-7-undefined" data-column-id="7" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.quantity}</div>
        </div>
        <div id="cell-8-undefined" data-column-id="8" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.sparePartsPrice}</div>
        </div>
        <div id="cell-9-undefined" data-column-id="9" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.servicePrice}</div>
        </div>
        <div id="cell-10-undefined" data-column-id="10" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv bIEyyu rdt_TableCell" data-tag="allowRowEvents">
          <div data-tag="allowRowEvents">{bundleAndService.itemBodyModel.totalPrice}</div>
        </div>
        <div id="cell-11-undefined" data-column-id="11" role="gridcell" className="sc-iBkjds sc-ftvSup sc-papXJ hUvRIg eLCUDv kVRqLz rdt_TableCell" data-tag="allowRowEvents">
          <div>
            <div className="m-2 cursor">icon1 </div>
          </div>
        </div>
      </div>
    ))}
  </>;


  return (
    <>
      <CommanComponents />
      {/* <CreateService/> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            {/* <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5> */}
            <div className="d-flex">
              <div className="ml-3">
                {portfolioId ? generalComponentData.name : ""}
              </div>
              <div className="ml-3">
                <Select className="customselectbtn1" onChange={(e) => handleOption3(e)} options={options3} value={value3} />
              </div>
              <div className="ml-3">
                <Select className="customselectbtn" onChange={(e) => handleOption2(e)} options={options2} value={value2} />
              </div>
              <div className="rating-star">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>

            </div>
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
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3" style={{ whiteSpace: "pre" }}>
                  {portfolioId ? "Portfolio Details" : "New Portfolio*"}
                </span>
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
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="General" value={1} />
                    <Tab label="Validity " value={2} />
                    <Tab label="Strategy" value={3} />
                    <Tab label="Price" value={4} />
                    <Tab
                      label="Price Agreement"
                      disabled={!priceAgreementOption}
                      value={5}
                    />
                    <Tab label="Coverage" value={6} />
                  </TabList>
                </Box>
                <TabPanel value={1}>
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
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          {prefixLabelGeneral} ID
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10"
                          placeholder="(Auto-generated)"
                          // value={portfolioId}
                          // onChange={handleGeneralInputChange}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          {prefixLabelGeneral} NAME
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
                          SERVICE {prefixLabelGeneral} DESCRIPTION (IF ANY)
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
                          <h6 className="font-weight-600">
                            CVA - Premium plan
                          </h6>
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
                </TabPanel>
                <TabPanel value={2}>
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
                          <h6 className="font-weight-600">OR</h6>
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
                  {/* <div className="row mt-4">
                                        <div className="col-md-6 col-sm-6">

                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">DATE</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">FROM</small>31st October 2021</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">TO</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">30st October 2022</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="d-flex align-items-center">
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">FROM</label>
                                                <div className="form-group w-100 text-center">
                                                    <h6 className="font-weight-600 mb-0"><small className="mr-2">HOURS</small>10,000 hours</h6>
                                                </div>
                                                <label className="text-light-dark font-size-12 font-weight-500  mx-2 form-group" for="exampleInputEmail1">HR</label>
                                                <div className="form-group w-100">
                                                    <h6 className="font-weight-600 mb-0">15,000 hours</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
                <TabPanel value={3}>
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
                          onChange={(e) => setStratgyTaskTypeKeyValue(e)}
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
                  </div>
                  {isView ? (
                    <div className="row">
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            STRATEGY TASK
                          </p>
                          <h6 className="font-weight-600">PM</h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            CATEGORY USAGE
                          </p>
                          <h6 className="font-weight-600">Contract</h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            OPTIONALS
                          </p>
                          <h6 className="font-weight-600">Misc</h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            RESPONSE TIME
                          </p>
                          <h6 className="font-weight-600">
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
                          <h6 className="font-weight-600">End Product</h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            GEOGRAPHIC
                          </p>
                          <h6 className="font-weight-600">Field Support</h6>
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
                <TabPanel value={4}>
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
                      onClick={() => setValue(value + 1)}
                      className="btn btn-light"
                    >
                      {" "}
                      Save & Next
                    </button>
                  </div>
                </TabPanel>

                <TabPanel value={5} className="customTabPanel">
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
                      onClick={() => setValue(value + 1)}
                      className="btn btn-light"
                    >
                      Save & Next
                    </button>
                  </div>
                </TabPanel>

                <TabPanel value={6}>
                  <div
                    className="custom-table card p-3 "
                    style={{ width: "100%", backgroundColor: "#fff" }}
                  >
                    <div className="row align-items-center m-0" style={{ flexFlow: 'unset' }}>
                      {/* <div className="col-2">
                        <div className="d-flex ">
                          <h5 className="mr-4 mb-0">
                            <span>Master Data</span>
                          </h5>
                          <p className="ml-4 mb-0"><a onClick={() => handleOpen()} className=" ml-3 font-size-14"><img src={uploadIcon}></img></a><a href="#" className="ml-3 "><img src={shareIcon}></img></a></p>
                        </div>
                      </div> */}
                      <div className="w-100">
                        <div className="d-flex align-items-center bg-light-dark w-100">
                          <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
                            <div className="row align-items-center m-0">
                              {
                                querySearchSelector.map((obj, i) => {
                                  return (
                                    <>

                                      <div className="customselect d-flex align-items-center mr-3 my-2" key={i}>
                                        {
                                          i > 0 ?
                                            <Select
                                              isClearable={true}
                                              defaultValue={{ label: "And", value: "AND" }}
                                              options={[
                                                { label: "And", value: "AND", id: i },
                                                { label: "Or", value: "OR", id: i },
                                              ]}
                                              placeholder="&amp;"
                                              onChange={(e) => handleOperator(e, i)}
                                              // value={querySearchOperator[i]}
                                              value={obj.selectOperator}

                                            /> : <></>
                                        }

                                        <div>
                                          <Select
                                            // isClearable={true}
                                            options={[
                                              { label: "Make", value: "make", id: i },
                                              { label: "Family", value: "family", id: i },
                                              { label: "Model", value: "model", id: i },
                                              { label: "Prefix", value: "prefix", id: i },
                                            ]}
                                            onChange={(e) => handleFamily(e, i)}
                                            value={obj.selectFamily}
                                          />
                                        </div>
                                        <div className="customselectsearch">
                                          <input className="custom-input-sleact"
                                            type="text"
                                            placeholder="Search string"
                                            value={obj.inputSearch}
                                            onChange={(e) => handleInputSearch(e, i)}
                                            id={"inputSearch-" + i}
                                            autoComplete="off"
                                          />

                                          {

                                            <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i}`} id="style">
                                              {obj.selectOptions.map((currentItem, j) => (
                                                <li className="list-group-item" key={j} onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}>{currentItem}</li>
                                              ))}
                                            </ul>

                                          }
                                        </div>
                                      </div>
                                    </>
                                  );
                                })
                              }
                              <div
                                onClick={(e) => addSearchQuerryHtml(e)}>
                                <Link
                                  to="#"
                                  className="btn-sm text-violet border"
                                  style={{ border: "1px solid #872FF7" }}
                                >
                                  +
                                </Link>
                              </div>
                              <div onClick={handleDeletQuerySearch}>
                                <Link to="#" className="btn-sm">
                                  <svg data-name="Layer 41" id="Layer_41" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path className="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path className="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                  {/* <DeleteIcon className="font-size-16" /> */}
                                </Link>
                              </div>

                            </div>
                          </div>
                          <div className="px-3">
                            <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
                              <SearchIcon /><span className="ml-1">Search</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className=" ml-3">
                        <Link to="#" className="btn bg-primary text-white">
                          <FileUploadOutlinedIcon /> <span className="ml-1">Upload</span>
                        </Link>
                      </div>
                    </div>
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
                        <Link to="#"
                          onClick={() => {
                            setSelectedMasterData(filterMasterData)
                            setMasterData([])
                          }}
                          className="btn bg-primary text-white"
                        >+ Add Selected</Link></div>
                    </div>
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
                    <button
                      type="button"
                      onClick={handleNextClick}
                      className="btn btn-light"
                      id="coverage"
                    >
                      Save
                    </button>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className="card mt-5">
            <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center customMenu">
              <h6 className="font-weight-600 text-light mb-0">
                Portfolio Items
                <span>
                  {" "}
                  <a href="#" className="ml-3 font-size-14">
                    <FontAwesomeIcon icon={faPen} />
                  </a>
                </span>
              </h6>

              <div className="maintableheader bg-white mt-3 border-radius-10">
                <div className="d-flex justify-content-between align-items-center pl-2">
                  <div className="d-flex align-items-center">
                    <div className="customselect d-flex">
                      <Select
                        onChange={(e) => setItemHeaderSearch({ ...itemHeaderSearch, searchBy: e })}
                        // isClearable={true}
                        value={itemHeaderSearch.searchBy}
                        options={[
                          { label: "Bundle", value: "bundle" },
                          { label: "Service", value: "service" },
                          { label: "Portfolio Item", value: "portfolioItem" },
                        ]}
                        placeholder="Add by"
                      />
                    </div>
                    {itemHeaderSearch.searchBy != null ? (
                      <div className="customselect d-flex ml-3">
                        <Select
                          onChange={(e) => setItemHeaderSearch({ ...itemHeaderSearch, family: e })}
                          // isClearable={true}
                          value={itemHeaderSearch.family}
                          options={[
                            { label: "Make", value: "make" },
                            { label: "Model", value: "model" },
                            { label: "Prefix", value: "prefix" },
                          ]}
                          placeholder="Select"
                        />
                        {itemHeaderSearch.family != null ? (
                          <input
                            type="text"
                            className=""
                            placeholder="Enter text"
                            style={{
                              border: "none",
                              background: "transparent",
                              width: "80px",
                              fontWeight: "600",
                              paddingLeft: "10px",
                            }}
                            value={itemHeaderSearch.inputField}
                            onChange={(e) => setItemHeaderSearch({ ...itemHeaderSearch, inputField: e.target.value })}
                          ></input>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {itemHeaderSearch.inputField.trim() != "" && itemHeaderSearch.family.value != null ? (
                  <div className="tableheader">
                    <ul className="submenu accordion mt-0" style={{ display: "block" }}>
                      <li onClick={handleGetheaderSearch}>
                        <a className="result cursor">RESULTS</a>
                      </li>
                      <li>
                        <a className="cursor">PM125</a>
                      </li>
                      <li>
                        <a className="cursor">PM2</a>
                      </li>
                      <li>
                        <a onClick={handleCreateNewItem} className="lastOption text-violet cursor">
                          <span className="mr-2">+</span>Create New{" "}
                          {itemHeaderSearch.searchBy != null
                            ? itemHeaderSearch.searchBy.value == "bundle"
                              ? "Bundle"
                              : itemHeaderSearch.searchBy.value == "service"
                                ? "Service"
                                : itemHeaderSearch.searchBy.value == "portfolioItem"
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




              {/* <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleShowAddSolution}><span className="mr-2">+</span>Add Solution</h6> */}
              <div className="d-flex align-items-center">
                <h6
                  className="font-weight-600 text-light mb-0 cursor"
                  onClick={handleAddSolutionPress}
                >
                  <span className="mr-2">+</span>Add Solution
                </h6>
                {/* <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant=""
                    id="dropdown-split-basic"
                    className="dropdownBtnCustom"
                  >
                    <MoreVertIcon />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="cursor"
                      onClick={() => handleMoreAction(1)}
                    >
                      Create Bundle
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="cursor"
                      onClick={() => handleMoreAction(2)}
                    >
                      Create Service
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="cursor"
                      onClick={() => handleMoreAction(3)}
                    >
                      Create Item
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
              </div>

              {/* <MuiMenuComponent onClick={(event) => handleMenuItemClick(event)} options={portfolioBodyMoreActions} /> */}
            </div>
            {bundleItems.length > 0 ? (
              <div>
                {/* <div className="row align-items-center">
                  <div className="col-4">
                    <div className="d-flex align-items-center pl-2">
                      <h6 className="mr-2 mb-0 font-size-12"><span>Repair Option</span></h6>
                      <p className="mb-0">Version 1</p>
                      <p className="ml-2 mb-0">
                        <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                        <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                      </p>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '5px 10px 5px 35px', borderRadius: '10px' }}>
                      <div className="search-icon1 mr-2" style={{ lineHeight: '24px' }}>
                        <img src={searchstatusIcon}></img>
                      </div>
                      <div className=" mx-2">
                        <div className="machine-drop">
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
                  <div className="col-3  text-right">
                    <div className="">
                      <a href="#" className="border-left  btn">+ Add Part</a>
                    </div>
                  </div>
                </div> */}
                <div
                  className="custom-table  card "
                  style={{ height: 400, width: "100%" }}
                >
                  {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabs}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(e, newValue) => setTabs(newValue)} aria-label="lab API tabs example">
                          <Tab label="Solution Data" value="1" />
                          <Tab label="Component Data" value="2" />
                          <Tab label="Price" value="3" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">Solution Data</TabPanel>
                      <TabPanel value="2">

                      </TabPanel>
                      <TabPanel value="3">Price</TabPanel>
                    </TabContext>
                  </Box> */}
                  <DataTable
                    title=""
                    columns={bundleItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    pagination
                  />
                  {/* <DataTable
                    title=""
                    columns={bundleItemColumns}
                    data={serviceOrBundleList}
                    customStyles={customStyles}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    pagination
                  /> */}






                </div>
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
                        10MB. Only the .xls, .xlsx file types are allowed
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
                      10MB. Only the .xls, .xlsx file types are allowed
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
        size="xl"
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
        show={open}
        onHide={handleClose}
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
              Single upload file should not be more than 10MB. Only the .xls,
              .xlsx file types are allowed
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
            <button className="btn border w-100 bg-white" onClick={handleClose}>
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
        size="xl"
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
                    backgroundColor: "#7380E4",
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
        size="xl"
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
                <ul className="submenu accordion mt-0" style={{ display: "block" }}>
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
        size="xl"
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
                      for="exampleInputEmail1"
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
                      for="exampleInputEmail1"
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
                      for="exampleInputEmail1"
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
                        10MB. Only the .xls, .xlsx file types are allowed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openAddBundleItem}
        onHide={() => setOpenAddBundleItem(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body className="">
          {openAddBundleItemHeader}
          <Modal.Body className="p-0 bg-white">
            <div className="ligt-greey-bg p-3">
              <div>
                {/* <span className="mr-3">
                  <i className="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
                </span>
                <span className="mr-3">
                  < MonetizationOnOutlinedIcon className=" font-size-16" />
                  <span className="ml-2"> Adjudt price</span>
                </span> */}
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
              {/* <Box className="" sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={1}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="General" value="1" />
                                            <Tab label="Price " value="2" disabled />

                                        </TabList>
                                    </Box>
                                    <TabPanel value="1"> */}
              {/* <div>
                                <a href="#" className="btn-sm border" onClick={() => setOpenAddBundleItem(false)}>Cancel</a>
                                <a href="#" className="btn-sm bg-primary text-white ml-3" onClick={handleBundleItemSaveAndContinue}>Save & Continue</a>
                            </div> */}
              <p className="mt-4">SUMMARY</p>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
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
                      for="exampleInputEmail1"
                    >
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="DESCRIPTION"
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, description: e.target.value })}
                      value={addPortFolioItem.description}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      USAGE IN
                    </label>
                    <Select
                      placeholder={categoryUsageKeyValue1.label}
                      options={categoryList}
                      // selectedValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                      defaultValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                      value={addPortFolioItem.usageIn}
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, usageIn: e })}
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
                      for="exampleInputEmail1"
                    >
                      TASK TYPE
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          // defaultValue={1}
                          // onChange={(e) => {setTaskItemList(e)}}
                          // value={taskItemList}
                          options={updatedTaskList}
                          placeholder={stratgyTaskTypeKeyValue.value}
                          // selectedValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                          defaultValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                          onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, taskType: e })}
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
                      for="exampleInputEmail1"
                    >
                      FREQUENCY
                    </label>
                    <div className="icon-defold">
                      <div className="form-control">
                        <Select
                          options={frequencyOptions}
                          placeholder="FREQUENCY"
                          onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, frequency: e })}
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
                      placeholder="HOURS"
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, unit: e })}
                      value={addPortFolioItem.unit}
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
                    <Select
                      // defaultValue={selectedOption}
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, recomondedValue: e })}
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
                      for="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      // id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      placeholder="QUANTITY"
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, quantity: e.target.value })}
                      value={addPortFolioItem.quantity}
                    />
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
                      type="email"
                      className="form-control border-radius-10"
                      // id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      placeholder="NO. OF EVENTS"
                      onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, strategyEvents: e.target.value })}
                      value={addPortFolioItem.strategyEvents}
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
                      for="exampleInputEmail1"
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
                          onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, templateId: e })}
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
                      for="exampleInputEmail1"
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
                          onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, templateDescription: e })}
                          value={addPortFolioItem.templateDescription}
                        />
                        <span className="search-icon searchIcon">
                          <SearchOutlinedIcon className="font-size-16" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      # OF EVENTS
                    </label>
                    <div className="icon-defold">
                      <input
                        type="text"
                        className="form-control icon-defold border-radius-10"
                        style={{ paddingLeft: "35px" }}
                        // id="exampleInputEmail1"
                        // aria-describedby="emailHelp"
                        placeholder="SJ1234"
                        onChange={(e)=>setAddportFolioItem({...addPortFolioItem,templateEvents:e.target.value})}
                        value={addPortFolioItem.templateEvents}

                      />
                      <span
                        className="search-icon"
                        style={{
                          top: "7px",
                          left: "10px",
                          position: "absolute",
                        }}
                      >
                        <DateRangeOutlinedIcon className="font-size-16" />
                      </span>
                    </div>
                  </div>
                </div> */}
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
                {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      # OF EVENTS
                    </label>
                    <div className="icon-defold">
                      <input
                        type="email"
                        className="form-control icon-defold border-radius-10"
                        style={{ paddingLeft: "35px" }}
                        // id="exampleInputEmail1"
                        // aria-describedby="emailHelp"
                        placeholder="SJ1234"
                        onChange={(e)=>setAddportFolioItem({...addPortFolioItem,repairEvents:e.target.value})}
                        value={addPortFolioItem.repairEvents}
                      />
                      <span
                        className="search-icon"
                        style={{
                          top: "7px",
                          left: "10px",
                          position: "absolute",
                        }}
                      >
                        <DateRangeOutlinedIcon className="font-size-16" />
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
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
                          onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, repairOption: e })}
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
                <Link to="#" className="btn border mr-4"
                  onClick={() => {
                    setOpenAddBundleItem(false)
                    setOpen2(true)
                  }}
                >Save & Continue</Link>
              </div>

              {/* <div className="row mt-4">

                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION ID</label>
                                        <input type="email" className="form-control border-radius-10" disabled id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(AUTO GENERATE)" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION DESCRIPTION</label>
                                        <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace Cranskshaft" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">USAGE IN</label>
                                        <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Overhaul" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4">STRATEGY</p>
                            <div className="row mt-4">
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">TASK TYPE</label>
                                        <div className="icon-defold">
                                            <div className="form-control">
                                                <Select
                                                    // defaultValue={selectedOption}
                                                    // onChange={setSelectedOption}
                                                    options={bundleItemTaskTypeKeyValue}
                                                    placeholder="Select Or Search"
                                                />
                                                <span className="search-icon searchIcon"><SearchOutlinedIcon className="font-size-16" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">FREQUENCY</label>
                                        <div className="icon-defold">
                                            <div className="form-control">
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Cyclical"
                                                />
                                                <span className="search-icon searchIcon"><SearchOutlinedIcon className="font-size-16" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">TIME/HOURS</label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            placeholder="HOURS"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">VALUE</label>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                            placeholder="250"
                                        />
                                    </div>
                                </div>

                            </div> */}
              {/* <div className="text-right">
                                <a href="#" className="btn-sm border mr-3" onClick={() => setOpenAddBundleItem(true)} style={{ cursor: 'pointer' }}>Review</a>
                                <a href="#" className="btn-sm bg-primary text-white" onClick={() => setOpen1(true)} style={{ cursor: 'pointer' }} >Copy to Solution</a>
                            </div> */}

              {/* </TabPanel>
                                    <TabPanel value="2">
                                        <p>Data not found</p>
                                    </TabPanel>
                                </TabContext>
                            </Box> */}
            </div>
          </Modal.Body>
        </Modal.Body>
      </Modal>

      <Modal show={open2} onHide={() => setOpen2(false)} size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header >
          <Modal.Title>Price Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
          <div className="ligt-greey-bg p-3">
            <div>
              <span className="mr-3">
                <i className="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
              </span>
              <span className="mr-3">
                < MonetizationOnOutlinedIcon className=" font-size-16" />
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
              <h6 className="text-light-dark font-size-12 font-weight-500">PRICES</h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      PRICE TYPE
                    </label>
                    <Select
                      options={options}
                      value={priceCalculator.priceType}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, priceType: e })}
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
                      LIST PRICE{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      aria-describedby="emailHelp"
                      placeholder="$100"
                      value={priceCalculator.listPrice}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, listPrice: e.target.value })}
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
                          value={priceCalculator.priceAdditionalSelect}
                          onChange={(e) => setPriceCalculator({ ...priceCalculator, priceAdditionalSelect: e })}
                          options={options}
                          placeholder="Select"
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="10%"
                        value={priceCalculator.priceAdditionalInput}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, priceAdditionalInput: e.target.value })}
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
                        // defaultValue={selectedOption}
                        value={priceCalculator.priceEscalationSelect}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, priceEscalationSelect: e })}
                        options={options}
                        placeholder="placeholder "
                      />
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="20%"
                        value={priceCalculator.priceEscalationInput}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, priceEscalationInput: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
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
                      value={priceCalculator.calculatedPrice}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, calculatedPrice: e.target.value })}
                      placeholder="$100"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
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
                      value={priceCalculator.flatPrice}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, flatPrice: e.target.value })}
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
                      for="exampleInputEmail1"
                    >
                      DISCOUNT TYPE
                    </label>
                    <div className=" d-flex form-control-date">
                      <div className="">
                        <Select
                          value={priceCalculator.discountTypeSelect}
                          onChange={(e) => setPriceCalculator({ ...priceCalculator, discountTypeSelect: e })}
                          isClearable={true}
                          options={options}
                          placeholder="Select"
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        value={priceCalculator.discountTypeInput}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, discountTypeInput: e.target.value })}
                        placeholder="10%"
                      />
                    </div>
                  </div>
                </div>

              </div>
              {/* <div className="card"> */}
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      YEAR
                    </label>
                    <Select
                      // defaultValue={selectedOption}
                      value={priceCalculator.priceYear}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, priceYear: e })}
                      options={options}
                      placeholder="Year"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-light-dark font-size-12 font-weight-500">USAGE</h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      START USAGE
                    </label>
                    <div className=" d-flex form-control-date" style={{ overflow: 'hidden' }}>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="per hour"
                        value={priceCalculator.startUsage}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, startUsage: e.target.value })}
                      />
                      <span className="hours-div">
                        hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      END USAGE
                    </label>
                    <div className=" d-flex form-control-date" style={{ overflow: 'hidden' }}>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="10%"
                        value={priceCalculator.endUsage}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, endUsage: e.target.value })}
                      />
                      <span className="hours-div">
                        hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      USAGE TYPE
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      options={options}
                      value={priceCalculator.usageType}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, usageType: e })}
                      placeholder="placeholder (Optional)"
                    />
                  </div>
                </div>
              </div>


              <h6 className="text-light-dark font-size-12 font-weight-500">QUANTITY</h6>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      FREQUENCY
                    </label>
                    <Select
                      defaultValue={addPortFolioItem.frequency}
                      // selectedValue={addPortFolioItem.frequency}
                      options={frequencyOptions}
                      value={priceCalculator.frequency}
                      onChange={(e) => setPriceCalculator({ ...priceCalculator, frequency: e })}
                      placeholder="Cyclical"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group date-box">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CYCLE
                    </label>
                    <div className=" d-flex form-control-date" style={{ overflow: 'hidden' }}>
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                        placeholder="250"
                        value={priceCalculator.cycle}
                        onChange={(e) => setPriceCalculator({ ...priceCalculator, cycle: e.target.value })}
                      />
                      <span className="hours-div">
                        hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              {/* </div> */}
              <div className="d-flex align-items-center">
                <div><h6 className="text-light-dark font-size-12 font-weight-500 mr-4">NET PRICE</h6>${priceCalculator.netPrice}</div>
                <div><h6 className="text-light-dark font-size-12 font-weight-500">TOTAL PRICE</h6>${priceCalculator.netPrice}</div>

              </div>
              {/* <div className="row mt-4">
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">GROUP NUMBER</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TYPE</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PART NUMBER</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QTY</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT PRICE</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% USAGE</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TOTAL PRICE</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMMENTS</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE"/>
                </div>
                </div>
              </div> */}
            </div>
            <div className="m-3 text-right">
              <a href="#" onClick={() => setOpen2(false)} className="btn border mr-3 "> Cancel</a>
              <a href="#"
                className="btn text-white bg-primary"
                onClick={serviceOrBundlePrefix === "" ? handleBundleItemSaveAndContinue : saveAddNewServiceOrBundle}
              >Save</a>
            </div>
          </div>
        </Modal.Body>


      </Modal>



      <Modal
        show={showAddSolutionModal}
        onHide={handleShowAddSolution}
        size="xl"
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
      <div className="modal fade" id="AddCoverage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Coverage</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group w-100">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Coverage ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      disabled
                      placeholder="(AUTO GENERATE)"
                      value={editSerialNo.coverageId}
                      defaultValue={editSerialNo.coverageId}
                    />
                  </div>
                </div>
                {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">Service ID</label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Make
                    </label>
                    <Select
                      options={categoryList}
                      placeholder={editSerialNo.make}
                      // onChange={(e) => HandleCatUsage(e)}
                      value={editSerialNo.make}
                      defaultValue={editSerialNo.make}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, make: e.value })}
                    />

                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Family
                    </label>
                    <Select
                      options={categoryList}
                      placeholder={editSerialNo.family}
                      value={editSerialNo.family}
                      defaultValue={editSerialNo.family}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, family: e.value })}
                    // onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Model No
                    </label>
                    <Select
                      options={categoryList}
                      placeholder={editSerialNo.modelNo}
                      value={editSerialNo.modelNo}
                      defaultValue={editSerialNo.modelNo}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, modelNo: e.value })}
                    // onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Serial No Prefix
                    </label>
                    <Select
                      options={categoryList}
                      placeholder={editSerialNo.serialNoPrefix}
                      value={editSerialNo.serialNoPrefix}
                      defaultValue={editSerialNo.serialNoPrefix}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, serialNoPrefix: e.value })}
                    // onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">Start Serial No</label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="(Optional)"
                      value={editSerialNo.startSerialNo}
                      defaultValue={editSerialNo.startSerialNo}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, startSerialNo: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">End Serial No</label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="(Optional)"
                      value={editSerialNo.endSerialNo}
                      defaultValue={editSerialNo.endSerialNo}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, endSerialNo: e.target.value })}
                    />
                  </div>
                </div>



                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">Fleet</label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      placeholder="(Optional)"
                      value={editSerialNo.fleet}
                      defaultValue={editSerialNo.fleet}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, fleet: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      Fleet Size
                    </label>
                    <Select
                      value={editSerialNo.fleetSize}
                      defaultValue={editSerialNo.fleetSize}
                      placeholder={editSerialNo.fleetSize}
                      onChange={(e) => setEditSerialNo({ ...editSerialNo, fleetSize: e.value })}
                      options={categoryList}
                    // onChange={(e) => HandleCatUsage(e)}
                    />

                  </div>
                </div>
                {/* <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-14 font-weight-500"
                      for="exampleInputEmail1"
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
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">Start Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">End Date </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">Actions </label>
                    <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(Optional)" />
                  </div>
                </div> */}


              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn border w-100 bg-white" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary w-100">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* <div className="modal fade" id="relatedTable" tabindex="-1" role="dialog" aria-labelledby="exampleReleted" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document"> */}
      <Modal
        show={showRelatedModel}
        onHide={() => setShowRelatedModel(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="align-items-center">
          <div>
            <Modal.Title>Included Serial No</Modal.Title>
          </div>
          <div>
            <Link to="#" className=" btn bg-primary text-white">Add New</Link>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DataTable
            className=""
            title=""
            columns={columns4}
            data={data4}
            customStyles={customStyles}
          // pagination
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowRelatedModel(false)}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>



      <Modal
        show={openMiniBundleItem}
        onHide={() => setOpenMiniBundleItem(false)}
        size="xl"
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
                    for="exampleInputEmail1"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10"
                    disabled
                    placeholder="(AUTO GENERATE)"
                    value={addMiniPortFolioItem.id ? addMiniPortFolioItem.id : ""}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10"
                    placeholder="DESCRIPTION"
                    onChange={(e) => setAddMiniportFolioItem({ ...addMiniPortFolioItem, description: e.target.value })}
                    value={addMiniPortFolioItem.description}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    USAGE IN
                  </label>
                  <Select
                    placeholder={categoryUsageKeyValue1.label}
                    options={categoryList}
                    // selectedValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                    defaultValue={categoryUsageKeyValue1.value ? categoryUsageKeyValue1.value : ""}
                    value={addMiniPortFolioItem.usageIn}
                    onChange={(e) => setAddMiniportFolioItem({ ...addMiniPortFolioItem, usageIn: e })}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    TASK TYPE
                  </label>
                  <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={updatedTaskList}
                        placeholder={stratgyTaskTypeKeyValue.value}
                        // selectedValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                        defaultValue={stratgyTaskTypeKeyValue.value ? stratgyTaskTypeKeyValue.value : ""}
                        onChange={(e) => setAddMiniportFolioItem({ ...addMiniPortFolioItem, taskType: e })}
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
              <Link to="#" className="btn border mr-4"
                onClick={() => alert('action require')}
              >Save & Continue</Link>
            </div>


          </div>
        </Modal.Body>
      </Modal>


      <Modal show={serviceOrBundleShow} onHide={() => setServiceOrBundleShow(false)} size="xl"
        aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="">
          <div className="container-fluid ">
            <div className="d-flex align-items-center justify-content-between mt-2">
              <h5 className="font-weight-600 mb-0">ADD {serviceOrBundlePrefix}</h5>
              <div className="d-flex justify-content-center align-items-center">
                <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                <a href="#" className="ml-2"><MuiMenuComponent onClick={() => alert()} options={activityOptions} /></a>

              </div>
            </div>
            <div className="card p-4 mt-5">
              <h5 className="d-flex align-items-center mb-0">
                <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i className="fa fa-pencil" aria-hidden="true"></i></a>
                  <a href="#" className="btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a>
                  <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                <div className="input-group icons border-radius-10 border">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                      <img src={shearchIcon} /></span>
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
                    <label className="text-light-dark font-size-12 font-weight-500" >{serviceOrBundlePrefix} ID</label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      disabled
                      name="id"
                      placeholder="ID(AUTO)"
                      value={createServiceOrBundle.id ? createServiceOrBundle.id : ""}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500" >{serviceOrBundlePrefix} DESCRIPTION</label>
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
                    <label className="text-light-dark font-size-12 font-weight-500" >BUNDLE FLAG</label>
                    <input
                      type="text"
                      className="form-control border-radius-10"
                      name="bundleFlag"
                      placeholder="Bundle Flag"
                      value={serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM"}
                      // value={createServiceOrBundle.bundleFlag}
                      onChange={handleAddServiceBundleChange}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
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
                    <label className="text-light-dark font-size-12 font-weight-500" >CUSTOMER SEGMENT</label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={(e) => setCreateServiceOrBundle({ ...createServiceOrBundle, customerSegment: e })}
                      value={createServiceOrBundle.customerSegment}
                      options={options}
                      placeholder="Customer Segment"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500" >MAKE</label>
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
                    <label className="text-light-dark font-size-12 font-weight-500" >MODEL(S)</label>
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
                    <label className="text-light-dark font-size-12 font-weight-500" >PREFIX(S)</label>
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
                    <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MACHINE/COMPONENT</label>
                    <Select
                      isClearable={true}
                      onChange={(e) => setCreateServiceOrBundle({ ...createServiceOrBundle, machineComponent: e })}
                      value={newBundle.machineComponent}
                      isLoading={typeKeyValue.length > 0 ? false : true}
                      options={typeKeyValue}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADDITIONALS</label>
                    <Select
                      // defaultValue={selectedOption}
                      onChange={(e) => setCreateServiceOrBundle({ ...createServiceOrBundle, additional: e })}
                      value={createServiceOrBundle.additional}
                      options={options}
                      placeholder="Preventive Maintenance"
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ justifyContent: 'right' }}>
                <button
                  type="button"
                  onClick={handleAddNewServiceOrBundle}
                  className="btn btn-light">Save</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
