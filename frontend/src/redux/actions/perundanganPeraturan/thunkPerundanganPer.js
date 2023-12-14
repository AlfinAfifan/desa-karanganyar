import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPerundanganPer = createAsyncThunk('getPerundanganPer', async () => {
  const res = await axios.get('http://localhost:4000/perundanganper');
  return res.data;
});

export const createPerundanganPer = createAsyncThunk('createPerundanganPer', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/perundanganper', dataInput);
    const res = await axios.get('http://localhost:4000/perundanganper');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePerundanganPer = createAsyncThunk('updatePerundanganPer', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/perundanganper/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/perundanganper');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePerundanganPer = createAsyncThunk('deletePerundanganPer', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/perundanganper/${id}`);
    const res = await axios.get('http://localhost:4000/perundanganper');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/perundanganperyear/${dataDelete.year}?password=${dataDelete.password}`);
    const res = await axios.get('http://localhost:4000/perundanganper');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
