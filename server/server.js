const express = require('express');
const path = require('path');
const db = require('../db/db.js');
const utils = require('./utils.js');
const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Listening at port: ' + PORT));

app.use('/pawstel/:id', express.static(path.join(__dirname, '../public')));

app.get('/api/listings/:listingId', (req, res) => {
  db.getListingById(req.params, (err, result) => {
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else if (result.length === 0) {
      res.status(404).send('No such listing');
    } else {
      db.getReviewsByListingId(result[0].review_id, (err, reviews) => {
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else {
          result[0].reviews = reviews[0];
          res.send(result[0]);
        }
      });
    }
  });
});

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null;
  if (req.query.targetDate) {
    method = db.getFirstBookedDateAfterTarget;
    let target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
  }
  if (req.query.month) {
    let month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
  }
  method(data, (err, result) => {
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else res.send(result);
  });
});

app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
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

app.put('/api/reservations/update', (req, res) => {
  // client sends the appropriate reservation id to the server
  // database queries the reservation based on the reservation id
  // in the callback of the query, have a update(?) function so that
  // whatever the information that was changed client-side is
  // updated in the database
  res.send('Put request received');
});

app.delete('/api/reservations/delete', (req, res) => {
  // client sends the appropriate reservation id to the server
  // database deletes the appropriate entry based on the id
  res.send('Your reservation has been deleted');
});
