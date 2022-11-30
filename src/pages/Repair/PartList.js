import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Select from "react-select";
import SelectBox from "@mui/material/Select";
import { Button, Modal } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EditIcon from "@mui/icons-material/EditTwoTone";
import LabelIcon from "@mui/icons-material/LabelTwoTone";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
// import { MuiMenuComponent } from "./components/MuiMenuRepair";
import SearchIcon from "@mui/icons-material/Search";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { MuiMenuComponent } from "pages/Operational";
import {
  DataGrid,
  getGridStringOperators,
  GridActionsCellItem,
  useGridApiContext,
} from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import { Link, useHistory } from "react-router-dom";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "@mui/material/FormGroup";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-js-loader";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import $ from "jquery";
// import SearchIcon from "@mui/icons-material/Search";
import DateFnsUtils from "@date-io/date-fns";
import {
  addMultiPartsToPartList,
  addPartToPartList,
  createBuilderVersion,
  fetchBuilderDetails,
  fetchBuilderPricingMethods,
  fetchBuilderVersionDet,
  fetchPartlistFromBuilder,
  fetchPartsFromPartlist,
  RemoveLaborItem,
  RemoveSparepart,
  updateBuilderCustomer,
  updateBuilderEstimation,
  updateBuilderGeneralDet,
  updateBuilderMachine,
  updateBuilderPrice,
  updateBuilderStatus,
  uploadPartsToPartlist,
} from "services/repairBuilderServices";
import SearchBox from "./components/SearchBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from "react-moment";
import Validator from "utils/validator";
import CustomSnackbar from "../Common/CustomSnackBar";
import DynamicSearchComponent from "./components/DynamicSearchComponent";
import AddNewSparepartModal from "./components/AddNewSparePart";
import {
  debounce,
  FormControl,
  InputLabel,
  Rating,
  TextareaAutosize,
} from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import logoIcon from '../assets/icons/svg/menu.png'
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  INITIAL_PAGE_NO,
  INITIAL_PAGE_SIZE,
  PARTS_TAG_OPTIONS,
  SPAREPART_SEARCH_Q_OPTIONS,
} from "./CONSTANTS";
import { RenderConfirmDialog } from "./components/ConfirmationBox";
import { Typography } from "@material-ui/core";
import {
  customerSearch,
  machineSearch,
  sparePartSearch,
} from "services/searchServices";
import ModalCreateVersion from "./components/ModalCreateVersion";
import ModalShare from "./components/ModalShare";
import SearchComponent from "./components/SearchComponent";
import { useAppSelector } from "app/hooks";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import LoadingProgress from "./components/Loader";

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

// function renderTag(params) {
//   console.log(params);
//   return <span>{params.value}</span>
// }

// function TagComponent(props) {
//   const { id, value, field } = props;
//   console.log(id, value, field);
//   const apiRef = useGridApiContext();

//   const handleTagChange = async (event) => {
//     console.log("newValue", event.target.value);
//     // Explore debounce option
//     apiRef.current.setEditCellValue(
//       { id, field, value: event.target.value },
//       event
//     );
//   };

//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <FormControl fullWidth size="small">
//           <InputLabel id="demo-select-small" style={{ fontSize: 11 }}>
//              Tags
//            </InputLabel>
//            <SelectBox
//              label="tags"
//              value={value}
//              defaultValue='required'
//              onChange={handleTagChange}
//              sx={{ width: 100 }}
//            >
//              {PARTS_TAG_OPTIONS.map((element) => (
//                <MenuItem value={element.value} style={{ fontSize: 11 }}>
//                  {element.label}
//                </MenuItem>
//              ))}
//            </SelectBox>
//          </FormControl>
//     </Box>
//   );
// }

