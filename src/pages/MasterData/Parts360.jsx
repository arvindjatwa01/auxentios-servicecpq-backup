import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import { PaginationItem, Stack, Tooltip } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";

import Select from "react-select";

import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Get_Spare_Parts_Datails_By_Id_GET } from "services/CONSTANTS";

import EquipmentDataTable from "./EquipmentDataTable";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import WithoutSearchDataTable from "./WithoutSearchDataTable";
import {
  SEARCH_FLAG_PARTS,
  SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
  SPARE_PARTS_PRICE_DETAILS,
  SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
  SPARE_PARTS_REPLACED_BY_DETAILS,
  SPARE_PARTS_WARRENTY_DETAILS,
} from "./equipmentMasterConstants";
import PartsMasterSearchList from "./SparePartsMaster/PartsMasterSearchList";
import LoadingProgress from "pages/Repair/components/Loader";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import PartsReportDetails from "./SparePartsMaster/PartsReportDetails";
import { GRID_STYLE } from "pages/Common/constants";
import SearchBox from "pages/Common/SearchBox";
import EquipmentSearchComponent from "./EquipmentSearchComponent";


const label = { inputProps: { "aria-label": "Switch demo" } };

const tempdata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
    bundleFlag: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
    bundleFlag: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
    bundleFlag: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
    bundleFlag: "5879.24",
  },
];
const warrentydata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
  },
];
const partsPriceData = {
  groupNumber: "3620566",
  type: "reman",
  partNumber: "OR6158",
  salesUnit: "PC",
  quantity: "1.00",
  price: "498.00",
  currency: "USD",
  validFrom: "44481",
  validTo: "45291",
}
const Parts360 = () => {
  const [bundleItems, setBundleItems] = useState([
    {
      replacedBy: "OR6159",
      quantity: "2.00",
      availability: "Not available",
      totalAvailability: "0",
      salesUnit: "PC",
      price: "0",
      id: 1

    },
  ]);

  const [dummyalternateRefurb, setDummyalternateRefurb] = useState([
    {
      itemName: "OR6159",
      quantity: "2.00",
      itemDescription: "Not available",
      itemHeaderStrategy: "N/A",
      taskType: "PC",
      recommendedValue: "36",
      id: 1
    },
  ]);


  const [partsPriceDetails, setPartsPriceDetails] = useState({ ...partsPriceData });
  const [partsERPPriceDetails, setPartsERPPriceDetails] = useState([
    {
      erpCondition: "C12345",
      amount: "498",
      costPrice: "335",
      margin: "890",
      lastPricedDate: "12-10-2021",
      priceChangeDate: "12-10-2021",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modelHeaderTitle, setModelHeaderTitle] = useState("");
  const [modelContentReportType, setModelContentReportType] = useState("");
  const [modelContentReportObj, setModelContentReportObj] = useState(null);

  const [warrentyItems, setWarrentyItems] = useState([
    {
      warrantyType: "Parts",
      warrentyDuration: "6 Months",
      dateOfSale: "12-11-2022",
      dateOfInstallation: "N/A",
      id: "1"
    },
  ]);
  const [searchList, setSearchList] = useState([]);

  const [selectedPartsId, setSelectedPartsId] = useState(null);
  const [selectedPartsDetails, setSelectedPartsDetails] = useState(null);
  const [value, setValue] = React.useState("1");

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showReplacedBy, setShowReplacedBy] = useState(true);
  const [showAlternateParts, setShowAlternateParts] = useState(true);
  const [showRefurbOption, setShowRefurbOptions] = useState(true);

  useEffect(() => {
    if (!showModal) {
      setModelHeaderTitle("");
      setModelContentReportType("");
      setModelContentReportObj(null);
    }
  }, [showModal]);

  useEffect(()=>{
    setSelectedPartsId(null);
  },[searchList])

  //pagination code
  const [displayedPages, setDisplayedPages] = useState([1, 2, 3]);
  const totalPage = 4;
  // const[totalPage,setTotalPage]= useState(4);
  useEffect(() => {
    const calculateDisplayedPages = () => {
      if (pageNo === 1) {
        setDisplayedPages([1, 2, 3]);
      } else if (pageNo === totalPage) {
        setDisplayedPages([totalPage - 2, totalPage - 1,totalPage ]);
      } else {
        setDisplayedPages([pageNo - 1,pageNo, pageNo + 1]);
      }
    };

    calculateDisplayedPages();
  }, [pageNo, totalPage]);

  // handle Page change
  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowReplaceBy = () => {
    setShowReplacedBy(!showReplacedBy);
  }

  const handleShowAlternateParts = () => {
    setShowAlternateParts(!showAlternateParts);
  }


  const handleShowRefurbOptions = () => {
    setShowRefurbOptions(!showRefurbOption);
  }


  //updatedreplpacedItemColumns
  const replacedItemColumns = [
    {
      field: "replacedBy",
      headerName: "Replaced By",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Replaced Quantity",
      flex: 1,
    },
    {
      field: "availability",
      headerName: "Availability",
      flex: 1,
    },
    {
      field: "totalAvailability",
      headerName: "Total Available",
      flex: 1,
    },
    {
      field: "salesUnit",
      headerName: "Sales Unit",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails("Replaced By",
                  SPARE_PARTS_REPLACED_BY_DETAILS,
                  params.row)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
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

  //updated  alternate parts columns
  const alternateItemColumns = [
    {
      field: "itemName",
      headerName: "Alternte Part #",
      flex: 1,
    },
    {
      field: "itemDescription",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "itemHeaderStrategy",
      headerName: "Availability",
      flex: 1,
    },
    {
      field: "taskType",
      headerName: "Total Available",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Sales Unit",
      flex: 1,
    },
    {
      field: "recommendedValue",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails(
                  "Alternate Parts",
                  SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
                  params.row
                )}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
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

// updatedremanItemColumns

  const remanItemColumns = [
    {
      field: "itemName",
      headerName: "Alternte Part #",
      flex: 1,
    },
    {
      field: "itemDescription",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "itemHeaderStrategy",
      headerName: "Availability",
      flex: 1,
    },
    {
      field: "taskType",
      headerName: "Total Available",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Sales Unit",
      flex: 1,
    },
    {
      field: "recommendedValue",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() =>
                  handleShowReportDetails(
                    "Reman or Refurb Options",
                    SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
                    params.row
                  )}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
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

  //Price itemColumns

  const priceItemColumns = [
    {
      field: "groupNumber",
      headerName: "Group#",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "partNumber",
      headerName: "Part#",
      flex: 1,
    },
    {
      field: "salesUnit",
      headerName: "Sales Unit",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "validFrom",
      headerName: "Valid From",
      flex: 1,
    },
    {
      field: "validTo",
      headerName: "Valid To",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails("Price Details",
                  SPARE_PARTS_PRICE_DETAILS,
                  params.row)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
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

  //new erp Details column

  const erpDetailsItemColumns = [
    {
      field: "erpCondition",
      headerName: "ERP Condition",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "ERP Amount",
      flex: 1,
    },
    {
      field: "costPrice",
      headerName: "ERP Cost Price",
      flex: 1,
    },
    {
      field: "margin",
      headerName: "ERP Margin",
      flex: 1,
    },
    {
      field: "lastPricedDate",
      headerName: "Last Priced Date",
      flex: 1,
    },
    {
      field: "priceChangeDate",
      headerName: "Price Change Date",
      flex: 1,
    },
  ];


  // parts warrenty columns
  // const warrentyItemColumns = [
  //   {
  //     name: <div>Warranty Type</div>,
  //     selector: (row) => row.warrantyType,
  //     wrap: true,
  //     sortable: false,
  //   },
  //   {
  //     name: <div>Warranty Duration</div>,
  //     selector: (row) => row.warrentyDuration,
  //     wrap: true,
  //     sortable: false,
  //   },
  //   {
  //     name: <div>Date Of Sale</div>,
  //     selector: (row) => row?.dateOfSale,
  //     wrap: true,
  //     sortable: false,
  //   },
  //   {
  //     name: <div>Date Of Installation</div>,
  //     selector: (row) => row?.dateOfInstallation,
  //     wrap: true,
  //     sortable: false,
  //   },
  //   {
  //     name: <div>Actions</div>,
  //     wrap: true,
  //     sortable: false,
  //     cell: (row) => (
  //       <div
  //         className="d-flex justify-content-center align-items-center row-svg-div"
  //         style={{ minWidth: "180px !important" }}
  //       >
  //         <EditOutlinedIcon
  //           className="mr-1"
  //           onClick={() =>
  //             handleShowReportDetails(
  //               "Warranty Details",
  //               SPARE_PARTS_WARRENTY_DETAILS,
  //               row
  //             )
  //           }
  //         />
  //         <DeleteOutlineOutlinedIcon />
  //       </div>
  //     ),
  //   },
  // ];

  const warrentyItemColumns = [
    {
      field: "warrantyType",
      headerName: "Warranty Type",
      flex: 1,
    },
    {
      field: "warrentyDuration",
      headerName: "Warranty Duration",
      //   width: 90,
      flex: 1,
    },
    {
      field: "dateOfSale",
      headerName: "Date of Sale",
      //   width: 90,
      flex: 1,
    },
    {
      field: "dateOfInstallation",
      headerName: "Date of Installation",
      flex: 1
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails("Warranty Details",
                  SPARE_PARTS_WARRENTY_DETAILS,
                  params.row)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
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
  ]
  // view select search parts details
  const handleViewDetails = (id) => {

    setLoading(true);
    setPageNo(1);
    const rUrl = Get_Spare_Parts_Datails_By_Id_GET + id;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSelectedPartsId(id);
          setSelectedPartsDetails(responseData);
          setPartsPriceDetails(prevState => ({
            ...prevState,
            groupNumber: responseData.groupNumber,
            type: responseData.partType,
            price: responseData.listPrice,
            salesUnit: responseData.salesUnit,
            currency: responseData.currency,
            partNumber: responseData.partNumber
          }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );

  };


  // view the detais for data table row
  const handleShowReportDetails = (title, reportType, row) => {
    setModelHeaderTitle(title);
    setModelContentReportType(reportType);
    setModelContentReportObj(row);
    setShowModal(true);
  };

  // Parts page 1 details
  const viewDetailsPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  DESCRIPTION
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {/* {isEmpty(selectedPartsDetails.description)
                    ? "NA"
                    : selectedPartsDetails.description} */}
                  {selectedPartsDetails.partDescription + " " + selectedPartsDetails.modelGroupDescription}
                  {/* caterpillar turbocharger p/n OR-6158 T6 A/R 1.23 cat TL8118 */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  TYPE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.partType)
                    ? "NA"
                    : selectedPartsDetails.partType}
                  {/* Reman */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <img
                src="../assets/images/spare-parts.png"
                alt="spare-parts"
                className="width-75 img-fluid"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  MANUFACTURER
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.manufacturer)
                    ? "NA"
                    : selectedPartsDetails.manufacturer}
                  {/* Caterpillar */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  MODEL
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.model)
                    ? "NA"
                    : selectedPartsDetails.model}
                  {/* All models */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                GROUP NUMBER
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedPartsDetails.groupNumber)
                  ? "NA"
                  : selectedPartsDetails.groupNumber}
                {/* 3620566 */}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  PARTS GROUP
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.partsGroup)
                    ? "NA"
                    : selectedPartsDetails.partsGroup}
                  {/* Turbocharger */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  BEC CODE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.becCode)
                    ? "NA"
                    : selectedPartsDetails.becCode}
                  {/* NA */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                BEC CODE DESCRIPTION
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedPartsDetails.becCodeDescription)
                  ? "NA"
                  : selectedPartsDetails.becCodeDescription}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  SERIAL NUMBER (IF ANY)
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.serialNo)
                    ? "NA"
                    : selectedPartsDetails.serialNo}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  STATUS
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.status)
                    ? "NA"
                    : selectedPartsDetails.status}
                  {/* Active */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                MATERIAL GROUP
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.materialGroup)
                  ? "NA"
                  : selectedPartsDetails.materialGroup} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                MATERIAL NUMBER
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.erpMaterialNumber)
                  ? "NA"
                  : selectedPartsDetails.erpMaterialNumber} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                OLD MATERIAL NUMBER
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.oldMaterialNumber)
                  ? "NA"
                  : selectedPartsDetails.manufacturer} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                AVERAGE COST
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.costPrice)
                  ? 0
                  : selectedPartsDetails.costPrice} */}
                $ 90534
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                AVAILABILITY
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.availability)
                  ? "NA"
                  : selectedPartsDetails.availability} */}
                Stock
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                TOTAL NUMBER AVAILABLE
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.totalAvailability)
                  ? "NA"
                  : selectedPartsDetails.totalAvailability} */}
                10
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                STATUS
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.status)
                  ? "NA"
                  : selectedPartsDetails.status} */}
                Active
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Parts page 2 details
  const viewDetailsPage_2 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4">Substitute Details</h5>

        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Replaced By</h6>
          {/* <div className="equipment-switch">
            <Switch {...label} checked={showReplacedBy} onChange={handleShowReplaceBy} size="small" />
          </div> */}
          <Switch {...label} checked={showReplacedBy} onChange={handleShowReplaceBy} size="small" />

        
        </div>

        {showReplacedBy && <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="row align-items-center mb-3">
            <div className="col-lg-9 col-md-9">
              <div className="d-flex align-items-center">
                <h6 className="font-weight-500 mb-0 mr-3">Replaced By</h6>
                <EquipmentSearchComponent searchPlaceholder={"Replaced By"}/>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 text-right">
              <a href="#" className="btn bg-primary text-white">
                <span className="mr-1">
                  <AddIcon />
                </span>
                Upload
              </a>
            </div>
          </div>
          <div style={{ height: 180, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={bundleItems} columns={replacedItemColumns} getRowId={(row) => row.id} pageSize={5} />
          </div>
        </div>}

        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Alternate Parts</h6>
          {/* <div className="equipment-switch">
            <Switch {...label} checked={showAlternateParts} onChange={handleShowAlternateParts} size="small" />
          </div> */}
            <Switch {...label} checked={showAlternateParts} onChange={handleShowAlternateParts} size="small" />

        </div>
       
       {showAlternateParts && <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="row align-items-center mb-3">
            <div className="col-lg-9 col-md-9">
              <div className="d-flex align-items-center">
                <h6 className="font-weight-500 mb-0 mr-3">Alternate Parts</h6>
                <EquipmentSearchComponent searchPlaceholder={"Alternate Parts"}/>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 text-right">
              <a href="#" className="btn bg-primary text-white">
                <span className="mr-1">
                  <AddIcon />
                </span>
                Upload
              </a>
            </div>
          </div>
          <div style={{ height: 180, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={dummyalternateRefurb} columns={alternateItemColumns} getRowId={(row) => row.id} pageSize={5} />
          </div>
        </div>}

        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Reman or Refurb Option</h6>
          {/* <div className="equipment-switch">
            <Switch {...label} checked={showRefurbOption} onChange={handleShowRefurbOptions} size="small" />
          </div> */}
            <Switch {...label} checked={showRefurbOption} onChange={handleShowRefurbOptions} size="small" />

        </div>
       

      {showRefurbOption &&  <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="row align-items-center mb-3">
            <div className="col-lg-9 col-md-9">
              <div className="d-flex align-items-center">
                <h6 className="font-weight-500 mb-0 mr-3">Reman or Refurb Option</h6>
                <EquipmentSearchComponent searchPlaceholder={"Reman or Refurb Options"} />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 text-right">
              <a href="#" className="btn bg-primary text-white">
                <span className="mr-1">
                  <AddIcon />
                </span>
                Upload
              </a>
            </div>
          </div>
          <div style={{ height: 180, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={dummyalternateRefurb} columns={remanItemColumns} getRowId={(row) => row.id} pageSize={5} />
          </div>
        </div>}
      </>
    );
  };

  // Parts page 3 details
  const viewDetailsPage_3 = () => {
    return (
      <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Price" value="1" />
              <Tab label="Discount" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" className="px-0">
            <div className="bg-white p-3 border-radius-10">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Select a combination
                    </label>
                    <Select
                      className="text-primary"
                      // value={generalComponentData.customerSegment}
                      // options={customerSegmentKeyValue}
                      placeholder="Customer Segment"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Enter respective values
                    </label>
                    <input
                      className="form-control border-light-blue text-primary border-radius-10"
                      placeholder="Marine"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Select Price Method
                    </label>
                    <input
                      className="form-control border-light-blue border-radius-10 text-primary"
                      placeholder="List Price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
                <a className="btn cursor bg-primary text-white">Add New</a>
              </div>
              <div style={{ height: 180, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={[partsPriceDetails]} columns={priceItemColumns} getRowId={(row) => row.partNumber} pageSize={5} />
              </div>
            </div>
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
            <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="font-weight-600 mb-0 mr-3">ERP Details</h6>
                <a className="btn cursor bg-primary text-white">Add New</a>
              </div>
              <div style={{ height: 180, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={partsERPPriceDetails} columns={erpDetailsItemColumns} getRowId={(row) => row.erpCondition} pageSize={5} />
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2" className="px-0">
            <div className="bg-white p-3 border-radius-10">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Select a combination
                    </label>
                    <Select
                      className="text-primary"
                      // value={generalComponentData.customerSegment}
                      // options={customerSegmentKeyValue}
                      placeholder="Customer Segment"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Enter respective values
                    </label>
                    <input
                      className="form-control border-light-blue text-primary border-radius-10"
                      placeholder="Marine"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Select Price Method
                    </label>
                    <input
                      className="form-control border-light-blue border-radius-10 text-primary"
                      placeholder="List Price"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
                <a className="btn cursor bg-primary text-white">Add New</a>
              </div>
              <div style={{ height: 180, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={[partsPriceDetails]} columns={priceItemColumns} getRowId={(row) => row.partNumber} pageSize={5} />
              </div>
            </div>
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>

            <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="font-weight-600 mb-0 mr-3">ERP Details</h6>
                <a className="btn cursor bg-primary text-white">Add New</a>
              </div>
              <div style={{ height: 180, width: '100%' }}>
                <DataGrid sx={GRID_STYLE} rows={partsERPPriceDetails} columns={erpDetailsItemColumns} getRowId={(row) => row.erpCondition} pageSize={5} />
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    );
  };

  // Parts page 4 details
  const viewDetailsPage_4 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-5 ">Warranty</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="font-weight-600 mb-0 mr-3">Warranty Details</h6>
            <a className="btn cursor bg-primary text-white">Add New</a>
          </div>
          <div style={{ height: 180, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={warrentyItems} columns={warrentyItemColumns} getRowId={(row) => row.id} pageSize={5} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Parts 360</h5>
          <p className="mb-1 mt-4 font-size-12">
            Select the search criteria for equipment
          </p>
          <EquipmentSearchMaster
            falgType="parts"
            searchFlag={SEARCH_FLAG_PARTS}
            setSearchList={setSearchList}
          />
          <div className="row mt-3">
            {searchList.length !== 0 && (
              <PartsMasterSearchList
                partsSearchList={searchList}
                selectedPartsId={selectedPartsId}
                handleViewDetails={handleViewDetails}
              />
            )}
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
              {loading ? (
                <LoadingProgress />
              ) : (
                <>
                  {selectedPartsId && (
                    <div className="">
                      <div className="bg-white p-3 border-radius-10 ">
                        <div className="d-flex align-items-center justify-content-between equipment-pagination">
                          <h5 className="font-weight-600 mb-0">
                            {!isEmpty(selectedPartsDetails.partDescription) &&
                              selectedPartsDetails.partDescription}
                            {/* Turbocharger Catridge - Reman */}
                          </h5>
                          <Stack spacing={2}>
                            <Pagination
                              count={totalPage}
                              page={pageNo}
                              onChange={handlePageChange}
                              shape="rounded"
                              renderItem={(item) => (
                                displayedPages.includes(item.page) &&
                                <PaginationItem
                                  {...item}
                                  // style={{ display: displayedPages.includes(item.page) ? 'block' : 'none' }}
                                />
                              )}
                            />
                            {/* <Pagination
                              boundaryCount={0}
                              siblingCount={0}
                              shape="rounded"
                              hidePrevButton={pageNo === 1 && true}
                              hideNextButton={pageNo === 4 && true}
                              count={4}
                              page={pageNo}
                              onChange={handlePageChange}
                            /> */}
                          </Stack>
                        </div>
                        <div className="d-block mt-3">
                          <h6 className="text-primary font-weight-600">
                            {!isEmpty(selectedPartsDetails.partNumber) &&
                              selectedPartsDetails.partNumber}
                            {/* OR6158 */}
                          </h6>
                          <p className="text-light-60 font-size-12 mb-0">
                            {!isEmpty(selectedPartsDetails.model) &&
                              selectedPartsDetails.model}
                          </p>
                        </div>
                      </div>
                      {pageNo === 1 && viewDetailsPage_1()}
                      {pageNo === 2 && viewDetailsPage_2()}
                      {pageNo === 3 && viewDetailsPage_3()}
                      {pageNo === 4 && viewDetailsPage_4()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {showModal && (
        <EquipmentReportDetails
          show={showModal}
          hideModel={() => setShowModal(false)}
          header={reportModalHeader}
          reportType={reportType}
        />
      )} */}

      {showModal && (
        <PartsReportDetails
          show={showModal}
          hideModal={() => setShowModal(false)}
          headerTitle={modelHeaderTitle}
          contentReportType={modelContentReportType}
          contetntReportObj={modelContentReportObj}
        />
      )}
    </>
  );
};

export default Parts360;
