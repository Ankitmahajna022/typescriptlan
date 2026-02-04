import { configureStore } from "@reduxjs/toolkit";
import libraryReader from "./library.slice"

export const store = configureStore({
    reducer: libraryReader
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch