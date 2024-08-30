# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários
COPY .env.example .env
COPY package*.json ./

# Instale as dependências
RUN npm install

# Instale o cliente PostgreSQL
RUN apk add --no-cache postgresql-client

# Copie o código fonte para o container
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script to run migrations and start the app
ENTRYPOINT ["entrypoint.sh"]

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]

