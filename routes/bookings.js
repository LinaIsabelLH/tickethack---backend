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
        .then(dataBooking =>{
          Basket.deleteMany().then(()=>{
            res.json({result: true, message: 'The basket deleted et added to my bookings', MyBookings: dataBooking})
          })})
          })    
    })



//Liste My Bookings
router.get('/', (req, res) =>{
  Booking.find()
  .populate('tripsId')
  .lean()
  .then(data =>{
    if (data.length > 0) {
      const tripsBooking = data.map((obj) => {
        return {
          ...obj,
          time: moment(obj.date).fromNow()
        };
      })
        if (tripsBooking == []) {
        return res.json({
          result: false,
          error: 'No bookings',
        });
        } else {
        return res.json({ result: true, trips: tripsBooking });
        }
    }
    else {
      return res.json({ result: false, error: 'Trip not found' });
  }})
});

//Effacer les bookings passés
router.delete('/', (req, res) =>{
  Booking.deleteMany().then(data =>{
    res.json({result: true, message: 'My Bookings have been deleted'})
  })
});







module.exports = router;