import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistLocalStorage, clearLocalStorage } from "../../utilities";

// Interfaz de producto
export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

// Estado del carrito
export interface CarritoState {
  productos: ProductoCarrito[];
}

export const CarritoKey = "carrito";

// Estado inicial (si existe en localStorage, lo cargamos)
const initialState: CarritoState = localStorage.getItem(CarritoKey)
  ? JSON.parse(localStorage.getItem(CarritoKey) as string)
  : { productos: [] };

export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregarProducto(state, action: PayloadAction<ProductoCarrito>) {
      const producto = action.payload;
      const existente = state.productos.find((p) => p.id === producto.id);
      if (existente) {
        existente.cantidad += producto.cantidad;
      } else {
        state.productos.push(producto);
      }
      persistLocalStorage(CarritoKey, state);
    },
    eliminarProducto(state, action: PayloadAction<number>) {
      state.productos = state.productos.filter(
        (p) => p.id !== action.payload
      );
      persistLocalStorage(CarritoKey, state);
    },
    vaciarCarrito(state) {
      state.productos = [];
      persistLocalStorage(CarritoKey, state);
    },
    resetCarrito() {
      clearLocalStorage(CarritoKey);
      return { productos: [] };
    },
  },
});

export const {
  agregarProducto,
  eliminarProducto,
  vaciarCarrito,
  resetCarrito,
} = carritoSlice.actions;

export default carritoSlice.reducer;
