INSERT INTO "user" ("first_name", "last_name", "username", "email", "password", "role", "admin_level")
VALUES ('Maxfield', 'Kaniger', 'mkaniger', 'mkan@kanbesmarkets.org', 'mkaniger1234', 'Executive Director', 1),
('Keith', 'Mulloy', 'kmulloy', 'kmulloy@kanbesmarkets.org', 'keithmulloy1234', 'Program Manager', 1),
('Ryan', 'Reynolds', 'rreynolds', 'ryguy@kanbesmarkets.org', 'ryanreynolds1234', 'Driver', 2);

INSERT INTO "stores" ("name", "address", "contact_name", "contact_phone", "contact_email", "status", "store_phone_number", "delivery_route_order")
VALUES ('Store1', '123 main st', 'joe', '8164444444', 'joe@email.com', true, '8162222222', 1),
('Store2', '456 cherry st', 'sam', '8165555555', 'sam@email.com', true, '8163333333', 2);

INSERT INTO "invoices" ("start_date", "end_date", "store_id")
VALUES ('2019-10-01 17:36:00', '2019-10-08 12:18:00', 1),
('2019-09-01 17:36:00', '2019-09-08 12:18:00', 2);

INSERT INTO "products" ("product_name", "product_sub_type")
VALUES ('apple', 'granny smith'),
('orange', 'navel');

INSERT INTO "suppliers" ("name", "contact_name", "contact_number", "address")
VALUES ('C & C Produce', 'Tony Gaspipe', '1234567', '400 Main Street, Kansas City, MO'),
('Stoney Crest Farm', 'Joe Farmer', '2345678', '501 Middle of Nowhere, Kansas City, MO'),
('After The Harvest', NULL, null, '999 Cherry Lane, KC, MO');

INSERT INTO "incoming_warehouse" ("product_id", "user_id", "purchase_date", "bulk_purchase_price",
"origin",
"unit_sale_price",
"expiration_date",
"donated",
"count",
"supplier_id",
"pounds")
VALUES (1, 2, '2019-10-01 17:36:00', 12.22, 'missouri', 1.00, '2019-10-08', false, 5, 2, 20),
(2, 1, '2019-10-01 17:38:00', 15.84, 'missouri', .80, '2019-10-09', false, 10, 1, 18);

INSERT INTO "outgoing_warehouse" ("user_id",
"product_id",
"store_id",
"kanbe_sell_date",
"product_count",
"store_vs_shrank",
"supplier_id",
"notes")
VALUES (2, 2, 2, '2019-10-04 22:36:00', 2, 'store', 1, null),
(2, 1, 1, '2019-10-05 23:37:00', 3, 'store', 2, null);

INSERT INTO "incoming_store" ("user_id",
"product_id",
"store_id",
"kanbe_sell_date",
"product_count",
"supplier_id",
"notes")
VALUES (2, 2, 2, '2019-10-04 22:36:00', 2, 1, null),
(2, 1, 1, '2019-10-05 23:37:00', 2, 2, null);

INSERT INTO "outgoing_store" (
"store_id",
"product_id",
"user_id",
"supplier_id",
"store_sale_date",
"sold_product_count",
"shrink_product_count",
"standard_par",
"last_par",
"notes")
VALUES (1, 1, 3, 2, '2019-10-06 23:37:00', 1, 1, 10, 7, 'Low on stock. Had to reduce par to 7.');
