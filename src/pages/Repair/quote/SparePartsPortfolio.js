import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import FormGroup from "@mui/material/FormGroup";
import Select from "react-select";
import Select1 from "@mui/material/Select";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useHistory } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import DataTable from "react-data-table-component";
import { FileUploader } from "react-drag-drop-files";
// import MuiMenuComponent from "../Operational/MuiMenuComponent";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import editIcon from "../../../assets/icons/svg/edit.svg";
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  FONT_STYLE_UNIT_SELECT,
  OPTIONS_LEADTIME_UNIT,
  STATUS_OPTIONS,
} from "../CONSTANTS";
// import SearchBox from "../ /components/SearchBox";
import SearchBox from "pages/Repair/components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";

import searchstatusIcon from "../../../assets/icons/svg/search-status.svg";
import $ from "jquery";
import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
  getConvertQuoteData,
  solutionQuoteCreation,
} from "../../../services/index";
import SelectFilter from "react-select";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { toast } from "react-toastify";
import { QUOTE_SPARE_PARTS_TEMPLATE } from "navigation/CONSTANTS";
import { ReadOnlyField } from "../components/ReadOnlyField";
import { updateQuoteHeader } from "services/repairQuoteServices";
import Validator from "utils/validator";
import Moment from "react-moment";
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

