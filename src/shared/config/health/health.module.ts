import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisModule } from '../../providers/redis/redis.module';
import { HealthCheckServiceCustom } from './health.service';

@Module({
  imports: [TerminusModule, RedisModule],
  controllers: [HealthController],
  providers: [HealthCheckServiceCustom],
})
export class HealthModule {}
