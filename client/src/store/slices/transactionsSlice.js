import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from './../../api/rest/restController';
import {
  createExtraReducers,
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  isFetching: false,
  error: null,
  transactions: [],
};

export const getTransactions = decorateAsyncThunk({
  key: `${TRANSACTIONS_SLICE_NAME}/get`,
  thunk: async () => {
    const { data } = await restController.getTransactions();
    return data;
  },
});

const extraReducers = createExtraReducers({
  thunk: getTransactions,
  pendingReducer,
  fulfilledReducer: (state, { payload }) => {
    state.transactions = [...payload];
    state.isFetching = false;
  },
  rejectedReducer,
});

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  extraReducers,
});

const { reducer } = transactionsSlice;

export default reducer;
