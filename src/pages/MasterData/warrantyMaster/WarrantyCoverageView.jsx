import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Box, Divider, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Select from "react-select";
import { FONT_STYLE_SELECT, GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { Warranty_Cost_Coverage_Create_POST } from "services/CONSTANTS";
import { callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

// const costCoverageDropdowns = [
//   { label: "Parts %", value: "parts" },
//   { label: "Labour %", value: "labour" },
//   { label: "Misc %", value: "expenses" },
// ];

const CoverageTypeOptions = [
  { label: "Only Parts", value: "ONLY_PARTS" },
  { label: "Only Labour", value: "ONLY_LABOUR" },
  { label: "Parts & Labour", value: "PARTS_AND_LABOUR" },
  { label: "All", value: "ALL" },
];

const WarrantyCoverageView = ({
  show,
  hideModal,
  yearlyWarrantyId,
  warrantyCoverageIds,
  setWarrantyCoverageIds,
  handleSnack,
  yearWarrantyComponentData =[]
}) => {
  const [tabValue, setTabValue] = useState("warrantyCoverage");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [coverageType, setCoverageType] = useState("");
  const [covereageValues, setCovereageValues] = useState({
    parts: 0,
    labour: 0,
    expenses: 0,
  });

  const handleSelectCoverageType = (e) => {
    setCoverageType(e);
    setCovereageValues({
      parts: 0,
      labour: 0,
      expenses: 0,
    });
  };

  const columns = [
    {
      field: "partNumber",
      headerName: "Part#",
      flex: 1,
      width: 80,
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      width: 80,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 80,
    },
    {
      field: "serialNumber",
      headerName: "Serial#",
      flex: 1,
      width: 80,
    },
    {
      field: "warrantyType",
      headerName: "Warranty",
      flex: 1,
      width: 80,
    },
    {
      field: "warrantyCategory",
      headerName: "Category",
      flex: 1,
      width: 80,
    },
    {
      field: "machineSerialNumber",
      headerName: "Machine Serial#",
      flex: 1,
      width: 80,
    },
    {
      field: "warrantyStartDate",
      headerName: "Warranty Start",
      flex: 1,
      width: 80,
    },
    {
      field: "warrantyEndDate",
      headerName: "Warranty End",
      flex: 1,
      width: 80,
    },
  ];

  const handleSaveCostCoverageDetails = () => {
    const rUrl = `${Warranty_Cost_Coverage_Create_POST}`;
    const rObj = {
      labourCovered: covereageValues.labour,
      partsCovered: covereageValues.parts,
      expensesCovered: covereageValues.expenses,
      yearlyWarrantyId: yearlyWarrantyId,
    };
    if (!isEmpty(warrantyCoverageIds[yearlyWarrantyId])) {
      callPutApi(
        null,
        `${rUrl}/${warrantyCoverageIds[yearlyWarrantyId]}`,
        rObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            handleSnack("success", "Cost Coverage Updated Successfully");
          }
        }
      );
    } else {
      callPostApi(null, `${rUrl}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleSnack("success", "Cost Coverage Created Successfully");
          setWarrantyCoverageIds({
            ...warrantyCoverageIds,
            [yearlyWarrantyId]: responseData.costCoverageId,
          });
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Grid item xs={12}>
          <TabContext value={tabValue}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: 1,
                marginInline: 5,
              }}
            >
              <TabList className="" onChange={(e, value) => setTabValue(value)}>
                <Tab
                  label="Warranty Coverage"
                  value={"warrantyCoverage"}
                  className="heading-tabs"
                />
                <Tab
                  label="Cost Coverage"
                  value={"costCoverage"}
                  className="heading-tabs"
                />
              </TabList>
            </Box>
            <TabPanel value="warrantyCoverage">
              <Box sx={{ height: 500, marginBottom: 8, marginInline: 2 }}>
                <DataGrid
                  loading={loading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.componentId}
                  page={page}
                  pageSize={pageSize}
                  //   onPageChange={(newPage) =>
                  //     fetchPartClassBRecords(newPage, partClassBPageSize)
                  //   }
                  //   onPageSizeChange={(newPageSize) =>
                  //     fetchPartClassBRecords(partClassBPageNo, newPageSize)
                  //   }
                  rows={yearWarrantyComponentData}
                  columns={columns}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={totalRecords}
                  checkboxSelection={true}
                  keepNonExistentRowsSelected
                  onSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  selectionModel={rowSelectionModel}
                />
              </Box>
            </TabPanel>
            <TabPanel value="costCoverage">
              <div className="row input-fields">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Select Coverage Type
                    </label>
                    <Select
                      className="text-primary"
                      options={CoverageTypeOptions}
                      placeholder="Select Coverage Type"
                      value={coverageType}
                      onChange={handleSelectCoverageType}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
              </div>
              <Divider sx={{ marginBottom: 4 }} />
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Parts Covered
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <span className="hours-div warranty-Covereage-div">
                      Parts %
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="Enter value (%)"
                      name="recommendedValue"
                      disabled={
                        coverageType === "" ||
                        coverageType?.value === "ONLY_LABOUR"
                          ? true
                          : false
                      }
                      readOnly={
                        coverageType === "" ||
                        coverageType?.value === "ONLY_LABOUR"
                          ? true
                          : false
                      }
                      value={covereageValues.parts}
                      onChange={(e) =>
                        setCovereageValues({
                          ...covereageValues,
                          parts: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Labour Covered
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <span className="hours-div warranty-Covereage-div">
                      Labour %
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="Enter value (%)"
                      name="recommendedValue"
                      disabled={
                        coverageType === "" ||
                        coverageType?.value === "ONLY_PARTS"
                          ? true
                          : false
                      }
                      readOnly={
                        coverageType === "" ||
                        coverageType?.value === "ONLY_PARTS"
                          ? true
                          : false
                      }
                      value={covereageValues.labour}
                      onChange={(e) =>
                        setCovereageValues({
                          ...covereageValues,
                          labour: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Expenses Covered
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <span className="hours-div warranty-Covereage-div">
                      Expenses %
                    </span>
                    <input
                      type="number"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="Enter value (%)"
                      name="recommendedValue"
                      disabled={coverageType?.value === "ALL" ? false : true}
                      readOnly={coverageType?.value === "ALL" ? false : true}
                      value={covereageValues.expenses}
                      onChange={(e) =>
                        setCovereageValues({
                          ...covereageValues,
                          expenses: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3" style={{ justifyContent: "right" }}>
                <button
                  type="button"
                  className="btn btn-light bg-primary text-white"
                  onClick={handleSaveCostCoverageDetails}
                >
                  Save
                </button>
              </div>
              {/* <div className="row align-items-center">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Labour Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Parts Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Expenses Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">100%</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">50%</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">50%</h5>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div> */}
            </TabPanel>
          </TabContext>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyCoverageView;
