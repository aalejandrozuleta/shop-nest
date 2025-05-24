/**
 * Parámetros para enviar un correo dinámico
 */
export interface SendEmailParams {
  to: string;
  subject: string;
  htmlTemplate: string;
  data: Record<string, string | number>;
}

/**
 * Puerto para el servicio de envío de correos
 */
export interface EmailService {
  /**
   * Envía un correo con contenido dinámico usando un template HTML
   * @param params Parámetros necesarios para construir y enviar el correo
   */
  sendEmail(params: SendEmailParams): Promise<void>;
}

/**
 * Token de inyección para EmailService
 */
export const EMAIL_SERVICE = Symbol('EMAIL_SERVICE');
