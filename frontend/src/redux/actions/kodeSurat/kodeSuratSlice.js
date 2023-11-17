import { createSlice } from '@reduxjs/toolkit';
import { createKodeSurat, deleteKodeSurat, getKodeSurat, updateKodeSurat } from './thunkKodeSurat';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const kodeSuratSlice = createSlice({
  name: 'kodesurat',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKodeSurat.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getKodeSurat.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(getKodeSurat.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(createKodeSurat.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createKodeSurat.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(createKodeSurat.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(updateKodeSurat.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateKodeSurat.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateKodeSurat.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      })
      .addCase(deleteKodeSurat.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteKodeSurat.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(deleteKodeSurat.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

const { actions: kodeSuratActions, reducer: kodeSuratReducer } = kodeSuratSlice;
export { kodeSuratActions, kodeSuratReducer };
export default kodeSuratSlice;
