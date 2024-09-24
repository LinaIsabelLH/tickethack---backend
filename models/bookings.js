const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	reservation: [{type: mongoose.Schema.Types.ObjectId, ref:'trips'}],
    isPaid: Boolean,
    user :{type: mongoose.Schema.Types.ObjectId, ref:'users'},
	
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;