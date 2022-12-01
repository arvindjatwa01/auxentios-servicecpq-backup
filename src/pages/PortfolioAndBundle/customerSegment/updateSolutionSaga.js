import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { selectSolutionTaskList, taskActions } from './strategySlice';

function* updateSolutionLevelList(payload: any) {
    try {
        const a = yield select(selectSolutionTaskList);
        const b = a.find((item) => item.key === payload.payload);
        yield put(taskActions.updateSolutionSuccess({ update: b.nestedKeyValues }));
    } catch (error) {
        console.log(`Failed to fetch city list`, error);
        yield put(taskActions.fetchSolutionFailed(error.message));
    }
}

export default function* updateSolutionLevelSaga() {
    yield takeLatest(taskActions.updateSolution.type, updateSolutionLevelList);
}