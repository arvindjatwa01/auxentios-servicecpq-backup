import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Box, Card, Divider, Grid } from "@mui/material";
import { getPropensityDetails, getPropensityToBuy } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

const propensityValues = [
  { propensity_level: "low", transaction_level: "low", value: "10%" },
  { propensity_level: "low", transaction_level: "high", value: "12%" },
  { propensity_level: "low", transaction_level: "medium", value: "15%" },
  { propensity_level: "medium", transaction_level: "low", value: "2%" },
  { propensity_level: "medium", transaction_level: "medium", value: "23%" },
  { propensity_level: "medium", transaction_level: "high", value: "18%" },
  { propensity_level: "high", transaction_level: "low", value: "2%" },
  { propensity_level: "high", transaction_level: "medium", value: "21%" },
  { propensity_level: "high", transaction_level: "high", value: "39%" },
];

const propensityMatrix = [
  ["low", "low", "#ff6493"],
  ["medium", "low", "#00b8b0"],
  ["high", "low", "#00b8b0"],
  ["low", "medium", "#ff6493"],
  ["medium", "medium", "#872ff7"],
  ["high", "medium", "#00b8b0"],
  ["low", "high", "#872ff7"],
  ["medium", "high", "#872ff7"],
  ["high", "high", "#00b8b0"],
];

