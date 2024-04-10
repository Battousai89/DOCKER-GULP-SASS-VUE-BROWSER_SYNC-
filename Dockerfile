FROM node:12

WORKDIR /app

COPY package*.json ./
COPY gulpfile.js ./

RUN npm install -g gulp
RUN npm install

COPY . .
EXPOSE 3000

CMD gulp --version && gulp