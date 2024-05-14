import React, { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Box, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Moment from "react-moment";

import { GRID_STYLE } from "pages/Common/constants";
import SearchBox from "pages/Common/filter/SearchBox";
import SelectBox from "pages/Common/SelectBox";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
    CLAIM_MASTER_URL,
    CLAIM_ORDER_MASTER_URL,
    Claim_Pagination_List_GET,
    Warranty_Country_List_GET,
    Warranty_Evaluation_Questions_Get_GET,
} from "services/CONSTANTS";
import ClaimDetailsModal from "./ClaimDetailsModal";
import ClaimRequestModal from "./ClaimRequestModal";
import WarrantyRequestCreateModal from "./WarrantyRequestCreateModal";
import ClaimReturnRequester from "./ClaimReturnRequester";
import QuickCreateModal from "../QuickCreateModal";
import WarrantyRequestModal from "../returnMaster/WarrantyRequestModal";
import CreateWarrantyRequest from "../warrantyMaster/CreateWarrantyRequest";
import WarrantyQuestions from "../warrantyMaster/WarrantyQuestions";
import WarrantyRequestAuthorization from "../warrantyMaster/WarrantyRequestAuthorization";
import ReplacementModal from "../returnMaster/ReplacementModal";

const DataGridContainer = (props) => (
    <Box
        margin={"auto"}
        sx={{
            backgroundColor: "#ffffff",
            height: 500,
            // marginBlock: 2,
            borderRadius: 5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: 2,
        }}
    >
        {props.children}
    </Box>
);

const returnTypeOptions = [
    "Standard",
    "Extended",
    "Service Letter",
    "Goodwill",
];

const workFlowOptions = ["None", "Atria"];

