const mongoose = require('mongoose');

const cardDataSchema = new mongoose.Schema({
    userName :{type: String,required: true,unique:true},
    cardNumber: {type: String,required: true},
    amountSpent: {type: Number,default: 0},
    date: {type: Date},
    rewards : {type: Number},
    transactionType : {type: String}
});

const CardData = mongoose.model('cardData', cardDataSchema);

module.exports = CardData;