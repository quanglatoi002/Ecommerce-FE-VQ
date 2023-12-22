import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LRUCache } from "lru-cache";

const lruCache = new LRUCache({ max: 10 }); // Điều chỉnh kích thước cache theo ý muốn
console.log(lruCache);

export const fetchCache = createAsyncThunk(
    "lruCache/fetchCache",
    async (key) => {
        console.log(key);
        const cacheValue = await lruCache.get(key);
        console.log(cacheValue);
        return cacheValue;
    }
);

const lruSlice = createSlice({
    name: "lruCache",
    initialState: lruCache.dump(),
    reducers: {
        setCache: (state, action) => {
            const { key, value } = action?.payload;
            lruCache.set(key, value);
            return lruCache.dump();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCache.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const { setCache } = lruSlice.actions;
export default lruSlice.reducer;
