import { createSlice } from '@reduxjs/toolkit';
import { createSuratMasuk, deleteSuratMasuk, getSuratMasuk, updateSuratMasuk } from './thunkSuratMasuk';

const initialState = {
  data: [],
  loading: false,
  error: null,
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
        };
      })
      .addCase(getSuratMasuk.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getSuratMasuk.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
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
          error: action.payload,
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
          error: action.payload,
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
        };
      });
  },
});

const { actions: suratMasukActions, reducer: suratMasukReducer } = suratMasukSlice;
export { suratMasukActions, suratMasukReducer };
export default suratMasukSlice;
