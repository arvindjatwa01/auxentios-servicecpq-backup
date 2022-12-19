import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MuiMenuComponent } from "pages/Operational";
import searchstatusIcon from "../../assets/icons/svg/search-status.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../assets/icons/svg/share.svg";
import SearchIcon from "@mui/icons-material/Search";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import cpqIcon from "../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
// import {Link} from 'react-router-dom'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import boxicon from "../../assets/icons/png/box.png";
import DataTable from "react-data-table-component";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useHistory } from "react-router-dom";
import $ from "jquery";
import {
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation,
} from "../../services/index";
import SearchBox from "./components/SearchBox";
import { FONT_STYLE, FONT_STYLE_SELECT } from "./CONSTANTS";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Rating, TextField } from "@mui/material";
import Moment from "react-moment";
import {
  updateKITCoverage,
  updateKITEstimation,
  updateKITGeneralDet,
  updateKITPrice,
  updateKITStatus,
} from "services/kitService";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { useAppSelector } from "app/hooks";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import QuerySearchComp from "./components/QuerySearchComp";
import ServiceOnlyTemplateSegment from "./ServiceOnlySegment";

function ServiceOnlyTemplates(props) {
  const history = useHistory();
  const [activeElement, setActiveElement] = useState({
    name: "header",
    bId: "",
    sId: "",
    oId: "",
  });
  const { state } = props.location;
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState("estimation");
  const [templateDBId, setTemplateDBId] = useState("");
  const [version, setVersion] = useState({ value: "Gold", label: "Gold" });
  const versionOptions = [
    { value: "GOLD", label: "Gold" },
    { value: "SILVER", label: "Silver" },
    { value: "BRONZE", label: "Bronze" },
  ];
  const APPLICATION_OPTIONS = [
    { value: "PREVENTIVE_MAINTENANCE", label: "Preventive Maintenance" },
    { value: "MSCHEDULED_MAINTENANCE", label: "Scheduled Maintenance" },
    { value: "COMPONENT_REPLACEMENT", label: "Component Replacement" },
    { value: "OVERHAUL", label: "Overhaul" },
    { value: "WARRANTY", label: "Warranty/Service Programs" },
  ];
  const LIFE_STAGE_OPTIONS = [
    { value: "NEW", label: "New" },
    { value: "POST_WARRANTY", label: "Post Warranty" },
    { value: "MIDLIFE", label: "Midlife" },
    { value: "END_OF_LIFE", label: "End of Life" },
  ];
  const [selKITStatus, setSelKITStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [noOptionsModelCoverage, setNoOptionsModelCoverage] = useState(false);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const builderStatusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "ACTIVE", label: "Active" },
    { value: "REVISED", label: "Revised" },
    { value: "ARCHIVED", label: "Archived" },
  ];
  const handleVersionTemplate = (e) => {
    setVersion(e);
  };
  // Update the status of the builder : Active, Revised etc.
  const handleBuilderStatus = async (e) => {
    await updateKITStatus(templateDBId, e.value)
      .then((result) => {
        setSelKITStatus(e);
        handleSnack("success", "Status has been updated!");
      })
      .catch((err) => {
        handleSnack("error", `Failed to update the status!`);
      });
  };
  const [rating, setRating] = useState(null);
  const [searchCoverageModelResults, setSearchCoverageModelResults] = useState(
    []
  );
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const [generalData, setGeneralData] = useState({
    estimationDate: new Date(),
    estimationNo: "",
    description: "",
    reference: "",
    validity: null,
    version: "",
    customerID: "",
    customerName: "",
  });
  const [usageData, setUsageData] = useState({
    application: "",
    owner: "",
    articleNumber: "",
    lifeStage: "",
    startUsage: "",
    endUsage: "",
    usageInterval: "",
    component: "",
    nextRevisionDate: new Date(),
  });
  const [estimationData, setEstimationData] = useState({
    preparedBy: "user1",
    approvedBy: "user1",
    preparedOn: new Date(),
    revisedBy: "user1",
    revisedOn: new Date(),
    salesOffice: null,
  });
  const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] =
    useState([]);
  const [pricingData, setPricingData] = useState({
    priceMethod: null,
    netPrice: 0.0,
    netPriceParts: 0.0,
    netPriceLabor: 0.0,
    netPriceMisc: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "",
  });
  const [uploadOpen, setUploadOpen] = React.useState(false);

  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );
  const validityOptions = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
  ];
  const [viewOnlyTab, setViewOnlyTab] = useState({
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
    usageViewOnly: false
  });
  // Logic to make the header tabs editable
  const makeHeaderEditable = () => {
    if (value === "estimation" && viewOnlyTab.estViewOnly)
      setViewOnlyTab({ ...viewOnlyTab, estViewOnly: false });
    else if (value === "general" && viewOnlyTab.generalViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        generalViewOnly: false,
      });
    else if (value === "price" && viewOnlyTab.priceViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        priceViewOnly: false,
      });
    else if (value === "usage" && viewOnlyTab.usageViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        usageViewOnly: false,
      });
  };
  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];
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
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  useEffect(() => {
    if (state) {
      setHeaderLoading(true);
      setTemplateId(state.templateId);
      setTemplateDBId(state.templateDBId);
      // fetchAllDetails(state.kitDBId);
    }
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
  });

  const currencyOptions = [{ value: "USD", label: "USD" }];

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = ["Create Versions", "Show Errors", "Review"];
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const [masterData, setMasterData] = useState([]);
  // Coverage search based on model and serial number
  const handleCoverageModelSearch = async (searchfieldName, searchText) => {
    let searchQueryCoverage = "";
    setSearchCoverageModelResults([]);
    coverageRowData.model = searchText;
    searchQueryCoverage = searchText ? "model~" + searchText : "";

    // console.log("search query", searchQueryMachine);
    if (searchQueryCoverage) {
      await getSearchQueryCoverage(searchQueryCoverage)
        .then((result) => {
          if (result) {
            if (result && result.length > 0) {
              setSearchCoverageModelResults(result);
              var preArr = [];
              for (var n = 0; n < result.length; n++) {
                preArr.push({
                  label: result[n].prefix,
                  value: result[n].prefix,
                });
              }
              setQuerySearchModelPrefixOption(preArr);
              setNoOptionsModelCoverage(false);
            } else {
              setNoOptionsModelCoverage(true);
            }
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the model!");
        });
    } else {
      setSearchCoverageModelResults([]);
    }
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
  const [selectedCoverageData, setSelectedCoverageData] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
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
  // Select model from the search result
  const handleCoverageModelSelect = (type, currentItem) => {
    if (type === "model") {
      setCoverageRowData({
        ...coverageRowData,
        model: currentItem.model,
      });
      setSearchCoverageModelResults([]);
    }
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

  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const [filterMasterData, setFilterMasterData] = useState([]);
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

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimationData({
      ...estimationData,
      [name]: value,
    });
  };
  const masterColumns = [
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
    //       <div>Serial No</div>
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
    // {
    //   name: (
    //     <>
    //       <div>Action</div>
    //     </>
    //   ),
    //   selector: (row) => row.action,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.action,
    //   cell: (row) => <div><img className="mr-2" src={penIcon} /><img className="mr-2" src={deleticon} /><img src={link1Icon} /></div>,
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
            onClick={(e) => handleEditCoverageRow(e, row)}
            className="btn-svg text-white cursor mr-2"
            data-toggle="modal"
            data-target="#AddCoverage"
          >
            <svg
              version="1.1"
              viewBox="0 0 1696.162 1696.143"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="pen">
                <path d="M1648.016,305.367L1390.795,48.149C1359.747,17.098,1318.466,0,1274.555,0c-43.907,0-85.188,17.098-116.236,48.148   L81.585,1124.866c-10.22,10.22-16.808,23.511-18.75,37.833L0.601,1621.186c-2.774,20.448,4.161,41.015,18.753,55.605   c12.473,12.473,29.313,19.352,46.714,19.352c2.952,0,5.923-0.197,8.891-0.601l458.488-62.231   c14.324-1.945,27.615-8.529,37.835-18.752L1648.016,537.844c31.049-31.048,48.146-72.33,48.146-116.237   C1696.162,377.696,1679.064,336.415,1648.016,305.367z M493.598,1505.366l-350.381,47.558l47.56-350.376L953.78,439.557   l302.818,302.819L493.598,1505.366z M1554.575,444.404l-204.536,204.533l-302.821-302.818l204.535-204.532   c8.22-8.218,17.814-9.446,22.802-9.446c4.988,0,14.582,1.228,22.803,9.446l257.221,257.218c8.217,8.217,9.443,17.812,9.443,22.799   S1562.795,436.186,1554.575,444.404z" />
              </g>
              <g id="Layer_1" />
            </svg>
          </Link>
          <Link
            to="#"
            onClick={(e) => handleDeleteCoverageRow(e, row)}
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
                class="cls-1"
                d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
              />
              <path
                class="cls-1"
                d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
              />
            </svg>
          </Link>
        </div>
      ),
    },
  ];
  const handleDeleteCoverageRow = (e, row) => {
    const updated = selectedCoverageData.filter((obj) => {
      if (obj.id !== row.id) return obj;
    });
    setSelectedCoverageData(updated);
  };

  const initialCoverageRowData = {
    id: "",
    make: "",
    family: "",
    model: "",
    prefix: "",
    startSerialNumber: "",
    endSerialNumber: "",
    fleet: "",
    fleetSize: "",
  };
  const [coverageRowData, setCoverageRowData] = useState(
    initialCoverageRowData
  );

  const handleEditCoverageRow = (e, row) => {
    setCoverageRowData(initialCoverageRowData);
    let obj = {
      id: row.id,
      make: row.make,
      family: row.family,
      model: row.model,
      prefix: row.prefix,
      startSerialNumber: row.startSerialNumber,
      endSerialNumber: row.endSerialNumber,
      fleet: row.fleet,
      fleetSize: row.fleetSize,
    };
    setCoverageRowData(obj);
  };

  const updateEstData = () => {
    let data = {
      id: templateDBId,
      preparedBy: estimationData.preparedBy,
      preparedOn: estimationData.preparedOn,
      revisedBy: estimationData.revisedBy,
      revisedOn: estimationData.revisedOn,
      approver: estimationData.approvedBy,
      salesOffice: estimationData.salesOffice?.value,
    };
    updateKITEstimation(templateDBId, data)
      .then((result) => {
        setValue("general");
        setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
        handleSnack("success", "Estimation details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the estimation details!"
        );
      });
  };

  const updateGeneralData = () => {
    let data = {
      id: templateDBId,
      estimationDate: generalData.estimationDate,
      description: generalData.description,
      reference: generalData.reference,
      validityDays: generalData.validity?.value,
      estimationNumber: generalData.estimationNo,
      customerID: generalData.customerID,
      customerName: generalData.customerName,
    };
    updateKITGeneralDet(templateDBId, data)
      .then((result) => {
        setValue("price");
        setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
        handleSnack("success", "General details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the general details!"
        );
      });
  };

  const updatePriceData = () => {
    let data = {
      templateDBId,
      priceMethod: pricingData.priceMethod?.value,
      currency: pricingData.currency?.value,
      priceDate: pricingData.priceDate,
      adjustedPrice:
        pricingData.priceMethod?.value === "FLAT_RATE"
          ? pricingData.adjustedPrice
          : 0,
    };
    updateKITPrice(templateDBId, data)
      .then((result) => {
        // setValue("price");
        // fetchAllDetails(kitDBId, generalData.version);
        setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });

        handleSnack("success", "Pricing details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the pricing details!"
        );
      });
  };
  const handleUpdateCoverage = () => {
    const newCoverageArr = selectedCoverageData.map((obj) => {
      if (obj.id === coverageRowData.id) {
        return { ...obj, ...coverageRowData };
      }
      return obj;
    });
    updateKITCoverage(templateDBId, newCoverageArr)
      .then((res) => {
        setSelectedCoverageData(res.coverages);
      })
      .catch((e) => {
        handleSnack("err", "Error occurred while updating the data");
      });
  };

  const handleCoverageCheckBoxData = () => {
    let cloneArr = [];
    let data = [];
    filterMasterData.map((data, i) => {
      console.log("data: ", data);
      const exist = selectedCoverageData.some((item) => item.id === data.id);
      console.log("exist: ", exist);
      if (!exist) {
        cloneArr.push(data);
        // setSelectedCoverageData([...selectedCoverageData, data])
      }
    });
    const coverageArray = [...selectedCoverageData, ...cloneArr];
    coverageArray.map((coverage) =>
      data.push({
        model: coverage.model,
        make: coverage.make,
        family: coverage.family,
        prefix: coverage.prefix,
      })
    );
    updateKITCoverage(templateDBId, data)
      .then((result) => {
        console.log("Successfully saved the coverage!", result);
        setSelectedCoverageData(result.coverages);
        handleSnack("success", "Updated Coverage!");
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while adding the coverage!");
      });
    setMasterData([]);
  };
  const handleCreate = () => {
    history.push("/quoteTemplate");
  };
  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Standard Jobs</h5>
              <div className="d-flex justify-content-center align-items-center">
                {/* <div className="ml-3"><a href="#" className="bg-yellow text-white btn-sm rounded-pill">* Gold <KeyboardArrowDownIcon className="font-size-14"/></a></div> */}
                <div className="ml-3">
                  <Select
                    className="customselectbtn1"
                    onChange={(e) => handleVersionTemplate(e)}
                    options={versionOptions}
                    value={version}
                  />
                </div>

                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleBuilderStatus(e)}
                    options={builderStatusOptions}
                    value={selKITStatus}
                  />
                </div>
                <Rating value={rating} readOnly size="small" sx={{ ml: 2 }} />
              </div>
            </div>
            <div className="d-flex">
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
                <a href="#" className="ml-2">
                  <MuiMenuComponent options={activityOptions} />
                </a>
              </div>
            </div>
          </div>
          {activeElement.name === "header" && (
            <React.Fragment>
              <div className="card p-4 mt-5">
                <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
                  <div className="" style={{ display: "contents" }}>
                    <span
                      className="mr-3 ml-2 text-white"
                      style={{ fontSize: "20px" }}
                    >
                      Header
                    </span>
                    <a href="#" className="btn-sm text-white">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </a>{" "}
                    <a href="#" className="text-white btn-sm">
                      <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                    </a>{" "}
                    <a href="#" className="text-white btn-sm">
                      <i class="fa fa-folder-o" aria-hidden="true"></i>
                    </a>
                  </div>
                  {/* <div className="hr"></div> */}
                </h5>
                <Box
                  className="mt-4"
                  sx={{ width: "100%", typography: "body1" }}
                >
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        className="custom-tabs-div"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Estimation Details" value="estimation" />
                        <Tab label="General Details" value="general" />
                        <Tab label="Price" value="price" />
                        <Tab label="Coverage" value="coverage" />
                        <Tab label="Usage Details" value="usage" />
                      </TabList>
                    </Box>
                    <TabPanel value="estimation">
                      {!viewOnlyTab.estViewOnly ? (
                        <>
                          <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PREPARED BY
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={estimationData.preparedBy}
                                  name="preparedBy"
                                  onChange={handleEstimationDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  APPROVED BY
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={estimationData.approvedBy}
                                  name="approvedBy"
                                  onChange={handleEstimationDataChange}
                                  placeholder="Placeholder (Optional)"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="align-items-center date-box">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PREPARED ON
                                </label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <MobileDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    minDate={estimationData.preparedOn}
                                    maxDate={new Date()}
                                    closeOnSelect
                                    value={estimationData.preparedOn}
                                    onChange={(e) =>
                                      setEstimationData({
                                        ...estimationData,
                                        preparedOn: e,
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        inputProps={{
                                          ...params.inputProps,
                                          style: FONT_STYLE,
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  REVISED BY
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={estimationData.revisedBy}
                                  name="revisedBy"
                                  onChange={handleEstimationDataChange}
                                  placeholder="Placeholder (Optional)"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="align-items-center date-box">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  REVISED ON
                                </label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <MobileDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    minDate={estimationData.revisedOn}
                                    maxDate={new Date()}
                                    closeOnSelect
                                    value={estimationData.revisedOn}
                                    onChange={(e) =>
                                      setEstimationData({
                                        ...estimationData,
                                        revisedOn: e,
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        inputProps={{
                                          ...params.inputProps,
                                          style: FONT_STYLE,
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  SALES OFFICE / BRANCH
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setEstimationData({
                                      ...estimationData,
                                      salesOffice: e,
                                    })
                                  }
                                  options={salesOfficeOptions}
                                  placeholder="Required"
                                  value={estimationData.salesOffice}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{ justifyContent: "right" }}
                          >
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={updateEstData}
                              disabled={
                                !estimationData.preparedBy ||
                                !estimationData.preparedOn ||
                                !estimationData.salesOffice
                              }
                            >
                              Save & Next
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="row mt-3">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PREPARED BY
                              </p>
                              <h6 className="font-weight-500">
                                {estimationData.preparedBy}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                APPROVED BY
                              </p>
                              <h6 className="font-weight-500">
                                {estimationData.approvedBy}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PREPARED ON
                              </p>
                              <h6 className="font-weight-500">
                                <Moment format="DD/MM/YYYY">
                                  {estimationData.preparedOn}
                                </Moment>
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                REVISED BY{" "}
                              </p>
                              <h6 className="font-weight-500">
                                {estimationData.revisedBy}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                REVISED ON
                              </p>
                              <h6 className="font-weight-500">
                                <Moment format="DD/MM/YYYY">
                                  {estimationData.revisedOn}
                                </Moment>
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                SALES OFFICE / BRANCH
                              </p>
                              <h6 className="font-weight-500">
                                {estimationData.salesOffice?.value}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value="general">
                      {!viewOnlyTab.generalViewOnly ? (
                        <>
                          <div className="row input-fields">
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  ESTIMATION #
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control border-radius-10 text-primary"
                                  id="estNoId"
                                  value={generalData.estimationNo}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  DESCRIPTION
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  id="desc-id"
                                  placeholder="Required"
                                  maxLength={140}
                                  value={generalData.description}
                                  onChange={(e) =>
                                    setGeneralData({
                                      ...generalData,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="align-items-center date-box">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  <span className=" mr-2">ESTIMATION DATE</span>
                                </label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <MobileDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    minDate={generalData.estimationDate}
                                    maxDate={new Date()}
                                    closeOnSelect
                                    value={generalData.estimationDate}
                                    onChange={(e) =>
                                      setGeneralData({
                                        ...generalData,
                                        estimationDate: e,
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        inputProps={{
                                          ...params.inputProps,
                                          style: FONT_STYLE,
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  REFERENCE
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  id="desc-id"
                                  placeholder="Required"
                                  maxLength={140}
                                  value={generalData.reference}
                                  onChange={(e) =>
                                    setGeneralData({
                                      ...generalData,
                                      reference: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  VALIDITY
                                </label>
                                <Select
                                  // defaultValue={selectedOption}
                                  onChange={(e) =>
                                    setGeneralData({
                                      ...generalData,
                                      validity: e,
                                    })
                                  }
                                  options={validityOptions}
                                  placeholder="Required"
                                  value={generalData.validity}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  VERSION
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Placeholder (Optional)"
                                  disabled
                                  value={generalData.version}
                                />
                              </div>
                            </div>
                            {/* <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER ID
                              </label>
                              <SearchBox
                                value={generalData.customerID}
                                onChange={(e) =>
                                  handleCustSearch(e.target.value)
                                }
                                type="customerId"
                                result={searchCustResults}
                                onSelect={handleCustSelect}
                                noOptions={noOptionsCust}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER NAME
                              </label>
                              <input
                                type="text"
                                value={generalData.customerName}
                                name="customerName"
                                onChange={handleCustomerDataChange}
                                className="form-control border-radius-10 text-primary"
                                id="customerNameid"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div> */}
                          </div>
                          <div
                            className="row"
                            style={{ justifyContent: "right" }}
                          >
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={updateGeneralData}
                              disabled={
                                !generalData.estimationDate ||
                                !generalData.description ||
                                !generalData.estimationNo ||
                                !generalData.reference ||
                                !generalData.validity
                              }
                            >
                              Save & Next
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="row mt-3">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                ESTIMATION DATE{" "}
                              </p>
                              <h6 className="font-weight-500">
                                <Moment format="DD/MM/YYYY">
                                  {generalData.estimationDate}
                                </Moment>
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                ESTIMATION #
                              </p>
                              <h6 className="font-weight-500">
                                {generalData.estimationNo}{" "}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                DESCRIPTION
                              </p>
                              <h6 className="font-weight-500">
                                {generalData.description}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                REFERENCE{" "}
                              </p>
                              <h6 className="font-weight-500">
                                {generalData.reference}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                VALIDTITY (DAYs)
                              </p>
                              <h6 className="font-weight-500">
                                {generalData.validity?.value}{" "}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                VERSION
                              </p>
                              <h6 className="font-weight-500">
                                {generalData.version}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value="price">
                      {!viewOnlyTab.priceViewOnly ? (
                        <React.Fragment>
                          <div className="row input-fields">
                            <div className="col-md-4 col-sm-4">
                              <div className="align-items-center date-box">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PRICE DATE
                                </label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <MobileDatePicker
                                    inputFormat="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    minDate={pricingData.priceDate}
                                    maxDate={new Date()}
                                    closeOnSelect
                                    value={pricingData.priceDate}
                                    onChange={(e) =>
                                      setPricingData({
                                        ...pricingData,
                                        priceDate: e,
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="standard"
                                        inputProps={{
                                          ...params.inputProps,
                                          style: FONT_STYLE,
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PRICE METHOD
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setPricingData({
                                      ...pricingData,
                                      priceMethod: e,
                                    })
                                  }
                                  options={priceMethodOptions}
                                  placeholder="Required"
                                  value={pricingData.priceMethod}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={
                                    !(
                                      pricingData.priceMethod?.value ===
                                      "FLAT_RATE"
                                    )
                                  }
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={
                                    pricingData.priceMethod?.value ===
                                    "FLAT_RATE"
                                      ? pricingData.adjustedPrice
                                      : 0
                                  }
                                  onChange={(e) =>
                                    setPricingData({
                                      ...pricingData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  CURRENCY
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setPricingData({
                                      ...pricingData,
                                      currency: e,
                                    })
                                  }
                                  options={currencyOptions}
                                  placeholder="Required"
                                  value={pricingData.currency}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  NET PRICE (PARTS)
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={pricingData.netPriceParts}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  NET PRICE (LABOR)
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={pricingData.netPriceLabor}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  NET PRICE (MISC)
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={pricingData.netPriceMisc}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  NET PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={pricingData.netPrice}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{ justifyContent: "right" }}
                          >
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={updatePriceData}
                              disabled={
                                !(pricingData.priceDate &&
                                pricingData.priceMethod &&
                                pricingData.currency &&
                                pricingData.priceMethod?.value === "FLAT_RATE"
                                  ? pricingData.adjustedPrice > 0
                                  : true)
                              }
                            >
                              Save
                            </button>
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className="row mt-3">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                NET PRICE
                              </p>
                              <h6 className="font-weight-500">
                                {pricingData.netPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE DATE
                              </p>
                              <h6 className="font-weight-500">
                                <Moment format="DD/MM/YYYY">
                                  {pricingData.priceDate}
                                </Moment>
                              </h6>
                            </div>
                          </div>
                          {/* <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="font-size-12 font-weight-500 mb-2">
                            COST PRICE
                          </p>
                          <h6 className="font-weight-500">{01.09.2021}</h6>
                        </div>
                      </div> */}
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-500">
                                {pricingData.priceMethod?.label}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                ADJUSTED PRICE{" "}
                              </p>
                              <h6 className="font-weight-500">
                                {pricingData.adjustedPrice}
                              </h6>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                CURRENCY{" "}
                              </p>
                              <h6 className="font-weight-500">
                                {pricingData.currency?.label}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value="coverage">
                      <ul
                        class="submenu templateResultheading accordion"
                        style={{ display: "block" }}
                      >
                        <li>
                          <a className="cursor result">Search Coverage</a>
                        </li>
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
                            setSelectedMasterData={setSelectedCoverageData}
                            compoFlag="coverage"
                            options={[
                              { label: "Make", value: "make" },
                              { label: "Model", value: "model" },
                              { label: "Prefix", value: "prefix" },
                              { label: "Family", value: "family" },
                            ]}
                          />
                          <div className=" ml-3">
                            <Link
                              to="#"
                              onClick={() => setUploadOpen(true)}
                              className="btn bg-primary text-white"
                            >
                              <FileUploadOutlinedIcon />{" "}
                              <span className="ml-1">Upload</span>
                            </Link>
                          </div>
                        </div>
                        {masterData?.length > 0 ? (
                          <>
                            <hr />
                            <DataTable
                              className=""
                              title=""
                              columns={masterColumns}
                              data={masterData}
                              customStyles={customStyles}
                              selectableRows
                              onSelectedRowsChange={(state) =>
                                setFilterMasterData(state.selectedRows)
                              }
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
                        {selectedCoverageData.length > 0 ? (
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
                              data={selectedCoverageData}
                              customStyles={customStyles}
                              pagination
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TabPanel>
                    <TabPanel value="usage">
                    {!viewOnlyTab.usageViewOnly ? (
                      <React.Fragment>
                      <div className="row input-fields">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              APPLICATION
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setUsageData({
                                  ...usageData,
                                  application: e,
                                })
                              }
                              options={APPLICATION_OPTIONS}
                              placeholder="Required"
                              value={usageData.application}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              OWNER
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              placeholder="Placeholder (Optional)"
                              value={usageData.owner}
                              onChange={(e) =>
                                setUsageData({
                                  ...usageData,
                                  owner: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ARTICLE #
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              placeholder="Placeholder (Optional)"
                              value={usageData.articleNumber}
                              onChange={(e) =>
                                setUsageData({
                                  ...usageData,
                                  articleNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              LIFE STAGE
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setUsageData({
                                  ...usageData,
                                  lifeStage: e,
                                })
                              }
                              options={LIFE_STAGE_OPTIONS}
                              placeholder="OPTIONAL"
                              value={usageData.lifeStage}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              START USAGE
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              placeholder="Placeholder (Optional)"
                              value={usageData.startUsage}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              END USAGE
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              placeholder="Placeholder (Optional)"
                              value={usageData.endUsage}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              USAGE INTERVAL
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              placeholder="Placeholder (Optional)"
                              value={usageData.usageInterval}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="align-items-center date-box">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              <span className=" mr-2">NEXT REVISION DATE</span>
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                minDate={new Date()}
                                closeOnSelect
                                value={generalData.nextRivisionDate}
                                onChange={(e) =>
                                  setGeneralData({
                                    ...generalData,
                                    estimationDate: e,
                                  })
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="standard"
                                    inputProps={{
                                      ...params.inputProps,
                                      style: FONT_STYLE,
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                        >
                          Save
                        </button>
                      </div>
                      </React.Fragment>):
                      <div className="row mt-3">
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              APPLICATION{" "}
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.application?.label}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              OWNER
                            </p>
                            <h6 class="font-weight-500">{usageData.owner} </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              ARTICLE #
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.articleNumber}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              LIFE STAGE
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.lifeStage?.label}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              START USAGE
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.startUsage}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              END USAGE
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.endUsage}{" "}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              USAGE INTERVAL
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.usageInterval}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              COMPONENT
                            </p>
                            <h6 class="font-weight-500">
                              {usageData.component}
                            </h6>
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                          <div class="form-group">
                            <p class="font-size-12 font-weight-500 mb-2">
                              NEXT RIVISION DATE
                            </p>
                            <h6 class="font-weight-500">
                              <Moment format="DD/MM/YYYY">
                                {usageData.nextRevisionDate}
                              </Moment>
                            </h6>
                          </div>
                        </div>
                      </div>}
                      
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              <div className="Add-new-segment-div p-3 border-radius-10 mb-2">
                <button
                  className="btn bg-primary text-white"
                  onClick={() =>
                    setActiveElement({ name: "segment", templateDBId })
                  }
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  Add New Segment
                </button>
              </div>
            </React.Fragment>
          )}
          {activeElement.name === "segment" && (
            <ServiceOnlyTemplateSegment
              templateDetails={{
                activeElement,
                setActiveElement,
                // fetchAllDetails,
              }}
            />
          )}
        </div>
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
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <hr className="my-1" />
              <div class="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
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
                        for="exampleInputEmail1"
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
                        for="exampleInputEmail1"
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
                        for="exampleInputEmail1"
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

                <div className="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">
                        QUOTE TYPE{" "}
                      </p>
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
              </div>
              <div class="modal-footer" style={{ display: "unset" }}>
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
                <div>
                  <button class="btn  btn-primary">Create</button>
                  <button
                    type="button"
                    class="btn pull-right border"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
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
                        value={coverageRowData.make}
                        defaultValue={coverageRowData.make}
                        disabled
                      />
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
                        value={coverageRowData.family}
                        defaultValue={coverageRowData.family}
                        disabled
                      />
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
                      <SearchBox
                        value={coverageRowData.model}
                        onChange={(e) =>
                          handleCoverageModelSearch("model", e.target.value)
                        }
                        type="model"
                        result={searchCoverageModelResults}
                        onSelect={handleCoverageModelSelect}
                        noOptions={noOptionsModelCoverage}
                      />
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
                        placeholder={coverageRowData.prefix}
                        value={coverageRowData.prefix}
                        defaultValue={coverageRowData.prefix}
                        className="text-primary"
                        onChange={(e) =>
                          setCoverageRowData({
                            ...coverageRowData,
                            prefix: e.value,
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
                        Start Serial No
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        placeholder="(Optional)"
                        value={coverageRowData.startSerialNumber}
                        defaultValue={coverageRowData.startSerialNumber}
                        onChange={(e) =>
                          setCoverageRowData({
                            ...coverageRowData,
                            startSerialNumber: e.target.value,
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
                        value={coverageRowData.endSerialNumber}
                        defaultValue={coverageRowData.endSerialNumber}
                        onChange={(e) =>
                          setCoverageRowData({
                            ...coverageRowData,
                            endSerialNumber: e.target.value,
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
                        value={coverageRowData.fleet}
                        defaultValue={coverageRowData.fleet}
                        onChange={(e) =>
                          setCoverageRowData({
                            ...coverageRowData,
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
                        value={coverageRowData.fleetSize}
                        defaultValue={coverageRowData.fleetSize}
                        onChange={(e) =>
                          setCoverageRowData({
                            ...coverageRowData,
                            fleetSize: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
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
                  onClick={handleUpdateCoverage}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceOnlyTemplates;
