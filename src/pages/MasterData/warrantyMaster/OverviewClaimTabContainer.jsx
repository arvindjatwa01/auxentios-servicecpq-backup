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
  handleGetFilterClaimRecords,
  activeClaimFilter,
  setClaimRecordId,
  setClaimRecordDataId,
  setClaimData,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleEditClaimDetails = (params) => {
    const claimId = params.row["claimId"];
    const claimType = params.row["claimType"];
    const claimNumber = params.row["claimNumber"];
    const warrantyId = params.row[" warrantyId"];
    setClaimData({
      claimType: claimType,
      claimNumber: claimNumber,
    });
    setClaimRecordId(claimId);
    setClaimRecordDataId(claimId);
    handleShowClaimDetails();
  };

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
              <div
                className=" cursor"
                onClick={() => handleEditClaimDetails(params)}
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
        ];
      },
    },
  ];

  const handlePaginationChange = (pageNo, rowsPerPage) => {
    setPage(pageNo);
    setPageSize(rowsPerPage);
  };

  return (
    <>
      <div className="card border px-3 pt-4">
        <div className="d-flex justify-content-around ">
          <div
            className="card border px-4 py-2 cursor"
            onClick={() => handleGetFilterClaimRecords("registered")}
            style={{
              backgroundColor:
                activeClaimFilter === "registered" ? "#f3eafe" : "",
            }}
          >
            <div className="py-4 px-2">
              <span className="">Claim Requested</span>
              <h3 className="mt-0 text-center">13</h3>
            </div>
          </div>
          <div
            className="card border px-4 py-2 cursor"
            onClick={() => handleGetFilterClaimRecords("acknowledged")}
            style={{
              backgroundColor:
                activeClaimFilter === "acknowledged" ? "#f3eafe" : "",
            }}
          >
            <div className="py-4 px-2">
              <span className="">Claim Accepted</span>
              <h3 className="mt-0 text-center">7</h3>
            </div>
          </div>
          <div
            className="card border px-4 py-2 cursor"
            onClick={() => handleGetFilterClaimRecords("accepted")}
            style={{
              backgroundColor:
                activeClaimFilter === "accepted" ? "#f3eafe" : "",
            }}
          >
            <div className="py-4 px-2">
              <span className="">Claim Completed</span>
              <h3 className="mt-0 text-center">3</h3>
            </div>
          </div>
          <div
            className="card border px-4 py-2 cursor"
            onClick={() => handleGetFilterClaimRecords("rejected")}
            style={{
              backgroundColor:
                activeClaimFilter === "rejected" ? "#f3eafe" : "",
            }}
          >
            <div className="py-4 px-2">
              <span className="">Claim Rejected</span>
              <h3 className="mt-0 text-center">3</h3>
            </div>
          </div>
          <div
            className="card border px-4 py-2 cursor"
            onClick={() => handleGetFilterClaimRecords("closed")}
            style={{
              backgroundColor: activeClaimFilter === "closed" ? "#f3eafe" : "",
            }}
          >
            <div className="py-4 px-2">
              <span className="">Claim Cancelled</span>
              <h3 className="mt-0 text-center">7</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="card border px-4 py-2">
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
            page={page}
            pageSize={pageSize}
            sx={GRID_STYLE}
            onPageChange={(newPage) =>
              handlePaginationChange(newPage, pageSize)
            }
            onPageSizeChange={(newPageSize) =>
              handlePaginationChange(page, newPageSize)
            }
            //   initialState={{
            //     pagination: {
            //       paginationModel: {
            //         pageSize: 5,
            //       },
            //     },
            //   }}
            rowsPerPageOptions={[10, 20, 50]}
            paginationMode="server"
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
