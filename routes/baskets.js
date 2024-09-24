var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');

//Récuperer les trips suite au click "Book"

router.post('/', (req, res) => {
    let dateRec= moment(req.body.date).format('DD-MM-YYYY, h:mm:ss a');

	Trip.find({departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i')}})
    .then(data => {
        if(data.length > 0) {
            let tripsDate = []
            
            for( let obj of data){
              let dbDate = moment.utc(obj.date).format('DD-MM-YYYY, h:mm:ss a');
              if( dbDate === dateRec){
                tripsDate.push({
                  departure: obj.departure,
                  arrival: obj.arrival,
                  heure: moment.utc(obj.date).format('h:mm a'),
                  price: price
                });
              }};
            
            if (tripsDate == []){
              return res.json({ result: false, error: "Trip not found" })
              }
              else {
                return res.json({result: true, trips : tripsDate})
              }
          }
          else {
            return res.json({ result: false, error: "No tickets in your card" })
          }
        })
      }); 
      


module.exports = router;