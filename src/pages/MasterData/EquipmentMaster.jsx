import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Card, Divider, Grid, Stack } from "@mui/material";
import PaginationStackedChart from "./PaginationStackedChart";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EquipmentSearchComponent from "./EquipmentSearchComponent";
import Switch from "@mui/material/Switch";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import EquipmentReportDetails from "./EquipmentReportDetails";

const searchOptions = [
  { value: "A", label: "Serial No" },
  { value: "B", label: "Model" },
  { value: "C", label: "Family" },
  { value: "D", label: "Equipment Id" },
  { value: "E", label: "Manufacturer" },
  { value: "F", label: "Description" },
];

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

const EquipmentMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFailureReport, setIsFailureReport] = useState(false);
  const [bundleItems, setBundleItems] = useState([...tempdata]);
  const [warrentyItems, setWarrentyItems] = useState([...warrentydata]);
  const lifeCycleStatusData = [
    {
      month: "Jan",
      maintenance: 400,
      repair: 240,
      parts: 247,
    },
    {
      month: "Feb",
      maintenance: 300,
      repair: 139,
      parts: 221,
    },
    {
      month: "March",
      maintenance: 200,
      repair: 980,
      parts: 229,
    },
    {
      month: "Apr",
      maintenance: 278,
      repair: 390,
      parts: 200,
    },
    {
      month: "May",
      maintenance: 189,
      repair: 480,
      parts: 218,
    },
    {
      month: "June",
      parts: 250,
      repair: 380,
      maintenance: 239,
    },
  ];
  const searchList = [
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
    {
      A: "ZCT01096",
      B: "CHAIN EXCAVATOR - 336D2 L",
      C: "336D2 L",
      D: "CATERPILLAR",
    },
  ];
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [searchSelector, setSearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      itemType: { label: "", value: "" },
      itemTypeOperator: "",
      selectedKeyValue: "",
    },
  ]);
  const [equipmentmasterpagination, setEquipmentmasterpagination] =
    React.useState(1);
  const equipmentPaginationChange = (event, value) => {
    setEquipmentmasterpagination(value);
  };

  const addMoreSearchCritria = () => {
    const _searchSelector = [...searchSelector];
    _searchSelector.push({
      id: searchSelector.length + 1,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    });
    if (_searchSelector.length <= 2) {
      setSearchSelector(_searchSelector);
    }

    // if (searchSelector.length < 2) {
    //   setSearchSelector([
    //     ...searchSelector,
    //     {
    //       id: searchSelector.length,
    //       selectOperator: "",
    //       selectFamily: "",
    //       inputSearch: "",
    //       selectOptions: [],
    //       selectedOption: "",
    //     },
    //   ]);
    // }
  };

  const removeSearchCritria = () => {
    setSearchSelector([]);
  };

  const handleClickOnSearchedList = (currentItem, id) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  const contractItemColumns = [
    {
      name: (
        <>
          <div>Entitlement #</div>
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
          <div>Entitlement Title</div>
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
          <div>Category</div>
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
          <div>Basis</div>
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
          <div>Amount</div>
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
          <div>Currency</div>
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
          <div>Valid For</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
    },
    {
      name: (
        <>
          <div>Unit</div>
        </>
      ),
      selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      format: (row) => row?.bundleFlag,
    },
    {
      name: (
        <>
          <div>Start Date</div>
        </>
      ),
      selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      format: (row) => row?.bundleFlag,
    },
    {
      name: (
        <>
          <div>End Date</div>
        </>
      ),
      selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      format: (row) => row?.bundleFlag,
    },
    {
      name: (
        <>
          <div>Start Usage</div>
        </>
      ),
      selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      format: (row) => row?.bundleFlag,
    },
    {
      name: (
        <>
          <div>End Usage</div>
        </>
      ),
      selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      format: (row) => row?.bundleFlag,
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
  const warrentyItemColumns = [
    {
      name: (
        <>
          <div>ID</div>
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
          <div>Title</div>
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
          <div>Category</div>
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
          <div>Basis</div>
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
          <div>Unit</div>
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
          <div>Start Date</div>
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
          <div>End Date</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
    },
    {
      name: (
        <>
          <div>Start Usage</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
    },
    {
      name: (
        <>
          <div>End Usage</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
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
            onClick={() => handleShowReportDetails(true)}
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const failureItemColumns = [
    {
      name: (
        <>
          <div>Part #</div>
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
          <div>Sub-Assembly</div>
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
          <div>Warranty</div>
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
          <div>Failure Date</div>
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
          <div>Repair Date</div>
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
          <div>Hours On Part</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
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
            onClick={() => handleShowReportDetails(true)}
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const erpWarrentyItemColumns = [
    {
      name: (
        <>
          <div>Component ID</div>
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
          <div>Description</div>
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
          <div>Serial Number </div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
    },
    {
      name: (
        <>
          <div>Warranty</div>
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
          <div>Warranty Code</div>
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
  const serviceItemColumns = [
    {
      name: (
        <>
          <div>Report#</div>
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
          <div>Job #</div>
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
          <div>Engine Model #</div>
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
          <div>Engine Serial #</div>
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
          <div>Usage</div>
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
          <div>Repair Date</div>
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
          <div>Complaints</div>
        </>
      ),
      selector: (row) => row?.servicePrice,
      wrap: true,
      sortable: true,
      format: (row) => row?.servicePrice,
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
            onClick={() => handleShowReportDetails(false)}
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const usageItemColumns = [
    {
      name: (
        <>
          <div>Current Usage</div>
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
          <div>Average Usage</div>
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
          <div>Last Updated Date</div>
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
          <div>Sensor ID</div>
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
          <div>SMU ID</div>
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
          <div>SMU Type</div>
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
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const usageSmuItemColumns = [
    {
      name: (
        <>
          <div>SMU ID/Sensor ID</div>
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
          <div>SMU Type</div>
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
          <div>Usage ID</div>
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
          <div>Reading Date</div>
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
          <div>Unit</div>
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
          <div>Reading Description</div>
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
          <div>Overwrite/Error</div>
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

  //
  const handleShowReportDetails = (isfailure) => {
    setIsFailureReport(isfailure);
    setShowModal(true);
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Equipment Master</h5>
          <p className="mb-1 mt-4 font-size-12">Select the search criteria</p>
          <div className="w-100 equipment-select br-bl pb-3">
            <div className="d-flex align-items-center w-100 border-radius-10">
              <div className="d-flex justify-content-between align-items-center border-radius-10">
                <div className="row align-items-center m-0">
                  {searchSelector.length > 0 &&
                    searchSelector.map((searchFiled, i) => (
                      <div
                        className={`customselect py-1 d-flex align-items-center mr-3${
                          i > 0 ? " customselect-margin" : ""
                        }`}
                      >
                        {i > 0 && (
                          <Select
                            defaultValue={{ label: "And", value: "AND" }}
                            options={[
                              { label: "And", value: "AND", id: i },
                              { label: "Or", value: "OR", id: i },
                            ]}
                            placeholder="AND/OR"
                            // value={searchFiled.selectOperator}
                          />
                        )}
                        <div>
                          <Select
                            options={searchOptions}
                            placeholder="Search By"
                            // isOptionDisabled={(option) => checkForDisabled(option)}
                          />
                        </div>
                        <div className="customselectsearch pl-2">
                          <SearchIcon className="text-primary" />
                          <input
                            className="custom-input-sleact"
                            type="text"
                            placeholder="Search Equipment"
                            autoComplete="off"
                          />
                          {
                            <ul
                              className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                            >
                              {searchFiled.selectOptions.map(
                                (currentItem, j) => (
                                  <li
                                    className="list-group-item"
                                    key={j}
                                    onClick={() =>
                                      handleClickOnSearchedList(currentItem, i)
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
                    ))}
                  <div
                    className={`d-flex align-items-center mr-3 ${
                      searchSelector.length > 1 ? "add-delete-mt" : ""
                    }`}
                  >
                    <div>
                      <Link
                        className="btn-sm cursor p-0 font-size-16 mr-2 bg-white text-violet"
                        onClick={addMoreSearchCritria}
                      >
                        +
                      </Link>
                    </div>
                    <div>
                      <Link
                        onClick={removeSearchCritria}
                        className="p-1 bg-white cursor"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
                            fill="#872FF7"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.5 2.25C7.08579 2.25 6.75 2.58579 6.75 3V4.5C6.75 4.91421 6.41421 5.25 6 5.25C5.58579 5.25 5.25 4.91421 5.25 4.5V3C5.25 1.75736 6.25736 0.75 7.5 0.75H10.5C11.7426 0.75 12.75 1.75736 12.75 3V4.5C12.75 4.91421 12.4142 5.25 12 5.25C11.5858 5.25 11.25 4.91421 11.25 4.5V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5ZM3.75 3.75C4.16421 3.75 4.5 4.08579 4.5 4.5V15C4.5 15.4142 4.83579 15.75 5.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15V4.5C13.5 4.08579 13.8358 3.75 14.25 3.75C14.6642 3.75 15 4.08579 15 4.5V15C15 16.2426 13.9926 17.25 12.75 17.25H5.25C4.00736 17.25 3 16.2426 3 15V4.5C3 4.08579 3.33579 3.75 3.75 3.75Z"
                            fill="#872FF7"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
                            fill="#872FF7"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
                            fill="#872FF7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <Link
                  to="#"
                  className="btn bg-primary text-white"
                  // onClick={
                  //   props.compoFlag === "bundleSearch"
                  //     ? handleBundleSearch
                  //     : handleQuerySearchClick
                  // }
                >
                  <span className="ml-1">Search</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-5">
            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 border-50">
              <div className="bg-grey border-radius-10 p-3 h-100">
                <div className="equipment-master-ul">
                  <ul>
                    {searchList.map((Data, i) => (
                      <li className={`${i === 0 ? "active" : ""}`}>
                        <div className="row position-relative">
                          <div className="global-serach-arrow">
                            <ArrowForwardIosIcon className="text-primary font-size-20 mb-0 pb-0" />
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                            <img
                              src="../assets/images/spare-parts-sm.png"
                              alt="jcb"
                              className=" img-fluid"
                            />
                          </div>
                          <div className="col-lg-5 col-md-5 col-5">
                            <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                              {Data.A}
                            </h6>
                            <p className="font-size-12 text-light-60 font-weight-500 m-0">
                              {Data.B}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <div className="d-block pr-3">
                              <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                                {Data.C}
                              </h6>
                              <p className="font-size-12 text-light-60 font-weight-500 m-0">
                                {Data.D}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
              <div className="">
                <div className="bg-white p-3 border-radius-10 ">
                  <div className="d-flex align-items-center justify-content-between equipment-pagination">
                    <h5 className="font-weight-600 mb-0">
                      CHAIN EXCAVATOR - 336D2 L
                    </h5>
                    <Stack spacing={2}>
                      <Pagination
                        boundaryCount={0}
                        siblingCount={0}
                        shape="rounded"
                        hidePrevButton={equipmentmasterpagination === 1 && true}
                        hideNextButton={equipmentmasterpagination === 6 && true}
                        count={6}
                        page={equipmentmasterpagination}
                        onChange={equipmentPaginationChange}
                      />
                    </Stack>
                  </div>
                  <div className="d-block mt-3">
                    <h6 className="text-primary font-weight-600">ZCT01096</h6>
                    <p className="text-light-60 font-size-12 mb-0">
                      336D2 L - 2015
                    </p>
                  </div>
                </div>

                {equipmentmasterpagination === 1 && (
                  <>
                    <div className="bg-white p-3 border-radius-10 overflow-hidden">
                      <div className="row align-items-end">
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Manufacturer
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500">
                              Caterpillar
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Model
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500">
                              336D2 L
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <img
                            src="../assets/images/chain-excavator.png"
                            alt="jcb"
                            className=" img-fluid w-100"
                          />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Engine Model
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500">
                              C9 ACERT
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Operating Weight
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500">
                              80648 lb
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Net Flywheel Power
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                      </div>
                    </div>
                    <Grid
                      item
                      md={12}
                      xs={12}
                      container
                      className="mt-3"
                      sx={{ width: "100%" }}
                    >
                      <div
                        className="card equipment-card"
                        // sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
                      >
                        <div className="m-3 d-flex align-items-center justify-content-between">
                          <h5 className="font-weight-600 mb-0 pr-2 text-truncate">
                            Condition of Chain Excavator - 336D2 L
                          </h5>
                          <div className="d-flex align-items-center equipment-master-btn-select">
                            <div className=" mr-2">
                              <Select
                                options={[{ label: "1 Year", value: "a" }]}
                                placeholder="Last 6 months"
                              />
                            </div>
                            <a href="#" className="btn">
                              Update
                            </a>
                          </div>
                        </div>
                        <Divider />
                        <PaginationStackedChart data={lifeCycleStatusData} />
                      </div>
                    </Grid>
                  </>
                )}
                {equipmentmasterpagination === 2 && (
                  <>
                    <h5 className="font-weight-500 mt-4 ">Customer Details</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Customer Id
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Caterpillar
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Customer Name
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            336D2 L
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Contact Person
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Customer Group
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            C9 ACERT
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Customer Segment
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            80648 lb
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Last Owner
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                      </div>
                    </div>
                    <h5 className="font-weight-500 mt-5 ">Site Details</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Fleet number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            20
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Contact Address
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            8501 Willow Avenue, Los Angeles, CA 90037
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Geo codes
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Latitude: 34.051480 Longitude: -117.973470
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Primary Contact
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Olive Serrano
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Moved In/Out
                          </p>
                          <div className="equipment-switch">
                            <Switch {...label} defaultChecked />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Previous Location
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            8501 Willow Avenue, Los Angeles, CA 90037
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            New Location
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            8501 Willow Avenue, Los Angeles, CA 90037
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Moved In Date
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            02/08/2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {equipmentmasterpagination === 3 && (
                  <>
                    <h5 className="font-weight-500 mt-4 ">Contract Details</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">
                              Contracts
                            </h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="Contracts"
                            />
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
                            columns={contractItemColumns}
                            data={bundleItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="font-weight-500 mt-5 ">Warranty Details</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">
                              Warranty
                            </h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="Warranty"
                            />
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
                )}
                {equipmentmasterpagination === 4 && (
                  <>
                    <h5 className="font-weight-500 mt-4 ">ERP Details</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            ERP ID
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Caterpillar
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            ERP Description
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            336D2 L
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Technical Asset Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Fleet Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            C9 ACERT
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Purchase Date
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            80648 lb
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Serial Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Functional Location
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            268 HP
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 border-radius-10 mt-5 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">
                              Warranty
                            </h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="Warranty"
                            />
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
                            columns={erpWarrentyItemColumns}
                            data={warrentyItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {equipmentmasterpagination === 5 && (
                  <>
                    <h5 className="font-weight-500 mt-4 ">Service Report</h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">
                              Service
                            </h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="reports"
                            />
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
                            columns={serviceItemColumns}
                            data={warrentyItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="font-weight-500 mt-5 ">Failure report </h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">
                              Failures
                            </h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="reports"
                            />
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
                            columns={failureItemColumns}
                            data={warrentyItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {equipmentmasterpagination === 6 && (
                  <>
                    <h5 className="font-weight-500 mt-4 ">Usage Details </h5>
                    <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">Usage</h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="details"
                            />
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
                            columns={usageItemColumns}
                            data={warrentyItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 border-radius-10 mt-4 mb-4">
                      <div className="row align-items-center">
                        <div className="col-lg-9 col-md-9">
                          <div className="d-flex align-items-center">
                            <h6 className="font-weight-500 mb-0 mr-3">Usage</h6>
                            <EquipmentSearchComponent
                              searchOptions={searchOptions}
                              searchPlaceholder="details"
                            />
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
                            columns={usageSmuItemColumns}
                            data={warrentyItems}
                            customStyles={customStyles}
                            // pagination
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EquipmentReportDetails
          show={showModal}
          hideModel={() => setShowModal(false)}
          isFailureReport={isFailureReport}
        />
      )}
    </>
  );
};

export default EquipmentMaster;