const ClaimAdministration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const [countryList, setCountryList] = useState([]);
    const [partsRecords, setPartsRecords] = useState([]);

    const [openClaimRequestModal, setOpenClaimRequestModal] = useState(false);
    const [openPartCreateModal, setOpenPartCreateModal] = useState(false);
    const [openReturnRequsterModal, setOpenReturnRequsterModal] =
        useState(false);

    const [returnNumber, setReturnNumber] = useState("");
    const [returnType, setReturnType] = useState("");

    const [claimRecordDetail, setClaimRecordDetail] = useState(null);
    const [claimRecordData, setClaimRecordData] = useState([]);
    const [recentClaimRecords, setRecentClaimRecords] = useState([]);

    const [claimRecordId, setClaimRecordId] = useState(null);
    const [claimOrderId, setClaimOrderId] = useState(null);
    const [evaluationId, setEvaluationId] = useState(null);
    const [assesstmentId, setAssesstmentId] = useState(null);
    const [warrantyRecordId, setWarrantyRecordId] = useState(null);

    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [openClaimDetailsModal, setOpenClaimDetailsModal] = useState(false);
    const [openWarrantyRequestModal, setOpenWarrantyRequestModal] =
        useState(false);

    const [openQuickWarrantyCreateModal, setOpenQuickWarrantyCreateModal] =
        useState(false);

    const [showWarrantyRequestModal, setShowWarrantyRequestModal] =
        useState(false);
    const [openQuestionsModal, setOpenQuestionsModal] = useState(false);
    const [questionNo, setQuestionNo] = useState(0);
    const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);
    const [showClaimRequestModal, setShowClaimRequestModal] = useState(false);
    const [openReplacementModal, setOpenReplacementModal] = useState(false);

    const [
        showWarrantyRequestWithPwaModal,
        setShowWarrantyRequestWithPwaModal,
    ] = useState(false);

    const [pwaNumber, setPwaNumber] = useState(null);
    const [warrantyRequestType, setWarrantyRequestType] = useState("");
    const [autorizationPreReqObj, setAutorizationPreReqObj] = useState({
        requestType: "",
        customerNumber: "",
        customerName: "",
    });
    const [warrantyRequestFor, setWarrantyRequestFor] = useState("");

    const [warrantyReturnId, setWarrantyReturnId] = useState(null);

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

    useEffect(() => {
        if (!openClaimRequestModal && !openPartCreateModal) {
            setClaimRecordId(null);
            setWarrantyRecordId(null);
            setClaimOrderId(null);
            setClaimRecordDetail(null);
        }
        if (!openReturnRequsterModal) {
            setPartsRecords([]);
        }

        if (!openQuestionsModal && !showAuthorizationModal) {
            setClaimRecordId(null);
        }
    }, [
        openClaimRequestModal,
        openPartCreateModal,
        openReturnRequsterModal,
        openQuestionsModal,
        showAuthorizationModal,
    ]);

    useEffect(() => {
        getRecentClaimRecord();
        getClaimList();
        getEvaluationQuestions();
        getCountryKeyValueList();
    }, []);

    // get recent activities (claim)
    const getRecentClaimRecord = () => {
        const rUrl = `${CLAIM_MASTER_URL}?pageSize=${5}&sortColumn=updatedAt&orderBY=DESC`;
        // const rUrl = `${CLAIM_ORDER_MASTER_URL}?pageSize=${5}&sortColumn=updatedAt&orderBY=DESC`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;
                setRecentClaimRecords(responseData);
            }
        });
    };

    // get claim list
    const getClaimList = () => {
        const rUrl = `${CLAIM_ORDER_MASTER_URL}?pageNumber=${0}&pageSize=${10}&sortColumn=createdAt&orderBY=DESC`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;
                // setClaimRecordData(responseData);
                getClaimOrderStatus(responseData);
            }
        });
    };

    const getClaimOrderStatus = async (responseData) => {
        const recordArr = [];

        for (let row of responseData) {
            // const searchStr = `${CLAIM_MASTER_URL}/${row.claimId}`;
            // if (row.claimId) {
            //     const res = await claimSearchById(row.claimId);
            //     recordArr.push({
            //         ...row,
            //         claimStatus: res.claimStatus,
            //     });
            // } else {
            //     recordArr.push({
            //         ...row,
            //         claimStatus: "REGISTERED",
            //     });
            recordArr.push({
                ...row,
                claimStatus: "REGISTERED",
            });
            // }
        }
        setClaimRecordData(recordArr);
    };

    // evaluation questions list
    const getEvaluationQuestions = () => {
        const rUrl = `${Warranty_Evaluation_Questions_Get_GET}pageNumber=${1}&pageSize=${10}`;
        // callGetApi( rUrl, (response) => {
        //   if (response.status === API_SUCCESS) {
        //     const responseData = response.data;
        //     const options = [];
        //     const shortQuestions = responseData.sort(
        //       (a, b) => a.questionId - b.questionId
        //     );
        //     shortQuestions.map((row) => {
        //       if (row.questionId === 5 || row.questionId === 6) {
        //         options.push({ ...row, type: "input" });
        //       } else {
        //         options.push({ ...row, type: "select" });
        //       }
        //     });
        //     setEvaluationQuestions(options);
        //   }
        // });
    };

    // country key value list
    const getCountryKeyValueList = () => {
        const rUrl = `${Warranty_Country_List_GET}?pageNumber=${0}&pageSize=${10}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;
                const options = [];
                responseData.map((row) =>
                    // options.push({ label: row.countryName, value: row.countryId })
                    options.push({
                        label: row.countryName,
                        value: row.countryName,
                    })
                );
                setCountryList(options);
            }
        });
    };

    // claim details model open
    const handleOpenClaimDetailsModal = (row) => {
        const _claimId = row["claimId"];
        if (_claimId) {
            setClaimRecordId(_claimId);
        }

        const _warrantyId = row["warrantyId"];
        if (_warrantyId) {
            setWarrantyRecordId(_warrantyId);
        }

        const _claimOrderId = row["claimOrderId"];
        if (_claimOrderId) {
            setClaimOrderId(_claimOrderId);
        }

        const _evaluationId = row["evaluationId"];
        if (_evaluationId) {
            setEvaluationId(_evaluationId);
        }

        const _assessmentId = row["assessmentId"];
        if (_assessmentId) {
            setAssesstmentId(_assessmentId);
        }

        if (_claimId) {
            callGetApi(null, `${CLAIM_MASTER_URL}/${_claimId}`, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setClaimRecordDetail(responseData);
                }
            });
        }
        setOpenClaimRequestModal(true);
    };

    // claim order/Request model show hide
    const handleOpenClaimRequestModal = () => {
        setOpenClaimDetailsModal(false);
        setOpenClaimRequestModal(true);
    };

    // show part create modal
    const handleShowPartCreateModal = () => {
        setOpenClaimRequestModal(!openClaimRequestModal);
        setOpenPartCreateModal(!openPartCreateModal);
    };

    // opem return requester model box
    const handleShowReturnRequetrModal = (row) => {
        setPartsRecords([row]);
        setOpenClaimRequestModal(false);
        setOpenReturnRequsterModal(true);
    };

    // open
    const handleShowWarrantyReqDtlsModal = () => {
        setOpenQuickWarrantyCreateModal(false);
        setShowWarrantyRequestWithPwaModal(true);
    };

    const handleCloseWarrantyReqDtlModal = () => {
        setPwaNumber(null);
        setWarrantyRequestType("");
        setShowWarrantyRequestWithPwaModal(false);
    };

    // open questions Modal
    const handleOpenQuestionsModal = () => {
        setShowWarrantyRequestModal(false);
        setQuestionNo(0);
        setOpenQuestionsModal(true);
    };

    // open claaim request Create modal
    const handleShowClaimRequestModal = () => {
        setOpenQuestionsModal(false);
        setShowClaimRequestModal(true);
    };

    // Open Autorization Create Modal Box
    const handleOpenAutorizationCreateModal = () => {
        setOpenQuestionsModal(false);
        setShowAuthorizationModal(true);
    };

    // go back to Authorization create model to Quesctions Scrren
    const handleGoBackToQurestionsModal = () => {
        if (warrantyRequestFor === "replacement") {
            setShowAuthorizationModal(false);
            setOpenReplacementModal(true);
        } else {
            setShowAuthorizationModal(false);
        }
        // setQuestionNo(2);
        // setShowAuthorizationModal(false);
        // setOpenQuestionsModal(true);
    };

    const claimColumn = [
        {
            // field: "claimNumber",
            // field: "claimId",
            field: "claimOrderId",
            headerName: "Claim Number",
            flex: 1,
        },
        {
            field: "claimStatus",
            headerName: "Claim Status",
            flex: 1,
            renderCell: ({ row }) => <>REGISTERED</>,
        },
        {
            field: "claimType",
            headerName: "Claim Type",
            flex: 1,
        },
        {
            field: "rmaNumber",
            headerName: "RMA Number",
            flex: 1,
        },
        {
            field: "claimRequestDate",
            // field: "createdOn",
            headerName: "Claim Date",
            flex: 1,
        },
        // {
        //   field: "replacement",
        //   headerName: "Replacement",
        //   flex: 1,
        //   renderCell: (params) => <div>{params.value ? "Yes" : "No"}</div>,
        // },
        {
            field: "action",
            type: "actions",
            headerName: "Action",
            flex: 1,
            cellClassName: "actions",
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={
                            <div
                                className=" cursor"
                                onClick={() => handleOpenClaimDetailsModal(row)}
                            >
                                <Tooltip title="Claim Process">
                                    <CachedIcon />
                                </Tooltip>
                            </div>
                        }
                        label="Edit"
                        className="textPrimary"
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <CustomizedSnackbar
                handleClose={handleSnackBarClose}
                open={openSnack}
                severity={severity}
                message={snackMessage}
            />
            <div>
                <div
                    className="content-body bg-white"
                    style={{ minHeight: "884px" }}
                >
                    <div className="container-fluid mt-3">
                        <h4 className="font-weight-600 mb-0 mt-4">
                            Claim Administration
                        </h4>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                width: "100%",
                                borderRadius: 5,
                                marginBlock: 0,
                            }}
                        >
                            <Grid item xs={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <div
                                            className="card border border-radius-10"
                                            style={{ height: "380px" }}
                                        >
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light-pink"
                                                style={{
                                                    borderRadius:
                                                        "10px 10px 0px 0px",
                                                }}
                                            >
                                                <span className="font-size-14">
                                                    Recent Activity
                                                </span>
                                                {/* <MuiMenuComponent options={workFlowOptions} /> */}
                                            </div>
                                            <div className="px-3 py-1">
                                                {recentClaimRecords.length !==
                                                    0 &&
                                                    recentClaimRecords.map(
                                                        (claimRow, i) => (
                                                            <div
                                                                className={`d-flex justify-content-between align-items-baseline ${
                                                                    i === 4
                                                                        ? ""
                                                                        : "border-bottom"
                                                                } py-2`}
                                                                key={
                                                                    claimRow?.claimId
                                                                }
                                                            >
                                                                <div>
                                                                    <h6 className="mb-1 text-primary">
                                                                        Claim{" "}
                                                                        {`${claimRow?.claimId}-${claimRow?.authorizationCode}`}
                                                                        {/* {
                                                                            claimRow?.claimNumber
                                                                        } */}
                                                                    </h6>
                                                                    <span
                                                                        className="cursor"
                                                                        onClick={() =>
                                                                            handleOpenClaimDetailsModal(
                                                                                claimRow
                                                                            )
                                                                        }
                                                                    >
                                                                        <KeyboardArrowUpIcon />
                                                                        View
                                                                        Details
                                                                    </span>
                                                                </div>
                                                                <span>
                                                                    <Moment format="HH:MM A">
                                                                        {
                                                                            claimRow.updatedAt
                                                                        }
                                                                    </Moment>
                                                                    ,{" "}
                                                                    <Moment format="DD MMM YY">
                                                                        {
                                                                            claimRow.updatedAt
                                                                        }
                                                                    </Moment>
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div
                                            className="card border border-radius-10"
                                            style={{ height: "380px" }}
                                        >
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 border-bottom workflow-task"
                                                style={{
                                                    borderRadius:
                                                        "10px 10px 0px 0px",
                                                }}
                                            >
                                                <span className="font-size-14">
                                                    Workflow Task
                                                </span>
                                                {/* <MuiMenuComponent options={workFlowOptions} /> */}
                                            </div>
                                            <div className="px-3 py-1">
                                                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                    <h6>
                                                        <span className="text-primary">
                                                            77699
                                                        </span>{" "}
                                                        requires your attention
                                                    </h6>
                                                    <span>view Details</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                    <h6>
                                                        <span className="text-primary">
                                                            77699
                                                        </span>{" "}
                                                        requires your attention
                                                    </h6>
                                                    <span>view Details</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                    <h6>
                                                        <span className="text-primary">
                                                            77699
                                                        </span>{" "}
                                                        requires your attention
                                                    </h6>
                                                    <span>view Details</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                                                    <h6>
                                                        <span className="text-primary">
                                                            77699
                                                        </span>{" "}
                                                        requires your attention
                                                    </h6>
                                                    <span>view Details</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center py-3">
                                                    <h6>
                                                        <span className="text-primary">
                                                            77699
                                                        </span>{" "}
                                                        requires your attention
                                                    </h6>
                                                    <span>view Details</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="card border px-3 py-3 warranty-req-dash-card mb-4">
                                    <div
                                        className="d-flex justify-content-between align-items-baseline cursor"
                                        // onClick={() =>
                                        //     setOpenQuickWarrantyCreateModal(
                                        //         true
                                        //     )
                                        // }
                                        onClick={() =>
                                            setShowWarrantyRequestModal(true)
                                        }
                                    >
                                        <span className="mb-0 font-size-14">
                                            Warranty Request
                                        </span>
                                        <span>
                                            <ArrowForwardIosIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className="card border px-3 py-3 claim-req-dash-card mb-4">
                                    <div
                                        className="d-flex justify-content-between align-items-center cursor"
                                        onClick={() =>
                                            setOpenClaimRequestModal(true)
                                        }
                                    >
                                        <span className="mb-0 font-size-14">
                                            Claim Request
                                        </span>
                                        <span className="font-weight-500">
                                            <ArrowForwardIosIcon />
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 500,
                                margin: 1,
                                color: "#000000",
                            }}
                        >
                            Claim Records
                        </Typography>
                        <Grid
                            container
                            sx={{
                                width: "100%",
                                backgroundColor: "#f3eafe",
                                borderRadius: 5,
                                marginBlock: 3,
                                padding: 2,
                                marginTop: 0.5,
                                marginBottom: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 700,
                                    // marginBottom: 8,
                                    marginInline: 2,
                                }}
                            >
                                <SearchBox
                                    label={"Claim Number"}
                                    value={returnNumber}
                                    handleChange={(e) =>
                                        setReturnNumber(e.target.value)
                                    }
                                    size={250}
                                />
                                <SelectBox
                                    label={"Claim Type"}
                                    value={returnType}
                                    options={returnTypeOptions}
                                    handleChange={(e) =>
                                        setReturnType(e.target.value)
                                    }
                                    showClearIcon={true}
                                    handleUnselect={() => setReturnType("")}
                                />
                                <DataGridContainer>
                                    <DataGrid
                                        // loading={isLoading}
                                        sx={GRID_STYLE}
                                        getRowId={(row) => row.claimOrderId}
                                        // getRowId={(row) => row.claimId}
                                        rows={claimRecordData}
                                        columns={claimColumn}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) =>
                                            setPageSize(newPageSize)
                                        }
                                        rowsPerPageOptions={[5, 10, 20, 50]}
                                    />
                                </DataGridContainer>
                            </Box>
                        </Grid>
                    </div>
                </div>
            </div>
            {openClaimDetailsModal && (
                <ClaimDetailsModal
                    show={openClaimDetailsModal}
                    hideModal={() => setOpenClaimDetailsModal(false)}
                    recordId={claimRecordId}
                    handleSnack={handleSnack}
                    handleOpenClaimRequestModal={handleOpenClaimRequestModal}
                />
            )}
            {(openClaimRequestModal || openPartCreateModal) && (
                <ClaimRequestModal
                    show={openClaimRequestModal}
                    hideModal={() => setOpenClaimRequestModal(false)}
                    handleSnack={handleSnack}
                    claimRecordDetail={claimRecordDetail}
                    warrantyRecordId={warrantyRecordId}
                    claimOrderId={claimOrderId}
                    setClaimOrderId={setClaimOrderId}
                    claimRecordId={claimRecordId}
                    assesstmentId={assesstmentId}
                    setAssesstmentId={setAssesstmentId}
                    evaluationId={evaluationId}
                    setEvaluationId={setEvaluationId}
                    openPartCreateModal={openPartCreateModal}
                    handleShowPartCreateModal={handleShowPartCreateModal}
                    handleShowReturnRequetrModal={handleShowReturnRequetrModal}
                />
            )}

            {openWarrantyRequestModal && (
                <WarrantyRequestCreateModal
                    show={openWarrantyRequestModal}
                    hideModal={() => setOpenWarrantyRequestModal(false)}
                    handleSnack={handleSnack}
                />
            )}

            {openReturnRequsterModal && (
                <ClaimReturnRequester
                    show={openReturnRequsterModal}
                    hideModal={() => setOpenReturnRequsterModal(false)}
                    handleSnack={handleSnack}
                    countryOptions={countryList}
                    partsRecords={partsRecords}
                    warrantyReturnId={warrantyReturnId}
                    setWarrantyReturnId={setWarrantyReturnId}
                />
            )}

            {openQuickWarrantyCreateModal && (
                <QuickCreateModal
                    show={openQuickWarrantyCreateModal}
                    hideModal={() => setOpenQuickWarrantyCreateModal(false)}
                    handleSnack={handleSnack}
                    setPwaNumber={setPwaNumber}
                    setWarrantyRequestType={setWarrantyRequestType}
                    openWarrantyDetailsModal={handleShowWarrantyReqDtlsModal}
                />
            )}

            {showWarrantyRequestModal && (
                <CreateWarrantyRequest
                    show={showWarrantyRequestModal}
                    hideModal={() => setShowWarrantyRequestModal(false)}
                    handleSnack={handleSnack}
                    setPwaNumber={setPwaNumber}
                    setWarrantyRequestType={setWarrantyRequestType}
                    handleOpenQuestionsModal={handleOpenQuestionsModal}
                    setClaimRecordId={setClaimRecordId}
                    setClaimRecordDetail={setClaimRecordDetail}
                    setAutorizationPreReqObj={setAutorizationPreReqObj}
                    // handleShowAutorizationModal={handleShowAutorizationModal}
                />
            )}

            {(openQuestionsModal || showClaimRequestModal) && (
                <WarrantyQuestions
                    show={openQuestionsModal}
                    hideModal={() => setOpenQuestionsModal(false)}
                    handleSnack={handleSnack}
                    openAutorizationCreateModal={
                        handleOpenAutorizationCreateModal
                    }
                    openClaimRequestModal={showClaimRequestModal}
                    handleOpenClaimRequestModal={handleShowClaimRequestModal}
                    handleCloseRequestModal={() =>
                        setShowClaimRequestModal(false)
                    }
                    questionNo={questionNo}
                    claimRecordId={claimRecordId}
                    claimRecordDetail={claimRecordDetail}
                    setClaimRecordDetail={setClaimRecordDetail}
                    setAutorizationPreReqObj={setAutorizationPreReqObj}
                />
            )}

            {showAuthorizationModal && (
                <WarrantyRequestAuthorization
                    show={showAuthorizationModal}
                    // hideModal={handleCloseWarrantyReqDtlModal}
                    hideModal={() => setShowAuthorizationModal(false)}
                    handleSnack={handleSnack}
                    pwaNumber={pwaNumber}
                    setPwaNumber={setPwaNumber}
                    warrantyRequestType={warrantyRequestType}
                    claimRecordId={claimRecordId}
                    setClaimRecordId={setClaimRecordId}
                    handleGoBackToQurestionsModal={
                        handleGoBackToQurestionsModal
                    }
                    claimRecordDetail={claimRecordDetail}
                    autoReqObj={autorizationPreReqObj}
                />
            )}

            {showWarrantyRequestWithPwaModal && (
                <WarrantyRequestModal
                    show={showWarrantyRequestWithPwaModal}
                    hideModal={handleCloseWarrantyReqDtlModal}
                    handleSnack={handleSnack}
                    pwaNumber={pwaNumber}
                    warrantyRequestType={warrantyRequestType}
                />
            )}

            {openReplacementModal && (
                <ReplacementModal
                    show={openReplacementModal}
                    hideModal={() => setOpenReplacementModal(false)}
                    handleSnack={handleSnack}
                />
            )}
        </>
    );
};

export default ClaimAdministration;
