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
        };
      })
      .addCase(getSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getSuratKeluar.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createSuratKeluar.rejected, (state, action) => {
        return {
          ...state,
          error: 'gagal',
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
        };
      })
      .addCase(deleteSuratKeluar.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteSuratKeluar.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deleteSuratKeluar.rejected, (state, action) => {
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

const { actions: suratKeluarActions, reducer: suratKeluarReducer } = suratKeluarSlice;
export { suratKeluarActions, suratKeluarReducer };
export default suratKeluarSlice;
