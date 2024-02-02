import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSuratKeluar = createAsyncThunk('getSuratKeluar', async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, {
    withCredentials: true,
  });
  return res.data;
});

export const createSuratKeluar = createAsyncThunk('createSuratKeluar', async (dataInput, thunkApi) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, dataInput, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updateSuratKeluar = createAsyncThunk('updateSuratKeluar', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar/${dataUpdate.id}`, dataUpdate.data, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deleteSuratKeluar = createAsyncThunk('deleteSuratKeluar', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar/${id}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluaryear/${dataDelete.year}?password=${dataDelete.password}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/suratkeluar`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
