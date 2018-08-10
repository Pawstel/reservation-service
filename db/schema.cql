DROP KEYSPACE IF EXISTS reservation;

CREATE KEYSPACE reservation 
WITH replication = {'class':'SimpleStrategy','replication_factor':1};

USE reservation;

CREATE TABLE information (
  listing_id int PRIMARY KEY,
  listing_name text,
  hosts_id int,
  user_id int,
  weekly_views int,
  min_stay int,
  max_guests int,
  fees int,
  tax_rate int,
  rate int,
  username text,
  total_reviews int,
  avg_rating text,
  booked_id int,
  check_in text,
  check_out text,
  reservation_id int,
  booked_dates_id int,
  total_adults int,
  total_pups int,
  total_charge int
);

COPY information (listing_id, listing_name, hosts_id, user_id, weekly_views, min_stay, max_guests, fees, tax_rate, rate, username, total_reviews, avg_rating, booked_id, check_in, check_out, reservation_id, booked_dates_id, total_adults, total_pups, total_charge) FROM '/Users/nilsgudbranson 1/desktop/SDC/reservation-service/db/CSV/cassandra/combine.csv' with header=false and DELIMITER=',';