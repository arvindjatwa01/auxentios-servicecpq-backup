import { delay, put } from 'redux-saga/effects';
import { call,takeLatest } from 'redux-saga/effects';
import { signUpActions } from './signUpSlice';
import {HttpService} from "../../apiService/HTTPService";
import Cookies from 'js-cookie';

function* handleVerify(payload) {
  try {
    yield delay(500);
    const res =  yield call(HttpService, 'post',"http://a22ce44ab44874947b49e4737a99e1da-0c39e8b84cfde139.elb.ap-south-1.amazonaws.com/user-svc/v1/user/validate-user",payload.payload);
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
