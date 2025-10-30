import * as yup from 'yup';

export const createRestaurantSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .max(100, 'Maximo 100 letras'),
  descripcion: yup.string().optional().max(1000, 'Maximo 1000 letras'),
  direccion: yup
    .string()
    .required('La direccion es obligatoria')
    .max(200, 'Maximo 200 letras'),
  categoria: yup
    .string()
    .required('La categoria es obligatoria')
    .max(50, 'Maximo 50 letras'),
  horarioApertura: yup.string().optional(),
  horarioCierre: yup.string().optional(),
  idUsuario: yup
    .number()
    .required('El id es obligatorio')
    .positive('El id debe ser un número positivo'),
  activo: yup.boolean().default(true),
});

export type CreateRestaurantDto = yup.InferType<typeof createRestaurantSchema>;
