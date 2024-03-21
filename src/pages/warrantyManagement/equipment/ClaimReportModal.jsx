import React, { useEffect, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { Modal } from "react-bootstrap";

import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { CLAIM_MASTER_URL, WARRANTY_MASTER_URL } from "services/CONSTANTS";
import { GRID_STYLE } from "pages/Common/constants";
import ClaimCreateModal from "../claimMaster/ClaimCreateModal";
import {
  warrantyCategoryOptions,
  warrantyRequestObj,
  warrantyStatusOptions,
  warrantyUnitOptions,
} from "../warrantyManagementConstants";
import ClaimEditModal from "../claimMaster/ClaimEditModal";
import ClaimRequestModal from "../claimMaster/ClaimRequestModal";

const ClaimReportModal = ({
  show,
  hideModal,
  serialNumber,
  warrantyRecordId,
  openClaimCreateModal,
  handleClaimCreate,
  handleSnack,
  openClaimEditModal,
  handleOpenClaimEditModal,
  handleOpenClaimRequestModal,
  openClaimRequestModal,
  handleCloseClaimRequestModal,
  isReportModal = true,
}) => {
  const [warrantyRecord, setWarrantyRecord] = useState({
    ...warrantyRequestObj,
  });
  const [loading, setLoading] = useState(false);
  const [claimRecord, setClaimRecord] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [claimRecordDetail, setClaimRecordDetail] = useState(null);
  const [claimRecordId, setClaimRecordId] = useState(null);
  const [claimOrderId, setClaimOrderId] = useState(null);
  const [evaluationId, setEvaluationId] = useState(null);
  const [assesstmentId, setAssesstmentId] = useState(null);

  useEffect(() => {
    if (warrantyRecordId) {
      const rUrl = `${WARRANTY_MASTER_URL}/${warrantyRecordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const { installerDetails, customerDetails, ...restData } =
            response.data;
          const responseData = response.data;

          // get category key value pairs
          const _category = warrantyCategoryOptions.find(
            (obj) => obj.value === responseData.category
          );

          // get unit key value pairs
          const _unit = warrantyUnitOptions.find(
            (obj) => obj.value === responseData.unit
          );

          // get status key value pairs
          const _warrantyStatus = warrantyStatusOptions.find(
            (obj) => obj.value === responseData.warrantyStatus
          );

          // set warranty details
          setWarrantyRecord({
            ...responseData,
            category: _category || "",
            // basis: _basis || "",
            unit: _unit || "",
            warrantyStatus: _warrantyStatus || "",
          });
        } else {
          handleSnack("error", "Something went wrong");
        }
      });
    }
  }, [warrantyRecordId]);

  useEffect(() => {
    if (serialNumber) {
      setLoading(true);
      const rUrl = `${CLAIM_MASTER_URL}/search-by-fields?field_name=serialNumber&field_value=${serialNumber}`;
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            setClaimRecord(responseData);
            setLoading(false);
          } else {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
        }
      );
    }
  }, [serialNumber]);

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
              <div className="cursor">
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    onClick={() => handleEditClaimDetails(params)}
                  />
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

  // claim table page no and size change
  const handleClaimPaginationChange = (pageNo, rowsPerPage) => {
    setPage(pageNo);
    setPageSize(rowsPerPage);
  };

  // edit Claim Details
  const handleEditClaimDetails = (params) => {
    const claimId = params.row["claimId"];
    setClaimRecordDetail(params.row);
    setClaimRecordId(claimId);
    // setClaimData(params.row);
    handleOpenClaimEditModal();
  };

  return (
    <>
      {show &&
        !openClaimCreateModal &&
        !openClaimEditModal &&
        !openClaimRequestModal}
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <div className="row d-flex justify-content-between align-items-center mb-2 mx-1">
            <h4>Equipment Claim History</h4>
            <button className="btn btn-primary" onClick={handleClaimCreate}>
              + Create New
            </button>
          </div>
          <div className="card border px-2 py-2 mb-2">
            <Box
              sx={{
                width: "100%",
                height: 500,
                marginBottom: 2,
                marginInline: 0,
              }}
            >
              <DataGrid
                loading={loading}
                rows={claimRecord}
                columns={claimColumns}
                page={page}
                pageSize={pageSize}
                sx={GRID_STYLE}
                onPageChange={(newPage) =>
                  handleClaimPaginationChange(newPage, pageSize)
                }
                onPageSizeChange={(newPageSize) =>
                  handleClaimPaginationChange(page, newPageSize)
                }
                rowsPerPageOptions={[10, 20, 50]}
                // paginationMode="server"
                disableRowSelectionOnClick
                getRowId={(row) => row.claimId}
              />
            </Box>
          </div>
        </Modal.Body>
      </Modal>
      {isReportModal && openClaimCreateModal && (
        <ClaimCreateModal
          show={openClaimCreateModal}
          hideModal={handleClaimCreate}
          warrantyRecord={warrantyRecord}
          handleSnack={handleSnack}
        />
      )}
      {isReportModal && openClaimEditModal && (
        <ClaimEditModal
          show={openClaimEditModal}
          hideModal={handleOpenClaimEditModal}
          warrantyRecord={warrantyRecord}
          handleSnack={handleSnack}
          claimRecordId={claimRecordId}
          handleOpenClaimRequestModal={handleOpenClaimRequestModal}
        />
      )}
      {isReportModal && openClaimRequestModal && (
        <ClaimRequestModal
          show={openClaimRequestModal}
          hideModal={handleCloseClaimRequestModal}
          handleSnack={handleSnack}
          claimRecordDetail={claimRecordDetail}
          claimOrderId={claimOrderId}
          setClaimOrderId={setClaimOrderId}
          claimRecordId={claimRecordId}
          assesstmentId={assesstmentId}
          setAssesstmentId={setAssesstmentId}
          evaluationId={evaluationId}
          setEvaluationId={setEvaluationId}
          // openPartCreateModal={openPartCreateModal}
          // handleShowPartCreateModal={handleShowPartCreateModal}
          // handleShowReturnRequetrModal={handleShowReturnRequetrModal}
        />
      )}
    </>
  );
};

export default ClaimReportModal;
