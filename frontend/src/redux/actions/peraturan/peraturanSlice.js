import { createSlice } from '@reduxjs/toolkit';
import { createPeraturan, deleteByYear, deletePeraturan, getPeraturan, updatePeraturan } from './thunkPeraturan';

const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteSuccess: false,
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
          loading: false,
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
          error: 'gagal',
          loading: false,
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
          error: 'gagal',
          loading: false,
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

const { actions: peraturanActions, reducer: peraturanReducer } = peraturanSlice;
export { peraturanActions, peraturanReducer };
export default peraturanSlice;
