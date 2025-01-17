import React, { useCallback, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CachedIcon from "@mui/icons-material/Cached";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import penIcon from "../../../assets/images/pen.png";

import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  Tooltip,
} from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  DATA_GRID_STYLE,
  claimTypes,
  claimsStatus,
  warrantyStatusOptions,
} from "./ClaimMasterConstants";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
  Claim_Pagination_List_GET,
  Recent_Warranty_List_GET,
  Search_By_Field_Claim_List_GET,
  Search_By_Fields_Warranty_List_GET,
  Warranty_Country_List_GET,
  Warranty_Evaluation_Questions_Get_GET,
} from "services/CONSTANTS";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import ClaimProcessModal from "./ClaimProcessModal";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import ClaimEditModal from "./ClaimEditModal";
import WarrantyOverviewModal from "../warrantyMaster/WarrantyOverviewModal";
import WarrantyDetails from "../warrantyMaster/WarrantyDetails";
import CheckWarrantyProccessModal from "pages/WarrantyMaster/CheckWarranty/CheckWarrantyProccessModal";
import ClaimWarrantyAssessmentModal from "pages/WarrantyMaster/CheckWarranty/ClaimWarrantyAssessmentModal";
import NewFeatureConfirmModal from "pages/WarrantyMaster/CheckWarranty/NewFeatureConfirmModal";
import ClaimWarrantyEvaluationModal from "pages/WarrantyMaster/CheckWarranty/ClaimWarrantyEvaluationModal";
import ClaimCreateModal from "pages/WarrantyMaster/CheckWarranty/ClaimCreateModal";
import ClaimWarrantyDetails from "pages/WarrantyMaster/CheckWarranty/ClaimWarrantyDetails";
import ClaimRequestProcess from "pages/WarrantyMaster/CheckWarranty/ClaimRequestProcess";
import ReturnRequester from "pages/WarrantyMaster/WarrantyReturn/ReturnRequester";
import ClaimFailedPartModal from "pages/WarrantyMaster/CheckWarranty/ClaimFailedPartModal";

const colorStatus = {
  draft: "lightgreen",
  active: "lightblue",
  revised: "lightsteelblue",
};

const claimColumns = [
  { field: "claimNumber", headerName: "Claim Number", flex: 1, minWidth: 100 },
  { field: "claimStatus", headerName: "Claim Status", flex: 1, minWidth: 120 },
  { field: "claimType", headerName: "Claim Type", flex: 1, minWidth: 120 },
  {
    field: "claimRequestDate",
    headerName: "Claim Request Date",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "claimClosureDate",
    headerName: "Claim Closure Date",
    flex: 1,
    minWidth: 150,
  },
  { field: "replacement", headerName: "Replacement", flex: 1, minWidth: 120 },
];

const reportColumns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => (
      <div className="text-primary" style={{ fontSize: 12 }}>
        {params.row.transactionId}
      </div>
    ),
  },
  { field: "description", headerName: "Description", flex: 1, minWidth: 220 },
  { field: "customer", headerName: "Customer", flex: 1, minWidth: 120 },
  { field: "equipmentNum", headerName: "Equipment #", flex: 1, minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div
        style={{
          fontSize: 14,
          backgroundColor: colorStatus[params.row.status],
          paddingInline: 5,
          paddingBlock: 2,
          borderRadius: 6,
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  { field: "validity", headerName: "Validity Ends", flex: 1, minWidth: 120 },
  { field: "createdBy", headerName: "Created By", flex: 1, minWidth: 100 },
  {
    field: "netPrice",
    headerName: "Net Price",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <div style={{ fontSize: 12, color: "orangered" }}>
        $ {parseFloat(params.row.netPrice).toFixed(2)}
      </div>
    ),
  },
  { field: "make", headerName: "Make", flex: 1, minWidth: 120 },
  { field: "model", headerName: "Model", flex: 1, minWidth: 100 },
  { field: "prefix", headerName: "Prefix", flex: 1, minWidth: 100 },
  { field: "family", headerName: "Family", flex: 1, minWidth: 100 },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    flex: 1,
    minWidth: 80,
    cellClassName: "actions",
    getActions: (params) => {
      return [
        <GridActionsCellItem
          icon={
            <div className=" cursor">
              <Tooltip title="View">
                <VisibilityTwoToneIcon
                  sx={{ color: "green", height: 30 }}
                  fontSize="20"
                />
              </Tooltip>
            </div>
          }
          label="View"
          className="textPrimary"
          //   onClick={() => openSparePartRow(params.row)}
          color="inherit"
        />,
      ];
    },
  },
];

