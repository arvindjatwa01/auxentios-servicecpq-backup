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
import {
  defaultContactData,
  defaultSearchList,
  defaultWarrentyData,
  searchOptions,
} from "./equipmentConstant";
import EquipmentDataTable from "./EquipmentDataTable";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import SearchListMaster from "./SearchListMaster";

const EquipmentMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [reportModalHeader, setReportModalHeader] = useState("");
  const [reportType, setReportType] = useState(null);
  const [contarctData, setContarctData] = useState([...defaultContactData]);
  const [warrentyData, setWarrentyData] = useState([...defaultWarrentyData]);
  const [searchList, setSearchList] = useState([...defaultSearchList]);
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
  const [pageNo, setPageNo] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNo(value);
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
          onClick={() =>
            handleShowReportDetails("Contract Details", "contract")
          }
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
            onClick={() =>
              handleShowReportDetails("Warranty Details", "warranty")
            }
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
            onClick={() => handleShowReportDetails("Failure Report", "failure")}
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
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails("Warranty Report", "erpWarranty")
            }
          />
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
            onClick={() => handleShowReportDetails("Service Report", "service")}
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
          <EditOutlinedIcon
            className="mr-1"
            onClick={() => handleShowReportDetails("Usage Report", "usage")}
          />
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
          <EditOutlinedIcon
            className="mr-1"
            onClick={() => handleShowReportDetails("Usage Report", "usageSmu")}
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  //
  const handleShowReportDetails = (title, reportType) => {
    setShowModal(true);
    setReportModalHeader(title);
    setReportType(reportType);
  };

  // view search list details
  const handleViewDetails = (id) => {
    const _searchList = [...searchList];
    const updatedSearchList = _searchList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setSearchList(updatedSearchList);
  };

  // page 1 content
  const viewDetailsPage_1 = () => {
    return (
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
    );
  };

  // page 2 content
  const viewDetailsPage_2 = () => {
    return (
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
    );
  };

  // page 3 content
  const viewDetailsPage_3 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4 ">Contract Details</h5>
        <EquipmentDataTable
          columns={contractItemColumns}
          data={contarctData}
          title="Contracts"
        />
        <h5 className="font-weight-500 mt-5 ">Warranty Details</h5>
        <EquipmentDataTable
          columns={warrentyItemColumns}
          data={contarctData}
          title="Warranty"
        />
      </>
    );
  };

  // page 4 content
  const viewDetailsPage_4 = () => {
    return (
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
        <EquipmentDataTable
          columns={erpWarrentyItemColumns}
          data={warrentyData}
          title="Warranty"
        />
      </>
    );
  };

  // page 5 content
  const viewDetailsPage_5 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4 ">Service Report</h5>
        <EquipmentDataTable
          columns={serviceItemColumns}
          data={warrentyData}
          title={"Service"}
        />
        <h5 className="font-weight-500 mt-5 ">Failure report </h5>
        <EquipmentDataTable
          columns={failureItemColumns}
          data={warrentyData}
          title={"Failures"}
        />
      </>
    );
  };

  // page 6 content
  const viewDetailsPage_6 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4 ">Usage Details </h5>
        <EquipmentDataTable
          columns={usageItemColumns}
          data={warrentyData}
          title="Usage"
        />
        <EquipmentDataTable
          columns={usageSmuItemColumns}
          data={warrentyData}
          title="Usage"
        />
      </>
    );
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Equipment Master</h5>
          <p className="mb-1 mt-4 font-size-12">Select the search criteria</p>
          <EquipmentSearchMaster falgType="equipment" />
          <div className="row mt-3 mb-5">
            <SearchListMaster
              searchList={searchList}
              viewEquipmentDetails={handleViewDetails}
            />
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
                        hidePrevButton={pageNo === 1 && true}
                        hideNextButton={pageNo === 6 && true}
                        count={6}
                        page={pageNo}
                        onChange={handlePageChange}
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
                {pageNo === 1 && viewDetailsPage_1()}
                {pageNo === 2 && viewDetailsPage_2()}
                {pageNo === 3 && viewDetailsPage_3()}
                {pageNo === 4 && viewDetailsPage_4()}
                {pageNo === 5 && viewDetailsPage_5()}
                {pageNo === 6 && viewDetailsPage_6()}
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

export default EquipmentMaster;
