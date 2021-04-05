DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255),
password VARCHAR(255),
avatar VARCHAR(255),
birthday DATE,
role SMALLINT,
rating SMALLINT
);

-- user_role:
-- 1 = buyer
-- 2 = seller
-- 3 = buyer & seller
