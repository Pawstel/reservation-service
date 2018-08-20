// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME || 'localhost',
//   user: process.env.RDS_USERNAME || 'root',
//   password: process.env.RDS_PASSWORD || 'root',
//   port: process.env.RDS_PORT || 3306,
//   database: 'reservation',
// });

// const { Pool, Client } = require('pg');
const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  host: 'database',
  user: process.env.RDS_USERNAME || 'reservation_user',
  password: process.env.RDS_PASSWORD || 'root',
  database: 'reservation',
};

const db = pgp(connection);

const getListingById = ({ listingId }, callback) => {
  const queryStr = `SELECT * from listings WHERE id = $1`;
  db.any(queryStr, listingId)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const getReviewsByListingId = (listingId, callback) => {
  const queryStr = `SELECT * from reviews WHERE id = $1`;
  db.any(queryStr, listingId)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const getBookedDatesByListingId = ([listingId, year, month], callback) => {
  const startDate = [year, month, 1].join('-');
  const endDate = month === 12 ? [Number(year) + 1, 1, 1].join('-') : [year, Number(month) + 1, 1].join('-');

  const queryStr = `SELECT check_in, check_out FROM booked_dates WHERE listing_id = $1 AND check_in >= $2 AND check_in < $3 ORDER BY check_in`;
  db.any(queryStr, [listingId, startDate, endDate])
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const getFirstBookedDateAfterTarget = ([listingId, year, month, date], callback) => {
  const startDate = [year, month, date].join('-');
  const endDate = month === 12 ? [Number(year) + 1, 1, 1].join('-') : [year, Number(month) + 1, 1].join('-');

  const queryStr = `SELECT check_in FROM booked_dates WHERE listing_id = $1 AND check_in > $2 AND check_in < $3 ORDER BY check_in ASC LIMIT 1`;
  db.any(queryStr, [listingId, startDate, endDate])
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const postNewBookedDates = (data, callback) => {
  const queryStr = `INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES (?)`;
  pool.query(queryStr, [data.listingId, data.checkIn, data.checkOut], callback);
};

const postNewReservation = ({ guestId, bookedDatesId, guests, total }, callback) => {
  const queryStr = `INSERT INTO reservations`
    + `(guest_id, booked_dates_id, total_adults, total_children, total_infants, total_charge) VALUES (?)`;
  const values = [guestId, bookedDatesId, guests.adults, guests.children, guests.total, total];
  pool.query(queryStr, [values], callback);
};

const deleteBookedDatesById = ({ listingId }, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = ?`;
  pool.query(queryStr, listingId, callback);
};

const updateReservation = (data, callback) => {
  const queryStr = `UPDATE booked_dates SET check = $2, check_out = $3 WHERE id = $1`;
  db.any(queryStr, [data.listingId, data.check_in, data.check_out])
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const deleteReservation = (data, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = $1`;
  db.any(queryStr, data)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

const deleteReservationTable = (data, callback) => {
  const queryStr = `DELETE FROM reservations WHERE id = $1`;
  db.any(queryStr, data)
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports = {
  getListingById,
  getReviewsByListingId,
  getBookedDatesByListingId,
  getFirstBookedDateAfterTarget,
  updateReservation,
  deleteReservation,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
  deleteReservationTable,
};
