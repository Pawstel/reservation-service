#!/bin/bash

dropdb --if-exists reservation
dropuser --if-exists reservation_user

createdb reservation
psql reservation < ./db/pschema.sql

psql template1 -c "create user reservation_user;"
psql template1 -c "alter user reservation_user password 'root';"
psql template1 -c "grant all on DATABASE reservation to reservation_user;"
psql reservation -c "GRANT ALL on ALL tables IN SCHEMA public to reservation_user"