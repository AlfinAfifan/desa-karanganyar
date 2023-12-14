import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSuratMasuk = createAsyncThunk('getSuratMasuk', async () => {
  const res = await axios.get('http://localhost:4000/suratmasuk');
  return res.data;
});

export const createSuratMasuk = createAsyncThunk('createSuratMasuk', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/suratmasuk', dataInput);
    const res = await axios.get('http://localhost:4000/suratmasuk');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateSuratMasuk = createAsyncThunk('updateSuratMasuk', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/suratmasuk/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/suratmasuk');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteSuratMasuk = createAsyncThunk('deleteSuratMasuk', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/suratmasuk/${id}`);
    const res = await axios.get('http://localhost:4000/suratmasuk');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/suratmasukyear/${dataDelete.year}?password=${dataDelete.password}`);
    const res = await axios.get('http://localhost:4000/suratmasuk');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
