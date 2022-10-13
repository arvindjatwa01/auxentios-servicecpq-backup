import { delay, put } from 'redux-saga/effects';
import { call,takeLatest } from 'redux-saga/effects';
import { SignUpPayload, signUpActions } from './signUpSlice';
import {HttpService} from "../../apiService/HTTPService";
import Cookies from 'js-cookie';

function* handleSignUp(payload: SignUpPayload) {
  try {
    yield delay(500);
    const res =  yield call(HttpService, 'post',"http://35.200.157.237/user-svc/v1/user/signup",payload.payload);
    
    Cookies.set('access_token', res.config.headers.Authorization,{ expires: 1, path: '/' });

    console.log("response for ssignup is : ", res)
    // localStorage.setItem('access_token',res.config.headers.Authorization);
    yield put(
        signUpActions.signUpSuccess(res)
    );
    // Redirect to Admin page
    // yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(signUpActions.signUpFailed(error.message)); // Dispatch action
  }
}

export function* signUpSaga() {
  yield takeLatest(signUpActions.signUp,handleSignUp);
}
