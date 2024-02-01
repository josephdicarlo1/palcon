FROM node:20 AS build

ENV RCON_HOSTNAME=127.0.0.1
ENV RCON_PORT=25575
ENV RCON_PASSWORD=changeit

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app

RUN printf "{\"type\": \"module\"}" >> package.json

COPY --from=build /app/build/ /app/

EXPOSE 3000

ENTRYPOINT [ "node","./index.js" ]