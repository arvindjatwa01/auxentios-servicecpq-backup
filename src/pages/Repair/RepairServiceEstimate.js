import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as Select, default as SelectFilter } from "react-select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useEffect } from "react";
import {
  AddServiceHeader,
  FetchServiceHeader,
  AddLaborToService,
  FetchLaborforService,
  AddConsumableToService,
  AddExtWorkToService,
  AddMiscToService,
  FetchConsumableforService,
  AddLaborItemToLabor,
  FetchLaborItems,
  RemoveLaborItem,
  FetchExtWorkforService,
  FetchExtWorkItems,
  FetchConsumableItems,
  AddConsumableItem,
  AddExtWorkItem,
  RemoveConsumableItem,
  RemoveExtWorkItem,
  FetchMiscforService,
  FetchBasePrice,
} from "services/repairBuilderServices";
import Moment from "react-moment";
import { useAppSelector } from "app/hooks";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import penIcon from "../../assets/images/pen.png";
import {
  selectDropdownOption,
  selectChargeCodeList,
  selectLaborTypeList,
  selectServiceTypeList,
  selectLaborCodeList,
  selectPricingMethodList,
  selectMiscTypeList,
  selectActivityIdList,
  selectDimensionList,
  selectConsumableTypeList,
} from "pages/Repair/dropdowns/repairSlice";

import Loader from "react-js-loader";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import SearchBox from "./components/SearchBox";
import {
  getConsumables,
  getExtWork,
  getVendors,
} from "services/searchServices";
import { FormControlLabel, FormGroup, Switch, Tooltip } from "@mui/material";
import AddLaborItemModal from "./components/AddLaborItem";
import {
  CONSEXT_PRICE_OPTIONS_NOLABOR,
  CONSUMABLE_SEARCH_Q_OPTIONS,
  CONS_EXT_PRICE_OPTIONS,
  EXTWORK_SEARCH_Q_OPTIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  LABOR_PRICE_OPTIONS,
  MISC_PRICE_OPTIONS,
  MISC_PRICE_OPTIONS_NOLABOR,
} from "./CONSTANTS";
import SearchComponent from "./components/SearchComponent";
import AddExtWorkItemModal from "./components/AddExtWorkItem";
import AddConsumableItemModal from "./components/AddConsumableItem";
import LoadingProgress from "./components/Loader";

