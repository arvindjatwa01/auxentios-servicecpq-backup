import React, { useEffect, useState } from "react";

import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  claimRequestObj,
  payerOptions,
} from "../warrantyMaster/WarrantyConstants";
import {
  Claim_Details_By_Id_Get,
  Update_CLaim_Details_PUT,
} from "services/CONSTANTS";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { claimStatusOptions, claimTypeOptions } from "./ClaimMasterConstants";

const ClaimEditModal = ({ show, hideModal, recordId, handleSnack }) => {
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          setClaimRecord({
            ...responseData,
            claimStatus: _claimStatus,
            claimType: _claimType,
            payer: _payer,
          });
        }
      });
    }
  }, [recordId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  const handleSelectChange = (e, keyName) => {
    setClaimRecord({ ...claimRecord, [keyName]: e });
  };

  const handleUpdateClaimData = async () => {
    try {
      const rUrl = Update_CLaim_Details_PUT + recordId;
      const reqObj = {
        ...claimRecord,
        claimStatus: claimRecord.claimStatus?.value || "EMPTY",
        claimType: claimRecord.claimType?.value || "EMPTY",
        payer: claimRecord.payer?.value || "EMPTY",
      };
      callPutApi(null, rUrl, reqObj, (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("info", "Claim Updated Successfully");
          hideModal();
        }
      });
    } catch (error) {}
  };
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Header>
        <h4>Update Claim Details</h4>
      </Modal.Header>
      <Modal.Body>
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
            {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Upload Photo
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
            </div>*/}
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
            {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12">
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
            </div> */}
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
                      onChange={(e) => handleSelectChange(e, "createdDate")}
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
                      onChange={(e) => handleSelectChange(e, "closedDate")}
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
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
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
          </div>
        </div>
        <div className="d-flex justify-content-end ">
          <button className="btn btn-primary" onClick={handleUpdateClaimData}>
            Save and CLose
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimEditModal;
