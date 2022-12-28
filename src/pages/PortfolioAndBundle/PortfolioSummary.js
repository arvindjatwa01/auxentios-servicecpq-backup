import React, { useEffect, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "@mui/material/Select";

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
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  getSearchForPortfolio,
  getSearchForRecentPortfolio,
  getSearchForRecentBundleService,
  itemCreation,
  updateItemData,
  portfolioSearch,
  itemSearch,
  portfolioItemPriceSjid,
  getSolutionPriceCommonConfig,
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

  const [portfolioItemData, setPortfolioItemData] = useState([]);
  const [bundleServiceItemData, setBundleServiceItemData] = useState([]);
  const [recentPortfolio, setRecentPortfolio] = useState([])
  const [recentBundleService, setRecentBundleService] = useState([]);

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
  const [value4, setValue4] = useState({ value: "FREE", label: "Free" });
  const handleOption2 = (e) => {
    setValue2(e);
  };
  const handleOption3 = (e) => {
    setValue3(e);
  };
  const handleOption4 = (e) => {
    setValue4(e);
  };
  const [value2, setValue2] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [versionOption, setVersionOption] = useState([]);
  const [statusOption, setStatusOption] = useState([]);
  const [columnSearchText, setColumnSearchText] = useState("");
  const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1);
  const [buildSolutionValue, setBuildSolutionValue] = useState(-1);
  const [portfolioResponse, setPortfolioResponse] = useState({});

  const [customerSegmentKeyValue, setCustomerSegmentKeyValue] = useState([]);

  const [age, setAge] = React.useState("5");
  const [age1, setAge1] = React.useState("5");
  const [age2, setAge2] = React.useState("5");
  const [show, setShow] = React.useState(false);

  const [querySearchModelResult, setQuerySearchModelResult] = useState([])
  const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] = useState([])

  const [editBundleService, setEditBundleService] = useState(false);
  const [bundleAndServiceEditAble, setBundleAndServiceEditAble] = useState(false)

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
  });

  const [createdBundleItems, setCreatedBundleItems] = useState("");

  const [createdServiceData, setCreatedServiceData] = useState({});

  const [addPortFolioItem, setAddportFolioItem] = useState({})
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
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
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
    getSearchForRecentPortfolio()
      .then((res) => {
        setRecentPortfolio(res);
      })

    getSearchForRecentBundleService()
      .then((res) => {
        setRecentBundleService(res);
      })

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
        console.log("status option is 12345566", res)
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
      portfolioSearch(`${tempArray[id].selectFamily.value}~${e.target.value}`)
        .then((res) => {
          if (tempArray[id].selectFamily.value === "make") {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].coverages.length; j++) {
                SearchResArr.push(res.data[i].coverages[j].make)
              }
            }

          } else if (tempArray[id].selectFamily.value == "family") {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].coverages.length; j++) {
                SearchResArr.push(res.data[i].coverages[j].family)
              }
            }
          } else if (tempArray[id].selectFamily.value == "modelNo") {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].coverages.length; j++) {
                SearchResArr.push(res.data[i].coverages[j].modelNo)
              }
            }
          } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < res.data[i].coverages.length; j++) {
                SearchResArr.push(res.data[i].coverages[j].serialNumberPrefix)
              }
            }
          } else if (tempArray[id].selectFamily.value == "name") {
            for (let i = 0; i < res.data.length; i++) {
              SearchResArr.push(res.data[i].name)
            }
          } else if (tempArray[id].selectFamily.value == "description") {
            for (let i = 0; i < res.data.length; i++) {
              SearchResArr.push(res.data[i].description)
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
      var bundleServiceSearch;
      var SearchResArr = [];
      if (selectedItemType === "BUNDLE_ITEM") {
        bundleServiceSearch = "bundleFlag:BUNDLE_ITEM AND " + `${tempArray[id].selectFamily.value}~${e.target.value}`;
      } else if (selectedItemType === "SERVICE") {
        bundleServiceSearch = "bundleFlag:SERVICE AND " + `${tempArray[id].selectFamily.value}~${e.target.value}`;
      }
      itemSearch(bundleServiceSearch)
        .then((res) => {
          if (res.data.length > 0) {
            if (tempArray[id].selectFamily.value == "itemName") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemName)
              }
            } else if (tempArray[id].selectFamily.value == "itemHeaderDescription") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderDescription)
              }
            } else if (tempArray[id].selectFamily.value == "make") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderMake)
              }
            } else if (tempArray[id].selectFamily.value == "model") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemHeaderModel.model)
              }
            } else if (tempArray[id].selectFamily.value == "family") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemHeaderModel.itemHeaderFamily)
              }
            } else if (tempArray[id].selectFamily.value == "prefix") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].itemHeaderModel.prefix)
              }
            }
          }
          obj.selectOptions = SearchResArr;
          tempArray[id] = obj;
          setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          alert(err)
          console.log("err in api call", err);
          return
        });
    }
    obj.inputSearch = e.target.value;
    setQuerySearchSelector([...tempArray]);
  };

  const handleModelInputSearch = (e) => {

    setCreateServiceOrBundle({ ...createServiceOrBundle, [e.target.name]: e.target.value, });
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

  const handleLandingPageQuerySearchClick = async () => {
    try {
      if (selectedItemType == "" ||
        querySearchSelector[0]?.selectFamily?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined) {
        throw "Please fill data properly"
      }
      var searchStr = `${querySearchSelector[0]?.selectFamily?.value}~${querySearchSelector[0]?.inputSearch}`;

      for (let i = 1; i < querySearchSelector.length; i++) {
        if (
          querySearchSelector[i]?.selectFamily?.value == "" ||
          querySearchSelector[i]?.inputSearch == "" ||
          querySearchSelector[i]?.selectOperator?.value == ""

        ) {
          throw "Please fill data properly"
        }
        searchStr =
          searchStr +
          " " +
          querySearchSelector[i].selectOperator.value + " " +
          querySearchSelector[i].selectFamily.value +
          "~" +
          querySearchSelector[i].inputSearch;
      }

      console.log("portfolio search searchStr : ", searchStr);

      if (selectedItemType === "PORTFOLIO") {
        var newArr = [];
        const res2 = await portfolioSearch(searchStr)
        if (res2.status === 200) {
          for (var j = 0; j < res2.data.length; j++) {
            for (var k = 0; k < res2.data[j].items.length; k++) {
              newArr.push(res2.data[j].items[k]);
            }
          }
          var result = newArr.reduce((unique, o) => {
            if (!unique.some(obj => obj.itemId === o.itemId)) {
              unique.push(o);
            }
            return unique;
          }, []);
          // setPortfolioItemData(result);
          setPortfolioItemData(res2.data);

        } else {
          throw "No information is found for your search, change the search criteria";
        }




        console.log("set PortfolioItemData : ", res2)
      } else if (selectedItemType === "BUNDLE_ITEM") {
        searchStr = "bundleFlag:BUNDLE_ITEM AND " + searchStr;
        const res1 = await itemSearch(searchStr);

        if (res1.status === 200) {
          setBundleServiceItemData(res1.data)
        } else {
          throw "No information is found for your search, change the search criteria";
        }

        console.log("res1 is fsfnasjkvna", res1.data);
        // console.log(res1)

      }
      else if (selectedItemType === "SERVICE") {
        searchStr = "bundleFlag:SERVICE AND " + searchStr;
        const res1 = await itemSearch(searchStr);


        if (res1.status === 200) {
          setBundleServiceItemData(res1.data);
        } else {
          throw "No information is found for your search, change the search criteria";
        }
        // console.log(res1)

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
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };

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
          { label: "Make", value: "make", id: i },
          { label: "Family", value: "family", id: i },
          { label: "Model", value: "modelNo", id: i },
          { label: "Prefix", value: "serialNumberPrefix", id: i },
          { label: "Name", value: "name", id: i },
          { label: "Description", value: "description", id: i },
        ])
      } else if (e.value === "BUNDLE_ITEM") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
      } else if (e.value === "SERVICE") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
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
    console.log(currentItem)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      model: currentItem.model,
      make: currentItem.make,
      family: currentItem.family
    })
    $(`.scrollbar-model`).css("display", "none");
  }

  const selectPrefixOption = (e) => {
    // console.log(e);
    setSelectedPrefixOption(e)
    setCreateServiceOrBundle({
      ...createServiceOrBundle,
      prefix: e.value,
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


  // Portfolio EditAble
  const makePortfolioEditableEditable = (portfolioData) => {
    // console.log("----------", PortfolioData);
    let portfolioDetails = {
      portfolioId: portfolioData.portfolioId,
      type: "fetch",
    };
    history.push({
      pathname: "/portfolioBuilder/new",
      state: portfolioDetails,
    });
  }

  const makeBundleServiceEditable = (data) => {
    console.log("data is ------ ", data);
    setEditBundleService(true);
    setBundleAndServiceEditAble(true)
    if (data.itemHeaderModel.bundleFlag === "SERVICE") {
      setServiceOrBundlePrefix("SERVICE");
      setBundleTabs("bundleServiceHeader")
      setBundleServiceShow(true);
      setCreateServiceOrBundle({
        id: data.itemId,
        name: data.itemName,
        description: data.itemHeaderModel.itemHeaderDescription,
        bundleFlag: data.itemHeaderModel.bundleFlag,
        reference: data.itemHeaderModel.reference,
        customerSegment: { label: data.itemHeaderModel.itemHeaderCustomerSegment, value: data.itemHeaderModel.itemHeaderCustomerSegment },
        make: data.itemHeaderModel.itemHeaderMake,
        model: data.itemHeaderModel.model,
        family: data.itemHeaderModel.itemHeaderFamily,
        prefix: { label: data.itemHeaderModel.prefix, value: data.itemHeaderModel.prefix },
        machine: { label: data.itemHeaderModel.type, value: data.itemHeaderModel.type },
        additional: "",
        machineComponent: { label: data.itemHeaderModel.type, value: data.itemHeaderModel.type },
      });

      setSelectedCustomerSegmentOption({ label: data.itemHeaderModel.itemHeaderCustomerSegment, value: data.itemHeaderModel.itemHeaderCustomerSegment })

      setSelectedPrefixOption({ label: data.itemHeaderModel.prefix, value: data.itemHeaderModel.prefix });

      var offerValidityLabel;
      if (data.itemHeaderModel.offerValidity == "15") {
        offerValidityLabel = "15 days";
      } else if (data.itemHeaderModel.offerValidity == "30") {
        offerValidityLabel = "1 month";
      } else if (data.itemHeaderModel.offerValidity == "45") {
        offerValidityLabel = "45 days";
      } else if (data.itemHeaderModel.offerValidity == "60") {
        offerValidityLabel = "2 month";
      } else {
        offerValidityLabel = data.itemHeaderModel.offerValidity;
      }

      var offerValidityLabel;
      if (data.itemHeaderModel.offerValidity == "15") {
        offerValidityLabel = "15 days";
      } else if (data.itemHeaderModel.offerValidity == "30") {
        offerValidityLabel = "1 month";
      } else if (data.itemHeaderModel.offerValidity == "45") {
        offerValidityLabel = "45 days";
      } else if (data.itemHeaderModel.offerValidity == "60") {
        offerValidityLabel = "2 month";
      } else {
        offerValidityLabel = data.itemHeaderModel.offerValidity;
      }

      setAdministrative({
        preparedBy: data.itemHeaderModel.preparedBy,
        approvedBy: data.itemHeaderModel.approvedBy,
        preparedOn: data.itemHeaderModel.preparedOn,
        revisedBy: data.itemHeaderModel.revisedBy,
        revisedOn: data.itemHeaderModel.revisedOn,
        salesOffice: { label: data.itemHeaderModel.salesOffice, value: data.itemHeaderModel.salesOffice },
        offerValidity: { label: offerValidityLabel, value: data.itemHeaderModel.offerValidity },
      });
    } else if (data.itemHeaderModel.bundleFlag === "BUNDLE_ITEM") {
      setServiceOrBundlePrefix("BUNDLE");
      setBundleTabs("bundleServiceHeader")
      setBundleServiceShow(true);
      setCreateServiceOrBundle({
        id: data.itemId,
        name: data.itemName,
        description: data.itemHeaderModel.itemHeaderDescription,
        bundleFlag: data.itemHeaderModel.bundleFlag,
        reference: data.itemHeaderModel.itemHeaderDescription,
        customerSegment: "",
        make: data.itemHeaderModel.itemHeaderMake,
        model: data.itemHeaderModel.model,
        family: data.itemHeaderModel.itemHeaderFamily,
        prefix: { label: data.itemHeaderModel.prefix, value: data.itemHeaderModel.prefix },
        machine: { label: data.itemHeaderModel.type, value: data.itemHeaderModel.type },
        additional: "",
        machineComponent: { label: data.itemHeaderModel.type, value: data.itemHeaderModel.type },
      });

      setSelectedPrefixOption({ label: data.itemHeaderModel.prefix, value: data.itemHeaderModel.prefix });
      setAdministrative({
        preparedBy: data.itemHeaderModel.preparedBy,
        approvedBy: data.itemHeaderModel.approvedBy,
        preparedOn: data.itemHeaderModel.preparedOn,
        revisedBy: data.itemHeaderModel.revisedBy,
        revisedOn: data.itemHeaderModel.revisedOn,
        salesOffice: { label: data.itemHeaderModel.salesOffice, value: data.itemHeaderModel.salesOffice },
        offerValidity: { label: data.itemHeaderModel.offerValidity, value: data.itemHeaderModel.offerValidity },
      });

      setPassItemEditRowData(data)
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
        // let reqObj = {
        //   itemId: createServiceOrBundle.id,
        //   // itemName: "",
        //   itemName: createServiceOrBundle.name,
        //   itemHeaderModel: {
        //     itemHeaderId: createServiceOrBundle.id,
        //     itemHeaderDescription: createServiceOrBundle.description,
        //     bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
        //     portfolioItemId: 0,
        //     reference: createServiceOrBundle.reference,
        //     itemHeaderMake: createServiceOrBundle.make,
        //     itemHeaderFamily: createServiceOrBundle.family,
        //     model: createServiceOrBundle.model,
        //     prefix: createServiceOrBundle.prefix,
        //     // type: "MACHINE",
        //     type: createServiceOrBundle.machineComponent?.value,
        //     additional: createServiceOrBundle.additional != "" ? createServiceOrBundle.additional?.value : "",
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
        //     status: "NEW",
        //     itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.strategyTask.value : "PREVENTIVE_MAINTENANCE",
        //     preparedBy: administrative.preparedBy,
        //     approvedBy: administrative.approvedBy,
        //     preparedOn: administrative.preparedOn,
        //     revisedBy: administrative.revisedBy,
        //     revisedOn: administrative.revisedOn,
        //     salesOffice: administrative.salesOffice,
        //     offerValidity: administrative.offerValidity?.value
        //   },
        //   itemBodyModel: {
        //     itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.id) : 0,
        //     itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.description : "",
        //     quantity: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.quantity) : 0,
        //     startUsage: "",
        //     endUsage: priceCalculator.startUsage ? priceCalculator.startUsage : "",
        //     standardJobId: priceCalculator.endUsage ? priceCalculator.endUsage : "",
        //     frequency: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.frequency?.value : "",
        //     additional: "",
        //     spareParts: ["WITH_SPARE_PARTS"],
        //     labours: ["WITH_LABOUR"],
        //     miscellaneous: ["LUBRICANTS"],
        //     taskType: serviceOrBundlePrefix === "BUNDLE" ? [addPortFolioItem.taskType?.value] : ["PM1"],
        //     solutionCode: "",
        //     usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
        //     recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
        //     usage: "",
        //     repairKitId: "",
        //     templateDescription: "",
        //     partListId: "",
        //     serviceEstimateId: "",
        //     numberOfEvents: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.numberOfEvents) : 0,
        //     repairOption: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.repairOption.value : "",
        //     priceMethod: "LIST_PRICE",
        //     listPrice: priceCalculator.listPrice ? parseInt(priceCalculator.listPrice) : 0,
        //     priceEscalation: "",
        //     calculatedPrice: priceCalculator.calculatedPrice ? parseInt(priceCalculator.calculatedPrice) : 0,
        //     flatPrice: priceCalculator.flatPrice ? parseInt(priceCalculator.flatPrice) : 0,
        //     discountType: "",
        //     year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
        //     avgUsage: 0,
        //     unit: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.unit?.value : "",
        //     sparePartsPrice: 0,
        //     sparePartsPriceBreakDownPercentage: 0,
        //     servicePrice: 0,
        //     servicePriceBreakDownPercentage: 0,
        //     miscPrice: 0,
        //     miscPriceBreakDownPercentage: 0,
        //     totalPrice: 0
        //   }
        // }
        let reqObj = {
          itemId: createServiceOrBundle.id,
          itemName: createServiceOrBundle.name,
          itemHeaderModel: {
            itemHeaderId: createServiceOrBundle.id,
            itemHeaderDescription: createServiceOrBundle.description,
            bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
            portfolioItemId: 0,
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
            itemPrices: serviceOrBundlePrefix === "BUNDLE" && itemPriceData?.itemPriceDataId ? [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : [],
          }
        }

        console.log("reqObj 1234567888 : ", reqObj)

        // const res = await updateItemData(createServiceOrBundle.id, reqObj);
        const res = await updateItemData(createServiceOrBundle.id, reqObj);
        if (res.status === 200) {
          toast("😎" + `${serviceOrBundlePrefix} updated`, {
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
          setAddportFolioItem({})
          // setBundleTabs("bundleServiceCalculator");
          // setAddportFolioItem({});

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
            type: "MACHINE",
            additional: createServiceOrBundle.additional.value,
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
            usage: "",
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
            year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
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
        //   setAddportFolioItem({});

        // }
        // setAddportFolioItem({});
      }
      console.log("editBundleService : ", editBundleService)
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

        if (editBundleService) {
          let reqObj = {
            itemId: createServiceOrBundle.id,
            itemName: createServiceOrBundle.name,
            itemHeaderModel: {
              itemHeaderId: createServiceOrBundle.id,
              itemHeaderDescription: createServiceOrBundle.description,
              bundleFlag: serviceOrBundlePrefix === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM",
              portfolioItemId: 0,
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
              itemPrices: serviceOrBundlePrefix === "BUNDLE" && itemPriceData?.itemPriceDataId ? [
                {
                  itemPriceDataId: itemPriceData.itemPriceDataId
                }
              ] : [],
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
            setBundleTabs("bundleServicePriceCalculator")
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
              itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value ? createServiceOrBundle.customerSegment?.value : "",
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
              itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
                {
                  itemPriceDataId: itemPriceData.itemPriceDataId
                }
              ] : [],
            }
          }
          console.log("itemCreation reqObj is : ", reqObj)

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
          console.log("itemCreation response : ", res)
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
    //   if ((createServiceOrBundle.name == "") ||
    //     (createServiceOrBundle.name == undefined)) {

    //   }
    //   if (createServiceOrBundle.name == "" ||
    //     createServiceOrBundle.description == "" ||
    //     createServiceOrBundle.model == "") {
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
    //     setBundleTabs("bundleServiceItems");
    //     // console.log("createServiceOrBundle : ", createServiceOrBundle);
    //   }
    // }
    // if (serviceOrBundlePrefix === "SERVICE") {
    //   if (createServiceOrBundle.name == "" ||
    //     createServiceOrBundle.description == "" ||
    //     createServiceOrBundle.model == "") {
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
    //     setBundleTabs("bundleServiceAdministrative");
    //     // saveAddNewServiceOrBundle();
    //   }
    // }
    // setTabs("4") //moving to component Data tab in create Item model
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
            itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : [],
          }
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
          setAddportFolioItem({})
          // setAddportFolioItem({});
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
            itemPrices: serviceOrBundlePrefix === "BUNDLE" ? [
              {
                itemPriceDataId: itemPriceData.itemPriceDataId
              }
            ] : [],
          }
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
          setAddportFolioItem({})
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
    //         usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
    //         recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
    //         usage: "",
    //         year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
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
    //       // setAddportFolioItem({});

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
    //         usageIn: serviceOrBundlePrefix === "BUNDLE" ? addPortFolioItem.usageIn?.value : "",
    //         recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(addPortFolioItem.recommendedValue) : 0,
    //         usage: "",
    //         year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
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
    //       // setAddportFolioItem({});

    //     }

    //     // console.log("createServiceOrBundle : ", createServiceOrBundle);
    //   }
    // }

    // ==================== Without Try/catch Method End ================ //
  };

  const getAddPortfolioItemData = async (data, itemPriceData) => {
    console.log("Bundle ItemsTabs : ", data)

    setCreatedBundleItems(data);

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
        itemHeaderStrategy: serviceOrBundlePrefix === "BUNDLE" ? data.strategyTask?.value : "PREVENTIVE_MAINTENANCE",
        componentCode: "",
        componentDescription: "",
        serialNumber: "",
        variant: "",
        itemHeaderCustomerSegment: createServiceOrBundle.customerSegment?.value,
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
        itemBodyId: serviceOrBundlePrefix === "BUNDLE" ? parseInt(data.id) : 0,
        itemBodyDescription: serviceOrBundlePrefix === "BUNDLE" ? data.description : "",
        frequency: serviceOrBundlePrefix === "BUNDLE" ? data.frequency?.value : "",
        spareParts: ["WITH_SPARE_PARTS"],
        labours: ["WITH_LABOUR"],
        miscellaneous: ["LUBRICANTS"],
        taskType: serviceOrBundlePrefix === "BUNDLE" ? [data.taskType?.value] : ["PM1"],
        solutionCode: "",
        usageIn: serviceOrBundlePrefix === "BUNDLE" ? data.usageIn?.value : "",
        recommendedValue: serviceOrBundlePrefix === "BUNDLE" ? parseInt(data.recommendedValue) : 0,
        usage: "",
        year: priceCalculator.priceYear ? priceCalculator.priceYear.value : "",
        avgUsage: 0,
        unit: serviceOrBundlePrefix === "BUNDLE" ? data.unit?.value : "",
        itemPrices: serviceOrBundlePrefix === "BUNDLE" &&
          (itemPriceData?.itemPriceDataId != null ||
            itemPriceData?.itemPriceDataId != undefined) ? [
          {
            itemPriceDataId: itemPriceData.itemPriceDataId
          }
        ] : [],
      }
    }

    const res = await itemCreation(reqObj);
    if (res.status === 200) {
      const rObj = {
        standardJobId: itemPriceData.standardJobId,
        repairKitId: itemPriceData.repairKitId,
        itemId: res.data.itemId,
        itemPriceDataId: itemPriceData.itemPriceDataId
      }
      const res2 = await portfolioItemPriceSjid(rObj)

      toast("😎" + `Bundle ${createServiceOrBundle.name} saved successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // setCreateServiceOrBundle({
      //   ...createServiceOrBundle,
      //   id: res.data.itemId,
      // });
      setCreatedServiceData(res.data);
      setAddportFolioItem(data)
      setItemPriceData(itemPriceData)
      setBundleTabs("bundleServicePriceCalculator")

    }




    // setBundleTabs("bundleServiceAdministrative")
    // console.log("itemPriceData11111111", itemPriceData)
    // setAddportFolioItem(data)
    // setItemPriceData(itemPriceData)
  }
  const handleItemEditSave = (data, itemPriceData) => {
    setAddportFolioItem(data)
    setItemPriceData(itemPriceData)
    // setBundleTabs("bundleServiceAdministrative")
    setBundleTabs("bundleServicePriceCalculator")
  }
  const getPriceCalculatorDataFun = (data) => {

    if (serviceOrBundlePrefix === "SERVICE") {
      setBundleTabs("bundleServiceAdministrative")
    } else if (serviceOrBundlePrefix === "BUNDLE") {
      setBundleTabs("bundleServiceAdministrative")
    } else {
      console.log("data 123456789 : ", data)
      setPriceCalculator(data);
      setBundleServiceShow(false);
      setBundleTabs("bundleServiceHeader")
      saveAddNewServiceOrBundle();//bundle/service creation API called
    }


  };

  const handleCreateChange = (e) => {
    setEditBundleService(false);
    setBundleAndServiceEditAble(false);
    if (e.value === "PORTFOLIO") {
      let portfolioDetails = {
        portfolioId: "",
        type: "new",
      };
      // history.push("/portfolioBuilder/new")
      history.push({
        pathname: "/portfolioBuilder/new",
        state: portfolioDetails,
      });
    } else if (e.value === "SERVICE") {
      setServiceOrBundlePrefix("SERVICE");
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

      setQuerySearchModelPrefixOption([]);
      setSelectedPrefixOption("");

    } else if (e.value === "BUNDLE") {
      setServiceOrBundlePrefix("BUNDLE");
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
          <div>Strategy</div>
        </>
      ),
      selector: (row) => row.strategyTask,
      wrap: true,
      sortable: true,
      format: (row) => row.strategyTask,
    }, {
      name: (
        <>
          <div>Task Type</div>
        </>
      ),
      selector: (row) => row.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row.taskType,
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
      selector: (row) => row?.portfolioPrice?.price,
      wrap: true,
      sortable: true,
      format: (row) => row?.portfolioPrice?.price,
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
      selector: (row) => row?.portfolioPrice?.sparePartsPrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.portfolioPrice?.sparePartsPrice,
    },
    {
      name: (
        <>
          <div>Net Service Price</div>
        </>
      ),
      selector: (row) => row?.portfolioPrice?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.portfolioPrice?.servicePrice,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.portfolioPrice?.totalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.portfolioPrice?.totalPrice,
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



  const PortfolioItemColumn = [
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
    },
  ]

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
    // console.log("handleAdministrativreChange", administrative);
    var value = e.target.value;
    var name = e.target.name;
    setAdministrative({ ...administrative, [name]: value });
  };
  // console.log("--------=-- ", recentBundleService);
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
            <Select className="customselect1"
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
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              {/* <a href="#" className="ml-2">
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
                    return (data.itemHeaderModel.bundleFlag == "PORTFOLIO") ? <></> :

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
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              {/* <a href="#" className="ml-2">
                              <MuiMenuComponent options={activityOptions} />
                            </a> */}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          {/* <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p> */}
                          <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(data.createdAt)}</p>
                          <p className="font-size-12 mb-0">{data.itemHeaderModel.bundleFlag == "SERVICE" ? "Service" : data.itemHeaderModel.bundleFlag == "BUNDLE_ITEM" ? "Bundle" : "Portfolio"}</p>
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
                  </div> */}
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
          <div className="bg-primary px-3 mb-3 border-radius-10 ">
            <div className="d-block height-66 d-md-flex justify-content-between align-items-center">
              <div className="mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-2" style={{ whiteSpace: "pre" }}>
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
                                        {currentItem}
                                      </li>
                                    ))}
                                  </ul>
                                }

                              </div>
                              {(querySearchSelector.length - 1) === i ? <>
                                <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
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
                    columns={PortfolioItemColumn}
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
                    <div className="ml-3 green-custom-btn ">
                      <Select
                        className="customselectbtn1 p-2 border-radius-10 bg-green-light "
                        onChange={(e) => handleOption4(e)}
                        options={[
                          { value: "free", label: "Free" },
                          { value: "costly", label: "Costly" },
                        ]}
                        value={value4}
                      />
                    </div>
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
                                    placeholder="10,000 hours"
                                    // defaultValue={props?.priceCalculator?.startUsage}
                                    // value={priceCalculator.startUsage}
                                    onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, startUsage: e.target.value, })}
                                    value={addPortFolioItem.startUsage}
                                    name="startUsage"
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
                        Save & Next
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
                      setBundleTabs={setBundleTabs}
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
                      priceCompFlag="editAble"
                    />
                  </> :
                    <>
                      <PriceCalculator
                        serviceOrBundlePrefix={serviceOrBundlePrefix}
                        setBundleTabs={setBundleTabs}
                        setBundleServiceShow={setBundleServiceShow}
                        getPriceCalculatorDataFun={getPriceCalculatorDataFun}
                        priceCalculator={itemPriceData}
                        priceCompFlagIs="noEditAble"
                      />
                    </>
                }
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
                                administrative.salesOffice == null
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
                                administrative.offerValidity == null
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
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};
