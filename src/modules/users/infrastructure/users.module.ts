import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register.controller';
import { RegisterUseCase } from '../application/use-cases/register.use-case';
import { UserRepository } from '../domain/repositories/user.repository';
import { PrismaUserRepository } from './prisma/prisma-user.repository';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterController],
  providers: [
    RegisterUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [],
})
export class UsersModule {}
