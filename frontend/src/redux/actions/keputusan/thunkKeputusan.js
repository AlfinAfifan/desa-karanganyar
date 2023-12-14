import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getKeputusan = createAsyncThunk('getKeputusan', async () => {
  const res = await axios.get('http://localhost:4000/keputusan');
  return res.data;
});

export const createKeputusan = createAsyncThunk('inputKeputusan', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/keputusan', dataInput);
    const res = await axios.get('http://localhost:4000/keputusan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateKeputusan = createAsyncThunk('updateKeputusan', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/keputusan/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/keputusan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteKeputusan = createAsyncThunk('deleteKeputusan', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/keputusan/${id}`);
    const res = await axios.get('http://localhost:4000/keputusan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/keputusanyear/${dataDelete.year}?password=${dataDelete.password}`);
    const res = await axios.get('http://localhost:4000/keputusan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
