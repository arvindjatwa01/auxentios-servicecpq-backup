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
import { Autocomplete, Card, Divider, FormControl, Grid, MenuItem, OutlinedInput, Select, TextField, styled } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StatusStackedChart from "./StatusStackedChart";
import WinLossPieChart from "./WInLossPieChart";

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
    categories:[
  { status: "In Progress", quantity: 37 },
  { status: "Sent to Customer", quantity: 31 },
  { status: "Accepted", quantity: 24 },
  { status: "Rejected", quantity: 29 },
  ],
  "total" :  112 

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
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export const AnalyticsDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('cust_seg')

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
    setType(e.target.value)
    if(e.target.value === "cust_seg"){
        setCatValues(["Sales", "Corporate", "Retail"]);
    } else {
        setCatValues(["992K", "992C"]);
    }
  }
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
            <Grid item xs={8}>
              <Card
                className="mr-2"
                sx={{ borderRadius: 4, height: 400, mx: 1 }}
                variant="outlined"
              >
                <Typography className="m-3">Quote Performance</Typography>
                <Divider className="mb-3"/>
                {quoteSales.categories.map(
                  (quote) =>
                    quote.status !== "Total Sales" && (
                      <>
                      <div style={{display: 'flex'}}>
                        <Typography variant="caption" sx={{ ml: 2, flexGrow: 1}}>
                          {quote.status}
                        </Typography>
                        <Typography variant="body1" sx={{mr: 2, fontWeight: 600}}>
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
                <Divider sx={{mb:2}} />
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1, marginLeft: 10}}>
                        Total
                    </div>
                    <div style={{ fontSize: 18, marginRight: 5,  fontWeight: 600 }}>
                        {quoteSales.total}
                    </div>
                </div>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                className="mr-2"
                sx={{ borderRadius: 4, height: 400 }}
                variant="outlined"
              >
                <div style={{display: 'flex'}}>
                <Typography className="m-3" style={{flexGrow: 1}}>Sales</Typography>
                <FormControl style={{ minWidth: 130, marginBlock: 'auto' }} size="small">
                <Select
                    value={type}
                    style={{ fontSize: 12  }}
                    onChange={handeChangeType}
                    input={<OutlinedInput />}
                >
                    <MenuItem value={"cust_seg"} sx={{ marginLeft: 2,}}>Customer Segment</MenuItem>
                    <MenuItem value={"model"} sx={{ marginLeft: 2,}}>Model</MenuItem>
                </Select>
                </FormControl>
                <Autocomplete
                    size="small"
                    defaultValue={catValues[0]}
                    value={catValue}
                    sx={{fontSize: 12, '& input': {fontSize: 12}, marginBlock: 'auto', marginInline: 2}}
                    renderInput={(params) => <TextField {...params} style={{ fontSize: 12, minWidth: 100, }}/>}
                    onChange={(event, newValue) => {
                        setCatValue(newValue);
                      }}
                    options ={catValues}
                    />
                
                </div>
                <Divider />
                <Grid container className="mt-4">
                  <Grid item xs={6} >
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Parts
                      </div>
                      <div style={{ fontSize: 18, fontWeight: '600' }}>$ { parseFloat(items.partsPrice).toFixed(2)}</div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Services
                      </div>
                      <div style={{ fontSize: 18, fontWeight: '600' }}>
                        $ {parseFloat(items.servicesPrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 2,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Consumables
                      </div>
                      <div style={{ fontSize: 18, fontWeight: '600' }}>
                        $ {parseFloat(items.consumablePrice).toFixed(2)}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 1,
                        m: 2,
                        mb: 5,
                        borderRadius: 3,
                        backgroundColor: "#f6f6f6",
                        width: "90%",
                      }}
                    >
                      <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                        Misc
                      </div>
                      <div style={{ fontSize: 18, fontWeight: '600' }}>$ {parseFloat(items.miscPrice).toFixed(2)}</div>
                    </Card>
                  </Grid>
                </Grid>
                <Divider sx={{mb:2}}/>
                <div style={{display: 'flex'}}>
                    <div style={{flexGrow: 1, marginLeft: 10}}>
                        Total
                    </div>
                    <div style={{ fontSize: 18, marginRight: 5, fontWeight: '600' }}>
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
             <Grid item xs={3}>
                
                <Card
                  sx={{ width: "98%", marginInline: "auto", borderRadius: 5 }}
                >
                  <Typography className="m-3">Win / Loss %</Typography>
                  <Divider />
                  <WinLossPieChart data={lifeCycleStatusData}/>
                </Card>
              </Grid>
            <Grid item xs={9}>
                
              <Card
                sx={{ width: "98%", marginInline: "auto", borderRadius: 5 }}
              >
                <Typography className="m-3">Lifecycle Statuses</Typography>
                <Divider />
                <StatusStackedChart data={lifeCycleStatusData}/>
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
