import React, { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import $ from "jquery";

import {
  Checkbox,
  debounce,
  FormControlLabel,
  FormGroup,
  Switch,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  AddConsumableToService,
  AddExtWorkToService,
  AddLaborToService,
  AddMiscToService,
  AddServiceHeader,
  FetchConsumableforService,
  FetchConsumableItems,
  FetchExtWorkforService,
  FetchExtWorkItems,
  FetchLaborforService,
  FetchLaborItems,
  FetchMiscforService,
  fetchPartlistFromOperation,
  fetchPartsFromPartlist,
  FetchServiceHeader,
  RemoveConsumableItem,
  RemoveExtWorkItem,
  RemoveLaborItem,
} from "services/repairBuilderServices";
import Select from "react-select";
import {
  CONS_EXT_PRICE_OPTIONS,
  CONSUMABLE_SEARCH_Q_OPTIONS,
  EXTWORK_SEARCH_Q_OPTIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  INITIAL_PAGE_NO,
  INITIAL_PAGE_SIZE,
  LABOR_PRICE_OPTIONS,
  MISC_PRICE_OPTIONS,
} from "pages/Repair/CONSTANTS";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import { Link } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import penIcon from "../../../assets/images/pen.png";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import SearchComponent from "pages/Repair/components/SearchComponent";
import {
  getConsumables,
  getExtWork,
  sparePartSearch,
} from "services/searchServices";

const unitOfMeasureOptions = [
  { label: "Hours", value: "HOURS" },
  { label: "Days", value: "DAYS" },
];

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

const initialPartsQuery = [
  {
    id: 0,
    selectCategory: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: "",
  },
];

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

const typeOptions = [
  { label: "OEM", value: "OEM" },
  { label: "Supplier", value: "SUPPLIER" },
  { label: "Dealer", value: "DEALER" },
  { label: "Channel Partner", value: "CHANNEL_PARTNER" },
];

const codeOptions = [
  { label: "User-defined", value: "USER_DEFINED" },
  { label: "Auto-derived", value: "AUTO_DERIVED" },
];

const coverageTypeOptions = [
  { label: "Parts & Labour", value: "PARTS_AND_LABOUR" },
  { label: "Only Parts", value: "ONLY_PARTS" },
  { label: "Part & Labour & Misc.", value: "PART_AND_LABOUR_AND_MISC" },
  { label: "All Covered", value: "ALL_COVERED" },
];

const ClaimRelatedServiceEstimate = ({
  laborCodeList,
  chargeCodeList,
  laborTypeList,
  serviceTypeList,
  miscTypeList,
  dimensionList,
  consumableTypeList,
  priceMethodOptions,
  activityIdList,
  handleSnack,
  setActiveUpperTabs,
}) => {
  //   const { activeElement, setActiveElement } = props.builderDetails;
  const [activeElement, setActiveElement] = useState({
    name: "header",
    bId: "",
    sId: "",
    oId: "",
    builderType: "",
  });

  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);
  const [searchResultConsOpen, setSearchResultConsOpen] = useState(false);
  const [searchResultExtWorkOpen, setSearchResultExtWorkOpen] = useState(false);
  const [searchResultPartsOpen, setSearchResultPartsOpen] = useState(false);
  const [extWorkItemOpen, setExtWorkItemOpen] = useState(false);

  const [partsLoading, setPartsLoading] = useState(false);
  const [partListId, setPartListId] = useState("");
  const [partLists, setPartLists] = useState([]);

  const [partsData, setPartsData] = useState({
    id: "",
    jobCode: "",
    jobOperation: "",
    description: "",
    pricingMethod: "",
    componentCode: "",
    user: "USER1",
  });

  let [laborItems, setLaborItems] = useState([]);

  // Sets the value for the tab (labor, consumable, misc, extWork)
  const [value, setValue] = useState("labor");

  const [laborItemOpen, setLaborItemOpen] = useState(false);
  const [laborViewOnly, setLaborViewOnly] = useState(false);

  const [extWorkItemData, setExtWorkItemData] = useState(
    initialExtWorkItemData
  );
  const [serviceHeaderViewOnly, setServiceHeaderViewOnly] = useState(false);
  const [partsViewOnly, setPartsViewOnly] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
  const [partsFilterQuery, setPartsFilterQuery] = useState("");
  const [totalPartsCount, setTotalPartsCount] = useState(0);
  const [spareparts, setSpareparts] = useState([]);
  const [consumableViewOnly, setConsumableViewOnly] = useState(false);
  const [extWorkViewOnly, setExtWorkViewOnly] = useState(false);
  const [miscViewOnly, setMiscViewOnly] = useState(false);
  const [consumableItemOpen, setConsumableItemOpen] = React.useState(false);

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
    flatRateIndicator: false,
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

  const [labourItemData, setLabourItemData] = useState(initialLaborItemData);

  const [queryConsSearchSelector, setQueryConsSearchSelector] =
    useState(initialConsQuery);
  const [queryExtSearchSelector, setQueryExtSearchSelector] =
    useState(initialExtWorkQuery);
  const [queryPartsSearchSelector, setQueryPartsSearchSelector] =
    useState(initialPartsQuery);

  const [masterData, setMasterData] = useState([]);
  let [consumableItems, setConsumableItems] = useState([]);
  let [extWorkItems, setExtWorkItems] = useState([]);

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

  const [flagRequired, setFlagRequired] = useState({
    labourEnabled: true,
    consumableEnabled: true,
    externalWorkEnabled: true,
    miscEnabled: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Once parts are selected to add clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
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
        populateServiceEstimation("consumables");
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
    // console.log(row.activityId);
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

  const updateLabourEstHeader = () => {
    let data = {
      ...(labourData.id && { id: labourData.id }),
      jobCode: labourData.jobCode,
      jobCodeDescription: labourData.jobCodeDescription,
      laborCode: labourData.laborCode?.value,
      totalHours: labourData.totalHours,
      // payer: labourData.payer,
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

  const populateServiceEstimation = (fetchType) => {
    if (activeElement.oId) {
      FetchServiceHeader(activeElement.oId)
        .then((result) => {
          // console.log("ABCD", activeElement.builderType);
          // if (activeElement.builderType === WITH_PARTS ) setValue("parts");
          // else setValue("labor");
          // console.log(activeElement.builderType === WITH_PARTS);
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
            flatRateIndicator: result.flatRateIndicator
              ? result.flatRateIndicator
              : false,
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
            if (fetchType === "all" || fetchType === "parts")
              populatePartsData(result, false);
            if (fetchType === "all" || fetchType === "labor")
              populateLaborData(result);
            if (fetchType === "all" || fetchType === "consumables")
              populateConsumableData(result);
            if (fetchType === "all" || fetchType === "extwork")
              populateExtWorkData(result);
            if (fetchType === "all" || fetchType === "othrMisc")
              populateMiscData(result);
          } else {
            setPartsData({
              ...partsData,
              jobCode: result.jobCode,
              description: result.jobOperation,
              jobOperation: result.jobCodeDescription,
              componentCode: result.componentCode,
            });
            setLabourData({
              ...labourData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobCodeDescription,
            });
            setConsumableData({
              ...consumableData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobCodeDescription,
            });
            setExtWorkData({
              ...extWorkData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobCodeDescription,
            });
            setMiscData({
              ...miscData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobCodeDescription,
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

  function populatePartsData(result, isDelete) {
    setPartsLoading(true);
    if (partListId && !isDelete) {
      let partListDetails = partLists.filter(
        (partlist) => partlist.id === partListId
      );
      setPartsData({
        ...partListDetails[0],
        id: partListDetails[0].id,
        pricingMethod: priceMethodOptions.find(
          (element) => element.value === partListDetails[0].pricingMethod
        ),
      });
      setPartListId(partListDetails[0].id);
      fetchPartsOfPartlist(
        partListDetails[0].id,
        INITIAL_PAGE_NO,
        INITIAL_PAGE_SIZE
      );
      setPartsViewOnly(true);
    } else {
      fetchPartlistFromOperation(activeElement.oId)
        .then((resultPartLists) => {
          if (resultPartLists && resultPartLists.length > 0) {
            // let groupedPartList = groupBy(resultPartLists, "partlistId")
            //   console.log(groupedPartList);
            setPartLists(resultPartLists);
            // console.log(
            //   priceMethodOptions.find(
            //     (element) => element.value === resultPartLists[0].pricingMethod
            //   )
            // );
            if (resultPartLists.length === 1) {
              setPartsData({
                ...resultPartLists[0],
                id: resultPartLists[0].id,
                pricingMethod: priceMethodOptions.find(
                  (element) =>
                    element.value === resultPartLists[0].pricingMethod
                ),
              });
              setPartListId(resultPartLists[0].id);
              fetchPartsOfPartlist(
                resultPartLists[0].id,
                INITIAL_PAGE_NO,
                INITIAL_PAGE_SIZE
              );
            }
            setPartsViewOnly(true);
          } else {
            setPartsData({
              ...partsData,
              jobCode: result.jobCode,
              description: result.jobOperation,
              jobOperation: result.jobCodeDescription,
              componentCode: result.componentCode,
            });
          }
        })
        .catch((e) => {
          setPartsData({
            ...partsData,
            jobCode: result.jobCode,
            description: result.jobOperation,
            jobOperation: result.jobCodeDescription,
            componentCode: result.componentCode,
          });
        });
    }
    setPartsLoading(false);
  }

  const fetchPartsOfPartlist = async (partlistId, pageNo, rowsPerPage) => {
    setPartsLoading(true);
    setPage(pageNo);
    setPageSize(rowsPerPage);
    let sort = sortDetail.sortColumn
      ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
      : "";
    let filter = partsFilterQuery ? `&search=${partsFilterQuery}` : "";
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
          jobCodeDescription: result.jobCodeDescription,
        });
      });
  }

  function populateLaborItems(result) {
    FetchLaborItems(result.id)
      .then((resultLabourItems) => {
        if (resultLabourItems && resultLabourItems.result?.length > 0) {
          setLaborItems(resultLabourItems.result);
        } else {
          setLaborItems([]);
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
          jobCodeDescription: result.jobCodeDescription,
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
          jobCodeDescription: result.jobCodeDescription,
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
          // resultMisc.type?.map(type => {
          //   let matchingType = miscTypeList.find(
          //     (element) => element.value === type
          //   )}
          //   selectedTypes.push(matchingType);
          // )
          setMiscData({
            ...resultMisc,
            id: resultMisc.id,
            pricingMethod: MISC_PRICE_OPTIONS.find(
              (element) => element.value === resultMisc.pricingMethod
            ),
            // type: miscTypeList.find(
            //   (element) => element.value === resultMisc.type
            // ),
            type: miscTypeList.filter(function (element) {
              return resultMisc.type?.includes(element.value);
            }),
            totalPrice: resultMisc.totalPrice ? resultMisc.totalPrice : 0,
          });
          setMiscViewOnly(true);
        }
      })
      .catch((e) => {
        setMiscData({
          ...miscData,
          jobCode: result.jobCode,
          jobCodeDescription: result.jobCodeDescription,
        });
      });
  }

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

  // Add or Update consumable data
  const updateConsumableHeader = () => {
    let data = {
      // ...consumableData,
      ...(consumableData.id && { id: consumableData.id }),
      jobCode: consumableData.jobCode,
      jobCodeDescription: consumableData.jobCodeDescription,
      // ...(!consumableData.flatRateIndicator
      //   ? consumableData.pricingMethod?.value?.includes("PER")
      //     ? {
      //         percentageOfBase: consumableData.percentageOfBase,
      //         pricingMethod: consumableData.pricingMethod?.value,
      //         basePrice: consumableData.basePrice,
      //       }
      //     : { pricingMethod: consumableData.pricingMethod?.value }
      //   : {}),
      // flatRateIndicator: consumableData.flatRateIndicator,
      // adjustedPrice: consumableData.flatRateIndicator
      //   ? consumableData.adjustedPrice
      //   : 0.0,
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

  // Consumable Search
  const handleQuerySearchClick = async (type) => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    var querySearchSelector =
      type === "consumables"
        ? queryConsSearchSelector
        : type === "parts"
        ? queryPartsSearchSelector
        : queryExtSearchSelector;
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
        } else if (type === "parts") {
          const res = await sparePartSearch(searchStr);
          setMasterData(res);
          setSearchResultPartsOpen(true);
        }
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching results!");
    }
  };

  // Add or Update ext work data
  const updateExtWorkHeader = () => {
    let data = {
      // ...extWorkData,
      ...(extWorkData.id && { id: extWorkData.id }),
      jobCode: extWorkData.jobCode,
      jobCodeDescription: extWorkData.jobCodeDescription,
      // flatRateIndicator: extWorkData.flatRateIndicator,
      // ...(!extWorkData.flatRateIndicator
      //   ? extWorkData.pricingMethod?.value?.includes("PER")
      //     ? {
      //         percentageOfBase: extWorkData.percentageOfBase,
      //         pricingMethod: extWorkData.pricingMethod?.value,
      //         basePrice: extWorkData.basePrice,
      //       }
      //     : { pricingMethod: extWorkData.pricingMethod?.value }
      //   : {}),
      // adjustedPrice: extWorkData.flatRateIndicator
      //   ? extWorkData.adjustedPrice
      //   : 0.0,
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
    // console.log(miscData.type);
    let miscTypes = [];
    miscData.type?.map((element) => miscTypes.push(element.value));
    let data = {
      ...(miscData.id && { id: miscData.id }),
      jobCode: miscData.jobCode,
      jobCodeDescription: miscData.jobCodeDescription,
      // flatRateIndicator: miscData.flatRateIndicator,
      // ...(!miscData.flatRateIndicator && {
      //   percentageOfBase: miscData.percentageOfBase,
      //   pricingMethod: miscData.pricingMethod?.value,
      //   basePrice: miscData.basePrice,
      // }),
      // adjustedPrice: miscData.flatRateIndicator ? miscData.adjustedPrice : 0.0,
      payer: miscData.payer,
      // type: miscData.type?.value,
      type: miscTypes,
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
        populateServiceEstimation("othrMisc");
        handleSnack("success", "Misc details updated!");
        setMiscViewOnly(true);
      })
      .catch((err) => {
        handleSnack("error", "Error occurred while updating misc data!");
      });
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
      <div className="row mb-2" style={{ justifyContent: "right" }}>
        <button
          type="button"
          className="btn btn-light bg-primary text-white mr-2"
          onClick={() => setActiveUpperTabs("")}
        >
          Back
        </button>
      </div>
      <div className="card border px-3 py-3">
        <div className="row input-fields">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Type
              </label>
              <Select
                className="text-primary"
                options={typeOptions}
                // onChange={(e) =>
                //   handleSelectChange(e, `questions${row.questionId}`)
                // }
                // value={recordObj[`questions${row.questionId}`]}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Code
              </label>
              <Select
                className="text-primary"
                options={codeOptions}
                // onChange={(e) =>
                //   handleSelectChange(e, `questions${row.questionId}`)
                // }
                // value={recordObj[`questions${row.questionId}`]}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Name
              </label>
              <Select
                className="text-primary"
                options={typeOptions}
                // onChange={(e) =>
                //   handleSelectChange(e, `questions${row.questionId}`)
                // }
                // value={recordObj[`questions${row.questionId}`]}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                ALternate Code
              </label>
              <Select
                className="text-primary"
                options={codeOptions}
                // onChange={(e) =>
                //   handleSelectChange(e, `questions${row.questionId}`)
                // }
                // value={recordObj[`questions${row.questionId}`]}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Claim Number
              </label>
              <input
                type="text"
                disabled
                class="form-control border-radius-10 text-primary"
                // value={labourData.jobCode}
                value={"CO8635"}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Coverage Type
              </label>
              <Select
                className="text-primary"
                options={coverageTypeOptions}
                // onChange={(e) =>
                //   handleSelectChange(e, `questions${row.questionId}`)
                // }
                // value={recordObj[`questions${row.questionId}`]}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Repair Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    // value={evaluatedByRecordObj.evaluatedOn}
                    // onChange={(e) =>
                    //   handleEvaluatedBySelectChange(e, "evaluatedOn")
                    // }
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
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Work Order Number
              </label>
              <input
                type="text"
                // disabled
                class="form-control border-radius-10 text-primary"
                // value={labourData.jobCode}
                // value={"CO8635"}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Hours on the Job
              </label>
              <input
                type="text"
                // disabled
                class="form-control border-radius-10 text-primary"
                // value={labourData.jobCode}
                // value={"CO8635"}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Travel Time
              </label>
              <input
                type="text"
                // disabled
                class="form-control border-radius-10 text-primary"
                // value={labourData.jobCode}
                // value={"CO8635"}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Vehicle KM
              </label>
              <input
                type="text"
                // disabled
                class="form-control border-radius-10 text-primary"
                // value={labourData.jobCode}
                // value={"CO8635"}
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Misc. Details
              </label>
              <textarea
                className="form-control border-radius-10 text-primary"
                // name={`questions${row.questionId}`}
                cols="30"
                rows="3"
                // value={recordObj[`questions${row.questionId}`]}
                // onChange={handleInputTextChange}
                // placeholder="causes"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimRelatedServiceEstimate;
