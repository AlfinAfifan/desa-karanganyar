import { createSlice } from '@reduxjs/toolkit';
import { createSuratMasuk, deleteByYear, deleteSuratMasuk, getSuratMasuk, updateSuratMasuk } from './thunkSuratMasuk';

const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteSuccess: false,
};

const suratMasukSlice = createSlice({
  name: 'suratmasuk',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuratMasuk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(getSuratMasuk.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(getSuratMasuk.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(createSuratMasuk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createSuratMasuk.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createSuratMasuk.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(updateSuratMasuk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateSuratMasuk.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateSuratMasuk.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(deleteSuratMasuk.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteSuratMasuk.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deleteSuratMasuk.rejected, (state, action) => {
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

const { actions: suratMasukActions, reducer: suratMasukReducer } = suratMasukSlice;
export { suratMasukActions, suratMasukReducer };
export default suratMasukSlice;
