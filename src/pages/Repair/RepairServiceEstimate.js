import DeleteIcon from "@mui/icons-material/Delete";
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
} from "services/repairBuilderServices";
import Moment from "react-moment";
import { useAppSelector } from "app/hooks";

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
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import AddLaborItemModal from "./components/AddLaborItem";
import {
  CONSUMABLE_SEARCH_Q_OPTIONS,
  EXTWORK_SEARCH_Q_OPTIONS,
} from "./CONSTANTS";
import SearchComponent from "./components/SearchComponent";
import AddExtWorkItemModal from "./components/AddExtWorkItem";
import AddConsumableItemModal from "./components/AddConsumableItem";

function RepairServiceEstimate(props) {
  const { activeElement, setActiveElement } = props.builderDetails;
  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);
  const [searchResultConsOpen, setSearchResultConsOpen] = useState(false);
  const [searchResultExtWorkOpen, setSearchResultExtWorkOpen] = useState(false);
  // Close consumable search modal
  const handleSearchResConsClose = () => {
    setSearchResultConsOpen(false);
    setSelectedMasterData([]);
  };

  // Close ext work search modal
  const handleSearchResExtClose = () => {
    setSearchResultExtWorkOpen(false);
    setSelectedMasterData([]);
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
  // Price methods for consumables, ext work, misc
  const priceOptionsPercent = [
    {
      value: "PER_ON_TOTAL",
      label: "Percentage on Total",
    },
    {
      value: "PER_ON_LABOUR",
      label: "Percentage on Labour",
    },
  ];
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
  });
  const initialLaborItemData = {
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
    vendor: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
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
    totalBase: 0.0,
    percentagePrice: 0,
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
    totalBase: 0.0,
    percentagePrice: 0,
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
    typeOfMisc: "",
    totalBase: 0.0,
    percentagePrice: 0,
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
    // console.log("handleQuerySearchClick", querySearchSelector);
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
          item.inputSearch;
      } else {
        searchStr = "";
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        if (type === "consumables") {
          const res = await getConsumables(searchStr);
          // console.log("search Query Result :", res);
          setMasterData(res);
          setSearchResultConsOpen(true);
        } else if (type === "extwork") {
          const res = await getExtWork(searchStr);
          // console.log("search Query Result :", res);
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
    { label: "Hours", value: "Hours" },
    { label: "Days", value: "Days" },
  ];
  // Sets the value for the tab (labor, consumable, misc, extWork)
  const [value, setValue] = useState("labor");

  //fetches the service headers if already saved or sets the appropriate values
  useEffect(() => {
    setServiceEstHeaderLoading(true);
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
            jobOperation: result.jobOperation,
            netPrice: result.netPrice ? result.netPrice : 0.0,
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
            populateLaborData(result);
            populateConsumableData(result);
            populateExtWorkData(result);
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
  }, []);

  function populateLaborData(result) {
    FetchLaborforService(result.id)
      .then((resultLabour) => {
        if (resultLabour && resultLabour.id) {
          setLabourData({
            ...resultLabour,
            id: resultLabour.id,
            pricingMethod: priceMethodOptions.find(
              (element) => element.value === resultLabour.pricingMethod
            ),
            laborCode: laborCodeList.find(
              (element) => element.value === resultLabour.laborCode
            ),
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
        if (resultLabourItems && resultLabourItems.result.length > 0) {
          setLaborItems(resultLabourItems.result);

          console.log(resultLabourItems.result);
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
            pricingMethod: priceOptionsPercent.find(
              (element) => element.value === resultConsumable.pricingMethod
            ),
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
        if (resultConsumableItems && resultConsumableItems.result.length > 0) {
          setConsumableItems(resultConsumableItems.result);
          console.log(resultConsumableItems.result);
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
            pricingMethod: priceOptionsPercent.find(
              (element) => element.value === resultExtWork.pricingMethod
            ),
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
        if (resultExtWorkItems && resultExtWorkItems.result.length > 0) {
          setExtWorkItems(resultExtWorkItems.result);
          console.log(resultExtWorkItems.result);
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
          setExtWorkData({
            ...resultMisc,
            id: resultMisc.id,
            pricingMethod: priceOptionsPercent.find(
              (element) => element.value === resultMisc.pricingMethod
            ),
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
    // console.log("clear data", searchText);
    setSearchVendorResults([]);
    extWorkItemData.supplyingVendorName = searchText;
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
    // console.log("clear data", searchText);
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
      priceMethod: serviceEstimateData.priceMethod.value,
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
      // ratePerHourOrDay: labourData.ratePerHourOrDay, //TODO - Remove once API modifies to consider price at backend
      // totalPrice: labourData.totalPrice, //TODO - Remove once API modifies to consider price at backend
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
          pricingMethod: priceMethodOptions.find(
            (element) => element.value === result.pricingMethod
          ),
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
      percentagePrice: consumableData.percentagePrice,
      flatRateIndicator: consumableData.flatRateIndicator,
      adjustedPrice: consumableData.flatRateIndicator
        ? consumableData.adjustedPrice
        : 0.0,
      pricingMethod: consumableData.pricingMethod?.value,
      payer: consumableData.payer,
    };
    AddConsumableToService(serviceEstimateData.id, data)
      .then((result) => {
        setConsumableData({
          ...result,
          id: result.id,
          pricingMethod: priceOptionsPercent.find(
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
      percentagePrice: extWorkData.percentagePrice,
      flatRateIndicator: extWorkData.flatRateIndicator,
      adjustedPrice: extWorkData.flatRateIndicator
        ? extWorkData.adjustedPrice
        : 0.0,
      payer: extWorkData.payer,
      pricingMethod: extWorkData.pricingMethod?.value,
    };
    AddExtWorkToService(serviceEstimateData.id, data)
      .then((result) => {
        setConsumableData({
          ...result,
          id: result.id,
          pricingMethod: priceOptionsPercent.find(
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
      ...miscData,
      jobCode: miscData.jobCode,
      jobCodeDescription: miscData.jobCodeDescription,
      percentagePrice: miscData.percentagePrice,
      flatRateIndicator: miscData.flatRateIndicator,
      adjustedPrice: miscData.flatRateIndicator ? miscData.adjustedPrice : 0.0,
      payer: miscData.payer,
      pricingMethod: miscData.pricingMethod?.value,
      typeOfMisc: miscData.typeOfMisc?.value,
    };
    AddMiscToService(serviceEstimateData.id, data)
      .then((result) => {
        setMiscData({
          ...result,
          id: result.id,
          pricingMethod: priceOptionsPercent.find(
            (element) => element.value === result.pricingMethod
          ),
          typeOfMisc: miscTypeList.find(
            (element) => element.value === result.typeOfMisc
          ),
        });
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
        populateLaborItems(labourData);
        handleSnack("success", "Added labor item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding labor item!");
      });
    handleLaborItemClose();
  };

  // Add or Update Consumable Item
  const addConsumableItem = () => {
    let data = {
      // ...consumableItemData,
      ...(consumableItemData.id && { id: consumableItemData.id }),
      consumableType: consumableItemData.consumableType?.value,
      consumableCode: consumableItemData.consumableCode,
      description: consumableItemData.description,
      quantity: consumableItemData.quantity,
      unitOfMeasure: consumableItemData.unitOfMeasure,
      vendor: consumableItemData.vendor,
      currency: consumableItemData.currency,
    };

    AddConsumableItem(consumableData.id, data)
      .then((result) => {
        setConsumableItemData(initialConsumableItemData);
        populateConsItems(consumableData);
        handleSnack("success", "Added consumable item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding consumable item!");
      });
    setQueryConsSearchSelector(initialConsQuery);
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
      adjustedPrice: extWorkItemData.adjustedPrice,
    };

    AddExtWorkItem(extWorkData.id, data)
      .then((result) => {
        setExtWorkItemData(initialExtWorkItemData);
        populateExtWorkItems(extWorkData);
        handleSnack("success", "Added ext work item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding external work item!");
      });
    setQueryExtSearchSelector(initialExtWorkQuery);
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
        populateLaborItems(labourData);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the labor item");
      });
  };

  // Open consumable item to view or edit
  const openConsumableRow = (row) => {
    setConsumableItemData({
      ...row,
      consumableType: consumableTypeList.find(
        (element) => element.value === row.consumableType
      ),
    });
    // setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    setConsumableItemOpen(true);
  };

  //Remove Consumable Item
  const handleDeleteConsumableItem = (consItemId) => {
    RemoveConsumableItem(consumableData.id, consItemId)
      .then((res) => {
        handleSnack("success", res);
        populateConsItems(consumableData);
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
    setExtWorkItemData({
      ...row,
      activityId: activityIdList.find(
        (element) => element.label === row.activityId
      ),
      dimensions: dimensionList.find(
        (element) => element.value === row.dimensions
      ),
    });
    // setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    // setPartFieldViewonly(true);
    setExtWorkItemOpen(true);
  };
  //Remove Ext work Item
  const handleDeleteExtWorkItem = (extWorkItemId) => {
    RemoveExtWorkItem(extWorkData.id, extWorkItemId)
      .then((res) => {
        handleSnack("success", res);
        populateExtWorkItems(extWorkData);
      })
      .catch((e) => {
        console.log(e);
        handleSnack(
          "error",
          "Error occurred while removing the ext work item!"
        );
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [laborItemOpen, setLaborItemOpen] = React.useState(false);
  const [consumableItemOpen, setConsumableItemOpen] = React.useState(false);
  const [extWorkItemOpen, setExtWorkItemOpen] = React.useState(false);
  const handleExtWorkItemClose = () => {
    setExtWorkItemOpen(false);
    setExtWorkItemData(initialExtWorkItemData);
  };
  const handleConsumableItemClose = () => {
    setConsumableItemOpen(false);
    setConsumableItemData(initialConsumableItemData);
  };
  const handleLaborItemClose = () => {
    setLaborItemOpen(false);
    setLabourItemData(initialLaborItemData);
  };

  const initialConsQuery = [
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ];
  const initialExtWorkQuery = [
    {
      id: 0,
      selectFamily: "",
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
    setSelectedMasterData([]);
  };

  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
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
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => openLaborRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
    {
      headerName: "Unit Price",
      field: "unitPrice",
      flex: 1,
      width: 130,
    },
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
    {
      headerName: "Quoted Price",
      field: "contractedPrice",
      flex: 1,
      width: 130,
    },
  ];

  // Add the selected parts from search result to partlist
  const selectConsumableItem = async (selectedData) => {
    setSearchResultConsOpen(false);
    setConsumableItemData({
      ...consumableItemData,
      consumableCode: selectedData.consumableId,
      description: selectedData.name,
      consumableType: "",
      vendor: selectedData.sourceOrVendor,
      unitOfMeasure: selectedData.unit,
    });
    console.log(selectedData);
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
      activityName: selectedData.activityDescription,
      // activityType: selectedData.activityType,
      supplyingVendorCode: selectedData.supplyingVendorCode,
      supplyingVendorName: selectedData.supplyingVendorName,
      // unitOfMeasure: selectedData.unit,
      // dimension:
    });
    console.log(selectedData);
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
    { field: "vendor", headerName: "Vendor", flex: 1, width: 130 },
    { field: "unitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "extendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "totalPrice", headerName: "Total price", flex: 1, width: 130 },
    {
      field: "Actions",
      headerName: "Actions",
      type: "actions",
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => openConsumableRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
            icon={<EditOutlinedIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => openExtWorkRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
        <div className="d-flex align-items-center justify-content-center">
          <Loader
            type="spinner-default"
            bgColor={"#872ff7"}
            title={"spinner-default"}
            color={"#FFFFFF"}
            size={35}
          />
        </div>
      ) : (
        <div class="container-fluid">
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center bg-primary p-2 border-radius-10 mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3 white-space text-white">
                  Service Estimation Header
                </span>
                <a
                  href={undefined}
                  className="ml-3 text-white"
                  style={{ cursor: "pointer" }}
                >
                  <EditOutlinedIcon
                    onClick={() => makeHeaderEditable("serviceEstHeader")}
                  />
                </a>
              </div>
              {/* <div className="hr"></div> */}
            </h5>
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
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            priceMethod: e,
                          })
                        }
                        options={priceMethodOptions}
                        placeholder="Required"
                      />
                      {/* <input
                  type="text"
                  class="form-control border-radius-10 text-primary"
                  
                  placeholder="Required"
                  value={serviceEstimateData.priceMethod}
                /> */}
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group mt-3 align-items-center date-box">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE DATE
                      </label>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
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
                    {/* <div class="form-group mt-3">
                <label
                  className="text-light-dark font-size-12 font-weight-600"
                  
                >
                  PRICE DATE
                </label>
                <input
                  type="text"
                  class="form-control border-radius-10 text-primary"
                  
                  
                  placeholder="Required"
                />
              </div> */}
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
                      !(
                        serviceEstimateData.jobOperation &&
                        serviceEstimateData.description &&
                        serviceEstimateData.currency &&
                        // serviceEstimateData.netPrice &&
                        serviceEstimateData.priceDate &&
                        serviceEstimateData.priceMethod?.value &&
                        serviceEstimateData.reference &&
                        serviceEstimateData.segmentTitle
                      )
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
                                  options={priceMethodOptions}
                                  placeholder="Required"
                                  value={labourData.pricingMethod}
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
                          <div className="bg-primary px-3 mb-3">
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
                                    onClick={() => setLaborItemOpen(true)}
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
                          {/* <div
                          className=""
                          style={{
                            height: 300,
                            width: "100%",
                            backgroundColor: "#fff",
                          }}
                        > */}
                          <DataGrid
                            sx={{
                              "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#872ff7",
                                color: "#fff",
                                fontSize: 12,
                              },
                              minHeight: 300,
                              "& .MuiDataGrid-cellContent": {
                                fontSize: 12,
                              },
                            }}
                            rows={laborItems}
                            columns={laborColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </TabPanel>
                  <TabPanel value="consumables">
                    {!consumableData.id && (
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
                    )}
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
                                  class="form-control border-radius-10 text-primary"
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
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group  mt-3">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  PRICE METHOD
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setConsumableData({
                                      ...consumableData,
                                      pricingMethod: e,
                                    })
                                  }
                                  value={consumableData.pricingMethod}
                                  options={priceOptionsPercent}
                                  placeholder="Required"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group mt-3 date-box">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PERCENTAGE
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
                                    value={consumableData.percentagePrice}
                                    onChange={(e) =>
                                      setConsumableData({
                                        ...consumableData,
                                        percentagePrice: e.target.value,
                                      })
                                    }
                                  />
                                  <span
                                    className="hours-div"
                                    style={{ float: "left", width: "40%" }}
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
                                  value={consumableData.totalBase}
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
                                        checked={
                                          consumableData.flatRateIndicator
                                        }
                                        onChange={(e) =>
                                          setConsumableData({
                                            ...consumableData,
                                            flatRateIndicator: e.target.checked,
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

                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateConsumableHeader}
                                  disabled={
                                    !(
                                      consumableData.percentagePrice &&
                                      consumableData.pricingMethod &&
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
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PERCENTAGE PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.percentagePrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TOTAL BASE
                                </p>
                                <h6 className="font-weight-600">
                                  {consumableData.totalBase}
                                </h6>
                              </div>
                            </div>
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
                                  />
                                </div>
                              </div>
                              <div className="ml-5">
                                <div className="text-center border-left pl-1 py-3">
                                  <Link
                                    onClick={() => setConsumableItemOpen(true)}
                                    to="#"
                                    className="p-1 text-white"
                                    data-toggle="modal"
                                    data-target="#Datatableconsumables"
                                  >
                                    <span className="ml-3">Add Items</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DataGrid
                            sx={{
                              "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#872ff7",
                                color: "#fff",
                                fontSize: 12,
                              },
                              minHeight: 400,
                              "& .MuiDataGrid-cellContent": {
                                fontSize: 12,
                              },
                            }}
                            rows={consumableItems}
                            columns={columnsConsumables}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
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
                                    })
                                  }
                                  value={extWorkData.pricingMethod}
                                  options={priceOptionsPercent}
                                  placeholder="Required"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group mt-3 date-box">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PERCENTAGE
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
                                    value={extWorkData.percentagePrice}
                                    onChange={(e) =>
                                      setExtWorkData({
                                        ...extWorkData,
                                        percentagePrice: e.target.value,
                                      })
                                    }
                                  />
                                  <span
                                    className="hours-div"
                                    style={{ float: "left", width: "40%" }}
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
                                  value={extWorkData.totalBase}
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
                                        checked={extWorkData.flatRateIndicator}
                                        onChange={(e) =>
                                          setExtWorkData({
                                            ...extWorkData,
                                            flatRateIndicator: e.target.checked,
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

                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateExtWorkHeader}
                                  disabled={
                                    !(
                                      extWorkData.percentagePrice &&
                                      extWorkData.pricingMethod &&
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
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  PERCENTAGE PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.percentagePrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TOTAL BASE
                                </p>
                                <h6 className="font-weight-600">
                                  {extWorkData.totalBase}
                                </h6>
                              </div>
                            </div>

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
                                  />
                                </div>
                              </div>
                              <div className="ml-5">
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
                              </div>
                            </div>
                          </div>
                          <DataGrid
                            sx={{
                              "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#872ff7",
                                color: "#fff",
                                fontSize: 12,
                              },
                              minHeight: 300,
                              "& .MuiDataGrid-cellContent": {
                                fontSize: 12,
                              },
                            }}
                            rows={extWorkItems}
                            columns={columnsExternal}
                            pageSize={5}
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
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  TYPE OF MISC.{" "}
                                </label>
                                <Select
                                  onChange={(e) =>
                                    setMiscData({ ...miscData, typeOfMisc: e })
                                  }
                                  options={miscTypeList}
                                  value={miscData.typeOfMisc}
                                  placeholder="Required"
                                />
                              </div>
                            </div>
                            <div className="col-md-8 col-sm-4"></div>
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
                                    })
                                  }
                                  options={priceOptionsPercent}
                                  placeholder="Required"
                                  value={miscData.pricingMethod}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div className="form-group mt-3 date-box">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  PERCENTAGE
                                </label>
                                <div
                                  className=" d-flex form-control-date"
                                  style={{ overflow: "hidden" }}
                                >
                                  <input
                                    type="text"
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                                    placeholder="Required"
                                    value={miscData.percentagePrice}
                                    onChange={(e) =>
                                      setMiscData({
                                        ...miscData,
                                        percentagePrice: e.target.value,
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
                                  value={miscData.totalBase}
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
                                        checked={miscData.flatRateIndicator}
                                        onChange={(e) =>
                                          setMiscData({
                                            ...miscData,
                                            flatRateIndicator: e.target.checked,
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

                            <div className="col-md-12">
                              <div class="form-group mt-3 mb-0 text-right">
                                <button
                                  type="button"
                                  className="btn btn-light bg-primary text-white"
                                  onClick={updateMiscHeader}
                                  disabled={
                                    !(
                                      miscData.percentagePrice &&
                                      miscData.typeOfMisc &&
                                      miscData.pricingMethod &&
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
                            </div><div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TYPE OF MISC.
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.typeOfMisc?.label}
                                </h6>
                              </div>
                            </div>
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
                                  PERCENTAGE PRICE
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.percentagePrice}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <p className="font-size-12 font-weight-600 mb-2">
                                  TOTAL BASE
                                </p>
                                <h6 className="font-weight-600">
                                  {miscData.totalBase}
                                </h6>
                              </div>
                            </div>
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
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#872ff7",
                        color: "#fff",
                      },
                    }}
                    rows={masterData}
                    columns={columnsConsumableSearch}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
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
                    columns={columnsExtWorkSearch}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
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
