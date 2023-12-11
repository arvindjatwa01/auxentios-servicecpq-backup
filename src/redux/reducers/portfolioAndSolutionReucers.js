import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_CURRENCY_SUCCESS,
  GET_CUSTOMER_SEGMENT_SUCCESS,
  GET_MACHINE_COMPONENT_TYPE_SUCCESS,
  GET_PRICE_HEAD_TYPE_SUCCESS,
  GET_PRICE_LIST_SUCCESS,
  GET_PRICE_METHOD_SUCCESS,
  GET_PRICE_TYPE_SUCCESS,
  GET_STATUS_SUCCESS,
  GET_SUPPORT_LEVEL_SUCCESS,
  GET_VALIDITY_TYPE_SUCCESS,
  GET_FREQUENCY_SUCCESS,
  GET_UNIT_SUCCESS,
  SUPPORT_LEVEL,
} from "redux/actions/portfolioAndSolutionActions";
import {
  Common_SOLUTION_BUILDER_URL,
  SOLUTION_PRICING_COMMON_CONFIG,
} from "services/CONSTANTS";

const initialState = {
  supportLevelKeyValuePair: [],
  portfolioStatusKeyValuePair: [],
  customerSegmentKeyValuePair: [],
  machineComponentKeyValuePair: [],
  validityKeyValuePair: [],
  priceListKeyValuePair: [],
  priceMethodKeyValuePair: [],
  priceTypeKeyValuePair: [],
  priceHeadTypeKeyValuePair: [],
  currencyKeyValuePair: [],
  frequencyKeyValuePairs: [],
  unitKeyValuePairs: [],
  loading: false,
  error: null,
};

export const commonAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPORT_LEVEL_SUCCESS:
      return {
        ...state,
        supportLevelKeyValuePair: action.options,
      };
    case GET_STATUS_SUCCESS:
      return {
        ...state,
        portfolioStatusKeyValuePair: action.options,
      };
    case GET_CUSTOMER_SEGMENT_SUCCESS:
      return {
        ...state,
        customerSegmentKeyValuePair: action.options,
      };
    case GET_PRICE_LIST_SUCCESS:
      return {
        ...state,
        priceListKeyValuePair: action.options,
      };
    case GET_PRICE_METHOD_SUCCESS:
      return {
        ...state,
        priceMethodKeyValuePair: action.options,
      };
    case GET_PRICE_TYPE_SUCCESS:
      return {
        ...state,
        priceTypeKeyValuePair: action.options,
      };
    case GET_PRICE_HEAD_TYPE_SUCCESS:
      return {
        ...state,
        priceHeadTypeKeyValuePair: action.options,
      };
    case GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyKeyValuePair: action.options,
      };
    case GET_MACHINE_COMPONENT_TYPE_SUCCESS:
      return {
        ...state,
        machineComponentKeyValuePair: action.options,
      };
    case GET_VALIDITY_TYPE_SUCCESS:
      return {
        ...state,
        validityKeyValuePair: action.options,
      };
    case GET_FREQUENCY_SUCCESS:
      return {
        ...state,
        frequencyKeyValuePairs: action.options,
      };
    case GET_UNIT_SUCCESS:
      return {
        ...state,
        unitKeyValuePairs: action.options,
      };

    default:
      return state;
  }
};

// const apiUrls = [
//   `${SOLUTION_PRICING_COMMON_CONFIG}support-level`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}status`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}customer-segment`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}price-list`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}price-method`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}price-type`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}price-head-type`,
//   `${SOLUTION_PRICING_COMMON_CONFIG}currency`,
//   `${Common_SOLUTION_BUILDER_URL()}/type`,
//   `${Common_SOLUTION_BUILDER_URL()}/validity`,
// ];

// // Create an async thunk for each API call
// export const fetchSolutionPriceComminConfig = createAsyncThunk(
//   "data/fetchData1",
//   async (endPoint) => {
//     const response = await fetch(endPoint);
//     const data = await response.json();
//     return data;
//   }
// );

// // Create an async thunk for each API call
// export const fetchCommonSolutionBuilder = createAsyncThunk(
//   "data/fetchData1",
//   async (endPoint) => {
//     const response = await fetch(endPoint);
//     const data = await response.json();
//     return data;
//   }
// );

// const commonApiSlice = createSlice({
//   name: "common",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSolutionPriceComminConfig.pending, (state) => {
//         state.loading = "loading";
//       })
//       .addCase(fetchSolutionPriceComminConfig.fulfilled, (state, action) => {
//         state.loading = "succeeded";
//         state.data1 = action.payload;
//       })
//       .addCase(fetchSolutionPriceComminConfig.rejected, (state, action) => {
//         state.loading = "failed";
//         state.error = action.error.message;
//       });

//     builder
//       .addCase(fetchCommonSolutionBuilder.pending, (state) => {
//         state.loading = "loading";
//       })
//       .addCase(fetchCommonSolutionBuilder.fulfilled, (state, action) => {
//         state.loading = "succeeded";
//         state.data1 = action.payload;
//       })
//       .addCase(fetchCommonSolutionBuilder.rejected, (state, action) => {
//         state.loading = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// // export { fetchApiData }; // Exporting the async thunk for use in components
// export default commonApiSlice.reducer;
