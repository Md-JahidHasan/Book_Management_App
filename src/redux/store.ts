import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./features/book/bookApi";

const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)
})


export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;