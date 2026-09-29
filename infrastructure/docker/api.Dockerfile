FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages
RUN npm ci --omit=dev && npm run generate --workspace=@glamflow/database
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace=@glamflow/api"]
