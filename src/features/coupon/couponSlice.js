import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponService } from "./couponService";

export const getACoupon = createAsyncThunk(
    "coupon/get",
    async (name, thunkAPI) => {
        console.log(name);
        try {
            return await couponService.getCoupon(name);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const couponState = {
    coupon: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const couponSlice = createSlice({
    name: "coupon",
    initialState: couponState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getACoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupon = action.payload;
            })
            .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default couponSlice.reducer;
