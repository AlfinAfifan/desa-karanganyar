import { createSlice } from '@reduxjs/toolkit';
import { getKeputusan, createKeputusan, deleteKeputusan, updateKeputusan, deleteByYear } from './thunkKeputusan';

const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteSuccess: false,
};

const keputusanSlice = createSlice({
  name: 'keputusan',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKeputusan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getKeputusan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getKeputusan.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(createKeputusan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createKeputusan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createKeputusan.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(updateKeputusan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateKeputusan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateKeputusan.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(deleteKeputusan.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteKeputusan.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deleteKeputusan.rejected, (state, action) => {
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

const { actions: keputusanActions, reducer: keputusanReducer } = keputusanSlice;
export { keputusanActions, keputusanReducer };
export default keputusanSlice;
