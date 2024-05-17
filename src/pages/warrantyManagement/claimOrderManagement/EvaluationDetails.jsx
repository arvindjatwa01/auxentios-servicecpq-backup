import React from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import TextField from "@mui/material/TextField";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Select from "react-select";
import Moment from "react-moment";

import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import EvaluationPartReport from "../claimMaster/EvaluationPartReport";
import {
    EVALUTAION_QUESTION_ANSWER_URL,
    WARRANTY_EVALUATION_MASTER_URL,
} from "services/CONSTANTS";


const EvaluationDetails = (props) => {
    const {
        viewOnlyTab,
        setViewOnlyTab,
        assesstmentId,
        claimRecordId,
        evaluationTabValue,
        setEvaluationTabValue,
        evaluationDetailsData,
        setEvaluationDetailsData,
        evaluatedByData,
        setEvaluatedByData,
        questionsOptions,
        claimOrderId,
        evaluationId,
        setEvaluationId,
        partsFailedRecord,
        partsCausalRecord,
        setPartsFailedRecord,
        setPartsCausalRecord,
        handleSnack,
        setRequestTab,
        handleEvaluationPartsReturn,
        claimStatus,
    } = props;

    // Individual evaluation details select option field value change
    const handleEvaluationDeatilsSelectDataChange = (e, keyName) => {
        setEvaluationDetailsData({ ...evaluationDetailsData, [keyName]: e });
    };

    // Individual evaluation By field value change
    const handleEvaluationByDataChange = (e) => {
        const { name, value } = e.target;
        setEvaluatedByData({ ...evaluatedByData, [name]: value });
    };

    // add update claim evalautaion question 1
    const handleCrateEvaluationQuestion1 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 1,
            answer: evaluationDetailsData.question1?.value || "",
        };
        if (evaluationDetailsData.question1?.value) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions1");
                }
            });
        }
    };

    // add update claim evalautaion question 2
    const handleCrateEvaluationQuestion2 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 2,
            answer: evaluationDetailsData.question2?.value || "",
        };
        if (evaluationDetailsData.question2?.value) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions2");
                }
            });
        }
    };

    // add update claim evalautaion question 3
    const handleCrateEvaluationQuestion3 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 3,
            answer: evaluationDetailsData.question3?.value || "",
        };
        if (evaluationDetailsData.question3?.value) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions3");
                }
            });
        }
    };

    // add update claim evalautaion question 4
    const handleCrateEvaluationQuestion4 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 4,
            answer: evaluationDetailsData.question4?.value || "",
        };
        if (evaluationDetailsData.question4?.value) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions4");
                }
            });
        }
    };

    // add update claim evalautaion question 5
    const handleCrateEvaluationQuestion5 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 5,
            answer: evaluationDetailsData.question5,
        };
        if (evaluationDetailsData.question5) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions5");
                }
            });
        }
    };

    // add update claim evalautaion question 6
    const handleCrateEvaluationQuestion6 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 6,
            answer: evaluationDetailsData.question6,
        };
        if (evaluationDetailsData.question6) {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    console.log("Success questions6");
                }
            });
        }
    };

    // create Questions
    const handleCrateQuestions = (evaluatedId) => {
        handleCrateEvaluationQuestion1(evaluatedId);
        handleCrateEvaluationQuestion2(evaluatedId);
        handleCrateEvaluationQuestion3(evaluatedId);
        handleCrateEvaluationQuestion4(evaluatedId);
        handleCrateEvaluationQuestion5(evaluatedId);
        handleCrateEvaluationQuestion6(evaluatedId);
    };

    // add update evaluation
    const handleAddUpdateEvaluation = () => {
        if (assesstmentId) {
            const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}`;
            const evalatuinonRObj = {
                ...evaluatedByData,
                claimId: claimRecordId,
            };
            if (evaluationId) {
                callPutApi(
                    null,
                    `${rUrl}/${evaluationId}`,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            handleCrateQuestions(evaluationId);
                            handleSnack(
                                "success",
                                "Evaluation Updated Successfully."
                            );
                            setEvaluationTabValue("evaluationPartReport");
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                evaluViewOnly: true,
                            });
                        } else {
                            handleSnack(
                                "error",
                                "Evaluation Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Evaluation Failed or Something went wrong"
                        );
                    }
                );
            } else {
                callPostApi(
                    null,
                    rUrl,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            const responseData = response.data;
                            setEvaluationId(responseData.evaluationId);
                            handleCrateQuestions(responseData.evaluationId);
                            // handleUpdateClaimOrder(
                            //     "evaluation",
                            //     responseData["evaluationId"]
                            // );
                            handleSnack(
                                "success",
                                "Evaluation Created Successfully."
                            );
                            setEvaluationTabValue("evaluationPartReport");
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                evaluViewOnly: true,
                            });
                        } else {
                            handleSnack(
                                "error",
                                "Evaluation Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Evaluation Failed or Something went wrong"
                        );
                    }
                );
            }
        } else {
            handleSnack(
                "info",
                "Create Assessment First then you can Create or Update Evalaution."
            );
        }
    };

    // warranty status Accept|Reject
    const handleWarrantyAcceptReject = (evaluatedStatus) => {
        if (assesstmentId) {
            const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}`;
            const evalatuinonRObj = {
                ...evaluatedByData,
                claimId: claimRecordId,
                evaluated: evaluatedStatus,
            };
            if (evaluationId) {
                callPutApi(
                    null,
                    `${rUrl}/${evaluationId}`,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            // handleCrateQuestions(evaluationId);
                            // setActiveClaim(true);
                            setRequestTab("claim");
                            handleSnack(
                                "success",
                                "Warranty Acknowledged Successfully."
                            );
                            // "Warranty Accepted Successfully."
                            setEvaluatedByData({
                                ...evaluatedByData,
                                evaluated: true,
                            });
                            // setEvaluationTabValue("evaluationPartReport");
                            // setViewOnlyTab({ ...viewOnlyTab, evaluViewOnly: true });
                        } else {
                            handleSnack(
                                "error",
                                "Warranty Acception Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Warranty Acception Failed or Something went wrong"
                        );
                    }
                );
            } else {
                handleSnack(
                    "info",
                    "Create Evaluation First then you can Accepet or Reject Warranty"
                );
            }
        } else {
            handleSnack(
                "info",
                "Create Assessment First then you can Update warranty Status."
            );
        }
    };

    return (
        <div
            className="card border"
            style={{
                backgroundColor: `${
                    claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                }`,
            }}
        >
            <Box
                className="mt-0"
                sx={{
                    width: "100%",
                    typography: "body1",
                    backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`
                }}
            >
                <TabContext value={evaluationTabValue}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            backgroundColor: "#f8f8f8",
                        }}
                    >
                        <TabList
                            className="custom-tabs-div"
                            onChange={(e, value) =>
                                setEvaluationTabValue(value)
                            }
                        >
                            <Tab label="Details" value={"evaluationDetails"} />
                            <Tab
                                label="Part Reports"
                                value={"evaluationPartReport"}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="evaluationDetails">
                        <div className="card px-3 py-3 border" style={{backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`}}>
                            <div className="row input-fields">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500">
                                            HAS THE CUSTOMER FOLLOWED THE SAFETY
                                            REGULATIONS IN THE MANUAL?
                                        </label>
                                        <Select
                                            className="text-primary"
                                            options={questionsOptions}
                                            onChange={(e) =>
                                                handleEvaluationDeatilsSelectDataChange(
                                                    e,
                                                    `question1`
                                                )
                                            }
                                            value={
                                                evaluationDetailsData.question1
                                            }
                                            styles={FONT_STYLE_SELECT}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500">
                                            HAS THE OPERATOR FOLLOWED PRODUCT
                                            INSTUCTIONS CAREFULLY?
                                        </label>
                                        <Select
                                            className="text-primary"
                                            options={questionsOptions}
                                            onChange={(e) =>
                                                handleEvaluationDeatilsSelectDataChange(
                                                    e,
                                                    `question2`
                                                )
                                            }
                                            value={
                                                evaluationDetailsData.question2
                                            }
                                            styles={FONT_STYLE_SELECT}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500">
                                            HAVE EXTERNAL FORCES DAMAGED THE
                                            MACHINE/COMPONENT?
                                        </label>
                                        <Select
                                            className="text-primary"
                                            options={questionsOptions}
                                            onChange={(e) =>
                                                handleEvaluationDeatilsSelectDataChange(
                                                    e,
                                                    `question3`
                                                )
                                            }
                                            value={
                                                evaluationDetailsData.question3
                                            }
                                            styles={FONT_STYLE_SELECT}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500">
                                            IS IT A KNOWN PRODUCT DEFECT? OR HAS
                                            THE ISSUE APPEARED BEFORE?
                                        </label>
                                        <Select
                                            className="text-primary"
                                            options={questionsOptions}
                                            onChange={(e) =>
                                                handleEvaluationDeatilsSelectDataChange(
                                                    e,
                                                    `question4`
                                                )
                                            }
                                            value={
                                                evaluationDetailsData.question4
                                            }
                                            styles={FONT_STYLE_SELECT}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-14 font-weight-500">
                                            WHAT IS THE CAUSES?
                                        </label>
                                        <textarea
                                            className="form-control border-radius-10 text-primary"
                                            name="Causes"
                                            cols="30"
                                            rows="2"
                                            value={
                                                evaluationDetailsData.question5
                                            }
                                            onChange={(e) =>
                                                setEvaluationDetailsData({
                                                    ...evaluationDetailsData,
                                                    question5: e.target.value,
                                                })
                                            }
                                            placeholder="causes"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label className="text-light-dark font-size-12 font-weight-500">
                                            WHAT ARE THE CORRECTIVE ACTIONS
                                            TAKEN?
                                        </label>
                                        <textarea
                                            className="form-control border-radius-10 text-primary"
                                            name="correctiveActions"
                                            cols="30"
                                            rows="2"
                                            value={
                                                evaluationDetailsData.question6
                                            }
                                            onChange={(e) =>
                                                setEvaluationDetailsData({
                                                    ...evaluationDetailsData,
                                                    question6: e.target.value,
                                                })
                                            }
                                            placeholder="Actions"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5>Evaluated By</h5>
                        <div className="card border px-3 py-3" style={{backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`}}>
                            {!viewOnlyTab.evaluViewOnly ? (
                                <div className="row input-fields">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                FIRST NAME
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluatedByFirstName
                                                }
                                                name="evaluatedByFirstName"
                                                placeholder="First Name"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                LAST NAME
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluatedByLastName
                                                }
                                                name="evaluatedByLastName"
                                                placeholder="Last Name"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                EMAIL
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluatedByEmail
                                                }
                                                name="evaluatedByEmail"
                                                placeholder="Email"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                ROLE
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluatedByRole
                                                }
                                                name="evaluatedByRole"
                                                placeholder="Role"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                POSITION
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluatedByPosition
                                                }
                                                name="evaluatedByPosition"
                                                placeholder="Position"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                EVALUATED ON
                                            </label>
                                            <div className="align-items-center date-box">
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                >
                                                    <MobileDatePicker
                                                        inputFormat="dd/MM/yyyy"
                                                        className="form-controldate border-radius-10"
                                                        // maxDate={new Date()}
                                                        closeOnSelect
                                                        value={
                                                            evaluatedByData.evaluatedOn
                                                        }
                                                        onChange={(e) =>
                                                            setEvaluatedByData({
                                                                ...evaluatedByData,
                                                                evaluatedOn: e,
                                                            })
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
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
                                                CHANGED BY
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    evaluatedByData.evaluationChangedBy
                                                }
                                                name="evaluationChangedBy"
                                                placeholder="Chnaged By"
                                                onChange={
                                                    handleEvaluationByDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                        <div className="form-group">
                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                CHANGED ON
                                            </label>
                                            <div className="align-items-center date-box">
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                >
                                                    <MobileDatePicker
                                                        inputFormat="dd/MM/yyyy"
                                                        className="form-controldate border-radius-10"
                                                        // maxDate={new Date()}
                                                        closeOnSelect
                                                        value={
                                                            evaluatedByData.evaluationChangedOn
                                                        }
                                                        onChange={(e) =>
                                                            setEvaluatedByData({
                                                                ...evaluatedByData,
                                                                evaluationChangedOn:
                                                                    e,
                                                            })
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
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
                            ) : (
                                <div className="row mt-2">
                                    <ReadOnlyField
                                        label="FIRST NAME"
                                        value={
                                            evaluatedByData.evaluatedByFirstName
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="LAST NAME"
                                        value={
                                            evaluatedByData.evaluatedByLastName
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="EMAIL"
                                        value={evaluatedByData.evaluatedByEmail}
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="ROLE"
                                        value={evaluatedByData.evaluatedByRole}
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="POSITION"
                                        value={
                                            evaluatedByData.evaluatedByPosition
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="EVALUATED ON"
                                        value={
                                            <Moment format="DD/MM/YYYY">
                                                {evaluatedByData.evaluatedOn}
                                            </Moment>
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="CHANGED BY"
                                        value={
                                            evaluatedByData.evaluationChangedBy
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                    <ReadOnlyField
                                        label="CHANGED ON"
                                        value={
                                            <Moment format="DD/MM/YYYY">
                                                {
                                                    evaluatedByData.evaluationChangedOn
                                                }
                                            </Moment>
                                        }
                                        className="col-md-3 col-sm-3"
                                    />
                                </div>
                            )}
                        </div>
                        <div
                            className="row"
                            style={{
                                justifyContent: "right",
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                onClick={handleAddUpdateEvaluation}
                            >
                                Save & Next
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel value="evaluationPartReport">
                        <EvaluationPartReport
                            handleSnack={handleSnack}
                            title="Failed Part Table"
                            partsRecord={partsFailedRecord}
                            setPartsRecord={setPartsFailedRecord}
                            claimOrderId={claimOrderId}
                            evaluationId={evaluationId}
                            isFailedPart={true}
                            handleEvaluationPartsReturn={
                                handleEvaluationPartsReturn
                            }
                            keyName={"failed-parts"}
                        />
                        <EvaluationPartReport
                            handleSnack={handleSnack}
                            title="Causal Part Table"
                            partsRecord={partsCausalRecord}
                            setPartsRecord={setPartsCausalRecord}
                            claimOrderId={claimOrderId}
                            evaluationId={evaluationId}
                            isFailedPart={false}
                            handleEvaluationPartsReturn={
                                handleEvaluationPartsReturn
                            }
                            keyName={"causal-parts"}
                        />
                        <div className="Add-new-segment-div p-3 border-radius-10 mt-4">
                            <div class="repairbtn-dropdown">
                                <button
                                    className="btn bg-primary text-white ml-2 dropbtn"
                                    onClick={() =>
                                        handleWarrantyAcceptReject(true)
                                    }
                                >
                                    Warranty Acknowledged
                                </button>
                                <button
                                    className="btn warranty-reject-btn text-white ml-2 dropbtn"
                                    onClick={() =>
                                        handleWarrantyAcceptReject(false)
                                    }
                                >
                                    Warranty Rejected
                                </button>
                            </div>
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default EvaluationDetails;
