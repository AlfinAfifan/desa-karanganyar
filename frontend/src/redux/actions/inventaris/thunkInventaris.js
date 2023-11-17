import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInventaris = createAsyncThunk('getInventaris', async () => {
  const res = await axios.get('http://localhost:4000/inventaris');
  return res.data;
});

export const createInventaris = createAsyncThunk('inputInventaris', async (dataInput, thunkApi) => {
  try {
    const res = await axios.post('http://localhost:4000/inventaris', dataInput);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});
