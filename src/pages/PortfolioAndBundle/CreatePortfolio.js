import React, { useEffect, useState } from "react";
import { Modal, SplitButton, Dropdown, ButtonGroup } from "react-bootstrap";
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
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

import { ReactTableNested } from "../Test/ReactTableNested";

import DataTable from "react-data-table-component";

import boxicon from "../../assets/icons/png/box.png";

import Portfoliosicon from "../../assets/icons/svg/Portfolios-icon.svg";
import Buttonarrow from "../../assets/icons/svg/Button-arrow.svg";
import contract from "../../assets/icons/svg/contract.svg";
import repairicon from "../../assets/icons/svg/repair-icon.svg";

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
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { portfolioItemActions } from "./createItem/portfolioSlice";
import { createItemPayload } from "./createItem/createItemPayload";

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
      // backgroundColor: "#000"
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const columns = [
  // {
  //   name: <><div>
  //     <div>
  //     <Checkbox {...label} />
  //   </div>
  //     </div></>,
  //   selector: row => row.title,
  //   sortable: true,
  //   maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
  //   cell: row => <CustomTitle row={row} />,
  // },
  {
    name: (
      <>
        <div>
          <img className="mr-2" src={boxicon}></img>S NO
        </div>
      </>
    ),
    selector: (row) => row.bundleId,
    sortable: true,
    maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    // cell: row => row.bundleId,
    cell: (row) => <button onClick={() => alert()}>Click</button>,
  },
  {
    name: (
      <>
        <div>
          <img className="mr-2" src={boxicon}></img>Start S NO
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
        <div>End S NO</div>
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
        <div>Make</div>
      </>
    ),
    selector: (row) => row.standardJobId,
    wrap: true,
    sortable: true,
    format: (row) => row.standardJobId,
  },
  {
    name: (
      <>
        <div>Family</div>
      </>
    ),
    selector: (row) => row.frequency,
    wrap: true,
    sortable: true,
    format: (row) => row.frequency,
  },
  {
    name: (
      <>
        <div>Model</div>
      </>
    ),
    selector: (row) => row.quantity,
    wrap: true,
    sortable: true,
    format: (row) => row.quantity,
  },
  {
    name: (
      <>
        <div>Prefix</div>
      </>
    ),
    selector: (row) => row.part,
    wrap: true,
    sortable: true,
    format: (row) => row.part,
  },
  // {
  //     name: <><div>Service $
  //     </div></>,
  //     selector: row => row.service,
  //     wrap: true,
  //     sortable: true,
  //     format: row => row.service
  //     ,
  // },
  // {
  //     name: <><div>Total $
  //     </div></>,
  //     selector: row => row.total,
  //     wrap: true,
  //     sortable: true,
  //     format: row => row.total
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
  },

  // {
  //   name:<><div>Progress
  //   </div></>,
  //   selector: row => row.plot,
  //   wrap: true,
  //   sortable: true,
  //   format: row => `${row.plot.slice(0, 200)}...`,
  // },
  // {
  //   name:<><div>Status
  //   </div></>,
  //   selector: row => row.plot,
  //   wrap: true,
  //   sortable: true,
  //   format: row => `${row.plot.slice(0, 200)}...`,
  // },
  // {
  //   name:<><div>Consistency status
  //   </div></>,
  //   selector: row => row.plot,
  //   wrap: true,
  //   sortable: true,
  //   format: row => `${row.plot.slice(0, 200)}...`,
  // },
  // {
  //   name:<><div>Description
  //   </div></>,
  //   selector: row => row.plot,
  //   wrap: true,
  //   sortable: true,
  //   format: row => `${row.plot.slice(0, 200)}...`,
  // },
  // {
  //   name: 'Actions',

  //   cell: row => (
  //     <div>
  //       {row.genres.map((genre, i) => (
  //         <div key={i}>{genre}</div>
  //       ))}
  //     </div>
  //   ),
  // },
  // {
  //   name: 'Thumbnail',
  //   grow: 0,
  //   cell: row => <img height="84px" width="56px" alt={row.name} src={row.posterUrl} />,
  // },
  // {
  //   name: 'Poster Link',
  //   button: true,
  //   cell: row => (
  //     <a href={row.posterUrl} target="_blank" rel="noopener noreferrer">
  //       Download
  //     </a>
  //   ),
  // },
  // {
  //     name: 'Actions',
  //     button: true,
  //     cell: () => <Button>Download Poster</Button>,
  // },
];

