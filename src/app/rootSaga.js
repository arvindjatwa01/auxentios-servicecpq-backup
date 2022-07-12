import { authSaga } from 'features/auth/authSaga';
import { all } from 'redux-saga/effects';
import {signUpSaga} from "../features/auth/signUpSaga";
import strategySaga from "../pages/PortfolioAndBundle/customerSegment/strategySaga";
import {portfolioItemSaga} from "../pages/PortfolioAndBundle/createItem/portfolioItemSaga";
import updateStrategySaga from "../pages/PortfolioAndBundle/customerSegment/updateSaga";
import updateTaskTypeSaga from "../pages/PortfolioAndBundle/customerSegment/updateTaskSaga";

export default function* rootSaga() {
    yield all([authSaga(),signUpSaga(),strategySaga(),portfolioItemSaga(),updateStrategySaga(),updateTaskTypeSaga()]);
}
