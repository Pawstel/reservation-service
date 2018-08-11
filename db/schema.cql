DROP KEYSPACE IF EXISTS reservation;

CREATE KEYSPACE reservation 
WITH replication = {'class':'SimpleStrategy','replication_factor':1};

USE reservation;

CREATE TABLE users (
  id int PRIMARY KEY,
  username text
);

CREATE TABLE hosts (
  id int PRIMARY KEY,
  user_id int
);

CREATE TABLE reviews (
  id int PRIMARY KEY,
  total_reviews int,
  avg_rating text
);

CREATE TABLE listings (
  id int PRIMARY KEY,
  listing_name text,
  host_id int,
  review_id int,
  weekly_views int,
  min_stay int,
  max_guests int,
  fees int,
  tax_rate int,
  rate int
);

CREATE TABLE booked_dates (
  id int PRIMARY KEY,
  listing_id int,
  check_in text,
  check_out text
);

CREATE TABLE reservations (
  id int PRIMARY KEY,
  guest_id int,
  booked_dates_id int,
  total_adults int,
  total_pups int,
  total_charge int,
  created_at text
);

COPY users(id, username) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/users/data.csv' WITH HEADER=false AND DELIMITER=',';

COPY hosts(id, user_id) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/hosts/data.csv' WITH HEADER=false AND DELIMITER=',';

COPY reviews(id, total_reviews, avg_rating) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/reviews/data.csv' WITH HEADER=false AND DELIMITER=',';

COPY listings(id, listing_name, host_id, review_id, weekly_views, min_stay, max_guests, fees, tax_rate, rate) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/listings/combine.csv' WITH HEADER=false AND DELIMITER=',';

COPY booked_dates(id, listing_id, check_in, check_out) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/booked_dates/data.csv' WITH HEADER=false AND DELIMITER=',';

COPY reservations(id, guest_id, booked_dates_id, total_adults, total_pups, total_charge, created_at) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/reservations/data.csv' WITH HEADER=false AND DELIMITER=',';