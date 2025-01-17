import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Tab from "@mui/material/Tab";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Moment from "react-moment";
import { RenderConfirmDialog } from "pages/Repair/components/ConfirmationBox";
import {
  RemoveSparepart,
  addMultiPartsToPartList,
  addPartToPartList,
  createKIT,
  createPartlistBuilderVersion,
  fetchBuilderDetails,
  fetchBuilderVersionDet,
  fetchPartlistFromBuilder,
  fetchPartsFromPartlist,
  updateBuilderCustomer,
  updateBuilderEstimation,
  updateBuilderGeneralDet,
  updateBuilderMachine,
  updateBuilderPrice,
  updateBuilderStatus,
  uploadPartsToPartlist,
} from "services/repairBuilderServices";
import { useHistory } from "react-router-dom";
import {
  DataGrid,
  GridActionsCellItem,
  getGridStringOperators,
  useGridApiContext,
} from "@mui/x-data-grid";
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  INITIAL_PAGE_NO,
  INITIAL_PAGE_SIZE,
  SPAREPART_SEARCH_Q_OPTIONS,
  STATUS_OPTIONS,
} from "pages/Repair/CONSTANTS";
import {
  customerSearch,
  machineSearch,
  sparePartSearch,
} from "services/searchServices";
import Validator from "utils/validator";
import { createSparePartQuote } from "services/repairQuoteServices";
import { SPARE_PARTS_QUOTE_DETAILS } from "navigation/CONSTANTS";
import {
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  debounce,
  // Rating,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  faCloudUploadAlt,
  faFileAlt,
  faFolderPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/EditOutlined";
import ReplayIcon from "@mui/icons-material/Replay";

import $ from "jquery";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import penIcon from "../../../assets/images/pen.png";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import ModalCreateVersion from "pages/Repair/components/ModalCreateVersion";
import CreateKIT from "pages/Repair/components/CreateKIT";
import ModalShare from "pages/Repair/components/ModalShare";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import LoadingProgress from "pages/Repair/components/Loader";
import SearchBox from "pages/Repair/components/SearchBox";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import PriceMethodTable from "pages/Repair/components/PriceMethodTable";
import PriceSummaryTable from "pages/Repair/components/PriceSummaryTable";
import SearchComponent from "pages/Repair/components/SearchComponent";
import AddNewSparepartModal from "pages/Repair/components/AddNewSparePart";
import { Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from "pages/Operational";
import QuoteModal from "pages/Repair/components/QuoteModal";

function CommentEditInputCell(props) {
  const { id, value, field } = props;
  // console.log(id, value, field);
  const apiRef = useGridApiContext();

  const handleCommentChange = async (event) => {
    // console.log("newValue", event);
    // Explore debounce option
    apiRef.current.setEditCellValue(
      { id, field, value: event.target.value },
      event
    );
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextareaAutosize
        // ref={handleRef}
        name="comment"
        style={{ width: "100%" }}
        value={value}
        onChange={handleCommentChange}
      />
    </Box>
  );
}

const ServiceProgressIssueComponent = (props) => {
  const { edit = false, type = "new" } = props;
  const history = useHistory();
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [partListNo, setPartListNo] = useState("");
  const [partListId, setPartListId] = useState("");
  const [rowsToUpdate, setRowsToUpdate] = useState([]);
  const [value, setValue] = useState("customer");
  const [open, setOpen] = useState(false);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [spareparts, setSpareparts] = useState([]);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [partsLoading, setPartsLoading] = useState(false);
  const [bulkUpdateProgress, setBulkUpdateProgress] = useState(false);
  // const [rating, setRating] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [savedBuilderHeaderDetails, setSavedBuilderHeaderDetails] = useState(
    []
  );
  const [tagClicked, setTagClicked] = useState("");
  const [totalPartsCount, setTotalPartsCount] = useState(0);
  const [filterQuery, setFilterQuery] = useState("");
  const [versionDescription, setVersionDescription] = useState("");
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const activityOptions = ["New Versions", "Show Errors", "Review"];
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [kitOpen, setKitOpen] = useState(false);
  const [kitVersion, setKitVersion] = useState({
    value: "GOLD",
    label: "Gold",
  });
  const [kitReference, setKitReference] = useState("");
  const [kitDescription, setKitDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [viewOnlyTab, setViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
  });

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
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "",
    priceDetailDTO: [],
    priceEstimateDTO: [],
  });
  const initialSparePart = {
    groupNumber: "",
    partType: "",
    partNumber: "",
    quantity: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    unitOfMeasure: "",
    currency: "USD",
    usagePercentage: 0,
    totalPrice: 0.0,
    comment: "",
    description: "",
  };
  const [sparePart, setSparePart] = useState(initialSparePart);
  const [openQuotePopup, setOpenQuotePopup] = useState(false);
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteReference, setQuoteReference] = useState("");
  const [addPartModalTitle, setAddPartModalTitle] = useState("Add Part");
  const [partFieldViewonly, setPartFieldViewonly] = useState(false);
  const validityOptions = [
    { value: 15, label: "15 days" },
    { value: 30, label: "1 month" },
    { value: 45, label: "45 days" },
    { value: 60, label: "2 months" },
  ];

  // TODO: Replace it with tenant details
  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];

  const [builderVersionOptions, setBuilderVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);

  const handleVersion = (e) => {
    setSelectedVersion(e);
    fetchAllDetails(builderId, e.value);
  };

  useEffect(() => {
    if (type === "new") {
      setBuilderId(props.builderId);
      setBId(props.bId);
      setPartListNo(props.partListNo);
      setPartListId(props.partListId);
      setGeneralData({ ...generalData, estimationNo: props.partListId });
      if (type === "new") {
        // fetchAllDetails(state.bId, state.partListNo);
        console.log("Created a new builder");
      }
    }
    // else if (state) {
    //   setHeaderLoading(true);
    //   setBuilderId(props.builderId);
    //   setBId(props.bId);
    //   // setPartListNo(state.partListNo);
    //   setPartListId(props.partListId);
    //   if (props.versionNumber)
    //     fetchAllDetails(props.builderId, props.versionNumber);
    //   else fetchAllDetailsWithDBId(props.bId);
    // }
  }, []);

  const fetchAllDetailsWithDBId = (id) => {
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
    console.log(id);
    if (id) {
      setHeaderLoading(true);
      fetchBuilderDetails(id)
        .then((result) => {
          populateHeader(result);
          setHeaderLoading(false);
          fetchPartlist(result.id);
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
  const fetchAllDetails = (builderId, versionNumber) => {
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
    console.log(builderId, versionNumber);
    if (builderId && versionNumber) {
      setHeaderLoading(true);
      fetchBuilderVersionDet(builderId, versionNumber)
        .then((result) => {
          populateHeader(result);
          setHeaderLoading(false);
          fetchPartlist(result.id);
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

  const filterOperators = getGridStringOperators().filter(({ value }) =>
    ["equals", "contains"].includes(value)
  );
  const fetchPartsOfPartlist = async (partlistId, pageNo, rowsPerPage) => {
    setPartsLoading(true);
    setPage(pageNo);
    setPageSize(rowsPerPage);
    let sort = sortDetail.sortColumn
      ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
      : "&sortColumn=createdAt&orderBY=ASC";
    let filter = filterQuery ? `&search=${filterQuery}` : "";
    const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
    await fetchPartsFromPartlist(partlistId, query)
      .then((partsResult) => {
        setTotalPartsCount(partsResult.totalRows);
        // partsResult.result.map((element, i) => {
        //   // setSlPart((pageNo*rowsPerPage - rowsPerPage) + i)
        //   console.log(pageNo,rowsPerPage, i)
        //   element.rowNum = (((pageNo+1)*rowsPerPage - rowsPerPage) + (i+1)) * 10

        // })
        setSpareparts(partsResult.result);
      })
      .catch((err) => {
        handleSnack("error", "Error occured while fetching parts");
      });
    setPartsLoading(false);
  };
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
  // const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    // console.log("partListNo", partListNo);
    if (partListNo) fetchPartsOfPartlist(partListNo, page, pageSize);
  }, [sortDetail, filterQuery]);

  const populateHeader = (result) => {
    setSavedBuilderHeaderDetails(result);
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
    // setRating(result.rating);
    setSelBuilderStatus(
      STATUS_OPTIONS.filter((x) => x.value === result.status)[0]
    );
    let versions = result.versionList?.map((versionNo) => ({
      value: versionNo,
      label: "Version " + versionNo,
    }));
    setBuilderVersionOptions(versions);
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
      serialNo: result.serialNo ? result.serialNo : "",
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
    console.log(
      result.validityDays,
      validityOptions.find((element) => element.value === result.validityDays)
    );
    setGeneralData({
      description: result.description ? result.description : "",
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.estimationNumber ? result.estimationNumber : "",
      reference: result.reference ? result.reference : "",
      validity:
        result.validityDays && result.validityDays !== "EMPTY"
          ? validityOptions.find(
            (element) => element.value === result.validityDays
          )
          : { label: "", value: "" },
      version: result.versionNumber ? result.versionNumber : "",
    });
  };
  const populateEstData = (result) => {
    setEstimationData({
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
    setPricingData({
      priceDate: result.priceDate ? result.priceDate : new Date(),
      netPrice: result.netPrice ? result.netPrice : 0.0,
      adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
      currency: result.currency
        ? currencyOptions.find((element) => element.value === result.currency)
        : { label: "", value: "" },
      priceDetailDTO: result.priceDetailDTO,
      priceEstimateDTO: result.priceEstimateDTO,
    });
  };
  const createVersion = async (versionDesc) => {
    await createPartlistBuilderVersion(bId, versionDesc)
      .then((result) => {
        setVersionOpen(false);
        setBId(result.id);
        setSelectedVersion({
          label: "Version " + result.versionNumber,
          value: result.versionNumber,
        });
        populateHeader(result);
        fetchPartlist(result.id);
        setVersionDescription("");
        handleSnack(
          "success",
          `Version ${result.versionNumber} created successfully`
        );
      })
      .catch((err) => {
        setVersionOpen(false);

        if (err.message === "Not Allowed")
          handleSnack("warning", ERROR_MAX_VERSIONS);
        else
          handleSnack("error", "Error occurred while creating builder version");
        setVersionDescription("");
      });
  };

  const fetchPartlist = (id) => {
    fetchPartlistFromBuilder(id)
      .then((partListResult) => {
        if (partListResult) {
          setPartListNo(partListResult[0]);
          fetchPartsOfPartlist(
            partListResult[0],
            INITIAL_PAGE_NO,
            INITIAL_PAGE_SIZE
          );
        }
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while fetching all parts of partlist"
        );
      });
  };
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

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
        productSegment: currentItem.productSegment,
        productGroup: currentItem.productGroup,
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

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimationData({
      ...estimationData,
      [name]: value,
    });
  };

  const updateCustomerData = () => {
    let data = {
      builderId,
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
      handleSnack("error", "Please enter the email address in correct format");
    } else {
      updateBuilderCustomer(bId, data)
        .then((result) => {
          setSavedBuilderHeaderDetails(result);
          setValue("machine");
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          handleSnack(
            "success",
            "Partlist header customer details updated successfully!"
          );
        })
        .catch((err) => {
          handleSnack(
            "error",
            "Error occurred while updating the customer data!"
          );
        });
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTagChange = (rowId, value) => {
    console.log(rowId, value);
    setTagClicked("");
  };

  const updateMachineData = () => {
    let data = {
      builderId,
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
    updateBuilderMachine(bId, data)
      .then((result) => {
        setSavedBuilderHeaderDetails(result);
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
      builderId,
      estimationDate: generalData.estimationDate,
      description: generalData.description,
      reference: generalData.reference,
      validityDays: generalData.validity?.value,
      estimationNumber: generalData.estimationNo,
    };
    updateBuilderGeneralDet(bId, data)
      .then((result) => {
        setSavedBuilderHeaderDetails(result);
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
      builderId,
      preparedBy: estimationData.preparedBy,
      preparedOn: estimationData.preparedOn,
      revisedBy: estimationData.revisedBy,
      revisedOn: estimationData.revisedOn,
      approver: estimationData.approvedBy,
      salesOffice: estimationData.salesOffice?.value,
    };
    updateBuilderEstimation(bId, data)
      .then((result) => {
        setSavedBuilderHeaderDetails(result);
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
      builderId,
      priceDetailDTO: pricingData.priceDetailDTO,
      priceEstimateDTO: pricingData.priceEstimateDTO,
      currency: pricingData.currency?.value,
      priceDate: pricingData.priceDate,
      // adjustedPrice:
      //   pricingData.priceMethod?.value === "FLAT_RATE"
      //     ? pricingData.adjustedPrice
      //     : 0,
    };
    updateBuilderPrice(bId, data)
      .then((result) => {
        setSavedBuilderHeaderDetails(result);
        if (result) {
          setPricingData({
            ...pricingData,
            adjustedPrice: result.adjustedPrice,
            priceDetailDTO: result.priceDetailDTO,
            priceEstimateDTO: result.priceEstimateDTO,
            netPrice: result.netPrice,
          });
        }
        fetchAllDetails(builderId, generalData.version);
        setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
        handleSnack("success", "Pricing details updated!");
      })
      .catch((err) => {
        setPricingData({
          ...pricingData,
          adjustedPrice: savedBuilderHeaderDetails.adjustedPrice,
          priceDetailDTO: savedBuilderHeaderDetails.priceDetailDTO,
          priceEstimateDTO: savedBuilderHeaderDetails.priceEstimateDTO,
          netPrice: savedBuilderHeaderDetails.netPrice,
        });
        handleSnack(
          "error",
          "Error occurred while updating the pricing details!"
        );
      });
  };

  const calculateTotalPrice = (extendedPrice, usage) => {
    return usage > 0 ? (usage / 100) * extendedPrice : extendedPrice;
  };

  const handleIndPartAdd = () => {
    let data = {
      ...(sparePart.id && { id: sparePart.id }),
      groupNumber: sparePart.groupNumber,
      partNumber: sparePart.partNumber,
      partType: sparePart.partType,
      quantity: sparePart.quantity,
      // unitPrice: sparePart.unitPrice,
      // extendedPrice: sparePart.extendedPrice,
      currency: sparePart.currency,
      usagePercentage: sparePart.usagePercentage,
      // totalPrice: sparePart.totalPrice,
      comment: sparePart.comment,
      description: sparePart.description,
      unitOfMeasure: sparePart.unitOfMeasure,
    };
    addPartToPartList(partListNo, data)
      .then((result) => {
        handleAddPartClose();
        if (addPartModalTitle === "Add Part")
          handleSnack("success", `👏 New Spare Part has been added!`);
        else
          handleSnack("success", `👏 Selected part detail has been updated!`);
        if (result) {
          // fetchAllDetails(builderId, generalData.version);
          refreshData(builderId, generalData.version);
        }
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((err) => {
        handleSnack("error", `😐 Error occurred while adding spare part`);
      });
  };

  const handleReadFile = (file) => {
    // e.preventDefault();
    if (file) {
      setFile(file);
    }
  };

  // Open spare part modal to view or edit
  const openSparePartRow = (row) => {
    // console.log(row);
    setSparePart(row);
    setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    setPartFieldViewonly(true);
    setAddPartOpen(true);
  };

  const handleUploadClick = () => {
    if (Object.values(viewOnlyTab).every((item) => item === true))
      setFileUploadOpen(true);
    else handleSnack("info", "Please save all the header details!");
  };
  //Uplaod spare parts through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadPartsToPartlist(partListNo, form)
      .then((result) => {
        // fetchPartsOfPartlist(partListNo, page, pageSize);
        handleSnack(
          "success",
          `New parts have been uploaded to the partlist: ${partListId}`
        );
        if (result) {
          fetchAllDetails(builderId, generalData.version);
        }
      })
      .catch((err) => {
        handleSnack("error", `Failed to upload the parts!`);
      });
    setFileUploadOpen(false);
  };

  const handleClose = () => setOpen(false);

  //Close Add part modal
  const handleAddPartClose = () => {
    setAddPartOpen(false);
    setSparePart(initialSparePart);
    setPartFieldViewonly(false);
    setAddPartModalTitle("Add Part");
  };

  const handleCreateQuote = async () => {
    await createSparePartQuote(bId, quoteDescription, quoteReference)
      .then((createdQuote) => {
        handleSnack("success", "Quote has been created successfully!");
        let quoteDetails = {
          quoteId: "",
          // templateDBId: "",
          type: "fetch",
        };
        quoteDetails.quoteId = createdQuote.quoteId;
        // templateDetails.templateDBId = createdQuote.id;
        history.push({
          pathname: SPARE_PARTS_QUOTE_DETAILS,
          state: quoteDetails,
        });
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while creating quote");
      });
    setOpenQuotePopup(false);
  };

  // Close SparePart search modal
  const handleSearchResClose = () => {
    setSearchResultOpen(false);
    setSelectedMasterData([]);
  };

  // Search table column for spareparts
  const columnsPartListSearch = [
    { headerName: "Group Number", field: "groupNumber", flex: 1, width: 70 },
    { headerName: "Type", field: "partType", flex: 1, width: 130 },
    { headerName: "Part Number", field: "partNumber", flex: 1, width: 130 },
    {
      headerName: "Description",
      field: "partDescription",
      flex: 1,
      width: 130,
    },
    { headerName: "Currency", field: "currency", flex: 1, width: 130 },
    // { headerName: "Unit Price", field: "listPrice", flex: 1, width: 130 },
    { headerName: "Status", field: "status", flex: 1, width: 130 },
  ];

  //Columns to display spare parts for the partlist
  const columnsPartList = [
    // { headerName: 'Sl#', field: 'rowNum', flex: 1, },
    { headerName: "Group Number", field: "groupNumber", flex: 1 },
    { headerName: "Type", field: "partType", flex: 1 },
    { headerName: "Desc", field: "description", flex: 1 },
    { headerName: "Part Number", field: "partNumber", flex: 1 },
    {
      headerName: "Qty",
      field: "quantity",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Sales Unit",
      field: "unitOfMeasure",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Unit Price",
      field: "unitPrice",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Extended Price",
      field: "extendedPrice",
      flex: 1,
      filterable: false,
    },
    { headerName: "Currency", field: "currency", flex: 1, filterable: false },
    {
      headerName: "% Usage",
      field: "usagePercentage",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Total Price",
      field: "totalPrice",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Comment",
      field: "comment",
      flex: 1,
      editable: true,
      renderEditCell: CommentEditInputCell,
      filterable: false,
    },
    // {
    //   headerName: "Tag",
    //   field: "tag",
    //   flex: 1,
    //   editable: true,
    //   renderCell: renderTag,
    //   renderEditCell: TagComponent
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openSparePartRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={deleteIcon} alt="Delete" />
                </Tooltip>
              </div>
            }
            label="Delete"
            onClick={() => handleDeleteSparePart(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  //Remove Spare Part
  const handleDeleteSparePart = (sparePartId) => {
    RemoveSparepart(partListNo, sparePartId)
      .then((res) => {
        handleSnack("success", res);
        fetchAllDetails(builderId, generalData.version);
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the spare part");
      });
  };

  const currencyOptions = [{ value: "USD", label: "USD" }];

  //Logic to handle status changes
  const disableStatusOptions = (option) => {
    const selectedValue = selBuilderStatus.value;
    const changeToValue = option.value;
    return !(
      (["DRAFT", "REVISED"].indexOf(selectedValue) > -1 &&
        changeToValue === "ACTIVE") ||
      (["ARCHIVED", "REVISED"].indexOf(changeToValue) > -1 &&
        selectedValue === "ACTIVE")
    );
  };

  // Update the status of the builder : Active, Revised etc.
  const handleBuilderStatus = async (e) => {
    await updateBuilderStatus(bId, e.value)
      .then((result) => {
        setSelBuilderStatus(e);
        handleSnack("success", "Status has been updated!");
      })
      .catch((err) => {
        handleSnack("error", `Failed to update the status!`);
      });
  };

  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });
  const [selBuilderStatus, setSelBuilderStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (selBuilderStatus?.value !== "ACTIVE")
      handleSnack("info", "Set active status to do “convert to”");
    else setOpen(true);
  };

  const handleCreateKIT = () => {
    // if (selBuilderStatus?.value === "ACTIVE") {
    const data = {
      description: kitDescription,
      reference: kitReference,
      version: kitVersion?.value,
    };
    createKIT(bId, data)
      .then((res) => {
        handleSnack(
          "success",
          `KIT ${res.kitId} has been successfully created!`
        );
        let kitDetails = {
          kitId: "",
          kitDBId: "",
          partListNo: "",
          partListId: "",
          type: "fetch",
        };
        kitDetails.kitId = res.kitId;
        kitDetails.kitDBId = res.id;
        // kitDetails.partListNo = kitDetails.;
        // kitDetails.partListId = selectedKIT.estimationNumber;
        // kitDetails.versionNumber = selectedKIT.versionNumber;
        history.push({
          pathname: "/RepairKits/Kits",
          state: kitDetails,
        });
      })
      .catch((e) => {
        handleSnack("error", "Conversion to KIt has been failed!");
      });
    // } else {
    //   handleSnack("warning", "Partlist is not active yet!");
    // }
  };

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await sparePartSearch(searchStr);
        // console.log("search Query Result :", res);
        setMasterData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };
  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  // Once parts are selected to add clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
    setSelectedMasterData([]);
  };

  const recentList = () => {
    history.push({
      pathname: "/RepairPartList",
    });
  };

  const handleResetData = (action) => {
    if (action === "RESET") {
      value === "customer" && populateCustomerData(savedBuilderHeaderDetails);
      value === "machine" && populateMachineData(savedBuilderHeaderDetails);
      value === "general" && populateGeneralData(savedBuilderHeaderDetails);
      value === "estimation" && populateEstData(savedBuilderHeaderDetails);
      value === "price" && populatePricingData(savedBuilderHeaderDetails);
    } else if (action === "CANCEL") {
      populateHeader(savedBuilderHeaderDetails);
    }
    // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
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

  // Select parts to add
  const onRowsSelectionHandler = (ids) => {
    setSelectedMasterData([]);
    const selectedRowsData = ids.map((id) =>
      masterData.find((row) => row.id === id)
    );
    // console.log(selectedRowsData);
    setSelectedMasterData(selectedRowsData);
  };

  // Add the selected parts from search result to partlist
  const addSelectedPartsToPartList = async () => {
    setPartsLoading(true);
    handleSearchResClose();
    if (Object.values(viewOnlyTab).every((item) => item === true)) {
      const parts = [];
      selectedMasterData.map((item) => {
        let data = {
          partlistId: partListNo,
          groupNumber: item.groupNumber,
          partNumber: item.partNumber,
          partType: item.partType,
          quantity: 1,
          // unitPrice: item.listPrice,
          // extendedPrice: 0,
          currency: pricingData.currency?.value,
          // totalPrice: 0,
          comment: "",
          description: item.partDescription,
          unitOfMeasure: item.salesUnit,
        };
        parts.push(data);
      });

      await addMultiPartsToPartList(partListNo, parts)
        .then((result) => {
          handleSnack(
            "success",
            `New parts have been added with default quantity as 1 successfully!`
          );
          if (result) {
            fetchAllDetails(builderId, generalData.version);
          }
          // fetchPartsOfPartlist(partListNo, page, pageSize);
        })
        .catch((err) => {
          console.log(err);
          if (err && err.message === "Price not found") {
            handleSnack("error", `😐 ${err.message}!`);
          } else {
            handleSnack("error", `😐 Error occurred while adding the parts!`);
          }
        });
    } else {
      handleSnack("info", "Please save all the header details!");
    }
    setPartsLoading(false);
  };

  const onPartsFilterChange = React.useCallback((filterModel) => {
    // console.log(filterModel);
    filterModel.items.map((indFilter) => {
      if (indFilter.operatorValue === "equals")
        debounce(
          setFilterQuery(indFilter.columnField + ":" + indFilter.value),
          200
        );
      else if (indFilter.operatorValue === "contains")
        setFilterQuery(indFilter.columnField + "~" + indFilter.value);
    });
  }, []);

  // Add the sparepart edited rows to the state variable to update later
  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        if (
          newRow.usagePercentage > 0 &&
          newRow.usagePercentage <= 100 &&
          newRow.unitPrice > 0
        ) {
          if (
            newRow.quantity !== oldRow.quantity ||
            newRow.usagePercentage !== oldRow.usagePercentage ||
            newRow.comment !== oldRow.comment
          ) {
            // console.log(newRow, newRow.quantity !== oldRow.quantity);
            const index = rowsToUpdate.findIndex(
              (object) => object.id === newRow.id
            );
            newRow.extendedPrice = parseFloat(
              newRow.quantity * newRow.unitPrice
            ).toFixed(2);
            newRow.totalPrice =
              newRow.usagePercentage > 0
                ? parseFloat(
                  newRow.extendedPrice * 0.01 * newRow.usagePercentage
                ).toFixed(2)
                : parseFloat(newRow.extendedPrice).toFixed(2);
            if (index === -1) {
              // console.log("add");
              setRowsToUpdate((prevRows) => [...prevRows, newRow]);
            } else {
              rowsToUpdate[index] = newRow;
            }

            // Save the arguments to resolve or reject the promise later
            resolve(newRow);
          } else {
            // console.log(oldRow);
            resolve(oldRow); // Nothing was changed
          }
        } else {
          handleSnack("warning", "Usage percentage should be a valid value!");
          resolve(oldRow);
        }
      }),
    []
  );

  const refreshData = (builderId, version) => {
    setHeaderLoading(true);
    fetchBuilderVersionDet(builderId, version)
      .then((result) => {
        populateHeader(result);
        setHeaderLoading(false);
        // fetchPartlist(result.id);
        fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((err) => {
        setHeaderLoading(false);
        handleSnack(
          "error",
          "Error occurred while fetching the version details"
        );
      });
  };
  // Updates the bulk edits
  const bulkUpdateParts = async () => {
    setConfirmationOpen(false);
    if (rowsToUpdate.length === 0) {
      handleSnack("info", `😐 No modifications to update!`);
    } else {
      await addMultiPartsToPartList(partListNo, rowsToUpdate)
        .then((result) => {
          handleSnack("success", `👏 Parts have been updated!`);
          setRowsToUpdate([]);
          if (result) {
            // fetchAllDetails(builderId, generalData.version);
            refreshData(builderId, generalData.version);
          }
          // fetchPartsOfPartlist(partListNo, page, pageSize);
        })
        .catch((err) => {
          console.log(err);
          setRowsToUpdate([]);
          handleSnack("error", `😐 Error occurred while adding the parts!`);
        });
    }
  };

  function sortPartsTable(sortEvent) {
    // console.log("sorting called");
    if (sortEvent.length > 0) {
      setSortDetail({
        sortColumn: sortEvent[0].field,
        orderBy: sortEvent[0].sort === "asc" ? "ASC" : "DESC",
      });
    } else {
      setSortDetail({ sortColumn: "", orderBy: "" });
    }
  }

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <RenderConfirmDialog
        confimationOpen={confirmationOpen}
        message={`Pressing 'Yes' will save all the changes to partlist ${partListId}`}
        handleNo={() => setConfirmationOpen(false)}
        handleYes={bulkUpdateParts}
      />
      <ModalCreateVersion
        versionOpen={versionOpen}
        handleCloseVersion={() => setVersionOpen(false)}
        message="Another version of this builder will be created."
        handleCreateVersion={createVersion}
        description={versionDescription}
        setDescription={setVersionDescription}
      />
      <CreateKIT
        kitOpen={kitOpen}
        handleCloseKIT={() => setKitOpen(false)}
        handleCreateKIT={handleCreateKIT}
        version={kitVersion}
        setVersion={setKitVersion}
        description={kitDescription}
        setDescription={setKitDescription}
        reference={kitReference}
        setReference={setKitReference}
      />
      <ModalShare
        shareOpen={shareOpen}
        handleCloseShare={() => setShareOpen(false)}
      // handleCreateVersion={createVersion}
      // description={versionDescription}
      // setDescription={setVersionDescription}
      />
      {/* <div className="d-flex align-items-center justify-content-between mt-2">
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-600 mb-0">Issue</h5>
          <div className="d-flex justify-content-center align-items-center">
            <div className="ml-3">
              <Select
                className="customselectbtn"
                onChange={(e) => handleVersion(e)}
                options={builderVersionOptions}
                value={selectedVersion}
              />

              <span>Version {value3}</span> commented earlier
            </div>
            <div className="ml-3">
              <Select
                className="customselectbtn"
                onChange={(e) => handleBuilderStatus(e)}
                isOptionDisabled={(e) => disableStatusOptions(e)}
                options={STATUS_OPTIONS}
                value={selBuilderStatus}
              />
            </div>
            <Rating value={rating} readOnly size="small" sx={{ ml: 2 }} /> commented earlier
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
                className=""
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
                <MenuItem
                  className="custommenu ml-2 mr-5"
                  onClick={() => setKitOpen(true)}
                >
                  Kit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  className="custommenu ml-2 mr-5"
                  onClick={() => setOpenQuotePopup(true)}
                >
                  Quote
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="ml-3 btn-no-border font-size-14"
              title="Share"
              onClick={() => setShareOpen(true)}
            >
              <img src={shareIcon}></img>
            </button>
            <a href="#" className="ml-3 font-size-14" title="Items to Review">
              <img src={folderaddIcon}></img>
            </a>
            <a href="#" className="ml-3 font-size-14" title="Upload">
              <img src={uploadIcon}></img>
            </a>
            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> commented earlier
            <a href="#" className="ml-3 font-size-14" title="Delete">
              <img src={deleteIcon}></img>
            </a>
            <a href="#" className="ml-3 font-size-14" title="Duplicate">
              <img src={copyIcon}></img>
            </a>

            <DropdownButton
              className="customDropdown ml-2"
              id="dropdown-item-button"
            >
              <Dropdown.Item as="button" onClick={() => setVersionOpen(true)}>
                New Versions
              </Dropdown.Item>
              <Dropdown.Item as="button">Show Errors</Dropdown.Item>
              <Dropdown.Item as="button">Review</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div> */}

      <div className="card border p-4 ">
        {/* <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 ml-2 text-white" style={{ fontSize: 18 }}>
              Issue Header
            </span>
            <div className="btn-sm cursor text-white">
              <Tooltip title="Edit">
                <EditIcon
                  onClick={() =>
                    selBuilderStatus?.value === "DRAFT" ||
                      selBuilderStatus?.value === "REVISED"
                      ? makeHeaderEditable()
                      : handleSnack(
                        "info",
                        "Set revised status to modify active partlists"
                      )
                  }
                />
              </Tooltip>
            </div>
            <div className="btn-sm cursor text-white">
              <Tooltip title="Reset">
                <ReplayIcon onClick={() => handleResetData("RESET")} />
              </Tooltip>
            </div>
            below were commented earlier
            <div className="btn-sm cursor text-white">
              <Tooltip title="Back">
                <ArrowBackIcon onClick={() => recentList()} />
              </Tooltip>
            </div>

            <div className="btn-sm cursor text-white">
              <Tooltip title="Share">
                <ShareOutlinedIcon />
              </Tooltip>
            </div>

            <div className="btn-sm cursor text-white">
              <Tooltip title="Share">
                <ReviewAddIcon />
              </Tooltip>
            </div>
          </div>
        </h5> */}
        <Box className="" sx={{ width: "100%", typography: "body1" }}>
          {headerLoading ? (
            <LoadingProgress />
          ) : (
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList className="custom-tabs-div" onChange={handleChange}>
                  <Tab label="Customer" value="customer" />
                  <Tab label="Machine " value="machine" />
                  <Tab label="Estimation Details" value="estimation" />
                  <Tab label="General Details" value="general" />
                  <Tab label="Price" value="price" />
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
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            CUSTOMER ID
                          </label>
                          <SearchBox
                            value={customerData.customerID}
                            onChange={(e) => handleCustSearch(e.target.value)}
                            type="customerId"
                            result={searchCustResults}
                            onSelect={handleCustSelect}
                            noOptions={noOptionsCust}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white ml-1"
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
                        className="btn btn-light bg-primary text-white"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white ml-1"
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
                    <div className="row input-fields">
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            PREPARED BY
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={estimationData.preparedBy}
                            name="preparedBy"
                            onChange={handleEstimationDataChange}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            PREPARED ON
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            REVISED ON
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            value={estimationData.salesOffice}
                            styles={FONT_STYLE_SELECT}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white ml-1"
                        onClick={updateEstData}
                        disabled={
                          !(
                            estimationData.preparedBy &&
                            estimationData.preparedOn &&
                            estimationData.salesOffice?.value
                          )
                        }
                      >
                        Save & Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="row mt-3">
                    <ReadOnlyField
                      label="PREPARED BY"
                      value={estimationData.preparedBy}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="APPROVED BY"
                      value={estimationData.approvedBy}
                      className="col-md-4 col-sm-4"
                    />

                    <ReadOnlyField
                      label="PREPARED ON"
                      value={
                        <Moment format="DD/MM/YYYY">
                          {estimationData.preparedOn}
                        </Moment>
                      }
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="REVISED BY"
                      value={estimationData.revisedBy}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="REVISED ON"
                      value={
                        <Moment format="DD/MM/YYYY">
                          {estimationData.revisedOn}
                        </Moment>
                      }
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="SALES OFFICE / BRANCH"
                      value={estimationData.salesOffice?.label}
                      className="col-md-4 col-sm-4"
                    />
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
                            maxLength={140}
                            value={generalData.description}
                            onChange={(e) =>
                              setGeneralData({
                                ...generalData,
                                description: e.target.value,
                              })
                            }
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            <span className=" mr-2">ESTIMATION DATE</span>
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            maxLength={140}
                            value={generalData.reference}
                            onChange={(e) =>
                              setGeneralData({
                                ...generalData,
                                reference: e.target.value,
                              })
                            }
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                            value={generalData.validity}
                            styles={FONT_STYLE_SELECT}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                            disabled
                            value={parseFloat(selectedVersion.value).toFixed(1)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white ml-1"
                        onClick={updateGeneralData}
                        disabled={
                          !(
                            generalData.estimationDate &&
                            generalData.description &&
                            generalData.estimationNo &&
                            generalData.reference &&
                            generalData.validity?.value
                          )
                        }
                      >
                        Save & Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="row mt-3">
                    <ReadOnlyField
                      label="ESTIMATION DATE"
                      value={
                        <Moment format="DD/MM/YYYY">
                          {generalData.estimationDate}
                        </Moment>
                      }
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="ESTIMATION #"
                      value={generalData.estimationNo}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="DESCRIPTION"
                      value={generalData.description}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="REFERENCE"
                      value={generalData.reference}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="VALIDTITY (DAYs)"
                      value={generalData.validity?.label}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="VERSION"
                      value={parseFloat(selectedVersion.value).toFixed(1)}
                      className="col-md-4 col-sm-4"
                    />
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
                            value={pricingData.netPrice}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            PRICE DATE
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                // minDate={pricingData.priceDate}
                                // maxDate={new Date()}
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
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            ADJUSTED PRICE
                          </label>
                          <input
                            type="text"
                            disabled
                            className="form-control border-radius-10 text-primary"
                            value={pricingData.adjustedPrice}
                          // onChange={(e) =>
                          //   setPricingData({
                          //     ...pricingData,
                          //     adjustedPrice: e.target.value,
                          //   })
                          // }
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
                            value={pricingData.currency}
                            styles={FONT_STYLE_SELECT}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={updatePriceData}
                        disabled={
                          !(
                            pricingData.priceDate &&
                            pricingData.currency?.value !== ""
                          )
                        }
                      >
                        Save
                      </button>
                    </div>
                  </React.Fragment>
                ) : (
                  <>
                    <div className="row mt-3">
                      <ReadOnlyField
                        label="NET PRICE"
                        value={pricingData.netPrice}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="PRICE DATE"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {pricingData.priceDate}
                          </Moment>
                        }
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="ADJUSTED PRICE"
                        value={pricingData.adjustedPrice}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CURRENCY"
                        value={pricingData.currency?.label}
                        className="col-md-4 col-sm-4"
                      />
                    </div>
                    <hr />
                    <div className="mb-5">
                      <PriceMethodTable
                        rows={pricingData.priceDetailDTO}
                        setRows={(rows) => {
                          console.log(rows);
                          setPricingData({
                            ...pricingData,
                            priceDetailDTO: rows,
                          });
                        }}
                      />
                      <div
                        className="row my-3 mr-2"
                        style={{ justifyContent: "right" }}
                      >
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updatePriceData}
                          disabled={
                            !(pricingData.priceDate && pricingData.currency)
                          }
                        >
                          Save Price Methods
                        </button>
                      </div>
                      <PriceSummaryTable
                        rows={pricingData.priceEstimateDTO}
                        setRows={(rows) =>
                          setPricingData({
                            ...pricingData,
                            priceEstimateDTO: rows,
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
                          onClick={updatePriceData}
                          disabled={
                            !(pricingData.priceDate && pricingData.currency)
                          }
                        >
                          Save Price Summary
                        </button>
                      </div>
                    </div>
                  </>
                )}
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
                  <span>ISSUE ITEMS</span>
                </h5>
              </div>
              <SearchComponent
                querySearchSelector={querySearchSelector}
                setQuerySearchSelector={setQuerySearchSelector}
                clearFilteredData={clearFilteredData}
                handleSnack={handleSnack}
                searchAPI={sparePartSearch}
                searchClick={handleQuerySearchClick}
                options={SPAREPART_SEARCH_Q_OPTIONS}
                background={"white"}
                type=""
                buttonText="ADD PART"
              />
            </div>
          </div>
          {(selBuilderStatus?.value === "DRAFT" ||
            selBuilderStatus?.value === "REVISED") && (
              <div className="col-4">
                <div className="text-right pl-3 py-3">
                  <button
                    onClick={handleUploadClick}
                    style={{ cursor: "pointer" }}
                    className="btn bg-primary text-white mx-2"
                  >
                    Upload
                  </button>
                  {/* <button
                      onClick={() => setAddPartOpen(true)}
                      className="btn bg-primary text-white "
                    >
                      + Add Part
                    </button> */}
                </div>
              </div>
            )}
        </div>

        <DataGrid
          sx={GRID_STYLE}
          rows={spareparts}
          autoHeight
          columns={columnsPartList.map((column) => ({
            ...column,
            filterOperators,
          }))}
          editMode="row"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            fetchPartsOfPartlist(partListNo, newPage, pageSize)
          }
          onPageSizeChange={(newPageSize) =>
            fetchPartsOfPartlist(partListNo, page, newPageSize)
          }
          onRowEditStart={(e) => setBulkUpdateProgress(true)}
          sortingMode="server"
          onSortModelChange={(e) => sortPartsTable(e)}
          filterMode="server"
          onFilterModelChange={onPartsFilterChange}
          onRowEditStop={(e) => setBulkUpdateProgress(false)}
          paginationMode="server"
          loading={partsLoading}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rowCount={totalPartsCount}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={(newRow, oldRow) =>
            processRowUpdate(newRow, oldRow)
          }
          // getEstimatedRowHeight={() => 200}
          // getRowHeight={() => "auto"}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
        <div className=" my-3 text-right">
          {(selBuilderStatus?.value === "DRAFT" ||
            selBuilderStatus?.value === "REVISED") && (
              <button
                className="btn text-white bg-primary"
                onClick={() => setConfirmationOpen(true)}
                disabled={bulkUpdateProgress}
              >
                Save
              </button>
            )}
        </div>
      </div>
      {/* Open Modal to add individual spare part to the part list */}
      <AddNewSparepartModal
        sparePart={sparePart}
        setSparePart={setSparePart}
        handleIndPartAdd={handleIndPartAdd}
        searchAPI={sparePartSearch}
        addPartOpen={addPartOpen}
        handleAddPartClose={handleAddPartClose}
        title={addPartModalTitle}
        partFieldViewonly={partFieldViewonly}
        setPartFieldViewonly={setPartFieldViewonly}
        handleSnack={handleSnack}
      />

      <Modal
        show={fileUploadOpen}
        onHide={() => setFileUploadOpen(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-border">
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
                  handleChange={handleReadFile}
                  name="file"
                  types={["xls", "xlsx"]}
                  onClick={(event) => {
                    event.currentTarget.value = null;
                  }}
                />
              </div>
            </div>
            <p className="mt-3">
              Single upload file should not be more than 10MB. Only the .xls,
              .xlsx file types are allowed
            </p>
          </div>
          <div className="recent-div p-3">
            <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
            <div className="recent-items mt-3">
              <div className="d-flex justify-content-between align-items-center ">
                <p className="mb-0 ">
                  <FontAwesomeIcon className=" font-size-14" icon={faFileAlt} />
                  <span className="font-weight-500 ml-2">Engine Partlist</span>
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
              <p className="font-size-12 mb-0">Issue </p>
            </div>
            <div className="recent-items mt-3">
              <div className="d-flex justify-content-between align-items-center ">
                <p className="mb-0 ">
                  <FontAwesomeIcon className=" font-size-14" icon={faFileAlt} />
                  <span className="font-weight-500 ml-2">Engine Partlist</span>
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
              <p className="font-size-12 mb-0">Issue </p>
            </div>
          </div>
        </Modal.Body>
        <div className="row m-0 p-3">
          <div className="col-md-6 col-sm-6">
            <button
              className="btn border w-100 bg-white"
              onClick={() => setFileUploadOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div className="col-md-6 col-sm-6">
            <button
              className="btn btn-primary w-100"
              onClick={handleUploadFile}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />
              Upload
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="modal fade"
        id="Substitute"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: "1200" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header p-0 ">
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
            <div className="modal-body m-2">
              <div className="card w-100 border mb-0">
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5  pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2 ">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">New</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">20%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="hr w-100"></div>
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5 pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">Refurb</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">30%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="hr w-100"></div>
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5 pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">Reman</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">40%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
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
        className="modal fade"
        id="Recommended"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ zIndex: "1200" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
              <div className="card w-100 border mb-0">
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5 pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">New</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">20%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="hr w-100"></div>
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5 pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">Refurb</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">30%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="hr w-100"></div>
                <div className="row mt-3 px-2">
                  <div className="col-md-5 col-sm-5 pl-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        PART TYPE
                      </p>
                      <h6 className="font-weight-500">Reman</h6>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-5">
                    <div className="form-group">
                      <p className="font-size-12 font-weight-500 mb-2">
                        ALLOWED DISCOUNT
                      </p>
                      <h6 className="font-weight-500">40%</h6>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
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
      <QuoteModal
        setOpenQuotePopup={setOpenQuotePopup}
        openQuotePopup={openQuotePopup}
        setQuoteDescription={setQuoteDescription}
        quoteDescription={quoteDescription}
        quoteReference={quoteReference}
        setQuoteReference={setQuoteReference}
        handleCreateQuote={handleCreateQuote}
      />
      <Modal
        show={searchResultOpen}
        onHide={handleSearchResClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header-border">
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
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
                rows={masterData}
                columns={columnsPartListSearch}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
              />
            </div>
          </div>
          <div className="m-2 text-right">
            <button
              className="btn text-white bg-primary mr-2"
              onClick={handleSearchResClose}
            >
              Cancel
            </button>
            <button
              className="btn text-white bg-primary"
              onClick={addSelectedPartsToPartList}
            >
              + Add Selected
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceProgressIssueComponent;
