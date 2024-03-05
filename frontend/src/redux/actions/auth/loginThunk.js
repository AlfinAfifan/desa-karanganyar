import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('login', async (data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/login`, data, {
      withCredentials: true,
    });
    
    return res.data;
  } catch (error) {
    return error;
  }
});
