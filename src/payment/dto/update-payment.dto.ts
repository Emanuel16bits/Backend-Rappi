import * as yup from 'yup';
import { EstadoPago, MetodoPago } from '../entities/payment.entity';

export const updatePaymentSchema = yup.object({
  carritoId: yup
    .number()
    .typeError('El id del carrito debe ser un número')
    .integer('El id del carrito debe ser un número entero')
    .notRequired(),

  usuarioId: yup
    .number()
    .typeError('El id del usuario debe ser un número')
    .integer('El id del usuario debe ser un número entero')
    .notRequired(),

  monto: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .notRequired(),

  metodo: yup
    .mixed<MetodoPago>()
    .oneOf(Object.values(MetodoPago), 'Método de pago no válido')
    .notRequired(),

  estado: yup
    .mixed<EstadoPago>()
    .oneOf(Object.values(EstadoPago), 'Estado de pago no válido')
    .notRequired(),

  idTransaccion: yup.string().nullable().notRequired(),

  detalles: yup.object().nullable().notRequired(),
});

export type UpdatePaymentDto = yup.InferType<typeof updatePaymentSchema>;
