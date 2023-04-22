import { call, put, takeLatest, all } from "redux-saga/effects";
import { repairQuoteActions } from "./quoteRepairSlice";
import { HttpService } from "../../../apiService/HTTPService";
import {
  FETCH_BILLING_FREQ,
  FETCH_BILLING_TYPE,
  FETCH_DEL_PRIORITY,
  FETCH_DEL_TYPE,
  FETCH_PAYMENT_TERMS,
  FETCH_QUOTE_STATUS,
  FETCH_QUOTE_VALIDITY,
} from "../../../services/CONSTANTS";

function* fetchQuoteDropdowns() {
  try {
    const [
      deliveryTypes,
      deliveryPriority,
      billingType,
      billingFreq,
      paymentTerm,
      quoteStatus,
      quoteValidity
    ] = yield all([
      call(HttpService, "get", FETCH_DEL_TYPE()),
      call(HttpService, "get", FETCH_DEL_PRIORITY()),
      call(HttpService, "get", FETCH_BILLING_TYPE()),
      call(HttpService, "get", FETCH_BILLING_FREQ()),
      call(HttpService, "get", FETCH_PAYMENT_TERMS()),
      call(HttpService, "get", FETCH_QUOTE_STATUS()),
      call(HttpService, "get", FETCH_QUOTE_VALIDITY())
    ]);
    yield put(
      repairQuoteActions.fetchQuoteDropdownsSuccess({
        deliveryTypes,
        deliveryPriority,
        billingType,
        billingFreq,
        paymentTerm,
        quoteStatus,
        quoteValidity
      })
    );
  } catch (error) {
    console.log(`Failed to fetch dropdowns`, error);
    yield put(repairQuoteActions.fetchQuoteDropdownsFailed(error.message));
  }
}

export default function* quoteRepairSaga() {
  yield takeLatest(
    repairQuoteActions.fetchQuoteDropdowns.type,
    fetchQuoteDropdowns
  );
}
