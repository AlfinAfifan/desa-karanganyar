import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getKodeSurat = createAsyncThunk('getKodeSurat', async () => {
  const res = await axios.get('http://localhost:4000/kodesurat');
  return res.data;
});

export const createKodeSurat = createAsyncThunk('createKodeSurat', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/kodesurat', dataInput);
    const res = await axios.get('http://localhost:4000/kodesurat');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateKodeSurat = createAsyncThunk('updateKodeSurat', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/kodesurat/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/kodesurat');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteKodeSurat = createAsyncThunk('deleteKodeSurat', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/kodesurat/${id}`);
    const res = await axios.get('http://localhost:4000/kodesurat');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
