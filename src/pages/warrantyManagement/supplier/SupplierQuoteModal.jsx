import React, { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Tooltip, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const supplierClaimTypeOptions = [
  { label: "Settlement", value: "SETTLEMENT" },
  { label: "Product Replacement", value: "PRODUCT_REPLACEMENT" },
];

const supplierStatusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Sent to Supplier", value: "SENT_TO_SUPPLIER" },
  { label: "Receieved from Supplier ", value: "RECEIVED_FROM_SUPPLIER" },
  { label: "Replaced", value: "REPLACED" },
  { label: "Settled", value: "SETTLED" },
  { label: "Closed", value: "CLOSED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Contest", value: "CONTEST" },
];

const SupplierQuoteModal = ({ show, hideModal, handleSnack }) => {
  const [tabValue, setTabValue] = useState("supplierDetails");

  // view supplier details tab content
  const viewSupplierDetails = () => {
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
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER ID
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierId"
                  placeholder="Supplier ID"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER EMAIL
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierEmail"
                  placeholder="Supplier Email"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SUPPLIER ADDRESS
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="supplierAddress"
                  placeholder="Supplier Address"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PURCHASE CONTRACT NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="purchaseNumber"
                  placeholder="Purchase contract number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIM TYPE
                </label>
                <Select
                  //   onChange={(e) =>
                  //     setRecordData({
                  //       ...recordData,
                  //       requestType: e,
                  //     })
                  //   }
                  options={supplierClaimTypeOptions}
                  //   value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  STATUS
                </label>
                <Select
                  //   onChange={(e) =>
                  //     setRecordData({
                  //       ...recordData,
                  //       requestType: e,
                  //     })
                  //   }
                  options={supplierStatusOptions}
                  //   value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // view failure details tab content
  const viewFailureDetails = () => {
    return (
      <>
        <div className="card border mb-3 mt-2 px-3 py-3">
          <div className="row input-fields">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  EQUIPMENT NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="equipmentNumber"
                  placeholder="Equipment Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CONTRACT NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="contractNumber"
                  placeholder="Contarct Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  WORK ORDER NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="workOrderNumber"
                  placeholder="Work order Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="customerNumber"
                  placeholder="Customer Number"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="customerName"
                  placeholder="Customer Name"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SITE NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="siteName"
                  placeholder="Site Name"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  FAILURE CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="failureCode"
                  placeholder="Failure Code"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  FAILURE DESCRIPTION
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="failureDescripton"
                  placeholder="Failure Description"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  FAILURE DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={shipmentData.shippedOn}
                      // onChange={(e) =>
                      //   handleShipmentSelectChange(e, "shippedOn")
                      // }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            style: FONT_STYLE,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REPAIR DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={shipmentData.shippedOn}
                      // onChange={(e) =>
                      //   handleShipmentSelectChange(e, "shippedOn")
                      // }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            style: FONT_STYLE,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  DEALER CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="dealerCode"
                  placeholder="Dealer Code"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  ATTACH DOCUMENT/PHOTO
                </p>
                <div
                  className="file-upload-input bg-white border-radius-10 d-flex align-items-center justify-content-between cursor"
                  // onClick={handleShowFileUploadModal}
                >
                  <h6 className="text-primary m-0 font-size-16 font-weight-500">
                    {/* {isEmpty(warrantyRecord.proofOfInstall)
                                ? "Upload File"
                                : warrantyRecord.proofOfInstall} */}
                    Upload File
                  </h6>
                  <img
                    className="mx-1 cursor"
                    src="../../assets/images/fileUploadIcon.png"
                    alt="File Upload icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // view estimation details tab content
  const viewEstimationDetails = () => {
    return (
      <>
        <div className="card border mb-3 mt-2 px-3 py-3">
          <div className="row input-fields">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUESTED DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={shipmentData.shippedOn}
                      // onChange={(e) =>
                      //   handleShipmentSelectChange(e, "shippedOn")
                      // }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          inputProps={{
                            ...params.inputProps,
                            style: FONT_STYLE,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUESTED NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="requestedName"
                  placeholder="Requested Name"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUESTED EMAIL
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="requestedEmail"
                  placeholder="Requested Email"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUESTED CONTACT
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  // value={warrantyRecord.warrantyId}
                  name="requestedContact"
                  placeholder="Requested Contact"
                  // onChange={handleWarrantyRecordChange}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                aria-label="lab API tabs example"
                onChange={(e, newTabValue) => setTabValue(newTabValue)}
                // centered
              >
                <Tab label={`Supplier Details`} value="supplierDetails" />
                <Tab label={`Failure Details`} value="failureDetails" />
                <Tab label={`Estimation Details`} value="estimation" />
              </TabList>
            </Box>
            <TabPanel value={tabValue}>
              {tabValue === "supplierDetails" && viewSupplierDetails()}
              {tabValue === "failureDetails" && viewFailureDetails()}
              {tabValue === "estimation" && viewEstimationDetails()}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierQuoteModal;
