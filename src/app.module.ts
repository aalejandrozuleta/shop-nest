import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './shared/config/health/health.module';
import { AppLogger } from './shared/config/logger/logger.service';
import { UsersModule } from './modules/users/infrastructure/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './shared/infrastructure/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.test', '.env', '.env.production'],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    HealthModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppLogger],
  exports: [],
})
export class AppModule {}
