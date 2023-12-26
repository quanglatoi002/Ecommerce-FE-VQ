import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import lruSlice from "../features/LRUCache/lruSlice";
import contactReducer from "../features/contact/contactSlice";
import couponReducer from "../features/coupon/couponSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const commonConfig = {
    key: "products",
    storage: storage,
};

const persistedProductsReducer = {
    ...commonConfig,
    whitelist: ["products"],
};

export const store = configureStore({
    reducer: {
        lruCache: lruSlice,
        auth: authReducer,
        product: persistReducer(persistedProductsReducer, productReducer),
        blog: blogReducer,
        contact: contactReducer,
        coupon: couponReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
