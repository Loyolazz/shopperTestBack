#!/bin/sh
set -e

echo "Aguardando o banco de dados..."
until pg_isready -h db -p 5432; do
  sleep 1
done
echo "Banco de dados está pronto!"

echo "Rodando migrações do Prisma..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
npm start
