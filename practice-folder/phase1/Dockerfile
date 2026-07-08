FROM node

WORKDIR /app

COPY index.js index.js

COPY package*.json ./

COPY . .

RUN npm install

CMD [ "node","index.js" ]