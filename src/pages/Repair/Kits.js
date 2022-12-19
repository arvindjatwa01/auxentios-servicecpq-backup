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
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
// import { Link } from 'react-router-dom'
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DataTable from "react-data-table-component";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal, SplitButton, Dropdown, ButtonGroup } from "react-bootstrap";
import boxicon from "../../assets/icons/png/box.png";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormGroup from "@mui/material/FormGroup";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MultiSelect from "@mui/material/Select";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormControl from "@mui/material/FormControl";
import { Link, useHistory } from "react-router-dom";
import SelectFilter from "react-select";
import { DataGrid } from "@mui/x-data-grid";
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
import {
  fetchKITDetails,
  updateKITCoverage,
  updateKITCustomer,
  updateKITEstimation,
  updateKITGeneralDet,
  updateKITMachine,
  updateKITPrice,
  updateKITStatus,
} from "services/kitService";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import { useAppSelector } from "app/hooks";
import LoadingProgress from "./components/Loader";
import SearchBox from "./components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";
import Validator from "utils/validator";
import Moment from "react-moment";
import { FONT_STYLE, FONT_STYLE_SELECT } from "./CONSTANTS";
import { Rating, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import QuerySearchComp from "./components/QuerySearchComp";
function Kits(props) {
  const history = useHistory();
  const { state } = props.location;
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState("customer");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchCoverageModelResults, setSearchCoverageModelResults] = useState(
    []
  );

  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsModelCoverage, setNoOptionsModelCoverage] = useState(false);

  const [noOptionsSerial, setNoOptionsSerial] = useState(false);

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
  const activityOptions = ["Create Versions", "Show Errors", "Review"];
  const [openCoverage, setOpenCoveragetable] = React.useState(false);

  const handleOption3 = (e) => {
    setValue3(e);
  };
  const handleVersionKit = (e) => {
    setVersion(e);
  };
  const [version, setVersion] = useState({ value: "Gold", label: "Gold" });
  const versionOptions = [
    { value: "GOLD", label: "Gold" },
    { value: "SILVER", label: "Silver" },
    { value: "BRONZE", label: "Bronze" },
  ];
  const [selKITStatus, setSelKITStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  // Update the status of the builder : Active, Revised etc.
  const handleBuilderStatus = async (e) => {
    await updateKITStatus(kitDBId, e.value)
      .then((result) => {
        setSelKITStatus(e);
        handleSnack("success", "Status has been updated!");
      })
      .catch((err) => {
        handleSnack("error", `Failed to update the status!`);
      });
  };
  const builderStatusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "ACTIVE", label: "Active" },
    { value: "REVISED", label: "Revised" },
    { value: "ARCHIVED", label: "Archived" },
  ];

  const [rating, setRating] = useState(null);

  const [value3, setValue3] = useState({ value: "Gold", label: "Gold" });
  const [headerLoading, setHeaderLoading] = useState(false);
  const [kitId, setKITId] = useState("");
  const [kitDBId, setKITDBId] = useState("");
  useEffect(() => {
    if (state) {
      setHeaderLoading(true);
      setKITId(state.kitId);
      setKITDBId(state.kitDBId);
      fetchAllDetails(state.kitDBId);
      // setPartListNo(state.partListNo);
      // setPartListId(state.partListId);
      // fetchAllDetails(state.builderId, state.versionNumber);
    }
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
  }, []);

  const fetchAllDetails = (id) => {
    console.log(id);
    if (id) {
      setHeaderLoading(true);
      fetchKITDetails(id)
        .then((result) => {
          populateHeader(result);
          setHeaderLoading(false);
          // fetchPartlist(result.id);
        })
        .catch((err) => {
          setHeaderLoading(false);
          handleSnack(
            "error",
            "Error occurred while fetching the version details"
          );
        });
    }
  };
  const [viewOnlyTab, setViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
  });
  const validityOptions = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
  ];

  const APPLICATION_OPTIONS = [
    { value: "MAINTENANCE", label: "Routine Maintenance" },
    { value: "REPAIR", label: "General Repair" },
    { value: "CONTRACTS", label: "Maintenance Contracts" },
    { value: "SALES", label: "Sales" },
    { value: "OTHERS", label: "Others" },
  ];

  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );

  // TODO: Replace it with tenant details
  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];
  const currencyOptions = [{ value: "USD", label: "USD" }];
  const [querySearchModelPrefixOption, setQuerySearchModelPrefixOption] =
    useState([]);
  const [customerData, setCustomerData] = useState({
    source: "User Generated",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
    customerSegment: "",
    regionOrState: "",
    country: "",
  });
  const [machineData, setMachineData] = useState({
    make: "",
    family: "",
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
    productSegment: "",
    productGroup: "",
  });
  const [generalData, setGeneralData] = useState({
    estimationDate: new Date(),
    estimationNo: "",
    description: "",
    reference: "",
    validity: null,
    version: "",
    owner: "",
    application: "",
    nextRivisionDate: new Date(),
  });
  const [estimationData, setEstimationData] = useState({
    preparedBy: "user1",
    approvedBy: "user1",
    preparedOn: new Date(),
    revisedBy: "user1",
    revisedOn: new Date(),
    salesOffice: null,
  });
  const [pricingData, setPricingData] = useState({
    priceMethod: null,
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "USD",
  });

  // Search Customer with customer ID
  const handleCustSearch = async (searchText) => {
    // console.log("clear data", searchText);
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(
        "customerId~" + searchText + " OR fullName~" + searchText
      )
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCustResults(result);
            setNoOptionsCust(false);
          } else {
            setNoOptionsCust(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
      customerSegment: currentItem.customerSegment,
      country: currentItem.addressDTO?.country,
      regionOrState: currentItem.addressDTO?.regionOrState,
    });
    setSearchCustResults([]);
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };
  const updateCustomerData = () => {
    let data = {
      id: kitDBId,
      source: customerData.source,
      customerId: customerData.customerID,
      customerName: customerData.customerName,
      contactName: customerData.contactName,
      contactEmail: customerData.contactEmail,
      customerGroup: customerData.customerGroup,
      contactPhone: customerData.contactPhone,
      customerSegment: customerData.customerSegment,
      regionOrState: customerData.regionOrState,
      country: customerData.country,
    };
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateKITCustomer(kitDBId, data)
        .then((result) => {
          // setValue("machine");
          setValue("estimation");
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          handleSnack("success", "Customer details updated!");
        })
        .catch((err) => {
          handleSnack(
            "error",
            "Error occurred while updating the customer data!"
          );
        });
    }
  };

  // Machine search based on model and serial number
  const handleMachineSearch = async (searchMachinefieldName, searchText) => {
    // console.log("cleared the result", searchText);
    let searchQueryMachine = "";
    setSearchModelResults([]);
    setSearchSerialResults([]);

    if (searchMachinefieldName === "model") {
      machineData.model = searchText;
      searchQueryMachine = searchText
        ? searchMachinefieldName + "~" + searchText
        : "";
    } else if (searchMachinefieldName === "serialNo") {
      machineData.serialNo = searchText;
      searchQueryMachine = searchText
        ? machineData.model
          ? `model:${machineData.model} AND equipmentNumber~` + searchText
          : "equipmentNumber~" + searchText
        : "";
    }
    // console.log("search query", searchQueryMachine);
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
    updateKITCoverage(kitDBId, data)
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

  // Select machine from the search result
  const handleModelSelect = (type, currentItem) => {
    if (type === "model") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
      });
      setSearchModelResults([]);
    } else if (type === "model-coverage") {
      setCoverageRowData({
        ...coverageRowData,
        model: currentItem.model,
      });
      setSearchModelResults([]);
    } else if (type === "equipmentNumber") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        serialNo: currentItem.equipmentNumber,
        smu: currentItem.sensorId,
        make: currentItem.maker,
        family: currentItem.market,
        productSegment: currentItem.productSegment,
        productGroup: currentItem.productGroup,
      });
      setSearchSerialResults([]);
    }
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

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };
  const updateMachineData = () => {
    let data = {
      id: kitDBId,
      make: machineData.make,
      family: machineData.family,
      model: machineData.model,
      fleetNo: machineData.fleetNo,
      smu: machineData.smu,
      registrationNo: machineData.registrationNo,
      chasisNo: machineData.chasisNo,
      serialNo: machineData.serialNo,
      productGroup: machineData.productGroup,
      productSegment: machineData.productSegment,
    };
    updateKITMachine(kitDBId, data)
      .then((result) => {
        setValue("estimation");
        setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
        handleSnack("success", "Machine details updated!");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating the machine data!");
      });
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

  const updateGeneralData = () => {
    let data = {
      id: kitDBId,
      estimationDate: generalData.estimationDate,
      description: generalData.description,
      reference: generalData.reference,
      validityDays: generalData.validity?.value,
      estimationNumber: generalData.estimationNo,
      owner: generalData.owner,
      application: generalData.application?.value,
      nextRivisionDate: generalData.nextRivisionDate,
    };
    updateKITGeneralDet(kitDBId, data)
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

  const updateEstData = () => {
    let data = {
      id: kitDBId,
      preparedBy: estimationData.preparedBy,
      preparedOn: estimationData.preparedOn,
      revisedBy: estimationData.revisedBy,
      revisedOn: estimationData.revisedOn,
      approver: estimationData.approvedBy,
      salesOffice: estimationData.salesOffice?.value,
    };
    updateKITEstimation(kitDBId, data)
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

  const updatePriceData = () => {
    let data = {
      kitDBId,
      priceMethod: pricingData.priceMethod?.value,
      currency: pricingData.currency?.value,
      priceDate: pricingData.priceDate,
      adjustedPrice:
        pricingData.priceMethod?.value === "FLAT_RATE"
          ? pricingData.adjustedPrice
          : 0,
    };
    updateKITPrice(kitDBId, data)
      .then((result) => {
        // setValue("price");
        fetchAllDetails(kitDBId, generalData.version);
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
  // Logic to make the header tabs editable
  const makeHeaderEditable = () => {
    if (value === "customer" && viewOnlyTab.custViewOnly)
      setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
    else if (value === "machine" && viewOnlyTab.machineViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        machineViewOnly: false,
      });
    else if (value === "estimation" && viewOnlyTab.estViewOnly)
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
  };

  const populateHeader = (result) => {
    setViewOnlyTab({
      custViewOnly: result.customerId ? true : false,
      machineViewOnly: result.serialNo ? true : false,
      generalViewOnly: result.estimationDate ? true : false,
      estViewOnly: result.preparedBy ? true : false,
      priceViewOnly:
        result.priceMethod !== "EMPTY" &&
        result.priceMethod !== null &&
        result.priceMethod !== ""
          ? true
          : false,
    });
    setRating(result.rating);
    setSelKITStatus(
      builderStatusOptions.filter((x) => x.value === result.status)[0]
    );
    setVersion(
      versionOptions.find((element) => element.value === result.version)
    );
    // let versions = result.versionList?.map((versionNo) => ({
    //   value: versionNo,
    //   label: "Version " + versionNo,
    // }));
    // setBuilderVersionOptions(versions);
    // setSelectedVersion({
    //   label: "Version " + result.versionNumber,
    //   value: result.versionNumber,
    // });

    setCustomerData({
      customerID: result.customerId,
      contactEmail: result.contactEmail,
      contactName: result.contactName,
      contactPhone: result.contactPhone,
      customerGroup: result.customerGroup,
      customerName: result.customerName,
      source: result.source ? result.source : "User Generated",
      customerSegment: result.customerSegment,
      country: result.country,
      regionOrState: result.regionOrState,
    });
    setMachineData({
      make: result.make,
      family: result.family,
      model: result.model,
      serialNo: result.serialNo,
      fleetNo: result.fleetNo,
      smu: result.smu,
      registrationNo: result.registrationNo,
      chasisNo: result.chasisNo,
      productSegment: result.productSegment,
      productGroup: result.productGroup,
    });
    setGeneralData({
      description: result.description,
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.estimationNumber,
      reference: result.reference,
      validity: validityOptions.find(
        (element) => element.value == result.validityDays
      ),
      version: result.version,
      application: APPLICATION_OPTIONS.find(
        (element) => element.value === result.application
      ),
      owner: result.owner,
      nextRivisionDate: result.nextRivisionDate
        ? result.nextRivisionDate
        : new Date(), // Change it to created date + 1 year once API is ready
    });
    setEstimationData({
      approvedBy: result.approver,
      preparedBy: result.preparedBy,
      preparedOn: result.preparedOn ? result.preparedOn : new Date(),
      revisedBy: result.revisedBy,
      revisedOn: result.revisedOn ? result.revisedOn : new Date(),
      salesOffice: salesOfficeOptions.find(
        (element) => element.value === result.salesOffice
      ),
    });
    setPricingData({
      priceDate: result.priceDate ? result.priceDate : new Date(),
      priceMethod: priceMethodOptions.find(
        (element) => element.value === result.priceMethod
      ),
      netPrice: result.netPrice ? result.netPrice : 0.0,
      adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
      currency: currencyOptions.find(
        (element) => element.value === result.currency
      ),
    });
    setSelectedCoverageData(result.coverages);
  };

  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];

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
  const fileTypes = ["JPG", "PNG", "GIF"];
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
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedCoverageData([]);
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
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
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
    //       <div>Serial No</div>
    //     </>
    //   ),
    //   selector: (row) => row.bundleId,
    //   sortable: true,
    //   maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
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
    console.log("handleEditIncludeSerialNo row:", row);
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
      maxWidth: "50px",
      minWidth: "50px",
      cell: (row) => <Checkbox className="text-black" {...label} />,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Group Number
          </div>
        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      maxWidth: "150px",
      minWidth: "150px",
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Type
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
          <div>
            <img className="mr-2" src={boxicon}></img>Part Number
          </div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => (
        <a href="#" data-toggle="modal" data-target="#Recommended">
          3
        </a>
      ),
    },
    {
      name: (
        <>
          <div>Qty</div>
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
          <div>Unit of Measures</div>
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
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => (
        <a href="#" data-toggle="modal" data-target="#Substitute">
          3
        </a>
      ),
    },
    {
      name: (
        <>
          <div>Extended Price</div>
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
          <div>Currency</div>
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
          <div>% Usage</div>
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
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.part,
      wrap: true,
      sortable: true,
      format: (row) => row.part,
    },
    {
      name: (
        <>
          <div>Comments</div>
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
          <div>Action</div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      cell: (row) => (
        <a onClick={() => setOpen2(true)} href="#">
          <FontAwesomeIcon icon={faPen} />
        </a>
      ),
      format: (row) => row.bundleId,
    },
  ];
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
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [showRelatedModel, setShowRelatedModel] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [selectedCoverageData, setSelectedCoverageData] = useState([]);
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [count, setCount] = useState(1);
  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCreate = () => {
    history.push("/quoteTemplate");
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
  ];
  const handleRowClick = (e) => {
    setShow(true);
  };
  const handleUpdateCoverage = () => {
    const newCoverageArr = selectedCoverageData.map((obj) => {
      if (obj.id === coverageRowData.id) {
        return { ...obj, ...coverageRowData };
      }
      return obj;
    });
    updateKITCoverage(kitDBId, newCoverageArr)
      .then((res) => {
        setSelectedCoverageData(res.coverages);
      })
      .catch((e) => {
        handleSnack("err", "Error occurred while updating the data");
      });
  };
  const [show, setShow] = React.useState(false);
  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Kits</h5>
              <div className="d-flex justify-content-center align-items-center">
                {/* <div className="ml-3"><a href="#" className="bg-yellow text-white btn-sm rounded-pill">* Gold <KeyboardArrowDownIcon className="font-size-14"/></a></div> */}
                <div className="ml-3">
                  <Select
                    className="customselectbtn1"
                    onChange={(e) => handleVersionKit(e)}
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
                  <Menu
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
                    <MenuItem>Templates</MenuItem>
                    <MenuItem>Standard Job</MenuItem>
                    <MenuItem>Kit</MenuItem>
                    <MenuItem data-toggle="modal" data-target="#quotecreat">
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
                <a href="#" className="ml-2">
                  <MuiMenuComponent options={activityOptions} />
                </a>
              </div>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3">Header</span>
                <a href="#" className="btn-sm">
                  <i
                    className="fa fa-pencil"
                    aria-hidden="true"
                    onClick={() => makeHeaderEditable()}
                  ></i>
                </a>{" "}
                <a href="#" className="btn-sm">
                  <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                </a>{" "}
                <a href="#" className="btn-sm">
                  <i class="fa fa-folder-o" aria-hidden="true"></i>
                </a>
              </div>
              <div className="hr"></div>
            </h5>
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              {headerLoading ? (
                <LoadingProgress />
              ) : (
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="custom-tabs-div"
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Customer" value="customer" />
                      {/* <Tab label="Machine " value="machine" /> */}
                      <Tab label="Estimation Details" value="estimation" />
                      <Tab label="General Details" value="general" />
                      <Tab label="Price" value="price" />
                      <Tab label="Coverage" value="coverage" />
                    </TabList>
                  </Box>
                  <TabPanel value="customer">
                    {!viewOnlyTab.custViewOnly ? (
                      <>
                        <div className="row input-fields">
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                SOURCE
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control border-radius-10 text-primary"
                                id="customer-src"
                                placeholder="Placeholder (Required)"
                                value={customerData.source}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER ID
                              </label>
                              <SearchBox
                                value={customerData.customerID}
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
                                value={customerData.customerName}
                                name="customerName"
                                onChange={handleCustomerDataChange}
                                className="form-control border-radius-10 text-primary"
                                id="customerNameid"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group w-100">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CONTACT NAME
                              </label>
                              <input
                                type="text"
                                value={customerData.contactName}
                                name="contactName"
                                onChange={handleCustomerDataChange}
                                className="form-control border-radius-10 text-primary"
                                id="contactNameid"
                                placeholder="Placeholder (Required)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CONTACT EMAIL
                              </label>
                              <input
                                type="email"
                                value={customerData.contactEmail}
                                name="contactEmail"
                                onChange={handleCustomerDataChange}
                                className="form-control border-radius-10 text-primary"
                                id="contatEmail"
                                placeholder="Placeholder (Required)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CONTACT PHONE
                              </label>
                              <input
                                type="tel"
                                className="form-control border-radius-10 text-primary"
                                onChange={handleCustomerDataChange}
                                value={customerData.contactPhone}
                                name="contactPhone"
                                placeholder="Phone (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER GROUP
                              </label>
                              <input
                                type="text"
                                value={customerData.customerGroup}
                                name="customerGroup"
                                onChange={handleCustomerDataChange}
                                className="form-control border-radius-10 text-primary"
                                id="custGroup"
                                placeholder="Placeholder (Required)"
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
                            disabled={
                              !(
                                customerData.source &&
                                customerData.contactEmail &&
                                customerData.customerGroup &&
                                customerData.contactName
                              ) || noOptionsCust
                            }
                            onClick={updateCustomerData}
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
                              SOURCE
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.source}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CUSTOMER ID
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.customerID}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CUSTOMER NAME
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.customerName}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CUSTOMER EMAIL
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.contactEmail}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CONTACT NAME
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.contactName}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CONTACT PHONE
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.contactPhone}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CUSTOMER GROUP
                            </p>
                            <h6 className="font-weight-500">
                              {customerData.customerGroup}
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="machine">
                    {!viewOnlyTab.machineViewOnly ? (
                      <>
                        <div className="row input-fields">
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
                                value={machineData.make}
                                onChange={handleMachineDataChange}
                                placeholder="Auto Filled"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                Family
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                id="family-id"
                                name="family"
                                value={machineData.family}
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
                                value={machineData.model}
                                onChange={(e) =>
                                  handleMachineSearch("model", e.target.value)
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
                                value={machineData.serialNo}
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
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                SMU (Service Meter Unit)
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                id="smu-id"
                                name="smu"
                                value={machineData.smu}
                                onChange={handleMachineDataChange}
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                UNIT NO / FLEET NO
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                onChange={handleMachineDataChange}
                                value={machineData.fleetNo}
                                name="fleetNo"
                                id="fleet-id"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                REGISTRATION NO
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                onChange={handleMachineDataChange}
                                value={machineData.registrationNo}
                                name="registrationNo"
                                id="registration-id"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                CHASIS NO
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                id="chasis-id"
                                onChange={handleMachineDataChange}
                                value={machineData.chasisNo}
                                name="chasisNo"
                                placeholder="Placeholder (Optional)"
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
                            disabled={
                              !(machineData.model && machineData.serialNo) ||
                              noOptionsModel ||
                              noOptionsSerial
                            }
                            onClick={updateMachineData}
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
                              Make
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.make}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              Family
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.family}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              MODEL
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.model}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              SERIAL NO
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.serialNo}{" "}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              SMU (Service Meter Unit)
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.smu}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              {" "}
                              UNIT NO / FLEET NO
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.fleetNo}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              REGISTRATION NO
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.registrationNo}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CHASSIS NO
                            </p>
                            <h6 className="font-weight-500">
                              {machineData.chasisNo}
                            </h6>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabPanel>
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
                              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  inputProps={{ style: FONT_STYLE }}
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  label=""
                                  value={estimationData.preparedOn}
                                  onChange={(e) =>
                                    setEstimationData({
                                      ...estimationData,
                                      preparedOn: e,
                                    })
                                  }
                                />
                              </MuiPickersUtilsProvider> */}
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
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                APPLICATION
                              </label>
                              <Select
                                // defaultValue={selectedOption}
                                onChange={(e) =>
                                  setGeneralData({
                                    ...generalData,
                                    application: e,
                                  })
                                }
                                options={APPLICATION_OPTIONS}
                                placeholder="Required"
                                value={generalData.application}
                                styles={FONT_STYLE_SELECT}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6">
                            <div className="align-items-center date-box">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                <span className=" mr-2">
                                  NEXT REVISION DATE
                                </span>
                              </label>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
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
                          <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                OWNER
                              </label>
                              <input
                                type="text"
                                value={generalData.owner}
                                name="owner"
                                onChange={(e) =>
                                  setGeneralData({
                                    ...generalData,
                                    owner: e.target.value,
                                  })
                                }
                                className="form-control border-radius-10 text-primary"
                                placeholder="Placeholder (Required)"
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
                                  pricingData.priceMethod?.value === "FLAT_RATE"
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
                            onClick={() => setOpen3(true)}
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

                    {/* <div className="row" style={{ display: "none" }}>
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

                        </div>
                      </div>
                      <div className="col-md-4 col-sm-3">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            MODEL(S)
                          </label>
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
                    </div> */}

                    {/* {isView ? (
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
                    )} */}

                    {/* <div className="row" style={{ justifyContent: "right" }}>
                      {selectedCoverageData.length > 0 ? (
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
                    </div> */}
                  </TabPanel>
                </TabContext>
              )}
            </Box>
          </div>
          <div className="card border mt-4 px-4">
            <div className="row align-items-center">
              <div className="col-8">
                <div className="d-flex align-items-center w-100">
                  <div
                    className="d-flex mr-3 col-auto pl-0"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-black">
                      <span>Parts Table</span>
                    </h5>
                    <Select
                      className="customselectbtn1 col-auto"
                      onChange={(e) => handleVersionKit(e)}
                      options={versionOptions}
                      value={version}
                    />
                    <p className=" mb-0">
                      <a href="#" className="ml-3">
                        <FontAwesomeIcon icon={faPen} />
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
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
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
                          className="btn-sm text-black border mr-2"
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
                            fill="black"
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
                </div>
              </div>
              <div className="col-4">
                <div className="text-right pl-3 py-3">
                  <a
                    className="btn bg-primary text-white"
                    data-toggle="modal"
                    data-target="#Datatable"
                  >
                    <SearchIcon />
                    <span className="ml-1">Search</span>
                  </a>
                  <a
                    onClick={() => setOpen3(true)}
                    style={{ cursor: "pointer" }}
                    className="btn bg-primary text-white mx-2"
                  >
                    Upload
                  </a>
                  <a
                    onClick={() => setOpen2(true)}
                    href="#"
                    className="btn bg-primary text-white "
                  >
                    + Add Part
                  </a>
                </div>
              </div>
            </div>

            <DataTable
              className="mr-2"
              title=""
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
            />
            <div className=" my-3 text-right">
              <a href="#" className="btn text-white bg-primary">
                Save
              </a>
            </div>
          </div>
          <Modal
            show={open2}
            onHide={handleClose2}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>
                1000-Engine|23-Replace Engine|Replace Engine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i>
                    <span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span
                      className="ml-2 cursor"
                      data-toggle="modal"
                      data-target="#Recommended"
                    >
                      Substitute parts
                    </span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span
                      className="ml-2 cursor"
                      data-toggle="modal"
                      data-target="#Substitute"
                    >
                      Recommended price
                    </span>
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
                  </span>
                  <span>
                    <SellOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Split price</span>
                  </span> */}
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          GROUP NUMBER
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="1000 ENGINE"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TYPE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="0123 REPLACE"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          PART NUMBER
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Replace left side of the Engine"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          QTY
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="List Price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT OF MEASURES
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="$35000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="$35000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="$10000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CURRENCY
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="$5000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          % USAGE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="EA"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          COMMENTS
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="PAYER TYPE"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          DESCRIPTION
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="PAYER TYPE"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a
                    href="#"
                    onClick={handleClose2}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </a>
                  <a href="#" className="btn text-white bg-primary">
                    Save
                  </a>
                </div>
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
            <Modal.Header>
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
                  Single upload file should not be more than 10MB. Only the
                  .xls, .xlsx file types are allowed
                </p>
              </div>
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 ">
                      <FontAwesomeIcon
                        className=" font-size-14"
                        icon={faFileAlt}
                      />
                      <span className="font-weight-500 ml-2">
                        Engine Partlist
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
                  <p className="font-size-12 mb-0">Part List </p>
                </div>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 ">
                      <FontAwesomeIcon
                        className=" font-size-14"
                        icon={faFileAlt}
                      />
                      <span className="font-weight-500 ml-2">
                        Engine Partlist
                      </span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="white-space custom-checkbox">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="" />
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
                  <p className="font-size-12 mb-0">Part List </p>
                </div>
              </div>
            </Modal.Body>
            <div className="row m-0 p-3">
              <div className="col-md-6 col-sm-6">
                <button
                  className="btn border w-100 bg-white"
                  onClick={handleClose}
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

          {/* comment below code on 12/08 */}
        </div>
        <div
          class="modal fade"
          id="Substitute"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header p-0 ">
                <div
                  className="card w-100 p-2 m-0"
                  style={{ backgroundColor: "#F3F4FE" }}
                >
                  <div className="d-flex justify-content-between mt-3 px-3">
                    <h6>RECOMMENDED DISCOUNT PRICE</h6>
                    <a href="">$500</a>
                  </div>
                  <p className="mt-2 px-3">
                    The best suited discount for this type of quotation.
                  </p>
                  <div className="mx-3 mb-3">
                    <button
                      className="btn border w-100 bg-white"
                      style={{ borderRadius: "0.5rem" }}
                    >
                      Apply recommendation
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-body m-2">
                <div className="card w-100 border mb-0">
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5  pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2 ">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">New</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">20%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Refurb</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">30%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Reman</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">40%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 mb-5">
                <button
                  className="btn border w-100 text-white bg-primary"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <span className="mr-2">
                    <CheckOutlinedIcon />
                  </span>
                  Apply selection
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="Recommended"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header p-4">
                <div className="card w-100 border mb-0">
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">New</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">20%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Refurb</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">30%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Reman</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">40%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 mb-5">
                <button
                  className="btn border w-100 text-white bg-primary"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <span className="mr-2">
                    <CheckOutlinedIcon />
                  </span>
                  Apply selection
                </button>
              </div>
            </div>
          </div>
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
                      <label className="text-light-dark font-size-12 font-weight-500">
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
                      <label className="text-light-dark font-size-12 font-weight-500">
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
                      <label className="text-light-dark font-size-12 font-weight-500">
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
                      <label className="text-light-dark font-size-12 font-weight-500">
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
    </>
  );
}

export default Kits;
