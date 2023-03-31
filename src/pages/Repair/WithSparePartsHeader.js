// import DateFnsUtils from "@date-io/date-fns";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import EYEIcon from "@mui/icons-material/VisibilityOutlined";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiMenuComponent } from "pages/Operational";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  createBuilderVersion,
  createStandardJob,
  fetchBuilderDetails,
  fetchBuilderVersionDet,
  updateBuilderCustomer,
  updateBuilderEstimation,
  updateBuilderGeneralDet,
  updateBuilderMachine,
  updateBuilderPrice,
  updateBuilderStatus,
} from "services/repairBuilderServices";
import Validator from "utils/validator";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import shareIcon from "../../assets/icons/svg/share.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import SearchBox from "./components/SearchBox";
import { TextField, Tooltip } from "@mui/material";
import { customerSearch, machineSearch } from "services/searchServices";
import RepairServiceEstimate from "./RepairServiceEstimate";
import ModalCreateVersion from "./components/ModalCreateVersion";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  ERROR_MAX_VERSIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  QUOTE_OPTIONS,
  STATUS_OPTIONS,
} from "./CONSTANTS";
import { useAppSelector } from "app/hooks";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import LoadingProgress from "./components/Loader";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReadOnlyField } from "./components/ReadOnlyField";
import CreateKIT from "./components/CreateKIT";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import ReviewAddIcon from "@mui/icons-material/CreateNewFolderOutlined";
import WithSparePartsSegments from "./WithSparePartsSegments";
import WithSparePartsOperation from "./WithSparePartsOperation";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { REPAIR_QUOTE_DETAILS, SERVICE_PART_TEMPLATES } from "navigation/CONSTANTS";
import { createRepairQuote } from "services/repairQuoteServices";
import QuoteModal from "./components/QuoteModal";

