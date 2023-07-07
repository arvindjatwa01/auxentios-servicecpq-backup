import React, { useEffect, useState } from "react";
import { DashboardView } from "./DashboardView";
import { Link } from "react-router-dom";
import { ROOT } from "navigation/CONSTANTS";
import { UserList } from "./UserList";
import { CommanComponents } from "../../components/index";
import { MuiMenuComponent } from "../Operational/index";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chart1, TinyAreaBasic, BubbleChart } from "../Common/index";

import { getAllUsers, itemSearch } from "services";
import {
  Autocomplete,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  styled,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StatusStackedChart from "./StatusStackedChart";
import WinLossPieChart from "./WInLossPieChart";
import TopQuoteBarChart from "./TopQuoteBarChart";
const winLossData = [
  { name: "Win", value: 72 },
  { name: "Loss", value: 28 },
];

const top10Quote = [
  { name: "QT000012", value: 9899 },
  { name: "QT000022", value: 8787 },
  { name: "QT000031", value: 7622 },
  { name: "QT000043", value: 6522 },
  { name: "QT000091", value: 5423 },
  { name: "QT000099", value: 5029 },
  { name: "QT000110", value: 4820 },
  { name: "QT000123", value: 4712 },
  { name: "QT000142", value: 3510 },
  { name: "QT000155", value: 3473 },
];

const bottom10Quote = [
  { name: "QT000011", value: 1000 },
  { name: "QT000032", value: 1211 },
  { name: "QT000041", value: 1320 },
  { name: "QT000053", value: 1390 },
  { name: "QT000061", value: 1482 },
  { name: "QT000089", value: 1527 },
  { name: "QT000190", value: 1633 },
  { name: "QT000103", value: 1790 },
  { name: "QT000122", value: 1842 },
  { name: "QT000165", value: 1976 },
];
const lifeCycleStatusData = [
  {
    month: "Jan",
    draft: 400,
    waiting: 240,
    ready: 247,
    running: 325,
    done: 100,
  },
  {
    month: "Feb",
    draft: 300,
    waiting: 139,
    ready: 221,
    running: 325,
    done: 100,
  },
  {
    month: "March",
    draft: 200,
    waiting: 980,
    ready: 229,
    running: 325,
    done: 100,
  },
  {
    month: "Apr",
    draft: 278,
    waiting: 390,
    ready: 200,
    running: 325,
    done: 100,
  },
  {
    month: "May",
    draft: 189,
    waiting: 480,
    ready: 218,
    running: 325,
    done: 100,
  },
  {
    month: "June",
    draft: 239,
    waiting: 380,
    ready: 250,
    running: 100,
    done: 100,
  },
  {
    month: "July",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 140,
    done: 100,
  },
  {
    month: "Aug",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 231,
    done: 100,
  },
  {
    month: "Sept",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 300,
    done: 100,
  },
  {
    month: "Oct",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 175,
    done: 100,
  },
  {
    month: "Nov",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 250,
    done: 100,
  },
  {
    month: "Dec",
    draft: 349,
    waiting: 430,
    ready: 210,
    running: 325,
    done: 100,
  },
];

const items = {
  partsPrice: 2000,
  servicesPrice: 1001,
  consumablePrice: 2321,
  miscPrice: 7382,
  totalPrice: 12704,
};

const quoteSales = {
  categories: [
    { status: "In Progress", quantity: 60 },
    { status: "Sent to Customer", quantity: 71 },
    { status: "Accepted", quantity: 49 },
    { status: "Rejected", quantity: 32 },
  ],
  total: 112,
};
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: `linear-gradient(90deg, #6fa7ff 40%, #d06fff 100%)`
  },
}));
export const AnalyticsDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("cust_seg");
  const [topQuotes, setTopQuotes] = useState("top10");
  const handleTopQuotes = (event) => {
    setTopQuotes(event.target.value);
  };
  useEffect(() => {
    setIsLoading(true);
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
  const [catValues, setCatValues] = useState(["Sales", "Corporate", "Retail"]);
  const [catValue, setCatValue] = useState([]);

  const handeChangeType = (e) => {
    setType(e.target.value);
    if (e.target.value === "cust_seg") {
      setCatValues(["Sales", "Corporate", "Retail"]);
    } else {
      setCatValues(["992K", "992C"]);
    }
  };
  return (
    <div>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <h5 className="">Analytics</h5>
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 3,
              padding: 2,
            }}
          >
            <Grid item md={7} xs={12} container >
              <Card
                elevation={10}
                sx={{ borderRadius: 4, height: 400, width: "97%", mx: 2, my:1}}
                // variant="outlined"
              >
                <Typography className="m-3" style={{fontWeight: 600}}>Quote Performance</Typography>
                <Divider className="mb-3" />
                {quoteSales.categories.map(
                  (quote) =>
                    quote.status !== "Total Sales" && (
                      <>
                        <div style={{ display: "flex" }}>
                          <Typography
                            variant="caption"
                            sx={{ ml: 2, flexGrow: 1 }}
                          >
                            {quote.status}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ mr: 2, fontWeight: 600 }}
                          >
                            {quote.quantity}
                          </Typography>
                        </div>
                        <BorderLinearProgress
                          variant="determinate"
                          value={quote.quantity}
                          sx={{ mx: 2, mt: 1, mb: 3 }}
                        />
                      </>
                    )
                )}
                <Divider sx={{ mb: 2 }} />
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1, marginLeft: 10 }}>Total</div>
                  <div
                    style={{ fontSize: 18, marginRight: 20, fontWeight: 600 }}
                  >
                    {quoteSales.total}
                  </div>
                </div>
              </Card>
            </Grid>
            <Grid item md={5} xs={12} container >
              <Card
                elevation={10}
                sx={{ borderRadius: 4, height: 400, width: "97%", mx: 2, my:1}}
                // variant="outlined"
              >
                <div style={{ display: "flex" }}>
                  <Typography className="m-3" style={{ flexGrow: 1, fontWeight: 600}}>
                    Sales
                  </Typography>
                  <FormControl
                    style={{ minWidth: 140, marginBlock: "auto" }}
                    size="small"
                  >
                    <Select
                      value={type}
                      style={{ fontSize: 12, paddingLeft: 8 }}
                      onChange={handeChangeType}
                      input={<OutlinedInput />}
                    >
                      <MenuItem value={"cust_seg"} sx={{ marginLeft: 2 }}>
                        Customer Segment
                      </MenuItem>
                      <MenuItem value={"model"} sx={{ marginLeft: 2 }}>
                        Model
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Autocomplete
                    size="small"
                    defaultValue={catValues[0]}
                    value={catValue}
                    sx={{
                      fontSize: 12,
                      "& input": { fontSize: 12 },
                      marginBlock: "auto",
                      marginInline: 2,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ fontSize: 12, minWidth: 140 }}
                      />
                    )}
                    onChange={(event, newValue) => {
                      setCatValue(newValue);
                    }}
                    options={catValues}
                  />
                </div>
                <Divider />
                <Grid container className="mt-4">
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        marginBlock: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        marginInline: "auto",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Parts
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        $ {parseFloat(items.partsPrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        marginBlock: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        marginInline: "auto",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Services
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        $ {parseFloat(items.servicesPrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        marginBlock: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        marginInline: "auto",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Consumables
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        $ {parseFloat(items.consumablePrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        mt: 2,
                        mb: 5,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        marginInline: "auto",                      
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Misc
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        $ {parseFloat(items.miscPrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 2 }} />
                <div style={{ display: "flex" }}>
                  <div style={{ flexGrow: 1, marginLeft: 10 }}>Total</div>
                  <div
                    style={{ fontSize: 18, marginRight: 20, fontWeight: "600" }}
                  >
                    $ {parseFloat(items.totalPrice).toFixed(2)}
                  </div>
                </div>
              </Card>
            </Grid>
            {/* </div> */}
          </Grid>
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 3,
              padding: 2,
            }}
          >
            <Grid item xs={12} md={3} container >
              <Card
                sx={{ width: "97%", borderRadius: 4 , mx: 2, my:1}}
                elevation={10}
              >
                <Typography className="m-3" style={{fontWeight: 600}}>Win / Loss %</Typography>
                <Divider />
                <WinLossPieChart data={winLossData} />
              </Card>
            </Grid>
            <Grid item md={9} xs={12} container >
              <Card
              elevation={10}
                sx={{ width: "97%", borderRadius: 4 , mx: 2, my:1}}
              >
                <Typography className="m-3" style={{fontWeight: 600}}>Lifecycle Statuses</Typography>
                <Divider />
                <StatusStackedChart data={lifeCycleStatusData} />
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 3,
              padding: 2,
            }}
          >
            <Grid item sm={12} md={9} container >
              <Card
                            elevation={10}
                sx={{ width: "97%", borderRadius: 4 , mx: 2, my:1}}
              >
                <Typography className="m-3" style={{fontWeight: 600}}>               

                  {topQuotes === "top10" ? "Top 10 Quotes" : "Bottom 10 Quotes"} </Typography>
                  <RadioGroup sx={{marginInline: 2}} row value={topQuotes} onChange={handleTopQuotes}>
                    <FormControlLabel
                      label={
                        <Typography sx={{ fontSize: 14 }}>Top 10</Typography>
                      }
                      control={<Radio />}
                      value={"top10"}
                    />
                    <FormControlLabel
                      label={
                        <Typography sx={{ fontSize: 14 }}>Bottom 10</Typography>
                      }
                      control={<Radio />}
                      value={"bottom10"}
                    />
                  </RadioGroup>

                <Divider />
                <TopQuoteBarChart
                  data={topQuotes === "top10" ? top10Quote : bottom10Quote}
                />
              </Card>
            </Grid>
            <Grid item md={3} sm={12} container >
              <Card
              elevation={10}
                sx={{ width: "97%", borderRadius: 4 , mx: 2, my:1}}
              >
                <Grid container className="mt-4">
                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 3,
                        marginInline: "auto",
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        paddingBlock : 3
                      }}
                      className="row"
                    >
                      <div
                        style={{ fontSize: 18, color: "gray" }}
                        className="col-md-9"
                      >
                        Parts
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        48 %
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 3,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        paddingBlock : 3,
                        marginInline: "auto",
                      }}
                      className="row"
                    >
                      <div
                        style={{ fontSize: 18, color: "gray" }}
                        className="col-md-9"
                      >
                        Solutions
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        67 %
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 3,
                        borderRadius: 3,
                        marginInline: "auto",
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                        paddingBlock : 3
                      }}
                      className="row"
                    >
                      <div
                        style={{ fontSize: 18, color: "gray" }}
                        className="col-md-9"
                      >
                        Repair
                      </div>
                      <div style={{ fontSize: 18, fontWeight: "600" }}>
                        49 %
                      </div>
                    </Card>
                  </Grid>
                  </Grid>
              </Card>
            </Grid>
          </Grid>
          {/* <div className="row mt-4">
            <div className="col-md-4 col-sm-6">
              <div className="card overflow-hidden">
                <div className="activity-div bg-light-dark p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-500 text-dark-black mb-0">
                      Total Estimations <b>$</b>
                    </h6>
                    <MuiMenuComponent options={workFlowOptions} />
                  </div>
                </div>
                <div className="p-3">
                  <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6">
                      <TinyAreaBasic />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-6">
              <div className="card overflow-hidden">
                <div className="activity-div bg-light-green p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="font-weight-500 text-dark-black mb-0">
                      Time To Build
                    </h6>
                    <MuiMenuComponent options={transOptions} />
                  </div>
                </div>
                <div className="row m-0 mt-4">
                  <div className="col-md-12 col-sm-12">
                    <div className="card overflow-hidden border p-2">
                      <div class="span4 collapse-group">
                        <div>
                          <div class="collapse show" id="bysoluction">
                            <Chart1 />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="activity-div bg-light-dark p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="font-weight-500 text-dark-black mb-0">
                  Conversion
                </h6>
                <MuiMenuComponent options={transOptions} />
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
                      <a
                        href="#"
                        data-toggle="collapse"
                        data-target="#bystatus"
                      >
                        <span>
                          <i
                            class="fa fa-angle-down f-s-16 mr-2"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="font-weight-500">By Status</span>
                      </a>
                      <div class="collapse show" id="bystatus">
                        <p> Bars represent solutions</p>
                      </div>
                      <Chart1 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
