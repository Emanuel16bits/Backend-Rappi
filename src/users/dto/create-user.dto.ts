import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'Minimo 2 letras'),

  email: yup
    .string()
    .email('Correo invalido')
    .required('El correo es obligatorio'),

  password: yup
    .string()
    .min(6, 'Minimo 6 letras')
    .required('La contraseña es obligatoria'),

  rol: yup
    .string()
    .oneOf(['cliente', 'vendedor', 'repartidor'], 'Rol no valido')
    .default('cliente'),
});

export type CreateUserDto = yup.InferType<typeof createUserSchema>;
