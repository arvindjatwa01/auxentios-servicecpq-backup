import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/EditOutlined";
import penIcon from "../../../assets/images/pen.png";
import EYEIcon from "@mui/icons-material/VisibilityOutlined";
import CommentIcon from "@mui/icons-material/Chat";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  FONT_STYLE_UNIT_SELECT,
  GRID_STYLE,
  OPTIONS_LEADTIME_UNIT,
} from "../CONSTANTS";
import Tab from "@mui/material/Tab";
import { customerSearch, machineSearch } from "services/searchServices";
import { toast } from "react-toastify";
import { solutionQuoteCreation } from "../../../services/index";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import DateFnsUtils from "@date-io/date-fns";
import Menu from "@mui/material/Menu";
import SearchBox from "pages/Repair/components/SearchBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from "@mui/icons-material/Add";
import { styled, alpha } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
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
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  selectQuoteDropdownOption,
  selectBillingFreqList,
  selectBillingTypeList,
  selectDelPriorityList,
  selectDelTypeList,
  selectPaymentTermList,
  selectQuoteStatusList,
  selectQuoteValidityList,
} from "pages/Repair/dropdowns/quoteRepairSlice";
import { Link, useHistory } from "react-router-dom";
import {
  addQuoteItem,
  addQuotePayer,
  createQuoteVersion,
  fetchQuoteDetails,
  fetchQuoteSummary,
  fetchQuoteVersions,
  removePayer,
  updatePayerData,
  updateQuoteHeader,
  updateQuoteItem,
} from "services/repairQuoteServices";
import { ReadOnlyField } from "../components/ReadOnlyField";
import Moment from "react-moment";
import { TextareaAutosize, TextField, Tooltip } from "@mui/material";
import LoadingProgress from "../components/Loader";
import Validator from "utils/validator";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import RepairQuoteItemModal from "../components/RepairQuoteItem";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useAppSelector } from "app/hooks";
import ModalCreateVersion from "../components/ModalCreateVersion";
import QuoteSummary from "../components/QuoteSummary";
import { DataGrid } from "@mui/x-data-grid";
import PayerGridTable from "../components/PayerGridTable";
import PriceSummaryTable from "../components/PriceSummaryTable";
import QuotePriceSummaryTable from "../components/QuotePriceSummaryTable ";
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
      minWidth: "100px !important",
      maxWidth: "120px !important",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      borderRight: "1px solid rgba(0,0,0,.12)",
      fontSize: "12px",
      minWidth: "100px !important",
      maxWidth: "120px !important",
    },
  },
};

