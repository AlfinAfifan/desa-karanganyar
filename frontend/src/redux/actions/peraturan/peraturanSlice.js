import { createSlice } from '@reduxjs/toolkit';
import { createPeraturan, deletePeraturan, getPeraturan, updatePeraturan } from './thunkPeraturan';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const peraturanSlice = createSlice({
  name: 'peraturan',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPeraturan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getPeraturan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getPeraturan.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createPeraturan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createPeraturan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createPeraturan.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(updatePeraturan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updatePeraturan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updatePeraturan.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(deletePeraturan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deletePeraturan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deletePeraturan.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: peraturanActions, reducer: peraturanReducer } = peraturanSlice;
export { peraturanActions, peraturanReducer };
export default peraturanSlice;