import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
} from '@nestjs/terminus';
import { HealthCheckServiceCustom } from './health.service';

/**
 * Controlador que expone el endpoint /health
 */
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private customChecks: HealthCheckServiceCustom,
  ) {}

  /**
   * Endpoint que ejecuta los chequeos de Prisma y Redis
   * @returns Resultado de los chequeos de salud
   */
  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check(this.customChecks.getChecks());
  }
}
