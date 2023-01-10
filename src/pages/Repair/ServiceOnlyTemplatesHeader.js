import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Select from "react-select";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MuiMenuComponent } from "pages/Operational";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getSearchQueryCoverage } from "../../services/index";
import SearchBox from "./components/SearchBox";
import {
  APPLICATION_OPTIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  FONT_STYLE_UNIT_SELECT,
  LIFE_STAGE_OPTIONS,
  OPTIONS_USAGE,
  STATUS_OPTIONS,
  TEMPLATE_VERSION_OPTIONS,
} from "./CONSTANTS";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IconButton, Menu, MenuItem, Rating, TextField } from "@mui/material";
import Moment from "react-moment";
import {
  updateTemplateCoverage,
  updateTemplateEstimation,
  updateTemplateGeneralDet,
  updateTemplatePrice,
  updateTemplateStatus,
  fetchTemplateDetails,
  updateTemplateUsage,
  updateTemplateRating,
  fetchSegmentsStandardJob,
  updateTemplateVersion,
} from "services/templateService";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { useAppSelector } from "app/hooks";
import {
  selectDropdownOption,
  selectPricingMethodList,
} from "./dropdowns/repairSlice";
import QuerySearchComp from "./components/QuerySearchComp";
import ServiceOnlyTemplateSegment from "./ServiceOnlyTemplateSegment";
import ServiceOnlyTemplateOperation from "./ServiceOnlyTemplateOperation";
import LoadingProgress from "./components/Loader";
import { ReadOnlyField } from "./components/ReadOnlyField";
import { customerSearch } from "services/searchServices";
import ServiceOnlyTemplateEstimation from "./ServiceOnlyTemplateEstimation";
import { fetchSegments } from "services/repairBuilderServices";
import UpdateCoverageModal from "./components/UpdateCoverageModal";

