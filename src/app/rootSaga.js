import { authSaga } from 'features/auth/authSaga';
import { all } from 'redux-saga/effects';
import {signUpSaga} from "../features/auth/signUpSaga";
import strategySaga from "../pages/PortfolioAndBundle/customerSegment/strategySaga";

export default function* rootSaga() {
    yield all([authSaga(),signUpSaga(),strategySaga()]);
}
