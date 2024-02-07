import { createSlice } from '@reduxjs/toolkit';
import { createSuratKeluar, deleteByYear, deleteSuratKeluar, getSuratKeluar, updateSuratKeluar } from './thunkSuratKeluar';

const initialState = {
  data: [],
  loading: false,
  error: null,
  deleteSuccess: false,
};

const suratKeluarSlice = createSlice({
  name: 'suratkeluar',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(getSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(getSuratKeluar.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(createSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createSuratKeluar.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(updateSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateSuratKeluar.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
          loading: false,
        };
      })
      .addCase(deleteSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteSuratKeluar.rejected, (state, action) => {
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
          error: null,
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

const { actions: suratKeluarActions, reducer: suratKeluarReducer } = suratKeluarSlice;
export { suratKeluarActions, suratKeluarReducer };
export default suratKeluarSlice;
