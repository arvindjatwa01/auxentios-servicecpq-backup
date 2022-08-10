import {put, takeLatest} from 'redux-saga/effects';
import { call} from 'redux-saga/effects';
import { portfolioItemActions } from './portfolioSlice';
import {CREATE_PORTFOLIO_ITEM} from "../../../services/CONSTANTS";
import {HttpService} from "../../../apiService/HTTPService";

function* handleItemCreation(payload: any) {
  try {
    const res =  yield call(HttpService, 'post',CREATE_PORTFOLIO_ITEM(),payload.payload);
    console.log("handleItemCreation=>handleItemCreation",res);
    yield put(
        portfolioItemActions.createItemSuccess({
        res
      })
    );
  } catch (error) {
    yield put(portfolioItemActions.createItemFailed(error.message)); // Dispatch action
  }
}





export function* portfolioItemSaga() {
  yield takeLatest(portfolioItemActions.createItem,handleItemCreation);
}
