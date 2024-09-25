var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');

//Récuperer les trips suite au click "Book"

router.post('/:tripId', (req, res) => {

	Trip.findOne({_id: req.params.tripId })
    .then(data => {
        if(data){
          const newTripBasket = new Basket({
          tripsId: req.params.tripId, 
          time: moment.utc(data.date).format('H:mm'),
        })
        newTripBasket.save().then(newDoc => {
        res.json({ result: true, tripsbasket: newDoc });
        });           
        }
        else {
            return res.json({ result: false, tripsBasket: "No tickets in your card" })
          }})
        }); 


//Delete the trip from the basket
router.delete("/:tripId", (req, res) => {
   
    Basket.deleteOne({_id: req.params.tripId })
    .then(dataDeleted => {
            Basket.find().then(data => {
              res.json({ result: true, tripsBasket: data });
            });
          }) ;
          });
 

module.exports = router;