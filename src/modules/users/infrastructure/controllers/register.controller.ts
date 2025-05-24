import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';
import { RegisterDto } from 'src/modules/users/application/dto/register.dto';
import { registerUserSchema } from '../../schemas/register-user.schema';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    recoveryCode: string;
  };
}

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  /**
   * Controlador para registrar un nuevo usuario.
   * @param dto - Datos de registro
   * @returns Promesa con mensaje y datos del usuario registrado
   */
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerUserSchema)) dto: RegisterDto,
  ): Promise<RegisterResponse> {
    try {
      const user = await this.registerUseCase.execute(dto);
      return {
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          recoveryCode: user.recoveryCode,
        },
      };
    } catch (error: unknown) {
      // Validar si error es instancia de Error para acceder a message
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      // En caso de error desconocido, lanzar con mensaje genérico
      throw new InternalServerErrorException(
        'Error desconocido en el servidor',
      );
    }
  }
}
