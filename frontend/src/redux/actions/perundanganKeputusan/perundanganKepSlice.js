import { createSlice } from '@reduxjs/toolkit';
import { createPerundanganKep, deletePerundanganKep, getPerundanganKep, updatePerundanganKep } from './thunkPerundanganKep';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const perundanganKepSlice = createSlice({
  name: 'perundanganKep',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerundanganKep.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getPerundanganKep.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getPerundanganKep.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createPerundanganKep.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createPerundanganKep.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createPerundanganKep.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(updatePerundanganKep.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updatePerundanganKep.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updatePerundanganKep.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(deletePerundanganKep.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deletePerundanganKep.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deletePerundanganKep.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: perundanganKepActions, reducer: perundanganKepReducer } = perundanganKepSlice;
export { perundanganKepActions, perundanganKepReducer };
export default perundanganKepSlice;
