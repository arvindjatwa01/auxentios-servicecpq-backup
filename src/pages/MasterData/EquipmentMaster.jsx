import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import { Divider, Grid, Stack } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Switch from "@mui/material/Switch";

import Select from "react-select";
import $ from "jquery";

import { callGetApi } from "services/ApiCaller";
import { Get_Equipment_Datails_By_Id_GET } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

import PaginationStackedChart from "./PaginationStackedChart";
import EquipmentReportDetails from "./EquipmentReportDetails";
import { defaultContactData, defaultWarrentyData } from "./equipmentConstant";
import EquipmentDataTable from "./EquipmentDataTable";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import {
  EQUIPMENT_CONTRACT_DETAILS,
  EQUIPMENT_ERP_WARRENTY_REPORT_DETAILS,
  EQUIPMENT_FAILURE_REPORT_DETAILS,
  EQUIPMENT_SERVICE_REPORT_DETAILS,
  EQUIPMENT_USAGE_SMU_REPORT_DETAILS,
  EQUIPMENT_WARRENTY_DETAILS,
  EQUIPMNT_USAGE_REPORT_DETAILS,
  SEARCH_FALG_EQUIPMENT,
  Switch_label_Object,
} from "./equipmentMasterConstants";
import EquipmentMasterSearchList from "./EquipmentMaster/EquipmentMasterSearchList";
import LoadingProgress from "pages/Repair/components/Loader";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import EquipmentReportDetail from "./EquipmentMaster/EquipmentReportDetail";

const EquipmentMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [modelHeaderTitle, setModelHeaderTitle] = useState("");
  const [modelContentReportType, setModelContentReportType] = useState("");
  const [modelContentReportObj, setModelContentReportObj] = useState(null);
  const [contarctData, setContarctData] = useState([...defaultContactData]);
  const [warrentyData, setWarrentyData] = useState([...defaultWarrentyData]);
  const [searchList, setSearchList] = useState([]);

  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [selectEquipmentDetails, setSelectEquipmentDetails] = useState(null);

  const [contractRecordsList, setContractRecordsList] = useState([
    {
      entitlementId: "CSA-PM-2000",
      title: "CSA Premium Support",
      category: "Event Based",
      basis: "Time based",
      amount: "12800",
      currency: "USD",
      validFor: "2000",
      unitOfMeasure: "Hours",
      startDate: "12.08.2022",
      endDate: "12.08.2023",
      startUsage: "3245",
      endUsage: "5245",
    },
  ]);
  const [warrantyDetailsList, setWarrantyDetailsList] = useState([]);
  const [serviceReportList, setServiceReportList] = useState([
    {
      reportNumber: "RKJ221031",
      jobNumber: "WO90786",
      engineModelNumber: "C9 ACERT",
      engineSerialNumber: "25461036",
      usage: "3185",
      repairDate: "44865",
      complaint: "SR6541",
    },
  ]);
  const [failureReportList, setFailureReportList] = useState([
    {
      partNumber: "772471Ajx",
      quantity: "",
      subAssembly: "Hydraulic System",
      warranty: "No",
      failureDate: "44855",
      repairDate: "44858",
      hoursOnPart: "2103",
      correction: "Lifting problem",
    },
  ]);
  const [usageDetailsList, setUsageDetailsList] = useState([
    {
      currentUsage: "6500",
      averageUsage: "240 / Month",
      updatedAt: "",
      sensorId: "NA",
      smuId: "1270",
      smuType: "Hours",
    },
  ]);
  const [dailyUsageDetails, setDailyUsageDetails] = useState([
    {
      smuId: "1270",
      smuType: "Hours",
      usageId: "11009",
      readingDate: "45220",
      unitOfMeasure: "Hours",
      readingDescription: "Ok",
      overWritenError: "",
    },
  ]);
  const [pageNo, setPageNo] = useState(1);

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

  useEffect(() => {
    if (!showModal) {
      setModelHeaderTitle("");
      setModelContentReportType("");
      setModelContentReportObj(null);
    }
  }, [showModal]);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  const [loading, setLoading] = useState(false);

  // Contrect detauls columns
  const contractDetailsColumns = [
    {
      id: "contarctEntitlementId",
      name: <div>Entitlement #</div>,
      selector: (row) => row.entitlementId,
      wrap: true,
      sortable: false,
    },
    {
      id: "contractEntitlementTitle",
      name: <div>Entitlement Title</div>,
      selector: (row) => row.title || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contratcCategory",
      name: <div>Category</div>,
      selector: (row) => row?.category || "NA",
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      id: "contractBasis",
      name: <div>Basis</div>,
      selector: (row) => row?.basis || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contartcAmount",
      name: <div>Amount</div>,
      selector: (row) => row?.amount || 0,
      wrap: true,
      sortable: false,
    },
    {
      id: "contractCurrency",
      name: <div>Currency</div>,
      selector: (row) => row?.currency || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contractValidFor",
      name: <div>Valid For</div>,
      selector: (row) => row?.validFor || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contractUnit",
      name: <div>Unit</div>,
      selector: (row) => row?.unitOfMeasure || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contractStartDate",
      name: <div>Start Date</div>,
      selector: (row) => row?.startDate || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contratcEndDate",
      name: <div>End Date</div>,
      selector: (row) => row?.endDate || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contractStartDate",
      name: <div>Start Usage</div>,
      selector: (row) => row?.startUsage || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "contractEndUsage",
      name: <div>End Usage</div>,
      selector: (row) => row?.endUsage,
      wrap: true,
      sortable: false,
    },
    {
      id: "contarctActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
          onClick={() =>
            handleShowReportDetails(
              "Contract Details",
              EQUIPMENT_CONTRACT_DETAILS,
              row
            )
          }
        >
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // warrenty details columns
  const warrentyDetailsColumns = [
    {
      id: "warrentyId",
      name: <div>ID</div>,
      selector: (row) => row.id,
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyTitle",
      name: <div>Title</div>,
      selector: (row) => row.title || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyCategory",
      name: <div>Category</div>,
      selector: (row) => row?.category || "NA",
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      id: "warrentyBasis",
      name: <div>Basis</div>,
      selector: (row) => row?.basis || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyUnit",
      name: <div>Unit</div>,
      selector: (row) => row?.unitOfMeasure || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyStartDate",
      name: <div>Start Date</div>,
      selector: (row) => row?.startDate || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyEndData",
      name: <div>End Date</div>,
      selector: (row) => row?.endDate || "NA",
      wrap: true,
      sortable: false,
    },
    {
      i: "warrentyStartUsage",
      name: <div>Start Usage</div>,
      selector: (row) => row?.startUsage || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyEndUsage",
      name: <div>End Usage</div>,
      selector: (row) => row?.endUsage,
      wrap: true,
      sortable: false,
    },
    {
      id: "warrentyActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Warranty Details",
                EQUIPMENT_WARRENTY_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // ERP warrenty report columns
  const erpWarrentyItemColumns = [
    {
      id: "erpWarrentyComponentId",
      name: <div>Component ID</div>,
      selector: (row) => row.itemName,
      wrap: true,
      sortable: false,
    },
    {
      id: "erpWarrentyDescription",
      name: <div>Description</div>,
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: false,
    },
    {
      id: "erpWarrentySerialNumber",
      name: <div>Serial Number </div>,
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: false,
    },
    {
      i: "erpWarrentyWarrentyType",
      name: <div>Warranty</div>,
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: false,
    },
    {
      id: "erpWarrentyWarrentyCode",
      name: <div>Warranty Code</div>,
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: false,
    },
    {
      id: "erpWarrentyActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Warranty Report",
                EQUIPMENT_ERP_WARRENTY_REPORT_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // service Report columns
  const serviceReportColumns = [
    {
      id: "serviceReportReportNumber",
      name: <div>Report#</div>,
      selector: (row) => row.reportNumber,
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportJobNumber",
      name: <div>Job #</div>,
      selector: (row) => row.jobNumber || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportEngineModelNumber",
      name: <div>Engine Model #</div>,
      selector: (row) => row?.engineModelNumber || "NA",
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      id: "serviceReportEngineSerialNumber",
      name: <div>Engine Serial #</div>,
      selector: (row) => row?.engineSerialNumber || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportUsage",
      name: <div>Usage</div>,
      selector: (row) => row?.usage || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportRepairDate",
      name: <div>Repair Date</div>,
      selector: (row) => row?.repairDate,
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportComplaints",
      name: <div>Complaints</div>,
      selector: (row) => row?.complaint || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "serviceReportActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Service Report",
                EQUIPMENT_SERVICE_REPORT_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // Failure Report columns
  const failureReportColumns = [
    {
      id: "failureReportPartNumber",
      name: <div>Part #</div>,
      selector: (row) => row.partNumber,
      wrap: true,
      sortable: false,
    },
    {
      id: "failureReportQuantity",
      name: <div>Quantity</div>,
      selector: (row) => row.quantity || "1",
      wrap: true,
      sortable: false,
    },
    {
      id: "failureReportSubAssembly",
      name: <div>Sub-Assembly</div>,
      selector: (row) => row?.subAssembly || "NA",
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      id: "failureReportWarrenty",
      name: <div>Warranty</div>,
      selector: (row) => row?.warranty || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "failureReportFailureDate",
      name: <div>Failure Date</div>,
      selector: (row) => row?.failureDate,
      wrap: true,
      sortable: false,
    },
    {
      id: "failureReportRepairDate",
      name: <div>Repair Date</div>,
      selector: (row) => row?.repairDate,
      wrap: true,
      sortable: true,
    },
    {
      id: "failureReportHoursOnPart",
      name: <div>Hours On Part</div>,
      selector: (row) => row?.hoursOnPart || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "failureReportActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Failure Report",
                EQUIPMENT_FAILURE_REPORT_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // usage details columns
  const usageDetailsColumns = [
    {
      id: "usageDetailsCurrentUsage",
      name: <div>Current Usage</div>,
      selector: (row) => row.currentUsage || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "usageDetailsAverageUsage",
      name: <div>Average Usage</div>,
      selector: (row) => row.averageUsage || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "usageDetailsLastUpdatedDate",
      name: <div>Last Updated Date</div>,
      selector: (row) => row?.updatedAt,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      id: "usageDetailsSensorId",
      name: <div>Sensor ID</div>,
      selector: (row) => row?.sensorId || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "usageDetailsSMUId",
      name: <div>SMU ID</div>,
      selector: (row) => row?.smuId || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "usageDetailsSMUType",
      name: <div>SMU Type</div>,
      selector: (row) => row?.smuType || "NA",
      wrap: true,
      sortable: false,
    },
    {
      id: "usageDetailsActions",
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Usage Report",
                EQUIPMNT_USAGE_REPORT_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // Usage Smu columns
  const usageSmuItemColumns = [
    {
      name: <div>SMU ID/Sensor ID</div>,
      selector: (row) => row.smuId,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>SMU Type</div>,
      selector: (row) => row.smuType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Usage ID</div>,
      selector: (row) => row?.usageId,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>Reading Date</div>,
      selector: (row) => row?.readingDate,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Unit</div>,
      selector: (row) => row?.unitOfMeasure,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Reading Description</div>,
      selector: (row) => row?.readingDescription,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Overwrite/Error</div>,
      selector: (row) => row?.overWritenError,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Usage Report",
                EQUIPMENT_USAGE_SMU_REPORT_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // show the model
  const handleShowReportDetails = (title, reportType, row) => {
    setModelHeaderTitle(title);
    setModelContentReportType(reportType);
    setModelContentReportObj(row);
    setShowModal(true);
  };

  // view Selected Search equipment details
  const handleViewDetails = (id) => {
    setLoading(true);
    setPageNo(1);
    const rUrl = Get_Equipment_Datails_By_Id_GET + id;
    callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const {
            contractRecords,
            warrantyRecords,
            serviceRecords,
            failureRecords,
            usageRecords,
            sensorRecords,
            ...restEquipmentDetails
          } = responseData;
          setSelectedEquipmentId(id);
          // setContractRecordsList(contractRecords);
          setWarrantyDetailsList(warrantyRecords);
          // setServiceReportList(serviceRecords);
          // setFailureReportList(failureRecords);
          // setUsageDetailsList(usageRecords);
          setSelectEquipmentDetails(responseData);
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
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectEquipmentDetails.maker)
                    ? "NA"
                    : selectEquipmentDetails.maker}
                  {/* Caterpillar */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Model
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectEquipmentDetails.model)
                    ? "NA"
                    : selectEquipmentDetails.model}
                  {/* 336D2 L */}
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
                  {/* {isEmpty(selectEquipmentDetails.engineModel)
                    ? "NA"
                    : selectEquipmentDetails.engineModel} */}
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
                  {/* {isEmpty(selectEquipmentDetails.operator)
                    ? "NA"
                    : selectEquipmentDetails.operator} */}
                    80648 lb
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Net Flywheel Power
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectEquipmentDetails.netFlywheelPower)
                  ? "NA"
                  : selectEquipmentDetails.netFlywheelPower}
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
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectEquipmentDetails.customerId)
                  ? "NA"
                  : selectEquipmentDetails.customerId} */}
                1149596
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Name
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase ">
                {isEmpty(selectEquipmentDetails.customer)
                  ? "NA"
                  : selectEquipmentDetails.customer}
                {/* UNNATI MARIGOLD REALTORS LLP */}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Contact Person
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectEquipmentDetails.contact)
                  ? "NA"
                  : selectEquipmentDetails.contact}
                {/* Vinay Sharma */}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase ">
                {/* {isEmpty(selectEquipmentDetails.customerGroup)
                  ? "NA"
                  : selectEquipmentDetails.customerGroup} */}
                Midsize
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Segment
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase ">
                {/* {isEmpty(selectEquipmentDetails.customerSegment)
                  ? "NA"
                  : selectEquipmentDetails.customerSegment} */}
                Construction
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Last Owner
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase ">
                {/* {isEmpty(selectEquipmentDetails.owner)
                  ? "NA"
                  : selectEquipmentDetails.owner} */}
                Not applicable
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
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase ">
                {/* {isEmpty(selectEquipmentDetails.fleetNo)
                  ? "NA"
                  : selectEquipmentDetails.fleetNo} */}
                D2L - RAJ - NORTH
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Contact Address
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Alwar, Rajsthan
                {/* {selectEquipmentDetails.regionOrState +
                  "," +
                  selectEquipmentDetails.country} */}
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Geo codes
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* {isEmpty(selectEquipmentDetails.geocode)
                  ? "NA"
                  : selectEquipmentDetails.geocode} */}
                Latitude: 34.051480 Longitude: -117.973470
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Primary Contact
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* {isEmpty(selectEquipmentDetails.contact)
                  ? "NA"
                  : selectEquipmentDetails.contact} */}
                Sachin Meena
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Moved In/Out
              </p>
              <div className="equipment-switch">
                <Switch
                  {...Switch_label_Object}
                  // checked={
                  //   selectEquipmentDetails.movedInOrOutFlag ? true : false
                  // }
                  checked={true}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Previous Location
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* {isEmpty(selectEquipmentDetails.previousLocation)
                  ? "NA"
                  : selectEquipmentDetails.previousLocation} */}
                Churu, Rajsthan
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                New Location
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* {isEmpty(selectEquipmentDetails.newLocation)
                  ? "NA"
                  : selectEquipmentDetails.newLocation} */}
                Alwar
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Moved In Date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* {isEmpty(selectEquipmentDetails.movedInDate)
                  ? "NA"
                  : selectEquipmentDetails.movedInDate} */}
                45211
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
          columns={contractDetailsColumns}
          data={contractRecordsList}
          title="Contracts"
        />
        <h5 className="font-weight-500 mt-5 ">Warranty Details</h5>
        <EquipmentDataTable
          columns={warrentyDetailsColumns}
          data={warrantyDetailsList}
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
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                E0001096
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* ERP Description */}Title
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                Excavator
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Technical Asset Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                NA
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Fleet Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                D2L - RAJ - NORTH
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Purchase Date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                43160
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Serial Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                ZCT00981
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Functional Location
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                F001-32
              </p>
            </div>
          </div>
        </div>
        <EquipmentDataTable
          columns={warrentyDetailsColumns}
          data={warrantyDetailsList}
          title="Warranty"
        />
        {/* <EquipmentDataTable
          columns={erpWarrentyItemColumns}
          data={warrentyData}
          title="Warranty"
        /> */}
      </>
    );
  };

  // page 5 content
  const viewDetailsPage_5 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4 ">Service Report</h5>
        <EquipmentDataTable
          columns={serviceReportColumns}
          data={serviceReportList}
          title={"Service"}
        />
        <h5 className="font-weight-500 mt-5 ">Failure report </h5>
        <EquipmentDataTable
          columns={failureReportColumns}
          data={failureReportList}
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
          columns={usageDetailsColumns}
          data={usageDetailsList}
          title="Usage"
        />
        <EquipmentDataTable
          columns={usageSmuItemColumns}
          data={dailyUsageDetails}
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
          <EquipmentSearchMaster
            falgType="equipment"
            searchFlag={SEARCH_FALG_EQUIPMENT}
            setSearchList={setSearchList}
          />
          <div className="row mt-3 mb-5">
            {searchList.length !== 0 && (
              <EquipmentMasterSearchList
                equipmentSearchList={searchList}
                selectedEquipmentId={selectedEquipmentId}
                handleViewDetails={handleViewDetails}
              />
            )}
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
              {loading ? (
                <LoadingProgress />
              ) : (
                <>
                  {selectedEquipmentId && (
                    <div className="">
                      <div className="bg-white p-3 border-radius-10 ">
                        <div className="d-flex align-items-center justify-content-between equipment-pagination">
                          <h5 className="font-weight-600 mb-0 text-uppercase">
                            {/* {`${selectEquipmentDetails.description} - ${selectEquipmentDetails.model}`} */}
                            {/* Chain excavator - 336D2 L */}
                            {`${selectEquipmentDetails.description}`}
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
                          <h6 className="text-primary font-weight-600 text-uppercase">
                            {selectEquipmentDetails.equipmentNumber}
                          </h6>
                          <p className="text-light-60 font-size-12 mb-0 text-uppercase">
                            {`${selectEquipmentDetails.model}- 2018`}
                            {/* 336D2L -2018 */}
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
          header={modelHeaderTitle}
          reportType={modelContentReportType}
        />
      )} */}

      {showModal && (
        <EquipmentReportDetail
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

export default EquipmentMaster;
