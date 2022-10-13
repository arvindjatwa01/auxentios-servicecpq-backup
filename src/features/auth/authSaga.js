import { put, takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import { push } from 'connected-react-router';
import { HttpService } from "../../apiService/HTTPService";
import { USER_SERVICE_SIGNIN_URL } from "../../services/CONSTANTS";

function* handleLogin(payload: LoginPayload) {
  try {
    const res = yield call(HttpService, 'post', USER_SERVICE_SIGNIN_URL(), payload.payload);
    console.log("login Response is : ", res);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        // Dispatch action
        // id: 1,
        // name: 'Zendy',
        tenantId: res.data.tenantId,
        userId: res.data.userId,
        userEmail: res.data.userEmail,
        accessToken: res.data.accessToken,
        roles: res.data.roles,
        planId: res.data.planId,
      })
    );

    localStorage.setItem('user_tenantId', res.data.tenantId);
    localStorage.setItem('user_userId', res.data.userId);
    localStorage.setItem('user_userEmail', res.data.userEmail);
    localStorage.setItem('user_accessToken', res.data.accessToken);
    localStorage.setItem('user_roles', res.data.roles);
    localStorage.setItem('user_planId', res.data.planId);
    localStorage.setItem('user_logIn_Status', true);



    // Redirect to Admin page
    if (res.data.planId == null || res.data.planId == "FREE") {
      yield put(push('/LandingPageLogin'));
      window.location.reload();
    } else {
      yield put(push('/'));
    }
    // yield put(push('/'));
  } catch (error) {
    yield put(authActions.loginFailed(error.message)); // Dispatch action
  }
}





export function* authSaga() {
  yield takeLatest(authActions.login, handleLogin);
}
