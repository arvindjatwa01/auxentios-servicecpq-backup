import { delay, put } from 'redux-saga/effects';
import { call,takeLatest } from 'redux-saga/effects';
import { SignUpPayload, signUpActions } from './signUpSlice';
import {HttpService} from "../../apiService/HTTPService";
import Cookies from 'js-cookie';

function* handleVerify(payload: SignUpPayload) {
  try {
    yield delay(500);
    const res =  yield call(HttpService, 'post',"http://35.200.157.237/user-svc/v1/user/validate-user",payload.payload);
    // const res =  yield call(HttpService, 'post',"http://afa9bd0c4417b4fbfbe386149fb059f3-96fa7279b384f94a.elb.ap-south-1.amazonaws.com/user-svc/v1/user/validate-user",payload.payload);

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
