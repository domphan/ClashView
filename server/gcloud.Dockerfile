# this dockerfile is intended to work with docker-compose
FROM node:10.13.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ./server/package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install -g nodemon --silent
EXPOSE 3000
CMD [ "nodemon", "server" ]
