import {put, takeLatest} from 'redux-saga/effects';
import { call} from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import { push } from 'connected-react-router';
import {HttpService} from "../../apiService/HTTPService";
import {USER_SERVICE_SIGNIN_URL} from "../../services/CONSTANTS";

function* handleLogin(payload: LoginPayload) {
  try {
    const res =  yield call(HttpService, 'post',USER_SERVICE_SIGNIN_URL(),payload.payload);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        // Dispatch action
        id: 1,
        name: 'Zendy',
      })
    );

    // Redirect to Admin page
    yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailed(error.message)); // Dispatch action
  }
}





export function* authSaga() {
  yield takeLatest(authActions.login,handleLogin);
}
