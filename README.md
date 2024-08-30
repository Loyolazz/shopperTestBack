# Teste Técnico Back-End - Shopper - Web Full-Stack Júnior

# Teste Técnico Back-End

Este projeto é um serviço backend desenvolvido com Node.js e TypeScript para gerenciar leituras de consumo de água e 
gás, com integração à API Google Gemini para processamento de imagens.

## Getting Started

### Pré-requisitos

- Node.js v18.x
- Docker & Docker Compose
- PostgreSQL

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Loyolazz/testeTecBack_Shopper.git
   cd testeTecBack_Shopper

2. Instale as dependências::
   ```sh
   npm install

3. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   
4. Build e inicie os containers Docker:
   ```sh
   docker-compose up --build

5. Acesse o container:
   ```sh
   docker exec -it testetecback_shopper-app-1 /bin/sh

6. Running the Project
To start the server:
   ```sh
   npm run start

The server will run on http://localhost:3000.

## Tem o Insomnia pronto para teste
   ```sh
   Insomnia_2024-08-29.json
