import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/EditOutlined";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  FONT_STYLE_UNIT_SELECT,
  OPTIONS_LEADTIME_UNIT,
  STATUS_OPTIONS,
} from "../CONSTANTS";
import Tab from "@mui/material/Tab";
import { customerSearch, machineSearch } from "services/searchServices";
import { toast } from "react-toastify";
import { solutionQuoteCreation } from "../../../services/index";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Select1 from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import DateFnsUtils from "@date-io/date-fns";
import Menu from "@mui/material/Menu";
import SearchBox from "pages/Repair/components/SearchBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@mui/icons-material/Add";
import { styled, alpha } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";
import boxicon from "../../../assets/icons/png/box.png";
import { FileUploader } from "react-drag-drop-files";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputLabel from "@mui/material/InputLabel";
import Select from "react-select";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DataTable from "react-data-table-component";
import FormControlLabel from "@mui/material/FormControlLabel";
import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import { MuiMenuComponent } from "pages/Operational";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import HexagonOutlinedIcon from "@mui/icons-material/HexagonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useHistory } from "react-router-dom";
import {
  fetchQuoteDetails,
  updateQuoteHeader,
} from "services/repairQuoteServices";
import { ReadOnlyField } from "../components/ReadOnlyField";
import Moment from "react-moment";
import { Tooltip } from "@mui/material";
import LoadingProgress from "../components/Loader";
import Validator from "utils/validator";
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

