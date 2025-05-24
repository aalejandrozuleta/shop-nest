import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { SendEmailEvent } from 'src/shared/infrastructure/events/send-email.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: RegisterDto): Promise<UserEntity> {
    const exists = await this.userRepository.findByEmail(dto.email);
    if (exists) {
      throw new Error('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = UserEntity.create({
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      recoveryCode: randomUUID(),
    });

    await this.userRepository.save(user);

    this.eventEmitter.emit(
      'email.send',
      new SendEmailEvent(
        user.email,
        '¡Bienvenido a nuestra plataforma!',
        'welcome', // nombre del archivo HTML sin extensión
        { name: user.name },
      ),
    );

    return user;
  }
}
