import React, { useState } from "react";

import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

import Select from "react-select";
import { Modal } from "react-bootstrap";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const reasonOptions = [
  {
    label: "Supplier production Problem",
    value: "SUPPLIER_PRODUCTION_PROBLEM",
  },
  {
    label: "Incoming inspection Problem",
    value: "INCOMING_INSPECTION_PROBLEM",
  },
  {
    label: "In-production audit Problem",
    value: "IN_PRODUCTION_AUDIT_PROBLEM",
  },
  {
    label: "Final inspection and testing Problem",
    value: "FINAL_INSPECTION_AND_TESTING_PROBLEM",
  },
  { label: "PDI Problem", value: "PDI_PROBLEM" },
  { label: "Field Warranty failure Problem", value: "FIELDS_WARRANTY" },
  { label: "Customer complaint Problem", value: "CUSTOMER_COMPLAINT_pROBLEM" },
  {
    label: "Field survey result Problem",
    value: "FIELD_SURVEY_RESULT_PROBLEM",
  },
];

const warrantyDiagnosisOptions = [
  {
    label: "Symptoms observed by the Customer",
    value: "SYMPTOMS_OBSERVED_BY_THE_CUSTOMER",
  },
  {
    label: "Involvement of any related part (s) and/or its condition",
    value: "INVOLVEMENT_OF_ANY_PART_RELATED_PART_AND/OR_ITS_CONDITION",
  },
  {
    label: "Usage pattern of the customer",
    value: "USAGE_PATTERN_OF_CUSTOMER",
  },
  {
    label: "External environmental conditions",
    value: "EXTERNAL_ENVIRONMENTAL_CONDITIONS",
  },
  {
    label: "Observation during fault diagnosis",
    value: "OBSERVATION_DURING_FAULT_DIAGNOSIS",
  },
];

const ReturnAnalysisModal = ({ show, hideModal, handleSnack }) => {
  // create new return anlysis
  const handleSaveClick = () => {
    handleSnack("success", "Return Analysis Created Successfully.");
    hideModal();
  };
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Modal.Title className="mb-2">Return Analysis</Modal.Title>
        <div className="card border px-3 py-2 mb-2">
          <div className="row input-fields mt-2">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  RETURN REASON
                </label>
                <Select
                  className="text-primary"
                  options={reasonOptions}
                  //   onChange={(e) => handleSelectChange(e, `question1`)}
                  //   value={recordObj.questions1}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART NUMBER
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="partNumber"
                  placeholder="Part Number"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART GROUP
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="partGroup"
                  placeholder="Part Group"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  PART SUB GROUP
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="partSubGroup"
                  placeholder="Part Sub Group"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  WARRANTY CLAIM NUMBER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="warrantyCliatNumber"
                  placeholder="Warranty Claim Number"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  FAIL DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={claimRecord.fillDate}
                      // onChange={(e) => handleSelectChange(e, "fillDate")}
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
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SOURCE
                </label>
                <textarea
                  className="form-control border-radius-10 text-primary"
                  name="source"
                  cols="30"
                  rows="2"
                  placeholder="Source..."
                ></textarea>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  WARRANTY DIAGNOSIS NOTES
                </label>
                <Select
                  className="text-primary"
                  options={warrantyDiagnosisOptions}
                  //   onChange={(e) => handleSelectChange(e, `question1`)}
                  //   value={recordObj.questions1}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  POTENTIAL FAILURE MODE
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="potentialFailureMode"
                  placeholder="Potential Failure Mode"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SERVICE CODE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="serviceCode"
                  placeholder="Service Code"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  POTENTIAL EFFECTS OF FAILURE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="potentialEffectsOfFailure"
                  placeholder="Potential Effects of Failure"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SEVERITY
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="severity"
                  placeholder="Severity"
                  min={1}
                  max={10}
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CAUSE
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="cause"
                  placeholder="Cause"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  POTENTIAL CAUSE(S) OF FAILURE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="potentialCauseOfFailure"
                  placeholder="Potential Cause(s) of Failure"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  OCCURRENCE
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="occurrence"
                  placeholder="occurrence"
                  min={1}
                  max={10}
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  ACTIONS TO TAKE
                </label>
                <textarea
                  className="form-control border-radius-10 text-primary"
                  name="actionsToTake"
                  cols="30"
                  rows="2"
                  placeholder="Actions to Take..."
                ></textarea>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CREATION DATE/UPDATE DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={claimRecord.fillDate}
                      // onChange={(e) => handleSelectChange(e, "fillDate")}
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
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CREATED BY/REVIEWED BY
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="createdBy"
                  placeholder="Created by / Reviewed by "
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REVISED SEVERITY
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="revisedSeverity"
                  placeholder="Revised Severity"
                  min={1}
                  max={10}
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REVISED OCCURRENCE
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="revisedOccurrence"
                  placeholder="Revised Occurrence"
                  min={1}
                  max={10}
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REVISED DETECTION
                </label>
                <input
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  name="revisedDetection"
                  placeholder="Revised Detection"
                  min={1}
                  max={10}
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button className="btn btn-primary" onClick={hideModal}>
            Close
          </button>
          <button className="btn btn-primary mx-3" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnAnalysisModal;
