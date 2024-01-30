import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import {
  claimRequestObj,
  defaultClaimDetails,
  defaultDistributorObj,
  payerOptions,
} from "./WarrantyConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
  Claim_Convert_To_Repair_GET,
  Claim_Details_By_Id_Get,
  Claim_Question_Mark_Claimable_GET,
  Claim_Questions_List_GET,
  Update_CLaim_Details_PUT,
  claim_Question_Answer_POST,
} from "services/CONSTANTS";
import Select from "react-select";
import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  WITH_PARTS,
} from "pages/Repair/CONSTANTS";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { WITH_SPARE_PARTS } from "navigation/CONSTANTS";
import { useHistory } from "react-router-dom";
import {
  claimStatusOptions,
  claimTypeOptions,
} from "../claimMaster/ClaimMasterConstants";
import ClaimOrdersDataList from "../claimMaster/ClaimOrdersDataList";

const steps = ["Registered", "Update", "Assess", "Open Claim Order"];

const accessAnswers = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
];

const questionTwoOptions = [
  { label: "High Altitude", value: "HIGH_ALTITUDE", questionId: 2 },
  {
    label: "Extremely High Temperature",
    value: "EXTREMELY_HIGH_TEMPERATURE",
    questionId: 2,
  },
  { label: "Acidic Water", value: "ACIDIC_WATER", questionId: 2 },
];

