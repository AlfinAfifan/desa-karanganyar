import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInventaris = createAsyncThunk('getInventaris', async () => {
  const res = await axios.get('http://localhost:4000/inventaris');
  return res.data;
});

export const createInventaris = createAsyncThunk('inputInventaris', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/inventaris', dataInput);
    const res = await axios.get('http://localhost:4000/inventaris');
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateInventaris = createAsyncThunk('updateInventaris', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/inventaris/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/inventaris');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteInventaris = createAsyncThunk('deleteInventaris', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/inventaris/${id}`);
    const res = await axios.get('http://localhost:4000/inventaris');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/inventarisyear/${dataDelete.year}?password=${dataDelete.password}`);
    const res = await axios.get('http://localhost:4000/inventaris');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
