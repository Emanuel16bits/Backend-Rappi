import * as yup from 'yup';

export const updateDriverSchema = yup.object({
  nombre: yup.string().min(2).max(100).optional(),
  email: yup.string().email('Correo inválido').optional(),
  telefono: yup.string().optional(),
  vehiculo: yup.string().optional(),
  disponible: yup.boolean().optional(),
  calificacion: yup
    .number()
    .min(0, 'La calificación mínima es 0')
    .max(5, 'La calificación máxima es 5')
    .optional(),
  gananciasTotales: yup
    .number()
    .min(0, 'Las ganancias no pueden ser negativas')
    .optional(),
});

export type UpdateDriverDto = yup.InferType<typeof updateDriverSchema>;