export function SparePartsPortfolio(props) {
  const history = useHistory();
  const { state } = props.location;
  console.log("props are : ", props);

  const [age, setAge] = React.useState("5");
  const [age1, setAge1] = React.useState("5");
  const [age2, setAge2] = React.useState("5");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [quoteId, setQuoteId] = useState(0);

  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [searchCustResults, setSearchCustResults] = useState([]);

  const [headerLoading, setHeaderLoading] = useState(false);

  // Customer Tab Data
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

  // Machine Tab Data
  const [machineData, setMachineData] = useState({
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
  });

  // Estimate Details Tab Data
  const [estimateDetails, setEstimateDetails] = useState({
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    salesOffice: "",
  });
  const [shippingDetail, setShippingDetail] = useState({
    deliveryType: "",
    deliveryPriority: "",
    leadTime: "",
    serviceRecipientAddress: "",
    unit: "",
  });
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  // General Details Tab Data
  const [generalDetails, setGeneralDetails] = useState({
    quoteDate: new Date(),
    quote: "",
    description: "",
    reference: "",
    validity: "",
    version: "",
    salesOffice: "",
  });

  const generalValidityOptions = [
    { label: "Allowed", value: "ALLOWED" },
    { label: "Denied", value: "DENIED" },
    { label: "Indeterminate", value: "INDETERMINATE" },
  ];
  const deliveryTypeOptions = [
    { value: "standard", label: "Standard" },
    { value: "express", label: "Express" },
  ];
  const deliveryPriorityOptions = [
    { value: "urgent", label: "Urgent" },
    { value: "normal", label: "Normal" },
    { value: "very_urgent", label: "Very Urgent" },
  ];
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
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };

  // Handle Save & Next Click
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
          // setQuoteDataId(solutionRes.data.quoteId);
          //   setPortfolioId(solutionRes.data.portfolioId);
          //   setNameIsNotEditAble(true);
        }
      } else if (e.target.id === "machine") {
        setValue("estimationDetails");
      } else if (e.target.id === "estimationDetails") {
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
  const rows4 = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
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
  const masterColumns = [
    {
      name: (
        <>
          <div>Id</div>
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
          <div>Description</div>
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
          <div>Version</div>
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
          <div>Task type</div>
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
          <div>Qty</div>
        </>
      ),
      selector: (row) => row.noOfEvents,
      wrap: true,
      sortable: true,
      format: (row) => row.noOfEvents,
    },
    {
      name: (
        <>
          <div>Model</div>
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
          <div>Serial No.</div>
        </>
      ),
      selector: (row) => row.totalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.totalPrice,
    },
    {
      name: (
        <>
          <div>Valid From</div>
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
          <div>Valid To</div>
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
          <div>Unit Price</div>
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
          <div>Extended Price</div>
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
          <div>Discount</div>
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
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.Comments,
      wrap: true,
      sortable: true,
      format: (row) => row.Comments,
    },
    // {
    //     name: (
    //         <>
    //             <div>Actions</div>
    //         </>
    //     ),
    //     selector: (row) => row.Actions,
    //     wrap: true,
    //     sortable: true,
    //     format: (row) => row.Actions,
    // },
  ];

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };

  const [quoteVersionOptions, setQuoteVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });
  const [selQuoteStatus, setSelQuoteStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const handleVersion = (e) => {
    setSelectedVersion(e);
    // fetchBuilderVersionDet(builderId, e.value).then((result) => {
    //   populateHeader(result);
    // });
  };
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const [value, setValue] = React.useState("customer");

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const [savedQuoteDetails, setSavedQuoteDetails] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleCoveragetable = () => setOpenCoveragetable(false);
  const [subQuoteItems, setSubQuoteItems] = useState([]);

  useEffect(() => {
    if (state && state.type === "new") {
      // setPortfolioId(state.portfolioId);
      // setGeneralData({ ...generalData, estimationNo: state.builderId });
    } else if (state) {
      setQuoteId(state.quoteId);
      fetchAllDetails(state.quoteId);
    }
  }, []);
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchAllDetails = async (quoteDataId) => {
    console.log("quoteDataId --- ", quoteDataId);
    if (quoteDataId) {
      setHeaderLoading(true);
      await getConvertQuoteData(quoteDataId)
        .then((result) => {
          populateHeader(result);
        })
        .catch((err) => {
          handleSnack("error", "Error occured while fetching header details");
        });
      setHeaderLoading(false);
    }
  };

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
      shippingViewOnly: result.leadTime ? true : false,
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
    populateShippingData(result);
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
  const populateShippingData = async (result) => {
    let serviceRecipientAddress = "";
    if (result.customerId) {
      await customerSearch("customerId:" + result.customerId)
        .then((searchRes) => {
          console.log(searchRes);
          if (searchRes) {
            serviceRecipientAddress =
              searchRes[0].serviceRecipent + " " + searchRes[0].contactAddress;
          }
        })
        .catch((e) => {
          serviceRecipientAddress = "";
        });
    }
    setShippingDetail({
      deliveryPriority: result.deliveryPriority ? result.deliveryPriority : "",
      deliveryType: result.deliveryType ? result.deliveryType : "",
      leadTime: result.leadTime ? result.leadTime : "",
      serviceRecipientAddress: result.serviceRecipientAddress
        ? result.serviceRecipientAddress
        : serviceRecipientAddress,
    });
  };

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

  const fileTypes = ["JPG", "PNG", "GIF"];
  const columns = [
    { field: "GroupNumber", headerName: "Group Number", flex: 1, width: 70 },
    { field: "Type", headerName: "Type", flex: 1, width: 130 },
    { field: "Partnumber", headerName: "Part number", flex: 1, width: 130 },
    {
      field: "PriceExtended",
      headerName: "Price Extended",
      flex: 1,
      width: 130,
    },
    {
      field: "Pricecurrency",
      headerName: "Price currency",
      flex: 1,
      width: 130,
    },
    { field: "Usage", headerName: "Usage", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Total Price", flex: 1, width: 130 },
    { field: "Comments", headerName: "Comments", flex: 1, width: 130 },
    { field: "Actions", headerName: "Actions", flex: 1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
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
  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    // console.log("clear data", searchText);
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          setSearchCustResults(result);
        })
        .catch((e) => {
          handleSnack(
            "error",
            true,
            "Error occurred while searching the customer!"
          );
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
      // customerGroup: currentItem.priceGroup,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
    });
    setSearchCustResults([]);
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    // console.log("customerData conatct value : ",value)
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Select machine from the search result
  const handleModelSelect = (type, currentItem) => {
    if (type === "model") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        smu: currentItem.sensorId,
      });
      setSearchModelResults([]);
    } else if (type === "equipmentNumber") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        serialNo: currentItem.equipmentNumber,
        smu: currentItem.sensorId,
      });
      setSearchSerialResults([]);
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

  //Individual Estimate Details field value change
  const handleEstimateDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimateDetails({
      ...machineData,
      [name]: value,
    });
  };

  //Individual General Details field value change
  const handleGeneralDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setGeneralDetails({
      ...machineData,
      [name]: value,
    });
  };

  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };

  const handleSnack = (snackSeverity, snackStatus, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(snackStatus);
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
  const [count, setCount] = useState(1);
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const [selectedMasterData, setSelectedMasterData] = useState([]);
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
  const [filterMasterData, setFilterMasterData] = useState([]);

  const [masterData, setMasterData] = useState([]);
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
        handleSnack("success", "General details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the general details!"
        );
      });
  };
  const updateShippingData = () => {
    let data = {
      ...savedQuoteDetails,
      deliveryType: shippingDetail.deliveryType?.value,
      deliveryPriority: shippingDetail.deliveryPriority?.value,
      leadTime: shippingDetail.leadTime + shippingDetail.unit?.value,
      serviceRecipientAddress: shippingDetail.serviceRecipientAddress,
    };
    updateQuoteHeader(quoteId, data)
      .then((result) => {
        setSavedQuoteDetails(result);
        setViewOnlyTab({ ...viewOnlyTab, shippingViewOnly: true });
        handleSnack("success", "Shipping details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the shipping details!"
        );
      });
  };
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0" style={{ fontSize: "20px" }}>
              Spare Parts Quote
            </h5>
            <div className="d-flex">
              {/*                           
                            <div>
                            <Button className="btn bg-primary text-white px-2 py-1 font-size-12"
                                id="fade-button"
                                aria-controls={open2 ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open2 ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Convert to<span><ExpandMoreIcon className="ml-2"/></span>
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open2}
                                onClose={handleClose2}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose2}> Standard job</MenuItem>
                                <MenuItem onClick={handleClose2}>Kit</MenuItem>
                                <MenuItem data-toggle="modal" data-target="#quotecreat" onClick={handleClose2}>Quote</MenuItem>
                            </Menu>
                            </div> */}

              <div className="d-flex justify-content-center align-items-center">
                {/* <a href={undefined} className="cursor btn ml-3 font-size-14 bg-primary text-white" onClick={goToSolution}>GO TO SOLUTION</a> */}
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
                {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
              </div>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0 bg-primary p-3 border-radius-10">
              <div className="" style={{ display: "contents" }}>
                <span
                  className="mr-3 text-white"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    whiteSpace: "pre",
                  }}
                >
                  Quote Header
                </span>
                <a href="#" className="btn-sm text-white">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </a>
                <a href="#" className="btn-sm text-white">
                  <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                </a>
                {/* <a href="#" className="btn-sm text-white"><img style={{ width: '14px' }} src={folderaddIcon}></img></a> */}
              </div>
              {/* <div className="hr" style={{backgroundColor:"#fff"}}></div> */}
              {/* <div class="input-group icons border-radius-10 border">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={searchLogo} /></span>
                                </div>
                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                            </div> */}
            </h5>
            <Box
              className="mt-4 tab2"
              sx={{ width: "100%", typography: "body1" }}
            >
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
                    <Tab label="Price" value="price" className="heading-tabs" />
                    <Tab
                      label="Shipping / Billing"
                      value="shipping"
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
                      <div className="row" style={{ justifyContent: "right" }}>
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
                                handleMachineSearch("serialNo", e.target.value)
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
                      <div className="row" style={{ justifyContent: "right" }}>
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
                      <div className="row" style={{ justifyContent: "right" }}>
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
                              value={parseFloat(selectedVersion.value).toFixed(
                                1
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
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
                          ACCOUNT NAME
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
                          BILLING FREQUENCY
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
                          <MonetizationOnOutlinedIcon className="text-light font-size-36" />
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
                <TabPanel value="shipping">
                  {!viewOnlyTab.shippingViewOnly ? (
                    <>
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
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SERVICE RECEPIENT ADDRESS
                            </label>
                            <input
                              class="form-control border-radius-10 text-primary"
                              value={shippingDetail.serviceRecipientAddress}
                              onChange={(e) =>
                                setShippingDetail({
                                  ...shippingDetail,
                                  serviceRecipientAddress: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
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
                          onClick={updateShippingData}
                          disabled={
                            !shippingDetail.deliveryPriority ||
                            !shippingDetail.deliveryType ||
                            !shippingDetail.leadTime ||
                            !shippingDetail.serviceRecipientAddress
                          }
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
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
                    </div>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          {/* <div className="card px-4 pb-4 mt-5 pt-0">
                        <div className="row align-items-center p-3">
                            <div className="col-1">
                                <div className="d-flex ">
                                    <h5 className="mr-4 mb-0"><span style={{ fontSize: "18px", whiteSpace: "pre" }}>Quote Item</span></h5>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="d-flex justify-content-between align-items-center w-100 ml-4">
                                    <div className="row align-items-center m-0 ">
                                        {querySearchSelector.map((obj, i) => {
                                            return (
                                                <>
                                                    <div className="customselect border-primary d-flex align-items-center mr-3 my-2 border-radius-10">
                                                        {i > 0 ? (
                                                            <SelectFilter
                                                                isClearable={true}
                                                                defaultValue={{ label: "And", value: "AND" }}
                                                                options={[
                                                                    { label: "And", value: "AND", id: i },
                                                                    { label: "Or", value: "OR", id: i },
                                                                ]}
                                                                placeholder="Search By.."
                                                                onChange={(e) => handleOperator(e, i)}
                                                               
                                                                value={obj.selectOperator}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}

                                                        <div>
                                                            <SelectFilter
                                                                options={[
                                                                    { label: "Make", value: "make", id: i },
                                                                    { label: "Family", value: "family", id: i },
                                                                    { label: "Model", value: "model", id: i },
                                                                    { label: "Prefix", value: "prefix", id: i },
                                                                ]}
                                                                placeholder="Search By.."
                                                                onChange={(e) => handleFamily(e, i)}
                                                                value={obj.selectFamily}
                                                            />
                                                        </div>
                                                        <div className="customselectsearch customize">
                                                            <span className="search-icon-postn"><SearchIcon className="text-primary" /></span>
                                                            <input
                                                                className="custom-input-sleact "
                                                                style={{ position: "relative" }}
                                                                type="text"
                                                                placeholder="Search Parts"
                                                                value={obj.inputSearch}
                                                                onChange={(e) => handleInputSearch(e, i)}
                                                                id={"inputSearch-" + i}
                                                                autoComplete="off"
                                                            />
                                                            <div className="bg-primary text-white btn"><span className="mr-2"><AddIcon /></span>Add Item</div>

                                                            {
                                                                <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}>
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
                                                className="btn-sm text-primary border mr-2"
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
                                                    fill="#872ff7"
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
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-2">
                                <div className="d-flex align-items-center justify-content-end">
                                  
                                    <a href="#" data-toggle="modal" data-target="#myModal12" className=" btn bg-primary text-white">+ Upload</a>

                                </div>
                            </div>
                        </div>
                        <DataTable
                            className=""
                            title=""
                            columns={masterColumns}
                            data={rows}
                            customStyles={customStyles}
                            pagination
                            selectableRows
                        />
                        <div className="my-2">
                            <Link to="/QuoteSolutionBuilder" style={{ cursor: 'pointer' }} className=" pull-right btn bg-primary text-white">
                                Next</Link>
                        </div>
                    </div> */}
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
                      {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
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
                      {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
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
                  {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
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
                              <MenuItem value={22}>
                                Twenty one and a half
                              </MenuItem>
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
                  style={{
                    height: 400,
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
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
                      <p class="font-size-12 font-weight-600 mb-2">
                        QUOTE TYPE{" "}
                      </p>
                      <h6 class="font-weight-600">
                        Repair Quote with Spare Parts
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-600 mb-2">Quote ID </p>
                      <h6 class="font-weight-600">SB12345</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-600 mb-2">
                        QUOTE DESCRIPTION
                      </p>
                      <h6 class="font-weight-600">Holder text</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-600 mb-2">REFERENCE</p>
                      <h6 class="font-weight-600">Holder text</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer" style={{ display: "unset" }}>
                <div>
                  <a
                    href={QUOTE_SPARE_PARTS_TEMPLATE}
                    className="my-2 btn bg-primary d-block text-white"
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
          class="modal right fade"
          id="myModal12"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModal12"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div
                class="modal-header"
                style={{ borderBottom: "1px solid #872ff7" }}
              >
                <h4 class="modal-title text-primary" id="myModal12">
                  Order Details
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" className="text-primary">
                    &times;
                  </span>
                </button>
              </div>

              <div class="modal-body">
                <div className="p-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Description</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>REPLACE ENGINE 797</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Service Organisation</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>ESPERENCE (SV71)</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>SERIAL NUMBER#</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>LAJ00632</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Customer</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>207039 CHINALCO BEJING</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Model</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>797</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Manufacturer</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>Caterpillar</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Price Method</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>Sale Price</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Price Type</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>List Price</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Net Price</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$50000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Estimated External Service Purchase $</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$5000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Estimated Labour</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$10000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Estimated Parts</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$35000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Adjusted Price</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$48000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Discounts</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>$2000</b>
                    </h6>
                  </div>
                  <div className="hr"></div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 ">
                      <span>Margin</span>
                    </p>
                    <h6 className="mb-0 ">
                      <b>32%</b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
