// src/shared/config/logger/logger.service.ts
import { LoggerService } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';

export class AppLogger implements LoggerService {
  private logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
    transports: [new transports.Console()],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error({ message, trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
