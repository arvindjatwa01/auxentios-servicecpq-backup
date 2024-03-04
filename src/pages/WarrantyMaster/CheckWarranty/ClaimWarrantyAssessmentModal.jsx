import React, { useState } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import Select from "react-select";
import { Modal } from "react-bootstrap";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { claimAssessmentReqObj } from "./claimWarrantyConstants";
import { callPostApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Warranty_Assessment_Create_POST } from "services/CONSTANTS";

const claimQuestions = [
  "What was learnt",
  "What changes to practice will be mode",
  "How patients will benefit from the Learning",
  "Wherther barriers exist that will prevent changebeing mode",
];

const warrantyTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "PDI", value: "PDI" },
  { label: "Goodwill", value: "GOODWILL" },
  { label: "Late Warranty", value: "LATE_WARRANTY" },
];

const questionOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Expired", value: "EXPIRED" },
];

const ClaimWarrantyAssessmentModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  handleShowNewFeactureConfirmModal,
  setEvaluatedId,
  warrantyRecordId,
}) => {
  const [recordObj, setRecordObj] = useState({
    ...claimAssessmentReqObj,
    warrantyId: warrantyRecordId,
  });

  // input text change
  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    setRecordObj({ ...recordObj, [name]: value });
  };

  // select option value change
  const handleSelectChange = (e, keyName) => {
    setRecordObj({ ...recordObj, [keyName]: e });
  };

  // create new assessment record
  const handleCreateNewEvalutionForm = () => {
    const rUrl = `${Warranty_Assessment_Create_POST}`;
    const reqObj = {
      ...recordObj,
      machineUnderWarranty: recordObj.machineUnderWarranty?.value || "EMPTY",
      assessmentType: recordObj.assessmentType?.value || "EMPTY",
    };

    callPostApi(
      null,
      rUrl,
      reqObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setEvaluatedId(responseData.assessmentId);
          handleSnack("success", "Warranty Assessment Created Successfully");
          hideModal();
          handleShowNewFeactureConfirmModal();
        } else {
          handleSnack("error", "Something wnet wrong.");
        }
      },
      (error) => {
        handleSnack("error", "Something wnet wrong.");
      }
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 bg-primary text-white py-3 claim-cpd-activity-leftBar">
            <h2 className="text-white">Evaluation Form Generator</h2>
            <p>
              Use this free to make a customised and highly effective evaluation
              for that you can use at your education and training session.
            </p>
            <p className="mt-2">
              This form is heavily based on research and will enable education
              department staff to understand.
            </p>
            <div>
              <ul className="text-white claim-cpd-questions">
                {claimQuestions.length !== 0 &&
                  claimQuestions.map((question, i) => (
                    <>
                      <li key={i}>
                        <RadioButtonCheckedIcon />
                        <span className="mx-2">{question}</span>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
            <p className="mt-4">
              Start by filling out your details below the include details of the
              educational activity you are providing When com pleat, click
              <b>"Creat Evaluation Form"</b> to generate downloadable PDF
            </p>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="card border px-2 py-2">
              <div className="row input-fields">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Warranty Title
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={recordObj?.warrantyTitle}
                      name="warrantyTitle"
                      placeholder="Warranty Title"
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Warranty Id
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={recordObj.warrantyId}
                      name="warrantyId"
                      placeholder="Warranty ID"
                      onChange={handleInputTextChange}
                      readOnly={true}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Assessment Date
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          // maxDate={new Date()}
                          closeOnSelect
                          value={recordObj.assessmentDate}
                          onChange={(e) =>
                            handleSelectChange(e, "assessmentDate")
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
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Warranty Request Date
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          // maxDate={new Date()}
                          closeOnSelect
                          value={recordObj.warrantyRequestDate}
                          onChange={(e) =>
                            handleSelectChange(e, "warrantyRequestDate")
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
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Warranty End Date
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          // maxDate={new Date()}
                          closeOnSelect
                          value={recordObj.warrantyEndDate}
                          onChange={(e) =>
                            handleSelectChange(e, "warrantyEndDate")
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
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Is the machine or component under warranty?
                    </label>
                    <Select
                      className="text-primary"
                      options={questionOptions}
                      value={recordObj.machineUnderWarranty}
                      onChange={(e) =>
                        handleSelectChange(e, "machineUnderWarranty")
                      }
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      What type of warranty assessment is it?
                    </label>
                    <Select
                      className="text-primary"
                      options={warrantyTypeOptions}
                      onChange={(e) => handleSelectChange(e, "assessmentType")}
                      value={recordObj.assessmentType}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark h4 font-weight-500">
                      What is the customer complaining about?
                    </label>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={recordObj.complainRow1}
                          name="complainRow1"
                          placeholder="Complaining About the...."
                          onChange={handleInputTextChange}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={recordObj.complainRow2}
                          name="complainRow2"
                          placeholder="Complaining About the...."
                          onChange={handleInputTextChange}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={recordObj.complainRow3}
                          name="complainRow3"
                          placeholder="Complaining About the...."
                          onChange={handleInputTextChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4>Assign To</h4>
            <div className="card border px-2 py-2">
              <div className="row input-fields">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="assignToFirstName"
                      placeholder="First Name"
                      value={recordObj.assignToFirstName}
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="assignToLastName"
                      placeholder="Last Name"
                      value={recordObj.assignToLastName}
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="assignToEmail"
                      placeholder="Email"
                      value={recordObj.assignToEmail}
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="assignToRole"
                      placeholder="Role"
                      value={recordObj.assignToRole}
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Position
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      name="assignToPosition"
                      placeholder="Position"
                      value={recordObj.assignToPosition}
                      onChange={handleInputTextChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end ">
              <button className="btn btn-primary mx-3" onClick={hideModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateNewEvalutionForm}
              >
                Create Evaluation Form
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimWarrantyAssessmentModal;
