import { LoggerService } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

export class AppLogger implements LoggerService {
  private logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
  });

  /**
   * Registra un mensaje de información.
   * @param message - Mensaje a registrar
   */
  log(message: string): void {
    this.logger.info(message);
  }

  /**
   * Registra un mensaje de error con un trace (stack trace).
   * @param message - Mensaje de error
   * @param trace - Traza del error
   */
  error(message: string, trace: string): void {
    this.logger.error({ message, trace });
  }

  /**
   * Registra un mensaje de advertencia.
   * @param message - Mensaje de advertencia
   */
  warn(message: string): void {
    this.logger.warn(message);
  }
}