export default function Propensity(props) {
  const [propensityData, setPropensityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getPropensityToBuy()
      .then((res) => {
        setPropensityData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setPropensityData([]);
        setIsLoading(false);
      });

    return () => {
      console.log("axios cleanup.");
    };
  }, []);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [propensityDetails, setPropensityDetails] = useState([]);
  const [selPropensityLevel, setSelPropensityLevel] = useState("");
  const [selTransactionLevel, setSelTransactionLevel] = useState("");

  const handleClickPropensity = (propensityLevel, transactionLevel) => {
    setIsLoadingTable(true);
    setPropensityDetails([]);
    setSelPropensityLevel(propensityLevel);
    setSelTransactionLevel(transactionLevel);
    getPropensityDetails(propensityLevel, transactionLevel).then((res) => {
      setPropensityDetails(res);
      setIsLoadingTable(false);
    })
      .catch((err) => {
        console.log("axios err=", err);
        setPropensityDetails([]);
        setIsLoadingTable(false);
      });
    setShowCustomerDetail(true);
  };
  const customerDetailColumns = [
    { field: "customer_id", headerName: "Customer ID", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 130 },
    { field: "customer_group", headerName: "Customer Group", width: 130 },
    { field: "customer_segment", headerName: "Customer Segment", width: 130 },
    { field: "customer_level", headerName: "Customer Level", width: 130 },
    { field: "last_purchase", headerName: "Last Purchase Date", width: 130 },
    { field: "recency", headerName: "Recency", width: 100 },
    { field: "frequency", headerName: "Frequency", width: 100 },
    { field: "transaction_value", headerName: "Transaction Value", width: 100 },
    { field: "transaction_level", headerName: "Transaction Level", width: 100 },
    { field: "min_discount", headerName: "Min Discount", width: 100 },
    { field: "max_discount", headerName: "Max Discount", width: 100 },
    { field: "avg_discount", headerName: "Avg Discount", width: 100 },
    { field: "equipment_no", headerName: "Equipment #", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "maker", headerName: "Maker", width: 130 },
    { field: "maker_serial_num", headerName: "Maker Serial#", width: 130 },
    { field: "model_prefix", headerName: "Model Prefix", width: 130 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "product_segment", headerName: "Product Segment", width: 130 },
    {
      field: "warranty_availability",
      headerName: "Warranty Availability",
      width: 130,
    },
    { field: "planned_usage", headerName: "Planned Usage", width: 130 },
    { field: "warranty", headerName: "Warranty", width: 130 },
    { field: "contract", headerName: "Contract", width: 130 },
    { field: "propensity_score", headerName: "Propensity Score", width: 130 },
    { field: "propensity_level", headerName: "Propensity Level", width: 130 },
  ];

  const [pageSize, setPageSize] = useState(5);
  return (
    <div>
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#f3eafe",
          borderRadius: 5,
          marginBlock: 3,
          padding: 2,
        }}
      >{showCustomerDetail ? (
        <Card sx={{
          width: "100%",
          marginInline: "auto", paddingInline: 3, backgroundColor: '#ffffff', borderRadius: 4
        }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, marginBlock: 2 }}>
            Propensity to Buy Details
          </Typography>
          <div style={{ display: "flex", marginBlock: 4 }}>
            <Typography sx={{ fontSize: 14, marginRight: 2 }}>
              {" "}
              <strong>Propensity Level : </strong> {selPropensityLevel}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              <strong>Transaction Level : </strong> {selTransactionLevel}
            </Typography>
          </div>
          <Box sx={{ height: 500 }}>
            <DataGrid
              loading={isLoadingTable}
              getRowId={(row) => row.customer_id}
              sx={GRID_STYLE}
              rows={propensityDetails}
              columns={customerDetailColumns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50]}
            // autoHeight
            /></Box>
          <div
            className="row"
            style={{ justifyContent: "right", marginInline: 9, marginBlock: 7 }}
          >
            <button
              class="btn bg-primary text-white"
              onClick={() => setShowCustomerDetail(false)}
            >
              Back
            </button>
          </div>
        </Card>
      ) : (
        <Card
          className="mr-2"
          sx={{
            borderRadius: 4,
            height: 500,
            width: "100%",
            marginInline: "auto",
          }}
          variant="outlined"
        >{isLoading ? <LoadingProgress /> :
          <Grid container sx={{ marginBlock: 5, marginInline: 5 }}>
            <Grid item container xs={3}>
              <Grid
                item
                container
                xs={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                $ Value of Transaction
              </Grid>
              <Grid
                item
                container
                xs={1}
                direction="row"
                justifyContent={"end"}
              >
                <Divider orientation="vertical" flexItem />
              </Grid>
              <Grid
                item
                container
                xs={5}
                direction="row"
                justifyContent={"end"}
              >
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  Low
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  Medium
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  High
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                {propensityMatrix.map((indArray) => (
                  <Grid item xs={4}>
                    <Card
                      variant="outlined"
                      sx={{
                        paddingInline: "auto",
                        paddingBlock: 4,
                        marginBlock: 1,
                        borderRadius: 2,
                        backgroundColor: indArray[2],
                        width: "90%",
                        marginInline: "auto",
                      }}
                      onClick={() =>
                        handleClickPropensity(indArray[0], indArray[1])
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {/* <div
                        style={{ fontSize: 12, color: "gray", marginBlock: 10 }}
                      >
                      </div> */}
                      <Typography
                        textAlign="center"
                        style={{ fontSize: 18, fontWeight: "600" }}
                      >
                        {
                          propensityData.filter(
                            (object) =>
                              object.propensity_level === indArray[0] &&
                              object.transaction_level === indArray[1]
                          )[0]?.percentage_value
                        }{" "}
                        %
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item container xs={2}>
              <Grid item xs={12} display="flex">
                <StopIcon sx={{ color: "#00b8b0", marginInline: 1 }} />
                <Typography variant="body2">
                  <strong>Focus Sales Efforts</strong>: On the fence of
                  buying, but win rates and values are higher
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex">
                <StopIcon sx={{ color: "#872ff7", marginInline: 1 }} />
                <Typography variant="body2">
                  <strong>Avoid Overinvesting Effort</strong>: Propensity to
                  buy is already high or value is low
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex">
                <StopIcon sx={{ color: "#ff6493", marginInline: 1 }} />
                <Typography variant="body2">
                  <strong>Invest only minimum Effort</strong>: Win rate,
                  propensity-to-buy and value are all lower
                </Typography>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid
                  item
                  container
                  xs={4}
                  direction="row"
                  justifyContent={"center"}
                >
                  Low
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  direction="row"
                  justifyContent={"center"}
                >
                  Medium
                </Grid>
                <Grid
                  item
                  container
                  xs={4}
                  direction="row"
                  justifyContent={"center"}
                >
                  High
                </Grid>
              </Grid>
              <Divider sx={{ marginBlock: 3 }} />
              <Grid container>
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justifyContent={"center"}
                >
                  Propensity-to-buy score
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>}
        </Card>)}
        {/* </div> */}
      </Grid>
    </div>
  );
}
