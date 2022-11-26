import { createSelector, createSlice } from "@reduxjs/toolkit";


const initialState = {
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
    fetchDropdownsSuccess(state, action) {
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

    fetchDropdownsFailed(state, action) {
      state.loading = false;
      console.log(action);
    },
  },
});

// Actions
export const repairActions = repairSlice.actions;

// Selectors
export const selectDropdownLoading = (state) =>
  state.dropdown.loading;
export const selectChargeCodeList = (state) =>
  state.dropdown.chargeCodeList;
export const selectLaborCodeList = (state) =>
  state.dropdown.laborCodeList;
export const selectServiceTypeList = (state) =>
  state.dropdown.serviceTypeList;
export const selectLaborTypeList = (state) =>
  state.dropdown.laborTypeList;
export const selectMiscTypeList = (state) =>
  state.dropdown.miscTypeList;
export const selectActivityIdList = (state) =>
  state.dropdown.activityIdList;
export const selectDimensionList = (state) =>
  state.dropdown.dimensionList;
export const selectConsumableTypeList = (state) =>
  state.dropdown.consumableTypeList;
export const selectPricingMethodList = (state) =>
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
