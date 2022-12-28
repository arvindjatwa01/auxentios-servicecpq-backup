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
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiMenuComponent } from "pages/Operational";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import {
  createBuilderVersion,
  fetchBuilderDetails,
  fetchBuilderPricingMethods,
  fetchBuilderVersionDet,
  fetchSegments,
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
import WithoutSparePartsSegments from "./WithoutSparePartsSegments";
import { Rating, TextField } from "@mui/material";
import { customerSearch, machineSearch } from "services/searchServices";
import RepairServiceEstimate from "./RepairServiceEstimate";
import ModalCreateVersion from "./components/ModalCreateVersion";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "./CONSTANTS";
import { useAppSelector } from "app/hooks";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import LoadingProgress from "./components/Loader";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import WithoutSparePartsOperation from "./WithoutSparePartsOperation";
import { ReadOnlyField } from "./components/ReadOnlyField";

function WithoutSparePartsHeader(props) {
  const history = useHistory();
  const { state } = props.location;
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [versionOpen, setVersionOpen] = useState(false);
  const [versionDescription, setVersionDescription] = useState("");
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const currencyOptions = [{ value: "USD", label: "USD" }];
  const [activeElement, setActiveElement] = useState({
    name: "header",
    bId: "",
    sId: "",
    oId: "",
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
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
  ];

  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];
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
  const builderStatusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "ACTIVE", label: "Active" },
    { value: "REVISED", label: "Revised" },
    { value: "ARCHIVED", label: "Archived" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [value, setValue] = useState("customer");
  const open = Boolean(anchorEl);
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
          populateSegments(builderId);
        })
        .catch((err) => {
          console.log(err);
          handleSnack("error", "Error occured while fetching header details");
        });
      setHeaderLoading(false);
    }
  };
  const populateSegments = (builderId) => {
    fetchSegments(builderId)
      .then((result) => {
        if (result?.length > 0) {
          setSegments(result);
        }
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while fetching the segments");
      });
  };
  const [headerLoading, setHeaderLoading] = useState(false);
  const [rating, setRating] = useState(0);
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
      productGroup: result.productGroup,
      productSegment: result.productSegment,
    });
    setGeneralData({
      description: result.description,
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.builderId ? result.builderId : state.builderId,
      reference: result.reference,
      validity: validityOptions.find(
        (element) => element.value == result.validityDays
      ),
      version: result.versionNumber,
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
      adjustedPrice:
        pricingData.priceMethod?.value === "FLAT_RATE"
          ? pricingData.adjustedPrice
          : 0,
    };
    updateBuilderPrice(bId, data)
      .then((result) => {
        // setValue("price");
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
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    history.push("/quoteTemplate");
  };
  const options = [
    { value: "Archived", label: "Archived" },
    { value: "Draft", label: "Draft" },
    { value: "Active", label: "Active" },
    { value: "Revised", label: "Revised" },
  ];

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

  const createVersion = async (versionDesc) => {
    // await createBuilderVersion(bId, versionDesc)
    //   .then((result) => {
    //     setVersionOpen(false);
    //     setBId(result.id);
    //     setSelectedVersion({
    //       label: "Version " + result.versionNumber,
    //       value: result.versionNumber,
    //     });
    //     populateHeader(result);
    //     setVersionDescription('')
    //     handleSnack("success", `Version ${result.versionNumber} has been created`);
    //   })
    //   .catch((err) => {
    //     setVersionOpen(false);

    //     if(err.message === "Not Allowed")
    //       handleSnack("warning", ERROR_MAX_VERSIONS )
    //     else
    //       handleSnack("error", "Error occurred while creating builder version");
    //     setVersionDescription('');
    //   });
    handleSnack(
      "info",
      "Create Version API needs to be created for Without Spare Parts"
    );
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
                Repair option (without spare parts)
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
                    <MenuItem className="custommenu ml-2 mr-4">
                      Standard Job
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      data-toggle="modal"
                      data-target="#quotecreat"
                      className="custommenu ml-2 mr-4"
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
                      Without Spare Parts Header
                    </span>
                    <a
                      href={undefined}
                      className="btn-sm text-white"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        onClick={() =>
                          selBuilderStatus?.value === "DRAFT" ||
                          selBuilderStatus?.value === "REVISED"
                            ? makeHeaderEditable()
                            : handleSnack("info", "Builder is active!")
                        }
                      ></i>
                    </a>{" "}
                    <a
                      href="#"
                      className="btn-sm text-white"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </a>{" "}
                    <a
                      href="#"
                      className="btn-sm text-white"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-folder-o" aria-hidden="true"></i>
                    </a>
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
                                    placeholder="Required"
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
                                    placeholder="Optional"
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
                                    placeholder="Required"
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
                                    aria-describedby="emailHelp"
                                    placeholder="Required"
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
                                    placeholder="Required"
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
                                    placeholder="Optional"
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
                                    placeholder="Optional"
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
                                    placeholder="Optional"
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
                                    placeholder="Optional"
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
                                    placeholder="Optional"
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
                                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      inputProps={{ style: FONT_STYLE }}
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
                                    placeholder="Optional"
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
                                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      inputProps={{ style: FONT_STYLE }}
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
                                  </MuiPickersUtilsProvider> */}
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
                                <div className="align-items-center date-box">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    <span className=" mr-2">
                                      ESTIMATION DATE
                                    </span>
                                  </label>
                                  {/* <div className="form-group w-100"> */}
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
                                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      inputProps={{ style: FONT_STYLE }}
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
                                  </MuiPickersUtilsProvider> */}
                                  {/* </div> */}
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
                                    placeholder="Optional"
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

                                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                      variant="inline"
                                      format="dd/MM/yyyy"
                                      inputProps={{ style: FONT_STYLE }}
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
                                  </MuiPickersUtilsProvider> */}
                                </div>
                              </div>
                              {/* <div className="col-md-4 col-sm-4">
                            <div className="form-group">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                COST PRICE
                              </label>
                              <input
                                type="text"
                                disabled
                                className="form-control border-radius-10 text-primary"
                                placeholder="Optional"
                                value={pricingData.}
                              />
                            </div>
                          </div> */}
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
                                    placeholder="Required"
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
                          </>
                        ) : (
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
                              builderStatus: selBuilderStatus?.value
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
            <WithoutSparePartsSegments
              builderDetails={{
                activeElement,
                setActiveElement,
                fetchAllDetails,
              }}
            />
          )}
          {activeElement.name === "operation" && (
            <WithoutSparePartsOperation
              builderDetails={{ activeElement, setActiveElement }}
            />
          )}
          {activeElement.name === "service" && (
            <RepairServiceEstimate
              builderDetails={{ activeElement, setActiveElement }}
            />
          )}
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
      </div>
      <div style={{ height: "200px" }}></div>
    </React.Fragment>
  );
}

export default WithoutSparePartsHeader;
