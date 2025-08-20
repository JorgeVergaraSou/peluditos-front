// src/interfaces/productos.interface.ts
import { CategoriasEnum } from "../common/categorias.enum";
import { EdadEnum } from "../common/edad.enum";

export interface ProductosInterface {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: CategoriasEnum;
    edad: EdadEnum;
    deletedAt: Date | string | null;
    createdAt: Date;
    updatedAt: Date;
}