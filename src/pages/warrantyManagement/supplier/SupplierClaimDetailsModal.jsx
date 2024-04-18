import React, { useEffect, useState } from "react";

import StarIcon from "@mui/icons-material/Star";

import Rating from "@mui/material/Rating";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import $ from "jquery";
import { Modal } from "react-bootstrap";

import { CLAIM_MASTER_URL } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callGetApi } from "services/ApiCaller";
import { GRID_STYLE } from "pages/Common/constants";
import { PARTLIST_BUILDER_SEARCH_Q_OPTIONS } from "pages/Repair/CONSTANTS";
import { builderSearch } from "services/repairBuilderServices";
import SearchComponent from "pages/components/SearchComponent";
import { partsSearchOptions } from "pages/MasterData/equipmentMasterConstants";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const SupplierClaimDetailsModal = ({ show, hideModal, handleSnack }) => {
  const [tabValue, setTabValue] = useState("details");

  const [claimHistoryPage, setClaimHistoryPage] = useState(0);
  const [claimHistoryPageSize, setClaimHistoryPageSize] = useState(10);
  const [claimRecord, setClaimRecord] = useState([]);

  const [claimPage, setClaimPage] = useState(0);
  const [claimPageSize, setClaimPageSize] = useState(10);

  const [masterData, setMasterData] = useState([]);
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  const [ratingValue, setRatingValue] = useState(0);
  const [ratingHover, setRatingHover] = useState(-1);

  useEffect(() => {
    const rUrl = `${CLAIM_MASTER_URL}/search-by-fields?pageNumber=${0}&pageSize=${25}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimRecord(responseData);
      }
    });
  }, []);

  // history claim table page no and size change
  const handleHistoryClaimPageChange = (pageNo, rowsPerPage) => {
    setClaimHistoryPage(pageNo);
    setClaimHistoryPageSize(rowsPerPage);
  };

  // claim table page no and size change
  const handleClaimPageChange = (pageNo, rowsPerPage) => {
    setClaimPage(pageNo);
    setClaimPageSize(rowsPerPage);
  };

  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await builderSearch(
          `builderType:PARTLIST AND saved:true AND ${searchStr}`
        );
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  // details tab content
  const viewSupplierClaimDetails = () => {
    return (
      <>
        <div className="card border mb-3 mt-2 px-3 py-3">
          <div className="row input-fields">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierCode"
                  placeholder="Supplier Code"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierName"
                  placeholder="Supplier Name"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CONTACT EMAIL
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="email"
                  placeholder="Contact Email"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  COTANCT NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="contactNumber"
                  placeholder="Contact Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  ADDRESS 1
                </label>
                <textarea
                  cols="30"
                  rows="1"
                  className="form-control border-radius-10 text-primary"
                  placeholder="Address 1"
                  name="address1"
                  // value={recordData.description}
                  // onChange={handleInputTextChange}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  ADDRESS 2
                </label>
                <textarea
                  cols="30"
                  rows="1"
                  className="form-control border-radius-10 text-primary"
                  placeholder="Address 2"
                  name="address2"
                  // value={recordData.description}
                  // onChange={handleInputTextChange}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  COTRANCT NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="contact"
                  placeholder="Contact Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PO NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="po"
                  placeholder="PO Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  ERP Number
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="erpNumber"
                  placeholder="ERP Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REFERENCE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="reference"
                  placeholder="Reference"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // claim columns
  const claimColumns = [
    {
      field: "claimId",
      headerName: "Id",
      width: 70,
      // flex: 1,
    },
    {
      field: "claimNumber",
      headerName: "Claim Number",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
    },
    {
      field: "modelNumber",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "createdOn",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "partList",
      headerName: "PO Number",
      flex: 1,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "totalClaim",
      headerName: "Total Claim",
      flex: 1,
    },
    {
      field: "totalSettled",
      headerName: "Total Settled",
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
  ];

  // history tab content
  const viewHistoryTab = () => {
    return (
      <>
        {/* <div className="card border mb-3 mt-2 px-1 py-3"> */}
        <DataGrid
          rows={claimRecord}
          columns={claimColumns}
          page={claimHistoryPage}
          pageSize={claimHistoryPageSize}
          sx={GRID_STYLE}
          onPageChange={(newPage) =>
            handleHistoryClaimPageChange(newPage, claimHistoryPageSize)
          }
          onPageSizeChange={(newPageSize) =>
            handleHistoryClaimPageChange(claimHistoryPage, newPageSize)
          }
          rowsPerPageOptions={[10, 20, 50]}
          // paginationMode="server"
          disableRowSelectionOnClick
          getRowId={(row) => row.claimId}
          autoHeight
        />
        {/* </div> */}
      </>
    );
  };

  // history tab content
  const viewClaimsTab = () => {
    return (
      <>
        {/* <div className="card border mb-3 mt-2 px-1 py-3"> */}
        <DataGrid
          rows={claimRecord}
          columns={claimColumns}
          page={claimPage}
          pageSize={claimPageSize}
          sx={GRID_STYLE}
          onPageChange={(newPage) =>
            handleClaimPageChange(newPage, claimPageSize)
          }
          onPageSizeChange={(newPageSize) =>
            handleClaimPageChange(claimPage, newPageSize)
          }
          rowsPerPageOptions={[10, 20, 50]}
          // paginationMode="server"
          disableRowSelectionOnClick
          getRowId={(row) => row.claimId}
          autoHeight
        />
        {/* </div> */}
      </>
    );
  };

  const searchBuilderColumns = [
    { field: "estimationNumber", headerName: "ID#", flex: 1, width: 70 },
    { field: "partNumber", headerName: "Part Number", flex: 1, width: 70 },
    {
      field: "partDescription",
      headerName: "Part Description",
      flex: 1,
      width: 130,
    },
    { field: "claimType", headerName: "Claim Type", flex: 1, width: 130 },
    { field: "poNumber", headerName: "PO#", flex: 1, width: 130 },
    { field: "reference", headerName: "Reference", flex: 1, width: 130 },
    {
      field: "warrantyStateDate",
      headerName: "Warranty Start Date",
      flex: 1,
      width: 130,
    },
    {
      field: "warrantyEndDate",
      headerName: "Warranty End Date",
      flex: 1,
      width: 130,
    },
  ];

  // products tab content
  const viewProductTab = () => {
    return (
      <>
        <div className="bg-primary px-3 mb-3 border-radius-6">
          <div className="row align-items-center">
            <div className="col-11 mx-2">
              <div className="d-flex align-items-center bg-primary w-100">
                <div className="d-flex mr-3 py-3" style={{ whiteSpace: "pre" }}>
                  <h5 className="mr-2 mb-0 text-white">
                    <span>Search</span>
                  </h5>
                </div>
                <SearchComponent
                  querySearchSelector={querySearchSelector}
                  setQuerySearchSelector={setQuerySearchSelector}
                  clearFilteredData={clearFilteredData}
                  handleSnack={handleSnack}
                  searchAPI={builderSearch}
                  searchClick={handleQuerySearchClick}
                  options={partsSearchOptions}
                  color="white"
                  builderType="PARTLIST"
                  buttonText={"SEARCH"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <DataGrid
            sx={GRID_STYLE}
            rows={masterData}
            columns={searchBuilderColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </div>
      </>
    );
  };

  //
  const viewScroeCardTab = () => {
    return (
      <>
        <div className="card border mb-3 mt-2 px-3 py-3">
          <div className="row input-fields">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierName"
                  placeholder="Supplier Name"
                  disabled
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER RATING
                </label>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={ratingValue}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setRatingHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {ratingValue !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[ratingHover !== -1 ? ratingHover : ratingValue]}
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body> */}
      <Box sx={{ typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              className="custom-tabs-div"
              aria-label="lab API tabs example"
              onChange={(e, newTabValue) => setTabValue(newTabValue)}
              // centered
            >
              <Tab label={`Details`} value="details" />
              <Tab label={`History`} value="history" />
              <Tab label={`Claims`} value="claims" />
              <Tab label={`Products`} value="products" />
              <Tab label={`Scorecard`} value="scoreCard" />
            </TabList>
          </Box>
          <TabPanel value={tabValue}>
            {tabValue === "details" && viewSupplierClaimDetails()}
            {tabValue === "history" && viewHistoryTab()}
            {tabValue === "claims" && viewClaimsTab()}
            {tabValue === "products" && viewProductTab()}
            {tabValue === "scoreCard" && viewScroeCardTab()}
          </TabPanel>
        </TabContext>
      </Box>
      {/* </Modal.Body>
      </Modal> */}
    </>
  );
};

export default SupplierClaimDetailsModal;
