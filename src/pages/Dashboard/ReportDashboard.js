import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getAllUsers, getPortfolioCommonConfig } from "services";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

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
// import { GRID_STYLE } from "pages/Repair/CONSTANTS";
const GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    // backgroundColor: "#872ff7",
    color: "gray",
    fontSize: 16,
  },
  "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
    marginTop: "1em",
    marginBottom: "1em",
  },
  "& .MuiTablePagination-select": {
    marginTop: "1.5em",
    marginBottom: "1.5em",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    // borderRight: `1px solid rgba(0,0,0,.12)`,
    paddingLeft: "8px",
    paddingRight: "8px",
    minHeight: "72px",
    whiteSpace: "normal !important",
    wordWrap: "break-word !important",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 12,
  },
  "& .MuiInputBase-root": {
    fontSize: 12,
    marginInline: 2,
    paddingInline: 1,
  },
  "& .super-app-value": {
    backgroundColor: "#dabffd",
    fontWeight: "600",
  },
  "& .disable-value": {
    backgroundColor: "#f2f2f2",
  },
  marginInline: "auto",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 4,
  height: 400,
};

const colorStatus = {
  draft: "lightgreen",
  active: "lightblue",
  revised: "lightsteelblue",
};

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
    }}
  >
    {props.children}
  </Box>
);
var HTMLLi = React.createElement("li", { className: "bar" }, "foo");