const RepairQuoteDetails = (props) => {
  const history = useHistory();
  const { state } = props.location;
  const [quoteId, setQuoteId] = useState("");
  const [versionOpen, setVersionOpen] = useState(false);
  const [headerLoading, setHeaderLoading] = useState(false);
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
  const [quoteItems, setQuoteItems] = useState([]);
  // Retrieve delivery types
  const deliveryTypeOptions = useAppSelector(
    selectQuoteDropdownOption(selectDelTypeList)
  );
  // Retrieve delivery priorities
  const deliveryPriorityOptions = useAppSelector(
    selectQuoteDropdownOption(selectDelPriorityList)
  );
  // Retrieve billing types
  const billingTypeOptions = useAppSelector(
    selectQuoteDropdownOption(selectBillingTypeList)
  );
  // Retrieve billing Frequencies
  const billingFreqOptions = useAppSelector(
    selectQuoteDropdownOption(selectBillingFreqList)
  );
  // Retrieve payment terms
  const paymentTermOptions = useAppSelector(
    selectQuoteDropdownOption(selectPaymentTermList)
  );

  //Fetch Status List
  const statusOptions = useAppSelector(
    selectQuoteDropdownOption(selectQuoteStatusList)
  );
  const validityOptions = useAppSelector(
    selectQuoteDropdownOption(selectQuoteValidityList)
  );

  useEffect(() => {
    console.log(state);
    if (state) {
      setQuoteId(state.quoteId);
      fetchAllDetails(state.quoteId);
      fetchSummaryDetails(state.quoteId);
    }
    // setActiveElement({...activeElement, builderType: state.builderType })
  }, []);

  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];
  // const [deliveryTypeOptions, setDelTypeOptions] = useState([]);
  // const [deliveryPriorityOptions, setDelPriorityOptions] = useState([]);
  const [quoteVersionOptions, setQuoteVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });
  const initialQuoteItem = {
    componentCode: "",
    description: "",
    discount: 0,
    itemNo: "",
    labourPrice: 0,
    miscPrice: 0,
    operation: "",
    partListId: "",
    partsPrice: "",
    payerType: "",
    totalPrice: 0,
    adjustedPrice: 0,
    margin: 0,
    // type: '',
    // unit: ''
  };
  const [payers, setPayers] = useState([]);
  const [quoteItemOpen, setQuoteItemOpen] = useState(false);
  const [quoteItemModalTitle, setQuoteItemModalTitle] =
    useState("Add New Quote Item");
  const [quoteItem, setQuoteItem] = useState(initialQuoteItem);
  const handleVersion = (e) => {
    setSelectedVersion(e);
    fetchAllDetails(e.quoteId);
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
          setQuoteItems(result.rbQuoteItems);
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
  const quoteItemsColumns = [
    {
      name: (
        <>
          <div>Component</div>
        </>
      ),
      selector: (row) => row.componentCode,
      wrap: true,
      sortable: true,
      format: (row) => row.componentCode,
    },
    {
      name: (
        <>
          <div>Job Desc.</div>
        </>
      ),
      selector: (row) => row.operation,
      wrap: true,
      sortable: true,
      format: (row) => row.operation,
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
          <div>Part List ID</div>
        </>
      ),
      selector: (row) => row.partListId,
      wrap: true,
      sortable: true,
      format: (row) => row.partListId,
    },
    {
      name: (
        <>
          <div>Parts $</div>
        </>
      ),
      selector: (row) => row.partsPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.partsPrice,
    },
    {
      name: (
        <>
          <div>Labor $</div>
        </>
      ),
      selector: (row) => row.labourPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.labourPrice,
    },
    {
      name: (
        <>
          <div>Misc $</div>
        </>
      ),
      selector: (row) => row.miscPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.miscPrice,
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
          <div>Net Adjusted $</div>
        </>
      ),
      selector: (row) => row.adjustedPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.adjustedPrice,
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
      format: (row) => (row.margin ? row.margin : 30),
    },
    // {
    //   name: (
    //     <>
    //       <div>Payer Type</div>
    //     </>
    //   ),
    //   selector: (row) => row.payerType,
    //   wrap: true,
    //   sortable: true,
    //   format: (row) => row.payerType,
    // },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      width: "30px",
      sortable: true,
      format: (row) => row.action,
      cell: (row) => (
        <div>
          <Tooltip
            title="Edit"
            className="mr-2 cursor"
            onClick={() => openQuoteItemModal(row, "existing")}
          >
            <img className="m-1" src={penIcon} alt="Edit" />
          </Tooltip>
          {/* <Tooltip title="Comment" className="cursor">
            <CommentIcon />
          </Tooltip> */}
        </div>
      ),
    },
  ];
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
    // console.log("Header Details", result);
    setViewOnlyTab({
      custViewOnly: result.customerId ? true : false,
      machineViewOnly: result.serialNumber ? true : false,
      generalViewOnly: result.quoteDate ? true : false,
      estViewOnly: result.preparedBy ? true : false,
      priceViewOnly:
        result.billingType !== "EMPTY" &&
        result.billingType !== null &&
        result.billingType !== ""
          ? true
          : false,
      shippingViewOnly: result.leadTime ? true : false,
    });
    setQuoteId(result.quoteId);
    setPayers(result.payers);
    setSelQuoteStatus(
      statusOptions.filter((x) => x.value === result.status)[0]
    );
    fetchQuoteVersions(result.quoteName).then((versions) => {
      let versionResult = versions.map((versionInd) => ({
        value: versionInd.version,
        label: "Version " + versionInd.version?.substring(8),
        quoteId: versionInd.quoteId,
        quoteName: versionInd.quoteName,
      }));
      // console.log("versions", versionResult);
      if (versionResult) setQuoteVersionOptions(versionResult);
    });

    setSelectedVersion({
      label: "Version " + result.version?.substring(8),
      value: result.version,
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
    if (result.customerName && result.payers.length === 0) {
      addPayerDetails(result.quoteId, result.customerName, 100);
    }
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
      quoteName: result.quoteName ? result.quoteName : "",
      validity:
        result.validity && result.validity !== "EMPTY"
          ? validityOptions.find((element) => element.value === result.validity)
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
      billingFrequency:
        result.billingFrequency && result.billingFrequency !== "EMPTY"
          ? billingFreqOptions.find(
              (element) => element.value === result.billingFrequency
            )
          : { label: "", value: "" },
      billingType:
        result.billingType && result.billingType !== "EMPTY"
          ? billingTypeOptions.find(
              (element) => element.value === result.billingType
            )
          : { label: "", value: "" },
      currency: result.currency,
      discount: result.discount,
      margin: result.margin,
      netPrice: result.netPrice,
      priceEstimates: result.priceEstimates,
      paymentTerms:
        result.paymentTerms && result.paymentTerms !== "EMPTY"
          ? paymentTermOptions.find(
              (element) => element.value === result.paymentTerms
            )
          : { label: "", value: "" },
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
    let leadTimeandUnit = result.leadTime && result.leadTime.split(" ");
    setShippingDetail({
      deliveryPriority: result.deliveryPriority
        ? deliveryPriorityOptions.find(
            (element) => element.value === result.deliveryPriority
          )
        : { label: "", value: "" },
      deliveryType: result.deliveryType
        ? deliveryTypeOptions.find(
            (element) => element.value === result.deliveryType
          )
        : { label: "", value: "" },
      leadTime:
        leadTimeandUnit && leadTimeandUnit.length === 2
          ? leadTimeandUnit[0]
          : "",
      unit:
        leadTimeandUnit && leadTimeandUnit.length === 2
          ? OPTIONS_LEADTIME_UNIT.find(
              (element) => element.value === leadTimeandUnit[1]
            )
          : { label: "Day", value: "DAY" },
      serviceRecipientAddress: result.serviceRecipientAddress
        ? result.serviceRecipientAddress
        : serviceRecipientAddress,
    });
  };
  const addPayerDetails = (id, payerName, billingSplit) => {
    addQuotePayer(id, { payerName, billingSplit })
      .then((addedPayer) => {
        setPayers([addedPayer]);
      })
      .catch((e) => {
        handleSnack("warning", "please check the payer data!");
      });
  };

  const updatePayerDetails = React.useCallback(
    (existingPayerName, payerName) =>
      new Promise((resolve, reject) => {
        console.log(payerName);
        setHeaderLoading(true);
        setPayers(
          payers.map((indPayer) => {
            if (indPayer.payerName === existingPayerName) {
              console.log(payerName);
              updatePayerData(indPayer.payerId, { payerName })
                .then((updatedPayer) => {
                  resolve(updatedPayer);
                })
                .catch((e) => {
                  handleSnack("warning", "please check the payer data!");
                  resolve(indPayer);
                });
            }
          })
        );
        setHeaderLoading(false);
      }),
    [payers]
  );

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

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
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
    quoteName: "",
    description: "",
    reference: "",
    validity: "",
    version: "",
  });
  const [billingDetail, setBillingDetail] = useState({
    priceDate: new Date(),
    paymentTerms: "",
    currency: "",
    billingType: "",
    billingFrequency: "",
    netPrice: "",
    margin: "",
    discount: "",
    priceEstimates: [],
  });
  const [shippingDetail, setShippingDetail] = useState({
    deliveryType: "",
    deliveryPriority: "",
    leadTime: "",
    serviceRecipientAddress: "",
    unit: { label: "Day", value: "DAY" },
  });
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);

  const miscItemRows = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
  ];
  const priceSummaryRows = [
    { id: 1, GroupNumber: "Snow", Type: "Jon", Partnumber: 35 },
    { id: 2, GroupNumber: "Lannister", Type: "Cersei", Partnumber: 42 },
    { id: 3, GroupNumber: "Lannister", Type: "Jaime", Partnumber: 45 },
  ];
  const priceSummaryColumns = [
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
  const miscItemColumns = [
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

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const makeHeaderEditable = () => {
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
    else if (value === "shipping" && viewOnlyTab.shippingViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        shippingViewOnly: false,
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
  const [quoteItemViewOnly, setQuoteItemViewOnly] = useState(false);
  const payerTypeOptions = [
    { label: "Customer", value: "CUSTOMER" },
    { label: "Goodwill", value: "GOODWILL" },
    { label: "Insurer", value: "INSURER" },
  ];
  // Open quote item modal
  const openQuoteItemModal = (row, operation) => {
    // console.log(row);
    setQuoteItem({
      ...row,
      payerType: payerTypeOptions.find(
        (element) => element.value === row.payerType
      ),
      margin: row.margin ? row.margin : 30,
    });
    if (operation === "existing") {
      setQuoteItemModalTitle(
        row?.componentCode + " | " + row?.operation + " | " + row?.description
      );

      setQuoteItemViewOnly(true);
    }
    setQuoteItemOpen(true);
  };
  //Close Quote Item modal
  const handleQuoteItemClose = () => {
    setQuoteItemOpen(false);
    setQuoteItem(initialQuoteItem);
    setQuoteItemViewOnly(false);
    setQuoteItemModalTitle("Add New Quote Item");
  };

  const [value, setValue] = React.useState("customer");
  const steps = [
    "Draft",
    "Reviewed",
    "Sent to Costomer",
    "In revision",
    "Revised",
    "Accepted",
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const updateCustomerData = async () => {
    let existingCustName = savedQuoteDetails.customerName;
    // populate service recipient address
    let serviceRecipientAddress = "";
    if (customerData.customerID) {
      await customerSearch("customerId:" + customerData.customerID)
        .then((searchRes) => {
          if (searchRes) {
            serviceRecipientAddress =
              searchRes[0].serviceRecipent + " " + searchRes[0].contactAddress;
          }
        })
        .catch((e) => {
          serviceRecipientAddress = "";
        });
    }
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
      serviceRecipientAddress,
    };
    setShippingDetail({ ...shippingDetail, serviceRecipientAddress });
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateQuoteHeader(quoteId, data)
        .then((result) => {
          setSavedQuoteDetails(result);
          // To update the first payer name whenever customer name changes
          // payers.map(indPayer => {
          //   if(indPayer.payerName === existingCustName){
          // updatePayerDetails(existingCustName, customerData.customerName);
          //     return {...indPayer, payerName: customerData.customerName}
          //   }

          // })
          console.log(payers);
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
      validity: generalDetails.validity?.value,
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
          "Error occurred while updating the general details!"
        );
      });
  };
  const updateShippingData = () => {
    let data = {
      ...savedQuoteDetails,
      deliveryType: shippingDetail.deliveryType?.value,
      deliveryPriority: shippingDetail.deliveryPriority?.value,
      leadTime: shippingDetail.leadTime + " " + shippingDetail.unit?.value,
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
  const updateBillingData = () => {
    let data = {
      ...savedQuoteDetails,
      billingFrequency: billingDetail.billingFrequency?.value,
      billingType: billingDetail.billingType?.value,
      priceDate: billingDetail.priceDate,
      paymentTerms: billingDetail.paymentTerms?.value,
      currency: billingDetail.currency,
      netPrice: billingDetail.netPrice,
      margin: billingDetail.margin,
      discount: billingDetail.discount,
      priceEstimates: billingDetail.priceEstimates,
    };
    updateQuoteHeader(quoteId, data)
      .then((result) => {
        setSavedQuoteDetails(result);
        setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
        handleSnack("success", "Billing details updated!");
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

  const handleQuoteItemUpdate = async () => {
    if (quoteItemModalTitle !== "Add New Quote Item") {
      await updateQuoteItem(quoteItem.rbQuoteId, {
        ...quoteItem,
        itemType: quoteItem.itemType ? quoteItem.itemType : "RB_ITEM",
        payerType: quoteItem.payerType?.value,
      })
        .then((quoteItem) => {
          fetchAllDetails(quoteId);
          handleSnack("success", "Quote item has been updated successfully!");
        })
        .catch((err) => {
          console.log(err);
          handleSnack("error", "Item update failed!");
        });
    } else {
      console.log(quoteItem);
      await addQuoteItem(quoteId, {
        ...quoteItem,
        itemType: "RB_ITEM",
        payerType: quoteItem.payerType?.value,
      })
        .then((quoteItem) => {
          fetchAllDetails(quoteId);
          handleSnack("success", "Quote item has been added successfully!");
        })
        .catch((err) => {
          console.log(err);
          handleSnack("error", "Add item failed!");
        });
    }
    setQuoteItemOpen(false);
  };
  const createVersion = async () => {
    await createQuoteVersion(
      savedQuoteDetails.quoteName,
      savedQuoteDetails.version,
      newVersion
    )
      .then((result) => {
        setVersionOpen(false);
        setQuoteId(result.quoteId);
        fetchAllDetails(result.id);
        // setVersionDescription("");
        handleSnack(
          "success",
          `Version ${result.version} created successfully`
        );
      })
      .catch((err) => {
        setVersionOpen(false);

        if (err.message === "Not Allowed")
          handleSnack("warning", ERROR_MAX_VERSIONS);
        else
          handleSnack("error", "Error occurred while creating builder version");
        // setVersionDescription("");
      });
  };
  const [quoteSummary, setQuoteSummary] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const fetchSummaryDetails = async (selectedQuoteId) => {
    console.log("ABCD", selectedQuoteId);
    await fetchQuoteSummary(selectedQuoteId)
      .then((summary) => {
        setQuoteSummary(summary);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [newVersion, setNewVersion] = useState("");
  const handleVersionOpen = () => {
    if (quoteVersionOptions.length === 3)
      handleSnack("warning", ERROR_MAX_VERSIONS);
    else {
      if (savedQuoteDetails.version === "VERSION_1") {
        if (quoteVersionOptions.length === 1) setNewVersion("VERSION_2");
        else if (quoteVersionOptions.length === 2) setNewVersion("VERSION_3");
      } else if (savedQuoteDetails.version === "VERSION_2") {
        if (quoteVersionOptions.length === 1) setNewVersion("VERSION_1");
        else if (quoteVersionOptions.length === 2) setNewVersion("VERSION_3");
      }
      setVersionOpen(true);
    }
  };
  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <ModalCreateVersion
        versionOpen={versionOpen}
        handleCloseVersion={() => setVersionOpen(false)}
        message="Another version of this quote will be created."
        handleCreateVersion={createVersion}
        type={"quote"}
        quoteVersionOptions={quoteVersionOptions}
        existingVersion={savedQuoteDetails.version}
        quoteName={savedQuoteDetails.quoteName}
        newVersion={newVersion}
      />
      <QuoteSummary
        summaryOpen={summaryOpen}
        handleSummaryClose={() => setSummaryOpen(false)}
        summary={quoteSummary}
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
                    options={statusOptions}
                    value={selQuoteStatus}
                  />
                </div>
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
              <DropdownButton
                className="customDropdown ml-2"
                id="dropdown-item-button"
              >
                <Dropdown.Item as="button" onClick={handleVersionOpen}>
                  New Versions
                </Dropdown.Item>
                <Dropdown.Item as="button">Show Errors</Dropdown.Item>
                <Dropdown.Item as="button">Review</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
              <div className="row col-md-11">
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
              <div className="col-md-1 text-right">
                <div className="btn-sm cursor text-white">
                  <Tooltip title="Summary">
                    <TextSnippetIcon onClick={() => setSummaryOpen(true)} />
                  </Tooltip>
                </div>
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
                    <TabList className="" onChange={handleChange}>
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
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PREPARED BY
                            </label>
                            <div className="form-group w-100">
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="preparedBy"
                                value={estimateDetails.preparedBy}
                                onChange={(e) =>
                                  setEstimateDetails({
                                    ...estimateDetails,
                                    preparedBy: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              APPROVED BY
                            </label>
                            <div className="form-group w-100">
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="approvedBy"
                                value={estimateDetails.approvedBy}
                                onChange={(e) =>
                                  setEstimateDetails({
                                    ...estimateDetails,
                                    approvedBy: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PREPARED ON
                            </label>
                            <div className="d-flex align-items-center date-box w-100">
                              <div className="form-group w-100">
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
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REVISED BY
                            </label>
                            <div className="form-group w-100">
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="revisedBy"
                                value={estimateDetails.revisedBy}
                                onChange={(e) =>
                                  setEstimateDetails({
                                    ...estimateDetails,
                                    revisedBy: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REVISED ON
                            </label>
                            <div className="d-flex align-items-center date-box w-100">
                              <div className="form-group w-100">
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
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SALES OFFICE / BRANCH
                            </label>
                            <div className="form-group w-100">
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
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              QUOTE DATE
                            </label>
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
                                  value={generalDetails.quoteDate}
                                  onChange={(e) =>
                                    setGeneralDetails({
                                      ...generalDetails,
                                      quoteDate: e,
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
                            <label className="text-light-dark font-size-12 font-weight-500">
                              QUOTE #
                            </label>
                            <div className="form-group w-100">
                              <input
                                type="text"
                                disabled
                                className="form-control border-radius-10 text-primary"
                                name="quote"
                                value={generalDetails.quoteName}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              QUOTE DESCRIPTION
                            </label>
                            <div className="form-group w-100">
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="description"
                                value={generalDetails.description}
                                onChange={(e) =>
                                  setGeneralDetails({
                                    ...generalDetails,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REFERENCE
                            </label>
                            <div className="form-group w-100">
                              <input
                                className="form-control border-radius-10 text-primary"
                                name="reference"
                                value={generalDetails.reference}
                                onChange={(e) =>
                                  setGeneralDetails({
                                    ...generalDetails,
                                    reference: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
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
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                VERSION
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                disabled
                                value={generalDetails.version}
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
                              !generalDetails.quoteName ||
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
                          value={generalDetails.quoteName}
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
                          value={generalDetails.version}
                          className="col-md-4 col-sm-4"
                        />
                      </div>
                    )}
                  </TabPanel>
                  <TabPanel value="price">
                    {!viewOnlyTab.priceViewOnly ? (
                      <>
                        <div className="row mt-4 input-fields">
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
                                      paymentTerms: e,
                                    })
                                  }
                                  options={paymentTermOptions}
                                  value={billingDetail.paymentTerms}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                              <label className="font-size-12 font-weight-500 mb-2">
                                CURRENCY
                              </label>
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
                                  options={billingTypeOptions}
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
                                  options={billingFreqOptions}
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
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                              <p className="font-size-12 font-weight-500 mb-2">
                                MARGIN
                              </p>
                              {/* <h6 className="font-weight-600"> */}
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
                              {/* </h6> */}
                            </div>
                          </div>

                          <div className="col-md-3 col-sm-3">
                            <div className="form-group ">
                              <p className="font-size-12 font-weight-500 mb-2">
                                DISCOUNT
                              </p>
                              {/* <h6 className="font-weight-600"> */}
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
                              {/* </h6> */}
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
                            onClick={updateBillingData}
                            disabled={
                              !billingDetail.paymentTerms ||
                              !billingDetail.billingFrequency ||
                              !billingDetail.billingType
                            }
                          >
                            Save & Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row mt-4">
                          <ReadOnlyField
                            label="PAYMENT TERMS"
                            value={billingDetail.paymentTerms?.label}
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
                        {/* <a href="#" className="btn bg-primary text-white">
                          <AddIcon className="mr-2" />
                          ADD PAYER
                        </a> */}
                        <div className="mt-3">
                          <PayerGridTable
                            handleSnack={handleSnack}
                            dataRows={payers}
                            quoteId={quoteId}
                          />
                        </div>
                        {/* <div className="mt-3 d-flex align-items-center justify-content-between">
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
                        </div> */}
                        <div className="mt-3">
                          <QuotePriceSummaryTable
                            rows={billingDetail.priceEstimates}
                            setRows={(rows) =>
                              setBillingDetail({
                                ...billingDetail,
                                priceEstimates: rows,
                              })
                            }
                          />
                          <div
                            className="row my-3 mr-2"
                            style={{ justifyContent: "right" }}
                          >
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={updateBillingData}
                              disabled={
                                !billingDetail.paymentTerms ||
                                !billingDetail.billingFrequency ||
                                !billingDetail.billingType
                              }
                            >
                              Save Price Summary
                            </button>
                          </div>
                          {/* <DataTable
                            className=""
                            title=""
                            columns={priceSummaryColumns}
                            data={priceSummaryRows}
                            customStyles={customStyles}
                            pagination
                            // onRowClicked={(e) => handleRowClick(e)}
                            selectableRows
                          /> */}
                        </div>
                        {/* <div className="mt-3 d-flex align-items-center justify-content-between">
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
                            columns={miscItemColumns}
                            data={miscItemRows}
                            customStyles={customStyles}
                            pagination
                            // onRowClicked={(e) => handleRowClick(e)}
                            selectableRows
                          />
                        </div> */}
                      </>
                    )}
                  </TabPanel>
                  <TabPanel value="shipping">
                    {!viewOnlyTab.shippingViewOnly ? (
                      <>
                        <div className="row mt-4 input-fields">
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              DELIVERY TYPE
                            </label>
                            <div className="form-group w-100">
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
                          <div className="col-md-4 col-sm-4">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              DELIVERY PRIORITY
                            </label>
                            <div className="form-group w-100">
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
                              <TextareaAutosize
                                className="form-control border-radius-10 text-primary"
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
                          value={
                            shippingDetail.leadTime &&
                            shippingDetail.leadTime +
                              " " +
                              shippingDetail.unit?.label
                          }
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
              )}
            </Box>
          </div>
          <RepairQuoteItemModal
            quoteItem={quoteItem}
            setQuoteItem={setQuoteItem}
            handleQuoteItemUpdate={handleQuoteItemUpdate}
            quoteItemOpen={quoteItemOpen}
            handleQuoteItemClose={handleQuoteItemClose}
            title={quoteItemModalTitle}
            quoteItemViewOnly={quoteItemViewOnly}
            setQuoteItemViewOnly={setQuoteItemViewOnly}
            handleSnack={handleSnack}
          />

          <div className="card px-4 pb-4 mt-5 pt-4">
            <div className="row mb-3">
              <div className="col-md-10 text-black">Quote Items</div>
              <div className="col-md-2">
                <div className="text-right" style={{ justifyContent: "right" }}>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white"
                    onClick={() => openQuoteItemModal("", "new")}
                  >
                    + Quote Item
                  </button>
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </>
  );
};

export default RepairQuoteDetails;
