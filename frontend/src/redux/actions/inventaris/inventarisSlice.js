import { createSlice } from '@reduxjs/toolkit';
import { getInventaris, createInventaris } from './thunkInventaris';

// READ
const initialState = {
  data: [],
  loadingInventaris: false,
  errorInventaris: null,
};

const inventarisSlice = createSlice({
  name: 'inventaris',
  initialState: initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventaris.pending, (state, action) => {
        return {
          ...state,
          loadingInventaris: true,
        };
      })
      .addCase(getInventaris.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loadingInventaris: false,
        };
      })
      .addCase(getInventaris.rejected, (state, action) => {
        return {
          ...state,
          errorInventaris: action.payload,
        };
      })
      .addCase(createInventaris.pending, (state, action) => {
        return {
          ...state,
          loadingInventaris: true,
        };
      })
      .addCase(createInventaris.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loadingInventaris = false;
      })
      .addCase(createInventaris.rejected, (state, action) => {
        return {
          ...state,
          errorInventaris: action.payload,
        };
      });
  },
});

const { actions: inventarisActions, reducer: inventarisReducer } = inventarisSlice;
export { inventarisActions, inventarisReducer };
export default inventarisSlice;

// export const { inputData, updateData, deleteData } = inventarisSlice.actions;

// const inventarisSlice = createSlice({
//   name: 'inventaris',
//   initialState: data,
//   reducers: {
//     inputData: (state, action) => {
//       state.push(action.payload);
//     },
//     updateData: (state, action) => {
//       const { id, namaProyek, volume, biaya, lokasi, keterangan } = action.payload;
//       const dataUpdate = state.find((data) => data.id == id);

//       if (dataUpdate) {
//         dataUpdate.namaProyek = namaProyek;
//         dataUpdate.volume = volume;
//         dataUpdate.biaya = biaya;
//         dataUpdate.lokasi = lokasi;
//         dataUpdate.keterangan = keterangan;
//       }
//     },
//     deleteData: (state, action) => {
//       const { id } = action.payload;
//       const dataDelete = state.find((data) => data.id == id);
//       if (dataDelete) {
//         return state.filter((f) => f.id !== id);
//       }
//     },
//   },
// });

// export default inventarisSlice.reducer;
