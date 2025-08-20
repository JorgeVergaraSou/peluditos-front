import axios from 'axios';
import { store } from "../redux/store";
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

export const ListarProductosService = async () => {
    try {
        const res = await axios.get(apiUrl + `/productos/listar-productos`);
        console.log('res.data', res.data);
        
        return res.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error desconocido';
        throw new Error(errorMessage);
    }
};

export const listarTodosProductosService = async () => {
  const res = await axios.get(`${apiUrl}/productos/todos`);
  return res.data;
};

export const NuevoProductoService = async (producto: any) => {
  try {
    const token = store.getState().user.token;
    const res = await axios.post(
      `${apiUrl}/productos/nuevo-producto`,
      producto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error desconocido";
    throw new Error(errorMessage);
  }
};

// Actualizar producto
export const actualizarProductoService = async (id: number, data: FormData) => {
  try {
    const res = await axios.put(`${apiUrl}/productos/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.producto; // 👈 importante
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Error al actualizar producto";
    throw new Error(errorMessage);
  }
};

export const desactivarProductoService = async (id: number) => {
  const res = await axios.patch(`${apiUrl}/productos/${id}/desactivar`);
  return res.data;
};

export const activarProductoService = async (id: number) => {
  const res = await axios.patch(`${apiUrl}/productos/${id}/activar`);
  return res.data;
};

