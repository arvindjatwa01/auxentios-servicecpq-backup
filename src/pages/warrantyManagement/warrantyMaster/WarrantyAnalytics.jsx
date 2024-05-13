import React, { useState } from "react";
import {
    Box,
    Grid,
    LinearProgress,
    Typography,
    linearProgressClasses,
    styled,
} from "@mui/material";

import { PieChart, Pie, Sector, Cell } from "recharts";
import { ProgressBar } from "react-bootstrap";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import SelectBox from "pages/Common/SelectBox";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
];

const timePeriodOptions = [
    "Last 2 Years",
    "1 Year",
    "6 Months",
    "1 Month",
    "1 Week",
];

const coverageGroups = [
    {
        groupName: "Financial",
        percentage: 0.97,
    },
    {
        groupName: "Casually",
        percentage: 0.63,
    },
    {
        groupName: "Property",
        percentage: 0.19,
    },
    {
        groupName: "Miscellaneous",
        percentage: 0.01,
    },
];
const businessLines = [
    {
        busniessName: "Cyber Liability",
        percentage: 0.63,
    },
    {
        busniessName: "Worker's Compen",
        percentage: 0.42,
    },
    {
        busniessName: "Management",
        percentage: 0.3,
    },
    {
        busniessName: "Property",
        percentage: 0.19,
    },
    {
        busniessName: "Cenceral Liability",
        percentage: 0.12,
    },
];

const carriergroup = [
    {
        carrierName: "Chubb",
        percentage: 0.49,
    },
    {
        carrierName: "Axix",
        percentage: 0.47,
    },
    {
        carrierName: "Berkley",
        percentage: 0.22,
    },
    {
        carrierName: "Uoyd's of London",
        percentage: 0.11,
    },
    {
        carrierName: "Market",
        percentage: 0.1,
    },
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        // background: `#ff5a6f`,
        background: `linear-gradient(90deg, #ff5a6f 40%, #ff5a6f 100%)`,
        // background: `linear-gradient(90deg, #6fa7ff 40%, #d06fff 100%)`,
    },
}));

const BusinessLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        background: `#75ccdf`,
        // background: `linear-gradient(90deg, #6fa7ff 40%, #d06fff 100%)`,
    },
}));

const CarrierLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        background: `#2596be`,
        // background: `linear-gradient(90deg, #6fa7ff 40%, #d06fff 100%)`,
    },
}));

