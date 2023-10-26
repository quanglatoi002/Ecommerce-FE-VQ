import { createSlice } from "@reduxjs/toolkit";
import LRUCache from "lru-cache";

const lruCache = new LRUCache({ max: 10 }); // Điều chỉnh kích thước cache theo ý muốn

const lruSlice = createSlice({
    name: "lruCache",
    initialState: lruCache.dump(),
    reducers: {
        setCache: (state, action) => {
            lruCache.set(action.payload.key, action.payload.value);
            return lruCache.dump();
        },
        getCache: (state, action) => {
            return lruCache.get(action.payload.key);
        },
    },
});

export const { setCache, getCache } = lruSlice.actions;
export default lruSlice.reducer;
