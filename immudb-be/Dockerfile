FROM node:18-alpine AS builder

RUN apk add --no-cache make gcc g++ python3 sqlite-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production && \
    npm rebuild bcrypt --build-from-source

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]