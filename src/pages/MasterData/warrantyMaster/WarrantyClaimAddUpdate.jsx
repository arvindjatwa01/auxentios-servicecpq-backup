import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  payerOptions,
} from "./WarrantyConstants";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import Select from "react-select";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const WarrantyClaimAddUpdate = ({ show, hideModal }) => {
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  const handleSelectChange = (e, keyName) => {
    setClaimRecord({ ...claimRecord, [keyName]: e });
  };

  return (
    <>
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
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Under Warranty*
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Warranty ID
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        STD-12
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Serial Number
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        ZMX00507
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white text-white font-size-12 m-0 font-weight-500">
                        Model Number
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        992K
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Replacement
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Installed
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-100">
                        Distributor Info
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        <AssignmentTurnedInIcon />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 border-50">
              <div className="card px-2 py-3 border">
                <div className="row input-fields">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Number
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.claimNumber}
                        name="claimNumber"
                        placeholder="Claim Number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Model Number
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.modelNumber}
                        name="modelNumber"
                        placeholder="Model Number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Equipment Number
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.equipmentNumber}
                        name="equipmentNumber"
                        placeholder="Equipment Number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.serialNumber}
                        name="serialNumber"
                        placeholder="Serial Number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Component Code
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.componentCode}
                        name="componentCode"
                        placeholder="Component Code"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Status
                      </label>
                      <Select
                        className="text-primary"
                        options={claimStatusOptions}
                        onChange={(e) => handleSelectChange(e, "claimStatus")}
                        value={claimRecord.claimStatus}
                        styles={FONT_STYLE_SELECT}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Type
                      </label>
                      <Select
                        className="text-primary"
                        options={claimTypeOptions}
                        onChange={(e) => handleSelectChange(e, "claimType")}
                        value={claimRecord.claimType}
                        styles={FONT_STYLE_SELECT}
                      />
                    </div>
                  </div>
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
                              Replacement
                            </span>
                          }
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Fill Date
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.fillDate}
                            onChange={(e) => handleSelectChange(e, "fillDate")}
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Failure Part Number
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.failurePartNumber}
                        name="failurePartNumber"
                        placeholder="Failure Part Number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Hour on Machine
                      </label>
                      <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.hourOnMachine}
                        name="hourOnMachine"
                        placeholder="Hour on Machine"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Hours on Failed Part
                      </label>
                      <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.hoursOnFailedPart}
                        name="hoursOnFailedPart"
                        placeholder="Hours on Failed Part"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Upload Photo
                      </label>
                      {/* <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.hoursOnFailedPart}
                        name="hoursOnFailedPart"
                        placeholder="Hours on Failed Part"
                        onChange={handleInputChange}
                      /> */}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Part List
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.partList}
                        name="partList"
                        placeholder="Part List"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Time taken for the Repair
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.repairTime}
                        name="repairTime"
                        placeholder="Time taken for the Repair"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Story
                      </label>
                      <textarea
                        name="claimStory"
                        cols="30"
                        rows="3"
                        value={claimRecord.claimStory}
                        onChange={handleInputChange}
                        placeholder="Claim Story"
                        className="form-control border-radius-10 text-primary"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Approval / Rejection Notes
                      </label>
                      <textarea
                        name="claimNotes"
                        cols="30"
                        rows="3 "
                        value={claimRecord.claimNotes}
                        onChange={handleInputChange}
                        placeholder="Claim Approval / Rejection Notes"
                        className="form-control border-radius-10 text-primary"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Questionnaire
                      </label>
                      <textarea
                        name="claimQuestionnaire"
                        cols="30"
                        rows="3 "
                        value={claimRecord.claimQuestionnaire}
                        onChange={handleInputChange}
                        placeholder="Claim Questionnaire"
                        className="form-control border-radius-10 text-primary"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Payer
                      </label>
                      <Select
                        className="text-primary"
                        options={payerOptions}
                        onChange={(e) => handleSelectChange(e, "payer")}
                        value={claimRecord.payer}
                        styles={FONT_STYLE_SELECT}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Approver
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.claimApprover}
                        name="claimApprover"
                        placeholder="Claim Approver"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Created By
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.createdBy}
                        name="createdBy"
                        placeholder="Created By"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Updated By
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecord.updatedBy}
                        name="updatedBy"
                        placeholder="Updated By"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Created On
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.createdOn}
                            onChange={(e) => handleSelectChange(e, "createdOn")}
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Updated On
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.updatedOn}
                            onChange={(e) => handleSelectChange(e, "updatedOn")}
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Claim Receipt Date
                      </label>
                      <div className="align-items-center date-box">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            className="form-controldate border-radius-10"
                            // maxDate={new Date()}
                            closeOnSelect
                            value={claimRecord.claimReceiptDate}
                            onChange={(e) =>
                              handleSelectChange(e, "claimReceiptDate")
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Created Date
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
                              handleSelectChange(e, "createdDate")
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Closed Date
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
                              handleSelectChange(e, "closedDate")
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        Approved / Rejected On
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
                              handleSelectChange(e, "appoverRejectedOn")
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
              {/* <h5 style={{ fontWeight: "bold" }}>End Customer</h5>
              <div className="card border px-2">
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        End Customer First Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        End Customer Last Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Hallum
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installation Addresss
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        1511 S Union S Ct.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installation Addresss 2
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Unit 4
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        City
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Kenniwich
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        State/Province
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        WA
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Zip Code
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        99320
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Email
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach@nuke.digital
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Phone
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        509-727-3333
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h5 style={{ fontWeight: "bold" }}>Installer</h5>
              <div className="card border px-2 mb-0">
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Install Company Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Air-Tech Services
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installer Address
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        250 A Street
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installer Address 2
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Ste 4
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        City
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Pasco
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        State
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        WA
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Zip
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        99320
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Email
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach@nuke.digital
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Phone
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        509-727-3333
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Fax
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        509-727-3333
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row mt-2 px-2 d-flex justify-content-arround">
                <button
                  className="btn text-white bg-primary mx-1"
                  onClick={hideModal}
                >
                  Back
                </button>
                <button
                  className="btn text-white bg-primary mx-1"
                  //   onClick={hideModal}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WarrantyClaimAddUpdate;
