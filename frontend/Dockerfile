FROM node:20 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
