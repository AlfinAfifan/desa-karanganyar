import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPerundanganKep = createAsyncThunk('getPerundanganKep', async () => {
  const res = await axios.get('http://localhost:4000/perundangankep');
  return res.data;
});

export const createPerundanganKep = createAsyncThunk('createPerundanganKep', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/perundangankep', dataInput);
    const res = await axios.get('http://localhost:4000/perundangankep');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePerundanganKep = createAsyncThunk('updatePerundanganKep', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/perundangankep/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/perundangankep');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePerundanganKep = createAsyncThunk('deletePerundanganKep', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/perundangankep/${id}`);
    const res = await axios.get('http://localhost:4000/perundangankep');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
