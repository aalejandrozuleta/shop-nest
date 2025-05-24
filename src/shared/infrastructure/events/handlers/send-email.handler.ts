import { Injectable } from '@nestjs/common';
import { SendDynamicEmailUseCase } from 'src/shared/application/use-cases/SendDynamicEmailUseCase.use-case';
import { SendEmailEvent } from '../send-email.event';
import { OnEvent } from '@nestjs/event-emitter';

/**
 * Manejo genérico de correos electrónicos basado en eventos
 */
@Injectable()
export class SendEmailHandler {
  constructor(private readonly sendEmail: SendDynamicEmailUseCase) {}

  @OnEvent('email.send')
  async handle(event: SendEmailEvent): Promise<void> {
    await this.sendEmail.execute({
      to: event.to,
      subject: event.subject,
      templateName: event.templateName,
      data: event.data,
    });
  }
}
