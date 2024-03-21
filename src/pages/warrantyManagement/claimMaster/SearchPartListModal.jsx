import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { Modal } from "react-bootstrap";

import {
  EVALUATION_PARTS_MASTER_URL,
  RELATED_PARTS_MASTER_URL,
  SHIPMENT_PARTS_MASTER_URL,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callPostApi } from "services/ApiCaller";

const SearchPartListModal = ({
  show,
  hideModal,
  masterData = [],
  claimOrderId,
  setRelatedPartsRecords,
  evaluationPart = false,
  evaluationId,
  isFailedPart,
  isShipmentSearch = false,
}) => {
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  // Select parts to add
  const onRowsSelectionHandler = (ids) => {
    setSelectedMasterData([]);
    const selectedRowsData = ids.map((id) =>
      masterData.find((row) => row.id === id)
    );
    // console.log(selectedRowsData);
    setSelectedMasterData(selectedRowsData);
  };

  // Search table column for spareparts
  const columnsPartListSearch = [
    { headerName: "Group Number", field: "groupNumber", flex: 1, width: 70 },
    { headerName: "Type", field: "partType", flex: 1, width: 130 },
    { headerName: "Part Number", field: "partNumber", flex: 1, width: 130 },
    {
      headerName: "Description",
      field: "partDescription",
      flex: 1,
      width: 130,
    },
    { headerName: "Currency", field: "currency", flex: 1, width: 130 },
    // { headerName: "Unit Price", field: "listPrice", flex: 1, width: 130 },
    { headerName: "Status", field: "status", flex: 1, width: 130 },
  ];

  const handleCreateNewPart = (data) => {
    let rUrl = "";
    if (evaluationPart) {
      rUrl = EVALUATION_PARTS_MASTER_URL;
    } else if (isShipmentSearch) {
      rUrl = SHIPMENT_PARTS_MASTER_URL;
    } else {
      rUrl = RELATED_PARTS_MASTER_URL;
    }
    return new Promise((resolve) => {
      callPostApi(
        null,
        rUrl,
        data,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve({
              success: true,
              data: { ...response["data"], supplier: "SP0023" },
            });
          } else {
            resolve({ success: false });
          }
        },
        (error) => {
          resolve({ success: false });
        }
      );
    });
  };

  // Add the selected parts from search result to partlist
  const addSelectedPartsToPartList = async () => {
    if (selectedMasterData.length !== 0) {
      const rowsData = [];
      for (const row of selectedMasterData) {
        try {
          var currentDate = new Date();
          let obj = {};
          if (evaluationPart) {
            obj = {
              partNumber: row.partNumber,
              partDescription: row.partDescription,
              cylinderPack: "",
              quantity: 1,
              analysis: "KNOWN_TO_BE_FAULTY",
              returnType: "INTRA_COMPANY",
              cost: 0,
              partsType: isFailedPart ? "FAILURE_PARTS" : "CAUSAL_PARTS",
              evaluationId: evaluationId,
              partsHeaderId: 0,
            };
          } else if (isShipmentSearch) {
            obj = {
              shipmentPartNumber: row.partNumber,
              shipmentPartDescription: row.partDescription,
              cylinderPack: "",
              quantity: 1,
              analysis: "KNOWN_TO_BE_FAULTY",
              returnType: "INTRA_COMPANY",
              cost: 0,
              partsType: "FAILURE_PARTS",
              disposeType: "RECEIVED",
              shipmentHeaderId: 0,
            };
          } else {
            obj = {
              segment: "",
              jobCode: "",
              title: "",
              compCode: "",
              description: row.partDescription,
              portfolioId: "",
              subDescription: "",
              version: "",
              taskType: "",
              quantity: 1,
              model: row.model,
              serialNo: row.partNumber,
              validFrom: currentDate,
              validTo: currentDate,
              // validTo: currentDate.setFullYear(currentDate.getFullYear() + 1),
              unitPrice: 0,
              extendedPrice: 0,
              discount: 0,
              totalPrice: 0,
              claimOrderId: claimOrderId,
            };
          }
          const result = await handleCreateNewPart(obj);
          if (result.success) {
            rowsData.push(result.data);
          }
        } catch (error) {}
      }
      setRelatedPartsRecords((pre) => [...pre, ...rowsData]);
      hideModal();
    }
  };

  return (
    <Modal
      show={show}
      onHide={hideModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header-border">
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-white">
        <div className="card w-100 p-2">
          <div
            className=""
            style={{
              height: 400,
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <DataGrid
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#872ff7",
                  color: "#fff",
                },
              }}
              rows={masterData}
              columns={columnsPartListSearch}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
          </div>
        </div>
        <div className="m-2 text-right">
          <button
            className="btn text-white bg-primary mr-2"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            className="btn text-white bg-primary"
            onClick={addSelectedPartsToPartList}
          >
            + Add Selected
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchPartListModal;
