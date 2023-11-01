import { delay, put } from 'redux-saga/effects';
import { call,takeLatest } from 'redux-saga/effects';
import { signUpActions } from './signUpSlice';
import {HttpService} from "../../apiService/HTTPService";
import Cookies from 'js-cookie';
import { USER_SERVICE_SIGNUP_URL } from 'services/CONSTANTS';

function* handleSignUp(payload) {
  try {
    yield delay(500);
    const res =  yield call(HttpService, 'post',USER_SERVICE_SIGNUP_URL,payload.payload);
    if (res.status === 200) {
    Cookies.set('access_token', res.config.headers.Authorization,{ expires: 1, path: '/' });

    console.log("response for ssignup is : ", res)
    // localStorage.setItem('access_token',res.config.headers.Authorization);
    yield put(
        signUpActions.signUpSuccess(res)
    );
    } else {
      signUpActions.signUpFailed(res.message)
    }
    // Redirect to Admin page
    // yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(signUpActions.signUpFailed(error.message)); // Dispatch action
  }
}

export function* signUpSaga() {
  yield takeLatest(signUpActions.signUp,handleSignUp);
}
