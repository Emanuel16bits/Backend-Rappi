import * as yup from 'yup';
import { EstadoOrden } from '../entities/order.entity';

export const updateOrderSchema = yup.object({
  precioTotal: yup
    .number()
    .min(0, 'El precio total debe ser mayor o igual a 0')
    .optional(),

  idUsuario: yup.number().optional(),

  estado: yup
    .mixed<EstadoOrden>()
    .oneOf(
      [
        EstadoOrden.PENDIENTE,
        EstadoOrden.EN_PREPARACION,
        EstadoOrden.EN_CAMINO,
        EstadoOrden.ENTREGADA,
        EstadoOrden.CANCELADA,
      ],
      'Estado no válido',
    )
    .optional(),
});

export type UpdateOrderDto = yup.InferType<typeof updateOrderSchema>;
