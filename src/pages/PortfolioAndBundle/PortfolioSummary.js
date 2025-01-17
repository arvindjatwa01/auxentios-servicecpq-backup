import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import DataTable from "react-data-table-component";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from "../Operational/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import cpqIcon from "../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import shearchIcon from "../../assets/icons/svg/search.svg";
import { SolutionSelector } from "./index";
import { CommanComponents } from "../../components/index";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link, useHistory } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid } from "@mui/x-data-grid";
import Validator from "../../utils/validator";

import { SolutionBuilderModal } from "../../pages/SolutionModules/index";

import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "../Repair/CONSTANTS";

import $ from "jquery";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddPortfolioItem from "./AddPortfolioItem";
import PriceCalculator from "./PriceCalculator";
import penIcon from "../../assets/images/pen.png";

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
  // getSearchQueryCoverage,
  // getSearchCoverageForFamily,
  // getSearchForPortfolio,
  // getSearchForRecentPortfolio,
  // getSearchForRecentBundleService,
  itemCreation,
  updateItemData,
  portfolioSearch,
  portfolioSearchDropdownList,
  itemSearch,
  itemSearchDropdown,
  recentItemsList,
  portfolioItemPriceSjid,
  portfolioItemPriceRkId,
  getSolutionPriceCommonConfig,
  getItemDataById,
  getItemPriceData,
  portfolioSearchList,
  updateItemPriceData,
  createItemPriceData,
  portfolioSearchTableDataList,
  // getServiceBundleItemPrices,
  getPortfolioAndSolutionCommonConfig,
} from "../../services/index";
import { getApiCall, getSearchForRecentPortfolio } from "services/searchQueryService";
import { GET_SEARCH_COVERAGE, GET_SEARCH_FAMILY_COVERAGE, PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE, RECENT_PORTFOLIO_URL } from "services/CONSTANTS";

