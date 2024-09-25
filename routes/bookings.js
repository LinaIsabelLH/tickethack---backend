var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');
const Booking = require('../models/bookings');

//After clicking purchase in the basket page
router.post('/tripId', (req, res) => {
    Basket.find().then(data => {
        if(data) {
            for(let docData of data){
            const newMyBookings = new Booking ({
            reservation: req.params.tripId, 
            time: moment.utc(docData.date).format('H:mm'),
              }) 
              newMyBookings.save().then(() =>{
                Booking.find().then(data =>{
                res.json({result: true, myBookings: data})
                })
              })
            }}
        else{
            res.json({result: false, error: 'No bookings at the moment'})
        }}
        )});




module.exports = router;