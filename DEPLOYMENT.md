# Heroku Deployment

Details on the deployment strategy for the Kantrack application and how to deploy the Dockerized application to Heroku.

## Code Prep

1. Add `./Dockerfile`

    ```
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
    ```

1. Create `./package.json` file with all server and FE dependency requirements
1. 

## Deploying Database

The following steps are for basic Postgres database deployment to Heroku.

1. Login to Heroku
1. Create App named **kantrack-staging**
1. Click on the **Resources** tab
1. Search for **Postgres** and from the list that comes up select **Heroku Postgres**
1. In the window that comes up make sure that the **Plane Name** selected is **Hobby Dev - Free** before clicking on the **Provision** button at the bottom of the window
1. When the **Heroku Postgres** item shows up below the search field click on the **Heroku Postgres** link
1. In the new browser tab that opens up click on the **Settings** tab
1. Click on the **View Credentials** button in the right hand column
    - the Heroku database credentials will appear and we'll use those to establish a connection to the Heroku database
1. Open the **Postico** application on your local machine
1. Add a New Favorite using the Heroku credentials that were revealed
    - Host
    - Port
    - User
    - Password
    - Database
1. After connecting run the setup queries available at `database/init.sql`

## Deploying Codebase

Make necessary [Code Prep](/#code-prep) before deploying to Heroku.

1. From the Heroku app page click on the **Deploy** tab
1. In the **Deployment Method** section select the **Container Registry** option
1. Bring up the terminal in the project directory
1. run: docker-compose up web
1. run: `heroku login`
    - follow the login prompts
1. run: `heroku git:remote -a kantrack-staging`