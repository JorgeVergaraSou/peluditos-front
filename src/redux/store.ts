import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./states/user";
import carritoReducer from "./states/carrito";

export const store = configureStore({
  reducer: {
    user: userReducer,
    carrito: carritoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;