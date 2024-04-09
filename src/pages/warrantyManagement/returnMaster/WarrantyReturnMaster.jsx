import React, { useEffect, useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import Moment from "react-moment";

import {
  SHIPMENT_HEADER_MASTER_URL,
  WARRANTY_RETURN_MASTER_URL,
  Warranty_Country_List_GET,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { GRID_STYLE } from "pages/Common/constants";
import SelectBox from "pages/Common/SelectBox";
import SearchBox from "pages/Common/filter/SearchBox";
import ClaimReturnRequester from "../claimMaster/ClaimReturnRequester";
import ReturnAnalysisModal from "./ReturnAnalysisModal";
import ReturnReceivedModal from "./ReturnReceivedModal";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import ReplacementModal from "./ReplacementModal";
import QuickCreateModal from "../QuickCreateModal";
import WarrantyRequestModal from "./WarrantyRequestModal";

const returnTypeOptions = ["Intra Company", "With in Company"];

const data = [
  {
    index: Math.floor(Math.random() * 900) + 10000,
    partNumber: "N90058041",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "10R4469",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "039720N2",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 10000,
    partNumber: "5788987",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

const dummyReturnData = [
  {
    index: Math.floor(Math.random() * 90000) + 10000,
    returnNumber: "RN00237",
    returnType: "Intra company",
    rmaNumber: "812374582",
    trackingNumber: "TN7458263",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    returnNumber: "RN00259",
    returnType: "Intra company",
    rmaNumber: "812374592",
    trackingNumber: "TN7458233",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 900) + 10000,
    returnNumber: "RN00291",
    returnType: "Intra company",
    rmaNumber: "812374522",
    trackingNumber: "TN7458213",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 90) + 10000,
    returnNumber: "RN00242",
    returnType: "Intra company",
    rmaNumber: "812374572",
    trackingNumber: "TN7458203",
    shipedOn: "11/02/2024",
  },
  {
    index: Math.floor(Math.random() * 900) + 1000,
    returnNumber: "RN00834",
    returnType: "Intra company",
    rmaNumber: "812374882",
    trackingNumber: "TN7458963",
    shipedOn: "11/02/2024",
  },
];

const WarrantyReturnMaster = () => {
  const [countryList, setCountryList] = useState([]);
  const [openReturnReceivedModal, setOpenReturnReceivedModal] = useState(false);
  const [openReturnAnalysisModal, setOpenReturnAnalysisModal] = useState(false);
  const [openReturnRequsterModal, setOpenReturnRequsterModal] = useState(false);
  const [requestCreation, setRequestCreation] = useState(false);
  const [openReplacementModal, setOpenReplacementModal] = useState(false);

  const [returnNumber, setReturnNumber] = useState("");
  const [returnType, setReturnType] = useState("");
  const [recentRequestRecords, setRecentRequestRecords] = useState([]);
  const [requestRecords, setRequestRecords] = useState([]);
  const [warrantyReturnId, setWarrantyReturnId] = useState(null);

  const [shipmentHeaderId, setShipmentHeaderId] = useState(null);

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
    getCountryKeyValueList();
    getWarrrantyRequestRecordList();
  }, []);

  useEffect(() => {
    if (!openReturnRequsterModal) {
      setWarrantyReturnId(null);
      setShipmentHeaderId(null);
    }
    if (!warrantyReturnId) {
      getRecentWarrantyRequests();
    }
  }, [openReturnRequsterModal, warrantyReturnId]);

  // get recent activities (claim request)
  const getRecentWarrantyRequests = () => {
    const rUrl = `${WARRANTY_RETURN_MASTER_URL}?pageSize=${5}&sortColumn=updatedAt&orderBY=DESC`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setRecentRequestRecords(responseData);
      }
    });
  };

  // get warranty reuqest records list
  const getWarrrantyRequestRecordList = () => {
    const rUrl = `${SHIPMENT_HEADER_MASTER_URL}?pageNumber=${0}&pageSize=${10}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setRequestRecords(responseData);
      }
    });
  };

  // get country list
  const getCountryKeyValueList = () => {
    const rUrl = `${Warranty_Country_List_GET}?pageNumber=${0}&pageSize=${10}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        const options = [];
        responseData.map((row) =>
          // options.push({ label: row.countryName, value: row.countryId })
          options.push({ label: row.countryName, value: row.countryName })
        );
        setCountryList(options);
      }
    });
  };

  const toggleReturnRequesterModal = () => {
    setOpenReturnRequsterModal(true);
    setRequestCreation(true);
  };

  const handleEditReturnData = (row) => {
    setShipmentHeaderId(row.shipmentHeaderId);
    setWarrantyReturnId(row.warrantyReturnId);
    setRequestCreation(false);
    setOpenReturnRequsterModal(true);
  };

  const columns = [
    {
      field: "returnNumber",
      headerName: "Return Number",
      flex: 1,
      // renderCell: ({ row }) => <>{row.shipmentHeaderModel?.returnNumber}</>,
    },
    {
      field: "returnType",
      headerName: "Return Type",
      flex: 1,
      // renderCell: ({ row }) => <>{row.shipmentHeaderModel?.returnType}</>,
    },
    {
      field: "rmaNumber",
      headerName: "RMA Number",
      // width: 150,
      flex: 1,
      // renderCell: ({ row }) => <>{row.shipmentHeaderModel?.rmaNumber}</>,
    },
    {
      field: "trackingNumber",
      headerName: "Tracking Number",
      flex: 1,
      // renderCell: ({ row }) => <>{row.shipmentHeaderModel?.trackingNumber}</>,
    },
    {
      field: "shippedOn",
      headerName: "Shiped On",
      flex: 1,
      // renderCell: ({ row }) => <>{row.shipmentHeaderModel?.shippedOn}</>,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={
              <div className="cursor" onClick={() => handleEditReturnData(row)}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
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
        <div className="content-body bg-white" style={{ minHeight: "884px" }}>
          <div className="container-fluid mt-3">
            <h4 className="font-weight-600 mb-0 mt-4">Return Dashboard</h4>
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
                        style={{ borderRadius: "10px 10px 0px 0px" }}
                      >
                        <span>Recent Activity</span>
                        {/* <MuiMenuComponent options={workFlowOptions} /> */}
                      </div>
                      <div className="px-3 py-1">
                        {recentRequestRecords.length !== 0 &&
                          recentRequestRecords.map((requestRow, i) => (
                            <div
                              className="d-flex justify-content-between align-items-baseline border-bottom py-2"
                              key={requestRow?.warrantyReturnId}
                            >
                              <div>
                                <h6 className="mb-1 ">
                                  Request Title -
                                  <span className="text-primary">
                                    {requestRow?.requestTitle}
                                  </span>
                                </h6>
                                <span
                                  className="cursor"
                                  onClick={() =>
                                    handleEditReturnData(requestRow)
                                  }
                                >
                                  <KeyboardArrowUpIcon />
                                  View Details
                                </span>
                              </div>
                              <span>
                                <Moment format="HH:MM A">
                                  {requestRow.updatedAt}
                                </Moment>
                                ,{" "}
                                <Moment format="DD MMM YY">
                                  {requestRow.updatedAt}
                                </Moment>
                              </span>
                            </div>
                          ))}
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
                        style={{ borderRadius: "10px 10px 0px 0px" }}
                      >
                        <span>Workflow Task</span>
                        {/* <MuiMenuComponent options={workFlowOptions} /> */}
                      </div>
                      <div className="px-3 py-1">
                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                          <h6>
                            <span className="text-primary">77699</span> requires
                            your attention
                          </h6>
                          <span>view Details</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                          <h6>
                            <span className="text-primary">77699</span> requires
                            your attention
                          </h6>
                          <span>view Details</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                          <h6>
                            <span className="text-primary">77699</span> requires
                            your attention
                          </h6>
                          <span>view Details</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
                          <h6>
                            <span className="text-primary">77699</span> requires
                            your attention
                          </h6>
                          <span>view Details</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-3">
                          <h6>
                            <span className="text-primary">77699</span> requires
                            your attention
                          </h6>
                          <span>view Details</span>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <div className="card border px-3 py-2 warranty-req-dash-card mb-4">
                  <div
                    className="d-flex justify-content-between align-items-baseline cursor"
                    onClick={toggleReturnRequesterModal}
                  >
                    <span className=" mb-0">Return Request</span>
                    <span>
                      <ArrowForwardIosIcon />
                    </span>
                  </div>
                </div>
                <div className="card border px-3 py-2 claim-req-dash-card mb-4">
                  <div
                    className="d-flex justify-content-between align-items-center cursor"
                    onClick={() => setOpenReturnReceivedModal(true)}
                  >
                    <span className=" mb-0">Return Received</span>
                    <span className="font-weight-500">
                      <ArrowForwardIosIcon />
                    </span>
                  </div>
                </div>
                <div className="card border px-3 py-2 req-anlysis-dash-card mb-4">
                  <div
                    className="d-flex justify-content-between align-items-center cursor"
                    onClick={() => setOpenReturnAnalysisModal(true)}
                  >
                    <span className=" mb-0">Return Analysis</span>
                    <span className="font-weight-500">
                      <ArrowForwardIosIcon />
                    </span>
                  </div>
                </div>
                <div className="card border px-3 py-2 req-replacement-dash-card mb-4">
                  <div
                    className="d-flex justify-content-between align-items-center cursor"
                    onClick={() => setOpenReplacementModal(true)}
                  >
                    <span className=" mb-0">Replacement</span>
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
              Return Records
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
                  height: 650,
                  // marginBottom: 8,
                  marginInline: 2,
                }}
              >
                <SearchBox
                  label={"Return Number"}
                  value={returnNumber}
                  handleChange={(e) => setReturnNumber(e.target.value)}
                  // size={250}
                />
                <SelectBox
                  label={"Return Type"}
                  value={returnType}
                  options={returnTypeOptions}
                  handleChange={(e) => setReturnType(e.target.value)}
                  showClearIcon={true}
                  handleUnselect={() => setReturnType("")}
                  size={150}
                />
                <DataGrid
                  // loading={partClassALoading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.warrantyReturnId}
                  rows={requestRecords}
                  columns={columns}
                  autoHeight
                  rowsPerPageOptions={[10, 20, 50]}
                  // checkboxSelection={true}
                  keepNonExistentRowsSelected
                />
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      {openReturnRequsterModal && (
        <ClaimReturnRequester
          show={openReturnRequsterModal}
          hideModal={() => setOpenReturnRequsterModal(false)}
          handleSnack={handleSnack}
          countryOptions={countryList}
          partsRecords={data}
          disposenNeed={false}
          shipmentHeaderId={shipmentHeaderId}
          setShipmentHeaderId={setShipmentHeaderId}
          // warrantyReturnId={warrantyReturnId}
          // setWarrantyReturnId={setWarrantyReturnId}
          requestCreation={requestCreation}
          setRequestCreation={setRequestCreation}
          shipmentReportRecords={requestRecords}
        />
      )}

      {openReturnReceivedModal && (
        <ReturnReceivedModal
          show={openReturnReceivedModal}
          hideModal={() => setOpenReturnReceivedModal(false)}
          handleSnack={handleSnack}
        />
      )}

      {openReturnAnalysisModal && (
        <ReturnAnalysisModal
          show={openReturnAnalysisModal}
          hideModal={() => setOpenReturnAnalysisModal(false)}
          handleSnack={handleSnack}
        />
      )}

      {openReplacementModal && (
        <ReplacementModal
          show={openReplacementModal}
          hideModal={() => setOpenReplacementModal(false)}
          handleSnack={handleSnack}
        />
      )}

      {/* <QuickCreateModal /> */}
      {/* <WarrantyRequestModal /> */}
    </>
  );
};

export default WarrantyReturnMaster;
