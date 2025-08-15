# --------------------------------------------------
# 1) Build stage: установка зависимостей + сборка
# --------------------------------------------------
FROM node:22.17-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только package-файлы и сразу ставим все зависимости (включая dev)
COPY aurora-rates/package.json aurora-rates/package-lock.json ./
RUN npm ci

# Теперь копируем весь исходный код вашего приложения
COPY aurora-rates ./

# Собираем приложение — здесь и улетят все ошибки сборки
RUN npm run build

# --------------------------------------------------
# 2) Runtime stage: минимальный образ для продакшена
# --------------------------------------------------
FROM node:22.17-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Копируем из builder только то, что нужно для старта:
# — package.json (чтобы npm start знал скрипт)
# — node_modules (production-зависимости + всё, что нужно для .next)
# — папку .next с билдом
# — public и next.config.ts(x)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Открываем порт 3000
EXPOSE 3000

# Запуск бинари Next.js в проде
CMD ["npm", "run", "start"]
