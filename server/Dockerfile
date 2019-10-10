# Base image we are modifying from https://hub.docker.com/
FROM node:12-alpine

# Creating App Directory
RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server

# Solve for bcrypt dependencies with gyp
# Solution should not effect image size
# https://github.com/nodejs/docker-node/issues/384#issuecomment-305208112
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

RUN npm install

COPY . /app/server

# Run final command to kick off server
CMD ["npm", "run", "server"]