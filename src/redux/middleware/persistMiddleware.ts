import { Middleware } from "@reduxjs/toolkit";

type PersistConfig = {
  key: string;
  storage: Storage; // Puede ser localStorage o sessionStorage
};

export const persistMiddleware = (config: PersistConfig[]): Middleware =>
  (store) => (next) => (action) => {
    const result = next(action); // Ejecuta la acción

    const state = store.getState();

    config.forEach(({ key, storage }) => {
      if (state[key] !== undefined) {
        try {
          storage.setItem(key, JSON.stringify(state[key]));
        } catch (error) {
          console.error(`Error guardando ${key} en ${storage === localStorage ? "localStorage" : "sessionStorage"}`, error);
        }
      }
    });

    return result;
  };
