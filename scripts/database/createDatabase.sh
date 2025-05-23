#!/bin/bash

echo "Creando base de datos 'shop'..."

docker exec -i backend psql -U postgres -h postgres -d postgres -c "CREATE DATABASE shop;"

echo "Base de datos 'shop' creada exitosamente."
