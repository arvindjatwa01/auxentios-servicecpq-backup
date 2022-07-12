import { call, put, takeLatest,all } from 'redux-saga/effects';
import { taskActions } from './strategySlice';
import {HttpService} from "../../../apiService/HTTPService";
import {
  GET_CATEGORY_USAGE, GET_GEOGRAPHIC,
  GET_PRODUCT_HIERARCHY,
  GET_RESPONSE_TIME,
  GET_STRATEGY_TASK,
  GET_TASK_TYPE
} from "../../../services/CONSTANTS";
import type {ListResponse, StrategyTask} from "../../../models";

function* fetchTaskList() {
  try {
    const [users, tasks,category,rTime,product,geographic]:[ListResponse<StrategyTask>,ListResponse<StrategyTask>] = yield all([
      call(HttpService, 'get',GET_STRATEGY_TASK()),
      call(HttpService, 'get',GET_TASK_TYPE()),
      call(HttpService, 'get',GET_CATEGORY_USAGE()) ,
      call(HttpService, 'get',GET_RESPONSE_TIME()) ,
      call(HttpService, 'get',GET_PRODUCT_HIERARCHY()) ,
      call(HttpService, 'get',GET_GEOGRAPHIC()) ,
    ])
    yield put(taskActions.fetchTaskListSuccess({users,tasks,category,rTime,product,geographic}));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
    yield put(taskActions.fetchTaskListFailed(error.message));
  }
}

export default function* strategySaga() {
  yield takeLatest(taskActions.fetchTaskList.type, fetchTaskList);
}
