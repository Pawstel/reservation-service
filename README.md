# Reservation Service for Airpnp

> Booking module allows user to see general listing details, vacancies in a month, and make a reservation by choosing check-in/check-out dates on a calendar, and specify number of guests.

## Related Projects

  - https://github.com/fullstakreaktor/hero-photo-service
  - https://github.com/fullstakreaktor/Review-service
  - https://github.com/fullstakreaktor/about-service
  - https://github.com/fullstakreaktor/kony-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

- Node 6.13.0
- Mysql 5.7.22 

## Development

### Setting Up 

To create database of mock data
From within root directory:

```sh
mysql -h localhost -u root 
source db/schema.sql
use reservation
source mock-data/mock_data.sql
```


To install dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm start
```

## API

To make a GET request for all listings:

```sh
curl -H "Content-Type: application/json" -X GET -d '{"listingId":"1234567"}' http://localhost:3003/api/listings/:listingId
```

To make a POST request for a new reservation to the database:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"guest_id":"184", "booked_dates_id":"763", "total_adults":"1", "total_pups":"5", "total_charge":"117.54"}' http://localhost:3003/api/reservations/new
```

To make a PUT request to change an existing database entry(reservation):

```sh
curl -H "Content-Type: application/json" -X PUT -d '{"listingId":"20183", "rate":"135.99"}' http://localhost:3003/api/reservations/:reservationId/update
```

To make a DELETE request to remove and existing entry in the database (cancelling a reservation):

```sh
curl -H "Content-Type: application/json" -X DELETE -d '{"reservationId":"2018"}' http://localhost:3003/api/reservations/:reservationId/delete
```