# ========= Build =========
FROM node:18-alpine AS build
WORKDIR /app

# Instalar deps con cache
COPY package*.json ./
RUN npm ci

# Copiar código y compilar TS -> dist
COPY tsconfig.json ./tsconfig.json
COPY src ./src
RUN npm run build

# ========= Runtime =========
FROM node:18-alpine
WORKDIR /app

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar artefactos compilados
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src

# Usuario no root + permisos de logs
RUN addgroup -S app && adduser -S app -G app \
  && mkdir -p /app/logs \
  && chown -R app:app /app

ENV NODE_ENV=production \
    PORT=3000

USER app
EXPOSE 3000
CMD ["node", "dist/app.js"]


