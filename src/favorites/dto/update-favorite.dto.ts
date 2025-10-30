import * as yup from 'yup';

export const updateFavoriteSchema = yup.object({
  productoIdViejo: yup
    .number()
    .positive('El ID del producto viejo debe ser un número positivo')
    .integer('El ID del producto viejo debe ser un número entero')
    .optional(),

  productoIdNuevo: yup
    .number()
    .positive('El ID del producto nuevo debe ser un número positivo')
    .integer('El ID del producto nuevo debe ser un número entero')
    .optional(),
});

export type UpdateFavoriteDto = yup.InferType<typeof updateFavoriteSchema>;

