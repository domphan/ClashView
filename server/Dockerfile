# this dockerfile is intended to work with docker-compose
FROM gcr.io/google-appengine/nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install -g nodemon --silent
COPY . /usr/src/app/
EXPOSE 3000
CMD [ "nodemon", "server" ]
