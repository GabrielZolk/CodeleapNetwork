import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch;