import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Box, Card, Divider, Grid, Tooltip } from "@mui/material";
import { getPropensityDetails, getPropensityToBuy } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import FilterOptions from "./SliderCompnent";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
}))

const CustomToolbar = ({ setColumnButtonEl }) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'end' }}>
      <GridToolbarColumnsButton ref={setColumnButtonEl} />
    </GridToolbarContainer>
  );
}

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
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [columnButtonEl, setColumnButtonEl] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [propensityDetails, setPropensityDetails] = useState([]);
  const [selPropensityLevel, setSelPropensityLevel] = useState("");
  const [selTransactionLevel, setSelTransactionLevel] = useState("");
  const [transValueRange, setTransValueRange] = useState([1000, 10000]);
  const [minTransValue, setMinTransValue] = useState(1000);
  const [maxTransValue, setMaxTransValue] = useState(10000)
  const [propensityScoreRange, setPropensityScoreRange] = useState([0, 100]);
  const [minPropScore, setMinPropScore] = useState(0);
  const [maxPropScore, setMaxPropScore] = useState(100)
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

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    last_purchase: false,
    recency: false,
    frequency: false,
    min_discount: false,
    max_discount: false,
    avg_discount: false,
    equipment_no: false,
    description: false,
    maker: false,
    maker_serial_num: false,
    model_prefix: false,
    model: false,
    brand: false,
    product_segment: false,
    warranty_availability: false,
    planned_usage: false,
    warranty: false,
    contract: false,
  })
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
    { field: "customer_id", headerName: "Customer ID", minWidth: 80, flex: 1 },
    { field: "customer_name", headerName: "Customer Name", minWidth: 130, flex: 1 },
    { field: "customer_group", headerName: "Customer Group", minWidth: 130, flex: 1 },
    { field: "customer_segment", headerName: "Customer Segment", minWidth: 130, flex: 1 },
    { field: "customer_level", headerName: "Customer Level", minWidth: 100, flex: 1 },
    { field: "last_purchase", headerName: "Last Purchase Date", minWidth: 130, flex: 1 },
    { field: "recency", headerName: "Recency", width: 100 },
    { field: "frequency", headerName: "Frequency", width: 100 },
    { field: "transaction_value", headerName: "Transaction Value", minWidth: 130, flex: 1 },
    { field: "transaction_level", headerName: "Transaction Level", minWidth: 130, flex: 1 },
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
      >
        <Card
          sx={{
            borderRadius: 4,
            height: 700,
            width: "100%",
            margin: 2,
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
            <Grid item xs={6} lg={4}>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {propensityMatrix.map((indArray) => (
                  <Grid item container xs={4} justifyContent={'center'} alignItems={'center'}>
                    <Tooltip title="Click here to know the details" >
                      <Card
                        variant="outlined"
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 2,
                          backgroundColor: indArray[2],
                          height: 150,
                          width: 150,
                          transition: "transform 0.15s ease-in-out",
                          ':hover': { transform: "scale3d(1.05, 1.05, 1)" },
                        }}
                        onClick={() =>
                          handleClickPropensity(indArray[0], indArray[1])
                        }
                        style={{ cursor: "pointer" }}
                      >
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
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item container xs={3} md={4} sx={{ marginTop: 8, marginInline: 5 }}>
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
            <Grid item xs={6} lg={4} sx={{ marginTop: 5 }}>
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
        </Card>
        {/* </div> */}
        {showCustomerDetail && (
          <Card sx={{
            width: "100%",
            paddingInline: 3, backgroundColor: '#ffffff', borderRadius: 4, margin: 2
          }}>
            <Grid container marginY={3}>
              <Grid item xs={9} container direction={'row'} alignItems={'center'}>
                <Typography sx={{ fontSize: 16, fontWeight: 600, mr: 1 }}>
                  Propensity to Buy Details
                </Typography>
                (
                <Typography sx={{ fontSize: 12, marginRight: 2 }}>
                  <strong>Propensity Level : </strong> {selPropensityLevel}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  <strong>Transaction Level : </strong> {selTransactionLevel}
                </Typography>)

              </Grid>
              <Grid item container xs={3} justifyContent={'end'}>
                <button
                  class="btn bg-primary text-white"
                  onClick={() => console.log(rowSelectionModel)}
                >
                  Create CRM Leads
                </button>
              </Grid>
            </Grid>
            <Grid Container >
              <Grid item container xs={12} columnSpacing={1}>
                <Grid item xs={4} container justifyContent={'start'} alignItems={'center'}>
                  <FilterOptions name={'Transaction $'} sliderRange={transValueRange} setSliderRange={setTransValueRange} min={minTransValue} max={maxTransValue} />
                </Grid>
                <Grid item xs={4} container justifyContent={'start'} alignItems={'center'}>
                  <FilterOptions name='Propensity' sliderRange={propensityScoreRange} setSliderRange={setPropensityScoreRange} min={minPropScore} max={maxPropScore} />
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ height: 500 }}>
              <DataGrid
                loading={isLoadingTable}
                getRowId={(row) => row.customer_id + row.equipment_no}
                sx={GRID_STYLE}
                rows={propensityDetails}
                columns={customerDetailColumns}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setColumnVisibilityModel(newModel)
                }
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50]}
                checkboxSelection
                // keepNonExistentRowsSelected
                onSelectionModelChange={(newRowSelectionModel) => {
                  console.log(newRowSelectionModel)
                  setRowSelectionModel(newRowSelectionModel);
                }}
                selectionModel={rowSelectionModel}
                components={{
                  Toolbar: CustomToolbar,
                }}
                componentsProps={{
                  panel: {
                    anchorEl: columnButtonEl,
                    placement: "bottom-end"
                  },
                  toolbar: {
                    setColumnButtonEl
                  }
                }}
                localeText={{ toolbarColumns: "Select Columns" }}
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
        )}
      </Grid>
    </div>
  );
}
