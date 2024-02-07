import { createSlice } from '@reduxjs/toolkit';
import { getInventaris, createInventaris, updateInventaris, deleteInventaris, deleteByYear } from './thunkInventaris';

// READ
const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteSuccess: false,
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
          loading: false,
        };
      })
      .addCase(createInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(updateInventaris.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateInventaris.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
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
          loading: false,
        };
      })
      .addCase(deleteByYear.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteByYear.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          deleteSuccess: true,
          loading: false,
        };
      })
      .addCase(deleteByYear.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      });
  },
});

const { actions: inventarisActions, reducer: inventarisReducer } = inventarisSlice;
export { inventarisActions, inventarisReducer };
export default inventarisSlice;
