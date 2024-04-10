FROM node:12

WORKDIR /app

COPY DOCKER-GULP-SASS-VUE-BROWSER_SYNC-/package*.json ./
COPY DOCKER-GULP-SASS-VUE-BROWSER_SYNC-/gulpfile.js ./

RUN npm install -g gulp
RUN npm install

COPY ../app/ .
EXPOSE 3000

CMD gulp --version && gulp