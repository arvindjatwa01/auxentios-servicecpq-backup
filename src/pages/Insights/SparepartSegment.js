import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Box, Card, Divider, Grid } from "@mui/material";
import { getPartsSegmentDetails, getPartsSegment } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

const partsSegmentValues = [
    { "cluster": "C_Low", "parts_count": 71575, "parts_percentage": 86.0, "revenue_percentage": 0.3 },
    { "cluster": "C_Mid", "parts_count": 6017, "parts_percentage": 7.23, "revenue_percentage": 0.22 },
    { "cluster": "C_High", "parts_count": 1585, "parts_percentage": 1.9, "revenue_percentage": 0.13 },
    { "cluster": "B_Low", "parts_count": 1541, "parts_percentage": 1.85, "revenue_percentage": 0.47 },
    { "cluster": "B_Mid", "parts_count": 955, "parts_percentage": 1.15, "revenue_percentage": 0.26 },
    { "cluster": "A_Low", "parts_count": 951, "parts_percentage": 1.14, "revenue_percentage": 48.46 },
    { "cluster": "B_High", "parts_count": 345, "parts_percentage": 0.41, "revenue_percentage": 0.2 },
    { "cluster": "A_Mid", "parts_count": 213, "parts_percentage": 0.26, "revenue_percentage": 15.11 },
    { "cluster": "A_High", "parts_count": 45, "parts_percentage": 0.05, "revenue_percentage": 34.86 }
]

const partsSegmentMatrix = [
    ["A_High", "#872ff7"],
    ["A_Mid", "#872ff780"],
    ["A_Low", "#872ff760"],
    ["B_High", "#6FD4FF"],
    ["B_Mid", "#6FD4FF80"],
    ["B_Low", "#6FD4FF60"],
    ["C_High", "#ff6493"],
    ["C_Mid", "#ff649380"],
    ["C_Low", "#ff649360"],
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
        { field: "part_description", headerName: "Part Description", flex: 1 },
        { field: "cost_price", headerName: "Cost Price", flex: 1 },
        { field: "quantity", headerName: "Quantity", flex: 1 },
        { field: "total_transaction", headerName: "Total Transaction", flex: 1 },
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
                justifyContent={'center'}
            >{showSegmentDetails ? (
                <Card sx={{
                    width: "100%",
                    marginInline: "auto", paddingInline: 3, backgroundColor: '#ffffff', borderRadius: 4
                }}>
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
                            onClick={() => setShowSegmentDetails(false)}
                        >
                            Back
                        </button>
                    </div>
                </Card>
            ) :
                (<Card
                    className="mr-2"
                    sx={{
                        borderRadius: 4,
                        height: 500,
                        width: "100%",
                        marginInline: "auto",
                    }}
                    variant="outlined"
                > {isLoading ? <LoadingProgress /> :
                    <Grid container sx={{ marginBlock: 5, marginInline: 5 }}>
                        <Grid item container xs={2}>
                            <Grid
                                item
                                container
                                xs={6}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                $ Value and Buying Frequency (Revenue)
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
                                    High
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
                                    Low
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
                                            <Typography
                                                textAlign="center"
                                                style={{ fontSize: 18, fontWeight: "600" }}
                                            >
                                                {
                                                    partsSegmentData.filter(
                                                        (object) =>
                                                            object.cluster === indArray[0]
                                                    )[0]?.parts_count
                                                }
                                            </Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item container xs={4} paddingRight={10}>
                            {/* <Grid item xs={12} display="flex" sx={{ marginBlock: 1, paddingBlock: 4 }}>
                                <StopIcon sx={{ color: "#872ff7", marginInline: 1 }} />
                                <Typography variant="body2">
                                    Max 20% of parts generate min 70% of total revenue
                                </Typography>
                            </Grid>
                            <Grid item xs={12} display="flex" sx={{ marginBlock: 1, paddingBlock: 4 }}>
                                <StopIcon sx={{ color: "#6FD4FF", marginInline: 1 }} />
                                <Typography variant="body2">
                                    Max 30% of parts generate max 20% of total revenue
                                </Typography>
                            </Grid>
                            <Grid item xs={12} display="flex" sx={{ marginBlock: 1, paddingBlock: 4 }}>
                                <StopIcon sx={{ color: "#ff6493", marginInline: 1 }} />
                                <Typography variant="body2">
                                    Min 50% of parts generate max 10% of total revenue
                                </Typography>
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}></Grid> */}
                        </Grid>
                        <Grid item xs={2}></Grid>
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
                                    $ Value
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>}
                </Card>)}
            </Grid>
        </div>
    );
}
