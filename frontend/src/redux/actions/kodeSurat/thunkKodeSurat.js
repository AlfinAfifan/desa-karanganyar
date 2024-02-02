import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getKodeSurat = createAsyncThunk('getKodeSurat', async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat`, {
    withCredentials: true,
  });
  return res.data;
});

export const createKodeSurat = createAsyncThunk('createKodeSurat', async (dataInput, thunkApi) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat`, dataInput, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateKodeSurat = createAsyncThunk('updateKodeSurat', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat/${dataUpdate.id}`, dataUpdate.data, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteKodeSurat = createAsyncThunk('deleteKodeSurat', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat/${id}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/kodesurat`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
