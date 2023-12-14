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
          loading: false,
          deleteSuccess: true,
        };
      })
      .addCase(deleteByYear.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: keputusanActions, reducer: keputusanReducer } = keputusanSlice;
export { keputusanActions, keputusanReducer };
export default keputusanSlice;
