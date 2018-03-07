FROM node:8-alpine AS base

WORKDIR /app/common
COPY common/package.json .
COPY common/yarn.lock .
RUN yarn install  --no-progress
COPY common/ .
RUN yarn run build

WORKDIR /app/api
COPY api/package.json .
COPY api/yarn.lock .
RUN yarn install --no-progress
COPY api/ .
RUN yarn run build

WORKDIR /app/frontend
COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install  --no-progress --production false
COPY frontend/ .
RUN yarn run build
RUN rm -rf node_modules
RUN yarn install --no-progress --production true

WORKDIR /app/proxy
COPY proxy/package.json .
COPY proxy/yarn.lock .
RUN yarn install --no-progress
COPY proxy/ .

FROM keymetrics/pm2:8-alpine

WORKDIR /app/api
COPY api/package.json .
COPY api/.sequelizerc ./.sequelizerc
COPY --from=base /app/api/node_modules ./node_modules
COPY --from=base /app/api/build ./build

WORKDIR /app/frontend
COPY --from=base /app/frontend .

WORKDIR /app/proxy
COPY --from=base /app/proxy .

WORKDIR /app
COPY package.json .
COPY ecosystem-prod.config.js ecosystem.config.js

ENV API_DB_ROOT=build/db

ARG googleMapsApiKey
ENV exposomics_googleMapsApiKey=$googleMapsApiKey

ARG publicUrl
ENV exposomics_publicUrl=$publicUrl

EXPOSE 4000

CMD yarn db:migrate && yarn db:seed && yarn start
