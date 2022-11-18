import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";

export interface DropdownState {
  loading: boolean;
}

const initialState: DropdownState = {
  loading: false,
  chargeCodeList: [],
  serviceTypeList: [],
  laborTypeList: [],
  laborCodeList: [],
  pricingMethodList: [],
  miscTypeList: [],
  activityIdList: [],
  dimensionList: [],
  consumableTypeList: []
};

const repairSlice = createSlice({
  name: "dropdown",
  initialState: initialState,
  reducers: {
    fetchDropdowns(state) {
      state.loading = true;
    },
    fetchDropdownsSuccess(state, action: PayloadAction) {
      state.loading = false;
      console.log("RepairSlice", action.payload.laborCodes.data);
      state.chargeCodeList = action.payload.chargeCodes.data;
      state.laborCodeList = action.payload.laborCodes.data;
      state.serviceTypeList = action.payload.serviceTypes.data;
      state.laborTypeList = action.payload.laborTypes.data;
      state.miscTypeList = action.payload.miscTypes.data;
      state.activityIdList = action.payload.activityIds.data;
      state.pricingMethodList = action.payload.pricingMethods.data;
      state.dimensionList = action.payload.dimensions.data
      state.consumableTypeList = action.payload.consumableTypes.data;
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
export const selectDropdownLoading = (state: RootState) =>
  state.dropdown.loading;
export const selectChargeCodeList = (state: RootState) =>
  state.dropdown.chargeCodeList;
export const selectLaborCodeList = (state: RootState) =>
  state.dropdown.laborCodeList;
export const selectServiceTypeList = (state: RootState) =>
  state.dropdown.serviceTypeList;
export const selectLaborTypeList = (state: RootState) =>
  state.dropdown.laborTypeList;
export const selectMiscTypeList = (state: RootState) =>
  state.dropdown.miscTypeList;
export const selectActivityIdList = (state: RootState) =>
  state.dropdown.activityIdList;
export const selectDimensionList = (state: RootState) =>
  state.dropdown.dimensionList;
export const selectConsumableTypeList = (state: RootState) =>
  state.dropdown.consumableTypeList;
export const selectPricingMethodList = (state: RootState) =>
  state.dropdown.pricingMethodList;

export const selectDropdownOption = (option) =>
  createSelector(option, (dropdownList) =>
    dropdownList.map((task) => ({
      label: task.value,
      value: task.key,
    }))
  );

// Reducer
const repairReducer = repairSlice.reducer;
export default repairReducer;
