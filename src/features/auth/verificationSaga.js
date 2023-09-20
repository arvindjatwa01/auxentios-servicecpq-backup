import { delay, put } from 'redux-saga/effects';
import { call,takeLatest } from 'redux-saga/effects';
import { signUpActions } from './signUpSlice';
import {HttpService} from "../../apiService/HTTPService";
import Cookies from 'js-cookie';
import { USER_SERVICE_VALIDATE_URL } from 'services/CONSTANTS';

function* handleVerify(payload) {
  try {
    yield delay(500);
    const res =  yield call(HttpService, 'post',USER_SERVICE_VALIDATE_URL,payload.payload);
    console.log("response for verification is : ", res)
    Cookies.set('access_token', res.config.headers.Authorization,{ expires: 1, path: '/' });

    
    // localStorage.setItem('access_token',res.config.headers.Authorization);
    yield put(
        signUpActions.getStarted(res)
    );
    // Redirect to Admin page
    // yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(signUpActions.signUpFailed(error.message)); // Dispatch action
  }
}

export function* verificationSaga() {
  yield takeLatest(signUpActions.verifyEmail,handleVerify);
}
