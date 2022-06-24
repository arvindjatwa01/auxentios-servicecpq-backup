import { UPDATE_USER } from "redux/actions/userActions";

const initialState = {
  loginData: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        loginData: action.payload
      };
    default:
      return state;
  }
};

