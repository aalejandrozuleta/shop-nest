import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return UserEntity.fromPrimitives({
      id: user.id,
      email: user.email,
      name: user.name,
      recoveryEmail: user.recoveryEmail,
      isEmailVerified: user.isEmailVerified,
      securityQuestion: user.securityQuestion,
      securityAnswer: user.securityAnswer,
      recoveryCode: user.recoveryCode,
      twoFactorEnabled: user.twoFactorEnabled,
      twoFactorSecret: user.twoFactorSecret,
      rememberCard: user.rememberCard,
      password: user.password,
    });
  }

  async save(user: UserEntity): Promise<void> {
    const data = user.toPrimitives();
    await this.prisma.user.create({ data });
  }
}
