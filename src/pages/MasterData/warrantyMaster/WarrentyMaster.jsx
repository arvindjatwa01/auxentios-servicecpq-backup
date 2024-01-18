import React, { useEffect, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import penIcon from "../../../assets/images/pen.png";
import WarrantyDetails from "./WarrantyDetails";
import { warrantyDummyRecord } from "./WarrantyConstants";
import WarrantyOverView from "./WarrantyOverView";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";
import ClaimDetails from "./ClaimDetails";

const WarrantyMaster = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);

  useEffect(() => {
    if (!showDetailsModal) {
      setRecordId(null);
    }
  }, [showDetailsModal]);

  const warrantyColumns = [
    {
      field: "warrantyId",
      headerName: "Warranty Id",
      //   width: 90,
      flex: 1,
    },
    {
      field: "modelNo",
      headerName: "Model Number",
      width: 150,
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      width: 120,
      flex: 1,
    },
    {
      field: "warrantyStartDate",
      headerName: "Warranty Start Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "warrantyEndDate",
      headerName: "Warranty End Date",
      //   width: 120,
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      //   width: 90,
      flex: 1,
    },
    {
      field: "insataller",
      headerName: "Distributor",
      //   width: 90,
      flex: 1,
    },
    {
      field: "warrantyStatus",
      headerName: "Warranty Status",
      width: 150,
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => handleViewWarrantyDetails(params)}
              >
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => setShowOverviewModal(true)}
              >
                <Tooltip title="Overview">
                  <VisibilityIcon />
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

  const handleViewWarrantyDetails = (parms) => {
    setRecordId(parms.id);
    setShowDetailsModal(true);
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Warranty Master</h5>

          <div className="card border mt-4 px-4">
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
              <Box
                sx={{
                  width: "100%",
                  height: 700,
                  // marginBottom: 8,
                  marginInline: 2,
                }}
              >
                <DataGrid
                  rows={warrantyDummyRecord}
                  columns={warrantyColumns}
                  sx={GRID_STYLE}
                  //   initialState={{
                  //     pagination: {
                  //       paginationModel: {
                  //         pageSize: 5,
                  //       },
                  //     },
                  //   }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      {showDetailsModal && (
        <WarrantyDetails
          show={showDetailsModal}
          hideModal={() => setShowDetailsModal(false)}
          recordId={recordId}
        />
      )}

      {showOverviewModal && (
        <WarrantyOverView
          show={showOverviewModal}
          hideModal={() => setShowOverviewModal(false)}
          handleOverViewModal={() => {
            setShowOverviewModal(!showOverviewModal);
            setShowClaimModal(!showClaimModal);
          }}
          handleClaimDetailsModal={() => {
            setShowOverviewModal(!showOverviewModal);
            setShowClaimDetailsModal(!showClaimDetailsModal);
          }}
        />
      )}

      {showClaimModal && (
        <WarrantyClaimAddUpdate
          show={showClaimModal}
          hideModal={() => {
            setShowOverviewModal(!showOverviewModal);
            setShowClaimModal(!showClaimModal);
          }}
        />
      )}
      {showClaimDetailsModal && (
        <ClaimDetails
          show={showClaimDetailsModal}
          hideModal={() => {
            setShowOverviewModal(!showOverviewModal);
            setShowClaimDetailsModal(!showClaimDetailsModal);
          }}
        />
      )}
    </>
  );
};

export default WarrantyMaster;
