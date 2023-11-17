import { createSlice } from '@reduxjs/toolkit';
import { createPerundanganPer, deletePerundanganPer, getPerundanganPer, updatePerundanganPer } from './thunkPerundanganPer';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const perundanganPerSlice = createSlice({
  name: 'perundanganPer',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerundanganPer.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getPerundanganPer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getPerundanganPer.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createPerundanganPer.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createPerundanganPer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createPerundanganPer.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(updatePerundanganPer.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updatePerundanganPer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updatePerundanganPer.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(deletePerundanganPer.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deletePerundanganPer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deletePerundanganPer.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: perundanganPerActions, reducer: perundanganPerReducer } = perundanganPerSlice;
export { perundanganPerActions, perundanganPerReducer };
export default perundanganPerSlice;
