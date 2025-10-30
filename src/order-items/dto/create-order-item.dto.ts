import * as yup from 'yup';

export const createOrderItemSchema = yup.object().shape({
  idOrden: yup
    .number()
    .required('El id del pedido es obligatorio')
    .positive('Debe ser un número positivo'),

  idProducto: yup
    .number()
    .required('El id del producto es obligatorio')
    .positive('Debe ser un número positivo'),

  cantidad: yup
    .number()
    .required('La cantidad es obligatoria')
    .positive('Debe ser mayor a 0')
    .integer('Debe ser un número entero'),
});

export type CreateOrderItemDto = {
  idOrden: number;
  idProducto: number;
  cantidad: number;
};
