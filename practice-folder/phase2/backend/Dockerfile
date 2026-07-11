FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install


#we write copy . . below RUN npm install when done changes in our app

COPY . .   

CMD [ "node" , "index.js" ]