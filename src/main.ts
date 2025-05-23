import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppLogger } from './shared/config/logger/logger.service';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ENV } from './shared/config/env/env.service';
import { printRoutesByMethod } from './shared/config/logger/printRoutesByMethod';

/**
 * Punto de entrada principal de la aplicación NestJS usando Fastify.
 * Configura seguridad, CORS, limitación de peticiones y logger personalizado.
 * @returns Promise<void>
 */
async function bootstrap(): Promise<void> {
  // Crear la aplicación NestJS con adaptador Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  // Registrar logger personalizado para Nest
  app.useLogger(app.get(AppLogger));

  // Registrar plugin Helmet para seguridad HTTP y ocultar headers como 'x-powered-by'
  await app.register(helmet);

  // Registrar plugin rate-limit para limitar peticiones y evitar ataques de denegación de servicio
  await app.register(rateLimit, {
    max: 100, // máximo 100 peticiones
    timeWindow: '15 minutes', // por ventana de 15 minutos
  });

  // Habilitar CORS con configuración personalizada
  app.enableCors({
    origin: ENV.CORS_ORIGIN ?? '*', // Orígenes permitidos, puede ser '*' para desarrollo
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Métodos permitidos
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(ENV.PORT ?? 3000, '0.0.0.0');
  await app.getHttpAdapter().getInstance().ready();

  console.info(`🚀 App corriendo en el puerto ${ENV.PORT ?? 3000}`);

  printRoutesByMethod(app);
}

// Manejar errores en bootstrap para no dejar promesas colgadas
bootstrap().catch((error) => {
  console.error('Error arrancando la aplicación:', error);
  process.exit(1);
});
