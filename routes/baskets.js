var express = require('express');
var router = express.Router();
const moment = require('moment');

const Trip = require('../models/trips');
const Basket = require('../models/baskets');

//Récuperer les trips suite au click "Book"

router.post('/:tripId', (req, res) => {
        const newTripBasket = new Basket({
        tripsId: req.params.tripId })
        
        newTripBasket.save().then(() => {
        res.json({ result: true, reservation: 'Trip added to the basket'});
        })         
        });

//Liste des Trips sur la page basket*
router.get('/', (req, res) =>{
       Basket.find()
       .populate('tripsId')
       .lean()
       .then(data =>{
        let total = 0; 
        for(let i = 0; i<data.length; i++){
           let prices = data[i].tripsId.price;
           total += prices
            }
            return res.json({result: true, basket: data, totalPriceBasket: total})
        }) 
       })


//Delete the trip from the basket
router.delete("/:tripId", (req, res) => {
   
    Basket.deleteOne({_id: req.params.tripId })
    .then(dataDeleted => {
            Basket.find()
            .populate('tripsId')
            .then(data => {
              res.json({ result: true, tripsBasket: data });
            });
          }) ;
          });
 

module.exports = router;