import { CategoriasEnum } from "../common/categorias.enum";

export interface ProductosInterface {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: CategoriasEnum;
}