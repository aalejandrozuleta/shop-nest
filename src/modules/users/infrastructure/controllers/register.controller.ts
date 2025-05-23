import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/register.use-case';
import { RegisterDto } from 'src/modules/users/application/dto/register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.registerUseCase.execute(dto);
      return {
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message); // opcional: puedes también lanzar un HttpException con más info
    }
  }
}
