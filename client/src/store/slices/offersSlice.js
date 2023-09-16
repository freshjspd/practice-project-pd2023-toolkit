import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const OFFERS_SLICE_NAME = 'offers';

const initialState = {
  isFetching: false,
  error: null,
  offers: [],
};

export const getOffers = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/get`,
  thunk: async () => {
    const { data } = await restController.getOffers();
    return data;
  },
});

const extraReducers = builder => {
  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...payload];
  });
  builder.addCase(getOffers.rejected, rejectedReducer);
};

const offersSlice = createSlice({
  name: OFFERS_SLICE_NAME,
  initialState,
  extraReducers,
});

const { reducer } = offersSlice;

export default reducer;
