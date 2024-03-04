import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Box, Divider, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Select from "react-select";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

const WarrantyCoverageView = ({ show, hideModal }) => {
  const [tabValue, setTabValue] = useState("warrantyCoverage");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

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
      field: "category",
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
                  getRowId={(row) => row.index}
                  page={page}
                  pageSize={pageSize}
                  //   onPageChange={(newPage) =>
                  //     fetchPartClassBRecords(newPage, partClassBPageSize)
                  //   }
                  //   onPageSizeChange={(newPageSize) =>
                  //     fetchPartClassBRecords(partClassBPageNo, newPageSize)
                  //   }
                  rows={[]}
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
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Additional
                  </label>
                  <div className="date-box w-100">
                    <div className="form-group w-100">
                      <div className=" d-flex form-control-date ">
                        <Select
                          className="select-input text-primary"
                          options={[]}
                          placeholder="Select "
                        />
                        <div>
                          <input
                            type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                            id="fromInput"
                            aria-describedby="emailHelp"
                            placeholder="10%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Price Escalation
                  </label>
                  <div className="date-box w-100">
                    <div className="form-group w-100">
                      <div className=" d-flex form-control-date ">
                        <Select
                          className="select-input text-primary"
                          options={[]}
                          placeholder="Select "
                        />
                        <div>
                          <input
                            type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                            id="fromInput"
                            aria-describedby="emailHelp"
                            placeholder="10%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider sx={{ marginBottom: 2 }} />
              <div className="row align-items-center">
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Labour Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Parts Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">Expenses Covered</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">100%</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
                    <div
                      className="card border px-2 py-1 mt-1 mb-0"
                      style={{ backgroundColor: "#d7d7d7", color: "#a1a1a0" }}
                    >
                      <div className="card-body">
                        <h5 className="mt-0 text-center">50%</h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    // sx={{ cursor: "pointer" }}
                    // onClick={() => handleCardPageChange(2)}
                  >
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
              </div>
            </TabPanel>
          </TabContext>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyCoverageView;
