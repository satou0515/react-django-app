FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --save firebase
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
