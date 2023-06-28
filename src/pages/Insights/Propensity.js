import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Card, Divider, Grid } from "@mui/material";
import { getPropensityToBuy } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

const propensityValues = [
  { propensitylabel: "low", networthlabel: "low", value: "10%" },
  { propensitylabel: "low", networthlabel: "high", value: "12%" },
  { propensitylabel: "low", networthlabel: "medium", value: "15%" },
  { propensitylabel: "medium", networthlabel: "low", value: "2%" },
  { propensitylabel: "medium", networthlabel: "medium", value: "23%" },
  { propensitylabel: "medium", networthlabel: "high", value: "18%" },
  { propensitylabel: "high", networthlabel: "low", value: "2%" },
  { propensitylabel: "high", networthlabel: "medium", value: "21%" },
  { propensitylabel: "high", networthlabel: "high", value: "39%" },
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
  const handleClickPropensity = (propensityLabel, netGrowthLabel) => {
    setShowCustomerDetail(true);
  };
  const customerDetailColumns = [
    { field: "customerId", headerName: "Customer ID", width: 70 },
    { field: "customerName", headerName: "Customer Name", width: 130 },
    { field: "customerGroup", headerName: "Customer Group", width: 130 },
    { field: "customerSegment", headerName: "Customer Segment", width: 130 },
    { field: "customerLabel", headerName: "Customer Label", width: 130 },
    { field: "lastPurchaseDate", headerName: "Last Purchase Date", width: 130 },
    { field: "recency", headerName: "Recency", width: 130 },
    { field: "frequency", headerName: "Frequency", width: 130 },
    { field: "monetary", headerName: "Monetary", width: 130 },
    { field: "minDiscount", headerName: "Min Discount", width: 130 },
    { field: "maxDiscount", headerName: "Max Discount", width: 130 },
    { field: "ageDiscount", headerName: "Age Discount", width: 130 },
    { field: "equipmentNo", headerName: "Equipment #", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "maker", headerName: "Maker", width: 130 },
    { field: "serialNo", headerName: "Maker Serial#", width: 130 },
    { field: "modelPrefix", headerName: "Model Prefix", width: 130 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "productSegment", headerName: "Product Segment", width: 130 },
    {
      field: "warrantyAvailability",
      headerName: "Warranty Availability",
      width: 130,
    },
    { field: "plannedUsage", headerName: "Planned Usage", width: 130 },
    { field: "warranty", headerName: "Warranty", width: 130 },
    { field: "contract", headerName: "Contract", width: 130 },
    { field: "propensityScore", headerName: "Propensity Score", width: 130 },
    { field: "propensityLabel", headerName: "Propensity Label", width: 130 },
  ];

  const customerDetail = [
    {
      id: 1,
      customerId: "123",
      customerName: "Customer Name",
      customerGroup: "Customer Group",
      customerSegment: "Customer Segment",
      customerLabel: "Customer Label",
      lastPurchaseDate: "Last Purchase Date",
      recency: "Recency",
      frequency: "Frequency",
      monetary: "Monetary",
      minDiscount: "Min Discount",
      maxDiscount: "Max Discount",
      ageDiscount: "Age Discount",
      equipmentNo: "Equipment #",
      description: "Description",
      maker: "Maker",
      serialNo: "Maker Serial#",
      modelPrefix: "Model Prefix",
      model: "Model",
      brand: "Brand",
      productSegment: "Product Segment",
      warrantyAvailability: "Warranty Availability",
      plannedUsage: "Planned Usage",
      warranty: "Warranty",
      contract: "Contract",
      propensityScore: "Propensity Score",
      propensityLabel: "Propensity Label",
    },
  ];
  return isLoading ? (
    <LoadingProgress />
  ) : (
    <div>
      {/* <h5 className="">Propensity to buy</h5> */}
      {showCustomerDetail ? (
        <div>
            <Typography sx={{fontSize: 14, fontWeight: 600}}>Propensity to Buy Details</Typography>
          <DataGrid
            sx={GRID_STYLE}
            rows={customerDetail}
            columns={customerDetailColumns}
            pageSize={5}
            rowsPerPageOptions={[10, 20, 50]}
            autoHeight
          />{" "}
        </div>
      ) : (
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
          <Card
            className="mr-2"
            sx={{
              borderRadius: 4,
              height: 500,
              width: "100%",
              marginInline: "auto",
            }}
            variant="outlined"
          >
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
                                object.propensity_label === indArray[0] &&
                                object.networth_label === indArray[1]
                            )[0]?.percentage_value
                          }
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
            </Grid>
          </Card>
          {/* </div> */}
        </Grid>
      )}
    </div>
  );
}
