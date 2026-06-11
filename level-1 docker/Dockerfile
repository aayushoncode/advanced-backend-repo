FROM node

WORKDIR /app 


COPY package*.json ./
COPY . .
RUN npm install
COPY index.js index.js



CMD [ "node","index.js" ]
