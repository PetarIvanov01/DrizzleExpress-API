FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/index

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN npm install

RUN npm install

RUN npm run build

CMD npm start