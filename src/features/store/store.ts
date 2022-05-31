import { configureStore } from '@reduxjs/toolkit'
import {apiSlice} from "../api/apiSlice"
import pizzaSlice from "../reducers/pizzaSlice"
// ...
const store = configureStore({
    reducer: {
        pizzas:pizzaSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export default store