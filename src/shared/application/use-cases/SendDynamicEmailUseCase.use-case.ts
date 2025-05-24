import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  EmailService,
  EMAIL_SERVICE,
} from 'src/shared/domain/ports/email.service';

export interface SendDynamicEmailDto {
  to: string;
  subject: string;
  templateName: string;
  data: Record<string, string | number>;
}

/**
 * Caso de uso genérico para enviar cualquier tipo de correo con plantilla
 */
@Injectable()
export class SendDynamicEmailUseCase {
  constructor(
    @Inject(EMAIL_SERVICE)
    private readonly emailService: EmailService,
  ) {}

  async execute({
    to,
    subject,
    templateName,
    data,
  }: SendDynamicEmailDto): Promise<void> {
    const templatePath = join(
      process.cwd(),
      'src/shared/infrastructure/email/templates',
      `${templateName}.html`,
    );

    const htmlTemplate = readFileSync(templatePath, 'utf-8');

    await this.emailService.sendEmail({
      to,
      subject,
      htmlTemplate,
      data,
    });
  }
}
