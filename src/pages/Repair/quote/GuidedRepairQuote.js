import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import penIcon from "../../../assets/images/pen.png";
import {
  Header,
  InitQuestion,
  Question1,
  Question2,
  Question3,
  Question4,
} from "./GuidedRepairQuestions";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { bindActionCreators } from "redux";
import { actionCreator } from "../../../redux/index";
import { getGuidedSolution } from "../../../services/index";
import SearchComponent from "../components/SearchComponent";
import {
  GRID_STYLE,
  TEMPLATE_SEARCH_Q_OPTIONS,
  TEMPLATE_TYPES,
} from "../CONSTANTS";
import { templateSearch } from "services/templateService";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Tooltip, Typography } from "@mui/material";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { STANDARD_JOB_DETAIL } from "navigation/CONSTANTS";
import SearchComponentTemplate from "../components/SearchComponentTemplate";
import QuoteRepairConfiguration from "./QuoteRepairConfiguration";
import QuoteWithEvaluation from "./QuoteWithEvaluation";

export const GuidedRepairQuote = (props) => {
  const [guidedSolutions, setGuidedSolutions] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    addFieldName,
    addFormControlLabel,
    resetQuestion,
    addWithDropdown,
    addResultFound,
    addQuestionHeader,
    addGuidedSolutionResponse,
    addDropdownFormLabel,
    addDropdownAPI,
  } = bindActionCreators(actionCreator, dispatch);
  const [value, setValue] = React.useState("config");
  const steps = ["Register", "Stop/configure", "Add to cart", "payment"];
  const fileTypes = ["XLS", "XLSX"];
  const history = useHistory();
  const [questionNoCounter, setQuestionNoCounter] = useState(0);
  const [questionsData, setQuestionsData] = useState([]);
  const [questionThreeHeader, setQuestionThreeHeader] = useState("");
  const [q3Dropdown, setQ3Dropdown] = useState(false);
  const [q4Dropdown, setQ4Dropdown] = useState(false);
  const [formControlLbls, setFormControlLbls] = useState([]);
  const [selectedQuoteOption, setSelectedQuoteOption] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  const [masterData, setMasterData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const searchKitColumns = [
    { field: "standardJobId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((model) => (
            <Typography style={{ fontSize: 12 }}>{model}</Typography>
          ))}
        </div>
      ),
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((family) => (
            <Typography style={{ fontSize: 12 }}>{family}</Typography>
          ))}
        </div>
      ),
    },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "totalLabourPrice",
      headerName: "Labor $",
      flex: 1,
      width: 130,
    },
    {
      field: "totalMiscPrice",
      headerName: "Misc $",
      flex: 1,
      width: 130,
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 },
    { field: "status", headerName: "Status", flex: 1, width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => makeKitEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const makeKitEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    templateDetails.templateId = selectedTemplate.templateId;
    templateDetails.templateDBId = selectedTemplate.id;
    // templateDetails.partListNo = templateDetails.;
    // templateDetails.partListId = selectedTemplate.estimationNumber;
    // templateDetails.versionNumber = selectedTemplate.versionNumber;
    history.push({
      pathname: STANDARD_JOB_DETAIL,
      state: templateDetails,
    });
  };
  // const handleContinuePress = (counter) => {
  //   var tempQuestionNoCounter = questionNoCounter;
  //   if (questionNoCounter == 4 && state.guidedSolution?.guidedQuestions[1].value == 'Routine Maintenance Tasks') {
  //     tempQuestionNoCounter = 5
  //     setQuestionNoCounter(6)
  //   } else {
  //     if (state != null) {
  //       if (state.guidedSolution != null) {
  //         var questionsData = state.guidedSolution?.guidedQuestions;
  //         var valueSelected = false;
  //         if (!state.guidedSolution?.withDropDown && tempQuestionNoCounter != 5) {
  //           if (questionsData[counter].value == "") {
  //             toast('🙁' + "Please Select Option !!", {
  //               position: "top-center",
  //               autoClose: 5000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //             });
  //             valueSelected = false;
  //           } else {
  //             valueSelected = true;
  //           }
  //         } else {
  //           valueSelected = true;
  //         }
  //         if (valueSelected) {
  //           // if (counter == 0) {
  //           //   var tempFormLbl = [];
  //           //   guidedSolutions.map((guide) => {
  //           //     tempFormLbl.push(guide.solutionName)
  //           //   })
  //           //   addFormControlLabel(tempFormLbl)
  //           //   addWithDescription(false)
  //           //   addWithDropdown(false)
  //           //   addQuestionHeader("What maintenence or repair solution you want to explore?")
  //           // }
  //           if (counter == 1) {
  //             if (questionsData[counter].value == 'Standard Rapair or Replacement') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel(["Used", "New"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("Is it for new/used machine?")
  //             } else if (questionsData[counter].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel(["Machine configuration", "Customization", "Assembly", "Extended Warranty", "Support Agreements", "Spare Parts", "Installation", "Other Services"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("What additional maintenace options are needed?")
  //             } else if (questionsData[counter].value == 'Service Contracts or Warranty') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel(["5-10", "10-50", "50-100", "100+"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("What is the size of the fleet?")
  //             }
  //           }
  //           if (counter == 2) {
  //             if (questionsData[counter - 1].value == 'Standard Rapair or Replacement' || questionsData[counter - 1].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("If you know the make and model choose the options")
  //             } else {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               var arrayOfDict = [{ "header": "Level 1 contract", "description": "For Simple scheduled inspections,oil change,filter replacement,subscription etc" },
  //               { "header": "Level 2 contract", "description": "For preventive maintenance,value added services,unplanned downtime etc." },
  //               { "header": "Level 3 contract", "description": "Total Maintenance and repair,comprehensive coverage." },
  //               { "header": "Level 4 contract", "description": "Outcome based solution." }
  //               ]
  //               addFormControlLabel(arrayOfDict)
  //               addWithDescription(true)
  //               addWithDropdown(false)
  //               addQuestionHeader("What kind of contract do you want to go ahead with ?")
  //             }
  //           }
  //           if (counter == 3) {
  //             if (questionsData[counter - 2].value == 'Standard Rapair or Replacement') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("Please choose the component that you want to be replaced")
  //             } else if (questionsData[counter - 2].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("Following product customization options are available for your search")
  //             }

  //             else {
  //               addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("If you know the make and model choose the options")
  //             }
  //           }
  //           if (counter == 4) {
  //             addPrevFormControlLabel(state.guidedSolution?.formLabels)
  //             addFormControlLabel([])
  //             addWithDescription(false)
  //             addWithDropdown(false)
  //             addQuestionHeader("Header are the available options")
  //           }
  //           setQuestionNoCounter(questionNoCounter + 1)
  //         }
  //       } else {
  //         alert("Redux Error in Guide Solution HandleContinue Press Reducer")
  //       }
  //     } else {
  //       alert("Redux Error in Guide Solution HandleContinue Press")
  //     }
  //   }

  // }
  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    // console.log(querySearchSelector);
    querySearchSelector.map(function (item, i) {
      if (
        i === 0 &&
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectType
      ) {
        searchStr =
          "templateType:" +
          item.selectType.value +
          " AND " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await templateSearch(`standardJobId~SJ AND ${searchStr}`);
        res.map((template) => {
          let family = [],
            model = [];
          template.coverages.map((coverage) => {
            family.push(coverage.coverageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          template.family = family;
          template.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching templates!");
    }
  };

  const handleContinuePress = (currentCounter) => {
    //Counter Not Increase Yet
    //Question 1
    if (currentCounter == 0) {
      var flowIndex = parseInt(state.guidedSolution.guidedQuestions[0].value);
      var guidedSolutionNames = [];

      if (
        state.guidedSolution?.guidedSolutionResponse != null &&
        state.guidedSolution?.guidedSolutionResponse.length > 0
      ) {
        addFieldName("solutionName");
        addQuestionHeader(
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[0]
            .description
        );
        if (flowIndex == 0) {
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            currentCounter
          ].options[currentCounter].strategyTask.map(
            (solutionNameRes, index) => {
              var dict = {
                key: solutionNameRes.value,
                value: index,
                secondValue: solutionNameRes.key,
              };
              guidedSolutionNames.push(dict);
            }
          );
        } else if (flowIndex == 1) {
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            currentCounter
          ].options[currentCounter].solution.map((solutionNameRes, index) => {
            var dict = {
              key: solutionNameRes.value,
              value: index,
              secondValue: solutionNameRes.key,
            };
            guidedSolutionNames.push(dict);
          });
        }
        addFieldName("solutionName");
        addFormControlLabel(guidedSolutionNames);
        setQuestionNoCounter(questionNoCounter + 1);
      } else {
        alert("Error");
      }
    }

    //Question 2
    if (currentCounter == 1) {
      //Check Which parent flow it is;
      let checkedValQ1 = "";
      var flowIndex = parseInt(state.guidedSolution?.guidedQuestions[0].value);
      var flowData = state.guidedSolution.guidedQuestions[1].fieldValue;

      var guidedSolutionNames = [];
      if (flowData != "" && flowData.length != 0) {
        if (
          state.guidedSolution?.guidedSolutionResponse != null &&
          state.guidedSolution?.guidedSolutionResponse.length > 0 &&
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions
            .length > 0
        ) {
          var childArray = [];

          var questionsAre =
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions;

          if (flowIndex == 0) {
            // console.log("length is : ", questionsAre.length)
            questionsAre[0].guidedSolutionModels.some(function (data, i) {
              if (data.solutionName == flowData) {
                addQuestionHeader(data.questions[0].description);
                addFieldName("machineType");
                data.questions[0].options[0].taskType.map((option, index) => {
                  var dict = {
                    key: option.value,
                    value: index,
                    secondValue: option.key,
                  };
                  guidedSolutionNames.push(dict);
                });
              }
            });
            addWithDropdown(false);
            addResultFound(false);
          } else if (flowIndex == 1) {
            questionsAre.some(function (entry, i) {
              if (entry.guidedSolutionModels[0].solutionName == flowData) {
                addQuestionHeader(
                  entry.guidedSolutionModels[0].questions[0].description
                );
                addFieldName(
                  entry.guidedSolutionModels[0].questions[0].fieldName
                );

                if (i == 0) {
                  entry.guidedSolutionModels[0].questions[0].options[0].lifeStageOfMachine.map(
                    (option, index) => {
                      var dict = {
                        key: option.value,
                        value: index,
                        secondValue: option.key,
                      };
                      guidedSolutionNames.push(dict);
                    }
                  );
                } else if (i == 1) {
                  entry.guidedSolutionModels[0].questions[0].options[0].strategyTask.map(
                    (option, index) => {
                      var dict = {
                        key: option.value,
                        value: index,
                        secondValue: option.key,
                      };
                      guidedSolutionNames.push(dict);
                    }
                  );
                } else {
                  entry.guidedSolutionModels[0].questions[0].options[0].fleetSize.map(
                    (option, index) => {
                      var dict = {
                        key: option.value,
                        value: index,
                        secondValue: option.key,
                      };
                      guidedSolutionNames.push(dict);
                    }
                  );
                }
              }
            });
            addWithDropdown(false);
            addResultFound(false);
          }
          // addQuestionHeader(
          //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //     currentCounter
          //   ].description
          // );
          // if (flowIndex == 0) {
          //   console.log("flow index is 0 so next step don`t be run")
          // } else if (flowIndex == 1) {
          //   if (
          //     state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //     currentCounter
          //     ] != null
          //   ) {

          //     var questionsAre = state.guidedSolution?.guidedSolutionResponse[flowIndex].questions;
          //     questionsAre.some(function (entry, i) {
          //       if (entry.guidedSolutionModels[0].solutionName == flowData) {
          //         addQuestionHeader(
          //           entry.guidedSolutionModels[0].questions[0].description
          //         );

          //         if (i == 0) {
          //           entry.guidedSolutionModels[0]
          //             .questions[0]
          //             .options[0].lifeStageOfMachine.map(
          //               (option, index) => {
          //                 var dict = {
          //                   key: option.key,
          //                   value: index,
          //                   secondValue: option.value,
          //                 };
          //                 guidedSolutionNames.push(dict);
          //               }
          //             );
          //         } else if (i == 1) {
          //           entry.guidedSolutionModels[0]
          //             .questions[0]
          //             .options[0].strategyTask.map(
          //               (option, index) => {
          //                 var dict = {
          //                   key: option.key,
          //                   value: index,
          //                   secondValue: option.value,
          //                 };
          //                 guidedSolutionNames.push(dict);
          //               }
          //             );
          //         } else {
          //           entry.guidedSolutionModels[0]
          //             .questions[0]
          //             .options[0].fleetSize.map(
          //               (option, index) => {
          //                 var dict = {
          //                   key: option.key,
          //                   value: index,
          //                   secondValue: option.value,
          //                 };
          //                 guidedSolutionNames.push(dict);
          //               }
          //             );
          //         }
          //         addWithDropdown(false);
          //         addResultFound(false);
          //         return true;
          //       }
          //     });
          //   }

          //   // if (
          //   //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //   //     currentCounter
          //   //   ].options.length > 0
          //   // ) {

          //   //   if (flowIndex == 0) {
          //   //     if (
          //   //       state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //         .questions[currentCounter].options[0].machineType.length > 0
          //   //     ) {
          //   //       addFieldName("machineType");
          //   //       addFieldName(
          //   //         state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //           .questions[currentCounter].fieldName
          //   //       );
          //   //       state.guidedSolution?.guidedSolutionResponse[
          //   //         flowIndex
          //   //       ].questions[currentCounter].options[0].machineType.map(
          //   //         (option, index) => {
          //   //           var dict = {
          //   //             key: option.key,
          //   //             value: index,
          //   //             secondValue: option.value,
          //   //           };
          //   //           guidedSolutionNames.push(dict);
          //   //         }
          //   //       );
          //   //       addWithDropdown(false);
          //   //       addResultFound(false);
          //   //     }
          //   //     // machineType
          //   //   }
          //   //   else if (flowIndex == 1) {
          //   //     if (
          //   //       state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //         .questions[currentCounter].options[0].taskType.length > 0
          //   //     ) {
          //   //       addFieldName(
          //   //         state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //           .questions[currentCounter].fieldName
          //   //       );
          //   //       state.guidedSolution?.guidedSolutionResponse[
          //   //         flowIndex
          //   //       ].questions[currentCounter].options[0].taskType.map(
          //   //         (option, index) => {
          //   //           var dict = {
          //   //             key: option.key,
          //   //             value: index,
          //   //             secondValue: option.value,
          //   //           };
          //   //           guidedSolutionNames.push(dict);
          //   //         }
          //   //       );
          //   //       addWithDropdown(false);
          //   //       addResultFound(false);
          //   //       console.log("guidedSolutionNames", guidedSolutionNames)
          //   //     }
          //   //     // taskType
          //   //   }
          //   //   else {
          //   //     if (
          //   //       state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //         .questions[currentCounter].options[0].fleet.length > 0
          //   //     ) {
          //   //       addFieldName(
          //   //         state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //   //           .questions[currentCounter].fieldName
          //   //       );
          //   //       state.guidedSolution?.guidedSolutionResponse[
          //   //         flowIndex
          //   //       ].questions[currentCounter].options[0].fleet.map(
          //   //         (option, index) => {
          //   //           var dict = {
          //   //             key: option.key,
          //   //             value: index,
          //   //             secondValue: option.value,
          //   //           };
          //   //           guidedSolutionNames.push(dict);
          //   //         }
          //   //       );
          //   //       addWithDropdown(false);
          //   //       addResultFound(false);
          //   //     }
          //   //     // fleet
          //   //   }
          //   // }
          // }
          addFormControlLabel(guidedSolutionNames);
        } else {
          alert("Error");
        }
        setQuestionNoCounter(questionNoCounter + 1);
      }
    }

    //Question 3
    if (currentCounter == 2) {
      //Check Which parent flow it is;

      var flowIndex = parseInt(state.guidedSolution?.guidedQuestions[0].value);
      var flowData = state.guidedSolution.guidedQuestions[1].fieldValue;

      var guidedSolutionNames = [];
      var tempDropdownFormLables = [];

      if (
        state.guidedSolution?.guidedSolutionResponse != null &&
        state.guidedSolution?.guidedSolutionResponse.length > 0 &&
        state.guidedSolution?.guidedSolutionResponse[flowIndex].questions
          .length > 0
      ) {
        var childArray = [];
        if (
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            currentCounter
          ] != null
        ) {
          var questionsAre =
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions;

          questionsAre.some(function (entry, i) {
            if (entry.guidedSolutionModels[0].solutionName == flowData) {
              if (entry.guidedSolutionModels[0].questions[1].type == "API") {
                addDropdownAPI(
                  entry.guidedSolutionModels[0].questions[1].apiUrl
                );
                addQuestionHeader(
                  entry.guidedSolutionModels[0].questions[1].description
                );
                entry.guidedSolutionModels[0].questions[1].options[0].coverage.map(
                  (option, index) => {
                    var dict = {
                      key: option.key,
                      value: index,
                      secondValue: option.value,
                    };
                    tempDropdownFormLables.push(dict);
                  }
                );
                addWithDropdown(true);
                addResultFound(false);
              } else {
                addQuestionHeader(
                  entry.guidedSolutionModels[0].questions[1].description
                );
                entry.guidedSolutionModels[0].questions[1].options[0].contractOrSupport.map(
                  (option, index) => {
                    var dict = {
                      key: option.value,
                      value: index,
                      secondValue: option.key,
                    };
                    guidedSolutionNames.push(dict);
                  }
                );
                // addFormControlLabel(
                //   entry.guidedSolutionModels[0].questions[1].options[0].contractOrSupport
                // );

                addDropdownAPI("");
                addWithDropdown(false);
                addResultFound(false);
              }
            }
          });

          // if (
          //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //     currentCounter
          //   ].type == "API"
          // ) {

          //   addDropdownAPI(
          //     state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //       currentCounter
          //     ].apiUrl
          //   );
          //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //     currentCounter
          //   ].options[0].coverage.map((option, index) => {
          //     var dict = {
          //       key: option.key,
          //       value: index,
          //       secondValue: option.value,
          //     };
          //     tempDropdownFormLables.push(dict);
          //   });
          //   addWithDropdown(true);
          //   addResultFound(false);
          // } else {

          //   addQuestionHeader(
          //     state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //       currentCounter
          //     ].description
          //   );

          //   addDropdownAPI("");
          //   addWithDropdown(false);
          //   addResultFound(false);
          //   tempDropdownFormLables = [];
          //   if (flowIndex == 2) {
          //     addFieldName(
          //       state.guidedSolution?.guidedSolutionResponse[flowIndex]
          //         .questions[currentCounter].fieldName
          //     );
          //     state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
          //       currentCounter
          //     ].options[0].contract.map((option, index) => {
          //       var dict = {
          //         key: option.key,
          //         value: index,
          //         secondValue: option.value,
          //       };
          //       guidedSolutionNames.push(dict);
          //     });
          //   } else {
          //     //Need to check what to do
          //   }
          // }
        } else {
          // console.log("next question is dropdown")
          //It mean next question is dropdown type
          var questionIndex =
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter - 1
            ] != null
              ? currentCounter - 1
              : state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions.length - 1;

          console.log("index : ", questionIndex);
          console.log("current : ", flowData);
          console.log(
            "object : ",
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              questionIndex
            ].guidedSolutionModels
          );
          console.log(
            "FlowData is : ",
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions
          );

          if (
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              questionIndex
            ].guidedSolutionModels[questionIndex].questions.length > 0
          ) {
            var questionsArr =
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                questionIndex
              ].guidedSolutionModels;

            questionsArr.some(function (arrData, i) {
              if (arrData.solutionName == flowData) {
                if (arrData.questions[0].guidedSolutionModels !== null) {
                  addQuestionHeader(
                    arrData.questions[0].guidedSolutionModels[0].questions[0]
                      .description
                  );
                  addDropdownAPI(
                    arrData.questions[0].guidedSolutionModels[0].questions[0]
                      .apiUrl
                  );
                  arrData.questions[0].guidedSolutionModels[0].questions[0].options[0].coverage.map(
                    (option, index) => {
                      var dict = {
                        key: option.key,
                        value: index,
                        secondValue: option.value,
                      };
                      tempDropdownFormLables.push(dict);
                    }
                  );
                }
              }
            });

            console.log("Question Arrr : ", questionsArr);

            // addQuestionHeader(
            //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            //     questionIndex
            //   ].guidedSolutionModel.questions[0].description
            // );

            // addDropdownAPI(
            //   state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            //     questionIndex
            //   ].guidedSolutionModel.questions[0].apiUrl
            // );

            // state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            //   questionIndex
            // ].guidedSolutionModel.questions[0].options[0].coverage.map(
            //   (option, index) => {
            //     var dict = {
            //       key: option.key,
            //       value: index,
            //       secondValue: option.value,
            //     };
            //     tempDropdownFormLables.push(dict);
            //   }
            // );
            // addFormControlLabel(state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            //   questionIndex
            // ].guidedSolutionModel.questions[0].options[0].coverage)
          } else {
            //Need to check what to do
          }
          addWithDropdown(true);
          addResultFound(false);
        }
        addDropdownFormLabel(tempDropdownFormLables);
        addFormControlLabel(guidedSolutionNames);
        setQuestionNoCounter(questionNoCounter + 1);
      } else {
        alert("Error");
      }
    }

    //Question 4
    if (currentCounter == 3) {
      //Check Which parent flow it is;

      var flowIndex = parseInt(state.guidedSolution?.guidedQuestions[0].value);
      var flowData = state.guidedSolution.guidedQuestions[1].fieldValue;

      var guidedSolutionNames = [];
      var tempDropdownFormLables = [];
      if (
        state.guidedSolution?.guidedSolutionResponse != null &&
        state.guidedSolution?.guidedSolutionResponse.length > 0 &&
        state.guidedSolution?.guidedSolutionResponse[flowIndex].questions
          .length > 0
      ) {
        var childArray = [];
        if (
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            currentCounter
          ] != null
        ) {
          if (
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter
            ].type == "API"
          ) {
            addQuestionHeader(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].description
            );
            addDropdownAPI(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].apiUrl
            );
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter
            ].options[0].coverage.map((option, index) => {
              var dict = {
                key: option.key,
                value: index,
                secondValue: option.value,
              };
              tempDropdownFormLables.push(dict);
            });
            addWithDropdown(true);
            addResultFound(false);
          } else {
            addQuestionHeader(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].description
            );
            addDropdownAPI("");
            addWithDropdown(false);
            addResultFound(false);
            tempDropdownFormLables = [];
            if (flowIndex == 2) {
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].options[0].contract.map((option, index) => {
                var dict = {
                  key: option.key,
                  value: index,
                  secondValue: option.value,
                };
                guidedSolutionNames.push(dict);
              });
            } else {
              //Need to check what to do
            }
          }
        } else {
          //It mean next question is dropdown type
          var questionIndex =
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter - 1
            ] != null
              ? currentCounter - 1
              : state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions.length - 1;
          //Check whether is last or more

          if (
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              questionIndex
            ].guidedSolutionModels != null
          ) {
            if (
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                questionIndex
              ].guidedSolutionModels[0].questions.length > 0
            ) {
              console.log(
                "object : ",
                state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions[questionIndex].guidedSolutionModels[0].questions[2]
              );
              addQuestionHeader(
                state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions[questionIndex].guidedSolutionModels[0].questions[2]
                  .description
              );
              addDropdownAPI(
                state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions[questionIndex].guidedSolutionModels[0].questions[2]
                  .apiUrl
              );

              // addFormControlLabel(state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              //   questionIndex
              // ].guidedSolutionModels[0].questions[2].options[0].component)

              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                questionIndex
              ].guidedSolutionModels[0].questions[2].options[0].component.map(
                (option, index) => {
                  var dict = {
                    key: option.key,
                    value: index,
                    secondValue: option.value,
                  };
                  tempDropdownFormLables.push(dict);
                }
              );
            } else {
              //Need to check what to do
            }
            addResultFound(false);
          } else {
            //This is last now we need to show the resule of guided solution
            addResultFound(true);
            //Make Search Query
            var query = "";
            for (
              let i = 1;
              i < state.guidedSolution?.guidedQuestions.length;
              i++
            ) {
              if (i != 1 && i != state.guidedSolution?.guidedQuestions.length) {
                query += " AND ";
              }
              if (
                state.guidedSolution?.guidedQuestions[i].fieldName ==
                "fleetSize"
              ) {
                var splitValue =
                  state.guidedSolution?.guidedQuestions[i].fieldValue.split(
                    "-"
                  );
                query +=
                  state.guidedSolution?.guidedQuestions[i].fieldName +
                  ">" +
                  splitValue[0] +
                  " " +
                  state.guidedSolution?.guidedQuestions[i].fieldName +
                  "<" +
                  splitValue[1];
              } else {
                query +=
                  state.guidedSolution?.guidedQuestions[i].fieldName + ": ";
                query += state.guidedSolution?.guidedQuestions[i].fieldValue;
              }
            }
            console.log("query : ", query);
          }
          addWithDropdown(true);
        }
        addDropdownFormLabel(tempDropdownFormLables);
        setQuestionNoCounter(questionNoCounter + 1);
        // addFormControlLabel(guidedSolutionNames);
        // addFormControlLabel(state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
        //   questionIndex
        // ].guidedSolutionModels[0].questions[2].options[0].component)
      } else {
        alert("Error");
      }
    }

    //Question 5
    if (currentCounter == 4) {
      //Check Which parent flow it is;
      var flowIndex = parseInt(state.guidedSolution?.guidedQuestions[0].value);
      var guidedSolutionNames = [];
      var tempDropdownFormLables = [];
      if (
        state.guidedSolution?.guidedSolutionResponse != null &&
        state.guidedSolution?.guidedSolutionResponse.length > 0 &&
        state.guidedSolution?.guidedSolutionResponse[flowIndex].questions
          .length > 0
      ) {
        var childArray = [];
        if (
          state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
            currentCounter
          ] != null
        ) {
          if (
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter
            ].type == "API"
          ) {
            addQuestionHeader(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].description
            );
            addDropdownAPI(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].apiUrl
            );
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter
            ].options[0].coverage.map((option, index) => {
              var dict = {
                key: option.key,
                value: index,
                secondValue: option.value,
              };
              tempDropdownFormLables.push(dict);
            });
            addWithDropdown(true);
            addResultFound(true);
          } else {
            addQuestionHeader(
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].description
            );
            addDropdownAPI("");
            addWithDropdown(false);
            addResultFound(false);
            tempDropdownFormLables = [];
            if (flowIndex == 2) {
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                currentCounter
              ].options[0].contract.map((option, index) => {
                var dict = {
                  key: option.key,
                  value: index,
                  secondValue: option.value,
                };
                guidedSolutionNames.push(dict);
              });
            } else {
              //Need to check what to do
            }
          }
        } else {
          //It mean next question is dropdown type
          var questionIndex =
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              currentCounter - 1
            ] != null
              ? currentCounter - 1
              : state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions.length - 1;
          //Check whether is last or more
          if (
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              questionIndex
            ].guidedSolutionModel != null &&
            state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
              questionIndex
            ].guidedSolutionModel.questions[2] != null
          ) {
            if (
              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                questionIndex
              ].guidedSolutionModel.questions.length > 0
            ) {
              addQuestionHeader(
                state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions[questionIndex].guidedSolutionModel.questions[2]
                  .description
              );
              addDropdownAPI(
                state.guidedSolution?.guidedSolutionResponse[flowIndex]
                  .questions[questionIndex].guidedSolutionModel.questions[2]
                  .apiUrl
              );

              state.guidedSolution?.guidedSolutionResponse[flowIndex].questions[
                questionIndex
              ].guidedSolutionModel.questions[2].options[0].component.map(
                (option, index) => {
                  var dict = {
                    key: option.key,
                    value: index,
                    secondValue: option.value,
                  };
                  tempDropdownFormLables.push(dict);
                }
              );
            } else {
              //Need to check what to do
            }
            addResultFound(false);
          } else {
            //This is last now we need to show the resule of guided solution
            addResultFound(true);
            //Make Search Query
            var query = "";
            for (
              let i = 1;
              i < state.guidedSolution?.guidedQuestions.length;
              i++
            ) {
              if (i != 1 && i != state.guidedSolution?.guidedQuestions.length) {
                query += " AND ";
              }
              if (
                state.guidedSolution?.guidedQuestions[i].fieldName ==
                "fleetSize"
              ) {
                var splitValue =
                  state.guidedSolution?.guidedQuestions[i].fieldValue.split(
                    "-"
                  );
                query +=
                  state.guidedSolution?.guidedQuestions[i].fieldName +
                  ">" +
                  splitValue[0] +
                  " " +
                  state.guidedSolution?.guidedQuestions[i].fieldName +
                  "<" +
                  splitValue[1];
              } else {
                query +=
                  state.guidedSolution?.guidedQuestions[i].fieldName + ": ";
                query += state.guidedSolution?.guidedQuestions[i].fieldValue;
              }
            }
            console.log(query);
          }
          addWithDropdown(true);
        }
        addDropdownFormLabel(tempDropdownFormLables);
        addFormControlLabel(guidedSolutionNames);
        setQuestionNoCounter(questionNoCounter + 1);
      } else {
        alert("Error");
      }
    }

    //Counter Increase below
    // setQuestionNoCounter(questionNoCounter + 1);
  };
  const handlePreviousPress = () => {
    if (questionNoCounter > 0) {
      setQuestionNoCounter(questionNoCounter - 1);
      var tempQuestionArray = state.guidedSolution?.guidedQuestions.slice();
      tempQuestionArray.splice(questionNoCounter, 1);
      resetQuestion(tempQuestionArray);
    }
  };

  useEffect(() => {
    getGuidedSolution()
      .then((res) => {
        console.log("guidedSolution in useEffect", res);
        setGuidedSolutions(res);
        addGuidedSolutionResponse(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-12 col-sm-12 mx-auto">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </div>
          </div>
          <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList className="custom-tabs-div" onChange={handleChange}>
                  <Tab label="Use Repair Builder" value="config" />
                  <Tab label="Use Repair Templates " value="template" />
                  <Tab label="Import From Excel" value="import" />
                </TabList>
              </Box>

              <TabPanel className="p-0" value="config">
                {selectedQuoteOption === "without_eval" ? (
                  <>
                    {questionNoCounter == 0 ? <InitQuestion /> : <></>}
                    {questionNoCounter == 1 ? (
                      <Question1
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 2 ? questionsData[2] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {questionNoCounter == 2 ? (
                      <Question2
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 2 ? questionsData[2] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {questionNoCounter == 3 ? (
                      <Question3
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 2 ? questionsData[2] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {/* {questionNoCounter == 3
                  ?
                  <Question4 isDropDown={q3Dropdown} formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 3 ? questionsData[3] : null} />
                  :
                  <></>} */}
                    {questionNoCounter == 4 ? (
                      <Question4
                        isDropDown={q3Dropdown}
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 3 ? questionsData[3] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {questionNoCounter == 5 ? (
                      <Question4
                        isDropDown={q4Dropdown}
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 3 ? questionsData[3] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {questionNoCounter == 6 ? (
                      <Header
                        isDropDown={q4Dropdown}
                        formLbls={formControlLbls}
                        questionHeader={questionThreeHeader}
                        defaultValue={
                          questionsData.length > 3 ? questionsData[3] : null
                        }
                      />
                    ) : (
                      <></>
                    )}
                    {state.guidedSolution?.isResultFound &&
                    questionNoCounter == 6 ? (
                      <div className="d-flex align-items-center justify-content-between mt-5">
                        <div>
                          {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                        </div>
                        <div>
                          <Link
                            to="/solutionBuilder/new"
                            className="btn bg-primary text-white cursor"
                          >
                            Create{" "}
                            <ArrowForwardIcon className=" font-size-16" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <>
                        {state.guidedSolution?.isResultFound &&
                        questionNoCounter != 6 ? (
                          <div className="d-flex align-items-center justify-content-between mt-5">
                            <div>
                              {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                            </div>
                            <div>
                              {/* <Link to="/solutionBuilder/new" className="btn bg-primary text-white cursor">Finish <ArrowForwardIcon className=" font-size-16" /></Link> */}
                              <a
                                className="btn bg-primary text-white cursor"
                                onClick={() => setQuestionNoCounter(6)}
                              >
                                Finish{" "}
                                <ArrowForwardIcon className=" font-size-16" />
                              </a>
                              {/* <Link to="/solutionBuilder/new" className="btn bg-primary text-white cursor">Finish <ArrowForwardIcon className=" font-size-16" /></Link> */}
                              {/* <a className="btn bg-primary text-white cursor" onClick={() => setQuestionNoCounter(6)}></a> */}
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-between mt-5">
                            <div>
                              <a
                                className="btn cursor"
                                style={{ display: "none" }}
                              >
                                <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                                <KeyboardBackspaceIcon className=" font-size-16" />{" "}
                                Previous
                              </a>
                              {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                            </div>
                            <div>
                              <a
                                className="btn bg-primary text-white cursor"
                                onClick={() =>
                                  handleContinuePress(questionNoCounter)
                                }
                              >
                                Continue{" "}
                                <ArrowForwardIcon className=" font-size-16" />
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : selectedQuoteOption === "with_eval" ? (
                  <QuoteWithEvaluation />
                ) : (
                  <QuoteRepairConfiguration 
                    setSelectedQuoteOption={setSelectedQuoteOption}
                    selectedQuoteOption={selectedQuoteOption}
                  />
                )}
              </TabPanel>
              <TabPanel className="p-0" value="template">
                <div className="bg-primary px-3 my-3 border-radius-6">
                  <div className="d-md-flex d-block justify-content-between align-items-center height-66">
                    <div className=" mx-2">
                      <div className="d-flex align-items-center bg-primary w-100">
                        <div
                          className="d-flex mr-3"
                          style={{ whiteSpace: "pre" }}
                        >
                          <h5 className="mr-2 mb-0 text-white">
                            <span>Search</span>
                          </h5>
                        </div>
                        <SearchComponentTemplate
                          querySearchSelector={querySearchSelector}
                          setQuerySearchSelector={setQuerySearchSelector}
                          clearFilteredData={clearFilteredData}
                          handleSnack={handleSnack}
                          searchAPI={templateSearch}
                          searchClick={handleQuerySearchClick}
                          options={TEMPLATE_SEARCH_Q_OPTIONS}
                          typeOptions={TEMPLATE_TYPES}
                          color="white"
                          type="template"
                          buttonText={"SEARCH"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div
                    className=""
                    style={{
                      height: 400,
                      width: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <DataGrid
                      sx={GRID_STYLE}
                      rows={masterData}
                      columns={searchKitColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      autoHeight
                    />
                  </div>
                </div>
                <a
                  href="/QuoteRepairOption"
                  className="btn text-white bg-primary pull-right"
                >
                  Next
                </a>
                <div className="text-right" style={{ paddingTop: "18rem" }}>
                  <a
                    className="btn bg-primary text-white cursor"
                    href="/SolutionTemplates"
                  >
                    Continue <ArrowForwardIcon className=" font-size-16" />
                  </a>
                </div>
              </TabPanel>
              <TabPanel className="p-0" value="import">
                <div className="card  mt-3 p-3">
                  <h5 className="d-flex align-items-center mb-0">
                    <div className="" style={{ display: "contents" }}>
                      <span className="mr-3" style={{ whiteSpace: "pre" }}>
                        Import From Excel
                      </span>
                      <a href="#" className="btn-sm">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                      </a>{" "}
                      <a href="#" className="btn-sm">
                        <i className="fa fa-folder-o" aria-hidden="true"></i>
                      </a>
                    </div>
                    <div className="hr"></div>
                  </h5>
                  {/* <p className="mt-4 ">
                    Amet minim mollit non deserunt ullamco est aliqua dolor do
                    amet sint,Amet minim mollit non deserunt ullamco est aliqua
                    dolor do amet sint
                  </p> */}
                  <div className="p-3">
                    <div className="add-new-recod">
                      <div>
                        <FontAwesomeIcon
                          className="cloudupload"
                          icon={faCloudUploadAlt}
                        />
                        <h6 className="font-weight-500 mt-3">
                          Drag and drop files to upload <br /> or
                        </h6>
                        <FileUploader
                          handleChange={handleChange}
                          name="file"
                          types={fileTypes}
                        />
                        <p className="mt-3">
                          Single upload file should not be more than <br />{" "}
                          10MB. Only the .xls, .xlsx file types are allowed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
};
