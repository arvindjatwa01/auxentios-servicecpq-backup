import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import { push } from 'connected-react-router';
import { HttpService } from "../../apiService/HTTPService";
import { USER_SERVICE_SIGNIN_URL } from "../../services/CONSTANTS";
import Cookies from 'js-cookie';

function* handleLogin(payload: LoginPayload) {
  try {
    const res = yield call(HttpService, 'post', USER_SERVICE_SIGNIN_URL(), payload.payload);
    console.log("login Response is : ", res);
    //localStorage.setItem('access_token', 'fake_token');
    // localStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5pc2hAdGVzdC5jb20iLCJzY29wZXMiOiJURU5BTlRfQURNSU4iLCJpYXQiOjE2NTc1Njg0NjYsImV4cCI6MTY1NzU4NjQ2Nn0.yNbrVCJJNmYubD4YkowfLtmOiDbfeE3JeKNpU5Jp0nc');
    // yield put(
    //   authActions.loginSuccess({
    //     // Dispatch action
    //     // id: 1,
    //     // name: 'Zendy',
    //     tenantId: res.data.tenantId,
    //     userId: res.data.userId,
    //     userEmail: res.data.userEmail,
    //     accessToken: res.data.accessToken,
    //     roles: res.data.roles,
    //     planId: res.data.planId,
    //   })
    // );

    // Redirect to Admin page
    if (res.status == 200) {

      var cookiesData = {
        user_tenantId: res.data.tenantId,
        user_userId: res.data.userId,
        user_userEmail: res.data.userEmail,
        user_accessToken: res.data.accessToken,
        access_token: res.data.accessToken ? `Bearer ${res.data.accessToken}` : '',
        user_roles: res.data.roles,
        user_planId: res.data.planId,
        user_logIn_Status: true
      }
      var setAbleCookiesData = JSON.stringify(cookiesData);
      Cookies.set('loginTenantDtl', setAbleCookiesData, { expires: 1 });

      localStorage.setItem('user_tenantId', res.data.tenantId);
      localStorage.setItem('user_userId', res.data.userId);
      localStorage.setItem('user_userEmail', res.data.userEmail);
      localStorage.setItem('user_accessToken', res.data.accessToken);
      localStorage.setItem('access_token', res.data.accessToken ? `Bearer ${res.data.accessToken}` : '');
      localStorage.setItem('user_roles', res.data.roles);
      localStorage.setItem('user_planId', res.data.planId);
      localStorage.setItem('user_logIn_Status', true);
      if (res.data.planId == null || res.data.planId == "FREE") {
        // yield put(push('/LandingPageLogin'));
        // window.location.reload();
        window.location.href = "/LandingPageLogin";
      } else {
        // yield put(push('/'));
        window.location.href = "/";
      }
      // console.log("Login Success");
    } else {
      yield put(
        authActions.loginSuccess(res)
      );
    }
    // if (res.data.planId == null || res.data.planId == "FREE") {	
    //   yield put(push('/LandingPageLogin'));	
    //   window.location.reload();	
    // } else {	
    //   yield put(push('/'));	
    // }





    // Redirect to Admin page
    // if (res.data.planId == null || res.data.planId == "FREE") {
    //   yield put(push('/LandingPageLogin'));
    //   window.location.reload();
    // } else {
    //   yield put(push('/'));
    // }
    // yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailed(error.message)); // Dispatch action
  }
}





export function* authSaga() {
  yield takeLatest(authActions.login, handleLogin);
}