function PartList(props) {
  const history = useHistory();
  const { state } = props.location;
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [partListNo, setPartListNo] = useState("");
  const [partListId, setPartListId] = useState("");
  const [rowsToUpdate, setRowsToUpdate] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
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
  const [rating, setRating] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
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
    country:""
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
    productGroup: ""
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
    priceMethod: null,
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "USD",
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
  const [addPartModalTitle, setAddPartModalTitle] = useState("Add Part");
  const [partFieldViewonly, setPartFieldViewonly] = useState(false);
  const validityOptions = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
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

  const [builderVersionOptions, setBuilderVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);

  const handleVersion = (e) => {
    setSelectedVersion(e);
    fetchAllDetails(builderId, e.value);
  };

  useEffect(() => {
    if (state && state.type === "new") {
      console.log(state);
      setBuilderId(state.builderId);
      setBId(state.bId);
      setPartListNo(state.partListNo);
      setPartListId(state.partListId);
      setGeneralData({ ...generalData, estimationNo: state.partListId });
      if (state.type === "new") {
        // fetchAllDetails(state.bId, state.partListNo);
        console.log("Created a new builder");
      }
    } else if (state) {
      setHeaderLoading(true);
      setBuilderId(state.builderId);
      setBId(state.bId);
      // setPartListNo(state.partListNo);
      setPartListId(state.partListId);
      fetchAllDetails(state.builderId, state.versionNumber);
    }
  }, []);

  const fetchAllDetails = (builderId, versionNumber) => {
    console.log(builderId, versionNumber)
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
      : "";
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
    setSelBuilderStatus(
      builderStatusOptions.filter((x) => x.value === result.status)[0]
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
      regionOrState: result.regionOrState
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
      productGroup: result.productGroup
    });
    setGeneralData({
      description: result.description,
      estimationDate: result.estimationDate? result.estimationDate : new Date() ,
      estimationNo: result.estimationNumber,
      reference: result.reference,
      validity: validityOptions.find(
        (element) => element.value == result.validityDays
      ),
      version: result.versionNumber,
    });
    setEstimationData({
      approvedBy: result.approver,
      preparedBy: result.preparedBy,
      preparedOn: result.preparedOn? result.preparedOn : new Date(),
      revisedBy: result.revisedBy,
      revisedOn: result.revisedOn? result.revisedOn : new Date(),
      salesOffice: salesOfficeOptions.find(
        (element) => element.value === result.salesOffice
      ),
    });
    setPricingData({
      priceDate: result.priceDate? result.priceDate : new Date(),
      priceMethod: priceMethodOptions.find(
        (element) => element.value === result.priceMethod
      ),
      netPrice: result.netPrice ? result.netPrice : 0.0,
      adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
      currency: currencyOptions.find(
        (element) => element.value === result.currency
      ),
    });
  };

  const createVersion = async (versionDesc) => {
    await createBuilderVersion(bId, versionDesc)
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
          `Version ${result.versionNumber} has been created`
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
      regionOrState: currentItem.addressDTO?.regionOrState
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
        productGroup: currentItem.productGroup
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
      country: customerData.country
    };
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateBuilderCustomer(bId, data)
        .then((result) => {
          setValue("machine");
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
      productSegment: machineData.productSegment
    };
    updateBuilderMachine(bId, data)
      .then((result) => {
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
      priceMethod: pricingData.priceMethod?.value,
      currency: pricingData.currency?.value,
      priceDate: pricingData.priceDate,
      adjustedPrice: pricingData.adjustedPrice,
    };
    updateBuilderPrice(bId, data)
      .then((result) => {
        // setValue("price");
        fetchAllDetails(builderId, generalData.version);
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
        fetchPartsOfPartlist(partListNo, page, pageSize);
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
    if(viewOnlyTab.custViewOnly && viewOnlyTab.estViewOnly && viewOnlyTab.generalViewOnly && viewOnlyTab.machineViewOnly && viewOnlyTab.priceViewOnly)
      setFileUploadOpen(true);
    else
      handleSnack("info", "Please save all the header details!")
  }
  //Uplaod spare parts through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadPartsToPartlist(partListNo, form)
      .then((result) => {
        fetchPartsOfPartlist(partListNo, page, pageSize);
        handleSnack(
          "success",
          `New parts have been uploaded to the partlist: ${partListId}`
        );
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

  // Close SparePart search modal
  const handleSearchResClose = () => {
    setSearchResultOpen(false);
    setSelectedMasterData([]);
  };

  // Search table column for spareparts
  const columnsPartListSearch = [
    { headerName: "GroupNumber", field: "groupNumber", flex: 1, width: 70 },
    { headerName: "Type", field: "partType", flex: 1, width: 130 },
    { headerName: "PartNumber", field: "partNumber", flex: 1, width: 130 },
    {
      headerName: "Description",
      field: "partDescription",
      flex: 1,
      width: 130,
    },
    { headerName: "Currency", field: "currency", flex: 1, width: 130 },
    { headerName: "Unit Price", field: "listPrice", flex: 1, width: 130 },
    { headerName: "Status", field: "status", flex: 1, width: 130 },
  ];

  //Columns to display spare parts for the partlist
  const columnsPartList = [
    // { headerName: 'Sl#', field: 'rowNum', flex: 1, },
    { headerName: "GroupNumber", field: "groupNumber", flex: 1 },
    { headerName: "Type", field: "partType", flex: 1 },
    { headerName: "Desc", field: "description", flex: 1 },
    { headerName: "PartNumber", field: "partNumber", flex: 1 },
    {
      headerName: "Qty",
      field: "quantity",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Unit Of Measures",
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => openSparePartRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteSparePart(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  //Remove Labor Item
  const handleDeleteSparePart = (sparePartId) => {
    RemoveSparepart(partListNo, sparePartId)
      .then((res) => {
        handleSnack("success", res);
        fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the spare part");
      });
  };

  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
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
  const builderStatusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "ACTIVE", label: "Active" },
    { value: "REVISED", label: "Revised" },
    { value: "ARCHIVED", label: "Archived" },
  ];

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
    // console.log("event", event);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleCreate = () => {
    history.push("/quoteTemplate");
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

  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const handleRowClick = (e) => {
    setShow(true);
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
        handleSearchResClose();
        handleSnack(
          "success",
          `👏 New parts have been added with default quantity as 1!`
        );
        fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((err) => {
        console.log(err);
        handleSnack("error", `😐 Error occurred while adding the parts!`);
      });
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
          newRow.quantity !== oldRow.quantity ||
          newRow.usagePercentage !== oldRow.usagePercentage ||
          newRow.comment !== oldRow.comment
        ) {
          // console.log(newRow, newRow.quantity !== oldRow.quantity);
          const index = rowsToUpdate.findIndex(
            (object) => object.id === newRow.id
          );
          newRow.extendedPrice  = newRow.quantity * newRow.unitPrice;
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
      }),
    []
  );

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
          fetchPartsOfPartlist(partListNo, page, pageSize);
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

  const [show, setShow] = React.useState(false);
  return (
    <>
      <CustomSnackbar
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
        handleCreateVersion={createVersion}
        description={versionDescription}
        setDescription={setVersionDescription}
      />
      <ModalShare
        shareOpen={shareOpen}
        handleCloseShare={() => setShareOpen(false)}
        // handleCreateVersion={createVersion}
        // description={versionDescription}
        // setDescription={setVersionDescription}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Part List</h5>
              <div className="d-flex justify-content-center align-items-center">
                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleVersion(e)}
                    options={builderVersionOptions}
                    value={selectedVersion}
                  />

                  {/* <span>Version {value3}</span> */}
                </div>
                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleBuilderStatus(e)}
                    isOptionDisabled={(e) => disableStatusOptions(e)}
                    options={builderStatusOptions}
                    value={selBuilderStatus}
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
                    <MenuItem className="custommenu">Kit</MenuItem>
                    <MenuItem
                      className="custommenu"
                      data-toggle="modal"
                      data-target="#quotecreat"
                    >
                      Quote
                    </MenuItem>
                    <Divider />
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
                <a href="#" className="ml-3 font-size-14" title="Duplicate">
                  <img src={copyIcon}></img>
                </a>

                <DropdownButton
                  className="customDropdown ml-2"
                  id="dropdown-item-button"
                >
                  <Dropdown.Item
                    as="button"
                    onClick={() => setVersionOpen(true)}
                  >
                    New Versions
                  </Dropdown.Item>
                  <Dropdown.Item as="button">Show Errors</Dropdown.Item>
                  <Dropdown.Item as="button">Review</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>

          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3">Header</span>
                <a
                  href={undefined}
                  className="btn-sm"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-pencil"
                    aria-hidden="true"
                    onClick={makeHeaderEditable}
                  ></i>
                </a>{" "}
                <a
                  href={undefined}
                  className="btn-sm"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                </a>{" "}
                <a href="#" className="btn-sm" style={{ cursor: "pointer" }}>
                  <i className="fa fa-folder-o" aria-hidden="true"></i>
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
                    >
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

                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                              </MuiPickersUtilsProvider>
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
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  inputProps={{ style: FONT_STYLE }}
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  label=""
                                  value={estimationData.revisedOn}
                                  onChange={(e) =>
                                    setEstimationData({
                                      ...estimationData,
                                      revisedOn: e,
                                    })
                                  }
                                />
                              </MuiPickersUtilsProvider>
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
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  inputProps={{ style: FONT_STYLE }}
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  label=""
                                  value={generalData.estimationDate}
                                  onChange={(e) =>
                                    setGeneralData({
                                      ...generalData,
                                      estimationDate: e,
                                    })
                                  }
                                />
                              </MuiPickersUtilsProvider>
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
                              {parseFloat(selectedVersion.value).toFixed(1)}
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
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  inputProps={{ style: FONT_STYLE }}
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  label=""
                                  disableFuture
                                  value={pricingData.priceDate}
                                  onChange={(e) =>
                                    setPricingData({
                                      ...pricingData,
                                      priceDate: e,
                                    })
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                          </div>
                          {/* <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            COST PRICE
                          </label>
                          <input
                            type="email"
                            className="form-control border-radius-10 text-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Placeholder (Optional)"
                          />
                        </div>
                      </div> */}
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
                                className="form-control border-radius-10 text-primary"
                                placeholder="Optional"
                                value={pricingData.adjustedPrice}
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
                              !(
                                pricingData.priceDate &&
                                pricingData.priceMethod &&
                                pricingData.currency
                              )
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
                    <span>Version {selectedVersion.value}</span>
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
                  />
                </div>
              </div>
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
              // autoHeight
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
              <button
                className="btn text-white bg-primary"
                onClick={() => setConfirmationOpen(true)}
                disabled={bulkUpdateProgress}
              >
                Save
              </button>
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
        </div>
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
        <div
          className="modal fade"
          id="quotecreat"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-white border-none">
              <div className="modal-header border-none">
                <h5 className="modal-title" id="exampleModalLabel">
                  Quote Create
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
              <p className="d-block px-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <hr className="my-1" />
              <div className="modal-body">
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
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Quote ID
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Reference
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        QUOTE TYPE{" "}
                      </p>
                      <h6 className="font-weight-500">
                        Repair Quote with Spare Parts
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        Quote ID{" "}
                      </p>
                      <h6 className="font-weight-500">SB12345</h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        QUOTE DESCRIPTION
                      </p>
                      <h6 className="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        REFERENCE
                      </p>
                      <h6 className="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ display: "unset" }}>
                <div className="mb-2">
                  <button
                    onClick={() => handleCreate()}
                    data-dismiss="modal"
                    className="btn bg-primary d-block text-white"
                  >
                    Done
                  </button>
                </div>
                <div>
                  <button className="btn  btn-primary">Create</button>
                  <button
                    type="button"
                    className="btn pull-right border"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={searchResultOpen}
          onHide={handleSearchResClose}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
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
                  onCellClick={(e) => handleRowClick(e)}
                />
              </div>
            </div>
            <div className="m-2 text-right">
              <button
                className="btn text-white bg-primary"
                onClick={addSelectedPartsToPartList}
              >
                + Add Selected
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Share</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box className="custom-tabs w-100" sx={{ borderColor: 'divider' }}>
                      <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Internal" value="1" />
                        <Tab label="External" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel className="px-3" value="1">
                      <h6 className="mt-3">MEMBERS</h6>
                        <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>
                        <div className=" d-flex">
                          <div className="input-group icons approvesearch mr-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                <SearchIcon />
                              </span>
                            </div>
                            <input type="search" className="form-control" placeholder="" aria-label="Search Dashboard" />
                            <div className="customselect d-flex align-items-center" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                              <Select
                                // onChange={handleChangeSelect}
                                isClearable={true}
                                // value={dValue}
                                options={[{ label: "One", value: "one" }]}
                                placeholder="Viewer"
                              />
                            </div>
                          </div>
                          <div>
                            <a href="#" className="btn bg-primary text-white" data-toggle="modal" data-target="#Assingmodal">Invite</a>
                          </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="px-3" value="2">
                    <h6 className="mt-3">MEMBERS</h6>
                        <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>
                        <div className=" d-flex">
                          <div className="input-group icons approvesearch mr-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                <SearchIcon />
                              </span>
                            </div>
                            <input type="search" className="form-control" placeholder="" aria-label="Search Dashboard" />
                            <div className="customselect d-flex align-items-center" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                              <Select
                                // onChange={handleChangeSelect}
                                isClearable={true}
                                // value={dValue}
                                options={[{ label: "One", value: "one" }]}
                                placeholder="Viewer"
                              />
                            </div>
                          </div>
                          <div>
                            <a href="#" className="btn bg-primary text-white" data-toggle="modal" data-target="#Assingmodal">Invite</a>
                          </div>
                        </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              <div class="modal-footer">
              <button type="button" className="btn btn-primary w-100" data-dismiss="modal">
                    Cancel
              </button>
              <button className="btn  btn-primary w-100"><span className="mr-2"><ShareOutlinedIcon /></span>Share</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default PartList;
