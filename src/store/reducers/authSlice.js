import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrl} from '../../constants/urls';
import {CommonPost} from '../../services/services';
const initialState = {
  email: '',
  password: '',
  user: '',
  token: '',
  id: '',
  loading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};
export const SignUp = createAsyncThunk('signup', async (body, thunkAPI) => {
  try {
    const url = baseUrl + '/api/register';
    const response = await CommonPost(url, body);
    if (response.status == 200) {
      return JSON.stringify(response.data);
    } else {
      return JSON.stringify(thunkAPI.rejectWithValue(e.response.data.error));
    }
  } catch (e) {
    throw JSON.stringify(thunkAPI.rejectWithValue(e.response.data.error));
  }
});
export const Login = createAsyncThunk('login', async (body, thunkAPI) => {
  try {
    const url = baseUrl + '/api/login';
    const response = await CommonPost(url, body);
    if (response.status == 200) {
      await AsyncStorage.setItem('token', response.data.token);
      return JSON.stringify(response.data);
    } else {
      return JSON.stringify(thunkAPI.rejectWithValue(e.response.data.error));
    }
  } catch (e) {
    console.log(e.response);
    throw JSON.stringify(thunkAPI.rejectWithValue(e.response.data.error));
  }
});
export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      AsyncStorage.clear();
    },
    clearState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(Login.fulfilled, (state, action) => {
      const data = JSON.parse(action.payload);
      state.token = data.token;
      state.id = data.id;
      state.loading = false;
      state.isSuccess = true;
      AsyncStorage.setItem('token', state.token);
    });
    builder.addCase(Login.rejected, (state, payload) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload.error.message;
    });
    builder.addCase(Login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      const data = JSON.parse(action.payload);
      state.token = data.token;
      state.id = data.id;
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.error.message;
    });
    builder.addCase(SignUp.pending, (state, action) => {
      state.loading = true;
    });
  },
});
export const {logout, clearState} = authSlice.actions;
export const userSelector = state => state.user;
export default authSlice.reducer;
