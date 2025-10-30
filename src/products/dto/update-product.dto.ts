import * as yup from 'yup';

export const updateProductSchema = yup.object().shape({
  nombre: yup.string().required('El nombre no debe pasar los 20 caracteres'),
  precio: yup.number().required('El precio debe ser un numero'),
  descripcion: yup.string().required('La descripcion debe tener 50 caracteres'),
  stock: yup.number().required('El stock debe ser un numero'),
});

export type UpdateProductDto = yup.InferType<typeof updateProductSchema>;
