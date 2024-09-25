const mongoose = require('mongoose');

const basketSchema = mongoose.Schema({
    tripsId: [{type: mongoose.Schema.Types.ObjectId, ref:'trips'}],
    time: Date, 
    user : String
	//{type: mongoose.Schema.Types.ObjectId, ref:'users'}
});

const Basket = mongoose.model('baskets', basketSchema);

module.exports = Basket;