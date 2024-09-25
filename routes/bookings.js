var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');
const Booking = require('../models/bookings');

//After clicking "purchase" in the basket page
router.post('/:tripId', (req, res) => {
  const newBook = new Booking({
  tripsId: req.params.tripId 
})
  newBook.save().then(() => 
  res.json({ result: true, book: 'Added to my bookings'}));
  });


//Liste My Bookings
router.get('/', (req, res) =>{
  Booking.find()
  .populate('tripsId')
  .then(data =>{
   res.json({result: true, myBookings: data})
  })

});


module.exports = router;