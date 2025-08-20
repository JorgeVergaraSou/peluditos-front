// src/validations/producto.schema.ts
import { z } from 'zod';
import { CategoriasEnum } from '../common/categorias.enum';
import { EdadEnum } from '../common/edad.enum';

export const productoSchema = z.object({
    nombre: z
        .string()
        .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),

    descripcion: z
        .string()
        .optional(),

    precio: z
        .string()
        .nonempty({ message: 'El precio es obligatorio' })
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'El precio debe ser un número mayor a 0',
        })
        .transform((val) => Number(val)),


    imagen: z
        .any()
        .refine((files) => files?.length === 1, 'Debes subir una imagen'),

    categoria: z.enum(Object.values(CategoriasEnum) as [string, ...string[]], 'Categoría no válida'),

    edad: z.enum(Object.values(EdadEnum) as [string, ...string[]], 'Edad no válida'),

});
