import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Chat";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import penIcon from "../../../assets/images/pen.png";
// import MuiMenuComponent from "../Operational/MuiMenuComponent";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import cpqIcon from "../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import shareIcon from "../../../assets/icons/svg/share.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import {
    FONT_STYLE,
    FONT_STYLE_SELECT,
    FONT_STYLE_UNIT_SELECT,
    OPTIONS_LEADTIME_UNIT,
    STATUS_OPTIONS
} from "../CONSTANTS";
// import SearchBox from "../ /components/SearchBox";
import SearchBox from "pages/Repair/components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField, Tooltip } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import Moment from "react-moment";
import {
    fetchQuoteDetails,
    updateQuoteHeader
} from "services/repairQuoteServices";
import Validator from "utils/validator";
import { ReadOnlyField } from "../components/ReadOnlyField";
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
  //   console.log("props are : ", props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [quoteItems, setQuoteItems] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [quoteId, setQuoteId] = useState(0);

  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
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
      value === "shipping" && populateShippingData(savedQuoteDetails);
    } else if (action === "CANCEL") {
      populateHeader(savedQuoteDetails);
    }
    // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchAllDetails = async (quoteId) => {
    console.log("quoteDataId --- ", quoteId);
    if (quoteId) {
      setHeaderLoading(true);
      await fetchQuoteDetails(quoteId)
        .then((result) => {
          setQuoteId(result.quoteId);
          populateHeader(result);
          setQuoteItems(result.plQuoteItems);
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
    setBillingDetail({
      priceDate: result.priceDate ? result.priceDate : new Date(),
      billingFrequency: result.billingFrequency,
      billingType: result.billingType,
      currency: result.currency,
      discount: result.discount,
      margin: result.margin,
      netPrice: result.netPrice,
      paymentTerm: result.paymentTerm,
    });
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

  const handleSnack = (snackSeverity, snackStatus, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(snackStatus);
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
  const quoteItemsColumns = [
   
    {
      name: (
        <>
          <div>Group Number</div>
        </>
      ),
      selector: (row) => row.groupNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.groupNumber,
    },
    {
      name: (
        <>
          <div>Type</div>
        </>
      ),
      selector: (row) => row.partType,
      wrap: true,
      sortable: true,
      format: (row) => row.partType,
    },
    {
      name: (
        <>
          <div>Desc</div>
        </>
      ),
      selector: (row) => row.partDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.partDescription,
    },
    {
      name: (
        <>
          <div>Part Number</div>
        </>
      ),
      selector: (row) => row.partNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.partNumber,
    },
    {
      name: (
        <>
          <div>Qty</div>
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
          <div>Sales Unit</div>
        </>
      ),
      selector: (row) => row.salesUnit,
      wrap: true,
      sortable: true,
      format: (row) => row.salesUnit,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row.listPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.listPrice,
    },
    {
        name: (
            <>
            <div>Extended Price</div>
            </>
        ),
        selector: (row) => row.extendedPrice,
        wrap: true,
        sortable: true,
        format: (row) => row.extendedPrice,
    },
    {
        name: (
            <>
            <div>Currency</div>
            </>
        ),
        selector: (row) => row.currency,
        wrap: true,
        sortable: true,
        format: (row) => row.currency,
    },
    {
      name: (
        <>
          <div>Net Price</div>
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
          <div>Net Adjusted Price</div>
        </>
      ),
      selector: (row) => row.extendedPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.extendedPrice,
    },
    {
      name: (
        <>
          <div>Discount</div>
        </>
      ),
      selector: (row) => row.discount,
      wrap: true,
      sortable: true,
      format: (row) => row.discount,
    },
    {
      name: (
        <>
          <div>Margin</div>
        </>
      ),
      selector: (row) => row.margin,
      wrap: true,
      sortable: true,
      format: (row) => row.margin,
    },
    {
      name: (
        <>
          <div>Payer Type</div>
        </>
      ),
      selector: (row) => row.payerType,
      wrap: true,
      sortable: true,
      format: (row) => row.payerType,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.action,
      wrap: true,
      maxWidth: "10px",
      sortable: true,
      format: (row) => row.action,
      cell: (row) => (
        <div>
          <Tooltip
            title="Edit"
            className="mr-2 cursor"
            // onClick={() => openQuoteItemModal(row)}
          >
            <img className="m-1" src={penIcon} alt="Edit" />
          </Tooltip>
          <Tooltip title="Comment" className="cursor">
            <CommentIcon />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Repair Quote</h5>
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
            </div>
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
                              type="text"
                              class="form-control border-radius-10 text-primary"
                              id="exampleInputEmail1"
                              name="quote"
                              value={generalDetails.quoteId}
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
                  {" "}
                  <TabPanel value="price">
                    {!viewOnlyTab.priceViewOnly ? (
                      <div className="row mt-4">
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
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
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              CURRENCY
                            </p>
                            <div>
                              <h6 className="font-weight-600">
                                <input
                                  className="form-control border-radius-10 text-primary"
                                  name="reference"
                                  value={billingDetail.currency}
                                  onChange={(e) =>
                                    setBillingDetail({
                                      ...billingDetail,
                                      currency: e.target.value,
                                    })
                                  }
                                />
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              PRICE DATE
                            </p>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // minDate={generalDetails.quoteDate}
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={billingDetail.priceDate}
                                  onChange={(e) =>
                                    setBillingDetail({
                                      ...billingDetail,
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
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              BILLING TYPE
                            </p>
                            <div>
                              <Select
                                onChange={(e) =>
                                  setBillingDetail({
                                    ...billingDetail,
                                    billingType: e,
                                  })
                                }
                                options={paymentTermOptions}
                                value={billingDetail.billingType}
                                styles={FONT_STYLE_SELECT}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
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

                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              NET PRICE
                            </p>
                            <h6 className="font-weight-600">
                              <input
                                className="form-control border-radius-10 text-primary"
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
                        <div className="col-md-3 col-sm-3">
                          <div className="form-group">
                            <p className="font-size-12 font-weight-500 mb-2">
                              MARGIN
                            </p>
                            <h6 className="font-weight-600">
                              <input
                                className="form-control border-radius-10 text-primary"
                                name="reference"
                                value={billingDetail.margin}
                                onChange={(e) =>
                                  setBillingDetail({
                                    ...billingDetail,
                                    margin: e.target.value,
                                  })
                                }
                              />
                            </h6>
                          </div>
                        </div>

                        <div className="col-md-3 col-sm-3">
                          <div className="form-group ">
                            <p className="font-size-12 font-weight-500 mb-2">
                              DISCOUNT
                            </p>
                            <h6 className="font-weight-600">
                              <input
                                className="form-control border-radius-10 text-primary"
                                name="reference"
                                value={billingDetail.discount}
                                onChange={(e) =>
                                  setBillingDetail({
                                    ...billingDetail,
                                    discount: e.target.value,
                                  })
                                }
                              />
                            </h6>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="row mt-4">
                          <ReadOnlyField
                            label="PAYMENT TERMS"
                            value={billingDetail.paymentTerm?.label}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="CURRENCY"
                            value={billingDetail.currency}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="PRICING DATE"
                            value={
                              <Moment format="DD/MM/YYYY">
                                {billingDetail.priceDate}
                              </Moment>
                            }
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="BILLING TYPE"
                            value={billingDetail.billingType?.label}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="BILLING FREQUENCY"
                            value={billingDetail.billingFrequency?.label}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="NET PRICE"
                            value={billingDetail.netPrice}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="MARGIN"
                            value={billingDetail.margin}
                            className="col-md-4 col-sm-4"
                          />
                          <ReadOnlyField
                            label="DISCOUNT"
                            value={billingDetail.discount}
                            className="col-md-4 col-sm-4"
                          />
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
                      </>
                    )}
                  </TabPanel>
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
        </div>
        <div className="card">
          <div
            className=""
            style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
          >
            <DataTable
              className=""
              title=""
              columns={quoteItemsColumns}
              data={quoteItems}
              customStyles={customStyles}
              pagination
              // onRowClicked={(e) => handleRowClick(e)}
              // selectableRows
            />
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