function ServiceOnlyTemplates(props) {
  const history = useHistory();
  const [activeElement, setActiveElement] = useState({
    name: "header",
    templateDBId: "",
    sId: "",
    oId: "",
  });
  const { state } = props.location;
  const [segments, setSegments] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState("estimation");
  const [templateDBId, setTemplateDBId] = useState("");
  const [version, setVersion] = useState({ value: "Gold", label: "Gold" });

  const [selTemplateStatus, setSelTemplateStatus] = useState({
    value: "DRAFT",
    label: "Draft",
  });
  const [updateCoverageModalOpen, setUpdateCoverageModalOpen] = useState(false);
  const [noOptionsModelCoverage, setNoOptionsModelCoverage] = useState(false);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [templateId, setTemplateId] = useState("");

  const handleVersionTemplate = async (e) => {
    await updateTemplateVersion(templateDBId, e.value)
      .then((result) => {
        setVersion(e);
        setGeneralData({ ...generalData, version: e.value });
        handleSnack("success", "Version updated successfully!");
      })
      .catch((err) => {
        handleSnack("error", `Failed to update the Version!`);
      });
  };
  // Update the status of the builder : Active, Revised etc.
  const handleBuilderStatus = async (e) => {
    await updateTemplateStatus(templateDBId, e.value)
      .then((result) => {
        setSelTemplateStatus(e);
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
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);
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
    version: "",
    customerID: "",
    customerName: "",
    owner: "",
  });
  const [usageData, setUsageData] = useState({
    application: "",
    articleNumber: "",
    lifeStage: "",
    startUsage: "",
    endUsage: "",
    unit: OPTIONS_USAGE[0],
    usageInterval: "",
    component: "",
    validFrom: new Date(),
    validTo: new Date(),
    revisionDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ),
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
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );
  const [viewOnlyTab, setViewOnlyTab] = useState({
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
    usageViewOnly: false,
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
      fetchAllDetails(state.templateDBId);
      if (state.templateDBId) {
        fetchSegmentsStandardJob(state.templateDBId)
          .then((result) => {
            if (result?.length > 0) {
              setSegments(result);
            }
          })
          .catch((e) => {
            handleSnack("error", "Error occurred while fetching the segments");
          });
      }
    }
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
  }, []);
  const handleUpdateRating = (ratingValue) => {
    console.log(ratingValue);
    setRating(ratingValue);
    // updateTemplateRating(templateDBId, ratingValue).then(result => {
    //   handleSnack("success", "Status has been updated!");
    // }).catch(err => {

    // })
  };
  const fetchAllDetails = (id) => {
    console.log(id);
    if (id) {
      setHeaderLoading(true);
      fetchTemplateDetails(id)
        .then((result) => {
          populateHeader(result);
          setHeaderLoading(false);
          // fetchPartlist(result.id);
        })
        .catch((err) => {
          setHeaderLoading(false);
          handleSnack("error", "Error occurred while fetching details");
        });
    }
  };

  const populateHeader = (result) => {
    setViewOnlyTab({
      generalViewOnly: result.estimationDate ? true : false,
      estViewOnly: result.preparedBy ? true : false,
      priceViewOnly:
        result.priceMethod !== "EMPTY" &&
        result.priceMethod !== null &&
        result.priceMethod !== ""
          ? true
          : false,
      usageViewOnly: result.application ? true : false
    });
    setRating(result.rating);
    setSelTemplateStatus(
      STATUS_OPTIONS.filter((x) => x.value === result.status)[0]
    );
    setVersion(
      TEMPLATE_VERSION_OPTIONS.find(
        (element) => element.value === result.version
      )
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

    setGeneralData({
      description: result.description,
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.estimationNumber,
      reference: result.reference,
      version: result.version,
      owner: result.owner,
      customerID: result.customerId,
      customerName: result.customerName,
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
      netPriceLabor: result.totalLabourPrice,
      netPriceMisc: result.totalMiscPrice,
    });
    setSelectedCoverageData(result.coverages ? result.coverages : []);
    setUsageData({
      articleNumber: result.articleNumber,
      component: result.component,
      startUsage: result.startUsage,
      endUsage: result.endUsage,
      usageInterval: result.usageInterval,
      lifeStage: LIFE_STAGE_OPTIONS.find(
        (element) => element.value === result.lifeStage
      ),
      unit: result.unitOfMeasure
        ? OPTIONS_USAGE.find(
            (element) => element.value === result.unitOfMeasure
          )
        : OPTIONS_USAGE[0],
      application: APPLICATION_OPTIONS.find(
        (element) => element.value === result.application
      ),
      validFrom: result.validFrom ? result.validFrom : new Date(),
      validTo: result.validTo ? result.validTo : new Date(),
      revisionDate: result.revisionDate
        ? result.revisionDate
        : new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Change it to created date + 1 year once API is ready
    });
  };

  const currencyOptions = [{ value: "USD", label: "USD" }];

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

  const [filterMasterData, setFilterMasterData] = useState([]);

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

  // Search Customer with customer ID
  const handleCustSearch = async (searchText) => {
    setSearchCustResults([]);
    console.log(searchText);
    generalData.customerID = searchText;
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
          console.log("ABCD");
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setGeneralData({
      ...generalData,
      customerID: currentItem.customerId,
      customerName: currentItem.fullName,
    });
    setSearchCustResults([]);
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
    setUpdateCoverageModalOpen(true);
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
    updateTemplateEstimation(templateDBId, data)
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
      estimationNumber: generalData.estimationNo,
      customerId: generalData.customerID,
      customerName: generalData.customerName,
      owner: generalData.owner,
    };
    updateTemplateGeneralDet(templateDBId, data)
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
    updateTemplatePrice(templateDBId, data)
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

  const updateUsageData = () => {
    let data = {
      id: templateDBId,
      application: usageData.application?.value,
      lifeStage: usageData.lifeStage?.value,
      revisionDate: usageData.revisionDate,
      articleNumber: usageData.articleNumber,
      startUsage: usageData.startUsage,
      endUsage: usageData.endUsage,
      usageInterval: usageData.usageInterval,
      unitOfMeasure: usageData.unit?.value,
      validFrom: usageData.validFrom,
      validTo: usageData.validTo,
      component: usageData.component,
    };
    updateTemplateUsage(templateDBId, data)
      .then((result) => {
        setViewOnlyTab({ ...viewOnlyTab, usageViewOnly: true });
        handleSnack("success", "Usage details updated!");
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating the usage details!"
        );
      });
  };
  const handleUpdateCoverage = () => {
    // coverageRowData.fleetSize = undefined;
    updateTemplateCoverage(templateDBId, [coverageRowData])
      .then((res) => {
        setSelectedCoverageData(res.coverages);
        handleSnack("success", "Coverages updated successfully");
        setUpdateCoverageModalOpen(false);
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while updating coverage details");
        setUpdateCoverageModalOpen(false);
      });
  };

  const handleCoverageCheckBoxData = () => {
    let data = []; 
    filterMasterData.map((coverage) =>
      data.push({
        model: coverage.model,
        make: coverage.make,
        family: coverage.family,
        prefix: coverage.prefix,
      })
    );
    updateTemplateCoverage(templateDBId, data)
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
                    options={TEMPLATE_VERSION_OPTIONS}
                    value={version}
                  />
                </div>

                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleBuilderStatus(e)}
                    options={STATUS_OPTIONS}
                    value={selTemplateStatus}
                  />
                </div>
                <Rating
                  value={rating}
                  size="small"
                  sx={{ ml: 2 }}
                  onChange={(event, newValue) => {
                    handleUpdateRating(newValue);
                  }}
                />
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
                      data-toggle="modal"
                      data-target="#quotecreat"
                      sx={{ marginInline: 2 }}
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
                      Service Only Template Header
                    </span>
                    <a href={undefined} className="btn-sm text-white">
                      <i
                        class="fa fa-pencil"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          selTemplateStatus?.value === "DRAFT" ||
                          selTemplateStatus?.value === "REVISED"
                            ? makeHeaderEditable()
                            : handleSnack("info", "Set revised status to modify active templates")
                        }
                      ></i>
                    </a>{" "}
                    <a href={undefined} className="text-white btn-sm">
                      <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                    </a>{" "}
                    <a href={undefined} className="text-white btn-sm">
                      <i class="fa fa-folder-o" aria-hidden="true"></i>
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
                              value={estimationData.salesOffice?.value}
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
                                    VERSION
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    disabled
                                    value={generalData.version}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
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
                                    onChange={(e) =>
                                      setGeneralData({
                                        ...generalData,
                                        customerName: e.target.value,
                                      })
                                    }
                                    className="form-control border-radius-10 text-primary"
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
                                    value={generalData.owner}
                                    onChange={(e) =>
                                      setGeneralData({
                                        ...generalData,
                                        owner: e.target.value,
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
                                className="btn btn-light bg-primary text-white"
                                onClick={updateGeneralData}
                                disabled={
                                  !generalData.estimationDate ||
                                  !generalData.description ||
                                  !generalData.estimationNo ||
                                  !generalData.reference
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
                              label="VERSION"
                              value={generalData.version}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="CUSTOMER ID"
                              value={generalData.customerID}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="CUSTOMER NAME"
                              value={generalData.customerName}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="OWNER"
                              value={generalData.owner}
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
                                    onChange={(e) =>
                                      setPricingData({
                                        ...pricingData,
                                        priceMethod: e,
                                      })
                                    }
                                    options={priceMethodOptions}
                                    value={pricingData.priceMethod}
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
                                    value={pricingData.currency}
                                    styles={FONT_STYLE_SELECT}
                                  />
                                  <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                              </div>
                              {/* <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    NET PRICE (PARTS)
                                  </label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control border-radius-10 text-primary"
                                    
                                    value={pricingData.netPriceParts}
                                  />
                                </div>
                              </div> */}
                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    NET PRICE (LABOR)
                                  </label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control border-radius-10 text-primary"
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
                            <ReadOnlyField
                              label="PRICE METHOD"
                              value={pricingData.priceMethod?.label}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="CURRENCY"
                              value={pricingData.currency?.label}
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
                              label="NET PRICE (LABOR)"
                              value={pricingData.netPriceLabor}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="NET PRICE (MISC)"
                              value={pricingData.netPriceMisc}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="NET PRICE"
                              value={pricingData.netPrice}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={pricingData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            />
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
                          {masterData && masterData?.length > 0 ? (
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
                              <div className="col-md-4 col-sm-4">
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
                                    value={usageData.application}
                                    styles={FONT_STYLE_SELECT}
                                  />
                                  <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
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
                                    value={usageData.lifeStage}
                                    styles={FONT_STYLE_SELECT}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div class="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    ARTICLE #
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control border-radius-10 text-primary"
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

                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    START USAGE
                                  </label>
                                  <div className="d-flex form-control-date border-radius-10">
                                    <input
                                      className="form-control border-radius-10 text-primary"
                                      type="text"
                                      id="startUsage"
                                      value={usageData.startUsage}
                                      onChange={(e) =>
                                        setUsageData({
                                          ...usageData,
                                          startUsage: e.target.value,
                                        })
                                      }
                                    />

                                    <Select
                                      defaultValue={OPTIONS_USAGE[0]}
                                      isSearchable={false}
                                      styles={FONT_STYLE_UNIT_SELECT}
                                      options={OPTIONS_USAGE}
                                      // className="text-primary"
                                      value={usageData.unit}
                                      onChange={(e) =>
                                        setUsageData({ ...usageData, unit: e })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    END USAGE
                                  </label>

                                  <div
                                    className=" d-flex form-control-date"
                                    style={{ overflow: "hidden" }}
                                  >
                                    <input
                                      className="form-control border-radius-10 text-primary"
                                      type="text"
                                      id="endUsage"
                                      value={usageData.endUsage}
                                      onChange={(e) => {
                                        setUsageData({
                                          ...usageData,
                                          endUsage: e.target.value,
                                        });
                                      }}
                                    />
                                    <span
                                      className="hours-div"
                                      style={{ minWidth: 100 }}
                                    >
                                      {usageData.unit?.label}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    USAGE INTERVAL
                                  </label>
                                  <div
                                    className=" d-flex form-control-date"
                                    style={{ overflow: "hidden" }}
                                  >
                                    <input
                                      type="text"
                                      class="form-control border-radius-10 text-primary"
                                      value={usageData.usageInterval}
                                      onChange={(e) =>
                                        setUsageData({
                                          ...usageData,
                                          usageInterval: e.target.value,
                                        })
                                      }
                                    />
                                    <span
                                      className="hours-div"
                                      style={{ minWidth: 100 }}
                                    >
                                      {usageData.unit?.label}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    <span className=" mr-2">VALID FROM</span>
                                  </label>
                                  <div className="align-items-center date-box">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <MobileDatePicker
                                        inputFormat="dd/MM/yyyy"
                                        className="form-controldate border-radius-10"
                                        // minDate={new Date()}
                                        closeOnSelect
                                        value={usageData.validFrom}
                                        onChange={(e) =>
                                          setUsageData({
                                            ...usageData,
                                            validFrom: e,
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
                                    <span className=" mr-2">VALID TO</span>
                                  </label>
                                  <div className="align-items-center date-box w-100">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <MobileDatePicker
                                        inputFormat="dd/MM/yyyy"
                                        className="form-controldate border-radius-10"
                                        minDate={usageData.validFrom}
                                        closeOnSelect
                                        value={usageData.validTo}
                                        onChange={(e) =>
                                          setUsageData({
                                            ...usageData,
                                            validTo: e,
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
                                    <span className=" mr-2">
                                      NEXT REVISION DATE
                                    </span>
                                  </label>
                                  <div className="align-items-center date-box">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <MobileDatePicker
                                        inputFormat="dd/MM/yyyy"
                                        className="form-controldate border-radius-10"
                                        minDate={new Date()}
                                        closeOnSelect
                                        value={usageData.revisionDate}
                                        onChange={(e) =>
                                          setUsageData({
                                            ...usageData,
                                            revisionDate: e,
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
                                <div class="form-group">
                                  <label className="text-light-dark font-size-12 font-weight-500">
                                    COMPONENT
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control border-radius-10 text-primary"
                                    value={usageData.component}
                                    onChange={(e) =>
                                      setUsageData({
                                        ...usageData,
                                        component: e.target.value,
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
                                className="btn btn-light bg-primary text-white"
                                onClick={updateUsageData}
                                disabled={
                                  !(
                                    usageData.application?.value &&
                                    usageData.revisionDate
                                  )
                                }
                              >
                                Save
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div className="row mt-3">
                            <ReadOnlyField
                              label="APPLICATION"
                              value={usageData.application?.label}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="LIFE STAGE"
                              value={usageData.lifeStage?.label}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="ARTICLE #"
                              value={usageData.articleNumber}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="START USAGE"
                              value={
                                usageData.startUsage
                                  ? usageData.startUsage +
                                    " " +
                                    usageData.unit?.label
                                  : "NA"
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="END USAGE"
                              value={
                                usageData.endUsage
                                  ? usageData.endUsage +
                                    " " +
                                    usageData.unit?.label
                                  : "NA"
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="USAGE INTERVAL"
                              value={
                                usageData.usageInterval
                                  ? usageData.usageInterval +
                                    " " +
                                    usageData.unit?.label
                                  : "NA"
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="VALID FROM"
                              value={
                                <Moment format="DD/MM/YYYY">
                                  {usageData.validFrom}
                                </Moment>
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="VALID TO"
                              value={
                                <Moment format="DD/MM/YYYY">
                                  {usageData.validTo}
                                </Moment>
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="NEXT RIVISION DATE"
                              value={
                                <Moment format="DD/MM/YYYY">
                                  {usageData.revisionDate}
                                </Moment>
                              }
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="COMPONENT"
                              value={usageData.component}
                              className="col-md-4 col-sm-4"
                            />
                          </div>
                        )}
                      </TabPanel>
                    </TabContext>
                  )}
                </Box>
              </div>
              <div className="Add-new-segment-div p-3 border-radius-10 mb-2">
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
                              templateDBId,
                              sId: element.id,
                              templateStatus: selTemplateStatus?.value,
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
                    className="btn bg-primary text-white"
                    onClick={() =>
                      setActiveElement({
                        name: "segment",
                        templateDBId,
                        templateStatus: selTemplateStatus?.value,
                      })
                    }
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
            <ServiceOnlyTemplateSegment
              templateDetails={{
                activeElement,
                setActiveElement,
                fetchAllDetails
              }}
            />
          )}
          {activeElement.name === "operation" && (
            <ServiceOnlyTemplateOperation
              templateDetails={{
                activeElement,
                setActiveElement,
              }}
            />
          )}
          {activeElement.name === "service" && (
            <ServiceOnlyTemplateEstimation
              templateDetails={{
                activeElement,
                setActiveElement,
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
        {/* Coverage Update Modal  */}
        <UpdateCoverageModal
          modalOpen={updateCoverageModalOpen}
          setModalOpen={setUpdateCoverageModalOpen}
          coverageRowData={coverageRowData}
          setCoverageRowData={setCoverageRowData}
          querySearchModelPrefixOption={querySearchModelPrefixOption}
          handleCoverageModelSearch={handleCoverageModelSearch}
          searchCoverageModelResults={searchCoverageModelResults}
          handleCoverageModelSelect={handleCoverageModelSelect}
          noOptionsModelCoverage={noOptionsModelCoverage}
          handleUpdateCoverage={handleUpdateCoverage}
        />
      </div>
    </>
  );
}

export default ServiceOnlyTemplates;
