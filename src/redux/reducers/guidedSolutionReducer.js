import {
  ADD_QUESTION, ADD_FROM_LBL, ADD_PREV_FROM_LBL,
  WITH_DESCRIPTION, WITH_DROPDOWN, QUESTION_HEADER,
  RESET_QUESTION, GUIDED_SOLUTION_RESPONSE,
  ADD_DROPDOWN_FROM_LBL, ADD_DROPDOWN_API, ADD_IS_RESULT,
  ADD_FIELD_NAME
} from "redux/actions/guidedSolutionActions";

const initialState = {
  guidedQuestions: [],
  guidedSolutionResponse: [],
  formLabels: [],
  prevFormLabels: [],
  isResultFound: false,
  withDescription: false,
  prevWithDescription: false,
  withDropDown: false,
  prevWithDropDown: false,
  questionHeader: "",
  prevQuestionHeader: "",
  apiUrl: "",
  fieldName: "",
  dropdownFormLbls: []
};

export const guidedSoltionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      if (state.guidedQuestions.length == 0) {
        var tempArray = [];
        tempArray.push(action.payload);
        return {
          ...state,
          guidedQuestions: tempArray,
        };
      } else {
        //Check for Dropdown value to be update



        var tempQuestionsData = state.guidedQuestions.slice()
        var isSame = false;
        for (let i = 0; i < tempQuestionsData.length; i++) {
          if (action.payload.key == -1) {
            if (tempQuestionsData[i].key == action.payload.key && tempQuestionsData[i].fieldName == action.payload.fieldName) {
              tempQuestionsData[i].value = action.payload.value;
              tempQuestionsData[i].fieldName = action.payload.fieldName;
              tempQuestionsData[i].fieldValue = action.payload.fieldValue;
              isSame = true;
              break;
            } else {
              isSame = false;
            }
          } else {

            if (tempQuestionsData[i].key == action.payload.key) {
              tempQuestionsData[i].value = action.payload.value;
              tempQuestionsData[i].fieldName = action.payload.fieldName;
              tempQuestionsData[i].fieldValue = action.payload.fieldValue;
              isSame = true;
              break;
            } else {
              isSame = false;
            }
          }
        }
        if (!isSame) {
          tempQuestionsData.push(action.payload);
        }
        return {
          ...state,
          guidedQuestions: tempQuestionsData,
        };
      }
    case RESET_QUESTION:
      return {
        ...state,
        guidedQuestions: action.payload,
      };
    case ADD_FIELD_NAME:
      return {
        ...state,
        fieldName: action.payload,
      };
    case GUIDED_SOLUTION_RESPONSE:
      return {
        ...state,
        guidedSolutionResponse: action.payload,
      };
    case ADD_FROM_LBL:
      return {
        ...state,
        formLabels: action.payload,
      };
    case ADD_DROPDOWN_FROM_LBL:
      return {
        ...state,
        dropdownFormLbls: action.payload,
      };
    case ADD_DROPDOWN_API:
      return {
        ...state,
        apiUrl: action.payload,
      };
    case ADD_IS_RESULT:
      return {
        ...state,
        isResultFound: action.payload,
      };
    case ADD_PREV_FROM_LBL:
      return {
        ...state,
        prevFormLabels: action.payload,
      };
    case WITH_DESCRIPTION:
      return {
        ...state,
        withDescription: action.payload,
        prevWithDescription: state.withDescription
      };
    case WITH_DROPDOWN:
      return {
        ...state,
        withDropDown: action.payload,
        prevWithDropDown: state.withDropDown
      };
    case QUESTION_HEADER:
      return {
        ...state,
        questionHeader: action.payload,
        prevQuestionHeader: state.questionHeader
      };
    default:
      return state;
  }
};