function WithSparePartsHeader(props) {
  const history = useHistory();
  const { state } = props.location;
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteReference, setQuoteReference] = useState("");
  const [versionOpen, setVersionOpen] = useState(false);
  const [versionDescription, setVersionDescription] = useState("");
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const currencyOptions = [{ value: "USD", label: "USD" }];
  const [savedHeaderDetails, setSavedBuilderDetails] = useState([]);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [openQuotePopup, setOpenQuotePopup] = useState(false);
  const [templateVersion, setTemplateVersion] = useState({
    value: "GOLD",
    label: "Gold",
  });
  const [templateReference, setTemplateReference] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [activeElement, setActiveElement] = useState({
    name: "header",
    bId: "",
    sId: "",
    oId: "",
    builderType: ""
  });
  const [selBuilderStatus, setSelBuilderStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });

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
    priceMethod: null,
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "",
  });

  const validityOptions = [
    { value: 15, label: "15 days" },
    { value: 30, label: "1 month" },
    { value: 45, label: "45 days" },
    { value: 60, label: "2 months" },
  ];

  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];

  const partlistColumns = [
    {
      field: "priceBreakup",
      headerName: "Price Breakup",
      width: 150,
      type: 'singleSelect',
      valueOptions: [ 'A - Parts','B - Labor', 'C - Consumable', 'D - External work', 'E - Other Misc']
      // renderCell: (params) => (
      //   <div>
      //     <span style={{fontSize: 12}}>{params.value}{" "}</span>
      //     <span style={{ fontSize: 9 }}>
      //       {"  " + params.row.versionNumber + ".0"}
      //     </span>{" "}
      //   </div>
      // ),
    },
    {
      field: "summary",
      headerName: "Price Summary type",
      flex: 1,
      width: 150,
      type: 'singleSelect',
      valueOptions: [ 'Estimated labor', 'Estimated Parts', 'Estimated Misc.' , 'Flat Rate all', 'Environmental', 'Sundry Charges']
      // renderCell: params => <span style={{fontSize: 12}}>{params.value+" - "+params.row.jobOperation}</span>
    },
    {
      field: "priceMethod",
      headerName: "Price Method",
      flex: 1,
      minWidth: 200,
      type: 'singleSelect',
      valueOptions: [ 'List', 'Cost', 'Special price', 'Flat rate']
    },
    {
      field: "netPrice",
      headerName: "Estimated $",
      flex: 1,
      minWidth: 80,      
    },
    {
      field: "adjustedPrice",
      headerName: "Adjusted $",
      flex: 1,
      minWidth: 80,      
    },
    {
      field: "headerDiscount",
      headerName: "Header Discount (%)",
      flex: 1,
      minWidth: 120,      
    },
    {
      field: "Total Discount",
      headerName: "Total Discount ($)",
      flex: 1,
      minWidth: 120,      
    },    
    {
      field: "Actions",
      headerName: "Actions",
      type: "actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="View">
                  <EYEIcon />
                  {/* <img className="m-1" src={penIcon} alt="Edit" /> */}
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            // onClick={() => loadPartlist(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Remove">
                  <img className="m-1" src={deleteIcon} alt="Delete" />
                </Tooltip>
              </div>
            }
            label="Delete"
            // onClick={() => handleDeletePartlist(params.row.id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
      width: 130,
    },
  ];

  const priceRows = [
    {
      priceBreakup: "Parts",
      summary: ""
    }
  ]

  const handleCreateQuote = async () => {
    await createRepairQuote(bId, quoteDescription, quoteReference).then(createdQuote => {
      handleSnack('success',"Quote has been created successfully!");
      let quoteDetails = {
        quoteId: "",
        // templateDBId: "",
        type: "fetch",
      };
      quoteDetails.quoteId = createdQuote.quoteId;
      // templateDetails.templateDBId = createdQuote.id;
      history.push({
        pathname: REPAIR_QUOTE_DETAILS,
        state: quoteDetails,
      });
    }).catch(e => {
      handleSnack("error", "Error occurred while creating quote");
    })
    setOpenQuotePopup(false);
  };

  // Update the status of the builder : Active, Revised etc.
  const handleBuilderStatus = async (e) => {
    await updateBuilderStatus(bId, e.value)
      .then((result) => {
        setSelBuilderStatus(e);
        setActiveElement({ ...activeElement, builderStatus: e.value });
        handleSnack("success", "Status has been updated!");
      })
      .catch((err) => {
        handleSnack("error", `Failed to update the status!`);
      });
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [value, setValue] = useState("customer");
  const [open, setOpen] = useState(false);
  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (state && state.type === "new") {
      setBuilderId(state.builderId);
      setBId(state.bId);
      setGeneralData({ ...generalData, estimationNo: state.builderId });      
    } else if (state) {
      setBuilderId(state.builderId);
      setBId(state.bId);
      fetchAllDetails(state.bId);
    }
    setActiveElement({...activeElement, builderType: state.builderType })
  }, []);

  const fetchAllDetails = async (builderId) => {
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
    if (builderId) {
      setHeaderLoading(true);
      await fetchBuilderDetails(builderId)
        .then((result) => {
          setBuilderId(result.builderId);
          populateHeader(result);
        })
        .catch((err) => {
          console.log(err);
          handleSnack("error", "Error occured while fetching header details");
        });
      setHeaderLoading(false);
    }
  };

  const [headerLoading, setHeaderLoading] = useState(false);
  const [builderVersionOptions, setBuilderVersionOptions] = useState([
    { label: "Version 1", value: 1 },
  ]);
  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
  });
  const handleVersion = (e) => {
    setSelectedVersion(e);
    fetchBuilderVersionDet(builderId, e.value).then((result) => {
      populateHeader(result);
    });
    setActiveElement({
      name: "header",
      bId,
      sId: "",
      oId: "",
    });
  };
  const populateHeader = (result) => {
    setSavedBuilderDetails(result);
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
    setBId(result.id);
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
    setSegments(result.segmentDTOs);
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
    setGeneralData({
      description: result.description ? result.description : "",
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.builderId ? result.builderId : state.builderId,
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
      priceMethod:
        result.priceMethod && result.priceMethod !== "EMPTY"
          ? priceMethodOptions.find(
              (element) => element.value === result.priceMethod
            )
          : { label: "", value: "" },
      netPrice: result.netPrice ? result.netPrice : 0.0,
      adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
      currency: result.currency
        ? currencyOptions.find((element) => element.value === result.currency)
        : { label: "", value: "" },
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
    console.log(currentItem);
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
    console.log(data);
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateBuilderCustomer(bId, data)
        .then((result) => {
          setSavedBuilderDetails(result);
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        setSavedBuilderDetails(result);
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
        setSavedBuilderDetails(result);
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
        setSavedBuilderDetails(result);
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
      adjustedPrice:
        pricingData.priceMethod?.value === "FLAT_RATE"
          ? pricingData.adjustedPrice
          : 0,
    };
    updateBuilderPrice(bId, data)
      .then((result) => {
        setSavedBuilderDetails(result);
        if (result) {
          setPricingData({
            ...pricingData,
            adjustedPrice: result.adjustedPrice,
            netPrice: result.netPrice,
          });
        }
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

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (selBuilderStatus?.value !== "ACTIVE")
      handleSnack("info", "Set active status to do “convert to”");
    else setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    history.push("/quoteTemplate");
  };

  const handleResetData = (action) => {
    if (action === "RESET") {
      value === "customer" && populateCustomerData(savedHeaderDetails);
      value === "machine" && populateMachineData(savedHeaderDetails);
      value === "general" && populateGeneralData(savedHeaderDetails);
      value === "estimation" && populateEstData(savedHeaderDetails);
      value === "price" && populatePricingData(savedHeaderDetails);
    } else if (action === "CANCEL") {
      populateHeader(savedHeaderDetails);
    }
    // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
  };

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

  const handleCreateTemplate = () => {
    // if (selBuilderStatus?.value === "ACTIVE") {
    const data = {
      description: templateDescription,
      reference: templateReference,
      version: templateVersion?.value,
    };
    createStandardJob(bId, data)
      .then((res) => {
        handleSnack(
          "success",
          `Template ${res.standardJobId} has been successfully created!`
        );
        let templateDetails = {
          templateId: "",
          templateDBId: "",
          type: "fetch",
        };
        templateDetails.templateId = res.templateId;
        templateDetails.templateDBId = res.id;
        history.push({
          pathname: SERVICE_PART_TEMPLATES,
          state: templateDetails,
        });
      })
      .catch((e) => {
        handleSnack("error", "Conversion to Standard Job has been failed!");
        setTemplateOpen(false);
      });
    // } else {
    //   handleSnack("warning", "Builder is not active yet!");
    // }
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

  return (
    <React.Fragment>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <ModalCreateVersion
        versionOpen={versionOpen}
        handleCloseVersion={() => setVersionOpen(false)}
        handleCreateVersion={createVersion}
        description={versionDescription}
        setDescription={setVersionDescription}
      />
      <div className="content-body">
        <div className="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">
                Repair option (with spare parts)
              </h5>
              <div className="d-flex justify-content-center align-items-center">
                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleVersion(e)}
                    options={builderVersionOptions}
                    value={selectedVersion}
                  />
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
                    <MenuItem
                      className="custommenu ml-2 mr-4"
                      onClick={() => setTemplateOpen(true)}
                    >
                      Standard Job
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      data-toggle="modal"
                      onClick={() => setOpenQuotePopup(true)}
                    >
                      Quote
                    </MenuItem>
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
          {activeElement.name === "header" && (
            <React.Fragment>
              <div className="card p-4 mt-5">
                <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
                  <div className="" style={{ display: "contents" }}>
                    <span
                      className="mr-3 ml-2 text-white"
                      style={{ fontSize: "20px" }}
                    >
                      With Spare Parts Header
                    </span>
                    <div className="btn-sm cursor text-white">
                      <Tooltip title="Edit">
                        <EditIcon
                          onClick={() =>
                            ["DRAFT", "REVISED"].indexOf(
                              selBuilderStatus?.value
                            ) > -1
                              ? makeHeaderEditable()
                              : handleSnack(
                                  "info",
                                  "Set revised status to modify active builders"
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
                    <div className="btn-sm cursor text-white">
                      <Tooltip title="Share">
                        <ShareOutlinedIcon />
                      </Tooltip>
                    </div>

                    <div className="btn-sm cursor text-white">
                      <Tooltip title="Add to Review">
                        <ReviewAddIcon />
                      </Tooltip>
                    </div>
                  </div>
                  {/* <div className="hr"></div> */}
                </h5>
                <Box
                  className="mt-4"
                  sx={{ width: "100%", typography: "body1" }}
                >
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
                                      handleCustSearch(
                                        "customerId",
                                        e.target.value
                                      )
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
                                      handleMachineSearch(
                                        "model",
                                        e.target.value
                                      )
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
                                  !(
                                    machineData.model && machineData.serialNo
                                  ) ||
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
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <MobileDatePicker
                                        inputFormat="dd/MM/yyyy"
                                        className="form-controldate border-radius-10"
                                        // sx={{
                                        //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                                        //   }}
                                        // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
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
                                    <span className=" mr-2">
                                      ESTIMATION DATE
                                    </span>
                                  </label>
                                  <div className="align-items-center date-box">
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
                              </div>
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
                              value={parseFloat(selectedVersion.value).toFixed(
                                1
                              )}
                              className="col-md-4 col-sm-4"
                            />
                          </div>
                        )}
                      </TabPanel>
                      <TabPanel value="price">
                        {!viewOnlyTab.priceViewOnly ? (
                          <>
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
                              </div>

                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    PRICE METHOD
                                  </label>
                                  <Select
                                    value={pricingData.priceMethod}
                                    onChange={(e) =>
                                      setPricingData({
                                        ...pricingData,
                                        priceMethod: e,
                                      })
                                    }
                                    options={priceMethodOptions}
                                    styles={FONT_STYLE_SELECT}
                                  />
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
                                    disabled={
                                      !(
                                        pricingData.priceMethod?.value ===
                                        "FLAT_RATE"
                                      )
                                    }
                                    className="form-control border-radius-10 text-primary"
                                    value={
                                      pricingData.priceMethod?.value ===
                                      "FLAT_RATE"
                                        ? pricingData.adjustedPrice
                                        : 0.0
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
                                    value={pricingData.currency}
                                    styles={FONT_STYLE_SELECT}
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
                          </>
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
                              label="PRICE METHOD"
                              value={pricingData.priceMethod?.label}
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
                          {/* <DataGrid
                              sx={{
                                ...GRID_STYLE,
                                // width: "80%",
                                marginInline: "auto",
                              }}
                              paginationMode="client"
                              rows={[]}
                              columns={partlistColumns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              autoHeight
                            /> */}
                          </>
                        )}
                      </TabPanel>
                    </TabContext>
                  )}
                </Box>
              </div>
              <div className="Add-new-segment-div p-3 border-radius-10 mb-3">
                {segments.length > 0 ? (
                  <div class="repairbtn-dropdown">
                    <button className="btn bg-primary text-white ml-2 dropbtn">
                      View Segments
                      <span className="ml-2">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </button>
                    <div class="repairbtn-dropdown-content" id="drp">
                      {segments.map((element) => (
                        <li
                          onClick={() =>
                            setActiveElement({
                              ...activeElement,
                              name: "segment",
                              bId,
                              sId: element.id,
                              builderStatus: selBuilderStatus?.value,
                            })
                          }
                        >
                          {"Segment " +
                            String(element.segmentNumber).padStart(2, "0") +
                            " - " +
                            element.description}
                        </li>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      setActiveElement({
                        name: "segment",
                        bId,
                        builderStatus: selBuilderStatus?.value,
                      })
                    }
                    className="btn bg-primary text-white"
                    disabled={
                      !Object.values(viewOnlyTab).every((item) => item === true)
                    }
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    Add New Segment
                  </button>
                )}
              </div>
            </React.Fragment>
          )}
          {activeElement.name === "segment" && (
            <WithSparePartsSegments
              builderDetails={{
                activeElement,
                setActiveElement,
                fetchAllDetails,
              }}
            />
          )}
          {activeElement.name === "operation" && (
            <WithSparePartsOperation
              builderDetails={{ activeElement, setActiveElement }}
            />
          )}
          {activeElement.name === "service" && (
            <RepairServiceEstimate
              builderDetails={{ activeElement, setActiveElement }}
            />
          )}
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
      </div>
      <CreateKIT
        kitOpen={templateOpen}
        handleCloseKIT={() => setTemplateOpen(false)}
        handleCreateKIT={handleCreateTemplate}
        version={templateVersion}
        setVersion={setTemplateVersion}
        description={templateDescription}
        setDescription={setTemplateDescription}
        reference={templateReference}
        setReference={setTemplateReference}
      />
      <div style={{ height: "200px" }}></div>
    </React.Fragment>
  );
}

export default WithSparePartsHeader;
