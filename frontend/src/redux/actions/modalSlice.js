import { createSlice } from '@reduxjs/toolkit';

const data = ['<input type="text">Nama</input>', '<input>'];

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    data: [{ input: data }],
  },
  reducers: {
    openModal: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { openModal } = modalSlice.actions;
export default modalSlice.reducer;
