var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');

//Récuperer les trips suite au click "Book"

router.post('/', (req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let dateRec= moment(`${date} ${time}`).format('YYYY-MM-DD H:mm');

	Trip.findOne({departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i')}, date: { $gte: dateRec.startOf("minute").toDate(),
        $lt: dateRec.endOf("minute").toDate()} })
    .then(data => {
        console.log(data);
        if(data) {
          const newTripBasket = new Basket({
          departure: obj.departure,
          arrival: obj.arrival,
          time: moment.utc(obj.date).format('H:mm'),
          price: obj.price
        })
        newTripBasket.save().then(newDoc => {
        res.json({ result: true, trips: newDoc });
        });           
        }
        else {
            return res.json({ result: false, error: "No tickets in your card" })
          }
        })
      }); 


//Delete the trip from the basket
router.delete("/", (req, res) => {
    let dateRec= moment(req.body.date).format('DD-MM-YYYY, H:mm:ss');

    Basket.find({departure: { $regex: new RegExp(req.body.departure, 'i') }, arrival: { $regex: new RegExp(req.body.arrival, 'i')}})
    .then(data => {
        if(data.length > 0) {
            
            for( let obj of data){
              let dbDate = moment.utc(obj.date).format('DD-MM-YYYY, H:mm:ss');
              if( dbDate === dateRec){
                Basket.deleteOne({_id: obj._id }).then(deletedDoc => {
                Basket.find().then(data => {
              res.json({ result: true, trips: data });
            });
          }) ;
          }}}});
        })
 


module.exports = router;