FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build parse_service

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn --production=true

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/parse_service/main"]