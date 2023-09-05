import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Box, Card, Divider, Grid } from "@mui/material";
import { getPartsSegmentDetails,  getPartsSegment } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

const partsSegmentValues = [
  { cluster: "A_High",  parts_percentage: "10" },
  { cluster: "A_Medium", parts_percentage: "12" },
  { cluster: "A_Low",  parts_percentage: "15" },
  { cluster: "B_High",  parts_percentage: "2" },
  { cluster: "B_Medium",  parts_percentage: "23" },
  { cluster: "B_Low",  parts_percentage: "18" },
  { cluster: "C_High",  parts_percentage: "2" },
  { cluster: "C_Medium",  parts_percentage: "21" },
  { cluster: "C_Low",  parts_percentage: "39" },
];

const partsSegmentMatrix = [
  ["A_High", "#ff6493"],
  ["A_Medium", "#00b8b0"],
  ["A_Low", "#00b8b0"],
  ["B_High", "#ff6493"],
  ["B_Medium", "#872ff7"],
  ["B_Low", "#00b8b0"],
  ["C_High", "#872ff7"],
  ["C_Medium", "#872ff7"],
  ["C_Low",  "#00b8b0"],
];

export default function SparepartSegment(props) {
  const [partsSegmentData, setPartsSegmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getPartsSegment()
      .then((res) => {
        setPartsSegmentData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setPartsSegmentData([]);
        setIsLoading(false);
      });

    return () => {
      console.log("axios cleanup.");
    };
  }, []);
  const [showSegmentDetails, setShowSegmentDetails] = useState(false);
  const [partsSegmentDetails, setPartsSegmentDetails] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("");

  const handleClickPartsSegment = (cluster) => {
    setIsLoadingTable(true);
    setPartsSegmentDetails([]);
    setSelectedCluster(cluster);
    getPartsSegmentDetails(cluster).then((res) => {
        setPartsSegmentDetails(res);
        setIsLoadingTable(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setPartsSegmentDetails([]);
        setIsLoadingTable(false);
      });
    setShowSegmentDetails(true);
  };
  const customerDetailColumns = [
    { field: "part_number", headerName: "Part #", flex: 1, minWidth: 200 },
    { field: "part_class", headerName: "Part Class", flex: 1 },
    { field: "part_description", headerName: "Part Description", flex:1 },
    { field: "cost_price", headerName: "Cost Price", flex:1 },
    { field: "quantity", headerName: "Quantity", flex:1 },
    { field: "total_transaction", headerName: "Total Transaction", flex:1 },
    // { field: "cluster", headerName: "Cluster", width: 100 }    
  ];

  const [pageSize, setPageSize] = useState(5);
  return (
    <div>
      {/* <h5 className="">Propensity to buy</h5> */}
      
        <Grid
          container
          sx={{
            width: "100%",
            backgroundColor: "#f3eafe",
            borderRadius: 5,
            marginBlock: 3,
            padding: 2,
          }}
        >{showSegmentDetails ? (isLoading ? <LoadingProgress /> : (
            <Card sx={{width: "100%",
            marginInline: "auto", paddingInline: 3, backgroundColor: '#ffffff', borderRadius: 4}}>
              <Typography sx={{ fontSize: 16, fontWeight: 600, marginBlock: 2 }}>
                Parts Segmentation Details
              </Typography>
              <div style={{ display: "flex", marginBlock: 4 }}>
                <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                  {" "}
                  <strong>Cluster : </strong> {selectedCluster}
                </Typography>
                
              </div>
              <Box sx={{ height: 500 }}>
              <DataGrid
                loading={isLoadingTable}
                getRowId={(row) => row.part_number}
                sx={GRID_STYLE}
                rows={partsSegmentDetails}
                columns={customerDetailColumns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize)=> setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50]}
                // autoHeight
              /></Box>
              <div
                className="row"
                style={{ justifyContent: "right", marginInline: 9, marginBlock: 7 }}
              >
                <button
                  class="btn bg-primary text-white"
                  onClick={() => setShowSegmentDetails(false)}
                >
                  Back
                </button>
              </div>
            </Card>
          ) ): (
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
                    A
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    B
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    C
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  {partsSegmentMatrix.map((indArray) => (
                    <Grid item xs={4}>
                      <Card
                        variant="outlined"
                        sx={{
                          paddingInline: "auto",
                          paddingBlock: 4,
                          marginBlock: 1,
                          borderRadius: 2,
                          backgroundColor: indArray[1],
                          width: "90%",
                          marginInline: "auto",
                        }}
                        onClick={() =>
                          handleClickPartsSegment(indArray[0], indArray[1])
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
                            partsSegmentValues.filter(
                              (object) =>
                                object.cluster === indArray[0] 
                            )[0]?.parts_percentage
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
                    High
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
                    Low
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
                    Parts Segmentation score
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Card>)}
          {/* </div> */}
        </Grid>
    </div>
  );
}
