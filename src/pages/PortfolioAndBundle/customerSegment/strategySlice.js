import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ListResponse, StrategyTask } from "../../../models";
import type { RootState } from "../../../app/store";
import { frequencyDropDownList, unitDropDownList } from "./dropDownArray";

export interface TaskState {
  loading: boolean;
  list: StrategyTask[];
}

const initialState: TaskState = {
  loading: false,
  list: [],
  taskList: [],
  categoryList: [],
  rTimeList: [],
  productList: [],
  geographicList: [],
  update: [],
  updateTask: [],
  solutionTaskList: [],
  solutionLevelList: [],
};

const strategySlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    fetchTaskList(state) {
      state.loading = true;
    },
    fetchTaskListSuccess(state, action: PayloadAction) {
      state.loading = false;
      state.list = action.payload.users.data;
      state.taskList = action.payload.tasks.data;
      state.categoryList = action.payload.category.data;
      state.rTimeList = action.payload.rTime.data;
      state.productList = action.payload.product.data;
      state.geographicList = action.payload.geographic.data;
      state.solutionTaskList = action.payload.solutionType.data;
      state.solutionLevelList = action.payload.solutionLevel.data;
    },
    updateList(state, action: PayloadAction) {
      // updateList.push(action.payload)
      console.log("action update list", action.payload)

    },
    updateSolution(state, action: PayloadAction) {
      // updateList.push(action.payload)
      console.log("action solution update list", action.payload)

    },
    updateTask(state, action: PayloadAction) {

    },
    updateListSuccess(state, action: PayloadAction) {
      state.update = action.payload.update;
    },
    updateSolutionSuccess(state, action: PayloadAction) {
      state.solutionLevelList = action.payload.update;
    },
    updateTaskSuccess(state, action: PayloadAction) {
      state.updateTask = action.payload.update;
    },
    fetchTaskListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
    fetchSolutionFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const taskActions = strategySlice.actions;

// Selectors
export const selectTaskLoading = (state: RootState) => state.task.loading;
export const selectStrategyTaskList = (state: RootState) => state.task.list;
export const selectTaskList = (state: RootState) => state.task.taskList;
export const selectCategoryList = (state: RootState) => state.task.categoryList;
export const selectResponseTimeList = (state: RootState) => state.task.rTimeList;
export const selectProductList = (state: RootState) => state.task.productList;
export const selectGeographicalList = (state: RootState) => state.task.geographicList;
export const selectUnitList = (state: RootState) => unitDropDownList;
export const selectFrequencyList = (state: RootState) => frequencyDropDownList;
export const selectUpdateList = (state: RootState) => state.task.update;
export const selectUpdateTaskList = (state: RootState) => state.task.updateTask;
export const selectSolutionTaskList = (state: RootState) => state.task.solutionTaskList;
export const selectSolutionLevelList = (state: RootState) => state.task.solutionLevelList;

export const selectStrategyTaskOption = (option) => createSelector(option, (taskList) =>
  taskList.map((task) => ({
    label: task.value,
    value: task.key,
  }))
);


// Reducer
const taskReducer = strategySlice.reducer;
export default taskReducer;
