// You can use CONSTANTS.js file for below definitions of constants and import here.
export const ADD_QUESTION = "ADD_QUESTION";
export const RESET_QUESTION = "RESET_QUESTION";
export const ADD_FROM_LBL = "ADD_FROM_LBL";
export const ADD_DROPDOWN_FROM_LBL = "ADD_DROPDOWN_FROM_LBL";
export const ADD_DROPDOWN_API = "ADD_DROPDOWN_API";
export const ADD_PREV_FROM_LBL = "ADD_PREV_FROM_LBL";
export const WITH_DESCRIPTION = "WITH_DESCRIPTION";
export const WITH_DROPDOWN = "WITH_DROPDOWN";
export const QUESTION_HEADER = "QUESTION_HEADER";
export const ADD_FIELD_NAME = "ADD_FIELD_NAME";
export const GUIDED_SOLUTION_RESPONSE = "GUIDED_SOLUTION_RESPONSE";
export const ADD_IS_RESULT = "ADD_IS_RESULT";
// Without THUNK MIDDLEWARE only actions can be dispatched.

export const addGuidedSolutionResponse = (payload) => ({
  type: GUIDED_SOLUTION_RESPONSE,
  payload
});
export const addResultFound = (payload) => ({
  type: ADD_IS_RESULT,
  payload
});

export const addFieldName = (payload) => ({
  type: ADD_FIELD_NAME,
  payload
})


export const addQuestion = (payload) => ({
  type: ADD_QUESTION,
  payload
});
export const resetQuestion = (payload) => ({
  type: RESET_QUESTION,
  payload
});
export const addFormControlLabel = (payload) => ({
  type: ADD_FROM_LBL,
  payload
});
export const addDropdownFormLabel = (payload) => ({
  type: ADD_DROPDOWN_FROM_LBL,
  payload
});
export const addDropdownAPI = (payload) => ({
  type: ADD_DROPDOWN_API,
  payload
});
export const addPrevFormControlLabel = (payload) => ({
  type: ADD_PREV_FROM_LBL,
  payload
});
export const addWithDescription = (payload) => ({
  type: WITH_DESCRIPTION,
  payload
});
export const addWithDropdown = (payload) => ({
  type: WITH_DROPDOWN,
  payload
});
export const addQuestionHeader = (payload) => ({
  type: QUESTION_HEADER,
  payload
});

