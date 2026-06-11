FROM node

WORKDIR /app 

COPY package-lock.json  package-lock.json
COPY package.json package.json
COPY index.js index.js

RUN npm install

CMD [ "node","index.js" ]
