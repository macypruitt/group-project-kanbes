#############################################
# BASE PRODUCTION DOCKERFILE SETTINGS
# ----------
#
# Deploying to Heroku
# ----------
#
# doker-compose up web
#
# heroku login
# heroku container:login
# heroku create
#
# heroku addons:create heroku-postgresql:hobby-dev
#
# heroku container:push web
# heroku container:release web
#############################################

# Base image we are modifying from https://hub.docker.com/
FROM node:12-alpine

# Creating App Directory
RUN mkdir -p /app
RUN mkdir -p /app/server
RUN mkdir -p /app/client
WORKDIR /app

#############################################
# COPY DEPENDENCIES TO CONTAINER BE & FE
#############################################

COPY ./client/package.json /app/client/package.json
COPY package.json /app

#############################################
# CLIENT DEPs INSTALLATION
#############################################

# install and cache client dependencies
RUN npm run client:i
COPY ./client /app/client
RUN npm run build:client

#############################################
# SERVER DEPs INSTALLATION
#############################################

# Solve for bcrypt dependencies with gyp
# Solution should not effect image size
# https://github.com/nodejs/docker-node/issues/384#issuecomment-305208112
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

# install and cache server dependencies
RUN npm install
COPY . /app

# Run final command to kick off server
CMD ["npm", "run", "start"]
