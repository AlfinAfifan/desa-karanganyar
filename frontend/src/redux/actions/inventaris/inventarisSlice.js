import { createSlice } from '@reduxjs/toolkit';
import { getInventaris, createInventaris, updateInventaris, deleteInventaris } from './thunkInventaris';

// READ
const initialState = {
  data: [],
  loading: false,
  error: null,
  status: null,
};

const inventarisSlice = createSlice({
  name: 'inventaris',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          status: null,
        };
      })
      .addCase(createInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          status: 'success',
        };
      })
      .addCase(createInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed',
        };
      })
      .addCase(updateInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          status: null,
        };
      })
      .addCase(updateInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          status: 'success',
        };
      })
      .addCase(updateInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          status: 'failed',
        };
      })
      .addCase(deleteInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deleteInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: inventarisActions, reducer: inventarisReducer } = inventarisSlice;
export { inventarisActions, inventarisReducer };
export default inventarisSlice;