const RepairBuilderRepairOption = (props) => {
  const history = useHistory();
  const { state } = props.location;
  const [quoteId, setQuoteId] = useState("");
  const [open1, setOpen1] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const [customerData, setCustomerData] = useState({
    source: "User Generated",
    // source: "",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
  });
  useEffect(() => {
    console.log(state);
    if (state) {
      setQuoteId(state.quoteId);
      fetchAllDetails(state.quoteId);
    }
    // setActiveElement({...activeElement, builderType: state.builderType })
  }, []);
  const validityOptions = [
    { value: 15, label: "15 days" },
    { value: 30, label: "1 month" },
    { value: 45, label: "45 days" },
    { value: 60, label: "2 months" },
  ];
  const paymentTermOptions = [
    { value: 0, label: "Immediate" },
    { value: 90, label: "90 Days" },
    { value: 60, label: "60 days" },
    { value: 30, label: "30 Days" },
  ];
  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];
  const deliveryTypeOptions = [
    { value: "standard", label: "Standard" },
    { value: "express", label: "Express" },
  ];
  const deliveryPriorityOptions = [
    { value: "urgent", label: "urgent" },
    { value: "normal", label: "normal" },
    { value: "very_urgent", label: "very_urgent" },
  ];
  const [quoteVersionOptions, setQuoteVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });
  const handleVersion = (e) => {
    setSelectedVersion(e);
    // fetchBuilderVersionDet(builderId, e.value).then((result) => {
    //   populateHeader(result);
    // });
  };
  const fetchAllDetails = async (quoteId) => {
    // var versionHistoryData = {
    //   builderId: "",
    //   exitingType: "repair",
    //   editable: false,
    // };
    // localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
    if (quoteId) {
      setHeaderLoading(true);
      await fetchQuoteDetails(quoteId)
        .then((result) => {
          setQuoteId(result.quoteId);
          populateHeader(result);
        })
        .catch((err) => {
          console.log(err);
          handleSnack("error", "Error occured while fetching header details");
        });
      setHeaderLoading(false);
    }
  };
  const [selQuoteStatus, setSelQuoteStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [savedQuoteDetails, setSavedQuoteDetails] = useState([]);
  const [viewOnlyTab, setViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
    shippingViewOnly: false,
  });
  const populateHeader = (result) => {
    setSavedQuoteDetails(result);
    console.log("Header Details", result);
    setViewOnlyTab({
      custViewOnly: result.customerId ? true : false,
      machineViewOnly: result.serialNumber ? true : false,
      generalViewOnly: result.quoteDate ? true : false,
      estViewOnly: result.preparedBy ? true : false,
      priceViewOnly:
        result.priceMethod !== "EMPTY" &&
        result.priceMethod !== null &&
        result.priceMethod !== ""
          ? true
          : false,
    });
    setQuoteId(result.quoteId);
    setSelQuoteStatus(
      STATUS_OPTIONS.filter((x) => x.value === result.status)[0]
    );
    let versions = result.versionList?.map((versionNo) => ({
      value: versionNo,
      label: "Version " + versionNo,
    }));
    if (versions) setQuoteVersionOptions(versions);
    setSelectedVersion({
      label: "Version " + result.versionNumber,
      value: result.versionNumber,
    });

    populateCustomerData(result);
    populateMachineData(result);
    populateGeneralData(result);
    populateEstData(result);
    populatePricingData(result);
  };
  const populateCustomerData = (result) => {
    setCustomerData({
      customerID: result.customerId ? result.customerId : "",
      contactEmail: result.contactEmail ? result.contactEmail : "",
      contactName: result.contactName ? result.contactName : "",
      contactPhone: result.contactPhone ? result.contactPhone : "",
      customerGroup: result.customerGroup ? result.customerGroup : "",
      customerName: result.customerName ? result.customerName : "",
      source: result.source ? result.source : "User Generated",
      customerSegment: result.customerSegment ? result.customerSegment : "",
      country: result.country ? result.country : "",
      regionOrState: result.regionOrState ? result.regionOrState : "",
    });
    setSearchCustResults([]);
  };
  const populateMachineData = (result) => {
    setMachineData({
      make: result.make ? result.make : "",
      family: result.family ? result.family : "",
      model: result.model ? result.model : "",
      serialNo: result.serialNumber ? result.serialNumber : "",
      fleetNo: result.fleetNo ? result.fleetNo : "",
      smu: result.smu ? result.smu : "",
      registrationNo: result.registrationNo ? result.registrationNo : "",
      chasisNo: result.chasisNo ? result.chasisNo : "",
      productSegment: result.productSegment ? result.productSegment : "",
      productGroup: result.productGroup ? result.productGroup : "",
    });
    setSearchModelResults([]);
    setSearchSerialResults([]);
  };
  const populateGeneralData = (result) => {
    setGeneralDetails({
      description: result.description ? result.description : "",
      reference: result.reference ? result.reference : "",
      quoteDate: result.quoteDate ? result.quoteDate : new Date(),
      quoteNo: result.quoteId ? result.quoteId : "",
      validity:
        result.validityDays && result.validityDays !== "EMPTY"
          ? validityOptions.find(
              (element) => element.value === result.validityDays
            )
          : { label: "", value: "" },
      version: result.version ? result.version : "",
    });
  };
  const populateEstData = (result) => {
    setEstimateDetails({
      approvedBy: result.approver ? result.approver : "",
      preparedBy: result.preparedBy ? result.preparedBy : "",
      preparedOn: result.preparedOn ? result.preparedOn : new Date(),
      revisedBy: result.revisedBy ? result.revisedBy : "",
      revisedOn: result.revisedOn ? result.revisedOn : new Date(),
      salesOffice: result.salesOffice
        ? salesOfficeOptions.find(
            (element) => element.value === result.salesOffice
          )
        : { label: "", value: "" },
    });
  };
  const populatePricingData = (result) => {
    // setPricingData({
    //   priceDate: result.priceDate ? result.priceDate : new Date(),
    //   priceMethod:
    //     result.priceMethod && result.priceMethod !== "EMPTY"
    //       ? priceMethodOptions.find(
    //           (element) => element.value === result.priceMethod
    //         )
    //       : { label: "", value: "" },
    //   netPrice: result.netPrice ? result.netPrice : 0.0,
    //   adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
    //   currency: result.currency
    //     ? currencyOptions.find((element) => element.value === result.currency)
    //     : { label: "", value: "" },
    // });
  };
  const [headerLoading, setHeaderLoading] = useState(false);
  const [quoteDataId, setQuoteDataId] = useState(0);
  // Machine search based on model and serial number
  const handleMachineSearch = async (searchMachinefieldName, searchText) => {
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

  const handleSnack = (snackSeverity, snackStatus, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(snackStatus);
  };
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
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
  const [searchCustResults, setSearchCustResults] = useState([]);
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      // customerGroup: currentItem.priceGroup,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
    });
    setSearchCustResults([]);
  };
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    // console.log("customerData conatct value : ",value)
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };
  const [estimateDetails, setEstimateDetails] = useState({
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    salesOffice: null,
  });
  const [machineData, setMachineData] = useState({
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
  });
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };
  // Select machine from the search result
  const handleModelSelect = (type, currentItem) => {
    if (type === "model") {
      setMachineData({
        ...machineData,
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
        productGroup: currentItem.productGroup,
        productSegment: currentItem.productSegment,
      });
      setSearchSerialResults([]);
    }
  };
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [generalDetails, setGeneralDetails] = useState({
    quoteDate: new Date(),
    quoteNo: "",
    description: "",
    reference: "",
    validity: "",
    version: "",
  });
  const [billingDetail, setBillingDetail] = useState({
    priceDate: new Date(),
    paymentTerm: "",
    currency: "",
    billingType: "",
    billingFrequency: "",
    netPrice: "",
    margin: "",
    discount: "",
  });
  const [shippingDetail, setShippingDetail] = useState({
    deliveryType: "",
    deliveryPriority: "",
    leadTime: "",
    serviceRecipientAddress: "",
    unit:""
  });
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const handleEstimateDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimateDetails({
      ...machineData,
      [name]: value,
    });
  };

  const handleNextClick = async (e) => {
    try {
      if (e.target.id === "customer") {
        //
        if (customerData.customerID === "") {
          throw "Customer ID must not be Empty.";
        }

        let solutionQuoteObj = {
          quoteType: "SOLUTION_QUOTE",
          source: customerData.source,
          customerId: customerData.customerID,
          model: machineData.model,
          serialNumber: machineData.serialNo,
          smu: machineData.smu,
          fleetNo: machineData.fleetNo,
          registrationNo: machineData.registrationNo,
          chasisNo: machineData.chasisNo,
          preparedBy: estimateDetails.preparedBy,
          approvedBy: estimateDetails.approvedBy,
          preparedOn: estimateDetails.preparedOn,
          revisedBy: estimateDetails.revisedBy,
          revisedOn: estimateDetails.revisedOn,
          salesOffice: estimateDetails.salesOffice,
          quoteDate: generalDetails.quoteDate,
          description: generalDetails.description,
          reference: generalDetails.reference,
          validity:
            generalDetails.validity != "" ? generalDetails.validity : "ALLOWED",
          version: generalDetails.version,
          netPrice: 0,
          priceDate: "",
          costPrice: 0,
          priceMethod: "LIST_PRICE",
          adjustedPrice: 0,
          currency: "",
          status: "PENDING_ACTIVE",
          tenantId: 74,
          sbQuoteItems: [],
          rbQuoteItems: [],
          plQuoteItems: [],
        };

        const solutionRes = await solutionQuoteCreation(solutionQuoteObj);
        if (solutionRes.status === 200) {
          toast(`👏 Quote Created Successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setValue("machine");
          // setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
          //   setGeneralComponentData({
          //     ...generalComponentData,
          //     portfolioId: solutionRes.data.portfolioId,
          //   });
          setQuoteDataId(solutionRes.data.quoteId);
          //   setPortfolioId(solutionRes.data.portfolioId);
          //   setNameIsNotEditAble(true);
        }
      } else if (e.target.id === "machine") {
        setValue("estimation");
      } else if (e.target.id === "estimation") {
        setValue("generalDetails");
      } else if (e.target.id === "generalDetails") {
        setValue("price");
      } else if (e.target.id === "price") {
        setValue("shipping_billing");
      } else if (e.target.id === "shipping_billing") {
        console.log("final");
      }
      console.log("e.target.id", e.target.id);
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
  const rows4 = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
  ];
  const rows3 = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
  ];
  const masterColumns3 = [
    {
      name: (
        <>
          <div>Price Breakup</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price Summary Type</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Estimated $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Discounts %</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ];
  const masterColumns4 = [
    {
      name: (
        <>
          <div>Other Misc Type $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ];
  const rows2 = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
  ];
  const masterColumns2 = [
    {
      name: (
        <>
          <div>Payers</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Billing Split %</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ];

  const handleGeneralDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setGeneralDetails({
      ...machineData,
      [name]: value,
    });
  };
  const handleOpen = () => setShow(true);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleClose1 = () => {
    setShow(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const makeHeaderEditable = () => {
    console.log(value);
    if (value === "customer" && viewOnlyTab.custViewOnly)
      setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
    else if (value === "machine" && viewOnlyTab.machineViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        machineViewOnly: false,
      });
    else if (value === "estimation" && viewOnlyTab.estViewOnly) {
      console.log(value);
      setViewOnlyTab({ ...viewOnlyTab, estViewOnly: false });
    } else if (value === "general" && viewOnlyTab.generalViewOnly)
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [value, setValue] = React.useState("customer");
  const steps = [
    "Draft",
    "Reviewed",
    "Sent to Costomer",
    "In revision",
    "Revised",
    "Accepted",
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updateCustomerData = () => {
    let data = {
      ...savedQuoteDetails,
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
    console.log(data);
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateQuoteHeader(quoteId, data)
        .then((result) => {
          setSavedQuoteDetails(result);
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          setValue("machine");
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
  const activityOptions = ["None", "Atria", "Callisto"];

  const handleResetData = (action) => {
    if (action === "RESET") {
      value === "customer" && populateCustomerData(savedQuoteDetails);
      value === "machine" && populateMachineData(savedQuoteDetails);
      value === "general" && populateGeneralData(savedQuoteDetails);
      value === "estimation" && populateEstData(savedQuoteDetails);
      value === "price" && populatePricingData(savedQuoteDetails);
    } else if (action === "CANCEL") {
      populateHeader(savedQuoteDetails);
    }
    // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
  };
  const updateMachineData = () => {
    let data = {
      ...savedQuoteDetails,
      make: machineData.make,
      family: machineData.family,
      model: machineData.model,
      fleetNo: machineData.fleetNo,
      smu: machineData.smu,
      registrationNo: machineData.registrationNo,
      chasisNo: machineData.chasisNo,
      serialNumber: machineData.serialNo,
      productGroup: machineData.productGroup,
      productSegment: machineData.productSegment,
    };
    updateQuoteHeader(quoteId, data)
      .then((result) => {
        setSavedQuoteDetails(result);
        setValue("estimation");
        setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
        handleSnack("success", "Machine details updated!");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating the machine data!");
      });
  };
  const updateGeneralData = () => {
    let data = {
      ...savedQuoteDetails,
      quoteDate: generalDetails.quoteDate,
      description: generalDetails.description,
      reference: generalDetails.reference,
      validityDays: generalDetails.validity?.value,
    };
    updateQuoteHeader(quoteId, data)
      .then((result) => {
        setSavedQuoteDetails(result);
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
      ...savedQuoteDetails,
      preparedBy: estimateDetails.preparedBy,
      preparedOn: estimateDetails.preparedOn,
      revisedBy: estimateDetails.revisedBy,
      revisedOn: estimateDetails.revisedOn,
      approver: estimateDetails.approvedBy,
      salesOffice: estimateDetails.salesOffice?.value,
    };
    updateQuoteHeader(quoteId, data)
      .then((result) => {
        setSavedQuoteDetails(result);
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
  // Update the status of the quote : Active, Revised etc.
  const handleQuoteStatus = async (e) => {
    // await updateBuilderStatus(bId, e.value)
    //   .then((result) => {
    setSelQuoteStatus(e);
    handleSnack("success", "Status has been updated!");
    // })
    // .catch((err) => {
    //   handleSnack("error", `Failed to update the status!`);
    // });
  };
  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0" style={{ fontSize: "18px" }}>
              Repair Option
            </h5>
            <div className="d-flex justify-content-center align-items-center">
              <div className="ml-3">
                <Select
                  className="customselectbtn"
                  onChange={(e) => handleVersion(e)}
                  options={quoteVersionOptions}
                  value={selectedVersion}
                />
              </div>

              <div className="ml-3">
                <Select
                  className="customselectbtn"
                  onChange={(e) => handleQuoteStatus(e)}
                  // isOptionDisabled={(e) => disableStatusOptions(e)}
                  options={STATUS_OPTIONS}
                  value={selQuoteStatus}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="ml-3 font-size-14" title="Share">
                <img src={shareIcon}></img>
              </a>
              <a href="#" className="ml-3 font-size-14" title="Items to review">
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
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
              <div className="" style={{ display: "contents" }}>
                <span
                  className="mr-3 ml-2 text-white"
                  style={{ fontSize: "20px" }}
                >
                  Quote Header
                </span>
                <div className="btn-sm cursor text-white">
                  <Tooltip title="Edit">
                    <EditIcon onClick={() => makeHeaderEditable()} />
                  </Tooltip>
                </div>
                {/* <div className="btn-sm cursor text-white">
                      <Tooltip title="Reset">
                        <ReplayIcon onClick={() => handleResetData("RESET")} />
                      </Tooltip>
                    </div>
                    <div className="btn-sm cursor text-white">
                      <Tooltip title="Share">
                        <ShareOutlinedIcon />
                      </Tooltip>
                    </div>

                    <div className="btn-sm cursor text-white">
                      <Tooltip title="Add to Review">
                        <ReviewAddIcon />
                      </Tooltip>
                    </div> */}
              </div>
              {/* <div className="hr"></div> */}
            </h5>
            <Box
              className="mt-4 tab2"
              sx={{ width: "100%", typography: "body1" }}
            >
              {headerLoading ? (
                <LoadingProgress />
              ) : (
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className=""
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="Customer"
                        value="customer"
                        className="heading-tabs"
                      />
                      <Tab
                        label="Machine "
                        value="machine"
                        className="heading-tabs"
                      />
                      <Tab
                        label="Estimation Details"
                        value="estimation"
                        className="heading-tabs"
                      />
                      <Tab
                        label="General Details"
                        value="general"
                        className="heading-tabs"
                      />
                      <Tab
                        label="Billing"
                        value="price"
                        className="heading-tabs"
                      />
                      <Tab
                        label="Shipping"
                        value="shipping_billing"
                        className="heading-tabs"
                      />
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
                                value={customerData.source}
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
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
                                  handleCustSearch("customerId", e.target.value)
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
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
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
                                aria-describedby="emailHelp"
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
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
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "right" }}
                        >
                          <button
                            type="button"
                            className="btn btn-light bg-primary text-white mr-1"
                            onClick={() => handleResetData("CANCEL")}
                          >
                            Cancel
                          </button>
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
                        <ReadOnlyField
                          label="SOURCE"
                          value={customerData.source}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CUSTOMER ID"
                          value={customerData.customerID}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CUSTOMER NAME"
                          value={customerData.customerName}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CUSTOMER EMAIL"
                          value={customerData.contactEmail}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CONTACT NAME"
                          value={customerData.contactName}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CONTACT PHONE"
                          value={customerData.contactPhone}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CUSTOMER GROUP"
                          value={customerData.customerGroup}
                          className="col-md-4 col-sm-4"
                        />
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
                              <div className="css-w8dmq8">*Mandatory</div>
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
                              <div className="css-w8dmq8">*Mandatory</div>
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
                            className="btn btn-light bg-primary text-white mr-1"
                            onClick={() => handleResetData("CANCEL")}
                          >
                            Cancel
                          </button>
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
                        <ReadOnlyField
                          label="MAKE"
                          value={machineData.make}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="FAMILY"
                          value={machineData.family}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="MODEL"
                          value={machineData.model}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SERIAL NO"
                          value={machineData.serialNo}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SMU (Service Meter Unit)"
                          value={machineData.smu}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="UNIT NO / FLEET NO"
                          value={machineData.fleetNo}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="REGISTRATION NO"
                          value={machineData.registrationNo}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="CHASSIS NO"
                          value={machineData.chasisNo}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="estimation">
                    {!viewOnlyTab.estViewOnly ? (
                      <>
                        <div className="row mt-4 input-fields">
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              PREPARED BY{" "}
                            </label>
                            <div class="form-group w-100">
                              <input
                                type="email"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                name="preparedBy"
                                value={estimateDetails.preparedBy}
                                onChange={handleEstimateDetailsDataChange}
                                aria-describedby="emailHelp"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              APPROVED BY
                            </label>
                            <div class="form-group w-100">
                              <input
                                type="email"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                name="approvedBy"
                                value={estimateDetails.approvedBy}
                                onChange={handleEstimateDetailsDataChange}
                                aria-describedby="emailHelp"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              PREPARED ON
                            </label>
                            <div className="d-flex align-items-center date-box w-100">
                              <div class="form-group w-100">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    label=""
                                    name="preparedOn"
                                    value={estimateDetails.preparedOn}
                                    onChange={(e) =>
                                      setEstimateDetails({
                                        ...estimateDetails,
                                        preparedOn: e,
                                      })
                                    }
                                  />
                                </MuiPickersUtilsProvider>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REVISED BY
                            </label>
                            <div class="form-group w-100">
                              <input
                                type="email"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                name="revisedBy"
                                value={estimateDetails.revisedBy}
                                onChange={handleEstimateDetailsDataChange}
                                aria-describedby="emailHelp"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REVISED ON
                            </label>
                            <div className="d-flex align-items-center date-box w-100">
                              <div class="form-group w-100">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    label=""
                                    name="revisedOn"
                                    value={estimateDetails.revisedOn}
                                    onChange={(e) =>
                                      setEstimateDetails({
                                        ...estimateDetails,
                                        revisedOn: e,
                                      })
                                    }
                                  />
                                </MuiPickersUtilsProvider>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              SALES OFFICE / BRANCH
                            </label>
                            <div class="form-group w-100">
                              <Select
                                onChange={(e) =>
                                  setEstimateDetails({
                                    ...estimateDetails,
                                    salesOffice: e,
                                  })
                                }
                                options={salesOfficeOptions}
                                value={estimateDetails.salesOffice}
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
                            className="btn btn-light bg-primary text-white mr-1"
                            onClick={() => handleResetData("CANCEL")}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            onClick={updateEstData}
                            disabled={
                              !estimateDetails.preparedBy ||
                              !estimateDetails.preparedOn ||
                              !estimateDetails.salesOffice
                            }
                          >
                            Save & Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="row mt-4">
                        <ReadOnlyField
                          label="PREPARED BY"
                          value={estimateDetails.preparedBy}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="APPROVED BY"
                          value={estimateDetails.approvedBy}
                          className="col-md-4 col-sm-4"
                        />

                        <ReadOnlyField
                          label="PREPARED ON"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {estimateDetails.preparedOn}
                            </Moment>
                          }
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="REVISED BY"
                          value={estimateDetails.revisedBy}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="REVISED ON"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {estimateDetails.revisedOn}
                            </Moment>
                          }
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SALES OFFICE / BRANCH"
                          value={estimateDetails.salesOffice?.label}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="general">
                    {!viewOnlyTab.generalViewOnly ? (
                      <>
                        <div className="row mt-4 input-fields">
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              QUOTE DATE
                            </label>
                            <div className="d-flex align-items-center date-box w-100">
                              <div class="form-group w-100">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    className="form-controldate border-radius-10"
                                    label=""
                                    name="quoteDate"
                                    value={generalDetails.quoteDate}
                                    onChange={(e) =>
                                      setGeneralDetails({
                                        ...generalDetails,
                                        quoteDate: e,
                                      })
                                    }
                                  />
                                </MuiPickersUtilsProvider>
                              </div>
                            </div>
                            {/* <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div> */}
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              QUOTE #
                            </label>
                            <div class="form-group w-100">
                              <input
                                type="email"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                name="quote"
                                value={generalDetails.quote}
                                onChange={handleGeneralDetailsDataChange}
                                aria-describedby="emailHelp"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              QUOTE DESCRIPTION
                            </label>
                            <div class="form-group w-100">
                              <input
                                type="email"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                name="description"
                                value={generalDetails.description}
                                onChange={handleGeneralDetailsDataChange}
                                aria-describedby="emailHelp"
                                placeholder="Placeholder (Optional)"
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REFERENCE
                            </label>
                            <div class="form-group w-100">
                              <input
                                class="form-control border-radius-10 text-primary"
                                name="reference"
                                value={generalDetails.reference}
                                onChange={handleGeneralDetailsDataChange}
                              />
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                VALIDITY
                              </label>
                              <Select
                                // defaultValue={selectedOption}
                                onChange={(e) =>
                                  setGeneralDetails({
                                    ...generalDetails,
                                    validity: e,
                                  })
                                }
                                options={validityOptions}
                                value={generalDetails.validity}
                                styles={FONT_STYLE_SELECT}
                              />
                              <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                VERSION
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                disabled
                                value={parseFloat(
                                  selectedVersion.value
                                ).toFixed(1)}
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
                            className="btn btn-light bg-primary text-white mr-1"
                            onClick={() => handleResetData("CANCEL")}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            onClick={updateGeneralData}
                            disabled={
                              !generalDetails.quoteDate ||
                              !generalDetails.description ||
                              !generalDetails.quoteNo ||
                              !generalDetails.reference ||
                              !generalDetails.validity
                            }
                          >
                            Save & Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="mt-4 row">
                        <ReadOnlyField
                          label="QUOTE DATE"
                          value={
                            <Moment format="DD/MM/YYYY">
                              {generalDetails.quoteDate}
                            </Moment>
                          }
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="Quote #"
                          value={generalDetails.quoteNo}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="QUOTE DESCRIPTION"
                          value={generalDetails.description}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="REFERENCE"
                          value={generalDetails.reference}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="VALIDITY"
                          value={generalDetails.validity?.label}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="VERSION"
                          value={generalDetails.version?.label}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="price">
                    <div class="row mt-4">
                      <div class="col-md-3 col-sm-3">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            PAYMENT TERMS
                          </p>
                          <div>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setBillingDetail({
                                  ...billingDetail,
                                  paymentTerm: e,
                                })
                              }
                              options={paymentTermOptions}
                              value={billingDetail.paymentTerm}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            BILLING FREQUENCY
                          </p>
                          <div>
                            <Select
                              onChange={(e) =>
                                setBillingDetail({
                                  ...billingDetail,
                                  billingFrequency: e,
                                })
                              }
                              options={paymentTermOptions}
                              value={billingDetail.billingFrequency}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            PRICE SEGMENT
                          </p>
                          <div>
                            <FormControl className="customseleact">
                              <Select1
                                className=""
                                multiple
                                displayEmpty
                                value={personName}
                                onChange={handleChange1}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                  if (selected.length === 0) {
                                    return <em>30dayes</em>;
                                  }

                                  return selected.join(", ");
                                }}
                                MenuProps={MenuProps}
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem disabled value="">
                                  <em>30dayes</em>
                                </MenuItem>
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select1>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            NET PRICE
                          </p>
                          <h6 class="font-weight-600">
                            <input
                              class="form-control border-radius-10 text-primary"
                              name="reference"
                              value={billingDetail.netPrice}
                              onChange={(e) =>
                                setBillingDetail({
                                  ...billingDetail,
                                  netPrice: e.target.value,
                                })
                              }
                            />
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            MARGIN (25%)
                          </p>
                          <h6 class="font-weight-600">752.740.10</h6>
                        </div>
                      </div>
                      <div class="col-md-3 col-sm-3">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            FLAT RATE(ALL $)
                          </p>
                          <h6 class="font-weight-600">No</h6>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CURRENCY
                          </p>
                          <div>
                            <FormControl className="customseleact">
                              <Select1
                                className=""
                                multiple
                                displayEmpty
                                value={personName}
                                onChange={handleChange1}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                  if (selected.length === 0) {
                                    return <em>30dayes</em>;
                                  }

                                  return selected.join(", ");
                                }}
                                MenuProps={MenuProps}
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem disabled value="">
                                  <em>30dayes</em>
                                </MenuItem>
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select1>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            PRICE DATE
                          </p>
                          <h6 class="font-weight-600">21.01.2022</h6>
                        </div>
                      </div>
                      <div class="col-md-3 col-sm-3">
                        <div class="form-group ">
                          <p class="font-size-12 font-weight-500 mb-2">
                            DISCOUNT
                          </p>
                          <div>
                            <FormControl className="customseleact position-relative percent-p">
                              <span
                                className="percent-div bg-white p-1 text-primary"
                                style={{ borderRadius: "50%" }}
                              >
                                8%
                              </span>
                              <Select1
                                className="btn bg-green text-white"
                                multiple
                                displayEmpty
                                value={personName}
                                onChange={handleChange1}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                  if (selected.length === 0) {
                                    return <em>30dayes</em>;
                                  }

                                  return selected.join(", ");
                                }}
                                MenuProps={MenuProps}
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem disabled value="">
                                  <em>30dayes</em>
                                </MenuItem>
                                {names.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select1>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <a href="#" className="btn bg-primary text-white">
                      <AddIcon className="mr-2" />
                      ADD PAYER
                    </a>
                    <div className="mt-3">
                      <DataTable
                        className=""
                        title=""
                        columns={masterColumns2}
                        data={rows2}
                        customStyles={customStyles}
                        pagination
                        // onRowClicked={(e) => handleRowClick(e)}
                        selectableRows
                      />
                    </div>
                    <div className="mt-3 d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 font-size-16 font-weight-600">
                        PRICE/ESTIMATE SUMMARY
                      </h6>
                      <div className="d-flex align-items-center">
                        <a href="#" className="text-primary mr-3">
                          <ModeEditOutlineOutlinedIcon />
                        </a>
                        <a href="#" className="text-primary mr-3">
                          <ShareOutlinedIcon />
                        </a>
                        <a href="#" className="btn bg-primary text-white">
                          <AddIcon className="mr-2" />
                          Add Price Summary Type
                        </a>
                      </div>
                    </div>
                    <div className="mt-3">
                      <DataTable
                        className=""
                        title=""
                        columns={masterColumns3}
                        data={rows3}
                        customStyles={customStyles}
                        pagination
                        // onRowClicked={(e) => handleRowClick(e)}
                        selectableRows
                      />
                    </div>
                    <div className="mt-3 d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 font-size-16 font-weight-600">
                        OTHER MISC ITEMS $
                      </h6>
                      <div className="d-flex align-items-center">
                        <a href="#" className="text-primary mr-3">
                          <ModeEditOutlineOutlinedIcon />
                        </a>
                        <a href="#" className="text-primary mr-3">
                          <ShareOutlinedIcon />
                        </a>
                        <a href="#" className="btn bg-primary text-white">
                          <AddIcon className="mr-2" />
                          Add Miscellaenous Type
                        </a>
                      </div>
                    </div>
                    <div className="mt-3">
                      <DataTable
                        className=""
                        title=""
                        columns={masterColumns4}
                        data={rows4}
                        customStyles={customStyles}
                        pagination
                        // onRowClicked={(e) => handleRowClick(e)}
                        selectableRows
                      />
                    </div>
                    {/* <div class="row mt-4 input-fields">
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">NET PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COST PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADJUSTED PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MARGIN</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">COST PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">ADJUSTED PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MARGIN</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">CURRENCY</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <Link className="btn bg-primary text-white pull-right">
                                                    Save & Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div> */}
                  </TabPanel>
                  <TabPanel value="shipping_billing">
                    <div className="row mt-4 input-fields">
                      <div class="col-md-4 col-sm-4">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          DELIVERY TYPE
                        </label>
                        <div class="form-group w-100">
                          <Select
                            onChange={(e) =>
                              setShippingDetail({
                                ...shippingDetail,
                                deliveryType: e,
                              })
                            }
                            options={deliveryTypeOptions}
                            value={shippingDetail.deliveryType}
                            styles={FONT_STYLE_SELECT}
                          />
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          DELIVERY PRIORITY
                        </label>
                        <div class="form-group w-100">
                          <Select
                            onChange={(e) =>
                              setShippingDetail({
                                ...shippingDetail,
                                deliveryPriority: e,
                              })
                            }
                            options={deliveryPriorityOptions}
                            value={shippingDetail.deliveryPriority}
                            styles={FONT_STYLE_SELECT}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            LEAD TIME
                          </label>
                          <div className="d-flex form-control-date border-radius-10">
                            <input
                              className="form-control border-radius-10 text-primary"
                              type="text"
                              id="startUsage"
                              value={shippingDetail.leadTime}
                              onChange={(e) =>
                                setShippingDetail({
                                  ...shippingDetail,
                                  leadTime: e.target.value,
                                })
                              }
                            />

                            <Select
                              defaultValue={OPTIONS_LEADTIME_UNIT[0]}
                              isSearchable={false}
                              styles={FONT_STYLE_UNIT_SELECT}
                              options={OPTIONS_LEADTIME_UNIT}
                              // className="text-primary"
                              value={shippingDetail.unit}
                              onChange={(e) =>
                                setShippingDetail({
                                  ...shippingDetail,
                                  unit: e,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                    <ReadOnlyField
                          label="DELIVERY TYPE"
                          value={shippingDetail.deliveryType?.label}
                          className="col-md-4 col-sm-4"
                        />
                      <ReadOnlyField
                          label="DELIVERY PRIORITY"
                          value={shippingDetail.deliveryPriority?.label}
                          className="col-md-4 col-sm-4"
                        />
                      <ReadOnlyField
                          label="LEAD TIME"
                          value={shippingDetail.leadTime}
                          className="col-md-4 col-sm-4"
                        />
                        <ReadOnlyField
                          label="SERVICE RECIPIENT ADDRESS"
                          value={shippingDetail.serviceRecipientAddress}
                          className="col-md-4 col-sm-4"
                        />
                      <div className="col-md-12 col-sm-12">
                        <div class="form-group">
                          <Link
                            className="btn bg-primary text-white pull-right"
                            id="shipping_billing"
                            onClick={handleNextClick}
                          >
                            Save & Next
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
              )}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepairBuilderRepairOption;
