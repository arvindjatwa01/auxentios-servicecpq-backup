import { call, put, takeLatest,all,select } from 'redux-saga/effects';
import {selectCategoryList, taskActions} from './strategySlice';

function* updateTaskList(payload:any) {
  try {
    const a = yield select(selectCategoryList);
    const b = a.find((item)=>item.key === payload.payload);
    yield put(taskActions.updateListSuccess({update:b.nestedKeyValues}));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
    yield put(taskActions.fetchTaskListFailed(error.message));
  }
}

export default function* updateStrategySaga() {
  yield takeLatest(taskActions.updateList.type, updateTaskList);
}
