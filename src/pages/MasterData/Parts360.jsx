import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EquipmentSearchComponent from "./EquipmentSearchComponent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";
import $ from "jquery";
import EquipmentDataTable from "./EquipmentDataTable";
import EquipmentReportDetails from "./EquipmentReportDetails";
import SearchListMaster from "./SearchListMaster";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import { partsSearch } from "./equipmentConstant";

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
const dummySearchList = [
  {
    id: 1,
    A: "5365377",
    B: "HOSE AS.",
    C: "3620656",
    D: "CATERPILLAR",
    active: true,
  },
  {
    id: 2,
    A: "1L1118",
    B: "FITTING",
    C: "3620656",
    D: "Description",
    active: false,
  },
  {
    id: 3,
    A: "0R6158",
    B: "Full Core Deposit",
    C: "992K",
    D: "Description",
    active: false,
  },
  {
    id: 4,
    A: "3J0634",
    B: "SEAL",
    C: "3620656",
    D: "Description",
    active: false,
  },
  {
    id: 5,
    A: "F198300020130",
    B: "PRESSURE WASHER",
    C: "3620656",
    D: "Description",
    active: false,
  },
];

const Parts360 = () => {
  const [bundleItems, setBundleItems] = useState([...tempdata]);
  const [reportModalHeader, setReportModalHeader] = useState("");
  const [reportType, setReportType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [warrentyItems, setWarrentyItems] = useState([...warrentydata]);
  const [searchList, setSearchList] = useState([...dummySearchList]);
  const [value, setValue] = React.useState("1");

  const [pageNo, setPageNo] = useState(1);

  // handle Page change
  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const replpacedItemColumns = [
    {
      name: (
        <>
          <div>Replaced By</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Replaced Quantity</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Availability</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Total Available</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Sales Unit</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      // selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      // format: (row) => row?.bundleFlag,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails("Replaced By", "replacedByDetails")
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const alternateItemColumns = [
    {
      name: (
        <>
          <div>Alternate Part #</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Quantity</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Availability</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Total Available</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Sales Unit</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() => handleShowReportDetails("Alternate Parts", "alternateDetails")}
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const remanItemColumns = [
    {
      name: (
        <>
          <div>Reman Part #</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Refurbished Part #</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Availability</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Total Available</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Sales Unit</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails("Reman or Refurb Options", "remanDetails")
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const priceItemColumns = [
    {
      name: (
        <>
          <div>Group#</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Type</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Part #</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Sales Unit</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Quantity</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Valid From</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Valid To</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const erpDetailsItemColumns = [
    {
      name: (
        <>
          <div>ERP Condition</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>ERP Amount</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>ERP Cost Price</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>ERP Margin</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Last Priced Date </div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Price Change Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
  ];
  const warrentyItemColumns = [
    {
      name: (
        <>
          <div>Warranty Type</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Warranty Duration</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Date Of Sale</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Date Of Installation</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      // selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      // format: (row) => row?.bundleFlag,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#872ff7",
        color: "#fff",
        borderRight: "1px solid rgba(0,0,0,.12)",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        borderRight: "1px solid rgba(0,0,0,.12)",
      },
    },
  };

  const handleViewDetails = (id) => {
    const _searchList = [...searchList];
    const updatedSearchList = _searchList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setSearchList(updatedSearchList);
  };

  //
  const handleShowReportDetails = (title, reportType) => {
    setShowModal(true);
    setReportModalHeader(title);
    setReportType(reportType);
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
                  Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Full Core Deposit
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Reman
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
                  Manufacturer
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Caterpillar
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Model
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  336D2 L
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Group Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                3620656
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Parts Group
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  REMAN
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  BEC Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  1PB
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                BEC Code Description
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                CALEFACTOR CCC
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Serial Number (If Any)
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  ZCT01096
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Status
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Active
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
                Material Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Material Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Old Material Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Average Cost
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 90534
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Availability
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Stock
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Total Number Available
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                10
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Status
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
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
        <h5 className="font-weight-500 mt-4 ">Substitute Details</h5>
        <div className="d-flex align-items-center">
          <h6 className="m-0 mr-2 font-weight-600">Replaced By</h6>
          <div className="equipment-switch">
            <Switch {...label} defaultChecked size="small" />
          </div>
        </div>
        <EquipmentDataTable
          columns={replpacedItemColumns}
          data={bundleItems}
          title="Replaced by"
        />
        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Alternate Parts</h6>
          <div className="equipment-switch">
            <Switch {...label} defaultChecked size="small" />
          </div>
        </div>
        <EquipmentDataTable
          columns={alternateItemColumns}
          data={bundleItems}
          title="Alternate Parts"
        />
        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Reman or Refurb Option</h6>
          <div className="equipment-switch">
            <Switch {...label} defaultChecked size="small" />
          </div>
        </div>
        <EquipmentDataTable
          columns={remanItemColumns}
          data={bundleItems}
          title="Reman or Refurb Option"
        />
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
            <div className="bg-white p-3 border-radius-10 mt-4 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
                <a href="#" className="btn bg-primary text-white">
                  Add New
                </a>
              </div>
              <div className="table-responsive mt-3">
                <div
                  className="custom-table  table-child"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <DataTable
                    title=""
                    columns={priceItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    // pagination
                  />
                </div>
              </div>
            </div>
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
            <div className="bg-white p-3 mt-3 border-radius-10 mb-5 overflow-hidden">
              <h6 className="font-weight-600 mb-0 mr-3">ERP Price</h6>
              <div className="table-responsive mt-3">
                <div
                  className="custom-table  table-child"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <DataTable
                    title=""
                    columns={erpDetailsItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    // pagination
                  />
                </div>
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
            <div className="bg-white p-3 border-radius-10 mt-4 overflow-hidden">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
                <a href="#" className="btn bg-primary text-white">
                  Add New
                </a>
              </div>
              <div className="table-responsive mt-3">
                <div
                  className="custom-table  table-child"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <DataTable
                    title=""
                    columns={priceItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    // pagination
                  />
                </div>
              </div>
            </div>
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
            <div className="bg-white p-3 mt-3 border-radius-10 mb-5 overflow-hidden">
              <h6 className="font-weight-600 mb-0 mr-3">ERP Price</h6>
              <div className="table-responsive mt-3">
                <div
                  className="custom-table  table-child"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <DataTable
                    title=""
                    columns={erpDetailsItemColumns}
                    data={bundleItems}
                    customStyles={customStyles}
                    // pagination
                  />
                </div>
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
        <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="font-weight-600 mb-0 mr-3">Warranty Details</h6>
            <a href="#" className="btn bg-primary text-white">
              Add New
            </a>
          </div>
          <div className="table-responsive mt-3">
            <div
              className="custom-table  table-child"
              style={{
                height: "auto",
                width: "100%",
              }}
            >
              <DataTable
                title=""
                columns={warrentyItemColumns}
                data={warrentyItems}
                customStyles={customStyles}
                // pagination
              />
            </div>
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
          <EquipmentSearchMaster falgType="parts" />
          <div className="row mt-3">
            <SearchListMaster
              searchList={searchList}
              viewEquipmentDetails={handleViewDetails}
            />
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
              <div className="">
                <div className="bg-white p-3 border-radius-10 ">
                  <div className="d-flex align-items-center justify-content-between equipment-pagination">
                    <h5 className="font-weight-600 mb-0">Full Core Deposit</h5>
                    <Stack spacing={2}>
                      <Pagination
                        boundaryCount={0}
                        siblingCount={0}
                        shape="rounded"
                        hidePrevButton={pageNo === 1 && true}
                        hideNextButton={pageNo === 4 && true}
                        count={4}
                        page={pageNo}
                        onChange={handlePageChange}
                      />
                    </Stack>
                  </div>
                  <div className="d-block mt-3">
                    <h6 className="text-primary font-weight-600">0R6158</h6>
                    <p className="text-light-60 font-size-12 mb-0">
                      992K - 2015
                    </p>
                  </div>
                </div>
                {pageNo === 1 && viewDetailsPage_1()}
                {pageNo === 2 && viewDetailsPage_2()}
                {pageNo === 3 && viewDetailsPage_3()}
                {pageNo === 4 && viewDetailsPage_4()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EquipmentReportDetails
          show={showModal}
          hideModel={() => setShowModal(false)}
          header={reportModalHeader}
          reportType={reportType}
        />
      )}
    </>
  );
};

export default Parts360;
