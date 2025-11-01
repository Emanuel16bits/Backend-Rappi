import * as yup from 'yup';
import { EstadoPago, MetodoPago } from '../entities/payment.entity';

export const createPaymentSchema = yup.object({
  carritoId: yup
    .number()
    .typeError('El id del carrito debe ser un número')
    .integer('El id del carrito debe ser un número entero')
    .required('El id del carrito es obligatorio'),

  usuarioId: yup
    .number()
    .typeError('El id del usuario debe ser un número')
    .integer('El id del usuario debe ser un número entero')
    .required('El id del usuario es obligatorio'),

  monto: yup
    .number()
    .typeError('El monto debe ser un número')
    .min(0.01, 'El monto debe ser mayor a 0')
    .required('El monto es obligatorio'),

  metodo: yup
    .mixed<MetodoPago>()
    .oneOf(Object.values(MetodoPago), 'Método de pago no válido')
    .required('El método de pago es obligatorio'),

  estado: yup
    .mixed<EstadoPago>()
    .oneOf(Object.values(EstadoPago))
    .default(EstadoPago.PENDIENTE),

  idTransaccion: yup.string().nullable(),

  detalles: yup.object().nullable().default(null),
});

export type CreatePaymentDto = yup.InferType<typeof createPaymentSchema>;
