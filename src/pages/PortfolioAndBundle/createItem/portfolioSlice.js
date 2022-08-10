import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface LoginPayload {

}

export interface PortfolioItemState {
  isLoading: boolean;
  result: any;
}

const initialState: PortfolioItemState = {
  isLoading: false,
  result: undefined,
};

const portfolioSlice = createSlice({
  name: 'portfolioItem',
  initialState,
  reducers: {
    createItem(state, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    createItemSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.result = action.payload;
    },
    createItemFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      console.log("createItemFailed=>portfolioSlice",action.payload);
    },
  },
});

// Actions
export const portfolioItemActions = portfolioSlice.actions;

// Reducer
const portfolioItemReducer = portfolioSlice.reducer;
export default portfolioItemReducer;
