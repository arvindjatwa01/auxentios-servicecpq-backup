import React from "react";
import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import penIcon from "../../../assets/images/pen.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { filesRecords } from "../warrantyMaster/WarrantyConstants";
import VisibilityIcon from "@mui/icons-material/Visibility";


const claimOrderRecrods = [{ claimId: "1234", orderId: "RO000121" }];

const ClaimOrdersDataList = ({ claimId = 101 }) => {
  const filesColumns = [
    {
      field: "fileName",
      headerName: "Claim Number",
      flex: 1,
      renderCell: (params) => (
        <div>{claimId}</div>
      ),
    },
    {
      field: "orderId",
      headerName: "Order Id",
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
                className="cursor"
                // onClick={handleFilesUploadModal}
                // onClick={() => handleViewWarrantyDetails(params)}
              >
                <Tooltip title="View">
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
  return (
    <>
      <div className="card px-3">
        <Box
          sx={{
            width: "100%",
            height: 500,
            marginBottom: 5,
            marginInline: 2,
          }}
        >
          <DataGrid
            rows={claimOrderRecrods}
            getRowId={(row) => row.orderId}
            columns={filesColumns}
            sx={GRID_STYLE}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};

export default ClaimOrdersDataList;
