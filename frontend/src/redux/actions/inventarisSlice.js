import { createSlice } from '@reduxjs/toolkit';
import data from '../../../Data.json';

const inventarisSlice = createSlice({
  name: 'inventaris',
  initialState: data,
  reducers: {
    inputData: (state, action) => {
      state.push(action.payload);
    },
    updateData: (state, action) => {
      const { id, namaProyek, volume, biaya, lokasi, keterangan } = action.payload;
      const dataUpdate = state.find((data) => data.id == id);

      if (dataUpdate) {
        dataUpdate.namaProyek = namaProyek;
        dataUpdate.volume = volume;
        dataUpdate.biaya = biaya;
        dataUpdate.lokasi = lokasi;
        dataUpdate.keterangan = keterangan;
      }
    },
    deleteData: (state, action) => {
      const { id } = action.payload;
      const dataDelete = state.find((data) => data.id == id);
      if (dataDelete) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});

export const { inputData, updateData, deleteData } = inventarisSlice.actions;
export default inventarisSlice.reducer;
