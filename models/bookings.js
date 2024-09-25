const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	tripsId: [{type: mongoose.Schema.Types.ObjectId, ref:'trips'}],
    
    //{type: mongoose.Schema.Types.ObjectId, ref:'users'},
	
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;