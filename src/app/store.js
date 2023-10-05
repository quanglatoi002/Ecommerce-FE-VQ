import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const productsPersistConfig = {
    key: "products",
    storage: storage,
    whitelist: ["products"], // Chỉ lưu trữ trường products
};

const persistedProductsReducer = persistReducer(
    productsPersistConfig,
    productReducer
);

export const store = configureStore({
    reducer: {
        productLocal: persistedProductsReducer,
        auth: authReducer,
        product: productReducer,
        blog: blogReducer,
        contact: contactReducer,
    },
});

export const persistor = persistStore(store);
