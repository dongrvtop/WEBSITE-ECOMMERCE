FROM node:18-alpine

WORKDIR /usr/src/app

COPY .env.development ./

RUN mv .env.development .env

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

# EXPOSE 8000

# CMD [ "node", "dist/main" ]
CMD [ "yarn", "start:dev" ]