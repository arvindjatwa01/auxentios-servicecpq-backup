import React, { useEffect, useState } from "react";
import { CommanComponents } from "../../components/index"
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TabPanel from '@mui/lab/TabPanel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import OwlCarousel from 'react-owl-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import CabinIcon from '@mui/icons-material/Cabin';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { FileUploader } from "react-drag-drop-files";
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import shareIcon from '../../assets/icons/svg/share.svg'
import { RadioGroupComponent } from '../../pages/Common/index'
import { InitQuestion, Question1, Question2, Question3, Question4, Question5, Question6, Header } from './index'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from "redux"
import { actionCreator } from "../../redux/index"
import { getGuidedSolution } from '../../services/index'
export const GuidedSolution = () => {
  const [guidedSolutions, setGuidedSolutions] = useState([])
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const { resetQuestion, addFieldName, addFormControlLabel, addPrevFormControlLabel,
    addWithDescription, addWithDropdown, addResultFound, addQuestionHeader, addGuidedSolutionResponse, addDropdownFormLabel, addDropdownAPI } = bindActionCreators(actionCreator, dispatch)
  const [value, setValue] = React.useState('1');
  const steps = [
    'Register',
    'Stop/configure',
    'Add to cart',
    'payment',
  ];
  const fileTypes = ["JPG", "PNG", "GIF"];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionNoCounter, setQuestionNoCounter] = useState(0);
  const [questionsData, setQuestionsData] = useState([])
  const [questionThreeHeader, setQuestionThreeHeader] = useState("")
  const [q3Dropdown, setQ3Dropdown] = useState(false)
  const [q4Dropdown, setQ4Dropdown] = useState(false)
  const [formControlLbls, setFormControlLbls] = useState([])
  const [fillHeader, setFillHeader] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleContinuePress = (counter) => {
  //   var tempQuestionNoCounter = questionNoCounter;
  //   if (questionNoCounter == 4 && state.guidedSolution.guidedQuestions[1].value == 'Routine Maintenance Tasks') {
  //     tempQuestionNoCounter = 5
  //     setQuestionNoCounter(6)
  //   } else {
  //     if (state != null) {
  //       if (state.guidedSolution != null) {
  //         var questionsData = state.guidedSolution.guidedQuestions;
  //         var valueSelected = false;
  //         if (!state.guidedSolution.withDropDown && tempQuestionNoCounter != 5) {
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
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel(["Used", "New"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("Is it for new/used machine?")
  //             } else if (questionsData[counter].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel(["Machine configuration", "Customization", "Assembly", "Extended Warranty", "Support Agreements", "Spare Parts", "Installation", "Other Services"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("What additional maintenace options are needed?")
  //             } else if (questionsData[counter].value == 'Service Contracts or Warranty') {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel(["5-10", "10-50", "50-100", "100+"])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("What is the size of the fleet?")
  //             }
  //           }
  //           if (counter == 2) {
  //             if (questionsData[counter - 1].value == 'Standard Rapair or Replacement' || questionsData[counter - 1].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("If you know the make and model choose the options")
  //             } else {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
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
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("Please choose the component that you want to be replaced")
  //             } else if (questionsData[counter - 2].value == 'Routine Maintenance Tasks') {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(false)
  //               addQuestionHeader("Following product customization options are available for your search")
  //             }

  //             else {
  //               addPrevFormControlLabel(state.guidedSolution.formLabels)
  //               addFormControlLabel([])
  //               addWithDescription(false)
  //               addWithDropdown(true)
  //               addQuestionHeader("If you know the make and model choose the options")
  //             }
  //           }
  //           if (counter == 4) {
  //             addPrevFormControlLabel(state.guidedSolution.formLabels)
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
  const handleContinuePress = (currentCounter) => {
    //Counter Not Increase Yet
    //Question 1
    if (currentCounter == 0) {
      var guidedSolutionNames = [];
      if (state.guidedSolution.guidedSolutionResponse != null && state.guidedSolution.guidedSolutionResponse.length > 0) {
        state.guidedSolution.guidedSolutionResponse.map((solutionNameRes, index) => {
          var dict = {
            "key": solutionNameRes.solutionName,
            "value": index
          }
          guidedSolutionNames.push(dict)
        })
        addFieldName("solutionName")
        addFormControlLabel(guidedSolutionNames)
      } else {
        alert("Error")
      }
    }
    //Question 2
    if (currentCounter == 1) {
      //Check Which parent flow it is;
      var flowIndex = parseInt(state.guidedSolution.guidedQuestions[1].value);
      var guidedSolutionNames = [];
      if (state.guidedSolution.guidedSolutionResponse != null && state.guidedSolution.guidedSolutionResponse.length > 0 && state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length > 0) {
        var childArray = [];
        if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter] != null) {
          addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options.length > 0) {
            if (flowIndex == 0) {
              if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].machineType.length > 0) {
                addFieldName("machineType")
                addFieldName(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].fieldName)
                state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].machineType.map((option, index) => {
                  var dict = {
                    "key": option.key,
                    "value": index,
                    "secondValue": option.value
                  }
                  guidedSolutionNames.push(dict)
                })
                addWithDropdown(false)
                addResultFound(false)
              }
              // machineType
            } else if (flowIndex == 1) {
              if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].taskType.length > 0) {
                addFieldName(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].fieldName)
                state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].taskType.map((option, index) => {
                  var dict = {
                    "key": option.key,
                    "value": index,
                    "secondValue": option.value
                  }
                  guidedSolutionNames.push(dict)
                })
                addWithDropdown(false)
                addResultFound(false)
              }
              // taskType
            } else {
              if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].fleet.length > 0) {
                addFieldName(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].fieldName)
                state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].fleet.map((option, index) => {
                  var dict = {
                    "key": option.key,
                    "value": index,
                    "secondValue": option.value
                  }
                  guidedSolutionNames.push(dict)
                })
                addWithDropdown(false)
                addResultFound(false)
              }
              // fleet
            }
          }
        }
        addFormControlLabel(guidedSolutionNames)
      } else {
        alert("Error")
      }
    }
    //Question 3
    if (currentCounter == 2) {
      //Check Which parent flow it is;
      var flowIndex = parseInt(state.guidedSolution.guidedQuestions[1].value);
      var guidedSolutionNames = [];
      var tempDropdownFormLables = []
      if (state.guidedSolution.guidedSolutionResponse != null && state.guidedSolution.guidedSolutionResponse.length > 0 && state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length > 0) {
        var childArray = [];
        if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter] != null) {
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].type == 'API') {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].apiUrl)
            state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].coverage.map((option, index) => {
              var dict = {
                "key": option.key,
                "value": index,
                "secondValue": option.value
              }
              tempDropdownFormLables.push(dict)
            })
            addWithDropdown(true)
            addResultFound(false)
          } else {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI("")
            addWithDropdown(false)
            addResultFound(false)
            tempDropdownFormLables = []
            if (flowIndex == 2) {
              addFieldName(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].fieldName)
              state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].contract.map((option, index) => {
                var dict = {
                  "key": option.key,
                  "value": index,
                  "secondValue": option.value
                }
                guidedSolutionNames.push(dict)
              })
            } else {
              //Need to check what to do
            }
          }
        } else {
          //It mean next question is dropdown type
          var questionIndex = state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter - 1] != null ? (currentCounter - 1) : (state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length - 1)
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions.length > 0) {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[0].description);
            addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[0].apiUrl)

            state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[0].options[0].coverage.map((option, index) => {
              var dict = {
                "key": option.key,
                "value": index,
                "secondValue": option.value
              }
              tempDropdownFormLables.push(dict)
            })
          } else {
            //Need to check what to do
          }
          addWithDropdown(true)
          addResultFound(false)
        }
        addDropdownFormLabel(tempDropdownFormLables)
        addFormControlLabel(guidedSolutionNames)
      } else {
        alert("Error")
      }
    }
    //Question 4
    if (currentCounter == 3) {
      //Check Which parent flow it is;
      var flowIndex = parseInt(state.guidedSolution.guidedQuestions[1].value);
      var guidedSolutionNames = [];
      var tempDropdownFormLables = []
      if (state.guidedSolution.guidedSolutionResponse != null && state.guidedSolution.guidedSolutionResponse.length > 0 && state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length > 0) {
        var childArray = [];
        if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter] != null) {
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].type == 'API') {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].apiUrl)
            state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].coverage.map((option, index) => {
              var dict = {
                "key": option.key,
                "value": index,
                "secondValue": option.value
              }
              tempDropdownFormLables.push(dict)
            })
            addWithDropdown(true)
            addResultFound(false)
          } else {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI("")
            addWithDropdown(false)
            addResultFound(false)
            tempDropdownFormLables = []
            if (flowIndex == 2) {
              state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].contract.map((option, index) => {
                var dict = {
                  "key": option.key,
                  "value": index,
                  "secondValue": option.value
                }
                guidedSolutionNames.push(dict)
              })
            } else {
              //Need to check what to do
            }
          }
        } else {
          //It mean next question is dropdown type
          var questionIndex = state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter - 1] != null ? (currentCounter - 1) : (state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length - 1)
          //Check whether is last or more
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel != null) {
            if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions.length > 0) {
              addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[1].description);
              addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[1].apiUrl)

              state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[1].options[0].component.map((option, index) => {
                var dict = {
                  "key": option.key,
                  "value": index,
                  "secondValue": option.value
                }
                tempDropdownFormLables.push(dict)
              })
            } else {
              //Need to check what to do

            }
            addResultFound(false)
          } else {
            //This is last now we need to show the resule of guided solution
            addResultFound(true)
            //Make Search Query
            var query = "";
            for (let i = 1; i < state.guidedSolution.guidedQuestions.length; i++) {
              if (i != 1 && i != state.guidedSolution.guidedQuestions.length) {
                query += " AND ";
              }
              if (state.guidedSolution.guidedQuestions[i].fieldName == 'fleetSize') {
                var splitValue = state.guidedSolution.guidedQuestions[i].fieldValue.split("-");
                query += state.guidedSolution.guidedQuestions[i].fieldName + ">" + splitValue[0] + " " + state.guidedSolution.guidedQuestions[i].fieldName + "<" + splitValue[1]
              } else {
                query += state.guidedSolution.guidedQuestions[i].fieldName + ": ";
                query += state.guidedSolution.guidedQuestions[i].fieldValue;
              }
            }
            console.log(query)

          }
          addWithDropdown(true)
        }
        addDropdownFormLabel(tempDropdownFormLables)
        addFormControlLabel(guidedSolutionNames)
      } else {
        alert("Error")
      }
    }
    //Question 5
    if (currentCounter == 4) {
      //Check Which parent flow it is;
      var flowIndex = parseInt(state.guidedSolution.guidedQuestions[1].value);
      var guidedSolutionNames = [];
      var tempDropdownFormLables = []
      if (state.guidedSolution.guidedSolutionResponse != null && state.guidedSolution.guidedSolutionResponse.length > 0 && state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length > 0) {
        var childArray = [];
        if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter] != null) {
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].type == 'API') {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].apiUrl)
            state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].coverage.map((option, index) => {
              var dict = {
                "key": option.key,
                "value": index,
                "secondValue": option.value
              }
              tempDropdownFormLables.push(dict)
            })
            addWithDropdown(true)
            addResultFound(false)
          } else {
            addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].description);
            addDropdownAPI("")
            addWithDropdown(false)
            addResultFound(false)
            tempDropdownFormLables = []
            if (flowIndex == 2) {
              state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter].options[0].contract.map((option, index) => {
                var dict = {
                  "key": option.key,
                  "value": index,
                  "secondValue": option.value
                }
                guidedSolutionNames.push(dict)
              })
            } else {
              //Need to check what to do
            }
          }
        } else {
          //It mean next question is dropdown type
          var questionIndex = state.guidedSolution.guidedSolutionResponse[flowIndex].questions[currentCounter - 1] != null ? (currentCounter - 1) : (state.guidedSolution.guidedSolutionResponse[flowIndex].questions.length - 1)
          //Check whether is last or more
          if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel != null && state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[2] != null) {
            if (state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions.length > 0) {
              addQuestionHeader(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[2].description);
              addDropdownAPI(state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[2].apiUrl)

              state.guidedSolution.guidedSolutionResponse[flowIndex].questions[questionIndex].guidedSolutionModel.questions[2].options[0].component.map((option, index) => {
                var dict = {
                  "key": option.key,
                  "value": index,
                  "secondValue": option.value
                }
                tempDropdownFormLables.push(dict)
              })
            } else {
              //Need to check what to do

            }
            addResultFound(false)
          } else {
            //This is last now we need to show the resule of guided solution
            addResultFound(true)
            //Make Search Query
            var query = "";
            for (let i = 1; i < state.guidedSolution.guidedQuestions.length; i++) {
              if (i != 1 && i != state.guidedSolution.guidedQuestions.length) {
                query += " AND ";
              }
              if (state.guidedSolution.guidedQuestions[i].fieldName == 'fleetSize') {
                var splitValue = state.guidedSolution.guidedQuestions[i].fieldValue.split("-");
                query += state.guidedSolution.guidedQuestions[i].fieldName + ">" + splitValue[0] + " " + state.guidedSolution.guidedQuestions[i].fieldName + "<" + splitValue[1]
              } else {
                query += state.guidedSolution.guidedQuestions[i].fieldName + ": ";
                query += state.guidedSolution.guidedQuestions[i].fieldValue;
              }
            }
            console.log(query)
          }
          addWithDropdown(true)
        }
        addDropdownFormLabel(tempDropdownFormLables)
        addFormControlLabel(guidedSolutionNames)
      } else {
        alert("Error")
      }
    }
    //Counter Increase below
    setQuestionNoCounter(questionNoCounter + 1)
  }
  const handlePreviousPress = () => {
    if (questionNoCounter > 0) {
      setQuestionNoCounter(questionNoCounter - 1)
      var tempQuestionArray = (state.guidedSolution.guidedQuestions).slice()
      tempQuestionArray.splice(questionNoCounter, 1);
      resetQuestion(tempQuestionArray)
    }
  }

  useEffect(() => {
    getGuidedSolution().then((res) => {
      setGuidedSolutions(res)
      addGuidedSolutionResponse(res)
    }).catch((err) => {
      alert(err)
    })
  }, []);


  return (
    <>
      <CommanComponents />
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-12 col-sm-12 mx-auto">
              <Box sx={{ width: '100%' }}>
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
          <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Use Product/Solution Configurator" value="1" />
                  <Tab label="Use Solution Templates " value="2" />
                  <Tab label="Import Configurations" value="3" />
                </TabList>
              </Box>

              <TabPanel className="p-0" value="1">
                {questionNoCounter == 0
                  ?
                  <InitQuestion />
                  :
                  <></>}
                {questionNoCounter == 1
                  ?
                  <Question1 />
                  :
                  <></>}
                {questionNoCounter == 2
                  ?
                  <Question2 formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 2 ? questionsData[2] : null} />
                  :
                  <></>}
                {questionNoCounter == 3
                  ?
                  <Question3 formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 2 ? questionsData[2] : null} />
                  :
                  <></>}
                {/* {questionNoCounter == 3
                  ?
                  <Question4 isDropDown={q3Dropdown} formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 3 ? questionsData[3] : null} />
                  :
                  <></>} */}
                {questionNoCounter == 4
                  ?
                  <Question4 isDropDown={q3Dropdown} formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 3 ? questionsData[3] : null} />
                  :
                  <></>}
                {questionNoCounter == 5
                  ?
                  <Question4 isDropDown={q4Dropdown} formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 3 ? questionsData[3] : null} />
                  :
                  <></>}
                {questionNoCounter == 6
                  ?
                  <Header isDropDown={q4Dropdown} formLbls={formControlLbls} questionHeader={questionThreeHeader} defaultValue={questionsData.length > 3 ? questionsData[3] : null} />
                  :
                  <></>}
                {state.guidedSolution.isResultFound && questionNoCounter == 6
                  ?
                  <div className="d-flex align-items-center justify-content-between mt-5">
                    <div>
                      {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                    </div>
                    <div>
                      <Link to="/solutionBuilder/new" className="btn bg-primary text-white cursor">Create <ArrowForwardIcon className=" font-size-16" /></Link>
                    </div>
                  </div> :
                  <>
                    {state.guidedSolution.isResultFound && questionNoCounter != 6
                      ?
                      <div className="d-flex align-items-center justify-content-between mt-5">
                        <div>
                          {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                        </div>
                        <div>
                          {/* <Link to="/solutionBuilder/new" className="btn bg-primary text-white cursor">Finish <ArrowForwardIcon className=" font-size-16" /></Link> */}
                          <a className="btn bg-primary text-white cursor" onClick={() => setQuestionNoCounter(6)}>Finish <ArrowForwardIcon className=" font-size-16" /></a>
                          {/* <Link to="/solutionBuilder/new" className="btn bg-primary text-white cursor">Finish <ArrowForwardIcon className=" font-size-16" /></Link> */}
                          {/* <a className="btn bg-primary text-white cursor" onClick={() => setQuestionNoCounter(6)}></a> */}
                        </div>
                      </div>
                      :
                      <div className="d-flex align-items-center justify-content-between mt-5">
                        <div>
                          <a className="btn cursor" style={{ display: 'none' }}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a>
                          {/* <a className="btn cursor" onClick={handlePreviousPress}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a> */}
                        </div>
                        <div>
                          <a className="btn bg-primary text-white cursor" onClick={() => handleContinuePress(questionNoCounter)}>Continue <ArrowForwardIcon className=" font-size-16" /></a>
                        </div>
                      </div>
                    }
                  </>}




                {/* <div className=" mt-3 p-3">
                  <div className="">
                    <p>QUESTION 01/10</p>
                    <h4>Select a template to build and price:</h4>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="card Selecttemplateitem mb-0 mt-3" style={{ overflow: 'unset' }}>
                        <div className="tableheader  ">
                          <div className="maintableheader card mb-0">
                            <div className="d-flex align-items-center p-3">
                              <div className="search-icon" style={{ lineHeight: '24px' }}>
                                <img src={searchstatusIcon}></img>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="customselect ml-3">
                                  <span>
                                    <a href="#" className="btn-sm">+</a>
                                  </span>
                                  <select className="selectpicker pmselect" data-show-subtext="true" data-live-search="true">
                                    <option>Add by</option>
                                    <option >Bill Gordon</option>
                                    <option >Elizabeth Warren</option>
                                    <option >Mario Flores</option>
                                    <option>Don Young</option>
                                  </select>
                                </div>
                              </div>
                              <div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card Selecttemplateitem mb-0 mt-3">
                        <div className="itemheader">
                          <h6 className="mb-0"><b className="mr-2">PORTFOLIOS</b><small>2 items</small></h6>
                        </div>
                        <div>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="card Selecttemplateitem mb-0 mt-3">
                        <div className="itemheader">
                          <h6 className="mb-0"><b className="mr-2">PORTFOLIOS</b><small>2 items</small></h6>
                        </div>
                        <div>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                            <FormControlLabel control={<Checkbox />} label="Label" />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card Selecttemplateitem mb-0 mt-3">
                        <div className="itemheader">
                          <h6 className="mb-0"><b className="mr-2">PORTFOLIOS</b><small>2 items</small></h6>
                        </div>
                        <div>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-5"><b>OR</b></div>
                  <div className="tableheader  ">
                    <div className="maintableheader card mt-5">
                      <div className="d-flex align-items-center p-3">
                        <div className="search-icon" style={{ lineHeight: '24px' }}>
                          <img src={searchstatusIcon}></img>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="customselect ml-3">
                            <span>
                              <a href="#" className="btn-sm">+</a>
                            </span>
                            <select className="selectpicker pmselect" data-show-subtext="true" data-live-search="true">
                              <option>Add by</option>
                              <option >Bill Gordon</option>
                              <option >Elizabeth Warren</option>
                              <option >Mario Flores</option>
                              <option>Don Young</option>
                            </select>
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div>
                  <button type="button" className="btn btn-demo" data-toggle="modal" data-target="#myModal2">
                    Right Sidebar Modal
                  </button>
                  <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 className="modal-title" id="myModalLabel2">Inclusion/Exclusion</h4>
                        </div>
                        <div className="modal-body p-0">
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">CHOICE OF SPARE PARTS</h5>
                          </div>
                          <div className="bg-white p-3">
                            <FormGroup>
                              <FormControlLabel control={<Switch defaultChecked />} label="With Spare Parts" />
                              <FormControlLabel control={<Switch />} label="I have Spare Parts" />
                              <FormControlLabel control={<Switch />} label="I need only Spare Parts" />
                            </FormGroup>
                          </div>
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">CHOICE OF LABOR</h5>
                          </div>
                          <div className="bg-white p-3">
                            <div className=" d-flex justify-content-between ">
                              <div>
                                <FormGroup>
                                  <FormControlLabel control={<Switch defaultChecked />} label="With Labor" />
                                  <FormControlLabel control={<Switch />} label="Without Labor" />
                                </FormGroup>
                              </div>
                              <div>
                                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                              </div>
                            </div>
                          </div>
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">CHOICE MISC.</h5>
                          </div>
                          <div className="bg-white p-3">
                            <FormGroup>
                              <FormControlLabel control={<Switch />} label=" Lubricants" />
                              <FormControlLabel control={<Switch />} label="Travel Expenses" />
                              <FormControlLabel control={<Switch />} label="Tools" />
                              <FormControlLabel control={<Switch />} label="External Work" />
                            </FormGroup>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Includes</span></div><div className="hr"></div></h5>
                          </div>
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">SERVICES</h5>
                          </div>
                          <div className="bg-white p-3">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div>
                                <FormGroup>
                                  <FormControlLabel control={<Switch />} label=" Changee Oil and Filter" />
                                </FormGroup>
                              </div>
                              <div>
                                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                              </div>
                            </div>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Optianal services</span></div><div className="hr"></div></h5>
                            <FormGroup>
                              <FormControlLabel control={<Switch />} label="Air Filter Replacement" />
                              <FormControlLabel control={<Switch />} label="Cabin Air Filter" />
                              <FormControlLabel control={<Switch />} label="Rotete Tires" />
                            </FormGroup>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Includes</span></div><div className="hr"></div></h5>
                            <div className="mt-3">
                              <h6><a href="#" className="btn-sm text-white mr-2" style={{ background: '#79CBA2' }}>Free</a> 50 Point Inspection</h6>
                              <h6 className="mt-3"><a href="#" className="btn-sm text-white mr-2 " style={{ background: '#79CBA2' }}>Free</a> 50 Point Inspection</h6>
                            </div>
                            <div className=" d-flex justify-content-between mt-4">
                              <div>
                                <a href="#" className="btn text-violet bg-light-blue"><b><span className="mr-2">+</span>Add more services</b></a>
                              </div>
                              <div>
                                <a href="#" className="btn text-violet"><b>I Have Parts</b></a>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-3 p-3">
                  <div className="card border">
                    <div className="d-flex align-items-center justify-content-between px-3">
                      <div className="">
                        <div className="d-flex ">
                          <h5 className=" mb-0"><span>Price Agreement</span></h5>
                          <p className=" mb-0">
                            <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                            <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center ">
                        <div className=" text-center border-left py-4 pl-3">
                          <a href="#" className=" ">+ Add</a>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive custometable">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Type</th>
                            <th scope="col">Item Number</th>
                            <th scope="col">Special Price</th>
                            <th scope="col">Discount%</th>
                            <th scope="col">Absolute discount</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>
                              <div className="form-group mb-0">
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={options}
                                  placeholder="1000-ENGINE"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="form-group mb-0">
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={options}
                                  placeholder="1000-ENGINE"
                                />
                              </div>
                            </td>
                            <td><input type="text" placeholder="NA" /></td>
                            <td><input type="text" placeholder="5%" /></td>
                            <td><input type="text" placeholder="NA" /></td>
                            <td>
                              <div>
                                <a href="#" className="mr-3"><RemoveRedEyeOutlinedIcon className="font-size-16 mr-2" />View detail</a>
                                <a href="#" className=""><ModeEditIcon className="font-size-16 mr-2" />View detail</a>
                              </div>
                            </td>

                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div>
                    <a href="#" className="btn"><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><KeyboardBackspaceIcon className=" font-size-16" /> Previous</a>
                  </div>
                  <div>
                    <a href="#" className="btn bg-primary text-white">Continue <ArrowForwardIcon className=" font-size-16" /></a>
                  </div>
                </div> */}
              </TabPanel>
              <TabPanel className="p-0" value="2">
                <div className="card  overflow-hidden mt-3 p-3">
                  <span>data not found</span>
                </div>
              </TabPanel>
              <TabPanel className="p-0" value="3">
                <div className="card  mt-3 p-3">
                  <h5 className="d-flex align-items-center mb-0">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Import configurations</span><a href="#" className="btn-sm"><i className="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i className="fa fa-folder-o" aria-hidden="true"></i></a></div>
                    <div className="hr"></div>
                  </h5>
                  <p className="mt-4 ">Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint,Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint</p>
                  <div className="p-3">
                    <div className="add-new-recod">
                      <div>
                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                        <p className="mt-3">Single upload file should not be more than <br /> 10MB. Only the  .xls, .xlsx file types are allowed</p>
                      </div>
                    </div>

                  </div>
                </div>
              </TabPanel>

            </TabContext>
          </Box>
        </div>
      </div>
      <ToastContainer />
    </>
  )
};
