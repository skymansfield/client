import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/user';

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,


};

// create user
export const createUser = createAsyncThunk(
    'user/new-user',
    async (userData, thunkAPI) => {
        try {
            console.log('click')
            console.log(userData)
            const response = await axios.post(API_URL + "/new-user", userData);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('create not working');
        }
    }
);


// get user
export const getUsers = createAsyncThunk(
    'user/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL+'/getAll');

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
);


// verify user
export const verifyUser = createAsyncThunk(
    'user/verify-user',
    async (userData, thunkAPI) => {
        try {
            
            const response = await axios.post(API_URL + "/verify-user", userData);
            console.log(response.data)
                       return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('No User Found');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(verifyUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
});

console.log(userSlice);

export default userSlice.reducer;
export const { reset } = userSlice.actions