export const PortfolioSummary = () => {
  var CookiesSetData = Cookies.get("loginTenantDtl");
  var getCookiesJsonData;
  if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
  }
  const loginTenantId = CookiesSetData != undefined ? getCookiesJsonData?.user_tenantId : 74;
  const [value, setValue] = React.useState("1");
  const [openSolutionSelector, setOpenSolutionSelector] = useState(false);
  const [solutionBuilderShow, setSolutionBuilderShow] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
  const [createNewBundle, setCreateNewBundle] = useState(false);
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");

  const [openSearchSolution, setOpenSearchSolution] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(null);
  const [bundleServicePortfolioItemId, setBundleServicePortfolioItemId] = useState(0);

  const [portfolioItemData, setPortfolioItemData] = useState([]);
  const [bundleServiceItemData, setBundleServiceItemData] = useState([]);
  const [recentPortfolio, setRecentPortfolio] = useState([])
  const [recentBundleService, setRecentBundleService] = useState([]);
  const [recentBundleItemsList, setRecentBundleItemsList] = useState([]);
  const [recentServiceItemsList, setRecentServiceItemsList] = useState([]);

  const [typeOfSolutionSelector, setTypeOfSolutionSelector] = useState(-1);
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
  const [value3, setValue3] = useState({ value: "STANDARD", label: "Standard (Bronze)" });
  const [value4, setValue4] = useState({ value: "chargeable", label: "Chargeable" });

  const [bundleServiceChargeableOrNot, setBundleServiceChargeableOrNot] = useState(true);

  const [unitOptionKeyValue, setUnitOptionKeyValue] = useState([])
  const [frequencyOptionKeyValue, setFrequencyOptionKeyValue] = useState([])
  const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
  const [priceTypeKeyValue, setPriceTypeKeyValue] = useState([]);

  const discountTypeOptions = [
    { value: "PROGRAM_DISCOUNT", label: "Program" },
    { value: "CUSTOMER_DISCOUNT", label: "Customer" },
    { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
  ]

  const handleOption2 = (e) => {
    console.log(e);
    // if (editBundleService) {
    //   if (e.value === "ACTIVE") {
    //     setIsActiveStatus(true)
    //   } else {
    //     setIsActiveStatus(false)
    //   }
    // }
    setValue2(e);
  };
  const handleOption3 = (e) => {
    setValue3(e);
  };
  const handleOption4 = (e) => {
    if (e.value === "free") {
      setBundleServiceChargeableOrNot(false);
    } else if (e.value == "chargeable") {
      setBundleServiceChargeableOrNot(true);
    }
    console.log(e);
    setValue4(e);
  };
  const [value2, setValue2] = useState({
    value: "DRAFT",
    label: "Draft",
  });


  const makeStatusValueDisabled = (optionData) => {

    if ((optionData.value === "DRAFT" && value2.value == "ACTIVE")) {
      setIsActiveStatus(false)
      return true;

    }

    if ((
      (optionData.value === "DRAFT" ||
        optionData.value === "ACTIVE") &&
      (value2.value == "REVISED"))) {
      return true;
    }

    if ((
      (optionData.value === "DRAFT" ||
        optionData.value === "ACTIVE" ||
        optionData.value === "REVISED") &&
      (value2.value == "ARCHIVED"))) {
      return true;
    }


  }

  const [recentTabsValue, setRecentTabsValue] = useState("portfolio");

  const [versionOption, setVersionOption] = useState([]);
  const [statusOption, setStatusOption] = useState([]);
  const [columnSearchText, setColumnSearchText] = useState("");
  const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1);
  const [buildSolutionValue, setBuildSolutionValue] = useState(-1);
  const [portfolioResponse, setPortfolioResponse] = useState({});

  const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([]);
  const [showColumnDataOnService, setShowColumnDataOnService] = useState(false);

  const [age, setAge] = React.useState("5");
  const [age1, setAge1] = React.useState("5");
  const [age2, setAge2] = React.useState("5");
  const [show, setShow] = React.useState(false);

  const [isActiveStatus, setIsActiveStatus] = useState(false);

  const [querySearchModelResult, setQuerySearchModelResult] = useState([])
  const [modelResultSelected, setModelResultSelected] = useState(false);
  const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] = useState([])

  const [editBundleService, setEditBundleService] = useState(false);
  const [bundleAndServiceEditAble, setBundleAndServiceEditAble] = useState(false)
  const [bundleServiceAdministrativeEditable, setBundleServiceAdministrativeEditable] = useState(false);

  // New Addition for bundle/Service Creation
  const [bundleServiceShow, setBundleServiceShow] = useState(false);
  const [bundleTabs, setBundleTabs] = useState("bundleServiceHeader");
  const [serviceOrBundlePrefix, setServiceOrBundlePrefix] = useState("");
  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [selectedPrefixOption, setSelectedPrefixOption] = useState("");
  const [selectedCustomerSegmentOption, setSelectedCustomerSegmentOption] = useState("");
  const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
    id: "",
    name: "",
    description: "",
    bundleFlag: "",
    reference: "",
    customerSegment: "",
    make: "",
    model: "",
    family: "",
    prefix: "",
    machine: "",
    additional: "",
    estimatedTime: "",
    unit: "",
    usageType: "",
    frequency: "",
    currency: "",
  });
  const [portfolioServiceBundleId, setPortfolioServiceBundleId] = useState(0);


  const [createdBundleItems, setCreatedBundleItems] = useState("");

  const [createdServiceData, setCreatedServiceData] = useState({});

  const [addPortFolioItem, setAddPortFolioItem] = useState({})
  const [priceCalculatorTabEditAble, setPriceCalculatorTabEditAble] = useState(false);
  const [editableServiceOrBundleData, setEditableServiceOrBundleData] = useState({})
  const [priceCalculator, setPriceCalculator] = useState({})

  const [selectedItemType, setSelectedItemType] = useState("");
  const [familySelectOption, setFamilySelectOption] = useState([]);

  const [passItemEditRowData, setPassItemEditRowData] = useState();
  const [itemPriceData, setItemPriceData] = useState({});

  const history = useHistory()
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#000",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#872ff7",
      width: "140px",
      display: "flex",
      justifyContent: "center",
      fontSize: "14px",
      padding: "5px 10px",
      color: "#fff !important",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer"
    }),
  }

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

  useEffect(() => {
    getTypeKeyValue()
      .then((res) => {
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        setTypeKeyValue(options);
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
    // getSearchForRecentPortfolio()
    let loading, data, failure;
    getApiCall(RECENT_PORTFOLIO_URL + "/recent", loading, data, failure)
      .then((res) => {
        console.log("getSearchForRecentPortfolio res ", res)
        setRecentPortfolio(res);
      })

    // getSearchForRecentBundleService()
    //   .then((res) => {
    //     setRecentBundleService(res);
    //   })

    recentItemsList("BUNDLE_ITEM")
      .then((res) => {
        setRecentBundleService(res.data);
      })

    recentItemsList("SERVICE")
      .then((res) => {
        setRecentServiceItemsList(res.data);
      })

    // setRecentServiceItemsList
    // setRecentBundleItemsList

    getSolutionPriceCommonConfig("support-level")
      .then((res) => {

        // console.log("res --- 12333 : ", res);
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
        const options = res.map((d, i) => ({
          value: d.key,
          label: d.value,
        }));
        setStatusOption(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("price-method")
      .then((res) => {
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

    // Unit Dropdown
    getPortfolioAndSolutionCommonConfig("unit")
      .then((res) => {
        if (res.status === 200) {
          const options = []
          res.data.map((d) => {
            if ((d.key != "EMPTY") && (d.key != "MONTH")) {
              options.push({
                value: d.key,
                label: d.value,
              })
            }
          });
          setUnitOptionKeyValue(options);
        }
      })
      .catch((err) => {
        alert(err);
      });

    // Frequency Dropdown 
    getPortfolioAndSolutionCommonConfig("frequency")
      .then((res) => {
        if (res.status === 200) {
          const options = []
          res.data.map((d) => {
            if (d.key != "EMPTY") {
              options.push({
                value: d.key,
                label: d.value,
              })
            }
          });
          setFrequencyOptionKeyValue(options);
        }
      })
      .catch((err) => {
        alert(err);
      });

    if (JSON.parse(localStorage.getItem('exitingType'))) {
      localStorage.removeItem('exitingType');
    }

  }, []);

  // console.log("setRecentPortfolio : ", recentPortfolio);
  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };

  const handleRowClick = (e) => {
    setShow(true);
  };

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
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
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
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
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
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];

  const columns = [
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
    { field: "Actions", headerName: "Actions", flex: 1, width: 130 },
    // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
    // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
  ];

  //getPortfolioCommonConfig("customer-segment")
  //  .then((res) => {
  //    const options = res.map((d) => ({
  //      value: d.key,
  //      label: d.value,
  //    }));
  //    setCustomerSegmentKeyValue(options);
  //  })
  //  .catch((err) => {
  //    alert(err);
  //  });

  const handleBuildSolution = (e) => {
    setBuildSolutionValue(e.target.value);
  };

  const handleContinueCallback = (data) => {
    if (data) {
      setTypeOfSolutionBuild(0);
      setOpenSolutionSelector(true);
      setOpen(false);
    } else {
      setTypeOfSolutionBuild(1);
      setOpenSolutionSelector(false);
      setOpen(true);
      setTypeOfSolutionSelector(1);
    }
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setOpenSearchSolution(false);
    setShowExplore(false);
  };

  const handleNextSolutionSelector = () => {
    if (buildSolutionValue == "0") {
      window.location.href = "/solutionBuilder/guide";
    } else {
      setTypeOfSolutionBuild(0);
      setOpenSolutionSelector(false);
      setOpen(true);
      setSolutionBuilderShow(false);
      setModalComponent(null);
      setOpenSearchSolution(false);
      setShowExplore(false);
      setTypeOfSolutionSelector(0);
    }
  };

  const handleShowSearchParentCallback = (data) => {
    setOpenSearchSolution(true);
    setOpenSolutionSelector(false);
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setShowExplore(false);
  };

  const handleBundleItemSaveAndContinue = () => {
    // toast('👏 Item Added', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    setOpenSolutionSelector(false);
    setSolutionBuilderShow(false);
    setModalComponent(null);
    setOpenSearchSolution(false);
    setShowExplore(true);
  };

  const handleCloseExplore = () => {
    setShowExplore(false);
  };
  const handleCallbackClose = (data) => {
    if (solutionBuilderShow) {
      setSolutionBuilderShow(false);
    } else {
      setSolutionBuilderShow(true);
    }
  };
  const handleShow = () => {
    if (solutionBuilderShow) {
      setModalComponent(
        <SolutionBuilderModal
          showSearchParentCallback={handleShowSearchParentCallback}
          continueParentCallback={handleContinueCallback}
          parentCallback={handleCallbackClose}
          open={false}
        />
      );
    } else {
      setModalComponent(
        <SolutionBuilderModal
          showSearchParentCallback={handleShowSearchParentCallback}
          continueParentCallback={handleContinueCallback}
          parentCallback={handleCallbackClose}
          open={true}
        />
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setRecentTabsValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];

  const activityOptions = ["None", "Atria", "Callisto"];

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

  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);

  };

  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    // obj.inputSearch = e.target.value;
    if (selectedItemType === "PORTFOLIO") {
      var newArr = [];
      var SearchResArr = [];
      if ((tempArray[id].selectFamily.value === "name") ||
        (tempArray[id].selectFamily.value === "description")) {
        portfolioSearchDropdownList(`${tempArray[id].selectFamily.value}/${e.target.value}`)
          .then((res) => {
            if (res.status === 200) {
              for (let i = 0; i < res.data.length; i++) {
                // SearchResArr.push(res.data[i].value)

                if (tempArray[id].selectFamily.value === "name" ||
                  tempArray[id].selectFamily.value === "description") {
                  SearchResArr.push(res.data[i].key)
                } else {
                  SearchResArr.push(res.data[i].value)
                }
                // SearchResArr.push(res.data[i].value)
              }
            }
            obj.selectOptions = SearchResArr;
            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar-${id}`).css("display", "block");
          })
          .catch((err) => {
            console.log("err in api call", err);
          });
      } else {
        const url = GET_SEARCH_FAMILY_COVERAGE + "?" + tempArray[id].selectFamily.value + "=" + e.target.value;
        let loading, data, failure;
        getApiCall(url, loading, data, failure)
          // getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
          .then((res) => {
            console.log("response coverage ", res);
            obj.selectOptions = res;
            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar-${id}`).css("display", "block");
          })
          .catch((err) => {
            console.log("err in api call", err);
          });
      }


      // portfolioSearch(`${tempArray[id].selectFamily.value}~${e.target.value}`)
      //   .then((res) => {
      //     if (tempArray[id].selectFamily.value === "make") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         for (let j = 0; j < res.data[i].coverages.length; j++) {
      //           SearchResArr.push(res.data[i].coverages[j].make)
      //         }
      //       }

      //     } else if (tempArray[id].selectFamily.value == "family") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         for (let j = 0; j < res.data[i].coverages.length; j++) {
      //           SearchResArr.push(res.data[i].coverages[j].family)
      //         }
      //       }
      //     } else if (tempArray[id].selectFamily.value == "modelNo") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         for (let j = 0; j < res.data[i].coverages.length; j++) {
      //           SearchResArr.push(res.data[i].coverages[j].modelNo)
      //         }
      //       }
      //     } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         for (let j = 0; j < res.data[i].coverages.length; j++) {
      //           SearchResArr.push(res.data[i].coverages[j].serialNumberPrefix)
      //         }
      //       }
      //     } else if (tempArray[id].selectFamily.value == "name") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         SearchResArr.push(res.data[i].name)
      //       }
      //     } else if (tempArray[id].selectFamily.value == "description") {
      //       for (let i = 0; i < res.data.length; i++) {
      //         SearchResArr.push(res.data[i].description)
      //       }
      //     }
      //     obj.selectOptions = SearchResArr;
      //     tempArray[id] = obj;
      //     setQuerySearchSelector([...tempArray]);
      //     $(`.scrollbar-${id}`).css("display", "block");
      //   })
      //   .catch((err) => {
      //     console.log("err in api call", err);
      //   });
    } else {
      var bundleServiceSearch;
      var SearchResArr = [];
      if (selectedItemType === "BUNDLE_ITEM") {
        bundleServiceSearch = "bundleFlag:BUNDLE_ITEM AND " + `${tempArray[id].selectFamily.value}~${e.target.value}` + "?bundle_flag=BUNDLE_ITEM";
      } else if (selectedItemType === "SERVICE") {
        bundleServiceSearch = "bundleFlag:SERVICE AND " + `${tempArray[id].selectFamily.value}~${e.target.value}` + "?bundle_flag=SERVICE";
      }

      var newSearchStr = `${tempArray[id].selectFamily.value}/${e.target.value}?bundle_flag=${selectedItemType}`;
      itemSearchDropdown(newSearchStr)
        .then((res) => {
          console.log("ressss ", res);
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              // SearchResArr.push(res.data[i].value)
              SearchResArr.push(res.data[i].key)
            }
          }
          obj.selectOptions = SearchResArr;
          tempArray[id] = obj;
          setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          // alert(err)
          console.log("err in api call", err);
          return
        });

      // itemSearch(bundleServiceSearch)
      //   .then((res) => {
      //     if (res.data.length > 0) {
      //       if (tempArray[id].selectFamily.value == "itemName") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemName)
      //         }
      //       } else if (tempArray[id].selectFamily.value == "itemHeaderDescription") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderDescription)
      //         }
      //       } else if (tempArray[id].selectFamily.value == "make") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderMake)
      //         }
      //       } else if (tempArray[id].selectFamily.value == "model") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemHeaderModel.model)
      //         }
      //       } else if (tempArray[id].selectFamily.value == "family") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderFamily)
      //         }
      //       } else if (tempArray[id].selectFamily.value == "prefix") {
      //         for (let i = 0; i < res.data.length; i++) {
      //           SearchResArr.push(res.data[i].itemHeaderModel.prefix)
      //         }
      //       }
      //     }
      //     obj.selectOptions = SearchResArr;
      //     tempArray[id] = obj;
      //     setQuerySearchSelector([...tempArray]);
      //     $(`.scrollbar-${id}`).css("display", "block");
      //   })
      //   .catch((err) => {
      //     alert(err)
      //     console.log("err in api call", err);
      //     return
      //   });
    }
    obj.inputSearch = e.target.value;
    setQuerySearchSelector([...tempArray]);
  };

  const handleModelInputSearch = (e) => {

    setCreateServiceOrBundle({ ...createServiceOrBundle, [e.target.name]: e.target.value, });
    var searchStr = "model~" + e.target.value;
    let loading, data, failure;
    getApiCall((GET_SEARCH_COVERAGE + searchStr), loading, data, failure)
      // getSearchQueryCoverage(searchStr)
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

  const handleLandingPageQuerySearchClick = async () => {
    try {
      if (selectedItemType == "" ||
        querySearchSelector[0]?.selectFamily?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined) {
        throw "Please fill data properly"
      }
      var searchStr;
      if (selectedItemType === "PORTFOLIO") {
        var selectedFamily = (querySearchSelector[0]?.selectFamily.value === "name" ||
          (querySearchSelector[0]?.selectFamily.value === "description") ?
          `portfolio_id=${querySearchSelector[0]?.selectedKeyValue}` : `${querySearchSelector[0]?.selectFamily.value}=${(querySearchSelector[0]?.inputSearch)}`);
        // var searchStr = `${selectedFamily}:"${(querySearchSelector[0]?.inputSearch)}"`;
        var searchStr = selectedFamily;
      } else {
        // var searchStr = `${querySearchSelector[0]?.selectFamily?.value}:"${(querySearchSelector[0]?.inputSearch)}"`;
        var searchStr = `itemIds=${(querySearchSelector[0]?.selectedKeyValue)}`;
        // var searchStr = `itemIds=${460}`;
      }

      for (let i = 1; i < querySearchSelector.length; i++) {
        if (
          querySearchSelector[i]?.selectFamily?.value == "" ||
          querySearchSelector[i]?.inputSearch == ""
          // ||
          // querySearchSelector[i]?.selectOperator?.value == ""

        ) {
          throw "Please fill data properly"
        }
        if (selectedItemType === "PORTFOLIO") {
          var selectedQuerySelectorFamily = (querySearchSelector[i].selectFamily.value === "name" ||
            (querySearchSelector[i].selectFamily.value === "description") ?
            `portfolio_id=${querySearchSelector[0]?.selectedKeyValue}` : `${querySearchSelector[i].selectFamily.value}=${(querySearchSelector[i]?.inputSearch)}`);

          // var selectedQuerySelectorValue = (querySearchSelector[i]?.selectFamily.value === "name" ||
          // (querySearchSelector[i]?.selectFamily.value === "description") ?
          // `${querySearchSelector[0]?.selectedKeyValue}` : `${(querySearchSelector[i]?.inputSearch)}`);
          searchStr =
            searchStr + "&" +
            // " " +
            // querySearchSelector[i].selectOperator.value + " " +
            (querySearchSelector[i].selectFamily.value === "name" ||
              (querySearchSelector[i].selectFamily.value === "description") ?
              `portfolio_id=${querySearchSelector[i]?.selectedKeyValue}` : `${querySearchSelector[i].selectFamily.value}=${(querySearchSelector[i]?.inputSearch)}`);
          // ":\"" +
          // querySearchSelector[i].inputSearch + "\"";
        } else {
          searchStr =
            searchStr +
            " " +
            querySearchSelector[i].selectOperator.value + " " +
            querySearchSelector[i].selectFamily.value +
            ":\"" +
            querySearchSelector[i].inputSearch + "\"";
        }
      }

      if (selectedItemType === "PORTFOLIO") {
        var newArr = [];
        const res2 = await portfolioSearchTableDataList(searchStr)
        if (res2.status === 200) {
          // for (var j = 0; j < res2.data.length; j++) {
          //   for (var k = 0; k < res2.data[j].items.length; k++) {
          //     newArr.push(res2.data[j].items[k]);
          //   }
          // }
          // var result = newArr.reduce((unique, o) => {
          //   if (!unique.some(obj => obj.itemId === o.itemId)) {
          //     unique.push(o);
          //   }
          //   return unique;
          // }, []);
          // // setPortfolioItemData(result);
          setPortfolioItemData(res2.data);

        } else {
          throw "No information is found for your search, change the search criteria";
        }




        console.log("set PortfolioItemData : ", res2)
      } else if (selectedItemType === "BUNDLE_ITEM") {
        // searchStr = "bundleFlag:BUNDLE_ITEM AND " + searchStr;
        // searchStr = "bundleFlag:BUNDLE_ITEM AND " + searchStr;

        // const res1 = await itemSearch(searchStr);
        let loading, data, failure;
        const res1 = await getApiCall(PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + searchStr, loading, data, failure);
        // const res1 = await getServiceBundleItemPrices(searchStr);
        var bundleItemsArr = [];
        if (res1.status === 200) {
          if (res1.data.length > 0) {
            res1.data.map((data, i) => {
              for (let c = 0; c < data.bundleItems.length; c++) {
                bundleItemsArr.push(data.bundleItems[c]);
              }
            })
            setBundleServiceItemData(bundleItemsArr);
          } else {
            throw "No information is found for your search, change the search criteria";
          }
          // setBundleServiceItemData(res1.data)
        } else {
          throw "No information is found for your search, change the search criteria";
        }

        // console.log("res1 is fsfnasjkvna", res1.data);
        // console.log(res1)

      } else if (selectedItemType === "SERVICE") {
        // searchStr = "bundleFlag:SERVICE AND " + searchStr;
        let loading, data, failure;
        const res1 = await getApiCall(PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + searchStr, loading, data, failure);
        // const res1 = await getServiceBundleItemPrices(searchStr);
        var serviceItemsArr = [];
        if (res1.status === 200) {
          if (res1.data.length > 0) {
            res1.data.map((data, i) => {
              for (let d = 0; d < data.serviceItems.length; d++) {
                serviceItemsArr.push(data.serviceItems[d]);
              }
            })
            setBundleServiceItemData(serviceItemsArr);
          } else {
            throw "No information is found for your search, change the search criteria";
          }
          // setBundleServiceItemData(res1.data);
        } else {
          throw "No information is found for your search, change the search criteria";
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
      return
    }
  };

  // console.log("set PortfolioItemData ------ -- : ", portfolioItemData)

  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none");
    console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr =
      querySearchSelector[0].selectFamily.value +
      "~" +
      querySearchSelector[0].inputSearch;

    for (let i = 1; i < querySearchSelector.length; i++) {
      searchStr =
        searchStr +
        " " +
        querySearchSelector[i].selectOperator.value +
        " " +
        querySearchSelector[i].selectFamily.value +
        "~" +
        querySearchSelector[i].inputSearch;
    }

    console.log("searchStr", searchStr);
    let loading, data, failure;
    getApiCall((GET_SEARCH_COVERAGE + searchStr), loading, data, failure)
      // getSearchQueryCoverage(searchStr)
      .then((res) => {
        console.log("search Query Result :", res);
        setMasterData(res);
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };
  const addSearchQuerryHtml = () => {
    // New Updated 24 Nov 2022
    if (count !== 2) {
      setQuerySearchSelector([
        ...querySearchSelector,
        {
          id: count,
          selectOperator: "",
          selectFamily: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
      setCount(count + 1);
    }

    // Old Before 24 Nov 2022
    // setQuerySearchSelector([
    //   ...querySearchSelector,
    //   {
    //     id: count,
    //     selectOperator: "",
    //     selectFamily: "",
    //     inputSearch: "",
    //     selectOptions: [],
    //     selectedOption: "",
    //   },
    // ]);
    // setCount(count + 1);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", tempArray[id]);
    let obj = tempArray[id];
    obj.inputSearch = "";
    obj.selectOptions = [];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);

  };

  const checkForDisabled = (option) => {
    if (querySearchSelector.length > 1) {
      if ((querySearchSelector[0].selectFamily.value === "name") ||
        (querySearchSelector[0].selectFamily.value === "description")) {
        if ((option.value === "name") ||
          (option.value === "description")) {
          return true
        }
      } else {
        if (option.value === querySearchSelector[0].selectFamily.value) {
          return true;
        }
      }
    } else {
      return false
    }
  }

  // const [querySearchModelSelector, setQuerySearchModelSelector] = useState([
  //   {
  //     searchMake: "",
  //     searchFamily: "",
  //     searchModel: "",
  //     SearchPrefix: []
  //   }
  // ])



  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      selectedKeyValue: "",
    },
  ]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };

  // Select Item Type 
  const handleItemType = useCallback(
    (e, i) => {
      // console.log("event is : ", e.value)
      // console.log("id is : ", id)
      setBundleServiceItemData([]);
      setPortfolioItemData([]);
      setSelectedItemType(e.value);

      let tempArray = [...querySearchSelector];
      // console.log("tempArray : ", tempArray)
      // let obj = tempArray[i];
      // // obj.selectFamily = "";
      // // tempArray[id] = obj;
      setQuerySearchSelector([{
        id: 0,
        selectFamily: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      }]);

      if (e.value === "PORTFOLIO") {
        setFamilySelectOption([
          // { label: "Make", value: "make", id: i },
          // { label: "Family", value: "family", id: i },
          // { label: "Model", value: "model", id: i },
          // { label: "Prefix", value: "serialNumberPrefix", id: i },
          { label: "Make", value: "make", id: i },
          { label: "Model", value: "model", id: i },
          { label: "Prefix", value: "prefix", id: i },
          { label: "Family", value: "family", id: i },
          { label: "Name", value: "name", id: i },
          { label: "Description", value: "description", id: i },
        ])
        setShowColumnDataOnService(false);
      } else if (e.value === "BUNDLE_ITEM") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
        setShowColumnDataOnService(false);
      } else if (e.value === "SERVICE") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
        setShowColumnDataOnService(true);
      }
    },
    [],
  );
  // (e, id) => {

  //   // let tempArray = [...querySearchSelector];
  //   // let obj = tempArray[id];
  //   // obj.itemType = e;
  //   // tempArray[id] = obj;
  //   // console.log("tempArray : ", tempArray)
  //   // setQuerySearchSelector(tempArray);
  // }

  const handleSearchModelListClick = (e, currentItem) => {
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      model: currentItem.model,
      make: currentItem.make,
      family: currentItem.family
    })
    setModelResultSelected(true);
    $(`.scrollbar-model`).css("display", "none");
  }

  const selectPrefixOption = (e) => {
    // console.log(e);
    setSelectedPrefixOption(e)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      prefix: e,
    })
  }

  const handleSelectCustomerSegment = (e) => {
    // console.log("e is : ", e)

    setSelectedCustomerSegmentOption(e)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      customerSegment: e,
    });
  }

  const handleSearchListClick = (e, currentItem, obj1, id) => {

    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];

    // obj.inputSearch = currentItem;
    // obj.selectedOption = currentItem;
    obj.inputSearch = (selectedItemType === "PORTFOLIO") ? (
      (obj1.selectFamily.value === "name") ||
      (obj1.selectFamily.value === "description")) ? currentItem.split("#")[1] : currentItem : currentItem.split("#")[1];
    obj.selectedOption = (selectedItemType === "PORTFOLIO") ?
      ((obj1.selectFamily.value === "name") ||
        (obj1.selectFamily.value === "description")) ? currentItem.split("#")[1] : currentItem : currentItem.split("#")[1];
    obj.selectedKeyValue = (selectedItemType === "PORTFOLIO") ?
      ((obj1.selectFamily.value === "name") ||
        (obj1.selectFamily.value === "description")) ? currentItem.split("#")[0] : currentItem :
      currentItem.split("#")[0];
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData];
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked };
        } else return currentItem;
      });
      setMasterData([...updated]);
      setFilterMasterData([...filterMasterData, { ...row }]);
    } else {
      var _filterMasterData = [...filterMasterData];
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id) return currentItem;
      });
      setFilterMasterData(updated);
    }
  };
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [count, setCount] = useState(1);
  const handleDeleteIncludeSerialNo = (e, row) => {
    const updated = selectedMasterData.filter((obj) => {
      if (obj.id !== row.id) return obj;
    });
    setSelectedMasterData(updated);
  };


  // Portfolio EditAble
  const makePortfolioEditableEditable = (portfolioData) => {
    // console.log("----------", PortfolioData);
    let portfolioDetails = {
      portfolioId: portfolioData.portfolioId,
      type: "fetch",
    };
    history.push({
      pathname: "/portfolio/new",
      state: portfolioDetails,
    });
  }

  const makeBundleServiceEditable = async (data) => {

    const fetchItemDetailsById = await getItemDataById(data.itemId);
    if (fetchItemDetailsById.status === 200) {
      // const editAbleBundleService = await getItemDataById(data.itemId);
      const editAbleBundleService = fetchItemDetailsById.data;

      setPortfolioServiceBundleId(editAbleBundleService.itemHeaderModel.portfolioItemId)

      setBundleServicePortfolioItemId(editAbleBundleService.itemHeaderModel.portfolioItemId)

      console.log("editAbleBundleService is ------ ", editAbleBundleService);
      setEditBundleService(true);
      setBundleAndServiceEditAble(true)
      setBundleServiceAdministrativeEditable(true);
      setPriceCalculatorTabEditAble(true);

      var bundleServiceItemPrice = "";

      if (editAbleBundleService.itemBodyModel.itemPrices.length > 0) {
        const res = await getItemPriceData(editAbleBundleService.itemBodyModel.itemPrices[0].itemPriceDataId)
        setItemPriceData(res.data);
        bundleServiceItemPrice = res.data;
        setAddPortFolioItem({
          id: editAbleBundleService.itemId,
          name: editAbleBundleService.itemName,
          description: editAbleBundleService.itemBodyModel.itemBodyDescription,
          // usageIn:{label:categoryUsageKeyValue1.label,value:categoryUsageKeyValue1.value},
          // taskType: {label:stratgyTaskTypeKeyValue.label,value:stratgyTaskTypeKeyValue.value},
          usageIn: editAbleBundleService.itemBodyModel.usageIn != "" ? {
            label: editAbleBundleService.itemBodyModel.usageIn,
            value: editAbleBundleService.itemBodyModel.usageIn
          } : "",
          taskType: {
            label: editAbleBundleService.itemBodyModel.taskType[0],
            value: editAbleBundleService.itemBodyModel.taskType[0]
          },
          frequency: ((bundleServiceItemPrice.frequency === "") ||
            bundleServiceItemPrice.frequency === null) ? "" : {
            label: bundleServiceItemPrice.frequency,
            value: bundleServiceItemPrice.frequency
          },
          unit: ((bundleServiceItemPrice.usageUnit === "") ||
            (bundleServiceItemPrice.usageUnit === null)) ? "" : {
            label: bundleServiceItemPrice.usageUnit,
            value: bundleServiceItemPrice.usageUnit
          },
          recommendedValue: bundleServiceItemPrice.recommendedValue,
          quantity: bundleServiceItemPrice.quantity,
          numberOfEvents: bundleServiceItemPrice.numberOfEvents,
          templateId: bundleServiceItemPrice.standardJobId,
          templateDescription: bundleServiceItemPrice.templateDescription,
          relatedKit: bundleServiceItemPrice.repairKitId,
          kitDescription: "",
          repairOption: bundleServiceItemPrice.repairKitId,
          strategyTask: editAbleBundleService.itemHeaderModel.itemHeaderStrategy,
          year: bundleServiceItemPrice.year,
          noOfYear: bundleServiceItemPrice.noOfYear,
          headerdescription: editAbleBundleService.itemBodyModel.itemBodyDescription,
          preparedBy: editAbleBundleService.itemHeaderModel.preparedBy,
          approvedBy: editAbleBundleService.itemHeaderModel.approvedBy,
          preparedOn: editAbleBundleService.itemHeaderModel.preparedOn,
          revisedBy: editAbleBundleService.itemHeaderModel.revisedBy,
          revisedOn: editAbleBundleService.itemHeaderModel.revisedOn,
          salesOffice: {
            label: editAbleBundleService.itemHeaderModel.salesOffice,
            value: editAbleBundleService.itemHeaderModel.salesOffice
          },
          offerValidity: {
            label: editAbleBundleService.itemHeaderModel.offerValidity,
            value: editAbleBundleService.itemHeaderModel.offerValidity
          },
          startUsage: bundleServiceItemPrice.startUsage,
          endUsage: bundleServiceItemPrice.endUsage,
          usageType: {
            label: editAbleBundleService.itemBodyModel.usage,
            value: editAbleBundleService.itemBodyModel.usage
          },
          withBundleService: editAbleBundleService.itemHeaderModel.withBundleService,
          currency: {
            label: editAbleBundleService.itemHeaderModel.currency,
            value: editAbleBundleService.itemHeaderModel.currency
          }
        })
      } else {
        setItemPriceData({
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
          netPrice: 0,
          totalPrice: 0,
          listPrice: "",
          calculatedPrice: "",
          priceYear: "",
          usageType: "",
          frequency: "",
          cycle: "",
          suppresion: "",
          id: "",
          // portfolioDataId: 1,
        })
        bundleServiceItemPrice = {
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
          netPrice: 0,
          totalPrice: 0,
          listPrice: "",
          calculatedPrice: "",
          priceYear: "",
          usageType: "",
          frequency: "",
          cycle: "",
          suppresion: "",
          id: "",
          // portfolioDataId: 1,
        }
        setAddPortFolioItem({
          id: editAbleBundleService.itemId,
          name: editAbleBundleService.itemName,
          description: editAbleBundleService.itemBodyModel.itemBodyDescription,
          // usageIn:{label:categoryUsageKeyValue1.label,value:categoryUsageKeyValue1.value},
          // taskType: {label:stratgyTaskTypeKeyValue.label,value:stratgyTaskTypeKeyValue.value},
          usageIn: editAbleBundleService.itemBodyModel.usageIn != "" ? {
            label: editAbleBundleService.itemBodyModel.usageIn,
            value: editAbleBundleService.itemBodyModel.usageIn
          } : "",
          taskType: {
            label: editAbleBundleService.itemBodyModel.taskType[0],
            value: editAbleBundleService.itemBodyModel.taskType[0]
          },
          frequency: editAbleBundleService.itemBodyModel.frequency != "" ? {
            label: editAbleBundleService.itemBodyModel.frequency,
            value: editAbleBundleService.itemBodyModel.frequency
          } : "",
          unit: {
            label: editAbleBundleService.itemBodyModel.unit,
            value: editAbleBundleService.itemBodyModel.unit
          },
          recommendedValue: bundleServiceItemPrice.recommendedValue,
          quantity: bundleServiceItemPrice.quantity,
          numberOfEvents: bundleServiceItemPrice.numberOfEvents,
          templateId: bundleServiceItemPrice.standardJobId,
          templateDescription: bundleServiceItemPrice.templateDescription,
          relatedKit: bundleServiceItemPrice.repairKitId,
          kitDescription: "",
          repairOption: bundleServiceItemPrice.repairKitId,
          strategyTask: editAbleBundleService.itemHeaderModel.itemHeaderStrategy,
          year: bundleServiceItemPrice.year,
          noOfYear: bundleServiceItemPrice.noOfYear,
          headerdescription: editAbleBundleService.itemBodyModel.itemBodyDescription,
          preparedBy: editAbleBundleService.itemHeaderModel.preparedBy,
          approvedBy: editAbleBundleService.itemHeaderModel.approvedBy,
          preparedOn: editAbleBundleService.itemHeaderModel.preparedOn,
          revisedBy: editAbleBundleService.itemHeaderModel.revisedBy,
          revisedOn: editAbleBundleService.itemHeaderModel.revisedOn,
          salesOffice: {
            label: editAbleBundleService.itemHeaderModel.salesOffice,
            value: editAbleBundleService.itemHeaderModel.salesOffice
          },
          offerValidity: {
            label: editAbleBundleService.itemHeaderModel.offerValidity,
            value: editAbleBundleService.itemHeaderModel.offerValidity
          },
          startUsage: bundleServiceItemPrice.startUsage,
          endUsage: bundleServiceItemPrice.endUsage,
          usageType: {
            label: editAbleBundleService.itemBodyModel.usage,
            value: editAbleBundleService.itemBodyModel.usage
          },
          withBundleService: editAbleBundleService.itemHeaderModel.withBundleService,
          currency: {
            label: editAbleBundleService.itemHeaderModel.currency,
            value: editAbleBundleService.itemHeaderModel.currency
          }
        })
      }

      if (editAbleBundleService.itemHeaderModel.model !== "") {
        var searchStr = "model~" + editAbleBundleService.itemHeaderModel.model;
        let loading, data, failure;
        getApiCall((GET_SEARCH_COVERAGE + searchStr), loading, data, failure)
          // getSearchQueryCoverage(searchStr)
          .then((res) => {
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

      if (editAbleBundleService.itemHeaderModel.bundleFlag === "SERVICE") {
        setServiceOrBundlePrefix("SERVICE");
        setBundleTabs("bundleServiceHeader")
        setBundleServiceShow(true);
        setCreateServiceOrBundle({
          id: editAbleBundleService.itemId,
          name: editAbleBundleService.itemName,
          description: editAbleBundleService.itemHeaderModel.itemHeaderDescription,
          bundleFlag: editAbleBundleService.itemHeaderModel.bundleFlag,
          reference: editAbleBundleService.itemHeaderModel.reference,
          customerSegment: { label: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment, value: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment },
          make: editAbleBundleService.itemHeaderModel.itemHeaderMake,
          model: editAbleBundleService.itemHeaderModel.model,
          family: editAbleBundleService.itemHeaderModel.itemHeaderFamily,
          prefix: { label: editAbleBundleService.itemHeaderModel.prefix, value: editAbleBundleService.itemHeaderModel.prefix },
          machine: { label: editAbleBundleService.itemHeaderModel.type, value: editAbleBundleService.itemHeaderModel.type },
          additional: "",
          estimatedTime: editAbleBundleService.itemHeaderModel.estimatedTime,
          machineComponent: { label: editAbleBundleService.itemHeaderModel.type, value: editAbleBundleService.itemHeaderModel.type },
        });

        setModelResultSelected(((editAbleBundleService.itemHeaderModel.model === "") || (editAbleBundleService.itemHeaderModel.model === null) || (editAbleBundleService.itemHeaderModel.model === undefined)) ? false : true)

        setSelectedCustomerSegmentOption({ label: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment, value: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment })

        setSelectedPrefixOption({ label: editAbleBundleService.itemHeaderModel.prefix, value: editAbleBundleService.itemHeaderModel.prefix });

        setBundleServiceChargeableOrNot(editAbleBundleService.itemHeaderModel.serviceChargable)

        if (editAbleBundleService.itemHeaderModel.serviceChargable) {
          setValue4({
            value: "chargeable",
            label: "Chargeable"
          });
        } else {
          setValue4({
            value: "free",
            label: "Free"
          });
        }

        var offerValidityLabel;
        if (editAbleBundleService.itemHeaderModel.offerValidity == "15") {
          offerValidityLabel = "15 days";
        } else if (editAbleBundleService.itemHeaderModel.offerValidity == "30") {
          offerValidityLabel = "1 month";
        } else if (editAbleBundleService.itemHeaderModel.offerValidity == "45") {
          offerValidityLabel = "45 days";
        } else if (editAbleBundleService.itemHeaderModel.offerValidity == "60") {
          offerValidityLabel = "2 month";
        } else {
          offerValidityLabel = editAbleBundleService.itemHeaderModel.offerValidity;
        }

        setValue2({
          value: editAbleBundleService.itemHeaderModel.status,
          label: editAbleBundleService.itemHeaderModel.status,
        });
        if (editAbleBundleService.itemHeaderModel.status === "ACTIVE") {
          setIsActiveStatus(true)
        } else {
          setIsActiveStatus(false)
        }

        setAdministrative({
          preparedBy: editAbleBundleService.itemHeaderModel.preparedBy,
          approvedBy: editAbleBundleService.itemHeaderModel.approvedBy,
          preparedOn: editAbleBundleService.itemHeaderModel.preparedOn,
          revisedBy: editAbleBundleService.itemHeaderModel.revisedBy,
          revisedOn: editAbleBundleService.itemHeaderModel.revisedOn,
          salesOffice: { label: editAbleBundleService.itemHeaderModel.salesOffice, value: editAbleBundleService.itemHeaderModel.salesOffice },
          offerValidity: { label: offerValidityLabel, value: editAbleBundleService.itemHeaderModel.offerValidity },
        });

        setEditableServiceOrBundleData(editAbleBundleService);
      } else if (editAbleBundleService.itemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
        setServiceOrBundlePrefix("BUNDLE");
        setBundleTabs("bundleServiceHeader")
        setBundleServiceShow(true);
        setCreateServiceOrBundle({
          id: editAbleBundleService.itemId,
          name: editAbleBundleService.itemName,
          description: editAbleBundleService.itemHeaderModel.itemHeaderDescription,
          bundleFlag: editAbleBundleService.itemHeaderModel.bundleFlag,
          reference: editAbleBundleService.itemHeaderModel.itemHeaderDescription,
          customerSegment: "",
          make: editAbleBundleService.itemHeaderModel.itemHeaderMake,
          model: editAbleBundleService.itemHeaderModel.model,
          family: editAbleBundleService.itemHeaderModel.itemHeaderFamily,
          prefix: { label: editAbleBundleService.itemHeaderModel.prefix, value: editAbleBundleService.itemHeaderModel.prefix },
          machine: { label: editAbleBundleService.itemHeaderModel.type, value: editAbleBundleService.itemHeaderModel.type },
          additional: "",
          estimatedTime: editAbleBundleService.itemHeaderModel.estimatedTime,
          machineComponent: { label: editAbleBundleService.itemHeaderModel.type, value: editAbleBundleService.itemHeaderModel.type },
        });

        setModelResultSelected(((editAbleBundleService.itemHeaderModel.model === "") || (editAbleBundleService.itemHeaderModel.model === null) || (editAbleBundleService.itemHeaderModel.model === undefined)) ? false : true)
        setSelectedCustomerSegmentOption({ label: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment, value: editAbleBundleService.itemHeaderModel.itemHeaderCustomerSegment })

        setSelectedPrefixOption({ label: editAbleBundleService.itemHeaderModel.prefix, value: editAbleBundleService.itemHeaderModel.prefix });
        setAdministrative({
          preparedBy: editAbleBundleService.itemHeaderModel.preparedBy,
          approvedBy: editAbleBundleService.itemHeaderModel.approvedBy,
          preparedOn: editAbleBundleService.itemHeaderModel.preparedOn,
          revisedBy: editAbleBundleService.itemHeaderModel.revisedBy,
          revisedOn: editAbleBundleService.itemHeaderModel.revisedOn,
          salesOffice: { label: editAbleBundleService.itemHeaderModel.salesOffice, value: editAbleBundleService.itemHeaderModel.salesOffice },
          offerValidity: { label: editAbleBundleService.itemHeaderModel.offerValidity, value: editAbleBundleService.itemHeaderModel.offerValidity },
        });

        setValue2({
          value: editAbleBundleService.itemHeaderModel.status,
          label: editAbleBundleService.itemHeaderModel.status,
        });

        if (editAbleBundleService.itemHeaderModel.status === "ACTIVE") {
          setIsActiveStatus(true)
        } else {
          setIsActiveStatus(false)
        }

        console.log("datais -----------", data)

        setPassItemEditRowData(editAbleBundleService)
        setEditableServiceOrBundleData(editAbleBundleService);
      }
    }

  }

  const makeBundleServiceHeaderEditable = () => {
    try {
      if (value2.value == "ACTIVE") {
        toast(`😐 Active ${serviceOrBundlePrefix === "SERVICE" ? "Service" : "Bundle"} cannot be changed, change status to revise to modify`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setBundleAndServiceEditAble(false);
        setIsActiveStatus(false);
      }
    } catch (error) {

    }
  }

  // const columns2 = [
  //   { field: "GroupNumber", headerName: "ID#", flex: 1, width: 70 },
  //   { field: "Type", headerName: "Description", flex: 1, width: 130 },
  //   { field: "Partnumber", headerName: "Customer#", flex: 1, width: 130 },
  //   { field: "PriceExtended", headerName: "Make", flex: 1, width: 130 },
  //   { field: "Pricecurrency", headerName: "Model", flex: 1, width: 130 },
  //   { field: "Usage", headerName: "Family", flex: 1, width: 130 },
  //   { field: "TotalPrice", headerName: "Serial#", flex: 1, width: 130 },
  //   { field: "Comments", headerName: "Created by", flex: 1, width: 130 },
  //   { field: "Created", headerName: "Created On", flex: 1, width: 130 },
  //   { field: "Total", headerName: "Total $", flex: 1, width: 130 },
  //   { field: "Status", headerName: "Status", flex: 1, width: 130 },
  //   // { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
  //   // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
  //   // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
  //   // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
  //   // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
  //   //   `${params.getValue(params.id, 'firstName') || ''} ${
  //   //       params.getValue(params.id, 'DocumentType') || ''
  //   //     }`,
  // ];

  const columns2 = [
    {
      name: (
        <>
          <div>Group Number</div>
        </>
      ),
      selector: (row) => row.GroupNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.GroupNumber,
    },
    {
      name: (
        <>
          <div>Type</div>
        </>
      ),
      selector: (row) => row.Type,
      wrap: true,
      sortable: true,
      format: (row) => row.Type,
    },
    {
      name: (
        <>
          <div>Part number</div>
        </>
      ),
      selector: (row) => row.Partnumber,
      wrap: true,
      sortable: true,
      format: (row) => row.Partnumber,
    },
    {
      name: (
        <>
          <div>Price Extended</div>
        </>
      ),
      selector: (row) => row.PriceExtended,
      wrap: true,
      sortable: true,
      format: (row) => row.PriceExtended,
    },
    {
      name: (
        <>
          <div>Price currency</div>
        </>
      ),
      selector: (row) => row.Pricecurrency,
      wrap: true,
      sortable: true,
      format: (row) => row.Pricecurrency,
    },
    {
      name: (
        <>
          <div>Usage</div>
        </>
      ),
      selector: (row) => row.Usage,
      wrap: true,
      sortable: true,
      format: (row) => row.Usage,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.TotalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.TotalPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.Comments,
      wrap: true,
      sortable: true,
      format: (row) => row.Comments,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.Actions,
      wrap: true,
      sortable: true,
      format: (row) => row.Actions,
    },
  ]

  const handleCreatePortfolio = async () => {
    let reqData = {
      name: "",
      description: "",
      machineType: "EMPTY",
      searchTerm: "",
      lubricant: true,
      customerId: 0,
      customerGroup: "",
      customerSegment: "",
      externalReference: "",
      status: "",
      validFrom: "",
      validTo: "",
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
      items: [{ itemId: 0 }],
      coverages: [{ coverageId: 0 }],
      portfolioPrice: { portfolioPriceId: 0 },
      additionalPrice: { additionalPriceId: 0 },
      escalationPrice: { escalationPriceId: 0 },
      visibleInCommerce: true,
    };
    // const portfolioRes = await createPortfolio(reqData);
    // console.log("portfolioResponse",portfolioResponse)
    // setPortfolioResponse(portfolioRes)
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = (e) => {
    console.log("handleClose1 e:", e);
    setAnchorEl(null);
  };

  // console.log("family option is : ", familySelectOption)

  // SERVICE/BUNDLE MODEL FUNCTIONS
  const saveAddNewServiceOrBundle = async () => {
    try {
      // if(createServiceOrBundle.description==""||createServiceOrBundle.model==""){
      //   throw "Please fill fields properly"
      // }
      if (editBundleService) {
        if (isActiveStatus) {
          setBundleServiceShow(false);
          setBundleTabs("bundleServiceHeader");
          setAddPortFolioItem({})
        } else {

          if (!bundleAndServiceEditAble || !priceCalculatorTabEditAble) {
            // Old Working Update Item request Obj
            // let reqObj = {
            //   itemId: createServiceOrBundle.id,
            //   itemName: createServiceOrBundle.name,
            //   itemHeaderModel: {
            //     itemHeaderId: createServiceOrBundle.id,
            //     itemHeaderDescription: createServiceOrBundle.description,
            //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            //     withBundleService: false,
            //     portfolioItemId: bundleServicePortfolioItemId,
            //     reference: createServiceOrBundle.reference,
            //     itemHeaderMake: createServiceOrBundle.make,
            //     itemHeaderFamily: createServiceOrBundle.family,
            //     model: createServiceOrBundle.model,
            //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
            //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
            //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
            //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
            //     netPrice: 0,
            //     itemProductHierarchy: "EMPTY",
            //     itemHeaderGeographic: "EMPTY",
            //     responseTime: "EMPTY",
            //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            //     validFrom: "",
            //     validTo: "",
            //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
            //     servicePrice: 0,
            //     status: value2.value,
            //     componentCode: "",
            //     componentDescription: "",
            //     serialNumber: "",
            //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
            //     variant: "",
            //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
            //     jobCode: "",
            //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
            //     serviceChargable: bundleServiceChargeableOrNot,
            //     serviceOptional: (!bundleServiceChargeableOrNot)
            //   },
            //   itemBodyModel: {
            //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
            //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
            //     spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
            //     labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
            //     miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
            //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
            //     solutionCode: "",
            //     usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
            //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
            //     avgUsage: 0,
            //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : editableServiceOrBundleData?.itemBodyModel?.unit ? editableServiceOrBundleData?.itemBodyModel?.unit : "",
            //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : editableServiceOrBundleData?.itemBodyModel?.frequency ? editableServiceOrBundleData?.itemBodyModel?.frequency : "",
            //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
            //       {
            //         itemPriceDataId: itemPriceData.itemPriceDataId
            //       }
            //     ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
            //       itemPriceData.itemPriceDataId == 0) ? [] : [
            //       {
            //         itemPriceDataId: itemPriceData.itemPriceDataId
            //       }
            //     ] : [],
            //   },
            // }

            // Current Working Request Obj
            let reqObj = {
              itemId: createServiceOrBundle.id,
              itemName: createServiceOrBundle.name,
              itemHeaderModel: {
                itemHeaderId: createServiceOrBundle.id,
                itemHeaderDescription: createServiceOrBundle.description,
                bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                withBundleService: false,
                portfolioItemId: bundleServicePortfolioItemId,
                reference: createServiceOrBundle.reference,
                itemHeaderMake: createServiceOrBundle.make,
                itemHeaderFamily: createServiceOrBundle.family,
                model: createServiceOrBundle.model,
                prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
                type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
                additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
                currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
                netPrice: 0,
                itemProductHierarchy: "EMPTY",
                itemHeaderGeographic: "EMPTY",
                responseTime: "EMPTY",
                usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                validFrom: "",
                validTo: "",
                estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
                servicePrice: 0,
                status: value2.value,
                componentCode: "",
                componentDescription: "",
                serialNumber: "",
                itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
                variant: "",
                itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
                jobCode: "",
                preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
                approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
                preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
                revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
                revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
                salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
                offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
                serviceChargable: bundleServiceChargeableOrNot,
                serviceOptional: (!bundleServiceChargeableOrNot)
              },
              itemBodyModel: {
                itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
                itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
                spareParts: ["EMPTY"],
                labours: ["EMPTY"],
                miscellaneous: ["EMPTY"],
                // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
                // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
                // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
                taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
                solutionCode: "",
                usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
                usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
                avgUsage: 0,
                itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
                  {
                    itemPriceDataId: itemPriceData.itemPriceDataId
                  }
                ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
                  itemPriceData.itemPriceDataId == 0) ? [] : [
                  {
                    itemPriceDataId: itemPriceData.itemPriceDataId
                  }
                ] : [],
              },
            }

            const res = await updateItemData(createServiceOrBundle.id, reqObj);
            if (res.status === 200) {
              // toast("😎" + `Bundle ${createServiceOrBundle.name} updated successfully`, {
              //   position: "top-right",
              //   autoClose: 3000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              // });
              setBundleServiceShow(false);
              setBundleTabs("bundleServiceHeader")
              setAddPortFolioItem({})
              // setBundleTabs("bundleServiceCalculator");
              // setAddPortFolioItem({});

            }
          } else if (bundleServiceAdministrativeEditable) {
            setBundleServiceShow(false);
            setBundleTabs("bundleServiceHeader");
            setAddPortFolioItem({})
          } else {

            // old Working update Item request Obj
            // let reqObj = {
            //   itemId: createServiceOrBundle.id,
            //   itemName: createServiceOrBundle.name,
            //   itemHeaderModel: {
            //     itemHeaderId: createServiceOrBundle.id,
            //     itemHeaderDescription: createServiceOrBundle.description,
            //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            //     withBundleService: false,
            //     portfolioItemId: bundleServicePortfolioItemId,
            //     reference: createServiceOrBundle.reference,
            //     itemHeaderMake: createServiceOrBundle.make,
            //     itemHeaderFamily: createServiceOrBundle.family,
            //     model: createServiceOrBundle.model,
            //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
            //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
            //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
            //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
            //     netPrice: 0,
            //     itemProductHierarchy: "EMPTY",
            //     itemHeaderGeographic: "EMPTY",
            //     responseTime: "EMPTY",
            //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            //     validFrom: "",
            //     validTo: "",
            //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
            //     servicePrice: 0,
            //     status: value2.value,
            //     componentCode: "",
            //     componentDescription: "",
            //     serialNumber: "",
            //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
            //     variant: "",
            //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
            //     jobCode: "",
            //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
            //     serviceChargable: bundleServiceChargeableOrNot,
            //     serviceOptional: (!bundleServiceChargeableOrNot)
            //   },
            //   itemBodyModel: {
            //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
            //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
            //     spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
            //     labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
            //     miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
            //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
            //     solutionCode: "",
            //     usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
            //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
            //     avgUsage: 0,
            //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : editableServiceOrBundleData?.itemBodyModel?.unit ? editableServiceOrBundleData?.itemBodyModel?.unit : "",
            //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : editableServiceOrBundleData?.itemBodyModel?.frequency ? editableServiceOrBundleData?.itemBodyModel?.frequency : "",
            //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
            //       {
            //         itemPriceDataId: itemPriceData.itemPriceDataId
            //       }
            //     ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
            //       itemPriceData.itemPriceDataId == 0) ? [] : [
            //       {
            //         itemPriceDataId: itemPriceData.itemPriceDataId
            //       }
            //     ] : [],
            //   },
            // }

            // Current Working Request Obj
            let reqObj = {
              itemId: createServiceOrBundle.id,
              itemName: createServiceOrBundle.name,
              itemHeaderModel: {
                itemHeaderId: createServiceOrBundle.id,
                itemHeaderDescription: createServiceOrBundle.description,
                bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                withBundleService: false,
                portfolioItemId: bundleServicePortfolioItemId,
                reference: createServiceOrBundle.reference,
                itemHeaderMake: createServiceOrBundle.make,
                itemHeaderFamily: createServiceOrBundle.family,
                model: createServiceOrBundle.model,
                prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
                type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
                additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
                currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
                netPrice: 0,
                itemProductHierarchy: "EMPTY",
                itemHeaderGeographic: "EMPTY",
                responseTime: "EMPTY",
                usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                validFrom: "",
                validTo: "",
                estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
                servicePrice: 0,
                status: value2.value,
                componentCode: "",
                componentDescription: "",
                serialNumber: "",
                itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
                variant: "",
                itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
                jobCode: "",
                preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
                approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
                preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
                revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
                revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
                salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
                offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
                serviceChargable: bundleServiceChargeableOrNot,
                serviceOptional: (!bundleServiceChargeableOrNot)
              },
              itemBodyModel: {
                itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
                itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
                spareParts: ["EMPTY"],
                labours: ["EMPTY"],
                miscellaneous: ["EMPTY"],
                // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
                // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
                // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
                taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
                solutionCode: "",
                usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
                usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
                avgUsage: 0,
                itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
                  {
                    itemPriceDataId: itemPriceData.itemPriceDataId
                  }
                ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
                  itemPriceData.itemPriceDataId == 0) ? [] : [
                  {
                    itemPriceDataId: itemPriceData.itemPriceDataId
                  }
                ] : [],
              },
            }

            const res = await updateItemData(createServiceOrBundle.id, reqObj);
            if (res.status === 200) {
              toast("😎" + `Bundle ${createServiceOrBundle.name} updated successfully`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setBundleServiceShow(false);
              setBundleTabs("bundleServiceHeader")
              setAddPortFolioItem({})
              // setBundleTabs("bundleServiceCalculator");
              // setAddPortFolioItem({});

            }
          }


        }
      } else {
        let reqObj = {
          itemId: 0,
          itemName: createServiceOrBundle.name,
          itemHeaderModel: {
            itemHeaderId: 0,
            itemHeaderDescription: createServiceOrBundle.description,
            bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            portfolioItemId: 0,
            reference: createServiceOrBundle.reference,
            itemHeaderMake: createServiceOrBundle.make,
            itemHeaderFamily: createServiceOrBundle.family,
            model: createServiceOrBundle.model,
            prefix: createServiceOrBundle.prefix,
            type: "EMPTY",
            additional: createServiceOrBundle.additional.value,
            currency: "",
            netPrice: 0,
            itemProductHierarchy: "END_PRODUCT",
            itemHeaderGeographic: "ONSITE",
            responseTime: "PROACTIVE",
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
            validFrom: "",
            validTo: "",
            estimatedTime: "",
            servicePrice: 0,
            status: "DRAFT",
            itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
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
            quantity: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.quantity) : 0,
            startUsage: "",
            endUsage: priceCalculator.startUsage ? priceCalculator.startUsage : "",
            standardJobId: priceCalculator.endUsage ? priceCalculator.endUsage : "",
            frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
            additional: "",
            spareParts: ["WITH_SPARE_PARTS"],
            labours: ["WITH_LABOUR"],
            miscellaneous: ["LUBRICANTS"],
            taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
            solutionCode: "",
            usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
            recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
            repairKitId: "",
            templateDescription: "",
            partListId: "",
            serviceEstimateId: "",
            numberOfEvents: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.numberOfEvents) : 0,
            repairOption: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.repairOption.value : "",
            priceMethod: "LIST_PRICE",
            listPrice: priceCalculator.listPrice ? parseInt(priceCalculator.listPrice) : 0,
            priceEscalation: "",
            calculatedPrice: priceCalculator.calculatedPrice ? parseInt(priceCalculator.calculatedPrice) : 0,
            flatPrice: priceCalculator.flatPrice ? parseInt(priceCalculator.flatPrice) : 0,
            discountType: "",
            year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
            avgUsage: 0,
            unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
            sparePartsPrice: 0,
            sparePartsPriceBreakDownPercentage: 0,
            servicePrice: 0,
            servicePriceBreakDownPercentage: 0,
            miscPrice: 0,
            miscPriceBreakDownPercentage: 0,
            totalPrice: 0
          }
        }


        // const res = await itemCreation(reqObj);
        // if (res.status === 200) {
        //   toast("😎" + `${serviceOrBundlePrefix} created`, {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        //   setAddPortFolioItem({});

        // }
        // setAddPortFolioItem({});
      }
      console.log("editBundleService : ", editBundleService)
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
  };

  const handleAddServiceBundleChange = (e) => {
    setCreateServiceOrBundle({ ...createServiceOrBundle, [e.target.name]: e.target.value, });
  };

  const changeServiceOrBundlePrefix1 = (prefix) => {
    setServiceOrBundlePrefix(prefix);
    setBundleServiceShow(true);
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

        if (querySearchModelResult.length > 0 && !modelResultSelected) {
          throw "Model is a required field, Select any Model from list";
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

        if (querySearchModelResult.length > 0 && !modelResultSelected) {
          throw "Model is a required field, Select any Model from list";
        }

        if (editBundleService) {
          if (isActiveStatus) {
            setBundleTabs("bundleServicePriceCalculator")
          } else {
            if (bundleAndServiceEditAble) {
              setBundleTabs("bundleServicePriceCalculator")
            } else {
              // Old Working request obj
              // let reqObj = {
              //   itemId: createServiceOrBundle.id,
              //   itemName: createServiceOrBundle.name,
              //   itemHeaderModel: {
              //     itemHeaderId: createServiceOrBundle.id,
              //     itemHeaderDescription: createServiceOrBundle.description,
              //     bundleFlag: "SERVICE",
              //     withBundleService: false,
              //     portfolioItemId: bundleServicePortfolioItemId,
              //     reference: createServiceOrBundle.reference,
              //     itemHeaderMake: createServiceOrBundle.make,
              //     itemHeaderFamily: createServiceOrBundle.family,
              //     model: createServiceOrBundle.model,
              //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
              //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
              //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
              //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
              //     netPrice: 0,
              //     itemProductHierarchy: "EMPTY",
              //     itemHeaderGeographic: "EMPTY",
              //     responseTime: "EMPTY",
              //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
              //     validFrom: "",
              //     validTo: "",
              //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
              //     servicePrice: 0,
              //     status: value2.value,
              //     componentCode: "",
              //     componentDescription: "",
              //     serialNumber: "",
              //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "EMPTY",
              //     variant: "",
              //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
              //     jobCode: "",
              //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
              //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
              //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
              //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
              //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
              //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
              //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
              //     serviceChargable: bundleServiceChargeableOrNot,
              //     serviceOptional: (!bundleServiceChargeableOrNot)
              //   },
              //   itemBodyModel: {
              //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
              //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
              //     spareParts: ["EMPTY"],
              //     labours: ["EMPTY"],
              //     miscellaneous: ["EMPTY"],
              //     taskType: ["EMPTY"],
              //     solutionCode: "",
              //     // usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageTypeIn?.value : "",
              //     usageIn: addPortFolioItem?.usageIn ? addPortFolioItem.usageIn?.value : "",
              //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
              //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
              //     avgUsage: 0,
              //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : "",
              //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : "",
              //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ?
              //       (itemPriceData.itemPriceDataId == undefined ||
              //         itemPriceData.itemPriceDataId == 0) ? [] : [
              //         {
              //           itemPriceDataId: itemPriceData.itemPriceDataId
              //         }
              //       ] : serviceOrBundlePrefix === "SERVICE" ?
              //         (itemPriceData.itemPriceDataId == undefined ||
              //           itemPriceData.itemPriceDataId == 0) ? [] : [
              //           {
              //             itemPriceDataId: itemPriceData.itemPriceDataId
              //           }
              //         ] : [],
              //   },
              // }

              // Current Working Request Obj
              let reqObj = {
                itemId: createServiceOrBundle.id,
                itemName: createServiceOrBundle.name,
                itemHeaderModel: {
                  itemHeaderId: createServiceOrBundle.id,
                  itemHeaderDescription: createServiceOrBundle.description,
                  bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
                  withBundleService: false,
                  portfolioItemId: bundleServicePortfolioItemId,
                  reference: createServiceOrBundle.reference,
                  itemHeaderMake: createServiceOrBundle.make,
                  itemHeaderFamily: createServiceOrBundle.family,
                  model: createServiceOrBundle.model,
                  prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
                  type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
                  additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
                  currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
                  netPrice: 0,
                  itemProductHierarchy: "EMPTY",
                  itemHeaderGeographic: "EMPTY",
                  responseTime: "EMPTY",
                  usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                  validFrom: "",
                  validTo: "",
                  estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
                  servicePrice: 0,
                  status: value2.value,
                  componentCode: "",
                  componentDescription: "",
                  serialNumber: "",
                  itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
                  variant: "",
                  itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
                  jobCode: "",
                  preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
                  approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
                  preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
                  revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
                  revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
                  salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
                  offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
                  serviceChargable: bundleServiceChargeableOrNot,
                  serviceOptional: (!bundleServiceChargeableOrNot)
                },
                itemBodyModel: {
                  itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
                  itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
                  spareParts: ["EMPTY"],
                  labours: ["EMPTY"],
                  miscellaneous: ["EMPTY"],
                  // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
                  // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
                  // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
                  taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
                  solutionCode: "",
                  usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
                  usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
                  year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
                  avgUsage: 0,
                  itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
                    {
                      itemPriceDataId: itemPriceData.itemPriceDataId
                    }
                  ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
                    itemPriceData.itemPriceDataId == 0) ? [] : [
                    {
                      itemPriceDataId: itemPriceData.itemPriceDataId
                    }
                  ] : [],
                },
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
                setBundleTabs("bundleServicePriceCalculator")
              }
            }
          }
        } else {
          // Old Working Todo 
          // let reqObj = {
          //   itemId: 0,
          //   itemName: createServiceOrBundle.name,
          //   itemHeaderModel: {
          //     itemHeaderId: 0,
          //     itemHeaderDescription: createServiceOrBundle.description,
          //     bundleFlag: "SERVICE",
          //     withBundleService: false,
          //     portfolioItemId: 0,
          //     reference: createServiceOrBundle.reference,
          //     itemHeaderMake: createServiceOrBundle.make,
          //     itemHeaderFamily: createServiceOrBundle.family,
          //     model: createServiceOrBundle.model,
          //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
          //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
          //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
          //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
          //     netPrice: 0,
          //     itemProductHierarchy: "EMPTY",
          //     itemHeaderGeographic: "EMPTY",
          //     responseTime: "EMPTY",
          //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
          //     validFrom: "",
          //     validTo: "",
          //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
          //     servicePrice: 0,
          //     status: "DRAFT",
          //     componentCode: "",
          //     componentDescription: "",
          //     serialNumber: "",
          //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "EMPTY",
          //     variant: "",
          //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
          //     jobCode: "",
          //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
          //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
          //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
          //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
          //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
          //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
          //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
          //     serviceChargable: bundleServiceChargeableOrNot,
          //     serviceOptional: (!bundleServiceChargeableOrNot)
          //   },
          //   itemBodyModel: {
          //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
          //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
          //     spareParts: ["EMPTY"],
          //     labours: ["EMPTY"],
          //     miscellaneous: ["EMPTY"],
          //     taskType: ["EMPTY"],
          //     solutionCode: "",
          //     usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : "",
          //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
          //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
          //     avgUsage: 0,
          //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : "",
          //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : "",
          //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
          //       {
          //         itemPriceDataId: itemPriceData.itemPriceDataId
          //       }
          //     ] : [],
          //   },
          // }

          // Current Working Todo
          let reqObj = {
            itemId: 0,
            itemName: createServiceOrBundle.name,
            itemHeaderModel: {
              itemHeaderId: 0,
              itemHeaderDescription: createServiceOrBundle.description,
              bundleFlag: "SERVICE",
              withBundleService: false,
              portfolioItemId: 0,
              reference: createServiceOrBundle.reference,
              itemHeaderMake: createServiceOrBundle.make,
              itemHeaderFamily: createServiceOrBundle.family,
              model: createServiceOrBundle.model,
              prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
              type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
              additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
              currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
              netPrice: 0,
              itemProductHierarchy: "EMPTY",
              itemHeaderGeographic: "EMPTY",
              responseTime: "EMPTY",
              usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
              validFrom: "",
              validTo: "",
              estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
              servicePrice: 0,
              status: "DRAFT",
              componentCode: "",
              componentDescription: "",
              serialNumber: "",
              itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "EMPTY",
              variant: "",
              itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
              jobCode: "",
              preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
              approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
              preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
              revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
              revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
              salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
              offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
              serviceChargable: bundleServiceChargeableOrNot,
              serviceOptional: (!bundleServiceChargeableOrNot)
            },
            itemBodyModel: {
              itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
              itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
              spareParts: ["EMPTY"],
              labours: ["EMPTY"],
              miscellaneous: ["EMPTY"],
              taskType: ["EMPTY"],
              solutionCode: "",
              usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : "",
              usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
              year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
              avgUsage: 0,
              itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
                {
                  itemPriceDataId: itemPriceData.itemPriceDataId
                }
              ] : [],
            },
          }
          const res = await itemCreation(reqObj);
          if (res.status === 200) {
            toast("😎" + `Service ${createServiceOrBundle.name} saved successfully`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setCreatedServiceData(res.data);
            setBundleTabs("bundleServicePriceCalculator");

          }
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
  };

  const handleUpdateNewServiceOrBundle = async () => {
    try {
      if (serviceOrBundlePrefix === "BUNDLE") {
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
        // Old Working Update Item request obj 
        // let reqObj = {
        //   itemId: 0,
        //   itemName: createServiceOrBundle.name,
        //   itemHeaderModel: {
        //     itemHeaderId: 0,
        //     itemHeaderDescription: createServiceOrBundle.description,
        //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
        //     withBundleService: false,
        //     portfolioItemId: 0,
        //     reference: createServiceOrBundle.reference,
        //     itemHeaderMake: createServiceOrBundle.make,
        //     itemHeaderFamily: createServiceOrBundle.family,
        //     model: createServiceOrBundle.model,
        //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
        //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
        //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
        //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
        //     netPrice: 0,
        //     itemProductHierarchy: "EMPTY",
        //     itemHeaderGeographic: "EMPTY",
        //     responseTime: "EMPTY",
        //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
        //     validFrom: "",
        //     validTo: "",
        //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
        //     servicePrice: 0,
        //     status: "DRAFT",
        //     componentCode: "",
        //     componentDescription: "",
        //     serialNumber: "",
        //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask?.value : "EMPTY",
        //     variant: "",
        //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
        //     jobCode: "",
        //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
        //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
        //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
        //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
        //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
        //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
        //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
        //     serviceChargable: bundleServiceChargeableOrNot,
        //     serviceOptional: (!bundleServiceChargeableOrNot)
        //   },
        //   itemBodyModel: {
        //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
        //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
        //     spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
        //     labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
        //     miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
        //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
        //     solutionCode: "",
        //     usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : "",
        //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
        //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
        //     avgUsage: 0,
        //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : "",
        //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : "",
        //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
        //       {
        //         itemPriceDataId: itemPriceData.itemPriceDataId
        //       }
        //     ] : serviceOrBundlePrefix === "SERVICE" ? [
        //       {
        //         itemPriceDataId: itemPriceData.itemPriceDataId
        //       }
        //     ] : [],
        //   },
        // }

        // Current Working Request Obj
        let reqObj = {
          itemId: createServiceOrBundle.id,
          itemName: createServiceOrBundle.name,
          itemHeaderModel: {
            itemHeaderId: createServiceOrBundle.id,
            itemHeaderDescription: createServiceOrBundle.description,
            bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            withBundleService: false,
            portfolioItemId: bundleServicePortfolioItemId,
            reference: createServiceOrBundle.reference,
            itemHeaderMake: createServiceOrBundle.make,
            itemHeaderFamily: createServiceOrBundle.family,
            model: createServiceOrBundle.model,
            prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
            type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
            additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
            currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : editableServiceOrBundleData?.itemHeaderModel?.currency ? editableServiceOrBundleData?.itemHeaderModel?.currency : "",
            netPrice: 0,
            itemProductHierarchy: "EMPTY",
            itemHeaderGeographic: "EMPTY",
            responseTime: "EMPTY",
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            validFrom: "",
            validTo: "",
            estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
            servicePrice: 0,
            status: value2.value,
            componentCode: "",
            componentDescription: "",
            serialNumber: "",
            itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy ? editableServiceOrBundleData?.itemBodyModel?.itemHeaderStrategy : "EMPTY",
            variant: "",
            itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
            jobCode: "",
            preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
            serviceChargable: bundleServiceChargeableOrNot,
            serviceOptional: (!bundleServiceChargeableOrNot)
          },
          itemBodyModel: {
            itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
            itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
            spareParts: ["EMPTY"],
            labours: ["EMPTY"],
            miscellaneous: ["EMPTY"],
            // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
            // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
            // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
            taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
            solutionCode: "",
            usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : editableServiceOrBundleData?.itemBodyModel?.usageIn ? editableServiceOrBundleData?.itemBodyModel?.usageIn : "",
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : editableServiceOrBundleData?.itemBodyModel?.usage ? editableServiceOrBundleData?.itemBodyModel?.usage : "",
            year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : editableServiceOrBundleData?.itemBodyModel?.year ? editableServiceOrBundleData?.itemBodyModel?.year : "",
            avgUsage: 0,
            itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
              itemPriceData.itemPriceDataId == 0) ? [] : [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : [],
          },
        }

        const res = await updateItemData(createdServiceData.itemId, reqObj);
        if (res.status === 200) {
          toast("😎" + `${serviceOrBundlePrefix} ${createServiceOrBundle.name} saved successfully.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setBundleServiceShow(false);
          setBundleTabs("bundleServiceHeader")
          setAddPortFolioItem({})
          // setAddPortFolioItem({});
        }
      }

      if (serviceOrBundlePrefix === "SERVICE") {
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

        // Old working service item update request Obj 
        // let reqObj = {
        //   itemId: 0,
        //   itemName: createServiceOrBundle.name,
        //   itemHeaderModel: {
        //     itemHeaderId: 0,
        //     itemHeaderDescription: createServiceOrBundle.description,
        //     bundleFlag: "SERVICE",
        //     withBundleService: false,
        //     portfolioItemId: 0,
        //     reference: createServiceOrBundle.reference,
        //     itemHeaderMake: createServiceOrBundle.make,
        //     itemHeaderFamily: createServiceOrBundle.family,
        //     model: createServiceOrBundle.model,
        //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
        //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
        //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
        //     currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
        //     netPrice: 0,
        //     itemProductHierarchy: "EMPTY",
        //     itemHeaderGeographic: "EMPTY",
        //     responseTime: "EMPTY",
        //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
        //     validFrom: "",
        //     validTo: "",
        //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
        //     servicePrice: 0,
        //     status: "DRAFT",
        //     componentCode: "",
        //     componentDescription: "",
        //     serialNumber: "",
        //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "EMPTY",
        //     variant: "",
        //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
        //     jobCode: "",
        //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
        //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
        //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
        //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
        //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
        //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
        //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
        //     serviceChargable: bundleServiceChargeableOrNot,
        //     serviceOptional: (!bundleServiceChargeableOrNot)
        //   },
        //   itemBodyModel: {
        //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
        //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
        //     spareParts: ["EMPTY"],
        //     labours: ["EMPTY"],
        //     miscellaneous: ["EMPTY"],
        //     taskType: ["EMPTY"],
        //     solutionCode: "",
        //     usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : "",
        //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
        //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
        //     avgUsage: 0,
        //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : "",
        //     frequency: addPortFolioItem.frequency ? addPortFolioItem.frequency?.value : "",
        //     itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
        //       {
        //         itemPriceDataId: itemPriceData.itemPriceDataId
        //       }
        //     ] : (serviceOrBundlePrefix === "SERVICE" && itemPriceData.itemPriceDataId) ? [
        //       {
        //         itemPriceDataId: itemPriceData.itemPriceDataId
        //       }
        //     ] : [],
        //     // itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
        //     //   {
        //     //     itemPriceDataId: itemPriceData.itemPriceDataId
        //     //   }
        //     // ] : [],
        //   },
        // }

        // current working Service item update request obj
        let reqObj = {
          itemId: createServiceOrBundle.id,
          itemName: createServiceOrBundle.name,
          itemHeaderModel: {
            itemHeaderId: createServiceOrBundle.id,
            itemHeaderDescription: createServiceOrBundle.description,
            bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            withBundleService: false,
            portfolioItemId: 0,
            reference: createServiceOrBundle.reference,
            itemHeaderMake: createServiceOrBundle.make,
            itemHeaderFamily: createServiceOrBundle.family,
            model: createServiceOrBundle.model,
            prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
            type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
            additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
            currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
            netPrice: 0,
            itemProductHierarchy: "EMPTY",
            itemHeaderGeographic: "EMPTY",
            responseTime: "EMPTY",
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
            validFrom: "",
            validTo: "",
            estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
            servicePrice: 0,
            status: value2.value,
            componentCode: "",
            componentDescription: "",
            serialNumber: "",
            itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "EMPTY",
            variant: "",
            itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
            jobCode: "",
            preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
            approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
            preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
            revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
            revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
            salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
            offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
            serviceChargable: bundleServiceChargeableOrNot,
            serviceOptional: (!bundleServiceChargeableOrNot)
          },
          itemBodyModel: {
            itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
            itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
            spareParts: ["EMPTY"],
            labours: ["EMPTY"],
            miscellaneous: ["EMPTY"],
            // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
            // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
            // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
            taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["EMPTY"],
            solutionCode: "",
            usageIn: addPortFolioItem.usageIn ? addPortFolioItem.usageIn?.value : "",
            usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
            year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
            avgUsage: 0,
            itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
              itemPriceData.itemPriceDataId == 0) ? [] : [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : [],
          },
        }

        const res = await updateItemData(createdServiceData.itemId, reqObj)

        // const res = await itemCreation(reqObj);
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
          // setBundleTabs("bundleServicePriceCalculator");
          setBundleServiceShow(false);
          setBundleTabs("bundleServiceHeader")
          setAddPortFolioItem({})
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
      return
    }
    // ==================== Without Try/catch Method Start ================ //

    // if (serviceOrBundlePrefix === "BUNDLE") {
    //   const validator = new Validator();



    //   // if ((!validator.emailValidation(administrative.preparedBy) ||
    //   //   administrative.preparedBy == "" ||
    //   //   administrative.preparedBy == undefined) ||
    //   //   (administrative.approvedBy != "" &&
    //   //     administrative.approvedBy != undefined &&
    //   //     !validator.emailValidation(administrative.approvedBy)) ||
    //   //   (administrative.revisedBy != "" &&
    //   //     administrative.revisedBy != undefined &&
    //   //     !validator.emailValidation(administrative.revisedBy)) ||
    //   //   (administrative.salesOffice?.value == "" ||
    //   //     administrative.salesOffice?.value == undefined)
    //   // )
    //   if ((administrative.preparedBy == "" ||
    //     administrative.preparedBy == undefined) ||
    //     (administrative.salesOffice == "" ||
    //       administrative.salesOffice == undefined)
    //   ) {
    //     toast("😐" + "Please fill mandatory Fields.", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } else {

    //     let reqObj = {
    //       itemId: 0,
    //       // itemName: "",
    //       itemName: createServiceOrBundle.name,
    //       itemHeaderModel: {
    //         itemHeaderId: 0,
    //         itemHeaderDescription: createServiceOrBundle.description,
    //         bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
    //         portfolioItemId: 0,
    //         reference: createServiceOrBundle.reference,
    //         itemHeaderMake: createServiceOrBundle.make,
    //         itemHeaderFamily: createServiceOrBundle.family,
    //         model: createServiceOrBundle.model,
    //         prefix: createServiceOrBundle.prefix,
    //         type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "MACHINE",
    //         additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
    //         currency: "",
    //         netPrice: 0,
    //         itemProductHierarchy: "END_PRODUCT",
    //         itemHeaderGeographic: "ONSITE",
    //         responseTime: "PROACTIVE",
    //         usage: "",
    //         validFrom: "",
    //         validTo: "",
    //         estimatedTime: "",
    //         servicePrice: 0,
    //         status: "DRAFT",
    //         itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
    //         componentCode: "",
    //         componentDescription: "",
    //         serialNumber: "",
    //         variant: "",
    //         itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
    //         jobCode: "",
    //         preparedBy: administrative.preparedBy,
    //         approvedBy: administrative.approvedBy,
    //         preparedOn: administrative.preparedOn,
    //         revisedBy: administrative.revisedBy,
    //         revisedOn: administrative.revisedOn,
    //         salesOffice: administrative.salesOffice?.value,
    //         offerValidity: administrative.offerValidity?.value
    //       },
    //       itemBodyModel: {
    //         itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
    //         itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
    //         frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
    //         spareParts: ["WITH_SPARE_PARTS"],
    //         labours: ["WITH_LABOUR"],
    //         miscellaneous: ["LUBRICANTS"],
    //         taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
    //         solutionCode: "",
    //         usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageTypeIn?.value : "",
    //         recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
    //         usage: "",
    //         year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
    //         avgUsage: 0,
    //         unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
    //         itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
    //           {
    //             itemPriceDataId: itemPriceData.itemPriceDataId
    //           }
    //         ] : [],
    //       }
    //     }

    //     const res = await itemCreation(reqObj);
    //     if (res.status === 200) {
    //       toast("😎" + `${serviceOrBundlePrefix} created`, {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       // setAddPortFolioItem({});

    //     }

    //     if (serviceOrBundlePrefix === "BUNDLE") {
    //       const rObj = {
    //         standardJobId: itemPriceData.standardJobId,
    //         repairKitId: itemPriceData.repairKitId,
    //         itemId: res.data.itemId,
    //         itemPriceDataId: itemPriceData.itemPriceDataId
    //       }
    //       const res2 = await portfolioItemPriceSjid(rObj)

    //       console.log("administrative 12345 : ", res2);
    //     }
    //     setBundleTabs("bundleServicePriceCalculator");
    //     // console.log("createServiceOrBundle : ", createServiceOrBundle);
    //   }
    // }
    // if (serviceOrBundlePrefix === "SERVICE") {
    //   const validator = new Validator();

    //   if ((!validator.emailValidation(administrative.preparedBy) ||
    //     administrative.preparedBy == "" ||
    //     administrative.preparedBy == undefined) ||
    //     (administrative.approvedBy != "" &&
    //       administrative.approvedBy != undefined &&
    //       !validator.emailValidation(administrative.approvedBy)) ||
    //     (administrative.revisedBy != "" &&
    //       administrative.revisedBy != undefined &&
    //       !validator.emailValidation(administrative.revisedBy)) ||
    //     (administrative.salesOffice == "" ||
    //       administrative.salesOffice == undefined)
    //     // || (administrative.offerValidity == "" ||
    //     // administrative.offerValidity == undefined)
    //   ) {
    //     toast("😐" + "Please fill mandatory Fields.", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } else {


    //     let reqObj = {
    //       itemId: 0,
    //       // itemName: "",
    //       itemName: createServiceOrBundle.name,
    //       itemHeaderModel: {
    //         itemHeaderId: 0,
    //         itemHeaderDescription: createServiceOrBundle.description,
    //         bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
    //         portfolioItemId: 0,
    //         reference: createServiceOrBundle.reference,
    //         itemHeaderMake: createServiceOrBundle.make,
    //         itemHeaderFamily: createServiceOrBundle.family,
    //         model: createServiceOrBundle.model,
    //         prefix: createServiceOrBundle.prefix,
    //         type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "MACHINE",
    //         additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
    //         currency: "",
    //         netPrice: 0,
    //         itemProductHierarchy: "END_PRODUCT",
    //         itemHeaderGeographic: "ONSITE",
    //         responseTime: "PROACTIVE",
    //         usage: "",
    //         validFrom: "",
    //         validTo: "",
    //         estimatedTime: "",
    //         servicePrice: 0,
    //         status: "DRAFT",
    //         itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
    //         componentCode: "",
    //         componentDescription: "",
    //         serialNumber: "",
    //         variant: "",
    //         itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
    //         jobCode: "",
    //         preparedBy: administrative.preparedBy,
    //         approvedBy: administrative.approvedBy,
    //         preparedOn: administrative.preparedOn,
    //         revisedBy: administrative.revisedBy,
    //         revisedOn: administrative.revisedOn,
    //         salesOffice: administrative.salesOffice?.value,
    //         offerValidity: administrative.offerValidity?.value
    //       },
    //       itemBodyModel: {
    //         itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
    //         itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
    //         frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
    //         spareParts: ["WITH_SPARE_PARTS"],
    //         labours: ["WITH_LABOUR"],
    //         miscellaneous: ["LUBRICANTS"],
    //         taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
    //         solutionCode: "",
    //         usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageTypeIn?.value : "",
    //         recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
    //         usage: "",
    //         year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
    //         avgUsage: 0,
    //         unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
    //         itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
    //           {
    //             itemPriceDataId: itemPriceData.itemPriceDataId
    //           }
    //         ] : [],
    //       }
    //     }

    //     const res = await itemCreation(reqObj);
    //     if (res.status === 200) {
    //       toast("😎" + `${serviceOrBundlePrefix} created`, {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       setBundleTabs("bundleServicePriceCalculator");
    //       // setAddPortFolioItem({});

    //     }

    //     // console.log("createServiceOrBundle : ", createServiceOrBundle);
    //   }
    // }

    // ==================== Without Try/catch Method End ================ //
  };

  const getAddPortfolioItemData1 = async (data, itemPriceData) => {
    console.log("Bundle ItemsTabs : ", data)
    // setAddPortFolioItem(data)
    // setItemPriceData(itemPriceData)
    // setCreatedBundleItems(data);

    // Old Working Todo
    // let reqObj = {
    //   itemId: 0,
    //   itemName: createServiceOrBundle.name,
    //   itemHeaderModel: {
    //     itemHeaderId: 0,
    //     itemHeaderDescription: createServiceOrBundle.description,
    //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
    //     withBundleService: false,
    //     portfolioItemId: 0,
    //     reference: createServiceOrBundle.reference,
    //     itemHeaderMake: createServiceOrBundle.make,
    //     itemHeaderFamily: createServiceOrBundle.family,
    //     model: createServiceOrBundle.model,
    //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
    //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
    //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
    //     currency: "",
    //     netPrice: 0,
    //     itemProductHierarchy: "EMPTY",
    //     itemHeaderGeographic: "EMPTY",
    //     responseTime: "EMPTY",
    //     usage: data.usageType ? data.usageType?.value : "",
    //     validFrom: "",
    //     validTo: "",
    //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
    //     servicePrice: 0,
    //     status: value2.value,
    //     componentCode: "",
    //     componentDescription: "",
    //     serialNumber: "",
    //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "EMPTY",
    //     variant: "",
    //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
    //     jobCode: "",
    //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
    //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
    //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
    //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
    //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
    //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
    //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
    //     serviceChargable: bundleServiceChargeableOrNot,
    //     serviceOptional: (!bundleServiceChargeableOrNot)
    //   },
    //   itemBodyModel: {
    //     // itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
    //     itemBodyId: 0,
    //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
    //     spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
    //     labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
    //     miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
    //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["EMPTY"],
    //     solutionCode: "",
    //     usageIn: data.usageIn ? data.usageIn?.value : "",
    //     usage: data.usageType ? data.usageType?.value : "",
    //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
    //     avgUsage: 0,
    //     unit: data.unit ? data.unit?.value : "",
    //     frequency: data.frequency ? data.frequency?.value : "",
    //     itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
    //       (itemPriceData?.itemPriceDataId != null ||
    //         itemPriceData?.itemPriceDataId != undefined) ? [
    //       {
    //         itemPriceDataId: itemPriceData.itemPriceDataId
    //       }
    //     ] : [],
    //   },
    // }

    // current price reqObj
    let reqObj = {
      itemId: 0,
      itemName: createServiceOrBundle.name,
      itemHeaderModel: {
        itemHeaderId: 0,
        itemHeaderDescription: createServiceOrBundle.description,
        bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
        withBundleService: false,
        portfolioItemId: 0,
        reference: createServiceOrBundle.reference,
        itemHeaderMake: createServiceOrBundle.make,
        itemHeaderFamily: createServiceOrBundle.family,
        model: createServiceOrBundle.model,
        prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
        type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
        additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
        currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
        netPrice: 0,
        itemProductHierarchy: "EMPTY",
        itemHeaderGeographic: "EMPTY",
        responseTime: "EMPTY",
        usage: data.usageType ? data.usageType?.value : "",
        validFrom: "",
        validTo: "",
        estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
        servicePrice: 0,
        status: value2.value,
        componentCode: "",
        componentDescription: "",
        serialNumber: "",
        itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "EMPTY",
        variant: "",
        itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
        jobCode: "",
        preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
        approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
        preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
        revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
        revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
        salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
        offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
        serviceChargable: bundleServiceChargeableOrNot,
        serviceOptional: (!bundleServiceChargeableOrNot)
      },
      itemBodyModel: {
        itemBodyId: 0,
        itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
        spareParts: ["EMPTY"],
        labours: ["EMPTY"],
        miscellaneous: ["EMPTY"],
        // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
        // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
        // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
        taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["EMPTY"],
        solutionCode: "",
        usageIn: data.usageIn ? data.usageIn?.value : "",
        usage: data.usageType ? data.usageType?.value : "",
        year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
        avgUsage: 0,
        itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
          (itemPriceData?.itemPriceDataId != null ||
            itemPriceData?.itemPriceDataId != undefined) ? [
          {
            itemPriceDataId: itemPriceData.itemPriceDataId
          }
        ] : [],
      },
    }


    const res = await itemCreation(reqObj);
    if (res.status === 200) {
      console.log("_createdBundleItems res.data ============= ", res);
      const _createdBundleItems = { ...data, itemId: res.data.itemId }
      console.log("_createdBundleItems ============= ", _createdBundleItems);
      setCreatedBundleItems(_createdBundleItems);
      setCreatedServiceData(res.data);
      setAddPortFolioItem(data)
      setItemPriceData(itemPriceData)
      const rObj = {
        standardJobId: itemPriceData.standardJobId,
        repairKitId: itemPriceData.repairKitId,
        itemId: res.data.itemId,
        itemPriceDataId: itemPriceData.itemPriceDataId
      }

      if (!(((itemPriceData.standardJobId === "") || (itemPriceData.standardJobId === null) || (itemPriceData.standardJobId === undefined)) &&
        ((itemPriceData.repairKitId === "") || (itemPriceData.repairKitId === null) || (itemPriceData.repairKitId === undefined)))) {
        if (((itemPriceData.standardJobId == "") || (itemPriceData.standardJobId == null)) &&
          ((itemPriceData.repairKitId != "") || (itemPriceData.repairKitId != null))) {
          const updateRkId = portfolioItemPriceRkId(rObj);
        }

        if (((itemPriceData.repairKitId == "") || (itemPriceData.repairKitId == null)) &&
          ((itemPriceData.standardJobId != "") || (itemPriceData.standardJobId != null))) {
          const updateSjId = portfolioItemPriceSjid(rObj);
        }
      }

      toast("😎" + `Bundle ${createServiceOrBundle.name} saved successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setBundleTabs("bundleServicePriceCalculator")

    }

    if (res.status !== 200) {
      toast("😎" + `Something went wrong.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setBundleTabs("bundleServiceItems");
    }


    // setBundleTabs("bundleServiceAdministrative")
    // console.log("itemPriceData11111111", itemPriceData)
    // setAddPortFolioItem(data)
    // setItemPriceData(itemPriceData)
  }

  const getAddPortfolioItemData = async (data, itemPriceData) => {
    try {
      let reqObj = {
        itemId: 0,
        itemName: createServiceOrBundle.name,
        itemHeaderModel: {
          itemHeaderId: 0,
          itemHeaderDescription: createServiceOrBundle.description,
          bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
          withBundleService: false,
          portfolioItemId: 0,
          reference: createServiceOrBundle.reference,
          itemHeaderMake: createServiceOrBundle.make,
          itemHeaderFamily: createServiceOrBundle.family,
          model: createServiceOrBundle.model,
          prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
          type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
          additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
          currency: addPortFolioItem.currency ? addPortFolioItem.currency?.value : "",
          netPrice: 0,
          itemProductHierarchy: "EMPTY",
          itemHeaderGeographic: "EMPTY",
          responseTime: "EMPTY",
          usage: data.usageType ? data.usageType?.value : "",
          validFrom: "",
          validTo: "",
          estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
          servicePrice: 0,
          status: value2.value,
          componentCode: "",
          componentDescription: "",
          serialNumber: "",
          itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "EMPTY",
          variant: "",
          itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
          jobCode: "",
          preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
          approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
          preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
          revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
          revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
          salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
          offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
          serviceChargable: bundleServiceChargeableOrNot,
          serviceOptional: (!bundleServiceChargeableOrNot)
        },
        itemBodyModel: {
          itemBodyId: 0,
          itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
          spareParts: ["EMPTY"],
          labours: ["EMPTY"],
          miscellaneous: ["EMPTY"],
          // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
          // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
          // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
          taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["EMPTY"],
          solutionCode: "",
          usageIn: data.usageIn ? data.usageIn?.value : "",
          usage: data.usageType ? data.usageType?.value : "",
          year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
          avgUsage: 0,
          itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
            (itemPriceData?.itemPriceDataId != null ||
              itemPriceData?.itemPriceDataId != undefined) ? [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ] : [],
        },
      }
      const res = await itemCreation(reqObj);

      if (res.status !== 200) {
        throw "Something went wrong."
      }

      if (res.status === 200) {
        const _createdBundleItems = { ...data, itemId: res.data.itemId }
        setCreatedBundleItems(_createdBundleItems);
        setCreatedServiceData(res.data);
        setAddPortFolioItem({ ...data, id: res.data.itemId })
        setItemPriceData(itemPriceData)
        const rObj = {
          standardJobId: itemPriceData.standardJobId,
          repairKitId: itemPriceData.repairKitId,
          itemId: res.data.itemId,
          itemPriceDataId: itemPriceData.itemPriceDataId
        }

        if (!(((itemPriceData.standardJobId === "") || (itemPriceData.standardJobId === null) || (itemPriceData.standardJobId === undefined)) &&
          ((itemPriceData.repairKitId === "") || (itemPriceData.repairKitId === null) || (itemPriceData.repairKitId === undefined)))) {

          if (((itemPriceData.standardJobId == "") ||
            (itemPriceData.standardJobId == null)) &&
            ((itemPriceData.repairKitId != "") || (itemPriceData.repairKitId != null))) {
            const updateRkId = portfolioItemPriceRkId(rObj);
          }

          if (((itemPriceData.repairKitId == "") || (itemPriceData.repairKitId == null)) &&
            ((itemPriceData.standardJobId != "") || (itemPriceData.standardJobId != null))) {
            const updateSjId = portfolioItemPriceSjid(rObj);
          }
        }

        toast("😎" + `Bundle ${createServiceOrBundle.name} saved successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBundleTabs("bundleServicePriceCalculator")
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

  const handleItemEditSave = async (data, itemPriceData, bundleFlagIs, EditableOrNot) => {
    console.log("my data is : ", data)
    console.log("my itemPriceData is : ", itemPriceData)
    if (EditableOrNot) {
      setAddPortFolioItem(data)
      setItemPriceData(itemPriceData)
      // setBundleTabs("bundleServiceAdministrative")
      setBundleTabs("bundleServicePriceCalculator")
    } else {

      // Old working bundle item update obj
      // let reqObj = {
      //   itemId: data.id,
      //   itemName: createServiceOrBundle.name,
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     itemHeaderDescription: createServiceOrBundle.description,
      //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
      //     withBundleService: false,
      //     portfolioItemId: 0,
      //     reference: createServiceOrBundle.reference,
      //     itemHeaderMake: createServiceOrBundle.make,
      //     itemHeaderFamily: createServiceOrBundle.family,
      //     model: createServiceOrBundle.model,
      //     prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
      //     type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
      //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
      //     currency: data.currency ? data.currency?.value : "",
      //     netPrice: 0,
      //     itemProductHierarchy: "EMPTY",
      //     itemHeaderGeographic: "EMPTY",
      //     responseTime: "EMPTY",
      //     usage: addPortFolioItem.usageType ? addPortFolioItem.usageType?.value : "",
      //     validFrom: "",
      //     validTo: "",
      //     estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
      //     servicePrice: 0,
      //     status: value2.value,
      //     componentCode: "",
      //     componentDescription: "",
      //     serialNumber: "",
      //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "EMPTY",
      //     variant: "",
      //     itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
      //     jobCode: "",
      //     preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
      //     approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
      //     preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
      //     revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
      //     revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
      //     salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
      //     offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
      //     serviceChargable: bundleServiceChargeableOrNot,
      //     serviceOptional: (!bundleServiceChargeableOrNot)
      //   },
      //   itemBodyModel: {
      //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
      //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
      //     spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
      //     labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
      //     miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
      //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["EMPTY"],
      //     solutionCode: "",
      //     usageIn: data.usageIn ? data.usageIn?.value : "",
      //     usage: data.usageType ? data.usageType?.value : "",
      //     year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
      //     avgUsage: 0,
      //     unit: addPortFolioItem.unit ? addPortFolioItem.unit?.value : "",
      //     frequency: addPortFolioItem.frequency ? data.frequency?.value : "",
      //     itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
      //       (itemPriceData?.itemPriceDataId != null ||
      //         itemPriceData?.itemPriceDataId != undefined) ? [
      //       {
      //         itemPriceDataId: itemPriceData.itemPriceDataId
      //       }
      //     ] : serviceOrBundlePrefix === "SERVICE" &&
      //       (itemPriceData?.itemPriceDataId != null ||
      //         itemPriceData?.itemPriceDataId != undefined) ? [
      //       {
      //         itemPriceDataId: itemPriceData.itemPriceDataId
      //       }
      //     ] : [],
      //     // itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
      //     //   (itemPriceData?.itemPriceDataId != null ||
      //     //     itemPriceData?.itemPriceDataId != undefined) ? [
      //     //   {
      //     //     itemPriceDataId: itemPriceData.itemPriceDataId
      //     //   }
      //     // ] : [],
      //   },
      // }

      // current working bundle item update reqObj
      let reqObj = {
        itemId: data.id,
        itemName: createServiceOrBundle.name,
        itemHeaderModel: {
          itemHeaderId: 0,
          itemHeaderDescription: createServiceOrBundle.description,
          bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
          withBundleService: false,
          portfolioItemId: 0,
          reference: createServiceOrBundle.reference,
          itemHeaderMake: createServiceOrBundle.make,
          itemHeaderFamily: createServiceOrBundle.family,
          model: createServiceOrBundle.model,
          prefix: createServiceOrBundle.prefix?.value ? createServiceOrBundle.prefix?.value : "",
          type: createServiceOrBundle.machineComponent != "" ? createServiceOrBundle.machineComponent?.value : "EMPTY",
          additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional.value : "",
          currency: data.currency ? data.currency?.value : "",
          netPrice: 0,
          itemProductHierarchy: "EMPTY",
          itemHeaderGeographic: "EMPTY",
          responseTime: "EMPTY",
          usage: data.usageType ? data.usageType?.value : "",
          validFrom: "",
          validTo: "",
          estimatedTime: createServiceOrBundle.estimatedTime != "" ? createServiceOrBundle.estimatedTime : "",
          servicePrice: 0,
          status: value2.value,
          componentCode: "",
          componentDescription: "",
          serialNumber: "",
          itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "EMPTY",
          variant: "",
          itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
          jobCode: "",
          preparedBy: administrative?.preparedBy ? administrative?.preparedBy : "",
          approvedBy: administrative?.approvedBy ? administrative?.approvedBy : "",
          preparedOn: administrative?.preparedOn ? administrative?.preparedOn : "",
          revisedBy: administrative?.revisedBy ? administrative?.revisedBy : "",
          revisedOn: administrative?.revisedOn ? administrative?.revisedOn : "",
          salesOffice: administrative.salesOffice?.value ? administrative.salesOffice?.value : "",
          offerValidity: administrative.offerValidity?.value ? administrative.offerValidity?.value : "",
          serviceChargable: bundleServiceChargeableOrNot,
          serviceOptional: (!bundleServiceChargeableOrNot)
        },
        itemBodyModel: {
          itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
          itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
          spareParts: ["EMPTY"],
          labours: ["EMPTY"],
          miscellaneous: ["EMPTY"],
          // spareParts: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_SPARE_PARTS"] : ["EMPTY"],
          // labours: serviceOrBundlePrefix === "BUNDLE" ? ["WITH_LABOUR"] : ["EMPTY"],
          // miscellaneous: serviceOrBundlePrefix === "BUNDLE" ? ["LUBRICANTS"] : ["EMPTY"],
          taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["EMPTY"],
          solutionCode: "",
          usageIn: data.usageIn ? data.usageIn?.value : "",
          usage: data.usageType ? data.usageType?.value : "",
          year: addPortFolioItem.year ? (typeof addPortFolioItem.year === "object" ? addPortFolioItem.year?.value : addPortFolioItem.year) : "",
          avgUsage: 0,
          itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ] : serviceOrBundlePrefix === "SERVICE" ? (itemPriceData.itemPriceDataId == undefined ||
            itemPriceData.itemPriceDataId == 0) ? [] : [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ] : [],
        },
      }

      const res = await updateItemData(data.id, reqObj);
      if (res.status === 200) {
        toast("😎" + `Bundle ${createServiceOrBundle.name} updated successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });


        // setAddPortFolioItem(data)
        // setItemPriceData(itemPriceData)
        // setBundleTabs("bundleServicePriceCalculator")
        // setBundleTabs("bundleServiceCalculator");
        // setAddPortFolioItem({});

      }

      // old working Price Update request Obj  
      // const priceUpdateData = {
      //   itemPriceDataId: itemPriceData?.itemPriceDataId,
      //   quantity: 1,
      //   standardJobId: data.templateId,
      //   repairKitId: data.repairOption,
      //   templateDescription: data.templateId != "" ? data.templateDescription?.value : "",
      //   repairOption: "",
      //   additional: "",
      //   partListId: "",
      //   serviceEstimateId: "",
      //   numberOfEvents: 0,
      //   priceMethod: (itemPriceData?.priceMethod != "EMPTY"
      //     || itemPriceData?.priceMethod != "" ||
      //     itemPriceData?.priceMethod != null) ?
      //     itemPriceData?.priceMethod : "EMPTY",
      //   priceType: (itemPriceData?.priceType != "EMPTY" ||
      //     itemPriceData?.priceType != "" ||
      //     itemPriceData?.priceType != null) ?
      //     itemPriceData?.priceType : "EMPTY",
      //   listPrice: 0,
      //   priceEscalation: data.escalationPriceOptionsValue != "" ? data.escalationPriceOptionsValue : "",
      //   calculatedPrice: 0,
      //   flatPrice: data.flatPrice ? parseInt(data.flatPrice) : 0,
      //   year: data?.year?.value,
      //   noOfYear: parseInt(data?.noOfYear),
      //   // year: createdBundleItems?.year?.value,
      //   // noOfYear: parseInt(createdBundleItems?.noOfYear),
      //   sparePartsPrice: 0,
      //   sparePartsPriceBreakDownPercentage: itemPriceData?.sparePartsPriceBreakDownPercentage != undefined ?
      //     itemPriceData?.sparePartsPriceBreakDownPercentage : 0,
      //   servicePrice: 0,
      //   labourPrice: 0,
      //   labourPriceBreakDownPercentage: itemPriceData?.labourPriceBreakDownPercentage != undefined ?
      //     itemPriceData?.labourPriceBreakDownPercentage : 0,
      //   miscPrice: 0,
      //   miscPriceBreakDownPercentage: itemPriceData?.miscPriceBreakDownPercentage != undefined ?
      //     itemPriceData?.miscPriceBreakDownPercentage : 0,
      //   totalPrice: 0,
      //   netService: 0,
      //   additionalPriceType: (itemPriceData?.additionalPriceType != "EMPTY" ||
      //     itemPriceData?.additionalPriceType != "" ||
      //     itemPriceData?.additionalPriceType != null) ?
      //     itemPriceData?.additionalPriceType : "ABSOLUTE",
      //   additionalPriceValue: itemPriceData?.additionalPriceValue,
      //   discountType: (itemPriceData?.discountType != "EMPTY" ||
      //     itemPriceData?.discountType != "" ||
      //     itemPriceData?.discountType != null) ?
      //     itemPriceData?.discountType : "EMPTY",
      //   discountValue: itemPriceData?.discountValue,
      //   recommendedValue: parseInt(data?.recommendedValue),
      //   startUsage: parseInt(data?.startUsage),
      //   endUsage: parseInt(data?.endUsage),
      //   sparePartsEscalation: itemPriceData?.sparePartsEscalation != undefined ?
      //     itemPriceData?.sparePartsEscalation : 0,
      //   labourEscalation: itemPriceData?.labourEscalation != undefined ?
      //     itemPriceData?.labourEscalation : 0,
      //   miscEscalation: itemPriceData?.miscEscalation != undefined ?
      //     itemPriceData?.miscEscalation : 0,
      //   serviceEscalation: itemPriceData?.serviceEscalation != undefined ?
      //     itemPriceData?.serviceEscalation : 0,
      //   withBundleService: false,
      //   portfolio: (
      //     (itemPriceData?.portfolio == null) ||
      //     (itemPriceData?.portfolio == undefined) ||
      //     (itemPriceData?.portfolio?.portfolioId == 0)) ? null
      //     : itemPriceData?.portfolio,
      //   tenantId: loginTenantId,
      //   partsRequired: true,
      //   labourRequired: true,
      //   serviceRequired: false,
      //   miscRequired: true,
      //   inclusionExclusion: false
      // }

      // new price update request obj
      let priceUpdateData = {
        itemPriceDataId: itemPriceData?.itemPriceDataId,
        quantity: 1,
        standardJobId: data.templateId ? data.templateId : "",
        repairKitId: data.repairOption ? data.repairOption : "",
        templateDescription: (data.repairOption && data.templateId != "") ? addPortFolioItem.templateDescription?.value : "",
        repairOption: "",
        additional: "",
        partListId: "",
        serviceEstimateId: "",
        numberOfEvents: 0,
        frequency: data?.frequency !== "" ? data?.frequency?.value : "CYCLIC",
        priceMethod: (itemPriceData.priceMethod === "EMPTY"
          || itemPriceData.priceMethod === "" ||
          itemPriceData.priceMethod === null) ?
          "LIST_PRICE" : itemPriceData.priceMethod,
        priceType: (itemPriceData.priceType === "EMPTY" ||
          itemPriceData.priceType === "" ||
          itemPriceData.priceType === null) ? "EVENT_BASED" : itemPriceData.priceType,
        listPrice: 0,
        priceEscalation: data.escalationPriceOptionsValue != "" ? data.escalationPriceOptionsValue : "",
        calculatedPrice: 0,
        flatPrice: data.flatPrice ? parseInt(data.flatPrice) : 0,
        year: data.year?.value,
        noOfYear: parseInt(data.noOfYear),
        sparePartsPrice: 0,
        sparePartsPriceBreakDownPercentage: itemPriceData?.sparePartsPriceBreakDownPercentage != undefined ?
          itemPriceData?.sparePartsPriceBreakDownPercentage : 0,
        servicePrice: 0,
        labourPrice: 0,
        labourPriceBreakDownPercentage: itemPriceData?.labourPriceBreakDownPercentage != undefined ?
          itemPriceData?.labourPriceBreakDownPercentage : 0,
        miscPrice: 0,
        miscPriceBreakDownPercentage: itemPriceData?.miscPriceBreakDownPercentage != undefined ?
          itemPriceData?.miscPriceBreakDownPercentage : 0,
        totalPrice: 0,
        netService: 0,
        additionalPriceType: (itemPriceData?.additionalPriceType === "EMPTY" ||
          itemPriceData?.additionalPriceType === "" ||
          itemPriceData?.additionalPriceType === null) ?
          "ABSOLUTE" : itemPriceData?.additionalPriceType,
        additionalPriceValue: itemPriceData?.additionalPriceValue,
        discountType: (itemPriceData?.discountType === "EMPTY" ||
          itemPriceData?.discountType === "" ||
          itemPriceData?.discountType === null) ? "PORTFOLIO_DISCOUNT" : itemPriceData?.discountType,
        discountValue: itemPriceData?.discountValue,
        recommendedValue: parseInt(data.recommendedValue),
        startUsage: parseInt(data.startUsage),
        endUsage: parseInt(data.endUsage),
        sparePartsEscalation: itemPriceData?.sparePartsEscalation != undefined ?
          itemPriceData?.sparePartsEscalation : 0,
        labourEscalation: itemPriceData?.labourEscalation != undefined ?
          itemPriceData?.labourEscalation : 0,
        miscEscalation: itemPriceData?.miscEscalation != undefined ?
          itemPriceData?.miscEscalation : 0,
        serviceEscalation: itemPriceData?.serviceEscalation != undefined ?
          itemPriceData?.serviceEscalation : 0,
        sparePartsNOE: 0,
        labourNOE: 0,
        miscNOE: 0,
        recommendedUnit: data?.unit?.value === "YEAR" ? "MONTH" : data?.unit?.value,
        usageUnit: data?.unit != "" ? data?.unit?.value : "YEAR",
        withBundleService: false,
        portfolio: ((data.portfolioDataId === 0) || (data.portfolioDataId === null) ||
          (data.portfolioDataId === undefined) || (data.portfolioDataId === "")) ? null :
          {
            portfolioId: data.portfolioDataId
          },
        tenantId: loginTenantId,
        inclusionExclusion: false,
        partsRequired: true,
        labourRequired: true,
        serviceRequired: false,
        miscRequired: true
      }

      console.log("priceUpdateData is : ", priceUpdateData)

      if ((itemPriceData?.itemPriceDataId != null ||
        itemPriceData?.itemPriceDataId != undefined)) {
        const updatePriceId = await updateItemPriceData(
          itemPriceData?.itemPriceDataId,
          priceUpdateData
        );


        const rObj = {
          standardJobId: data.templateId,
          repairKitId: data.repairOption,
          itemId: data?.id,
          itemPriceDataId: itemPriceData?.itemPriceDataId
        }

        if (!(((data.templateId === "") || (data.templateId === null) || (data.templateId === undefined)) &&
          ((data.repairOption === "") || (data.repairOption === null) || (data.repairOption === undefined)))) {

          if (((data.templateId == "") || (data.templateId == null)) &&
            ((data.repairOption != "") || (data.repairOption != null))) {
            const updateRkId = portfolioItemPriceRkId(rObj);
          }

          if (((data.repairOption == "") || (data.repairOption == null)) &&
            ((data.templateId != "") || (data.templateId != null))) {
            const updateSjId = portfolioItemPriceSjid(rObj);
          }
        }


      }

      // console.log("reqObj is ", reqObj);
      setAddPortFolioItem(data)
      setItemPriceData(itemPriceData)
      // setBundleTabs("bundleServiceAdministrative")
      setBundleTabs("bundleServicePriceCalculator")
    }
  }
  const getPriceCalculatorDataFun = async (data, editAbleOrNot, priceDataEditOrNot) => {
    // console.log("==========data ", data);
    // console.log("==========priceDataEditOrNot ", priceDataEditOrNot);
    // console.log("==========createdServiceData ", createdServiceData);

    console.log("==========addPortFolioItem ", editableServiceOrBundleData, editBundleService, createdBundleItems);
    setPriceCalculatorTabEditAble(priceDataEditOrNot);
    setAddPortFolioItem({
      ...addPortFolioItem,
      unit: data?.unit,
      usageType: data?.usageType,
      frequency: data?.frequency,
      currency: data?.currency,
      year: data?.year,
      numberOfEvents: data?.numberOfEvents,
    });
    if (serviceOrBundlePrefix === "SERVICE") {

      if (editAbleOrNot === "editAble") {
        if (priceDataEditOrNot) {
          setBundleTabs("bundleServiceAdministrative")
        } else {
          // Old Working bundle/service Price create request obj
          // const priceUpdateData = {
          //   itemPriceDataId: data.id ? data.id : 0,
          //   quantity: 1,
          //   // standardJobId: addPortFolioItem.templateId,
          //   // repairKitId: addPortFolioItem.repairOption,
          //   // templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
          //   standardJobId: addPortFolioItem.templateId ? addPortFolioItem.templateId : "",
          //   repairKitId: addPortFolioItem.repairOption ? addPortFolioItem.repairOption : "",
          //   templateDescription: (addPortFolioItem.repairOption && addPortFolioItem.templateId != "") ? addPortFolioItem.templateDescription?.value : "",
          //   repairOption: "",
          //   additional: "",
          //   partListId: "",
          //   serviceEstimateId: "",
          //   numberOfEvents: 0,
          //   priceMethod: (data.priceMethod != "EMPTY"
          //     || data.priceMethod != "" ||
          //     data.priceMethod != null) ?
          //     data.priceMethod?.value : "EMPTY",
          //   priceType: (data.priceType != "EMPTY" ||
          //     data.priceType != "" ||
          //     data.priceType != null) ? data.priceType?.value : "EMPTY",
          //   listPrice: 0,
          //   priceEscalation: data.escalationPriceOptionsValue != "" ? data.escalationPriceOptionsValue : "",
          //   calculatedPrice: 0,
          //   flatPrice: data.flatPrice ? parseInt(data.flatPrice) : 0,
          //   year: data?.year?.value,
          //   noOfYear: parseInt(data?.noOfYear),
          //   // year: createdBundleItems?.year?.value,
          //   // noOfYear: parseInt(createdBundleItems?.noOfYear),
          //   sparePartsPrice: 0,
          //   sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
          //     (data.priceBreakDownOptionsKeyValue == "PARTS") ?
          //     data.priceBreakDownInputValue : 0),
          //   servicePrice: 0,
          //   labourPrice: 0,
          //   labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
          //     (data.priceBreakDownOptionsKeyValue == "LABOR") ?
          //     data.priceBreakDownInputValue : 0),
          //   miscPrice: 0,
          //   miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
          //     (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
          //     data.priceBreakDownInputValue : 0),
          //   totalPrice: 0,
          //   netService: 0,
          //   additionalPriceType: (data?.priceAdditionalSelect != "EMPTY" ||
          //     data?.priceAdditionalSelect != "" ||
          //     data?.priceAdditionalSelect != null) ?
          //     data?.priceAdditionalSelect?.value : "ABSOLUTE",
          //   additionalPriceValue: data?.priceAdditionalInput,
          //   discountType: (data?.discountTypeSelect != "EMPTY" ||
          //     data?.discountTypeSelect != "" ||
          //     data?.discountTypeSelect != null) ? data?.discountTypeSelect?.value : "EMPTY",
          //   discountValue: data?.discountTypeInput,
          //   recommendedValue: parseInt(data?.recommendedValue),
          //   startUsage: parseInt(data?.startUsage),
          //   endUsage: parseInt(data?.endUsage),
          //   sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
          //     (data.escalationPriceOptionsValue == "PARTS") ?
          //     data.escalationPriceInputValue : 0),
          //   labourEscalation: ((data.escalationPriceOptionsValue != "") &&
          //     (data.escalationPriceOptionsValue == "LABOR") ?
          //     data.escalationPriceInputValue : 0),
          //   miscEscalation: ((data.escalationPriceOptionsValue != "") &&
          //     (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
          //     data.escalationPriceInputValue : 0),
          //   serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
          //     (data.escalationPriceOptionsValue == "SERVICE") ?
          //     data.escalationPriceInputValue : 0),
          //   withBundleService: false,
          //   portfolio: (
          //     (data.portfolioDataId == null) ||
          //     (data.portfolioDataId == 0) ||
          //     (data.portfolioDataId == undefined) ||
          //     (data.portfolioDataId == "")) ? null : {
          //     portfolioId: data.portfolioDataId
          //   },
          //   tenantId: loginTenantId,
          //   partsRequired: true,
          //   labourRequired: true,
          //   serviceRequired: false,
          //   miscRequired: true,
          //   inclusionExclusion: false
          // }

          // current working bundle/service price update request obj
          let priceUpdateData = {
            itemPriceDataId: ((data.id === "") || (data.id === null) ||
              (data.id === undefined) || (data.id === 0)) ? 0 : data.id,
            quantity: 1,
            standardJobId: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
              (addPortFolioItem.templateId === undefined)) ? "" : addPortFolioItem.templateId,
            repairKitId: ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) ||
              (addPortFolioItem.repairOption === undefined)) ? "" : addPortFolioItem.repairOption,
            templateDescription: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
              (addPortFolioItem.templateId === undefined)) ? "" : (typeof addPortFolioItem.templateDescription === "object") ?
              addPortFolioItem.templateDescription?.value : addPortFolioItem.templateDescription,
            repairOption: "",
            additional: "",
            partListId: "",
            serviceEstimateId: "",
            numberOfEvents: (data.priceType?.value === "FIXED") ? data.numberOfEvents : 0,
            frequency: ((data?.frequency === "") || (data?.frequency === null) ||
              (data?.frequency === undefined) || (data?.frequency === "EMPTY")) ? "CYCLIC" :
              (typeof data?.frequency === "object") ? data?.frequency?.value : data?.frequency,
            priceMethod: ((data.priceMethod === "EMPTY") || (data.priceMethod === "") ||
              (data.priceMethod === null)) ? "LIST_PRICE" : data.priceMethod?.value,
            priceType: ((data.priceType === "EMPTY") || (data.priceType === "") ||
              (data.priceType === null)) ? "EVENT_BASED" : data.priceType?.value,
            listPrice: 0,
            priceEscalation: ((data.escalationPriceOptionsValue === "") || (data.escalationPriceOptionsValue === null) ||
              (data.escalationPriceOptionsValue === undefined)) ? "" : data.escalationPriceOptionsValue,
            calculatedPrice: 0,
            flatPrice: ((data.flatPrice === "") || (data.flatPrice === null) || (data.flatPrice === undefined) ||
              (data.flatPrice === 0)) ? 0 : parseInt(data.flatPrice),
            year: data.year?.value,
            noOfYear: parseInt(data.noOfYear),
            sparePartsPrice: 0,
            sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
              (data.priceBreakDownOptionsKeyValue == "PARTS") ?
              data.priceBreakDownInputValue : 0),
            servicePrice: 0,
            labourPrice: 0,
            labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
              (data.priceBreakDownOptionsKeyValue == "LABOR") ?
              data.priceBreakDownInputValue : 0),
            miscPrice: 0,
            miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
              (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
              data.priceBreakDownInputValue : 0),
            totalPrice: 0,
            netService: 0,
            additionalPriceType: ((data?.priceAdditionalSelect === "EMPTY") ||
              (data?.priceAdditionalSelect === "") ||
              (data?.priceAdditionalSelect === null)) ? "ABSOLUTE" : data?.priceAdditionalSelect?.value,
            additionalPriceValue: data?.priceAdditionalInput,
            discountType: ((data?.discountTypeSelect === "EMPTY") ||
              (data?.discountTypeSelect === "") ||
              (data?.discountTypeSelect === null)) ? "PORTFOLIO_DISCOUNT" : data?.discountTypeSelect?.value,
            discountValue: data?.discountTypeInput,
            recommendedValue: parseInt(data?.recommendedValue),
            startUsage: parseInt(data.startUsage),
            endUsage: parseInt(data.endUsage),
            sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
              (data.escalationPriceOptionsValue == "PARTS") ?
              data.escalationPriceInputValue : 0),
            labourEscalation: ((data.escalationPriceOptionsValue != "") &&
              (data.escalationPriceOptionsValue == "LABOR") ?
              data.escalationPriceInputValue : 0),
            miscEscalation: ((data.escalationPriceOptionsValue != "") &&
              (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
              data.escalationPriceInputValue : 0),
            serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
              (data.escalationPriceOptionsValue == "SERVICE") ?
              data.escalationPriceInputValue : 0),
            sparePartsNOE: 0,
            labourNOE: 0,
            miscNOE: 0,
            recommendedUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
              (data.unit === "EMPTY")) ? "MONTH" : (typeof data.unit === "object") ?
              data.unit?.value === "YEAR" ? "MONTH" : data.unit?.value : data.unit,
            usageUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
              (data.unit === "EMPTY")) ? "YEAR" : (typeof data.unit === "object") ? data.unit?.value : data.unit,
            withBundleService: false,
            portfolio: ((data.portfolioDataId === 0) || (data.portfolioDataId === null) || (data.portfolioDataId === "") ||
              (data.portfolioDataId === undefined)) ? null : {
              portfolioId: data.portfolioDataId
            },
            tenantId: loginTenantId,
            inclusionExclusion: true,
            partsRequired: true,
            labourRequired: true,
            miscRequired: true,
            serviceRequired: false
          };
          if (data.id) {
            const updatePriceId = await updateItemPriceData(
              data.id,
              priceUpdateData
            );
            if (updatePriceId.status === 200) {
              const rObj = {
                standardJobId: addPortFolioItem.templateId,
                repairKitId: addPortFolioItem.repairOption,
                itemId: createServiceOrBundle.id,
                // itemId: addPortFolioItem.id,
                itemPriceDataId: data.id
              }

              if (!(((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) || (addPortFolioItem.templateId === undefined)) &&
                ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) || (addPortFolioItem.repairOption === undefined)))) {

                if (((addPortFolioItem.templateId == "") || (addPortFolioItem.templateId == null)) &&
                  (addPortFolioItem.repairOption != "") || (addPortFolioItem.repairOption != null)) {
                  const updateRkId = portfolioItemPriceRkId(rObj);
                }

                if (((addPortFolioItem.repairOption == "") || (addPortFolioItem.repairOption == null)) &&
                  ((addPortFolioItem.templateId != "") || (addPortFolioItem.templateId != null))) {
                  const updateSjId = portfolioItemPriceSjid(rObj);
                }
              }
            }
            setBundleTabs("bundleServiceAdministrative")
          } else {
            const itemPriceData = await createItemPriceData(priceUpdateData)
            setItemPriceData(itemPriceData.data);
            if (itemPriceData.status === 200) {
              const rObj = {
                standardJobId: addPortFolioItem.templateId,
                repairKitId: addPortFolioItem.repairOption,
                itemId: createServiceOrBundle.id,
                itemPriceDataId: itemPriceData.data.itemPriceDataId,
              }

              // if(((addPortFolioItem.templateId == "") || 
              // (addPortFolioItem.templateId == null) || 
              // (addPortFolioItem.templateId == undefined))){

              // }

              // if (((addPortFolioItem.templateId == "") ||
              //   (addPortFolioItem.templateId == null)) &&
              //   ((addPortFolioItem.repairOption != "") ||
              //     (addPortFolioItem.repairOption != null))) {
              //   const updateRkId = portfolioItemPriceRkId(rObj);
              // }

              // if (((addPortFolioItem.repairOption == "") ||
              //   (addPortFolioItem.repairOption == null)) &&
              //   ((addPortFolioItem.templateId != "") ||
              //     (addPortFolioItem.templateId != null))) {
              //   const updateSjId = portfolioItemPriceSjid(rObj);
              // }
            }
            setBundleTabs("bundleServiceAdministrative")
          }
        }
      } else if (editAbleOrNot === "noEditAble") {
        // Old working bundle item update obj
        // const priceUpdateData = {
        //   itemPriceDataId: 0,
        //   quantity: 1,
        //   // standardJobId: addPortFolioItem.templateId,
        //   // repairKitId: addPortFolioItem.repairOption,
        //   // templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
        //   standardJobId: addPortFolioItem.templateId ? addPortFolioItem.templateId : "",
        //   repairKitId: addPortFolioItem.repairOption ? addPortFolioItem.repairOption : "",
        //   templateDescription: (addPortFolioItem.repairOption && addPortFolioItem.templateId != "") ? addPortFolioItem.templateDescription?.value : "",
        //   repairOption: "",
        //   additional: "",
        //   partListId: "",
        //   serviceEstimateId: "",
        //   numberOfEvents: 0,
        //   priceMethod: (
        //     (data.priceMethod == undefined) ||
        //     (data.priceMethod == "EMPTY") ||
        //     (data.priceMethod == "") ||
        //     (data.priceMethod == null) ||
        //     (data.priceMethod == "string")) ?
        //     "EMPTY" : data.priceMethod?.value,
        //   priceType: (
        //     (data.priceType == undefined) ||
        //     (data.priceType == "EMPTY") ||
        //     (data.priceType == "") ||
        //     (data.priceType == null) ||
        //     (data.priceType == "string")) ?
        //     "EMPTY" : data.priceType?.value,
        //   listPrice: 0,
        //   priceEscalation: data.escalationPriceOptionsValue != "" ? data.escalationPriceOptionsValue : "",
        //   calculatedPrice: 0,
        //   flatPrice: data.flatPrice ? parseInt(data.flatPrice) : 0,
        //   year: data?.year?.value,
        //   noOfYear: parseInt(data?.noOfYear),
        //   // year: createdBundleItems?.year?.value,
        //   // noOfYear: parseInt(createdBundleItems?.noOfYear),
        //   sparePartsPrice: 0,
        //   sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "PARTS") ?
        //     data.priceBreakDownInputValue : 0),
        //   servicePrice: 0,
        //   labourPrice: 0,
        //   labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "LABOR") ?
        //     data.priceBreakDownInputValue : 0),
        //   miscPrice: 0,
        //   miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
        //     data.priceBreakDownInputValue : 0),
        //   totalPrice: 0,
        //   netService: 0,
        //   additionalPriceType: (
        //     (data?.priceAdditionalSelect == undefined) ||
        //     (data?.priceAdditionalSelect == "EMPTY") ||
        //     (data?.priceAdditionalSelect == "") ||
        //     (data?.priceAdditionalSelect == null) ||
        //     (data?.priceAdditionalSelect == "string")) ?
        //     "ABSOLUTE" : data?.priceAdditionalSelect?.value,
        //   additionalPriceValue: data?.priceAdditionalInput,
        //   discountType: (
        //     (data?.discountTypeSelect == undefined) ||
        //     (data?.discountTypeSelect == "EMPTY") ||
        //     (data?.discountTypeSelect == "") ||
        //     (data?.discountTypeSelect == null) ||
        //     (data?.discountTypeSelect == "string")) ?
        //     "EMPTY" : data?.discountTypeSelect?.value,
        //   discountValue: data?.discountTypeInput,
        //   recommendedValue: parseInt(data?.recommendedValue),
        //   startUsage: parseInt(data?.startUsage),
        //   endUsage: parseInt(data?.endUsage),
        //   sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "PARTS") ?
        //     data.escalationPriceInputValue : 0),
        //   labourEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "LABOR") ?
        //     data.escalationPriceInputValue : 0),
        //   miscEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
        //     data.escalationPriceInputValue : 0),
        //   serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "SERVICE") ?
        //     data.escalationPriceInputValue : 0),
        //   withBundleService: false,
        //   // portfolio: (data.portfolioDataId || data.portfolioDataId != 0) ? {
        //   //   portfolioId: data.portfolioDataId
        //   // } : null,
        //   portfolio: null,
        //   tenantId: loginTenantId,
        //   partsRequired: true,
        //   labourRequired: true,
        //   serviceRequired: false,
        //   miscRequired: true,
        //   inclusionExclusion: false
        // }

        // current working bundle item update reqObj
        let priceUpdateData = {
          itemPriceDataId: ((data.id === "") || (data.id === null) ||
            (data.id === undefined) || (data.id === 0)) ? 0 : data.id,
          quantity: 1,
          standardJobId: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
            (addPortFolioItem.templateId === undefined)) ? "" : addPortFolioItem.templateId,
          repairKitId: ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) ||
            (addPortFolioItem.repairOption === undefined)) ? "" : addPortFolioItem.repairOption,
          templateDescription: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
            (addPortFolioItem.templateId === undefined)) ? "" : (typeof addPortFolioItem.templateDescription === "object") ?
            addPortFolioItem.templateDescription?.value : addPortFolioItem.templateDescription,
          repairOption: "",
          additional: "",
          partListId: "",
          serviceEstimateId: "",
          numberOfEvents: (data.priceType?.value === "FIXED") ? data.numberOfEvents : 0,
          frequency: ((data?.frequency === "") || (data?.frequency === null) ||
            (data?.frequency === undefined) || (data?.frequency === "EMPTY")) ? "CYCLIC" :
            (typeof data?.frequency === "object") ? data?.frequency?.value : data?.frequency,
          priceMethod: ((data.priceMethod === "EMPTY") || (data.priceMethod === "") ||
            (data.priceMethod === null)) ? "LIST_PRICE" : data.priceMethod?.value,
          priceType: ((data.priceType === "EMPTY") || (data.priceType === "") ||
            (data.priceType === null)) ? "EVENT_BASED" : data.priceType?.value,
          listPrice: 0,
          priceEscalation: ((data.escalationPriceOptionsValue === "") || (data.escalationPriceOptionsValue === null) ||
            (data.escalationPriceOptionsValue === undefined)) ? "" : data.escalationPriceOptionsValue,
          calculatedPrice: 0,
          flatPrice: ((data.flatPrice === "") || (data.flatPrice === null) || (data.flatPrice === undefined) ||
            (data.flatPrice === 0)) ? 0 : parseInt(data.flatPrice),
          year: data.year?.value,
          noOfYear: parseInt(data.noOfYear),
          sparePartsPrice: 0,
          sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "PARTS") ?
            data.priceBreakDownInputValue : 0),
          servicePrice: 0,
          labourPrice: 0,
          labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "LABOR") ?
            data.priceBreakDownInputValue : 0),
          miscPrice: 0,
          miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
            data.priceBreakDownInputValue : 0),
          totalPrice: 0,
          netService: 0,
          additionalPriceType: ((data?.priceAdditionalSelect === "EMPTY") ||
            (data?.priceAdditionalSelect === "") ||
            (data?.priceAdditionalSelect === null)) ? "ABSOLUTE" : data?.priceAdditionalSelect?.value,
          additionalPriceValue: data?.priceAdditionalInput,
          discountType: ((data?.discountTypeSelect === "EMPTY") ||
            (data?.discountTypeSelect === "") ||
            (data?.discountTypeSelect === null)) ? "PORTFOLIO_DISCOUNT" : data?.discountTypeSelect?.value,
          discountValue: data?.discountTypeInput,
          recommendedValue: parseInt(data?.recommendedValue),
          startUsage: parseInt(data.startUsage),
          endUsage: parseInt(data.endUsage),
          sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "PARTS") ?
            data.escalationPriceInputValue : 0),
          labourEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "LABOR") ?
            data.escalationPriceInputValue : 0),
          miscEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
            data.escalationPriceInputValue : 0),
          serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "SERVICE") ?
            data.escalationPriceInputValue : 0),
          sparePartsNOE: 0,
          labourNOE: 0,
          miscNOE: 0,
          recommendedUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
            (data.unit === "EMPTY")) ? "MONTH" : (typeof data.unit === "object") ?
            data.unit?.value === "YEAR" ? "MONTH" : data.unit?.value : data.unit,
          usageUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
            (data.unit === "EMPTY")) ? "YEAR" : (typeof data.unit === "object") ? data.unit?.value : data.unit,
          withBundleService: false,
          portfolio: ((data.portfolioDataId === 0) || (data.portfolioDataId === null) || (data.portfolioDataId === "") ||
            (data.portfolioDataId === undefined)) ? null : {
            portfolioId: data.portfolioDataId
          },
          tenantId: loginTenantId,
          inclusionExclusion: true,
          partsRequired: true,
          labourRequired: true,
          miscRequired: true,
          serviceRequired: false
        };
        const itemPriceData = await createItemPriceData(priceUpdateData)
        if (itemPriceData.status === 200) {
          setItemPriceData(itemPriceData.data);
          if (itemPriceData.status === 200) {
            const rObj = {
              standardJobId: addPortFolioItem.templateId,
              repairKitId: addPortFolioItem.repairOption,
              itemId: createdServiceData.itemId,
              itemPriceDataId: itemPriceData.data.itemPriceDataId,
            }

            if (!(((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) || (addPortFolioItem.templateId === undefined)) &&
              ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) || (addPortFolioItem.repairOption === undefined)))) {

              if (((addPortFolioItem.templateId == "") || (addPortFolioItem.templateId == null)) &&
                ((addPortFolioItem.repairOption != "") || (addPortFolioItem.repairOption != null))) {
                const updateRkId = portfolioItemPriceRkId(rObj);
              }

              if (((addPortFolioItem.repairOption == "") || (addPortFolioItem.repairOption == null)) &&
                ((addPortFolioItem.templateId != "") || (addPortFolioItem.templateId != null))) {
                const updateSjId = portfolioItemPriceSjid(rObj);
              }
            }

          }
          setBundleTabs("bundleServiceAdministrative")
        }
      } else {
        toast("😐" + "Something Went wrong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      // setBundleTabs("bundleServiceAdministrative")
    } else if (serviceOrBundlePrefix === "BUNDLE") {
      // console.log("createdBundleItems : ", addPortFolioItem)
      if (priceDataEditOrNot) {
        setBundleTabs("bundleServiceAdministrative")
      } else {
        // Old working price Update Request obj 
        // const priceUpdateData = {
        //   itemPriceDataId: data.id,
        //   quantity: 1,
        //   standardJobId: addPortFolioItem.templateId,
        //   repairKitId: addPortFolioItem.repairOption,
        //   templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
        //   repairOption: "",
        //   additional: "",
        //   partListId: "",
        //   serviceEstimateId: "",
        //   numberOfEvents: 0,
        //   priceMethod: (data.priceMethod != "EMPTY"
        //     || data.priceMethod != "" ||
        //     data.priceMethod != null) ?
        //     data.priceMethod?.value : "EMPTY",
        //   priceType: (data.priceType != "EMPTY" ||
        //     data.priceType != "" ||
        //     data.priceType != null) ? data.priceType?.value : "EMPTY",
        //   listPrice: 0,
        //   priceEscalation: data.escalationPriceOptionsValue != "" ? data.escalationPriceOptionsValue : "",
        //   calculatedPrice: 0,
        //   flatPrice: data.flatPrice ? parseInt(data.flatPrice) : 0,
        //   year: data?.year?.value,
        //   noOfYear: parseInt(data?.noOfYear),
        //   // year: createdBundleItems?.year?.value,
        //   // noOfYear: parseInt(createdBundleItems?.noOfYear),
        //   sparePartsPrice: 0,
        //   sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "PARTS") ?
        //     data.priceBreakDownInputValue : 0),
        //   servicePrice: 0,
        //   labourPrice: 0,
        //   labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "LABOR") ?
        //     data.priceBreakDownInputValue : 0),
        //   miscPrice: 0,
        //   miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
        //     (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
        //     data.priceBreakDownInputValue : 0),
        //   totalPrice: 0,
        //   netService: 0,
        //   additionalPriceType: (data?.priceAdditionalSelect != "EMPTY" ||
        //     data?.priceAdditionalSelect != "" ||
        //     data?.priceAdditionalSelect != null) ?
        //     data?.priceAdditionalSelect?.value : "ABSOLUTE",
        //   additionalPriceValue: data?.priceAdditionalInput,
        //   discountType: (data?.discountTypeSelect != "EMPTY" ||
        //     data?.discountTypeSelect != "" ||
        //     data?.discountTypeSelect != null) ? data?.discountTypeSelect?.value : "EMPTY",
        //   discountValue: data?.discountTypeInput,
        //   recommendedValue: parseInt(data?.recommendedValue),
        //   startUsage: parseInt(data?.startUsage),
        //   endUsage: parseInt(data?.endUsage),
        //   sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "PARTS") ?
        //     data.escalationPriceInputValue : 0),
        //   labourEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "LABOR") ?
        //     data.escalationPriceInputValue : 0),
        //   miscEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
        //     data.escalationPriceInputValue : 0),
        //   serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
        //     (data.escalationPriceOptionsValue == "SERVICE") ?
        //     data.escalationPriceInputValue : 0),
        //   withBundleService: false,
        //   portfolio: (
        //     (data.portfolioDataId == null) ||
        //     (data.portfolioDataId == 0) ||
        //     (data.portfolioDataId == undefined) ||
        //     (data.portfolioDataId == "")) ? null : {
        //     portfolioId: data.portfolioDataId
        //   },
        //   tenantId: loginTenantId,
        //   partsRequired: true,
        //   labourRequired: true,
        //   serviceRequired: false,
        //   miscRequired: true,
        //   inclusionExclusion: false
        // }

        // new price update request Obj
        let priceUpdateData = {
          itemPriceDataId: ((data.id === "") || (data.id === null) ||
            (data.id === undefined) || (data.id === 0)) ? 0 : data.id,
          quantity: 1,
          standardJobId: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
            (addPortFolioItem.templateId === undefined)) ? "" : addPortFolioItem.templateId,
          repairKitId: ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) ||
            (addPortFolioItem.repairOption === undefined)) ? "" : addPortFolioItem.repairOption,
          templateDescription: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
            (addPortFolioItem.templateId === undefined)) ? "" : (typeof addPortFolioItem.templateDescription === "object") ?
            addPortFolioItem.templateDescription?.value : addPortFolioItem.templateDescription,
          repairOption: "",
          additional: "",
          partListId: "",
          serviceEstimateId: "",
          numberOfEvents: (data.priceType?.value === "FIXED") ? data.numberOfEvents : 0,
          frequency: ((data?.frequency === "") || (data?.frequency === null) ||
            (data?.frequency === undefined) || (data?.frequency === "EMPTY")) ? "CYCLIC" :
            (typeof data?.frequency === "object") ? data?.frequency?.value : data?.frequency,
          priceMethod: ((data.priceMethod === "EMPTY") || (data.priceMethod === "") ||
            (data.priceMethod === null)) ? "LIST_PRICE" : data.priceMethod?.value,
          priceType: ((data.priceType === "EMPTY") || (data.priceType === "") ||
            (data.priceType === null)) ? "EVENT_BASED" : data.priceType?.value,
          listPrice: 0,
          priceEscalation: ((data.escalationPriceOptionsValue === "") || (data.escalationPriceOptionsValue === null) ||
            (data.escalationPriceOptionsValue === undefined)) ? "" : data.escalationPriceOptionsValue,
          calculatedPrice: 0,
          flatPrice: ((data.flatPrice === "") || (data.flatPrice === null) || (data.flatPrice === undefined) ||
            (data.flatPrice === 0)) ? 0 : parseInt(data.flatPrice),
          year: data.year?.value,
          noOfYear: parseInt(data.noOfYear),
          sparePartsPrice: 0,
          sparePartsPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "PARTS") ?
            data.priceBreakDownInputValue : 0),
          servicePrice: 0,
          labourPrice: 0,
          labourPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "LABOR") ?
            data.priceBreakDownInputValue : 0),
          miscPrice: 0,
          miscPriceBreakDownPercentage: ((data.priceBreakDownOptionsKeyValue != "") &&
            (data.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
            data.priceBreakDownInputValue : 0),
          totalPrice: 0,
          netService: 0,
          additionalPriceType: ((data?.priceAdditionalSelect === "EMPTY") ||
            (data?.priceAdditionalSelect === "") ||
            (data?.priceAdditionalSelect === null)) ? "ABSOLUTE" : data?.priceAdditionalSelect?.value,
          additionalPriceValue: data?.priceAdditionalInput,
          discountType: ((data?.discountTypeSelect === "EMPTY") ||
            (data?.discountTypeSelect === "") ||
            (data?.discountTypeSelect === null)) ? "PORTFOLIO_DISCOUNT" : data?.discountTypeSelect?.value,
          discountValue: data?.discountTypeInput,
          recommendedValue: parseInt(data?.recommendedValue),
          startUsage: parseInt(data.startUsage),
          endUsage: parseInt(data.endUsage),
          sparePartsEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "PARTS") ?
            data.escalationPriceInputValue : 0),
          labourEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "LABOR") ?
            data.escalationPriceInputValue : 0),
          miscEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "MISCELLANEOUS") ?
            data.escalationPriceInputValue : 0),
          serviceEscalation: ((data.escalationPriceOptionsValue != "") &&
            (data.escalationPriceOptionsValue == "SERVICE") ?
            data.escalationPriceInputValue : 0),
          sparePartsNOE: 0,
          labourNOE: 0,
          miscNOE: 0,
          recommendedUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
            (data.unit === "EMPTY")) ? "MONTH" : (typeof data.unit === "object") ?
            data.unit?.value === "YEAR" ? "MONTH" : data.unit?.value : data.unit,
          usageUnit: ((data.unit === "") || (data.unit === null) || (data.unit === undefined) ||
            (data.unit === "EMPTY")) ? "YEAR" : (typeof data.unit === "object") ? data.unit?.value : data.unit,
          withBundleService: false,
          portfolio: ((data.portfolioDataId === 0) || (data.portfolioDataId === null) || (data.portfolioDataId === "") ||
            (data.portfolioDataId === undefined)) ? null : {
            portfolioId: data.portfolioDataId
          },
          tenantId: loginTenantId,
          inclusionExclusion: true,
          partsRequired: true,
          labourRequired: true,
          miscRequired: true,
          serviceRequired: false
        };
        // console.log("priceUpdateData is 23452345 ", priceUpdateData)
        if ((data.id !== "") ||
          (data.id !== null) ||
          (data.id !== undefined)) {
          const updatePriceId = await updateItemPriceData(
            data.id,
            priceUpdateData
          );

          if (((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null)) &&
            ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null))) {
          } else {
            const rObj = {
              standardJobId: addPortFolioItem.templateId,
              repairKitId: addPortFolioItem.repairOption,
              itemId: editBundleService ? editableServiceOrBundleData?.itemId : createdBundleItems.itemId,
              // itemId: createdServiceData.itemId,
              // itemId: addPortFolioItem.id,
              itemPriceDataId: data.id
            }

            if (!(((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) || (addPortFolioItem.templateId === undefined)) &&
              ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) || (addPortFolioItem.repairOption === undefined)))) {

              if (((addPortFolioItem.templateId == "") || (addPortFolioItem.templateId == null)) &&
                ((addPortFolioItem.repairOption != "") || (addPortFolioItem.repairOption != null))) {
                const updateRkId = portfolioItemPriceRkId(rObj);
              }

              if (((addPortFolioItem.repairOption == "") || (addPortFolioItem.repairOption == null)) &&
                ((addPortFolioItem.templateId != "") || (addPortFolioItem.templateId != null))) {
                const updateSjId = portfolioItemPriceSjid(rObj);
              }
            }

          }
        }
        setBundleTabs("bundleServiceAdministrative")
      }
    } else {
      console.log("data 123456789 : ", data)
      setPriceCalculator(data);
      setBundleServiceShow(false);
      setBundleTabs("bundleServiceHeader")
      saveAddNewServiceOrBundle();//bundle/service creation API called
    }
  };

  const handleCreateChange = (e) => {
    setModelResultSelected(false);
    setEditBundleService(false);
    setBundleAndServiceEditAble(false);
    setBundleServiceAdministrativeEditable(false);
    setPriceCalculatorTabEditAble(false)
    setSelectedCustomerSegmentOption("");
    setValue2({
      value: "DRAFT",
      label: "Draft"
    })
    setIsActiveStatus(false);
    if (e.value === "PORTFOLIO") {
      let portfolioDetails = {
        portfolioId: "",
        type: "new",
      };
      // history.push("/portfolio/new")
      history.push({
        pathname: "/portfolio/new",
        state: portfolioDetails,
      });
    } else if (e.value === "SERVICE") {
      setServiceOrBundlePrefix("SERVICE");
      setBundleTabs("bundleServiceHeader")
      setBundleServiceShow(true);
      setCreatedBundleItems("");

      setCreateServiceOrBundle({
        id: "",
        name: "",
        description: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        model: "",
        family: "",
        prefix: "",
        machine: "",
        additional: "",
        machineComponent: "",
      });

      setAdministrative({
        preparedBy: "",
        approvedBy: "",
        preparedOn: new Date(),
        revisedBy: "",
        revisedOn: new Date(),
        salesOffice: "",
        offerValidity: "",
      });
      setItemPriceData({});

      setQuerySearchModelPrefixOption([]);
      setSelectedPrefixOption("");
      setBundleServiceChargeableOrNot(true);
      setValue4({
        value: "chargeable",
        label: "Chargeable"
      });

    } else if (e.value === "BUNDLE") {
      setServiceOrBundlePrefix("BUNDLE");
      setCreatedBundleItems("");
      setQuerySearchModelPrefixOption([]);
      setSelectedPrefixOption("");
      setBundleTabs("bundleServiceHeader")
      setBundleServiceShow(true);
      setCreateServiceOrBundle({
        id: "",
        name: "",
        description: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        model: "",
        family: "",
        prefix: "",
        machine: "",
        additional: "",
        machineComponent: "",
      });
      setAdministrative({
        preparedBy: "",
        approvedBy: "",
        preparedOn: new Date(),
        revisedBy: "",
        revisedOn: new Date(),
        salesOffice: "",
        offerValidity: "",
      });
    }

  }


  const SearchedPortfolioColumn = [
    {
      name: (
        <>
          {/* <div>Solution Id</div> */}
          <div>Name</div>
        </>
      ),
      selector: (row) => row?.name,
      wrap: true,
      sortable: true,
      format: (row) => row?.name,
    },
    {
      name: (
        <>
          <div>Description</div>
        </>
      ),
      selector: (row) => row?.description,
      wrap: true,
      sortable: true,
      format: (row) => row?.description,
    },
    {
      name: (
        <>
          <div>Strategy</div>
        </>
      ),
      selector: (row) => row?.strategyTask,
      wrap: true,
      sortable: true,
      format: (row) => row?.strategyTask,
    }, {
      name: (
        <>
          <div>Task Type</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    // {
    //   name: (
    //     <>
    //       <div>Quantity</div>
    //     </>
    //   ),
    //   selector: (row) => row.portfolioPrice?.quantity,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.portfolioPrice?.quantity,
    // },
    {
      name: (
        <>
          <div>Net Price</div>
        </>
      ),
      // selector: (row) => row?.portfolioPrice?.price,
      // wrap: true,
      // sortable: true,
      // format: (row) => row?.portfolioPrice?.price,
      selector: (row) => row?.netPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netPrice,
    },
    {
      name: (
        <>
          <div>Net Additional</div>
        </>
      ),
      selector: (row) => row?.additionalPrice?.additionalPercentage,
      wrap: true,
      sortable: true,
      format: (row) => row?.additionalPrice?.additionalPercentage,
    },
    {
      name: (
        <>
          <div>Net Parts Price</div>
        </>
      ),
      // selector: (row) => row?.portfolioPrice?.sparePartsPrice,
      // wrap: true,
      // sortable: true,
      // format: (row) => row?.portfolioPrice?.sparePartsPrice,
      selector: (row) => row?.netPartsPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netPartsPrice,
    },
    {
      name: (
        <>
          <div>Net Service Price</div>
        </>
      ),
      // selector: (row) => row?.portfolioPrice?.servicePrice,
      // wrap: true,
      // sortable: true,
      // format: (row) => row?.portfolioPrice?.servicePrice,
      selector: (row) => row?.netServicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.netServicePrice,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      // selector: (row) => row.portfolioPrice?.totalPrice,
      // wrap: true,
      // sortable: true,
      // format: (row) => row.portfolioPrice?.totalPrice,
      selector: (row) => row?.calculatedPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.calculatedPrice,
    },
    // {
    //   name: (
    //     <>
    //       <div>Comments</div>
    //     </>
    //   ),
    //   selector: (row) => row.itemHeaderModel?.comments,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.itemHeaderModel?.comments,
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
          <a href={undefined} onClick={() =>
            makePortfolioEditableEditable(row)
          } style={{ cursor: "pointer" }} >

            <img className="mr-2" src={penIcon} />
          </a>
        </div>
      ),
    },
  ];

  const bundleServiceSearchTableColumns = [
    {
      name: (
        <>
          {/* <div>Solution Id</div> */}
          <div>Name</div>
        </>
      ),
      selector: (row) => row?.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemName,
    },
    {
      name: (
        <>
          <div>Description</div>
        </>
      ),
      selector: (row) => row?.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemDescription,
    },
    {
      name: (
        <>
          <div>Strategy</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
    }, {
      name: (
        <>
          <div>Task Type</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Quantity</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity ? row?.quantity : 1,
    },
    {
      name: (
        <>
          <div>Recommended Value</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },

    {
      name: (
        <>
          <div>Net Parts Price</div>
        </>
      ),
      selector: (row) => row?.sparePartsPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.sparePartsPrice,
    },
    {
      name: (
        <>
          <div>Net Service Price</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row?.calculatedPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.calculatedPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row?.comments,
      wrap: true,
      sortable: true,
      format: (row) => row?.comments,
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
          <a href={undefined} onClick={() =>
            makeBundleServiceEditable(row)
          } style={{ cursor: "pointer" }} >
            <img className="mr-2" src={penIcon} />
          </a>
        </div>
      ),
    }
  ]


  const PortfolioItemColumn = (showColumnDataOnService ?
    [
      {
        name: (
          <>
            {/* <div>Solution Id</div> */}
            <div>Name</div>
          </>
        ),
        // selector: (row) => row.itemId,
        // wrap: true,
        // sortable: true,
        // format: (row) => row.itemId,
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
      // {
      //   name: (
      //     <>
      //       <div>Strategy</div>
      //     </>
      //   ),
      //   selector: (row) => row.itemHeaderModel.itemHeaderStrategy,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.itemHeaderModel.itemHeaderStrategy,
      // }, {
      //   name: (
      //     <>
      //       <div>Task Type</div>
      //     </>
      //   ),
      //   selector: (row) => row.itemBodyModel.taskType,
      //   wrap: true,
      //   sortable: true,
      //   format: (row) => row.itemBodyModel.taskType,
      // },
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
            <div>Net Price</div>
          </>
        ),
        selector: (row) => row.itemHeaderModel.netPrice,
        wrap: true,
        sortable: true,
        format: (row) => row.itemHeaderModel.netPrice,
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
            <a href={undefined} onClick={() =>
              makeBundleServiceEditable(row)
            } style={{ cursor: "pointer" }} >
              <img className="mr-2" src={penIcon} />
            </a>
          </div>
        ),
      }
    ] : [
      {
        name: (
          <>
            {/* <div>Solution Id</div> */}
            <div>Name</div>
          </>
        ),
        // selector: (row) => row.itemId,
        // wrap: true,
        // sortable: true,
        // format: (row) => row.itemId,
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
      // {`${row.itemHeaderModel.bundleFlag == "BUNDLE_ITEM"}`}
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
      }, {
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
        selector: (row) => row.itemHeaderModel?.additional,
        wrap: true,
        sortable: true,
        format: (row) => row.itemHeaderModel?.additional,
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
            <a href={undefined} onClick={() =>
              makeBundleServiceEditable(row)
            } style={{ cursor: "pointer" }} >
              <img className="mr-2" src={penIcon} />
            </a>
          </div>
        ),
      }
    ]);

  const getFormattedDateTimeByTimeStampForAdministrative = (timeStamp) => {

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
    var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
    return finalDateString;
  }
  const [administrative, setAdministrative] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });
  const handleAdministrativreChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setAdministrative({ ...administrative, [name]: value });
  };


  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
            <Select className="customselect1" id="custom"
              placeholder=" + Create"
              styles={customStyles}
              options={[
                { label: "Porfolio", value: "PORTFOLIO" },
                { label: "Service", value: "SERVICE" },
                { label: "Bundles", value: "BUNDLE" },
              ]}
              onChange={handleCreateChange}
            />
            {/* <div>
                        <Link to={{pathname: "/portfolio/new",state: { portfolioResponse}}}  onClick={handleCreatePortfolio} style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create Portfolio<span className="ml-2"></span>
                            </Link>
                            <Link style={{ cursor: 'pointer' }} className="btn bg-primary text-white mx-2">
                                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create Service<span className="ml-2"></span>
                            </Link>
                            <Link style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create Bundle<span className="ml-2"></span>
                            </Link>
                        </div>  */}
          </div>

          <div className="card p-4 mt-5">
            <TabContext value={recentTabsValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>

                <TabList className="custom-tabs-div"
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Portfolio" value={"portfolio"} />
                  <Tab label="Service " value={"service"} />
                  <Tab label="Bundle" value={"bundle"} />
                </TabList>
              </Box>
              <TabPanel value={"portfolio"}>
                <div className="mt-1">
                  <div className="recent-div p-3">
                    <h6 className="font-weight-600 text-grey mb-0 text-uppercase">RECENT {recentTabsValue}</h6>
                    <div className="row">
                      {recentPortfolio.message === undefined ?
                        <>
                          {recentPortfolio.map((data, index) =>
                            index < 10 ?
                              <div className="col-md-4">
                                <div className="recent-items mt-3">
                                  <div className="d-flex justify-content-between align-items-center ">
                                    <p className="mb-0 overflow-hidden white-space">
                                      <FontAwesomeIcon
                                        className=" font-size-14"
                                        icon={faFileAlt}
                                      />
                                      <span className="font-weight-500 ml-2">
                                        {data.name}
                                      </span>
                                    </p>
                                    <div className="d-flex align-items-center">
                                      <a
                                        href={undefined}
                                        className="btn-sm"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                          onClick={() =>
                                            makePortfolioEditableEditable(data)
                                          }
                                        ></i>
                                      </a>
                                      <a className="ml-3 font-size-14 cursor">
                                        <FontAwesomeIcon icon={faShareAlt} />
                                      </a>
                                      <a className="ml-3 font-size-14 cursor">
                                        <FontAwesomeIcon icon={faFolderPlus} />
                                      </a>
                                      <a className="ml-3 font-size-14 cursor">
                                        <FontAwesomeIcon icon={faUpload} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                  <p className="font-size-12 mb-0">
                                    {/* {getFormattedDateTimeByTimeStamp(data.createdAt)} */}
                                    {getFormattedDateTimeByTimeStamp(data.updatedAt)}
                                  </p>
                                  <p className="font-size-12 mb-0">Portfolio</p>
                                </div>
                              </div> : <></>
                          )}
                        </>
                        :
                        <>
                          <p className="font-size-12 mb-0 ml-3">No Recent Portfolio</p>
                        </>
                      }

                    </div>
                  </div>
                  <div className="recent-div p-3 d-none">
                    <h6 className="font-weight-600 text-grey mb-0">
                      SERVICE BUNDLES
                    </h6>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                Service Bundles
                              </span>
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="white-space custom-checkbox">
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label=""
                                  />
                                </FormGroup>
                              </div>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              <a className="ml-2 cursor">
                                <MuiMenuComponent options={activityOptions} />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                          <p className="font-size-12 mb-0">Service Bundles</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                Service Bundles
                              </span>
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="white-space custom-checkbox">
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label=""
                                  />
                                </FormGroup>
                              </div>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              <a className="ml-2 cursor">
                                <MuiMenuComponent options={activityOptions} />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                          <p className="font-size-12 mb-0">Service Bundles</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                Strategy Task
                              </span>
                            </p>
                            <div className="d-flex align-items-center">
                              <div className="white-space custom-checkbox">
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox />}
                                    label=""
                                  />
                                </FormGroup>
                              </div>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a className="ml-3 font-size-14 cursor">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              <a className="ml-2 cursor">
                                <MuiMenuComponent options={activityOptions} />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                          <p className="font-size-12 mb-0">Strategy Task</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={"service"}>
                <div className="mt-1">
                  <div className="recent-div p-3">
                    <h6 className="font-weight-600 text-grey mb-0 text-uppercase">RECENT {recentTabsValue}</h6>
                    <div className="row">
                      {recentServiceItemsList.map((data, sIndex) =>
                        <div className="col-md-4">
                          <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="mb-0 overflow-hidden white-space">
                                <FontAwesomeIcon
                                  className=" font-size-14"
                                  icon={faFileAlt}
                                />
                                <span className="font-weight-500 ml-2">
                                  {/* Portfolio{" "} {data.name} */} {data.itemName}
                                </span>
                              </p>
                              <div className="d-flex align-items-center">
                                {/* <div className="white-space custom-checkbox">
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label=""
                                />
                              </FormGroup>
                            </div> */}
                                <a
                                  href={undefined}
                                  className="btn-sm"
                                  style={{ cursor: "pointer" }}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      makeBundleServiceEditable(data)
                                    }
                                  ></i>
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faShareAlt} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faFolderPlus} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faUpload} />
                                </a>
                                {/* <a className="ml-2 cursor">
                              <MuiMenuComponent options={activityOptions} />
                            </a> */}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                            <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(data.updatedAt)}</p>
                            <p className="font-size-12 mb-0">
                              Service
                              {/* {data.itemHeaderModel.bundleFlag == "SERVICE" ? "Service" : data.itemHeaderModel.bundleFlag == "BUNDLE_ITEM" ? "Bundle" : "Portfolio"} */}
                            </p>
                          </div>
                        </div>

                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={"bundle"}>
                <div className="mt-1">
                  <div className="recent-div p-3">
                    <h6 className="font-weight-600 text-grey mb-0 text-uppercase">RECENT {recentTabsValue}</h6>
                    <div className="row">
                      {recentBundleService.map((data, sIndex) =>
                        <div className="col-md-4">
                          <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="mb-0 overflow-hidden white-space">
                                <FontAwesomeIcon
                                  className=" font-size-14"
                                  icon={faFileAlt}
                                />
                                <span className="font-weight-500 ml-2">
                                  {/* Portfolio{" "} {data.name} */} {data.itemName}
                                </span>
                              </p>
                              <div className="d-flex align-items-center">
                                {/* <div className="white-space custom-checkbox">
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label=""
                                />
                              </FormGroup>
                            </div> */}
                                <a
                                  href={undefined}
                                  className="btn-sm"
                                  style={{ cursor: "pointer" }}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      makeBundleServiceEditable(data)
                                    }
                                  ></i>
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faShareAlt} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faFolderPlus} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faUpload} />
                                </a>
                                {/* <a className="ml-2 cursor">
                              <MuiMenuComponent options={activityOptions} />
                            </a> */}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                            <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(data.updatedAt)}</p>
                            <p className="font-size-12 mb-0">
                              Bundle
                              {/* {data.itemHeaderModel.bundleFlag == "SERVICE" ? "Service" : data.itemHeaderModel.bundleFlag == "BUNDLE_ITEM" ? "Bundle" : "Portfolio"} */}
                            </p>
                          </div>
                        </div>

                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
            <div className="mt-1 d-none">
              {/* <h6 className="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  {recentPortfolio.message === undefined ?
                    <>

                      {recentPortfolio.map((data, index) =>
                        index < 10 ?
                          <div className="col-md-4">
                            <div className="recent-items mt-3">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space">
                                  <FontAwesomeIcon
                                    className=" font-size-14"
                                    icon={faFileAlt}
                                  />
                                  <span className="font-weight-500 ml-2">
                                    {/* Portfolio{" "} {data.name} */} {data.name}
                                  </span>
                                </p>
                                <div className="d-flex align-items-center">
                                  {/* <div className="white-space custom-checkbox">
                                <FormGroup>
                                  <FormControlLabel
                                    control={index == 0 ? <Checkbox defaultChecked /> : <Checkbox />}
                                    label=""
                                  />
                                </FormGroup>
                              </div> */}
                                  <a
                                    href={undefined}
                                    className="btn-sm"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                      onClick={() =>
                                        makePortfolioEditableEditable(data)
                                      }
                                    ></i>
                                  </a>
                                  <a className="ml-3 font-size-14 cursor">
                                    <FontAwesomeIcon icon={faShareAlt} />
                                  </a>
                                  <a className="ml-3 font-size-14 cursor">
                                    <FontAwesomeIcon icon={faFolderPlus} />
                                  </a>
                                  <a className="ml-3 font-size-14 cursor">
                                    <FontAwesomeIcon icon={faUpload} />
                                  </a>
                                  {/* <a className="ml-2 cursor">
                                <MuiMenuComponent options={activityOptions} />
                              </a> */}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                              <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(data.createdAt)}</p>
                              <p className="font-size-12 mb-0">Portfolio</p>
                            </div>
                          </div> : <></>
                      )}
                      {recentBundleService.map((data, sIndex) => {
                        // return (data.itemHeaderModel.bundleFlag == "PORTFOLIO") ? <></> :

                        <div className="col-md-4">
                          <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                              <p className="mb-0 overflow-hidden white-space">
                                <FontAwesomeIcon
                                  className=" font-size-14"
                                  icon={faFileAlt}
                                />
                                <span className="font-weight-500 ml-2">
                                  {/* Portfolio{" "} {data.name} */} {data.itemName}
                                </span>
                              </p>
                              <div className="d-flex align-items-center">
                                {/* <div className="white-space custom-checkbox">
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label=""
                                />
                              </FormGroup>
                            </div> */}
                                <a
                                  href={undefined}
                                  className="btn-sm"
                                  style={{ cursor: "pointer" }}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    onClick={() =>
                                      makeBundleServiceEditable(data)
                                    }
                                  ></i>
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faShareAlt} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faFolderPlus} />
                                </a>
                                <a className="ml-3 font-size-14 cursor">
                                  <FontAwesomeIcon icon={faUpload} />
                                </a>
                                {/* <a className="ml-2 cursor">
                              <MuiMenuComponent options={activityOptions} />
                            </a> */}
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                            <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(data.createdAt)}</p>
                            <p className="font-size-12 mb-0">
                              EMPTY
                              {/* {data.itemHeaderModel.bundleFlag == "SERVICE" ? "Service" : data.itemHeaderModel.bundleFlag == "BUNDLE_ITEM" ? "Bundle" : "Portfolio"} */}
                            </p>
                          </div>
                        </div>

                      }
                      )}

                      {/* <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Portfolio{" "}
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Portfolio</p>
                    </div>
                  </div> */}
                      {/* <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Service</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Service</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Bundles</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Bundles</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Portfolio
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Portfolio</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Service</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Service</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Bundles</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Bundles</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Portfolio
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Portfolio</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Service</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Service</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 ">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">Bundles</span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Bundles</p>
                    </div>
                  </div> */}
                    </>
                    :
                    <>
                    </>
                  }
                </div>
              </div>
              <div className="recent-div p-3 d-none">
                <h6 className="font-weight-600 text-grey mb-0">
                  SERVICE BUNDLES
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Service Bundles
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Service Bundles</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Service Bundles
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Service Bundles</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            Strategy Task
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label=""
                              />
                            </FormGroup>
                          </div>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a className="ml-2 cursor">
                            <MuiMenuComponent options={activityOptions} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Strategy Task</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-10 ">
            <div className="d-block height-66 d-md-flex justify-content-between align-items-center">
              <div className="mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-2" style={{ whiteSpace: "pre" }}>
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                    <p className="ml-4 mb-0">
                      <a href={undefined} className="ml-3 cursor text-white">
                        <EditOutlinedIcon />
                      </a>
                      <a href={undefined} className="ml-3 cursor text-white">
                        <ShareOutlinedIcon />
                      </a>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                    <div className="row align-items-center m-0">
                      {querySearchSelector.map((obj, i) => {
                        return (
                          <>
                            <div className={`customselect ${i < ((querySearchSelector.length - 1)) ? "p-2" : ""} border-white d-flex align-items-center mr-3 my-2 border-radius-10`}>
                              {i === 0 ?
                                <>
                                  <Select
                                    placeholder="Select Type."
                                    options={([
                                      { label: "Portfolio", value: "PORTFOLIO" },
                                      { label: "Bundle", value: "BUNDLE_ITEM" },
                                      { label: "Service", value: "SERVICE" },

                                    ])}
                                    value={querySearchSelector.itemType}
                                    onChange={(e) => handleItemType(e, i)}
                                  // autoSelect={props.compoFlag === "portfolioTempItemSearch"}
                                  />
                                </>
                                : <></>}
                              {i > 0 ? (
                                <Select
                                  isClearable={true}
                                  defaultValue={{ label: "AND", value: "AND" }}
                                  options={[
                                    { label: "AND", value: "AND", id: i },
                                    { label: "OR", value: "OR", id: i },
                                  ]}
                                  // placeholder="&amp;"
                                  placeholder="AND/OR"
                                  onChange={(e) => handleOperator(e, i)}
                                  // value={querySearchOperator[i]}
                                  value={obj.selectOperator}
                                />
                              ) : (
                                <></>
                              )}

                              <div>
                                <Select
                                  // isClearable={true}
                                  options={familySelectOption}
                                  onChange={(e) => handleFamily(e, i)}
                                  value={obj.selectFamily}
                                  isOptionDisabled={(option) => checkForDisabled(option)}
                                />
                              </div>
                              <div className="customselectsearch">
                                <input
                                  className="custom-input-sleact pr-1"
                                  type="text"
                                  placeholder="Search string"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />

                                {
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                    id="style"
                                  >
                                    {obj.selectOptions.map((currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={(e) =>
                                          handleSearchListClick(
                                            e,
                                            currentItem,
                                            obj,
                                            i
                                          )
                                        }
                                      >
                                        {(selectedItemType === "PORTFOLIO") ? ((obj.selectFamily.value === "name") ||
                                          (obj.selectFamily.value === "description")) ? currentItem.split("#")[1] :
                                          currentItem : currentItem.split("#")[1]
                                        }
                                        {/* {(obj.selectFamily.value === "name") ||
                                          (obj.selectFamily.value === "description") ?
                                          currentItem.split("#")[1] : currentItem
                                        } */}
                                      </li>
                                    ))}
                                  </ul>
                                }

                              </div>
                              {(querySearchSelector.length - 1) === i ? <>
                                <Link to="#" className="btn bg-primary text-white border-radius-10" onClick={handleLandingPageQuerySearchClick}>
                                  <SearchIcon />
                                  <span className="ml-1">Search</span>
                                </Link>
                              </> : <></>}

                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
                        <Link
                          to="#"
                          className="btn-sm text-white border mr-2"
                          style={{ border: "1px solid #872FF7" }}
                        >
                          +
                        </Link>
                      </div>
                      <div onClick={handleDeletQuerySearch}>
                        <Link to="#" className="btn-sm border">
                          <svg
                            data-name="Layer 41"
                            id="Layer_41"
                            fill="white"
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
                          {/* <DeleteIcon className="font-size-16" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className="pl-3 py-3">
                    <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
                      <SearchIcon /><span className="ml-1">Search</span>
                    </Link>
                  </div> */}
                </div>
              </div>
              <div className="">
                <div className="text-center pl-3 py-3">
                  {/* <Link
                    to="#"
                    className="p-1 text-white"
                    data-toggle="modal"
                    data-target="#Datatable"
                  >
                    <SearchIcon />
                    <span className="ml-1">Search</span>
                  </Link> */}

                  {/* <Link
                    to="#"
                    className="btn bg-primary text-white"
                    onClick={handleLandingPageQuerySearchClick}
                  >
                    <SearchIcon />
                    <span className="ml-1">Search</span>
                  </Link> */}
                </div>
              </div>
              {/* <div className="col-auto">
           <div className="d-flex align-items-center justify-content-center">
             <div className="text-center border-left pl-3 py-3">
             <Link to="/repairOptions" className="p-1 text-white">+ Add Part</Link>
             
             </div>
           </div>
         </div> */}
            </div>
          </div>
          <div className="card">
            <div
              className=""
              style={{ minHeight: 200, height: "auto", width: "100%", backgroundColor: "#fff" }}
            >
              {/* <DataGrid
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
                onCellClick={(e) => handleRowClick(e)}
              /> */}
              {selectedItemType === "PORTFOLIO" && portfolioItemData.length > 0 ?
                <>
                  <DataTable
                    className=""
                    title=""
                    // columns={PortfolioItemColumn}
                    columns={SearchedPortfolioColumn}
                    data={portfolioItemData}
                    customStyles={customTableStyles}
                    // selectableRows
                    // onSelectedRowsChange={(state) => setPortfolioTempFilterMasterData(state.selectedRows)}
                    pagination
                  />
                </> : <></>}
              {(selectedItemType == "BUNDLE_ITEM" || selectedItemType == "SERVICE") && bundleServiceItemData.length > 0 ?
                <>
                  <DataTable
                    className=""
                    title=""
                    // columns={PortfolioItemColumn}
                    columns={bundleServiceSearchTableColumns}
                    data={bundleServiceItemData}
                    customStyles={customTableStyles}
                    // selectableRows
                    // onSelectedRowsChange={(state) => setPortfolioTempFilterMasterData(state.selectedRows)}
                    pagination
                  />
                </> : <></>}
              {/* <DataTable
                className=""
                title=""
                columns={columns2}
                data={rows}
                customStyles={customTableStyles}
                selectableRows
                // onSelectedRowsChange={(state) => setPortfolioTempFilterMasterData(state.selectedRows)}
                pagination
              /> */}
            </div>
          </div>

          <ToastContainer />
        </div>
        <div
          className="modal fade"
          id="Datatable"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header p-3">
                <div className="d-flex">
                  <h5>Search Result</h5>
                </div>
              </div>
              <div>
                <div className="card w-100 p-2">
                  <div
                    className=""
                    style={{
                      height: 400,
                      width: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* <DataGrid
                      sx={{
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: "#872ff7",
                          color: "#fff",
                        },
                      }}
                      rows={rows}
                      columns={columns2}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      onCellClick={(e) => handleRowClick(e)}
                    /> */}
                    <DataTable
                      className=""
                      title=""
                      columns={columns2}
                      data={rows}
                      customStyles={customTableStyles}
                      selectableRows
                      // onSelectedRowsChange={(state) => setPortfolioTempFilterMasterData(state.selectedRows)}
                      pagination
                    />
                  </div>
                </div>
                <div className="m-2 text-right">
                  <a className="btn text-white bg-primary cursor">
                    + Add Selected
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        show={bundleServiceShow}
        onHide={() => setBundleServiceShow(false)}
      >
        <Modal.Body>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={bundleTabs}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>

                {/* <TabList className="custom-tabs-div"
                  onChange={(e, newValue) => setBundleTabs(newValue)}
                  aria-label="lab API tabs example"
                >
                  <Tab label={`${serviceOrBundlePrefix} HEADER`} value="bundleServiceHeader" />
                  <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                  {serviceOrBundlePrefix === "BUNDLE" && (
                    <>
                      <Tab label={`${serviceOrBundlePrefix} ITEMS`} value="bundleServiceItems" />
                      <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                    </>
                  )}

                  {serviceOrBundlePrefix === "BUNDLE" && (
                    <Tab label={`${serviceOrBundlePrefix} ITEMS`} value="bundleServiceItems" />
                  )}
                  {serviceOrBundlePrefix === "BUNDLE" && (
                    <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                  )}

                  <Tab label="PRICE CALCULATOR" value="bundleServicePriceCalculator" />
                  <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>

                  <Tab label="ADMINISTRATIVE" value="bundleServiceAdministrative" />

                </TabList> */}

                <TabList className="custom-tabs-div"
                  onChange={(e, newValue) => setBundleTabs(newValue)}
                  // onChange={(e, newValue) => bundleAndServiceEditAble && setBundleTabs(newValue)}
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

                  <Tab label="PRICE CALCULATOR" value="bundleServicePriceCalculator" />
                  <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                  <Tab label="ADMINISTRATIVE" value="bundleServiceAdministrative" />
                </TabList>
              </Box>
              <TabPanel value="bundleServiceHeader">
                <div className="container-fluid ">
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    {/* <h5 className="font-weight-600 mb-0">
                      ADD {serviceOrBundlePrefix}
                    </h5> */}
                    {/* {serviceOrBundlePrefix === "SERVICE" && ( */}
                    {/* <div className="ml-3 green-custom-btn "> */}
                    <div className="ml-3 green-custom-btn ">
                      {serviceOrBundlePrefix === "SERVICE" && (
                        <Select
                          className={`customselectbtn1 p-2 border-radius-10 ${value4.value == "chargeable" ? "bg-gray-light" : "bg-green-light"}`}
                          onChange={(e) => handleOption4(e)}
                          options={[
                            { value: "free", label: "Free" },
                            { value: "chargeable", label: "Chargeable" },
                          ]}
                          value={value4}
                        />
                      )}
                    </div>
                    {/* )} */}
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
                          isOptionDisabled={(option) => makeStatusValueDisabled(option)}
                        />
                      </div>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={shareIcon}></img>
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={folderaddIcon}></img>
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={uploadIcon}></img>
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={cpqIcon}></img>
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={deleteIcon}></img>
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={copyIcon}></img>
                      </a>
                      <a className="ml-2 cursor">
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
                        <a
                          href={undefined}
                          className="btn-sm"
                          style={{ cursor: "pointer" }}
                          // onClick={() => setBundleAndServiceEditAble(false)}
                          onClick={makeBundleServiceHeaderEditable}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                        <a className="btn-sm cursor">
                          <i
                            className="fa fa-bookmark-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a className="btn-sm cursor">
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
                          <div className="col-md-4 col-sm-3">
                            <div className="form-group">
                              <p className="text-light-dark font-size-12 font-weight-500 mb-2">ESTIMATED HOURS</p>
                              <h6 className="font-weight-500 text-uppercase text-primary font-size-17">

                                {(createServiceOrBundle.estimatedTime == "" ||
                                  createServiceOrBundle.estimatedTime == null ||
                                  createServiceOrBundle.estimatedTime == undefined ||
                                  createServiceOrBundle.estimatedTime == "string") ?
                                  "NA" : createServiceOrBundle.estimatedTime}

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
                                disabled={editBundleService}
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
                                // isClearable={true}
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
                                onChange={(e) => handleModelInputSearch(e)}
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
                              {
                                <ul
                                  className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                  id="style"
                                >
                                  {querySearchModelResult.map((currentItem, j) => (
                                    <li
                                      className="list-group-item text-primary"
                                      key={j}
                                      onClick={(e) => handleSearchModelListClick(
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
                                onChange={(e) => selectPrefixOption(e)}
                                className="text-primary"
                                value={selectedPrefixOption}
                                options={querySearchModelPrefixOption}
                                placeholder="select....."
                              />
                              {/* <input
                            type="text"
                            className="form-control border-radius-10"
                            name="prefix"
                            placeholder="Prefix(S)"
                            value={createServiceOrBundle.prefix}
                            onChange={handleAddServiceBundleChange}
                          /> */}
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label
                                className="text-light-dark font-size-14 font-weight-500"
                                for="exampleInputEmail1"
                              >
                                ESTIMATED HOURS
                              </label>
                              <div
                                className=" d-flex form-control-date"
                                style={{ overflow: "hidden" }}
                              >
                                <input
                                  type="number"
                                  // type="text"
                                  className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                  // placeholder="10,000 hours"
                                  onChange={(e) =>
                                    setCreateServiceOrBundle({
                                      ...createServiceOrBundle,
                                      estimatedTime: e.target.value,
                                    })}
                                  value={createServiceOrBundle.estimatedTime}
                                  name="estimatedTime"
                                />
                                <span className="hours-div text-primary">hours/day</span>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-4 col-sm-3">
                        <div className="form-group">
                          <label
                            className="text-light-dark font-size-12 font-weight-500"
                            htmlFor="exampleInputEmail1"
                          >
                            ADDITIONALS
                          </label>
                          <Select
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
                      </div> */}
                        </div>
                      </>}

                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        onClick={handleAddNewServiceOrBundle}
                        // className="btn btn-light"
                        className="btn text-white bg-primary"
                      >
                        {bundleAndServiceEditAble ? "Next" : "Save & Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="bundleServiceItems">
                {
                  editBundleService ? <>
                    <AddPortfolioItem
                      passItemEditRowData={passItemEditRowData}
                      handleItemEditSave={handleItemEditSave}
                      compoFlag="itemEdit"
                      compoFlagTest="itemEditBundle"
                      bundleOrServiceEditOrNot={true}
                      setBundleTabs={setBundleTabs}
                      priceMethodDropdownKeyValue={priceMethodKeyValue}
                      priceTypeDropdownKeyValue={priceTypeKeyValue}
                      unitDropdownKeyValue={unitOptionKeyValue}
                      frequencyDropdownKeyValue={frequencyOptionKeyValue}
                      discountTypeDropdownKeyValue={discountTypeOptions}
                    />
                  </> : <>
                    <AddPortfolioItem
                      setBundleTabs={setBundleTabs}
                      compoFlag="BUNDLE"
                      getAddPortfolioItemData={getAddPortfolioItemData}
                      editBundleService={editBundleService}
                      createdBundleItems={createdBundleItems}
                    /></>
                }
              </TabPanel>
              <TabPanel value="bundleServicePriceCalculator">
                {
                  editBundleService ? <>
                    <PriceCalculator
                      serviceOrBundlePrefix={serviceOrBundlePrefix}
                      setBundleTabs={setBundleTabs}
                      setBundleServiceShow={setBundleServiceShow}
                      getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                      priceCalculator={itemPriceData}
                      createdBundleItems={editableServiceOrBundleData}
                      priceCompFlagIs="editAble"
                      bundleOrServiceEditOrNot={true}
                      priceMethodDropdownKeyValue={priceMethodKeyValue}
                      priceTypeDropdownKeyValue={priceTypeKeyValue}
                      unitDropdownKeyValue={unitOptionKeyValue}
                      frequencyDropdownKeyValue={frequencyOptionKeyValue}
                      discountTypeDropdownKeyValue={discountTypeOptions}
                    />
                  </> :
                    <>
                      <PriceCalculator
                        serviceOrBundlePrefix={serviceOrBundlePrefix}
                        setBundleTabs={setBundleTabs}
                        setBundleServiceShow={setBundleServiceShow}
                        getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                        priceCalculator={itemPriceData}
                        createdBundleItems={createdBundleItems}
                        priceCompFlagIs="noEditAble"
                        priceMethodDropdownKeyValue={priceMethodKeyValue}
                        priceTypeDropdownKeyValue={priceTypeKeyValue}
                        unitDropdownKeyValue={unitOptionKeyValue}
                        frequencyDropdownKeyValue={frequencyOptionKeyValue}
                        discountTypeDropdownKeyValue={discountTypeOptions}
                      />
                    </>
                }
              </TabPanel>

              <TabPanel value="bundleServiceAdministrative">
                <div className="">
                  <div className="ligt-greey-bg p-3">
                    <div>
                      <span className="mr-3 cursor"
                        onClick={() => setBundleServiceAdministrativeEditable(false)}
                      >
                        <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                        <span className="ml-2">Edit</span>
                      </span>
                    </div>
                  </div>
                  {bundleServiceAdministrativeEditable ?
                    <>
                      <div className="row mt-4">
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED BY</p>
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
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">APPROVED BY</p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {(
                                administrative.approvedBy == "" ||
                                  administrative.approvedBy == "string" ||
                                  administrative.approvedBy == undefined ||
                                  administrative.approvedBy == null
                                  ? "NA" : administrative.approvedBy
                              )}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREPARED ON</p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {(
                                administrative.preparedOn == "" ||
                                  administrative.preparedOn == "string" ||
                                  administrative.preparedOn == undefined ||
                                  administrative.preparedOn == null
                                  ? "NA" :
                                  getFormattedDateTimeByTimeStampForAdministrative(administrative.preparedOn)
                              )}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED BY</p>
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
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">REVISED ON</p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {(
                                administrative.revisedOn == "" ||
                                  administrative.revisedOn == "string" ||
                                  administrative.revisedOn == undefined ||
                                  administrative.revisedOn == null
                                  ? "NA" :
                                  getFormattedDateTimeByTimeStampForAdministrative(administrative.revisedOn)
                              )}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {(
                                administrative.salesOffice == "" ||
                                  administrative.salesOffice == "string" ||
                                  administrative.salesOffice == undefined ||
                                  administrative.salesOffice == null ||
                                  administrative.salesOffice?.value == ""
                                  ? "NA" : administrative.salesOffice?.value)}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">OFFER VALIDITY</p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {(
                                administrative.offerValidity == "" ||
                                  administrative.offerValidity == "string" ||
                                  administrative.offerValidity == undefined ||
                                  administrative.offerValidity == null ||
                                  administrative.offerValidity?.value == ""
                                  ? "NA" : administrative.offerValidity?.label)}
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
                    </>}

                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      onClick={editBundleService ? saveAddNewServiceOrBundle : handleUpdateNewServiceOrBundle}
                      // className="btn btn-light"
                      className="btn text-white bg-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};
