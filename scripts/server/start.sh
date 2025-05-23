echo "Ejecutando migraciones de Prisma..."
npx prisma generate

echo "Iniciando aplicación NestJS..."
npm run start:dev
