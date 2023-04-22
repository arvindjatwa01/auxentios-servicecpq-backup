import { createSelector, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  billingTypeList: [],
  billingFrequencyList: [],
  paymentTermList: [],
  deliveryTypeList: [],
  deliveryPriorityList: [],
  quoteStatusList: [],
  quoteValidityList: []
};

const quoteRepairSlice = createSlice({
  name: "quoteDropdown",
  initialState: initialState,
  reducers: {
    fetchQuoteDropdowns(state) {
      state.loading = true;
    },
    fetchQuoteDropdownsSuccess(state, action) {
      state.loading = false;
      console.log(action.payload.deliveryTypes.data);
      // console.log("RepairSlice", action.payload.laborCodes.data);
      state.billingTypeList = action.payload.billingType.data;
      state.billingFrequencyList = action.payload.billingFreq.data;
      state.deliveryTypeList = action.payload.deliveryTypes.data;
      state.deliveryPriorityList = action.payload.deliveryPriority.data;
      state.paymentTermList = action.payload.paymentTerm.data;
      state.quoteStatusList = action.payload.quoteStatus.data;
      state.quoteValidityList = action.payload.quoteValidity.data;
    },

    fetchQuoteDropdownsFailed(state, action) {
      state.loading = false;
      // console.log(action);
    },
  },
});

// Actions
export const repairQuoteActions = quoteRepairSlice.actions;

// Selectors
export const selectQuoteDropdownLoading = (state) =>
  state.quoteDropdown.loading;
export const selectDelTypeList = (state) =>
  state.quoteDropdown.deliveryTypeList;
export const selectDelPriorityList = (state) =>
  state.quoteDropdown.deliveryPriorityList;
export const selectBillingFreqList = (state) =>
  state.quoteDropdown.billingFrequencyList;
export const selectPaymentTermList = (state) =>
  state.quoteDropdown.paymentTermList;
export const selectBillingTypeList = (state) =>
  state.quoteDropdown.billingTypeList;
export const selectQuoteStatusList = (state) =>
  state.quoteDropdown.quoteStatusList;
export const selectQuoteValidityList = (state) =>
  state.quoteDropdown.quoteValidityList;


export const selectQuoteDropdownOption = (option) =>
  createSelector(option, (dropdownList) =>
    dropdownList.map((task) => ({
      label: task.value,
      value: task.key,
    }))
  );

// Reducer
const quoteRepairReducer = quoteRepairSlice.reducer;
export default quoteRepairReducer;
