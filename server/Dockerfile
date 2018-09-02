FROM node:6.11.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 3000
CMD [ "nodemon", "server" ]
