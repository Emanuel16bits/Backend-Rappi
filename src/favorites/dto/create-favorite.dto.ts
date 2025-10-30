import * as yup from 'yup';

export const createFavoriteSchema = yup.object().shape({
  usuarioId: yup
    .number()
    .required('El ID del usuario es obligatorio')
    .positive('El ID del usuario debe ser un número positivo')
    .integer('El ID del usuario debe ser un número entero'),

  productoId: yup
    .number()
    .required('El ID del producto es obligatorio')
    .positive('El ID del producto debe ser un número positivo')
    .integer('El ID del producto debe ser un número entero'),
});

export type CrearFavoriteDto = yup.InferType<typeof createFavoriteSchema>;

