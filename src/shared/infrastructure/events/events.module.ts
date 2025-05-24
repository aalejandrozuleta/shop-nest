import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendEmailHandler } from './handlers/send-email.handler';
import { SendDynamicEmailUseCase } from '../../application/use-cases/SendDynamicEmailUseCase.use-case';
import { ResendService } from '../../infrastructure/email/resend/resend.service';
import { EMAIL_SERVICE } from '../../domain/ports/email.service';

@Module({
  imports: [ConfigModule],
  providers: [
    SendEmailHandler,
    SendDynamicEmailUseCase,
    {
      provide: EMAIL_SERVICE,
      useClass: ResendService,
    },
  ],
})
export class EventsModule {}
