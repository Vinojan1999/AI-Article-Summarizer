import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";

// store is a global state that save the entire information of our application
export const store = configureStore({
    // In most cases, you don't need the entire states, you only need to reduce it to a specific slice of the pie
    // In this case, It's going to be the articleApi, meaning we want to just get something from this API
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
});