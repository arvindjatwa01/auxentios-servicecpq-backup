import { call, put, takeLatest, all } from "redux-saga/effects";
import { repairActions } from "./repairSlice";
import { HttpService } from "../../../apiService/HTTPService";
import {
  GET_ACTIVITY_ID,
  GET_CHARGE_CODE,
  GET_CONSUMABLE_TYPE,
  GET_DIMENSION,
  GET_LABOUR_CODE,
  GET_LABOUR_TYPE,
  GET_MISC_TYPE,
  GET_SERVICE_TYPE,
  PRICING_METHODS,
} from "../../../services/CONSTANTS";

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
      dimensions,
      consumableTypes,
    ] = yield all([
      call(HttpService, "get", PRICING_METHODS()),
      call(HttpService, "get", GET_CHARGE_CODE()),
      call(HttpService, "get", GET_SERVICE_TYPE()),
      call(HttpService, "get", GET_LABOUR_TYPE()),
      call(HttpService, "get", GET_LABOUR_CODE()),
      call(HttpService, "get", GET_MISC_TYPE()),
      call(HttpService, "get", GET_ACTIVITY_ID()),
      call(HttpService, "get", GET_DIMENSION()),
      call(HttpService, "get", GET_CONSUMABLE_TYPE()),

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
        dimensions,
        consumableTypes
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
