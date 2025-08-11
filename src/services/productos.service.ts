import axios from 'axios';
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