import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/vendor';

const initialState = {
    vendor: [],
    isError: false,
    isSuccess: false,
    isLoading: false,


};

// create project
export const createVendor = createAsyncThunk(
    'vendor/new-vendor',
    async (vendorData, thunkAPI) => {
        try {
            console.log('click')
            console.log(vendorData)
            const response = await axios.post(API_URL + "/new-vendor", vendorData);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('create not working');
        }
    }
);


// get projects
export const getVendor = createAsyncThunk(
    'vendor/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL+'/getAll');

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
);

// verify vendor
export const verifyVendor = createAsyncThunk(
    'vendor/verify-vendor',
    async (vendorData, thunkAPI) => {
        try {
            
            const response = await axios.post(API_URL + "/verify-vendor", vendorData);
            console.log(response.data)
                       return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('No vendor Found');
        }
    }
);



const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createVendor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendor = action.payload
            })
            .addCase(createVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getVendor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendor = action.payload;
            })
            .addCase(getVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(verifyVendor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyVendor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.vendor = action.payload;
            })
            .addCase(verifyVendor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
});

console.log(vendorSlice);

export default vendorSlice.reducer;