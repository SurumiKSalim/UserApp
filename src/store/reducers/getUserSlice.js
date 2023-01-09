import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl} from '../../constants/urls';
import {CommonGet} from '../../services/services';
const initialState = {
  users: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('fetch/users', async () => {
  try {
    const url = baseUrl + '/api/users?page=1';
    const response = await CommonGet(url);
    return JSON.stringify(response.data);
  } catch (e) {
    console.log(e.response);
  }
});

export const getUsers = createSlice({
  name: 'getUsers',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const data = JSON.parse(action.payload);
      state.users = data.data;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export default getUsers.reducer;
