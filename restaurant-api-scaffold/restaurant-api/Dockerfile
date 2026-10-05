# syntax=docker/dockerfile:1

# ---- deps: instala dependências uma única vez, cacheável por package*.json
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# ---- development: imagem usada pelo docker-compose no dia a dia.
# Código vem via volume (docker-compose.yml), não é copiado aqui —
# por isso "npm run start:dev" com hot-reload funciona sem rebuild de
# imagem a cada alteração de arquivo.
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# ---- build: compila o TypeScript para dist/, só para a etapa de produção
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

# ---- production: imagem final, enxuta — só dist/, node_modules de
# produção e o schema do Prisma (necessário em runtime para o client).
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "dist/main"]
