import * as yup from 'yup';
export const createProductSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  precio: yup.number().required('El precio es obligatorio'),
  descripcion: yup.string().required('La descripcion es obligatoria'),
  stock: yup.number().required('El stock es obligatorio'),
  imagen: yup.string().optional(),
});

export type CreateProductDto = yup.InferType<typeof createProductSchema>;
