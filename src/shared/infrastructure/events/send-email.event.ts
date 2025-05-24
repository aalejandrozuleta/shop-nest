/**
 * Evento genérico para enviar cualquier tipo de correo con plantilla
 */
export class SendEmailEvent {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly templateName: string, // nombre del archivo de plantilla
    public readonly data: Record<string, string | number>, // datos dinámicos del template
  ) {}
}
