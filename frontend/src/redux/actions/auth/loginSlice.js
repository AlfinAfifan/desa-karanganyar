import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginThunk';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
      })
  },
});

export const {action: loginActions, reducer: loginReducer} = loginSlice
export default loginSlice