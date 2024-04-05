import React, { useCallback, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import {
  Box,
  Grid,
  Tab,
  TextField,
  TextareaAutosize,
  Tooltip,
  debounce,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  DataGrid,
  GridActionsCellItem,
  getGridStringOperators,
  useGridApiContext,
} from "@mui/x-data-grid";

import $ from "jquery";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import Select from "react-select";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import {
  replacementErpReqObj,
  replacementItemReqObj,
  salesOfficeOptions,
  validityOptions,
} from "../warrantyManagementConstants";
import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
  INITIAL_PAGE_NO,
  INITIAL_PAGE_SIZE,
  SPAREPART_SEARCH_Q_OPTIONS,
} from "pages/Common/constants";
import SearchBox from "pages/Common/SearchBox";
import {
  customerSearch,
  machineSearch,
  sparePartSearch,
} from "services/searchServices";
import SearchComponent from "pages/components/SearchComponent";
import {
  RemoveSparepart,
  fetchBuilderVersionDet,
  fetchPartlistFromBuilder,
  fetchPartsFromPartlist,
} from "services/repairBuilderServices";

const currencyOptions = [{ value: "USD", label: "USD" }];

const returnCoreParts = [
  {
    id: 1,
    itemCode: "2471437",
    itemDescription: "VALVE GP-CON",
    serialNumber: "ZMX00507",
    salesUnit: "PC",
    quantity: "1",
    category: "Base",
    netValue: "$ 64789.45",
    itemStatus: "NEW",
    cerficate: "STD-12",
  },
];

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

const colorStatus = {
  "in stock": "#dfffc9",
  "at customer": "#fff1c2",
  "at workshop": "#ffc8c8",
  "for scrap": "#fff1c2",
};

const statusPointColor = {
  "in stock": "#2ca868",
  "at customer": "#fd8e13",
  "at workshop": "#fe3938",
  "for scrap": "#fd8e12",
};

const data = [
  {
    componentId: "2471437",
    componentDescription: "MOTOR & MTG GP-TRAVEL",
    stock: "Yes",
    warehouseNumber: "AA:2471437",
    serialNumber: "ZMX00507",
    status: "at customer",
    customerName: "Koolan Iron Ore Pty Ltd",
    customerId: "101211",
  },
  {
    componentId: "N98001005",
    componentDescription: "TEMPERATURE SENSOR",
    stock: "Yes",
    warehouseNumber: "MU:N98001005",
    serialNumber: "ZCT00365",
    status: "in stock",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "10R4469",
    componentDescription: "FULL CORE DEPOSIT",
    stock: "No",
    warehouseNumber: "AA:10R4469",
    serialNumber: "ZCT00125",
    status: "at workshop",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "1978885",
    componentDescription: "PUMP GP-GEAR",
    stock: "No",
    warehouseNumber: "AA:1978885",
    serialNumber: "ZMX00289",
    status: "for scrap",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "5503777",
    componentDescription: "CONTROL",
    stock: "Yes",
    warehouseNumber: "AA:5503777",
    serialNumber: "ZCT00865",
    status: "at customer",
    customerName: "Koolan Iron Ore Pty Ltd",
    customerId: "101211",
  },
];

