FROM mhart/alpine-node:9 AS base
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --no-progress --prod
RUN cp -R node_modules prod_node_modules
RUN yarn install --no-progress
COPY . .
RUN npm run build

FROM mhart/alpine-node:8
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY --from=base /app/prod_node_modules ./node_modules
COPY --from=base /app/build ./build
EXPOSE 3000
CMD npm run start
