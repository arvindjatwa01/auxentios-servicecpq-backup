import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";


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
    { status: "In Progress", quantity: 37 },
    { status: "Sent to Customer", quantity: 31 },
    { status: "Accepted", quantity: 24 },
    { status: "Rejected", quantity: 29 },
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
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export default function EntitlementMatrix() {
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
          <h5 className="">Propensity to buy</h5>
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
                    style={{ fontSize: 18, marginRight: 5, fontWeight: 600 }}
                  >
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
                <div style={{ display: "flex" }}>
                  <Typography className="m-3" style={{ flexGrow: 1 }}>
                    Sales
                  </Typography>
                  <FormControl
                    style={{ minWidth: 130, marginBlock: "auto" }}
                    size="small"
                  >
                    <Select
                      value={type}
                      style={{ fontSize: 12 }}
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
                        style={{ fontSize: 12, minWidth: 100 }}
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
                        p: 1,
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
                    style={{ fontSize: 18, marginRight: 5, fontWeight: "600" }}
                  >
                    $ {parseFloat(items.totalPrice).toFixed(2)}
                  </div>
                </div>
              </Card>
            </Grid>
            {/* </div> */}
          </Grid>
          
         
                  </div>
      </div>
    </div>
  );
};
