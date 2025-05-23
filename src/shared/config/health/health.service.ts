import { Injectable, Inject } from '@nestjs/common';
import { HealthCheckService, HealthIndicatorFunction } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

/**
 * Servicio que define funciones de chequeo de salud para Redis y Prisma
 */
@Injectable()
export class HealthCheckServiceCustom {
  private prisma = new PrismaClient();

  constructor(
    private health: HealthCheckService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  /**
   * Función que verifica si Redis responde correctamente
   */
  private redisIndicator: HealthIndicatorFunction = async () => {
    try {
      await this.redis.ping();
      return { redis: { status: 'up' } };
    } catch {
      return { redis: { status: 'down' } };
    }
  };

  /**
   * Función que verifica si Prisma (PostgreSQL) responde correctamente
   */
  private prismaIndicator: HealthIndicatorFunction = async () => {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { prisma: { status: 'up' } };
    } catch {
      return { prisma: { status: 'down' } };
    }
  };

  /**
   * Ejecuta los chequeos definidos
   */
  public getChecks(): HealthIndicatorFunction[] {
    return [this.redisIndicator, this.prismaIndicator];
  }
}
