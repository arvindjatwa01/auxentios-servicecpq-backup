import { call, put, takeLatest, all } from "redux-saga/effects";
import { repairActions } from "./repairSlice";
import { HttpService } from "../../../apiService/HTTPService";
import {
  GET_ACTIVITY_ID,
  GET_CHARGE_CODE,
  GET_LABOUR_CODE,
  GET_LABOUR_TYPE,
  GET_MISC_TYPE,
  GET_SERVICE_TYPE,
  PRICING_METHODS,
} from "../../../services/CONSTANTS";
import type { ListResponse, StrategyTask } from "../../../models";

function* fetchDropdowns() {
  try {
    const [
      pricingMethods,
      chargeCodes,
      serviceTypes,
      laborTypes,
      laborCodes,
      miscTypes,
      activityIds,
    ]: [ListResponse<StrategyTask>, ListResponse<StrategyTask>] = yield all([
      call(HttpService, "get", PRICING_METHODS()),
      call(HttpService, "get", GET_CHARGE_CODE()),
      call(HttpService, "get", GET_SERVICE_TYPE()),
      call(HttpService, "get", GET_LABOUR_TYPE()),
      call(HttpService, "get", GET_LABOUR_CODE()),
      call(HttpService, "get", GET_MISC_TYPE()),
      call(HttpService, "get", GET_ACTIVITY_ID()),
    ]);
    yield put(
      repairActions.fetchDropdownsSuccess({
        pricingMethods,
        chargeCodes,
        serviceTypes,
        laborTypes,
        laborCodes,
        miscTypes,
        activityIds,
      })
    );
  } catch (error) {
    console.log(`Failed to fetch dropdowns`, error);
    yield put(repairActions.fetchDropdownsFailed(error.message));
  }
}

export default function* repairSaga() {
  yield takeLatest(repairActions.fetchDropdowns.type, fetchDropdowns);
}