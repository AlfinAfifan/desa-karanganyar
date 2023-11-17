import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSuratKeluar = createAsyncThunk('getSuratKeluar', async () => {
  const res = await axios.get('http://localhost:4000/suratkeluar');
  return res.data;
});

export const createSuratKeluar = createAsyncThunk('createSuratKeluar', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/suratkeluar', dataInput);
    const res = await axios.get('http://localhost:4000/suratkeluar');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateSuratKeluar = createAsyncThunk('updateSuratKeluar', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/suratkeluar/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/suratkeluar');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteSuratKeluar = createAsyncThunk('deleteSuratKeluar', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/suratkeluar/${id}`);
    const res = await axios.get('http://localhost:4000/suratkeluar');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
