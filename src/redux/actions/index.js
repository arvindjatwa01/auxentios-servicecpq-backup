/**
 * We purposely added 2 reducers for the example of combineReducers method.
 * There can be only 1 or even more than 2 reducers.
 * combineReducers defines the structure of the store object.
 */
export { incrementAction, decrementAction, increment } from "./appActions";
export { updateUser } from "./userActions";
export {
    addQuestion, resetQuestion, addFormControlLabel,
    addPrevFormControlLabel, addWithDescription, addWithDropdown,
    addQuestionHeader, addGuidedSolutionResponse, addDropdownFormLabel, addDropdownAPI, addResultFound,
    addFieldName
} from "./guidedSolutionActions";
