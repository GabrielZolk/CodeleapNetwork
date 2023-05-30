import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./actions/loginSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch;