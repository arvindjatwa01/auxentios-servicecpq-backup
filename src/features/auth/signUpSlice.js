import { PayloadAction,createSlice } from '@reduxjs/toolkit';
import type {RootState} from "../../app/store";
import {AxiosResponse} from "axios";

export interface SignUpPayload {
  firstName: string,
  lastName: string,
  workEmail: string,
  password: string
}

export interface SignUpState {
  isLoggedIn: boolean;
  logging?: boolean;
  activeStep:number,
  currentUser?: AxiosResponse;
}

const initialState: SignUpState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  activeStep: 0,
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<SignUpPayload>) {
      state.logging = true;
    },
    signUpSuccess(state, action: PayloadAction<AxiosResponse>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
      state.activeStep = 1;
    },
    verifyEmail(state, action: PayloadAction<AxiosResponse>) {
      state.activeStep = 2;
    },
    signUpFailed(state, action: PayloadAction<string>) {
      console.log(action.payload);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const signUpActions = signUpSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.signup.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.signup.logging;

// Reducer
const signUpReducer = signUpSlice.reducer;
export default signUpReducer;
