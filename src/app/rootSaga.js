import { all } from 'redux-saga/effects';
import { authSaga } from 'features/auth/authSaga';
import {signUpSaga} from "../features/auth/signUpSaga";
import {verificationSaga } from "../features/auth/verificationSaga";
import strategySaga from "../pages/PortfolioAndBundle/customerSegment/strategySaga";
import {portfolioItemSaga} from "../pages/PortfolioAndBundle/createItem/portfolioItemSaga";
import updateStrategySaga from "../pages/PortfolioAndBundle/customerSegment/updateSaga";
import updateTaskTypeSaga from "../pages/PortfolioAndBundle/customerSegment/updateTaskSaga";
import repairSaga from "../pages/Repair/dropdowns/repairSaga";
import updateSolutionLevelSaga from '../pages/PortfolioAndBundle/customerSegment/updateSolutionSaga';


export default function* rootSaga() {
    yield all([authSaga(),signUpSaga(),verificationSaga(),strategySaga(),portfolioItemSaga(),updateStrategySaga(), updateSolutionLevelSaga(), updateTaskTypeSaga(),repairSaga()]);
}
