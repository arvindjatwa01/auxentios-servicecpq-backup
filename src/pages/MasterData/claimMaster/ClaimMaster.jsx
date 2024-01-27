import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  Recent_Warranty_List_GET,
  Search_By_Fields_Warranty_List_GET,
} from "services/CONSTANTS";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

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
    renderCell: (params) => (
      <div style={{ fontWeight: "bold" }}>{params.value ? "Yes" : "No"}</div>
    ),
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
              className=" cursor"
              // onClick={handleShowClaimDetails}
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
              // onClick={() => handleViewWarrantyDetails(params)}
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
              // onClick={() => setShowOverviewModal(true)}
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

  const [claimRecordData, setClaimRecordData] = useState([])

  useEffect(() => {
    if (isEmpty(warrantyStatus) || warrantyStatus === "all") {
      getRecentWarrantyList();
    } else {
      getFilterWarrantyList();
    }
  }, [warrantyStatus]);

  useEffect(() => {
    if (isEmpty(claimStatus) || claimStatus === "all") {

    }else{

    }
  }, [])

  // get the recent warranty List without any Filter applied
  const getRecentWarrantyList = () => {
    const rUrl = Recent_Warranty_List_GET;
    callGetApi(
      null,
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
      null,
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
  };
  const handleClaimType = (event) => {
    setClaimType(event.target.value);
  };
  const handleWarrantyStatus = (event) => {
    setwarrantyStatus(event.target.value);
  };

  return (
    <div>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 2,
            }}
          >
            <Grid item xs={12}>
              <TabContext value={tabValue}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginTop: 3,
                    marginInline: 5,
                  }}
                >
                  <TabList className="" onChange={changeTab}>
                    <Tab
                      label="Claim"
                      value={"claim"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Warranty"
                      value={"warranty"}
                      className="heading-tabs"
                    />
                  </TabList>
                </Box>
                <TabPanel value="claim" sx={{ marginTop: 0 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={quoteExpanded === "claimStatus"}
                          onChange={handleQuoteExpand("claimStatus")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Claim Status
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={claimStatus}
                              onChange={handleClaimStatus}
                            >
                              <FormControl>
                                {claimsStatus.map((status, i) => (
                                  <FormControlLabel
                                    label={
                                      <Typography sx={{ fontSize: 14 }}>
                                        {status.label}
                                      </Typography>
                                    }
                                    value={status.value}
                                    control={<Radio />}
                                  />
                                ))}
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={quoteExpanded === "claimType"}
                          onChange={handleQuoteExpand("claimType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Claim Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={claimType}
                              onChange={handleClaimType}
                            >
                              <FormControl>
                                {claimTypes.map((type, i) => (
                                  <FormControlLabel
                                    label={
                                      <Typography sx={{ fontSize: 14 }}>
                                        {type.label}
                                      </Typography>
                                    }
                                    value={type.value}
                                    control={<Radio />}
                                  />
                                ))}
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          // loading={isLoading}
                          sx={DATA_GRID_STYLE}
                          rows={data}
                          columns={claimColumn}
                          columnVisibilityModel={columnVisibilityModel}
                          onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibilityModel(newModel)
                          }
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20, 50]}
                        />
                      </DataGridContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="warranty" sx={{ marginTop: 0 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={quoteExpanded === "claimStatus"}
                          onChange={handleQuoteExpand("claimStatus")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Warranty Status
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={warrantyStatus}
                              onChange={handleWarrantyStatus}
                            >
                              <FormControl>
                                {warrantyStatusOptions.map((status, i) => (
                                  <FormControlLabel
                                    label={
                                      <Typography sx={{ fontSize: 14 }}>
                                        {status.label}
                                      </Typography>
                                    }
                                    value={status.value}
                                    control={<Radio />}
                                  />
                                ))}
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          // loading={isLoading}
                          sx={DATA_GRID_STYLE}
                          rows={warrantyData}
                          columns={warrantyColumns}
                          columnVisibilityModel={columnVisibilityModel}
                          onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibilityModel(newModel)
                          }
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20, 50]}
                          getRowId={(row) => row.warrantyId}
                        />
                      </DataGridContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ClaimMaster;
