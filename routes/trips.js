var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');

// GET Liste de tous les Trips disponibles

router.get('/', (req, res) => {
	Trip.find().then(data => {
		res.json({ trips: data });
	});
});

// Selectionner un Trip : departure, arrival et date
router.post('/', (req, res) => {
	
	Trip.findOne({ departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i') }, date: req.body.date })
  .then(data => {
		if (data === null) {
      res.json({ result: false, error: "City not found" })
    }
    else {
      res.json({ result: true, trip: data })
    }
  });
});

module.exports = router;
