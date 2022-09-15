import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/material/Select";
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
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid } from "@mui/x-data-grid";

import { SolutionBuilderModal } from "../../pages/SolutionModules/index";

import SelectFilter from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import $ from "jquery";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddPortfolioItem from "./AddPortfolioItem";
import PriceCalculator from "./PriceCalculator";

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
} from "../../services/index";

export const PortfolioSummary = () => {
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
  const [columnSearchText, setColumnSearchText] = useState("");
  const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1);
  const [buildSolutionValue, setBuildSolutionValue] = useState(-1);
  const [portfolioResponse, setPortfolioResponse] = useState({});

  const [age, setAge] = React.useState("5");
  const [age1, setAge1] = React.useState("5");
  const [age2, setAge2] = React.useState("5");
  const [show, setShow] = React.useState(false);

  // New Addition for bundle/Service Creation
  const [bundleServiceShow, setBundleServiceShow] = useState(false);
  const [bundleTabs, setBundleTabs] = useState("1");
  const [serviceOrBundlePrefix, setServiceOrBundlePrefix] = useState("");
  const [typeKeyValue, setTypeKeyValue] = useState([]);
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

  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];

  useEffect(() => {
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
  }, []);

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
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
      .then((res) => {
        obj.selectOptions = res;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "block");
      })
      .catch((err) => {
        console.log("err in api call", err);
      });
    obj.inputSearch = e.target.value;
  };
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
    getSearchQueryCoverage(searchStr)
      .then((res) => {
        console.log("search Query Result :", res);
        setMasterData(res);
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };
  const addSearchQuerryHtml = () => {
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
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
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
    // { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
    // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
    // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
  ];

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

  // SERVICE/BUNDLE MODEL FUNCTIONS
  const saveAddNewServiceOrBundle = async () => {
    try {
      alert("saveAddNewServiceOrBundle");
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

  const handleSavePrices = async () => {
    try {
      alert("save");
      // let reqObj = {
      //   itemId: parseInt(addPortFolioItem.id),
      //   itemName: "",
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //     itemHeaderDescription: createServiceOrBundle.description,
      //     bundleFlag:
      //       serviceOrBundlePrefix === ""
      //         ? "PORTFOLIO"
      //         : serviceOrBundlePrefix === "SERVICE"
      //           ? "SERVICE"
      //           : "BUNDLE_ITEM",
      //     reference: createServiceOrBundle.reference,
      //     itemHeaderMake: createServiceOrBundle.make,
      //     itemHeaderFamily: "",
      //     model: createServiceOrBundle.models,
      //     prefix: createServiceOrBundle.prefix,
      //     type: "MACHINE",
      //     additional: createServiceOrBundle.additional.value,
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
      //     numberOfEvents: parseInt(addPortFolioItem.strategyEvents),
      //     repairOption: addPortFolioItem.repairOption.value,
      //     priceMethod: "LIST_PRICE",
      //     listPrice: parseInt(priceCalculator.listPrice),
      //     priceEscalation: "",
      //     calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //     flatPrice: parseInt(priceCalculator.flatPrice),
      //     discountType: "",
      //     year: priceCalculator.priceYear.value,
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
      // const { data, status } = await updateItemData(currentItemId, reqObj);
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

  const handleAddServiceBundleChange = (e) => {
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      [e.target.name]: e.target.value,
    });
  };

  const changeServiceOrBundlePrefix1 = (prefix) => {
    setServiceOrBundlePrefix(prefix);
    setBundleServiceShow(true)
  };

  const handleAddNewServiceOrBundle = () => {
    if (serviceOrBundlePrefix === "BUNDLE") {
      setBundleTabs("2");
    }
    if (serviceOrBundlePrefix === "SERVICE") {
      setBundleTabs("3");
      saveAddNewServiceOrBundle();
    }
    // setTabs("4") //moving to component Data tab in create Item model
  };
  const getPriceCalculatorDataFun = (data) => {
    // setPriceCalculator(data);
  };

  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
            <div>
              <Button
                id="basic-button"
                className="bg-primary text-white px-4 py-2"
                aria-controls={open1 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
                onClick={handleClick}
              >
                <span className="mr-2 font-size-12">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Create
                <span className="ml-2">
                  <KeyboardArrowDownIcon style={{ fontSize: "28px" }} />
                </span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={handleClose1}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose1}>
                  <Link
                    to={{
                      pathname: "/portfolioBuilder/new",
                      state: { portfolioResponse },
                    }}
                    onClick={handleCreatePortfolio}
                  >
                    Portfolio
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => changeServiceOrBundlePrefix1("SERVICE")}
                >
                  Service
                </MenuItem>
                <MenuItem
                  onClick={() => changeServiceOrBundlePrefix1("BUNDLE")}
                >
                  Bundles
                </MenuItem>
              </Menu>
            </div>
            {/* <div>
                        <Link to={{pathname: "/portfolioBuilder/new",state: { portfolioResponse}}}  onClick={handleCreatePortfolio} style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
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
            <div className="mt-1">
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="row">
                  <div className="col-md-4">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                        <p className="mb-0 ">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                        <p className="mb-0 ">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
                        <p className="mb-0 ">
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
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a href="#" className="ml-3 font-size-14">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                          <a href="#" className="ml-2">
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
          <div className="bg-primary px-3 mb-3">
            <div className="row align-items-center">
              <div className="col-11 mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                    <p className="ml-4 mb-0">
                      <a href="#" className="ml-3 text-white">
                        <EditOutlinedIcon />
                      </a>
                      <a href="#" className="ml-3 text-white">
                        <ShareOutlinedIcon />
                      </a>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100 ">
                    <div className="row align-items-center m-0">
                      {querySearchSelector.map((obj, i) => {
                        return (
                          <>
                            <div className="customselect d-flex align-items-center mr-3 my-2">
                              {i > 0 ? (
                                <SelectFilter
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
                                />
                              ) : (
                                <></>
                              )}

                              <div>
                                <SelectFilter
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
                                <input
                                  className="custom-input-sleact"
                                  type="text"
                                  placeholder="Search string"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />

                                {
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i}`}
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
                                        {currentItem}
                                      </li>
                                    ))}
                                  </ul>
                                }
                              </div>
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
                              class="cls-1"
                              d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                            />
                            <path
                              class="cls-1"
                              d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                            />
                          </svg>
                          {/* <DeleteIcon className="font-size-16" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className="px-3">
                           <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
                             <SearchIcon /><span className="ml-1">Search</span>
                           </Link>
                         </div> */}
                </div>
              </div>
              <div className="">
                <div className="text-center border-left pl-3 py-3">
                  <Link
                    to="#"
                    className="p-1 text-white"
                    data-toggle="modal"
                    data-target="#Datatable"
                  >
                    <SearchIcon />
                    <span className="ml-1">Search</span>
                  </Link>
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
                onCellClick={(e) => handleRowClick(e)}
              />
            </div>
          </div>

          <ToastContainer />
        </div>
        <div
          class="modal fade"
          id="Datatable"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div
            class="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header p-3">
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
                    <DataGrid
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
                    />
                  </div>
                </div>
                <div className="m-2 text-right">
                  <a href="#" className="btn text-white bg-primary">
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
                <TabList
                  onChange={(e, newValue) => setBundleTabs(newValue)}
                  aria-label="lab API tabs example"
                >
                  <Tab label={`${serviceOrBundlePrefix} HEADER`} value="1" />
                  {serviceOrBundlePrefix === "BUNDLE" && (
                    <Tab label={`${serviceOrBundlePrefix} BODY`} value="2" />
                  )}
                  <Tab label="PRICE CALCULATOR" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
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
                        <a href="#" className="btn-sm">
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
                    <div className="row mt-4">
                      <div className="col-md-4 col-sm-3">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            {serviceOrBundlePrefix}
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10"
                            disabled
                            name="id"
                            placeholder="ID(AUTO)"
                            value={
                              createServiceOrBundle.id
                                ? createServiceOrBundle.id
                                : ""
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
              </TabPanel>
              <TabPanel value="2">
                <AddPortfolioItem
                  setBundleTabs={setBundleTabs}
                  compoFlag="BUNDLE"
                  saveAddNewServiceOrBundle={saveAddNewServiceOrBundle}
                />
              </TabPanel>
              <TabPanel value="3">
                <PriceCalculator
                  serviceOrBundlePrefix={serviceOrBundlePrefix}
                  setBundleTabs={setBundleTabs}
                  setBundleServiceShow={setBundleServiceShow}
                  // priceCalculator={priceCalculator}
                  getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                  handleSavePrices={handleSavePrices}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};
