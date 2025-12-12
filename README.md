
# Gearbase

**Descrição:** Projeto backend em NestJS para gerencia um catálogo de especificções técnicas de carros, usando Prisma como ORM.

**Tecnologias:** NestJS, TypeScript, Prisma, PostgreSQL (conforme `prisma/schema.prisma`), Jest (testes).

**Status:** Em desenvolvimento — algumas partes (ex.: `auth.service.ts`) ainda não estão implementadas.

**Rápido:**
- **Instalar dependências:** `npm install`
- **Gerar Prisma client:** `npm run prisma` (executa `prisma generate`)
- **Rodar em desenvolvimento:** `npm run dev`

**Variáveis de ambiente:**
- `DATABASE_URL` : string de conexão com o banco (Postgres). Exemplo: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
- `PORT` : porta opcional (padrão `3000`)

Crie um arquivo `.env` na raiz com ao menos `DATABASE_URL` definido antes de iniciar.

Comandos úteis:

```bash
# instalar dependências
npm install

# gerar Prisma client
npm run prisma

# aplicar migrações (desenvolvimento)
npx prisma migrate dev

# ou aplicar migrações em ambiente com migrações já geradas
npx prisma migrate deploy

# iniciar em modo dev (com log pretty)
npm run dev

# rodar testes
npm test
npm run test:e2e
```

**Endpoints principais (prefixo global: `/api/v1`)**

- **POST** `/api/v1/user` : criar usuário (`UserDto`)
- **DELETE** `/api/v1/user/:id` : deletar usuário

- **GET** `/api/v1/cars` : listar carros
- **GET** `/api/v1/cars/:model` : listar carros por modelo
- **GET** `/api/v1/cars/make?make=` : listar carros por fabricante (query)
- **POST** `/api/v1/cars` : criar carro (`CarDto`)
- **DELETE** `/api/v1/cars/:id` : deletar carro
- **PUT** `/api/v1/cars/:id` : atualizar carro (`CarDtoPut`)

Documentação Swagger está habilitada e acessível em: `http://localhost:<PORT>/api/docs` (o projeto já chama `setupSwagger` em `main.ts`).

**Banco de dados / Prisma**
- O generator do Prisma escreve o client em `generated/prisma`.
- O arquivo de schema é `prisma/schema.prisma` e usa `provider = "postgresql"`.
- Migrações já existem em `prisma/migrations` — aplique-as com `npx prisma migrate deploy` ou use `npx prisma migrate dev` durante desenvolvimento.

**Autenticação / API Keys**
- Existe um serviço de tokens em `src/services/key.service.ts` que gera/verifica tokens guardados na tabela `Token`.
- O `auth.service.ts` está vazio (pendente) — a proteção/autenticação das rotas ainda precisa ser concluída.

**Arquitetura / Organização**
- `src/controllers` — rotas/controle
- `src/services` — lógica de negócio e integração com Prisma
- `src/dtos` — DTOs e validação
- `src/middlewares` — filtros e logger personalizados

**TODO / Próximos passos**
- Implementar `auth.service.ts` (JWT ou estratégia desejada) e aplicar guardas nas rotas que devem ser protegidas.
- Adicionar `.env.example` com variáveis mínimas e instruções.
- Implementar testes de integração para endpoints críticos.
- Validar e endurecer as operações de criação/atualização (checar checagens e erros esperados).

**Contribuindo**
- Fork ou branch, abra PRs pequenas e testáveis. Inclua testes quando possível.

**Contato / Autor**
- Emanuel Batista


