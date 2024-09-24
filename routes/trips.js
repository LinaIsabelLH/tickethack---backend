var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');

// GET Liste de tous les Trips disponibles
router.get('/', (req, res) => {
	Trip.find().then(data => {
		res.json({ trips: data });
	});
});

// Selectionner un Trip : departure, arrival et date
router.post('/', (req, res) => {
	let dateRec= moment(req.body.date).format('DD-MM-YYYY');

	Trip.find({ departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i')}})
  .then(data => {
		if(data.length > 0) {
      let tripsDate = []
      
      for( let obj of data){
        let dbDate = moment.utc(obj.date).format('DD-MM-YYYY');
        if( dbDate === dateRec){
          tripsDate.push({
            departure: obj.departure,
            arrival: obj.arrival,
            time: moment.utc(obj.date).format('H:mm'),
            price:obj.price
          });
        }};
      
      if (tripsDate == []){
        return res.json({ result: false, error: "Date not found for this trip" })
        }
        else {
          return res.json({result: true, trips : tripsDate})
        }
    }
    else {
      return res.json({ result: false, error: "Trip not found" })
    }
  })
}); 

module.exports = router;
