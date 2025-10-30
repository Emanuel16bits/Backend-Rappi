import * as yup from 'yup';

export const createDriverSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'Mínimo 2 letras'),

  email: yup
    .string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),

  telefono: yup.string().optional(),

  vehiculo: yup.string().optional(),

  disponible: yup.boolean().optional().default(true),

  calificacion: yup
    .number()
    .min(0, 'La calificación mínima es 0')
    .max(5, 'La calificación máxima es 5')
    .optional()
    .default(0),

  gananciasTotales: yup
    .number()
    .min(0, 'Las ganancias no pueden ser negativas')
    .optional()
    .default(0),
});

export type CreateDriverDto = yup.InferType<typeof createDriverSchema>;
