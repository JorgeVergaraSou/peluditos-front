// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./states/user";
import carritoReducer from "./states/carrito";
import { persistMiddleware } from "./middleware/persistMiddleware";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    carrito: carritoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistMiddleware([
        { key: "user", storage: localStorage },       // Usuario se guarda siempre
        { key: "carrito", storage: sessionStorage }, // Carrito solo en sesión
      ])
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



/*
import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models";
import  userSliceReducer  from "./states/user";


export interface AppStore{
    user: UserInfo;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSliceReducer
    }
})
    */