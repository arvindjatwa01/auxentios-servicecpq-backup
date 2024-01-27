import React, { useState } from "react";

import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import penIcon from "../../../assets/images/pen.png";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";

const OverviewClaimTabContainer = ({
  recordData = [],
  edit,
  handleTabChange,
  handleShowClaimAddEditModal,
  handleShowClaimDetails,
}) => {
  const claimColumns = [
    {
      field: "claimNumber",
      headerName: "Claim Number",
      flex: 1,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontWeight: "bold" }}>{params.value ? "Yes" : "No"}</div>
      ),
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor" onClick={handleShowClaimDetails}>
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
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
      <div className="card px-3">
        <div className="d-flex justify-content-around ">
          <div className="card border px-2 py-2 cursor-pointer">
            <div className="py-4 px-2">
              <span className="">Claim Requested</span>
              <h3 className="mt-0">12</h3>
            </div>
          </div>
          <div className="card border px-2 py-2 cursor-pointer">
            <div className="py-4 px-2">
              <span className="">Claim Accepted</span>
              <h3 className="mt-0">6</h3>
            </div>
          </div>
          <div className="card border px-2 py-2 cursor-pointer">
            <div className="py-4 px-2">
              <span className="">Claim Completed</span>
              <h3 className="mt-0">4</h3>
            </div>
          </div>
          <div className="card border px-2 py-2 cursor-pointer">
            <div className="py-4 px-2">
              <span className="">Claim Rejected</span>
              <h3 className="mt-0">2</h3>
            </div>
          </div>
          <div className="card border px-2 py-2 cursor-pointer">
            <div className="py-4 px-2">
              <span className="">Claim Cancelled</span>
              <h3 className="mt-0">1</h3>
            </div>
          </div>
        </div>
        <Box
          sx={{
            width: "100%",
            height: 500,
            marginBottom: 5,
            marginInline: 2,
          }}
        >
          <div className="row align-items-end text-end ">
            <div className="col-12 d-flex justify-content-end mb-2 float-end ">
              <button
                className="btn btn-primary float-end "
                onClick={handleShowClaimAddEditModal}
              >
                Create New
              </button>
            </div>
          </div>
          <DataGrid
            rows={recordData}
            columns={claimColumns}
            sx={GRID_STYLE}
            //   initialState={{
            //     pagination: {
            //       paginationModel: {
            //         pageSize: 5,
            //       },
            //     },
            //   }}
            rowsPerPageOptions={[10, 20, 50]}
            //   paginationMode="server"
            disableRowSelectionOnClick
            getRowId={(row) => row.claimId}
          />
        </Box>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          id="claim"
          onClick={handleTabChange}
        >
          {edit ? "Save & Next" : "Next"}
        </button>
      </div>
    </>
  );
};

export default OverviewClaimTabContainer;
