import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export interface CarritoState {
  productos: ProductoCarrito[];
}

export const CarritoKey = "carrito";

const initialState: CarritoState = sessionStorage.getItem(CarritoKey)
  ? JSON.parse(sessionStorage.getItem(CarritoKey) as string)
  : { productos: [] };

const carritoSlice = createSlice({
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
    },
    eliminarProducto(state, action: PayloadAction<number>) {
      state.productos = state.productos.filter((p) => p.id !== action.payload);
    },
    vaciarCarrito(state) {
      state.productos = [];
    },
  },
});

export const { agregarProducto, eliminarProducto, vaciarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