function RepairServiceEstimate(props) {
  const { activeElement, setActiveElement } = props.builderDetails;
  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);
  const [searchResultConsOpen, setSearchResultConsOpen] = useState(false);
  const [searchResultExtWorkOpen, setSearchResultExtWorkOpen] = useState(false);
  // Close consumable search modal
  const handleSearchResConsClose = () => {
    setSearchResultConsOpen(false);
  };

  // Close ext work search modal
  const handleSearchResExtClose = () => {
    setSearchResultExtWorkOpen(false);
  };

  // Retrieve charge codes
  const chargeCodeList = useAppSelector(
    selectDropdownOption(selectChargeCodeList)
  );

  // Retrieve labor types
  const laborTypeList = useAppSelector(
    selectDropdownOption(selectLaborTypeList)
  );

  // Retrieve service types
  const serviceTypeList = useAppSelector(
    selectDropdownOption(selectServiceTypeList)
  );

  // Retrieve labor codes
  const laborCodeList = useAppSelector(
    selectDropdownOption(selectLaborCodeList)
  );

  // Retrieve misc types
  const miscTypeList = useAppSelector(selectDropdownOption(selectMiscTypeList));

  // Retrieve dimensions
  const dimensionList = useAppSelector(
    selectDropdownOption(selectDimensionList)
  );
  // Retrieve consumables
  const consumableTypeList = useAppSelector(
    selectDropdownOption(selectConsumableTypeList)
  );
  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );

  // Retrieve activity Ids
  const activityIdList = useAppSelector(
    selectDropdownOption(selectActivityIdList)
  );

  const [flagRequired, setFlagRequired] = useState({
    labourEnabled: true,
    consumableEnabled: true,
    externalWorkEnabled: true,
    miscEnabled: true,
  });
  const [serviceEstimateData, setServiceEstimateData] = useState({
    reference: "",
    description: "",
    segmentTitle: "",
    jobOperation: "",
    priceMethod: null,
    priceDate: new Date(),
    currency: "USD",
    netPrice: 0.0,
    jobCode: "",
    adjustedPrice: 0,
  });
  const initialLaborItemData = {
    isEditing: false,
    chargeCode: "",
    laborType: "",
    serviceType: "",
    unitOfMeasure: "",
    estimatedHours: 0,
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
    currency: serviceEstimateData.currency,
    comment: "",
    travelIncluded: true,
    travelCharge: 0.0,
    inspectionIncluded: true,
    inspectionCharge: 0.0,
  };
  const initialExtWorkItemData = {
    activityId: "",
    activityName: "",
    description: "",
    supplyingVendorCode: "",
    supplyingVendorName: "",
    unitOfMeasure: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
    estimatedHours: "",
    adjustedPrice: 0.0,
    dimensions: "",
  };
  const initialConsumableItemData = {
    consumableType: "",
    consumableCode: "",
    description: "",
    quantity: "",
    unitOfMeasure: "",
    supplyingVendorCode: "",
    supplyingVendorName: "",
    vendor: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
    usagePercentage: 100,
    currency: serviceEstimateData.currency,
  };
  const [labourData, setLabourData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    laborCode: "",
    pricingMethod: "",
    ratePerHourOrDay: 0,
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
    flatRateIndicator: false,
    totalHours: 0,
  });
  const [laborItemOpen, setLaborItemOpen] = React.useState(false);
  const [consumableItemOpen, setConsumableItemOpen] = React.useState(false);
  const [extWorkItemOpen, setExtWorkItemOpen] = React.useState(false);
  const [labourItemData, setLabourItemData] = useState(initialLaborItemData);
  const [extWorkItemData, setExtWorkItemData] = useState(
    initialExtWorkItemData
  );
  const [consumableItemData, setConsumableItemData] = useState(
    initialConsumableItemData
  );
  // Consumable Header
  const [consumableData, setConsumableData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    flatRateIndicator: false,
    adjustedPrice: 0.0,
    basePrice: 0.0,
    percentageOfBase: 0,
  });
  // Ext Work Header
  const [extWorkData, setExtWorkData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    flatRateIndicator: false,
    adjustedPrice: 0.0,
    basePrice: 0.0,
    percentageOfBase: 0,
  });
  // Misc Header
  const [miscData, setMiscData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    flatRateIndicator: false,
    adjustedPrice: 0.0,
    type: "",
    basePrice: 0.0,
    percentageOfBase: 0,
  });
  // In case there are no options from search result set the flag
  const [noOptionsVendor, setNoOptionsVendor] = useState(false);
  const [noOptionsConsumable, setNoOptionsConsumable] = useState(false);
  // To store search API results
  const [searchVenodrResults, setSearchVendorResults] = useState([]);
  const [searchConsumableResult, setSearchConsumableResult] = useState([]);
  // to handle snack messages
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  // Make the headers viewonly after storing the data
  const [laborViewOnly, setLaborViewOnly] = useState(false);
  const [consumableViewOnly, setConsumableViewOnly] = useState(false);
  const [extWorkViewOnly, setExtWorkViewOnly] = useState(false);
  const [miscViewOnly, setMiscViewOnly] = useState(false);
  const [serviceHeaderViewOnly, setServiceHeaderViewOnly] = useState(false);
  //Open the snack message
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  // To close snack message
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  // Consumable Search
  const handleQuerySearchClick = async (type) => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    var querySearchSelector =
      type === "consumables" ? queryConsSearchSelector : queryExtSearchSelector;
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory?.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory?.value &&
        item.inputSearch &&
        item.selectOperator?.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else {
        searchStr = "";
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        if (type === "consumables") {
          const res = await getConsumables(searchStr);
          setMasterData(res);
          setSearchResultConsOpen(true);
        } else if (type === "extwork") {
          const res = await getExtWork(searchStr);
          setMasterData(res);
          setSearchResultExtWorkOpen(true);
        }
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching results!");
    }
  };

  // Header fields are required or not (Labor, ext work, misc etc)
  const handleChangeSwitch = (event) => {
    setFlagRequired({
      ...flagRequired,
      [event.target.name]: event.target.checked,
    });
    AddServiceHeader(activeElement.oId, {
      id: serviceEstimateData.id,
      [event.target.name]: event.target.checked,
    })
      .then((result) => {
        handleSnack("success", "Please fill the corresponding header details!");
      })
      .catch((e) => {
        handleSnack("error", "Error occured while updating the details!");
      });
  };

  const unitOfMeasureOptions = [
    { label: "Hours", value: "HOURS" },
    { label: "Days", value: "DAYS" },
  ];
  // Sets the value for the tab (labor, consumable, misc, extWork)
  const [value, setValue] = useState("labor");

  //fetches the service headers if already saved or sets the appropriate values
  useEffect(() => {
    setServiceEstHeaderLoading(true);
    populateServiceEstimation("all");
  }, []);

  const populateServiceEstimation = (fetchType) => {
    if (activeElement.oId) {
      FetchServiceHeader(activeElement.oId)
        .then((result) => {
          setServiceEstimateData({
            ...serviceEstimateData,
            reference: result.reference,
            id: result.id,
            currency: result.currency ? result.currency : "USD",
            description: result.description,
            jobCode: result.jobCode,
            jobCodeDescription: result.jobCodeDescription,
            componentCode: result.componentCode,
            componentCodeDescription: result.componentCodeDescription,
            jobOperation: result.jobOperation,
            netPrice: result.netPrice ? result.netPrice : 0.0,
            adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
            priceDate: result.priceDate,
            priceMethod: priceMethodOptions.find(
              (element) => element.value === result.priceMethod
            ),
            segmentTitle: result.segmentTitle,
          });
          setFlagRequired({
            labourEnabled: result.labourEnabled,
            consumableEnabled: result.consumableEnabled,
            externalWorkEnabled: result.externalWorkEnabled,
            miscEnabled: result.miscEnabled,
          });
          //if service header exists then mark it view only
          setServiceHeaderViewOnly(result.id ? true : false);
          if (result.id) {
            if (fetchType === "all" || fetchType === "labor")
              populateLaborData(result);
            if (fetchType === "all" || fetchType === "consumable")
              populateConsumableData(result);
            if (fetchType === "all" || fetchType === "extwork")
              populateExtWorkData(result);
            if (fetchType === "all" || fetchType === "misc")
              populateMiscData(result);
          } else {
            setLabourData({
              ...labourData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobOperation,
            });
            setConsumableData({
              ...consumableData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobOperation,
            });
            setExtWorkData({
              ...extWorkData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobOperation,
            });
            setMiscData({
              ...miscData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobOperation,
            });
          }
          setServiceEstHeaderLoading(false);
        })
        .catch((e) => {
          handleSnack(
            "error",
            "Error occurred while fetching the estimate header details!"
          );
          setServiceEstHeaderLoading(false);
        });
    }
  };
  function populateLaborData(result) {
    FetchLaborforService(result.id)
      .then((resultLabour) => {
        if (resultLabour && resultLabour.id) {
          setLabourData({
            ...resultLabour,
            id: resultLabour.id,
            pricingMethod: LABOR_PRICE_OPTIONS.find(
              (element) => element.value === resultLabour.pricingMethod
            ),
            laborCode: laborCodeList.find(
              (element) => element.value === resultLabour.laborCode
            ),
            totalPrice: resultLabour.totalPrice ? resultLabour.totalPrice : 0,
          });
          populateLaborItems(resultLabour);
          setLaborViewOnly(true);
        }
      })
      .catch((e) => {
        setLabourData({
          ...labourData,
          jobCode: result.jobCode,
          jobCodeDescription: result.jobOperation,
        });
      });
  }

  function populateLaborItems(result) {
    FetchLaborItems(result.id)
      .then((resultLabourItems) => {
        if (resultLabourItems && resultLabourItems.result?.length > 0) {
          setLaborItems(resultLabourItems.result);
        }
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while fetching labor items");
      });
  }

  function populateConsumableData(result) {
    FetchConsumableforService(result.id)
      .then((resultConsumable) => {
        if (resultConsumable && resultConsumable.id) {
          setConsumableData({
            ...resultConsumable,
            id: resultConsumable.id,
            pricingMethod: CONS_EXT_PRICE_OPTIONS.find(
              (element) => element.value === resultConsumable.pricingMethod
            ),
            totalPrice: resultConsumable.totalPrice
              ? resultConsumable.totalPrice
              : 0,
          });
          populateConsItems(resultConsumable);
          setConsumableViewOnly(true);
        }
      })
      .catch((e) => {
        setConsumableData({
          ...consumableData,
          jobCode: result.jobCode,
          jobCodeDescription: result.jobOperation,
        });
      });
  }

  function populateConsItems(result) {
    FetchConsumableItems(result.id)
      .then((resultConsumableItems) => {
        if (resultConsumableItems && resultConsumableItems.result?.length > 0) {
          setConsumableItems(resultConsumableItems.result);
        }
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while fetching consumable items");
      });
  }

  // Populate Ext work header
  function populateExtWorkData(result) {
    FetchExtWorkforService(result.id)
      .then((resultExtWork) => {
        if (resultExtWork && resultExtWork.id) {
          setExtWorkData({
            ...resultExtWork,
            id: resultExtWork.id,
            pricingMethod: CONS_EXT_PRICE_OPTIONS.find(
              (element) => element.value === resultExtWork.pricingMethod
            ),
            totalPrice: resultExtWork.totalPrice ? resultExtWork.totalPrice : 0,
          });
          populateExtWorkItems(resultExtWork);
          setExtWorkViewOnly(true);
        }
      })
      .catch((e) => {
        setExtWorkData({
          ...extWorkData,
          jobCode: result.jobCode,
          jobCodeDescription: result.jobOperation,
        });
      });
  }
  function populateExtWorkItems(result) {
    FetchExtWorkItems(result.id)
      .then((resultExtWorkItems) => {
        if (resultExtWorkItems && resultExtWorkItems.result?.length > 0) {
          setExtWorkItems(resultExtWorkItems.result);
        }
      })
      .catch((e) => {
        handleSnack(
          "error",
          "Error occurred while fetching external work items"
        );
      });
  }

  // Populate misc header
  function populateMiscData(result) {
    FetchMiscforService(result.id)
      .then((resultMisc) => {
        if (resultMisc && resultMisc.id) {
          setMiscData({
            ...resultMisc,
            id: resultMisc.id,
            pricingMethod: MISC_PRICE_OPTIONS.find(
              (element) => element.value === resultMisc.pricingMethod
            ),
            type: miscTypeList.find(
              (element) => element.value === resultMisc.type
            ),
            totalPrice: resultMisc.totalPrice ? resultMisc.totalPrice : 0,
          });
          setMiscViewOnly(true);
        }
      })
      .catch((e) => {
        setMiscData({
          ...miscData,
          jobCode: result.jobCode,
          jobCodeDescription: result.jobOperation,
        });
      });
  }
  const makeHeaderEditable = (type) => {
    if (type === "serviceEstHeader" && serviceHeaderViewOnly)
      setServiceHeaderViewOnly(false);
    if (value === "labor" && laborViewOnly) setLaborViewOnly(false);
    else if (value === "consumables" && consumableViewOnly)
      setConsumableViewOnly(false);
    else if (value === "extwork" && extWorkViewOnly) setExtWorkViewOnly(false);
    else if (value === "othrMisc" && miscViewOnly) setMiscViewOnly(false);
  };
  // Search Vendors
  const handleVendorSearch = async (searchVendorfieldName, searchText) => {
    setSearchVendorResults([]);
    if (searchVendorfieldName === "consVendor") {
      consumableItemData.supplyingVendorName = searchText;
    } else {
      extWorkItemData.supplyingVendorName = searchText;
    }
    if (searchText) {
      await getVendors("fullName~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchVendorResults(result);
            setNoOptionsVendor(false);
          } else {
            setNoOptionsVendor(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the vendor!");
        });
    }
  };

  // Search Consumable
  const handleConsumableSearch = async (
    searchConsumablefieldName,
    searchText
  ) => {
    setSearchConsumableResult([]);
    consumableItemData.consumableCode = searchText;
    if (searchText) {
      await getConsumables("consumableId~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchConsumableResult(result);
            setNoOptionsConsumable(false);
          } else {
            setNoOptionsConsumable(true);
          }
        })
        .catch((e) => {
          console.log(e);
          handleSnack(
            "error",
            "Error occurred while searching the Consumable!"
          );
        });
    }
  };

  // Select the vendor from search result
  const handleVendorSelect = (type, currentItem) => {
    setExtWorkItemData({
      ...extWorkItemData,
      supplyingVendorName: currentItem.fullName,
      supplyingVendorCode: currentItem.customerId,
    });
    setSearchVendorResults([]);
  };
  const handleVendorConsSelect = (type, currentItem) => {
    setConsumableItemData({
      ...consumableItemData,
      supplyingVendorName: currentItem.fullName,
      supplyingVendorCode: currentItem.customerId,
    });
    setSearchVendorResults([]);
  };

  // Select the consumable from search result
  const handleConsumableSelect = (type, currentItem) => {
    setConsumableItemData({
      ...consumableItemData,
      consumableCode: currentItem.consumableId,
      description: currentItem.name,
      unitOfMeasure: currentItem.unit,
    });
    setSearchConsumableResult([]);
  };

  //Add or update Service Est Header
  const updateServiceEstHeader = () => {
    let data = {
      ...serviceEstimateData,
      priceMethod: serviceEstimateData.priceMethod?.value,
      adjustedPrice:
        serviceEstimateData.priceMethod?.value === "FLAT_RATE"
          ? serviceEstimateData.adjustedPrice
          : 0.0,
    };
    AddServiceHeader(activeElement.oId, data)
      .then((result) => {
        setServiceEstimateData({
          ...result,
          id: result.id,
          priceMethod: priceMethodOptions.find(
            (element) => element.value === result.priceMethod
          ),
        });
        handleSnack("success", "Service estimate details updated!");
        setServiceHeaderViewOnly(true);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating service estimate header!"
        );
      });
  };
  const updateLabourEstHeader = () => {
    let data = {
      // ...labourData,
      ...(labourData.id && { id: labourData.id }),
      jobCode: labourData.jobCode,
      jobCodeDescription: labourData.jobCodeDescription,
      pricingMethod: labourData.pricingMethod?.value,
      laborCode: labourData.laborCode?.value,
      totalHours: labourData.totalHours,
      flatRateIndicator: labourData.flatRateIndicator,
      adjustedPrice: labourData.flatRateIndicator
        ? labourData.adjustedPrice
        : 0.0,
      payer: labourData.payer,
    };
    AddLaborToService(serviceEstimateData.id, data)
      .then((result) => {
        setLabourData({
          ...result,
          id: result.id,
          pricingMethod: LABOR_PRICE_OPTIONS.find(
            (element) => element.value === result.pricingMethod
          ),
          totalPrice: result.totalPrice ? result.totalPrice : 0,
          laborCode: laborCodeList.find(
            (element) => element.value === result.laborCode
          ),
        });
        handleSnack("success", "Labour details updated!");
        setLaborViewOnly(true);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating labor details!");
      });
  };

  // Add or Update consumable data
  const updateConsumableHeader = () => {
    let data = {
      // ...consumableData,
      ...(consumableData.id && { id: consumableData.id }),
      jobCode: consumableData.jobCode,
      jobCodeDescription: consumableData.jobCodeDescription,
      ...(!consumableData.flatRateIndicator
        ? consumableData.pricingMethod?.value?.includes("PER")
          ? {
              percentageOfBase: consumableData.percentageOfBase,
              pricingMethod: consumableData.pricingMethod?.value,
              basePrice: consumableData.basePrice,
            }
          : { pricingMethod: consumableData.pricingMethod?.value }
        : {}),
      flatRateIndicator: consumableData.flatRateIndicator,
      adjustedPrice: consumableData.flatRateIndicator
        ? consumableData.adjustedPrice
        : 0.0,
      payer: consumableData.payer,
    };
    AddConsumableToService(serviceEstimateData.id, data)
      .then((result) => {
        setConsumableData({
          ...result,
          id: result.id,
          pricingMethod: CONS_EXT_PRICE_OPTIONS.find(
            (element) => element.value === result.pricingMethod
          ),
        });
        handleSnack("success", "Consumable details updated!");
        setConsumableViewOnly(true);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating consumable data!");
      });
  };

  // Add or Update ext work data
  const updateExtWorkHeader = () => {
    let data = {
      // ...extWorkData,
      ...(extWorkData.id && { id: extWorkData.id }),
      jobCode: extWorkData.jobCode,
      jobCodeDescription: extWorkData.jobCodeDescription,
      flatRateIndicator: extWorkData.flatRateIndicator,
      ...(!extWorkData.flatRateIndicator
        ? extWorkData.pricingMethod?.value?.includes("PER")
          ? {
              percentageOfBase: extWorkData.percentageOfBase,
              pricingMethod: extWorkData.pricingMethod?.value,
              basePrice: extWorkData.basePrice,
            }
          : { pricingMethod: extWorkData.pricingMethod?.value }
        : {}),
      adjustedPrice: extWorkData.flatRateIndicator
        ? extWorkData.adjustedPrice
        : 0.0,
      payer: extWorkData.payer,
    };
    AddExtWorkToService(serviceEstimateData.id, data)
      .then((result) => {
        setExtWorkData({
          ...result,
          id: result.id,
          pricingMethod: CONS_EXT_PRICE_OPTIONS.find(
            (element) => element.value === result.pricingMethod
          ),
        });
        handleSnack("success", "External work details updated!");
        setExtWorkViewOnly(true);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating external work data!"
        );
      });
  };

  // Add or Update misc data
  const updateMiscHeader = () => {
    let data = {
      // ...miscData,
      ...(miscData.id && { id: miscData.id }),
      jobCode: miscData.jobCode,
      jobCodeDescription: miscData.jobCodeDescription,
      flatRateIndicator: miscData.flatRateIndicator,
      ...(!miscData.flatRateIndicator && {
        percentageOfBase: miscData.percentageOfBase,
        pricingMethod: miscData.pricingMethod?.value,
        basePrice: miscData.basePrice,
      }),
      adjustedPrice: miscData.flatRateIndicator ? miscData.adjustedPrice : 0.0,
      payer: miscData.payer,
      type: miscData.type?.value,
    };
    AddMiscToService(serviceEstimateData.id, data)
      .then((result) => {
        setMiscData({
          ...result,
          id: result.id,
          pricingMethod: MISC_PRICE_OPTIONS.find(
            (element) => element.value === result.pricingMethod
          ),
          type: miscTypeList.find((element) => element.value === result.type),
        });
        populateServiceEstimation("misc");
        handleSnack("success", "Misc details updated!");
        setMiscViewOnly(true);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating misc data!");
      });
  };

  // Add or Update Labor Item
  const addLaborItem = () => {
    let data = {
      // ...labourItemData,
      ...(labourItemData.id && { id: labourItemData.id }),
      chargeCode: labourItemData.chargeCode?.value,
      laborType: labourItemData.laborType?.value,
      serviceType: labourItemData.serviceType?.value,
      unitOfMeasure: labourItemData.unitOfMeasure?.value,
      estimatedHours: labourItemData.estimatedHours,
      comment: labourItemData.comment,
      travelIncluded: labourItemData.travelIncluded,
      travelCharge: labourItemData.travelCharge,
      inspectionIncluded: labourItemData.inspectionIncluded,
      inspectionCharge: labourItemData.inspectionCharge,
      currency: labourItemData.currency,
    };

    AddLaborItemToLabor(labourData.id, data)
      .then((result) => {
        setLabourItemData(initialLaborItemData);
        // populateLaborItems(labourData);
        // populateLaborData(serviceEstimateData);
        populateServiceEstimation("labor");
        handleSnack("success", "Added labor item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding labor item!");
      });
    handleLaborItemClose();
  };

  // Add or Update Consumable Item
  const addConsumableItem = () => {
    if (consumableData.id) {
      let data = {
        // ...consumableItemData,
        ...(consumableItemData.id && { id: consumableItemData.id }),
        consumableType: consumableItemData.consumableType?.value,
        supplyingVendorCode: consumableItemData.supplyingVendorCode,
        supplyingVendorName: consumableItemData.supplyingVendorName,
        consumableCode: consumableItemData.consumableCode,
        description: consumableItemData.description,
        quantity: consumableItemData.quantity,
        unitOfMeasure: consumableItemData.unitOfMeasure,
        usagePercentage: consumableItemData.usagePercentage,
        // vendor: consumableItemData.vendor,
        currency: consumableItemData.currency,
      };

      AddConsumableItem(consumableData.id, data)
        .then((result) => {
          setConsumableItemData(initialConsumableItemData);
          // populateConsItems(consumableData);
          // populateConsumableData(serviceEstimateData);
          populateServiceEstimation("consumable");
          handleSnack("success", "Added consumable item successfully");
        })
        .catch((err) => {
          handleSnack("error", "Error occurred while adding consumable item!");
        });
      handleConsumableItemClose();
      setQueryConsSearchSelector(initialConsQuery);
    } else {
      handleSnack("warning", "Please update the consumable header details!");
    }
  };

  // Add or Update Consumable Item
  const addExtWorkItem = () => {
    let data = {
      // ...extWorkItemData,
      ...(extWorkItemData.id && { id: extWorkItemData.id }),
      activityId: extWorkItemData.activityId?.value,
      activityName: extWorkItemData.activityName,
      description: extWorkItemData.description,
      supplyingVendorCode: extWorkItemData.supplyingVendorCode,
      supplyingVendorName: extWorkItemData.supplyingVendorName,
      estimatedHours: extWorkItemData.estimatedHours,
      dimensions: extWorkItemData.dimensions?.value,
      ...(extWorkItemData.adjustedPrice && {
        adjustedPrice: extWorkItemData.adjustedPrice,
      }),
      unitOfMeasure: extWorkItemData.unitOfMeasure?.value,
    };

    AddExtWorkItem(extWorkData.id, data)
      .then((result) => {
        setExtWorkItemData(initialExtWorkItemData);
        // populateExtWorkItems(extWorkData);
        // populateExtWorkData(serviceEstimateData);
        populateServiceEstimation("extwork");
        handleSnack("success", "Added ext work item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding external work item!");
      });
    setQueryExtSearchSelector(initialExtWorkQuery);
    handleExtWorkItemClose();
  };
  const handleAddItemLabor = () => {
    if (labourData.id) setLaborItemOpen(true);
    else handleSnack("warning", "Please update the lobor header details!");
  };
  // Open Labor item to view or edit
  const openLaborRow = (row) => {
    setLabourItemData({
      ...row,
      chargeCode: chargeCodeList.find(
        (element) => element.value === row.chargeCode
      ),
      laborType: laborTypeList.find(
        (element) => element.value === row.laborType
      ),
      serviceType: serviceTypeList.find(
        (element) => element.value === row.serviceType
      ),
      unitOfMeasure: unitOfMeasureOptions.find(
        (element) => element.value === row.unitOfMeasure
      ),
      unitPrice: row.unitPrice ? row.unitPrice : 0,
      extendedPrice: row.extendedPrice ? row.extendedPrice : 0,
      totalPrice: row.totalPrice ? row.totalPrice : 0,
      isEditing: true,
    });
    // setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    // setPartFieldViewonly(true);
    setLaborItemOpen(true);
  };

  //Remove Labor Item
  const handleDeleteLaborItem = (laborItemId) => {
    RemoveLaborItem(labourData.id, laborItemId)
      .then((res) => {
        handleSnack("success", res);
        // populateLaborItems(labourData);
        populateServiceEstimation("labor");
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the labor item");
      });
  };

  const handleAddItemConsumable = () => {
    if (consumableData.id) setConsumableItemOpen(true);
    else handleSnack("warning", "Please update the consumable header details!");
  };

  // Open consumable item to view or edit
  const openConsumableRow = (row) => {
    setConsumableItemData({
      ...row,
      consumableType: consumableTypeList.find(
        (element) => element.value === row.consumableType
      ),
      unitPrice: row.unitPrice ? row.unitPrice : 0,
      extendedPrice: row.extendedPrice ? row.extendedPrice : 0,
      totalPrice: row.totalPrice ? row.totalPrice : 0,
    });
    // setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    setConsumableItemOpen(true);
  };

  //Remove Consumable Item
  const handleDeleteConsumableItem = (consItemId) => {
    RemoveConsumableItem(consumableData.id, consItemId)
      .then((res) => {
        handleSnack("success", res);
        // populateConsItems(consumableData);
        populateServiceEstimation("consumable");
      })
      .catch((e) => {
        console.log(e);
        handleSnack(
          "error",
          "Error occurred while removing the consumable item"
        );
      });
  };

  // Open ext work item to view or edit
  const openExtWorkRow = (row) => {
    console.log(row.activityId);
    setExtWorkItemData({
      ...row,
      activityId: activityIdList.find(
        (element) => element.value === row.activityId
      ),
      dimensions: dimensionList.find(
        (element) => element.value === row.dimensions
      ),
      unitOfMeasure: unitOfMeasureOptions.find(
        (element) => element.value === row.unitOfMeasure
      ),
      unitPrice: row.unitPrice ? row.unitPrice : 0,
      extendedPrice: row.extendedPrice ? row.extendedPrice : 0,
      totalPrice: row.totalPrice ? row.totalPrice : 0,
    });
    setExtWorkItemOpen(true);
  };
  //Remove Ext work Item
  const handleDeleteExtWorkItem = (extWorkItemId) => {
    RemoveExtWorkItem(extWorkData.id, extWorkItemId)
      .then((res) => {
        handleSnack("success", res);
        // populateExtWorkItems(extWorkData);
        populateServiceEstimation("extwork");
      })
      .catch((e) => {
        console.log(e);
        handleSnack(
          "error",
          "Error occurred while removing the ext work item!"
        );
      });
  };
  const [basePriceValues, setBasePriceValues] = useState({
    PER_ON_TOTAL: 0.0,
    PER_ON_LABOR: 0.0,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (["consumables", "extwork", "othrMisc"].includes(newValue)) {
      FetchBasePrice(serviceEstimateData.id)
        .then((result) => {
          setBasePriceValues(result);
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while fetching base price!");
        });
    }
  };

  const handleExtWorkItemClose = () => {
    setExtWorkItemOpen(false);
    setSearchVendorResults([]);
    setExtWorkItemData(initialExtWorkItemData);
  };
  const handleConsumableItemClose = () => {
    setConsumableItemOpen(false);
    setSearchVendorResults([]);
    setConsumableItemData(initialConsumableItemData);
  };
  const handleLaborItemClose = () => {
    setLaborItemOpen(false);
    setLabourItemData(initialLaborItemData);
  };

  const initialConsQuery = [
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ];
  const initialExtWorkQuery = [
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ];
  const [queryConsSearchSelector, setQueryConsSearchSelector] =
    useState(initialConsQuery);
  const [queryExtSearchSelector, setQueryExtSearchSelector] =
    useState(initialExtWorkQuery);

  // Once parts are selected to add clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };

  const [masterData, setMasterData] = useState([]);
  let [laborItems, setLaborItems] = useState([]);
  let [consumableItems, setConsumableItems] = useState([]);
  let [extWorkItems, setExtWorkItems] = useState([]);

  const laborColumns = [
    { field: "chargeCode", headerName: "Charge Code", flex: 1, width: 70 },
    { field: "laborType", headerName: "Labor Type", flex: 1, width: 130 },
    { field: "serviceType", headerName: "Service Type", flex: 1, width: 130 },
    {
      field: "unitOfMeasure",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    {
      field: "estimatedHours",
      headerName: "Estimated hours",
      flex: 1,
      width: 130,
    },
    { field: "unitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "extendedPrice",
      headerName: "Extended Price",
      flex: 1,
      width: 130,
    },
    { field: "comment", headerName: "Comments", flex: 1, width: 130 },
    { field: "currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "totalPrice", headerName: "Total Price", flex: 1, width: 130 },
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
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openLaborRow(params.row)}
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
            onClick={() => handleDeleteLaborItem(params.row.id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
      width: 130,
    },
  ];

  // Search table column for consumable
  const columnsConsumableSearch = [
    { headerName: "Consumable Id", field: "consumableId", flex: 1, width: 70 },
    { headerName: "Name", field: "name", flex: 1, width: 130 },
    {
      headerName: "Supplying Vendor",
      field: "sourceOrVendor",
      flex: 1,
      width: 130,
    },
    // {
    //   headerName: "Unit Price",
    //   field: "unitPrice",
    //   flex: 1,
    //   width: 130,
    // },
  ];
  // Search table column for consumable
  const columnsExtWorkSearch = [
    { headerName: "Activity Id", field: "activityId", flex: 1, width: 70 },
    {
      headerName: "Activity Name",
      field: "activityDescription",
      flex: 1,
      width: 130,
    },
    {
      headerName: "Supplying Vendor",
      field: "supplyingVendorName",
      flex: 1,
      width: 130,
    },
    // {
    //   headerName: "Quoted Price",
    //   field: "contractedPrice",
    //   flex: 1,
    //   width: 130,
    // },
  ];

  // Add the selected parts from search result to consumable
  const selectConsumableItem = async (selectedData) => {
    setSearchResultConsOpen(false);
    setConsumableItemData({
      ...consumableItemData,
      consumableCode: selectedData.consumableId,
      description: selectedData.name,
      consumableType: consumableTypeList.find(
        (element) => element.value === selectedData.stockItem
      ),
      supplyingVendorCode: selectedData.sourceOrVendor,
      supplyingVendorName: selectedData.sourceOrVendor,
      unitOfMeasure: selectedData.unit,
    });
    setConsumableItemOpen(true);
  };

  // Select the external work item
  const selectExtWorkItem = async (selectedData) => {
    setSearchResultExtWorkOpen(false);
    setExtWorkItemData({
      ...extWorkItemData,
      activityId: activityIdList.find(
        (element) => element.value === selectedData.activityId
      ),
      description: selectedData.longDescription,
      activityName: selectedData.activityDescription,
      supplyingVendorCode: selectedData.supplyingVendorCode,
      supplyingVendorName: selectedData.supplyingVendorName,
    });
    setExtWorkItemOpen(true);
  };

  const columnsConsumables = [
    {
      field: "consumableCode",
      headerName: "Consumable ID",
      flex: 1,
      width: 70,
    },
    {
      field: "consumableType",
      headerName: "Type",
      flex: 1,
      width: 70,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      width: 130,
    },
    { field: "quantity", headerName: " Quantity", flex: 1, width: 130 },
    {
      field: "unitOfMeasure",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    { field: "supplyingVendorCode", headerName: "Vendor", flex: 1, width: 130 },
    { field: "unitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "extendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "usagePercentage", headerName: "% Usage", flex: 1, width: 130 },
    { field: "totalPrice", headerName: "Total price", flex: 1, width: 130 },
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
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openConsumableRow(params.row)}
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
            onClick={() => handleDeleteConsumableItem(params.row.id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
      width: 130,
    },
  ];

  const columnsExternal = [
    { field: "activityId", headerName: "Activity ID", flex: 1, width: 70 },
    { field: "activityName", headerName: "Activity Name", flex: 1, width: 70 },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      width: 70,
    },
    {
      field: "estimatedHours",
      headerName: "Estimated Effort",
      flex: 1,
      width: 130,
    },
    { field: "unitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "extendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "totalPrice", headerName: "Total price", flex: 1, width: 130 },
    { field: "dimensions", headerName: "Dimension", flex: 1, width: 130 },
    {
      field: "supplyingVendorName",
      headerName: "Supplying Vendor",
      flex: 1,
      width: 130,
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
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openExtWorkRow(params.row)}
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
            onClick={() => handleDeleteExtWorkItem(params.row.id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
      width: 130,
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
      {serviceEstHeaderLoading ? (
        <LoadingProgress />
      ) : (
        <div>
          <div className="card p-4 mt-5">
            <div className="bg-primary px-3 mb-3 border-radius-6">
              <div className="row align-items-center">
                <div className="col-11 mx-2 py-3">
                  <div className="d-flex align-items-center bg-primary w-100">
                    <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                      <h5 className="mr-2 mb-0 text-white">
                        <span>Service Estimation Header</span>
                        <a
                          href={undefined}
                          className="ml-3 text-white"
                          style={{ cursor: "pointer" }}
                        >
                          <EditOutlinedIcon
                            onClick={() =>
                              makeHeaderEditable("serviceEstHeader")
                            }
                          />
                        </a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!serviceHeaderViewOnly ? (
              <>
                <div className="row mt-4 input-fields">
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        REFERENCE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.reference}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        DESCRIPTION
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.description}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        SEGMENT TITLE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.segmentTitle}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB OPERATION
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.jobOperation}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        PRICE METHOD
                      </label>
                      <Select
                        value={serviceEstimateData.priceMethod}
                        class="form-control border-radius-10 text-primary"
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            priceMethod: e,
                          })
                        }
                        styles={FONT_STYLE_SELECT}
                        options={priceMethodOptions}
                        placeholder="Required"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group mt-3 align-items-center date-box">
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
                          value={serviceEstimateData.priceDate}
                          onChange={(e) =>
                            setServiceEstimateData({
                              ...serviceEstimateData,
                              priceDate: e,
                            })
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        CURRENCY
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.currency}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        NET PRICE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        // placeholder="Required"
                        value={serviceEstimateData.netPrice}
                        // onChange={(e) =>
                        //   setServiceEstimateData({
                        //     ...serviceEstimateData,
                        //     netPrice: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        ADJUSTED PRICE
                      </label>
                      <input
                        type="text"
                        disabled={
                          !(
                            serviceEstimateData.priceMethod?.value ===
                            "FLAT_RATE"
                          )
                        }
                        class="form-control border-radius-10 text-primary"
                        // placeholder="Required"
                        value={
                          serviceEstimateData.priceMethod?.value === "FLAT_RATE"
                            ? serviceEstimateData.adjustedPrice
                            : 0.0
                        }
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            adjustedPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB CODE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        placeholder="Optional"
                        value={serviceEstimateData.jobCode}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            jobCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className=" text-right">
                  <button
                    className="btn bg-primary text-white"
                    onClick={() =>
                      setActiveElement({ ...activeElement, name: "operation" })
                    }
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white"
                    disabled={
                      !(serviceEstimateData.jobOperation &&
                      serviceEstimateData.description &&
                      serviceEstimateData.currency &&
                      // serviceEstimateData.netPrice &&
                      serviceEstimateData.priceDate &&
                      serviceEstimateData.priceMethod?.value &&
                      serviceEstimateData.reference &&
                      serviceEstimateData.segmentTitle &&
                      serviceEstimateData.priceMethod?.value === "FLAT_RATE"
                        ? serviceEstimateData.adjustedPrice > 0
                        : true)
                    }
                    onClick={updateServiceEstHeader}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="row mt-4">
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        REFERENCE
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.reference}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        DESCRIPTION{" "}
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.description}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        SEGMENT TITLE
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.segmentTitle}{" "}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        JOB OPERATION
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.jobOperation}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        PRICE METHOD
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.priceMethod?.label}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        PRICE DATE
                      </p>
                      <h6 className="font-weight-600">
                        <Moment format="DD/MM/YYYY">
                          {serviceEstimateData.priceDate}
                        </Moment>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        CURRENCY
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.currency}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        NET PRICE
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.netPrice}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        ADJUSTED PRICE
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.adjustedPrice}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <p className="font-size-12 font-weight-600 mb-2">
                        JOB CODE{" "}
                      </p>
                      <h6 className="font-weight-600">
                        {serviceEstimateData.jobCode}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className=" text-right">
                  <button
                    className="btn bg-primary text-white"
                    onClick={() =>
                      setActiveElement({ ...activeElement, name: "operation" })
                    }
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
          {serviceEstimateData.id && (
            <div className="card p-4 mt-5">
              <h5 className="d-flex align-items-center mb-2">
                <div className="" style={{ display: "contents" }}>
                  <span className="mr-3">Header</span>
                  <a
                    href={undefined}
                    className="ml-3"
                    style={{ cursor: "pointer" }}
                  >
                    <EditOutlinedIcon onClick={() => makeHeaderEditable()} />
                  </a>
                </div>
              </h5>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="custom-tabs-div"
                      onChange={handleChange}
                    >
                      <Tab label="Labor" value="labor" />
                      <Tab label="Consumables" value="consumables" />
                      <Tab label="External Work" value="extwork" />
                      <Tab label="Other misc." value="othrMisc" />
                    </TabList>
                  </Box>
                  <TabPanel value="labor">
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.labourEnabled}
                                  onChange={handleChangeSwitch}
                                  name="labourEnabled"
                                />
                              }
                              label="REQUIRED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>

                    {flagRequired.labourEnabled && (
                      <React.Fragment>
                        {!laborViewOnly ? (
                          <div className="row mt-2 input-fields">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={labourData.jobCode}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE DESCRIPTION
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={labourData.jobCodeDescription}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PAYER
                                </label>
                                <input
                                  type="text"
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={labourData.payer}
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      payer: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group  mt-3">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  LABOR CODE
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      laborCode: e,
                                    })
                                  }
                                  options={laborCodeList}
                                  placeholder="Required"
                                  value={labourData.laborCode}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group  mt-3">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PRICE METHOD
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      pricingMethod: e,
                                    })
                                  }
                                  options={LABOR_PRICE_OPTIONS}
                                  placeholder="Required"
                                  value={labourData.pricingMethod}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  RATE PER HOUR / DAY
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={labourData.ratePerHourOrDay}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <FormGroup>
                                  <FormControlLabel
                                    style={{
                                      alignItems: "start",
                                      marginLeft: 0,
                                    }}
                                    control={
                                      <Switch
                                        checked={labourData.flatRateIndicator}
                                        onChange={(e) =>
                                          setLabourData({
                                            ...labourData,
                                            flatRateIndicator: e.target.checked,
                                            adjustedPrice: e.target.checked
                                              ? labourData.adjustedPrice
                                              : 0.0,
                                          })
                                        }
                                      />
                                    }
                                    labelPlacement="top"
                                    label={
                                      <span className="text-light-dark font-size-12 font-weight-600">
                                        FLAT RATE INDICATOR
                                      </span>
                                    }
                                  />
                                </FormGroup>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={!labourData.flatRateIndicator}
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={labourData.adjustedPrice}
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  NET PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={labourData.totalPrice}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  TOTAL HOURS (PLANNED/RECOMMENDED)
                                </label>
                                <input
                                  type="text"
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={labourData.totalHours}
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      totalHours: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateLabourEstHeader}
                                  disabled={
                                    !(
                                      labourData.laborCode &&
                                      labourData.pricingMethod &&
                                      (labourData.flatRateIndicator
                                        ? labourData.adjustedPrice
                                        : true)
                                    )
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row mt-4">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.jobCode}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE DESCRIPTION{" "}
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.jobCodeDescription}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PAYER
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.payer}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  LABOR CODE
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.laborCode?.label}{" "}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PRICE METHOD
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.pricingMethod?.label}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  RATE PER HOUR / DAY
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.ratePerHourOrDay}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  NET PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.totalPrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  ADJUSTED PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.adjustedPrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TOTAL HOURS (PLANNED / RECOMMENDED)
                                </p>
                                <h6 className="font-weight-600">
                                  {labourData.totalHours}
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr />

                        <div className="">
                          <div className="bg-primary px-3 mb-3 border-radius-6">
                            <div className="row align-items-center">
                              <div className="col-11 mx-2">
                                <div className="d-flex align-items-center bg-primary w-100">
                                  <div
                                    className="d-flex mr-3"
                                    style={{ whiteSpace: "pre" }}
                                  >
                                    <h5 className="mr-2 mb-0 text-white">
                                      <span>Labor</span>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="text-center border-left pl-2 py-3">
                                  <Link
                                    onClick={() => handleAddItemLabor()}
                                    to="#"
                                    className="p-1 text-white"
                                    data-toggle="modal"
                                    data-target="#Datatable"
                                  >
                                    <span className="ml-1">Add Items</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DataGrid
                            sx={GRID_STYLE}
                            paginationMode="client"
                            rows={laborItems}
                            columns={laborColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </TabPanel>
                  <TabPanel value="consumables">
                    {/* {!consumableData.id && ( */}
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.consumableEnabled}
                                  onChange={handleChangeSwitch}
                                  name="consumableEnabled"
                                />
                              }
                              label="REQUIRED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                    {flagRequired.consumableEnabled && (
                      <React.Fragment>
                        {!consumableViewOnly ? (
                          <div className="row mt-2 input-fields">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={consumableData.jobCode}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE DESCRIPTION
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={consumableData.jobCodeDescription}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PAYER
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={consumableData.payer}
                                  onChange={(e) =>
                                    setConsumableData({
                                      ...consumableData,
                                      payer: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            {!consumableData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group  mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                      PRICE METHOD
                                    </label>
                                    <Select
                                      onChange={(e) => {
                                        setConsumableData({
                                          ...consumableData,
                                          pricingMethod: e,
                                          basePrice:
                                            basePriceValues &&
                                            basePriceValues[e.value]
                                              ? basePriceValues[e.value]
                                              : 0,
                                        });
                                      }}
                                      value={consumableData.pricingMethod}
                                      options={
                                        flagRequired.labourEnabled
                                          ? CONS_EXT_PRICE_OPTIONS
                                          : CONSEXT_PRICE_OPTIONS_NOLABOR
                                      }
                                      placeholder="Required"
                                      styles={FONT_STYLE_SELECT}
                                    />
                                  </div>
                                </div>
                                {consumableData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <div className="col-md-4 col-sm-4">
                                      <div className="form-group mt-3 date-box">
                                        <label className="text-light-dark font-size-12 font-weight-600">
                                          PERCENTAGE OF BASE
                                        </label>
                                        <div
                                          className=" d-flex form-control-date"
                                          style={{ overflow: "hidden" }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                            // style={{width: '64%'}}
                                            placeholder="Required"
                                            value={
                                              consumableData.percentageOfBase
                                            }
                                            onChange={(e) =>
                                              setConsumableData({
                                                ...consumableData,
                                                percentageOfBase:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                          <span
                                            className="hours-div"
                                            style={{
                                              float: "left",
                                              width: "40%",
                                            }}
                                          >
                                            {consumableData.pricingMethod?.label
                                              ? consumableData.pricingMethod?.label?.replace(
                                                  "Percentage",
                                                  "%"
                                                )
                                              : "%"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <label className="text-light-dark font-size-12 font-weight-600">
                                          TOTAL BASE
                                        </label>
                                        <input
                                          type="text"
                                          disabled
                                          class="form-control border-radius-10 text-primary"
                                          placeholder="Optional"
                                          value={consumableData.basePrice}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <FormGroup>
                                  <FormControlLabel
                                    style={{
                                      alignItems: "start",
                                      marginLeft: 0,
                                    }}
                                    control={
                                      <Switch
                                        checked={
                                          consumableData.flatRateIndicator
                                        }
                                        onChange={(e) =>
                                          setConsumableData({
                                            ...consumableData,
                                            flatRateIndicator: e.target.checked,
                                            adjustedPrice: e.target.checked
                                              ? consumableData.adjustedPrice
                                              : 0.0,
                                          })
                                        }
                                      />
                                    }
                                    labelPlacement="top"
                                    label={
                                      <span className="text-light-dark font-size-12 font-weight-600">
                                        FLAT RATE INDICATOR
                                      </span>
                                    }
                                  />
                                </FormGroup>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={!consumableData.flatRateIndicator}
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={consumableData.adjustedPrice}
                                  onChange={(e) =>
                                    setConsumableData({
                                      ...consumableData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  NET PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={consumableData.totalPrice}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateConsumableHeader}
                                  disabled={
                                    !(
                                      (!consumableData.flatRateIndicator
                                        ? consumableData.pricingMethod &&
                                          consumableData.pricingMethod.value.includes(
                                            "PER"
                                          )
                                          ? consumableData.percentageOfBase &&
                                            consumableData.basePrice
                                          : consumableData.pricingMethod
                                        : true) &&
                                      (consumableData.flatRateIndicator
                                        ? consumableData.adjustedPrice
                                        : true)
                                    )
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row mt-4">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.jobCode}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE DESCRIPTION{" "}
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.jobCodeDescription}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PAYER
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.payer}
                                </h6>
                              </div>
                            </div>
                            {!consumableData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <p className="font-size-12 font-weight-600 mb-2">
                                      PRICE METHOD
                                    </p>
                                    <h6 className="font-weight-600">
                                      {consumableData.pricingMethod?.label}
                                    </h6>
                                  </div>
                                </div>
                                {consumableData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <p className="font-size-12 font-weight-600 mb-2">
                                          PERCENTAGE OF BASE
                                        </p>
                                        <h6 className="font-weight-600">
                                          {consumableData.percentageOfBase}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <p className="font-size-12 font-weight-600 mb-2">
                                          TOTAL BASE
                                        </p>
                                        <h6 className="font-weight-600">
                                          {consumableData.basePrice}
                                        </h6>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}{" "}
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  NET PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.totalPrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  ADJUSTED PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.adjustedPrice}
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr />
                        <div className="">
                          <div className="bg-primary px-3 mb-3 border-radius-6">
                            <div className="row align-items-center">
                              <div className="col-10 mr-5">
                                <div className="d-flex align-items-center bg-primary w-100">
                                  <div
                                    className="d-flex mr-3"
                                    style={{ whiteSpace: "pre" }}
                                  >
                                    <h5 className="mr-2 mb-0 text-white">
                                      <span>Consumables</span>
                                    </h5>
                                    {/* <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
                                    </a>
                                  </p> */}
                                  </div>
                                  <SearchComponent
                                    querySearchSelector={
                                      queryConsSearchSelector
                                    }
                                    setQuerySearchSelector={
                                      setQueryConsSearchSelector
                                    }
                                    clearFilteredData={clearFilteredData}
                                    handleSnack={handleSnack}
                                    searchAPI={getConsumables}
                                    type={"consumables"}
                                    searchClick={handleQuerySearchClick}
                                    options={CONSUMABLE_SEARCH_Q_OPTIONS}
                                    color={"white"}
                                    buttonText={"ADD ITEM"}
                                  />
                                </div>
                              </div>
                              {/* <div className="ml-5">
                                <div className="text-center border-left pl-1 py-3">
                                  <Link
                                    onClick={() => handleAddItemConsumable()}
                                    to="#"
                                    className="p-1 text-white"
                                    data-toggle="modal"
                                    data-target="#Datatableconsumables"
                                  >
                                    <span className="ml-3">Add Items</span>
                                  </Link>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <DataGrid
                            sx={GRID_STYLE}
                            rows={consumableItems}
                            columns={columnsConsumables}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                            // checkboxSelection
                            // onCellClick={(e) => handleRowClick(e)}
                          />
                          {/* </div> */}
                          {/* <div className=" text-right mt-3">
                          <button
                            type="button"
                            className="btn border bg-primary text-white"
                            // onClick={updateLabourEstHeader}
                          >
                            Save
                          </button>
                        </div> */}
                        </div>
                      </React.Fragment>
                    )}
                  </TabPanel>
                  <TabPanel value="extwork">
                    {/* {!extWorkData.id && ( */}
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.externalWorkEnabled}
                                  onChange={handleChangeSwitch}
                                  name="externalWorkEnabled"
                                />
                              }
                              label="REQUIRED"
                              value={flagRequired.externalWorkEnabled}
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                    {flagRequired.externalWorkEnabled && (
                      <React.Fragment>
                        {!extWorkViewOnly ? (
                          <div className="row mt-2 input-fields">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={extWorkData.jobCode}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE DESCRIPTION
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={extWorkData.jobCodeDescription}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PAYER
                                </label>
                                <input
                                  type="text"
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={extWorkData.payer}
                                  onChange={(e) =>
                                    setExtWorkData({
                                      ...extWorkData,
                                      payer: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            {!extWorkData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-600">
                                      PRICE METHOD
                                    </label>
                                    <Select
                                      onChange={(e) =>
                                        setExtWorkData({
                                          ...extWorkData,
                                          pricingMethod: e,
                                          basePrice:
                                            basePriceValues &&
                                            basePriceValues[e.value]
                                              ? basePriceValues[e.value]
                                              : 0,
                                        })
                                      }
                                      value={extWorkData.pricingMethod}
                                      options={
                                        flagRequired.labourEnabled
                                          ? CONS_EXT_PRICE_OPTIONS
                                          : CONSEXT_PRICE_OPTIONS_NOLABOR
                                      }
                                      placeholder="Required"
                                      styles={FONT_STYLE_SELECT}
                                    />
                                  </div>
                                </div>
                                {extWorkData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <div className="col-md-4 col-sm-4">
                                      <div className="form-group mt-3 date-box">
                                        <label className="text-light-dark font-size-12 font-weight-600">
                                          PERCENTAGE OF BASE
                                        </label>
                                        <div
                                          className=" d-flex form-control-date"
                                          style={{ overflow: "hidden" }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                            // style={{width: '64%'}}
                                            placeholder="Required"
                                            value={extWorkData.percentageOfBase}
                                            onChange={(e) =>
                                              setExtWorkData({
                                                ...extWorkData,
                                                percentageOfBase:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                          <span
                                            className="hours-div"
                                            style={{
                                              float: "left",
                                              width: "40%",
                                            }}
                                          >
                                            {extWorkData.pricingMethod?.label
                                              ? extWorkData.pricingMethod?.label?.replace(
                                                  "Percentage",
                                                  "%"
                                                )
                                              : "%"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <label className="text-light-dark font-size-12 font-weight-600">
                                          TOTAL BASE
                                        </label>
                                        <input
                                          type="text"
                                          disabled
                                          class="form-control border-radius-10 text-primary"
                                          placeholder="Optional"
                                          value={extWorkData.basePrice}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <FormGroup>
                                  <FormControlLabel
                                    style={{
                                      alignItems: "start",
                                      marginLeft: 0,
                                    }}
                                    control={
                                      <Switch
                                        checked={extWorkData.flatRateIndicator}
                                        onChange={(e) =>
                                          setExtWorkData({
                                            ...extWorkData,
                                            flatRateIndicator: e.target.checked,
                                            adjustedPrice: e.target.checked
                                              ? extWorkData.adjustedPrice
                                              : 0.0,
                                          })
                                        }
                                      />
                                    }
                                    labelPlacement="top"
                                    label={
                                      <span className="text-light-dark font-size-12 font-weight-600">
                                        FLAT RATE INDICATOR
                                      </span>
                                    }
                                  />
                                </FormGroup>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={!extWorkData.flatRateIndicator}
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={extWorkData.adjustedPrice}
                                  onChange={(e) =>
                                    setExtWorkData({
                                      ...extWorkData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  NET PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={extWorkData.totalPrice}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateExtWorkHeader}
                                  disabled={
                                    !(
                                      (!extWorkData.flatRateIndicator
                                        ? extWorkData.pricingMethod &&
                                          extWorkData.pricingMethod.value.includes(
                                            "PER"
                                          )
                                          ? extWorkData.percentageOfBase &&
                                            extWorkData.basePrice
                                          : extWorkData.pricingMethod
                                        : true) &&
                                      (extWorkData.flatRateIndicator
                                        ? extWorkData.adjustedPrice
                                        : true)
                                    )
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row mt-4">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.jobCode}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE DESCRIPTION{" "}
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.jobCodeDescription}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PAYER
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.payer}
                                </h6>
                              </div>
                            </div>
                            {!extWorkData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <p className="font-size-12 font-weight-600 mb-2">
                                      PRICE METHOD
                                    </p>
                                    <h6 className="font-weight-600">
                                      {extWorkData.pricingMethod?.label}
                                    </h6>
                                  </div>
                                </div>
                                {extWorkData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <p className="font-size-12 font-weight-600 mb-2">
                                          PERCENTAGE OF BASE
                                        </p>
                                        <h6 className="font-weight-600">
                                          {extWorkData.percentageOfBase}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                      <div class="form-group mt-3">
                                        <p className="font-size-12 font-weight-600 mb-2">
                                          TOTAL BASE
                                        </p>
                                        <h6 className="font-weight-600">
                                          {extWorkData.basePrice}
                                        </h6>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  NET PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.totalPrice}
                                </h6>
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  ADJUSTED PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.adjustedPrice}
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                        <hr />

                        <div className="">
                          <div className="bg-primary px-3 mb-3 border-radius-6">
                            <div className="row align-items-center">
                              <div className="col-10 mr-5">
                                <div className="d-flex align-items-center bg-primary w-100">
                                  <div
                                    className="d-flex mr-3"
                                    style={{ whiteSpace: "pre" }}
                                  >
                                    <h5 className="mr-2 mb-0 text-white">
                                      <span>External Work</span>
                                    </h5>
                                    {/* <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
                                    </a>
                                  </p> */}
                                  </div>
                                  <SearchComponent
                                    querySearchSelector={queryExtSearchSelector}
                                    setQuerySearchSelector={
                                      setQueryExtSearchSelector
                                    }
                                    clearFilteredData={clearFilteredData}
                                    handleSnack={handleSnack}
                                    searchAPI={getExtWork}
                                    type={"extwork"}
                                    searchClick={handleQuerySearchClick}
                                    options={EXTWORK_SEARCH_Q_OPTIONS}
                                    color={"white"}
                                    buttonText="ADD ITEM"
                                  />
                                </div>
                              </div>
                              {/* <div className="ml-5">
                                <div className="text-center border-left pl-3 py-3">
                                  <Link
                                    onClick={() => setExtWorkItemOpen(true)}
                                    to="#"
                                    className="p-1 text-white"
                                    data-toggle="modal"
                                    data-target="#Datatable"
                                  >
                                    <span className="ml-1">Add Items</span>
                                  </Link>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <DataGrid
                            sx={GRID_STYLE}
                            rows={extWorkItems}
                            columns={columnsExternal}
                            pageSize={5}
                            autoHeight
                            rowsPerPageOptions={[5]}
                            // onCellClick={(e) => handleRowClick(e)}
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </TabPanel>
                  <TabPanel value="othrMisc">
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.miscEnabled}
                                  onChange={handleChangeSwitch}
                                  name="miscEnabled"
                                />
                              }
                              label="REQUIRED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    {flagRequired.miscEnabled && (
                      <React.Fragment>
                        {!miscViewOnly ? (
                          <div className="row mt-2 input-fields">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={miscData.jobCode}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  JOB CODE DESCRIPTION
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={miscData.jobCodeDescription}
                                />
                              </div>
                            </div>

                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  TYPE OF MISC.{" "}
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setMiscData({ ...miscData, type: e })
                                  }
                                  options={miscTypeList}
                                  value={miscData.type}
                                  placeholder="Required"
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            {/* <div className="col-md-8 col-sm-4"></div> */}
                            {!miscData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-600">
                                      PRICE METHOD
                                    </label>
                                    <Select
                                      onChange={(e) =>
                                        setMiscData({
                                          ...miscData,
                                          pricingMethod: e,
                                          basePrice:
                                            basePriceValues &&
                                            basePriceValues[e.value]
                                              ? basePriceValues[e.value]
                                              : 0,
                                        })
                                      }
                                      options={
                                        flagRequired.labourEnabled
                                          ? MISC_PRICE_OPTIONS
                                          : MISC_PRICE_OPTIONS_NOLABOR
                                      }
                                      placeholder="Required"
                                      value={miscData.pricingMethod}
                                      styles={FONT_STYLE_SELECT}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group mt-3 date-box">
                                    <label className="text-light-dark font-size-12 font-weight-600">
                                      PERCENTAGE OF BASE
                                    </label>
                                    <div
                                      className=" d-flex form-control-date"
                                      style={{ overflow: "hidden" }}
                                    >
                                      <input
                                        type="text"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                        placeholder="Required"
                                        value={miscData.percentageOfBase}
                                        onChange={(e) =>
                                          setMiscData({
                                            ...miscData,
                                            percentageOfBase: e.target.value,
                                          })
                                        }
                                      />
                                      <span
                                        className="hours-div"
                                        style={{ float: "left", width: "40%" }}
                                      >
                                        {miscData.pricingMethod?.label
                                          ? miscData.pricingMethod?.label?.replace(
                                              "Percentage",
                                              "%"
                                            )
                                          : "%"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-600">
                                      TOTAL BASE
                                    </label>
                                    <input
                                      type="text"
                                      disabled
                                      class="form-control border-radius-10 text-primary"
                                      placeholder="Optional"
                                      value={miscData.basePrice}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <FormGroup>
                                  <FormControlLabel
                                    style={{
                                      alignItems: "start",
                                      marginLeft: 0,
                                    }}
                                    control={
                                      <Switch
                                        checked={miscData.flatRateIndicator}
                                        onChange={(e) =>
                                          setMiscData({
                                            ...miscData,
                                            flatRateIndicator: e.target.checked,
                                            adjustedPrice: e.target.checked
                                              ? miscData.adjustedPrice
                                              : 0.0,
                                          })
                                        }
                                      />
                                    }
                                    labelPlacement="top"
                                    label={
                                      <span className="text-light-dark font-size-12 font-weight-600">
                                        FLAT RATE INDICATOR
                                      </span>
                                    }
                                  />
                                </FormGroup>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={!miscData.flatRateIndicator}
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={miscData.adjustedPrice}
                                  onChange={(e) =>
                                    setMiscData({
                                      ...miscData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  NET PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Required"
                                  value={miscData.totalPrice}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PAYER
                                </label>
                                <input
                                  type="text"
                                  class="form-control border-radius-10 text-primary"
                                  placeholder="Optional"
                                  value={miscData.payer}
                                  onChange={(e) =>
                                    setMiscData({
                                      ...miscData,
                                      payer: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateMiscHeader}
                                  disabled={
                                    !(
                                      (!miscData.flatRateIndicator
                                        ? miscData.percentageOfBase &&
                                          miscData.pricingMethod &&
                                          miscData.basePrice
                                        : true) &&
                                      miscData.type &&
                                      (miscData.flatRateIndicator
                                        ? miscData.adjustedPrice
                                        : true)
                                    )
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row mt-4">
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.jobCode}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  JOB CODE DESCRIPTION{" "}
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.jobCodeDescription}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PAYER
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.payer}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TYPE OF MISC.
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.type?.label}
                                </h6>
                              </div>
                            </div>
                            {!miscData.flatRateIndicator ? (
                              <>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <p className="font-size-12 font-weight-600 mb-2">
                                      PRICE METHOD
                                    </p>
                                    <h6 className="font-weight-600">
                                      {miscData.pricingMethod?.label}
                                    </h6>
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <p className="font-size-12 font-weight-600 mb-2">
                                      PERCENTAGE OF BASE
                                    </p>
                                    <h6 className="font-weight-600">
                                      {miscData.percentageOfBase}
                                    </h6>
                                  </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <p className="font-size-12 font-weight-600 mb-2">
                                      TOTAL BASE
                                    </p>
                                    <h6 className="font-weight-600">
                                      {miscData.basePrice}
                                    </h6>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  NET PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.totalPrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  ADJUSTED PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.adjustedPrice}
                                </h6>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          )}
          <AddLaborItemModal
            laborItemOpen={laborItemOpen}
            handleLaborItemClose={handleLaborItemClose}
            setLabourItemData={setLabourItemData}
            labourItemData={labourItemData}
            serviceEstimateData={serviceEstimateData}
            unitOfMeasureOptions={unitOfMeasureOptions}
            chargeCodeList={chargeCodeList}
            addLaborItem={addLaborItem}
            laborTypeList={laborTypeList}
            serviceTypeList={serviceTypeList}
          />

          <AddConsumableItemModal
            consumableItemOpen={consumableItemOpen}
            handleConsumableItemClose={handleConsumableItemClose}
            setConsumableItemData={setConsumableItemData}
            consumableItemData={consumableItemData}
            consumableTypeList={consumableTypeList}
            handleConsumableSearch={handleConsumableSearch}
            searchConsumableResult={searchConsumableResult}
            handleConsumableSelect={handleConsumableSelect}
            noOptionsConsumable={noOptionsConsumable}
            addConsumableItem={addConsumableItem}
            serviceEstimateData={serviceEstimateData}
            handleVendorSearch={handleVendorSearch}
            searchVenodrResults={searchVenodrResults}
            handleVendorSelect={handleVendorConsSelect}
            noOptionsVendor={noOptionsVendor}
          />

          <AddExtWorkItemModal
            extWorkItemOpen={extWorkItemOpen}
            handleExtWorkItemClose={handleExtWorkItemClose}
            setExtWorkItemData={setExtWorkItemData}
            searchVenodrResults={searchVenodrResults}
            handleVendorSelect={handleVendorSelect}
            noOptionsVendor={noOptionsVendor}
            extWorkItemData={extWorkItemData}
            serviceEstimateData={serviceEstimateData}
            handleVendorSearch={handleVendorSearch}
            dimensionList={dimensionList}
            addExtWorkItem={addExtWorkItem}
            activityIdList={activityIdList}
            unitOfMeasureOptions={unitOfMeasureOptions}
          />
          <Modal
            show={searchResultConsOpen}
            onHide={handleSearchResConsClose}
            size="lg"
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
                    sx={GRID_STYLE}
                    rows={masterData}
                    columns={columnsConsumableSearch}
                    pageSize={5}
                    autoHeight
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    onRowClick={(e) => selectConsumableItem(e.row)}
                  />
                </div>
              </div>
              {/* <div className="m-2 text-right">
                <button
                  className="btn text-white bg-primary"
                  // onClick={addSelectedPartsToPartList}
                >
                  + Add Selected
                </button>
              </div> */}
            </Modal.Body>
          </Modal>

          <Modal
            show={searchResultExtWorkOpen}
            onHide={handleSearchResExtClose}
            size="lg"
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
                    sx={GRID_STYLE}
                    rows={masterData}
                    columns={columnsExtWorkSearch}
                    pageSize={5}
                    autoHeight
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    onRowClick={(e) => selectExtWorkItem(e.row)}
                  />
                </div>
              </div>
              {/* <div className="m-2 text-right">
                <button
                  className="btn text-white bg-primary"
                  // onClick={addSelectedPartsToPartList}
                >
                  + Add Selected
                </button>
              </div> */}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default RepairServiceEstimate;
