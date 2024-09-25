const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	reservation: [{type: mongoose.Schema.Types.ObjectId, ref:'trips'}],
    time: Date,
    user: 'Lina'
    //{type: mongoose.Schema.Types.ObjectId, ref:'users'},
	
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;