const ClaimDetailsModal = ({ show, hideModal, recordId, handleSnack }) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);

  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });
  const [claimDetails, setClaimDetails] = useState({ ...defaultClaimDetails });
  const [distributorDetails, setDistributorDetails] = useState({
    ...defaultDistributorObj,
  });

  const [claimAccessQuestions, setClaimAccessQuestions] = useState([]);
  const [accessQuestions, setAccessQuestions] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });

  const [allQuestionFilled, setAllQuestionFilled] = useState(false);

  useEffect(() => {
    const allQuestionDone = Object.values(accessQuestions).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    setAllQuestionFilled(allQuestionDone);
  }, [accessQuestions]);

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

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Questions_List_GET}?pageNumber=${0}&pageSize=${5}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response["data"].sort(
            (a, b) => a.questionNumber - b.questionNumber
          );
          setClaimAccessQuestions(responseData);
        }
      });
    }
  }, [recordId]);

  const handleNextClick = () => {
    setActiveStep(activeStep + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimRecord({ ...claimRecord, [name]: value });
  };

  const handleSelectChange = (e, keyName) => {
    setClaimRecord({ ...claimRecord, [keyName]: e });
  };

  const handleSelctAnswer = async (e, keyName) => {
    const rUrl = claim_Question_Answer_POST;
    const reqObj = {
      claimId: recordId,
      questionId: e.questionId,
      answer: e.value,
    };
    callPostApi(null, rUrl, reqObj, (response) => {
      if (response.status === API_SUCCESS) {
        setAccessQuestions({ ...accessQuestions, [keyName]: e });
      }
    });
  };

  const handleCheckClaimMarkable = () => {
    const rUrl = `${Claim_Question_Mark_Claimable_GET}?claim_id=${recordId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        if (response.data === "ACCEPTED") {
          handleSnack("info", "It is claimable you can proceed further");
          setActiveStep(activeStep + 1);
        } else {
          handleSnack(
            "info",
            "Sorry! It is not claimable. You cannot proceed further."
          );
        }
      }
    });
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
          setActiveStep(activeStep + 1);
        }
      });
    } catch (error) {}
  };

  const handleConvetClaimToRepair = () => {
    const rUrl = `${Claim_Convert_To_Repair_GET}?claim_id=${recordId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.statusCode === API_SUCCESS) {
        const responseData = response.data;
        handleSnack("info", "New Order is created, redirecting in a minute.");

        let builderDetails = {
          builderId: "",
          bId: "",
          type: "fetch",
          builderType: WITH_PARTS,
        };
        builderDetails.builderId = responseData.builderId;
        builderDetails.bId = responseData.id;
        setInterval(() => {
          history.push({
            pathname: WITH_SPARE_PARTS,
            state: builderDetails,
          });
        }, 5000);
      }
    });
  };

  // step 1: Claim Registraction
  const ViewClaimRegeisterDetails = () => {
    return (
      <>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimNumber)
                    ? "NA"
                    : claimRecord.claimNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Modal Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.modelNumber)
                    ? "NA"
                    : claimRecord.modelNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Equipment Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.equipmentNumber)
                    ? "NA"
                    : claimRecord.equipmentNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Serial Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.serialNumber)
                    ? "NA"
                    : claimRecord.serialNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Component Code
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.componentCode)
                    ? "NA"
                    : claimRecord.componentCode}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Status
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimStatus?.label)
                    ? "NA"
                    : claimRecord.claimStatus?.label}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Type
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimType?.label)
                    ? "NA"
                    : claimRecord.claimType?.label}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Replacement
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {claimRecord.replacement ? "Yes" : "No"}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Fill Date
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.fillDate)
                    ? "NA"
                    : getFormatDateTime(claimRecord.fillDate, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Failure Part Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.failurePartNumber)
                    ? "NA"
                    : claimRecord.failurePartNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Hour on Machine
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.hourOnMachine)
                    ? "NA"
                    : claimRecord.hourOnMachine}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Hours on Failed Part
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.hoursOnFailedPart)
                    ? "NA"
                    : claimRecord.hoursOnFailedPart}
                </h6>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Upload Photo
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.uploadPhoto)
                      ? "NA"
                      : claimRecord.uploadPhoto}
                  </h6>
                </div>
              </div> */}
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Part List
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.partList) ? "NA" : claimRecord.partList}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Time taken for the Repair
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.repairTime)
                    ? "NA"
                    : claimRecord.repairTime}
                </h6>
              </div>
            </div>

            {/* <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Questionnaire
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimRecord.claimQuestionnaire)
                      ? "NA"
                      : claimRecord.claimQuestionnaire}
                  </h6>
                </div>
              </div> */}
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Payer
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.payer?.label)
                    ? "NA"
                    : claimRecord.payer?.label}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Approver
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimApprover)
                    ? "NA"
                    : claimRecord.claimApprover}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Created By
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.createdBy)
                    ? "NA"
                    : claimRecord.createdBy}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Updated By
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.updatedBy)
                    ? "NA"
                    : claimRecord.updatedBy}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Created On
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.createdOn)
                    ? "NA"
                    : getFormatDateTime(claimRecord.createdOn, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Updated On
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.updatedOn)
                    ? "NA"
                    : getFormatDateTime(claimRecord.updatedOn, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Receipt Date
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimReceiptDate)
                    ? "NA"
                    : getFormatDateTime(claimRecord.claimReceiptDate, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Created Date
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.createdDate)
                    ? "NA"
                    : getFormatDateTime(claimRecord.createdDate, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Closed Date
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.closedDate)
                    ? "NA"
                    : getFormatDateTime(claimRecord.closedDate, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Approved / Rejected On
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.appoverRejectedOn)
                    ? "NA"
                    : getFormatDateTime(claimRecord.appoverRejectedOn, false)}
                </h6>
              </div>
            </div>
          </div>
          <div className="row input-fields">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Story
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimStory)
                    ? "NA"
                    : claimRecord.claimStory}
                </h6>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Claim Approval / Rejection Notes
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(claimRecord.claimNotes)
                    ? "NA"
                    : claimRecord.claimNotes}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </>
    );
  };

  // step 2: Claim Updation
  const viewWarrantyUpdation = () => {
    return (
      <>
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
          <button
            className="btn btn-primary mx-3"
            onClick={handleUpdateClaimData}
          >
            Update
          </button>
          <button className="btn btn-primary" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </>
    );
  };

  // step 3: Claim Access
  const viewClaimAccess = () => {
    return (
      <>
        <div className="card px-2 py-3 border">
          <div className="row input-fields">
            {claimAccessQuestions.length !== 0 &&
              claimAccessQuestions.map((row) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12"
                  key={row.questionNumber}
                >
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      {`${row.questionNumber}). ${row.question}`}
                    </label>
                    <Select
                      className="text-primary"
                      options={
                        row.questionId === 2
                          ? questionTwoOptions
                          : accessAnswers.map((answer) => ({
                              ...answer,
                              questionId: row.questionId,
                            }))
                      }
                      onChange={(e) =>
                        handleSelctAnswer(e, `question${row.questionNumber}`)
                      }
                      value={accessQuestions[`question${row.questionNumber}`]}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            disabled={!allQuestionFilled}
            onClick={handleCheckClaimMarkable}
          >
            Next
          </button>
        </div>
      </>
    );
  };

  // step 4: Open Claim Order
  const viewOpenClaimOrders = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">
            Already Creaetd Claim Orders
          </h5>
          <button
            className="btn btn-primary"
            onClick={handleConvetClaimToRepair}
          >
            Open New Claim Order
          </button>
        </div>
        <ClaimOrdersDataList claimId={claimRecord.claimNumber} />
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="row align-items-center">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} sx={{ padding: 3 }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
        {activeStep === 0 && ViewClaimRegeisterDetails()}
        {activeStep === 1 && viewWarrantyUpdation()}
        {activeStep === 2 && viewClaimAccess()}
        {activeStep === 3 && viewOpenClaimOrders()}
      </Modal.Body>
    </Modal>
  );
};

export default ClaimDetailsModal;
