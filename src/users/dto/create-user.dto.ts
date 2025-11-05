import * as yup from 'yup';

// Esquema para los datos del restaurante
const restauranteSchema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  direccion: yup.string().required('La dirección es obligatoria'),
  categoria: yup.string().required('La categoría es obligatoria'),
  // Agrega más campos si son necesarios
});

// Esquema para el usuario
export const createUserSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(2),
  email: yup
    .string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
  rol: yup
    .string()
    .oneOf(['cliente', 'vendedor', 'repartidor'])
    .default('cliente'),

  // Solo requerido si el rol es 'vendedor'
  restaurante: yup.mixed().when('rol', {
    is: 'vendedor',
    then: () =>
      restauranteSchema.required(
        'Los datos del restaurante son obligatorios para vendedores',
      ),
    otherwise: () => yup.mixed().notRequired(),
  }),
});

export type CreateUserDto = yup.InferType<typeof createUserSchema>;
