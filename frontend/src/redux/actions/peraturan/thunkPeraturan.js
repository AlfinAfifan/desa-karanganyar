import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPeraturan = createAsyncThunk('getPeraturan', async () => {
  const res = await axios.get('http://localhost:4000/peraturan');
  return res.data;
});

export const createPeraturan = createAsyncThunk('inputPeraturan', async (dataInput, thunkApi) => {
  try {
    await axios.post('http://localhost:4000/peraturan', dataInput);
    const res = await axios.get('http://localhost:4000/peraturan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePeraturan = createAsyncThunk('updatePeraturan', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`http://localhost:4000/peraturan/${dataUpdate.id}`, dataUpdate.data);
    const res = await axios.get('http://localhost:4000/peraturan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePeraturan = createAsyncThunk('deletePeraturan', async (id, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/peraturan/${id}`);
    const res = await axios.get('http://localhost:4000/peraturan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`http://localhost:4000/peraturanyear/${dataDelete.year}?password=${dataDelete.password}`);
    const res = await axios.get('http://localhost:4000/peraturan');

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
