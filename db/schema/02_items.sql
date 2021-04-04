DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  item_title VARCHAR(255),
  item_price DECIMAL(10,2),
  item_description TEXT,
  item_image_url VARCHAR(255),
  item_date_posted DATE,
  item_date_sold DATE,
  item_country VARCHAR(255),
  item_street VARCHAR(255),
  item_city VARCHAR(255),
  item_province VARCHAR(255),
  item_postal_code VARCHAR(255),
  item_zodiac_sign VARCHAR(255),
  item_status VARCHAR(50)
);
