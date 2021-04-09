DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  price DECIMAL(10,2),
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  date_posted DATE,
  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  postal_code VARCHAR(255),
  status VARCHAR(50)
);
