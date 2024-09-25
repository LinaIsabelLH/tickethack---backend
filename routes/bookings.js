var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');
const Booking = require('../models/bookings');

//After clicking "purchase" in the basket page
router.post('/', (req, res) => {
  Basket.find()
  .then(data =>{
    for (const basket of data) {
      const newBook = new Booking({
      tripsId: basket.tripsId
    })
    newBook.save()}})
    .then(()=>{
      Booking.find()
      .populate('tripsId')
      .then(data =>{
        res.json({ result: true, basket: 'Added to my bookings', MyBookings: data })
    })
    })
    }) 


//Liste My Bookings
router.get('/', (req, res) =>{
  Booking.find()
  .populate('tripsId')
  .then(data =>{
   res.json({result: true, myBookings: data})
  })
});

//Effacer les bookings passés
router.delete('/', (req, res) =>{
  Booking.deleteMany().then(data =>{
    res.json({result: true, message: 'My Bookings have been deleted'})
  })
});







module.exports = router;