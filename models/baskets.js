const mongoose = require('mongoose');

const basketSchema = mongoose.Schema({
	panier: [{type: mongoose.Schema.Types.ObjectId, ref:'trips'}],
    user :{type: mongoose.Schema.Types.ObjectId, ref:'users'},
	
});

const Basket = mongoose.model('baskets', basketSchema);

module.exports = Basket;