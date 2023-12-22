import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bucketService } from "./buckerService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
    "bucket/get",
    async (data, thunkAPI) => {
        try {
            return await bucketService.getProducts(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const productState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const productSlice = createSlice({
    name: "bucket",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bucketProducts = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default productSlice.reducer;
