var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
  id: String,
  guestName: String,
  hotelName: String,
  arrivalDate: Date,
  departureDate: Date,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', ReservationSchema);