import { call, put, takeLatest,all,select } from 'redux-saga/effects';
import {selectCategoryList, selectStrategyTaskList, taskActions} from './strategySlice';

function* updateTaskTypeList(payload:any) {
  try {
    const a = yield select(selectStrategyTaskList);
    const b = a.find((item)=>item.key === payload.payload);
    yield put(taskActions.updateTaskSuccess({update:b.nestedKeyValues}));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
    yield put(taskActions.fetchTaskListFailed(error.message));
  }
}

export default function* updateTaskTypeSaga() {
  yield takeLatest(taskActions.updateTask.type, updateTaskTypeList);
}
