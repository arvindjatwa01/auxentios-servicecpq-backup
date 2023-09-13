import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";

import StopIcon from "@mui/icons-material/Square";
import { Box, Card, Divider, Grid, Slider } from "@mui/material";
import { getPartsSegmentDetails, getPartsSegment } from "services/dashboardServices";
import LoadingProgress from "../Repair/components/Loader";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import FilterOptions from "./SliderCompnent";

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
    ["A_Low", "#872ff760"],
    ["A_Mid", "#872ff780"],
    ["A_High", "#872ff7"],
    ["B_Low", "#6FD4FF60"],
    ["B_Mid", "#6FD4FF80"],
    ["B_High", "#6FD4FF"],
    ["C_Low", "#ff649360"],
    ["C_Mid", "#ff649380"],
    ["C_High", "#ff6493"],
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
    const [transValueRange, setTransValueRange] = useState([1000, 10000]);
    const [precentProduct, setPercentProduct] = useState([0, 100]);
    const [buyingFrequency, setBuyingFrequency] = useState([0, 10000]);

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
            >
                <Card
                    sx={{
                        borderRadius: 4,
                        height: 700,
                        width: "100%",
                        margin: 2,
                    }}
                    variant="outlined"
                > {isLoading ? <LoadingProgress /> :
                    <Grid container sx={{ marginBlock: 5, marginInline: 5 }}>
                        <Grid item container xs={4}>
                            <Grid
                                item
                                container
                                xs={6}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                Historical $ transaction value / % of total products
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
                        <Grid item xs={6} lg={4}>
                            <Grid container columnSpacing={2} rowSpacing={2}>
                                {partsSegmentMatrix.map((indArray) => (
                                    <Grid item container xs={4} justifyContent={'center'} alignItems={'center'}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 2,
                                                backgroundColor: indArray[1],
                                                height: 150,
                                                width: 150,
                                                transition: "transform 0.15s ease-in-out",
                                                ':hover': { transform: "scale3d(1.05, 1.05, 1)" },
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
                        <Grid item container xs={4}>

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
                                    Buying Frequency
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>}
                </Card>
                {showSegmentDetails && (
                    <Card sx={{
                        width: "100%",
                        paddingInline: 3, backgroundColor: '#ffffff', borderRadius: 4, margin: 2
                    }}>
                        <Grid container marginY={3}>
                            <Grid item xs={9} container direction={'row'} alignItems={'center'}>
                                <Typography sx={{ fontSize: 16, fontWeight: 600, marginBlock: 2, mr: 1 }}>
                                    Parts Segmentation Details
                                </Typography>
                                (<Typography sx={{ fontSize: 12, marginRight: 2 }}>
                                    <strong>Cluster : </strong> {selectedCluster}
                                </Typography>)
                            </Grid>
                        </Grid>
                        <Grid Container>
                        <Grid item container xs={12} columnSpacing={1}>

                            <Grid item xs={4} container justifyContent={'start'} alignItems={'center'}>
                                <FilterOptions name="Transaction $" sliderRange={transValueRange} setSliderRange={setTransValueRange} />
                            </Grid>
                            <Grid item xs={4} container justifyContent={'start'} alignItems={'center'}>
                                <FilterOptions name='% of Parts' sliderRange={precentProduct} setSliderRange={setPercentProduct} />
                            </Grid>
                            <Grid item xs={4} container justifyContent={'start'} alignItems={'center'}>
                                <FilterOptions name='Buying Frequency' sliderRange={buyingFrequency} setSliderRange={setBuyingFrequency} />
                            </Grid>
                            </Grid>
                        </Grid>
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
                )
                }
            </Grid>
        </div>
    );
}
