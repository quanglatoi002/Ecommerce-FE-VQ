import React, { createContext, useContext, useState } from "react";

const LRUCacheContext = createContext();

export const useLRUCache = () => {
    return useContext(LRUCacheContext);
};

export const LRUCacheProvider = ({ children }) => {
    //sử dụng với Map()
    const [cache, setCache] = useState(new Map());
    console.log("cache 12", cache);
    const maxCacheSize = 5; // sl 5

    const updateCache = (key, value) => {
        const newCache = new Map(cache);
        if (newCache.size >= maxCacheSize) {
            newCache.delete(newCache.keys().next().value);
        }
        newCache.set(key, value);
        setCache(newCache);
    };
    return (
        <LRUCacheContext.Provider value={{ cache, updateCache }}>
            {children}
        </LRUCacheContext.Provider>
    );
};
