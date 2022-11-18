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
import { getSearchCoverageForFamily } from "../../services/index";
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
import { getConsumables, getVendors } from "services/searchServices";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import AddLaborItemModal from "./components/AddLaborItem";
import { CONSUMABLE_SEARCH_Q_OPTIONS } from "./CONSTANTS";
import SearchComponent from "./components/SearchComponent";

function RepairServiceEstimate(props) {
  const { activeElement, setActiveElement } = props.builderDetails;
  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);

  const [flagRequired, setFlagRequired] = useState({
    flagLaborReq: true,
    flagConsumableReq: true,
    flagExtWorkReq: true,
    flagMiscReq: true,
  });
  const [serviceEstimateData, setServiceEstimateData] = useState({
    reference: "",
    description: "",
    segmentTitle: "",
    jobOperation: "",
    priceMethod: null,
    priceDate: new Date(),
    currency: "USD",
    netPrice: "",
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
    shortDescription: "",
    supplyingVendor: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
    estimatedHours: "",
    adjustedPrice: 0.0,
    dimension: "",
  };
  const initialConsumableItemData = {
    consumableType: "",
    consumableId: "",
    consumableDesc: "",
    quantity: "",
    unitOfMeasure: "",
    vendor:"",
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

  const [consumableData, setConsumableData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
  });
  const [extWorkData, setExtWorkData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
  });
  const [miscData, setMiscData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
    typeOfMisc: "",
  });
  const [noOptionsVendor, setNoOptionsVendor] = useState(false);
  const [noOptionsConsumable, setNoOptionsConsumable] = useState(false);

  const [searchVenodrResults, setSearchVendorResults] = useState([]);
  const [searchConsumableResult, setSearchConsumableResult] = useState([]);

  // const [priceMethodOptions, setPriceMethodOptions] = useState([]);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [laborViewOnly, setLaborViewOnly] = useState(false);
  const [consumableViewOnly, setConsumableViewOnly] = useState(false);
  const [extWorkViewOnly, setExtWorkViewOnly] = useState(false);
  const [miscViewOnly, setMiscViewOnly] = useState(false);
  const [serviceHeaderViewOnly, setServiceHeaderViewOnly] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    queryConsSearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr = item.selectCategory.value + ":" + item.inputSearch;
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
          item.inputSearch;
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await getConsumables(searchStr);
        // console.log("search Query Result :", res);
        setMasterData(res);
        // setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching consumables!");
    }
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlagRequired({
      ...flagRequired,
      [event.target.name]: event.target.checked,
    });
  };
  const chargeCodeList = useAppSelector(
    selectDropdownOption(selectChargeCodeList)
  );
  const laborTypeList = useAppSelector(
    selectDropdownOption(selectLaborTypeList)
  );
  const serviceTypeList = useAppSelector(
    selectDropdownOption(selectServiceTypeList)
  );

  const laborCodeList = useAppSelector(
    selectDropdownOption(selectLaborCodeList)
  );
  const miscTypeList = useAppSelector(selectDropdownOption(selectMiscTypeList));

  const dimensionList = useAppSelector(
    selectDropdownOption(selectDimensionList)
  );
  const consumableTypeList = useAppSelector(
    selectDropdownOption(selectConsumableTypeList)
  );

  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );
  const unitOfMeasureOptions = [
    { label: "Hours", value: "Hours" },
    { label: "Days", value: "Days" },
  ];
  const activityIdList = useAppSelector(
    selectDropdownOption(selectActivityIdList)
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("labor");
  useEffect(() => {
    setServiceEstHeaderLoading(true);
    console.log(activityIdList);
    if (activeElement.oId) {
      FetchServiceHeader(activeElement.oId)
        .then((result) => {
          setServiceEstimateData({
            ...serviceEstimateData,
            reference: result.reference,
            id: result.id,
            currency: result.currency, //TODO: Uncomment this once currecy is updated.
            description: result.description,
            jobCode: result.jobCode,
            jobOperation: result.jobOperation,
            netPrice: result.netPrice,
            priceDate: result.priceDate,
            priceMethod: priceMethodOptions.find(
              (element) => element.value === result.priceMethod
            ),
            segmentTitle: result.segmentTitle,
          });
          setServiceHeaderViewOnly(result.id ? true : false);
          populateLaborData(result);
          populateConsumableData(result);

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
            payer: options.find(
              (element) => element.value === resultLabour.payer
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
          setConsumableViewOnly(true);

          setConsumableData({
            ...resultConsumable,
            id: resultConsumable.id,
            pricingMethod: priceMethodOptions.find(
              (element) => element.value === resultConsumable.pricingMethod
            ),
            payer: options.find(
              (element) => element.value === resultConsumable.payer
            ),
          });
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
  const makeHeaderEditable = (type) => {
    if (type === "serviceEstHeader" && serviceHeaderViewOnly)
      setServiceHeaderViewOnly(false);
    if (value === "labor" && laborViewOnly) setLaborViewOnly(false);
    else if (value === "consumables" && consumableViewOnly)
      setConsumableViewOnly(false);
    else if (value === "extWork" && extWorkViewOnly) setExtWorkViewOnly(false);
    else if (value === "misc" && miscViewOnly) setMiscViewOnly(false);
  };
  // Search Vendors
  const handleVendorSearch = async (searchVendorfieldName, searchText) => {
    // console.log("clear data", searchText);
    setSearchVendorResults([]);
    extWorkItemData.supplyingVendor = searchText;
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
  const handleConsumableSearch = async (searchConsumablefieldName, searchText) => {
    // console.log("clear data", searchText);
    setSearchConsumableResult([]);
    consumableItemData.consumableId = searchText;
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
          handleSnack("error", "Error occurred while searching the Consumable!");
        });
    }
  };

  // Select the vendor from search result
  const handleVendorSelect = (type, currentItem) => {
    setExtWorkItemData({
      ...extWorkItemData,
      supplyingVendor: currentItem.fullName,
    });
    setSearchVendorResults([]);
  };

  // Select the consumable from search result
  const handleConsumableSelect = (type, currentItem) => {
    setConsumableItemData({
      ...consumableItemData,
      consumableId: currentItem.consumableId,
      consumableDesc: currentItem.name,
      unitOfMeasure: currentItem.unit
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
      ...labourData,
      pricingMethod: labourData.pricingMethod?.value,
      laborCode: labourData.laborCode?.value,
      payer: labourData.payer?.value,
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
          payer: options.find((element) => element.value === result.payer),
        });
        handleSnack("success", "Labour details updated!");
        setLaborViewOnly(true);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating service estimate header!"
        );
      });
  };

  // Add or Update consumable data
  const updateConsumableHeader = () => {
    let data = {
      ...consumableData,
      pricingMethod: consumableData.pricingMethod?.value,
      payer: consumableData.payer?.value,
    };
    AddConsumableToService(serviceEstimateData.id, data)
      .then((result) => {
        setConsumableData({
          ...result,
          id: result.id,
          pricingMethod: priceMethodOptions.find(
            (element) => element.value === result.pricingMethod
          ),
          payer: options.find((element) => element.value === result.payer),
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
      ...extWorkData,
      pricingMethod: consumableData.pricingMethod?.value,
      payer: consumableData.payer?.value,
    };
    AddExtWorkToService(serviceEstimateData.id, data)
      .then((result) => {
        setConsumableData({
          ...result,
          id: result.id,
          pricingMethod: priceMethodOptions.find(
            (element) => element.value === result.pricingMethod
          ),
          payer: options.find((element) => element.value === result.payer),
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
      pricingMethod: miscData.pricingMethod?.value,
      typeOfMisc: miscData.typeOfMisc?.value,
      payer: consumableData.payer?.value,
    };
    AddMiscToService(serviceEstimateData.id, data)
      .then((result) => {
        setMiscData({
          ...result,
          id: result.id,
          pricingMethod: priceMethodOptions.find(
            (element) => element.value === result.pricingMethod
          ),
          typeOfMisc: miscTypeList.find(
            (element) => element.value === result.typeOfMisc
          ),
          payer: options.find((element) => element.value === result.payer),
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
      ...labourItemData,
      chargeCode: labourItemData.chargeCode?.value,
      laborType: labourItemData.laborType?.value,
      serviceType: labourItemData.serviceType?.value,
      unitOfMeasure: labourItemData.unitOfMeasure?.value,
    };
    //TODO: Remove this once these fields are added.
    delete data.travelCharge;
    delete data.travelIncluded;
    delete data.inspectionIncluded;
    delete data.inspectionCharge;

    AddLaborItemToLabor(labourData.id, data)
      .then((result) => {
        console.log(result);
        setLabourItemData(initialLaborItemData);
        populateLaborItems(labourData);
        handleSnack("success", "Added labor item successfully");
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while adding labor item!");
      });
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [laborItemOpen, setLaborItemOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleClose4 = () => setOpen4(false);
  const handleClose3 = () => setOpen3(false);
  const handleLaborItemClose = () => {
    setLaborItemOpen(false);
    setLabourItemData(initialLaborItemData);
  };

  const [show, setShow] = React.useState(false);
  const [count, setCount] = useState(1);
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const handleRowClick = (e) => {
    setShow(true);
  };

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
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
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
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

  const [queryConsSearchSelector, setQueryConsSearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };

    // Once parts are selected to add clear the search results
    const clearFilteredData = () => {
      setMasterData([]);
      setSelectedMasterData([]);
    };
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData];
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked };
        } else return currentItem;
      });
      setMasterData([...updated]);
      setFilterMasterData([...filterMasterData, { ...row }]);
    } else {
      var _filterMasterData = [...filterMasterData];
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id) return currentItem;
      });
      setFilterMasterData(updated);
    }
  };
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
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

  let [laborItems, setLaborItems] = useState([]);
  // let rows = [
  //   {
  //     id: 1,
  //     chargeCode: "Snow",
  //     laborType: "Jon",
  //     serviceType: 35,
  //     unitOfMeasure: "pending",
  //     estimatedHours: "Open",
  //     unitPrice: "Inconsistent",
  //     extendedPrice: "Inconsistent",
  //     comments: "Inconsistent",
  //     currency: "Created On",
  //     totalPrice: "25",
  //     Actions: "Action",
  //   },
  //   {
  //     id: 2,
  //     chargeCode: "Snow",
  //     laborType: "Jon",
  //     serviceType: 35,
  //     unitOfMeasure: "pending",
  //     estimatedHours: "Open",
  //     unitPrice: "Inconsistent",
  //     extendedPrice: "Inconsistent",
  //     comments: "Inconsistent",
  //     currency: "Created On",
  //     totalPrice: "25",
  //     Actions: "Action",
  //   },
  //   {
  //     id: 3,
  //     chargeCode: "Snow",
  //     laborType: "Jon",
  //     serviceType: 35,
  //     unitOfMeasure: "pending",
  //     estimatedHours: "Open",
  //     unitPrice: "Inconsistent",
  //     extendedPrice: "Inconsistent",
  //     comments: "Inconsistent",
  //     currency: "Created On",
  //     totalPrice: "25",
  //     Actions: "Action",
  //   },
  // ];

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

  const rowsConsumables = [
    {
      id: 1,
      ConsumableId: "Snow",
      ConsumableType: "Type",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
    {
      id: 2,
      ConsumableId: "Lannister",
      ConsumableType: "Cersei",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
    {
      id: 3,
      ConsumableId: "Lannister",
      ConsumableType: "Jaime",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
  ];

  const columnsConsumables = [
    { field: "ConsumableId", headerName: "Consumable ID", flex: 1, width: 70 },
    {
      field: "ConsumableType",
      headerName: "Consumable Type",
      flex: 1,
      width: 70,
    },
    {
      field: "Description",
      headerName: "Consumable Description",
      flex: 1,
      width: 130,
    },
    { field: "Quantity", headerName: " Quantity", flex: 1, width: 130 },
    {
      field: "UnitMeasures",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    { field: "Vendor", headerName: "Vendor", flex: 1, width: 130 },
    { field: "UnitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "ExtendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "Currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Total price", flex: 1, width: 130 },
    { field: "Actions", headerName: "Action", flex: 1, width: 130 },
  ];

  const rowsExternal = [
    {
      id: 1,
      ActivityId: "Snow",
      ActivityName: "Jon",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
    {
      id: 2,
      ActivityId: "Lannister",
      ActivityName: "Cersei",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
    {
      id: 3,
      ActivityId: "Lannister",
      ActivityName: "Jaime",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
  ];

  const columnsExternal = [
    { field: "ActivityId", headerName: "Activity ID", flex: 1, width: 70 },
    { field: "ActivityName", headerName: "Activity Name", flex: 1, width: 70 },
    {
      field: "Description",
      headerName: "Short Description",
      flex: 1,
      width: 70,
    },
    { field: "Quantity", headerName: "Quantity", flex: 1, width: 70 },
    {
      field: "UnitMeasures",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    { field: "UnitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "ExtendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "Currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Total price", flex: 1, width: 130 },
    { field: "Dimensions", headerName: "Dimension", flex: 1, width: 130 },
    {
      field: "SupplyingVendor",
      headerName: "Supplying Vendor",
      flex: 1,
      width: 130,
    },
    { field: "Actions", headerName: "Action", flex: 1, width: 130 },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

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
                            ...serviceEstimateData.currency,
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
                        defaultValue={selectedOption}
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
                        class="form-control border-radius-10 text-primary"
                        placeholder="Required"
                        value={serviceEstimateData.netPrice}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            netPrice: e.target.value,
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
                      !(
                        serviceEstimateData.jobOperation &&
                        serviceEstimateData.description &&
                        serviceEstimateData.currency &&
                        serviceEstimateData.netPrice &&
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
                  <TabList className="custom-tabs-div" onChange={handleChange}>
                    <Tab label="Labor" value="labor" />
                    <Tab label="Consumables" value="consumables" />
                    <Tab label="External Work" value="extwork" />
                    <Tab label="Other misc." value="othrMisc" />
                  </TabList>
                </Box>
                <TabPanel value="labor">
                  {!labourData.id && (
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.flagLaborReq}
                                  onChange={handleChangeSwitch}
                                  name="flagLaborReq"
                                />
                              }
                              label="REQUIRED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  )}
                  {flagRequired.flagLaborReq && (
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
                            <div className="form-group  mt-3">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                LABOR CODE
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setLabourData({ ...labourData, laborCode: e })
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
                                defaultValue={selectedOption}
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
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setLabourData({ ...labourData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={labourData.payer}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <FormGroup>
                                <FormControlLabel
                                  style={{ alignItems: "start", marginLeft: 0 }}
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
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                onClick={updateLabourEstHeader}
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
                                LABOR CODE
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.laborCode?.value}{" "}
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
                                TOTAL HOURS (PLANNED / RECOMMENDED)
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.totalHours}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                NET PRICE - LABOR
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.payer?.value}
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
                          onCellClick={(e) => handleRowClick(e)}
                        />
                        {/* </div> */}
                        <div className=" text-right mt-3">
                          <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            // onClick={}
                          >
                            Save
                          </button>
                        </div>
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
                                  checked={flagRequired.flagConsumableReq}
                                  onChange={handleChangeSwitch}
                                  name="flagConsumableReq"
                                />
                              }
                              label="REQUIRED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  )}
                  {flagRequired.flagConsumableReq && (
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
                            <div className="form-group  mt-3">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setConsumableData({
                                    ...consumableData,
                                    pricingMethod: e,
                                  })
                                }
                                value={consumableData.pricingMethod}
                                options={priceMethodOptions}
                                placeholder="Required"
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
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setConsumableData({
                                    ...consumableData,
                                    payer: e,
                                  })
                                }
                                options={options}
                                placeholder="Required"
                                value={consumableData.payer}
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
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.payer?.value}
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
                        <div className="bg-primary px-3 mb-3">
                          <div className="row align-items-center">
                            <div className="col-10 mx-5">
                              <div className="d-flex align-items-center bg-primary w-100">
                                <div
                                  className="d-flex mr-3"
                                  style={{ whiteSpace: "pre" }}
                                >
                                  <h5 className="mr-2 mb-0 text-white">
                                    <span>Consumables</span>
                                  </h5>
                                  <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
                                    </a>
                                  </p>
                                </div>
                                <SearchComponent
                                  querySearchSelector={queryConsSearchSelector}
                                  setQuerySearchSelector={setQueryConsSearchSelector}
                                  clearFilteredData={clearFilteredData}
                                  handleSnack={handleSnack}
                                  searchAPI={getConsumables}
                                  searchClick={handleQuerySearchClick}
                                  options={CONSUMABLE_SEARCH_Q_OPTIONS}
                                  color={'white'}
                                />
                                
                                {/* <div className="px-3">
          <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
            <SearchIcon /><span className="ml-1">Search</span>
          </Link>
        </div> */}
                              </div>
                            </div>
                            <div className="">
                              <div className="text-center border-left pl-1 py-3">
                                <Link
                                  onClick={() => setOpen3(true)}
                                  to="#"
                                  className="p-1 text-white"
                                  data-toggle="modal"
                                  data-target="#Datatableconsumables"
                                >
                                  <span className="ml-1">Add Items</span>
                                </Link>
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
                                backgroundColor: "#872ff7",
                                color: "#fff",
                                fontSize: 12
                              },
                              minHeight: 300,
                              "& .MuiDataGrid-cellContent": {
                                fontSize: 12,
                              },
                            }}
                            rows={rowsConsumables}
                            columns={columnsConsumables}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            // checkboxSelection
                            onCellClick={(e) => handleRowClick(e)}
                          />
                        </div>
                        <div className=" text-right mt-3">
                          <button
                            type="button"
                            className="btn border bg-primary text-white"
                            // onClick={updateLabourEstHeader}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </TabPanel>
                <TabPanel value="extwork">
                  {!extWorkData.id && (
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.flagExtWorkReq}
                                  onChange={handleChangeSwitch}
                                  name="flagExtWorkReq"
                                />
                              }
                              label="REQUIRED"
                              value={flagRequired.flagExtWorkReq}
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  )}
                  {flagRequired.flagExtWorkReq && (
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
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setExtWorkData({
                                    ...extWorkData,
                                    pricingMethod: e,
                                  })
                                }
                                value={extWorkData.pricingMethod}
                                options={priceMethodOptions}
                                placeholder="Required"
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
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setExtWorkData({ ...extWorkData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={extWorkData.payer}
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
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.payer?.value}
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
                        <div className="bg-primary px-3 mb-3">
                          <div className="row align-items-center">
                            <div className="col-10 mx-5">
                              <div className="d-flex align-items-center bg-primary w-100">
                                <div
                                  className="d-flex mr-3"
                                  style={{ whiteSpace: "pre" }}
                                >
                                  <h5 className="mr-2 mb-0 text-white">
                                    <span>External Work</span>
                                  </h5>
                                  <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
                                    </a>
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center w-100 ">
                                  <div className="row align-items-center m-0">
                                    {querySearchSelector.map((obj, i) => {
                                      return (
                                        <>
                                          <div className="customselect border-white overflow-hiden border-radius-10 d-flex align-items-center mr-3 my-2">
                                            {i > 0 ? (
                                              <SelectFilter
                                                isClearable={true}
                                                defaultValue={{
                                                  label: "And",
                                                  value: "AND",
                                                }}
                                                options={[
                                                  {
                                                    label: "And",
                                                    value: "AND",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Or",
                                                    value: "OR",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="And/Or"
                                                onChange={(e) =>
                                                  handleOperator(e, i)
                                                }
                                                // value={querySearchOperator[i]}
                                                value={obj.selectOperator}
                                              />
                                            ) : (
                                              <></>
                                            )}

                                            <div>
                                              <SelectFilter
                                                // isClearable={true}
                                                options={[
                                                  {
                                                    label: "ID",
                                                    value: "ID",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "NAME",
                                                    value: "name",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "SUPPLYING VENDOR",
                                                    value: "supplyingVendor",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="Search By.."
                                                onChange={(e) =>
                                                  handleFamily(e, i)
                                                }
                                                value={obj.selectFamily}
                                              />
                                            </div>
                                            <div className="customselectsearch customize">
                                              <span className="search-icon-postn">
                                                <SearchIcon />
                                              </span>
                                              <input
                                                className="custom-input-sleact "
                                                style={{ position: "relative" }}
                                                type="text"
                                                placeholder="Search Parts"
                                                value={obj.inputSearch}
                                                onChange={(e) =>
                                                  handleInputSearch(e, i)
                                                }
                                                id={"inputSearch-" + i}
                                                autoComplete="off"
                                              />
                                              <div className="btn border">
                                                <span className="mr-2">
                                                  <AddIcon />
                                                </span>
                                                Add Part
                                              </div>

                                              {
                                                <ul
                                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                                >
                                                  {obj.selectOptions.map(
                                                    (currentItem, j) => (
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
                                                    )
                                                  )}
                                                </ul>
                                              }
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                    <div
                                      onClick={(e) => addSearchQuerryHtml(e)}
                                    >
                                      <Link
                                        to="#"
                                        className="btn-sm text-white border mr-2"
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
                                          fill="#ffffff"
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
                                        {/* <DeleteIcon className="font-size-16" /> */}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <div className="text-center border-left pl-3 py-3">
                                <Link
                                  onClick={() => setOpen4(true)}
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
                            rows={rowsExternal}
                            columns={columnsExternal}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onCellClick={(e) => handleRowClick(e)}
                          />
                        </div>
                        <div className=" text-right mt-3">
                          <button
                            type="button"
                            className="btn border bg-primary text-white"
                            onClick={updateLabourEstHeader}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </TabPanel>
                <TabPanel value="othrMisc">
                  {!miscData.id && (
                    <div className="col-md-12 col-sm-12">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={flagRequired.flagMiscReq}
                                  onChange={handleChangeSwitch}
                                  name="flagMiscReq"
                                />
                              }
                              label="REQUIRED"
                              value={flagRequired.flagMiscReq}
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  )}
                  {flagRequired.flagMiscReq && (
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
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setMiscData({ ...miscData, pricingMethod: e })
                                }
                                options={priceMethodOptions}
                                placeholder="Required"
                                value={miscData.pricingMethod}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                NET PRICE - MISC.
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
                                TYPE OF MISC.{" "}
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setMiscData({ ...miscData, typeOfMisc: e })
                                }
                                options={miscTypeList}
                                value={miscData.typeOfMisc}
                                placeholder="Required"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setMiscData({ ...miscData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={miscData.payer}
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
                                class="form-control border-radius-10 text-primary"
                                placeholder="Optional"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                onClick={updateMiscHeader}
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
                                NET PRICE - MISC
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                TYPE OF MISC.
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.typeOfMisc}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.payer?.value}
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
          <AddLaborItemModal
            laborItemOpen={laborItemOpen}
            handleLaborItemClose={handleLaborItemClose}
            setLabourItemData={setLabourItemData}
            labourItemData={labourItemData}
            serviceEstimateData={serviceEstimateData}
            unitOfMeasureOptions={unitOfMeasureOptions}
            chargeCodeList={chargeCodeList}
            // title={addPartModalTitle}
            addLaborItem={addLaborItem}
            laborTypeList={laborTypeList}
            serviceTypeList={serviceTypeList}
          />

          <Modal
            show={open3}
            onHide={handleClose3}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                1000-Engine|23-Replace Engine|Replace Engine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i>
                    <span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE TYPE
                        </label>
                        <Select
                          onChange={e=>setConsumableItemData({...consumableItemData, consumableType: e})}
                          value={consumableItemData.consumableType}
                          options={consumableTypeList}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE ID
                        </label>
                        <SearchBox
                          value={consumableItemData.consumableId}
                          onChange={(e) =>
                            handleConsumableSearch("consumable", e.target.value)
                          }
                          type="consumableId"
                          result={searchConsumableResult}
                          onSelect={handleConsumableSelect}
                          noOptions={noOptionsConsumable}
                        />
                    </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE DESCRIPTION
                        </label>
                        <input
                          type="text"
                          disabled
                          value={consumableItemData.consumableDesc}
                          class="form-control border-radius-10"
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          QUANTITY
                        </label>
                        <input
                          type="text"
                          value={consumableItemData.quantity}
                          onChange={e => setConsumableItemData({...consumableItemData, quantity: e.target.value})}
                          class="form-control border-radius-10"
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT OF MEASURES
                        </label>
                        <input
                          type="text"
                          value={consumableItemData.unitOfMeasure}
                          onChange={e => setConsumableItemData({...consumableItemData, unitOfMeasure: e.target.value})}
                          class="form-control border-radius-10"
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          VENDOR
                        </label>
                        <input
                          type="text"
                          value={consumableItemData.vendor}
                          onChange={e => setConsumableItemData({...consumableItemData, vendor: e.target.value})}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          value={consumableItemData.unitPrice}
                          // onChange={e => setConsumableItemData({...consumableItemData, unitPrice: e.target.value})}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          value={consumableItemData.extendedPrice}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CURRENCY
                        </label>
                        <input
                          type="text"
                          disabled
                          value={consumableItemData.currency}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          value={consumableItemData.quantity}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <button
                    type="button"
                    className="btn border mr-3"
                    onClick={handleClose3}
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn text-white bg-primary"
                    onClick={handleClose3}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={open4}
            onHide={handleClose4}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                1000-Engine|23-Replace Engine|Replace Engine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i>
                    <span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTIVITY ID
                        </label>
                        <Select
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              activityId: e,
                            })
                          }
                          value={extWorkItemData.activityId}
                          options={activityIdList}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTIVITY NAME
                        </label>
                        <input
                          type="text"
                          disabled
                          value={extWorkItemData.activityName}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SHORT DESCRIPTION
                        </label>
                        <input
                          type="text"
                          value={extWorkItemData.shortDescription}
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              shortDescription: e.target.value,
                            })
                          }
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          SUPPLYING VENDOR
                        </label>
                        <SearchBox
                          value={extWorkItemData.supplyingVendor}
                          onChange={(e) =>
                            handleVendorSearch("vendor", e.target.value)
                          }
                          type="fullName"
                          result={searchVenodrResults}
                          onSelect={handleVendorSelect}
                          noOptions={noOptionsVendor}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          RATE (UNIT PRICE)
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              unitPrice: e.target.value,
                            })
                          }
                          value={extWorkItemData.unitPrice}
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ESTIMATED HOURS / DAYS
                        </label>
                        <input
                          type="text"
                          value={extWorkItemData.estimatedHours}
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              estimatedHours: e.target.value,
                            })
                          }
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="text"
                          value={extWorkItemData.extendedPrice}
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              extendedPrice: e.target.value,
                            })
                          }
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="text"
                          value={extWorkItemData.totalPrice}
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              totalPrice: e.target.value,
                            })
                          }
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ADJUSTED PRICE
                        </label>
                        <input
                          type="text"
                          value={extWorkItemData.adjustedPrice}
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              adjustedPrice: e.target.value,
                            })
                          }
                          class="form-control border-radius-10"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          DIMENSIONS
                        </label>
                        <Select
                          onChange={(e) =>
                            setExtWorkItemData({
                              ...extWorkItemData,
                              dimension: e,
                            })
                          }
                          options={dimensionList}
                          value={extWorkItemData.dimension}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <button
                    type="button"
                    onClick={handleClose4}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </button>
                  <button type="button" className="btn text-white bg-primary">
                    Save
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default RepairServiceEstimate;
