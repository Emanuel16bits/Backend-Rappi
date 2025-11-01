import * as yup from 'yup';

export const createCartSchema = yup.object({
  usuarioId: yup
    .number()
    .typeError('El usuarioId debe ser un número')
    .integer('El usuarioId debe ser un número entero')
    .required('El usuarioId es obligatorio'),

  total: yup
    .number()
    .typeError('El total debe ser un número')
    .min(0, 'El total no puede ser negativo')
    .required('El total es obligatorio'),

  activo: yup
    .boolean()
    .typeError('El valor de activo debe ser verdadero o falso')
    .default(true),

  items: yup
    .array()
    .of(
      yup.object({
        productId: yup
          .number()
          .typeError('El productId debe ser un número')
          .required('El productId es obligatorio'),
        quantity: yup
          .number()
          .integer('La cantidad debe ser un número entero')
          .min(1, 'La cantidad mínima es 1')
          .required('La cantidad es obligatoria'),
        price: yup
          .number()
          .typeError('El precio debe ser un número')
          .min(0, 'El precio no puede ser negativo')
          .required('El precio es obligatorio'),
      }),
    )
    .min(1, 'Debe haber al menos un producto en el carrito')
    .required('Los items son obligatorios'),
});

export type CreateCartDto = yup.InferType<typeof createCartSchema>;
