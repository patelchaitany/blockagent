FROM node:20-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y python3 python3-pip --no-install-recommends \
    && pip3 install --break-system-packages pandas numpy \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY agent.json ./
COPY src/ ./src/
COPY contracts/ ./contracts/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npx", "tsx", "src/index.ts"]
