# this dockerfile is intended to work with docker-compose
FROM node:10.13.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
#COPY ./client/package.json /usr/src/app/package.json
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
RUN npm init -y
# start app
EXPOSE 3000
CMD [ "npm", "start" ]
