import * as yup from 'yup';

export const updateCartItemSchema = yup.object({
  idCart: yup
    .number()
    .typeError('El id del carrito debe ser un número')
    .integer('El id del carrito debe ser un número entero')
    .required('El id del carrito es obligatorio'),

  idProducto: yup
    .number()
    .typeError('El id del producto debe ser un número')
    .integer('El id del producto debe ser un número entero')
    .required('El id del producto es obligatorio'),

  cantidad: yup
    .number()
    .typeError('La cantidad debe ser un número')
    .integer('La cantidad debe ser un número entero')
    .min(1, 'La cantidad mínima es 1')
    .required('La cantidad es obligatoria'),

  precioUnitario: yup
    .number()
    .typeError('El precio unitario debe ser un número')
    .min(0.01, 'El precio unitario debe ser mayor a 0')
    .required('El precio unitario es obligatorio'),
});

export type UpdateCartItemDto = yup.InferType<typeof updateCartItemSchema>;
