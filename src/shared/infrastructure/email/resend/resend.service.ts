import { Injectable } from '@nestjs/common';
import {
  EmailService,
  SendEmailParams,
} from '../../../domain/ports/email.service';
import { Resend } from 'resend';
import { renderTemplate } from 'src/shared/utils/template.util';
import { ENV } from 'src/shared/config/env/env.service';

/**
 * Servicio que usa Resend para enviar correos dinámicos
 */
@Injectable()
export class ResendService implements EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(params: SendEmailParams): Promise<void> {
    const { to, subject, htmlTemplate, data } = params;
    const fromString: string = ENV.FROM_RESEND || '';
    const html = renderTemplate(htmlTemplate, data);

    try {
      await this.resend.emails.send({
        from: fromString,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Error al enviar correo con Resend:', error);
      throw error;
    }
  }
}
