-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
"address" VARCHAR UNIQUE NOT NULL,
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
    "invoice_date" TIMESTAMPT NOT NULL,
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