const data = [
  {
    id: 0,
    transactionId: "QT000050",
    description: "Preventive maintenance plan-992K",
    customer: "1027425",
    equipmentNum: "H4C00468",
    status: "active",
    validity: "23-04-2024",
    createdBy: "74",
    netPrice: 200.0,
    make: "CATERPILLAR",
    model: "992K",
    prefix: "H4C",
    family: "40",
  },
  {
    id: 1,
    transactionId: "QT000048",
    description: "Standard plan for maintenance-336D2-L",
    customer: "1050971",
    equipmentNum: "DGR10041",
    status: "draft",
    validity: "23-04-2024",
    createdBy: "74",
    netPrice: 200.0,
    make: "CATERPILLAR",
    model: "336D2",
    prefix: "DGR",
    family: "40",
  },
  {
    id: 2,
    transactionId: "QT000039",
    description: "Premium repair plan-C15",
    customer: "1025417",
    equipmentNum: "LXJ05288",
    status: "revised",
    validity: "23-04-2024",
    createdBy: "74",
    netPrice: 200.0,
    make: "CATERPILLAR",
    model: "C15",
    prefix: "LXJ",
    family: "28",
  },
  {
    id: 3,
    transactionId: "QT000022",
    description: "Standard Repair plan-140H",
    customer: "1221528",
    equipmentNum: "CCA03589",
    status: "draft",
    validity: "23-04-2024",
    createdBy: "74",
    netPrice: 200.0,
    make: "CATERPILLAR",
    model: "140H",
    prefix: "CCA",
    family: "25",
  },
];

const DataGridContainer = (props) => (
  <Box
    margin={"auto"}
    sx={{
      backgroundColor: "#ffffff",
      height: 500,
      marginBlock: 2,
      borderRadius: 5,
      width: "95%",
      display: "flex",
      justifyContent: "center",
      padding: 2,
    }}
  >
    {props.children}
  </Box>
);

