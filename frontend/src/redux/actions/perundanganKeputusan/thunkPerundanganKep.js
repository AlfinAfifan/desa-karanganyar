import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPerundanganKep = createAsyncThunk('getPerundanganKep', async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, {
    withCredentials: true,
  });
  return res.data;
});

export const createPerundanganKep = createAsyncThunk('createPerundanganKep', async (dataInput, thunkApi) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, dataInput, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePerundanganKep = createAsyncThunk('updatePerundanganKep', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep/${dataUpdate.id}`, dataUpdate.data, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePerundanganKep = createAsyncThunk('deletePerundanganKep', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep/${id}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/perundangankepyear/${dataDelete.year}?password=${dataDelete.password}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundangankep`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
