import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart1, TinyAreaBasic, BubbleChart } from "../Common/index";

import { getAllUsers, getPortfolioCommonConfig } from "services";
import DataTable from "react-data-table-component";
import boxicon from "../../assets/icons/png/box.png";
import PartIcons from "../../assets/icons/png/PartIcons.png";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Actions = () => (
  <>
    <span className="mr-3">
      <i className="fa fa-eye mr-2"></i>View Details
    </span>
    <span className="mr-3">
      <i className="fa fa-edit mr-3"></i>Edit
    </span>
    <span>
      <i className="fa fa-ellipsis-v mr-2"></i>More actions
    </span>
  </>
);
const Status = () => (
  <div>
    <span className="mr-3 tableStatusSpan" style={{ display: "block" }}>
      <i className="fa fa-dot-circle-o mr-2"></i>Pending
    </span>
    <span className="mr-3 mb-2" style={{ display: "block", color: "#d6d6d6" }}>
      Pending by service team
    </span>
  </div>
);

const columns = [
  {
    name: (
      <>
        <div> Quote </div>
      </>
    ),
    selector: (row) => row.caseId,
    sortable: true,
    maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
    cell: (row) => row.caseId,
  },
  {
    name: (
      <>
        <div>Validity ends</div>
      </>
    ),
    selector: (row) => row.Source,
    wrap: true,
    sortable: true,
    format: (row) => row.Source,
  },
  {
    name: (
      <>
        <div>Customer</div>
      </>
    ),
    selector: (row) => row.Customer,
    wrap: true,
    sortable: true,
    format: (row) => row.Customer,
  },
  {
    name: (
      <>
        <div>
          <img className="mr-2" src={boxicon}></img>Status
        </div>
      </>
    ),
    button: true,
    style: {
      display: "block",
      textAlign: "left",
    },
    minWidth: "200px",
    cell: () => <Status>Download Poster</Status>,
  },
  {
    name: (
      <>
        <div>Price</div>
      </>
    ),
    selector: (row) => row.Reason,
    wrap: true,
    sortable: true,
    format: (row) => row.Reason,
  },
  {
    name: "Actions",
    button: true,
    minWidth: "300px",
    cell: () => <Actions>Download Poster</Actions>,
  },
];
const data = [
  {
    id: 0,
    caseId: "QT345",
    requester: "amohanty",
    Source: "10 days",
    Customer: "Hindalco",
    Reason: "$10",
    Progress: "Pending",
    Status: "Open",
    Consistencystatus: "Inconsistent",
    Description: "Solution for model 797F",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    year: "1988",
  },
  {
    id: 1,
    caseId: "QT345",
    requester: "amohanty",
    Source: "10 days",
    Customer: "Hindalco",
    Reason: "$10",
    Progress: "Pending",
    Status: "Open",
    Consistencystatus: "Inconsistent",
    Description: "Solution for model 797F",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    year: "1988",
  },
  {
    id: 2,
    caseId: "QT345",
    requester: "amohanty",
    Source: "10 days",
    Customer: "Hindalco",
    Reason: "$10",
    Progress: "Pending",
    Status: "Open",
    Consistencystatus: "Inconsistent",
    Description: "Solution for model 797F",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    year: "1988",
  },
  {
    id: 3,
    caseId: "QT345",
    requester: "amohanty",
    Source: "10 days",
    Customer: "Hindalco",
    Reason: "$10",
    Progress: "Pending",
    Status: "Open",
    Consistencystatus: "Inconsistent",
    Description: "Solution for model 797F",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
    year: "1988",
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      // backgroundColor: "#000"
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};
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
  const NoUserList = <Typography variant="body2">No users found!</Typography>;

  return (
    <div>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <h5 className="">Reports</h5>
          {/* <div className="card overflow-hidden">
                        <div className="activity-div bg-light-dark p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="font-weight-500 text-dark-black mb-0">Filter Criteria</h6>
                            </div>
                        </div>
                        <div className="row m-0 mt-4">
                            <div className="col-md-6 col-sm-12">
                                <div className="card overflow-hidden border p-2">
                                    <div class="span4 collapse-group">
                                        <div>
                                            <div class="collapse show" id="bysoluction">
                                                <BubbleChart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="card overflow-hidden border p-2">
                                    <div class="span4 collapse-group">
                                        <div>
                                            <a href="#" data-toggle="collapse" data-target="#bystatus"><span><i class="fa fa-angle-down f-s-16 mr-2" aria-hidden="true"></i></span><span className="font-weight-500">By Status</span></a>
                                            <div class="collapse show" id="bystatus">
                                                <p > Bars represent solutions</p>
                                            </div>
                                            <Chart1 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
                    marginBlock: 3,
                    marginInline: 5,
                  }}
                >
                  <TabList className="home-tabs-div" onChange={changeTab}>
                    <Tab label="Quotes" value={"quote"} className="home-tab" />
                    <Tab
                      label="Templates"
                      value={"templates"}
                      className="home-tab"
                    />
                    <Tab label="Kits" value={"kits"} className="home-tab" />
                    <Tab
                      label="Portfolio"
                      value={"portfolio"}
                      className="home-tab"
                    />
                    <Tab
                      label="Repair Option"
                      value={"repair"}
                      className="home-tab"
                    />
                    <Tab
                      label="Solutions"
                      value={"solution"}
                      className="home-tab"
                    />
                  </TabList>
                </Box>
                <TabPanel value="quote" sx={{ marginTop: 0 }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="templates">
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                        {/* <Divider sx={{ my: 2 }} />
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
                          expanded={templateExpanded === "usage"}
                          onChange={handleTemplateExpand("usage")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              % Usage
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
                        <Divider /> */}
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="kits">
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                        {/* <Divider sx={{ my: 2 }} />
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
                          expanded={kitExpanded === "usage"}
                          onChange={handleKitExpand("usage")}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              % Usage
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
                        <Divider /> */}
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="portfolio">
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="solution">
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{
                            backgroundColor: "#f3eafe",
                            //   borderRadius: 5, position: 'inherit'
                          }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="repair">
                  <Grid container>
                    <Grid item xs={3}>
                      <div style={{ margin: 10 }}>
                        <Accordion
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{
                            backgroundColor: "#f3eafe",
                            //   borderRadius: 5, position: 'inherit'
                          }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                          sx={{ backgroundColor: "#f3eafe" }}
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
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <Card style={{ margin: 10 }}>
                        <div className="activity-div bg-white p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="font-weight-500 text-dark-black mb-0">
                              Report type
                            </h6>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div
                            className="custom-table card "
                            style={{
                              height: 400,
                              width: "100%",
                              borderRadius: "0px",
                            }}
                          >
                            <DataTable
                              title=""
                              dense
                              //   selectableRows
                              columns={columns}
                              data={data}
                              customStyles={customStyles}
                              pagination
                            />
                          </div>
                        </div>
                      </Card>
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
