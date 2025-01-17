import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
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
import {
  getBottomTen,
  getQuoteLifeCycleStatus,
  getQuotePerformance,
  getQuoteWinLoss,
  getTopTen
} from "services/dashboardServices";
import StatusStackedChart from "./StatusStackedChart";
import TopQuoteBarChart from "./TopQuoteBarChart";
import WinLossPieChart from "./WInLossPieChart";

const CardWrapper = ({ label, value }) => {
  return (<Grid item xs={6}>
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
        style={{ fontSize: 12, color: "gray", marginBlock: 15 }}
      >
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: "600" }}>
        $ {parseFloat(value).toFixed(2)}
      </div>
    </Card>
  </Grid>)
}
const TOP_TEN = "top10";
const TOP_TEN_QUOTES = "Top 10 Quotes";
const BOTTOM_TEN_QUOTES = "Bottom 10 Quotes";

//Temporary mock data
const items = {
  partsPrice: 2000,
  servicesPrice: 1001,
  consumablePrice: 2321,
  miscPrice: 7382,
  totalPrice: 12704,
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
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("cust_seg");
  const [totalQuotes, setTotalQuotes] = useState(0);
  const [orderQuotes, setOrderQuotes] = useState(TOP_TEN);
  const [quotePerformance, setQuotePerformance] = useState([]);
  const [winLossData, setWinLossData] = useState([]);
  const [topQuotes, setTopQuotes] = useState([]);
  const [bottomQuotes, setBottomQuotes] = useState([]);
  const [percentageValues, setPercentageValues] = useState([]);
  const [lifeCycleStatusData, setLifeCycleStatus] = useState([]);

  const handleOrderQuotes = (event) => {
    setOrderQuotes(event.target.value);
  };
  useEffect(() => {
    fetchDetails()
  }, []);
  useEffect(() => {
    if (orderQuotes === TOP_TEN) {
      getTopTen().then(data => {
        setTopQuotes(data.quoteDetails);
        setPercentageValues(
          [{ label: "Parts", value: data.parts },
          { label: "Solutions", value: data.solutions },
          { label: "Repair", value: data.repair }])
      });
    } else {
      getBottomTen().then(data => {
        setBottomQuotes(data.quoteDetails);
        setPercentageValues(
          [{ label: "Parts", value: data.parts },
          { label: "Solutions", value: data.solutions },
          { label: "Repair", value: data.repair }])
      });
    }
  }, [orderQuotes]);
  const fetchDetails = async () => {
    setIsLoading(true);
    let tempArr = [];
    await getQuotePerformance()
      .then(performance => {
        setQuotePerformance(performance);
        const total = performance?.reduce((accumulator, object) => {
          return accumulator + object.quoteCount;
        }, 0);
        setTotalQuotes(total)
      })
      .catch(e => {
        setQuotePerformance([]);
      });
    await getQuoteWinLoss().then(data => {
      setWinLossData([
        { name: "Win", value: parseFloat(data?.[0]["Win%"]) },
        { name: "Loss", value: parseFloat(data?.[0]["Loss%"]) }]);
    }).catch(e => {
      setWinLossData([])
    });
    await getQuoteLifeCycleStatus().then(data => {
      data.map(indData => {
        let month = indData.month + "'" + indData.year.substring(2);
        const result = indData?.quoteDetails.reduce((obj, cur) => ({ ...obj, [cur.quoteStatus]: cur.quoteCount }), {})
        tempArr.push({ month, ...result })
      })
      setLifeCycleStatus(tempArr);
    });
    setOrderQuotes(TOP_TEN);
    setIsLoading(false);
  }
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
  const orderedQuotes = <Grid
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
        sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
      >
        <Typography className="m-3" style={{ fontWeight: 600 }}>
          {orderQuotes === TOP_TEN ? TOP_TEN_QUOTES : BOTTOM_TEN_QUOTES}
        </Typography>
        <RadioGroup
          sx={{ marginInline: 2, width: "23%", justifyContent: 'space-between' }}
          row value={orderQuotes} onChange={handleOrderQuotes}>
          <FormControlLabel
            label={<Typography sx={{ fontSize: 14, marginRight: 2 }}>Top 10</Typography>}
            control={<Radio />}
            value={TOP_TEN}
          />
          <FormControlLabel
            label={
              <Typography sx={{ fontSize: 14 }}>Bottom 10</Typography>
            }
            control={<Radio />}
            value={"bottom10"}
          />
        </RadioGroup>
        <Divider sx={{ my: 1 }} />
        <TopQuoteBarChart data={orderQuotes === TOP_TEN ? topQuotes : bottomQuotes} />
      </Card>
    </Grid>
    <Grid item md={3} sm={12} container >
      <Card
        elevation={10}
        sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
      >
        <Grid container className="mt-4">
          {percentageValues?.map(percentageValue =>
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
                  paddingBlock: 3,
                  justifyContent: 'space-between'
                }}
                className="row"
              >
                <div
                  style={{ fontSize: 18, color: "gray" }}
                >
                  {percentageValue.label}
                </div>
                <div style={{ fontSize: 18, fontWeight: "600" }}>
                  {percentageValue.value} %
                </div>
              </Card>
            </Grid>)}
        </Grid>
      </Card>
    </Grid>
  </Grid>
  const winLossChart = <Grid item xs={12} md={3} container >
    <Card
      sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
      elevation={10}
    >
      <Typography className="m-3" style={{ fontWeight: 600 }}>Win / Loss %</Typography>
      <Divider />
      <WinLossPieChart data={winLossData} />
    </Card>
  </Grid>
  const lifeCycleStatusChart = <Grid item md={9} xs={12} container >
    <Card
      elevation={10}
      sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
    >
      <Typography className="m-3" style={{ fontWeight: 600 }}>Lifecycle Statuses</Typography>
      <Divider />
      <StatusStackedChart data={lifeCycleStatusData} />
    </Card>
  </Grid>
  return (
    <div>
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
                sx={{ borderRadius: 4, height: 460, width: "97%", mx: 2, my: 1 }}
              // variant="outlined"
              >
                <Typography className="m-3" style={{ fontWeight: 600 }}>Quote Performance</Typography>
                <Divider className="mb-3" />
                {quotePerformance?.length !== 0 ?
                  <div>{quotePerformance.map(
                    (quote) =>
                      <>
                        <div style={{ display: "flex", marginInline: 15 }}>
                          <Typography
                            variant="caption"
                            sx={{ flexGrow: 1 }}
                          >
                            {quote.category}
                          </Typography>
                          <Typography style={{ fontSize: 15, fontWeight: 600 }}>
                            {quote.quoteCount}
                          </Typography>
                        </div>
                        <BorderLinearProgress
                          variant="determinate"
                          value={quote.quoteCount}
                          sx={{ mx: 2, mt: 1, mb: 3 }}
                        />
                      </>

                  )}
                    <Divider sx={{ mb: 2 }} />
                    <div style={{ display: "flex" }}>
                      <div style={{ flexGrow: 1, marginLeft: 10 }}>Total</div>
                      <div
                        style={{ fontSize: 18, marginRight: 20, fontWeight: 600 }}
                      >
                        {totalQuotes}
                      </div>
                    </div>
                  </div> :
                  <Box sx={{ display: 'flex', height: "80%", alignItems: 'center', justifyContent: 'center', }}>
                    <Typography textAlign={'center'} variant='h6' color={'gray'}>Quote performance data not available</Typography>
                  </Box>
                }
              </Card>
            </Grid>
            <Grid item md={5} xs={12} container >
              <Card
                elevation={10}
                sx={{ borderRadius: 4, height: 460, width: "97%", mx: 2, my: 1 }}
              // variant="outlined"
              >
                <div style={{ display: "flex" }}>
                  <Typography className="m-3" style={{ flexGrow: 1, fontWeight: 600 }}>
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
                  <CardWrapper label="Parts" value={items.partsPrice} />
                  <CardWrapper label="Services" value={items.servicesPrice} />
                  <CardWrapper label="Consumables" value={items.consumablePrice} />
                  <CardWrapper label="Misc." value={items.miscPrice} />
                </Grid>
                <Box sx={{ padding: 1, mt: 1 }} ></Box>
                <Divider sx={{ mt: 5, mb: 2 }} />
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
            {winLossChart}
            {lifeCycleStatusChart}
          </Grid>
          {orderedQuotes}
        </div >
      </div >
    </div >
  );
};
