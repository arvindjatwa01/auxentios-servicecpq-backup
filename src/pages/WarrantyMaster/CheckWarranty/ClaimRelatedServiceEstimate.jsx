import React, { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

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
      <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
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
                          value={labourData.jobCode}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                          value={labourData.jobCodeDescription}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4"></div>
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
                          value={labourData.laborCode}
                          styles={FONT_STYLE_SELECT}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                    {/* <div className="col-md-4 col-sm-4"></div> */}

                    {/* <div className="col-md-4 col-sm-4">
                                  <div className="form-group  mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                      PRICE METHOD
                                    </label>
                                    <input
                                      type="text"
                                      disabled
                                      class="form-control border-radius-10 text-primary"
                                      value={labourData.pricingMethod?.label}
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
                                      value={labourData.ratePerHourOrDay}
                                    />
                                  </div>
                                </div> */}
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          NET PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10 text-primary"
                          value={labourData.totalPrice}
                        />
                      </div>
                    </div>
                    {/* </>
                            ) : (
                              <></>
                            )} */}
                    {/* <div className="col-md-4 col-sm-4">
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
                            </div> */}
                    {/* <div className="col-md-4 col-sm-4">
                              <div class="form-group mt-3">
                                <label className="text-light-dark font-size-12 font-weight-600">
                                  ADJUSTED PRICE
                                </label>
                                <input
                                  type="text"
                                  disabled={!labourData.flatRateIndicator}
                                  class="form-control border-radius-10 text-primary"
                                  value={labourData.adjustedPrice}
                                  onChange={(e) =>
                                    setLabourData({
                                      ...labourData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div> */}

                    <div className="col-md-12">
                      <div class="form-group mt-3 mb-0 text-right">
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updateLabourEstHeader}
                          disabled={
                            !(labourData.laborCode && labourData.totalHours)
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row mt-4">
                    <ReadOnlyField
                      label="JOB CODE"
                      value={labourData.jobCode}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="JOB CODE DESCRIPTION"
                      value={labourData.jobCodeDescription}
                      className="col-md-4 col-sm-4"
                    />
                    <div className="col-md-4 col-sm-4"></div>
                    <ReadOnlyField
                      label="LABOR CODE"
                      value={labourData.laborCode?.label}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="TOTAL HOURS (PLANNED / RECOMMENDED)"
                      value={labourData.totalHours}
                      className="col-md-4 col-sm-4"
                    />
                    <div className="col-md-4 col-sm-4"></div>

                    <ReadOnlyField
                      label="PRICE METHOD"
                      value={labourData.pricingMethod?.label}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="RATE PER HOUR / DAY"
                      value={labourData.ratePerHourOrDay}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="NET PRICE"
                      value={labourData.totalPrice}
                      className="col-md-4 col-sm-4"
                    />

                    {/* <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={labourData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            /> */}
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
                          value={consumableData.jobCode}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                          value={consumableData.jobCodeDescription}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4"></div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          PAYER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
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
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          NET PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10 text-primary"
                          value={consumableData.totalPrice}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="form-group mt-3 mb-0 text-right">
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updateConsumableHeader}
                          // disabled={
                          //   !(
                          //     (!consumableData.flatRateIndicator
                          //       ? consumableData.pricingMethod &&
                          //         consumableData.pricingMethod.value.includes(
                          //           "PER"
                          //         )
                          //         ? consumableData.percentageOfBase &&
                          //           consumableData.basePrice
                          //         : consumableData.pricingMethod
                          //       : true) &&
                          //     (consumableData.flatRateIndicator
                          //       ? consumableData.adjustedPrice
                          //       : true)
                          //   )
                          // }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row mt-4">
                    <ReadOnlyField
                      label="JOB CODE"
                      value={consumableData.jobCode}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="JOB CODE DESCRIPTION"
                      value={consumableData.jobCodeDescription}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="PAYER"
                      value={consumableData.payer}
                      className="col-md-4 col-sm-4"
                    />

                    <ReadOnlyField
                      label="PRICE METHOD"
                      value={consumableData.pricingMethod?.label}
                      className="col-md-4 col-sm-4"
                    />

                    <ReadOnlyField
                      label="NET PRICE"
                      value={consumableData.totalPrice}
                      className="col-md-4 col-sm-4"
                    />
                    {/* <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={consumableData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            /> */}
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
                            querySearchSelector={queryConsSearchSelector}
                            setQuerySearchSelector={setQueryConsSearchSelector}
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
                          value={extWorkData.jobCode}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                          value={extWorkData.jobCodeDescription}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4"></div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          PAYER
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10 text-primary"
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

                    {/* </>
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
                                  value={extWorkData.adjustedPrice}
                                  onChange={(e) =>
                                    setExtWorkData({
                                      ...extWorkData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>*/}
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          NET PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10 text-primary"
                          value={extWorkData.totalPrice}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div class="form-group mt-3 mb-0 text-right">
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updateExtWorkHeader}
                          // disabled={
                          //   !(
                          //     (!extWorkData.flatRateIndicator
                          //       ? extWorkData.pricingMethod &&
                          //         extWorkData.pricingMethod.value.includes(
                          //           "PER"
                          //         )
                          //         ? extWorkData.percentageOfBase &&
                          //           extWorkData.basePrice
                          //         : extWorkData.pricingMethod
                          //       : true) &&
                          //     (extWorkData.flatRateIndicator
                          //       ? extWorkData.adjustedPrice
                          //       : true)
                          //   )
                          // }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row mt-4">
                    <ReadOnlyField
                      label="JOB CODE"
                      value={extWorkData.jobCode}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="JOB CODE DESCRIPTION"
                      value={extWorkData.jobCodeDescription}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="PAYER"
                      value={extWorkData.payer}
                      className="col-md-4 col-sm-4"
                    />
                    {/* {!extWorkData.flatRateIndicator ? (
                              <> */}
                    <ReadOnlyField
                      label="PRICE METHOD"
                      value={extWorkData.pricingMethod?.label}
                      className="col-md-4 col-sm-4"
                    />

                    {/* </>
                            ) : (
                              <></>
                            )} */}
                    <ReadOnlyField
                      label="NET PRICE"
                      value={extWorkData.totalPrice}
                      className="col-md-4 col-sm-4"
                    />
                    {/* <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={extWorkData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            /> */}
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
                            setQuerySearchSelector={setQueryExtSearchSelector}
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
                          value={miscData.jobCode}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                          value={miscData.jobCodeDescription}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          TYPE OF MISC.
                        </label>
                        <Select
                          onChange={(e) =>
                            setMiscData({ ...miscData, type: e })
                          }
                          // closeMenuOnSelect={false}
                          options={miscTypeList}
                          value={miscData.type}
                          isMulti
                          styles={FONT_STYLE_SELECT}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    {/* <div className="col-md-8 col-sm-4"></div> */}
                    {/* {!miscData.flatRateIndicator ? (
                              <> */}
                    {/* <div className="col-md-4 col-sm-4">
                                  <div class="form-group mt-3">
                                    <label className="text-light-dark font-size-12 font-weight-600">
                                      PRICE METHOD
                                    </label>
                                    
                                     <input
                                      type="text"
                                      disabled
                                      class="form-control border-radius-10 text-primary"
                                      value={miscData.pricingMethod?.label}
                                    />
                                  </div>
                                </div> */}

                    {/* </>
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
                                  value={miscData.adjustedPrice}
                                  onChange={(e) =>
                                    setMiscData({
                                      ...miscData,
                                      adjustedPrice: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>*/}
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group mt-3">
                        <label className="text-light-dark font-size-12 font-weight-600">
                          NET PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10 text-primary"
                          value={miscData.totalPrice}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                              // (!miscData.flatRateIndicator
                              //   ? miscData.percentageOfBase &&
                              //     miscData.pricingMethod &&
                              //     miscData.basePrice
                              //   : true) &&
                              miscData.type
                              // &&
                              // (miscData.flatRateIndicator
                              //   ? miscData.adjustedPrice
                              //   : true)
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
                    <ReadOnlyField
                      label="JOB CODE"
                      value={miscData.jobCode}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="JOB CODE DESCRIPTION"
                      value={miscData.jobCodeDescription}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="PAYER"
                      value={miscData.payer}
                      className="col-md-4 col-sm-4"
                    />
                    <ReadOnlyField
                      label="TYPE OF MISC."
                      value={
                        <>
                          {miscData.type?.map((element) => (
                            <div>{element.label}</div>
                          ))}
                        </>
                      }
                      className="col-md-4 col-sm-4"
                    />
                    {/* {!miscData.flatRateIndicator ? (
                              <> */}
                    <ReadOnlyField
                      label="PRICE METHOD"
                      value={miscData.pricingMethod?.label}
                      className="col-md-4 col-sm-4"
                    />

                    {/* </>
                            ) : (
                              <></>
                            )} */}
                    <ReadOnlyField
                      label="NET PRICE"
                      value={miscData.totalPrice}
                      className="col-md-4 col-sm-4"
                    />
                    {/* <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={miscData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            /> */}
                  </div>
                )}
              </React.Fragment>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ClaimRelatedServiceEstimate;
