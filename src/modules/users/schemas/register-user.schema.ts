import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'El nombre debe tener al menos 4 caracteres' })
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
      message:
        'El nombre solo puede contener letras y espacios, sin números ni caracteres especiales',
    }),
  email: z.string().email({ message: 'Dirección de correo inválida' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(30, { message: 'La contraseña no debe exceder los 40 caracteres' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
      message:
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    }),
});