export const ReportDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState("quote");
  const [templateExpanded, setTemplateExpanded] = useState("templateType");
  const [quoteExpanded, setQuoteExpanded] = useState("quoteStatus");
  const [kitExpanded, setKitExpanded] = useState("kitType");
  const [portfolioExpanded, setPortfolioExpanded] = useState("portfolioType");
  const [solExpanded, setSolExpanded] = useState("solType");
  const [repairExpanded, setRepairExpanded] = useState("repairType");

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
  const handleTemplateExpand = (panel) => (event, isExpanded) => {
    setTemplateExpanded(isExpanded ? panel : false);
  };
  const handleKitExpand = (panel) => (event, isExpanded) => {
    setKitExpanded(isExpanded ? panel : false);
  };
  const handleQuoteExpand = (panel) => (event, isExpanded) => {
    setQuoteExpanded(isExpanded ? panel : false);
  };
  const handlePortfolioExpand = (panel) => (event, isExpanded) => {
    setPortfolioExpanded(isExpanded ? panel : false);
  };

  const handleSolExpand = (panel) => (event, isExpanded) => {
    setSolExpanded(isExpanded ? panel : false);
  };

  const handleRepairExpand = (panel) => (event, isExpanded) => {
    setRepairExpanded(isExpanded ? panel : false);
  };
  const [customerSegmentOptions, setCustomerSegmentOptions] = useState([]);
  const [custSegment, setCustSegment] = useState("");
  useEffect(() => {
    setIsLoading(true);
    getPortfolioCommonConfig("customer-segment")
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setCustomerSegmentOptions(options);
      })
      .catch((err) => {
        alert(err);
      });
    getAllUsers()
      .then((res) => {
        console.log("Dashboard > getAllUsers > res=", res);
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setUsers([]);
        setIsLoading(false);
      });

    return () => {
      console.log("axios cleanup.");
    };
  }, []);

  const [quoteType, setQuoteType] = useState("solution");
  const handleQuoteType = (event) => {
    setQuoteType(event.target.value);
  };
  const [quoteStatus, setQuoteStatus] = useState("all");
  const handleQuoteStatus = (event) => {
    setQuoteStatus(event.target.value);
  };
  const [pageSize, setPageSize] = useState(5);

  const templateTypes = [
    { label: "All Templates", value: "all" },
    { label: "Most Used Templates", value: "most-used" },
    { label: "Least Used Templates", value: "least-used" },
    { label: "Templates For Review", value: "review" },
    { label: "Expiring Templates", value: "expiring" },
  ];
  const [templateType, setTemplateType] = useState("all");
  const handleTemplateType = (event) => {
    setTemplateType(event.target.value);
  };

  const kitTypes = [
    { label: "All Kits", value: "all" },
    { label: "Most Used Kits", value: "most-used" },
    { label: "Least Used Kits", value: "least-used" },
    { label: "Kits For Review", value: "review" },
    { label: "Expiring Kits", value: "expiring" },
  ];
  const [kitType, setKitType] = useState("all");
  const handleKitType = (event) => {
    setKitType(event.target.value);
  };

  const portfolioTypes = [
    { label: "All Portfolos", value: "all" },
    { label: "Top 10 Portfolios", value: "top-10" },
    { label: "Least Used Portfolios", value: "least-used" },
    { label: "Portfolios For Review", value: "review" },
    { label: "Expiring Portfolios", value: "expiring" },
  ];
  const [portfolioType, setPortfolioType] = useState("all");
  const handlePortfolioType = (event) => {
    setPortfolioType(event.target.value);
  };

  const solTypes = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Closed this week", value: "current-week" },
    { label: "Closed last week", value: "last-week" },
  ];
  const [solType, setSolType] = useState("all");
  const handleSolType = (event) => {
    setSolType(event.target.value);
  };

  const solStatuses = [
    { label: "Gold", value: "gold" },
    { label: "Silver", value: "silver" },
    { label: "Bronze", value: "bronze" },
  ];
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    model: false,
    make: false,
    family: false,
    prefix: false,
  });
  const [solStatus, setSolStatus] = useState("gold");
  const handleSolStatus = (event) => {
    setSolStatus(event.target.value);
  };

  const repairStatuses = [
    { label: "Draft", value: "draft" },
    { label: "Active", value: "active" },
    { label: "Revised", value: "revised" },
    { label: "Archived", value: "archived" },
  ];
  const [repairStatus, setRepairStatus] = useState("draft");
  const handleRepairStatus = (event) => {
    setRepairStatus(event.target.value);
  };

  const repairTypes = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Closed this week", value: "current-week" },
    { label: "Closed last week", value: "last-week" },
  ];
  const [repairType, setRepairType] = useState("all");
  const handleRepairType = (event) => {
    setRepairType(event.target.value);
  };
  const handleCustSegment = (event) => {
    setCustSegment(event.target.value);
  };

  return (
    <div>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <h5 className="">Reports</h5>
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
                      label="Quotes"
                      value={"quote"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Templates"
                      value={"templates"}
                      className="heading-tabs"
                    />
                    <Tab label="Kits" value={"kits"} className="heading-tabs" />
                    <Tab
                      label="Portfolio"
                      value={"portfolio"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Repair Option"
                      value={"repair"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Solutions"
                      value={"solution"}
                      className="heading-tabs"
                    />
                  </TabList>
                </Box>
                <TabPanel value="quote" sx={{ marginTop: 0 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={quoteExpanded === "quoteStatus"}
                          onChange={handleQuoteExpand("quoteStatus")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Quote Status
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={quoteStatus}
                              onChange={handleQuoteStatus}
                            >
                              <FormControl>
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      All Quotes
                                    </Typography>
                                  }
                                  value={"all"}
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Open Quotes
                                    </Typography>
                                  }
                                  value="open"
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Accepted Quotes
                                    </Typography>
                                  }
                                  value="accepted"
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Rejected Quotes
                                    </Typography>
                                  }
                                  value="rejected"
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Sent Quotes
                                    </Typography>
                                  }
                                  value="sent"
                                  control={<Radio />}
                                />
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={quoteExpanded === "quoteType"}
                          onChange={handleQuoteExpand("quoteType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Quote Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={quoteType}
                              onChange={handleQuoteType}
                            >
                              <FormControl>
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Solution Quotes
                                    </Typography>
                                  }
                                  value={"solution"}
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Repair Quotes
                                    </Typography>
                                  }
                                  value="repair"
                                  control={<Radio />}
                                />
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      Spare Parts Quotes
                                    </Typography>
                                  }
                                  value="parts"
                                  control={<Radio />}
                                />
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={quoteExpanded === "custSegment"}
                          onChange={handleQuoteExpand("custSegment")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Customer Segment
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              maxHeight: 250,
                              overflowY: "scroll",
                              "&::-webkit-scrollbar": {
                                width: "0.4em",
                              },
                              "&::-webkit-scrollbar-track": {
                                background: "#f1f1f1",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#888",
                              },
                              "&::-webkit-scrollbar-thumb:hover": {
                                background: "#555",
                              },
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={custSegment}
                              onChange={handleCustSegment}
                            >
                              <FormControl>
                                {customerSegmentOptions.map((custSegOption) => (
                                  <FormControlLabel
                                    label={
                                      <Typography sx={{ fontSize: 14 }}>
                                        {custSegOption.label}
                                      </Typography>
                                    }
                                    value={custSegOption.value}
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
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
                <TabPanel value="templates">
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2, marginInline: 1 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={templateExpanded === "templateType"}
                          onChange={handleTemplateExpand("templateType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Template Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={templateType}
                              onChange={handleTemplateType}
                            >
                              {templateTypes.map((templateOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {templateOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={templateOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                       
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <DataGridContainer>
                        <DataGrid
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
                <TabPanel value="kits">
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2, marginInline: 1 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={kitExpanded === "kitType"}
                          onChange={handleKitExpand("kitType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Kit Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={kitType}
                              onChange={handleKitType}
                            >
                              {kitTypes.map((kitOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {kitOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={kitOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                       
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
                <TabPanel value="portfolio">
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2, marginInline: 1 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={portfolioExpanded === "portfolioType"}
                          onChange={handlePortfolioExpand("portfolioType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Portfolio Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={portfolioType}
                              onChange={handlePortfolioType}
                            >
                              {portfolioTypes.map((portfolioOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {portfolioOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={portfolioOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={portfolioExpanded === "sold"}
                          onChange={handlePortfolioExpand("sold")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              $ Sold Portfolio
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
                <TabPanel value="solution">
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2, marginInline: 1 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={solExpanded === "solType"}
                          onChange={handleSolExpand("solType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Solution Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={solType}
                              onChange={handleSolType}
                            >
                              {solTypes.map((solOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {solOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={solOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          defaultExpanded
                          expanded={solExpanded === "solStatus"}
                          onChange={handleSolExpand("solStatus")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              By Status
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={solStatus}
                              onChange={handleSolStatus}
                            >
                              {solStatuses.map((solOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {solOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={solOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={solExpanded === "source"}
                          onChange={handleSolExpand("source")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Source
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={solExpanded === "reference"}
                          onChange={handleSolExpand("reference")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Reference
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
                <TabPanel value="repair">
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2, marginInline: 1 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={repairExpanded === "repairType"}
                          onChange={handleRepairExpand("repairType")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Repair Type
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={repairType}
                              onChange={handleRepairType}
                            >
                              {repairTypes.map((repairOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {repairOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={repairOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{  backgroundColor: "#f3eafe",}}
                          defaultExpanded
                          expanded={repairExpanded === "repairStatus"}
                          onChange={handleRepairExpand("repairStatus")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              By Status
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              value={repairStatus}
                              onChange={handleRepairStatus}
                            >
                              {repairStatuses.map((repairStatusOption) => (
                                <FormControlLabel
                                  label={
                                    <Typography sx={{ fontSize: 14 }}>
                                      {repairStatusOption.label}
                                    </Typography>
                                  }
                                  control={<Radio />}
                                  value={repairStatusOption.value}
                                />
                              ))}
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={repairExpanded === "source"}
                          onChange={handleRepairExpand("source")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Source
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                        <Divider sx={{ my: 2 }} />
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          expanded={repairExpanded === "reference"}
                          onChange={handleRepairExpand("reference")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Reference
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Suspendisse malesuada lacus ex, sit amet
                              blandit leo lobortis eget.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          loading={isLoading}
                          sx={GRID_STYLE}
                          rows={data}
                          columns={reportColumns}
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
              </TabContext>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