const ReplacementModal = ({ show, hideModal, handleSnack }) => {
  const [tabValue, setTabValue] = useState("replacementReport");
  const [viewOnlyTab, setViewOnlyTab] = useState({
    itemViewOnly: true,
    issueViewOnly: true,
    returnViewOnly: true,
  });
  const [itemDetails, setItemDetails] = useState({ ...replacementItemReqObj });
  const [erpDetails, setErpDetails] = useState({ ...replacementErpReqObj });

  const [issueTabValue, setIssueTabValue] = useState("customer");
  const [returnTabValue, setReturnTabValue] = useState("customer");

  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [issueViewOnlyTab, setIssueViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
    priceViewOnly: false,
  });
  const [returnViewOnlyTab, setReturnViewOnlyTab] = useState({
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

  const [estimationData, setEstimationData] = useState({
    preparedBy: "user1",
    approvedBy: "user1",
    preparedOn: new Date(),
    revisedBy: "user1",
    revisedOn: new Date(),
    salesOffice: null,
  });

  const [generalData, setGeneralData] = useState({
    estimationDate: new Date(),
    estimationNo: "",
    description: "",
    reference: "",
    validity: null,
    version: "",
  });

  const [pricingData, setPricingData] = useState({
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "",
    priceDetailDTO: [],
    priceEstimateDTO: [],
  });

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

  const [replacementQuerySearchSelector, setReplacementQuerySearchSelector] =
    useState([
      {
        id: 0,
        selectCategory: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
  const [returnedQuerySearchSelector, setReturnedQuerySearchSelector] =
    useState([
      {
        id: 0,
        selectCategory: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);

  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [spareparts, setSpareparts] = useState([]);

  const [replMasterData, setReplMasterData] = useState([]);
  const [returnedMasterData, setReturnedMasterData] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [partListNo, setPartListNo] = useState("");
  const [bulkUpdateProgress, setBulkUpdateProgress] = useState(false);
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
  const [filterQuery, setFilterQuery] = useState("");
  const [totalPartsCount, setTotalPartsCount] = useState(0);

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
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [builderId, setBuilderId] = useState("");
  const [headerLoading, setHeaderLoading] = useState(false);
  const [savedBuilderHeaderDetails, setSavedBuilderHeaderDetails] = useState(
    []
  );
  const [partsLoading, setPartsLoading] = useState(false);
  const [rowsToUpdate, setRowsToUpdate] = useState([]);

  const replacementReportColumns = [
    {
      field: "componentId",
      headerName: "Component Id",
      flex: 1,
    },
    {
      field: "componentDescription",
      headerName: "Component Description",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "warehouseNumber",
      headerName: "Warehouse Number",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          className="d-flex justify-content-between align-items-center py-2"
          style={{
            fontSize: 15,
            backgroundColor: colorStatus[params.row.status],
            paddingInline: 5,
            paddingBlock: 2,
            borderRadius: 6,
            textTransform: "capitalize",
            color: statusPointColor[params.row.status],
          }}
        >
          <span
            style={{
              borderRadius: 10,
              content: '" "',
              display: "block",
              marginRight: 8,
              height: 10,
              width: 10,
              backgroundColor: statusPointColor[params.row.status],
            }}
          ></span>{" "}
          {params.row.status}
        </div>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer Id",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => setTabValue("itemDetails")}
                //   onClick={() => handleViewWarrantyOverview(params)}
              >
                <Tooltip title="View">
                  <VisibilityIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  // item details input change
  const handleItemDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ ...itemDetails, [name]: value });
  };

  // item details input change
  const handleERPDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setErpDetails({ ...erpDetails, [name]: value });
  };

  // issues tabs input fiedls value change

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
      regionOrState: currentItem.addressDTO?.regionOrState,
    });
    setSearchCustResults([]);
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
      setMachineData({ ...machineData, model: currentItem.model });
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
        productGroup: currentItem.productGroup,
      });
      setSearchSerialResults([]);
    }
  };

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    const { name, value } = e.target;
    setEstimationData({ ...estimationData, [name]: value });
  };

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    const { name, value } = e.target;
    setMachineData({ ...machineData, [name]: value });
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  // Once parts are selected to add clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
    setSelectedMasterData([]);
  };

  // Once parts are selected to add clear the search results
  const clearReplacementFilteredData = () => {
    setMasterData([]);
    setSelectedMasterData([]);
  };
  // Once parts are selected to add clear the search results
  const clearReturnedFilteredData = () => {
    setMasterData([]);
    setSelectedMasterData([]);
  };

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
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
  const handleReplacementQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    replacementQuerySearchSelector.map(function (item, i) {
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
        setReplMasterData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };
  const handleReturnedQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    returnedQuerySearchSelector.map(function (item, i) {
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
        setReturnedMasterData(res);
        setSearchResultOpen(true);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  //Columns to display spare parts for the partlist
  const columnsPartList = [
    // { headerName: 'Sl#', field: 'rowNum', flex: 1, },
    { headerName: "Group Number", field: "groupNumber", flex: 1 },
    { headerName: "Type", field: "partType", flex: 1 },
    { headerName: "Desc", field: "description", flex: 1 },
    { headerName: "Part Number", field: "partNumber", flex: 1 },
    {
      headerName: "Qty",
      field: "quantity",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Sales Unit",
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
                  <EditOutlinedIcon />
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
                <Tooltip title="Delete">
                  <DeleteIcon />
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
    RemoveSparepart(partListNo, sparePartId)
      .then((res) => {
        handleSnack("success", res);
        fetchAllDetails(builderId, generalData.version);
        // fetchPartsOfPartlist(partListNo, page, pageSize);
      })
      .catch((e) => {
        console.log(e);
        handleSnack("error", "Error occurred while removing the spare part");
      });
  };

  const fetchAllDetails = (builderId, versionNumber) => {
    var versionHistoryData = {
      builderId: "",
      exitingType: "repair",
      editable: false,
    };
    localStorage.setItem("exitingType", JSON.stringify(versionHistoryData));
    console.log(builderId, versionNumber);
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

  const populateHeader = (result) => {
    setSavedBuilderHeaderDetails(result);
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
    // setRating(result.rating);
    // setSelBuilderStatus(
    //   STATUS_OPTIONS.filter((x) => x.value === result.status)[0]
    // );
    let versions = result.versionList?.map((versionNo) => ({
      value: versionNo,
      label: "Version " + versionNo,
    }));
    // setBuilderVersionOptions(versions);
    // setSelectedVersion({
    //   label: "Version " + result.versionNumber,
    //   value: result.versionNumber,
    // });
    populateCustomerData(result);
    populateMachineData(result);
    populateGeneralData(result);
    populateEstData(result);
    populatePricingData(result);
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
    console.log(
      result.validityDays,
      validityOptions.find((element) => element.value === result.validityDays)
    );
    setGeneralData({
      description: result.description ? result.description : "",
      estimationDate: result.estimationDate
        ? result.estimationDate
        : new Date(),
      estimationNo: result.estimationNumber ? result.estimationNumber : "",
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
      netPrice: result.netPrice ? result.netPrice : 0.0,
      adjustedPrice: result.adjustedPrice ? result.adjustedPrice : 0.0,
      currency: result.currency
        ? currencyOptions.find((element) => element.value === result.currency)
        : { label: "", value: "" },
      priceDetailDTO: result.priceDetailDTO,
      priceEstimateDTO: result.priceEstimateDTO,
    });
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
      : "&sortColumn=createdAt&orderBY=ASC";
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

  const onPartsFilterChange = useCallback((filterModel) => {
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

  //
  //Columns to display spare parts for the partlist
  const columnsActiveComponents = [
    // { headerName: 'Sl#', field: 'rowNum', flex: 1, },
    { headerName: "Id", field: "id", flex: 1 },
    { headerName: "Item Code", field: "itemCode", flex: 1 },
    { headerName: "Item Description", field: "itemDescription", flex: 1 },
    { headerName: "Serial Number", field: "serialNumber", flex: 1 },
    {
      headerName: "Sales Unit",
      field: "salesUnit",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Qty",
      field: "quantity",
      flex: 1,
      editable: true,
      filterable: false,
    },
    {
      headerName: "Category",
      field: "category",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Net Value",
      field: "netValue",
      flex: 1,
      filterable: false,
    },
    {
      headerName: "Item Status",
      field: "itemStatus",
      flex: 1,
      filterable: false,
    },
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
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            // onClick={() => openSparePartRow(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              </div>
            }
            label="Delete"
            // onClick={() => handleDeleteSparePart(params.row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const viewReplacementReport = () => {
    return (
      <>
        <div className="card border mt-2 px-4">
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 3,
              padding: 2,
              marginTop: 0.5,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 700,
                // marginBottom: 8,
                marginInline: 2,
              }}
            >
              <DataGrid
                rows={data}
                columns={replacementReportColumns}
                sx={GRID_STYLE}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                rowsPerPageOptions={[5, 10, 20, 50]}
                getRowId={(row) => row.componentId}
              />
            </Box>
          </Grid>
        </div>
      </>
    );
  };

  const viewItemDetails = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Item Details</h5>
          <div>
            <button
              className="border-primary text-primary rounded-pill cursor px-3 py-1"
              //   onClick={handleEdit}
            >
              <EditOutlinedIcon /> Edit
            </button>
          </div>
        </div>
        <div className="card border mb-3 mt-2 px-3 py-2">
          {viewOnlyTab.itemViewOnly ? (
            <div className="row mt-2">
              <ReadOnlyField
                label="COMPONENT ID"
                value={itemDetails.componentId}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="DESCRIPTION"
                value={itemDetails.description}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="TYPE"
                value={itemDetails.type}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="AVAILABLE DATE"
                value={
                  itemDetails.availableDate ? (
                    <Moment format="DD/MM/YYYY">
                      {itemDetails.availableDate}
                    </Moment>
                  ) : (
                    "NA"
                  )
                }
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="STATUS"
                value={itemDetails.status?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="SALE PRICE"
                value={itemDetails.salePrice}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="LOCATION"
                value={itemDetails.location}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="MANUFECTURER"
                value={itemDetails.manufacturer}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="MODEL NUMBER"
                value={itemDetails.modelNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="SERIAL NUMBER"
                value={itemDetails.serialNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="COMP ID(CORE)"
                value={itemDetails.coreId}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="RETURNABLE"
                value={itemDetails.returnable}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="VALUATION"
                value={itemDetails.valuation}
                className="col-md-3 col-sm-3"
              />
            </div>
          ) : (
            <div className="row mt-2 input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    COMPONENT ID
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.componentId}
                    name="componentId"
                    placeholder="Component Id"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.description}
                    name="description"
                    placeholder="Description"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    TYPE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.type}
                    name="type"
                    placeholder="Type"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    AVAILABLE DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        closeOnSelect
                        value={itemDetails.availableDate}
                        onChange={(e) =>
                          setItemDetails({
                            ...itemDetails,
                            availableDate: e,
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
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    STATUS
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.status}
                    name="status"
                    placeholder="Status"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SALE PRICE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.salePrice}
                    name="salePrice"
                    placeholder="Sale Price($)"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.location}
                    name="location"
                    placeholder="Location"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MANUFECTURER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.manufacturer}
                    name="manufacturer"
                    placeholder="Manufacturer"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MODEL NUMBER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.modelNumber}
                    name="modelNumber"
                    placeholder="Model Number"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SERIAL NUMBER
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.serialNumber}
                    name="serialNumber"
                    placeholder="Serial Number"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    COMP ID(CORE)
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.coreId}
                    name="coreId"
                    placeholder="Core Id"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RETURNABLE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.returnable}
                    name="returnable"
                    placeholder="Core Id"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    VALUATION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={itemDetails.valuation}
                    name="valuation"
                    placeholder="Valuation"
                    onChange={handleItemDetailsInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <h5 className="mb-0">ERP Details</h5>
        <div className="card border mb-3 mt-2 px-3 py-2">
          {viewOnlyTab.itemViewOnly ? (
            <div className="row mt-2">
              <ReadOnlyField
                label="MATERIAL CODE"
                value={erpDetails.materialCode}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="MATERIAL DESCRIPTION"
                value={erpDetails.materialDescription}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="MATERIAL GROUP"
                value={erpDetails.materialGroup}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="AVERAGE COST"
                value={erpDetails.averageCost}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="SALE PRICE"
                value={erpDetails.salePrice}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="AVAILABILITY STATUS"
                value={erpDetails.availablityStatus}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="STOCK QUANTITY"
                value={erpDetails.stockQuantity}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="STATUS"
                value={erpDetails.status}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="PLANT/WAREHOUSE"
                value={erpDetails.warehouse}
                className="col-md-3 col-sm-3"
              />
            </div>
          ) : (
            <div className="row mt-2 input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MATERIAL CODE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.materialCode}
                    name="materialCode"
                    placeholder="Material Code"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MATERIAL DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.materialDescription}
                    name="materialDescription"
                    placeholder="Material Description"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MATERIAL GROUP
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.materialGroup}
                    name="materialGroup"
                    placeholder="Material Group"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    AVERAGE COST
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.averageCost}
                    name="averageCost"
                    placeholder="Average Cost"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SALE PRICE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.salePrice}
                    name="salePrice"
                    placeholder="Sale Price"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    AVAILABILITY STATUS
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.availablityStatus}
                    name="availablityStatus"
                    placeholder="Availability Status"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    STOCK QUANTITY
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.stockQuantity}
                    name="stockQuantity"
                    placeholder="Stock Quantity"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    STATUS
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.status}
                    name="status"
                    placeholder="Status"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PLANT/WAREHOUSE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={erpDetails.warehouse}
                    name="warehouse"
                    placeholder="Plant/Warehouse"
                    onChange={handleERPDetailsInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const viewIssueDetails = () => {
    return (
      <>
        <div className="card border">
          <Box className="mt-0" sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={issueTabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  onChange={(e, tabValue) => setIssueTabValue(tabValue)}
                >
                  <Tab label="Customer" value="customer" />
                  <Tab label="Machine " value="machine" />
                  <Tab label="Estimation Details" value="estimation" />
                  <Tab label="General Details" value="general" />
                  <Tab label="Price" value="price" />
                </TabList>
              </Box>
              <TabPanel value="customer">
                {!issueViewOnlyTab.custViewOnly ? (
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
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            CUSTOMER ID
                          </label>
                          <SearchBox
                            value={customerData.customerID}
                            onChange={(e) => handleCustSearch(e.target.value)}
                            type="customerId"
                            result={searchCustResults}
                            onSelect={handleCustSelect}
                            noOptions={noOptionsCust}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // disabled={
                        //   !(
                        //     customerData.source &&
                        //     customerData.contactEmail &&
                        //     customerData.customerGroup &&
                        //     customerData.contactName
                        //   ) || noOptionsCust
                        // }
                        // onClick={updateCustomerData}
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
                {!issueViewOnlyTab.machineViewOnly ? (
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
                              handleMachineSearch("serialNo", e.target.value)
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // disabled={
                        //   !(machineData.model && machineData.serialNo) ||
                        //   noOptionsModel ||
                        //   noOptionsSerial
                        // }
                        // onClick={updateMachineData}
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
                {!issueViewOnlyTab.estViewOnly ? (
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updateEstData}
                        // disabled={
                        //   !(
                        //     estimationData.preparedBy &&
                        //     estimationData.preparedOn &&
                        //     estimationData.salesOffice?.value
                        //   )
                        // }
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
                {!issueViewOnlyTab.generalViewOnly ? (
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
                            <span className=" mr-2">ESTIMATION DATE</span>
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            // value={parseFloat(selectedVersion.value).toFixed(1)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updateGeneralData}
                        // disabled={
                        //   !(
                        //     generalData.estimationDate &&
                        //     generalData.description &&
                        //     generalData.estimationNo &&
                        //     generalData.reference &&
                        //     generalData.validity?.value
                        //   )
                        // }
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
                      //   value={parseFloat(selectedVersion.value).toFixed(1)}
                      className="col-md-4 col-sm-4"
                    />
                  </div>
                )}
              </TabPanel>
              <TabPanel value="price">
                {!issueViewOnlyTab.priceViewOnly ? (
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                // minDate={pricingData.priceDate}
                                // maxDate={new Date()}
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
                            disabled
                            className="form-control border-radius-10 text-primary"
                            value={pricingData.adjustedPrice}
                            // onChange={(e) =>
                            //   setPricingData({
                            //     ...pricingData,
                            //     adjustedPrice: e.target.value,
                            //   })
                            // }
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updatePriceData}
                        // disabled={
                        //   !(
                        //     pricingData.priceDate &&
                        //     pricingData.currency?.value !== ""
                        //   )
                        // }
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
                    <hr />
                    <div className="mb-5">
                      {/* <PriceMethodTable
                        rows={pricingData.priceDetailDTO}
                        setRows={(rows) => {
                          console.log(rows);
                          setPricingData({
                            ...pricingData,
                            priceDetailDTO: rows,
                          });
                        }}
                      /> */}
                      <div
                        className="row my-3 mr-2"
                        style={{ justifyContent: "right" }}
                      >
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          //   onClick={updatePriceData}
                          //   disabled={
                          //     !(pricingData.priceDate && pricingData.currency)
                          //   }
                        >
                          Save Price Methods
                        </button>
                      </div>
                      {/* <PriceSummaryTable
                        rows={pricingData.priceEstimateDTO}
                        setRows={(rows) =>
                          setPricingData({
                            ...pricingData,
                            priceEstimateDTO: rows,
                          })
                        }
                      /> */}
                      <div
                        className="row my-3 mr-2"
                        style={{ justifyContent: "right" }}
                      >
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          //   onClick={updatePriceData}
                          //   disabled={
                          //     !(pricingData.priceDate && pricingData.currency)
                          //   }
                        >
                          Save Price Summary
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
            </TabContext>
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
                    <span>Issue Items</span>
                  </h5>
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
                  buttonText="ADD PART"
                />
              </div>
            </div>
          </div>

          <DataGrid
            sx={GRID_STYLE}
            rows={masterData}
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
            loading={partsLoading}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowCount={totalPartsCount}
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={(newRow, oldRow) =>
              processRowUpdate(newRow, oldRow)
            }
            onProcessRowUpdateError={(error) => console.log(error)}
          />
        </div>
      </>
    );
  };

  const viewReturnDetails = () => {
    return (
      <>
        <div className="card border">
          <Box className="mt-0" sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={returnTabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  onChange={(e, tabValue) => setReturnTabValue(tabValue)}
                >
                  <Tab label="Customer" value="customer" />
                  <Tab label="Machine " value="machine" />
                  <Tab label="Estimation Details" value="estimation" />
                  <Tab label="General Details" value="general" />
                  <Tab label="Price" value="price" />
                </TabList>
              </Box>
              <TabPanel value="customer">
                {!returnViewOnlyTab.custViewOnly ? (
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
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            CUSTOMER ID
                          </label>
                          <SearchBox
                            value={customerData.customerID}
                            onChange={(e) => handleCustSearch(e.target.value)}
                            type="customerId"
                            result={searchCustResults}
                            onSelect={handleCustSelect}
                            noOptions={noOptionsCust}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // disabled={
                        //   !(
                        //     customerData.source &&
                        //     customerData.contactEmail &&
                        //     customerData.customerGroup &&
                        //     customerData.contactName
                        //   ) || noOptionsCust
                        // }
                        // onClick={updateCustomerData}
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
                {!returnViewOnlyTab.machineViewOnly ? (
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
                              handleMachineSearch("serialNo", e.target.value)
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // disabled={
                        //   !(machineData.model && machineData.serialNo) ||
                        //   noOptionsModel ||
                        //   noOptionsSerial
                        // }
                        // onClick={updateMachineData}
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
                {!returnViewOnlyTab.estViewOnly ? (
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                          <div className="css-w8dmq8">*Mandatory</div>
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updateEstData}
                        // disabled={
                        //   !(
                        //     estimationData.preparedBy &&
                        //     estimationData.preparedOn &&
                        //     estimationData.salesOffice?.value
                        //   )
                        // }
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
                {!returnViewOnlyTab.generalViewOnly ? (
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
                            <span className=" mr-2">ESTIMATION DATE</span>
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            // value={parseFloat(selectedVersion.value).toFixed(1)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updateGeneralData}
                        // disabled={
                        //   !(
                        //     generalData.estimationDate &&
                        //     generalData.description &&
                        //     generalData.estimationNo &&
                        //     generalData.reference &&
                        //     generalData.validity?.value
                        //   )
                        // }
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
                      //   value={parseFloat(selectedVersion.value).toFixed(1)}
                      className="col-md-4 col-sm-4"
                    />
                  </div>
                )}
              </TabPanel>
              <TabPanel value="price">
                {!returnViewOnlyTab.priceViewOnly ? (
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                // minDate={pricingData.priceDate}
                                // maxDate={new Date()}
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
                            disabled
                            className="form-control border-radius-10 text-primary"
                            value={pricingData.adjustedPrice}
                            // onChange={(e) =>
                            //   setPricingData({
                            //     ...pricingData,
                            //     adjustedPrice: e.target.value,
                            //   })
                            // }
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
                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        // onClick={updatePriceData}
                        // disabled={
                        //   !(
                        //     pricingData.priceDate &&
                        //     pricingData.currency?.value !== ""
                        //   )
                        // }
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
                    <hr />
                    <div className="mb-5">
                      {/* <PriceMethodTable
                        rows={pricingData.priceDetailDTO}
                        setRows={(rows) => {
                          console.log(rows);
                          setPricingData({
                            ...pricingData,
                            priceDetailDTO: rows,
                          });
                        }}
                      /> */}
                      <div
                        className="row my-3 mr-2"
                        style={{ justifyContent: "right" }}
                      >
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          //   onClick={updatePriceData}
                          //   disabled={
                          //     !(pricingData.priceDate && pricingData.currency)
                          //   }
                        >
                          Save Price Methods
                        </button>
                      </div>
                      {/* <PriceSummaryTable
                        rows={pricingData.priceEstimateDTO}
                        setRows={(rows) =>
                          setPricingData({
                            ...pricingData,
                            priceEstimateDTO: rows,
                          })
                        }
                      /> */}
                      <div
                        className="row my-3 mr-2"
                        style={{ justifyContent: "right" }}
                      >
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          //   onClick={updatePriceData}
                          //   disabled={
                          //     !(pricingData.priceDate && pricingData.currency)
                          //   }
                        >
                          Save Price Summary
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        {/* <h5 className="mb-1">Component</h5> */}
        <div className="card border mt-2 px-4 pb-2">
          <div className="row align-items-center">
            <div className="col-8">
              <div className="d-flex align-items-center w-100">
                <div
                  className="d-flex mr-3 col-auto pl-0"
                  style={{ whiteSpace: "pre" }}
                >
                  <h5 className="mr-2 mb-0 text-black">
                    <span>Replacement</span>
                  </h5>
                </div>
                <SearchComponent
                  querySearchSelector={replacementQuerySearchSelector}
                  setQuerySearchSelector={setReplacementQuerySearchSelector}
                  clearFilteredData={clearReplacementFilteredData}
                  handleSnack={handleSnack}
                  searchAPI={sparePartSearch}
                  searchClick={handleReplacementQuerySearchClick}
                  options={SPAREPART_SEARCH_Q_OPTIONS}
                  background={"white"}
                  type=""
                  buttonText="ADD PART"
                />
              </div>
            </div>
          </div>
          <DataGrid
            sx={GRID_STYLE}
            rows={replMasterData}
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
            loading={partsLoading}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowCount={totalPartsCount}
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={(newRow, oldRow) =>
              processRowUpdate(newRow, oldRow)
            }
            onProcessRowUpdateError={(error) => console.log(error)}
          />
        </div>
        <div className="card border mt-2 px-4 pb-2">
          <div className="row align-items-center">
            <div className="col-8">
              <div className="d-flex align-items-center w-100">
                <div
                  className="d-flex mr-3 col-auto pl-0"
                  style={{ whiteSpace: "pre" }}
                >
                  <h5 className="mr-2 mb-0 text-black">
                    <span>Returned</span>
                  </h5>
                </div>
                <SearchComponent
                  querySearchSelector={returnedQuerySearchSelector}
                  setQuerySearchSelector={setReturnedQuerySearchSelector}
                  clearFilteredData={clearReturnedFilteredData}
                  handleSnack={handleSnack}
                  searchAPI={sparePartSearch}
                  searchClick={handleReturnedQuerySearchClick}
                  options={SPAREPART_SEARCH_Q_OPTIONS}
                  background={"white"}
                  type=""
                  buttonText="ADD PART"
                />
              </div>
            </div>
          </div>
          <DataGrid
            sx={GRID_STYLE}
            rows={returnedMasterData}
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
            loading={partsLoading}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowCount={totalPartsCount}
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={(newRow, oldRow) =>
              processRowUpdate(newRow, oldRow)
            }
            onProcessRowUpdateError={(error) => console.log(error)}
          />
        </div>
        {/* <h5 className="font-weight-bold fw-bold mb-1 mt-3">
          Active Components for Selected Customer
        </h5>
        <DataGrid
          sx={GRID_STYLE}
          rows={returnCoreParts}
          autoHeight
          columns={columnsActiveComponents}
          getRowId={(row) => row.id}
          // editMode="row"
          // page={page}
          // pageSize={pageSize}
          // onPageChange={(newPage) =>
          //   fetchPartsOfPartlist(partListNo, newPage, pageSize)
          // }
          // onPageSizeChange={(newPageSize) =>
          //   fetchPartsOfPartlist(partListNo, page, newPageSize)
          // }
          // onRowEditStart={(e) => setBulkUpdateProgress(true)}
          // sortingMode="server"
          // onSortModelChange={(e) => sortPartsTable(e)}
          // filterMode="server"
          // onFilterModelChange={onPartsFilterChange}
          // onRowEditStop={(e) => setBulkUpdateProgress(false)}
          // paginationMode="server"
          // loading={partsLoading}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        /> */}
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                aria-label="lab API tabs example"
                onChange={(e, tabValue) => setTabValue(tabValue)}
                centered
              >
                <Tab label={`REPLACEMENT REPORT`} value="replacementReport" />
                <Tab label={`ITEM DETAILS`} value="itemDetails" />
                <Tab label={`ISSUE`} value="issue" />
                <Tab label={`RETURN`} value="return" />
              </TabList>
            </Box>
            <TabPanel value={tabValue}>
              {tabValue === "replacementReport" && viewReplacementReport()}
              {tabValue === "itemDetails" && viewItemDetails()}
              {tabValue === "issue" && viewIssueDetails()}
              {tabValue === "return" && viewReturnDetails()}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ReplacementModal;
