import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getPerundanganPer = createAsyncThunk('getPerundanganPer', async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, {
    withCredentials: true,
  });
  return res.data;
});

export const createPerundanganPer = createAsyncThunk('createPerundanganPer', async (dataInput, thunkApi) => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, dataInput, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, {
      withCredentials: true,
    });

    toast.success('Tambah Data Sukses');
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const updatePerundanganPer = createAsyncThunk('updatePerundanganPer', async (dataUpdate, thunkApi) => {
  try {
    await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper/${dataUpdate.id}`, dataUpdate.data, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, {
      withCredentials: true,
    });

    toast.success('Edit Data Sukses');
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.res.data);
  }
});

export const deletePerundanganPer = createAsyncThunk('deletePerundanganPer', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper/${id}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, {
      withCredentials: true,
    });

    toast.success('Hapus Data Sukses');
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});

export const deleteByYear = createAsyncThunk('deleteByYear', async (dataDelete, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/perundanganperyear/${dataDelete.year}?password=${dataDelete.password}`, {
      withCredentials: true,
    });
    const res = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/perundanganper`, {
      withCredentials: true,
    });

    toast.success('Format Data Sukses');
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkApi.rejectWithValue(error.response.data); // Gunakan error.response.data jika menggunakan Axios
  }
});