export function CreatePortfolio() {
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
  const [productHierarchyKeyValue, setProductHierarchyKeyValue] = useState([]);
  const [geographicKeyValue, setGeographicKeyValue] = useState([]);
  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
  const [age, setAge] = React.useState("5");
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

  const [validityData, setValidityData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    from: null,
    to: null,
    fromInput: "",
    toInput: "",
  });
  const [generalComponentData, setGeneralComponentData] = useState({
    portfolioName: "",
    description: "",
    serviceDescription: "",
    reference: "",
    customerSegment: null,
  });
  const [newBundle, setNewBundle] = useState({
    serviceDescription: "",
    bundleFlag: "",
    reference: "",
    customerSegment: null,
    machineComponent: null,
  });
  const [portfolioId, setPortfolioId] = useState(4);
  const [alignment, setAlignment] = React.useState("Portfolio");
  const [prefixLabelGeneral, setPrefixLabelGeneral] = useState("PORTFOLIO");
  const [priceAgreementOption, setPriceAgreementOption] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

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
      .catch((err) => {});
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

  const handleBundleItemSaveAndContinue = () => {
    console.log(taskItemList);
    dispatch(portfolioItemActions.createItem(createItemPayload(taskItemList)));
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
    setValue(value + 1);
    if (e.target.id == "general") {
      let reqData = {
        type: prefixLabelGeneral,
        name: generalComponentData.portfolioName,
        description: generalComponentData.portfolioDescription,
        externalReference: generalComponentData.reference,
        customerSegment: generalComponentData.customerSegment,

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
      };
      createPortfolio(reqData)
        .then((res) => {
          setGeneralComponentData({
            ...generalComponentData,
            reference: res.portfolioId,
          });
          // console.log("res createPortfolio", res);
        })
        .catch((err) => {
          console.log("err in createPortfolio", err);
        });
    } else if (e.target.id == "validity") {
      let reqData;
      if (validityData.fromInput && validityData.toInput) {
        reqData = {
          validFrom: validityData.fromInput + validityData.from,
          validTo: validityData.toInput + validityData.from,
        };
      } else if (validityData.fromDate && validityData.toDate) {
        let yf = validityData.fromDate.getFullYear();
        let mf = validityData.fromDate.getMonth();
        let df = validityData.fromDate.getDate();

        let yt = validityData.toDate.getFullYear();
        let mt = validityData.toDate.getMonth();
        let dt = validityData.toDate.getDate();
        reqData = {
          validFrom: `${yf}/${mf}/${df}`,
          validTo: `${yt}/${mt}/${dt}`,
        };
      }

      // service Call for updating Date

      console.log("reqData for validity:", reqData, generalComponentData);
    } else if (e.target.id == "strategy") {
      
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
          console.log(portfolioDetails);
          if (portfolioDetails.portfolioId != null) {
            setGeneralComponentData({
              portfolioName: portfolioDetails.name,
              portfolioDescription: portfolioDetails.description,
              serviceProgramDescription: "",
              reference: portfolioDetails.externalReference,
              customerSegment: "",
            });
          }
        })
        .catch((err) => {});
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

  useEffect(() => {
    const portfolioId = 4;
    getPortfolioDetails(portfolioId);
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

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
  const HandleCatUsage = (e) => {
    dispatch(taskActions.updateList(e.value));
  };
  const HandleStrategyUsage = (e) => {
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
  const [selectedOption, setSelectedOption] = useState(null);

  const [value, setValue] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
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

  return (
    <>
      <CommanComponents />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
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
                  Portfolio Details
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
                          type="email"
                          className="form-control border-radius-10"
                          name="portfolioId"
                          placeholder="(Auto-generated)"
                          // value={generalComponentData.portfolioDescription}
                          onChange={handleGeneralInputChange}
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
                          name="portfolioName"
                          placeholder="Name"
                          value={generalComponentData.portfolioName}
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
                          name="portfolioDescription"
                          placeholder="Description"
                          value={generalComponentData.portfolioDescription}
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
                          name="reference"
                          placeholder="Reference"
                          value={generalComponentData.reference}
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
                              for="exampleInputEmail1"
                            >
                              <span className=" mr-2">FROM</span>
                            </label>
                            <div className="form-group w-100">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-control border-radius-10"
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
                                  className="form-control border-radius-10"
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
                          // value={}
                          options={categoryList}
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
                        <Select options={rTimeList} />
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
                        <Select options={productList} />
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
                    <div class="table-responsive custometable">
                      <table class="table">
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
                    className="custom-table card"
                    style={{ width: "100%", backgroundColor: "#fff" }}
                  >
                    <div className="row align-items-center">
                      <div className="col-3">
                        <div className="d-flex ">
                          <h5 className="mr-4 mb-0">
                            <span></span>
                          </h5>
                          <p className="ml-4 mb-0">
                            <a href="#" className="ml-3 ">
                              <img src={editIcon}></img>
                            </a>
                            <a href="#" className="ml-3 ">
                              <img src={shareIcon}></img>
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
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
                              {/* <div><lable className="label-div">Search By</lable></div> */}
                              <FormControl className="" sx={{ m: 1 }}>
                                <Select
                                  placeholder="Search By"
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
                                  <MenuItem value={22}>
                                    Twenty one and a half
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex align-items-center">
                          <div className="col-6 text-center">
                            <a href="#" className="p-1 more-btn">
                              + 3 more
                              <span className="c-btn">C</span>
                              <span className="b-btn">B</span>
                              <span className="a-btn">A</span>
                            </a>
                          </div>
                          <div className="col-6 text-center border-left py-4">
                            <div className="row">
                              <div className="col-6">
                                <a onClick="" className="p-1 ">
                                  + Add Coverage
                                </a>
                              </div>
                              <div className="col-6">
                                <a
                                  onClick={() => handleOpen()}
                                  className="p-1 "
                                >
                                  + Upload Coverage
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6 className="font-weight-400 text-black mb-2 mt-1">
                      Select coverages from list to add in portfolio
                    </h6>

                    <DataTable
                      className=""
                      title=""
                      columns={columns}
                      data={data}
                      customStyles={customStyles}
                      pagination
                    />
                  </div>

                  <div className="row" style={{ display: "none" }}>
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
              {/* <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleShowAddSolution}><span className="mr-2">+</span>Add Solution</h6> */}
              <div className="d-flex align-items-center">
                <h6
                  className="font-weight-600 text-light mb-0 cursor"
                  onClick={handleAddSolutionPress}
                >
                  <span className="mr-2">+</span>Add Solution
                </h6>
                <Dropdown as={ButtonGroup}>
                  {/* <div id="dropdown-split-basic" aria-expanded="false" type="button" class="dropdown-toggle dropdown-toggle-split btn"><MoreVertIcon /></div> */}
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
                </Dropdown>
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
                  <DataTable
                    title=""
                    columns={columns}
                    data={bundleItems}
                    customStyles={customStyles}
                    pagination
                  />
                </div>
              </div>
            ) : (
              <div className="p-4  row">
                <div
                  className="col-md-6 col-sm-6"
                  onClick={handleNewBundleItem}
                >
                  <a href="#" className="add-new-recod">
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                      <p className="font-weight-600">Add Protfolio Item</p>
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
                        class=""
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
                <ul class="submenu accordion mt-0" style={{ display: "block" }}>
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
                      name="portfolioName"
                      placeholder="Service ID(AUTO)"
                      value={generalComponentData.portfolioName}
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
                    {/* <input type="email" className="form-control border-radius-10" name="reference" placeholder="Customer Segment" value={generalComponentData.reference} onChange={handleGeneralInputChange} /> */}
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
                                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
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
              <div class="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ID
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      disabled
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="(AUTO GENERATE)"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Replace Cranskshaft"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      USAGE IN
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Overhaul"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4">STRATEGY</p>
              <div class="row mt-4">
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
                          onChange={setTaskItemList}
                          options={taskList}
                          placeholder="Select Or Search"
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
                          options={frequencyList}
                          placeholder="Cyclical"
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
                    <Select options={unitList} placeholder="HOURS" />
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
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="250"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Overhaul"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      NO. OF EVENTS
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Overhaul"
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
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Cyclical"
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
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Cyclical"
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
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      # OF EVENTS
                    </label>
                    <div className="icon-defold">
                      <input
                        type="email"
                        class="form-control icon-defold border-radius-10"
                        style={{ paddingLeft: "35px" }}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="SJ1234"
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
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      # OF EVENTS
                    </label>
                    <div className="icon-defold">
                      <input
                        type="email"
                        class="form-control icon-defold border-radius-10"
                        style={{ paddingLeft: "35px" }}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="SJ1234"
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
                </div>
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
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Cyclical"
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
                <a
                  href="#"
                  className="btn bg-primary text-white"
                  onClick={handleBundleItemSaveAndContinue}
                >
                  Save & Continue
                </a>
              </div>
              {/* <div class="row mt-4">
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION ID</label>
                                        <input type="email" class="form-control border-radius-10" disabled id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="(AUTO GENERATE)" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOLUTION DESCRIPTION</label>
                                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace Cranskshaft" />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div class="form-group w-100">
                                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">USAGE IN</label>
                                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Overhaul" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4">STRATEGY</p>
                            <div class="row mt-4">
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
              <h5 class="">Choose what solution you want to build</h5>
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

      <ToastContainer />
    </>
  );
}
