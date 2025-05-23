import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './shared/config/health/health.module';
import { AppLogger } from './shared/config/logger/logger.service';
import { UsersModule } from './modules/users/infrastructure/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development', '.env.test', '.env', '.env.production'],
    isGlobal: true,
  }), HealthModule, UsersModule],
  controllers: [],
  providers: [AppLogger],
  exports: [],
})
export class AppModule { }
