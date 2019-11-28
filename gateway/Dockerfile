#To build the docker file run: docker build -t gateway:latest .
FROM node:11-alpine

WORKDIR /var/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","index.js"]