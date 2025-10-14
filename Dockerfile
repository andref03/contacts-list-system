FROM node:20-alpine

WORKDIR /usr/src/app

# install deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || true

# copy source
COPY . .

EXPOSE 3000

CMD ["node", "--loader", "ts-node/esm", "index.ts"]
