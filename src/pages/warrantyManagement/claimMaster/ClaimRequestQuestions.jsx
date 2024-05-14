import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Modal } from "react-bootstrap";

import { callGetApi } from "services/ApiCaller";
import { CLAIM_BY_AUTH_CODE_GET } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

const ClaimRequestQuestions = ({
    show,
    hideModal,
    handleSnack,
    questionNo = 0,
    setClaimOrderId,
    setAssesstmentId,
    setEvaluationId,
    setClaimRecordDetail,
    setClaimRecordId,
    handleOpenClaimRequestModal,
}) => {
    const [questionNoCounter, setQuestionNoCounter] = useState(questionNo);
    const [selectValue, setSelectValue] = useState({
        question1: "",
        question2: "",
        question3: "",
    });

    const [authCode, setAuthCode] = useState("");
    const [isValidAuthCode, setIsValidAuthCode] = useState(false);
    const [validClaimResponse, setValidClaimResponse] = useState(null);

    // select questions answer
    const handleSelectQusAns = (e) => {
        const { name, value } = e.target;
        setSelectValue({ ...selectValue, [name]: value });
    };

    const Question1 = () => {
        return (
            <>
                <div className="d-flex">
                    <div className="col-12">
                        <p>QUESTION 01/10</p>
                        <h4>Do you need approval for the job?</h4>
                    </div>
                </div>
                <RadioGroup
                    className="my-3"
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="question1"
                    defaultValue="top"
                    value={selectValue.question1}
                    onChange={handleSelectQusAns}
                >
                    <div className="col-md-6 customFormControlLabel">
                        <FormControlLabel
                            className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart "
                            value={"no"}
                            id={"no"}
                            control={<Radio />}
                            label={"No"}
                            labelPlacement="bottom"
                        />
                    </div>
                    <div className="col-md-6 customFormControlLabel">
                        <FormControlLabel
                            className="w-100 m-0 mb-3  p-2 card py-4 align-items-start "
                            value={"yes"}
                            id={"yes"}
                            control={<Radio />}
                            label={"Yes"}
                            labelPlacement="bottom"
                        />
                    </div>
                </RadioGroup>
            </>
        );
    };

    const Question2 = () => {
        return (
            <>
                <div className="d-flex">
                    <div className="col-12">
                        <p>QUESTION 02/10</p>
                        <h4>Is it pre-approved?</h4>
                    </div>
                </div>
                <RadioGroup
                    className="my-3"
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="question2"
                    defaultValue="top"
                    value={selectValue.question2}
                    onChange={handleSelectQusAns}
                >
                    <div className="col-md-6 customFormControlLabel">
                        <FormControlLabel
                            className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart "
                            value={"no"}
                            id={"no"}
                            control={<Radio />}
                            label={"No"}
                            labelPlacement="bottom"
                        />
                    </div>
                    <div className="col-md-6 customFormControlLabel">
                        <FormControlLabel
                            className="w-100 m-0 mb-3  p-2 card py-4 align-items-start "
                            value={"yes"}
                            id={"yes"}
                            control={<Radio />}
                            label={"Yes"}
                            labelPlacement="bottom"
                        />
                    </div>
                </RadioGroup>
            </>
        );
    };

    //
    const Question3 = () => {
        return (
            <>
                <div className="d-flex">
                    <div className="col-12">
                        <p>QUESTION 03/10</p>
                        <h4>Input the claim Authorization code</h4>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    Authorization Code
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        value={authCode}
                                        autoComplete="off"
                                        name="reference"
                                        onChange={(e) => {
                                            setAuthCode(e.target.value);
                                            setIsValidAuthCode(false);
                                        }}
                                        className="form-control text-primary"
                                        placeholder="Warranty Autorization Code"
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn bg-primary text-white"
                                            type="button"
                                            onClick={handleCheckAuthCode}
                                        >
                                            Check
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    // click on continue button
    const handleContinuePress = (currentCounter) => {
        if (currentCounter == 0) {
            if (!selectValue.question1) {
                handleSnack("error", "Please select answer first.");
                return;
            } else {
                if (selectValue.question1 === "yes") {
                    setQuestionNoCounter(questionNoCounter + 1);
                } else {
                    handleOpenClaimRequestModal();
                }
            }
        }
        if (currentCounter == 1) {
            if (!selectValue.question2) {
                handleSnack("error", "Please select answer first.");
                return;
            } else {
                if (selectValue.question2 === "yes") {
                    setQuestionNoCounter(questionNoCounter + 1);
                } else {
                    // openAutorizationCreateModal();
                }
            }
        }
        if (currentCounter == 2) {
            if (!authCode) {
                handleSnack(
                    "info",
                    "Warranty Authorization code must not be empty."
                );
                return;
            } else if (authCode && !isValidAuthCode) {
                handleSnack(
                    "info",
                    "Warranty Authorization code must be valid, Click on Check button and verify."
                );
                return;
            } else {
                handleOpenClaimRequestModal();
            }
        }
    };

    // click on Previous button
    const handlePreviousPress = (currentCounter) => {
        if (currentCounter === 0) {
            hideModal();
        } else {
            setQuestionNoCounter(questionNoCounter - 1);
        }
    };

    // check Authorization code is valid or not
    const handleCheckAuthCode = async () => {
        if (!authCode) {
            handleSnack(
                "info",
                "Please enter authorization code first then you can check."
            );
            return;
        }
        const rUrl = `${CLAIM_BY_AUTH_CODE_GET}${authCode}`;
        callGetApi(
            rUrl,
            (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    handleSnack(
                        "success",
                        `Authorization Code-${authCode} is valid`
                    );
                    setIsValidAuthCode(true);
                    setValidClaimResponse(responseData);
                    setClaimOrderId(responseData.claimOrderId);
                    setAssesstmentId(responseData.assessmentId);
                    setEvaluationId(responseData.evaluationId);
                    setClaimRecordId(responseData.claimId);
                    // setWarrantyId(responseData.warrantyId);
                    setClaimRecordDetail(responseData);
                } else {
                    handleSnack("info", response.data?.message);
                    setIsValidAuthCode(false);
                    setValidClaimResponse(null);
                }
            },
            (error) => {
                handleSnack(
                    "error",
                    `Claim for Authorization Code-${authCode} is not found.`
                );
                setIsValidAuthCode(false);
                setValidClaimResponse(null);
            }
        );
    };

    return (
        <Modal show={show} onHide={hideModal} size="lg" centered>
            <Modal.Body>
                <div className=" mt-3 p-3">
                    {questionNoCounter === 0 && Question1()}
                    {questionNoCounter === 1 && Question2()}
                    {questionNoCounter === 2 && Question3()}
                </div>
                <div className="d-flex align-items-center justify-content-between mt-1">
                    <div>
                        <button
                            className="btn bg-primary text-white cursor"
                            onClick={() =>
                                handlePreviousPress(questionNoCounter)
                            }
                            // disabled={questionNoCounter === 0}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                            <KeyboardBackspaceIcon className=" font-size-16" />{" "}
                            Previous
                        </button>
                    </div>
                    <div>
                        <button
                            className="btn bg-primary text-white cursor"
                            onClick={() =>
                                handleContinuePress(questionNoCounter)
                            }
                        >
                            Continue{" "}
                            <ArrowForwardIcon className=" font-size-16" />
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ClaimRequestQuestions;
