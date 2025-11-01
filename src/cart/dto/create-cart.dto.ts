// create-cart.dto.ts
import * as yup from 'yup';

export const createCartSchema = yup.object({
  usuarioId: yup
    .number()
    .typeError('El usuarioId debe ser un número')
    .integer('El usuarioId debe ser un número entero')
    .required('El usuarioId es obligatorio'),
});

export type CreateCartDto = yup.InferType<typeof createCartSchema>;
