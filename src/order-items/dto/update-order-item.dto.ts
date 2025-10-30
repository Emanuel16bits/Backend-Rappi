import * as yup from 'yup';

export const updateOrderItemSchema = yup.object({
  cantidad: yup
    .number()
    .positive('Debe ser mayor a 0')
    .integer('Debe ser un número entero')
    .optional(),
});

export type UpdateOrderItemDto = yup.InferType<typeof updateOrderItemSchema>;
