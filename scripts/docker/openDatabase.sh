#!/bin/bash
# Script para conectarse a PostgreSQL dentro del contenedor Docker backend desde local
# Carga variables de conexión desde .env, .env.development o .env.test en ese orden

CONTAINER_NAME="backend"

# Función para cargar variables de entorno desde un archivo .env-like
load_env_vars() {
  local env_file=$1
  if [ -f "$env_file" ]; then
    echo "Cargando variables de $env_file..."
    export $(grep -v '^#' "$env_file" | grep -E '^(PGHOST|PGPORT|PGUSER|PGDATABASE)=' | xargs)
  fi
}

# Intentar cargar variables desde archivos en orden de prioridad
if [ -f ".env" ]; then
  load_env_vars ".env"
elif [ -f ".env.development" ]; then
  load_env_vars ".env.development"
elif [ -f ".env.test" ]; then
  load_env_vars ".env.test"
else
  echo "No se encontró ningún archivo .env, .env.development o .env.test para cargar variables."
  exit 1
fi

# Verificar que las variables críticas estén definidas
if [ -z "$PGHOST" ] || [ -z "$PGPORT" ] || [ -z "$PGUSER" ] || [ -z "$PGDATABASE" ]; then
  echo "Error: Alguna variable de conexión (PGHOST, PGPORT, PGUSER, PGDATABASE) no está definida."
  exit 1
fi

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker no está corriendo. Por favor, inicia Docker."
  exit 1
fi

# Verificar que el contenedor esté corriendo
if ! docker ps --format '{{.Names}}' | grep -w "$CONTAINER_NAME" > /dev/null; then
  echo "Error: No se encontró el contenedor '$CONTAINER_NAME' corriendo."
  exit 1
fi

# Ejecutar psql dentro del contenedor usando las variables cargadas
echo "Conectando a PostgreSQL dentro del contenedor '$CONTAINER_NAME' con:"
echo "Host=$PGHOST, Port=$PGPORT, User=$PGUSER, Database=$PGDATABASE"
docker exec -it "$CONTAINER_NAME" psql "host=$PGHOST port=$PGPORT user=$PGUSER dbname=$PGDATABASE"
