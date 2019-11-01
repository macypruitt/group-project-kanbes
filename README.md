# KanTrack
## Description
*Duration: 3 week sprint*

KanTrack is a web application used to help the inventory tracking for the produce of Kanbe’s Market—a local nonprofit that provides access to fresh, healthy foods in areas where residents lack consistent access to healthy and affordable food.

The application assists in tracking Kanbe's produce throughout the entirety of its distribution process, while also providing features for the ability for Kanbe's to scale their operations. Additional features allows for more efficient interfacing and performance tracking. 





## Prerequisites
This version uses React, Redux, Express, Passport, Material-UI, Node.js, and PostgreSQL (a full list of dependencies can be found in `package.json`).

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Docker] (https://www.docker.com/)

## Create database and table

Create a new database called `prime_app` and create a `user` table, `stores` table, `suppliers` table,
`products` table, `invoices` table, `incoming_store` table, `outgoing_store` table, `current_product_prices` table, `store_inventory_junction` junction table, `incoming_warehouse` table, 
`outgoing_warehouse` table, and `warehouse_inventory_junction` junction table:

```SQL

CREATE TABLE "user" (
"id" SERIAL PRIMARY KEY,
"first_name" VARCHAR(80) UNIQUE NOT NULL,
"last_name" VARCHAR(80) UNIQUE NOT NULL,
"username" VARCHAR (80) UNIQUE NOT NULL,
"email" VARCHAR(100) UNIQUE,
"password" VARCHAR(1000) NOT NULL,
"role" VARCHAR(100) NOT NULL,
"admin_level" INT NOT NULL
);

CREATE TABLE "stores" (
"id" SERIAL PRIMARY KEY,
"store_name" VARCHAR(255) NOT NULL,
"store_address" VARCHAR UNIQUE NOT NULL,
"contact_name" VARCHAR(180),
"contact_phone" VARCHAR(255),
"contact_email" VARCHAR(100),
"status" BOOLEAN NOT NULL,
"store_phone_number" VARCHAR(255),
"delivery_route_order" INT NOT NULL
);

CREATE TABLE "suppliers" (
"id" SERIAL PRIMARY KEY,
"supplier_name" VARCHAR(255) UNIQUE NOT NULL,
"contact_name" VARCHAR(180),
"contact_number" VARCHAR(255),
"address" VARCHAR UNIQUE NOT NULL
);

CREATE TABLE "products" (
"id" SERIAL PRIMARY KEY,
"product_name" VARCHAR(100) NOT NULL,
"product_sub_type" VARCHAR(100) NOT NULL
);

CREATE TABLE "invoices" (
    "id" SERIAL PRIMARY KEY,
    "invoice_date" TIMESTAMP NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "store_id" INT REFERENCES "stores",
    "invoice_number" VARCHAR(80) NOT NULL
);

CREATE TABLE "incoming_warehouse" (
"id" SERIAL PRIMARY KEY,
"product_id" INT REFERENCES "products",
"user_id" INT REFERENCES "user",
"purchase_date" TIMESTAMP NOT NULL,
"bulk_purchase_price" NUMERIC(8,2) NOT NULL,
"origin" VARCHAR(100),
"unit_sale_price" NUMERIC(8,2),
"expiration_date" DATE NOT NULL,
"donated" BOOLEAN,
"count" INT NOT NULL,
"supplier_id" INT REFERENCES "suppliers",
"pounds" INT
);

CREATE TABLE "outgoing_warehouse" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"product_id" INT REFERENCES "products",
"store_id" INT REFERENCES "stores",
"kanbe_sell_date" TIMESTAMP NOT NULL,
"product_count" INT NOT NULL,
"store_vs_shrank" varchar(80) NOT NULL,
"supplier_id" INT REFERENCES "suppliers",
"notes" varchar(400)
);

CREATE TABLE "warehouse_inventory_junction" (
"id" SERIAL PRIMARY KEY,
"incoming_inventory_id" INT REFERENCES "incoming_warehouse",
"outgoing_inventory_id" INT REFERENCES "outgoing_warehouse"
);

CREATE TABLE "incoming_store" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user",
"product_id" INT REFERENCES "products",
"store_id" INT REFERENCES "stores",
"kanbe_sell_date" TIMESTAMP NOT NULL,
"product_count" INT NOT NULL,
"supplier_id" INT REFERENCES "suppliers",
"notes" VARCHAR(400)
);

CREATE TABLE "current_product_prices"(
"id" SERIAL PRIMARY KEY,
"product_id" INT REFERENCES "products",
"current_price_per_unit" NUMERIC(8,2) NOT NULL,
"status" BOOLEAN NOT NULL
);

CREATE TABLE "outgoing_store" (
"id" SERIAL PRIMARY KEY,
"store_id" INT REFERENCES "stores",
"product_id" INT REFERENCES "products",
"user_id" INT REFERENCES "user",
"supplier_id" INT REFERENCES "suppliers",
"last_modified" TIMESTAMP,
"sold_product_count" INT,
"shrink_product_count" INT,
"standard_par" INT NOT NULL,
"last_par" INT NOT NULL,
"current_price_per_unit_id" INT REFERENCES "current_product_prices" NOT NULL,
"sold_price_per_unit" NUMERIC(8,2) NOT NULL,
"notes" VARCHAR(400)
);

CREATE TABLE "store_inventory_junction" (
"id" SERIAL PRIMARY KEY,
"incoming_inventory_id" INT REFERENCES "incoming_store",
"outgoing_inventory_id" INT REFERENCES "outgoing_store"
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    USERNAME=Username
    PASSWORD=Your Password
    ```

* Start postgres if not running already by using `brew services start postgresql`
* Run docker-compose up --build
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum. 

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. [Import the sample routes JSON file](./PostmanPrimeSoloRoutes.json) by clicking `Import` in Passport. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
    1. `POST /api/user/register` registers a new user, see body to change username/password
    2. `POST /api/user/login` will login a user, see body to change username/password
    3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

* src/components
  * App/App
  * Footer/Footer
  * Nav/Nav
  * AboutPage/AboutPage
  * InfoPage/InfoPage
  * UserPage/UserPage
  * LoginPage/LoginPage
  * RegisterPage/RegisterPage
  * LogOutButton/LogOutButton
  * ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
