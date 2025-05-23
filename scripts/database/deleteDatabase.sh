#!/bin/bash

echo "Terminando conexiones activas y eliminando base de datos 'shop'..."

docker exec -i backend psql -U postgres -h postgres -d postgres <<'EOSQL'
-- Termina conexiones activas para la base de datos shop (excepto la actual)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'shop' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS shop;
EOSQL

echo "Base de datos 'shop' eliminada correctamente."
