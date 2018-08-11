DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS booked_dates;
DROP TABLE IF EXISTS reservations;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text NOT NULL
);

CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  total_reviews integer DEFAULT 0,
  avg_rating text NOT NULL
);

CREATE TABLE listings (
  id integer PRIMARY KEY,
  listing_name text NOT NULL,
  host_id integer REFERENCES hosts(id),
  review_id integer REFERENCES reviews(id),
  weekly_views integer DEFAULT 0,
  min_stay integer DEFAULT 1,
  max_guests integer,
  fees integer DEFAULT 0,
  tax_rate integer,
  rate integer
);

CREATE TABLE booked_dates (
  id SERIAL PRIMARY KEY,
  listing_id integer REFERENCES listings(id), 
  check_in text NOT NULL,
  check_out text NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  guest_id integer REFERENCES users(id),
  booked_dates_id integer NOT NULL REFERENCES booked_dates(id),
  total_adults integer NOT NULL,
  total_pups integer DEFAULT 0,
  total_charge integer NOT NULL, 
  created_at text DEFAULT CURRENT_TIMESTAMP
);

COPY users(username) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/users/data2.csv' DELIMITERS ',' CSV;
COPY hosts(user_id) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/hosts/data2.csv' DELIMITERS ',' CSV;
COPY reviews(total_reviews, avg_rating) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/reviews/sql.csv' DELIMITERS ',' CSV;
COPY listings(id, listing_name, host_id, review_id, weekly_views, min_stay, max_guests, fees, tax_rate, rate) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/listings/combine.csv' DELIMITERS ',' CSV;
COPY booked_dates(listing_id, check_in, check_out) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/booked_dates/data2.csv' DELIMITERS ',' CSV;
COPY reservations(guest_id, booked_dates_id, total_adults, total_pups, total_charge, created_at) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/reservations/data2.csv' DELIMITERS ',' CSV;