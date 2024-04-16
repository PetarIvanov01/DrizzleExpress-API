FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/index

COPY . /

RUN npm install

RUN npm run build

CMD npm start