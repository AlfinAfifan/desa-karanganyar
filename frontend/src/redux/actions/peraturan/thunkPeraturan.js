import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPeraturan = createAsyncThunk('getPeraturan', async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, {
    withCredentials: true,
  });
  return res.data;
});

export const createPeraturan = createAsyncThunk('inputPeraturan', async (dataInput, thunkApi) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, dataInput, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePeraturan = createAsyncThunk('updatePeraturan', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/peraturan/${dataUpdate.id}`, dataUpdate.data, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePeraturan = createAsyncThunk('deletePeraturan', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/peraturan/${id}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/peraturanyear/${dataDelete.year}?password=${dataDelete.password}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/peraturan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
