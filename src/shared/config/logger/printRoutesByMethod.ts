import { NestFastifyApplication } from '@nestjs/platform-fastify';

/**
 * Imprime en consola las rutas registradas en la aplicación NestJS
 * agrupadas por método HTTP.
 * @param app Instancia de la aplicación NestFastifyApplication
 * @returns void
 */
export function printRoutesByMethod(app: NestFastifyApplication): void {
  const fastify = app.getHttpAdapter().getInstance();
  const allRoutes = fastify.printRoutes({
    commonPrefix: false,
    includeMeta: true,
  });

  const methodMap: Record<
    'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    string[]
  > = {
    GET: [],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: [],
  };

  // Separar por líneas y filtrar no vacías
  const lines = allRoutes.split('\n').filter((line) => line.trim().length > 0);

  for (const line of lines) {
    // Buscar líneas que terminen con "(METHOD)" y extraer ruta y método
    // Ejemplo línea: "│   └── auth/register (POST)"
    const match = line.match(
      /[\s│├└─]*([\w/\-_*]+) \((GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\)/,
    );

    if (match) {
      const [, path, method] = match;

      // Ignorar métodos HEAD y OPTIONS ya que no los listamos en el mapa
      if (method === 'HEAD' || method === 'OPTIONS') {
        continue;
      }

      // Guardar ruta agrupada por método
      methodMap[method as keyof typeof methodMap].push(path);
    }
  }

  // Imprimir rutas agrupadas
  for (const method of Object.keys(methodMap) as (keyof typeof methodMap)[]) {
    console.info(`\n📦 Rutas ${method}`);
    const routes = methodMap[method];

    if (routes.length === 0) {
      console.info(`⚠️  No hay rutas registradas para ${method}`);
    } else {
      console.table(routes.map((path) => ({ método: method, ruta: path })));
    }
  }
}
