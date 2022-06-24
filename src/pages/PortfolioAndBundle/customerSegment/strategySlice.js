import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {ListResponse, StrategyTask} from "../../../models";
import type {RootState} from "../../../app/store";
import {priceDropDownList} from "./dropDownArray";

export interface TaskState {
  loading: boolean;
  list: StrategyTask[];
}

const initialState: TaskState = {
  loading: false,
  list: [],
  taskList:[],
  categoryList:[],
  rTimeList:[],
  productList:[],
  geographicList:[],
  priceList:[],
};

const strategySlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    fetchTaskList(state) {
      console.log("ULOOOOOO");
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
      state.priceList = priceDropDownList;
    },
    fetchTaskListFailed(state, action: PayloadAction<string>) {
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
export const selectPriceList = (state: RootState) => state.task.priceList;

export const selectStrategyTaskOption = (option)=>createSelector(option, (taskList) =>
    taskList.map((task) => ({
      label: task.key,
      value: task.value,
    }))
);


// Reducer
const taskReducer = strategySlice.reducer;
export default taskReducer;
