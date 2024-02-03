const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userName :{
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  setLimit: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true
  },
  updatable: {
    type: Boolean,
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;