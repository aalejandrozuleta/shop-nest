import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { ENV } from 'src/shared/config/env/env.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(ENV.REDIS_URL);
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
