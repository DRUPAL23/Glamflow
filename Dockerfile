FROM node:22-alpine AS base
WORKDIR /app
COPY package.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

FROM base AS web
RUN npm install
RUN npm run build --workspace=@glamflow/web
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=@glamflow/web"]
