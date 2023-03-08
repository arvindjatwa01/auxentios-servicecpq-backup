import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import ReviewAddIcon from "@mui/icons-material/CreateNewFolderOutlined";
import EYEIcon from "@mui/icons-material/VisibilityOutlined";
import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {
  faCloudUploadAlt,
  faFileAlt,
  faFolderPlus,
  faShareAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  DataGrid,
  getGridStringOperators,
  GridActionsCellItem,
  useGridApiContext,
} from "@mui/x-data-grid";
import $ from "jquery";
import React, { useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as Select } from "react-select";
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
  addPartToPartList,
  addPartlist,
  uploadPartsToPartlist,
  RemoveSparepart,
  fetchPartsFromPartlist,
  addPartlistToOperation,
  addMultiPartsToPartList,
  fetchPartlistFromOperation,
  createPartlistVersion,
  RemovePartlist,
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
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import {
  getConsumables,
  getExtWork,
  getVendors,
  sparePartSearch,
} from "services/searchServices";
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
import AddLaborItemModal from "./components/AddLaborItem";
import {
  CONSEXT_PRICE_OPTIONS_NOLABOR,
  CONSUMABLE_SEARCH_Q_OPTIONS,
  CONS_EXT_PRICE_OPTIONS,
  ERROR_MAX_VERSIONS,
  EXTWORK_SEARCH_Q_OPTIONS,
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  INITIAL_PAGE_NO,
  INITIAL_PAGE_SIZE,
  LABOR_PRICE_OPTIONS,
  MISC_PRICE_OPTIONS,
  MISC_PRICE_OPTIONS_NOLABOR,
  PART_AND_SERVICE_TEMPLATE,
  SPAREPART_SEARCH_Q_OPTIONS,
  WITH_PARTS,
} from "./CONSTANTS";
import SearchComponent from "./components/SearchComponent";
import AddExtWorkItemModal from "./components/AddExtWorkItem";
import AddConsumableItemModal from "./components/AddConsumableItem";
import LoadingProgress from "./components/Loader";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReadOnlyField } from "./components/ReadOnlyField";
import AddNewSparepartModal from "./components/AddNewSparePart";
import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MuiMenuComponent } from "pages/Operational";
import { RenderConfirmDialog } from "./components/ConfirmationBox";

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
function ServiceOnlyTemplateEstimation(props) {
  const { activeElement, setActiveElement } = props.templateDetails;
  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);
  const [searchResultConsOpen, setSearchResultConsOpen] = useState(false);
  const [searchResultPartsOpen, setSearchResultPartsOpen] = useState(false);
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
  const [partsData, setPartsData] = useState({
    id: "",
    jobCode: "",
    jobOperation: "",
    description: "",
    pricingMethod: "",
    componentCode: "",
    user: "USER1",
  });

  const [selectedVersion, setSelectedVersion] = useState("Version 1");
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
  const [partsViewOnly, setPartsViewOnly] = useState(false);
  const [partsLoading, setPartsLoading] = useState(false);

  const [totalPartsCount, setTotalPartsCount] = useState(0);
  const [partsFilterQuery, setPartsFilterQuery] = useState("");
  const [selectedPartsMasterData, setSelectedPartsMasterData] = useState([]);
  const [bulkUpdateProgress, setBulkUpdateProgress] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationVersionOpen, setConfirmationVersionOpen] = useState(false);

  const [rowsToUpdate, setRowsToUpdate] = useState([]);
  const [partLists, setPartLists] = useState([]);
  // const [rating, setRating] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [addPartModalTitle, setAddPartModalTitle] = useState("Add Part");
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [partListId, setPartListId] = useState("");
  const [partFieldViewonly, setPartFieldViewonly] = useState(false);
  const [spareparts, setSpareparts] = useState([]);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [laborViewOnly, setLaborViewOnly] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [file, setFile] = useState(null);
  const [consumableViewOnly, setConsumableViewOnly] = useState(false);
  const [extWorkViewOnly, setExtWorkViewOnly] = useState(false);
  const [miscViewOnly, setMiscViewOnly] = useState(false);
  const [serviceHeaderViewOnly, setServiceHeaderViewOnly] = useState(false);
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
    // { headerName: "Unit Price", field: "listPrice", flex: 1, width: 130 },
    { headerName: "Status", field: "status", flex: 1, width: 130 },
  ];
  const partlistColumns = [
    {
      field: "partlistId",
      headerName: "Partlist Id",
      flex: 1,
      width: 40,
      renderCell: (params) => (
        <div>
          <span style={{fontSize: 12}}>{params.value}{" "}</span>
          <span style={{ fontSize: 9 }}>
            {"  " + params.row.versionNumber + ".0"}
          </span>{" "}
        </div>
      ),
    },
    {
      field: "jobCode",
      headerName: "Job Code",
      flex: 1,
      width: 130,
      renderCell: params => <span style={{fontSize: 12}}>{params.value+" - "+params.row.jobOperation}</span>
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "activeVersion",
      headerName: "Status",
      flex: 1,
      width: 50,
      renderCell: (params) => (
        <div>
          {params.value && (
            <span
              style={{
                backgroundColor: "#00b8b0",
                color: "white",
                fontSize: 12,
                borderRadius: 7,
                padding: 5,
              }}
            >
              ACTIVE
            </span>
          )}
        </div>
      ),
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
            onClick={() => loadPartlist(params.row)}
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
            onClick={() => handleDeletePartlist(params.row.id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
      width: 130,
    },
  ];

  //Columns to display spare parts for the partlist
  const columnsPartListSpareParts = [
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
  // Close SparePart search modal
  const handleSearchResClose = () => {
    setSearchResultPartsOpen(false);
    setSelectedPartsMasterData([]);
  };
  // Select parts to add
  const onRowsSelectionHandler = (ids) => {
    setSelectedPartsMasterData([]);
    const selectedRowsData = ids.map((id) =>
      masterData.find((row) => row.id === id)
    );
    // console.log(selectedRowsData);
    setSelectedPartsMasterData(selectedRowsData);
  };
  const filterOperators = getGridStringOperators().filter(({ value }) =>
    ["equals", "contains"].includes(value)
  );
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
  //Close Add part modal
  const handleAddPartClose = () => {
    setAddPartOpen(false);
    setSparePart(initialSparePart);
    setPartFieldViewonly(false);
    setAddPartModalTitle("Add Part");
  };
  function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
      if (!hash[array[i][property]]) hash[array[i][property]] = [];
      hash[array[i][property]].push(array[i]);
    }
    return hash;
  }
  const createPartsTableVersion = async () => {
    await createPartlistVersion(partListId).then((result) => {
      setConfirmationVersionOpen(false);
      setSelectedVersion("Version " + result.versionNumber);
      fetchPartlistFromOperation(activeElement.oId)
        .then((resultPartLists) => {
          if (resultPartLists && resultPartLists.length > 0) {
            // let groupedPartList = groupBy(resultPartLists, "partlistId")
            // console.log(groupedPartList);
            setPartLists(resultPartLists);
            setPartsData({
              ...result,
              id: result.id,
              pricingMethod: priceMethodOptions.find(
                (element) => element.value === result.pricingMethod
              ),
            });
            setPartListId(result.id);
            fetchPartsOfPartlist(result.id, INITIAL_PAGE_NO, INITIAL_PAGE_SIZE);
            setPartsViewOnly(true);
            handleSnack(
              "success",
              `Version ${result.versionNumber} created successfully`
            );
          }
        })
        .catch((err) => {
          setConfirmationVersionOpen(false);

          if (err.message === "Not Allowed")
            handleSnack("warning", ERROR_MAX_VERSIONS);
          else
            handleSnack(
              "error",
              "Error occurred while creating partlist version"
            );
        });
    });
  };

  const createPartlistAndUpdate = async () => {
    await addPartlistToOperation(activeElement.oId, {
      ...(partListId && { id: partListId }),
      activeVersion: true,
      jobOperation: partsData.jobOperation,
      componentCode: partsData.componentCode,
      user: partsData.user,
      // currency: serviceEstimateData.currency,
      jobCode: partsData.jobCode,
      versionNumber: 1,
      description: partsData.description,
      pricingMethod: partsData.pricingMethod?.value,
    })
      .then(async (newPartlist) => {
        await fetchPartlistFromOperation(activeElement.oId).then(
          (resultPartLists) => {
            if (resultPartLists && resultPartLists.length > 0) {
              // let groupedPartList = groupBy(resultPartLists, "partlistId")
              //   console.log(groupedPartList);
              setPartLists(resultPartLists);
            }
          }
        );
        setPartListId(newPartlist.id);
        setPartsViewOnly(true);
        handleSnack("success", `Partlist updated successfully`);
      })
      .catch((err) => {
        console.log("Error Occurred", err);
        handleSnack("error", "Error occurred while updating partlist!");
      });
  };

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

  // Updates the bulk edits
  const bulkUpdateParts = async () => {
    setConfirmationOpen(false);
    if (rowsToUpdate.length === 0) {
      handleSnack("info", `😐 No modifications to update!`);
    } else {
      await addMultiPartsToPartList(partListId, rowsToUpdate)
        .then((result) => {
          handleSnack("success", `👏 Parts have been updated!`);
          setRowsToUpdate([]);
          if (result) {
            fetchPartsOfPartlist(partListId, page, pageSize);
          }
        })
        .catch((err) => {
          console.log(err);
          setRowsToUpdate([]);
          handleSnack("error", `😐 Error occurred while adding the parts!`);
        });
    }
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
    addPartToPartList(partListId, data)
      .then((result) => {
        handleAddPartClose();
        if (addPartModalTitle === "Add Part")
          handleSnack("success", `👏 New Spare Part has been added!`);
        else
          handleSnack("success", `👏 Selected part detail has been updated!`);
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((err) => {
        handleSnack("error", `😐 Error occurred while adding spare part`);
      });
  };

  //Remove partlist
  const handleDeletePartlist = async (id) => {
    await RemovePartlist(id)
      .then((res) => {
        handleSnack("success", res);
        setPartListId("");
        populatePartsData(serviceEstimateData, true);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the partlist");
      });
  };
  const unitOfMeasureOptions = [
    { label: "Hours", value: "HOURS" },
    { label: "Days", value: "DAYS" },
  ];
  // Sets the value for the tab (labor, consumable, misc, extWork)
  const [value, setValue] = useState("");

  //fetches the service headers if already saved or sets the appropriate values
  useEffect(() => {
    setServiceEstHeaderLoading(true);
    populateServiceEstimation("all");
  }, []);

  const populateServiceEstimation = (fetchType) => {
    if (activeElement.oId) {
      FetchServiceHeader(activeElement.oId)
        .then((result) => {
          if (activeElement.templateType === PART_AND_SERVICE_TEMPLATE) setValue("parts");
          else setValue("labor");
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
            if (fetchType === "all" || fetchType === "consumable")
              populateConsumableData(result);
            if (fetchType === "all" || fetchType === "extwork")
              populateExtWorkData(result);
            if (fetchType === "all" || fetchType === "misc")
              populateMiscData(result);
          } else {
            setPartsData({
              ...partsData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobCodeDescription,
              jobOperation: result.jobOperation,
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
  const loadNewPartList = () => {
    setPartListId("");
    setPartsData({
      id: "",
      jobCode: serviceEstimateData.jobCode,
      description: serviceEstimateData.jobOperation,
      jobOperation: serviceEstimateData.jobCodeDescription,
      componentCode: serviceEstimateData.componentCode,
      pricingMethod: "",
      user: "USER 1",
    });
    setPartsViewOnly(false);
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
            console.log(priceMethodOptions.find(
              (element) => element.value === resultPartLists[0].pricingMethod
            ),)
            if(resultPartLists.length === 1){
            setPartsData({
              ...resultPartLists[0],
              id: resultPartLists[0].id,
              pricingMethod: priceMethodOptions.find(
                (element) => element.value === resultPartLists[0].pricingMethod
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
            jobCodeDescription: result.jobCodeDescription,
            jobOperation: result.jobOperation,
            componentCode: result.componentCode,
          });
        });
    }
    setPartsLoading(false);
  }
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
  const makeHeaderEditable = (type) => {
    if (["DRAFT", "REVISED"].indexOf(activeElement?.templateStatus) > -1) {
      if (type === "serviceEstHeader" && serviceHeaderViewOnly)
        setServiceHeaderViewOnly(false);
      else if (value === "parts" && partsViewOnly) setPartsViewOnly(false);
      else if (value === "labor" && laborViewOnly) setLaborViewOnly(false);
      else if (value === "consumables" && consumableViewOnly)
        setConsumableViewOnly(false);
      else if (value === "extwork" && extWorkViewOnly)
        setExtWorkViewOnly(false);
      else if (value === "othrMisc" && miscViewOnly) setMiscViewOnly(false);
    } else {
      handleSnack(
        "info",
        "Active Template cannot be changed, change status to REVISE!"
      );
    }
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
      flatRateIndicator: serviceEstimateData.flatRateIndicator, 
      adjustedPrice: serviceEstimateData.flatRateIndicator
        ? serviceEstimateData.adjustedPrice
        : 0.0,
      // priceMethod: null,
    };
    AddServiceHeader(activeElement.oId, data)
      .then((result) => {
        setServiceEstimateData({
          ...result,
          id: result.id,
          // priceMethod: priceMethodOptions.find(
          //  (element) => element.value === result.priceMethod
          // ),
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

  // Add the selected parts from search result to partlist
  const addSelectedPartsToPartList = async () => {
    setPartsLoading(true);
    handleSearchResClose();
    if (partsViewOnly) {
      const parts = [];
      selectedPartsMasterData.map((item) => {
        let data = {
          partlistId: partListId,
          groupNumber: item.groupNumber,
          partNumber: item.partNumber,
          partType: item.partType,
          quantity: 1,
          currency: serviceEstimateData.currency,
          comment: "",
          description: item.partDescription,
          unitOfMeasure: item.salesUnit,
        };
        parts.push(data);
      });

      await addMultiPartsToPartList(partListId, parts)
        .then((result) => {
          handleSnack(
            "success",
            `New parts have been added with default quantity as 1 successfully!`
          );
          // if (result) {
          //   fetchAllDetails(builderId, generalData.version);
          // }
          fetchPartsOfPartlist(partListId, page, pageSize);
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
  // Open Labor item to view or edit
  const loadPartlist = (row) => {
    console.log(row);
    setPartsData({
      ...row,
      pricingMethod: priceMethodOptions.find(
        (element) => element.value === row.pricingMethod
      ),
    });
    setShowParts(true);
    setPartListId(row.id);
    setSelectedVersion("Version " + row.versionNumber);

    fetchPartsOfPartlist(row.id, INITIAL_PAGE_NO, INITIAL_PAGE_SIZE);
    // setAddPartModalTitle(row?.groupNumber + " | " + row?.partNumber);
    // setPartFieldViewonly(true);
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
    // console.log(miscData.type);
    let miscTypes = [];
    miscData.type?.map((element) => miscTypes.push(element.value));
    let data = {
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
    if (activeElement?.templateStatus === "ACTIVE") {
      handleSnack(
        "warning",
        "Labor item cannot be altered for active documents, reset document status to revise to carry out the activity."
      );
    } else {
      if (labourData.id) {
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
      } else {
        handleSnack("warning", "Please update the labor header details!");
      }
    }
    handleLaborItemClose();
  };

  // Add or Update Consumable Item
  const addConsumableItem = () => {
    if (activeElement?.templateStatus === "ACTIVE") {
      handleSnack(
        "warning",
        "consumable items cannot be altered for active documents, reset document status to revise to carry out the activity."
      );
    } else {
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
            handleSnack(
              "error",
              "Error occurred while adding consumable item!"
            );
          });
      } else {
        handleSnack("warning", "Please update the consumable header details!");
      }
    }
    handleConsumableItemClose();
    setQueryConsSearchSelector(initialConsQuery);
  };

  // Add or Update Consumable Item
  const addExtWorkItem = () => {
    if (activeElement?.templateStatus === "ACTIVE") {
      handleSnack(
        "warning",
        "External work items cannot be altered for active documents, reset document status to revise to carry out the activity."
      );
    } else {
      if (extWorkData.id) {
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
            handleSnack(
              "error",
              "Error occurred while adding external work item!"
            );
          });
      } else {
        handleSnack(
          "warning",
          "Please update the external work header details!"
        );
      }
    }
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

  //Remove Spare Part
  const handleDeleteSparePart = (sparePartId) => {
    RemoveSparepart(partListId, sparePartId)
      .then((res) => {
        handleSnack("success", res);
        // fetchAllDetails(builderId, generalData.version);
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the spare part");
      });
  };
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
  const onPartsFilterChange = React.useCallback((filterModel) => {
    // console.log(filterModel);
    filterModel.items.map((indFilter) => {
      if (indFilter.operatorValue === "equals")
        debounce(
          setPartsFilterQuery(indFilter.columnField + ":" + indFilter.value),
          200
        );
      else if (indFilter.operatorValue === "contains")
        setPartsFilterQuery(indFilter.columnField + "~" + indFilter.value);
    });
  }, []);
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
  //Uplaod spare parts through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadPartsToPartlist(partListId, form)
      .then((result) => {
        // fetchPartsOfPartlist(partListNo, page, pageSize);
        handleSnack("success", `New parts have been uploaded to the partlist`);
        // if (result) {
        //   fetchAllDetails(builderId, generalData.version);
        // }
      })
      .catch((err) => {
        handleSnack("error", `Failed to upload the parts!`);
      });
    setFileUploadOpen(false);
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
  const [queryConsSearchSelector, setQueryConsSearchSelector] =
    useState(initialConsQuery);
  const [queryExtSearchSelector, setQueryExtSearchSelector] =
    useState(initialExtWorkQuery);
  const [queryPartsSearchSelector, setQueryPartsSearchSelector] =
    useState(initialPartsQuery);
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
            <h5 className="d-flex align-items-center mb-0 bg-primary p-2 border-radius-10">
              <div className="" style={{ display: "contents" }}>
                <span
                  className="mr-3 ml-2 text-white"
                  style={{ fontSize: "20px" }}
                >
                  Estimation Header
                </span>
                <div className="btn-sm cursor text-white">
                  <Tooltip title="Edit">
                    <EditIcon
                      onClick={() =>
                        ["DRAFT", "REVISED"].indexOf(
                          activeElement?.templateStatus
                        ) > -1
                          ? makeHeaderEditable("serviceEstHeader")
                          : handleSnack(
                              "info",
                              "Set revised status to modify active templates"
                            )
                      }
                    />
                  </Tooltip>
                </div>
                <div className="btn-sm cursor text-white">
                  <Tooltip title="Reset">
                    <ReplayIcon
                    // onClick={() => handleResetData("RESET")}
                    />
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
                        value={serviceEstimateData.reference}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
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
                        value={serviceEstimateData.description}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            description: e.target.value,
                          })
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4"></div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        SEGMENT TITLE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        value={serviceEstimateData.segmentTitle}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
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
                        value={serviceEstimateData.jobOperation}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB CODE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
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
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE DATE
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            minDate={serviceEstimateData.priceDate}
                            closeOnSelect
                            value={serviceEstimateData.priceDate}
                            onChange={(e) =>
                              setServiceEstimateData({
                                ...serviceEstimateData,
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
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        CURRENCY
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        value={serviceEstimateData.currency}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
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
                        value={serviceEstimateData.netPrice}
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
                              checked={serviceEstimateData.flatRateIndicator}
                              onChange={(e) =>
                                setServiceEstimateData({
                                  ...serviceEstimateData,
                                  flatRateIndicator: e.target.checked,
                                  adjustedPrice: e.target.checked
                                    ? serviceEstimateData.adjustedPrice
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
                        disabled={!serviceEstimateData.flatRateIndicator}
                        class="form-control border-radius-10 text-primary"
                        value={serviceEstimateData.adjustedPrice}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            adjustedPrice: e.target.value,
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
                      serviceEstimateData.priceDate &&
                      serviceEstimateData.reference &&
                      serviceEstimateData.segmentTitle &&
                      serviceEstimateData.flatRateIndicator
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
                  <ReadOnlyField
                    label="REFERENCE"
                    value={serviceEstimateData.reference}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="DESCRIPTION"
                    value={serviceEstimateData.description}
                    className="col-md-4 col-sm-4"
                  />
                  <div className="col-md-4 col-sm-4"></div>
                  <ReadOnlyField
                    label="SEGMENT TITLE"
                    value={serviceEstimateData.segmentTitle}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="JOB OPERATION"
                    value={serviceEstimateData.jobOperation}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="JOB CODE"
                    value={serviceEstimateData.jobCode}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="PRICE DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {serviceEstimateData.priceDate}
                      </Moment>
                    }
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="CURRENCY"
                    value={serviceEstimateData.currency}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="NET PRICE"
                    value={serviceEstimateData.netPrice}
                    className="col-md-4 col-sm-4"
                  />
                  <ReadOnlyField
                    label="ADJUSTED PRICE"
                    value={serviceEstimateData.adjustedPrice}
                    className="col-md-4 col-sm-4"
                  />
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
              <div className="row align-items-center">
                <div className="col-10 mx-2">
                  <div className="d-flex align-items-center w-100">
                    <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                      <h5 className="mr-2 mb-0">
                        <span className="mr-3">Header</span>
                      </h5>
                      <a
                        href={undefined}
                        className="ml-3"
                        style={{ cursor: "pointer" }}
                      >
                        <EditOutlinedIcon
                          onClick={() => makeHeaderEditable()}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                {value === "parts" && (
                  <div class="">
                    <button
                      className="btn text-violet border"
                      onClick={() => loadNewPartList()}
                    >
                      Create New Partlist
                    </button>
                  </div>
                )}
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="custom-tabs-div"
                      onChange={handleChange}
                    >
                      {activeElement.templateType === PART_AND_SERVICE_TEMPLATE && (
                        <Tab label="Parts" value="parts" />
                      )}
                      <Tab label="Labor" value="labor" />
                      <Tab label="Consumables" value="consumables" />
                      <Tab label="External Work" value="extwork" />
                      <Tab label="Other misc." value="othrMisc" />
                    </TabList>
                  </Box>
                  <TabPanel value="parts">
                    {partsLoading ?   <LoadingProgress />: !partsViewOnly ? (
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
                              value={partsData.jobCode}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
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
                              value={partsData.jobOperation}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div class="form-group mt-3">
                            <label className="text-light-dark font-size-12 font-weight-600">
                              DESCRIPTION
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control border-radius-10 text-primary"
                              value={partsData.description}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div class="form-group mt-3">
                            <label className="text-light-dark font-size-12 font-weight-600">
                              COMPONENT CODE
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control border-radius-10 text-primary"
                              value={partsData.componentCode}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group mt-3">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PRICE METHOD
                            </label>
                            <Select
                              onChange={(e) =>
                                setPartsData({
                                  ...partsData,
                                  pricingMethod: e,
                                })
                              }
                              options={priceMethodOptions}
                              value={partsData.pricingMethod}
                              styles={FONT_STYLE_SELECT}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div class="form-group mt-3">
                            <label className="text-light-dark font-size-12 font-weight-600">
                              USER
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control border-radius-10 text-primary"
                              value={partsData.user}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div class="form-group mt-3 mb-0 text-right">
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={() =>
                                populatePartsData(serviceEstimateData, false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-light bg-primary text-white"
                              onClick={createPartlistAndUpdate}
                              disabled={!partsData.pricingMethod}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {partLists && partLists.length > 1 && !showParts ? (
                          <div>
                            <DataGrid
                              sx={{
                                ...GRID_STYLE,
                                width: "80%",
                                marginInline: "auto",
                              }}
                              paginationMode="client"
                              rows={partLists}
                              columns={partlistColumns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              autoHeight
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="text-right pl-3 py-3">
                              <div className="d-inline-flex ml-3">
                                <DropdownButton
                                  className="customDropdown ml-2"
                                  id="dropdown-item-button"
                                >
                                  <Dropdown.Item
                                    as="button"
                                    onClick={() =>
                                      setConfirmationVersionOpen(true)
                                    }
                                  >
                                    New Version
                                  </Dropdown.Item>
                                  <Dropdown.Item as="button">
                                    New Partlist
                                  </Dropdown.Item>
                                </DropdownButton>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <ReadOnlyField
                                label="JOB OPERATION"
                                value={partsData.jobOperation}
                                className="col-md-4 col-sm-4"
                              />
                              <ReadOnlyField
                                label="JOB CODE"
                                value={partsData.jobCode}
                                className="col-md-4 col-sm-4"
                              />
                              <ReadOnlyField
                                label="DESCRIPTION"
                                value={partsData.description}
                                className="col-md-4 col-sm-4"
                              />
                              <ReadOnlyField
                                label="COMPONENT CODE"
                                value={partsData.componentCode}
                                className="col-md-4 col-sm-4"
                              />
                              <ReadOnlyField
                                label="PRICE METHOD"
                                value={partsData.pricingMethod?.label}
                                className="col-md-4 col-sm-4"
                              />
                              <ReadOnlyField
                                label="USER"
                                value={partsData.user}
                                className="col-md-4 col-sm-4"
                              />
                            </div>
                            {partLists && partLists.length > 1 && (
                              <div className="col-md-12">
                                <div class="form-group mt-3 mb-0 text-right">
                                  <button
                                    type="button"
                                    className="btn btn-light bg-primary text-white"
                                    onClick={() => setShowParts(false)}
                                  >
                                    Back To Partlists
                                  </button>
                                </div>
                              </div>
                            )}
                            <RenderConfirmDialog
                              confimationOpen={confirmationVersionOpen}
                              message={`Pressing 'Yes' will create another version of this partlist`}
                              handleNo={() => setConfirmationVersionOpen(false)}
                              handleYes={createPartsTableVersion}
                            />
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
                                      <span>{selectedVersion}</span>
                                    </div>
                                    <SearchComponent
                                      querySearchSelector={
                                        queryPartsSearchSelector
                                      }
                                      setQuerySearchSelector={
                                        setQueryPartsSearchSelector
                                      }
                                      clearFilteredData={clearFilteredData}
                                      handleSnack={handleSnack}
                                      searchAPI={sparePartSearch}
                                      searchClick={() =>
                                        handleQuerySearchClick("parts")
                                      }
                                      options={SPAREPART_SEARCH_Q_OPTIONS}
                                      background={"white"}
                                      type=""
                                      buttonText="ADD PART"
                                    />
                                  </div>
                                </div>
                                {["DRAFT", "REVISED"].indexOf(
                                  activeElement?.builderStatus
                                ) > -1 && (
                                  <div className="col-4">
                                    <div className="text-right pl-3 py-3">
                                      <button
                                        onClick={() => setFileUploadOpen(true)}
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
                                columns={columnsPartListSpareParts.map(
                                  (column) => ({
                                    ...column,
                                    filterOperators,
                                  })
                                )}
                                editMode="row"
                                page={page}
                                pageSize={pageSize}
                                onPageChange={(newPage) =>
                                  fetchPartsOfPartlist(
                                    partListId,
                                    newPage,
                                    pageSize
                                  )
                                }
                                onPageSizeChange={(newPageSize) =>
                                  fetchPartsOfPartlist(
                                    partListId,
                                    page,
                                    newPageSize
                                  )
                                }
                                onRowEditStart={(e) =>
                                  setBulkUpdateProgress(true)
                                }
                                sortingMode="server"
                                onSortModelChange={(e) => sortPartsTable(e)}
                                filterMode="server"
                                onFilterModelChange={onPartsFilterChange}
                                onRowEditStop={(e) =>
                                  setBulkUpdateProgress(false)
                                }
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
                                onProcessRowUpdateError={(error) =>
                                  console.log(error)
                                }
                              />
                              <div className=" my-3 text-right">
                                {["DRAFT", "REVISED"].indexOf(
                                  activeElement?.builderStatus
                                ) > -1 && (
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
                            <RenderConfirmDialog
                              confimationOpen={confirmationOpen}
                              message={`Pressing 'Yes' will save all the changes to partlist`}
                              handleNo={() => setConfirmationOpen(false)}
                              handleYes={bulkUpdateParts}
                            />
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
                                    Single upload file should not be more than
                                    10MB. Only the .xls, .xlsx file types are
                                    allowed
                                  </p>
                                </div>
                                <div className="recent-div p-3">
                                  <h6 className="font-weight-600 text-grey mb-0">
                                    RECENT
                                  </h6>
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
                                              control={
                                                <Checkbox defaultChecked />
                                              }
                                              label=""
                                            />
                                          </FormGroup>
                                        </div>
                                        <a
                                          href="#"
                                          className="ml-3 font-size-14"
                                        >
                                          <FontAwesomeIcon icon={faShareAlt} />
                                        </a>
                                        <a
                                          href="#"
                                          className="ml-3 font-size-14"
                                        >
                                          <FontAwesomeIcon
                                            icon={faFolderPlus}
                                          />
                                        </a>
                                        <a
                                          href="#"
                                          className="ml-3 font-size-14"
                                        >
                                          <FontAwesomeIcon icon={faUpload} />
                                        </a>
                                        {/* <a href="#" className="ml-2">
                        <MuiMenuComponent options={activityOptions} />
                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">
                                      2:38pm, 19 Aug 21{" "}
                                    </p>
                                    <p className="font-size-12 mb-0">
                                      Part List{" "}
                                    </p>
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
                                    <FontAwesomeIcon
                                      className="mr-2"
                                      icon={faCloudUploadAlt}
                                    />
                                    Upload
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        )}
                      </>
                    )}
                  </TabPanel>
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
                            <div className="col-md-4 col-sm-4"></div>
                            {!labourData.flatRateIndicator ? (
                              <>
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
                                  value={labourData.pricingMethod}
                                  styles={FONT_STYLE_SELECT}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
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
                                <div className="css-w8dmq8">*Mandatory</div>
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
                                  value={labourData.totalPrice}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
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
                                  disabled={
                                    !(
                                      labourData.laborCode &&
                                      (labourData.flatRateIndicator
                                        ? labourData.adjustedPrice
                                        : labourData.pricingMethod)
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
                            {!labourData.flatRateIndicator ? (
                              <>
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
                              </>
                            ) : (
                              <></>
                            )}
                            <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={labourData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            />
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
                                      styles={FONT_STYLE_SELECT}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
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
                                        <div className="css-w8dmq8">
                                          *Mandatory
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
                            {!consumableData.flatRateIndicator ? (
                              <>
                                <ReadOnlyField
                                  label="PRICE METHOD"
                                  value={consumableData.pricingMethod?.label}
                                  className="col-md-4 col-sm-4"
                                />
                                {consumableData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <ReadOnlyField
                                      label="PERCENTAGE OF BASE"
                                      value={consumableData.percentageOfBase}
                                      className="col-md-4 col-sm-4"
                                    />
                                    <ReadOnlyField
                                      label="TOTAL BASE"
                                      value={consumableData.basePrice}
                                      className="col-md-4 col-sm-4"
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}{" "}
                              </>
                            ) : (
                              <></>
                            )}
                            <ReadOnlyField
                              label="NET PRICE"
                              value={consumableData.totalPrice}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={consumableData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            />
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
                                      styles={FONT_STYLE_SELECT}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
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
                                        <div className="css-w8dmq8">
                                          *Mandatory
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
                            {!extWorkData.flatRateIndicator ? (
                              <>
                                <ReadOnlyField
                                  label="PRICE METHOD"
                                  value={extWorkData.pricingMethod?.label}
                                  className="col-md-4 col-sm-4"
                                />

                                {extWorkData.pricingMethod?.value?.includes(
                                  "PER"
                                ) ? (
                                  <>
                                    <ReadOnlyField
                                      label="PERCENTAGE OF BASE"
                                      value={extWorkData.percentageOfBase}
                                      className="col-md-4 col-sm-4"
                                    />
                                    <ReadOnlyField
                                      label="TOTAL BASE"
                                      value={extWorkData.basePrice}
                                      className="col-md-4 col-sm-4"
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <ReadOnlyField
                              label="NET PRICE"
                              value={extWorkData.totalPrice}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={extWorkData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            />
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
                                      value={miscData.pricingMethod}
                                      styles={FONT_STYLE_SELECT}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
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
                                    <div className="css-w8dmq8">*Mandatory</div>
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
                            {!miscData.flatRateIndicator ? (
                              <>
                                <ReadOnlyField
                                  label="PRICE METHOD"
                                  value={miscData.pricingMethod?.label}
                                  className="col-md-4 col-sm-4"
                                />
                                <ReadOnlyField
                                  label="PERCENTAGE OF BASE"
                                  value={miscData.percentageOfBase}
                                  className="col-md-4 col-sm-4"
                                />
                                <ReadOnlyField
                                  label="TOTAL BASE"
                                  value={miscData.basePrice}
                                  className="col-md-4 col-sm-4"
                                />
                              </>
                            ) : (
                              <></>
                            )}
                            <ReadOnlyField
                              label="NET PRICE"
                              value={miscData.totalPrice}
                              className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                              label="ADJUSTED PRICE"
                              value={miscData.adjustedPrice}
                              className="col-md-4 col-sm-4"
                            />
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
            show={searchResultPartsOpen}
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
                    onSelectionModelChange={(ids) =>
                      onRowsSelectionHandler(ids)
                    }
                    // onCellClick={(e) => handleRowClick(e)}
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

export default ServiceOnlyTemplateEstimation;
