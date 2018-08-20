require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const redis = require('redis');
const db = require('../db/db.js');
const utils = require('./utils.js');
const PORT = 3003;
const client = redis.createClient('6379', 'redis');

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

client.on('error', (err) => {
  throw err;
});

app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(allowCrossDomain);

app.listen(PORT, () => console.log('Listening at port:', PORT));

app.use('/pawstel/:id', express.static(path.join(__dirname, '../public')));

app.get('/api/listings/:listingId', (req, res) => {
  const listingNumber = req.params.listingId;
  client.get(listingNumber, (err, data) => {
    if (data) {
      res.send(JSON.parse(data));
    } else {
      db.getListingById(req.params, (err, result) => {
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else if (result.length === 0) {
          res.status(404).send('No such listing');
        } else {
          db.getReviewsByListingId(result[0].review_id, (error, reviews) => {
            if (error) {
              res.status(500).send({ error: `Server oopsie ${error}` });
            } else {
              result[0].reviews = reviews[0];
              client.setex(listingNumber, 60, JSON.stringify(result[0]));
              res.send(result[0]);
            }
          });
        }
      });
    }
  });
});

app.get('/api/dates/:listingId', (req, res) => {
  let inputMonth;
  let method = db.getBookedDatesByListingId;
  let data = null;
  if (req.query.targetDate) {
    inputMonth = req.query.targetDate;
    method = db.getFirstBookedDateAfterTarget;
    const target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
  }
  if (req.query.month) {
    inputMonth = req.query.month;
    const month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
  }
  client.get(inputMonth, (err, booked) => {
    if (booked) {
      res.send(JSON.parse(booked));
    } else {
      method(data, (err, result) => {
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else {
          client.setex(inputMonth, 60, JSON.stringify(result));
          res.send(result);
        }
      });
    }
  });
});

app.post('/api/reservations/new', (req, res) => {
  const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      data.bookedDatesId = result.insertId;
      db.postNewReservation(data, (error, reservation) => {
        if (err) {
          db.deleteBookedDatesById(result.insertId, () => {
            res.status(500).send({ err: 'Failed to post reservation' });
          });
        } else res.status(201).send(reservation);
      });
    }
  });
});

app.put('/api/reservations/:reservationId/update', (req, res) => {
  // client sends the appropriate reservation id to the server
  // database queries the reservation based on the reservation id
  // in the callback of the query, have a update(?) function so that
  // whatever the information that was changed client-side is
  // updated in the database
  const data = utils.parseBookedDates(req.body);
  db.updateReservation(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to update reservation' });
    } else {
      res.send('Put request received');
    }
  });
});

app.delete('/api/reservations/:reservationId/delete', (req, res) => {
  // client sends the appropriate reservation id to the server
  // database deletes the appropriate entry based on the id
  const data = req.body.reservationId;
  db.deleteReservation(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to delete booked dates, please try again' });
    } else {
      db.deleteReservationTable(data, (error, data) => {
        if (err) {
          res.status(500).send({ err: 'Failed to delete reservation, please try again' });
        } else {
          res.send('Your reservation has been cancelled');
        }
      })
    }
  });
});
