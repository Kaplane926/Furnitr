-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
user_id SERIAL PRIMARY KEY NOT NULL,
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255),
user_password VARCHAR(255),
user_birthday DATE,
user_role SMALLINT,
user_rating SMALLINT
);
