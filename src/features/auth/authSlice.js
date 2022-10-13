import { User, NewUserInfo } from '../../models/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: NewUserInfo;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<NewUserInfo>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
      // console.log("login Response success  is : ", action);
      // console.log("state.currentUser is : ",state.currentUser)
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      console.log(action.payload);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
