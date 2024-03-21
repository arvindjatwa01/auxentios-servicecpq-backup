import React, { useEffect, useState } from "react";

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel, Switch, TextField } from "@mui/material";

import Select from "react-select";
import Moment from "react-moment";
import { Modal } from "react-bootstrap";

import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  payerOptions,
} from "../warrantyManagementConstants";

import { API_SUCCESS } from "services/ResponseCode";
import { Claim_Details_By_Id_Get } from "services/CONSTANTS";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { isEmpty } from "pages/Common/textUtilities";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const ClaimDetailsModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  handleOpenClaimRequestModal,
}) => {
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });
  const [viewClaimRequest, setViewClaimRequest] = useState(false);
  const [claimViewOnly, setClaimViewOnly] = useState(false);

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          setClaimViewOnly(true);

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          const _viewClaimRequest = isEmpty(responseData.claimOrderId)
            ? false
            : true;
          setViewClaimRequest(_viewClaimRequest);

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

  // input fields value change
  const handleInputFieldValueChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  // update claim details
  const handleUpdateClaimDetails = () => {
    const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
    const rObj = {
      ...claimRecord,
      claimStatus: claimRecord?.claimStatus?.value || "REGISTERED",
      claimType: claimRecord?.claimType?.value || "STANDARD",
      payer: claimRecord?.payer?.value || "CUSTOMER",
    };
    callPutApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack(
          "success",
          `Claim Number ${claimRecord.claimNumber} Updated successfully.`
        );
        setClaimViewOnly(true);
      } else {
        handleSnack("error", `Something went wrong.`);
      }
    });
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4 style={{ fontWeight: 500 }}>Warranty Requests</h4>
            <button
              className="btn btn-primary float-end "
              onClick={() => setClaimViewOnly(!claimViewOnly)}
            >
              Edit
            </button>
          </div>
          <div className="card border px-2 py-2 mt-2 mb-0">
            {claimViewOnly ? (
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
            ) : (
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
                          value={"PARTNER"}
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
                          value={claimRecord.claimNumber}
                          placeholder="Warranty Request Id"
                          disabled={true}
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
                          value={claimRecord?.customerName}
                          disabled
                          name="partnerName"
                          placeholder="Partner Name"
                          onChange={setClaimRecord}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CLAIM NUMBER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.claimNumber}
                          name="claimNumber"
                          disabled
                          placeholder="Claim Number"
                          onChange={setClaimRecord}
                        />
                      </div>
                    </div> */}
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EQUIPMENT NUMBER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="equipmentNumber"
                          placeholder="Equipment Number"
                          value={claimRecord.equipmentNumber}
                          onChange={setClaimRecord}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SERIAL NUMBER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="serialNumber"
                          placeholder="Serial Number"
                          value={claimRecord.serialNumber}
                          onChange={setClaimRecord}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          WARRANTY ID
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="warrantyId"
                          placeholder="Warranty Id"
                          value={claimRecord.warrantyId}
                          onChange={setClaimRecord}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          MODEL NUMBER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="modelNumber"
                          placeholder="Model Number"
                          value={claimRecord.modelNumber}
                          onChange={setClaimRecord}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border px-3 py-2 mb-3">
                  <div className="row input-fields mt-2">
                    <div className="col-md-3 col-sm-3">
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
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          COMPONENT CODE
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="componentCode"
                          placeholder="Component Code"
                          value={claimRecord.componentCode}
                          onChange={handleInputFieldValueChange}
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
                          name="componentSerialNumber"
                          placeholder="Component Serial Number"
                          onChange={handleInputFieldValueChange}
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
                          name="partNumber"
                          placeholder="Part Number"
                          onChange={handleInputFieldValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border px-3 py-2 mb-3">
                  <div className="row input-fields mt-2">
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CLAIM TYPE
                        </label>
                        <Select
                          className="text-primary"
                          options={claimTypeOptions}
                          placeholder="Select Claim Type"
                          value={claimRecord.claimType}
                          onChange={(e) =>
                            setClaimRecord({
                              ...claimRecord,
                              claimType: e,
                            })
                          }
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CLAIM STATUS
                        </label>
                        <Select
                          className="text-primary"
                          options={claimStatusOptions}
                          placeholder="Select Claim Status"
                          value={claimRecord.claimStatus}
                          onChange={(e) =>
                            setClaimRecord({
                              ...claimRecord,
                              claimStatus: e,
                            })
                          }
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CLAIM APPROVER
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          name="claimApprover"
                          placeholder="Claim Approver"
                          value={claimRecord.claimApprover}
                          onChange={handleInputFieldValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border px-3 py-2 mb-3">
                  <div className="row input-fields mt-2">
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          FAILURE DATE
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // minDate={estimationData.preparedOn}
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.failDate}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  failDate: e,
                                })
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
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                              value={claimRecord.repairDate}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  repairDate: e,
                                })
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
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CREATED DATE
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // minDate={estimationData.preparedOn}
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.createdDate}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  createdDate: e,
                                })
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
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CLOSED DATE
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // minDate={estimationData.preparedOn}
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.closedDate}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  closedDate: e,
                                })
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
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          APPROVED/REJECTED ON
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              closeOnSelect
                              value={claimRecord.appoverRejectedOn}
                              onChange={(e) =>
                                setClaimRecord({
                                  ...claimRecord,
                                  appoverRejectedOn: e,
                                })
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
            )}
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-primary mx-3" onClick={hideModal}>
              Close
            </button>
            {!claimViewOnly ? (
              <button
                className="btn btn-primary"
                onClick={handleUpdateClaimDetails}
              >
                Update Claim Details
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleOpenClaimRequestModal}
              >
                {viewClaimRequest ? "View " : "Create "} Claim Request
              </button>
            )}
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimDetailsModal;
