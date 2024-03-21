import React, { useState } from "react";

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel, Switch, TextField } from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";
import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  payerOptions,
} from "../warrantyManagementConstants";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const WarrantyRequestCreateModal = ({ show, hideModal, handleSnack }) => {
  const [warrantyRequestData, setWarrantyRequestData] = useState({
    ...claimRequestObj,
  });

  // input fields value Change
  const handleInputFiledChange = (e) => {
    const { name, value } = e.target;
    setWarrantyRequestData({ ...warrantyRequestData, [name]: value });
  };

  const handleCreateWarrantyRequest = () => {
    handleSnack("success", "Warranty Request Created Successfully.");
    hideModal();
  };
  return (
    <Modal show={show} onHide={hideModal} size={"xl"}>
      <Modal.Body>
        <Modal.Title className="mb-2">Warranty Request</Modal.Title>
        <div className="card border px-3 py-2 mb-2">
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
                    value={warrantyRequestData.claimOrderId}
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
                    value={warrantyRequestData?.customerName}
                    disabled
                    name="partnerName"
                    placeholder="Partner Name"
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.claimNumber}
                    name="claimNumber"
                    disabled
                    placeholder="Claim Number"
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
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
                    value={warrantyRequestData.equipmentNumber}
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.serialNumber}
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.warrantyId}
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.modelNumber}
                    onChange={handleInputFiledChange}
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
                          checked={warrantyRequestData.replacement}
                          onChange={(e) =>
                            setWarrantyRequestData({
                              ...warrantyRequestData,
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
                    value={warrantyRequestData.componentCode}
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.componentCode}
                    name="componentSerialNumber"
                    placeholder="Component Serial Number"
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.componentCode}
                    name="partNumber"
                    placeholder="Part Number"
                    onChange={handleInputFiledChange}
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
                    value={warrantyRequestData.claimType}
                    onChange={(e) =>
                      setWarrantyRequestData({
                        ...warrantyRequestData,
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
                    value={warrantyRequestData.claimStatus}
                    onChange={(e) =>
                      setWarrantyRequestData({
                        ...warrantyRequestData,
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
                    value={warrantyRequestData.claimApprover}
                    onChange={handleInputFiledChange}
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
                        // sx={{
                        //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                        //   }}
                        // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                        // minDate={estimationData.preparedOn}
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRequestData.failDate}
                        onChange={(e) =>
                          setWarrantyRequestData({
                            ...warrantyRequestData,
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
                        value={warrantyRequestData.repairDate}
                        onChange={(e) =>
                          setWarrantyRequestData({
                            ...warrantyRequestData,
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
                        // sx={{
                        //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                        //   }}
                        // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                        // minDate={estimationData.preparedOn}
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRequestData.createdDate}
                        onChange={(e) =>
                          setWarrantyRequestData({
                            ...warrantyRequestData,
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
                        // sx={{
                        //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                        //   }}
                        // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                        // minDate={estimationData.preparedOn}
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRequestData.closedDate}
                        onChange={(e) =>
                          setWarrantyRequestData({
                            ...warrantyRequestData,
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
                        // sx={{
                        //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                        //   }}
                        // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                        // minDate={estimationData.preparedOn}
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRequestData.appoverRejectedOn}
                        onChange={(e) =>
                          setWarrantyRequestData({
                            ...warrantyRequestData,
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
          {/* <div className="row input-fields">
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUEST NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="requestNumber"
                  placeholder="Request Number"
                  value={warrantyRequestData.requestNumber}
                  onChange={handleInputFiledChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="customerNumber"
                  placeholder="Customer Number"
                  value={warrantyRequestData.customerNumber}
                  onChange={handleInputFiledChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NAME
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="customerName"
                  placeholder="Customer Name"
                  value={warrantyRequestData.customerName}
                  onChange={handleInputFiledChange}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CREATED BY
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="createdBy"
                  placeholder="Created By"
                  value={warrantyRequestData.createdBy}
                  onChange={handleInputFiledChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  UPDATED BY
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="updatedBy"
                  placeholder="Updated By"
                  value={warrantyRequestData.updatedBy}
                  onChange={handleInputFiledChange}
                />
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CREATED ON
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // sx={{
                      //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                      //   }}
                      // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                      // minDate={estimationData.preparedOn}
                      maxDate={new Date()}
                      closeOnSelect
                      value={warrantyRequestData.createdOn}
                      onChange={(e) =>
                        setWarrantyRequestData({
                          ...warrantyRequestData,
                          createdOn: e,
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
                  UPDATED ON
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // sx={{
                      //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                      //   }}
                      // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                      // minDate={estimationData.preparedOn}
                      maxDate={new Date()}
                      closeOnSelect
                      value={warrantyRequestData.updatedOn}
                      onChange={(e) =>
                        setWarrantyRequestData({
                          ...warrantyRequestData,
                          updatedOn: e,
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
                  CLAIM RECEIPT DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // sx={{
                      //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                      //   }}
                      // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                      // minDate={estimationData.preparedOn}
                      maxDate={new Date()}
                      closeOnSelect
                      value={warrantyRequestData.claimReceiptDate}
                      onChange={(e) =>
                        setWarrantyRequestData({
                          ...warrantyRequestData,
                          claimReceiptDate: e,
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
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIM STORY
                </label>
                <textarea
                  name="claimStory"
                  cols="30"
                  rows="3"
                  value={warrantyRequestData.claimStory}
                  onChange={handleInputFiledChange}
                  placeholder="Claim Story"
                  className="form-control border-radius-10 text-primary"
                ></textarea>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIM APPROVAL/REJECTION NOTES
                </label>
                <textarea
                  name="claimNotes"
                  cols="30"
                  rows="3 "
                  value={warrantyRequestData.claimNotes}
                  onChange={handleInputFiledChange}
                  placeholder="Claim Approval / Rejection Notes"
                  className="form-control border-radius-10 text-primary"
                ></textarea>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button className="btn btn-primary" onClick={hideModal}>
            Close
          </button>
          <button
            className="btn btn-primary mx-3"
            onClick={handleCreateWarrantyRequest}
          >
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyRequestCreateModal;
