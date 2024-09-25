var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');

// GET Liste de tous les Trips disponibles
router.get('/', (req, res) => {
  Trip.find().then((data) => {
    res.json({ trips: data });
  });
});

// Selectionner un Trip : departure, arrival et date
router.post('/', (req, res) => {
  let dateRec = moment.utc(req.body.date);

  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, 'i') },
    arrival: { $regex: new RegExp(req.body.arrival, 'i') },
    date: {
      $gte: dateRec.startOf('day').toDate(),
      $lt: dateRec.endOf('day').toDate(),
    },
  })
    .lean()
    .then((data) => {
      // console.log(data);
      if (data.length > 0) {
        const tripsDate = data.map((obj) => {
          return {
            ...obj,
            time: moment.utc(obj.date).format('H:mm'),
          };
        });

        if (tripsDate == []) {
          return res.json({
            result: false,
            error: 'Date not found for this trip',
          });
        } else {
          return res.json({ result: true, trips: tripsDate });
        }
      } else {
        return res.json({ result: false, error: 'Trip not found' });
      }
    });
});

module.exports = router;
