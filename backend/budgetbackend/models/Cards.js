const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userName :{
    type: String,
    required: true,
    unique:true
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
  amountSpent: {
    type: String,
    default: 0,
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;