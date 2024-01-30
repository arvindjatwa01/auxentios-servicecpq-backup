import React from "react";
import { Box, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import penIcon from "../../../assets/images/pen.png";
import { filesRecords } from "./WarrantyConstants";
import DeleteIcon from "@mui/icons-material/Delete";

const OverviewFilesTabContainer = ({
  edit,
  handleTabChange,
  handleFilesUploadModal,
}) => {
  const filesColumns = [
    {
      field: "fileName",
      headerName: "File Name",
      flex: 1,
    },
    {
      field: "uploadDate",
      headerName: "Uplaod Date",
      flex: 1,
    },
    {
      field: "author",
      headerName: "Upload By",
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
                onClick={handleFilesUploadModal}
                // onClick={() => handleViewWarrantyDetails(params)}
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
          // <GridActionsCellItem
          //   icon={
          //     <div
          //       className=" cursor"
          //       // onClick={() => handleViewWarrantyOverview(params)}
          //     >
          //       <Tooltip title="delete">
          //         <DeleteIcon />
          //       </Tooltip>
          //     </div>
          //   }
          //   label="Edit"
          //   className="textPrimary"
          //   color="inherit"
          // />,
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
          <div className="row align-items-end text-end ">
            <div className="col-12 d-flex justify-content-end mb-2 float-end ">
              <button
                className="btn btn-primary float-end "
                onClick={handleFilesUploadModal}
              >
                Upload New
              </button>
            </div>
          </div>
          <DataGrid
            rows={filesRecords}
            columns={filesColumns}
            sx={GRID_STYLE}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-primary"
          id="files"
          onClick={handleTabChange}
        >
          {edit ? "Save & Close" : "Close"}
        </button>
      </div>
    </>
  );
};

export default OverviewFilesTabContainer;