const WarrantyAnalytics = () => {
    const [timePeriod, setTimePeriod] = useState("");
    // Snack Bar State
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };

    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };

    return (
        <>
            <CustomizedSnackbar
                handleClose={handleSnackBarClose}
                open={openSnack}
                severity={severity}
                message={snackMessage}
            />
            <div className="content-body" style={{ minHeight: "884px" }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-baseline mt-3 mb-3">
                        <h5 className="font-weight-600 mb-0 ">
                            Warranty Analytics
                        </h5>
                    </div>
                    <Box
                        sx={{
                            marginBottom: 1,
                            marginInline: 2,
                            // borderBottom: "1px solid #5c5c5cb3",
                        }}
                    >
                        <SelectBox
                            label={"Time Period"}
                            value={timePeriod}
                            options={timePeriodOptions}
                            handleChange={(e) => setTimePeriod(e.target.value)}
                            handleUnselect={() => setTimePeriod("")}
                            size={150}
                        />
                    </Box>

                    <Grid
                        container
                        spacing={3}
                        sx={{
                            width: "100%",
                            borderRadius: 5,
                            marginBlock: 0,
                        }}
                    >
                        <Grid item xs={3}>
                            <div
                                className="card border my-2"
                                style={{ background: "#063970" }}
                            >
                                <PieChart width={800} height={280}>
                                    <Pie
                                        data={data}
                                        cx={140}
                                        cy={120}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={0}
                                        dataKey="value"
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    colors[
                                                        index % colors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                                {/* <PieChart
                                    series={[
                                        {
                                            data: data1,
                                            innerRadius: 60,
                                            outerRadius: 80,
                                        },
                                    ]}
                                    height={300}
                                    slotProps={{
                                        legend: { hidden: true },
                                    }}
                                /> */}
                            </div>
                            <div
                                className="card border my-2"
                                style={{ background: "#eeeee4" }}
                            >
                                <PieChart width={800} height={280}>
                                    <Pie
                                        data={data}
                                        cx={140}
                                        cy={120}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={0}
                                        dataKey="value"
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    colors[
                                                        index % colors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                                {/* <PieChart
                                    series={[
                                        {
                                            data: data1,
                                            innerRadius: 60,
                                            outerRadius: 80,
                                        },
                                    ]}
                                    height={300}
                                    slotProps={{
                                        legend: { hidden: true },
                                    }}
                                /> */}
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className="card border"></div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="card border px-2 py-1">
                                <span style={{ fontSize: "11px" }}>
                                    TOTAL PREMIUM BY
                                </span>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: "#000000",
                                    }}
                                >
                                    Coverage Group
                                </Typography>
                                {coverageGroups.length !== 0 &&
                                    coverageGroups.map((coverage, i) => (
                                        <div
                                            className="row my-2"
                                            key={`${coverage.groupName}-${i}`}
                                        >
                                            <div className="col-md-5">
                                                <span
                                                    style={{ fontSize: "16px" }}
                                                >
                                                    {coverage.groupName}
                                                </span>
                                            </div>
                                            <div className="col-md-7">
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <ProgressBar
                                                            variant="danger"
                                                            now={
                                                                coverage.percentage *
                                                                100
                                                            }
                                                            style={{
                                                                height: 10,
                                                                borderRadius: 5,
                                                            }}
                                                        />
                                                        {/* <BorderLinearProgress
                                                            variant="danger"
                                                            value={
                                                                coverage.percentage * 100
                                                            }
                                                            // sx={{ mx: 1 }}
                                                        /> */}
                                                    </Box>
                                                    <span>
                                                        {coverage.percentage}m
                                                    </span>
                                                </Box>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="card border px-2 py-1">
                                <span style={{ fontSize: "11px" }}>
                                    TOTAL PREMIUM BY
                                </span>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: "#000000",
                                    }}
                                >
                                    Line of business
                                </Typography>
                                {businessLines.length !== 0 &&
                                    businessLines.map((business, i) => (
                                        <div
                                            className="row my-2"
                                            key={`${business.busniessName}-${i}`}
                                        >
                                            <div className="col-md-5">
                                                <span
                                                    style={{ fontSize: "16px" }}
                                                >
                                                    {business.busniessName}
                                                </span>
                                            </div>
                                            <div className="col-md-7">
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <ProgressBar
                                                            variant="info"
                                                            now={
                                                                business.percentage *
                                                                100
                                                            }
                                                            style={{
                                                                height: 10,
                                                                borderRadius: 5,
                                                                // backgroundColor:
                                                                //     "#75ccdf",
                                                            }}
                                                        />
                                                        {/* <BusinessLinearProgress
                                                            variant="danger"
                                                            value={
                                                                business.percentage
                                                            }
                                                            // sx={{ mx: 1 }}
                                                        /> */}
                                                    </Box>
                                                    <span>
                                                        {business.percentage}m
                                                    </span>
                                                </Box>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="card border px-2 py-1">
                                <span style={{ fontSize: "11px" }}>
                                    TOTAL PREMIUM BY
                                </span>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: "#000000",
                                    }}
                                >
                                    Carrier Group
                                </Typography>
                                {carriergroup.length !== 0 &&
                                    carriergroup.map((carrier, i) => (
                                        <div
                                            className="row my-2"
                                            key={`${carrier.carrierName}-${i}`}
                                        >
                                            <div className="col-md-5">
                                                <span
                                                    style={{ fontSize: "16px" }}
                                                >
                                                    {carrier.carrierName}
                                                </span>
                                            </div>
                                            <div className="col-md-7">
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <ProgressBar
                                                            variant="#2596be"
                                                            now={
                                                                carrier.percentage *
                                                                100
                                                            }
                                                            style={{
                                                                height: 10,
                                                                borderRadius: 5,
                                                            }}
                                                        />
                                                        {/* <CarrierLinearProgress
                                                            variant="danger"
                                                            value={
                                                                carrier.percentage
                                                            }
                                                            // sx={{ mx: 1 }}
                                                        /> */}
                                                    </Box>
                                                    <span>
                                                        {carrier.percentage}m
                                                    </span>
                                                </Box>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default WarrantyAnalytics;