const ClaimMaster = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState("claim");
  const [quoteExpanded, setQuoteExpanded] = useState("claimStatus");
  const [claimStatus, setClaimStatus] = useState("all");
  const [claimType, setClaimType] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [warrantyData, setWarrantyData] = useState([]);
  const [warrantyStatus, setwarrantyStatus] = useState("all");

  const [openClaimRequestProcess, setOpenClaimRequestProcess] = useState(false);
  const [openReturnRequsterModal, setOpenReturnRequsterModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [partSelectionData, setPartSelectionData] = useState([]);

  const [claimRecordData, setClaimRecordData] = useState([]);
  const [showClaimProcessModal, setShowClaimProcessModal] = useState(false);
  const [showWarrantyAssessmentModal, setShowWarrantyAssessmentModal] =
    useState(false);
  const [showNewFeatureCreateModal, setShowNewFeatureCreateModal] =
    useState(false);
  const [showClaimEditDetailsModal, setShowClaimEditDetailsModal] =
    useState(false);
  const [claimProcessActiveTabClaim, setClaimProcessActiveTabClaim] =
    useState(false);
  const [claimRecordId, setClaimRecordId] = useState(null);
  const [claimOrderId, setClaimOrderId] = useState(null);
  const [evaluationId, setEvaluationId] = useState(null);
  const [assesstmentId, setAssesstmentId] = useState(null);
  const [warrantyRecordId, setWarrantyRecordId] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showClaimAddEditModal, setShowClaimAddEditModal] = useState(false);
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);
  const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
  const [
    showClaimWarrantyEvaluationModal,
    setShowClaimWarrantyEvaluationModal,
  ] = useState(false);
  const [showClaimCreateModal, setShowClaimCreateModal] = useState(false);
  const [showClaimWarrantyDetailsModal, setShowClaimWarrantyDetailsModal] =
    useState(false);
  const [overviewRecordId, setOverviewRecordId] = useState(null);

  const [evaluationQuestions, setEvaluationQuestions] = useState([]);

  const [claimData, setClaimData] = useState({
    claimType: "",
    claimNumber: "",
  });

  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [newPartRecord, setNewPartRecord] = useState(null);
  const [isFailurePart, setIsFailurePart] = useState(false);

  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  const handleShowClaimAddEditModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowClaimAddEditModal(!showClaimAddEditModal);
  };

  const handleShowClaimDetails = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowClaimDetailsModal(!showClaimDetailsModal);
  };

  const handleFilesUploadModal = () => {
    setShowOverviewModal(!showOverviewModal);
    setShowUploadFilesModal(!showUploadFilesModal);
  };

  const handleViewWarrantyOverview = (params) => {
    const warrantyId = params.row["warrantyId"];
    setOverviewRecordId(warrantyId);
    setShowOverviewModal(true);
  };

  useEffect(() => {
    if (!showClaimProcessModal && !showClaimEditDetailsModal) {
      setClaimRecordId(null);
    }
  }, [showClaimProcessModal, showClaimEditDetailsModal]);

  useEffect(() => {
    if (isEmpty(warrantyStatus) || warrantyStatus === "all") {
      getRecentWarrantyList();
    } else {
      getFilterWarrantyList();
    }
  }, [warrantyStatus]);

  useEffect(() => {
    if (
      (isEmpty(claimStatus) || claimStatus === "all") &&
      (isEmpty(claimType) || claimType === "all")
    ) {
      getClaimList();
    } else {
      getFilterClaimeList();
    }
  }, [claimType, claimStatus]);

  useEffect(() => {
    getEvaluationQuestions();
    getCountryKeyValueList();
  }, []);

  // evaluation questions list
  const getEvaluationQuestions = () => {
    const rUrl = `${Warranty_Evaluation_Questions_Get_GET}pageNumber=${1}&pageSize=${10}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        const options = [];
        const shortQuestions = responseData.sort(
          (a, b) => a.questionId - b.questionId
        );
        shortQuestions.map((row) => {
          if (row.questionId === 5 || row.questionId === 6) {
            options.push({ ...row, type: "input" });
          } else {
            options.push({ ...row, type: "select" });
          }
        });
        setEvaluationQuestions(options);
      }
    });
  };

  // country key value list
  const getCountryKeyValueList = () => {
    const rUrl = `${Warranty_Country_List_GET}?pageNumber=${0}&pageSize=${10}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        const options = [];
        responseData.map((row) =>
          // options.push({ label: row.countryName, value: row.countryId })
          options.push({ label: row.countryName, value: row.countryName })
        );
        setCountryList(options);
      }
    });
  };

  // get the recent warranty List without any Filter applied
  const getRecentWarrantyList = () => {
    const rUrl = Recent_Warranty_List_GET;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          setWarrantyData(response.data);
          console.log("Recent Warranty Data :: ", response);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // get filtered data Warranty List data
  const getFilterWarrantyList = () => {
    const rUrl = `${Search_By_Fields_Warranty_List_GET}field_name=${"warrantyStatus"}&field_value=${warrantyStatus}`;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          setWarrantyData(response.data);
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  };

  const getClaimList = () => {
    const rUrl = `${Claim_Pagination_List_GET}?pageNumber=${0}&pageSize=${10}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimRecordData(responseData);
      }
    });
  };

  const getFilterClaimeList = useCallback(() => {
    let rUrl = `${Search_By_Field_Claim_List_GET}field_name=${
      isEmpty(claimStatus) ? "claimType" : "claimStatus"
    }&field_value=${isEmpty(claimStatus) ? claimType : claimStatus}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimRecordData(responseData);
      }
    });
  }, [claimType, claimStatus]);

  const changeTab = (event, type) => {
    console.log();
    setTabValue(type);
    // if(type === "activities"){
    //   setData(activitiesData);
    // } else if(type === "tasks"){
    //   setData(savedTasksData);
    //   } else if(type === "review"){
    //     setData(reviewData);
    //     }
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    model: false,
    make: false,
    family: false,
    prefix: false,
  });

  const handleQuoteExpand = (panel) => (event, isExpanded) => {
    setQuoteExpanded(isExpanded ? panel : false);
  };
  const handleClaimStatus = (event) => {
    setClaimStatus(event.target.value);
    setClaimType("");
  };
  const handleClaimType = (event) => {
    setClaimType(event.target.value);
    setClaimStatus("");
  };
  const handleWarrantyStatus = (event) => {
    setwarrantyStatus(event.target.value);
  };

  const handleShowClaimProcessModal = (params) => {
    const claimId = params.row["claimId"];
    const claimType = params.row["claimType"];
    const claimNumber = params.row["claimNumber"];
    const warrantyId = params.row[" warrantyId"];
    setClaimRecordId(claimId);

    setWarrantyRecordId(warrantyId);
    setClaimData({
      claimType: claimType,
      claimNumber: claimNumber,
    });

    setShowClaimWarrantyDetailsModal(true);
    setClaimProcessActiveTabClaim(false);
    // setShowClaimProcessModal(true);
    // setShowWarrantyAssessmentModal(true);
  };

  // create claim order (Show modal for claim order create)
  const handleCreateClaimOrder = () => {
    setShowClaimWarrantyDetailsModal(false);
    // setShowClaimProcessModal(true);
    setOpenClaimRequestProcess(true);
  };

  // show the warrany evaluation model box
  const handleShowClaimEvaluation = () => {
    setShowClaimProcessModal(false);
    setShowWarrantyAssessmentModal(true);
  };

  const handleShowClaimWarrantyEvaluationModal = () => {
    setShowClaimWarrantyEvaluationModal(true);
    setShowNewFeatureCreateModal(false);
  };

  // claim create modal
  const handleShowClaimCreateModal = () => {
    setShowClaimWarrantyEvaluationModal(false);
    setClaimProcessActiveTabClaim(true);
    setShowClaimCreateModal(true);
  };

  const handleShowClaimProceeOnClaimCreate = () => {
    setShowClaimCreateModal(false);
    setClaimProcessActiveTabClaim(true);
    setShowClaimProcessModal(true);
  };

  const handleViewWarrantyDetails = (params) => {
    const warrantyId = params.row["warrantyId"];
    setClaimRecordId(warrantyId);
    setShowDetailsModal(true);
  };

  const handleShowClaimDetailsModal = (params) => {
    const claimId = params.row["claimId"];
    setClaimRecordId(claimId);
    setShowClaimEditDetailsModal(true);
  };

  const handeleShowReturnRequester = (data) => {
    const options = [];
    options.push(data);
    setPartSelectionData([...options]);
    setOpenReturnRequsterModal(true);
    setOpenClaimRequestProcess(false);
  };

  const handleShowHideAddPartModal = () => {
    setOpenReturnRequsterModal(!openReturnRequsterModal);
    // setOpenClaimRequestProcess(!openClaimRequestProcess);
    // setShowOverviewModal(!showOverviewModal);
    setShowAddPartModal(!showAddPartModal);
  };

  const claimColumn = [
    {
      field: "claimNumber",
      headerName: "Claim Number",
      flex: 1,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      flex: 1,
      renderCell: (params) => <div>{params.value ? "Yes" : "No"}</div>,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          // <GridActionsCellItem
          //   icon={
          //     <div
          //       className=" cursor"
          //     >
          //       <Tooltip title="Edit">
          //         <img
          //           className="m-1"
          //           src={penIcon}
          //           alt="Edit"
          //           onClick={() => handleShowClaimDetailsModal(params)}
          //         />
          //       </Tooltip>
          //     </div>
          //   }
          //   label="Edit"
          //   className="textPrimary"
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => handleShowClaimProcessModal(params)}
              >
                <Tooltip title="Claim Process">
                  <CachedIcon />
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

  const warrantyColumns = [
    {
      field: "warrantyId",
      headerName: "Id",
      //   width: 90,
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      //   width: 90,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      //   width: 90,
      flex: 1,
    },
    {
      field: "warrantyBasics",
      headerName: "Basis",
      //   width: 90,
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Unit",
      //   width: 90,
      flex: 1,
    },
    // {
    //   field: "modelNo",
    //   headerName: "Model Number",
    //   width: 150,
    //   flex: 1,
    // },
    // {
    //   field: "serialNumber",
    //   headerName: "Serial Number",
    //   width: 120,
    //   flex: 1,
    // },
    {
      field: "warrantyStartDate",
      headerName: "Start Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyEndDate",
      headerName: "End Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyStartUsage",
      headerName: "Start Usage",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyEndUsage",
      headerName: "End Usage",
      //   width: 120,
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
                onClick={() => handleViewWarrantyDetails(params)}
              >
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
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
                onClick={() => handleViewWarrantyOverview(params)}
              >
                <Tooltip title="Overview">
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

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div>
        <div className="content-body bg-white" style={{ minHeight: "884px" }}>
          <div className="container-fluid mt-3">
            <h4 className="mb-3">Warranty Dashboard</h4>
            <div class="row gx-3">
              <div class="col mt-3">
                <div class="card" style={{ width: "30rem" }}>
                  <ul class="list-group list-group-flush ">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center p-3"
                      style={{ backgroundColor: "rgb(245, 224, 245)" }}
                    >
                      <div>
                        <span class="material-icons mr-2">
                          {" "}
                          <i
                            class="fa-regular fa-square-minus me-2"
                            style={{ color: "blue" }}
                          ></i>
                        </span>{" "}
                        Recent Activity
                      </div>
                      <span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </span>
                    </li>
                    <li class="list-group-item ">
                      <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                        <div className="text-primary">
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          <strong>Claim 12920-2</strong>
                        </div>
                        <span>5:45PM</span>
                      </div>
                      <p>Discount has been changed from 797 to 700 </p>
                      <p className="text-primary">for SB12930</p>
                      <p>Discount has been changed from 797 to700</p>
                      <p>
                        <small>
                          <i class="fa-solid fa-angle-up me-2"></i>View more
                        </small>
                      </p>
                    </li>
                    <li class="list-group-item">
                      <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                        <div>
                          <span class="material-icons mr-2">
                            {" "}
                            <i
                              class="fa-solid fa-triangle-exclamation me-2"
                              style={{ color: "red" }}
                            ></i>
                          </span>{" "}
                          <strong>Claim 12920-2</strong>
                        </div>
                        <span>5:45PM</span>
                      </div>
                      <p>Discount has been changed from 797 to 700</p>
                      <p>
                        <small>
                          <i class="fa-solid fa-angle-down me-2"></i>View less
                        </small>{" "}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <div class="card" style={{ width: "25rem" }}>
                    <div
                      class="list-group-item d-flex justify-content-between align-items-center p-3"
                      style={{ backgroundColor: "#ADD8E6" }}
                    >
                      <div>
                        <span class="material-icons  text-primary">
                          {" "}
                          <i class="fa-regular fa-square-minus me-2"></i>
                        </span>{" "}
                        Workflow Tasks
                      </div>
                      <span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </span>
                    </div>

                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary">
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                            {/* <strong>CL456 requires your approval</strong> */}
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve </strong>
                          </p>
                          <p className="mx-2">Reject </p>
                          <p>Review</p>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary">
                              {" "}
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                            {/* <strong>CL456 requires your approval</strong> */}
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve </strong>
                          </p>

                          <p className="mx-2">Reject </p>
                          <p>Review</p>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary ">
                              {" "}
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve </strong>
                          </p>

                          <p className="mx-2">Reject </p>
                          <p>Review</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <div class="mb-3">
                    <div
                      class="border  border-success rounded"
                      style={{ color: "green", backgroundColor: "#D1FFBD" }}
                    >
                      <div class="list-group-item d-flex justify-content-between align-items-center p-3 cursor-pointer">
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Warranty Administration
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                    <div
                      class=" rounded mt-4 "
                      style={{
                        color: "purple",
                        border: "1px solid purple",
                        backgroundColor: "rgb(245, 224, 245)",
                      }}
                    >
                      <div class="list-group-item d-flex justify-content-between align-items-center p-3 cursor-pointer">
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Warranty Claims
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                    <div
                      class="border border-info rounded mt-4  text-black "
                      style={{ backgroundColor: "#add8e6 " }}
                    >
                      <div
                        class="list-group-item d-flex justify-content-between align-items-center p-3 cursor-pointer"
                        // onClick={toggleReturnRequesterModal}
                      >
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Parts Return
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: "#f3eafe",
                borderRadius: 5,
                marginBlock: 3,
                padding: 2,
                marginTop: 0.5,
                marginBottom: 2,
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
                {/* <SearchBox
                  label={"Return Number"}
                  // value={returnNumber}
                  // handleChange={(e) => setReturnNumber(e.target.value)}
                  size={250}
                />
                <SelectBox
                  label={"Return Type"}
                  value={returnType}
                  options={returnTypeOptions}
                  handleChange={(e) => setReturnType(e.target.value)}
                  showClearIcon={true}
                  handleUnselect={() => setReturnType("")}
                /> */}
                <DataGridContainer>
                  <DataGrid
                    // loading={isLoading}
                    sx={DATA_GRID_STYLE}
                    getRowId={(row) => row.claimId}
                    rows={claimRecordData}
                    columns={claimColumn}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                      setColumnVisibilityModel(newModel)
                    }
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                  />
                </DataGridContainer>
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      {showClaimWarrantyDetailsModal && (
        <ClaimWarrantyDetails
          show={showClaimWarrantyDetailsModal}
          hideModal={() => setShowClaimWarrantyDetailsModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          handleCreateClaimOrder={handleCreateClaimOrder}
        />
      )}
      {showClaimProcessModal && (
        <CheckWarrantyProccessModal
          show={showClaimProcessModal}
          hideModal={() => setShowClaimProcessModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          claimProcessActiveTabClaim={claimProcessActiveTabClaim}
          claimDetails={claimData}
          claimOrderId={claimOrderId}
          setClaimOrderId={setClaimOrderId}
          handleShowClaimEvaluation={handleShowClaimEvaluation}
        />
      )}
      {showWarrantyAssessmentModal && (
        <ClaimWarrantyAssessmentModal
          show={showWarrantyAssessmentModal}
          hideModal={() => setShowWarrantyAssessmentModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          handleShowNewFeactureConfirmModal={() =>
            setShowNewFeatureCreateModal(true)
          }
          setEvaluatedId={setAssesstmentId}
          warrantyRecordId={warrantyRecordId}
        />
      )}
      {showNewFeatureCreateModal && (
        <NewFeatureConfirmModal
          show={showNewFeatureCreateModal}
          hideModal={() => setShowNewFeatureCreateModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          handleClickYes={handleShowClaimWarrantyEvaluationModal}
        />
      )}
      {showClaimWarrantyEvaluationModal && (
        <ClaimWarrantyEvaluationModal
          show={showClaimWarrantyEvaluationModal}
          hideModal={() => setShowClaimWarrantyEvaluationModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          handleShowClaimCreateModal={handleShowClaimCreateModal}
          handleShowClaimProceeOnClaimCreate={
            handleShowClaimProceeOnClaimCreate
          }
          evaluatedId={assesstmentId}
          evaluationQuestions={evaluationQuestions}
          warrantyRecordId={warrantyRecordId}
        />
      )}
      {showClaimCreateModal && (
        <ClaimCreateModal
          show={showClaimCreateModal}
          hideModal={() => setShowClaimCreateModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
          handleShowClaimProcessModal={handleShowClaimProceeOnClaimCreate}
        />
      )}

      {/* {showClaimProcessModal && (
        <ClaimProcessModal
          show={showClaimProcessModal}
          hideModal={() => setShowClaimProcessModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
        />
      )} */}

      {showClaimEditDetailsModal && (
        <ClaimEditModal
          show={showClaimEditDetailsModal}
          hideModal={() => setShowClaimEditDetailsModal(false)}
          recordId={claimRecordId}
          handleSnack={handleSnack}
        />
      )}

      {showDetailsModal && (
        <WarrantyDetails
          show={showDetailsModal}
          hideModal={() => setShowDetailsModal(false)}
          recordId={overviewRecordId}
        />
      )}

      <WarrantyOverviewModal
        show={showOverviewModal}
        hideModal={() => setShowOverviewModal(!showOverviewModal)}
        recordId={overviewRecordId}
        showClaimAddEditModal={showClaimAddEditModal}
        handleShowClaimAddEditModal={handleShowClaimAddEditModal}
        showClaimDetailsModal={showClaimDetailsModal}
        handleShowClaimDetails={handleShowClaimDetails}
        showUploadFilesModal={showUploadFilesModal}
        handleFilesUploadModal={handleFilesUploadModal}
      />

      {/* {openClaimRequestProcess && ( */}
      <ClaimRequestProcess
        show={openClaimRequestProcess}
        hideModal={() => setOpenClaimRequestProcess(false)}
        claimRecordId={claimRecordId}
        handleSnack={handleSnack}
        evaluationQuestions={evaluationQuestions}
        claimOrderId={claimOrderId}
        setClaimOrderId={setClaimOrderId}
        claimDetails={claimData}
        evaluationId={evaluationId}
        setEvaluationId={setEvaluationId}
        assesstmentId={assesstmentId}
        setAssesstmentId={setAssesstmentId}
        handeleShowReturnRequester={handeleShowReturnRequester}
        handleShowHideAddPartModal={handleShowHideAddPartModal}
        fromClaim={false}
        newPartRecord={newPartRecord}
        setNewPartRecord={setNewPartRecord}
        isFailurePar={isFailurePart}
        setIsFailurePart={setIsFailurePart}
      />
      {/* )} */}

      {openReturnRequsterModal && (
        <ReturnRequester
          show={openReturnRequsterModal}
          hideModal={() => setOpenReturnRequsterModal(false)}
          handleSnack={handleSnack}
          countryRegionOptionsList={countryList}
          partSelectionData={partSelectionData}
        />
      )}

      {showAddPartModal && (
        <ClaimFailedPartModal
          show={showAddPartModal}
          hideModal={handleShowHideAddPartModal}
          newPartRecord={newPartRecord}
          setNewPartRecord={setNewPartRecord}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default ClaimMaster;
