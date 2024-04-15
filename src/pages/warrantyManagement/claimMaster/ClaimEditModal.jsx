import React, { useEffect, useState } from "react";

import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import Moment from "react-moment";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  payerOptions,
} from "../warrantyManagementConstants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { CLAIM_MASTER_URL } from "services/CONSTANTS";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const ClaimEditModal = ({
  show,
  hideModal,
  warrantyRecord,
  handleSnack,
  claimRecordId,
  handleOpenClaimRequestModal,
}) => {
  const [editClaimDetails, setEditClaimDetails] = useState(false);
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

  useEffect(() => {
    if (claimRecordId) {
      const rUrl = `${CLAIM_MASTER_URL}/${claimRecordId}`;
      callGetApi(rUrl, (response) => {
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
  }, [claimRecordId]);

  const handleUpdateAndCreateClaimRequest = () => {
    if (editClaimDetails) {
      const rUrl = `${CLAIM_MASTER_URL}/${claimRecordId}`;
      const rObj = {
        ...claimRecord,
        claimStatus: claimRecord.claimStatus?.value || "EMPTY",
        claimType: claimRecord.claimType?.value || "EMPTY",
        payer: claimRecord.payer?.value || "EMPTY",
        warranty: {
          warrantyId: warrantyRecord?.warrantyId,
        },
      };
      callPutApi(null, rUrl, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Claim Updated Successfully.");
          // handleOpenClaimRequestModal();
          setEditClaimDetails(false);
        } else {
          handleSnack("error", "Something went wrong.");
        }
      });
    } else {
      handleOpenClaimRequestModal();
    }
  };
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="row d-flex justify-content-between align-items-center mx-1">
          <h4>Warranty Request</h4>
          <button
            className="btn btn-primary"
            onClick={() => setEditClaimDetails(true)}
          >
            Edit
          </button>
        </div>
        <div className="card border px-2 py-3 mt-2 mb-2">
          {editClaimDetails ? (
            <>
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
                        WARRANTY REQUEST ID
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        // value={claimRecordData.claimOrderId}
                        placeholder="Claiment"
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
                        disabled
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
                        WARRANTY ID
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
                  </div>{" "}
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
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                      <label className="text-light-dark font-size-14 font-weight-500">
                        APPROVED/REJECTED ON
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
            </>
          ) : (
            <>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <ReadOnlyField
                    label="CLAIMENT"
                    value={"PARTNER"}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="WARRANTY REQUEST ID"
                    value={claimRecord.claimOrderId}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="PARTNER NAME"
                    value={claimRecord?.partnerName}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="CLAIM NUMBER"
                    value={claimRecord.claimNumber}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="EQUIPMENT NUMBER"
                    value={claimRecord.equipmentNumber}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="SERIAL NUMBER"
                    value={claimRecord.serialNumber}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="WARRANTY ID"
                    value={claimRecord.warrantyId}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="MODEL NUMBER"
                    value={claimRecord.modelNumber}
                    className="col-md-3 col-sm-3"
                  />
                </div>
              </div>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <ReadOnlyField
                    label="REPLACEMENT"
                    value={claimRecord.replacement ? "YES" : "NO"}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="COMPONENT CODE"
                    value={claimRecord.componentCode}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="COMPONENT SERIAL NUMBER"
                    value={claimRecord?.componentSerialNumber}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="PART NUMBER"
                    value={claimRecord.partNumber}
                    className="col-md-3 col-sm-3"
                  />
                </div>
              </div>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <ReadOnlyField
                    label="CLAIM TYPE"
                    value={claimRecord.claimType?.label}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="CLAIM STATUS"
                    value={claimRecord.claimStatus?.label}
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="CLAIM APPROVER"
                    value={claimRecord.claimApprover}
                    className="col-md-3 col-sm-3"
                  />
                </div>
              </div>
              <div className="card border px-3 py-2 mb-3">
                <div className="row input-fields mt-2">
                  <ReadOnlyField
                    label="FAILURE DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {claimRecord.failDate}
                      </Moment>
                    }
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="REPAIR DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {claimRecord?.repairDate}
                      </Moment>
                    }
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="CREATED DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {claimRecord.createdOn}
                      </Moment>
                    }
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="CLOSED DATE"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {claimRecord.closedDate}
                      </Moment>
                    }
                    className="col-md-3 col-sm-3"
                  />
                  <ReadOnlyField
                    label="APPROVED/REJECTED ON"
                    value={
                      <Moment format="DD/MM/YYYY">
                        {claimRecord.appoverRejectedOn}
                      </Moment>
                    }
                    className="col-md-3 col-sm-3"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button className="btn btn-primary" onClick={hideModal}>
            Close
          </button>
          <button
            className="btn btn-primary mx-3"
            onClick={handleUpdateAndCreateClaimRequest}
          >
            {editClaimDetails
              ? "Save"
              : `${
                  claimRecord["claimOrderId"] ? "View" : "Create"
                } Claim Request`}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimEditModal;
