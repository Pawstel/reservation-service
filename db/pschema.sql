DROP TABLE IF EXISTS airbnb;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS booked_dates;
DROP TABLE IF EXISTS reservations;

CREATE TABLE airbnb (
  id SERIAL PRIMARY KEY,
  username text NOT NULL
);

-- CREATE TABLE hosts (
--   id SERIAL PRIMARY KEY,
--   user_id integer REFERENCES airbnb(id)
-- );

-- CREATE TABLE reviews (
--   id SERIAL PRIMARY KEY,
--   total_reviews integer DEFAULT 0,
--   avg_rating FLOAT DEFAULT 0
-- );

-- CREATE TABLE listings (
--   id SERIAL PRIMARY KEY,
--   host_id integer REFERENCES hosts(id),
--   review_id integer REFERENCES reviews(id),
--   weekly_views integer DEFAULT 0,
--   min_stay integer DEFAULT 1,
--   max_guests integer,
--   fees integer DEFAULT 0,
--   tax_rate integer,
--   rate integer NOT NULL
-- );

-- CREATE TABLE booked_dates (
--   id SERIAL PRIMARY KEY,
--   listing_id integer REFERENCES listings(id), 
--   check_in DATE NOT NULL,
--   check_out DATE NOT NULL
-- );

-- CREATE TABLE reservations (
--   id SERIAL PRIMARY KEY,
--   guest_id integer REFERENCES airbnb(id),
--   booked_dates_id integer NOT NULL,
--   total_adults integer NOT NULL,
--   total_pups integer DEFAULT 0,
--   total_charge integer NOT NULL, 
--   created_at DATE DEFAULT CURRENT_TIMESTAMP
-- );

COPY airbnb(username) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/data.csv' DELIMITERS ',' CSV;
COPY airbnb(username) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/data2.csv' DELIMITERS ',' CSV;