import React, { useState } from "react";

import { Box, Card, Grid, Tab, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
} from "pages/Repair/CONSTANTS";
import {
  Warranty_Evaluation_Create_POST,
  Warranty_Question_Answer_Create_POST,
} from "services/CONSTANTS";
import { callPostApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { evaluationReqObj } from "./claimWarrantyConstants";

const questionsOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
];

const defaultObj = {
  questions1: "",
  questions2: "",
  questions3: "",
  questions4: "",
  questions5: "",
  questions6: "",
  causes: "",
  correctiveActions: "",
};

const defaultEvaluatedByObj = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  position: "",
  evaluatedOn: new Date(),
  changedBy: "",
  changedOn: new Date(),
};

const failedPartAnalysisOptions = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
  `without any fault`,
];

const causalPartAnalysisOptions = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
];

const failedPartRecords = [
  {
    index: 0,
    partNumber: "1239",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: 1,
    partNumber: "1239",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

const ClaimWarrantyEvaluationModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  handleShowClaimCreateModal,
  handleShowClaimProceeOnClaimCreate,
  evaluatedId,
  evaluationQuestions,
  warrantyRecordId,
}) => {
  const [tabValue, setTabValue] = useState("details");
  const [recordObj, setRecordObj] = useState({ ...defaultObj });
  const [evaluatedByRecordObj, setEvaluatedByRecordObj] = useState({
    ...evaluationReqObj,
  });

  const changeTab = (event, type) => {
    console.log();
    setTabValue(type);
  };

  const handleInputTextChange = (e) => {
    const { name, value } = e.target;
    setRecordObj({ ...recordObj, [name]: value });
  };

  const handleSelectChange = (e, keyName) => {
    setRecordObj({ ...recordObj, [keyName]: e });
  };

  const handleEvaluatedByInputTextChange = (e) => {
    const { name, value } = e.target;
    setEvaluatedByRecordObj({ ...evaluatedByRecordObj, [name]: value });
  };

  const handleEvaluatedBySelectChange = (e, keyName) => {
    setEvaluatedByRecordObj({ ...evaluatedByRecordObj, [keyName]: e });
  };

  const failedPartColumns = [
    {
      field: "partNumber",
      headerName: "Part Number",
      flex: 1,
    },
    {
      field: "partDescription",
      headerName: "Part Description",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "analysis",
      headerName: "Analysis",
      flex: 1,
      type: "singleSelect",
      valueOptions: ({ row }) => failedPartAnalysisOptions,
      valueFormatter: (params) => {
        const option = failedPartAnalysisOptions.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
  ];

  const handleWarrantyAccept = () => {
    hideModal();
    handleShowClaimProceeOnClaimCreate();
  };

  // view Part Reports table list
  const handleViewPartReports = () => {
    return (
      <>
        <Grid
          container
          sx={{
            width: "100%",
            backgroundColor: "#f3eafe",
            borderRadius: 5,
            marginBlock: 0,
            padding: 1,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              minHeight: 400,
              width: "100%",
              margin: 0,
            }}
            variant="outlined"
          >
            <Typography sx={{ fontSize: 18, fontWeight: 600, margin: 2 }}>
              Failed Part
            </Typography>
            <Box
              sx={{
                height: 300,
                marginBottom: 1,
                marginInline: 2,
                paddingBottom: 1,
              }}
            >
              <DataGrid
                sx={GRID_STYLE}
                getRowId={(row) => row.index}
                columns={failedPartColumns}
                rows={failedPartRecords}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </Box>
          </Card>
          <Card
            sx={{
              borderRadius: 4,
              minHeight: 400,
              width: "100%",
              marginTop: 2,
              marginBottom: 2,
            }}
            variant="outlined"
          >
            <Typography sx={{ fontSize: 18, fontWeight: 600, margin: 2 }}>
              Causal Part
            </Typography>
            <Box
              sx={{
                height: 300,
                marginBottom: 1,
                marginInline: 2,
                paddingBottom: 1,
              }}
            >
              <DataGrid
                sx={GRID_STYLE}
                getRowId={(row) => row.index}
                columns={failedPartColumns}
                rows={failedPartRecords}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </Box>
          </Card>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary mx-3"
              // onClick={handleShowClaimCreateModal}
              onClick={handleWarrantyAccept}
            >
              Warranty Accepted
            </button>
            <button className="btn btn-primary" onClick={hideModal}>
              Warranty Rejected
            </button>
          </div>
        </Grid>
      </>
    );
  };

  const handleCrateEvaluationQuestion1 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 1,
      answer: recordObj.questions1,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions1");
      }
    });
  };

  const handleCrateEvaluationQuestion2 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 2,
      answer: recordObj.questions2,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions2");
      }
    });
  };

  const handleCrateEvaluationQuestion3 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 3,
      answer: recordObj.questions3,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions3");
      }
    });
  };

  const handleCrateEvaluationQuestion4 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 4,
      answer: recordObj.questions4,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions4");
      }
    });
  };

  const handleCrateEvaluationQuestion5 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 5,
      answer: recordObj.questions5,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions5");
      }
    });
  };

  const handleCrateEvaluationQuestion6 = () => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
    const rObj = {
      evaluationId: evaluatedId,
      questionId: 6,
      answer: recordObj.questions6,
    };
    callPostApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        console.log("Success questions6");
      }
    });
  };

  const handleCreateEvaluation = () => {
    handleCrateEvaluationQuestion1();
    handleCrateEvaluationQuestion2();
    handleCrateEvaluationQuestion3();
    handleCrateEvaluationQuestion4();
    handleCrateEvaluationQuestion5();
    handleCrateEvaluationQuestion6();

    const rUrl = `${Warranty_Evaluation_Create_POST}`;
    const evalatuinonRObj = {
      ...evaluatedByRecordObj,
    };

    callPostApi(
      null,
      rUrl,
      evalatuinonRObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          handleSnack("success", "Evaluation Created Successfully.");
          setTabValue("partReport");
        } else {
          handleSnack("error", "Evaluation Failed or Something went wrong");
        }
      },
      (error) => {
        handleSnack("error", "Evaluation Failed or Something went wrong");
      }
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size={"xl"}>
      <Modal.Body>
        <div className="card border my-2 px-3">
          <div className="row py-2 text-white">
            <div className="col-lg-7 col-md-7 col-sm-6 col-12 d-flex justify-content-center align-items-center ">
              <h4>You are now evaluating Ann Santos</h4>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-6 col-12 d-flex claim-evalution-header">
              <img src="../assets/images/member/2.jpg" alt="" />
              <div className="mx-2">
                <h5 className="mb-0">David Krasniy</h5>
                <h6>Associate Programmer Analyst</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card border my-2 px-3">
          <div className="row py-3 px-3 d-flex claim-evalution-header">
            <img src="../assets/images/member/2.jpg" alt="" />
            <div className="mx-2">
              <h6 className="mb-0">Level 2</h6>
              <h4>Communication</h4>
            </div>
          </div>
        </div>
        <Grid
          container
          sx={{
            width: "100%",
            backgroundColor: "#f3eafe",
            borderRadius: 5,
            marginBlock: 2,
          }}
        >
          <Grid item xs={12}>
            <TabContext value={tabValue}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginTop: 3,
                  marginInline: 5,
                }}
              >
                <TabList className="" onChange={changeTab}>
                  <Tab
                    label="Details"
                    value={"details"}
                    className="heading-tabs"
                  />
                  <Tab
                    label="Part Reports"
                    value={"partReport"}
                    className="heading-tabs"
                  />
                </TabList>
              </Box>
              <TabPanel value="details" sx={{ marginTop: 0 }}>
                <div className="card px-3 py-3 border">
                  <div className="row input-fields">
                    {evaluationQuestions.length !== 0 &&
                      evaluationQuestions.map((row) => (
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              {row.question}
                            </label>
                            {row.type === "select" && (
                              <Select
                                className="text-primary"
                                options={questionsOptions}
                                onChange={(e) =>
                                  handleSelectChange(
                                    e,
                                    `questions${row.questionId}`
                                  )
                                }
                                value={recordObj[`questions${row.questionId}`]}
                                styles={FONT_STYLE_SELECT}
                              />
                            )}
                            {row.type === "input" && (
                              <textarea
                                className="form-control border-radius-10 text-primary"
                                name={`questions${row.questionId}`}
                                cols="30"
                                rows="2"
                                value={recordObj[`questions${row.questionId}`]}
                                onChange={handleInputTextChange}
                                // placeholder="causes"
                              ></textarea>
                            )}
                          </div>
                        </div>
                      ))}
                    {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Has the customer followed the safety regulations in
                          the manual?
                        </label>
                        <Select
                          className="text-primary"
                          options={questionsOptions}
                          onChange={(e) => handleSelectChange(e, `question1`)}
                          value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Has the operator followed product instructions
                          carefully?
                        </label>
                        <Select
                          className="text-primary"
                          options={questionsOptions}
                          onChange={(e) => handleSelectChange(e, `question1`)}
                          value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Have external forces damaged the machine/component?
                        </label>
                        <Select
                          className="text-primary"
                          options={questionsOptions}
                          onChange={(e) => handleSelectChange(e, `question1`)}
                          value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Is it a known product defect? or Has the issue
                          appeared before?
                        </label>
                        <Select
                          className="text-primary"
                          options={questionsOptions}
                          onChange={(e) => handleSelectChange(e, `question1`)}
                          value={recordObj.questions1}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          What are the causes
                        </label>
                        <textarea
                          className="form-control border-radius-10 text-primary"
                          name="causes"
                          cols="30"
                          rows="2"
                          value={recordObj.causes}
                          onChange={handleInputTextChange}
                          placeholder="causes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          What are the corrective actions taken
                        </label>
                        <textarea
                          className="form-control border-radius-10 text-primary"
                          name="correctiveActions"
                          cols="30"
                          rows="2"
                          value={recordObj.correctiveActions}
                          onChange={handleInputTextChange}
                          placeholder="Actions"
                        ></textarea>
                      </div>
                    </div> */}
                  </div>
                </div>
                <h4>Evaluated By</h4>
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
                          value={evaluatedByRecordObj.evaluatedByFirstName}
                          name="evaluatedByFirstName"
                          placeholder="First Name"
                          onChange={handleEvaluatedByInputTextChange}
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
                          value={evaluatedByRecordObj.evaluatedByLastName}
                          name="evaluatedByLastName"
                          placeholder="Last Name"
                          onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={evaluatedByRecordObj.evaluatedByEmail}
                          name="evaluatedByEmail"
                          placeholder="Email"
                          onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Role
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={evaluatedByRecordObj.evaluatedByRole}
                          name="evaluatedByRole"
                          placeholder="Role"
                          onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Position
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={evaluatedByRecordObj.evaluatedByPosition}
                          name="evaluatedByPosition"
                          placeholder="Position"
                          onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Evaluated On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={evaluatedByRecordObj.evaluatedOn}
                              onChange={(e) =>
                                handleEvaluatedBySelectChange(e, "evaluatedOn")
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
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Changed By
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={evaluatedByRecordObj.evaluationChangedBy}
                          name="evaluationChangedBy"
                          placeholder="Chnaged By"
                          onChange={handleEvaluatedByInputTextChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Changed On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={evaluatedByRecordObj.evaluationChangedOn}
                              onChange={(e) =>
                                handleEvaluatedBySelectChange(
                                  e,
                                  "evaluationChangedOn"
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
                <div className="row px-3" style={{ justifyContent: "right" }}>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white mr-1"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white"
                    onClick={handleCreateEvaluation}
                  >
                    Save & Next
                  </button>
                </div>
              </TabPanel>
              <TabPanel value="partReport" sx={{ marginTop: 0 }}>
                {handleViewPartReports()}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimWarrantyEvaluationModal;
