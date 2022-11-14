import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {RootState} from "../../../app/store";

export interface DropdownState {
  loading: boolean;
}

const initialState: DropdownState = {
  loading: false,
  chargeCodeList: [],
  serviceTypeList: [],
  laborTypeList: [],
  laborCodeList: [],
  pricingMethodList: []
};

const repairSlice = createSlice({
  name: 'dropdown',
  initialState: initialState,
  reducers: {
    fetchDropdowns(state) {
      state.loading = true;
    },
    fetchDropdownsSuccess(state, action: PayloadAction) {
      state.loading = false;
      console.log("RepairSlice",action.payload.laborCodes.data);
      state.chargeCodeList = action.payload.chargeCodes.data;
      state.laborCodeList = action.payload.laborCodes.data;
      state.serviceTypeList = action.payload.serviceTypes.data;
      state.laborTypeList = action.payload.laborTypes.data;
      state.pricingMethodList = action.payload.pricingMethods.data
    },
    
    fetchDropdownsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const repairActions = repairSlice.actions;

// Selectors
export const selectDropdownLoading = (state: RootState) => state.dropdown.loading;
export const selectChargeCodeList = (state: RootState) => state.dropdown.chargeCodeList;
export const selectLaborCodeList = (state: RootState) => state.dropdown.laborCodeList;
export const selectServiceTypeList = (state: RootState) => state.dropdown.serviceTypeList;
export const selectLaborTypeList = (state: RootState) => state.dropdown.laborTypeList;
export const selectPricingMethodList = (state: RootState) => state.dropdown.pricingMethodList;


export const selectDropdownOption = (option)=>createSelector(option, (dropdownList) =>
    dropdownList.map((task) => ({
      label: task.value,
      value: task.key,
    }))
);


// Reducer
const repairReducer = repairSlice.reducer;
export default repairReducer;
