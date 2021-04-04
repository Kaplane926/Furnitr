DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  msg_id SERIAL PRIMARY KEY,
  seller_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  buyer_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE,
  message TEXT,
  msg_created TIMESTAMP
);
