import React, { useState } from "react";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import Select from "react-select";
import { Modal } from "react-bootstrap";

import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  payerOptions,
} from "../warrantyManagementConstants";
import { callPostApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { CLAIM_MASTER_URL } from "services/CONSTANTS";

const ClaimCreateModal = ({ show, hideModal, warrantyRecord, handleSnack }) => {
  const [claimRecord, setClaimRecord] = useState({
    ...claimRequestObj,
  });

  // claim input fields value change
  const handleClaimInputFieldChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  // claim select option value change
  const handleClaimSelectFieldChange = (e, keyName) => {
    setClaimRecord({ ...claimRecord, [keyName]: e });
  };

  // create new claim record
  const handleCreateNewClaim = () => {
    const rUrl = `${CLAIM_MASTER_URL}`;
    const rObj = {
      ...claimRecord,
      claimStatus: claimRecord.claimStatus?.value || "EMPTY",
      claimType: claimRecord.claimType?.value || "EMPTY",
      payer: claimRecord.payer?.value || "EMPTY",
      warranty: {
        warrantyId: warrantyRecord?.warrantyId,
      },
    };

    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack("success", "Claim Created Succeefully.");
        hideModal();
      } else {
        handleSnack("error", "Something went wrong");
      }
    });
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 border-50 text-white bg-primary">
            <div className="card py-4 px-2 text-white bg-primary align-items-center ">
              <h2 className="text-white">Warranty Claim</h2>
              <h5 className="text-white">Provided Information</h5>
              <div
                className="row px-2 d-flex flex-column justify-content-center align-items-center"
                style={{ borderLeft: "1px solid #ffffff" }}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                      Warranty Status
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      Under Warranty*
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                      Warranty ID
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      STD-12
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                      Serial Number
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      ZMX00507
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white text-white font-size-12 m-0 font-weight-500">
                      Model Number
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      992K
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                      Replacement
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      Yes
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                      Installed
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      Yes
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="d-block">
                    <p className="text-light-60 text-white font-size-12 m-0 font-weight-100">
                      Distributor Info
                    </p>
                    <p className="text-white font-size-12 mb-1 font-weight-500 text-uppercase">
                      <AssignmentTurnedInIcon />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 border-50">
            <div className="card px-2 py-3 border mb-0">
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CLAIMENT
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={"Partner"}
                        disabled
                        // value={claimRecordData.claimNumber}
                        // name="claiment"
                        placeholder="Claiment"
                        // onChange={handleClaimRecordDataChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        WARRANTY ID
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        // value={claimRecordData?.customerName}
                        disabled
                        name="warrantyId"
                        placeholder="Warranty Id"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        WARRANTY REQUEST ID
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        // value={claimRecordData.claimOrderId}
                        placeholder="Warranty Request Id"
                        disabled={true}
                        // name="claiment"
                        // onChange={handleClaimRecordDataChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PARTNER NAME
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        // value={claimRecordData?.customerName}
                        disabled
                        name="partnerName"
                        placeholder="Partner Name"
                        // onChange={handleClaimRecordDataChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CLAIM NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.claimNumber}
                        name="claimNumber"
                        placeholder="Claim Number"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        EQUIPMENT NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.equipmentNumber}
                        name="equipmentNumber"
                        placeholder="Equipment Number"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        SERIAL NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.serialNumber}
                        name="serialNumber"
                        placeholder="Serial Number"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        MODEL NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.modelNumber}
                        name="modelNumber"
                        placeholder="Model Number"
                        disable
                        //   onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <FormGroup>
                        <FormControlLabel
                          style={{ alignItems: "start", marginLeft: 0 }}
                          control={
                            <Switch
                              checked={claimRecord.replacement}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  replacement: e.target.checked,
                                })
                              }
                            />
                          }
                          labelPlacement="top"
                          label={
                            <span className="text-light-dark font-size-12 font-weight-500">
                              REPLACEMENT
                            </span>
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        COMPONENT CODE
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.componentCode}
                        name="componentCode"
                        placeholder="Component Code"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        COMPONENT SERIAL NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.componentCode}
                        name="componentCode"
                        placeholder="Component Code"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PART NUMBER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.componentCode}
                        name="componentCode"
                        placeholder="Component Code"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CLAIM TYPE
                      </label>
                      <Select
                        className="text-primary"
                        options={claimTypeOptions}
                        onChange={(e) =>
                          handleClaimSelectFieldChange(e, "claimType")
                        }
                        value={claimRecord.claimType}
                        styles={FONT_STYLE_SELECT}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CLAIM STATUS
                      </label>
                      <Select
                        className="text-primary"
                        options={claimStatusOptions}
                        onChange={(e) =>
                          handleClaimSelectFieldChange(e, "claimStatus")
                        }
                        value={claimRecord.claimStatus}
                        styles={FONT_STYLE_SELECT}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CLAIM APPROVER
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.claimApprover}
                        name="claimApprover"
                        placeholder="Claim Approver"
                        onChange={handleClaimInputFieldChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
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
                            value={claimRecord.fillDate}
                            onChange={(e) =>
                              handleClaimSelectFieldChange(e, "fillDate")
                            }
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
                            value={claimRecord.fillDate}
                            onChange={(e) =>
                              handleClaimSelectFieldChange(e, "fillDate")
                            }
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
                        CREATED DATE
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.createdDate}
                            onChange={(e) =>
                              handleClaimSelectFieldChange(e, "createdDate")
                            }
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
                        CLOSED DATE
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.closedDate}
                            onChange={(e) =>
                              handleClaimSelectFieldChange(e, "closedDate")
                            }
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
                        APPROVED/REJETED ON
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.appoverRejectedOn}
                            onChange={(e) =>
                              handleClaimSelectFieldChange(
                                e,
                                "appoverRejectedOn"
                              )
                            }
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
                </div>
              </div>
              <div className="row" style={{ justifyContent: "right" }}>
                <button
                  type="button"
                  className="btn btn-light bg-primary text-white"
                  onClick={hideModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-light bg-primary text-white mx-3"
                  onClick={handleCreateNewClaim}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimCreateModal;
